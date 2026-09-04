import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./careers.css";

export const metadata: Metadata = {
  title: "Careers | Build AI for Science at Shodh AI",
  description:
    "Join Shodh AI to build physics foundation models, scientific machine learning systems, and AI for materials discovery and manufacturing.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers | Build AI for Science at Shodh AI",
    description:
      "Open roles across scientific machine learning, materials science, engineering, and deployment.",
    url: "/careers",
  },
};

export default function CareersLayout({ children }: { children: ReactNode }) {
  return children;
}
