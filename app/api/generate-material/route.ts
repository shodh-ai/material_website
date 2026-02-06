import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HUGGINGFACE_MODEL_URL = process.env.HUGGINGFACE_MODEL_URL || 'https://api-inference.huggingface.co/models/YOUR_MODEL_ID';

const SYSTEM_PROMPT = `You are Skanda, an expert Battery Material Scientist.
Your job is to translate User Requirements into a JSON Configuration for a Generative Physics Model.

The Generative Model accepts a vector of 3 targets:
1. target_cycle_life (Range: 500 - 3000 cycles)
2. target_capacity_fade_rate (Range: 0.0001 - 0.001 Ah/cycle. Lower is better.)
3. target_power_demand (Range: 0.0 - 1.0. 1.0 = Racing/Drone, 0.0 = Grid Storage)

RULES:
- If the user asks for "Fast Charging" or "Drone", set target_power_demand > 0.8.
- If the user asks for "Long Life" or "Grid", set target_cycle_life > 2000.
- If the user mentions "Hypercar" or "Racing", set target_power_demand > 0.9 and target_cycle_life around 800.
- If the user mentions "Electric Vehicle" or "EV", balance parameters: target_cycle_life around 1500, target_power_demand around 0.6.
- Output ONLY valid JSON in this exact format:
{
  "target_cycle_life": <number>,
  "target_capacity_fade_rate": <number>,
  "target_power_demand": <number>,
  "reasoning": "<explanation of your parameter choices>"
}

Example Input: "I need a battery for a hypercar."
Example Output:
{
  "target_cycle_life": 800,
  "target_capacity_fade_rate": 0.0005,
  "target_power_demand": 0.95,
  "reasoning": "Hypercars require maximum power output (low tortuosity) and moderate life."
}`;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Step 1: Call Gemini to interpret the user's request (or use fallback)
    let parameters;

    if (GEMINI_API_KEY) {
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${SYSTEM_PROMPT}\n\nUser Request: ${prompt}\n\nProvide ONLY the JSON output, no other text.`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          }),
        }
      );

      if (!geminiResponse.ok) {
        const errorText = await geminiResponse.text();
        console.error('Gemini API error:', errorText);
        return NextResponse.json(
          { error: 'Failed to process request with Gemini' },
          { status: 500 }
        );
      }

      const geminiData = await geminiResponse.json();
      const geminiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

      try {
        const jsonMatch = geminiText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parameters = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in response');
        }
      } catch (parseError) {
        console.error('Failed to parse Gemini response:', geminiText);
        return NextResponse.json(
          { error: 'Failed to parse AI response' },
          { status: 500 }
        );
      }
    } else {
      // Fallback: heuristic parameter generation for demo/testing
      const lowerPrompt = prompt.toLowerCase();
      const isDrone = /drone|uav|aerial|fly/.test(lowerPrompt);
      const isFast = /fast|quick|rapid|charge|5c|10c/.test(lowerPrompt);
      const isGrid = /grid|storage|stationary|utility/.test(lowerPrompt);
      const isEV = /ev|electric vehicle|car|tesla|auto/.test(lowerPrompt);
      const isRacing = /hypercar|racing|formula|sport/.test(lowerPrompt);

      let cycleLife = 1500;
      let powerDemand = 0.5;
      let fadeRate = 0.0005;
      let reasoning = 'Balanced configuration for general-purpose battery application.';

      if (isDrone || isFast) {
        cycleLife = 2000; powerDemand = 0.88; fadeRate = 0.0003;
        reasoning = 'High-power application detected. Prioritizing fast charge capability with low tortuosity and high porosity. Cycle life set high for commercial viability.';
      } else if (isRacing) {
        cycleLife = 800; powerDemand = 0.95; fadeRate = 0.0005;
        reasoning = 'Racing/hypercar application requires maximum power output (minimal tortuosity) with moderate cycle life expectations.';
      } else if (isGrid) {
        cycleLife = 2800; powerDemand = 0.15; fadeRate = 0.0001;
        reasoning = 'Grid storage prioritizes extreme cycle life and minimal degradation over power density. Dense, well-connected microstructure.';
      } else if (isEV) {
        cycleLife = 1800; powerDemand = 0.6; fadeRate = 0.0004;
        reasoning = 'Electric vehicle application requires balanced performance: good cycle life for warranty, moderate fast-charge capability, and controlled degradation.';
      }

      parameters = {
        target_cycle_life: cycleLife,
        target_capacity_fade_rate: fadeRate,
        target_power_demand: powerDemand,
        reasoning,
      };
      console.log('Using fallback parameters (no GEMINI_API_KEY):', parameters);
    }

    // Step 2: Call HuggingFace model with the parameters
    let imageUrl = null;
    if (HUGGINGFACE_API_KEY) {
      try {
        const hfResponse = await fetch(HUGGINGFACE_MODEL_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: {
              target_cycle_life: parameters.target_cycle_life,
              target_capacity_fade_rate: parameters.target_capacity_fade_rate,
              target_power_demand: parameters.target_power_demand,
            }
          }),
        });

        if (hfResponse.ok) {
          const blob = await hfResponse.blob();
          const buffer = await blob.arrayBuffer();
          const base64 = Buffer.from(buffer).toString('base64');
          imageUrl = `data:image/png;base64,${base64}`;
        } else {
          console.error('HuggingFace API error:', await hfResponse.text());
        }
      } catch (hfError) {
        console.error('HuggingFace request failed:', hfError);
      }
    }

    // Fallback: generate a gyroid-style SVG placeholder when no HF model is connected
    if (!imageUrl) {
      imageUrl = generateGyroidFallback(parameters);
    }

    // Step 3: Generate response content
    const responseContent = `I've analyzed your requirements and designed an optimized battery electrode microstructure.

**Application Analysis:**
${parameters.reasoning}

**Generated Microstructure:**
The model has generated a 3D voxel structure optimized for your specifications. The visualization shows the porous electrode architecture with calculated tortuosity and porosity values.

**Predicted Performance:**
- Estimated Charge Time: ${calculateChargeTime(parameters.target_power_demand)} minutes
- Predicted Cycle Life: ${parameters.target_cycle_life} cycles
- Capacity Fade Rate: ${parameters.target_capacity_fade_rate} Ah/cycle`;

    return NextResponse.json({
      content: responseContent,
      reasoning: parameters.reasoning,
      parameters: {
        target_cycle_life: parameters.target_cycle_life,
        target_capacity_fade_rate: parameters.target_capacity_fade_rate,
        target_power_demand: parameters.target_power_demand,
      },
      imageUrl: imageUrl,
    });

  } catch (error) {
    console.error('Error in generate-material:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateChargeTime(powerDemand: number): string {
  const baseTime = 60;
  const chargeTime = baseTime * (1 - powerDemand * 0.8);
  return chargeTime.toFixed(1);
}

function generateGyroidFallback(params: {
  target_cycle_life: number;
  target_capacity_fade_rate: number;
  target_power_demand: number;
}): string {
  // Map parameters to visual properties
  const power = params.target_power_demand;
  const life = params.target_cycle_life;

  // Porosity-like density: higher power → more open structure
  const cellCount = Math.round(6 + power * 6); // 6-12 cells
  const hue1 = Math.round(200 + power * 60);   // blue → purple shift with power
  const hue2 = Math.round(160 + (1 - power) * 40); // teal range
  const porosity = (30 + power * 20).toFixed(0);
  const tortuosity = (1.2 + (1 - power) * 2.0).toFixed(2);

  // Build gyroid-like pattern as SVG paths
  const size = 400;
  const cellSize = size / cellCount;
  let paths = '';

  for (let row = 0; row < cellCount; row++) {
    for (let col = 0; col < cellCount; col++) {
      const cx = col * cellSize + cellSize / 2;
      const cy = row * cellSize + cellSize / 2;
      const r = cellSize * 0.38;
      // Alternate pattern to create gyroid-like interconnected look
      const phase = (row + col) % 2 === 0;
      if (phase) {
        // Rounded blob
        paths += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#g1)" opacity="0.85"/>`;
      } else {
        // Connecting channel
        const r2 = r * 0.55;
        paths += `<rect x="${cx - r2}" y="${cy - r2}" width="${r2 * 2}" height="${r2 * 2}" rx="${r2 * 0.4}" fill="url(#g2)" opacity="0.7"/>`;
      }
    }
  }

  // Overlay grid lines for voxel look
  let gridLines = '';
  for (let i = 1; i < cellCount; i++) {
    const pos = i * cellSize;
    gridLines += `<line x1="${pos}" y1="0" x2="${pos}" y2="${size}" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>`;
    gridLines += `<line x1="0" y1="${pos}" x2="${size}" y2="${pos}" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <radialGradient id="g1" cx="40%" cy="35%"><stop offset="0%" stop-color="hsl(${hue1},70%,65%)"/><stop offset="100%" stop-color="hsl(${hue1},60%,30%)"/></radialGradient>
    <radialGradient id="g2" cx="50%" cy="40%"><stop offset="0%" stop-color="hsl(${hue2},60%,55%)"/><stop offset="100%" stop-color="hsl(${hue2},50%,25%)"/></radialGradient>
    <radialGradient id="bg"><stop offset="0%" stop-color="#1a1a2e"/><stop offset="100%" stop-color="#0d0d1a"/></radialGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#bg)"/>
  ${paths}
  ${gridLines}
  <rect x="12" y="${size - 70}" width="200" height="56" rx="8" fill="rgba(0,0,0,0.6)"/>
  <text x="22" y="${size - 48}" font-family="monospace" font-size="11" fill="#a78bfa">Porosity: ${porosity}%</text>
  <text x="22" y="${size - 32}" font-family="monospace" font-size="11" fill="#67e8f9">Tortuosity: ${tortuosity}</text>
  <text x="22" y="${size - 16}" font-family="monospace" font-size="11" fill="#6ee7b7">Cycles: ${life}</text>
  <text x="${size - 120}" y="24" font-family="monospace" font-size="10" fill="rgba(255,255,255,0.3)">FALLBACK PREVIEW</text>
</svg>`;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}
