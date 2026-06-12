import Link from "next/link";

const sop001PdfUrl = "/pdf/SOP-001_solid_state_battery_electrolyte.pdf";
const sop002PdfUrl = "/pdf/SOP-002_highly_branched_SAF.pdf";
const daeLetterUrl = "/pdf/Letter-to-Secretary-DAE.pdf";

const safRows = [
  [
    "Freezing / Pour Point",
    "-68.4 deg C",
    "-67.9 deg C",
    "0.5 deg C",
    "Differential Scanning Calorimetry (DSC) / ASTM D97",
  ],
  [
    "Specific Energy Density",
    "43.95 MJ/kg",
    "43.81 MJ/kg",
    "0.14 MJ/kg",
    "Bomb Calorimetry (ASTM D4809) / GC-FID",
  ],
  [
    "Kinematic Viscosity (-20 deg C)",
    "6.82 cSt",
    "6.91 cSt",
    "0.09 cSt",
    "Capillary Viscometer (ASTM D445)",
  ],
  [
    "Synthesis Execution",
    "Protocol compiled in 0.84 sec",
    "Lab synthesis completed",
    "PASS",
    "Standard Operating Procedure (SOP-002)",
  ],
];

const batteryRows = [
  [
    "Ionic Conductivity (25 deg C)",
    "1.25 x 10^-3 S/cm",
    "1.22 x 10^-3 S/cm",
    "0.03 S/cm",
    "Electrochemical Impedance Spectroscopy (EIS)",
  ],
  [
    "Anodic Stability (ESW)",
    "4.85 V vs Li/Li+",
    "4.81 V vs Li/Li+",
    "0.04 V",
    "Linear Sweep Voltammetry (LSV)",
  ],
  [
    "Lithium Transference Number (tLi+)",
    "0.68",
    "0.66",
    "0.02",
    "Bruce-Vincent-Evans Method",
  ],
  [
    "Thermal Degradation Onset",
    "245.0 deg C",
    "242.5 deg C",
    "2.5 deg C",
    "Thermogravimetric Analysis (TGA)",
  ],
  [
    "Robotic Workflow",
    "Protocol compiled in 0.54 sec",
    "Lab synthesis completed",
    "PASS",
    "Standard Operating Procedure (SOP-001)",
  ],
];

const competitiveRows = [
  [
    "Engineering Physics AI",
    "PhysicsX, Neural Concept, BeyondMath, Luminary Cloud, Godela, Trim",
    "CFD, FEA, CAD, simulation acceleration, engineering optimization",
    "Strong companies, but centered on engineering simulation",
    "Shodh connects engineering physics to molecular discovery and process scale-up",
    "Competitor / API customer / platform partner",
  ],
  [
    "Molecular Discovery AI",
    "SandboxAQ, Isomorphic Labs, Insilico Medicine",
    "Molecules, drugs, quantitative models, discovery pipelines",
    "Strong at discovery, but less focused on plant-scale manufacturability",
    "Shodh couples discovery with synthesis, process, and scale-up",
    "Scale-up backend / validation layer",
  ],
  [
    "Autonomous Lab / AI Science Factories",
    "Lila Sciences, Radical AI, Periodic Labs, Yoneda Labs",
    "Robotic labs, closed-loop experiments, AI-driven testing",
    "Accelerate experimentation, but remain lab-first",
    "Shodh is simulation-first and uses labs for targeted validation",
    "Robotic execution partner / customer",
  ],
  [
    "Digital Twin / Spatial AI",
    "Geminus, World Labs",
    "Industrial monitoring, digital twins, spatial world models",
    "Valuable for representation and monitoring",
    "Shodh focuses on invention, inverse design, and manufacturing feasibility",
    "Physics engine / predictive layer",
  ],
  [
    "Legacy Simulation",
    "Ansys, Schrodinger, COMSOL, traditional CAE/chemistry tools",
    "Trusted solvers and enterprise workflows",
    "Accurate but often slow, fragmented, and forward-only",
    "Shodh aims to combine AI speed with physics-grounded validation",
    "Validation backend / acquisition target / replacement",
  ],
];

function DossierHeader({
  eyebrow,
  title,
  summary,
  status,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  status: string;
}) {
  return (
    <header className="mb-10 border-b border-slate-200 pb-8">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            {eyebrow}
          </p>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            {title}
          </h2>
        </div>
        <p className="w-fit shrink-0 border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-800">
          {status}
        </p>
      </div>
      <p className="max-w-4xl text-base leading-7 text-slate-700">{summary}</p>
    </header>
  );
}

