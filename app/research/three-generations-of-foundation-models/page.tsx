import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./article.module.css";

const syne = localFont({
  src: "../../../public/shodh-new/Syne/Syne-VariableFont_wght.ttf",
  display: "swap",
  weight: "100 900",
});

const technicalReportHref = "/research/Foundation_World_Model_for_Physical_Intelligence.pdf";

const articleStructuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Three Generations of Foundation Models: From Domain Physics to the Coupled Physical Stack",
  description:
    "How foundation models are evolving from digital generation to domain simulation and cross-scale physical design.",
  url: "https://shodh.ai/research/three-generations-of-foundation-models",
  mainEntityOfPage: "https://shodh.ai/research/three-generations-of-foundation-models",
  datePublished: "2026-08-17",
  dateModified: "2026-08-17",
  author: { "@type": "Organization", name: "Shodh AI", url: "https://shodh.ai" },
  publisher: {
    "@type": "Organization",
    name: "Shodh AI",
    url: "https://shodh.ai",
    logo: { "@type": "ImageObject", url: "https://shodh.ai/Logo_White%20BG.png" },
  },
  citation: "https://shodh.ai/research/Foundation_World_Model_for_Physical_Intelligence.pdf",
  about: ["foundation models", "physical intelligence", "inverse design", "industrial scale-up"],
};

function Equation({ children, label }: { children: React.ReactNode; label?: string }) {
  return <div className={styles.equation} aria-label={label}>{children}</div>;
}

function GenerationSection({
  generation,
  title,
  era,
  equation,
  caption,
  children,
  className = "",
}: {
  generation: string;
  title: string;
  era: string;
  equation: React.ReactNode;
  caption: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`${styles.generationChapter} ${className}`}>
      <header className={styles.chapterHeader}>
        <p className={styles.eyebrow}>{generation}</p>
        <h2>{title}</h2>
        <h3>{era}</h3>
      </header>
      <div className={styles.chapterContent}>
        <Equation>{equation}</Equation>
        <p className={styles.caption}><em>{caption}</em></p>
        <div className={styles.prose}>{children}</div>
      </div>
    </section>
  );
}

