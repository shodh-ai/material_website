import Image from "next/image";
import { ScientificFigure, type FigureSpec } from "./scientific-figure";

export const antibodySlug = "antibody-tokenizer-rotation-invariance";
export const antibodyAssets = `/blog/${antibodySlug}`;

export const antibodySections = [
  { id: "why-orientation-matters", title: "Why orientation should not matter" },
  { id: "finding-the-cause", title: "Finding the cause" },
  { id: "sequence-anchored-frame", title: "The fix: anchor the frame to the sequence" },
  { id: "comparing-the-fixes", title: "Comparing the fixes" },
  { id: "chain-label-guard", title: "A guard for swapped chain labels" },
  { id: "why-it-went-unnoticed", title: "Why it went unnoticed" },
  { id: "results", title: "Results" },
  { id: "what-made-it-work", title: "What made it work" },
  { id: "how-we-measured", title: "How we measured" },
  { id: "references", title: "References" },
];

const rotationStability: FigureSpec = {
  title: "Rotation stability by preprocessing choice",
  subtitle: "976 held-out antibodies · median over 10 rotations",
  panels: [
    {
      kind: "bar",
      title: "Learned-lane cosine to the unrotated encoding",
      max: 1,
      rows: [
        { label: "Deployed preprocessing", value: 0.177, display: "0.177", tone: 3 },
        { label: "Smaller box (1.25× span)", value: 0.100, display: "0.100", tone: 3 },
        { label: "Box centred on the centroid", value: 0.272, display: "0.272", tone: 3 },
        { label: "Cube box", value: 0.352, display: "0.352", tone: 3 },
        { label: "Larger box (2.0× span)", value: 0.372, display: "0.372", tone: 3 },
        { label: "Box rotated with the input", value: 0.905, display: "0.905", tone: 2 },
        { label: "PCA frame", value: 1, display: "1.000", tone: 1 },
        { label: "Sequence-anchored frame", value: 1, display: "1.000", tone: 1 },
      ],
      note: "Rotating the box with the input breaks decoding. Both canonical frames were invariant to the bit.",
    },
  ],
};

