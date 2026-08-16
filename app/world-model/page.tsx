import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import styles from "./world-model.module.css";

const syne = localFont({
  src: "../../public/shodh-new/Syne/Syne-VariableFont_wght.ttf",
  display: "swap",
  weight: "100 900",
});

const technicalReportHref = "/research/Foundation_World_Model_for_Physical_Intelligence.pdf";

const worldModelStructuredData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "From Simulating Physics to Designing the Physical Stack",
  alternativeHeadline: "Introducing Physical Design Foundation Models",
  description:
    "Shodh AI introduces a foundation World Model that connects quantum thermodynamics, fluid dynamics, biological mechanics and industrial inverse design.",
  url: "https://shodh.ai/world-model",
  mainEntityOfPage: "https://shodh.ai/world-model",
  datePublished: "2026-08-15",
  dateModified: "2026-08-17",
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
  citation: "https://shodh.ai/research/Foundation_World_Model_for_Physical_Intelligence.pdf",
  keywords: [
    "Shodh AI",
    "physical intelligence",
    "Physical Design Foundation Models",
    "foundation world model",
    "cross-scale inverse design",
    "industrial scale-up",
  ],
};

const tests = [
  {
    number: "01",
    question: 'Does the same neural "brain" share computation across scales?',
    label: "Shared computation",
    value: "65%",
    detail:
      "Yes. While the model routes data dynamically based on the physics involved, we found that macroscopic factory dynamics and microscopic molecular states share 65% of their computational pathways. This suggests the model is developing a shared computational substrate across physical domains rather than routing each domain through entirely isolated pathways.",
  },
  {
    number: "02",
    question: "Change the chemistry. Does the factory respond correctly?",
    label: "Micro → Macro",
    value: "0.0072",
    unit: "full-field spatial nRMSE",
    detail:
      "We altered a microscopic reaction-enthalpy input and tracked the response in a blinded, 250-Liter continuous reactor. The model correctly reproduced the monotonic rise in peak reactor temperature, maintaining a full-field spatial nRMSE of 0.0072 against the numerical reference.",
  },
  {
    number: "03",
    question: "Change the factory. Does biology respond correctly?",
    label: "Macro → Micro",
    value: "312 Pa",
    unit: "predicted membrane stress",
    detail:
      "We generated a massive, 5,000-Liter turbulent fluid flow field at high agitation. We then mapped that macroscopic fluid shear onto a 15-micrometer biological cell membrane. The model correctly computed the mechanical force transfer, predicting an equivalent membrane stress of 312 Pa—crossing the predefined stress and area-strain rupture thresholds and producing a positive biological rupture classification.",
  },
  {
    number: "04",
    question: "Can the model represent competing physical mechanisms?",
    label: "Coupled regimes",
    value: "+17.9%",
    unit: "near-blade shear",
    detail:
      "Increasing reactor agitation can improve oxygen transfer while simultaneously increasing damaging mechanical shear. Under a high-gas, high-kL a operating regime, the model reproduced the nonlinear trade-off: oxygen concentration had effectively plateaued between 200 and 250 RPM, while predicted near-blade shear continued to rise by 17.9%. The oxygen field passed strict quantitative validation; the shear response was directionally correct but did not pass our full spatial-correlation threshold.",
  },
];

