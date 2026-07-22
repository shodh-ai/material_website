import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AI for Materials Discovery and Industrial Scale-Up | Shodh AI",
  description:
    "Shodh AI bridges molecular discovery, mesoscale physics, process design, and factory scale-up with a universal physics foundation model.",
  alternates: { canonical: "/materials-discovery" },
  openGraph: {
    title: "AI for Materials Discovery and Industrial Scale-Up | Shodh AI",
    description:
      "A universal physics foundation model connecting molecular discovery to manufacturable industrial processes.",
    url: "/materials-discovery",
  },
};

export default function MaterialsDiscoveryLayout({ children }: { children: ReactNode }) {
  return children;
}
