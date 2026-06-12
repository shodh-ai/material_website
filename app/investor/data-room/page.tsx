import Link from "next/link";

const sop001PdfUrl = "/pdf/SOP-001_solid_state_battery_electrolyte.pdf";
const sop002PdfUrl = "/pdf/SOP-002_highly_branched_SAF.pdf";
const daeLetterUrl = "/pdf/Letter-to-Secretary-DAE.pdf";
const prePrintScreenshots = [
  "/pre-prints/Screenshot 2026-06-13 at 2.38.15 AM.png",
  "/pre-prints/Screenshot 2026-06-13 at 2.38.29 AM.png",
  "/pre-prints/Screenshot 2026-06-13 at 2.38.40 AM.png",
  "/pre-prints/Screenshot 2026-06-13 at 2.49.38 AM.png",
  "/pre-prints/Screenshot 2026-06-13 at 2.49.47 AM.png",
  "/pre-prints/Screenshot 2026-06-13 at 2.54.47 AM.png",
  "/pre-prints/Screenshot 2026-06-13 at 2.55.14 AM.png",
];

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
    <header className="mb-10 border-b-2 border-black pb-8">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-black">
            {eyebrow}
          </p>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-black md:text-5xl">
            {title}
          </h2>
        </div>
        <p className="w-fit shrink-0 border border-black bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-black">
          {status}
        </p>
      </div>
      <p className="max-w-4xl text-base leading-7 text-black">{summary}</p>
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
      <figcaption className="border-x-2 border-t-2 border-black bg-white px-4 py-3 text-sm font-semibold text-black">
        {caption}
      </figcaption>
      <div className="overflow-x-auto border-2 border-black bg-white">
        <table className="w-full min-w-[980px] border-collapse text-sm">
          <thead>
            <tr className="bg-white text-black">
              <th className="w-[24%] border border-black px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                Property
              </th>
              <th className="w-[18%] border border-slate-300 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                UNIPHY Prediction
              </th>
              <th className="w-[18%] border border-slate-300 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                Wet-Lab Measurement
              </th>
              <th className="w-[13%] border border-black px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                Delta Error
              </th>
              <th className="border border-black px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
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
                <td className="border border-black px-4 py-3 align-top font-semibold text-black">
                  {row[0]}
                </td>
                <td className="border border-black px-4 py-3 align-top font-mono text-[13px] text-black">
                  {row[1]}
                </td>
                <td className="border border-black px-4 py-3 align-top font-mono text-[13px] font-semibold text-black">
                  {row[2]}
                </td>
                <td className="border border-black bg-white px-4 py-3 align-top font-mono text-[13px] font-semibold text-black">
                  {row[3]}
                </td>
                <td className="border border-black px-4 py-3 align-top text-black">
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
    <figure className="my-8 overflow-hidden border-2 border-black bg-white">
      <figcaption className="border-b-2 border-black bg-white px-5 py-4 text-sm font-semibold uppercase tracking-wide text-black">
        Competitive Matrix
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1180px] border-collapse text-sm">
          <thead>
            <tr className="bg-white text-black">
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
    <main className="min-h-screen bg-white font-mono text-[13px] leading-relaxed text-black selection:bg-black selection:text-white [&_*]:!rounded-none [&_*]:!shadow-none [&_a]:!text-blue-700 [&_a]:underline [&_code]:border [&_code]:border-black [&_code]:bg-white [&_code]:px-1 [&_div]:!border-black [&_figcaption]:!border-black [&_h1]:!font-semibold [&_h2]:!font-semibold [&_h3]:!border-black [&_h3]:!text-black [&_h4]:!text-black [&_li]:!text-black [&_ol]:!border-black [&_p]:!text-black [&_section]:!border-black [&_section]:!bg-white [&_strong]:!text-black [&_table]:!text-black [&_td]:!border-black [&_td]:!text-black [&_th]:!border-black [&_th]:!text-black [&_tr]:!bg-white [&_ul]:!border-black [&_ul]:!bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-8 xl:grid xl:grid-cols-[340px_minmax(0,760px)] xl:gap-12">
        <aside className="hidden xl:block">
          <nav className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto border-2 border-black bg-white p-4 text-xs">
            <p className="mb-4 border-b border-black pb-2 font-semibold uppercase tracking-wide text-black">
              Data Room Index
            </p>
            <ol className="space-y-1 text-black">
              <li>
                <a className="block border-l-4 border-black bg-amber-50 px-3 py-1.5 font-semibold text-black hover:bg-amber-50" href="#executive-thesis">
                  01 Shodh AI Executive Thesis
                </a>
              </li>
              <li>
                <a className="block border-l-4 border-black bg-amber-50 px-3 py-1.5 font-semibold text-black hover:bg-amber-50" href="#competitive-philosophy">
                  02 Competitive Landscape and Positioning
                </a>
              </li>
              <li>
                <a className="block border-l-4 border-black bg-amber-50 px-3 py-1.5 font-semibold text-black hover:bg-amber-50" href="#commercial-traction">
                  03 Commercial Traction and Enterprise Pipeline
                </a>
              </li>
              <li>
                <a className="block border-l-4 border-black bg-amber-50 px-3 py-1.5 font-semibold text-black hover:bg-amber-50" href="#business-model">
                  04 Business Model and Enterprise Agent Strategy
                </a>
              </li>
              <li className="border-l-4 border-neutral-300 px-3 py-1.5 text-neutral-500">05 Series A Use of Funds and US Expansion</li>
              <li>
                <a className="block border-l-4 border-black bg-amber-50 px-3 py-1.5 font-semibold text-black hover:bg-amber-50" href="#non-dilutive-capital">
                  06 Non-Dilutive Capital Compute and Strategic Programs
                </a>
              </li>
              <li className="border-l-4 border-neutral-300 px-3 py-1.5 text-neutral-500">07 Commercial Advisory Board and Strategic Network</li>
            </ol>
            <div className="mt-5 space-y-5 text-black">
              <section>
                <p className="mb-2 border-b border-black pb-1 font-semibold uppercase tracking-wide">
                  Exhibit A Empirical Validation and Case Studies
                </p>
                <ol className="space-y-1">
                  <li>
                    <a className="block border-l-4 border-black bg-amber-50 px-3 py-1.5 font-semibold text-black hover:bg-amber-50" href="#saf-dossier">
                      01 Empirical Validation Dossier eFuel SAF
                    </a>
                  </li>
                  <li>
                    <a className="block border-l-4 border-black bg-amber-50 px-3 py-1.5 font-semibold text-black hover:bg-amber-50" href="#battery-dossier">
                      02 Empirical Validation Dossier Battery
                    </a>
                  </li>
                  <li className="border-l-4 border-neutral-300 px-3 py-1.5 text-neutral-500">03 Aarti Industries NRE Case Study</li>
                  <li>
                    <a className="block border-l-4 border-black bg-amber-50 px-3 py-1.5 font-semibold text-black hover:bg-amber-50" href="#nuclear-dossier">
                      04 Govt of India DAE Nuclear Letter
                    </a>
                  </li>
                </ol>
              </section>
              <section>
                <p className="mb-2 border-b border-black pb-1 font-semibold uppercase tracking-wide">
                  Exhibit B Technical IP and Internal Preprints
                </p>
                <ol className="space-y-1">
                  <li>
                    <a className="block border-l-4 border-black bg-amber-50 px-3 py-1.5 font-semibold text-black hover:bg-amber-50" href="#proprietary-research-math">
                      02 Proprietary Research and Math
                    </a>
                  </li>
                </ol>
              </section>
            </div>
          </nav>
        </aside>

        <div className="min-w-0">
        <header className="mb-10 border-b-2 border-black bg-white pb-8">
          <div className="flex flex-col gap-4 border-b-2 border-black bg-white pb-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-black">
                Shodh AI Investor Data Room
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-black md:text-4xl">
                Technical Validation Dossiers
              </h1>
            </div>
            <p className="w-fit border border-black bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-black">
              Confidential Review
            </p>
          </div>
        </header>

        <article
          id="executive-thesis"
          className="mb-20 scroll-mt-8 border-2 border-black bg-white p-6 md:p-10"
        >
          <header className="border-b-2 border-black bg-white pb-8 text-black">
            <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-black md:text-4xl">
              Shodh AI Executive Thesis
            </h2>
            <p className="mt-3 text-lg font-semibold text-black">
              From Discovery to Manufacturability
            </p>
            <p className="mt-5 border border-black bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-black">
              Document Classification: Executive Thesis — Series A Data Room
            </p>
          </header>

          <section className="my-8 border-t border-black bg-white pt-5">
            <div className="max-w-3xl space-y-3 leading-7 text-black">
              <p>Shodh AI is building a physics-native intelligence layer for industrial R&D and manufacturing.</p>
              <p>Our core thesis is simple: the next step-change in physical innovation will not come from generating more candidate molecules, materials, formulations, or processes. It will come from identifying which candidates can be synthesized, processed, scaled, validated, and manufactured under real industrial constraints.</p>
              <p>Most AI systems stop at discovery. Most simulators stop at a narrow physics domain. Most digital twins begin only after an industrial asset already exists.</p>
              <p>Shodh connects these layers into one computational loop: molecular behavior, process physics, equipment constraints, validation planning, and manufacturing economics.</p>
              <p>The question Shodh is built to answer is the question that ultimately determines whether physical innovation creates value:</p>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 text-base font-semibold leading-7 text-black">Can this idea become a manufacturable product?</p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              1. The Scale-Up Death Valley
            </h3>
            <div className="max-w-3xl space-y-3 leading-7 text-black">
              <p>The industrial world still operates on a fragmented timeline:</p>
              <p className="border border-black bg-amber-50 px-4 py-3 text-sm font-semibold tracking-wide text-black">Discovery → R&D → Pilot → Scale-Up → Commercial Manufacturing</p>
              <p>This structure creates a predictable and costly failure mode. A promising material, formulation, or chemistry is discovered in the lab. The pilot team attempts to scale it. Manufacturing then discovers that the process breaks under real-world thermal gradients, mixing conditions, fluid shear, yield requirements, safety constraints, or cost targets.</p>
              <p>At that point, the failure is no longer just scientific. It is economic. Years of R&D effort and capital expenditure can be lost because manufacturability was evaluated too late.</p>
              <p>The problem is not a lack of ideas. The problem is that the path from idea to manufactured reality is too slow, expensive, and uncertain.</p>
              <p className="border-l-4 border-black bg-white py-3 pl-4 text-base font-semibold leading-7 text-black">A promising molecule is not a product. A product is something that can be manufactured repeatedly, safely, economically, and at industrial scale.</p>
              <p>Shodh exists to collapse the gap between discovery and manufacturing.</p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              2. Physical Innovation Is a Multiscale Problem
            </h3>
            <div className="max-w-3xl space-y-3 leading-7 text-black">
              <p>Human science has historically separated chemistry, materials science, fluid dynamics, process engineering, and manufacturing into different disciplines. That structure made sense for human teams. It does not reflect how physical systems behave.</p>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 text-base font-semibold leading-7 text-black">Real industrial outcomes are coupled across scales.</p>
              <p>A molecular change can affect viscosity. Viscosity can affect mixing. Mixing can affect heat transfer. Heat transfer can affect yield. Yield can affect cost, safety, quality, and manufacturability.</p>
              <p>This is why point solutions are insufficient. A molecule generator, simulator, robotic lab, or digital twin may solve an important piece of the workflow, but the industrial value is created when those pieces are connected.</p>
              <p>Shodh is designed around this connection.</p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              3. The Multiscale Computational Loop
            </h3>
            <div className="max-w-3xl space-y-3 leading-7 text-black">
              <p>Shodh AI evaluates the physical world across interconnected scales, moving in both directions between discovery and manufacturing.</p>
              <p className="mt-5 w-fit border border-black bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">Discovery to Scale-Up</p>
              <p className="border border-black bg-amber-50 px-4 py-3 text-sm font-semibold tracking-wide text-black">Micro → Meso → Macro</p>
              <p>Shodh begins at the molecular and materials level, reasoning about structure, thermodynamics, reaction behavior, and candidate properties. The system then evaluates whether that candidate can survive process conditions, heat transfer, mixing behavior, equipment constraints, and manufacturing operating windows.</p>
              <p>The goal is not only to identify promising candidates. The goal is to de-risk candidates computationally before expensive physical experimentation begins.</p>
              <p className="mt-5 w-fit border border-black bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">Process Optimization</p>
              <p className="border border-black bg-amber-50 px-4 py-3 text-sm font-semibold tracking-wide text-black">Macro → Meso → Micro</p>
              <p>Shodh can also begin with an existing industrial process. For a reactor, production line, or manufacturing system experiencing low yield, instability, quality drift, or cost pressure, Shodh evaluates macro-level operating conditions and traces process behavior back toward its underlying physical causes.</p>
              <p>The goal is to optimize industrial systems by diagnosing the physics underneath them.</p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              4. Simulation-First, Lab-Validated
            </h3>
            <div className="max-w-3xl space-y-3 leading-7 text-black">
              <p>Industrial R&D has historically followed a slow loop:</p>
              <p className="border border-black bg-white px-4 py-3 text-sm font-semibold tracking-wide text-black">Guess → Test → Learn → Repeat</p>
              <p>Shodh enables a different loop:</p>
              <p className="border border-black bg-amber-50 px-4 py-3 text-sm font-semibold tracking-wide text-black">Simulate → Inverse-Design → Validate → Scale</p>
              <p>The physical lab remains essential. Real-world validation is still required. But the lab should not be the primary search engine.</p>
              <p>Shodh’s thesis is that more of the search should happen computationally, with physical experimentation used for targeted validation, calibration, and grounding. This mirrors the evolution of aerospace, robotics, and advanced manufacturing, where simulation increasingly reduces the cost and risk of entering the physical world.</p>
              <p>For industrial R&D, the implication is significant: fewer blind experiments, faster iteration, better candidate selection, and earlier visibility into scale-up risk.</p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              5. Commercial Validation
            </h3>
            <div className="max-w-3xl space-y-3 leading-7 text-black">
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 text-base font-semibold leading-7 text-black">Shodh’s value is measured in industrial outcomes.</p>
              <p>The relevant metrics are not abstract model scores alone. They are yield improvement, COGS reduction, faster time-to-market, reduced pilot risk, better operating windows, and improved manufacturing reliability.</p>
              <p>Shodh’s deployments are designed around bounded, measurable industrial pain points. In customer and pilot contexts such as continuous flow chemistry, specialty chemicals, advanced materials, and battery manufacturing, Shodh’s work is framed around specific economic outcomes: yield, rheology, process stability, scale-up feasibility, cost, and annualized value.</p>
              <p>The purpose is to translate high-dimensional physics into economic leverage for enterprise partners.</p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              6. The Sim-to-Real Data Flywheel
            </h3>
            <div className="max-w-3xl space-y-3 leading-7 text-black">
              <p>Shodh’s foundation model is trained on large-scale physics data and evaluated against industrially relevant validation tasks. The ultimate challenge is closing the sim-to-real gap under factory conditions.</p>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 text-base font-semibold leading-7 text-black">Paid NRE deployments are central to this strategy.</p>
              <p>These deployments are valuable not only as revenue, but as calibration events. Each deployment exposes the model to real industrial conditions, measured process data, wet-lab outcomes, sensor streams, and validation results that are difficult to reproduce from public datasets alone.</p>
              <p>Operating strictly within permissioned, contractual boundaries, Shodh uses deployment learnings to calibrate its underlying simulators, improve its training distribution, and strengthen its ability to model real physical systems.</p>
              <p>This creates a compounding advantage. Replicating Shodh’s model is not simply a matter of copying architecture. It requires comparable access to deployment data, calibration loops, industrial validation history, and customer-specific physical context.</p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              7. The Business Model
            </h3>
            <div className="max-w-3xl space-y-3 leading-7 text-black">
              <p>Shodh’s commercial model is designed to scale from high-touch technical deployments to enterprise software and IP-driven economics.</p>
              <p className="mt-5 w-fit border border-black bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">Direct Deployments</p>
              <p>Paid NRE and pilot projects focused on specific process, discovery, and scale-up bottlenecks. These generate revenue while producing real-world validation and calibration signals.</p>
              <p className="mt-5 w-fit border border-black bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">Enterprise SaaS & API Delivery</p>
              <p>Recurring software and API licensing for enterprise R&D, process engineering, and scale-up workflows.</p>
              <p className="mt-5 w-fit border border-black bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">Partnered IP & Gain-Share</p>
              <p>Partnerships with pharmaceutical, chemical, materials, and manufacturing companies to co-discover and de-risk new products, with potential economics across upfront payments, milestones, royalties, or gain-share structures.</p>
              <p className="mt-5 w-fit border border-black bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">Proprietary IP Generation</p>
              <p>Use of Shodh’s inverse-design loops to discover and validate new materials, formulations, and processes, creating a portfolio of licensable proprietary IP.</p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              8. The Long-Term Position
            </h3>
            <div className="max-w-3xl space-y-3 leading-7 text-black">
              <p>Shodh does not need to own every robotic lab, factory interface, digital twin, or legacy simulator.</p>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 text-base font-semibold leading-7 text-black">Shodh’s position is to provide the physics-native intelligence layer that powers them.</p>
              <p>Robotic labs can become execution layers. Digital twins can become interfaces. Legacy solvers can become validation layers. Enterprise R&D teams can become users of a system that connects discovery, simulation, validation, and manufacturability inside one computational loop.</p>
              <p>Shodh is building toward a world where industrial invention is faster, cheaper, safer, and more manufacturable from the beginning.</p>
              <p>We do not just discover the chemistry.</p>
              <p className="border-l-4 border-black bg-white py-3 pl-4 text-base font-semibold leading-7 text-black">We discover the path from chemistry to factory.</p>
            </div>
          </section>
          <nav className="mt-10 border-t-2 border-black pt-5 text-sm font-semibold">
            <a className="inline-flex border border-black bg-white px-4 py-2 text-blue-700 hover:bg-white" href="#competitive-philosophy">
              Next: 02 Competitive Landscape and Positioning
            </a>
          </nav>
        </article>

        <article
          id="competitive-philosophy"
          className="mb-20 scroll-mt-8 border-2 border-black bg-white p-6 md:p-10"
        >
          <header className="border-b-2 border-black bg-white pb-8 text-black">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-black">
              02 Competitive Landscape and Positioning
            </p>
            <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-black md:text-4xl">
              Shodh AI: Competitive Landscape & Positioning
            </h2>
          </header>

          <section className="my-8 border-t border-black bg-white pt-5">
            <div className="max-w-3xl space-y-3 leading-7 text-black">
              <p>Most companies in AI-for-science optimize one layer of physical innovation. Shodh AI is built around the harder cross-layer problem: connecting molecular discovery, physical simulation, synthesis validation, process behavior, and manufacturability inside one computational loop.</p>
              <p>Our view is not that existing companies are weak. Many are technically strong and commercially credible. The issue is that the market remains fragmented across discovery tools, engineering simulators, robotic labs, digital twins, and legacy solvers.</p>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 text-base font-semibold leading-7 text-black">Shodh’s thesis is that physical innovation cannot be won by optimizing one layer in isolation. A molecule, material, formulation, catalyst, or process only becomes valuable if it can be synthesized, scaled, stabilized, and manufactured economically.</p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              1. Competitive Landscape
            </h3>
            <div className="space-y-5 leading-7 text-black [&_div]:border-t [&_div]:border-black [&_div]:bg-white [&_div]:pt-4 [&_p]:mt-1 [&_p]:text-black">
              <div>
                <h4 className="mb-2 font-semibold text-black">A. Engineering Physics AI</h4>
                <p>Examples: PhysicsX, Neural Concept, BeyondMath, Luminary Cloud, Godela, Trim</p>
                <p>These companies focus on engineering-scale simulation: CFD, FEA, CAD-native optimization, thermal modeling, aerodynamics, industrial design, and simulation acceleration.</p>
                <p>They are valuable because they make engineering workflows faster and more intelligent. However, their center of gravity is typically the macroscopic engineering layer: structures, fluids, geometry, thermal behavior, and design optimization.</p>
                <p className="border-l-4 border-black bg-amber-50 px-4 py-3 font-semibold text-black">Shodh’s view: engineering simulation is powerful, but it does not by itself solve the full discovery-to-manufacturing problem. A model that optimizes a reactor shape, turbine, aircraft component, or flow path is not the same as a system that reasons from molecular structure to reaction pathway to yield to scale-up to operating window.</p>
                <p className="font-semibold">Shodh connects engineering physics to molecular discovery and process-scale manufacturability.</p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-black">B. Molecular Discovery AI</h4>
                <p>Examples: SandboxAQ, Isomorphic Labs, Insilico Medicine, and related AI-drug / AI-materials companies</p>
                <p>These companies focus on molecular generation, property prediction, drug discovery, protein-ligand interactions, materials discovery, and quantitative scientific modeling.</p>
                <p>They are strong at the discovery layer. However, discovery is only the beginning of industrial value creation.</p>
                <p className="border-l-4 border-black bg-amber-50 px-4 py-3 font-semibold text-black">Shodh’s view: a promising molecule is not yet a product. A drug candidate, material, formulation, catalyst, or specialty chemical still has to be synthesized, processed, stabilized, scaled, and manufactured reliably and economically.</p>
                <p className="font-semibold">Shodh is designed to couple discovery with synthesis feasibility, process behavior, and manufacturing constraints from the beginning.</p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-black">C. Autonomous Lab / AI Science Factory Companies</h4>
                <p>Examples: Lila Sciences, Radical AI, Periodic Labs, Yoneda Labs</p>
                <p>These companies are building robotic labs, closed-loop experimentation systems, AI chemists, and high-throughput physical testing infrastructure.</p>
                <p>They are important because they recognize that AI must connect to physical reality. However, physical experimentation remains expensive, slow, and capacity-constrained, even when automated.</p>
                <p className="border-l-4 border-black bg-amber-50 px-4 py-3 font-semibold text-black">Shodh’s view: the lab should not be the primary search engine. It should be the validation layer. Shodh shifts more of the search into simulation and inverse design, then uses targeted physical experiments to validate the highest-confidence candidates.</p>
                <p className="font-semibold">Shodh can make robotic labs more efficient by narrowing the experimental search space before physical execution.</p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-black">D. Digital Twin / Spatial Intelligence Companies</h4>
                <p>Examples: Geminus, World Labs, and related digital twin / spatial AI companies</p>
                <p>These systems help represent, monitor, simulate, or generate parts of the physical world. Digital twins are valuable for existing industrial assets. Spatial world models are valuable for robotics, simulation, media, and embodied intelligence.</p>
                <p className="border-l-4 border-black bg-amber-50 px-4 py-3 font-semibold text-black">Shodh’s view: representation is not enough. The harder industrial problem is not only modeling what exists. It is inventing what should exist, predicting whether it can be made, and designing the path from discovery to manufacturing.</p>
                <p className="font-semibold">Shodh focuses on invention, inverse design, process feasibility, and manufacturability.</p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-black">E. Legacy Simulation & Scientific Software</h4>
                <p>Examples: Ansys, Schrödinger, COMSOL, traditional CAE and chemistry tools</p>
                <p>These platforms have deep enterprise trust, mature workflows, and high-fidelity solvers across engineering, chemistry, and physics domains.</p>
                <p>They are valuable because industrial customers trust deterministic physics. However, these tools are often fragmented, computationally intensive, forward-oriented, and difficult to integrate into generative discovery workflows.</p>
                <p className="border-l-4 border-black bg-amber-50 px-4 py-3 font-semibold text-black">Shodh’s view: legacy solvers should not simply be discarded. They can serve as validation layers inside an AI-native workflow. Shodh combines fast neural inference with physics-grounded verification, allowing customers to move toward inverse design without abandoning trusted deterministic methods.</p>
              </div>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              2. Competitive Matrix
            </h3>
            <div className="overflow-x-auto border-2 border-black bg-white">
              <table className="w-full min-w-[1180px] border-collapse text-sm text-black">
                <thead>
                  <tr className="bg-white text-black">
                    <th className="border border-black px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">Category</th>
                    <th className="border border-black px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">Example Companies</th>
                    <th className="border border-black px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">Core Strength</th>
                    <th className="border border-black px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">Boundary</th>
                    <th className="border border-black bg-amber-50 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">Shodh Differentiation</th>
                    <th className="border border-black px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">Potential Relationship</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-black px-4 py-3 align-top font-semibold">Engineering Physics AI</td>
                    <td className="border border-black px-4 py-3 align-top">PhysicsX, Neural Concept, BeyondMath, Luminary Cloud, Godela, Trim</td>
                    <td className="border border-black px-4 py-3 align-top">CFD, FEA, CAD optimization, simulation acceleration, engineering design</td>
                    <td className="border border-black px-4 py-3 align-top">Primarily focused on macroscopic engineering and geometry</td>
                    <td className="border border-black bg-amber-50 px-4 py-3 align-top font-semibold">Connects engineering physics to molecular discovery, chemistry, process behavior, and scale-up</td>
                    <td className="border border-black px-4 py-3 align-top">Competitor / API customer / platform partner</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-black px-4 py-3 align-top font-semibold">Molecular Discovery AI</td>
                    <td className="border border-black px-4 py-3 align-top">SandboxAQ, Isomorphic Labs, Insilico Medicine</td>
                    <td className="border border-black px-4 py-3 align-top">Molecule generation, property prediction, drug discovery, materials discovery</td>
                    <td className="border border-black px-4 py-3 align-top">Strong at discovery, but less focused on synthesis, processing, and plant-scale manufacturability</td>
                    <td className="border border-black bg-amber-50 px-4 py-3 align-top font-semibold">Couples candidate discovery with synthesis feasibility, process validation, and manufacturing constraints</td>
                    <td className="border border-black px-4 py-3 align-top">Scale-up backend / manufacturability layer</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-black px-4 py-3 align-top font-semibold">Autonomous Labs / AI Science Factories</td>
                    <td className="border border-black px-4 py-3 align-top">Lila Sciences, Radical AI, Periodic Labs, Yoneda Labs</td>
                    <td className="border border-black px-4 py-3 align-top">Robotic experimentation, closed-loop testing, wet-lab execution</td>
                    <td className="border border-black px-4 py-3 align-top">Accelerate experimentation, but remain constrained by physical lab cost and throughput</td>
                    <td className="border border-black bg-amber-50 px-4 py-3 align-top font-semibold">Moves more search into simulation and uses labs for targeted validation</td>
                    <td className="border border-black px-4 py-3 align-top">Robotic execution partner / customer</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-black px-4 py-3 align-top font-semibold">Digital Twin / Spatial AI</td>
                    <td className="border border-black px-4 py-3 align-top">Geminus, World Labs</td>
                    <td className="border border-black px-4 py-3 align-top">Industrial monitoring, digital twins, spatial world modeling</td>
                    <td className="border border-black px-4 py-3 align-top">Strong at representation and monitoring, less focused on invention and manufacturability</td>
                    <td className="border border-black bg-amber-50 px-4 py-3 align-top font-semibold">Adds predictive, generative, and inverse-design capability for industrial systems</td>
                    <td className="border border-black px-4 py-3 align-top">Physics engine / predictive layer</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-black px-4 py-3 align-top font-semibold">Legacy Simulation & Scientific Software</td>
                    <td className="border border-black px-4 py-3 align-top">Ansys, Schrödinger, COMSOL, traditional CAE and chemistry tools</td>
                    <td className="border border-black px-4 py-3 align-top">Trusted solvers, enterprise workflows, deterministic validation</td>
                    <td className="border border-black px-4 py-3 align-top">Accurate but fragmented, computationally intensive, and mostly forward-oriented</td>
                    <td className="border border-black bg-amber-50 px-4 py-3 align-top font-semibold">Combines AI speed with physics-grounded validation and inverse-design workflows</td>
                    <td className="border border-black px-4 py-3 align-top">Validation layer / integration partner / replacement over time</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              3. Why Shodh Is Different
            </h3>
            <div className="max-w-3xl space-y-3 leading-7 text-black">
              <p>Shodh is not trying to be another molecule generator, faster simulator, robotic lab, or digital twin.</p>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 text-base font-semibold leading-7 text-black">Shodh is designed as the physics-native intelligence layer connecting them.</p>
              <p>The core differentiation is fivefold:</p>
              <p className="mt-5 w-fit border border-black bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">Discovery-to-manufacturing continuity</p>
              <p>Shodh does not stop at candidate generation. It evaluates whether a candidate can be synthesized, processed, scaled, and manufactured under real constraints.</p>
              <p className="mt-5 w-fit border border-black bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">Multiscale physical reasoning</p>
              <p>Shodh connects molecular behavior, process physics, equipment constraints, and manufacturing economics inside one computational loop.</p>
              <p className="mt-5 w-fit border border-black bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">Simulation-first, lab-validated workflow</p>
              <p>Shodh shifts more search into simulation and uses physical labs for targeted validation rather than broad trial-and-error.</p>
              <p className="mt-5 w-fit border border-black bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">Solver-grounded validation</p>
              <p>Shodh does not treat neural prediction as a blind replacement for physics. It uses physics-grounded validation to improve trust in industrial settings.</p>
              <p className="mt-5 w-fit border border-black bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">Deployment data flywheel</p>
              <p>Customer deployments create validation data, calibration signals, and industrial context that are difficult to reproduce from public scientific datasets alone.</p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              4. Strategic Takeaway
            </h3>
            <div className="max-w-3xl space-y-3 leading-7 text-black">
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 text-base font-semibold leading-7 text-black">The AI-for-science market is not weak. It is fragmented.</p>
              <p>Engineering AI companies optimize physical design. Molecular AI companies generate candidates. Robotic labs automate experiments. Digital twins represent industrial assets. Legacy solvers validate known physics.</p>
              <p className="mt-5 w-fit border border-black bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">Shodh’s position is different.</p>
              <p className="border-l-4 border-black bg-white py-3 pl-4 text-base font-semibold leading-7 text-black">Shodh connects discovery, simulation, validation, and manufacturability into one system. We discover the path from chemistry to factory.</p>
            </div>
          </section>
          <nav className="mt-10 border-t-2 border-black pt-5 text-sm font-semibold">
            <a className="inline-flex border border-black bg-white px-4 py-2 text-blue-700 hover:bg-white" href="#saf-dossier">
              Next: Empirical Validation Dossier eFuel
            </a>
          </nav>
        </article>

        <article
          id="competitive-philosophy-old"
          className="hidden"
        >
          <header className="border-b-2 border-black bg-white pb-8 text-black">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-black">
              Confidential — Data Room
            </p>
            <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-black md:text-4xl">
              Shodh AI Competitive Matrix & Core Philosophy
            </h2>
          </header>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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
              <p className="border-l-4 border-black bg-white py-3 pl-4 font-semibold text-black">
                The winning AI company for the physical world will not only
                discover candidates. It will design candidates that can be
                manufactured.
              </p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              2. The Market Problem: Competitors Are Strong, But Siloed
            </h3>
            <div className="max-w-4xl space-y-2 leading-7 text-neutral-800 [&_p]:max-w-3xl [&_strong]:text-slate-950">
              <p>The AI-for-science market is not weak. It is fragmented.</p>
              <p>Most companies are solving one layer of the physical world:</p>
              <ul className="list-disc space-y-1 border border-black bg-white p-4 pl-8">
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

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              3. Competitive Landscape
            </h3>
            <div className="space-y-5 leading-7 text-black [&_div]:border-t [&_div]:border-black [&_div]:bg-white [&_div]:pt-4 [&_p]:mt-1 [&_p]:text-black">
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

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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
              <ol className="list-decimal space-y-5 pl-6 [&_li]:border-t [&_li]:border-black [&_li]:bg-white [&_li]:pt-4 [&_p]:mt-1 [&_p]:text-black">
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

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              6. Shodh’s Mathematical Architecture: The Technical Moat
            </h3>
            <div className="space-y-5 leading-7 text-black [&_div]:border-t [&_div]:border-black [&_div]:bg-white [&_div]:pt-4 [&_p]:mt-1 [&_p]:text-black">
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

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              8. Competitive Matrix
            </h3>
            <CompetitiveMatrixTable />
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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

        <article
          id="commercial-traction"
          className="mb-20 scroll-mt-8 border-2 border-black bg-white p-6 md:p-10"
        >
          <header className="border-b-2 border-black bg-white pb-8 text-black">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-black">
              03 Commercial Traction and Enterprise Pipeline
            </p>
            <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-black md:text-4xl">
              Shodh AI: Commercial Traction & Strategic Enterprise Pipeline
            </h2>
            <p className="mt-5 border border-black bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-black">
              Document Classification: Commercial Due Diligence — Series A Data Room
            </p>
          </header>

          <section className="my-8 border-t border-black bg-white pt-5">
            <div className="max-w-3xl space-y-4 leading-7 text-black">
              <p>
                Shodh AI’s go-to-market strategy begins with bounded, high-value enterprise deployments in industrial environments where discovery, scale-up, and manufacturability are tightly coupled.
              </p>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 font-semibold">
                Our initial commercial motion is focused on paid NRE deployments, technical pilots, formal proposals, and strategic scoping projects.
              </p>
              <p>
                These engagements are designed to solve immediate customer pain points while generating the validation data, workflow knowledge, and calibration signals needed to expand into recurring SaaS/API licensing, domain-specific enterprise agents, milestone-based economics, and IP-driven partnerships.
              </p>
              <p>
                The pipeline below reflects a mix of active deployments, submitted proposals, technical scoping conversations, and strategic target discussions. Status labels are included to distinguish signed work from proposals, discussions, and post-Series A opportunities.
              </p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              1. Active Commercial Pipeline
            </h3>
            <p className="mb-5 max-w-3xl leading-7 text-black">
              The following accounts represent active deployments, formal pilot proposals, submitted mandates, or active scoping discussions.
            </p>
            <div className="overflow-x-auto border-2 border-black bg-white">
              <table className="min-w-[1100px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b-2 border-black bg-white">
                    <th className="border-r border-black px-3 py-3 font-semibold">Account / Partner</th>
                    <th className="border-r border-black px-3 py-3 font-semibold">Sector</th>
                    <th className="border-r border-black px-3 py-3 font-semibold">Target Use Case</th>
                    <th className="border-r border-black px-3 py-3 font-semibold">Current Status</th>
                    <th className="border-r border-black px-3 py-3 font-semibold">Commercial Path</th>
                    <th className="px-3 py-3 font-semibold">Diligence Evidence Available</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Aarti Industries", "Specialty Chemicals", "Exothermic reaction scale-up, continuous-flow chemistry, yield optimization, and COGS reduction", "Active / Paid Pilot, if confirmed", "Paid NRE → Enterprise Process Agent → SaaS/API expansion", "Executed NDA, NRE documentation, normalized pilot data, Exhibit A-03"],
                    ["Jubilant Pharmova", "Pharmaceuticals / Specialty Chemicals", "Continuous-flow multiphase catalytic manufacturing, process optimization, and thermal scaling", "Deployed / Proposal Submitted, confirm exact current status", "Paid pilot / NRE → Scale-up economics → Potential process or hardware invention", "Executed NDA, technical proposal, validation portfolio"],
                    ["A123 Systems", "Battery Manufacturing", "Slurry rheology, coating instability, scrap reduction, electrolyte/process optimization, and scale-up parameters", "Active Pilot Proposal / Technical Scoping", "90-day paid pilot → Factory-line rollout → SaaS deployment", "Executed NDA, meeting notes, pilot proposal, Exhibit A-02"],
                    ["Department of Atomic Energy / Indian Govt. Thorium Program", "Sovereign Energy / Nuclear", "Process modeling, safety-aware simulation, and next-generation reactor thermodynamics", "Active Mandate / Early Discussion / Proposal Phase, confirm exact status", "Strategic sovereign deployment → Secure edge / air-gapped deployment", "PSA letter, stakeholder notes, proposal materials, Exhibit A-04"],
                    ["IOCL / Bharat Petroleum", "Energy / Fuels", "Synthetic aviation fuel / e-fuel process scale-up, thermodynamic validation, and continuous-flow pilot design", "In Discussion", "Pilot validation → Scale-up economics → Strategic deployment", "Introductory communications, technical briefing notes, Exhibit A-01"],
                    ["National Resilience", "Biomanufacturing", "Shear-sensitive process optimization, biologics manufacturability, and scale-up risk reduction", "In Discussion", "Technical evaluation → Paid NRE → Milestone / gain-share structure", "Executive email thread, discovery meeting notes"],
                    ["GE Aerospace", "Aerospace / Advanced Manufacturing", "Advanced materials, supply-chain simulation, and process modeling", "In Discussion", "Paid NRE → Enterprise deployment", "Introductory communications, technical scoping notes"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-black align-top last:border-b-0">
                      {row.map((cell, index) => (
                        <td key={cell} className={`${index < row.length - 1 ? "border-r border-black" : ""} px-3 py-3`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              2. Traction Highlights & Supporting Evidence
            </h3>
            <p className="mb-6 max-w-3xl leading-7 text-black">
              Shodh’s commercial pipeline is supported by technical validation work across specialty chemicals, batteries, fuels, pharmaceuticals, and strategic infrastructure. The following highlights summarize the evidence available in the Exhibit A folder.
            </p>
            <div className="space-y-6">
              <section className="border-l-4 border-black bg-white py-2 pl-4">
                <h4 className="mb-2 font-semibold">A. Specialty Chemicals / Aarti Industries</h4>
                <div className="space-y-2 leading-7 text-black">
                  <p>Shodh’s specialty chemicals work focuses on process optimization, exothermic reaction scale-up, yield improvement, and COGS reduction.</p>
                  <p>The commercial relevance is direct: improvements in yield, stability, process operating windows, and raw-material efficiency can translate into measurable enterprise value.</p>
                  <p>Where supported by Exhibit A-03, Shodh may reference normalized pilot outcomes including modeled or measured COGS reduction, process improvement, and yield optimization.</p>
                  <p><strong>Evidence:</strong> Exhibit A-03, normalized pilot data, NRE documentation, and supporting validation materials.</p>
                </div>
              </section>
              <section className="border-l-4 border-black bg-amber-50 px-4 py-3">
                <h4 className="mb-2 font-semibold">B. Battery Manufacturing / A123 Systems</h4>
                <div className="space-y-2 leading-7 text-black">
                  <p>Shodh has prepared a bounded pilot proposal for A123 Systems focused on battery manufacturing challenges including slurry rheology, mixing behavior, coating instability, scrap reduction, electrolyte performance, and process scale-up.</p>
                  <p>In supporting validation work, Shodh predicted ionic conductivity of <strong>1.25 × 10⁻³ S/cm</strong> for a Sulfonate Ester solid-state electrolyte versus wet-lab validation of <strong>1.22 × 10⁻³ S/cm</strong>, an absolute difference of <strong>0.03 × 10⁻³ S/cm</strong>, or approximately <strong>2.4%</strong>.</p>
                  <p>The proposed pilot models a potential <strong>$4.97M/year annualized value opportunity</strong> from scrap reduction on a single battery line, subject to pilot validation.</p>
                  <p><strong>Evidence:</strong> Exhibit A-02, A123 validation portfolio, meeting notes, and pilot proposal materials.</p>
                </div>
              </section>
              <section className="border-l-4 border-black bg-white py-2 pl-4">
                <h4 className="mb-2 font-semibold">C. Pharmaceuticals / Jubilant Pharmova</h4>
                <div className="space-y-2 leading-7 text-black">
                  <p>Shodh’s pharmaceutical and specialty chemical work focuses on continuous-flow chemistry, multiphase catalytic manufacturing, thermal scaling, and process optimization.</p>
                  <p>The commercial relevance is the connection between molecular/process design and manufacturable operating conditions. In these workflows, Shodh is positioned to help evaluate yield, thermal behavior, reaction robustness, process feasibility, and scale-up economics earlier in the development cycle.</p>
                  <p><strong>Evidence:</strong> Executed NDA, technical proposal, validation portfolio, and related deployment materials.</p>
                </div>
              </section>
              <section className="border-l-4 border-black bg-amber-50 px-4 py-3">
                <h4 className="mb-2 font-semibold">D. Energy / IOCL and Bharat Petroleum</h4>
                <div className="space-y-2 leading-7 text-black">
                  <p>Shodh is in discussions around synthetic aviation fuel and e-fuel scale-up opportunities. The technical wedge is the ability to move from candidate discovery and thermodynamic validation toward process design and continuous-flow scale-up.</p>
                  <p>In supporting validation work, Shodh generated and empirically validated a branched C15 alkene sustainable aviation fuel candidate with a measured freezing point of <strong>-67.9°C</strong>. The validation package also includes robotic synthesis workflow materials, including Opentrons-compatible protocol materials where applicable.</p>
                  <p>This evidence supports ongoing discussions with major Indian energy companies regarding SAF / e-fuel scale-up.</p>
                  <p><strong>Evidence:</strong> Exhibit A-01, SAF empirical dossier, technical briefing notes, and introductory communications.</p>
                </div>
              </section>
              <section className="border-l-4 border-black bg-white py-2 pl-4">
                <h4 className="mb-2 font-semibold">E. Sovereign Energy / Nuclear</h4>
                <div className="space-y-2 leading-7 text-black">
                  <p>Shodh is engaged in discussions or proposal activity related to next-generation nuclear and thorium-cycle infrastructure.</p>
                  <p>The technical relevance is the use of physics-native AI for safety-aware modeling, process simulation, and secure deployment in strategic infrastructure contexts. Shodh’s approach incorporates safety-constrained modeling and deterministic review workflows designed for high-consequence physical systems.</p>
                  <p>Where supported by Exhibit A-04, Shodh may reference correspondence or letters from relevant government stakeholders regarding evaluation or investigation of Shodh’s model for strategic nuclear applications.</p>
                  <p><strong>Evidence:</strong> Exhibit A-04, PSA letter, stakeholder notes, and proposal materials.</p>
                </div>
              </section>
              <section className="border-l-4 border-black bg-white py-2 pl-4">
                <h4 className="mb-2 font-semibold">F. Biomanufacturing / National Resilience</h4>
                <div className="space-y-2 leading-7 text-black">
                  <p>Shodh is in discussion with National Resilience regarding process optimization and manufacturability challenges in biomanufacturing.</p>
                  <p>The technical wedge is the ability to model shear-sensitive processes, fluid behavior, and scale-up risk in systems where small changes in operating conditions can materially affect quality, yield, and viability.</p>
                  <p>The potential commercial path is a scoped technical evaluation followed by a paid NRE or milestone-based deployment.</p>
                  <p><strong>Evidence:</strong> Executive email thread, discovery meeting notes, and technical scoping materials.</p>
                </div>
              </section>
              <section className="border-l-4 border-black bg-white py-2 pl-4">
                <h4 className="mb-2 font-semibold">G. Aerospace / GE Aerospace</h4>
                <div className="space-y-2 leading-7 text-black">
                  <p>Shodh is in discussion with GE Aerospace regarding advanced materials, process simulation, and supply-chain-related modeling opportunities.</p>
                  <p>The technical wedge is the application of multiscale physical modeling to advanced manufacturing environments where materials behavior, process conditions, and supply-chain resilience are tightly coupled.</p>
                  <p>The potential commercial path is a scoped NRE followed by broader enterprise deployment if the initial technical wedge is validated.</p>
                  <p><strong>Evidence:</strong> Introductory communications and technical scoping notes.</p>
                </div>
              </section>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              3. Strategic Implication
            </h3>
            <div className="max-w-3xl space-y-4 leading-7 text-black">
              <p>Shodh’s current pipeline has been seeded primarily through founder-led sales, technical demonstrations, and strategic relationships.</p>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 font-semibold">The commercial implication is that Shodh is seeing demand across multiple high-CapEx sectors where failed scale-up, poor yield, process instability, and manufacturability risk create measurable economic pain.</p>
              <p>Series A capital is intended to convert this early commercial pull into a repeatable enterprise GTM engine through US commercial leadership, deal architects, forward engineers, and enterprise agent productization.</p>
              <p>The detailed hiring plan, capital allocation, and US expansion roadmap are covered separately in:</p>
              <p><strong>05_Series_A_Use_of_Funds_and_US_Expansion.pdf</strong></p>
            </div>
          </section>
        </article>

        <article
          id="business-model"
          className="mb-20 scroll-mt-8 border-2 border-black bg-white p-6 md:p-10"
        >
          <header className="border-b-2 border-black bg-white pb-8 text-black">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-black">
              04 Business Model and Enterprise Agent Strategy
            </p>
            <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-black md:text-4xl">
              Shodh AI: Business Model & Enterprise Agent Strategy
            </h2>
            <p className="mt-5 border border-black bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-black">
              Document Classification: Commercial Strategy — Series A Data Room
            </p>
          </header>

          <section className="my-8 border-t border-black bg-white pt-5">
            <div className="max-w-3xl space-y-4 leading-7 text-black">
              <p>
                Shodh AI monetizes across the industrial value chain by combining near-term enterprise deployments with scalable software, domain-specific agents, milestone economics, and proprietary IP generation.
              </p>
              <p>Our commercial strategy is designed around a clear progression:</p>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 text-base font-semibold leading-7 text-black">
                Paid NREs teach us workflows → Workflows become Enterprise Agents → Agents become SaaS/API modules → Validated programs unlock milestone, gain-share, and IP economics
              </p>
              <p>
                This structure allows Shodh to generate near-term revenue while systematically converting custom technical work into repeatable, higher-margin enterprise software and long-term upside.
              </p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              1. Paid NRE Deployments
            </h3>
            <div className="max-w-3xl space-y-5 leading-7 text-black">
              <div>
                <h4 className="mb-2 font-semibold">Immediate Revenue & Model Calibration</h4>
                <p>
                  Shodh’s initial commercial engagement typically begins with paid Non-Recurring Engineering (NRE) deployments. These are bounded enterprise projects focused on specific industrial bottlenecks such as yield improvement, process scale-up, formulation optimization, thermal stability, scrap reduction, or manufacturability validation.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Customer Value</h4>
                <p>
                  Customers use Shodh to reduce the cost, time, and risk of physical iteration. Instead of relying primarily on repeated pilot-plant experiments, Shodh helps computationally de-risk candidate chemistries, process conditions, and manufacturing operating windows before expensive physical validation.
                </p>
                <p className="mt-3">Examples include:</p>
                <ul className="mt-3 list-disc space-y-1 border-l-4 border-black bg-white py-3 pl-8">
                  <li>thermal scaling for continuous-flow chemistry,</li>
                  <li>slurry rheology and scrap reduction in battery manufacturing,</li>
                  <li>process optimization for specialty chemicals,</li>
                  <li>scale-up feasibility for synthetic fuels,</li>
                  <li>shear-sensitive process modeling in biomanufacturing.</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Shodh Value</h4>
                <p>For Shodh, NRE deployments serve three purposes:</p>
                <ol className="mt-3 space-y-3 border-l-4 border-black bg-white py-3 pl-6">
                  <li><strong>1. Near-term revenue</strong><br />NREs create immediate commercial value without requiring the company to wait for full SaaS maturity.</li>
                  <li><strong>2. Workflow discovery</strong><br />Each deployment reveals repeatable enterprise workflows that can later be productized.</li>
                  <li><strong>3. Model calibration</strong><br />Where contractually permitted, deployments provide access to real industrial data, process outcomes, and validation signals that help calibrate Shodh’s physics models and improve sim-to-real performance.</li>
                </ol>
                <p className="mt-4 border-l-4 border-black bg-amber-50 px-4 py-3 font-semibold">
                  NRE is not the final business model. It is the entry point into customers, data, workflows, and repeatable software products.
                </p>
              </div>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              2. Domain-Specific Enterprise AI Agents
            </h3>
            <div className="max-w-3xl space-y-5 leading-7 text-black">
              <div>
                <h4 className="mb-2 font-semibold">Productizing Industrial Workflows</h4>
                <p>
                  To scale beyond bespoke deployments, Shodh translates repeated NRE workflows into domain-specific Enterprise AI Agents.
                </p>
                <p>
                  These agents are designed to embed inside enterprise R&D, process engineering, and manufacturing environments. Each agent focuses on a specific high-value workflow that previously required a combination of scientists, simulation engineers, process experts, and manual experimentation.
                </p>
              </div>
              <div className="grid gap-5">
                {[
                  ["A. Synthesis Planning Agent", "The Synthesis Planning Agent connects target molecules, materials, or formulations to candidate precursor pathways and synthesis plans.", ["precursor search,", "synthesis feasibility evaluation,", "thermodynamic screening,", "robotic execution planning where applicable,", "integration with automated wet-lab systems such as Opentrons.", "Proof of Concept: Autonomously queried commodity supply chains to generate the exact 3-step Opentrons robotic API code for a novel C15 Sustainable Aviation Fuel (SAF)."], "This agent turns discovery outputs into experimentally actionable synthesis pathways."],
                  ["B. Scale-Up Risk Agent", "The Scale-Up Risk Agent evaluates whether a promising candidate can survive real manufacturing conditions.", ["thermal runaway,", "poor heat transfer,", "shear-stress degradation,", "mixing failure,", "viscosity drift,", "coating instability,", "yield collapse,", "unsafe or uneconomic operating windows.", "Proof of Concept: Utilizes our proprietary DLPack Zero-Copy Memory Bridge to pause neural network hallucinations and run ground-truth JAX-MD physics in 0.67 milliseconds."], "This agent helps customers assess manufacturability before committing to expensive pilot-scale work."],
                  ["C. Process Optimization Agent", "The Process Optimization Agent ingests process data, sensor streams, and manufacturing context to diagnose yield, quality, or stability problems.", ["why yield is falling,", "why viscosity or stability is drifting,", "where thermal or mixing conditions are failing,", "which process parameters should be adjusted,", "whether the root cause is macro-scale, meso-scale, or molecular."], "This agent converts Shodh’s multiscale physics models into an operational tool for factories and process engineers."],
                  ["D. Manufacturability Agent", "The Manufacturability Agent evaluates whether a candidate molecule, formulation, material, or process can become a real product.", ["Can this be synthesized?", "Can it be scaled?", "Can it remain stable?", "Can it meet cost and quality constraints?", "Can it work on existing production infrastructure?", "What process conditions are required?"], "This agent directly reflects Shodh’s core thesis: a promising molecule is not a product until it can be made repeatedly, safely, economically, and at scale."],
                ].map(([title, intro, points, closing]) => (
                  <section key={title as string} className="border-l-4 border-black bg-white py-2 pl-4">
                    <h4 className="mb-2 font-semibold">{title}</h4>
                    <p>{intro}</p>
                    <p className="mt-3">It is designed to support:</p>
                    <ul className="mt-3 list-disc space-y-1 pl-6">
                      {(points as string[]).map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <p className="mt-3 font-semibold">{closing}</p>
                  </section>
                ))}
              </div>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              3. Enterprise SaaS & API Licensing
            </h3>
            <div className="max-w-3xl space-y-5 leading-7 text-black">
              <div>
                <h4 className="mb-2 font-semibold">Recurring Software Revenue</h4>
                <p>As Shodh’s agents and physics models mature, they are packaged into recurring software licenses and API-based delivery.</p>
              </div>
              <div className="border-l-4 border-black bg-white py-2 pl-4">
                <h4 className="mb-2 font-semibold">Cloud API</h4>
                <p>Shodh’s cloud API provides enterprise R&D and process engineering teams with access to Shodh’s multiscale physics engine for workflows such as:</p>
                <ul className="mt-3 list-disc space-y-1 pl-6">
                  <li>virtual screening,</li>
                  <li>scale-up validation,</li>
                  <li>process optimization,</li>
                  <li>formulation search,</li>
                  <li>manufacturability analysis,</li>
                  <li>physics-grounded inverse design.</li>
                </ul>
                <p className="mt-3 font-semibold">This creates a recurring revenue path beyond one-off deployments.</p>
              </div>
              <div className="border-l-4 border-black bg-white py-2 pl-4">
                <h4 className="mb-2 font-semibold">Enterprise Agent Licenses</h4>
                <p>Domain-specific agents can be licensed as enterprise modules for specific customer workflows. Examples include:</p>
                <ul className="mt-3 list-disc space-y-1 pl-6">
                  <li>Synthesis Planning Agent,</li>
                  <li>Scale-Up Risk Agent,</li>
                  <li>Process Optimization Agent,</li>
                  <li>Manufacturability Agent,</li>
                  <li>Formulation Agent,</li>
                  <li>Battery Process Agent,</li>
                  <li>Continuous-Flow Chemistry Agent.</li>
                </ul>
                <p className="mt-3">These agents allow Shodh to productize lessons from NRE deployments and sell repeatable workflow software across multiple customers.</p>
              </div>
              <div className="border-l-4 border-black bg-amber-50 px-4 py-3">
                <h4 className="mb-2 font-semibold">Secure Edge / Air-Gapped Deployment</h4>
                <p>For customers in defense, aerospace, nuclear, energy, and proprietary pharmaceutical manufacturing, Shodh can deploy models in secure environments.</p>
                <p className="mt-3">This may include:</p>
                <ul className="mt-3 list-disc space-y-1 pl-6">
                  <li>on-premise deployment,</li>
                  <li>air-gapped infrastructure,</li>
                  <li>quantized edge models,</li>
                  <li>secure inference environments,</li>
                  <li>customer-controlled data boundaries.</li>
                </ul>
                <p className="mt-3 font-semibold">This deployment mode supports customers that cannot send sensitive process, national-security, or manufacturing data to external cloud systems.</p>
              </div>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              4. Milestone & Gain-Share Programs
            </h3>
            <div className="max-w-3xl space-y-4 leading-7 text-black">
              <h4 className="font-semibold">Participating in Customer Upside</h4>
              <p>In selected programs, Shodh can participate in the economic upside of the products or processes it helps create.</p>
              <p>This model is especially relevant when Shodh contributes materially to:</p>
              <ul className="list-disc space-y-1 border-l-4 border-black bg-white py-3 pl-8">
                <li>discovery of a novel molecule or material,</li>
                <li>process de-risking,</li>
                <li>pilot synthesis,</li>
                <li>yield improvement,</li>
                <li>manufacturability validation,</li>
                <li>commercial scale-up.</li>
              </ul>
              <p>Potential structures include:</p>
              <ul className="list-disc space-y-1 border-l-4 border-black bg-white py-3 pl-8">
                <li>upfront payments,</li>
                <li>technical milestone payments,</li>
                <li>pilot-success payments,</li>
                <li>commercial-scale success fees,</li>
                <li>royalty participation,</li>
                <li>gain-share economics linked to cost savings or revenue impact.</li>
              </ul>
              <p>This aligns Shodh’s revenue with the customer’s commercial success.</p>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 font-semibold">
                The goal is not only to sell software access. The goal is to capture a portion of the economic value created when Shodh helps customers invent, validate, or manufacture valuable physical products.
              </p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              5. Proprietary IP Generation
            </h3>
            <div className="max-w-3xl space-y-4 leading-7 text-black">
              <h4 className="font-semibold">Building a Licensable IP Portfolio</h4>
              <p>Over time, Shodh can use its own inverse-design workflows to generate proprietary materials, formulations, chemistries, and processes.</p>
              <p>This creates a separate upside path beyond customer deployments and SaaS licensing.</p>
              <p>Potential proprietary IP areas include:</p>
              <ul className="list-disc space-y-1 border-l-4 border-black bg-white py-3 pl-8">
                <li>sustainable aviation fuels,</li>
                <li>synthetic e-fuels,</li>
                <li>solid-state battery electrolytes,</li>
                <li>advanced catalysts,</li>
                <li>green solvents,</li>
                <li>specialty chemicals,</li>
                <li>manufacturing process improvements,</li>
                <li>high-value materials or formulations.</li>
              </ul>
              <p>Shodh AI is actively generating sovereign IP. During idle compute cycles, our 'God-Loop' autonomously discovered, verified, and reverse-engineered the manufacturing pathways for a highly branched C15 Sustainable Aviation Fuel (SAF) and a Sulfonate Ester solid-state battery electrolyte. We retain the composition-of-matter IP to license to Fortune 500 manufacturers.</p>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 font-semibold">The strategic purpose is to convert Shodh’s model capabilities into a portfolio of licensable proprietary IP.</p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              6. How the Business Model Compounds
            </h3>
            <p className="mb-5 max-w-3xl leading-7 text-black">
              Shodh’s commercial model is designed to compound across five layers:
            </p>
            <div className="overflow-x-auto border-2 border-black bg-white">
              <table className="min-w-[760px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-black bg-white">
                    <th className="border-r border-black px-3 py-3 font-semibold">Layer</th>
                    <th className="border-r border-black px-3 py-3 font-semibold">Revenue Type</th>
                    <th className="px-3 py-3 font-semibold">Strategic Value</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Paid NRE Deployments", "Near-term project revenue", "Customer access, validation data, workflow discovery"],
                    ["Enterprise Agents", "Productized workflow software", "Repeatability and reduced services dependency"],
                    ["SaaS/API Licensing", "Recurring software revenue", "Scalable enterprise distribution"],
                    ["Milestone / Gain-Share", "Upside-linked economics", "Participation in customer success"],
                    ["Proprietary IP", "Licensing / royalty potential", "Long-term asset creation"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-black align-top last:border-b-0">
                      <td className="border-r border-black px-3 py-3 font-semibold">{row[0]}</td>
                      <td className="border-r border-black px-3 py-3">{row[1]}</td>
                      <td className="px-3 py-3">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 max-w-3xl space-y-2 border-l-4 border-black bg-amber-50 px-4 py-3 leading-7 text-black">
              <p className="font-semibold">The key insight is that each layer strengthens the next.</p>
              <p>NREs reveal workflows.</p>
              <p>Workflows become agents.</p>
              <p>Agents become SaaS/API modules.</p>
              <p>Successful programs create milestone and gain-share opportunities.</p>
              <p>Internal inverse-design loops create proprietary IP.</p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              7. Strategic Implication
            </h3>
            <div className="max-w-3xl space-y-4 leading-7 text-black">
              <p>Shodh AI is not designed to remain a services-heavy NRE company.</p>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 text-base font-semibold">NREs are the wedge.</p>
              <p>They create revenue, customer access, deployment data, and workflow knowledge. Shodh then converts repeated workflows into Enterprise Agents and SaaS/API products, while selectively participating in the upside of high-value discoveries, process improvements, and proprietary IP.</p>
              <p>This gives Shodh a business model with three forms of value creation:</p>
              <ol className="space-y-3 border-l-4 border-black bg-white py-3 pl-6">
                <li><strong>1. Immediate enterprise revenue</strong> from paid deployments.</li>
                <li><strong>2. Scalable recurring revenue</strong> from SaaS, APIs, and Enterprise Agents.</li>
                <li><strong>3. Asymmetric upside</strong> from gain-share structures and proprietary IP.</li>
              </ol>
              <p>Shodh does not only sell tools.</p>
              <p className="border-l-4 border-black bg-white py-3 pl-4 text-base font-semibold">Shodh captures value from the physical innovation it helps make possible.</p>
            </div>
          </section>
        </article>

        <article
          id="non-dilutive-capital"
          className="mb-20 scroll-mt-8 border-2 border-black bg-white p-6 md:p-10"
        >
          <header className="border-b-2 border-black bg-white pb-8 text-black">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-black">
              06 Non-Dilutive Capital Compute and Strategic Programs
            </p>
            <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-black md:text-4xl">
              Shodh AI: Non-Dilutive Capital, Compute & Strategic Programs
            </h2>
            <p className="mt-5 border border-black bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-black">
              Document Classification: Financial & Strategic Diligence — Series A Data Room
            </p>
          </header>

          <section className="my-8 border-t border-black bg-white pt-5">
            <div className="max-w-3xl space-y-4 leading-7 text-black">
              <p>
                Shodh AI is a frontier physical AI company. Building a multiscale intelligence system for molecules, materials, process physics, and manufacturing requires substantial compute, research capital, and access to strategically important physical problems.
              </p>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 font-semibold">
                As Shodh scales toward larger foundation models, compute demand will continue to increase.
              </p>
              <p>
                The company’s financing strategy is therefore staged: use non-dilutive compute and strategic government support to reduce early capital intensity, reach stronger model and commercial milestones, and position the company for larger US-led financing rounds as the model roadmap expands.
              </p>
              <p className="border-l-4 border-black bg-white py-3 pl-4 font-semibold">
                Non-dilutive support is not a replacement for long-term frontier AI financing. It is an early leverage layer.
              </p>
              <p>The programs below include current compute support, submitted proposals, and active strategic discussions.</p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              1. Strategic Programs & Compute Pipeline
            </h3>
            <div className="overflow-x-auto border-2 border-black bg-white">
              <table className="min-w-[1180px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b-2 border-black bg-white">
                    <th className="border-r border-black px-3 py-3 font-semibold">Program / Partner</th>
                    <th className="border-r border-black px-3 py-3 font-semibold">Type</th>
                    <th className="border-r border-black px-3 py-3 font-semibold">Estimated Value / Scope</th>
                    <th className="border-r border-black px-3 py-3 font-semibold">Current Status</th>
                    <th className="border-r border-black px-3 py-3 font-semibold">Intended Use</th>
                    <th className="px-3 py-3 font-semibold">Diligence Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["IndiaAI Mission", "Sovereign compute allocation", "Initial 1M compute hours, with pathway to approximately 30M compute hours for larger model training after proof milestones", "Initial allocation / proof-stage support; larger allocation subject to proof milestones", "Large-scale foundation model training, synthetic physics data generation, simulation workloads, and larger model development", "Allocation documentation, application dossier, proof submissions, milestone correspondence"],
                    ["RDI / TDB", "Research, development, innovation support and non-dilutive debt", "Approximately $20M–$30M to support compute and model-building infrastructure", "Active Discussion / Under Review", "Compute support, model development, multiscale physics validation, and R&D infrastructure", "Proposal materials, discussion notes, term sheet draft, application materials"],
                    ["ANRF Grant Program", "Research grant / compute support", "Approximately $3M in compute support", "In Discussion / Submitted", "Model development, validation workloads, and research infrastructure", "Grant application, submission confirmation, correspondence"],
                    ["Govt. of India / Thorium or Nuclear Program", "Strategic national program", "Sovereign nuclear modeling / secure deployment opportunity", "In Active Discussion", "Safety-aware modeling, reactor thermodynamics, and secure edge deployment for strategic infrastructure", "Stakeholder meeting notes, PSA letter, proposal materials"],
                    ["Other Government / Strategic Programs", "Strategic support", "To be confirmed", "In Discussion / Targeted", "Sector-specific physical AI programs in energy, aerospace, defense, or advanced manufacturing", "Meeting notes, proposals, correspondence"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-black align-top last:border-b-0">
                      {row.map((cell, index) => (
                        <td key={cell} className={`${index < row.length - 1 ? "border-r border-black" : ""} px-3 py-3`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              2. Strategic Value of Non-Dilutive Compute
            </h3>
            <div className="max-w-3xl space-y-4 leading-7 text-black">
              <p>
                Frontier AI companies require increasing compute as model scale, dataset scale, and evaluation complexity grow. For Shodh, this is especially important because the model is not trained only on text or static data. It must learn from physics simulations, molecular structures, thermodynamic trajectories, process behavior, and validation outcomes.
              </p>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 font-semibold">
                The IndiaAI compute pathway begins with an initial 1M compute-hour allocation to demonstrate proof milestones, with a potential expansion toward approximately 30M compute hours for larger model training and synthetic physics data generation.
              </p>
              <p>This support can be used for workloads such as:</p>
              <ul className="list-disc space-y-1 border-l-4 border-black bg-white py-3 pl-8">
                <li>large-scale physics foundation model training,</li>
                <li>synthetic physics data generation,</li>
                <li>macro-fluid and thermodynamic simulation trajectories,</li>
                <li>model evaluation and validation workloads,</li>
                <li>larger model development after proof milestones,</li>
                <li>research-scale experimentation before commercial deployment.</li>
              </ul>
              <p className="border-l-4 border-black bg-white py-3 pl-4 font-semibold">
                The strategic value is capital efficiency. Non-dilutive compute allows Shodh to advance the model roadmap without funding every early training and simulation workload through venture capital alone.
              </p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              3. Compute Strategy: R&D Infrastructure vs. Commercial Execution
            </h3>
            <div className="grid gap-5">
              <section className="border-l-4 border-black bg-amber-50 px-4 py-3">
                <h4 className="mb-2 font-semibold">A. Non-Dilutive / Sovereign Compute</h4>
                <p className="font-semibold">Primary use: model training, synthetic data generation, large-scale simulation, research experimentation, and validation workloads.</p>
                <p className="mt-3 leading-7 text-black">
                  This compute supports the foundational work required to improve Shodh’s physics models and reduce the cost of early model scaling.
                </p>
              </section>
              <section className="border-l-4 border-black bg-white py-3 pl-4">
                <h4 className="mb-2 font-semibold">B. Commercial GPU / Customer Deployment Infrastructure</h4>
                <p className="font-semibold">Primary use: customer NREs, API inference, enterprise pilots, secure deployments, and customer-specific workloads.</p>
                <p className="mt-3">These resources support revenue-generating activity, including:</p>
                <ul className="mt-3 list-disc space-y-1 pl-6">
                  <li>paid NRE deployments,</li>
                  <li>enterprise API usage,</li>
                  <li>secure edge deployments,</li>
                  <li>customer-specific simulation workloads,</li>
                  <li>inference for domain-specific Enterprise Agents.</li>
                </ul>
              </section>
              <p className="max-w-3xl border-l-4 border-black bg-white py-3 pl-4 font-semibold leading-7 text-black">
                This separation allows Shodh to use non-dilutive compute for early frontier-model development while reserving privately funded infrastructure and commercial cloud resources for customer-facing work.
              </p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              4. Frontier AI Financing Roadmap
            </h3>
            <div className="max-w-3xl space-y-4 leading-7 text-black">
              <p>Shodh’s long-term model roadmap will require progressively larger compute budgets.</p>
              <p>The current non-dilutive programs are intended to help Shodh reach the next set of technical and commercial milestones more efficiently:</p>
              <ol className="space-y-3 border-l-4 border-black bg-white py-3 pl-6">
                <li><strong>1. Proof-stage model validation</strong><br />Use initial compute support to validate core model performance, simulation workflows, and synthetic data generation.</li>
                <li><strong>2. Larger model training</strong><br />Expand toward larger physics foundation models using IndiaAI compute and other non-dilutive support where available.</li>
                <li><strong>3. Commercial deployment readiness</strong><br />Combine model progress with enterprise pilots, NRE deployments, and customer validation.</li>
                <li><strong>4. US-led scale financing</strong><br />Use stronger technical and commercial proof points to support larger future financing rounds for frontier model scaling, global enterprise GTM, and infrastructure expansion.</li>
              </ol>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 font-semibold">
                This staged strategy is designed to avoid premature overcapitalization while still acknowledging the reality of frontier AI: larger models, larger datasets, and broader deployment will require substantially more compute over time.
              </p>
            </div>
          </section>

          <section className="my-8 border-t border-black bg-white pt-5">
            <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
              5. National Strategic Relevance
            </h3>
            <div className="max-w-3xl space-y-4 leading-7 text-black">
              <p>Shodh’s work sits at the intersection of AI, materials, energy, manufacturing, and strategic infrastructure.</p>
              <p>National science and technology programs are increasingly focused on capabilities such as:</p>
              <ul className="list-disc space-y-1 border-l-4 border-black bg-white py-3 pl-8">
                <li>advanced battery materials,</li>
                <li>synthetic fuels and energy security,</li>
                <li>aerospace and defense manufacturing,</li>
                <li>nuclear and thorium-cycle modeling,</li>
                <li>supply-chain resilience,</li>
                <li>domestic scientific computing capacity.</li>
              </ul>
              <p className="border-l-4 border-black bg-amber-50 px-4 py-3 font-semibold">
                Shodh’s physics-native AI platform is aligned with these priorities because it is designed to model, optimize, and de-risk physical systems that matter for industrial competitiveness and national infrastructure.
              </p>
              <p>Strategic government engagement can provide several advantages:</p>
              <ol className="space-y-3 border-l-4 border-black bg-white py-3 pl-6">
                <li><strong>1. Non-dilutive capital and compute</strong><br />Reduces the capital intensity of early model development.</li>
                <li><strong>2. High-value validation environments</strong><br />Gives Shodh access to difficult physical problems that are not easily available in public datasets.</li>
                <li><strong>3. Regulatory and institutional credibility</strong><br />Supports trust in sectors such as energy, nuclear, aerospace, and advanced manufacturing.</li>
                <li><strong>4. Strategic customer pathways</strong><br />Creates opportunities for government-backed pilots, sovereign deployments, and public-private partnerships.</li>
              </ol>
            </div>
          </section>
        </article>

        <div className="mt-20 border-t-4 border-black pt-10">
          <aside className="mb-10 xl:hidden">
            <nav className="border-2 border-black bg-white p-5">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-black">
                Data Room Index
              </p>
              <ol className="space-y-2 text-sm text-black">
                <li>
                  <a className="block border-l-4 border-black bg-amber-50 px-3 py-2 font-semibold text-black hover:bg-amber-50" href="#executive-thesis">
                    01 Shodh AI Executive Thesis
                  </a>
                </li>
                <li>
                  <a className="block border-l-4 border-black bg-amber-50 px-3 py-2 font-semibold text-black hover:bg-amber-50" href="#competitive-philosophy">
                    02 Competitive Landscape and Positioning
                  </a>
                </li>
                <li>
                  <a className="block border-l-4 border-black bg-amber-50 px-3 py-2 font-semibold text-black hover:bg-amber-50" href="#commercial-traction">
                    03 Commercial Traction and Enterprise Pipeline
                  </a>
                </li>
                <li>
                  <a className="block border-l-4 border-black bg-amber-50 px-3 py-2 font-semibold text-black hover:bg-amber-50" href="#business-model">
                    04 Business Model and Enterprise Agent Strategy
                  </a>
                </li>
                <li className="border-l-4 border-neutral-300 px-3 py-2 text-neutral-500">05 Series A Use of Funds and US Expansion</li>
                <li>
                  <a className="block border-l-4 border-black bg-amber-50 px-3 py-2 font-semibold text-black hover:bg-amber-50" href="#non-dilutive-capital">
                    06 Non-Dilutive Capital Compute and Strategic Programs
                  </a>
                </li>
                <li className="border-l-4 border-neutral-300 px-3 py-2 text-neutral-500">07 Commercial Advisory Board and Strategic Network</li>
              </ol>
              <div className="mt-6 space-y-5 text-sm text-black">
                <section>
                  <p className="mb-2 border-b border-black pb-1 text-xs font-semibold uppercase tracking-wide">
                    Exhibit A Empirical Validation and Case Studies
                  </p>
                  <ol className="space-y-2">
                    <li>
                      <a className="block border-l-4 border-black bg-amber-50 px-3 py-2 font-semibold text-black hover:bg-amber-50" href="#saf-dossier">
                        01 Empirical Validation Dossier eFuel SAF
                      </a>
                    </li>
                    <li>
                      <a className="block border-l-4 border-black bg-amber-50 px-3 py-2 font-semibold text-black hover:bg-amber-50" href="#battery-dossier">
                        02 Empirical Validation Dossier Battery
                      </a>
                    </li>
                    <li className="border-l-4 border-neutral-300 px-3 py-2 text-neutral-500">03 Aarti Industries NRE Case Study</li>
                    <li>
                      <a className="block border-l-4 border-black bg-amber-50 px-3 py-2 font-semibold text-black hover:bg-amber-50" href="#nuclear-dossier">
                        04 Govt of India DAE Nuclear Letter
                      </a>
                    </li>
                  </ol>
                </section>
                <section>
                  <p className="mb-2 border-b border-black pb-1 text-xs font-semibold uppercase tracking-wide">
                    Exhibit B Technical IP and Internal Preprints
                  </p>
                  <ol className="space-y-2">
                    <li>
                      <a className="block border-l-4 border-black bg-amber-50 px-3 py-2 font-semibold text-black hover:bg-amber-50" href="#proprietary-research-math">
                        02 Proprietary Research and Math
                      </a>
                    </li>
                  </ol>
                </section>
              </div>
            </nav>
          </aside>

          <div className="min-w-0 space-y-20">
            <article
              id="saf-dossier"
              className="scroll-mt-8 border-2 border-black bg-white p-6 md:p-10"
            >
              <DossierHeader
                eyebrow="Exhibit A / 01 Empirical Validation Dossier eFuel SAF"
                title="Autonomous Discovery & Empirical Validation of C15 Sustainable Aviation Fuel (SAF)"
                summary="UNIPHY generated, routed, synthesized, and validated a heavily branched C15 alkene candidate for cold-flow performance and Jet-A1-grade energy density."
                status="Validation Complete"
              />

              <section className="my-8 border-t border-black bg-white pt-5">
                <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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

              <section className="my-8 border-t border-black bg-white pt-5">
                <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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

              <section className="my-8 border-t border-black bg-white pt-5">
                <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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
                <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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

            <div className="my-10 border-y border-black bg-white py-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black">
                End of Exhibit A / 01 Empirical Validation Dossier eFuel SAF
              </p>
              <p className="mt-2 text-sm font-medium text-black">
                <a className="inline-flex border border-black bg-white px-4 py-2 text-blue-700 hover:bg-white" href="#battery-dossier">
                  Next: Exhibit A / 02 Empirical Validation Dossier Battery
                </a>
              </p>
            </div>

            <article
              id="battery-dossier"
              className="scroll-mt-8 border-2 border-black bg-white p-6 md:p-10"
            >
              <DossierHeader
                eyebrow="Exhibit A / 02 Empirical Validation Dossier Battery"
                title="Autonomous Discovery & Empirical Validation of High-Stability Solid-State Battery Electrolyte"
                summary="UNIPHY engineered, synthesized, and validated a sulfonate ester electrolyte candidate designed for high-voltage stability, SEI formation, and dendrite suppression."
                status="Validation Complete"
              />

              <section className="my-8 border-t border-black bg-white pt-5">
                <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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

              <section className="my-8 border-t border-black bg-white pt-5">
                <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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

              <section className="my-8 border-t border-black bg-white pt-5">
                <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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
                <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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

            <div className="my-10 border-y border-black bg-white py-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black">
                End of Exhibit A / 02 Empirical Validation Dossier Battery
              </p>
              <p className="mt-2 text-sm font-medium text-black">
                <a className="inline-flex border border-black bg-white px-4 py-2 text-blue-700 hover:bg-white" href="#nuclear-dossier">
                  Next: Exhibit A / 04 Govt of India DAE Nuclear Letter
                </a>
              </p>
            </div>

            <article
              id="nuclear-dossier"
              className="scroll-mt-8 border-2 border-black bg-white p-6 md:p-10"
            >
              <DossierHeader
                eyebrow="Exhibit A / 04 Govt of India DAE Nuclear Letter"
                title="Inverse Design & Autonomous Optimization of Stage-3 Nuclear Reactor Infrastructure"
                summary="UNIPHY's macro-fluid and thermal experts are positioned for inverse design of liquid sodium and molten salt reactor infrastructure for India's 3-stage nuclear program."
                status="Sovereign Validation"
              />

              <section className="my-8 border-t border-black bg-white pt-5">
                <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
                  1. The Sovereign Mandate
                </h3>
                <div className="mb-5 space-y-2 border border-black bg-white p-4 text-sm">
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

              <section className="my-8 border-t border-black bg-white pt-5">
                <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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
                <div className="border-l-4 border-black bg-white py-3 pl-4">
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
                <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
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
                <div className="mt-6 border-2 border-black bg-white">
                  <div className="border-b-2 border-black bg-white px-4 py-3 text-xs font-semibold uppercase tracking-wide text-black">
                    Govt of India DAE Nuclear Letter
                  </div>
                  <iframe
                    src={`${daeLetterUrl}#view=FitH`}
                    title="Govt of India DAE Nuclear Letter"
                    className="h-[780px] w-full bg-white"
                  />
                </div>
                <a
                  className="mt-4 inline-flex border border-black bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-white"
                  href={daeLetterUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open full DAE Nuclear Letter
                </a>
              </section>
            </article>

            <article
              id="proprietary-research-math"
              className="scroll-mt-8 border-2 border-black bg-white p-6 md:p-10"
            >
              <header className="border-b-2 border-black bg-white pb-8 text-black">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-black">
                  Exhibit B Technical IP and Internal Preprints / 02 Proprietary Research and Math
                </p>
                <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-black md:text-4xl">
                  Shodh AI: Internal Pre-Prints & Algorithmic Intellectual Property
                </h2>
                <p className="mt-5 border border-black bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-black">
                  Document Classification: Algorithmic IP — Series A Data Room
                </p>
              </header>

              <section className="my-8 border-t border-black bg-white pt-5">
                <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
                  Context & R&D Velocity
                </h3>
                <div className="max-w-3xl space-y-3 leading-7 text-black">
                  <p>
                    At Shodh AI, our primary mandate is commercial execution and infrastructure scaling. Our engineering sprints move significantly faster than traditional academic publishing cycles.
                  </p>
                  <p className="border-l-4 border-black bg-amber-50 px-4 py-3 text-base font-semibold leading-7 text-black">
                    During current R&D, our engineering teams encountered fundamental mathematical and hardware bottlenecks that neither open-source literature nor legacy solvers could address.
                  </p>
                  <p>
                    To solve these, Shodh AI engineered proprietary algorithmic breakthroughs in real-time.
                  </p>
                  <p>
                    The following documents are internal pre-print abstracts and technical whitepapers detailing the core mathematical frameworks powering our architecture. While these will eventually be submitted to arXiv and tier-1 journals (NeurIPS, ICML, Nature) to establish Shodh AI’s scientific dominance, they are currently retained as internal Trade Secrets and Algorithmic IP.
                  </p>
                </div>
              </section>

              <section className="my-8 border-t border-black bg-white pt-5">
                <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
                  Institutional Validation
                </h3>
                <div className="max-w-3xl space-y-3 leading-7 text-black">
                  <p>
                    These breakthroughs were not developed in a vacuum. Because our architecture pushes the absolute physical limits of modern silicon, these papers are co-authored alongside the elite hardware and research institutions that support our infrastructure, including:
                  </p>
                  <div className="space-y-3">
                    <p className="border-l-4 border-black bg-amber-50 px-4 py-3">
                      <strong>NVIDIA</strong> — Validating our FP8/BF16 Hybrid Precision, FP64 cuSOLVER optimizations, and O(N) Warp Spatial Hashing.
                    </p>
                    <p className="border-l-4 border-black bg-white py-3 pl-4">
                      <strong>Google Cloud</strong> — Validating our zero-drop Sinkhorn Optimal Transport routing on Trillium v6e TPUs.
                    </p>
                    <p className="border-l-4 border-black bg-white py-3 pl-4">
                      <strong>Tata Institute of Fundamental Research (TIFR)</strong> — Validating our zero-dissipation Symplectic Neural ODEs.
                    </p>
                    <p className="border-l-4 border-black bg-white py-3 pl-4">
                      <strong>Arizona State University</strong> — Validating our Hodge-Projected topology extraction and Shape-Gain LLM Bridge.
                    </p>
                  </div>
                  <p className="border-l-4 border-black bg-amber-50 px-4 py-3 text-base font-semibold leading-7 text-black">
                    These abstracts serve as verifiable proof that Shodh AI is not merely utilizing existing physics libraries, but actively inventing the mathematics required to virtualize physical reality.
                  </p>
                </div>
              </section>

              <section className="my-8 border-t border-black bg-white pt-5">
                <h3 className="mb-5 border-b border-black pb-3 text-lg font-semibold tracking-tight text-black">
                  Internal Pre-Print Screenshot Archive
                </h3>
                <div className="space-y-8">
                  {prePrintScreenshots.map((src, index) => (
                    <figure key={src} className="border-2 border-black bg-white">
                      <figcaption className="border-b-2 border-black bg-white px-4 py-3 text-xs font-semibold uppercase tracking-wide text-black">
                        Pre-Print Screenshot {String(index + 1).padStart(2, "0")}
                      </figcaption>
                      <img
                        src={src}
                        alt={`Shodh AI internal pre-print screenshot ${index + 1}`}
                        className="block h-auto w-full bg-white"
                      />
                    </figure>
                  ))}
                </div>
              </section>
            </article>
          </div>
        </div>

        <footer className="mt-10 border-t-2 border-black bg-white pt-5 text-sm text-black">
          <Link
            href="/"
            className="font-medium text-blue-700 underline underline-offset-4"
          >
            Back to Shodh AI
          </Link>
        </footer>
        </div>
      </div>
    </main>
  );
}
