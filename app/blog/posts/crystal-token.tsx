import { ScientificFigure } from "./scientific-figure";
import { equivalentCells } from "./figures";

export const crystalSections = [
  { id: "inside-the-token", title: "Inside a Shodh crystal token" },
  { id: "precise-geometry", title: "Precise geometry" },
  { id: "equivalent-cells", title: "The equivalent-cell problem" },
  { id: "standardization", title: "The fix: standardize before encoding" },
  { id: "results-at-scale", title: "At scale: 13,312 descriptions" },
  { id: "why-it-matters", title: "Why it matters" },
  { id: "measurement", title: "How we measured" },
  { id: "references", title: "References" },
];

export default function CrystalToken() {
  return (
    <>
      <p>Every machine-learning model for crystals starts by turning a periodic arrangement of atoms into numbers. That step hides a subtle trap: the same physical crystal can be written down in many equally valid ways, with different unit cells, origins and atom orders. If a representation gives each of those descriptions different numbers, a model's predictions can change with the notation instead of the material.</p>

      <p>We built Shodh's crystal token to avoid that trap and to keep geometry precise. Each atom becomes a compact 192-number token. After a standardization step built on established crystallographic tools, <strong>96–100% of equivalent descriptions encode bit-identically</strong> across 512 crystals in 26 descriptions each, and on 1,000 MP20 test crystals atomic positions come back from the token with a 95th-percentile error of <strong>0.00016 Å</strong>.</p>

      <ul>
        <li><strong>96–100%</strong> of equivalent crystal descriptions encode bit-identically</li>
        <li><strong>13,312</strong> equivalent descriptions tested across 512 MP20 crystals</li>
        <li><strong>0.00016 Å</strong> 95th-percentile position error, full round trip on 1,000 MP20 test crystals</li>
        <li><strong>0</strong> retraining needed: the fix works at the input</li>
      </ul>

      <h2 id="inside-the-token">Inside a Shodh crystal token</h2>

      <p>Each atom becomes a 192-number token with three parts, plus a header that stores the atomic numbers and the unit cell:</p>

      <ul>
        <li><strong>A 32-channel carrier</strong> of deterministic values, including position and cell entries.</li>
        <li><strong>30 position-phase channels:</strong> sine and cosine functions of the atom's fractional coordinates.</li>
        <li><strong>130 environment channels</strong>, produced by an encoder from the atom's identity, its periodic neighbourhood and the cell shape.</li>
      </ul>

      <p>Each part has one job, and each can be checked on its own. That separation is what makes the two guarantees below possible.</p>

      <h2 id="precise-geometry">Precise geometry</h2>

      <p>The position decoder reads only the phase channels. In a full encode–decode round trip on 1,000 MP20 test crystals, every structure was recovered, with the atom types and order intact, a median position error of 0.00006 Å and a 95th percentile of 0.00016 Å. On a separate set of 1,200 larger crystals with 14 to 252 atoms each, every structure was again recovered, with a 95th percentile of 0.00024 Å. The separation is clean in both directions. Setting all 130 environment channels to zero leaves decoded positions exactly unchanged, to the last bit. Setting the phase channels to zero instead moves atoms by 4–5 Å. Geometry lives in exactly one place in the token, so it can be verified directly and never drifts when other parts of the representation change.</p>

      <h2 id="equivalent-cells">The equivalent-cell problem</h2>

      <p>A crystal can be described with different, equally valid unit cells. Changing basis multiplies the cell matrix by an integer matrix with determinant one and adjusts the fractional coordinates to match; the physical crystal is unchanged. Supercells, Niggli-reduced cells, conventional and primitive cells all describe the same material.</p>

      <ScientificFigure spec={equivalentCells} caption={"Figure 1. Two valid unit cells for the same two-dimensional pattern. Our tests apply the same idea in three dimensions."} />

      <p>Any encoder that reads the raw cell sees these descriptions differently. Across 512 MP20 crystals, the environment features of equivalent descriptions fell as low as a cosine similarity of 0.27, and predictions made from them drifted by 24–44% of the predictor's own error. We found the same pattern in encoders with random, untrained weights, which shows the effect comes from the raw input itself. That makes it a general problem for crystal representations, and it calls for a general fix.</p>

      <p>The effect reaches all the way to property prediction. A transformer trained to predict formation energy from raw MP20 descriptions was tested on all 9,046 MP20 test crystals, each rewritten in an equivalent unit cell. Its error rose from 0.043 to about 0.071–0.074 eV/atom, and 86–87% of its predictions moved by more than 0.01 eV/atom. Band-gap error rose by 0.11 eV. The same model given only element identities was exactly unaffected by these basis changes, so the shift comes entirely from how the cell is written.</p>

      <h2 id="standardization">The fix: standardize before encoding</h2>

      <p>Before encoding, every crystal now passes through a standardization step built on <a href="https://spglib.readthedocs.io/">spglib</a>: reduction to a standard primitive cell, a choice among the lattice's proper symmetry operations and atom origins, and deterministic atom ordering. Every equivalent description of a crystal maps to the same standardized record, so the encoder always sees the same input. No retraining is needed, and the step works in front of any encoder.</p>

      <p>We first tested it on 15 crystals, 12 from MP20 and 3 synthetic, each under six equivalent changes plus a real physical change as a control:</p>

      <div role="region" aria-labelledby="crystal-control" tabIndex={0}>
        <table>
          <caption id="crystal-control">Similarity is the cosine between pooled environment features. "Identical" means bit-identical environment channels.</caption>
          <thead><tr><th scope="col"><strong>Equivalent description</strong></th><th scope="col"><strong>Lowest similarity without standardization</strong></th><th scope="col"><strong>Identical after standardization</strong></th></tr></thead>
          <tbody>
            <tr><th scope="row">Rotation</th><td>1.000</td><td>15/15</td></tr>
            <tr><th scope="row">Translation</th><td>1.000</td><td>15/15</td></tr>
            <tr><th scope="row">Atom reordering</th><td>1.000</td><td>15/15</td></tr>
            <tr><th scope="row">Basis cycle</th><td>0.601</td><td>15/15</td></tr>
            <tr><th scope="row">Basis shear</th><td>0.948</td><td>15/15</td></tr>
            <tr><th scope="row">Doubled supercell</th><td>0.965</td><td>15/15</td></tr>
            <tr><th scope="row"><em>Real 10% scale change (control)</em></th><td>0.996</td><td><em>0/15, as intended</em></td></tr>
          </tbody>
        </table>
      </div>

      <p>All 90 equivalent comparisons produced bit-identical environment channels, and the real physical change still changed them in every case. Standardization removes convention noise without hiding genuine differences between materials.</p>

      <h2 id="results-at-scale">At scale: 13,312 descriptions</h2>

      <p>We then repeated the test on 512 MP20 crystals, each written in 26 equivalent descriptions: rotations, translations, atom reorderings, random basis changes, Niggli, conventional and primitive cells, and several supercells.</p>

      <div role="region" aria-labelledby="crystal-scale" tabIndex={0}>
        <table>
          <caption id="crystal-scale">512 MP20 crystals × 26 descriptions. Prediction drift uses linear predictors of formation energy and interatomic distances.</caption>
          <thead><tr><th scope="col"><strong>Measure across equivalent descriptions</strong></th><th scope="col"><strong>Without standardization</strong></th><th scope="col"><strong>With standardization</strong></th></tr></thead>
          <tbody>
            <tr><th scope="row">Environment channels bit-identical</th><td>lowest similarity 0.27</td><td>96–100% of cases</td></tr>
            <tr><th scope="row">Prediction drift, as share of predictor error</th><td>24–44%</td><td>1.3–1.7%</td></tr>
          </tbody>
        </table>
      </div>

      <p>The result holds at scale: equivalent descriptions of the same crystal now produce the same token, and predictions made from those tokens agree to within about 1.5% of the predictor's own error, down from as much as 44%.</p>

      <p>Unique crystal descriptions are also the goal of string representations such as <a href="https://proceedings.neurips.cc/paper_files/paper/2024/hash/e23133d34964a0a09f6d076fc4b922a4-Abstract-Conference.html">Mat2Seq</a> and <a href="https://www.nature.com/articles/s41467-023-42870-7">SLICES</a>. We reach the same goal for a continuous per-atom token by standardizing the input with established crystallographic tools, so the guarantee does not depend on the encoder.</p>

      <h2 id="why-it-matters">Why it matters</h2>

      <ul>
        <li><strong>Predictions that follow the material, not the notation.</strong> Rewriting a crystal's unit cell raised a trained model's formation-energy error by 65–72%. Standardized input gives the encoder the same numbers for every equivalent description.</li>
        <li><strong>A stable identity for each crystal.</strong> Every equivalent description of the same standardized crystal maps to the same token, so the token can serve as a consistent key for that structure.</li>
        <li><strong>Verifiable geometry.</strong> Positions live in one part of the token and come back with sub-milliångström error, so structures can be reconstructed and checked.</li>
        <li><strong>Encoder-independent.</strong> Standardization sits in front of the encoder, so any future encoder inherits the same guarantee without retraining.</li>
      </ul>

      <h2 id="measurement">How we measured</h2>

      <p><strong>Representation:</strong> Shodh crystal codec release candidate rc.3, with BF16 storage.</p>

      <p><strong>Standardization:</strong> spglib 2.7.0 at symprec 10⁻⁵, designed for clean, database-quality structures such as MP20. Atomic noise of 10⁻⁴ Å or more can change the standardized cell, so noisy experimental or relaxed structures need a tolerance-aware variant.</p>

      <p><strong>Tests:</strong> 15 structures × 6 equivalent changes plus a scale control; 512 MP20 training structures × 26 descriptions (13,312 variants). "Identical" means bit-identical stored values.</p>

      <p><strong>Prediction sensitivity:</strong> transformer regressors trained on raw MP20 descriptions, three seeds, all 9,046 MP20 test structures, prediction only, with two random equivalent basis changes; paired bootstrap confidence intervals with 10,000 resamples. A model trained on raw descriptions must be retrained on standardized inputs to benefit from standardization.</p>

      <p><strong>Prediction drift:</strong> ridge predictors with training-only normalization, fitted on composition-separated MP20 training structures; drift is the mean change in prediction between equivalent descriptions, divided by the predictor's error.</p>

      <p><strong>Geometry:</strong> full encode–decode round trip on 1,000 MP20 test structures and on 1,200 larger non-MP20 crystals (14–252 atoms), all matched by pymatgen StructureMatcher at default tolerances; position error is the Cartesian minimum-image RMSD per structure, with BF16 storage. Channel-zeroing tests on synthetic test crystals.</p>

      <h2 id="references">References</h2>

      <ul>
        <li>spglib: <a href="https://spglib.readthedocs.io/">spglib.readthedocs.io</a></li>
        <li>Mat2Seq, NeurIPS 2024: <a href="https://proceedings.neurips.cc/paper_files/paper/2024/hash/e23133d34964a0a09f6d076fc4b922a4-Abstract-Conference.html">proceedings.neurips.cc</a></li>
        <li>SLICES, Nature Communications 2023: <a href="https://www.nature.com/articles/s41467-023-42870-7">nature.com/articles/s41467-023-42870-7</a></li>
      </ul>
    </>
  );
}
