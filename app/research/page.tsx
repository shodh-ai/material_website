import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import styles from "./research.module.css";

const syne = localFont({
  src: "../../public/shodh-new/Syne/Syne-VariableFont_wght.ttf",
  display: "swap",
  weight: "100 900",
});

const researchStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Research at Shodh AI",
  description:
    "Research on Physical Design Foundation Models, cross-scale physical intelligence, differentiable inverse design, and industrial scale-up.",
  url: "https://shodh.ai/research",
  publisher: { "@id": "https://shodh.ai/#organization" },
  hasPart: [
    {
      "@type": "TechArticle",
      name: "A Foundation World Model for Physical Intelligence",
      url: "https://shodh.ai/world-model",
      citation: "https://shodh.ai/research/Foundation_World_Model_for_Physical_Intelligence.pdf",
    },
    {
      "@type": "Article",
      name: "The Three Generations of Foundation Models",
      url: "https://shodh.ai/research/three-generations-of-foundation-models",
    },
  ],
};

export default function ResearchPage() {
  return (
    <main className={`${syne.className} ${styles.page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(researchStructuredData) }} />
      <header className={styles.header}>
        <Link href="/" aria-label="Shodh AI home">
          <Image src="/shodhai_logo.svg" alt="Shodh AI" width={150} height={36} priority />
        </Link>
      </header>

      <section className={styles.introduction}>
        <h1>Research</h1>
        <div>
          <p>Shodh is building Physical Design Foundation Models — foundation models that move beyond predicting isolated physical domains toward designing coupled physical systems from desired outcomes backward.</p>
          <p>Our research explores cross-scale physical intelligence, differentiable inverse design, industrial scale-up, and the transition from AI for prediction to AI for physical design.</p>
        </div>
      </section>

      <section className={styles.featured}>
        <p className={styles.label}>Featured</p>
        <Link href="/world-model" className={styles.featuredLink}>
          <div>
            <h2>A Foundation World Model for Physical Intelligence</h2>
            <p>Our technical capability release on cross-scale reasoning and inverse design.</p>
          </div>
          <span>Explore →</span>
        </Link>
      </section>

      <section className={styles.ideas}>
        <p className={styles.label}>Ideas</p>
        <Link href="/research/three-generations-of-foundation-models" className={styles.ideaLink}>
          <div>
            <h2>The Three Generations of Foundation Models</h2>
            <p>From generating information, to predicting physics, to designing physical outcomes.</p>
          </div>
          <span>→</span>
        </Link>
      </section>
    </main>
  );
}
