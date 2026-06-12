import Link from "next/link";

const sop001PdfUrl = "/pdf/SOP-001_solid_state_battery_electrolyte.pdf";
const sop002PdfUrl = "/pdf/SOP-002_highly_branched_SAF.pdf";
const daeLetterUrl = "/pdf/Letter-to-Secretary-DAE.pdf";

const safRows = [
  ["Freezing / Pour Point", "-68.4 deg C", "-67.9 deg C", "0.5 deg C", "Differential Scanning Calorimetry (DSC) / ASTM D97"],
  ["Specific Energy Density", "43.95 MJ/kg", "43.81 MJ/kg", "0.14 MJ/kg", "Bomb Calorimetry (ASTM D4809) / GC-FID"],
  ["Kinematic Viscosity (-20 deg C)", "6.82 cSt", "6.91 cSt", "0.09 cSt", "Capillary Viscometer (ASTM D445)"],
  ["Synthesis Execution", "Protocol compiled in 0.84 sec", "Lab synthesis completed", "PASS", "Standard Operating Procedure (SOP-002)"]
];

const batteryRows = [
  ["Ionic Conductivity (25 deg C)", "1.25 x 10^-3 S/cm", "1.22 x 10^-3 S/cm", "0.03 S/cm", "Electrochemical Impedance Spectroscopy (EIS)"],
  ["Anodic Stability (ESW)", "4.85 V vs Li/Li+", "4.81 V vs Li/Li+", "0.04 V", "Linear Sweep Voltammetry (LSV)"],
  ["Lithium Transference Number (tLi+)", "0.68", "0.66", "0.02", "Bruce-Vincent-Evans Method"],
  ["Thermal Degradation Onset", "245.0 deg C", "242.5 deg C", "2.5 deg C", "Thermogravimetric Analysis (TGA)"],
  ["Robotic Workflow", "Protocol compiled in 0.54 sec", "Lab synthesis completed", "PASS", "Standard Operating Procedure (SOP-001)"]
];

function DossierHeader({
  eyebrow,
  title,
  summary,
  status
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
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">{eyebrow}</p>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">{title}</h2>
        </div>
        <p className="w-fit shrink-0 border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-800">
          {status}
        </p>
      </div>
      <p className="max-w-4xl text-base leading-7 text-slate-700">{summary}</p>
    </header>
  );
}

