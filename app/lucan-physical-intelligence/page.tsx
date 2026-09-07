import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Download } from "lucide-react";
import styles from "./lucan.module.css";

const syne = localFont({
  src: "../../public/shodh-new/Syne/Syne-VariableFont_wght.ttf",
  display: "swap",
  weight: "100 900",
});

const whitepaperHref = "/research/LUCAN_Physical_Intelligence_Whitepaper_v3.pdf";

const lucanStructuredData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "LUCAN: A Foundation World Model for Physical Intelligence",
  alternativeHeadline: "From predicting physical systems to designing interventions",
  description:
    "Introducing LUCAN, Shodh AI's foundation world model for cross-scale physical intelligence and inverse design from molecules to manufacturing.",
  url: "https://shodh.ai/lucan-physical-intelligence",
  mainEntityOfPage: "https://shodh.ai/lucan-physical-intelligence",
  datePublished: "2026-09-07",
  dateModified: "2026-09-07",
  author: { "@type": "Organization", name: "Shodh AI", url: "https://shodh.ai" },
  publisher: {
    "@type": "Organization",
    name: "Shodh AI",
    url: "https://shodh.ai",
    logo: { "@type": "ImageObject", url: "https://shodh.ai/Logo_White%20BG.png" },
  },
  sponsor: {
    "@type": "GovernmentOrganization",
    name: "IndiaAI Mission",
    url: "https://indiaai.gov.in/",
  },
  image: "https://shodh.ai/lucan/lucan_reasons_across_scales.jpg",
  citation: `https://shodh.ai${whitepaperHref}`,
  keywords: [
    "LUCAN",
    "physical intelligence",
    "foundation world model",
    "cross-scale inverse design",
    "industrial AI",
    "scientific machine learning",
  ],
};

const evidenceTests = [
  {
    number: "01",
    eyebrow: "Shared computation",
    title: "Does one model share computation across physical domains?",
    result: "52%",
    unit: "mean pathway overlap",
    detail:
      "A frozen-checkpoint routing audit reports substantial shared computation between molecular and reactor representations, alongside domain-responsive expert routing.",
  },
  {
    number: "02",
    eyebrow: "Micro to macro",
    title: "Can a molecular change propagate to reactor scale?",
    result: "8 / 8",
    unit: "directional tests",
    detail:
      "Controlled reaction-enthalpy changes produced the expected reactor-temperature direction on held-out 250-liter geometries, with a reported spatial temperature nRMSE of 0.00300.",
  },
  {
    number: "03",
    eyebrow: "Macro to micro",
    title: "Can reactor conditions propagate back to microscopic mechanics?",
    result: "340 Pa",
    unit: "maximum membrane stress",
    detail:
      "A 5,000-liter reactor flow field was coupled to a 15-micrometer membrane model. The reported stress exceeded the declared 250 Pa rupture threshold; a stricter virtual-work diagnostic remained unresolved.",
  },
  {
    number: "04",
    eyebrow: "Competing mechanisms",
    title: "Can LUCAN find the boundary where one benefit plateaus?",
    result: "+18.3%",
    unit: "near-blade p95 shear",
    detail:
      "Between 200 and 250 RPM, reported mean oxygen changed by only +0.08% while mechanical shear continued to rise, exposing a practical operating boundary.",
  },
  {
    number: "05",
    eyebrow: "Full-chain composition",
    title: "Can the molecule-to-reactor-to-cell pathway stay connected?",
    result: "91.3%",
    unit: "reported full-chain pass rate",
    detail:
      "Whitepaper v3 reports an integration test linking molecular representations, thermochemistry, reactor response, fluid-mechanical exposure, and cell mechanics. It does not specify the underlying case count for this percentage.",
  },
];

const inverseMetrics = [
  { value: "88%", label: "of proposed neural directions improved the frozen objective in a separate classical verifier" },
  { value: "55 / 60", label: "feasible targets reached solver-verified solutions" },
  { value: "38 / 40", label: "intentionally infeasible targets were rejected" },
  { value: "124", label: "median classical solver calls bypassed per target" },
];

