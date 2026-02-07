import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@gradio/client';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const DIFFUSION_SPACE = process.env.DIFFUSION_SPACE || 'Ellwil/battery-microstructure-demo';

const SYSTEM_PROMPT = `You are Skanda, a Battery Material Architect.
Translate user requests into target physics parameters.
Output JSON ONLY.

Output Schema:
{
  "projected_cycle_life": float (500-5000),
  "capacity_fade_rate": float (0.0001-0.002),
  "target_power_demand": float (0.0-1.0),
  "porosity": float (0.2-0.6),
  "reasoning": "string explaining your choices"
}

RULES:
- If the user asks for "Fast Charging" or "Drone", set target_power_demand > 0.8.
- If the user asks for "Long Life" or "Grid", set projected_cycle_life > 2000.
- If the user mentions "Hypercar" or "Racing", set target_power_demand > 0.9 and projected_cycle_life around 800.
- If the user mentions "Electric Vehicle" or "EV", balance parameters: projected_cycle_life around 1500, target_power_demand around 0.6.

Example Input: "I need a battery for a hypercar."
Example Output:
{
  "projected_cycle_life": 800,
  "capacity_fade_rate": 0.0005,
  "target_power_demand": 0.95,
  "porosity": 0.45,
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
    let parameters: {
      projected_cycle_life: number;
      capacity_fade_rate: number;
      target_power_demand: number;
      porosity: number;
      reasoning: string;
    };

    if (GEMINI_API_KEY) {
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
      let porosity = 0.35;
      let reasoning = 'Balanced configuration for general-purpose battery application.';

      if (isDrone || isFast) {
        cycleLife = 2000; powerDemand = 0.88; fadeRate = 0.0003; porosity = 0.45;
        reasoning = 'High-power application detected. Prioritizing fast charge capability with low tortuosity and high porosity.';
      } else if (isRacing) {
        cycleLife = 800; powerDemand = 0.95; fadeRate = 0.0005; porosity = 0.45;
        reasoning = 'Racing/hypercar application requires maximum power output with moderate cycle life.';
      } else if (isGrid) {
        cycleLife = 2800; powerDemand = 0.15; fadeRate = 0.0001; porosity = 0.30;
        reasoning = 'Grid storage prioritizes extreme cycle life and minimal degradation over power density.';
      } else if (isEV) {
        cycleLife = 1800; powerDemand = 0.6; fadeRate = 0.0004; porosity = 0.38;
        reasoning = 'Electric vehicle application requires balanced performance: good cycle life, moderate fast-charge.';
      }

      parameters = {
        projected_cycle_life: cycleLife,
        capacity_fade_rate: fadeRate,
        target_power_demand: powerDemand,
        porosity,
        reasoning,
      };
      console.log('Using fallback parameters (no GEMINI_API_KEY):', parameters);
    }

    // Step 2: Call HuggingFace Gradio Space via @gradio/client
    // The Python backend handles normalization_stats.json → 20-dim vector internally
    let gifUrl: string | null = null;
    let modelInfo = '';
    let tiffUrl: string | null = null;

    try {
      const client = await Client.connect(DIFFUSION_SPACE, {
        token: HUGGINGFACE_API_KEY as `hf_${string}`,
      });

      const result = await client.predict('/generate_microstructure', [
        parameters.projected_cycle_life,   // cycle_life
        parameters.capacity_fade_rate,     // fade_rate
        parameters.target_power_demand,    // power_demand
        parameters.porosity,               // porosity
      ]);

      const data = result.data as any[];
      // Returns: [gif_path, info_json, tiff_path]

      // data[0] = GIF image (object with url)
      if (data[0]?.url) {
        gifUrl = data[0].url;
      } else if (typeof data[0] === 'string') {
        gifUrl = data[0];
      }

      // data[1] = info JSON string
      if (data[1] && typeof data[1] === 'string') {
        modelInfo = data[1];
      }

      // data[2] = TIFF file (object with url)
      if (data[2]?.url) {
        tiffUrl = data[2].url;
      } else if (typeof data[2] === 'string') {
        tiffUrl = data[2];
      }

      console.log('Gradio result:', { gifUrl: !!gifUrl, modelInfo: modelInfo.slice(0, 100), tiffUrl: !!tiffUrl });
    } catch (hfError) {
      console.error('HuggingFace Space request failed:', hfError);
    }

    // Fallback: generate a gyroid-style SVG placeholder when HF model is unavailable
    if (!gifUrl) {
      gifUrl = generateGyroidFallback(parameters);
    }

    // Step 3: Generate response content
    const chargeTime = calculateChargeTime(parameters.target_power_demand);
    let parsedInfo = '';
    try {
      const infoObj = JSON.parse(modelInfo);
      parsedInfo = `\n- Actual Porosity: ${(infoObj.porosity_actual * 100).toFixed(1)}%\n- Solid Voxels: ${infoObj.solid_voxels?.toLocaleString()} / ${infoObj.total_voxels?.toLocaleString()}`;
    } catch { /* modelInfo might not be valid JSON */ }

    const responseContent = `I've analyzed your requirements and designed an optimized battery electrode microstructure.

**Application Analysis:**
${parameters.reasoning}

**Generated Microstructure:**
The model has generated a 3D voxel structure (128×128×128) optimized for your specifications.${parsedInfo}

**Predicted Performance:**
- Estimated Charge Time: ${chargeTime} minutes
- Predicted Cycle Life: ${parameters.projected_cycle_life} cycles
- Capacity Fade Rate: ${parameters.capacity_fade_rate} Ah/cycle`;

    return NextResponse.json({
      content: responseContent,
      reasoning: parameters.reasoning,
      parameters: {
        projected_cycle_life: parameters.projected_cycle_life,
        capacity_fade_rate: parameters.capacity_fade_rate,
        target_power_demand: parameters.target_power_demand,
        porosity: parameters.porosity,
      },
      imageUrl: gifUrl,
      tiffUrl: tiffUrl,
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
  projected_cycle_life: number;
  capacity_fade_rate: number;
  target_power_demand: number;
}): string {
  const power = params.target_power_demand;
  const life = params.projected_cycle_life;

  const cellCount = Math.round(6 + power * 6);
  const hue1 = Math.round(200 + power * 60);
  const hue2 = Math.round(160 + (1 - power) * 40);
  const porosity = (30 + power * 20).toFixed(0);
  const tortuosity = (1.2 + (1 - power) * 2.0).toFixed(2);

  const size = 400;
  const cellSize = size / cellCount;
  let paths = '';

  for (let row = 0; row < cellCount; row++) {
    for (let col = 0; col < cellCount; col++) {
      const cx = col * cellSize + cellSize / 2;
      const cy = row * cellSize + cellSize / 2;
      const r = cellSize * 0.38;
      const phase = (row + col) % 2 === 0;
      if (phase) {
        paths += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#g1)" opacity="0.85"/>`;
      } else {
        const r2 = r * 0.55;
        paths += `<rect x="${cx - r2}" y="${cy - r2}" width="${r2 * 2}" height="${r2 * 2}" rx="${r2 * 0.4}" fill="url(#g2)" opacity="0.7"/>`;
      }
    }
  }

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