export default function WorldModelPage() {
  return (
    <main className={`${syne.className} ${styles.page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(worldModelStructuredData) }} />
      <header className={styles.nav}>
        <Link href="/" aria-label="Shodh AI home">
          <Image src="/shodhai_logo.svg" alt="Shodh AI" width={150} height={36} priority />
        </Link>
        <div className={styles.navLinks}>
          <Link href="/research"><ArrowLeft aria-hidden="true" /> Research</Link>
          <Link className={styles.reportLink} href={technicalReportHref} target="_blank">Technical report <ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </header>

      <article>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}><span /> Flagship model launch · August 2026</p>
            <h1>From Simulating Physics to <em>Designing the Physical Stack</em></h1>
            <p className={styles.subtitle}>Introducing Physical Design Foundation Models</p>
            <div className={styles.heroActions}>
              <Link href={technicalReportHref} target="_blank">Read the technical report <ArrowRight aria-hidden="true" /></Link>
              <a href="#introduction">Explore the model <ArrowDown aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section id="introduction" className={styles.introduction}>
          <div className={styles.introLead}>
            <p>Taking a breakthrough drug or an advanced battery material from a 5-milliliter lab beaker and scaling it up to a 10,000-Liter turbulent factory vessel is one of the hardest, most economically consequential problems in engineering.</p>
          </div>
          <div className={styles.prose}>
            <p>Physical behavior changes dramatically with scale. A reaction that works perfectly in a test tube can easily fail, overheat, or destroy biological cells when subjected to the chaotic fluid shear of a massive industrial reactor.</p>
            <p>Historically, the computational path between these scales has remained fragmented. Quantum chemists use one simulator; process engineers use another. Because these systems are siloed, continuous mathematical relationships break at the boundaries.</p>
            <p>We believe a new category of foundation model is emerging to solve this: <strong>Physical Design Foundation Models</strong>.</p>
          </div>
        </section>

        <section className={styles.indiaAiSupport} aria-label="IndiaAI acknowledgement">
          <div className={styles.indiaAiLogo}>
            <Image src="/india-ai-logo.png" alt="IndiaAI Mission" width={1800} height={932} loading="eager" />
          </div>
          <div>
            <p className={styles.kicker}>Supported by IndiaAI</p>
            <h2>Compute that made frontier physical AI possible.</h2>
            <p>Shodh AI gratefully acknowledges the IndiaAI Mission for its GPU compute support and unwavering commitment to advancing frontier physical AI research in India.</p>
          </div>
        </section>

        <section className={styles.generations}>
          <header>
            <p className={styles.kicker}>A new model category</p>
            <h2>Three generations of foundation models</h2>
          </header>
          <div className={styles.generationGrid}>
            <article><span>Gen 1</span><strong>Digital Intelligence</strong><p>Generating information: language, code and pixels.</p><i>Generate</i></article>
            <article><span>Gen 2</span><strong>AI-Native Domain Physics</strong><p>Simulating and optimizing individual components.</p><i>Predict</i></article>
            <article><span>Gen 3</span><strong>AI-Native System Physics</strong><p>Designing coupled systems across domains and scales.</p><i>Design</i></article>
          </div>
          <div className={styles.generationStatement}>
            <p>Gen 2 makes individual physical domains AI-native.</p>
            <strong>Gen 3 makes the coupled physical system AI-native.</strong>
          </div>
        </section>

        <section className={styles.categorySection}>
          <div className={styles.sectionNumber}>01</div>
          <div className={styles.sectionBody}>
            <p className={styles.kicker}>The category</p>
            <h2>The factory becomes computable from the desired outcome backward.</h2>
            <div className={styles.proseWide}>
              <p>Physical Design Foundation Models are not distinguished simply by predicting physics faster, or even by performing inverse design within one domain. Their defining capability is to represent multiple interacting physical domains as one differentiable design space, so a final system objective can propagate backward across the entire stack.</p>
              <p>If the coupled physical stack becomes differentiable, industrial scale-up stops being primarily a search problem and becomes increasingly a design problem. <strong>The factory itself becomes computable from the desired outcome backward.</strong></p>
              <p>Today, we are releasing our <Link href={technicalReportHref} target="_blank">Technical Whitepaper</Link>, providing the first empirical evidence of this third generation. We have trained a foundation World Model for physical intelligence that unifies quantum thermodynamics, fluid dynamics, and biological mechanics into a single computational system.</p>
            </div>
          </div>
        </section>

        <section className={styles.proofSection}>
          <header>
            <div><p className={styles.kicker}>Four controlled tests</p><h2>Proving cross-scale physical intelligence</h2></div>
            <p>For a model to treat the entire physical stack as a single environment, controlled physical interventions must propagate correctly across scales.</p>
          </header>
          <div className={styles.testList}>
            {tests.map((test) => (
              <article key={test.number}>
                <div className={styles.testIndex}>{test.number}</div>
                <div className={styles.testQuestion}><span>{test.label}</span><h3>{test.question}</h3></div>
                <div className={styles.testResult}><strong>{test.value}</strong>{test.unit && <span>{test.unit}</span>}</div>
                <p>{test.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.roleSection}>
          <div className={styles.roleGraphic} aria-hidden="true">
            <div><span>Quantum</span><i /></div><b>+</b><div><span>Flow</span><i /></div><b>+</b><div><span>Mechanics</span><i /></div>
            <strong>Shared computational graph</strong>
          </div>
          <div>
            <p className={styles.kicker}>The role of the neural engine</p>
            <h2>One graph. Domain structure preserved.</h2>
            <p>The point of these tests is not that Shodh has replaced quantum chemistry, CFD, or structural mechanics with one monolithic neural simulator. It has not. The important result is that heterogeneous physical representations can participate in a shared computational graph while retaining the structure required by their respective domains. Classical high-fidelity solvers remain the final numerical verifier.</p>
          </div>
        </section>

        <section className={styles.inverseSection}>
          <div className={styles.sectionNumber}>02</div>
          <div className={styles.sectionBody}>
            <p className={styles.kicker}>The breakthrough</p>
            <h2>Cross-scale inverse design</h2>
            <div className={styles.proseWide}>
              <p>Inverse design is already possible within individual scientific domains. A differentiable aerodynamic model can optimize a geometry for drag; a molecular model can optimize a structure for a desired property.</p>
              <p><strong>The harder problem is optimizing the coupled physical system.</strong></p>
              <p>Industrial objectives rarely depend on one solver. Factory yield depends simultaneously on molecular energetics, reaction kinetics, reactor geometry, turbulent transport, heat removal, and microscopic mechanical stress.</p>
              <p>Because these traditionally separate physical domains are represented within one differentiable computational system at Shodh, the model can evaluate how a factory-scale objective (J<sub>factory</sub>) changes with respect to variables distributed across the entire physical stack.</p>
            </div>
            <div className={styles.equation}>
              <span>∂J<sub>factory</sub> / ∂x<sub>molecule</sub></span>
              <span>∂J<sub>factory</sub> / ∂x<sub>geometry</sub></span>
              <span>∂J<sub>factory</sub> / ∂x<sub>process</sub></span>
            </div>
            <blockquote>This turns the coupled system—not merely an individual solver—into an inverse-design problem.</blockquote>
            <div className={styles.metrics}>
              <div><strong>88%</strong><p>of proposed neural gradient directions produced an improving response.</p></div>
              <div><strong>91.7%</strong><p>solver-verified success across 60 feasible targets.</p></div>
              <div><strong>38 ms</strong><p>for a neural cross-scale proposal.</p></div>
              <div><strong>124×</strong><p>median classical solver calls bypassed.</p></div>
            </div>
            <p className={styles.metricFootnote}>Median solver-verified optimization time fell from more than 500 hours to approximately 5.6 hours.</p>
          </div>
        </section>

        <section className={styles.industrialSection}>
          <div className={styles.industryCopy}>
            <h2>From <em>in silico</em> to industrial execution</h2>
            <p>This is not a theoretical benchmark. We are already deploying this capability into real manufacturing environments.</p>
            <p>When tasked with optimizing a highly exothermic, temperature-sensitive specialty chemical process, the model executed a cross-scale inverse-design query to generate a novel continuous-flow operating window. The generated parameters were cryptographically frozen, and subsequently executed by our industrial partner in a physical pilot plant.</p>
            <p>The prospective physical execution matched the model&apos;s intent: successfully suppressing the impurity pathway from 12.3% to 3.1%, and achieving a <strong>96.7% isolated yield</strong> in the continuous-flow pilot, compared with the process&apos;s historical 82.4% batch baseline.</p>
          </div>
          <div className={styles.outcomeCard}>
            <span>Prospective physical execution</span>
            <div><small>Isolated yield</small><strong>82.4 <i>→</i> 96.7%</strong><em><b style={{ width: "96.7%" }} /></em></div>
            <div><small>Impurity pathway</small><strong>12.3 <i>→</i> 3.1%</strong><em className={styles.reverseBar}><b style={{ width: "25.2%" }} /></em></div>
            <p><Check aria-hidden="true" /> Executed in an industrial pilot plant</p>
          </div>
        </section>

        <section className={styles.definitionSection}>
          <p className={styles.kicker}>Defining the category</p>
          <h2>From domain physics to <em>system physics.</em></h2>
          <p>Shodh AI is defining Physical Design Foundation Models: models that make the coupled physical stack differentiable so engineers can optimize the system from the final outcome backward.</p>
          <p>By restoring the broken chain between molecular discovery and factory production, we are moving AI from domain physics to system physics, and turning scale-up from a problem of empirical search into a problem of computational design.</p>
          <Link href={technicalReportHref} target="_blank">Read the full technical whitepaper <ArrowRight aria-hidden="true" /></Link>
        </section>

        <nav className={styles.nextRead} aria-label="Continue reading">
          <div>
            <p className={styles.kicker}>The category, explained</p>
            <h2>The Three Generations of Foundation Models</h2>
            <p>From predicting the world to designing it.</p>
          </div>
          <Link href="/research/three-generations-of-foundation-models">Read the essay <ArrowRight aria-hidden="true" /></Link>
        </nav>
      </article>

      <footer className={styles.footer}>
        <Image src="/shodhai_logo.svg" alt="Shodh AI" width={136} height={32} />
        <span>Physical intelligence · 2026</span>
        <Link href="/research">All research <ArrowUpRight aria-hidden="true" /></Link>
      </footer>
    </main>
  );
}
