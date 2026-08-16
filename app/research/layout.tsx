import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Research | Shodh AI",
  description:
    "Research on Physical Design Foundation Models, cross-scale physical intelligence, differentiable inverse design, and industrial scale-up.",
  keywords: [
    "Shodh AI research",
    "Physical Design Foundation Models",
    "physical intelligence",
    "cross-scale physics",
    "differentiable inverse design",
    "industrial scale-up",
  ],
  authors: [{ name: "Shodh AI", url: "https://shodh.ai" }],
  creator: "Shodh AI",
  publisher: "Shodh AI",
  alternates: { canonical: "/research" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Research | Shodh AI",
    description:
      "Physical Design Foundation Models for coupled physical systems and industrial scale-up.",
    url: "/research",
    siteName: "Shodh AI",
    images: [{ url: "/webgl-bg-foundation-v2.png", width: 1600, height: 900, alt: "Research at Shodh AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research | Shodh AI",
    description: "Physical Design Foundation Models for coupled physical systems and industrial scale-up.",
    images: ["/webgl-bg-foundation-v2.png"],
  },
};

export default function ResearchLayout({ children }: { children: ReactNode }) {
  return children;
}