export default function ThreeGenerationsArticle() {
  return (
    <main className={`${syne.className} ${styles.page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }} />
      <header className={styles.siteHeader}>
        <Link href="/" aria-label="Shodh AI home"><Image src="/shodhai_logo.svg" alt="Shodh AI" width={150} height={36} priority /></Link>
        <Link href="/research" className={styles.backLink}><ArrowLeft aria-hidden="true" /> Research</Link>
      </header>

      <article>
        <header className={`${styles.hero} ${styles.newHero}`}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Essay 01 · Physical intelligence</p>
            <h1>The Three Generations of Foundation Models:<br /><span>From Domain Physics to the Coupled Physical Stack</span></h1>
            <p className={styles.standfirst}><strong>The digital economy has been rewired by AI. The physical economy requires a new computational generation.</strong></p>
            <div className={styles.meta}><span>Shodh AI</span><span>17 August 2026</span><span>9 min read</span></div>
          </div>
        </header>

        <section className={`${styles.opening} ${styles.newOpening}`}>
          <div className={styles.openingLead}>
            <p>Over the past three years, the technology industry has invested hundreds of billions of dollars into artificial intelligence. We have watched models learn to write code, generate photorealistic video, and pass the bar exam.</p>
          </div>
          <div className={styles.prose}>
            <p>But while the digital economy has been completely rewired by AI, the physical economy—the manufacturing of chemicals, advanced materials, batteries, and biologic drugs—has remained largely untouched.</p>
            <p>Why? Because the physical world is bound by the strict, unforgiving laws of thermodynamics, kinetics, and fluid mechanics. To bring AI into the physical economy, we cannot just scale up text predictors. We need a fundamental evolution in how models represent and compute physical reality.</p>
            <p>At Shodh AI, we believe foundation models are moving through three distinct generations. To understand where the industrial economy is going, we must look at the math.</p>
          </div>
        </section>

        <section className={`${styles.generationsOverview} ${styles.newOverview}`} aria-label="Three generations of foundation models">
          <div><span>01</span><h2>Digital information</h2><Equation>p(x)</Equation><p>Generate</p></div>
          <div><span>02</span><h2>Domain physics</h2><Equation>𝓕: x<sub>t</sub> → x<sub>t+1</sub></Equation><p>Simulate</p></div>
          <div><span>03</span><h2>Coupled stack</h2><Equation>x<sup>*</sup> = arg min J(𝓕(x))</Equation><p>Design</p></div>
        </section>

        <GenerationSection
          generation="Generation 1"
          title="Generative Foundation Models"
          era="The Era of Digital Information"
          equation={<>p(x)</>}
          caption="Learning the probability distribution of digital data."
        >
          <p>Generation 1 encompasses the models driving the current AI revolution (e.g., GPT-5.6, Gemini 3.5, and Veo 3.1). Mathematically, these models learn the underlying distributions of language, audio, or pixels to generate novel outputs.</p>
          <p>These models are incredibly powerful for digital workflows, but they are unconstrained by physical reality. A video generator can create a flawless clip of a glass shattering, but it does not compute the tensile strength of the glass or the force of gravity. It is approximating visuals, not computing physics.</p>
        </GenerationSection>

        <GenerationSection
          generation="Generation 2"
          title="Physics Foundation Models"
          era="The Era of AI-Native Domain Simulation"
          equation={<>𝓕: x<sub>t</sub> → x<sub>t+1</sub></>}
          caption="Accelerating simulation and enabling domain-level inverse design."
          className={styles.generationTwo}
        >
          <p>Generation 2 brings AI into the physical realm. This generation includes Fourier Neural Operators (FNOs), learned PDE solvers, and Large Physics Models (LPMs).</p>
          <p>Gen 2 is already transforming engineering. By replacing expensive, days-long classical simulations with near-instant neural inference, these models allow engineers to explore massive design spaces. Because these surrogates are differentiable, they enable true optimization within a specific domain: an aerodynamic model can be optimized to find the exact geometry that minimizes drag.</p>
          <p>But Gen 2 models leave a massive industrial problem unsolved: <strong>manufacturing systems are not governed by a single physical domain.</strong></p>
          <p>Taking a breakthrough molecule from a 5-milliliter lab beaker and scaling it up to a 10,000-Liter turbulent factory reactor is a notoriously brutal process known as the &quot;Valley of Death.&quot; A factory&apos;s yield depends simultaneously on molecular energetics, reaction kinetics, turbulent transport, heat removal, and microscopic mechanical stress.</p>
          <p>Optimizing one domain faster does not create a path across all of them. Because the computational stack remains fragmented across different software boundaries, continuous mathematical gradients are destroyed. You cannot optimize the whole factory.</p>
        </GenerationSection>

        <GenerationSection
          generation="Generation 3"
          title="Physical Design Foundation Models"
          era="The Era of the Coupled Physical Stack"
          equation={
            <span className={styles.optimisationEquation}>
              <span><b>x</b><sup>*</sup> =</span>
              <span className={styles.argminOperator}>
                <span>arg min</span>
                <sub>x<sub>micro</sub>, x<sub>macro</sub>, x<sub>process</sub></sub>
              </span>
              <span>J(𝓕(<b>x</b>))</span>
            </span>
          }
          caption="Cross-Scale Inverse Design: Computing the coupled physical system from the final objective backward."
          className={styles.generationThree}
        >
          <p>Generation 3 begins when the model stops treating these as independent engineering problems and learns them as one coupled design space.</p>
          <p>This is the frontier Shodh AI is building. We call them <strong>Physical Design Foundation Models</strong>.</p>
          <p>Instead of isolating domains, a Gen 3 World Model represents the entire physical stack within a shared, differentiable computational system.</p>
        </GenerationSection>

        <section className={styles.coupledStackSection} aria-label="Coupled physical stack">
          <p className={styles.eyebrow}>The coupled physical stack</p>
          <div className={styles.stackFlow}>
            <span>Molecule</span><i>→</i><span>Kinetics</span><i>→</i><span>CFD</span><i>→</i><span>Mechanics</span><i>→</i><span>Factory Objective</span>
          </div>
          <div className={styles.gradientReturn}><strong>← ∇J<sub>factory</sub></strong><span>Gradients propagating backward across the coupled system</span></div>
          <div className={styles.prose}>
            <p>Because these traditionally separate physical domains are unified, the model can evaluate how a factory-scale objective (J<sub>factory</sub>) changes with respect to variables distributed across the <em>entire</em> physical stack simultaneously:</p>
          </div>
          <div className={styles.stackEquation}>
            <span>∂J<sub>factory</sub> / ∂x<sub>molecule</sub></span>
            <span>∂J<sub>factory</sub> / ∂x<sub>geometry</sub></span>
            <span>∂J<sub>factory</sub> / ∂x<sub>process</sub></span>
          </div>
          <blockquote><strong>This turns the coupled system—not merely an individual solver—into an inverse-design problem.</strong></blockquote>
          <div className={styles.prose}>
            <p>You specify the desired factory outcome, and the cross-scale gradients calculate the precise molecular structure, process parameters, and reactor geometry needed to manufacture it.</p>
          </div>
        </section>

        <section className={styles.designProof}>
          <header>
            <p className={styles.eyebrow}>From Empirical Search to Computational Design</p>
            <h2>We are no longer just building faster simulators.</h2>
          </header>
          <div className={styles.prose}>
            <p>We are turning physical engineering into a computable design space.</p>
            <p>As we demonstrated in our recent <Link href={technicalReportHref} target="_blank"><strong>Technical Whitepaper</strong></Link>, we have begun validating this Generation 3 capability. When evaluated against independent, high-fidelity classical physics solvers, 88% of our model’s proposed cross-scale gradient directions successfully improved the physical objective. Deployed in a live industrial environment, our model&apos;s inverse-design parameters successfully optimized an exothermic continuous-flow reactor, moving physical yield from 82.4% to 96.7%.</p>
          </div>
          <div className={styles.proofMetrics}>
            <div><strong>88%</strong><span>Cross-scale gradient directions improved the physical objective</span></div>
            <div><strong>82.4 → 96.7%</strong><span>Physical yield in industrial execution</span></div>
          </div>
        </section>

        <section className={styles.closingStatement}>
          <p>Gen 2 makes individual physical domains AI-native.</p>
          <h2>Gen 3 makes the coupled physical system AI-native.</h2>
          <p>If the coupled physical stack becomes differentiable, industrial scale-up stops being primarily an empirical search problem and becomes increasingly a design problem. The factory itself becomes computable from the desired outcome backward.</p>
        </section>

        <nav className={styles.nextArticle} aria-label="Next article">
          <div><p className={styles.eyebrow}>Flagship model launch</p><h2>From Simulating Physics to Designing the Physical Stack</h2><p>Introducing Physical Design Foundation Models.</p></div>
          <Link href="/world-model">Explore the World Model <ArrowRight aria-hidden="true" /></Link>
        </nav>
      </article>

      <footer className={styles.footer}><Image src="/shodhai_logo.svg" alt="Shodh AI" width={136} height={32} /><Link href="/research">All research <ArrowUpRight aria-hidden="true" /></Link></footer>
    </main>
  );
}
