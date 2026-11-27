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
      title: "Learned-feature cosine to the unrotated encoding",
      max: 1,
      rows: [
        { label: "Original preprocessing", value: 0.177, display: "0.177", tone: 3 },
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
      <p>A structure tokenizer should give the same tokens for the same antibody however it is oriented. Ours did not: after a random rotation, its learned features kept a median cosine of only <strong>0.177</strong> to the original. We traced the problem to one preprocessing step and fixed it without retraining. Aligning each antibody to a fixed reference frame before the unchanged encoder made stored tokens bit-identical under all <strong>9,760 tested rotations</strong>, and restored CDR-H3 loop retrieval on 6,000 new antibodies in random poses from <strong>0.165 to 0.531 mAP</strong>, close to the 0.539 the tokenizer reaches in its stored pose.</p>

      <p><a href={`${antibodyAssets}/antibody-tokenizer-pose-dependence.pdf`}>Read the research paper (PDF)</a></p>

      <ul>
        <li><strong>9,760/9,760</strong> rotations with identical stored tokens, up from 0/9,760 before the fix.</li>
        <li><strong>99.98%</strong> of the rotation change traced to the Fourier features of box coordinates.</li>
        <li><strong>0.531</strong> CDR-H3 retrieval mAP in random poses, up from 0.165 and close to 0.539 in the stored pose.</li>
        <li><strong>976/976</strong> chain-label swaps rejected, with 0 of 6,976 valid antibodies rejected.</li>
      </ul>

      <h2 id="why-orientation-matters">Why orientation should not matter</h2>

      <p>Our antibody Fv tokenizer turns each Cα bead into one 192-value bfloat16 token: 32 coordinate values that store the bead&apos;s position, and 160 learned features written by a 3.9-million-parameter message-passing encoder. Downstream models read the learned features, so they should describe the antibody, not the coordinate frame the structure happened to be saved in.</p>

      <p>We moved each of 976 held-out antibodies by eight random rotations, two near-180° rotations and four translations. The tokenizer passed every translation (learned features bit-identical in 3,904 of 3,904) and failed every rotation: none of the 9,760 rotated copies kept its learned features.</p>

      <h2 id="finding-the-cause">Finding the cause</h2>

      <p>The encoder sees bead pairs only through their distances, which rotation does not change, so the dependence had to enter through the per-bead inputs. The original preprocessing fits a box to the structure along the x, y and z axes and gives the encoder Fourier features of each bead&apos;s fractional position in that box. Rotate the antibody and the box changes shape, so those fractional coordinates change although the molecule has not. An exact Shapley attribution over the four input blocks that can carry pose put <strong>99.98%</strong> of the change on the Fourier features; pair distances contributed about 7 × 10<sup>−15</sup>.</p>

      <p>Re-centring, re-scaling or re-shaping the box changed the size of the effect but never removed it. Only putting the structure into a canonical frame first did.</p>

      <ScientificFigure spec={rotationStability} caption="Figure 1. Changing the box alone never made the tokenizer rotation-invariant; the best frame-free variant reached 0.372. Both canonical frames kept the learned features bit-identical; the sequence-anchored frame is the fix we evaluated in full." />

      <h2 id="sequence-anchored-frame">The fix: anchor the frame to the sequence</h2>

      <p>The fix numbers both chains with IMGT, fits the Cα atoms at the conserved framework positions of VH and VL jointly to a fixed reference, and applies that rigid transform before the unchanged preprocessing and encoder. The transform is kept as a float64 sidecar, so decoded coordinates map back to the input frame exactly. No weights change.</p>

      <figure>
        <Image
          src={`${antibodyAssets}/sequence-anchored-frame.png`}
          alt="An antibody in any pose passes a heavy- and light-chain label guard, is fitted to a fixed reference using VH and VL framework anchors, then runs through the frozen encoder. A float64 sidecar returns decoded coordinates to the input frame."
          width={1465}
          height={522}
          sizes="(max-width: 760px) 88vw, 54vw"
        />
        <figcaption>Figure 2. The guard checks the heavy and light chain labels; the fit puts every pose of an antibody into the same frame before the unchanged tokenizer runs.</figcaption>
      </figure>

      <p>The sequence-anchored frame passed every preregistered test on the 976 antibodies:</p>
      <ul>
        <li>Stored tokens were bit-identical under all 9,760 rotations.</li>
        <li>Coordinates decoded from the coordinate values followed each rigid motion to within a median 1.4 × 10<sup>−14</sup> Å.</li>
        <li>The decoding error was 0.999 times the original.</li>
        <li>The tokens kept 99.6% of the original response to a real CDR-H3 loop movement.</li>
      </ul>

      <p>Rigid motions are the easy case: once the frame is fixed, rotating a structure and aligning it back is exact by construction. Two structures of the same antibody also differ slightly in the framework, and that moves the fitted frame. Adding 0.5 Å noise to the framework anchors used for the fit moved the frame by a median 0.24° and left the learned features at cosine 0.99996 to the clean result; dropping 20% of the anchors gave 0.22° and 0.99996. We have not yet compared genuinely different structures of one antibody, such as two crystal forms or a predicted and an experimental model.</p>

      <h2 id="comparing-the-fixes">Comparing the fixes</h2>

      <p>We tested two standard alternatives alongside the sequence-anchored frame: averaging the encoder over principal-axis frames (frame averaging), and replacing it with hand-built invariant features. All three are rotation-stable. They differ in what the tokens still carry.</p>

      <div role="region" aria-label="Comparison of rotation-stability fixes" tabIndex={0}>
        <table aria-describedby="antibody-comparison-notes" style={{ minWidth: "36rem" }}>
          <thead><tr><th scope="col">Approach</th><th scope="col">Rotation-stable</th><th scope="col">H3 response</th><th scope="col">H3 mAP</th><th scope="col">VH–VL ρ</th></tr></thead>
          <tbody>
            <tr><th scope="row">Original tokenizer, stored pose</th><td>Reference</td><td>1.000</td><td>0.539<br /><small>[0.529, 0.548]</small></td><td>0.758<br /><small>[0.744, 0.771]</small></td></tr>
            <tr><th scope="row">Original tokenizer, random pose</th><td>0/976</td><td>–</td><td>0.165<br /><small>[0.158, 0.172]</small></td><td>0.421<br /><small>[0.398, 0.444]</small></td></tr>
            <tr><th scope="row">Frame averaging</th><td>976/976</td><td>0.661</td><td>0.371<br /><small>[0.362, 0.380]</small></td><td>0.715<br /><small>[0.701, 0.730]</small></td></tr>
            <tr><th scope="row">Invariant features</th><td>976/976</td><td>0.065</td><td>0.644<br /><small>[0.635, 0.653]</small></td><td>0.466<br /><small>[0.443, 0.487]</small></td></tr>
            <tr><th scope="row">Cα loop-angle baseline</th><td>by design</td><td>–</td><td>0.634<br /><small>[0.625, 0.644]</small></td><td>–</td></tr>
            <tr><th scope="row">Sequence-anchored frame</th><td>976/976</td><td>0.996</td><td>0.531<br /><small>[0.522, 0.541]</small></td><td>0.781<br /><small>[0.769, 0.793]</small></td></tr>
          </tbody>
        </table>
      </div>
      <p id="antibody-comparison-notes"><small>Rotation-stable counts antibodies whose learned features stayed above cosine 0.9999 in every pose. H3 response measures response to a CDR-H3 loop movement, relative to the original tokenizer in the stored pose. H3 mAP (CDR-H3 retrieval at 1 Å) and VH–VL ρ (orientation probe) use 6,000 new antibodies, each in a random pose. Brackets indicate 95% bootstrap intervals over CDR-H3 sequence clusters. Invariant features enter the VH–VL probe as 16 values, against 160 for the learned features.</small></p>

      <p>The invariant features and the loop-angle baseline retrieve CDR-H3 loops best at the strict 1 Å cutoff (0.644 and 0.634 against 0.531); at 1.5 Å the sequence-anchored tokens lead (0.676 against 0.628 and 0.616). But the tokenizer is not a retrieval index: its tokens must also decode back to coordinates, follow loop movements and keep the VH–VL orientation, and invariant features do none of these well. Only the sequence-anchored frame keeps all of it in any pose, close to the stored-pose level: 0.531 against 0.539 on retrieval (difference −0.008 [−0.011, −0.005]) and 0.781 against 0.758 on orientation.</p>

      <h2 id="chain-label-guard">A guard for swapped chain labels</h2>

      <p>Anchoring on the sequence brought one new failure mode. VH and VL frameworks share a fold, so when we swapped the heavy and light labels, the unguarded fit still accepted all 976 structures. We added a guard that accepts an input only if the chain labelled heavy scores as heavy against human and mouse germline profiles, the chain labelled light scores as light, and the framework fits better with the labels as given than swapped. It rejected all 976 swaps in every pose and none of 6,976 correctly labelled antibodies. Every stored token array we re-encoded through it came out byte-identical: 31,520 arrays, from 16 poses and four loop movements for each of the 976 held-out antibodies and two random poses for each of the 6,000 new ones.</p>

      <p><strong>Where it applies.</strong> The fix needs IMGT numbering of both chains and a mostly complete framework, with at least 60 anchor positions per chain. Heavy-chain-only inputs are rejected by design, so nanobodies (VHH) are not covered, and structures that lose 40% of their framework anchors get no token. The guard&apos;s germline profiles are human and mouse only, so rabbit, camelid and other species are untested. Every test used Cα-level predicted structures.</p>

      <h2 id="why-it-went-unnoticed">Why it went unnoticed</h2>

      <p>Our structures were already stored close to one frame: a median of 1.4°, and at most 6.4°, from the canonical pose. A uniformly random rotation lands that close with probability about 7 × 10<sup>−5</sup>, so tests on the stored poses could not reveal the problem.</p>

      <h2 id="results">Results</h2>

      <div role="region" aria-label="Antibody tokenizer results" tabIndex={0}>
        <table aria-describedby="antibody-results-notes" style={{ minWidth: "36rem" }}>
          <thead><tr><th scope="col">Measure</th><th scope="col">Original</th><th scope="col">With the fix</th><th scope="col">Set</th></tr></thead>
          <tbody>
            <tr><th scope="row">Rotations with bit-identical stored tokens</th><td>0/9,760</td><td>9,760/9,760</td><td>976 held-out</td></tr>
            <tr><th scope="row">Learned-feature cosine under rotation, median</th><td>0.177</td><td>1.000</td><td>976 held-out</td></tr>
            <tr><th scope="row">Coordinate-value equivariance error, median</th><td>–</td><td>1.4 × 10<sup>−14</sup> Å</td><td>976 held-out</td></tr>
            <tr><th scope="row">Decoding error relative to the original</th><td>1.000</td><td>0.999</td><td>976 held-out</td></tr>
            <tr><th scope="row">CDR-H3 retrieval mAP, random pose</th><td>0.165<br /><small>[0.158, 0.172]</small></td><td>0.531<br /><small>[0.522, 0.541]</small></td><td>6,000 new</td></tr>
            <tr><th scope="row">VH–VL angle probe ρ, random pose</th><td>0.421<br /><small>[0.398, 0.444]</small></td><td>0.781<br /><small>[0.769, 0.793]</small></td><td>6,000 new</td></tr>
            <tr><th scope="row">Chain-label swaps rejected, with guard</th><td>–</td><td>976/976</td><td>976 held-out</td></tr>
          </tbody>
        </table>
      </div>
      <p id="antibody-results-notes"><small>The 6,000 new antibodies exclude the held-out set and every training structure, and retrieval never counts a match from the query&apos;s own CDR-H3 sequence cluster.</small></p>

      <h2 id="what-made-it-work">What made it work</h2>

      <p>The defect was in preprocessing, not in the network, so the fix belongs in preprocessing too and the trained weights stay untouched. Measuring the stored bytes, rather than floating-point activations, turned invariance into a pass-or-fail test. Testing the fix for its own failure modes found the chain-label swap before it could reach a downstream model.</p>

      <h2 id="how-we-measured">How we measured</h2>

      <ul>
        <li><strong>Preregistration.</strong> The protocol, thresholds and analyses were frozen before any measurement, and no threshold changed afterwards. The guard's rule and thresholds were frozen before the guard was measured.</li>
        <li><strong>Stored bytes.</strong> Every token metric was computed from bfloat16 tokens written to disk, synced, closed and reopened. Each held-out antibody received 16 transforms: two identity controls, eight uniformly random rotations with translations, two near-180° rotations and four translations.</li>
        <li><strong>Compute.</strong> NVIDIA H100 GPUs, float32 arithmetic, deterministic algorithms, TF32 disabled and batch size 1. GPU and CPU cosines agreed to 3.4 × 10<sup>−7</sup>. The study used 1.51 GPU-hours and no training.</li>
        <li><strong>Utility.</strong> The 6,000 new antibodies each received a random pose, and intervals come from a bootstrap over CDR-H3 sequence clusters.</li>
      </ul>

      <h2 id="references">References</h2>

      <ul>
        <li><a href="https://arxiv.org/abs/2006.10739">Fourier features</a> (Tancik et al., 2020)</li>
        <li><a href="https://arxiv.org/abs/2110.03336">Frame averaging</a> (Puny et al., 2022)</li>
        <li><a href="https://proceedings.mlr.press/v202/kaba23a.html">Learned canonicalization</a> (Kaba et al., 2023)</li>
        <li><a href="https://doi.org/10.1093/bioinformatics/btv552">ANARCI numbering</a> (Dunbar &amp; Deane, 2016)</li>
        <li><a href="https://doi.org/10.1107/S0567739476001873">Kabsch superposition</a> (1976)</li>
      </ul>
    </>
  );
}
