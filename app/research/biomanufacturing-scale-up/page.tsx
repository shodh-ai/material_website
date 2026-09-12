import type { Metadata } from "next";
import localFont from "next/font/local";
import UniphyPage from "./InteractiveArticle";
import styles from "./article.module.css";

const syne = localFont({
  src: "../../../public/shodh-new/Syne/Syne-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-syne",
  weight: "100 900",
});

const title = "The Physics of Biomanufacturing Scale-Up";
const description = "How UNIPHY connects molecular simulation, bioreactor scale-up, purification and formulation, with an interactive look at the physics of manufacturing.";
const articlePath = "/research/biomanufacturing-scale-up";
const whitepaperPath = "/research/UNIPHY_Biomanufacturing_Whitepaper.pdf";

export const metadata: Metadata = {
  title: `${title} | Shodh AI`,
  description,
  alternates: { canonical: articlePath },
  openGraph: {
    type: "article", title, description, url: articlePath, siteName: "Shodh AI",
    images: [{ url: "/webgl-bg-foundation-v2.png", width: 1600, height: 900, alt: "Research at Shodh AI" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/webgl-bg-foundation-v2.png"] },
};

const articleStructuredData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: title,
  description,
  url: `https://shodh.ai${articlePath}`,
  mainEntityOfPage: `https://shodh.ai${articlePath}`,
  author: { "@type": "Organization", name: "Shodh AI", url: "https://shodh.ai" },
  publisher: { "@id": "https://shodh.ai/#organization" },
  citation: `https://shodh.ai${whitepaperPath}`,
  about: ["biomanufacturing", "bioreactor scale-up", "molecular simulation", "process transfer"],
};

export default function BiomanufacturingArticle() {
  return <div className={`${syne.variable} ${styles.page}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }} />
    <UniphyPage />
  </div>;
}