function ValidationTable({ rows, caption }: { rows: string[][]; caption: string }) {
  return (
    <figure className="my-7">
      <figcaption className="border-x-2 border-t-2 border-slate-300 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800">
        {caption}
      </figcaption>
      <div className="overflow-x-auto border-2 border-slate-300 bg-white">
      <table className="w-full min-w-[980px] border-collapse text-sm">
        <thead>
          <tr className="bg-slate-200 text-slate-950">
            <th className="w-[24%] border border-slate-300 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">Property</th>
            <th className="w-[18%] border border-slate-300 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">UNIPHY Prediction</th>
            <th className="w-[18%] border border-slate-300 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">Wet-Lab Measurement</th>
            <th className="w-[13%] border border-slate-300 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">Delta Error</th>
            <th className="border border-slate-300 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">Analytical Evidence</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row[0]} className={rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50"}>
              <td className="border border-slate-300 px-4 py-3 align-top font-semibold text-slate-950">{row[0]}</td>
              <td className="border border-slate-300 px-4 py-3 align-top font-mono text-[13px] text-slate-800">{row[1]}</td>
              <td className="border border-slate-300 px-4 py-3 align-top font-mono text-[13px] font-semibold text-slate-950">{row[2]}</td>
              <td className="border border-slate-300 bg-amber-50 px-4 py-3 align-top font-mono text-[13px] font-semibold text-slate-950">{row[3]}</td>
              <td className="border border-slate-300 px-4 py-3 align-top text-slate-700">{row[4]}</td>
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
        <header className="mb-8 border border-slate-200 bg-white px-6 py-7 shadow-sm md:px-8 md:py-9">
          <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Shodh AI Investor Data Room</p>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Technical Validation Dossiers</h1>
            </div>
            <p className="w-fit border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-600">
              Confidential Review
            </p>
          </div>
          <p className="max-w-3xl text-base leading-7 text-slate-700">
            Investor-ready technical packet covering autonomous discovery programs, source SOPs, empirical measurements, sovereign validation, and commercial scale-up paths.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-6">
            <nav className="border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Documents</p>
              <ol className="space-y-3 text-sm text-slate-800">
                <li>
                  <a className="block border-l-4 border-blue-600 bg-blue-50 px-3 py-2 font-medium text-blue-900 hover:bg-blue-100" href="#saf-dossier">
                    01. C15 Sustainable Aviation Fuel
                  </a>
                </li>
                <li>
                  <a className="block border-l-4 border-violet-600 bg-violet-50 px-3 py-2 font-medium text-violet-900 hover:bg-violet-100" href="#battery-dossier">
                    02. Solid-State Battery Electrolyte
                  </a>
                </li>
                <li>
                  <a className="block border-l-4 border-emerald-600 bg-emerald-50 px-3 py-2 font-medium text-emerald-900 hover:bg-emerald-100" href="#nuclear-dossier">
                    03. Nuclear Reactor Infrastructure
                  </a>
                </li>
              </ol>
              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Source Documents</p>
                <div className="space-y-2 text-sm">
                  <a className="block border border-slate-200 px-3 py-2 font-medium text-blue-700 hover:bg-slate-50" href={sop002PdfUrl} target="_blank" rel="noreferrer">
                    Open SOP-002 PDF
                  </a>
                  <a className="block border border-slate-200 px-3 py-2 font-medium text-blue-700 hover:bg-slate-50" href={sop001PdfUrl} target="_blank" rel="noreferrer">
                    Open SOP-001 PDF
                  </a>
                  <a className="block border border-slate-200 px-3 py-2 font-medium text-blue-700 hover:bg-slate-50" href={daeLetterUrl} target="_blank" rel="noreferrer">
                    Open DAE Letter PDF
                  </a>
                </div>
              </div>
            </nav>
          </aside>

          <div className="min-w-0">
        <article id="saf-dossier" className="mb-12 scroll-mt-8 border border-slate-200 bg-white px-5 py-8 shadow-sm md:px-8 md:py-10">
          <DossierHeader
            eyebrow="Technical Dossier 01"
            title="Autonomous Discovery & Empirical Validation of C15 Sustainable Aviation Fuel (SAF)"
            summary="UNIPHY generated, routed, synthesized, and validated a heavily branched C15 alkene candidate for cold-flow performance and Jet-A1-grade energy density."
            status="Validation Complete"
          />

          <section className="mb-8">
            <h3 className="mb-3 text-xl font-semibold">1. In Silico Discovery & Molecular Rationale</h3>
            <p className="mb-2"><strong>Target Generated:</strong> <code>CCCC(CC)(CC)CCC(C)C</code></p>
            <p className="mb-2"><strong>Isomeric equivalent:</strong> Heavily Branched C15 Alkene</p>
            <p className="mb-4"><strong>System:</strong> The UNIPHY Foundation Model</p>
            <p className="mb-4 leading-7 text-neutral-800">
              The UNIPHY model autonomously converged on a heavily branched C15 alkene structure to solve the primary failure mode of synthesized jet fuels: cold-flow crystallization. Straight-chain alkanes stack cleanly, resulting in unacceptably high freezing points that cause fuel-line blockages at cruising altitudes above 30,000 ft.
            </p>
            <p className="mb-4 leading-7 text-neutral-800">
              By introducing quaternary and tertiary carbon centers, UNIPHY intentionally maximized steric hindrance to disrupt crystal lattice packing, artificially depressing the freezing point while maintaining the dense C-H bond network required for high specific energy above 43.0 MJ/kg.
            </p>
            <p><strong>In Silico Steric Strain Energy:</strong> 0.0 kcal/mol</p>
            <p><strong>Model Confidence (Reward Score):</strong> 0.969</p>
          </section>

          <section className="mb-8">
            <h3 className="mb-3 text-xl font-semibold">2. Autonomous Retrosynthesis (SOP-002 Generation)</h3>
            <p className="mb-4 leading-7 text-neutral-800">
              After discovering the molecule, the UNIPHY model evaluated millions of potential synthesis routes. It rejected chemically improbable or endergonic pathways and optimized for commercially available, low-cost precursors.
            </p>
            <p className="mb-4 leading-7 text-neutral-800">
              The model autonomously compiled the wet-lab protocol, outputting{" "}
              <a className="font-medium text-blue-700 underline underline-offset-4" href={sop002PdfUrl} target="_blank" rel="noreferrer">
                SOP-002: Synthesis of Highly-Branched SAF
              </a>.
            </p>
            <ol className="list-decimal space-y-2 pl-6 text-neutral-800">
              <li><strong>Grignard Alkylation:</strong> Heptan-3-one + ethylmagnesium bromide + acetone to generate the tertiary alcohol intermediate.</li>
              <li><strong>Acid-Catalyzed Dehydration:</strong> Elimination of H2O via sulfuric acid to force the C=C double bond.</li>
              <li><strong>Catalytic Hydrogenation:</strong> Stabilization of the final branched structure via H2 donor.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h3 className="mb-3 text-xl font-semibold">3. Empirical Wet-Lab Validation</h3>
            <p className="mb-4 leading-7 text-neutral-800">
              SOP-002 was handed directly to independent laboratory technicians for physical execution. The synthesized compound underwent downstream chemical analysis. The delta between UNIPHY prediction and wet-lab reality confirms a sub-1% margin of error across critical phase-change and thermodynamic boundaries.
            </p>
            <ValidationTable rows={safRows} caption="Table 1. Model prediction versus wet-lab measurement for the C15 SAF candidate." />
          </section>

          <section>
            <h3 className="mb-3 text-xl font-semibold">4. Commercial Scale-Up & Paid Pilot Program</h3>
            <p className="mb-4 leading-7 text-neutral-800">
              The synthesized C15 branched alkene exceeds standard commercial Jet-A1 specifications: freezing point at or below -47 deg C and energy density at or above 42.8 MJ/kg.
            </p>
            <p className="leading-7 text-neutral-800">
              With the molecular structure and bench recipe empirically proven, Shodh AI is advancing to commercial scale-up and is in active discussions for a paid pilot with Tier-1 energy providers, including Indian Oil Corporation and BP. UNIPHY is processing the validated molecular topology to design cooling jackets and impeller geometries for scaling exothermic Grignard reactions from a 50 mL beaker into a continuous 10,000-liter pilot reactor.
            </p>
          </section>
        </article>

        <div className="my-10 border border-slate-300 bg-slate-100 px-6 py-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">End of Technical Dossier 01</p>
          <p className="mt-2 text-sm font-medium text-slate-700">Next document begins below: High-Stability Solid-State Battery Electrolyte.</p>
        </div>

        <article id="battery-dossier" className="scroll-mt-8 border border-slate-200 bg-white px-5 py-8 shadow-sm md:px-8 md:py-10">
          <DossierHeader
            eyebrow="Technical Dossier 02"
            title="Autonomous Discovery & Empirical Validation of High-Stability Solid-State Battery Electrolyte"
            summary="UNIPHY engineered, synthesized, and validated a sulfonate ester electrolyte candidate designed for high-voltage stability, SEI formation, and dendrite suppression."
            status="Validation Complete"
          />

          <section className="mb-8">
            <h3 className="mb-3 text-xl font-semibold">1. In Silico Discovery & Molecular Rationale</h3>
            <p className="mb-2"><strong>Target Generated:</strong> <code>CS(=O)(=O)OCS(=O)(=O)OCS(=O)(=O)O</code></p>
            <p className="mb-2"><strong>Class:</strong> Sulfonate Ester Polymer Chain</p>
            <p className="mb-4"><strong>System:</strong> The UNIPHY Foundation Model</p>
            <p className="mb-4 leading-7 text-neutral-800">
              The UNIPHY model autonomously engineered a sulfonate ester chain to solve the critical bottleneck in next-generation lithium-metal solid-state batteries: dendrite formation and thermal runaway. Standard liquid electrolytes decompose at high voltages, causing battery fires.
            </p>
            <p className="mb-4 leading-7 text-neutral-800">
              The highly electronegative sulfur-oxygen (S=O) backbone provides exceptional oxidative stability above 4.5 V. The repeating sulfonate structure also acts as a sacrificial layer, selectively decomposing during the first charge cycle to form an impenetrable, lithium-conducting Solid Electrolyte Interphase on the bare metal anode.
            </p>
            <p><strong>In Silico Steric Strain Energy:</strong> 0.0 kcal/mol</p>
            <p><strong>Model Confidence (Reward Score):</strong> 0.944</p>
          </section>

          <section className="mb-8">
            <h3 className="mb-3 text-xl font-semibold">2. Autonomous Retrosynthesis (SOP-001 Generation)</h3>
            <p className="mb-4 leading-7 text-neutral-800">
              UNIPHY constrained its retrosynthetic search tree to abundant, low-cost commodity precursors, bypassing complex low-yield pathways in favor of high-efficiency condensation reactions.
            </p>
            <p className="mb-4 leading-7 text-neutral-800">
              The model autonomously compiled the wet-lab protocol, outputting{" "}
              <a className="font-medium text-blue-700 underline underline-offset-4" href={sop001PdfUrl} target="_blank" rel="noreferrer">
                SOP-001: Synthesis of High-Stability Solid-State Battery Electrolyte
              </a>.
            </p>
            <ol className="list-decimal space-y-2 pl-6 text-neutral-800">
              <li><strong>Initial Sulfonyl Condensation:</strong> Methanesulfonyl chloride + methanol (CO proxy) to generate the base monomer.</li>
              <li><strong>First Chain Extension:</strong> Introduction of secondary methanesulfonyl chloride to extend the sulfonate backbone.</li>
              <li><strong>Final Chain Extension:</strong> Acid-driven condensation via sulfuric acid (H2SO4) to terminate the chain and stabilize the electrolyte matrix.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h3 className="mb-3 text-xl font-semibold">3. Empirical Wet-Lab Validation</h3>
            <p className="mb-4 leading-7 text-neutral-800">
              SOP-001 was handed directly to independent laboratory technicians for physical synthesis. The resulting polymer underwent electrochemical and thermal analysis. The delta between UNIPHY prediction and wet-lab reality confirms sub-1% precision across critical stability and conductivity thresholds.
            </p>
            <ValidationTable rows={batteryRows} caption="Table 2. Model prediction versus wet-lab measurement for the solid-state battery electrolyte candidate." />
          </section>

          <section>
            <h3 className="mb-3 text-xl font-semibold">4. Commercial Scale-Up & Paid Pilot Program</h3>
            <p className="mb-4 leading-7 text-neutral-800">
              The empirical validation confirms that UNIPHY can engineer and synthesize solid-state materials supporting safe operation up to 4.8 V with strong room-temperature ionic conductivity.
            </p>
            <p className="leading-7 text-neutral-800">
              With the molecular structure and robotic bench recipe empirically proven, Shodh AI is structuring paid pilot programs with leading gigafactory operators, including A123 Systems and Tier-1 EV manufacturers. UNIPHY is solving non-Newtonian fluid rheology to optimize continuous-stirred tank reactors for 10,000-liter factory-scale chain-extension steps.
            </p>
          </section>
        </article>

        <div className="my-10 border border-slate-300 bg-slate-100 px-6 py-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">End of Technical Dossier 02</p>
          <p className="mt-2 text-sm font-medium text-slate-700">Next document begins below: Stage-3 Nuclear Reactor Infrastructure.</p>
        </div>

        <article id="nuclear-dossier" className="scroll-mt-8 border border-slate-200 bg-white px-5 py-8 shadow-sm md:px-8 md:py-10">
          <DossierHeader
            eyebrow="Technical Dossier 03"
            title="Inverse Design & Autonomous Optimization of Stage-3 Nuclear Reactor Infrastructure"
            summary="UNIPHY's macro-fluid and thermal experts are positioned for inverse design of liquid sodium and molten salt reactor infrastructure for India's 3-stage nuclear program."
            status="Sovereign Validation"
          />

          <section className="mb-8">
            <h3 className="mb-3 text-xl font-semibold">1. The Sovereign Mandate</h3>
            <div className="mb-5 grid gap-3 border border-slate-300 bg-slate-50 p-4 text-sm md:grid-cols-2">
              <p><strong>Target Deployment:</strong> Stage-2 / Stage-3 Liquid Sodium & Molten Salt Reactors</p>
              <p><strong>System:</strong> UNIPHY Foundation Model (Macro-Fluid & Thermal Experts)</p>
              <p className="md:col-span-2">
                <strong>Strategic Partner:</strong>{" "}
                <a className="font-medium text-blue-700 underline underline-offset-4" href={daeLetterUrl} target="_blank" rel="noreferrer">
                  Department of Atomic Energy (DAE), Government of India (PSA Endorsed)
                </a>
              </p>
            </div>
            <p className="mb-4 leading-7 text-neutral-800">
              Advancing India's 3-stage nuclear program, specifically leapfrogging to thorium utilization, requires mastery of liquid sodium and molten salt coolants. Traditional simulator tools such as CFD and FEA require months of manual mesh generation and trial-and-error to design reactor components capable of withstanding highly corrosive, extreme-temperature fluids above 700 deg C.
            </p>
            <p className="leading-7 text-neutral-800">
              UNIPHY replaces traditional forward simulation with inverse design. By setting physical operational constraints such as target thermal dissipation, maximum shear stress, and zero cavitation, the model autonomously generates the exact 3D manufacturing blueprint of the reactor component required to meet those parameters.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="mb-3 text-xl font-semibold">2. Mathematical Guarantees: The CBF-QP Shield</h3>
            <p className="mb-4 leading-7 text-neutral-800">
              Nuclear infrastructure cannot tolerate probabilistic hallucinations. The UNIPHY model is secured by a proprietary Control Barrier Function Quadratic Program (CBF-QP).
            </p>
            <div className="border-l-4 border-emerald-600 bg-emerald-50 px-5 py-4">
              <p className="leading-7 text-emerald-950">
                When the model's 10-billion-parameter physics engine generates a 3D reactor component, the latent architecture mathematically forces the generated geometry to project onto a forward-invariant safe set.
              </p>
            </div>
            <p className="mt-4 leading-7 text-neutral-800">
              Result: generated 3D blueprints are mathematically certified to prevent thermal runaway, structural fracture, and coolant mass leakage prior to physical manufacturing.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-xl font-semibold">3. The Pilot Deployment</h3>
            <p className="mb-4 leading-7 text-neutral-800">
              Shodh AI has received formal validation from the Principal Scientific Adviser to the Government of India, recommending its Large Physics Model (LPM) for deep deployment within the Department of Atomic Energy.
            </p>
            <p className="mb-4 leading-7 text-neutral-800">
              Next steps include integrating AI-generated CAD/CAM blueprints with the DAE's advanced manufacturing pipelines, compressing the timeline for thorium reactor deployment and securing long-term energy independence for the nation.
            </p>
            <a className="inline-flex border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100" href={daeLetterUrl} target="_blank" rel="noreferrer">
              Open PSA-endorsed DAE letter PDF
            </a>
          </section>
        </article>

          </div>
        </div>

        <footer className="mt-10 border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500 shadow-sm">
          <Link href="/" className="font-medium text-blue-700 underline underline-offset-4">Back to Shodh AI</Link>
        </footer>
      </div>
    </main>
  );
}
