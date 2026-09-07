import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LUCAN: A Foundation World Model for Physical Intelligence | Shodh AI",
  description:
    "Introducing LUCAN, Shodh AI's foundation world model for cross-scale physical intelligence and inverse design from molecules to manufacturing.",
  keywords: [
    "LUCAN",
    "Shodh AI",
    "physical intelligence",
    "foundation world model",
    "cross-scale inverse design",
    "scientific machine learning",
    "industrial AI",
    "AI for manufacturing",
  ],
  authors: [{ name: "Shodh AI", url: "https://shodh.ai" }],
  creator: "Shodh AI",
  publisher: "Shodh AI",
  category: "Artificial intelligence research",
  alternates: { canonical: "/lucan-physical-intelligence" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: "/lucan-physical-intelligence",
    siteName: "Shodh AI",
    title: "LUCAN: A Foundation World Model for Physical Intelligence",
    description:
      "From predicting physical systems to designing interventions across molecules, reactors, and manufacturing.",
    publishedTime: "2026-09-07T00:00:00.000Z",
    modifiedTime: "2026-09-07T00:00:00.000Z",
    authors: ["https://shodh.ai"],
    tags: ["Physical AI", "World Models", "Inverse Design", "Industrial Scale-Up"],
    images: [
      {
        url: "/lucan/lucan_reasons_across_scales.jpg",
        width: 1536,
        height: 864,
        alt: "LUCAN reasons across equipment, process, and molecular scales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUCAN: A Foundation World Model for Physical Intelligence",
    description: "Cross-scale inverse design from molecules to manufacturing.",
    images: ["/lucan/lucan_reasons_across_scales.jpg"],
  },
};

export default function LucanLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