export default function LucanPage() {
  return (
    <main className={`${syne.className} ${styles.page}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lucanStructuredData) }}
      />

      <header className={styles.nav}>
        <Link href="/" aria-label="Shodh AI home">
          <Image src="/shodhai_logo.svg" alt="Shodh AI" width={150} height={36} priority />
        </Link>
        <div className={styles.navLinks}>
          <Link href="/research"><ArrowLeft aria-hidden="true" /> Research</Link>
          <Link className={styles.paperLink} href={whitepaperHref} target="_blank">
            Whitepaper <Download aria-hidden="true" />
          </Link>
        </div>
      </header>

      <article>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.heroMeta}>
              <span>Research · Physical intelligence</span>
              <span>7 September 2026</span>
              <span>By Shodh AI</span>
            </div>
            <h1><span>Introducing LUCAN</span>A foundation world model for physical intelligence.</h1>
            <p>
              Designing physical systems from molecules to manufacturing through
              cross-scale inverse design.
            </p>
            <div className={styles.heroActions}>
              <Link href={whitepaperHref} target="_blank">
                Read the whitepaper <ArrowUpRight aria-hidden="true" />
              </Link>
              <a href="#idea">Explore the idea <ArrowRight aria-hidden="true" /></a>
            </div>
          </div>

          <figure className={styles.heroFigure}>
            <Image
              src="/lucan/lucan_reasons_across_scales.jpg"
              alt="LUCAN connects equipment scale, process physics, and molecular scale"
              width={1536}
              height={864}
              priority
            />
            <figcaption>
              Conceptual illustration from the whitepaper: equipment, process physics, and molecular
              behavior form one connected physical system.
            </figcaption>
          </figure>
        </section>

        <section id="idea" className={styles.opening}>
          <div className={styles.openingLead}>
            <p className={styles.kicker}>The industrial problem</p>
            <h2>Manufacturing is not one physics problem.</h2>
          </div>
          <div className={styles.openingBody}>
            <p>
              A molecular decision changes reaction energetics. Those energetics change heat release.
              Heat release changes reactor transport. Reactor transport changes the forces experienced
              by a material or a living cell. The final product emerges from the whole chain.
            </p>
            <p>
              Yet most engineering software splits that chain into separate tools and manual hand-offs.
              Each simulator can answer what happens inside its own domain. The harder question is how to
              move backward from a desired factory outcome to the molecular and process variables that
              should change.
            </p>
            <blockquote>Given the outcome we want, what should we change?</blockquote>
          </div>
        </section>

        <section className={styles.paradigm} aria-label="Prediction and inverse-design workflows">
          <div className={styles.paradigmIntro}>
            <p className={styles.kicker}>A different engineering loop</p>
            <h2>From prediction to intervention.</h2>
            <p>
              LUCAN is designed to preserve a differentiable path across physical scales, so the
              computational system can propose a direction through the design space before independent
              physics verification.
            </p>
          </div>
          <div className={styles.workflowGrid}>
            <div className={styles.workflowMuted}>
              <span>Traditional simulation</span>
              <div><b>Conditions</b><i>→</i><b>Simulation</b><i>→</i><b>Outcome</b></div>
              <p>“What happens if we do this?”</p>
            </div>
            <div className={styles.workflowActive}>
              <span>LUCAN inverse design</span>
              <div><b>Desired outcome</b><i>→</i><b>LUCAN</b><i>→</i><b>Intervention</b></div>
              <p>“What should we change to make this happen?”</p>
            </div>
          </div>
        </section>

        <section className={styles.architecture}>
          <header>
            <div>
              <p className={styles.kicker}>One model, typed physics</p>
              <h2>A shared computational system without flattening the science.</h2>
            </div>
            <p>
              LUCAN maps domain-specific representations into a shared Sparse Mixture-of-Experts
              architecture. Molecular graphs, three-dimensional fields, and deforming geometries retain
              their scientific structure while participating in one cross-scale design space.
            </p>
          </header>

          <div className={styles.architectureMap}>
            <div className={styles.domainCard}>
              <span>01</span><strong>Molecular graphs</strong><small>Energetics · kinetics · chemistry</small>
            </div>
            <div className={styles.domainCard}>
              <span>02</span><strong>3D physical fields</strong><small>Flow · heat · transport</small>
            </div>
            <div className={styles.domainCard}>
              <span>03</span><strong>Deforming geometries</strong><small>Cells · interfaces · mechanics</small>
            </div>
            <div className={styles.sharedCore}>
              <span>Shared latent interface</span>
              <strong>Sparse MoE</strong>
              <div aria-hidden="true">
                <i /><i /><i /><i /><i /><i /><i /><i /><i />
              </div>
              <small>Domain-responsive routing across scales</small>
            </div>
            <div className={styles.designOutput}>
              <span>Cross-scale inverse design</span>
              <strong>Outcome → intervention</strong>
              <small>Propose first. Verify in independent physics.</small>
            </div>
          </div>
        </section>

        <section className={styles.evidence}>
          <header>
            <p className={styles.kicker}>Five controlled questions</p>
            <h2>Testing physical intelligence across scales.</h2>
            <p>
              The whitepaper moves from shared computation, to controlled cross-scale interventions, to
              nonlinear coupled regimes, and finally to a declared full-chain composition test.
            </p>
          </header>

          <div className={styles.testList}>
            {evidenceTests.map((test) => (
              <article key={test.number}>
                <span className={styles.testNumber}>{test.number}</span>
                <div className={styles.testQuestion}>
                  <p>{test.eyebrow}</p>
                  <h3>{test.title}</h3>
                </div>
                <div className={styles.testResult}>
                  <strong>{test.result}</strong>
                  <span>{test.unit}</span>
                </div>
                <p className={styles.testDetail}>{test.detail}</p>
              </article>
            ))}
          </div>
          <p className={styles.evidenceSource}>
            Source: <a href={`${whitepaperHref}#page=5`} target="_blank" rel="noopener noreferrer">LUCAN whitepaper v3, Section 3, pages 5–9</a>.
            These are the results reported for the evaluated checkpoint and test conditions.
          </p>
        </section>

        <section className={styles.figureStories}>
          <article className={styles.figureStory}>
            <div>
              <p className={styles.kicker}>Macro to micro</p>
              <h2>From reactor flow to cell mechanics.</h2>
              <p>
                The reported coupling transfers a turbulent reactor field to a cell-scale membrane model.
                Maximum equivalent stress reached 340 Pa and maximum area strain reached 4.8%, above the
                declared rupture thresholds of 250 Pa and 3.5%.
              </p>
              <p className={styles.figureCaveat}>
                The whitepaper labels the graphic an illustrative reconstruction. Direct volumetric solver
                fields were not supplied for rendering, and the stricter virtual-work consistency gate
                remained unresolved.
              </p>
            </div>
            <figure>
              <a href="/lucan/figure3_biofsi_current_metrics.png" target="_blank" rel="noopener noreferrer" aria-label="Open Figure 3 at full resolution">
              <Image
                src="/lucan/figure3_biofsi_current_metrics.png"
                alt="Illustrative reconstruction of bioreactor flow trajectories and cell membrane stress; not a rendering of raw solver fields"
                width={4388}
                height={1966}
              />
              </a>
              <figcaption>Whitepaper Figure 3, page 8 · Illustrative reconstruction of the reactor-to-cell coupling. Open the figure to view at full resolution.</figcaption>
            </figure>
          </article>

          <article className={`${styles.figureStory} ${styles.figureStoryReverse}`}>
            <div>
              <p className={styles.kicker}>Competing mechanisms</p>
              <h2>Balancing oxygen transfer and mechanical shear.</h2>
              <p>
                In the reported 10-liter bioreactor sweep, oxygen transfer had effectively plateaued from
                200 to 250 RPM while near-blade hydrodynamic shear increased by 18.3%. A model that sees
                both responses can identify when more agitation stops helping and starts adding risk.
              </p>
            </div>
            <figure>
              <a href="/lucan/figure4_oxygen_saturation_vs_shear_updated.png" target="_blank" rel="noopener noreferrer" aria-label="Open Figure 4 at full resolution">
              <Image
                src="/lucan/figure4_oxygen_saturation_vs_shear_updated.png"
                alt="Oxygen saturation plateau and increasing hydrodynamic shear versus impeller agitation"
                width={2047}
                height={1485}
              />
              </a>
              <figcaption>Whitepaper Figure 4, page 8 · Oxygen benefit plateaus while mechanical burden continues to rise. Figure reproduced as supplied; the reported oxygen change is +0.08%.</figcaption>
            </figure>
          </article>
        </section>

        <section className={styles.inverseDesign}>
          <div className={styles.inverseLead}>
            <p className={styles.kicker}>The breakthrough</p>
            <h2>Cross-scale inverse design.</h2>
            <p>
              The useful result is not merely a faster neural forward pass. It is a gradient that points
              toward an intervention which still improves the objective when evaluated by a separate,
              high-fidelity classical workflow.
            </p>
          </div>

          <div className={styles.gradientLine} aria-label="Cross-scale gradients">
            <span>∇<sub>x molecular</sub> J<sub>factory</sub></span>
            <span>∇<sub>x process</sub> J<sub>factory</sub></span>
            <span>∇<sub>x control</sub> J<sub>factory</sub></span>
          </div>

          <div className={styles.inverseMetrics}>
            {inverseMetrics.map((metric) => (
              <div key={metric.value}>
                <strong>{metric.value}</strong>
                <p>{metric.label}</p>
              </div>
            ))}
          </div>

          <div className={styles.timeShift}>
            <span>Median verified optimization time</span>
            <div><s>&gt;500 hours</s><ArrowRight aria-hidden="true" /><strong>5.6 hours</strong></div>
            <p>Reported end-to-end time includes final high-fidelity classical verification.</p>
          </div>
        </section>

        <section className={styles.execution}>
          <header>
            <p className={styles.kicker}>From computation to execution</p>
            <h2>Does the intervention survive contact with the physical process?</h2>
            <p>
              The whitepaper separately labels prospective industrial executions, where model-generated
              operating regimes were frozen before partner-run physical evaluation.
            </p>
          </header>

          <div className={styles.executionGrid}>
            <article className={styles.chemistryCase}>
              <span>Physical execution 01</span>
              <h3>Specialty chemical batch-to-continuous scale-up</h3>
              <p>
                A reported LUCAN-generated continuous-flow window targeted higher isolated yield while
                bounding a temperature-sensitive impurity pathway.
              </p>
              <div className={styles.caseMetrics}>
                <div><small>Isolated yield</small><strong>82.4 <i>→</i> 96.7%</strong></div>
                <div><small>Impurity profile</small><strong>12.3 <i>→</i> 3.1%</strong></div>
              </div>
              <p className={styles.verified}><Check aria-hidden="true" /> Reported prospective pilot execution</p>
            </article>

            <article className={styles.bioCase}>
              <span>Physical execution 02</span>
              <h3>5L-to-500L biomanufacturing scale-up</h3>
              <p>
                The reported trajectory jointly addressed oxygen transfer, cell viability, shear, and
                downstream filtration quality across a 100× scale increase.
              </p>
              <dl>
                <div><dt>Harvest titer</dt><dd>6.63 g/L</dd></div>
                <div><dt>Cell viability</dt><dd>78.2%</dd></div>
                <div><dt>Product recovery</dt><dd>94.5%</dd></div>
                <div><dt>HMW aggregates</dt><dd>1.2%</dd></div>
              </dl>
              <p className={styles.verified}><Check aria-hidden="true" /> Reported 500L physical pilot run</p>
            </article>
          </div>
        </section>

        <section className={styles.evidenceNote}>
          <div>
            <p className={styles.kicker}>How to read the evidence</p>
            <h2>From model predictions to physical validation.</h2>
          </div>
          <div className={styles.evidenceLadder}>
            <div><span>01</span><strong>Model test</strong><p>Frozen model on predefined held-out computational tasks.</p></div>
            <div><span>02</span><strong>Physics verified</strong><p>Model-generated interventions checked by separate classical numerical solvers.</p></div>
            <div><span>03</span><strong>Physically executed</strong><p>Frozen interventions carried into a laboratory, pilot, or industrial environment.</p></div>
          </div>
          <p className={styles.disclosure}>
            All results on this page are summarized from the Shodh AI technical whitepaper v3:
            cross-scale tests in Section 3, inverse-design results in Section 4, and industrial cases
            in Section 5. Process
            identities and some source records remain confidential under commercial agreements. The
            accelerated three-day formulation-screening result described in the paper is not presented as
            physical validation because its corresponding twelve-week stability outcome remains pending.
          </p>
          <p className={styles.disclosure}>
            LUCAN is a capability release. Model weights, training-corpus composition, and internal
            implementation details are not released with this whitepaper. Shodh AI acknowledges the
            IndiaAI Mission for GPU compute support.
          </p>
        </section>

        <section className={styles.paperCta}>
          <div>
            <p className={styles.kicker}>Read the technical whitepaper</p>
            <h2>LUCAN: A Foundation World Model for Physical Intelligence</h2>
            <p>Architecture, falsification controls, five cross-scale tests, inverse design, and physical execution.</p>
          </div>
          <Link href={whitepaperHref} target="_blank">
            Download PDF <Download aria-hidden="true" />
          </Link>
        </section>
      </article>

      <footer className={styles.footer}>
        <Image src="/shodhai_logo.svg" alt="Shodh AI" width={136} height={32} />
        <span>Physical intelligence · 2026</span>
        <Link href="/research">All research <ArrowUpRight aria-hidden="true" /></Link>
      </footer>
    </main>
  );
}
