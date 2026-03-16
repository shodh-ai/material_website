"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, ChevronRight, ArrowRight, Check } from "lucide-react";

const EQUATIONS = [
  { num: "1", name: "Navier-Stokes", domain: "Fluid Flow", color: "text-blue-300", border: "border-blue-500/20", bg: "bg-blue-950/10" },
  { num: "2", name: "Fick's Law", domain: "Chemical Diffusion", color: "text-violet-300", border: "border-violet-500/20", bg: "bg-violet-950/10" },
  { num: "3", name: "Cahn-Hilliard", domain: "Material Separation", color: "text-cyan-300", border: "border-cyan-500/20", bg: "bg-cyan-950/10" },
  { num: "4", name: "Solid Mechanics + Fourier", domain: "Stress & Heat", color: "text-orange-300", border: "border-orange-500/20", bg: "bg-orange-950/10" },
  { num: "5", name: "Maxwell's Equations", domain: "Electromagnetics", color: "text-rose-300", border: "border-rose-500/20", bg: "bg-rose-950/10" },
];

const ANCHORS = [
  {
    name: "Jubilant Ingrevia",
    vertical: "Agro-Pharma & CDMO",
    problem: "Accelerating Continuous Manufacturing",
    detail: "Using the LPM to transform slow batch reactions into continuous flow chemistry at an industrial scale.",
    color: "text-emerald-300", border: "border-emerald-500/20", bg: "bg-emerald-950/10",
  },
  {
    name: "Biocon",
    vertical: "Bio-Enzymes & Biologicals",
    problem: "Bioreactor Scale-Up",
    detail: "Co-developing the AI blueprint to scale complex biologicals from lab synthesis to commercial bioreactors.",
    color: "text-blue-300", border: "border-blue-500/20", bg: "bg-blue-950/10",
  },
  {
    name: "Aarti Industries",
    vertical: "Specialty Chemicals",
    problem: "High-Stress Batch Reactions",
    detail: "Solving heat and pressure bottlenecks in high-stress batch chemical reactions at scale.",
    color: "text-rose-300", border: "border-rose-500/20", bg: "bg-rose-950/10",
  },
];

const REVENUE_TIERS = [
  {
    num: "01", tag: "Immediate Cash Flow", title: "NRE & Validation",
    desc: "Partners pay an upfront Non-Recurring Engineering (NRE) fee to fine-tune the LPM on their data and solve their immediate scale-up bottleneck.",
    value: "$2M – $5M per engagement", color: "text-blue-300", border: "border-blue-500/20", bg: "bg-blue-950/5",
  },
  {
    num: "02", tag: "The Multiplier", title: "The Biobucks Model",
    desc: "We co-own the physical process IP. When the Shodh AI blueprint is successfully executed in the partner's physical pilot plant, we trigger commercial milestone payouts.",
    value: "$5M – $15M per milestone", color: "text-violet-300", border: "border-violet-500/20", bg: "bg-violet-950/5",
  },
  {
    num: "03", tag: "Perpetual Scale", title: "Royalty on Output",
    desc: "A single-digit software royalty on every physical product globally manufactured using a Shodh AI-generated blueprint. Every factory we design becomes a perpetual revenue stream.",
    value: "% royalty on manufactured output", color: "text-emerald-300", border: "border-emerald-500/20", bg: "bg-emerald-950/5",
  },
];

