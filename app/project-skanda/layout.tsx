import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Project Skanda | Shodh AI Generative AI for Matter",
  description:
    "Explore Project Skanda, Shodh AI's generative AI system for physical invention, materials discovery, synthesis planning, and real-world validation.",
  alternates: { canonical: "/project-skanda" },
  openGraph: {
    title: "Project Skanda | Shodh AI Generative AI for Matter",
    description:
      "Generative AI for physical invention, from material candidates to synthesis and validation.",
    url: "/project-skanda",
  },
};

export default function ProjectSkandaLayout({ children }: { children: ReactNode }) {
  return children;
}
