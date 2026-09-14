import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CollectionHeader, syne } from "./Article";
import { pieces, pieceHref, thesis, campaign } from "./content";
import styles from "./biotechnology.module.css";

const title = "Biotechnology: From Molecule to Manufacturing | Shodh AI";
const description = "Five connected technical pieces on LUCAN’s cross-scale approach to biotechnology: molecular design, CAR-T, scale-up, biologics manufacturability, purification, formulation and delivery.";
export const metadata: Metadata = { title, description, alternates: { canonical: "/industries/biotechnology" }, openGraph: { title, description, url: "/industries/biotechnology", siteName: "Shodh AI", images: [{ url: "/webgl-bg-foundation-v2.png", width: 1600, height: 900, alt: "Biotechnology research at Shodh AI" }] }, twitter: { card: "summary_large_image", title, description, images: ["/webgl-bg-foundation-v2.png"] } };

export default function BiotechnologyCollection() {
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: "https://shodh.ai/industries/biotechnology", publisher: { "@id": "https://shodh.ai/#organization" }, hasPart: pieces.map(piece => ({ "@type": "TechArticle", name: piece.title, url: `https://shodh.ai${pieceHref(piece)}` })) };
  return <main className={`${syne.className} ${styles.page}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <CollectionHeader />
    <section className={styles.collectionHero}>
      <p className={styles.eyebrow}>Industries / Biotechnology</p><h1>From molecule<br />to manufacturing.</h1>
      <div><p>Biology moves forward across scales. Engineering has to reason backward across them. LUCAN is being built to connect molecular design, living systems and manufacturing in one cross-scale design problem.</p><p>Five in-depth articles. One connected argument for how biotechnology will be engineered.</p></div>
    </section>
    <section className={styles.collectionThesis}><p>{campaign}</p><p className={styles.supportingThesis}>{thesis}</p><Link href="/lucan-physical-intelligence">The LUCAN foundation <ArrowUpRight size={17} aria-hidden="true" /></Link></section>
    <section className={styles.collectionPieces} aria-label="Five biotechnology pieces">
      {pieces.map(piece => <article key={piece.slug} className={piece.number === "01" ? styles.flagship : undefined}>
        <div className={styles.pieceIndex}><span>{piece.number}</span><small>{piece.category}</small></div>
        <div><h2><Link href={pieceHref(piece)}>{piece.title}</Link></h2><p>{piece.dek}</p><div className={styles.scaleTags}>{piece.scales.map(s => <span key={s.name}>{s.name}</span>)}</div><div className={styles.formatLinks}><Link href={pieceHref(piece)}>Read article <ArrowRight size={16} aria-hidden="true" /></Link></div></div>
        <Link className={styles.readLink} href={pieceHref(piece)} aria-label={`Read ${piece.title}`}><ArrowRight size={25} aria-hidden="true" /></Link>
      </article>)}
    </section>
    <section className={styles.collectionEvidence}><div><p className={styles.eyebrow}>Ambition with an evidence trail</p><h2>Physical intelligence.<br />Specific tests.</h2></div><div><p>The collection distinguishes established science, Shodh-reported model and pilot results, and prospective applications. CAR-T and LNP delivery are application directions, not claims of validated LUCAN therapeutic performance.</p><Link href="/research/LUCAN_Physical_Intelligence_Whitepaper_v3.pdf" target="_blank">Read the LUCAN whitepaper <ArrowUpRight size={16} aria-hidden="true" /></Link></div></section>
    <section className={styles.seriesThesis}><p>Manufacturing must become part of the biotechnology design problem.</p><Link href="/biotechnology/molecule-to-manufacturing">Read the biotechnology manifesto <ArrowRight size={17} aria-hidden="true" /></Link></section>
    <footer className={styles.footer}><Image src="/shodhai_logo.svg" alt="Shodh AI" width={136} height={32} /><Link href="/research">All research <ArrowUpRight size={16} aria-hidden="true" /></Link></footer>
  </main>;
}
