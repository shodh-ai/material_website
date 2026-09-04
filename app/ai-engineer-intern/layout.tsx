import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AI Engineer Intern | Shodh AI",
  description:
    "Apply for the AI Engineer Internship in Jaipur and build production AI systems across models, evaluation, data, and product.",
  alternates: { canonical: "/ai-engineer-intern" },
};

export default function AIEngineerInternLayout({ children }: { children: ReactNode }) {
  return children;
}
