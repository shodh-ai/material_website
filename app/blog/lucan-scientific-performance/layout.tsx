import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LUCAN Scientific Performance Evaluation | Shodh AI",
  description:
    "Eight task-qualified comparisons of LUCAN under declared scientific evaluation protocols.",
  alternates: { canonical: "/blog/lucan-scientific-performance" },
  openGraph: {
    title: "LUCAN Scientific Performance Evaluation",
    description:
      "Eight task-qualified comparisons under the report's declared evaluation protocols.",
    type: "article",
    url: "/blog/lucan-scientific-performance",
  },
};

export default function LucanBenchmarkLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