export default function AntibodyTokenizer() {
  return (
    <>
      <p>A structure tokenizer should give the same tokens for the same antibody however it is oriented. Ours did not: after a random rotation, its learned features kept a median cosine of only <strong>0.177</strong> to the original. We traced the problem to one preprocessing step and fixed it without retraining. Aligning each antibody to a fixed reference frame before the unchanged encoder made stored tokens bit-identical under all <strong>9,760 tested rotations</strong>, and raised CDR-H3 loop retrieval on 6,000 new antibodies from <strong>0.165 to 0.531 mAP</strong>.</p>

      <p><a href={`${antibodyAssets}/antibody-tokenizer-pose-dependence.pdf`}>Read the research paper (PDF)</a></p>

      <ul>
        <li><strong>9,760/9,760</strong> rotations with identical stored tokens, up from 0/9,760 before the fix.</li>
        <li><strong>99.98%</strong> of the rotation change traced to the Fourier features of box coordinates.</li>
        <li><strong>3.2×</strong> CDR-H3 retrieval in a random pose, from 0.165 to 0.531 mAP.</li>
        <li><strong>976/976</strong> chain-label swaps rejected, with 0 of 6,976 valid antibodies rejected.</li>
      </ul>

      <h2 id="why-orientation-matters">Why orientation should not matter</h2>

      <p>Our antibody Fv tokenizer turns each Cα bead into one 192-value bfloat16 token: a 32-value carrier that stores the coordinates, and a 160-value learned lane written by a 3.9-million-parameter message-passing encoder. Downstream models read the learned lane, so it should describe the antibody, not the coordinate frame the structure happened to be saved in.</p>

      <p>We moved each of 976 held-out antibodies by eight random rotations, two near-180° rotations and four translations. The tokenizer passed every translation (3,904 of 3,904 learned lanes bit-identical) and failed every rotation: none of the 9,760 rotated copies kept its learned tokens.</p>

      <h2 id="finding-the-cause">Finding the cause</h2>

      <p>The encoder sees bead pairs only through their distances, which rotation does not change, so the dependence had to enter through the per-bead inputs. The deployed preprocessing fits a box to the structure along the x, y and z axes and gives the encoder Fourier features of each bead's fractional position in that box. Rotate the antibody and the box changes shape, so those fractional coordinates change although the molecule has not. An exact Shapley attribution over the four input blocks that can carry pose put 99.98% of the change on the Fourier features. Pair distances contributed about 7 × 10<sup>−15</sup>.</p>

      <p>Re-centring, re-scaling or re-shaping the box changed the size of the effect but never removed it. Only putting the structure into a canonical frame first did.</p>

      <ScientificFigure spec={rotationStability} caption="Figure 1. Changing the box alone never made the tokenizer rotation-invariant. The best frame-free variant reached 0.372. Both canonical frames kept the learned lane bit-identical. The sequence-anchored frame is the fix we evaluated in full." />

      <h2 id="sequence-anchored-frame">The fix: anchor the frame to the sequence</h2>

      <p>The fix, FX1, numbers both chains with IMGT, fits the Cα atoms at the conserved framework positions of VH and VL jointly to a fixed reference, and applies that rigid transform before the unchanged preprocessing and encoder. The transform is kept as a float64 sidecar, so decoded coordinates map back to the input frame exactly. No weights change.</p>

      <figure>
        <Image
          src={`${antibodyAssets}/sequence-anchored-frame.png`}
          alt="An antibody in any pose passes a heavy- and light-chain label guard, is fitted to a fixed reference using VH and VL framework anchors, then runs through the frozen encoder. A float64 sidecar returns decoded coordinates to the input frame."
          width={1467}
          height={507}
          sizes="(max-width: 760px) 88vw, 54vw"
        />
        <figcaption>Figure 2. The guard checks the heavy and light chain labels. The fit puts every pose of an antibody into the same frame before the unchanged tokenizer runs.</figcaption>
      </figure>

      <p>FX1 passed every preregistered test on the 976 antibodies:</p>
      <ul>
        <li>Stored tokens were bit-identical under all 9,760 rotations.</li>
        <li>Decoded carrier coordinates followed each rigid motion to within a median 1.4 × 10<sup>−14</sup> Å.</li>
        <li>The decoding error was 0.999 times the original.</li>
        <li>The tokens kept 99.6% of the original response to a real CDR-H3 loop movement.</li>
      </ul>

      <h2 id="comparing-the-fixes">Comparing the fixes</h2>

      <p>We tested two standard alternatives alongside FX1: averaging the encoder over principal-axis frames (FX2), and replacing it with hand-built invariant features (FX3). All three are rotation-stable. They differ in what the tokens still carry.</p>

      <div role="region" aria-label="Comparison of rotation-stability fixes" tabIndex={0}>
        <table>
          <caption>Rotation-stable counts antibodies whose learned features stayed above cosine 0.9999 in every pose. H3 response is relative to production in the stored pose. H3 mAP and VH–VL ρ use 6,000 new antibodies, each in a random pose.</caption>
          <thead><tr><th scope="col">Approach</th><th scope="col">Rotation-stable</th><th scope="col">H3 response</th><th scope="col">H3 mAP</th><th scope="col">VH–VL ρ</th></tr></thead>
          <tbody>
            <tr><th scope="row">Production, stored pose</th><td>Reference</td><td>1.000</td><td>0.539</td><td>0.758</td></tr>
            <tr><th scope="row">Production, random pose</th><td>0/976</td><td>–</td><td>0.165</td><td>0.421</td></tr>
            <tr><th scope="row">Frame averaging (FX2)</th><td>976/976</td><td>0.661</td><td>0.371</td><td>0.715</td></tr>
            <tr><th scope="row">Invariant features (FX3)</th><td>976/976</td><td>0.065</td><td>0.644</td><td>0.466</td></tr>
            <tr><th scope="row">Sequence-anchored frame (FX1)</th><td>976/976</td><td>0.996</td><td>0.531</td><td>0.781</td></tr>
          </tbody>
        </table>
      </div>

      <p>Invariant features retrieve CDR-H3 loops best (0.644, close to a Cα loop-angle baseline at 0.634), but they barely respond to a real loop movement and lose most of the VH–VL orientation signal. FX1 is the only fix that keeps the tokenizer's own features at their stored-pose quality in any pose.</p>

      <h2 id="chain-label-guard">A guard for swapped chain labels</h2>

      <p>Anchoring on the sequence brought one new failure mode. VH and VL frameworks share a fold, so when we swapped the heavy and light labels, the unguarded fit still accepted all 976 structures. We added a guard that accepts an input only if the chain labelled heavy scores as heavy against human and mouse germline profiles, the chain labelled light scores as light, and the framework fits better with the labels as given than swapped. It rejected all 976 swaps in every pose and none of 6,976 correctly labelled antibodies, and all 31,520 FX1 token arrays passed through it byte-identical.</p>

      <h2 id="why-it-went-unnoticed">Why it went unnoticed</h2>

      <p>Our structures were already stored close to one frame: a median of 1.4°, and at most 6.4°, from the canonical pose. A uniformly random rotation lands that close with probability about 7 × 10<sup>−5</sup>, so tests on the stored poses could not reveal the problem.</p>

      <h2 id="results">Results</h2>

      <div role="region" aria-label="Antibody tokenizer results" tabIndex={0}>
        <table>
          <caption>The 6,000 new antibodies exclude the held-out set and every training structure, and retrieval never counts a match from the query's own CDR-H3 sequence cluster. In its stored pose, production reaches 0.539 mAP and ρ = 0.758.</caption>
          <thead><tr><th scope="col">Measure</th><th scope="col">Production</th><th scope="col">FX1</th><th scope="col">Set</th></tr></thead>
          <tbody>
            <tr><th scope="row">Rotations with bit-identical stored tokens</th><td>0/9,760</td><td>9,760/9,760</td><td>976 held-out</td></tr>
            <tr><th scope="row">Learned-lane cosine under rotation, median</th><td>0.177</td><td>1.000</td><td>976 held-out</td></tr>
            <tr><th scope="row">Carrier equivariance error, median</th><td>–</td><td>1.4 × 10<sup>−14</sup> Å</td><td>976 held-out</td></tr>
            <tr><th scope="row">Decoding error relative to production</th><td>1.000</td><td>0.999</td><td>976 held-out</td></tr>
            <tr><th scope="row">CDR-H3 retrieval mAP, random pose</th><td>0.165</td><td>0.531</td><td>6,000 new</td></tr>
            <tr><th scope="row">VH–VL angle probe ρ, random pose</th><td>0.421</td><td>0.781</td><td>6,000 new</td></tr>
            <tr><th scope="row">Chain-label swaps rejected, with guard</th><td>–</td><td>976/976</td><td>976 held-out</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="what-made-it-work">What made it work</h2>

      <p>The preprocessing fix kept the trained weights untouched. Measuring the stored bytes, rather than floating-point activations, turned invariance into a pass-or-fail test. Testing the fix for its own failure modes found the chain-label swap before it could reach a downstream model.</p>

      <h2 id="how-we-measured">How we measured</h2>

      <ul>
        <li><strong>Preregistration.</strong> The protocol, thresholds and analyses were frozen before any measurement, and no threshold changed afterwards. The guard's rule and thresholds were frozen before the guard was measured.</li>
        <li><strong>Stored bytes.</strong> Every token metric was computed from bfloat16 tokens written to disk, synced, closed and reopened. Each held-out antibody received 16 transforms: two identity controls, eight uniformly random rotations with translations, two near-180° rotations and four translations.</li>
        <li><strong>Compute.</strong> NVIDIA H100 GPUs, float32 arithmetic, deterministic algorithms, TF32 disabled and batch size 1. GPU and CPU cosines agreed to 3.4 × 10<sup>−7</sup>. The study used 1.51 GPU-hours and no training.</li>
        <li><strong>Utility and code.</strong> The 6,000 new antibodies each received a random pose, and intervals come from a bootstrap over sequence clusters. Companion code reproduces the invariance, equivariance and guard checks on synthetic structures.</li>
      </ul>

      <h2 id="references">References</h2>

      <ul>
        <li><a href="https://arxiv.org/abs/2006.10739">Fourier features</a> (Tancik et al., 2020)</li>
        <li><a href="https://arxiv.org/abs/2110.03336">Frame averaging</a> (Puny et al., 2022)</li>
        <li><a href="https://doi.org/10.1093/bioinformatics/btv552">ANARCI numbering</a> (Dunbar &amp; Deane, 2016)</li>
        <li><a href="https://doi.org/10.1107/S0567739476001873">Kabsch superposition</a> (1976)</li>
      </ul>
    </>
  );
}
