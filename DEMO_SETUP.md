# Skanda AI Demo Setup Guide

## Overview
This demo implements an AI Studio-style interface where users can:
1. **Generate Materials**: Describe battery requirements → Gemini interprets → HuggingFace generates microstructure
2. **Analyze Images**: Upload SEM images → Gemini Vision analyzes → Forward model predicts performance

## Architecture

```
User Input → Gemini 2.0 Flash → JSON Parameters → HuggingFace Model → Generated TIFF/Image
                ↓
         Reasoning & Physics Translation
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

#### Get Gemini API Key
1. Visit https://makersuite.google.com/app/apikey
2. Create a new API key
3. Add to `.env.local`: `GEMINI_API_KEY=your_key_here`

#### Get HuggingFace Token
1. Visit https://huggingface.co/settings/tokens
2. Create a new token with "read" access
3. Add to `.env.local`: `HUGGINGFACE_API_KEY=your_token_here`

#### Configure Model URLs
Replace the placeholder URLs with your actual HuggingFace model endpoints:

```env
# Inverse Diffusion Model (generates microstructures)
HUGGINGFACE_MODEL_URL=https://api-inference.huggingface.co/models/your-username/battery-inverse-model

# Forward Model (analyzes images and predicts performance)
HUGGINGFACE_FORWARD_MODEL_URL=https://api-inference.huggingface.co/models/your-username/battery-forward-model
```

### 3. Run the Development Server
```bash
npm run dev
```

Visit http://localhost:3000/demo

## API Endpoints

### `/api/generate-material`
**Purpose**: Generate battery microstructures from natural language

**Flow**:
1. User describes requirement (e.g., "I need a battery for a drone")
2. Gemini translates to physics parameters:
   ```json
   {
     "target_cycle_life": 1800,
     "target_capacity_fade_rate": 0.0003,
     "target_power_demand": 0.85,
     "reasoning": "Drone application requires high power..."
   }
   ```
3. Parameters sent to HuggingFace inverse model
4. Returns generated microstructure image

### `/api/analyze-image`
**Purpose**: Analyze uploaded SEM images

**Flow**:
1. User uploads SEM image (.tif, .png, .jpg)
2. Gemini Vision analyzes visual characteristics
3. Forward model predicts quantitative metrics:
   - Cycle life
   - Tortuosity
   - Porosity
4. Returns analysis with warnings

## HuggingFace Model Integration

### Expected Input Format (Inverse Model)
```json
{
  "inputs": {
    "target_cycle_life": 1500,
    "target_capacity_fade_rate": 0.0004,
    "target_power_demand": 0.7
  }
}
```

### Expected Output Format (Inverse Model)
- Binary image data (PNG/TIFF)
- Should return a 3D voxel visualization

### Expected Input Format (Forward Model)
```json
{
  "inputs": "<base64_encoded_image>"
}
```

### Expected Output Format (Forward Model)
```json
{
  "predicted_cycle_life": 1234,
  "tortuosity": 2.1,
  "porosity": 38.5
}
```

## Customization

### Modify System Prompt
Edit `app/api/generate-material/route.ts` - the `SYSTEM_PROMPT` constant controls how Gemini interprets user requests.

### Adjust Parameter Ranges
Update the ranges in the system prompt:
- `target_cycle_life`: 500-3000 cycles
- `target_capacity_fade_rate`: 0.0001-0.001 Ah/cycle
- `target_power_demand`: 0.0-1.0

### Add New Application Types
Add rules to the system prompt:
```
- If the user mentions "Grid Storage", set target_cycle_life > 2500 and target_power_demand < 0.3.
```

## Demo Examples

### Example 1: Drone Battery
**User Input**: "I need a battery anode for a high-performance delivery drone. It needs to charge in 10 minutes and last for 2,000 flights."

**Expected Flow**:
1. Gemini reasoning: "Drone application → High Power + High Cycle Life"
2. Parameters: `{cycle_life: 2000, power_demand: 0.88, fade_rate: 0.0003}`
3. Generated microstructure with low tortuosity
4. Predicted charge time: ~9.8 minutes

### Example 2: Image Analysis
**User Input**: Upload SEM image + "Will this electrode work for fast charging?"

**Expected Flow**:
1. Gemini Vision: Analyzes particle distribution, porosity
2. Forward model: Predicts cycle life (e.g., 1,234 cycles)
3. Warning if tortuosity > 2.5: "May reduce fast-charging capability"

## Troubleshooting

### Gemini API Errors
- Check API key is valid
- Verify you're using Gemini 2.0 Flash (or compatible model)
- Check rate limits: https://ai.google.dev/pricing

### HuggingFace Errors
- Ensure models are public or token has access
- Check model is loaded (first request may take 20-30s)
- Verify input/output formats match your model

### Image Upload Issues
- Supported formats: .tif, .tiff, .png, .jpg, .jpeg
- Max file size: Check Next.js config (default 4MB)
- TIFF support: May need additional processing

## Production Deployment

### Environment Variables
Set all variables in your hosting platform (Vercel, Netlify, etc.)

### API Rate Limits
- Gemini: Monitor usage at https://makersuite.google.com
- HuggingFace: Consider dedicated endpoints for production

### Caching
Consider caching common requests to reduce API calls:
```typescript
// Add to API routes
const cache = new Map();
if (cache.has(prompt)) {
  return cache.get(prompt);
}
```

## Next Steps

1. **Connect Your Models**: Replace placeholder URLs with actual HuggingFace endpoints
2. **Test Integration**: Try example prompts to verify end-to-end flow
3. **Customize Branding**: Update colors, logos in `app/demo/page.tsx`
4. **Add Analytics**: Track user interactions for demo insights
5. **Performance Optimization**: Add loading states, error boundaries

## Support

For issues with:
- **Gemini API**: https://ai.google.dev/docs
- **HuggingFace**: https://huggingface.co/docs
- **Next.js**: https://nextjs.org/docs