const GTM_PHASES = [
  {
    phase: "Phase 1", months: "Months 1–8", title: "The Base Model",
    points: [
      "Hire elite global AI researchers. Train the 10B parameter LPM on sovereign GPU clusters (zero VC burn on compute).",
      "Release the open-source base model. Instantly displace COMSOL and Ansys across academia and establish the global default standard.",
      "Push zero-shot accuracy from 70% → 90%.",
    ],
    color: "border-blue-500/30", numColor: "text-blue-300/40",
  },
  {
    phase: "Phase 2", months: "Months 9–16", title: "Anchor Delivery",
    points: [
      "Deploy Federated Data Engineering teams on-site at Biocon, Jubilant, and Aarti.",
      "Deliver proprietary digital manufacturing blueprints for each anchor partner.",
      "Collect first NRE revenue and trigger initial milestone-based IP payments.",
    ],
    color: "border-violet-500/30", numColor: "text-violet-300/40",
  },
  {
    phase: "Phase 3", months: "Months 17–24", title: "Scale",
    points: [
      "Use 3 proven zero-to-billion case studies to sign the next 10 global Tier-1 manufacturing giants.",
      "Set up commercial proof for a $500M mega-round to map all global physical supply chains.",
    ],
    color: "border-emerald-500/30", numColor: "text-emerald-300/40",
  },
];

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function ShodhDeckV3() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div className="min-h-screen bg-[#060606] text-white" style={{ cursor: "none" }}>
      {/* Cursor glow */}
      <div className="pointer-events-none fixed z-[9999] transition-transform duration-75"
        style={{ left: mousePos.x, top: mousePos.y, transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.18) 15%, rgba(255,255,255,0.06) 40%, transparent 70%)" }} />
      <div className="pointer-events-none fixed z-[9999]"
        style={{ left: mousePos.x, top: mousePos.y, transform: "translate(-50%,-50%)", width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.8)" }} />

      {/* Header */}
      <header className="border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">Back</span>
          </Link>
          <span className="text-xs font-light tracking-[0.3em] uppercase text-white/30">Shodh AI — Confidential Investor Briefing</span>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_65%)]" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
          <p className="text-xs font-light tracking-[0.5em] uppercase text-white/25 mb-10">Confidential Investor Briefing</p>
          <h1 className="text-6xl md:text-9xl font-extralight tracking-tight mb-3 leading-none">
            The Large<br /><span className="font-normal">Physics Model</span>
          </h1>
          <p className="text-base md:text-lg font-mono text-white/30 mb-10 tracking-wider">(LPM)</p>
          <p className="text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto mb-14 leading-relaxed">
            Building the foundation model for manufacturing physics.
          </p>

          {/* Capital advantage callout */}
          <div className="inline-block text-left max-w-xl mx-auto mb-14 p-6 rounded-2xl bg-white/[0.02] border border-white/8">
            <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-3">The Capital Advantage</p>
            <p className="text-white/70 font-light leading-relaxed text-sm">
              Backed by the IndiaAI Mission. <span className="text-white font-normal">One of 12 foundational model teams</span> selected globally with sovereign priority access to national GPU/TPU compute.
            </p>
            <p className="text-white/40 font-light text-sm mt-2">
              We are building the AI operating system for the physical world.
            </p>
          </div>

          {/* Logos */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { src: "/DeepMind_logo.png", alt: "Google DeepMind" },
              { src: "/logos/google-logo.svg", alt: "Google JAX" },
              { src: "/demo/nvidia-partner-logo.png", alt: "NVIDIA" },
              { src: "/india-ai-logo-650x311.png", alt: "IndiaAI" },
            ].map((logo) => (
              <div key={logo.alt} className="h-7 flex items-center opacity-40 hover:opacity-65 transition-opacity">
                <img src={logo.src} alt={logo.alt} className="h-full w-auto max-w-[110px] object-contain" style={{ filter: "brightness(0) invert(1)" }} />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── 01: THE PROBLEM ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">01 — The Problem: The Mesoscale Valley of Death</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            AI for Science is<br /><span className="font-normal">currently bottlenecked.</span>
          </h2>
          <p className="text-white/55 font-light text-lg max-w-2xl mb-16 leading-relaxed">
            Models like AlphaFold and Isomorphic Labs have solved the Discovery Layer. They can predict billions of new molecular structures <em>in silico</em> in days. But a digital molecule is not a product. <span className="text-white font-normal">It must be manufactured.</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden mb-12">
          <motion.div {...fade} className="bg-[#060606] p-8 md:p-10">
            <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-4">The Discovery Layer — Solved</p>
            <p className="text-white/60 font-light text-2xl leading-snug mb-4">AlphaFold. Isomorphic Labs. Schrödinger.</p>
            <p className="text-white/40 font-light leading-relaxed">
              AI predicts molecular structure in silico. Billions of candidates screened in days. Validated in autonomous robotic labs at milligram scale.
            </p>
            <p className="text-white/30 font-light text-sm mt-4 italic">The output: a digital prediction. Not a manufacturing blueprint.</p>
          </motion.div>
          <motion.div {...fade} transition={{ delay: 0.1 }} className="bg-white/[0.015] p-8 md:p-10">
            <p className="text-rose-400/60 text-xs uppercase tracking-[0.25em] mb-4">The Mesoscale Layer — Unsolved</p>
            <p className="text-white font-light text-2xl leading-snug mb-4">The Scale-Up Bottleneck.</p>
            <p className="text-white/65 font-light leading-relaxed mb-4">
              When you take a lab-synthesized molecule and put it into a 10,000-litre industrial reactor, the turbulence, heat transfer, and pressure <span className="text-white font-normal">tear the molecule apart.</span>
            </p>
            <p className="text-white/55 font-light leading-relaxed">
              The industry spends <span className="text-white font-normal">7 years and $500M</span> building blind, physical pilot plants based on trial and error.
            </p>
          </motion.div>
        </div>

        {/* Three brutal stats */}
        <motion.div {...fade} transition={{ delay: 0.15 }} className="grid grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden mb-10">
          {[
            { stat: "7", unit: "yrs", label: "Average scale-up timeline" },
            { stat: "$500M", unit: "", label: "Spent per industrial molecule" },
            { stat: "90%", unit: "", label: "Of discovered molecules fail here" },
          ].map((s, i) => (
            <div key={i} className="bg-[#060606] p-6 md:p-8 text-center">
              <p className="text-3xl md:text-5xl font-light text-white mb-1">{s.stat}<span className="text-xl text-white/40">{s.unit}</span></p>
              <p className="text-white/35 text-xs font-light">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div {...fade} transition={{ delay: 0.2 }} className="p-6 rounded-2xl bg-rose-950/15 border border-rose-500/20">
          <p className="text-rose-300/80 font-light">This is the mesoscale layer. <span className="text-white font-normal">We are the only team solving it.</span></p>
        </motion.div>
      </section>

      {/* ─── 02: THE SOLUTION ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">02 — The Solution: The Large Physics Model (LPM)</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Replacing deterministic<br /><span className="font-normal">math with AI.</span>
          </h2>
          <div className="max-w-3xl mb-16 space-y-4">
            <p className="text-white/55 font-light text-lg leading-relaxed">
              Legacy deterministic solvers (COMSOL, Ansys) take months to simulate a single reactor configuration. They are <span className="text-white font-normal">mathematically impossible to invert</span> — they cannot give you a recipe, they can only test your guess.
            </p>
            <p className="text-white/55 font-light text-lg leading-relaxed">
              The LPM is a <span className="text-white font-normal">10-Billion parameter Neural Operator</span> that couples the 5 governing equations of physical scale-up into a single invertible model.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
          {EQUATIONS.map((eq, i) => (
            <motion.div key={i} {...fade} transition={{ delay: i * 0.07 }} className={`p-6 rounded-2xl border ${eq.border} ${eq.bg} flex items-start gap-4`}>
              <span className={`font-mono text-3xl font-bold leading-none ${eq.color} opacity-30 shrink-0`}>{eq.num}</span>
              <div>
                <p className={`font-light text-base ${eq.color} mb-0.5`}>{eq.name}</p>
                <p className="text-white/40 text-sm">{eq.domain}</p>
              </div>
            </motion.div>
          ))}
          <motion.div {...fade} transition={{ delay: 0.4 }} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] flex items-center">
            <p className="text-white/40 font-light text-sm leading-relaxed">Unified in a single invertible Neural Operator. One model. All physical domains.</p>
          </motion.div>
        </div>

        {/* Patent life math */}
        <motion.div {...fade} transition={{ delay: 0.1 }} className="p-8 md:p-10 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <p className="text-white/30 text-xs uppercase tracking-wider mb-2">Legacy Timeline</p>
              <p className="text-4xl font-light text-white/50 line-through">7 years</p>
              <p className="text-white/25 text-sm mt-1">of industrial scale-up engineering</p>
            </div>
            <div className="flex justify-center">
              <ArrowRight className="w-8 h-8 text-emerald-400/50" />
            </div>
            <div className="text-center">
              <p className="text-white/30 text-xs uppercase tracking-wider mb-2">With Shodh AI</p>
              <p className="text-4xl font-light text-emerald-300">6 months</p>
              <p className="text-emerald-400/50 text-sm mt-1">+6.75 yrs patent life recovered → <span className="text-white/70 font-normal">$1.35B in monopoly revenue</span></p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── 03: TECHNOLOGY & DATA ENGINE ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">03 — The Technology & Data Engine</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Solving the<br /><span className="font-normal">Cold-Start Problem.</span>
          </h2>
          <p className="text-white/55 font-light text-lg max-w-2xl mb-16 leading-relaxed">
            You cannot scrape physical manufacturing data from the internet. To build a 10B parameter model, we had to build a proprietary data engine.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            {
              num: "I", label: "3D Microstructure Generation", color: "text-blue-300", border: "border-blue-500/20", bg: "bg-blue-950/5",
              stat: "95%", statSub: "morphological accuracy vs real SEM data",
              desc: "We algorithmically generate synthetic, 3D physical structures. Validated against real-world Scanning Electron Microscope data.",
            },
            {
              num: "II", label: "DNS Data Engine", color: "text-violet-300", border: "border-violet-500/20", bg: "bg-violet-950/5",
              stat: "M+", statSub: "high-fidelity synthetic training points",
              desc: "Using our sovereign GPU allocation and Google JAX frameworks, we run Direct Numerical Simulations to generate massive training datasets.",
            },
            {
              num: "III", label: "MoE Architecture", color: "text-emerald-300", border: "border-emerald-500/20", bg: "bg-emerald-950/5",
              stat: "10B", statSub: "parameter Neural Operator",
              desc: "Advancing from FNOs (Fourier Neural Operators) to UPT (Universal Physics Transformers), unified in a Mixture of Experts architecture.",
            },
          ].map((p, i) => (
            <motion.div key={i} {...fade} transition={{ delay: i * 0.1 }} className={`p-8 rounded-2xl border ${p.border} ${p.bg} flex flex-col`}>
              <span className={`font-mono text-4xl font-bold leading-none ${p.color} opacity-25 mb-4`}>{p.num}</span>
              <p className="text-white/35 text-xs uppercase tracking-wider mb-3">{p.label}</p>
              <p className={`text-3xl font-light ${p.color} mb-0.5`}>{p.stat}</p>
              <p className="text-white/30 text-xs mb-5">{p.statSub}</p>
              <p className="text-white/60 font-light text-sm leading-relaxed flex-grow">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fade} transition={{ delay: 0.15 }} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-white/40 text-sm font-light">Legacy solvers (COMSOL, Ansys):</p>
            <p className="text-white/50 font-mono text-sm line-through">Months per simulation. Mathematically impossible to invert.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <p className="text-emerald-300 font-mono text-sm">Neural Operators:</p>
            <p className="text-white font-mono text-sm">Milliseconds. Fully invertible.</p>
          </div>
        </motion.div>
      </section>

      {/* ─── 04: PRODUCT OUTPUT ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">04 — Product Output: What The User Gets</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            A two-way<br /><span className="font-normal">engineering engine.</span>
          </h2>
          <p className="text-white/55 font-light text-lg max-w-2xl mb-16 leading-relaxed">
            The LPM operates in both directions. It can predict physical failure — and it can invert that logic to generate a factory blueprint from scratch.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Forward Model */}
          <motion.div {...fade} className="rounded-2xl border border-white/8 bg-white/[0.015] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
              <p className="text-white/35 text-xs uppercase tracking-[0.25em]">The Forward Model — Predict Failure</p>
            </div>
            <div className="p-6 md:p-8 flex-grow space-y-5">
              <div>
                <p className="text-white/30 text-xs font-mono uppercase mb-2">Input</p>
                <div className="p-4 rounded-xl bg-black/40 border border-white/8 font-mono text-sm text-white/70 leading-relaxed">
                  &quot;If we run this molecule at 400 RPM and 150°C in a 5,000L tank, what happens?&quot;
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-px h-5 bg-white/10" />
                  <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <ChevronRight className="w-3 h-3 text-white/40 rotate-90" />
                  </div>
                  <div className="w-px h-5 bg-white/10" />
                </div>
              </div>
              <div>
                <p className="text-white/30 text-xs font-mono uppercase mb-2">Output — 90%+ Accuracy</p>
                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 font-mono text-sm text-blue-200/80 leading-relaxed">
                  AI predicts the exact physical degradation and system failure point in milliseconds.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Inverse Model */}
          <motion.div {...fade} transition={{ delay: 0.1 }} className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-emerald-500/10 bg-emerald-950/10">
              <p className="text-emerald-400/50 text-xs uppercase tracking-[0.25em]">The Inverse Model — Generative Process Compiler</p>
            </div>
            <div className="p-6 md:p-8 flex-grow space-y-5">
              <div>
                <p className="text-emerald-300/40 text-xs font-mono uppercase mb-2">Desired Outcome</p>
                <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/15 font-mono text-sm text-white/70 leading-relaxed">
                  &quot;We need to output 1,000 kg of this molecule per day without it breaking.&quot;
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-px h-5 bg-emerald-500/15" />
                  <div className="w-5 h-5 rounded-full bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center">
                    <ChevronRight className="w-3 h-3 text-emerald-400/60 rotate-90" />
                  </div>
                  <div className="w-px h-5 bg-emerald-500/15" />
                </div>
              </div>
              <div>
                <p className="text-emerald-300/40 text-xs font-mono uppercase mb-2">Generated Factory Blueprint</p>
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-sm text-emerald-100/70 leading-relaxed space-y-1.5">
                  {["Exact flow rates required", "Thermal limits per stage", "Pressure thresholds", "Binder percentages"].map((line, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-emerald-400/60 shrink-0" />
                      <span className="font-mono text-xs">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 05: OPEN SOURCE STRATEGY ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">05 — The Strategy: Why Open Source?</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Kill the competition.<br /><span className="font-normal">Capture the enterprise.</span>
          </h2>
          <p className="text-white/55 font-light text-lg max-w-2xl mb-16 leading-relaxed">
            Our strategy is a two-tier model. Give away the calculator. Sell the answers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden mb-10">
          <motion.div {...fade} className="bg-[#060606] p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-white/15 font-mono text-5xl font-bold leading-none">1</span>
              <div>
                <p className="text-white/35 text-xs uppercase tracking-[0.2em] mb-0.5">Distribution</p>
                <p className="text-white font-light text-xl">The Open-Source Base Model</p>
              </div>
            </div>
            <p className="text-white/60 font-light leading-relaxed mb-5">
              We will open-source the 10B foundational physics solver. By giving academia and engineers a tool that is <span className="text-white font-normal">1,000x faster than Ansys or COMSOL for free</span>, we starve legacy competitors of their future user base.
            </p>
            <div className="p-4 rounded-xl bg-white/[0.025] border border-white/5">
              <p className="text-white/40 font-mono text-sm italic">&ldquo;Instantly establish Shodh AI as the global default standard.&rdquo;</p>
            </div>
          </motion.div>

          <motion.div {...fade} transition={{ delay: 0.1 }} className="bg-white/[0.02] p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-emerald-300/15 font-mono text-5xl font-bold leading-none">2</span>
              <div>
                <p className="text-emerald-400/40 text-xs uppercase tracking-[0.2em] mb-0.5">Monetization</p>
                <p className="text-white font-light text-xl">The Proprietary Enterprise Model</p>
              </div>
            </div>
            <p className="text-white/60 font-light leading-relaxed mb-5">
              The open-source model knows universal physics, but it does not know a company&apos;s proprietary factory secrets. We fine-tune the LPM <span className="text-white font-normal">inside a customer&apos;s secure environment</span> using their historical failure data. We sell them a closed, proprietary &ldquo;Process Compiler&rdquo; custom-built for their exact factories.
            </p>
            <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-500/20">
              <p className="text-emerald-300/60 font-mono text-sm italic">&ldquo;Software can be open-sourced. Physical reality cannot.&rdquo;</p>
            </div>
          </motion.div>
        </div>

        <motion.div {...fade} transition={{ delay: 0.15 }} className="p-6 rounded-2xl bg-white/[0.015] border border-white/5 flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center justify-between">
          <p className="text-white/50 font-light text-sm">The open-source community gets:</p>
          <p className="text-white font-light">The base physics solver.</p>
          <div className="w-px h-5 bg-white/10 hidden md:block" />
          <p className="text-white/50 font-light text-sm">The enterprise gets:</p>
          <p className="text-emerald-300 font-light">The proprietary scale-up blueprint.</p>
        </motion.div>
      </section>

      {/* ─── 06: VALIDATION & ANCHORS ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">06 — Industry Validation & Anchors</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            The physics of scale-up<br /><span className="font-normal">is universal.</span>
          </h2>
          <p className="text-white/55 font-light text-lg max-w-2xl mb-16 leading-relaxed">
            Fluid moving through a bioreactor is mathematically identical to fluid moving through a solid-state battery. We are proving the LPM across three highly distinct trillion-dollar verticals <span className="text-white font-normal">right now.</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {ANCHORS.map((a, i) => (
            <motion.div key={i} {...fade} transition={{ delay: i * 0.1 }} className={`p-8 rounded-2xl border ${a.border} ${a.bg} flex flex-col`}>
              <p className={`text-3xl md:text-4xl font-bold mb-2 ${a.color}`}>{a.name}</p>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{a.vertical}</p>
              <p className="text-white font-light text-sm italic mb-4">{a.problem}</p>
              <p className="text-white/55 font-light text-sm leading-relaxed flex-grow">{a.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fade} transition={{ delay: 0.2 }} className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
          <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-3">Advisory Board & Early Backers</p>
          <p className="text-white/65 font-light leading-relaxed">
            Arun Seth &nbsp;·&nbsp; <span className="text-white font-normal">Kiran Mazumdar-Shaw</span> (Founder, Biocon) &nbsp;·&nbsp; <span className="text-white font-normal">Deepak Jain</span> (CEO, Jubilant Ingrevia)
          </p>
        </motion.div>
      </section>

      {/* ─── 07: THE PROOF ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">07 — The Proof: Our AlphaFold Moment</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            25-day blind<br /><span className="font-normal">Sim-to-Real sprint.</span>
          </h2>
          <p className="text-white/55 font-light text-lg max-w-2xl mb-16 leading-relaxed">
            To validate the underlying physics engine, we ran a blind sprint on solid-state batteries — one of the most complex multiphysics environments in materials science.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            {
              step: "01", title: "AI Generation",
              desc: "Prompted the LPM to generate 5 unique battery microstructures and their exact manufacturing recipes — pressure, binder %, mixing ratios.",
              color: "text-blue-300", border: "border-blue-500/20", bg: "bg-blue-950/5",
            },
            {
              step: "02", title: "AI Prediction",
              desc: "The AI predicted the exact failure point (e.g., Cycle 1,420) of these new batteries with zero historical data. 100% Zero-Shot.",
              color: "text-violet-300", border: "border-violet-500/20", bg: "bg-violet-950/5",
            },
            {
              step: "03", title: "Physical Build & Test",
              desc: "We physically manufactured the AI's recipes in the wet lab. The materials were built from scratch using only the AI's generated blueprint.",
              color: "text-orange-300", border: "border-orange-500/20", bg: "bg-orange-950/5",
            },
            {
              step: "04", title: "The Result",
              desc: "Physical batteries matched the AI's digital microstructure. The AI accurately predicted the physical failure point.",
              color: "text-emerald-300", border: "border-emerald-500/20", bg: "bg-emerald-950/10",
            },
          ].map((s, i) => (
            <motion.div key={i} {...fade} transition={{ delay: i * 0.08 }} className={`p-6 rounded-2xl border ${s.border} ${s.bg} flex flex-col`}>
              <span className={`font-mono text-3xl font-bold leading-none ${s.color} opacity-30 mb-3`}>{s.step}</span>
              <p className="text-white font-light text-base mb-3">{s.title}</p>
              <p className="text-white/50 font-light text-sm leading-relaxed flex-grow">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fade} transition={{ delay: 0.15 }} className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-blue-950/20 via-transparent to-emerald-950/20 border border-white/8 text-center">
          <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-4">Zero-Shot Accuracy</p>
          <p className="text-6xl md:text-8xl font-extralight text-white mb-4">~70%</p>
          <p className="text-white/60 font-light text-lg max-w-2xl mx-auto">
            We didn&apos;t just guess the material; <span className="text-white font-normal">our AI wrote the physical instructions to scale it.</span>
          </p>
          <p className="text-white/35 font-light text-sm mt-3">70% accuracy today → perfect factory blueprints for the world&apos;s industrial giants tomorrow.</p>
        </motion.div>
      </section>

      {/* ─── 08: REVENUE ARCHITECTURE ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">08 — The Revenue Architecture</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Three compounding<br /><span className="font-normal">revenue layers.</span>
          </h2>
          <p className="text-white/55 font-light text-lg max-w-2xl mb-16 leading-relaxed">
            We operate on three layers for enterprise partners — from immediate NRE cash flow to perpetual royalties on global physical output.
          </p>
        </motion.div>

        <div className="space-y-px rounded-2xl overflow-hidden border border-white/5">
          {REVENUE_TIERS.map((t, i) => (
            <motion.div key={i} {...fade} transition={{ delay: i * 0.1 }} className={`p-8 md:p-10 bg-[#060606] ${i > 0 ? "border-t border-white/5" : ""} ${t.bg}`}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                <div className="md:w-20 shrink-0">
                  <span className={`font-mono text-4xl md:text-5xl font-bold leading-none ${t.color} opacity-30`}>{t.num}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-1">{t.tag}</p>
                  <h3 className="text-xl md:text-2xl font-light text-white mb-3">{t.title}</h3>
                  <p className="text-white/60 font-light text-base leading-relaxed max-w-2xl mb-4">{t.desc}</p>
                  <p className={`text-sm font-mono font-medium ${t.color}`}>{t.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── 09: THE ASK & CAPITAL STACK ─── */}
      <section className="px-6 py-28 md:py-40 max-w-6xl mx-auto">
        <motion.div {...fade}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">09 — The Ask & The $100M Capital Stack</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            $100M to build the<br /><span className="font-normal">foundation model for physics.</span>
          </h2>
          <p className="text-white/55 font-light text-lg max-w-2xl mb-4 leading-relaxed">
            We are structuring a $100M capitalization to build the foundation model for the physical world and capture the global market.
          </p>
          <p className="text-white/35 font-light max-w-2xl mb-16">
            <span className="text-emerald-300 font-normal">$50M in sovereign, non-dilutive backing is already secured.</span> Your $50M equity check punches like a $100M check. Zero VC burn on compute or lab infrastructure.
          </p>
        </motion.div>

        {/* Capital table */}
        <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden mb-16">
          {[
            {
              amount: "$25M", source: "Sovereign Compute", tag: "Secured", tagColor: "text-emerald-300", tagBg: "bg-emerald-950/40 border-emerald-500/30",
              desc: "IndiaAI Mission allocation for priority national GPU/TPU clusters.", note: "Zero VC burn on core model training.",
            },
            {
              amount: "$25M", source: "Autonomous Lab Infrastructure", tag: "Secured", tagColor: "text-emerald-300", tagBg: "bg-emerald-950/40 border-emerald-500/30",
              desc: "ANRF funding for wet-lab validation and robotic synthesis infrastructure.", note: "Zero VC burn on hardware.",
            },
            {
              amount: "$50M", source: "The Equity Raise", tag: "Active", tagColor: "text-white", tagBg: "bg-white/5 border-white/20",
              desc: "Hire elite global AI researchers. Deploy federated engineering teams to anchor partners. Execute global market capture.", note: "100% deployed on talent and GTM.",
            },
          ].map((item, i) => (
            <motion.div key={i} {...fade} transition={{ delay: i * 0.1 }} className={`bg-[#060606] p-8 md:p-10 ${i === 2 ? "bg-white/[0.02]" : ""}`}>
              <p className="text-4xl md:text-5xl font-light text-white mb-2">{item.amount}</p>
              <p className="text-white/65 text-sm font-light mb-2">{item.source}</p>
              <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full border ${item.tagBg} ${item.tagColor} mb-4`}>{item.tag}</span>
              <p className="text-white/40 text-xs leading-relaxed mb-2">{item.desc}</p>
              <p className="text-white/25 text-xs italic">{item.note}</p>
            </motion.div>
          ))}
        </div>

        {/* GTM Timeline */}
        <div className="mb-16 space-y-3">
          <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-6">Go-To-Market Roadmap — What the $50M buys</p>
          {GTM_PHASES.map((p, i) => (
            <motion.div key={i} {...fade} transition={{ delay: i * 0.1 }} className={`p-6 md:p-8 rounded-2xl border-l-2 border ${p.color} bg-white/[0.015]`}>
              <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                <div className="md:w-40 shrink-0">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{p.phase}</p>
                  <p className={`text-sm font-mono ${p.numColor} mb-1`}>{p.months}</p>
                  <p className="text-white font-light text-sm">{p.title}</p>
                </div>
                <ul className="flex-1 space-y-2">
                  {p.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/50 font-light leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-white/25 mt-0.5 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <motion.div {...fade} transition={{ delay: 0.1 }} className="text-center pt-16 border-t border-white/5">
          <p className="text-white/25 font-light tracking-[0.2em] mb-4">Language came. Code came.</p>
          <h2 className="text-5xl md:text-8xl font-extralight tracking-tight mb-6">Science is here.</h2>
          <p className="text-white/40 font-light text-lg max-w-lg mx-auto mb-12 leading-relaxed">
            We are not just discovering the future.<br />
            <span className="text-white">We are manufacturing it.</span>
          </p>
          <a
            href="mailto:arastu@shodh.ai"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all text-base"
          >
            <Mail className="w-5 h-5" />
            Partner with Us — arastu@shodh.ai
          </a>
        </motion.div>
      </section>
    </div>
  );
}
