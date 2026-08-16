import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physical Design Foundation Models | Shodh AI",
  description:
    "Shodh AI introduces a foundation World Model for physical intelligence, cross-scale reasoning, and inverse design from molecules to factories.",
  keywords: [
    "Shodh AI",
    "Physical Design Foundation Models",
    "physical intelligence",
    "foundation World Model",
    "cross-scale inverse design",
    "industrial scale-up AI",
    "AI for manufacturing",
  ],
  authors: [{ name: "Shodh AI", url: "https://shodh.ai" }],
  creator: "Shodh AI",
  publisher: "Shodh AI",
  category: "Artificial intelligence research",
  alternates: { canonical: "/world-model" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: "/world-model",
    siteName: "Shodh AI",
    title: "From Simulating Physics to Designing the Physical Stack",
    description: "Introducing Shodh AI's Physical Design Foundation Model and its cross-scale inverse-design capability.",
    publishedTime: "2026-08-15T00:00:00.000Z",
    modifiedTime: "2026-08-17T00:00:00.000Z",
    authors: ["https://shodh.ai"],
    tags: ["Physical AI", "Foundation Models", "Inverse Design", "Industrial Scale-Up"],
    images: [{ url: "/webgl-bg-foundation-v2.png", width: 1600, height: 900, alt: "Shodh AI Physical Design Foundation Model" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "From Simulating Physics to Designing the Physical Stack",
    description: "Introducing Shodh AI's Physical Design Foundation Model.",
    images: ["/webgl-bg-foundation-v2.png"],
  },
};

export default function WorldModelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
