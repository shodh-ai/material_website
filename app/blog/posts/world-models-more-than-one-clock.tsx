import Image from "next/image";
import Link from "next/link";

export const worldModelsClockSlug = "industrial-world-models-need-more-than-one-clock";
export const worldModelsClockAssets = `/blog/${worldModelsClockSlug}`;

export const worldModelsClockSections = [
  { id: "multiphysics", title: "Multiphysics: material memory changes the flow" },
  { id: "multidomain", title: "Multidomain: a tensor shape is not a physical contract" },
  { id: "multiscale", title: "Multiscale: test what survives a change of scale" },
  { id: "multitemporal", title: "Multitemporal: stability belongs to the update" },
  { id: "column-and-skid", title: "One process example: the column is not the skid" },
  { id: "components-together", title: "Bringing the components together" },
  { id: "sources-and-scope", title: "Sources and scope" },
];

export default function WorldModelsClock() {
  return (
    <>
      <p>In a 128³ channel calculation, the relative L<sub>2</sub> errors against an analytical reference were 0.24% for velocity and 10.33% for polymer shear stress. Both numbers describe the same flow over the same 0.32-second interval. Judging the calculation only by its velocity would miss an error in the quantity that feeds back into momentum.</p>

      <p>At Shodh, this is why we examine four connected dimensions: physics, representation, spatial resolution and time. Our work spans bioreactors, molecular and material interfaces, polymer-fluid models and learned dynamics. The common requirement is that accuracy inside each component must survive the exchanges between components.</p>

      <div role="region" aria-label="Four coupled dimensions" tabIndex={0}>
        <table>
          <thead><tr><th scope="col">Dimension</th><th scope="col">What must agree</th><th scope="col">Example from our work</th></tr></thead>
          <tbody>
            <tr><th scope="row">Multiphysics</th><td>Interactions, sources and physical balances</td><td>Polymer-stress feedback and bioreactor balances</td></tr>
            <tr><th scope="row">Multidomain</th><td>Meaning across different scientific representations</td><td>Typed molecular, material and continuum interfaces</td></tr>
            <tr><th scope="row">Multiscale</th><td>Information exchanged between spatial descriptions</td><td>Particle-grid coupling and fixed-domain refinement</td></tr>
            <tr><th scope="row">Multitemporal</th><td>Fast dynamics, observation intervals and forecast steps</td><td>Stiff integration tests and learned rollout evaluation</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="multiphysics">Multiphysics: material memory changes the flow</h2>

      <p>In a viscoelastic liquid, flow deforms the polymer configuration; the resulting stress changes the momentum balance. Predicting stress from a prescribed velocity is useful, but it omits this return path. Our Oldroyd-B solver evolves both directions of the interaction.</p>

      <p>We tested the return path with paired planar runs. Within each pair, the channel, material properties, initial state and driving pulse were identical. One returned polymer stress to momentum; the other evolved stress passively. Removing feedback increased mean streamwise velocity at 0.32 s by 1.34% at N = 32 and 1.62% at N = 64. The continuum reference predicts 1.97%. The response moves towards the reference with refinement, but remains underestimated.<sup><a href="#world-models-clock-note-6">[6]</a></sup> This comparison measures the effect of one coupling, rather than inferring it from a list of fields.</p>

      <p>The same test applies wherever two processes exchange a conserved quantity. Across the team, we build and audit coupled solvers in many fields; the table lists one measured check from each.</p>

      <div role="region" aria-label="Measured checks for physical couplings" tabIndex={0}>
        <table>
          <thead><tr><th scope="col">Coupling</th><th scope="col">Measured check</th></tr></thead>
          <tbody>
            <tr><th scope="row">Electrochemistry ↔ flow ↔ dissolving wall</th><td>34 units lost by the solid and 34 gained by the fluid: zero cross-domain mass error, fluid drift 2.5 × 10<sup>−6</sup></td></tr>
            <tr><th scope="row">DNA/RNA chain ↔ 3D fluid, two-way forces</th><td>Mass drift 2.9 × 10<sup>−6</sup>, with polymer continuity preserved</td></tr>
            <tr><th scope="row">CO₂ ↔ brine in porous rock</th><td>Mass drift ≤ 1.4 × 10<sup>−7</sup> (CO₂) and ≤ 1.6 × 10<sup>−7</sup> (brine) on a 64³ grid across 64 TPU chips</td></tr>
            <tr><th scope="row">Heat ↔ solute ↔ phase in alloy melting</th><td>Solute drift 1.9 × 10<sup>−16</sup> over 1,000 FP64 steps, with GPU fields matching CPU</td></tr>
          </tbody>
        </table>
      </div>

      <p><small>Each check comes from a conservation-audited run in our engineering records. The same audits run on our semiconductor charge-transport and cavitation-damage solvers.<sup><a href="#world-models-clock-note-1">[1]</a></sup></small></p>

      <p>Our bioreactor framework addresses related accounting across 28 state, boundary and control channels and 58 observables, including viscosity and biochemical feedback. In an open, reacting system, inventory changes must agree with inflow, outflow and sources. These mechanisms still require validation for the intended operating conditions.<sup><a href="#world-models-clock-note-1">[1]</a></sup></p>

      <h2 id="multidomain">Multidomain: a tensor shape is not a physical contract</h2>

      <p>A molecular graph, bead chain, crystal lattice and continuum field describe different objects. A valve state changes which paths through equipment are available. Equal vector widths do not make these representations interchangeable.</p>

      <p>Our interface work separates model compatibility from physical meaning. ABI specifications identify representations, versions and decoding conventions. TCPI mappings carry units, coordinates, masks, field roles and time conventions.</p>

      <p>We test every representation the same way: store it, reopen it, transform the input in a way that should not matter, and check what changes. The table shows that test across the domains our team represents.</p>

      <div role="region" aria-label="Measured checks for scientific representations" tabIndex={0}>
        <table>
          <thead><tr><th scope="col">Domain</th><th scope="col">Measured check</th></tr></thead>
          <tbody>
            <tr><th scope="row">Coarse-grained molecules</th><td>A stored-byte audit flagged a rotation dependence; a canonical frame now gives rotation cosine 1.0 with position error 2.2 × 10<sup>−5</sup></td></tr>
            <tr><th scope="row">Antibodies</th><td>Coordinates decode to 0.02 Å; a sequence-anchored frame keeps stored tokens bit-identical under all 9,760 tested rotations</td></tr>
            <tr><th scope="row">Organic crystals</th><td>After storage and reopening, cosine ≥ 0.9999993 under shifts and rotations; median position error 0.014 Å</td></tr>
            <tr><th scope="row">Stereochemistry</th><td>A probe distinguished mirror-image molecules that earlier features had merged; the successor reaches parity error 3.3 × 10<sup>−16</sup></td></tr>
          </tbody>
        </table>
      </div>

      <p>The same test covers our lipid-nanoparticle, crystal-symmetry and magnetised-fluid representations. Two further checks caught errors that shapes alone would have hidden. A candidate token bank mixing nanometre and ångström conventions was rejected. And two open-source implementations of the same coarse-grained protein model had identical parameter tables, yet one cut off 4 of 210 residue-pair interactions early; the glycine–glycine pair lost the last 0.2 nm of its range.<sup><a href="#world-models-clock-note-1">[1]</a></sup></p>

      <p>These tests make each representation trustworthy on its own. The next step builds on them: composing two domains end to end, with molecular output driving a continuum model. Molecular-simulation parameters already feed our continuum fluid solver in one direction.</p>

      <p>Basis and meaning matter as much as units: liquid-volume concentration differs from packed-bed concentration, and a temperature target differs from an observation. Typed interfaces make these distinctions inspectable; they do not by themselves establish predictive generalisation.</p>

      <h2 id="multiscale">Multiscale: test what survives a change of scale</h2>

      <p>Our particle-fluid work couples a coarse-grained chain to a D3Q27 fluid grid: velocities are interpolated to beads and drag reactions are distributed back. That implements an exchange between spatial descriptions; it does not alone validate a range of physical scales.<sup><a href="#world-models-clock-note-1">[1]</a></sup></p>

      <p>Some of our models exchange information in both directions between particle and continuum descriptions. In a two-way particle–fluid slurry model, the fluid carries the particles while local particle crowding changes the fluid’s effective viscosity and permeability. The proof-of-concept run jammed at 0.075 s and produced a viscosity spike at 0.725 s, with zero particle mass drift. Its coupling rules are proxies that still need physical benchmarks.<sup><a href="#world-models-clock-note-1">[1]</a></sup></p>

      <p>Fidelity at one scale does not automatically carry into dynamics at another. Coarse-grained molecular tokens reproduced fine-grained forces with a cosine of 0.9999 across about ten billion token equivalents, yet an adapter built on them failed an eight-step rollout test.<sup><a href="#world-models-clock-note-1">[1]</a></sup></p>

      <p>Within a single description, we also check what survives a change of resolution. We added a quantitative check using recovered viscoelastic runs. The physical box stayed at 4 cm and the fluid gap at 3.75 cm as the grid changed from 32³ to 64³ to 128³. Halving cell width quartered the timestep. Against an independent Oldroyd-B continuum reference, velocity error fell from 1.49% to 0.53% to 0.24%; shear-stress error fell from 23.17% to 15.31% to 10.33%.<sup><a href="#world-models-clock-note-6">[6]</a></sup></p>

      <figure>
        <Image src={`${worldModelsClockAssets}/stress-feedback-and-grid-refinement.png`} alt="Velocity and shear-stress errors fall under grid refinement. Removing polymer-stress feedback increases mean flow by 1.34% and 1.62% at grid sizes 32 and 64, below the 1.97% continuum prediction." width={1650} height={561} unoptimized />
        <figcaption>Figure 1. A: archived H100 fields compared at fluid-cell centres over 17 times through 0.32 s; both space and time are refined. B: planar symmetry-reduced CPU pairs reproduced full-grid velocity controls before disabling stress feedback. The dashed line is the continuum prediction. Numerical validation, not experimental calibration.<sup><a href="#world-models-clock-note-6">[6]</a></sup></figcaption>
      </figure>

      <p>A second Oldroyd-B case gave the same trend, reaching 0.28% velocity error and 9.48% shear-stress error on 128³. In the baseline case, over 99% of squared stress error lay in the first fluid layer beside each wall. We retain those cells in the metric: wall behaviour is part of the physical problem. These tests establish bounded resolution consistency, not atomistic-to-factory accuracy.</p>

      <h2 id="multitemporal">Multitemporal: stability belongs to the update</h2>

      <p>Different spatial descriptions also carry different clocks. Fast relaxation can constrain a numerical step even when the observable of interest changes slowly. Integrator steps, saved-frame intervals and forecast horizons are separate choices.</p>

      <p>For the stable relaxation <var>dy/dt</var> = −<var>λy</var>, forward Euler multiplies the state by 1 − <var>λh</var> and becomes unstable for <var>h</var> &gt; 2/<var>λ</var>. The exact update multiplies it by exp(−<var>λh</var>) and stays stable. Both advance one state to the next. Autoregression itself is therefore not the cause of failure; the learned or numerical update must remain accurate and stable at its chosen interval. Implicit and multirate methods address this distinction.<sup><a href="#world-models-clock-note-2">[2]</a></sup></p>

      <p>In our synthetic coupled test, fast and slow rate coefficients were 50 and 0.01. At a one-second step, explicit RK4 became unstable; an implicit-fast, explicit-slow scheme completed 1,000 steps with terminal-state MSE 2.43 × 10<sup>−10</sup> against an analytical reference. This demonstrates a stability difference, not equal-accuracy speed or industrial validation.<sup><a href="#world-models-clock-note-1">[1]</a></sup></p>

      <p>In the numerical Protein A cycle, the adaptive implicit protein solver took 24.7 s of CPU wall time for loading and washing and 1,050 s for elution. These timings exclude the separately computed elution chemistry and valve routing.<sup><a href="#world-models-clock-note-4">[4]</a></sup></p>

      <p>Stability is only the first test. A bounded trajectory can still follow the wrong dynamics, and a small final error can hide an inaccurate transient. Accuracy must be measured across the trajectory before comparing the computational cost of competing updates.</p>

      <p>One-step accuracy is not rollout accuracy. A learned surrogate of an electro-chemo-mechanical battery model passed one-step validation, but its best recursive rollout reached a mass drift of 0.277 against a limit of 0.2, and a stress error of 0.354 against 0.1. A learned bioreactor oxygen-transfer model showed the same pattern, passing a single step but not a rollout. Both were caught because the rollout was tested rather than assumed.<sup><a href="#world-models-clock-note-1">[1]</a></sup></p>

      <p>Learned rollouts require their own evaluation. The LUCAN-10B-Physics report compares advection forecasts with a Fourier neural operator (FNO) and U-Net at steps 1, 5 and 10. U-Net is slightly more accurate initially, while LUCAN accumulates less error over this tested horizon.<sup><a href="#world-models-clock-note-3">[3]</a></sup></p>

      <figure>
        <Image src={`${worldModelsClockAssets}/advection-forecast-errors.png`} alt="Advection errors for LUCAN, FNO and U-Net at forecast steps 1, 5 and 10. At step 10, mean relative L2 errors are 0.00333, 0.02848 and 0.02190, respectively." width={1650} height={550} unoptimized />
        <figcaption>Figure 2. Reported mean relative L<sub>2</sub> errors on 1,000 advection cases. Points are the three reported evaluation horizons; connecting lines are visual guides. These are learned-model comparisons, separate from the synthetic integration test and from an industrial LUCAN-plus-solver rollout.<sup><a href="#world-models-clock-note-3">[3]</a></sup></figcaption>
      </figure>

      <p>Sampling can fail before forecasting begins. Our rotating-flow audit found about 95.6° of impeller rotation between saved frames at high speed. That prompted scrutiny of what motion the observations resolve; it was not proof that every model must fail. A long token sequence cannot recover information the sampling scheme never recorded.<sup><a href="#world-models-clock-note-1">[1]</a></sup></p>

      <h2 id="column-and-skid">One process example: the column is not the skid</h2>

      <p>Protein A chromatography illustrates how these interfaces affect an equipment prediction. In a numerical case at 0.4 mL/min through a nominal 2 mL column, the predicted peak reached the column outlet at 669.1 s, the detector flow cell at 693.4 s and the collection valve at 730.9 s. The same transported protein produced different signals at different locations.<sup><a href="#world-models-clock-note-4">[4]</a></sup></p>

      <figure>
        <Image src={`${worldModelsClockAssets}/protein-a-elution-at-three-locations.png`} alt="The numerical Protein A elution peak shifts later from the column outlet through the detector flow cell to the collection valve. The raw outlet curve contains a grid ripple that is absent in the other curves." width={1440} height={700} unoptimized />
        <figcaption>Figure 3. The same predicted elution at three equipment locations, from the saved curves. Equipment transport delays the predicted valve peak by 61.75 s. The ripple on the column-outlet curve is a numerical artefact of the column model’s axial grid, not a physical oscillation: each ripple spans two cells of the 128-cell grid and carries no net mass, and the bold curve averages over one ripple. The detector and valve curves are unaffected. The column calculation is not yet grid-converged, and the equipment is a stand-in model; these are neither measured chromatograms nor calibrated UV signals.<sup><a href="#world-models-clock-note-4">[4]</a></sup></figcaption>
      </figure>

      <h2 id="components-together">Bringing the components together</h2>

      <p>LUCAN’s Mamba-attention mixture-of-experts architecture supplies learned representations and sequence processing. Solvers supply specified dynamics; typed interfaces make exchanges explicit. Physical projections can impose selected constraints: in a separate 16-case Sod replay, the TCPI projection reduced the maximum relative mass residual from 0.15622 to 6.57 × 10<sup>−9</sup>. Global inventory agreement still does not establish local conservation or correct trajectories.<sup><a href="#world-models-clock-note-3">[3]</a></sup></p>

      <p>Computation must also be affordable. Our reactor transport stencil ran 36.1× faster than eager PyTorch and about 6.8% faster than a precision-compatible compiled baseline, with bit-identical output. Across three rounds on an eight-H100 node, the complete pipeline with every output hash matching delivered a median 1.34× throughput gain. These are implementation gains, not evidence of learned predictive accuracy.<sup><a href="#world-models-clock-note-5">[5]</a></sup></p>

      <p>ProcessGraph and Living Machines build towards reuse across these boundaries: change equipment while retaining the molecular description, or change the product while retaining qualified equipment physics. The decisive test is a held-out coupled run, with forecasts fixed before measurements are assessed. Our current results establish pieces of that system. The research task is to make their accuracy survive the connections.</p>

      <h2 id="sources-and-scope">Sources and scope</h2>

      <ol>
        <li id="world-models-clock-note-1">Shodh AI Research engineering records, May–October 2026.</li>
        <li id="world-models-clock-note-2">SUNDIALS: <a href="https://sundials.readthedocs.io/en/latest/arkode/Mathematics_link.html">mathematical considerations</a>.</li>
        <li id="world-models-clock-note-3">Shodh AI Research. <cite>LUCAN-10B-Physics: A Sparse Foundation Model for Cross-Scale Physical Prediction</cite>. Technical report, 2026. Advection: Table 2; Sod replay: Table 4.</li>
        <li id="world-models-clock-note-4">Shodh AI Research, numerical Protein A routing and full-cycle replay, November 2026: 2 mL column, 0.4 mL/min, 15 g/L bed loading. Numerical demonstration, not physical validation.</li>
        <li id="world-models-clock-note-5">Shodh AI Research. <cite>Bit-Exact Kernel Fusion for Reactor Trajectory Generation on NVIDIA H100 GPUs</cite>. Preprint, November 2026. Stencil: eager / compiled / Triton 47.387 / 1.404 / 1.314 ms; node throughput median of three paired rounds (range 0.63–2.49×). <Link href="/engineering/h100-bit-exact-triton">Read the engineering article</Link>.</li>
        <li id="world-models-clock-note-6">November 2026 reanalysis of July H100 viscoelastic runs and paired planar CPU diagnostics. Baseline: density 1,000 kg/m³, solvent/polymer viscosities 0.04/0.01 Pa·s, relaxation 0.1 s; ramped drive ends at 0.16 s. Symmetry-reduced controls matched full-grid streamwise velocities. Fourier reference cross-checked with BDF. Synthetic parameters; no plant qualification.</li>
      </ol>
    </>
  );
}
