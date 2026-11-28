export const careerRoles = [
  {
    id: "gpu-tpu-systems",
    title: "Member of Technical Staff — GPU/TPU Systems & Kernels",
    skills: "Triton, Pallas/JAX, CUDA, multi-node HPC",
    description: "Build the kernels and distributed systems behind our scientific workloads. Own performance from the hardware to a reproducible benchmark, with numerical correctness intact.",
    requirements: ["Write and profile GPU/TPU kernels against trusted references", "Diagnose precision drift, memory bottlenecks, and distributed failures", "Use agents to accelerate work, then verify the result yourself"],
    gate: "systems",
  },
  {
    id: "frontier-models",
    title: "Member of Technical Staff — Frontier Models & Scientific ML",
    skills: "Sparse MoEs, scientific tokenizers, fail-closed evaluation",
    description: "Build foundation models and scientific representations that survive adversarial evaluation. Own the experiment, the training system, and the evidence behind every claim.",
    requirements: ["Build sparse models and physically meaningful representations", "Design falsification tests that expose leakage and misleading metrics", "Take an ambiguous research question through to verified evidence"],
    gate: "science",
  },
  {
    id: "computational-physics-biologics",
    title: "Member of Technical Staff — Computational Physics & Biologics",
    skills: "CFD, molecular dynamics, structural biology, differentiable solvers",
    description: "Connect numerical physics and biology to models we can trust. Build solvers, design controls, and test whether a convincing result survives changes in precision, scale, and representation.",
    requirements: ["Build and validate physical or biological simulation workflows", "Distinguish numerical agreement from physical correctness", "Own hard problems across scientific and software boundaries"],
    gate: "science",
  },
  {
    id: "wildcard",
    title: "Wildcard — Exceptional Builders / Former Founders",
    skills: "Don’t fit a box? Show us the hardest thing you’ve built from scratch.",
    description: "Bring a problem you have owned from zero to something real. We care about initiative, depth, and proof that you can build under uncertainty.",
    requirements: ["Show one substantial artifact you personally shipped", "Explain the failures you found and the decisions you owned", "Choose either micro-gate and show how you think"],
    gate: "either",
  },
] as const;

export type MicroGate = "systems" | "science";
export const PROOF_WORD_LIMIT = 120;

export const microGates = {
  systems: {
    version: "gpu-timing-v1",
    title: "Systems / GPU",
    prompt: "What’s silently wrong with this benchmark? Explain the failure, how you would fix it, and how you would verify the measurement. Answer in 4 sentences.",
    code: `import time
import torch

device = "cuda"
x = torch.randn(4096, 4096, device=device)
w = torch.randn(4096, 4096, device=device)

for _ in range(20):
    y = x @ w
torch.cuda.synchronize()
start = time.perf_counter()
for _ in range(100):
    y = x @ w
elapsed_ms = (time.perf_counter() - start) * 1e3 / 100
print(f"{elapsed_ms:.3f} ms per matmul")`,
  },
  science: {
    version: "scientific-claims-v1",
    title: "ML / Science",
    prompt: "Give 3 falsification tests you would run to try to break this claim. For each, state what you would change or hold out, what you would measure, and what result would falsify the claim.",
    claim: "Our protein tokenizer reconstructs held-out structures with 0.01 Å mean error using temperature conditioning. The evaluation set contains 10,000 rows with unique SHA-256 hashes. Reconstruction error stays low after random rotations, so the representation is rotation-invariant and generalizes to new proteins.",
  },
} as const;
