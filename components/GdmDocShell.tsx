"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

export default function GdmDocShell({
  eyebrow,
  title,
  classification,
  children,
}: {
  eyebrow: string;
  title: string;
  classification: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <header className="border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link
            href="/insider/gdm-dataroom"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-light"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Data Room</span>
          </Link>
          <span className="text-xs font-light tracking-[0.3em] uppercase text-white/30 hidden md:inline">
            {classification}
          </span>
        </div>
      </header>

      <section className="border-b border-white/5 px-6 md:px-10 py-14 max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-rose-300/70 mb-4">{eyebrow}</p>
        <h1 className="text-3xl md:text-5xl font-extralight tracking-tight leading-tight mb-4">
          {title}
        </h1>
        <p className="text-white/40 text-xs uppercase tracking-[0.25em]">{classification}</p>
      </section>

      <main className="max-w-5xl mx-auto px-6 md:px-10 py-14">{children}</main>

      <footer className="border-t border-white/5 px-6 py-10 text-center mt-12">
        <Link
          href="/insider/gdm-dataroom"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 text-sm font-light transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Data Room
        </Link>
        <p className="text-white/20 text-[11px] tracking-widest uppercase mt-6">
          Shodh AI × Google DeepMind — Data Room — Confidential
        </p>
      </footer>
    </div>
  );
}
