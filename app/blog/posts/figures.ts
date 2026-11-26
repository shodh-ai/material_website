import type { FigureSpec, Panel } from "./scientific-figure";
import tf32Data from "./tf32-figure-data.json";

const stepwiseDomain = Array.from({ length: 1600 }, (_, index) => index + 1);
const baselineLabel = "Original JAX · FP64";
const defaultLabel = "Original JAX · default TF32";
const highestLabel = "Original JAX · FP32 highest";
const pallasLabel = "Fused Pallas · FP32";

export const axialVelocity: FigureSpec = {
  title: "TF32 leaves a faster axial flow",
  subtitle: "128³ lattice · matched initial state · 1,600 coupled steps",
  panels: [
    {
      kind: "line", title: "Mean axial velocity (mm/s)", domain: tf32Data.frames, unit: "mm/s", digits: 6,
      series: [
        { label: defaultLabel, values: tf32Data.velocity.tf32, tone: 2 },
        { label: baselineLabel, values: tf32Data.velocity.fp64, tone: 3 },
        { label: highestLabel, values: tf32Data.velocity.highest, tone: 0 },
        { label: pallasLabel, values: tf32Data.velocity.pallas, tone: 1 },
      ],
    },
    {
      kind: "line", title: "FP32 velocity difference from FP64 (µm/s)", domain: tf32Data.frames, unit: "µm/s", digits: 6,
      series: [
        { label: highestLabel, values: tf32Data.residual.highest, tone: 0 },
        { label: pallasLabel, values: tf32Data.residual.pallas, tone: 1 },
      ],
    },
  ],
};

function stepwisePanel(title: string, unit: string, data: typeof tf32Data.impulse): Panel {
  return {
    kind: "line", title, unit, domain: stepwiseDomain, digits: 6,
    series: [
      { label: defaultLabel, values: data.tf32, tone: 2 },
      { label: highestLabel, values: data.highest, tone: 0 },
      { label: baselineLabel, values: data.fp64, tone: 3 },
    ],
  };
}

export const stepwiseDrift: FigureSpec = {
  title: "Tracking the excess momentum through the rollout",
  subtitle: "Fluid-cell means from the instrumented 128³ solver · all 1,600 steps",
  panels: [
    stepwisePanel("Collision impulse above applied force (×10⁻⁶)", "×10⁻⁶", tf32Data.impulse),
    stepwisePanel("Post-stream axial momentum vs FP64 (×10⁻³)", "×10⁻³", tf32Data.momentum),
    stepwisePanel("Post-stream mass vs FP64 (×10⁻⁶)", "×10⁻⁶", tf32Data.mass),
    stepwisePanel("Normal stress σₓₓ vs FP64 (×10⁻⁶)", "×10⁻⁶", tf32Data.stress),
  ],
};

export const reactorBreakdown: FigureSpec = {
  title: "Where the reactor step spent its time",
  subtitle: "H100 · 128³ grid · eight samples per batch · selected sections of the July profiles",
  panels: [
    {
      kind: "bar", title: "Milliseconds per step", max: 50,
      rows: [
        { label: "Transport · original eager", value: 48.11, display: "48.11 ms", tone: 3 },
        { label: "Transport · fused Triton", value: 1.40, display: "1.40 ms" },
        { label: "Reaction + update · original", value: 10.71, display: "10.71 ms", tone: 3 },
        { label: "Reaction + update · Triton", value: 1.53, display: "1.53 ms" },
        { label: "Snapshot save · original", value: 12.08, display: "12.08 ms", tone: 3 },
        { label: "Snapshot save · Triton", value: 9.85, display: "9.85 ms" },
      ],
      note: "The original stencil timer includes the state stack. The Triton timer measures the fused call. Both save timings come from synchronized profiles with different save harnesses.",
    },
  ],
};

export const stencil: FigureSpec = {
  title: "The seven field values in a stencil update",
  subtitle: "A program selects one field, sample, z plane and y row, then processes a contiguous x tile.",
  diagram: "stencil",
};

export const reactorReplayRounds = [
  { original: 1954.933893, chunk4: 524.316537, chunk8: 785.383860 },
  { original: 1902.530318, chunk4: 820.890659, chunk8: 3030.166667 },
  { original: 1557.710669, chunk4: 649.069775, chunk8: 1164.083052 },
].map(({ original, chunk4, chunk8 }, index) => ({
  round: index + 1,
  original,
  chunk4,
  chunk8,
  chunk8Speedup: original / chunk8,
}));

export const medianReactorSpeedup = reactorReplayRounds
  .map(({ chunk8Speedup }) => chunk8Speedup)
  .sort((a, b) => a - b)[1].toFixed(2);

