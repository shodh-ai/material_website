import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./careers.css";

export const metadata: Metadata = {
  title: "Careers | Build Physical AI at Shodh AI",
  description:
    "Join a high-agency Physical AI research lab. Four roles across GPU/TPU systems, frontier models, computational physics and biologics, and exceptional builders. Apply with proof of work.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers | Build Physical AI at Shodh AI",
    description:
      "Four roles. One shipped artifact. Show us what you built, what you owned, and what you proved wrong.",
    url: "/careers",
  },
};

export default function CareersLayout({ children }: { children: ReactNode }) {
  return children;
}
