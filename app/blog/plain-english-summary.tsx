import styles from "./(public)/blog.module.css";

type PlainEnglishSummaryProps = {
  whyItMatters: string;
  whatSurprisedUs: string;
  whatWeBuilt: string;
};

export default function PlainEnglishSummary(summary: PlainEnglishSummaryProps) {
  return (
    <section className={styles.plainEnglish} aria-label="Plain-English TL;DR">
      <h2>Plain-English TL;DR</h2>
      <p><strong>Why it matters:</strong> {summary.whyItMatters}</p>
      <p><strong>What surprised us:</strong> {summary.whatSurprisedUs}</p>
      <p><strong>What we built:</strong> {summary.whatWeBuilt}</p>
    </section>
  );
}
