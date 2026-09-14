import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import ScaleMap from "./ScaleMap";
import { pieces, pieceHref, thesis, campaign, type Piece } from "./content";
import styles from "./biotechnology.module.css";

export const syne = localFont({ src: "../../../public/shodh-new/Syne/Syne-VariableFont_wght.ttf", display: "swap", variable: "--font-syne", weight: "100 900" });

export function articleMetadata(piece: Piece): Metadata {
  const path = pieceHref(piece);
  return {
    title: `${piece.title} | Shodh AI`, description: piece.dek,
    alternates: { canonical: path },
    openGraph: { type: "article", title: piece.title, description: piece.dek, url: path, siteName: "Shodh AI", images: [{ url: "/webgl-bg-foundation-v2.png", width: 1600, height: 900, alt: "Biotechnology research at Shodh AI" }] },
    twitter: { card: "summary_large_image", title: piece.title, description: piece.dek, images: ["/webgl-bg-foundation-v2.png"] },
  };
}

export function CollectionHeader() {
  return <header className={styles.header}>
    <Link href="/" aria-label="Shodh AI home"><Image src="/shodhai_logo.svg" alt="Shodh AI" width={150} height={36} priority /></Link>
    <nav aria-label="Biotechnology navigation"><Link href="/research"><ArrowLeft size={16} aria-hidden="true" /> Research</Link><Link href="/industries/biotechnology">Biotechnology</Link></nav>
  </header>;
}

export default function BiotechnologyArticle({ piece, explorer }: { piece: Piece; explorer?: ReactNode }) {
  const sections = piece.articleOrder.map(index => piece.sections[index]);
  const next = pieces[(Number(piece.number)) % pieces.length];
  const schema = { "@context": "https://schema.org", "@type": "TechArticle", headline: piece.title, description: piece.dek, url: `https://shodh.ai${pieceHref(piece)}`, mainEntityOfPage: `https://shodh.ai${pieceHref(piece)}`, author: { "@type": "Organization", name: "Shodh AI" }, publisher: { "@id": "https://shodh.ai/#organization" }, isPartOf: { "@type": "CollectionPage", name: "Biotechnology — From Molecule to Manufacturing", url: "https://shodh.ai/industries/biotechnology" }, citation: piece.sources.map(s => s.href.startsWith("/") ? `https://shodh.ai${s.href}` : s.href) };
  return <main className={`${syne.className} ${syne.variable} ${styles.page}`}>
    <a className={styles.skipLink} href="#industry-problem">Skip to the article</a>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <CollectionHeader />
    <article>
      <header className={styles.articleHero}>
        <p className={styles.eyebrow}>Biotechnology / {piece.number} of 05 / {piece.category}</p>
        <h1>{piece.title}</h1><p className={styles.vision}>{piece.vision}</p><p className={styles.dek}>{piece.dek}</p>
        <div className={styles.articleMeta}><span>By Shodh AI</span><span>{piece.documentType}</span><a href="#sources">Sources <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      </header>
      <section className={styles.problem} id="industry-problem"><p className={styles.eyebrow}>The industry problem</p><p>{piece.problem}</p></section>
      <ScaleMap title={piece.visualTitle} caption={piece.visualCaption} scales={piece.scales} outcome={piece.outcome} pathways={piece.pathways} />
      <div className={styles.articleBody}>
        <aside className={styles.contents} aria-label="In this piece">
          <span className={styles.eyebrow}>In this piece</span>
          {sections.map((section, index) => <a key={section.title} href={`#section-${index}`}><span>0{index + 1}</span>{section.title}</a>)}
          <a href="#consequence"><span>{String(piece.sections.length + 1).padStart(2, "0")}</span>The manufacturing consequence</a>
          <Link className={styles.collectionLink} href="/industries/biotechnology">All five pieces <ArrowLeft size={16} aria-hidden="true" /></Link>
        </aside>
        <div className={styles.prose}>
          {sections.map((section, index) => <section id={`section-${index}`} key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            {section.sources && <p className={styles.inlineSources}>{section.sources.map(id => {
              const source = piece.sources.find(s => s.id === id)!;
              return <a href={source.href} key={id} target="_blank" rel="noreferrer">{source.title} <ArrowUpRight size={13} aria-hidden="true" /></a>;
            })}</p>}
            {section === piece.sections[piece.number === "05" ? 2 : 1] && <figure className={styles.equation}>
              <span className={styles.eyebrow}>A useful engineering relationship</span><h3>{piece.equation.title}</h3>
              <div className={styles.expression} role="math" aria-label={piece.equation.expression}>{piece.equation.expression}</div>
              <p>{piece.equation.explanation}</p><figcaption>{piece.equation.assumption}</figcaption>
            </figure>}
          </section>)}
        </div>
      </div>
      {explorer && <div className={styles.explorerWrapper}><div className={styles.explorerIntro}><p className={styles.eyebrow}>Interactive scale-up illustration</p><p>Change mixing and airflow to inspect the tradeoff. This illustration is separate from the reported LUCAN pilot results.</p></div>{explorer}</div>}
      <section className={styles.evidenceNote}><h2>Evidence and scope</h2><p>{piece.evidence}</p></section>
      <section className={styles.references} id="sources"><h2>Sources and technical reading</h2><ol>{piece.sources.map(source => <li key={source.id}><a href={source.href} target="_blank" rel="noreferrer">{source.title}<ArrowUpRight size={16} aria-hidden="true" /></a></li>)}</ol></section>
      <section className={styles.consequence} id="consequence">
        <div><p className={styles.eyebrow}>The manufacturing consequence</p><h2>{piece.consequence.title}</h2></div>
        <div>{piece.consequence.paragraphs.map(p => <p key={p}>{p}</p>)}<h3>What success should be measured against</h3><ul>{piece.consequence.measures.map(m => <li key={m}>{m}</li>)}</ul></div>
      </section>
      <section className={styles.seriesThesis}><p>{campaign}</p><p className={styles.supportingThesis}>{thesis}</p><Link href="/lucan-physical-intelligence">The LUCAN foundation <ArrowUpRight size={16} aria-hidden="true" /></Link></section>
      <nav className={styles.nextPiece} aria-label="Continue the biotechnology series"><div><p className={styles.eyebrow}>{piece.number === "05" ? "Return to the thesis" : `Next / ${next.number} of 05`}</p><Link href={pieceHref(next)}>{next.title}<ArrowRight aria-hidden="true" /></Link></div><Link href="/industries/biotechnology">View the collection</Link></nav>
    </article>
    <footer className={styles.footer}><Image src="/shodhai_logo.svg" alt="Shodh AI" width={136} height={32} /><Link href="/research">All research <ArrowUpRight size={16} aria-hidden="true" /></Link></footer>
  </main>;
}
