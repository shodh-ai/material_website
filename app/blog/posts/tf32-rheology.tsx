import { ScientificFigure } from "./scientific-figure";
import { axialVelocity, stepwiseDrift } from "./figures";

export const tf32Sections = [
  { id: "the-same-flow-at-four-precision-settings", title: "The same flow, at four precision settings" },
  { id: "where-the-extra-momentum-came-from", title: "Where the extra momentum came from" },
  { id: "a-weight-offset-suppresses-the-bias", title: "A weight offset suppresses the bias" },
  { id: "accuracy-against-fp64", title: "Accuracy against FP64" },
  { id: "speed-at-matched-precision", title: "Speed at matched precision" },
  { id: "what-the-fused-pallas-kernel-does", title: "What the fused Pallas kernel does" },
  { id: "from-kernel-speed-to-pipeline-speed", title: "From kernel speed to pipeline speed" },
];

export default function Tf32Rheology() {
  return (
    <>
      <p>On NVIDIA GPUs, JAX can lower eligible FP32 dot and einsum contractions to TF32 by default. Tensor Cores round the operands to 10 fraction bits, down from FP32’s 23, before accumulating in FP32. Setting JAX’s default matmul precision to “highest” when compiling the solver requests full FP32 precision for those contractions. <a href="https://docs.jax.dev/en/latest/201/precision.html">JAX matmul precision</a></p>

      <p>In our H100 replay, default TF32 saved <strong>7% of simulation time</strong> (3.34 vs. 3.59 s/sample), while final mean axial velocity was <strong>3.13×</strong> and kinetic energy was <strong>9.85×</strong> the FP64 result. FP32 highest and fused Pallas each had about <strong>0.016% pooled axial-velocity nRMSE</strong> and <strong>0.16% final mean-velocity error</strong> against FP64. TF32 had <strong>20.5% pooled error</strong> and <strong>212.6% endpoint error</strong>. Pallas ran the FP32 simulation <strong>9.10× faster</strong> than the precision-matched original.</p>

      <p>Checking a solver for this takes one comparison: compile the same rollout once at default and once at highest matmul precision, run both from the same initial state, and compare the outputs.</p>

      <h2 id="the-same-flow-at-four-precision-settings">The same flow, at four precision settings</h2>

      <p>D3Q19 lattice Boltzmann represents the fluid at each 3D grid cell with 19 populations, one for each discrete velocity. Their sum gives density, and their signed first moment gives momentum. We replayed the coupled non-Newtonian and particulate case on a 128³ grid for 1,600 steps with matched initial conditions. The FP64 control used FP64 state and weights. A second FP64 run promoted the archived FP32 weights, testing the effect of their representation.</p>

      <ScientificFigure spec={axialVelocity} caption={"Figure 1. Fluid-cell mean axial velocity. The lower panel magnifies the FP32 differences from the FP64 discrete reference."} />

      <h2 id="where-the-extra-momentum-came-from">Where the extra momentum came from</h2>

      <p>For a low-Mach flow, each moving population sits near a positive D3Q19 weight, typically 1/18 or 1/36. Opposite populations have the same weight and opposite signs in the axial moment. Their small flow perturbations therefore enter the signed sum after the two larger populations have rounded. Near each weight, the exponent and quantization spacing stay nearly fixed. Opposing perturbations can cross rounding thresholds at different points, producing a signed residual. The rounding uses nearest with ties away from zero. <a href="https://docs.nvidia.com/cuda/parallel-thread-execution/index.html">NVIDIA PTX instruction set</a></p>

      <p>On the 16 TF32 trajectory states at steps 0, 100, …, 1,500, summed rounding error averaged <strong>+2.44×10</strong><sup>−6</sup> for forward populations and <strong>−1.76×10</strong><sup>−6</sup> for backward populations per fluid cell. Their difference matched the measured device-dot bias of <strong>+4.19×10</strong><sup>−6</sup> and was positive at <strong>15 of 16</strong> states. The corresponding bias on FP32-highest trajectory states changed sign. In the full TF32 rollout, the mean collision impulse was <strong>4.27×10</strong><sup>−6</sup> per step versus <strong>6.00×10</strong><sup>−7</sup> in FP64, with excess impulse on <strong>1,579 of 1,600</strong> steps.</p>

      <div role="region" aria-labelledby="tf32-table-1" tabIndex={0}>
        <table>
          <caption id="tf32-table-1">Table 1. Mean change in pre-stream axial impulse versus all-highest, per fluid cell in lattice units. Both columns use 16 states with the same sampling schedule. FP64 states were cast to FP32 before each paired one-step comparison.</caption>
          <thead><tr><th scope="col"><strong>FP32 contraction ablation</strong></th><th scope="col"><strong>TF32 trajectory states</strong></th><th scope="col"><strong>FP64 trajectory states</strong></th></tr></thead>
          <tbody>
            <tr><th scope="row">All three at default</th><td>+3.56×10<sup>−6</sup></td><td>−8.61×10<sup>−8</sup></td></tr>
            <tr><th scope="row">Momentum only at default</th><td>+4.00×10<sup>−6</sup></td><td>−7.22×10<sup>−8</sup></td></tr>
            <tr><th scope="row">Equilibrium only at default</th><td>−5.40×10<sup>−10</sup></td><td>−1.58×10<sup>−9</sup></td></tr>
            <tr><th scope="row">Stress/shear only at default</th><td>+9.93×10<sup>−13</sup></td><td>+3.92×10<sup>−13</sup></td></tr>
            <tr><th scope="row">Momentum highest, others default</th><td>−5.41×10<sup>−10</sup></td><td>−1.58×10<sup>−9</sup></td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="a-weight-offset-suppresses-the-bias">A weight offset suppresses the bias</h2>

      <p>Lehmann et al. studied this loss of precision in lattice Boltzmann and describe subtracting the lattice weights before storing or computing with populations. The weights contribute zero net momentum by symmetry, so we tested the default-precision moment on f − w using the same 16 frozen states and an FP64 contraction of the original populations as the reference. The offset reduced signed bias from <strong>+4.19×10</strong><sup>−6</sup> <strong>to +1.08×10</strong><sup>−8</sup> <strong>(390×)</strong> and per-cell RMS error from <strong>1.81×10</strong><sup>−5</sup> <strong>to 8.75×10</strong><sup>−7</sup> <strong>(20.7×)</strong>. This test isolates the momentum contraction. <a href="https://doi.org/10.1103/PhysRevE.106.015308">Lehmann et al., Phys. Rev. E 106, 015308 (2022)</a></p>

      <ScientificFigure spec={stepwiseDrift} caption={"Figure 2. Fluid-cell means over the full rollout, in lattice units. The stress panel shows the normal stress diagnostic."} />

      <h2 id="accuracy-against-fp64">Accuracy against FP64</h2>

      <div role="region" aria-labelledby="tf32-table-2" tabIndex={0}>
        <table>
          <caption id="tf32-table-2">Table 2. Pooled nRMSE is RMS error divided by FP64 RMS across fluid cells and all 16 saved frames. Endpoint error is the absolute relative difference in fluid-mean axial velocity at step 1,600. The pooled result gives more weight to early high-velocity frames, when the FP64 mean is about 13.6 mm/s. The final FP64 mean is 0.732359 mm/s.</caption>
          <thead><tr><th scope="col">Solver</th><th scope="col">Axial velocity nRMSE</th><th scope="col">Final mean velocity error</th><th scope="col">Shear nRMSE</th><th scope="col">Stress xx / zz nRMSE</th></tr></thead>
          <tbody>
            <tr><th scope="row">Original JAX, default TF32</th><td>20.4677%</td><td>212.64%</td><td>20.9564%</td><td>67.5546% / 101.7141%</td></tr>
            <tr><th scope="row">Original JAX, FP32 highest</th><td>0.0158%</td><td>0.1593%</td><td>0.0160%</td><td>0.1891% / 0.4206%</td></tr>
            <tr><th scope="row">Fused Pallas, FP32</th><td>0.0159%</td><td>0.1600%</td><td>0.0162%</td><td>0.2950% / 0.6680%</td></tr>
            <tr><th scope="row">FP64, promoted FP32 weights</th><td>0.0001%</td><td>0.00007%</td><td>0.0005%</td><td>0.0495% / 0.1883%</td></tr>
          </tbody>
        </table>
      </div>

      <p>Pallas matches the channel-major FP32 JAX rewrite bit for bit in the tested frames. Its small stress differences from the original JAX solver are consistent with different summation order and multiply-add contraction in the local stress update.</p>

      <p>The 64³ check used the step-1,600 fluid-mean axial velocity against the 64³ FP64 run. The endpoint error was <strong>0.0267%</strong> for FP32 highest and <strong>246.16%</strong> for default TF32. This second grid tests precision sensitivity.</p>

      <h2 id="speed-at-matched-precision">Speed at matched precision</h2>

      <div role="region" aria-labelledby="tf32-table-3" tabIndex={0}>
        <table>
          <caption id="tf32-table-3">Table 3. One H100 SXM, batch of four, grid 128³, 100 steps per frame. Each run timed eight synchronized frames after two warmup frames. The time is scaled to 1,600 steps and excludes compilation and output. GLUPS counts billions of lattice updates per second, including masked wall cells.</caption>
          <thead><tr><th scope="col"><strong>Implementation</strong></th><th scope="col"><strong>Two runs, s/sample</strong></th><th scope="col"><strong>Mean s/sample</strong></th><th scope="col"><strong>GLUPS</strong></th></tr></thead>
          <tbody>
            <tr><th scope="row">Original JAX, default TF32</th><td>3.3356, 3.3363</td><td>3.3359</td><td>1.006</td></tr>
            <tr><th scope="row">Original JAX, FP32 highest</th><td>3.5913, 3.5911</td><td>3.5912</td><td>0.934</td></tr>
            <tr><th scope="row">Fused Pallas, FP32</th><td>0.3945, 0.3950</td><td>0.3948</td><td>8.500</td></tr>
          </tbody>
        </table>
      </div>

      <p>The uniquely addressed FP32 data per step, including halo accesses and counting the wall mask once per batch, is <strong>182.5 B/update</strong> for the fused fluid kernel and <strong>25.7 B/update</strong> for particle transport. At 0.395 s/sample this implies <strong>1.77 TB/s effective bandwidth</strong>, or <strong>52.8%</strong> of the H100 SXM’s 3.35 TB/s peak. Hardware HBM performance counters were restricted in the container environment, so bandwidth is reported from the source-derived unique-address traffic model. <a href="https://docs.nvidia.com/enterprise-reference-architectures/hgx-ai-factory-h100-h200-b200/latest/components.html">NVIDIA H100 specifications</a></p>

      <h2 id="what-the-fused-pallas-kernel-does">What the fused Pallas kernel does</h2>

      <p>The original JAX loop launched 17 kernels and one buffer copy per step. A gather-and-transpose kernel took 62.5% of simulation time. The Pallas rewrite lays out each direction contiguously and brings the 19 upstream populations into a tile, where it computes collision and rheology. The GPU writes the updated populations once.</p>

      <p>Each tile covers a strip of grid cells. For each of the 19 directions it pulls the upstream population, substitutes the lattice weight at wall cells, and then runs the FP32 collision and rheology update using the same operation order as the channel-major reference. The full kernel also writes shear, velocity, relaxation time and the periodic streamwise halo.</p>

      <p>The output buffer is aliased to a spare input buffer, so the kernel writes into the destination buffer while all tiles can still read their neighbours from the old state. The time loop alternates the two buffers across steps. A second kernel advances particles using the new velocity and shear. <a href="https://docs.jax.dev/en/latest/_autosummary/jax.experimental.pallas.pallas_call.html">Pallas kernel calls and aliasing</a></p>

      <h2 id="from-kernel-speed-to-pipeline-speed">From kernel speed to pipeline speed</h2>

      <p>The 32-sample pipeline improved from <strong>5.54 to 3.74 s/sample (1.48×)</strong>. The separate simulation benchmark accounts for <strong>10.6%</strong> of the optimized total by arithmetic. The remainder includes derivation, transfers, audit, hashing, storage, and setup, with overlap between stages. With that remainder held fixed, eliminating the isolated simulation time would raise throughput by at most <strong>1.12×</strong>.</p>

      <p>The production reference enforces highest matmul precision, disables TF32, and requires FP64 transport. The fused FP32 Pallas kernel is a validated benchmark implementation. It delivers <strong>9.10×</strong> simulation speedup against the original FP32-highest solver at <strong>8.50 GLUPS</strong>, with bitwise parity to the channel-major FP32 rewrite on the tested frames.</p>
    </>
  );
}