const wallTimeFormat = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatReactorWallTime(seconds: number) {
  return `${wallTimeFormat.format(seconds)} s`;
}

export const reactorPipeline: FigureSpec = {
  title: "Eight-GPU pipeline elapsed time",
  subtitle: "Three rounds on the same H100 node · 256 samples per configuration · common time scale",
  panels: reactorReplayRounds.map(({ round, original, chunk4, chunk8 }) => ({
    kind: "bar",
    title: `Round ${round}`,
    max: 3200,
    alignValues: true,
    rows: [
      { label: "Original GPU pipeline", value: original, display: formatReactorWallTime(original), tone: 3 },
      { label: "Triton · chunk 4", value: chunk4, display: formatReactorWallTime(chunk4), tone: 2 },
      { label: "Triton · chunk 8", value: chunk8, display: formatReactorWallTime(chunk8), tone: 1 },
    ],
  })),
};

export const componentPresence: FigureSpec = {
  title: "Adding a component-presence check changed which checkpoint passed",
  subtitle: "Original selection at 30,000 steps · guarded selection at 20,000 steps",
  panels: [
    {
      kind: "bar", title: "Candidates out of 1,000", max: 1000,
      rows: [
        { label: "Collision check · original", value: 1000, display: "1,000", tone: 2 },
        { label: "Collision check · guarded", value: 1000, display: "1,000" },
        { label: "Shaft and blades present · original", value: 0, display: "0", tone: 2 },
        { label: "Shaft and blades present · guarded", value: 1000, display: "1,000" },
        { label: "Full combined check · original", value: 0, display: "0", tone: 2 },
        { label: "Full combined check · guarded", value: 193, display: "193" },
      ],
    },
  ],
};

export const tokenSwap: FigureSpec = {
  title: "What changed when the decoder received another frame’s tokens",
  panels: [
    {
      kind: "bar", title: "V1 · change in reconstruction error", min: -0.002, max: 0.8,
      rows: [
        { label: "Same trajectory · family A", value: 0.0089, display: "+0.0089%" },
        { label: "Same trajectory · family B", value: -0.0002, display: "−0.0002%" },
        { label: "Other family · largest change", value: 0.71, display: "+0.71%", tone: 3 },
      ],
    },
    {
      kind: "bar", title: "V2 · wrong-frame error ÷ own-frame error (log scale)", min: 1, max: 10000, log: true,
      rows: [
        { label: "Acceptance threshold", value: 2, display: "2×", tone: 2 },
        { label: "Sealed holdout · minimum", value: 2315, display: "2,315×" },
        { label: "Sealed holdout · maximum", value: 8331, display: "8,331×" },
      ],
      note: "The sealed holdout contained six trajectories.",
    },
  ],
};

export const rotationRepair: FigureSpec = {
  title: "The rotation repair increased velocity error",
  panels: [
    {
      kind: "bar", title: "Repair pilot error ÷ baseline error (log scale)", min: 0.8, max: 50, log: true,
      rows: [
        { label: "Velocity nRMSE", value: 0.26916 / 0.00832, display: "32×", tone: 2 },
        { label: "Force log-norm nRMSE", value: 0.03044 / 0.02245, display: "1.36×" },
        { label: "Position RMSE", value: 0.14384 / 0.14261, display: "1.01×" },
      ],
    },
  ],
};

export const scenarioCounts: FigureSpec = {
  title: "Byte-unique rows came from 48 physical setups",
  panels: [
    {
      kind: "bar", title: "Counts",
      rows: [
        { label: "Stored rows with unique hashes", value: 8400, display: "8,400", tone: 3 },
        { label: "Trajectory exports", value: 1200, display: "1,200", tone: 3 },
        { label: "Setup × frame combinations", value: 336, display: "336", tone: 3 },
        { label: "Distinct physical setups", value: 48, display: "48", tone: 2 },
      ],
    },
  ],
};

export const convergence: FigureSpec = {
  title: "Grid refinement failed both numerical gates",
  panels: [
    {
      kind: "bar", title: "Predicted breakthrough time", max: 400,
      rows: [
        { label: "64³ grid", value: 355.10, display: "355.10 s" },
        { label: "128³ grid", value: 313.10, display: "313.10 s" },
      ],
      note: "The predicted time changed 13.41%, exceeding the ±5% allowance around the fine-grid value.",
    },
    {
      kind: "bar", title: "Spatial convergence order", max: 2,
      rows: [
        { label: "Observed", value: 1.208, display: "1.208", tone: 2 },
        { label: "Required", value: 1.6, display: "1.6", tone: 3 },
      ],
    },
  ],
};

export const equivalentCells: FigureSpec = {
  title: "Two valid unit cells for the same pattern",
  diagram: "cell",
};
