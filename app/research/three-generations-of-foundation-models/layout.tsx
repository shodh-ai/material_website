import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Three Generations of Foundation Models | Shodh AI",
  description:
    "From domain physics to the coupled physical stack: three generations of foundation models and the emergence of cross-scale physical design.",
  keywords: [
    "Shodh AI",
    "three generations of foundation models",
    "Physical Design Foundation Models",
    "physics foundation models",
    "coupled physical stack",
    "cross-scale inverse design",
  ],
  authors: [{ name: "Shodh AI", url: "https://shodh.ai" }],
  creator: "Shodh AI",
  publisher: "Shodh AI",
  category: "Artificial intelligence research",
  alternates: { canonical: "/research/three-generations-of-foundation-models" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: "/research/three-generations-of-foundation-models",
    siteName: "Shodh AI",
    title: "The Three Generations of Foundation Models: From Domain Physics to the Coupled Physical Stack",
    description: "How foundation models are evolving from digital generation to domain simulation and coupled physical design.",
    publishedTime: "2026-08-17T00:00:00.000Z",
    modifiedTime: "2026-08-17T00:00:00.000Z",
    authors: ["https://shodh.ai"],
    tags: ["Foundation Models", "Physical AI", "Inverse Design"],
    images: [{ url: "/webgl-bg-foundation-v2.png", width: 1600, height: 900, alt: "The Three Generations of Foundation Models by Shodh AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Three Generations of Foundation Models",
    description: "From domain physics to the coupled physical stack.",
    images: ["/webgl-bg-foundation-v2.png"],
  },
};

export default function ThreeGenerationsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
