import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LUCAN Scientific Performance Evaluation | Shodh AI",
  description:
    "Eight task-qualified comparisons of LUCAN across molecular, process and temporal physics.",
  alternates: { canonical: "/blog/lucan-scientific-performance" },
  openGraph: {
    title: "LUCAN Scientific Performance Evaluation",
    description:
      "Eight task-qualified comparisons across molecular, process and temporal physics.",
    type: "article",
    url: "/blog/lucan-scientific-performance",
  },
};

export default function LucanBenchmarkLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
