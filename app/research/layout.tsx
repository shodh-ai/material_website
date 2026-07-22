import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Research | Shodh AI Physics Foundation Models",
  description:
    "Explore Shodh AI research in multi-physics foundation models, differentiable inverse design, and industrial sim-to-real calibration.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research | Shodh AI Physics Foundation Models",
    description:
      "Foundation models and inverse-design systems for materials, molecules, and industrial scale-up.",
    url: "/research",
  },
};

export default function ResearchLayout({ children }: { children: ReactNode }) {
  return children;
}
