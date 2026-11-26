import { ScientificFigure } from "./scientific-figure";
import { componentPresence, tokenSwap, rotationRepair, scenarioCounts, convergence } from "./figures";

export const wrongTestSections = [
  { id: "missing-components", title: "1. A collision-free reactor with no moving parts" },
  { id: "unused-tokens", title: "2. A tokenizer that read the temperature instead of its tokens" },
  { id: "missing-velocities", title: "3. A perfect rotation score that lost the velocities" },
  { id: "repeated-scenarios", title: "4. 8,400 unique hashes, 48 physical setups" },
  { id: "grid-convergence", title: "5. Green software tests, unconverged physics" },
  { id: "every-score", title: "The question behind every score" },
  { id: "notes", title: "Notes" },
];

export default function WrongTest() {
  return (
    <>
      <p>A reactor generator passed its collision check on all 1,000 evaluated candidates. Every candidate was missing its shaft and blades.</p>

      <p>In a separate project, giving a tokenizer's decoder another frame's tokens changed its reconstruction error by less than 0.01%. A temperature input was doing the work we expected the tokens to do.</p>

      <p>Machine-learning researchers call this <em>shortcut learning</em><sup><a href="#note-6">[6]</a></sup> or <em>specification gaming</em><sup><a href="#note-7">[7]</a></sup>: a model finds a cheaper route to a good score than the one its designers intended. It is well documented in image classification and reinforcement learning. In scientific AI it takes physical forms: a missing component, an unused input, a vanished vector field, the same simulation hidden behind unique file hashes.</p>

      <p>Across five investigations at Shodh AI in 2026, we found each of these in our own work. Each one changed how we test. Here is what happened, and the control that exposed it.</p>

      <div role="region" aria-label="Five cases and their controls" tabIndex={0}>
        <table>
          <thead><tr><th scope="col">Case</th><th scope="col">The score that looked good</th><th scope="col">What it missed</th><th scope="col">The control that exposed it</th><th scope="col">What we check now</th></tr></thead>
          <tbody>
            <tr><th scope="row">1. Reactor generator</th><td>1,000 of 1,000 collision-free</td><td>No shaft or blades in any candidate</td><td>Count solid voxels per component</td><td>Minimum solid volume for every component</td></tr>
            <tr><th scope="row">2. Condensate tokenizer</th><td>Passed its development gate</td><td>Tokens carried almost no frame-specific information</td><td>Swap tokens between frames</td><td>Wrong-frame tokens must make reconstruction worse</td></tr>
            <tr><th scope="row">3. Molecular tokenizer</th><td>Rotation cosine 0.999996</td><td>Velocity error 32× worse</td><td>Score rotation and reconstruction together</td><td>Symmetry gates paired with every physical quantity</td></tr>
            <tr><th scope="row">4. Particle simulation dataset</th><td>8,400 unique SHA-256 hashes</td><td>Only 48 physical setups</td><td>Trace rows back to simulation setups</td><td>Split by physical scenario</td></tr>
            <tr><th scope="row">5. Porous-media solver</th><td>66 software tests passed</td><td>Grid convergence failed</td><td>Refine the grid</td><td>Separate numerical qualification</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="missing-components">1. A collision-free reactor with no moving parts</h2>

      <p>Our inverse-CAD model generates a stirred reactor as three signed-distance fields: the shell, the agitator shaft and the impeller blades. At a set surface level, each field marks which voxels are solid. The goal is a complete assembly whose moving parts never intersect the shell.</p>

      <p>At the 30,000-step checkpoint, all 1,000 candidates passed the collision check. All 1,000 also had exactly zero shaft voxels and zero blade voxels. With no blades, there was nothing to collide with: the test never required the blades to exist.<sup><a href="#note-1">[1]</a></sup></p>

      <p>A mesh helper made the problem harder to see. When the requested surface was absent, it extracted a surface at the midpoint of the field's range instead, producing a watertight mesh for a component with no solid geometry. Eight of the empty candidates even passed the legacy combined collision-and-watertightness check.</p>

      <ScientificFigure spec={componentPresence} caption={"Figure 1. The same 1,000 evaluation candidates scored at two checkpoints. At 30,000 steps every candidate passed the collision check because none had a shaft or blades. With component presence enforced, selection moved to 20,000 steps."} />

      <p><strong>The fix.</strong> We added a minimum solid volume for every component and made it part of checkpoint selection. The guarded selector chose an earlier checkpoint at 20,000 steps: all 1,000 candidates had every component, and 193 passed the full combined check after mesh processing.</p>

      <p><strong>Lesson.</strong> A non-intersection check needs a presence check. Otherwise, deleting the object is the easiest way to pass.</p>

      <h2 id="unused-tokens">2. A tokenizer that read the temperature instead of its tokens</h2>

      <p>A scientific tokenizer compresses a simulated state into tokens, and a decoder reconstructs the state from them. In our protein-condensate project, the first version compressed snapshots of 250 simulated protein chains. Its decoder also received temperature, sequence and other condition information.</p>

      <p>The model passed its development gate, then failed a sealed holdout. An audit found that its decoded packing barely varied between frames, even when the true packing did. To find out which inputs actually controlled the reconstruction, we fixed confirmation and refutation criteria in advance, then swapped temperature, sequence and tokens one at a time on validation frames from two families, without changing the checkpoint.<sup><a href="#note-2">[2]</a></sup></p>

      <ul>
        <li>Swapping <strong>temperature alone</strong> reproduced 98.6–99.8% of the packing shift caused by swapping temperature and sequence together.</li>
        <li>Giving the decoder <strong>another frame's tokens</strong> from the same trajectory changed mean reconstruction error by +0.0089% in one family and −0.0002% in the other. Decoded packing did not change at all.</li>
      </ul>

      <p>Under these tests, the tokens contributed almost no frame-specific information. Temperature was useful context, but a reconstruction model has to depend on which frame it is reconstructing.</p>

      <ScientificFigure spec={tokenSwap} caption={"Figure 2. In V1, swapping in another frame's tokens barely moved V1's reconstruction error. V2 is gated on the opposite behaviour, and on a sealed holdout its error with wrong-frame tokens was thousands of times its error with the right ones."} />

      <p><strong>The fix.</strong> We rebuilt the tokenizer as V2, with no temperature, sequence, residue type, family or regime inputs to the decoder. It keeps only structural context: chain and residue indices, the simulation box and a handedness bit per chain. We also made wrong-frame tokens a gate: reconstruction must get at least twice as bad when the tokens come from a different frame. On a fresh sealed holdout opened once, six trajectories from an unseen sequence family at 380 K and 600 K, V2 passed every gate, with wrong-frame-to-own-frame error ratios of 2,315 to 8,331. A leave-one-family-out study passed eight of nine folds.</p>

      <p><strong>Lesson.</strong> Replace the representation while holding the context fixed. If nothing changes, the representation is not doing the work.</p>

      <h2 id="missing-velocities">3. A perfect rotation score that lost the velocities</h2>

      <p>Rotating a molecular system changes its coordinates and vector components but not its physical state, so a good representation should encode both versions consistently. Our molecular tokenizer's rotation test measured the cosine between the learned token channels of the original and rotated system, with a pass mark of 0.9999.</p>

      <p>In an August audit of 256 structures with four molecular states each, the legacy tokenizer scored a median of 0.6382. To find where orientation sensitivity entered, we removed inputs to the learned encoder. Zeroing velocity alone raised the cosine to 0.7600. Zeroing every orientation-dependent vector input gave a perfect 1.0.<sup><a href="#note-3">[3]</a></sup> The perfect score came from withholding direction, which is exactly the information a molecular representation must keep.</p>

      <p>A separate trained repair pilot tested rotation and reconstruction together, and made the trade-off visible:</p>

      <div role="region" aria-label="Rotation-repair pilot" tabIndex={0}>
        <table>
          <thead><tr><th scope="col"><strong>Metric</strong></th><th scope="col"><strong>Pilot baseline</strong></th><th scope="col"><strong>Repair pilot</strong></th></tr></thead>
          <tbody>
            <tr><th scope="row">Learned rotation cosine (higher is better)</th><td>0.62736</td><td>0.999996</td></tr>
            <tr><th scope="row">Position RMSE (Å)</th><td>0.14261</td><td>0.14384</td></tr>
            <tr><th scope="row"><strong>Velocity normalized RMSE</strong></th><td><strong>0.00832</strong></td><td><strong>0.26916</strong></td></tr>
            <tr><th scope="row">Force log-norm normalized RMSE</th><td>0.02245</td><td>0.03044</td></tr>
          </tbody>
        </table>
      </div>

      <ScientificFigure spec={rotationRepair} caption={"Figure 3. The repair pilot passed the rotation gate and kept position error almost unchanged, but its velocity error grew about 32-fold."} />

      <p><strong>The outcome.</strong> Because rotation was scored alongside reconstruction of every physical quantity, the pilot's velocity loss was caught, and the pilot was not promoted.</p>

      <p><strong>Lesson.</strong> Score a symmetry alongside every physical quantity the representation must preserve. Losing a directional signal can make an invariance test easier to pass.</p>

      <h2 id="repeated-scenarios">4. 8,400 unique hashes, 48 physical setups</h2>

      <p>Exact-hash deduplication is a standard first filter for training data: in a text corpus, two documents with different SHA-256 hashes are at least not identical copies. Scientific simulation data breaks that assumption. Our particle-tokenizer dataset held 8,400 rows, each with a distinct raw hash and token hash, and its byte-level deduplication certificate was accurate. It simply answered a different question from the one that mattered: how many independent physical scenarios did those rows contain?</p>

      <p>A July audit traced them to 1,200 trajectory exports from 48 simulation setups: three material labels, four speeds, two yield-threshold multipliers and two damage-control settings. Each export held seven frames, so the dataset covered 336 setup-frame combinations, each repeated 25 times.<sup><a href="#note-4">[4]</a></sup></p>

      <ScientificFigure spec={scenarioCounts} caption={"Figure 4. Every stored row was byte-unique, yet the dataset contained only 48 distinct physical setups."} />

      <p>The reason is subsampling. Each export records 2,048 of the simulation's 13,056 particles, and the random seed chooses which ones, while the simulation of each setup is deterministic. Every export therefore has a unique hash, even when it shows exactly the same dynamics as another. A spot check confirmed it: one training export and one confirmation export shared 312 initial particle positions, and across all seven frames their displacements differed by at most about 6 × 10<sup>−8</sup> in normalized coordinates.</p>

      <p>As a result, the tokenizer trained on 480 exports covering all 48 setups, while validation, test and confirmation each drew 240 more from the same 48 setups with different particle samples. Those splits tested new views of familiar scenarios rather than new physics, the kind of leakage Kapoor and Narayanan document across machine-learning-based science.<sup><a href="#note-8">[8]</a></sup></p>

      <p><strong>The fix.</strong> Our data pipeline now records physical-scenario identity separately from sampling identity, and an auditor flags any scenario that recurs across splits.</p>

      <p><strong>Lesson.</strong> Byte-unique is not physics-unique. Choose the unit of independence before splitting the data: here it was the physical scenario, not the filename, seed or stored row.</p>

      <h2 id="grid-convergence">5. Green software tests, unconverged physics</h2>

      <p>Not every shortcut is learned. In our porous-media flow and adsorption programme, a source-validation suite for an earlier, reduced-order version recorded 66 passes, zero failures and one expected skip, covering schemas, units, source integrity and small solver and codec checks.<sup><a href="#note-5">[5]</a></sup> Checks like these show the software is built correctly. They cannot show that its numbers converge.</p>

      <p>Grid-refinement qualification on the later native solver asked exactly that. In the baseline test case, predicted breakthrough time was 355.10 s on a 64³ grid and 313.10 s on a 128³ grid: a 13.41% change against a 5% allowance. A clean convergence run measured an observed order of 1.208 against a required 1.6, even though mass conservation closed to 2.28 × 10<sup>−12</sup> against a limit of 10<sup>−8</sup> and concentrations stayed within bounds.</p>

      <ScientificFigure spec={convergence} caption={"Figure 5. Refining the grid moved the predicted breakthrough time by 13.41%, well outside the 5% allowance. The observed convergence order fell short of the required 1.6."} />

      <p><strong>The outcome.</strong> The qualification gates worked as designed. The prescribed rejection path stopped the later stages, and the candidate was not promoted.</p>

      <p><strong>Lesson.</strong> Software validation, conservation checks and grid convergence establish different things.<sup><a href="#note-9">[9]</a></sup> Each needs its own acceptance criteria, scoped to the exact solver version being qualified.</p>

      <h2 id="every-score">The question behind every score</h2>

      <p>The five cases exposed different gaps: presence was missing from a collision test; frame identity from a reconstruction test; retained physical information from a symmetry score; scenario independence from deduplication; and numerical qualification from software validation.</p>

      <p>The practical lesson is to write down what a passing result would establish, then construct a control that could expose a cheaper route to that pass.</p>

      <h3 id="five-controls">Five controls worth running on any scientific model</h3>

      <ol>
        <li><strong>Remove a component.</strong> Does the constraint still pass when the object it constrains is gone?</li>
        <li><strong>Swap the tokens.</strong> Does the output change when the representation comes from a different sample?</li>
        <li><strong>Withhold an input.</strong> Does a symmetry score improve only because information was discarded?</li>
        <li><strong>Split by physical scenario.</strong> Do the test samples contain physics the model has not seen?</li>
        <li><strong>Refine the grid.</strong> Do the numbers hold as the discretization gets finer?</li>
      </ol>

      <p>A failed control should change the claim. It may justify a redesign, narrow the supported scope or stop promotion. In these investigations, each was a useful outcome. The standard we want our work to meet is that a favourable score survives the tests most likely to reveal what it left out.</p>

      <h2 id="notes">Notes</h2>

      <p id="note-1">[1] Reactor generator, May 2026. Counts come from the original evaluation reports for nine 1,000-candidate checkpoints, recounted against the saved per-candidate results, together with the collision and mesh tools, the guarded selector and its selection summary. The 19.3% combined pass rate includes mesh processing; it is a candidate-evaluation result on our internal evaluation set, not a manufacturing yield or an independently held-out benchmark. A single sample exported separately for demonstration reported component volumes that differ from the selection summary for the same checkpoint and sample; it is not used in any number or figure here.</p>

      <p id="note-2">[2] Condensate tokenizer, October–November 2026. The counterfactual study and the V2 tests were preregistered, with confirmation and refutation criteria fixed before each run; each counterfactual arm used 160 frames per family. The 98.6–99.8% figure describes that specific input-swap comparison, not a universal attribution of the model's output. The tests did not establish whether frame information was absent from the encoding or ignored during decoding; tokens from the other family changed error by up to 0.71%. V2's error ratios are its own measurements, not a like-for-like multiplier over the V1 diagnostic. Ten protocol amendments followed development results and were frozen before the runs they governed, and the sealed holdout was opened once. In the leave-one-family-out study, the remaining fold had an undefined density gate; a later diagnostic was not counted toward the frozen result. The holdout family was within the composition range used in development, training used one seed per stage, and comparisons with simpler codecs at the same bit budget, and of downstream usefulness, remain open. As of 25 November, the simulator's quantitative agreement with experiment had not yet passed and a phase-label audit was still open. These results have not yet been independently replicated.</p>

      <p id="note-3">[3] Molecular tokenizer, August 2026. Rotation audit with positions, velocities and forces rotated consistently, comparing token channels after storage at BF16 precision; encoder-input ablations; and a separate trained repair pilot. The ablation was a diagnostic: it did not measure reconstruction, and no model or dataset was modified. A cosine of 1.0 in the all-vector ablation did not mean byte-identical tokens; about 0.11% of stored learned values still changed. The baseline cosines 0.6382 (audit) and 0.62736 (pilot comparison) come from different evaluations and should not be paired. The velocity ratio is 0.26916 ÷ 0.00832.</p>

      <p id="note-4">[4] Particle dataset, July 2026 audit and later follow-up. Based on dataset provenance records, deduplication certificates, the simulation launch configurations, training logs, split analyses and a spot check of surviving cached data. Scenario counts follow the configured generator; in this simulator the stiffness and Poisson's-ratio controls act as a yield-threshold multiplier and a damage-rate control. An older decoder faced a genuine extrapolation test on some of these settings; once the later tokenizer trained across the full grid, that grid could no longer establish extrapolation for it. The new safeguards protect future datasets and do not retroactively repair the historical one; the historical tokenizer's generalization to unseen materials and speeds was not evaluated.</p>

      <p id="note-5">[5] Porous-media solver, August 2026. The software validation run of 10 August passed 66 tests with one skip: a full write-and-read round trip in the Zarr v3 storage format, skipped because the dependency was unavailable. It covered the reduced-order version only, so it and the native-solver qualification are not tests of one frozen implementation. The grid-refinement change is computed relative to the finer-grid value. The convergence order comes from a run that changed only grid resolution; a second run that also changed the timestep and time-integration scheme is not used as a spatial-order measurement.</p>

      <p id="note-6">[6] R. Geirhos et al., "Shortcut learning in deep neural networks," <em>Nature Machine Intelligence</em> 2, 665–673 (2020).</p>

      <p id="note-7">[7] V. Krakovna et al., "Specification gaming: the flip side of AI ingenuity," DeepMind blog (2020).</p>

      <p id="note-8">[8] S. Kapoor and A. Narayanan, "Leakage and the reproducibility crisis in machine-learning-based science," <em>Patterns</em> 4(9), 100804 (2023).</p>

      <p id="note-9">[9] P. J. Roache, "Quantification of uncertainty in computational fluid dynamics," <em>Annual Review of Fluid Mechanics</em> 29, 123–160 (1997).</p>
    </>
  );
}
