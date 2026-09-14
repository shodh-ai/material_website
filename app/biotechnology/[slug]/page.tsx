import { notFound } from "next/navigation";
import BiotechnologyArticle, { articleMetadata } from "../../research/biotechnology/Article";
import { pieces } from "../../research/biotechnology/content";
import { ScaleUpExplorer } from "../../research/biomanufacturing-scale-up/InteractiveArticle";
import theme from "../../research/biomanufacturing-scale-up/article.module.css";
import styles from "../../research/biotechnology/biotechnology.module.css";
export const dynamicParams = false;
export function generateStaticParams() { return pieces.map(piece => ({ slug: piece.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const piece = pieces.find(item => item.slug === params.slug);
  if (!piece) notFound();
  return articleMetadata(piece);
}
export default function Page({ params }: { params: { slug: string } }) {
  const piece = pieces.find(item => item.slug === params.slug);
  if (!piece) notFound();
  return <BiotechnologyArticle piece={piece} explorer={piece.number === "03" ? <div className={`${theme.page} ${styles.explorerOnly}`}><ScaleUpExplorer /></div> : undefined} />;
}