function ValidationTable({
  rows,
  caption,
}: {
  rows: string[][];
  caption: string;
}) {
  return (
    <figure className="my-7">
      <figcaption className="border-x-2 border-t-2 border-slate-300 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800">
        {caption}
      </figcaption>
      <div className="overflow-x-auto border-2 border-slate-300 bg-white">
        <table className="w-full min-w-[980px] border-collapse text-sm">
          <thead>
            <tr className="bg-slate-200 text-slate-950">
              <th className="w-[24%] border border-slate-300 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                Property
              </th>
              <th className="w-[18%] border border-slate-300 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                UNIPHY Prediction
              </th>
              <th className="w-[18%] border border-slate-300 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                Wet-Lab Measurement
              </th>
              <th className="w-[13%] border border-slate-300 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                Delta Error
              </th>
              <th className="border border-slate-300 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                Analytical Evidence
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row[0]}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50"}
              >
                <td className="border border-slate-300 px-4 py-3 align-top font-semibold text-slate-950">
                  {row[0]}
                </td>
                <td className="border border-slate-300 px-4 py-3 align-top font-mono text-[13px] text-slate-800">
                  {row[1]}
                </td>
                <td className="border border-slate-300 px-4 py-3 align-top font-mono text-[13px] font-semibold text-slate-950">
                  {row[2]}
                </td>
                <td className="border border-slate-300 bg-amber-50 px-4 py-3 align-top font-mono text-[13px] font-semibold text-slate-950">
                  {row[3]}
                </td>
                <td className="border border-slate-300 px-4 py-3 align-top text-slate-700">
                  {row[4]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function CompetitiveMatrixTable() {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <figcaption className="border-b border-slate-200 bg-slate-950 px-5 py-4 text-sm font-semibold uppercase tracking-wide text-white">
        Competitive Matrix
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1180px] border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-950">
              <th className="border-b border-r border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                Category
              </th>
              <th className="border-b border-r border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                Companies
              </th>
              <th className="border-b border-r border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                What They Are Strong At
              </th>
              <th className="border-b border-r border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                Shodh's View
              </th>
              <th className="border-b border-r border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                Shodh Differentiation
              </th>
              <th className="border-b border-r border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-600">
                Potential Relationship
              </th>
            </tr>
          </thead>
          <tbody>
            {competitiveRows.map((row, rowIndex) => (
              <tr
                key={row[0]}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50"}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cell}
                    className={`border-b border-r border-slate-100 px-4 py-4 align-top leading-6 ${cellIndex === 0 ? "font-semibold text-slate-950" : "text-slate-700"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export default function InvestorDataRoomPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        <header className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-7 text-white md:flex-row md:items-start md:justify-between md:px-8 md:py-9">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-200">
                Shodh AI Investor Data Room
              </p>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Technical Validation Dossiers
              </h1>
            </div>
            <p className="w-fit border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-100">
              Confidential Review
            </p>
          </div>
          <p className="max-w-3xl px-6 py-5 text-base leading-7 text-slate-700 md:px-8">
            Investor-ready technical packet covering autonomous discovery
            programs, source SOPs, empirical measurements, sovereign validation,
            and commercial scale-up paths.
          </p>
        </header>

        <article
          id="competitive-philosophy"
          className="mb-12 scroll-mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <header className="border-b border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-10 text-white md:px-10 md:py-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-200">
              Confidential — Data Room
            </p>
            <h2 className="max-w-5xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Shodh AI Competitive Matrix & Core Philosophy
            </h2>
          </header>

          <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
            <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
              1. Core Thesis: The Physical World Is One System
            </h3>
            <div className="max-w-4xl space-y-2 leading-7 text-neutral-800 [&_p]:max-w-3xl [&_strong]:text-slate-950">
              <p>
                The current AI-for-science market is fragmented because human
                science is fragmented.
              </p>
              <p>
                Humans separated chemistry, materials, fluid dynamics, process
                engineering, and manufacturing because no human team can reason
                across every scale at once. But physics does not have those
                boundaries.
              </p>
              <p>
                A molecule does not stop obeying physics when it enters a
                reactor. A promising material does not become a product unless
                it survives synthesis, heat transfer, mixing, flow behavior,
                yield, quality control, cost, and plant constraints.
              </p>
              <p>Discovery and scale-up are not two separate problems.</p>
              <p>They are one multiscale physical optimization problem.</p>
              <p>Shodh AI is built on this thesis:</p>
              <p className="rounded-2xl border border-blue-100 border-l-4 border-l-blue-600 bg-blue-50 px-5 py-4 font-semibold text-blue-950 shadow-sm">
                The winning AI company for the physical world will not only
                discover candidates. It will design candidates that can be
                manufactured.
              </p>
            </div>
          </section>

          <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
            <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
              2. The Market Problem: Competitors Are Strong, But Siloed
            </h3>
            <div className="max-w-4xl space-y-2 leading-7 text-neutral-800 [&_p]:max-w-3xl [&_strong]:text-slate-950">
              <p>The AI-for-science market is not weak. It is fragmented.</p>
              <p>Most companies are solving one layer of the physical world:</p>
              <ul className="grid list-disc gap-2 rounded-xl border border-slate-200 bg-white p-5 pl-8 md:grid-cols-2">
                <li>molecular discovery,</li>
                <li>engineering simulation,</li>
                <li>autonomous wet-lab experimentation,</li>
                <li>industrial digital twins,</li>
                <li>or spatial world modeling.</li>
              </ul>
              <p>
                Shodh’s belief is that these layers should not remain separate
                products.
              </p>
              <p>They should become one physics-native invention system.</p>
            </div>
          </section>

          <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
            <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
              3. Competitive Landscape
            </h3>
            <div className="grid gap-5 leading-7 text-neutral-800 md:grid-cols-2 [&_div]:rounded-xl [&_div]:border [&_div]:border-slate-200 [&_div]:bg-white [&_div]:p-5 [&_p]:mt-1 [&_p]:text-slate-700">
              <div>
                <h4 className="mb-2 font-semibold text-slate-950">
                  A. Engineering Physics AI
                </h4>
                <p>
                  Examples: PhysicsX, Neural Concept, BeyondMath, Luminary
                  Cloud, Godela & Trim.
                </p>
                <p>
                  These companies are focused on accelerating engineering
                  simulation, CFD, FEA, CAD-native optimization, thermal
                  modeling, aerodynamics, and industrial design workflows.
                </p>
                <p>
                  They are valuable companies. Many are technically strong and
                  commercially credible.
                </p>
                <p>
                  But their center of gravity is the engineering layer: shapes,
                  structures, fluids, thermal behavior, and simulation
                  acceleration.
                </p>
                <p>
                  Shodh’s view: engineering simulation alone is not enough. The
                  harder problem is connecting molecular invention to
                  manufacturable process behavior.
                </p>
                <p>
                  A model that can optimize the shape of a reactor, turbine,
                  aircraft, or flow path is powerful. But it is not the same as
                  a system that can reason from molecular structure to reaction
                  pathway to yield to scale-up to plant operating window.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-slate-950">
                  B. Molecular and Discovery AI
                </h4>
                <p>
                  Examples: SandboxAQ, Isomorphic Labs, Insilico Medicine, and
                  related AI-drug/materials companies.
                </p>
                <p>
                  These companies focus on molecular generation, quantitative
                  modeling, drug discovery, protein/ligand interactions, and
                  material-property prediction.
                </p>
                <p>They are extremely strong at the discovery layer.</p>
                <p>
                  Shodh’s view: discovery alone is not enough. The bottleneck
                  increasingly moves downstream into synthesis, yield, process
                  robustness, stability, operating windows, and factory
                  constraints.
                </p>
                <p>
                  A molecule that looks promising in silico is not yet a
                  product. A drug candidate, material, formulation, catalyst,
                  battery chemistry, or specialty chemical still has to be made
                  reliably, safely, economically, and at scale.
                </p>
                <p>
                  Shodh’s bet is that discovery and scale-up should be coupled
                  from the beginning.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-slate-950">
                  C. Autonomous Lab / AI Science Factory Companies
                </h4>
                <p>
                  Examples: Lila Sciences, Radical AI, Periodic Labs, Yoneda
                  Labs.
                </p>
                <p>
                  These companies are building closed-loop experimental systems,
                  robotic labs, AI chemists, and AI science factories.
                </p>
                <p>
                  They are important because they recognize that AI must connect
                  to reality.
                </p>
                <p>
                  Shodh’s view: robotic labs accelerate experimentation, but
                  experimentation is still expensive, slow, and physically
                  constrained.
                </p>
                <p>
                  The winning system should shift most search into a
                  high-fidelity virtual physics environment and use labs for
                  targeted validation.
                </p>
                <p>Robotic labs improve the old loop:</p>
                <p>guess → test → learn → repeat</p>
                <p>Shodh is building toward a different loop:</p>
                <p>simulate → inverse-design → validate → scale</p>
                <p>
                  The lab remains important. But the lab should not be the
                  primary search engine. It should be the validation layer for a
                  physics-native model that has already narrowed the search
                  space.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-slate-950">
                  D. Digital Twin and Spatial Intelligence Companies
                </h4>
                <p>
                  Examples: Geminus, World Labs, and related digital twin /
                  spatial AI companies.
                </p>
                <p>
                  These systems help represent, monitor, or generate parts of
                  the real world.
                </p>
                <p>
                  Digital twins are valuable for existing industrial systems.
                  Spatial world models are valuable for robotics, simulation,
                  media, and embodied intelligence.
                </p>
                <p>Shodh’s view: representation is not enough.</p>
                <p>
                  The harder problem is not only modeling what exists. It is
                  inventing what should exist, predicting whether it can be
                  made, and designing the path from discovery to manufacturing.
                </p>
              </div>
            </div>
          </section>

          <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
            <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
              4. Shodh’s Differentiation
            </h3>
            <div className="max-w-4xl space-y-2 leading-7 text-neutral-800 [&_p]:max-w-3xl [&_strong]:text-slate-950">
              <p>
                Shodh AI is not trying to be another faster simulator, another
                molecule generator, or another robotic lab.
              </p>
              <p>
                Shodh is building a physics-native AI system for invention and
                scale-up.
              </p>
              <p>Our differentiation is fourfold:</p>
              <ol className="grid list-decimal gap-5 pl-6 md:grid-cols-2 [&_li]:rounded-xl [&_li]:border [&_li]:border-slate-200 [&_li]:bg-white [&_li]:p-5 [&_li]:pl-7 [&_p]:mt-1 [&_p]:text-slate-700">
                <li>
                  <strong>Multiscale Physics</strong>
                  <p>
                    Shodh connects quantum, molecular, meso, fluid, and
                    process-scale reasoning inside one system.
                  </p>
                  <p>
                    We believe the same model family should reason across: molecular structure, reaction pathways, thermodynamics, fluid behavior, heat and mass transfer, reactor conditions, process constraints, and manufacturability.
                  </p>
                  <p>This is the core philosophical difference.</p>
                  <p>
                    Competitors often optimize one scale. Shodh is designed
                    around scale continuity.
                  </p>
                </li>
                <li>
                  <strong>Inverse Design</strong>
                  <p>Most systems are forward tools.</p>
                  <p>They answer:</p>
                  <p>“If I give you this candidate, what happens?”</p>
                  <p>Shodh is built around the harder question:</p>
                  <p>
                    “If I want this physical outcome, what candidate, chemistry,
                    process, and operating window should I create?”
                  </p>
                  <p>
                    This is the difference between prediction and invention.
                  </p>
                  <p>
                    Forward simulation helps evaluate ideas. Inverse design
                    helps generate better ones.
                  </p>
                </li>
                <li>
                  <strong>Simulation-First Discovery</strong>
                  <p>
                    Shodh’s thesis is that the physical world can be virtualized
                    with enough mathematical fidelity.
                  </p>
                  <p>
                    We do not believe the winning AI-science company will
                    brute-force the majority of discovery through physical
                    trial-and-error.
                  </p>
                  <p>
                    Instead, we believe most of the search should happen in
                    simulation, with physical experiments used for validation,
                    calibration, and grounding.
                  </p>
                  <p>
                    This mirrors what happened in autonomous vehicles, robotics,
                    aerospace, and advanced manufacturing: the winning systems
                    increasingly learn in high-fidelity simulated environments
                    before entering the real world.
                  </p>
                </li>
                <li>
                  <strong>Discovery-to-Manufacturing Continuity</strong>
                  <p>Most AI discovery systems stop too early.</p>
                  <p>They produce candidates.</p>
                  <p>
                    Shodh’s goal is to produce candidates with a path to
                    manufacturing.
                  </p>
                  <p>The critical questions are: Can this be synthesized? Can it be scaled? Can it remain stable? Can it avoid unsafe thermal or fluid behavior? Can it meet yield, cost, and quality constraints? Can it work on an existing production line?</p>
                  <p>This is Shodh’s wedge.</p>
                  <p>We do not stop at “new molecule” or “new material.”</p>
                  <p>We aim to answer:</p>
                  <p>Can this become a real-world product?</p>
                </li>
              </ol>
            </div>
          </section>

          <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
            <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
              5. Technical Differentiation: Why This Is Hard
            </h3>
            <div className="max-w-4xl space-y-2 leading-7 text-neutral-800 [&_p]:max-w-3xl [&_strong]:text-slate-950">
              <p>
                The reason this market is fragmented is not because competitors
                lack ambition.
              </p>
              <p>It is because multiscale physics is technically hard.</p>
              <p>
                A single system must reason across discrete and continuous domains: atoms and bonds, molecules and materials, reactions and thermodynamics, particles and fields, fluids and turbulence, reactors and factory processes.
              </p>
              <p>
                Traditional AI architectures are not naturally built for this.
              </p>
              <p>
                They often struggle with: fixed grids, quadratic attention costs, geometry changes, long-horizon physical dynamics, uncertainty under distribution shift, and weak coupling between molecular and process-scale physics.
              </p>
              <p>Shodh’s architecture is designed around these bottlenecks.</p>
            </div>
          </section>

          <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
            <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
              6. Shodh’s Mathematical Architecture: The Technical Moat
            </h3>
            <div className="grid gap-5 leading-7 text-neutral-800 md:grid-cols-2 [&_div]:rounded-xl [&_div]:border [&_div]:border-slate-200 [&_div]:bg-white [&_div]:p-5 [&_p]:mt-1 [&_p]:text-slate-700">
              <p>
                The reason the AI-for-science market is fragmented is that
                multiscale physics is mathematically hostile to standard AI
                architectures.
              </p>
              <p>
                A system that can reason from molecular discovery to factory scale-up must handle: discrete atoms and bonds, continuous fields and flows, stiff reaction dynamics, long-horizon process evolution, uncertainty under distribution shift, and geometry that cannot be reduced cleanly to fixed grids.
              </p>
              <p>
                Most AI systems fail because they are forced into one of two compromises: they become narrow simulators for one physics domain, or they become generic neural predictors with weak physical grounding.
              </p>
              <p>
                Shodh AI has built a full-stack architecture designed
                specifically to break these bottlenecks.
              </p>
              <div>
                <h4 className="mb-2 font-semibold text-slate-950">
                  A. Gridless Spatiotemporal Tokenization
                </h4>
                <p>The bottleneck:</p>
                <p>
                  Many physics-AI systems force physical reality into fixed
                  meshes, voxels, or CAD-specific grids. Fixed-grid
                  representations waste compute on empty space, blur fine
                  molecular structure, and make it mathematically impossible to
                  unify discrete atoms with continuous fluid fields.
                </p>
                <p>Shodh’s approach:</p>
                <p>We abandoned voxels.</p>
                <p>
                  Shodh utilizes a proprietary hybrid gridless representation.
                  The architecture compresses discrete 100,000-atom graphs and
                  continuous Mach 5 fluid waves into a shared latent space
                  utilizing Clifford-Fourier Neural Operators (CFNO) and Earth
                  Mover’s Distance (EMD) point-cloud tokenization.
                </p>
                <p>Why it matters:</p>
                <p>
                  One architecture supports materials, chemistry, process
                  engineering, fluids, scale-up, and manufacturing constraints
                  without rebuilding the model for every new geometry.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-slate-950">
                  B. Shared Latent Space Across Micro and Macro Physics
                </h4>
                <p>The bottleneck:</p>
                <p>
                  Competitors often build separate systems for separate physical
                  layers.
                </p>
                <p>One model predicts molecular properties. Another model simulates fluids. Another model monitors process data. Another model optimizes manufacturing.</p>
                <p>
                  These systems may be individually useful, but they do not
                  naturally reason together.
                </p>
                <p>
                  That is a problem because real-world physical outcomes are
                  coupled.
                </p>
                <p>A molecular change can alter viscosity. Viscosity can alter mixing. Mixing can alter heat transfer. Heat transfer can alter yield. Yield can alter cost, safety, and manufacturability.</p>
                <p>Shodh’s approach:</p>
                <p>
                  Shodh’s architecture is designed around a shared latent space
                  where molecular, thermodynamic, fluid, and process-scale
                  variables interact.
                </p>
                <p>The model is not built to answer only:</p>
                <p>“What is the property of this molecule?”</p>
                <p>or:</p>
                <p>“What is the flow field in this reactor?”</p>
                <p>It is built to answer:</p>
                <p>
                  “What molecule, material, formulation, or process condition
                  produces the target outcome and remains manufacturable at
                  scale?”
                </p>
                <p>Why it matters:</p>
                <p>
                  This is the difference between discovery AI and industrial
                  invention AI.
                </p>
                <p>
                  Shodh does not only evaluate candidates. It evaluates whether
                  candidates can become real-world products.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-slate-950">
                  C. Sparse Compound Mixture-of-Experts
                </h4>
                <p>The bottleneck:</p>
                <p>The physical world is too large for one dense model.</p>
                <p>
                  Quantum chemistry, molecular dynamics, thermodynamics, CFD,
                  and process control require different reasoning pathways. A
                  generic dense model wastes parameters, and disconnected
                  specialist models lose cross-scale continuity.
                </p>
                <p>Shodh’s approach:</p>
                <p>
                  Shodh utilizes a 100-Billion Parameter, 128-Expert Sparse
                  Mixture-of-Experts architecture.
                </p>
                <p>
                  To prevent expert collapse and token dropping during extreme
                  multiphysics training, we explicitly route tokens using
                  Sinkhorn Optimal Transport. This guarantees perfect load
                  balancing: quantum tokens route to micro-experts, and fluid
                  tokens route to macro-experts within the same forward pass.
                </p>
                <p>Why it matters:</p>
                <p>
                  This gives Shodh specialist performance in hard physics
                  domains while preserving shared reasoning across discovery,
                  simulation, and scale-up.
                </p>
                <p>
                  The result is not a patchwork of tools. It is a compound
                  physical intelligence system.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-slate-950">
                  D. Long-Horizon Physical Reasoning
                </h4>
                <p>The bottleneck:</p>
                <p>Physical systems evolve over time.</p>
                <p>
                  A chemical process cannot be understood from a single
                  snapshot.
                </p>
                <p>
                  A factory cannot be optimized from a five-second simulation.
                </p>
                <p>
                  Scale-up failures often appear only over long-horizon
                  dynamics.
                </p>
                <p>
                  Standard Transformer-style architectures face O(N²) quadratic
                  scaling limits, restricting them to short physical snapshots
                  before running out of GPU memory.
                </p>
                <p>Shodh’s approach:</p>
                <p>
                  To simulate 24-hour factory processes, Shodh replaced the
                  standard Transformer backbone with a 1:7 LatentMoE Mamba-2
                  Hybrid.
                </p>
                <p>
                  By utilizing State-Space Models, Shodh compresses historical
                  physics into a fixed-size hidden state, achieving O(1) memory
                  scaling.
                </p>
                <p>Why it matters:</p>
                <p>Industrial customers need confidence over time.</p>
                <p>
                  Shodh can ingest hundreds of thousands of continuous physical
                  video frames without VRAM crashes, enabling long-horizon
                  process stability and safety predictions.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-slate-950">
                  E. Solver-Grounded AI and Zero-Copy Fallback
                </h4>
                <p>The bottleneck:</p>
                <p>
                  Pure neural predictors are a liability in industrial physics.
                </p>
                <p>
                  If a model hallucinates reactor pressure, thermal behavior, or
                  fluid instability, the consequence is not a bad chatbot
                  answer. The consequence is failed scale-up, unsafe operation,
                  or catastrophic manufacturing risk.
                </p>
                <p>Shodh’s approach:</p>
                <p>Shodh is a solver-grounded AI system.</p>
                <p>
                  When the AI encounters alien physics, it triggers our DLPack
                  Zero-Copy Memory Bridge. In under 0.67 milliseconds, the AI
                  natively hands the tensor in GPU HBM memory to a bare-metal
                  JAX/Warp simulator, calculates the exact thermodynamic result,
                  and resumes.
                </p>
                <p>Why it matters:</p>
                <p>
                  Shodh is structurally incapable of unverified hallucination.
                </p>
                <p>
                  It combines AI speed with strict, physics-grounded
                  verification.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-slate-950">
                  F. Uncertainty, Conformal Trust, and Deployment Safety
                </h4>
                <p>The bottleneck:</p>
                <p>
                  Enterprise physical AI needs to know when it does not know.
                </p>
                <p>
                  A model that only outputs a prediction is not enough for
                  serious industrial deployment. It must also output confidence,
                  uncertainty, and escalation logic.
                </p>
                <p>Shodh’s approach:</p>
                <p>
                  Shodh outputs mathematically guaranteed error bounds using
                  SWAG and Conformal Prediction.
                </p>
                <p>
                  The model does not just output a velocity vector, molecular
                  property, or process prediction. It outputs a strict
                  confidence interval, automatically triggering the JAX/Warp
                  solver fallback if the variance threshold is breached.
                </p>
                <p>Why it matters:</p>
                <p>
                  This is the difference between demo-grade AI and
                  deployment-grade AI.
                </p>
                <p>
                  This is Shodh’s corporate liability shield for enterprise
                  customers.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-slate-950">
                  G. Target-Conditioned Generative Search
                </h4>
                <p>The bottleneck:</p>
                <p>Most AI discovery systems are forward-based predictors.</p>
                <p>They answer:</p>
                <p>“What happens if I try this molecule?”</p>
                <p>But industrial invention requires the reverse question:</p>
                <p>
                  “What molecule, material, formulation, process, and operating
                  condition will produce this target outcome at scale?”
                </p>
                <p>Shodh’s approach:</p>
                <p>
                  Shodh utilizes Target-Conditioned Generative Flow Networks
                  natively wired to bare-metal JAX-MD / MACE-MP Quantum Oracles
                  for active Reinforcement Learning and self-play.
                </p>
                <p>
                  The AI autonomously hallucinates precursors, physically tests
                  atomic strain in virtual VRAM, scores its own thermodynamic
                  stability, and outputs the exact robotic API code required to
                  synthesize it through systems such as Opentrons.
                </p>
                <p>Why it matters:</p>
                <p>
                  This is what turns Shodh from a simulation tool into an
                  autonomous invention engine.
                </p>
                <p>
                  We discover chemistry with a verified, robotic path to
                  production.
                </p>
              </div>
            </div>
          </section>

          <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
            <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
              7. The Platform Play: Why Competitors Become Customers
            </h3>
            <div className="max-w-4xl space-y-2 leading-7 text-neutral-800 [&_p]:max-w-3xl [&_strong]:text-slate-950">
              <p>
                Shodh AI’s competitive position is not just that we outperform
                narrow physics-AI companies. It is that we render the concept of
                "narrow AI" obsolete.
              </p>
              <p>
                Because Shodh AI is building the foundational physics engine for
                the entire workflow, companies that currently look like
                competitors will inevitably become our highest-leverage
                customers, channel partners, and infrastructure layers.
              </p>
              <p>A. Engineering Physics Companies (PhysicsX, Neural Concept)</p>
              <p>
                The Dynamic: They own the CAD/CFD engineering interface. But
                they are mathematically blind to molecular discovery and
                chemistry.
              </p>
              <p>
                The Shodh Integration: Shodh AI becomes the upstream
                intelligence layer. They own the dashboard; we power the
                multiscale physics engine beneath it, allowing their platforms
                to move beyond mere geometry optimization into true chemical and
                materials process design.
              </p>
              <p>B. Molecular Discovery Companies (SandboxAQ, Insilico)</p>
              <p>
                The Dynamic: They are experts at hallucinating molecules, but a
                molecule is not a product until it can be synthesized, scaled,
                and manufactured economically.
              </p>
              <p>
                The Shodh Integration: We become their scale-up and
                manufacturability backend. They discover the molecule; Shodh’s
                10B fluid experts verify if it can survive the factory. We turn
                from a competitor into the critical safety and verification
                layer for the entire pharma and biotech industry.
              </p>
              <p>C. Autonomous Robotic Labs (Yoneda Labs, Radical AI)</p>
              <p>
                The Dynamic: They own the physical robotic infrastructure and
                wet-labs. But physical experimentation, even with robots, is
                expensive and capacity-constrained.
              </p>
              <p>
                The Shodh Integration: They become our execution layer. Shodh
                uses our virtual 4D physics engine to autonomously navigate the
                chemical search space, outputting the exact Opentrons robotic
                API code. Their robots become our physical hands; Shodh remains
                the brain.
              </p>
              <p>D. Digital Twin Dashboards (Geminus, Palantir)</p>
              <p>
                The Dynamic: They own the sensor integrations and the UI inside
                factories, but they only monitor what is currently happening.
              </p>
              <p>
                The Shodh Integration: Shodh AI serves as the predictive and
                generative physics engine inside their systems. They show the
                client what is happening; Shodh predicts exactly what will fail
                next and generates the blueprint to fix it.
              </p>
              <p>E. Legacy Simulation Solvers (Ansys, Schrödinger)</p>
              <p>
                The Dynamic: They own decades of enterprise trust, but their
                CPU-bound solvers are hopelessly slow and forward-only.
              </p>
              <p>
                The Shodh Integration: We do not just replace them; we use them.
                Legacy solvers become the ground-truth validation engines (The
                JAX/Warp Fallbacks) inside our AI-native inverse-design loop. We
                turn 30-year-old software into our automated lie-detectors.
              </p>
              <p>Strategic Implication</p>
              <p>
                Shodh AI does not need to own every interface, dashboard, or
                robotic arm in the physical-world AI stack. We only need to own
                the physics-native intelligence layer. That is the
                highest-leverage position in the global economy.
              </p>
            </div>
          </section>

          <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
            <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
              8. Competitive Matrix
            </h3>
            <CompetitiveMatrixTable />
          </section>

          <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
            <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
              9. How Shodh Wins
            </h3>
            <div className="max-w-4xl space-y-2 leading-7 text-neutral-800 [&_p]:max-w-3xl [&_strong]:text-slate-950">
              <p>Shodh wins if the market moves from: faster simulation to autonomous invention and from: candidate discovery to manufacturable physical outcomes</p>
              <p>
                The key insight is that the physical world cannot be won by optimizing one layer. A molecule must survive the factory. A material must survive the process. A formulation must survive scale-up. A product must survive cost, quality, and manufacturing constraints.
              </p>
              <p>Shodh is built for that full path.</p>
            </div>
          </section>

          <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
            <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
              10. The One-Line Competitive Claim
            </h3>
            <div className="max-w-4xl space-y-2 leading-7 text-neutral-800 [&_p]:max-w-3xl [&_strong]:text-slate-950">
              <p>Competitors optimize fragments of the physical world.</p>
              <p>
                Physics-first engineering companies can accelerate CFD, FEA, CAD
                workflows, and industrial simulation. But they are not primarily
                built to connect molecular discovery to chemistry, synthesis,
                and factory-scale manufacturability.
              </p>
              <p>
                Molecular discovery companies can generate and evaluate
                promising candidates. But discovery is not the full journey. A
                molecule, material, or formulation only becomes valuable if it
                can be synthesized, scaled, stabilized, and manufactured
                economically.
              </p>
              <p>
                Autonomous lab companies can accelerate experimental iteration.
                But physical experimentation remains expensive, slow, and
                capacity-constrained. The winning system should move the
                majority of search into high-fidelity simulation and use labs
                for targeted validation.
              </p>
              <p>Shodh AI is built on a different belief:</p>
              <p>
                The physical world should not be split into separate AI products
                for molecules, fluids, reactors, factories, and validation. It
                should be one multiscale invention system.
              </p>
              <p>Shodh does not only ask: What should we discover? It asks: Can we make it, scale it, stabilize it, and manufacture it?</p>
              <p>That is the core difference.</p>
              <p>
                Shodh AI is building the physics-native operating system for
                inventing and manufacturing the physical world.
              </p>
              <p>We do not just discover the chemistry. We discover the factory.</p>
            </div>
          </section>

          <section>
            <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
              11. The Investor Takeaway
            </h3>
            <div className="max-w-4xl space-y-2 leading-7 text-neutral-800 [&_p]:max-w-3xl [&_strong]:text-slate-950">
              <p>The market is converging on AI for science.</p>
              <p>
                But most companies are still trapped at one layer of physics.
              </p>
              <p>
                Shodh’s contrarian belief is that the next great AI company in
                the physical world will not be a molecule company, a CFD
                company, a robotic lab company, or a digital twin company.
              </p>
              <p>
                It will be the company that connects discovery, simulation,
                inverse design, validation, and scale-up into one system.
              </p>
              <p>That is Shodh AI.</p>
            </div>
          </section>
        </article>

        <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-6">
            <nav className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Documents
              </p>
              <ol className="space-y-3 text-sm text-slate-800">
                <li>
                  <a
                    className="block border-l-4 border-slate-600 bg-slate-50 px-3 py-2 font-medium text-slate-900 hover:bg-slate-100"
                    href="#competitive-philosophy"
                  >
                    00. Competitive Matrix & Core Philosophy
                  </a>
                </li>
                <li>
                  <a
                    className="block border-l-4 border-blue-600 bg-blue-50 px-3 py-2 font-medium text-blue-900 hover:bg-blue-100"
                    href="#saf-dossier"
                  >
                    01. C15 Sustainable Aviation Fuel
                  </a>
                </li>
                <li>
                  <a
                    className="block border-l-4 border-violet-600 bg-violet-50 px-3 py-2 font-medium text-violet-900 hover:bg-violet-100"
                    href="#battery-dossier"
                  >
                    02. Solid-State Battery Electrolyte
                  </a>
                </li>
                <li>
                  <a
                    className="block border-l-4 border-emerald-600 bg-emerald-50 px-3 py-2 font-medium text-emerald-900 hover:bg-emerald-100"
                    href="#nuclear-dossier"
                  >
                    03. Nuclear Reactor Infrastructure
                  </a>
                </li>
              </ol>
              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Source Documents
                </p>
                <div className="space-y-2 text-sm">
                  <a
                    className="block border border-slate-200 px-3 py-2 font-medium text-blue-700 hover:bg-slate-50"
                    href={sop002PdfUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open SOP-002 PDF
                  </a>
                  <a
                    className="block border border-slate-200 px-3 py-2 font-medium text-blue-700 hover:bg-slate-50"
                    href={sop001PdfUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open SOP-001 PDF
                  </a>
                  <a
                    className="block border border-slate-200 px-3 py-2 font-medium text-blue-700 hover:bg-slate-50"
                    href={daeLetterUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open DAE Letter PDF
                  </a>
                </div>
              </div>
            </nav>
          </aside>

          <div className="min-w-0">
            <article
              id="saf-dossier"
              className="mb-12 scroll-mt-8 rounded-3xl border border-slate-200 bg-white px-5 py-8 shadow-sm md:px-8 md:py-10"
            >
              <DossierHeader
                eyebrow="Technical Dossier 01"
                title="Autonomous Discovery & Empirical Validation of C15 Sustainable Aviation Fuel (SAF)"
                summary="UNIPHY generated, routed, synthesized, and validated a heavily branched C15 alkene candidate for cold-flow performance and Jet-A1-grade energy density."
                status="Validation Complete"
              />

              <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
                <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
                  1. In Silico Discovery & Molecular Rationale
                </h3>
                <p className="mb-2">
                  <strong>Target Generated:</strong>{" "}
                  <code>CCCC(CC)(CC)CCC(C)C</code>
                </p>
                <p className="mb-2">
                  <strong>Isomeric equivalent:</strong> Heavily Branched C15
                  Alkene
                </p>
                <p className="mb-4">
                  <strong>System:</strong> The UNIPHY Foundation Model
                </p>
                <p className="mb-4 leading-7 text-neutral-800">
                  The UNIPHY model autonomously converged on a heavily branched
                  C15 alkene structure to solve the primary failure mode of
                  synthesized jet fuels: cold-flow crystallization.
                  Straight-chain alkanes stack cleanly, resulting in
                  unacceptably high freezing points that cause fuel-line
                  blockages at cruising altitudes above 30,000 ft.
                </p>
                <p className="mb-4 leading-7 text-neutral-800">
                  By introducing quaternary and tertiary carbon centers, UNIPHY
                  intentionally maximized steric hindrance to disrupt crystal
                  lattice packing, artificially depressing the freezing point
                  while maintaining the dense C-H bond network required for high
                  specific energy above 43.0 MJ/kg.
                </p>
                <p>
                  <strong>In Silico Steric Strain Energy:</strong> 0.0 kcal/mol
                </p>
                <p>
                  <strong>Model Confidence (Reward Score):</strong> 0.969
                </p>
              </section>

              <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
                <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
                  2. Autonomous Retrosynthesis (SOP-002 Generation)
                </h3>
                <p className="mb-4 leading-7 text-neutral-800">
                  After discovering the molecule, the UNIPHY model evaluated
                  millions of potential synthesis routes. It rejected chemically
                  improbable or endergonic pathways and optimized for
                  commercially available, low-cost precursors.
                </p>
                <p className="mb-4 leading-7 text-neutral-800">
                  The model autonomously compiled the wet-lab protocol,
                  outputting{" "}
                  <a
                    className="font-medium text-blue-700 underline underline-offset-4"
                    href={sop002PdfUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    SOP-002: Synthesis of Highly-Branched SAF
                  </a>
                  .
                </p>
                <ol className="list-decimal space-y-2 pl-6 text-neutral-800">
                  <li>
                    <strong>Grignard Alkylation:</strong> Heptan-3-one +
                    ethylmagnesium bromide + acetone to generate the tertiary
                    alcohol intermediate.
                  </li>
                  <li>
                    <strong>Acid-Catalyzed Dehydration:</strong> Elimination of
                    H2O via sulfuric acid to force the C=C double bond.
                  </li>
                  <li>
                    <strong>Catalytic Hydrogenation:</strong> Stabilization of
                    the final branched structure via H2 donor.
                  </li>
                </ol>
              </section>

              <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
                <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
                  3. Empirical Wet-Lab Validation
                </h3>
                <p className="mb-4 leading-7 text-neutral-800">
                  SOP-002 was handed directly to independent laboratory
                  technicians for physical execution. The synthesized compound
                  underwent downstream chemical analysis. The delta between
                  UNIPHY prediction and wet-lab reality confirms a sub-1% margin
                  of error across critical phase-change and thermodynamic
                  boundaries.
                </p>
                <ValidationTable
                  rows={safRows}
                  caption="Table 1. Model prediction versus wet-lab measurement for the C15 SAF candidate."
                />
              </section>

              <section>
                <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
                  4. Commercial Scale-Up & Paid Pilot Program
                </h3>
                <p className="mb-4 leading-7 text-neutral-800">
                  The synthesized C15 branched alkene exceeds standard
                  commercial Jet-A1 specifications: freezing point at or below
                  -47 deg C and energy density at or above 42.8 MJ/kg.
                </p>
                <p className="leading-7 text-neutral-800">
                  With the molecular structure and bench recipe empirically
                  proven, Shodh AI is advancing to commercial scale-up and is in
                  active discussions for a paid pilot with Tier-1 energy
                  providers, including Indian Oil Corporation and BP. UNIPHY is
                  processing the validated molecular topology to design cooling
                  jackets and impeller geometries for scaling exothermic
                  Grignard reactions from a 50 mL beaker into a continuous
                  10,000-liter pilot reactor.
                </p>
              </section>
            </article>

            <div className="my-10 border border-slate-300 bg-slate-100 px-6 py-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                End of Technical Dossier 01
              </p>
              <p className="mt-2 text-sm font-medium text-slate-700">
                Next document begins below: High-Stability Solid-State Battery
                Electrolyte.
              </p>
            </div>

            <article
              id="battery-dossier"
              className="scroll-mt-8 border border-slate-200 bg-white px-5 py-8 shadow-sm md:px-8 md:py-10"
            >
              <DossierHeader
                eyebrow="Technical Dossier 02"
                title="Autonomous Discovery & Empirical Validation of High-Stability Solid-State Battery Electrolyte"
                summary="UNIPHY engineered, synthesized, and validated a sulfonate ester electrolyte candidate designed for high-voltage stability, SEI formation, and dendrite suppression."
                status="Validation Complete"
              />

              <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
                <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
                  1. In Silico Discovery & Molecular Rationale
                </h3>
                <p className="mb-2">
                  <strong>Target Generated:</strong>{" "}
                  <code>CS(=O)(=O)OCS(=O)(=O)OCS(=O)(=O)O</code>
                </p>
                <p className="mb-2">
                  <strong>Class:</strong> Sulfonate Ester Polymer Chain
                </p>
                <p className="mb-4">
                  <strong>System:</strong> The UNIPHY Foundation Model
                </p>
                <p className="mb-4 leading-7 text-neutral-800">
                  The UNIPHY model autonomously engineered a sulfonate ester
                  chain to solve the critical bottleneck in next-generation
                  lithium-metal solid-state batteries: dendrite formation and
                  thermal runaway. Standard liquid electrolytes decompose at
                  high voltages, causing battery fires.
                </p>
                <p className="mb-4 leading-7 text-neutral-800">
                  The highly electronegative sulfur-oxygen (S=O) backbone
                  provides exceptional oxidative stability above 4.5 V. The
                  repeating sulfonate structure also acts as a sacrificial
                  layer, selectively decomposing during the first charge cycle
                  to form an impenetrable, lithium-conducting Solid Electrolyte
                  Interphase on the bare metal anode.
                </p>
                <p>
                  <strong>In Silico Steric Strain Energy:</strong> 0.0 kcal/mol
                </p>
                <p>
                  <strong>Model Confidence (Reward Score):</strong> 0.944
                </p>
              </section>

              <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
                <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
                  2. Autonomous Retrosynthesis (SOP-001 Generation)
                </h3>
                <p className="mb-4 leading-7 text-neutral-800">
                  UNIPHY constrained its retrosynthetic search tree to abundant,
                  low-cost commodity precursors, bypassing complex low-yield
                  pathways in favor of high-efficiency condensation reactions.
                </p>
                <p className="mb-4 leading-7 text-neutral-800">
                  The model autonomously compiled the wet-lab protocol,
                  outputting{" "}
                  <a
                    className="font-medium text-blue-700 underline underline-offset-4"
                    href={sop001PdfUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    SOP-001: Synthesis of High-Stability Solid-State Battery
                    Electrolyte
                  </a>
                  .
                </p>
                <ol className="list-decimal space-y-2 pl-6 text-neutral-800">
                  <li>
                    <strong>Initial Sulfonyl Condensation:</strong>{" "}
                    Methanesulfonyl chloride + methanol (CO proxy) to generate
                    the base monomer.
                  </li>
                  <li>
                    <strong>First Chain Extension:</strong> Introduction of
                    secondary methanesulfonyl chloride to extend the sulfonate
                    backbone.
                  </li>
                  <li>
                    <strong>Final Chain Extension:</strong> Acid-driven
                    condensation via sulfuric acid (H2SO4) to terminate the
                    chain and stabilize the electrolyte matrix.
                  </li>
                </ol>
              </section>

              <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
                <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
                  3. Empirical Wet-Lab Validation
                </h3>
                <p className="mb-4 leading-7 text-neutral-800">
                  SOP-001 was handed directly to independent laboratory
                  technicians for physical synthesis. The resulting polymer
                  underwent electrochemical and thermal analysis. The delta
                  between UNIPHY prediction and wet-lab reality confirms sub-1%
                  precision across critical stability and conductivity
                  thresholds.
                </p>
                <ValidationTable
                  rows={batteryRows}
                  caption="Table 2. Model prediction versus wet-lab measurement for the solid-state battery electrolyte candidate."
                />
              </section>

              <section>
                <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
                  4. Commercial Scale-Up & Paid Pilot Program
                </h3>
                <p className="mb-4 leading-7 text-neutral-800">
                  The empirical validation confirms that UNIPHY can engineer and
                  synthesize solid-state materials supporting safe operation up
                  to 4.8 V with strong room-temperature ionic conductivity.
                </p>
                <p className="leading-7 text-neutral-800">
                  With the molecular structure and robotic bench recipe
                  empirically proven, Shodh AI is structuring paid pilot
                  programs with leading gigafactory operators, including A123
                  Systems and Tier-1 EV manufacturers. UNIPHY is solving
                  non-Newtonian fluid rheology to optimize continuous-stirred
                  tank reactors for 10,000-liter factory-scale chain-extension
                  steps.
                </p>
              </section>
            </article>

            <div className="my-10 border border-slate-300 bg-slate-100 px-6 py-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                End of Technical Dossier 02
              </p>
              <p className="mt-2 text-sm font-medium text-slate-700">
                Next document begins below: Stage-3 Nuclear Reactor
                Infrastructure.
              </p>
            </div>

            <article
              id="nuclear-dossier"
              className="scroll-mt-8 border border-slate-200 bg-white px-5 py-8 shadow-sm md:px-8 md:py-10"
            >
              <DossierHeader
                eyebrow="Technical Dossier 03"
                title="Inverse Design & Autonomous Optimization of Stage-3 Nuclear Reactor Infrastructure"
                summary="UNIPHY's macro-fluid and thermal experts are positioned for inverse design of liquid sodium and molten salt reactor infrastructure for India's 3-stage nuclear program."
                status="Sovereign Validation"
              />

              <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
                <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
                  1. The Sovereign Mandate
                </h3>
                <div className="mb-5 grid gap-3 border border-slate-300 bg-slate-50 p-4 text-sm md:grid-cols-2">
                  <p>
                    <strong>Target Deployment:</strong> Stage-2 / Stage-3 Liquid
                    Sodium & Molten Salt Reactors
                  </p>
                  <p>
                    <strong>System:</strong> UNIPHY Foundation Model
                    (Macro-Fluid & Thermal Experts)
                  </p>
                  <p className="md:col-span-2">
                    <strong>Strategic Partner:</strong>{" "}
                    <a
                      className="font-medium text-blue-700 underline underline-offset-4"
                      href={daeLetterUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Department of Atomic Energy (DAE), Government of India
                      (PSA Endorsed)
                    </a>
                  </p>
                </div>
                <p className="mb-4 leading-7 text-neutral-800">
                  Advancing India's 3-stage nuclear program, specifically
                  leapfrogging to thorium utilization, requires mastery of
                  liquid sodium and molten salt coolants. Traditional simulator
                  tools such as CFD and FEA require months of manual mesh
                  generation and trial-and-error to design reactor components
                  capable of withstanding highly corrosive, extreme-temperature
                  fluids above 700 deg C.
                </p>
                <p className="leading-7 text-neutral-800">
                  UNIPHY replaces traditional forward simulation with inverse
                  design. By setting physical operational constraints such as
                  target thermal dissipation, maximum shear stress, and zero
                  cavitation, the model autonomously generates the exact 3D
                  manufacturing blueprint of the reactor component required to
                  meet those parameters.
                </p>
              </section>

              <section className="mx-5 my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:mx-8 md:my-8 md:p-7">
                <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
                  2. Mathematical Guarantees: The CBF-QP Shield
                </h3>
                <p className="mb-4 leading-7 text-neutral-800">
                  Nuclear infrastructure cannot tolerate{" "}
                  <strong>probabilistic hallucinations</strong>. The{" "}
                  <strong>UNIPHY</strong> model is secured by a proprietary{" "}
                  <strong>
                    Control Barrier Function Quadratic Program (CBF-QP)
                  </strong>
                  .
                </p>
                <div className="border-l-4 border-emerald-600 bg-emerald-50 px-5 py-4">
                  <p className="leading-7 text-emerald-950">
                    When <strong>UNIPHY</strong> generates a{" "}
                    <strong>3D reactor component</strong>, the latent
                    architecture <strong>mathematically forces</strong> the
                    generated geometry to project onto a{" "}
                    <strong>forward-invariant safe set</strong>.
                  </p>
                </div>
                <p className="mt-4 leading-7 text-neutral-800">
                  <strong>Result:</strong> generated{" "}
                  <strong>3D blueprints</strong> are{" "}
                  <strong>mathematically certified</strong> to prevent{" "}
                  <strong>thermal runaway</strong>,{" "}
                  <strong>structural fracture</strong>, and{" "}
                  <strong>coolant mass leakage</strong> prior to physical
                  manufacturing.
                </p>
              </section>

              <section>
                <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-semibold tracking-tight text-slate-950">
                  3. The Pilot Deployment
                </h3>
                <p className="mb-4 leading-7 text-neutral-800">
                  Shodh AI has received <strong>formal validation</strong> from
                  the Principal Scientific Adviser to the Government of India,
                  recommending its <strong>Large Physics Model (LPM)</strong>{" "}
                  for deep deployment within the{" "}
                  <strong>Department of Atomic Energy</strong>.
                </p>
                <p className="mb-4 leading-7 text-neutral-800">
                  Next steps include integrating{" "}
                  <strong>AI-generated CAD/CAM blueprints</strong> with the{" "}
                  <strong>DAE's advanced manufacturing pipelines</strong>,
                  compressing the timeline for{" "}
                  <strong>thorium reactor deployment</strong> and securing{" "}
                  <strong>long-term energy independence</strong> for the nation.
                </p>
                <a
                  className="inline-flex border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100"
                  href={daeLetterUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open PSA-endorsed DAE letter PDF
                </a>
              </section>
            </article>
          </div>
        </div>

        <footer className="mt-10 border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500 shadow-sm">
          <Link
            href="/"
            className="font-medium text-blue-700 underline underline-offset-4"
          >
            Back to Shodh AI
          </Link>
        </footer>
      </div>
    </main>
  );
}
