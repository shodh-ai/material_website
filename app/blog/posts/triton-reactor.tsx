import { ScientificFigure } from "./scientific-figure";
import { reactorBreakdown, stencil, reactorPipeline } from "./figures";

export const tritonSections = [
  { id: "why-exact-outputs-matter", title: "Why exact outputs matter" },
  { id: "where-the-time-went", title: "Where the time went" },
  { id: "the-stencil-kernel", title: "The stencil kernel" },
  { id: "matching-every-bit", title: "Matching every bit" },
  { id: "benchmarking-against-torch-compile", title: "Benchmarking against torch.compile" },
  { id: "scaling-to-eight-h100s", title: "Scaling to eight H100s" },
  { id: "the-full-pipeline-result", title: "The full-pipeline result" },
  { id: "results", title: "Results" },
  { id: "what-made-it-work", title: "What made it work" },
  { id: "how-we-measured", title: "How we measured" },
];

export default function TritonReactor() {
  return (
    <>
      <p>In a same-node replay on eight NVIDIA H100s, our optimized reactor data pipeline processed <strong>256 samples in 785.38 seconds</strong>, down from <strong>1,954.93 seconds</strong> for the original GPU pipeline. That is <strong>2.49× throughput</strong> with matching SHA-256 digests for raw trajectories, interface fluxes, and metadata on all 256 samples.</p>

      <ul>
        <li><strong>2.49×</strong> Eight-H100 throughput · 1,954.93 to 785.38 s</li>
        <li><strong>36.1×</strong> Transport stencil · 47.387 to 1.314 ms</li>
        <li><strong>7.0×</strong> Reaction update · 10.71 to 1.53 ms</li>
        <li><strong>64.6%</strong> Lower peak memory · 13.883 to 4.914 GB</li>
      </ul>

      <h2 id="why-exact-outputs-matter">Why exact outputs matter</h2>

      <p>We generate synthetic stirred-tank reactor trajectories to train and evaluate our physics tokenizer, which encodes evolving fields for downstream models. The solver advances eight transported fields on a 128³ grid: three reactants, the desired product, two byproducts, temperature, and residence time.</p>

      <p>Transport, heat, a reaction network, and an analytic velocity and pressure closure run on the GPU. The solver advances the state in FP64 to preserve the arithmetic of the NumPy reference through repeated updates, then stores the fields in FP32.</p>

      <p>The acceptance contract compares raw trajectories, interface flux, and metadata by sample ID. The full-node test exposed a difference in one reduction diagnostic that a field-only comparison would have missed.</p>

      <h2 id="where-the-time-went">Where the time went</h2>

      <p>The original solver already batched samples on the GPU in eager PyTorch. Advection and diffusion ran as a chain of full-array operations, repeatedly writing and reading neighbour values, masks, gradients, and intermediates. Transport alone accounted for 64.3% of the profiled step.</p>

      <ScientificFigure spec={reactorBreakdown} caption={"Figure 1. Archived solver profiles. The transport section fell from 48.11 to 1.40 ms per step, and reaction and update fell from 10.71 to 1.53 ms. The original transport timer includes state stacking; isolated stencil timings appear in the torch.compile benchmark below."} />

      <h2 id="the-stencil-kernel">The stencil kernel</h2>

      <p>We packed the state into a single [field, batch, z, y, x] buffer. One Triton program handles a contiguous run of 128 x cells for one row and one field-sample pair. It loads the centre and six neighbours, accumulates upwind advection and the Laplacian, and writes the transport result once.</p>

      <ScientificFigure spec={stencil} caption={"Figure 2. The centre and six axial neighbours, with flattened element offsets relative to the centre address."} />

      <p>The grid bounds control which neighbour addresses may be read. For each direction, the kernel loads the neighbour and its active-cell flag, and substitutes the centre value when the neighbour is outside the grid or inactive, matching the reference's no-flux rule. It then takes the upwind difference selected by the sign of the local velocity for advection, and accumulates the Laplacian for diffusion in the reference's exact operation order. The y and z passes follow the same pattern with element offsets of ±X and ±(Y × X).</p>

      <p>At production shape, each launch covers 16,384 rows for each of the 64 field-sample pairs, with 128-cell blocks and four warps per program. A separate kernel fuses reaction rates, source terms, and state updates, replacing about 60 pointwise launches with one.</p>

      <h2 id="matching-every-bit">Matching every bit</h2>

      <h3 id="controlled-rounding">Controlled rounding</h3>

      <p>A fused multiply-add rounds once. The eager multiply and add sequence rounds twice. We disable floating-point fusion in the Triton compile and preserve the reference operation order, including the order of the two Laplacian additions. <a href="https://docs.nvidia.com/cuda/floating-point/index.html">NVIDIA floating-point guide</a></p>

      <h3 id="matched-division">Matched division</h3>

      <p>On the tested H100 PyTorch CUDA path, division by a Python scalar used multiplication by its reciprocal. Triton receives the same precomputed reciprocals of the grid spacing and its square as FP64 values on the device, so both paths perform identical arithmetic.</p>

      <h3 id="bitwise-testing">Bitwise testing</h3>

      <p>At the stencil level, outputs are compared as raw 64-bit patterns against the eager GPU output, so a difference in even one bit fails the test. The validation also covered full 640-step reaction and update rollouts and the stored FP32 output against NumPy at 32³, 48³, and 128³. The pipeline comparison checks a separate, downstream contract by matching per-sample trajectory, flux, and metadata digests.</p>

      <h2 id="benchmarking-against-torch-compile">Benchmarking against torch.compile</h2>

      <p>We used archived stencil functions on one H100 with a 128³ grid, eight samples, eight FP64 fields, and identical synthetic inputs. The reported latency is the median of nine rounds after warmup.</p>

      <div role="region" aria-label="Isolated stencil benchmark" tabIndex={0}>
        <table>
          <thead><tr><th scope="col"><strong>Stencil implementation</strong></th><th scope="col"><strong>Median ms/call</strong></th><th scope="col"><strong>vs. eager</strong></th><th scope="col"><strong>Bit-exact</strong></th></tr></thead>
          <tbody>
            <tr><th scope="row">Eager PyTorch</th><td>47.387</td><td>1.0×</td><td>Reference</td></tr>
            <tr><th scope="row">torch.compile, default</th><td>1.343</td><td>35.3×</td><td>No</td></tr>
            <tr><th scope="row">torch.compile, precision emulation</th><td>1.404</td><td>33.8×</td><td>Yes</td></tr>
            <tr><th scope="row"><strong>Handwritten Triton</strong></th><td><strong>1.314</strong></td><td><strong>36.1×</strong></td><td><strong>Yes</strong></td></tr>
          </tbody>
        </table>
      </div>

      <p>Default Inductor differed on 29,434,441 of 134,217,728 FP64 stencil values, with a maximum absolute error of 2.84 × 10<sup>−14</sup>. With precision-cast emulation enabled, Inductor matched eager bit for bit, within 7% of the handwritten kernel, which makes it a strong option for new stencils. We wrote the Triton kernel before testing that mode; it had the lowest measured latency, and its timing benefits slightly from writing into a preallocated output buffer. <a href="https://pytorch.org/docs/stable/torch.compiler.html">torch.compile</a> · <a href="https://triton-lang.org/main/index.html">Triton</a></p>

      <p>Reading and writing the eight FP64 fields for eight samples accounts for 2.15 GB per call. Dividing by 1.314 ms gives 1.63 TB/s of effective field I/O.</p>

      <h2 id="scaling-to-eight-h100s">Scaling to eight H100s</h2>

      <p>Each GPU runs its own campaign. The optimized pipeline packs ten snapshot arrays into one device-to-host copy on a side stream, using a reusable pinned host buffer. The GPU accumulates reaction-check failures and the runner checks them at save boundaries and before completion.</p>

      <p>Overlapping CPU packing, audit, and writes can keep two sub-batches live per campaign. The first eight-campaign attempt exceeded the 256 GB host-memory allocation, so we replayed the original, chunk-4, and chunk-8 configurations under the same allocation on a single node.</p>

      <p>Chunk 4 completed in 524.32 s (3.73×). All trajectory and flux digests matched, while 41 of 256 metadata digests differed. The only changed metadata field was the reaction-extent diagnostic: 34 values differed by one unit in the last place (ULP) and seven by two.</p>

      <h2 id="the-full-pipeline-result">The full-pipeline result</h2>

      <p>Chunk 8 finished in <strong>785.38 s (2.49×)</strong> with matching trajectory, flux, and metadata digests on all 256 samples. It retained asynchronous snapshots, used serial sub-batch output processing, and ran two flux workers per campaign.</p>

      <ScientificFigure spec={reactorPipeline} caption={"Figure 3. Launcher wall time on one eight-H100 node. Chunk 8 matched all 256 samples in all three digest categories."} />

      <p>We chose chunk 8. Chunk 4 was faster, but its reaction-extent diagnostic differed by one or two ULPs in 41 samples, so its output was not byte-identical to the reference. Keeping every byte identical cost 1.5× of potential speed, and checking metadata alongside the fields is what made that choice visible.</p>

      <p>The remaining time is on the host. After the 12.0× solver speedup (269.27 s to 22.46 s per eight samples), host-side packing, flux calculation, auditing, and disk writes make up about 80% of the 111 s single-GPU pipeline. On the eight-GPU node, chunk 4 overlaps that host stage across sub-batches and reaches 3.73× (524.32 s), nearly matching the 3.9× single-GPU gain. Chunk 8 preserves the original eight-sample reduction shape, and to stay within the node's 256 GB host-memory allocation it processes sub-batch output serially, which adds 261.06 s (785.38 s, 2.49×).</p>

      <h2 id="results">Results</h2>

      <div role="region" aria-labelledby="triton-results" tabIndex={0}>
        <table>
          <caption id="triton-results">Solver execution includes snapshot handling. The single-GPU pipeline row is the archived eight-sample runner comparison.</caption>
          <thead><tr><th scope="col"><strong>Workload</strong></th><th scope="col"><strong>Original</strong></th><th scope="col"><strong>Triton</strong></th><th scope="col"><strong>Change</strong></th><th scope="col"><strong>Scope</strong></th></tr></thead>
          <tbody>
            <tr><th scope="row">Transport stencil, batch 8</th><td>47.387 ms</td><td>1.314 ms</td><td>36.1×</td><td>Bit-exact</td></tr>
            <tr><th scope="row">Reaction + update, per step</th><td>10.71 ms</td><td>1.53 ms</td><td>7.0×</td><td>Archived profiles</td></tr>
            <tr><th scope="row">Peak GPU allocated memory</th><td>13.883 GB</td><td>4.914 GB</td><td>−64.6%</td><td>Same-GPU solver run</td></tr>
            <tr><th scope="row">Solver execution, 8 samples</th><td>269.27 s</td><td>22.46 s</td><td>12.0×</td><td>Same-GPU solver run</td></tr>
            <tr><th scope="row">Single-GPU pipeline, 8 samples</th><td>428 s</td><td>111 s</td><td>3.9×</td><td>8/8 digests match</td></tr>
            <tr><th scope="row">Eight-GPU pipeline, 256 samples</th><td>1,954.93 s</td><td>785.38 s</td><td>2.49×</td><td>256/256 digests match</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="what-made-it-work">What made it work</h2>

      <p>The 36.1× stencil gain translated to 2.49× full-pipeline throughput. Treating transfers, host memory, audit, and storage as part of the system made that gain usable. Checking metadata alongside the fields made the chunk-size trade-off visible.</p>

      <h2 id="how-we-measured">How we measured</h2>

      <p><strong>Reproduction.</strong> A pinned reproduction checkpoint holds the archived GPU runners and solvers, source hashes, replay scripts, and campaign manifests. Because the original runs did not record shared-helper hashes, the helpers are pinned to a July repository snapshot; the staged helpers reproduced all eight archived campaign configurations.</p>

      <p><strong>Isolated measurements.</strong> The stencil test used an H100 80 GB SXM with PyTorch 2.10.0+cu128 and Triton 3.6.0. CUDA events timed nine rounds of eight calls after warmup. The reaction-update comparison comes from archived section profiles. Both pinned solvers ran on the same H100 with a 128³ grid, eight samples in one chunk, 640 steps, and snapshots every 40 steps. Peak memory is PyTorch's maximum allocated device memory.</p>

      <p><strong>Eight-H100 verification.</strong> Eight concurrent campaigns of 32 samples ran on one node with 64 requested CPUs and 256 GB of requested host memory. Launcher wall time ends when the final campaign process exits. We rehashed all 24 saved campaign manifests, joined rows by sample ID, and compared SHA-256 digests for packed trajectories, interface fluxes, and metadata. The chunk-4 ULP counts come from comparing the saved FP64 diagnostic values directly. Each configuration ran once.</p>

      <p>References: <a href="https://docs.nvidia.com/cuda/floating-point/index.html">NVIDIA CUDA floating-point guide</a> · <a href="https://triton-lang.org/main/index.html">Triton documentation</a> · <a href="https://pytorch.org/docs/stable/torch.compiler.html">PyTorch torch.compile documentation</a></p>
    </>
  );
}
