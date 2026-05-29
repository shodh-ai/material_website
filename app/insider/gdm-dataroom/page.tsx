"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Lock, Eye, Cpu, FlaskConical, Beaker } from "lucide-react";

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const docs = [
  {
    id: "preprint",
    num: "01",
    title: "Academic Preprint - Mesoscale Battery Sim2Real",
    subtitle: "Peer-reviewed research submission",
    desc: "Full academic preprint covering our sim-to-real methodology for mesoscale battery microstructure generation and electrochemical validation.",
    icon: FileText,
    kind: "PDF Viewer",
    classification: "Academic",
  },
  {
    id: "diligence",
    num: "02",
    title: "Commercial Diligence & Morphological Validation",
    subtitle: "Tier-1 OEM - Technical Diligence Report",
    desc: "Proving that our procedural 3D generation engine (STR-GEN) can algorithmically recreate commercial battery morphology without physical X-ray scans.",
    icon: FlaskConical,
    kind: "Technical Memo",
    classification: "Confidential · NDA",
  },
  {
    id: "architecture",
    num: "03",
    title: "Architecture & Roadmap - JAX-Native Physics Engine",
    subtitle: "Neural Surrogate Architecture Whitepaper",
    desc: "3D multi-physics JAX engine, Diffusion-FNO surrogate, divergence-penalty training, and Rayleigh-Taylor validation.",
    icon: Cpu,
    kind: "Whitepaper",
    classification: "Confidential",
  },
  {
    id: "scaleup",
    num: "04",
    title: "Scale-Up Proof - Batch-to-Continuous Conversion",
    subtitle: "Tier-1 Specialty Chemical Manufacturer",
    desc: "Ongoing pilot: mapping 1D batch kinetics into 3D continuous-flow physics via our Large Physics Model. Includes redacted partner artifacts.",
    icon: Beaker,
    kind: "Case Study",
    classification: "Confidential · NDA",
  },
];

export default function GdmDataRoomPage() {
  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <header className="border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white/80 font-light text-sm tracking-tight">Shodh AI</span>
            <span className="text-white/30 text-lg">×</span>
            <img src="/DeepMind_logo.png" alt="DeepMind" className="h-5 opacity-70" />
          </div>
          <span className="text-xs font-light tracking-[0.3em] uppercase text-white/30">GDM · Data Room</span>
        </div>
      </header>

      <section className="min-h-[45vh] flex flex-col items-center justify-center px-6 text-center border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,113,133,0.06)_0%,transparent_65%)] pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-10">
            <Lock className="w-3.5 h-3.5 text-rose-300" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">Shodh AI × GDM - Secure Data Room</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter mb-6 leading-[0.9]">GDM<br /><span className="italic font-light text-rose-300">Data Room.</span></h1>
          <p className="text-lg md:text-xl text-white/45 font-light max-w-2xl mx-auto">Four technical artifacts supporting the Shodh AI × Google DeepMind technical discussion.</p>
        </motion.div>
      </section>

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {docs.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div key={d.id} {...fade} transition={{ delay: i * 0.05 }}>
                <Link href={`/insider/gdm-dataroom/${d.id}`} className="group block p-6 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-rose-400/30 hover:bg-white/[0.04] transition-all h-full">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-white/25 font-mono text-sm">{d.num}</span>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-rose-400/30 transition-colors">
                      <Icon className="w-5 h-5 text-white/60 group-hover:text-rose-300 transition-colors" />
                    </div>
                  </div>
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-rose-300/70 mb-2">{d.classification}</p>
                  <h3 className="text-xl font-light text-white mb-1 leading-snug">{d.title}</h3>
                  <p className="text-white/40 text-sm mb-3 font-light">{d.subtitle}</p>
                  <p className="text-white/55 text-sm leading-relaxed mb-5 font-light">{d.desc}</p>
                  <div className="flex items-center justify-between text-xs text-white/30 font-light">
                    <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />{d.kind}</span>
                    <span className="text-white/40 group-hover:text-rose-300 transition-colors">Open →</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 p-5 rounded-xl border border-white/8 bg-white/[0.02] flex items-start gap-3">
          <Lock className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
          <p className="text-white/50 font-light text-sm leading-relaxed">All artifacts in this data room are shared under mutual NDA. Documents are viewer-only; external download, redistribution, or screen capture is restricted. Where partner IP is involved, technical details are redacted.</p>
        </div>
      </main>

      <footer className="border-t border-white/5 px-6 py-10 text-center">
        <p className="text-white/20 text-xs tracking-widest uppercase">Shodh AI × Google DeepMind - Data Room - Confidential</p>
      </footer>
    </div>
  );
}
