"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Mail, Zap, Maximize2, X, Settings, TrendingDown,
  ChevronRight, Layers, Waves, Battery, Shield, Beaker, Leaf,
  Cpu, Factory, Droplets, BrainCircuit, Database,
} from "lucide-react";
import LineChart from "./LineChart";

const visionItems = [
  {
    id: "energy",
    industry: "Clean Energy",
    Icon: Battery,
    color: "blue",
    prompt: "Design a solid-state battery that charges in 60 seconds, uses zero lithium, and cannot catch fire.",
    physics: ["Phase Field (crystal growth)", "Electromagnetism", "Solid Mechanics"],
    impact: "Fossil fuels become economically obsolete. Electric jets become viable. Infinite grid storage unlocked.",
  },
  {
    id: "defense",
    industry: "Defense & Space",
    Icon: Shield,
    color: "violet",
    prompt: "Generate the 3D-printer laser path to fuse an alloy that survives atmospheric reentry at Mach 15 without micro-fractures.",
    physics: ["Heat Transfer (Fourier)", "Solid Mechanics (von Mises)", "Fluid Dynamics"],
    impact: "Hypersonic travel and permanent lunar/Martian habitats become structurally possible. Zero-defect aerospace.",
  },
  {
    id: "pharma",
    industry: "Pharma & Bio",
    Icon: Beaker,
    color: "emerald",
    prompt: "Output the blueprint for a suitcase-sized micro-reactor capable of continuously synthesizing cheap insulin from raw chemicals.",
    physics: ["Chemical Kinetics (Arrhenius)", "Navier-Stokes (micro-fluids)"],
    impact: "Decentralized medicine. Life-saving drugs printed locally, anywhere. End of vulnerable global supply chains.",
  },
  {
    id: "climate",
    industry: "Climate Tech",
    Icon: Leaf,
    color: "lime",
    prompt: "Design a porous bio-scaffold that perfectly mimics a leaf to convert atmospheric CO2 and sunlight into liquid fuel.",
    physics: ["Fick's Law (Diffusion)", "Porous Media Flows", "Chemical Kinetics"],
    impact: "Synthetic terraforming. Stop drilling for oil. Start printing drop-in fuels out of thin air.",
  },
  {
    id: "semi",
    industry: "Semiconductors",
    Icon: Cpu,
    color: "cyan",
    prompt: "Design a 3D architecture for a microchip that processes light instead of electricity, reducing heat by 99%.",
    physics: ["Maxwell's Equations", "Heat Transfer (Fourier)"],
    impact: "The post-silicon era. Computations 1000x faster, 1000x less energy. Powers the next generation of AI.",
  },
  {
    id: "industry",
    industry: "Heavy Industry",
    Icon: Factory,
    color: "orange",
    prompt: "Discover a catalyst that allows us to manufacture zero-emission green steel at room temperature.",
    physics: ["Fick's Law", "Thermodynamics", "Navier-Stokes"],
    impact: "Decarbonizing dirt. Eliminate 15% of global emissions from raw material and cement manufacturing.",
  },
  {
    id: "water",
    industry: "Clean Water",
    Icon: Droplets,
    color: "sky",
    prompt: "Design a scalable biomimetic porous membrane that filters salt from seawater using only ambient kinetic energy.",
    physics: ["Fick's Law (Osmosis)", "Electromagnetism (Ion rejection)", "Solid Mechanics"],
    impact: "Infinite freshwater. Drought becomes technologically obsolete. Unlock growth for the Global South.",
  },
  {
    id: "computing",
    industry: "Next-Gen AI Compute",
    Icon: BrainCircuit,
    color: "rose",
    prompt: "Design the 3D micro-fluidic cooling architecture to be printed directly inside a 2nm AI chip to dissipate 1000 watts of heat.",
    physics: ["Fourier's Law (Heat Transfer)", "Navier-Stokes (micro-fluids)", "Thermodynamics"],
    impact: "Moore's Law is dying because chips melt. Shodh AI generates the cooling architectures to build 100x more powerful AI clusters.",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  blue:   { bg: "bg-blue-500/10",   border: "border-blue-500/30",   text: "text-blue-300",   glow: "shadow-blue-500/20" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-300", glow: "shadow-violet-500/20" },
  emerald:{ bg: "bg-emerald-500/10",border: "border-emerald-500/30",text: "text-emerald-300",glow: "shadow-emerald-500/20" },
  lime:   { bg: "bg-lime-500/10",   border: "border-lime-500/30",   text: "text-lime-300",   glow: "shadow-lime-500/20" },
  cyan:   { bg: "bg-cyan-500/10",   border: "border-cyan-500/30",   text: "text-cyan-300",   glow: "shadow-cyan-500/20" },
  orange: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-300", glow: "shadow-orange-500/20" },
  sky:    { bg: "bg-sky-500/10",    border: "border-sky-500/30",    text: "text-sky-300",    glow: "shadow-sky-500/20" },
  rose:   { bg: "bg-rose-500/10",   border: "border-rose-500/30",   text: "text-rose-300",   glow: "shadow-rose-500/20" },
};

export default function MasterDeckPage() {
  const [expandedAlphaFoldView, setExpandedAlphaFoldView] = useState<"chart" | "matrices" | null>(null);
  const [activeVision, setActiveVision] = useState(0);
  const [displayedPrompt, setDisplayedPrompt] = useState("");
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fullText = visionItems[activeVision].prompt;
    setDisplayedPrompt("");
    let i = 0;
    if (typingRef.current) clearInterval(typingRef.current);
    typingRef.current = setInterval(() => {
      i++;
      setDisplayedPrompt(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(typingRef.current!);
    }, 16);
    return () => { if (typingRef.current) clearInterval(typingRef.current); };
  }, [activeVision]);

  const active = visionItems[activeVision];
  const colors = colorMap[active.color];

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">Back</span>
          </Link>
          <span className="text-xs font-light tracking-[0.3em] uppercase text-white/30">Shodh AI — Master Deck</span>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06)_0%,transparent_70%)]" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-xs font-light tracking-[0.4em] uppercase text-white/30 mb-8">Confidential Investor Briefing</p>
          <h1 className="text-5xl md:text-8xl font-extralight tracking-tight mb-6 leading-none">
            The Large<br /><span className="font-normal text-white">Physics Model</span>
          </h1>
          <p className="text-lg md:text-xl text-white/40 font-light max-w-xl mx-auto mt-8">
            Shodh AI · Built in India · Made for the World
          </p>
        </motion.div>
      </section>

      {/* ─── SECTION 1: IDENTITY ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/25 mb-8">01 — Identity</p>
          <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-16 max-w-4xl">
            Backed by the IndiaAI Mission.<br />
            <span className="text-white/50">200,000 GPUs.</span><br />
            Physical engineering<br />as a <span className="font-normal">software calculation.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { label: "GPU Cluster", value: "200,000", sub: "Sovereign Indian compute — priority access, free of cost" },
              { label: "GPU Value", value: "$25M", sub: "Equivalent compute secured from IndiaAI Mission" },
              { label: "Mandate", value: "1 of 12", sub: "Companies selected by IndiaAI Mission for foundational models" },
            ].map((s, i) => (
              <div key={i} className="bg-[#060606] p-8 md:p-10">
                <p className="text-xs text-white/25 uppercase tracking-wider mb-3">{s.label}</p>
                <p className="text-4xl md:text-5xl font-light text-white mb-3">{s.value}</p>
                <p className="text-sm text-white/40 font-light leading-relaxed">{s.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION 2: PARADIGM ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-t border-white/5">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/25 mb-8">02 — Paradigm</p>
          <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-16 max-w-4xl">
            LLMs learned the<br />grammar of <span className="text-white/40">text.</span><br />
            We learn the grammar<br />of the <span className="font-normal">physical world.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            <div className="space-y-2">
              <p className="text-white/25 text-sm uppercase tracking-wider mb-4">2022 — LLMs</p>
              <p className="text-white/50 text-xl font-light">Ingested the entire internet.</p>
              <p className="text-white/30 font-light">Scaling law: more text → better language.</p>
            </div>
            <div className="space-y-2 border-l border-white/10 pl-8">
              <p className="text-white/50 text-sm uppercase tracking-wider mb-4">Today — Shodh AI</p>
              <p className="text-white text-xl font-light">Ingesting millions of physical simulations.</p>
              <p className="text-white/60 font-light">Scaling law: more industrial data → deeper physical understanding.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION 3: 10-YEAR VISION / TERMINAL ─── */}
      <section className="py-28 md:py-36 border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs tracking-[0.3em] uppercase text-white/25 mb-8">03 — The 10-Year Vision</p>
            <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-6 max-w-4xl">
              Programmable<br /><span className="font-normal">Matter.</span>
            </h2>
            <p className="text-white/40 font-light max-w-xl">
              Once our LPM achieves true generalization, we stop optimizing legacy factories. We unlock the ability to prompt the physical world.
            </p>
          </motion.div>
        </div>

        <div className="px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* Industry tabs */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {visionItems.map((item, i) => {
                const c = colorMap[item.color];
                const isActive = activeVision === i;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveVision(i)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all shrink-0 lg:shrink border ${
                      isActive
                        ? `${c.bg} ${c.border} ${c.text}`
                        : "bg-white/[0.02] border-white/5 text-white/40 hover:text-white/70 hover:bg-white/5"
                    }`}
                  >
                    <item.Icon className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-light whitespace-nowrap">{item.industry}</span>
                  </button>
                );
              })}
            </div>

            {/* Terminal panel */}
            <motion.div
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl border ${colors.border} bg-black/60 backdrop-blur-sm overflow-hidden`}
            >
              {/* Terminal titlebar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <span className="text-xs text-white/20 font-mono ml-3">shodh-ai — lpm-v2 — prompt</span>
              </div>

              <div className="p-6 md:p-10 space-y-8 font-mono">
                {/* Prompt */}
                <div>
                  <p className="text-white/25 text-xs mb-3 uppercase tracking-wider">User Prompt</p>
                  <p className="text-xs text-white/30 mb-1">&gt; input:</p>
                  <p className={`text-base md:text-lg ${colors.text} leading-relaxed`}>
                    "{displayedPrompt}
                    <span className="animate-pulse">▋</span>"
                  </p>
                </div>

                {/* Physics */}
                <div>
                  <p className="text-white/25 text-xs mb-3 uppercase tracking-wider">Physics Engine — Coupling</p>
                  <div className="space-y-1.5">
                    {active.physics.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                        <span className="text-white/20">◆</span>
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className={`rounded-xl ${colors.bg} border ${colors.border} p-5`}>
                  <p className="text-white/25 text-xs mb-3 uppercase tracking-wider font-sans">10-Year Grand Impact</p>
                  <p className={`text-base font-sans font-light ${colors.text} leading-relaxed`}>{active.impact}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: LANDSCAPE ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/25 mb-8">04 — The Landscape</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Where every molecule<br />goes to die.
          </h2>
          <p className="text-white/35 font-light max-w-xl mb-20">
            Three sequential stages take a new material from idea to industrial reality. AI has transformed the first two. The third remains completely unsolved.
          </p>
        </motion.div>

        {/* Timeline track — desktop only */}
        <div className="hidden lg:flex items-center mb-3">
          <div className="w-3 h-3 rounded-full bg-[#060606] border border-white/20 shrink-0" />
          <div className="flex-1 h-px bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-[#060606] border border-white/20 shrink-0" />
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-rose-500/40" />
          <div className="w-5 h-5 rounded-full bg-rose-500 shadow-[0_0_18px_rgba(244,63,94,0.5)] shrink-0" />
        </div>
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-10">
          {["01 — Digital Discovery", "02 — Lab Synthesis", "03 — Industrial Scale-Up"].map((l, i) => (
            <p key={i} className={`text-xs uppercase tracking-wider ${i === 2 ? "text-rose-400/60" : "text-white/20"}`}>{l}</p>
          ))}
        </div>

        {/* Stage cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              num: "01",
              stage: "Digital Discovery",
              players: ["Isomorphic Labs", "Schrödinger", "Recursion"],
              desc: "AI models predict molecular structures, binding affinities, and material properties entirely in silico. Billions of candidates screened in days.",
              gap: "The output is a digital prediction. The physical behaviour of that molecule at scale remains completely untested.",
              time: "Days",
              border: "border-white/5",
              bg: "bg-white/[0.01]",
              numColor: "text-white/5",
              tagBorder: "border-white/8",
              tagText: "text-white/30",
              gapColor: "text-white/20",
            },
            {
              num: "02",
              stage: "Lab Synthesis",
              players: ["Radical AI", "Emerald Cloud Lab", "Arcadia Science"],
              desc: "Autonomous robotic labs synthesize and characterize milligrams of material. Proof of physical existence in weeks.",
              gap: "At milligram scale, the turbulence, heat, and pressure of an industrial reactor simply do not apply. The leap to production is still blind.",
              time: "Weeks",
              border: "border-white/5",
              bg: "bg-white/[0.01]",
              numColor: "text-white/5",
              tagBorder: "border-white/8",
              tagText: "text-white/30",
              gapColor: "text-white/20",
            },
            {
              num: "03",
              stage: "Industrial Scale-Up",
              players: ["Shodh AI"],
              desc: "The LPM generates the complete manufacturing blueprint: reactor geometry, fluid dynamics, thermal profiles, and process parameters for 10,000-ton production.",
              gap: "Ours to own.",
              time: "Months — not years",
              border: "border-rose-500/20",
              bg: "bg-rose-950/10",
              numColor: "text-rose-500/10",
              tagBorder: "border-rose-500/25",
              tagText: "text-rose-300/60",
              gapColor: "text-rose-400/50",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`rounded-xl border ${s.border} ${s.bg} p-7 md:p-9 flex flex-col`}
            >
              <p className={`text-[52px] font-extralight leading-none mb-5 ${s.numColor}`}>{s.num}</p>
              <h3 className={`text-lg md:text-xl font-light mb-4 ${i === 2 ? "text-white" : "text-white/70"}`}>{s.stage}</h3>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {s.players.map((p, j) => (
                  <span key={j} className={`text-xs px-2.5 py-1 rounded-full border ${s.tagBorder} ${s.tagText} bg-white/[0.02]`}>{p}</span>
                ))}
              </div>

              <p className="text-white/45 font-light text-sm leading-relaxed mb-5 flex-grow">{s.desc}</p>

              <div className={`pt-4 border-t ${i === 2 ? "border-rose-500/10" : "border-white/5"} flex items-start justify-between gap-4`}>
                <p className={`text-xs font-light leading-relaxed ${s.gapColor} flex-1`}>{s.gap}</p>
                <span className={`text-xs font-medium shrink-0 ${i === 2 ? "text-rose-400" : "text-white/25"}`}>{s.time}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Complementarity narrative */}
        <div className="pt-10 border-t border-white/5 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-white/25 text-xs uppercase tracking-wider mb-4">How we fit together</p>
            <p className="text-white/50 font-light leading-relaxed">
              Isomorphic Labs and Radical AI are not our competitors — they are our upstream. They hand us the molecule. We build the factory. The entire AI drug discovery and materials pipeline converges on Stage 3 as its bottleneck. We are the only team working on it.
            </p>
          </div>
          <div>
            <p className="text-white/25 text-xs uppercase tracking-wider mb-4">Our structural advantage</p>
            <p className="text-white/50 font-light leading-relaxed">
              Every dollar invested in Isomorphic, Schrödinger, or Recursion creates more demand for Shodh AI. As Stage 1 and Stage 2 accelerate, the Stage 3 bottleneck becomes more acute. We are the only exit for the pipeline.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: THE BOTTLENECK ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/25 mb-8">05 — The Bottleneck</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Cures on a shelf.<br />
            <span className="font-normal">The Biocon Problem.</span>
          </h2>
          <p className="text-white/40 font-light max-w-xl mb-20">
            New cancer solutions and miracle molecules are discovered every day. They never reach the market. The reason is always the same.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div>
              <p className="text-white/25 text-xs uppercase tracking-wider mb-4">The Situation</p>
              <p className="text-white/70 font-light leading-relaxed">Biocon's bio-enzymes can cut a 16-step drug process down to just 3 steps.</p>
            </div>
            <div>
              <p className="text-white/25 text-xs uppercase tracking-wider mb-4">The Problem</p>
              <p className="text-white/70 font-light leading-relaxed">Pump those fragile enzymes into an industrial steel reactor. The heat and fluid dynamics tear them apart. The scale-up fails. Every time.</p>
            </div>
            <div className="border-l-2 border-white/10 pl-6 py-2">
              <p className="text-white text-xl font-light">Discovery is solved.</p>
              <p className="text-rose-400 text-xl font-light">Engineering is broken.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            <p className="text-white/25 text-xs uppercase tracking-wider mb-6">The Cost of Failure</p>
            {[
              { label: "Legacy US plant", cost: "$500M", time: "5 years", highlight: false },
              { label: "Legacy India plant", cost: "$100M", time: "Years of delays", highlight: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-5 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-white/50 font-light text-sm">{item.label}</p>
                <div className="text-right">
                  <p className="text-white/60 font-medium">{item.cost}</p>
                  <p className="text-white/30 text-xs">{item.time}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-emerald-300 font-medium text-sm">Shodh AI deployment</p>
              <div className="text-right">
                <p className="text-emerald-300 font-medium">$5M</p>
                <p className="text-emerald-400/50 text-xs">6 months</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 6: THE SCIENCE ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/25 mb-8">06 — The Science</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            One model.<br /><span className="font-normal">Every industry.</span>
          </h2>
        </motion.div>

        {/* Central unified concept — animated wave gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 rounded-2xl border border-white/5 overflow-hidden"
        >
          <motion.div
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundSize: "400% 400%",
              backgroundImage: "linear-gradient(135deg, rgba(59,130,246,0.04) 0%, rgba(16,185,129,0.06) 25%, rgba(99,102,241,0.04) 50%, rgba(59,130,246,0.06) 75%, rgba(16,185,129,0.03) 100%)",
            }}
            className="p-10 md:p-16"
          >
            <div className="max-w-4xl">
              <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-8">Why one model can solve pharma, batteries, chemicals, and aerospace</p>
              <p className="text-xl md:text-2xl font-light text-white/50 leading-relaxed mb-3">
                These industries look completely different on paper.
              </p>
              <p className="text-2xl md:text-4xl font-light text-white leading-relaxed mb-3">
                Physically, they are the same problem:
              </p>
              <p className="text-3xl md:text-5xl font-light leading-tight mb-8">
                <span className="text-white">a fluid moving through</span>{" "}
                <span className="text-white/50">a porous solid</span>{" "}
                <span className="text-white">under heat,</span>{" "}
                <span className="text-white/50">pressure, and</span>{" "}
                <span className="text-white">chemical reaction.</span>
              </p>
              <p className="text-white/35 font-light text-base md:text-lg leading-relaxed">
                A drug bioreactor. A battery electrode. A carbon membrane. A steel catalyst. Strip away the industry names and the physics is identical. We coupled the five governing equations that describe this interaction into one unified model — the LPM. That is why it generalizes across everything.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <p className="text-white/25 text-xs uppercase tracking-wider mb-5">The Five Governing Equations</p>
            <p className="text-white/30 text-xs font-light mb-6">Hover to explore each layer.</p>
            <div className="space-y-1.5">
              {[
                { eq: "Navier-Stokes & Fick's Law", desc: "Fluid flow and chemical diffusion through pores.", hoverText: "hover:text-blue-300", hoverBox: "hover:bg-blue-500/5 hover:border-blue-500/20" },
                { eq: "Phase Field / Cahn-Hilliard", desc: "How materials separate, solidify, and grow dendrites.", hoverText: "hover:text-violet-300", hoverBox: "hover:bg-violet-500/5 hover:border-violet-500/20" },
                { eq: "Solid Mechanics & Fourier's Law", desc: "How materials crack, swell, and distribute heat.", hoverText: "hover:text-orange-300", hoverBox: "hover:bg-orange-500/5 hover:border-orange-500/20" },
                { eq: "Maxwell's Equations", desc: "Electrical fields and ion transport.", hoverText: "hover:text-cyan-300", hoverBox: "hover:bg-cyan-500/5 hover:border-cyan-500/20" },
                { eq: "Arrhenius Equation", desc: "Reaction kinetics — how fast chemistry happens.", hoverText: "hover:text-emerald-300", hoverBox: "hover:bg-emerald-500/5 hover:border-emerald-500/20" },
              ].map((item, i) => (
                <div key={i} className={`group flex items-start gap-4 p-4 rounded-xl border border-transparent transition-all duration-200 cursor-default ${item.hoverBox}`}>
                  <span className="text-white/15 font-mono text-xs mt-0.5 w-4 shrink-0 group-hover:text-white/30 transition-colors">{i + 1}</span>
                  <div>
                    <p className={`font-light text-sm text-white/65 transition-colors duration-200 ${item.hoverText}`}>{item.eq}</p>
                    <p className="text-white/25 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/25 text-xs uppercase tracking-wider mb-6">Training Method — The AlphaFold Blueprint</p>
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-white font-light">DeepMind's secret was Self-Distillation.</p>
                <p className="text-white/50 font-light text-sm">They had only 170,000 real proteins. Mathematically impossible to train on. So they used synthetic data anchored by a small real foundation.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-4">
                <div className="flex items-center gap-4">
                  <Database className="w-5 h-5 text-blue-300 shrink-0" />
                  <div>
                    <p className="text-white/60 text-sm font-light">95% — Synthetic PDE Simulations</p>
                    <p className="text-white/30 text-xs">200,000 IndiaAI GPUs generating physics simulations at scale</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Zap className="w-5 h-5 text-emerald-300 shrink-0" />
                  <div>
                    <p className="text-white/60 text-sm font-light">5% — Real-World Physical Data</p>
                    <p className="text-white/30 text-xs">High-fidelity robotic lab data to anchor the simulation</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <p className="text-white font-medium text-sm">= Large Physics Model that doesn't hallucinate.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: FINANCIAL TAM ─── */}
      <section className="py-28 md:py-36 border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs tracking-[0.3em] uppercase text-white/25 mb-8">07 — Financial TAM</p>
            <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-4xl">
              Every wasted year in a lab<br />is a <span className="font-normal">destroyed billion in value.</span>
            </h2>
            <p className="text-white/35 font-light max-w-2xl mb-20">
              Our market is not the size of manufacturing. It is the R&D capital burned and the patent life lost because the physical world has no compiler. We built the compiler.
            </p>
          </motion.div>

          {/* ── THE UNIT ECONOMICS EQUATION ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <p className="text-xs tracking-[0.3em] uppercase text-white/20 mb-8">The Core Equation — Per Asset</p>
            <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/5">
              <div className="p-10 md:p-14 bg-white/[0.01] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between">
                <p className="text-white/20 text-xs uppercase tracking-wider mb-6">Legacy: Physical Trial-and-Error</p>
                <div className="space-y-3">
                  <p className="text-[64px] md:text-[90px] font-bold text-white/10 line-through leading-none">$500M</p>
                  <p className="text-[48px] md:text-[64px] font-bold text-white/10 line-through leading-none">7 Years</p>
                </div>
                <p className="text-white/25 font-light mt-6 text-sm leading-relaxed">
                  Failed syntheses, steel reactor fires, batch inconsistency, repeated physical builds. Patent life ticking down with every wasted month.
                </p>
              </div>
              <div className="p-10 md:p-14 bg-emerald-950/20 flex flex-col justify-between">
                <p className="text-emerald-400/40 text-xs uppercase tracking-wider mb-6">Shodh AI: LPM + Autonomous Lab</p>
                <div className="space-y-3">
                  <p className="text-[64px] md:text-[90px] font-bold text-emerald-400 leading-none">$5M</p>
                  <p className="text-[48px] md:text-[64px] font-bold text-emerald-300 leading-none">3 Months</p>
                </div>
                <p className="text-emerald-400/40 font-light mt-6 text-sm leading-relaxed">
                  LPM generates architecture + manufacturing CAD. Autonomous lab validates in weeks. Client receives the blueprint, not a prototype.
                </p>
              </div>
            </div>

            {/* Value Created row */}
            <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden mt-px">
              {[
                { label: "CapEx Saved", value: "$495M", sub: "Direct R&D cost elimination per engagement", color: "text-white" },
                { label: "Patent Life Recovered", value: "+6.75 yrs", sub: "Patents last 20 years. At $200M/yr profit → $1.35B in new monopoly revenue", color: "text-white" },
                { label: "Shodh AI Revenue", value: "$5M + 3–5%", sub: "Upfront compute fee + royalty on manufactured product. $50M+ per successful discovery.", color: "text-emerald-300" },
              ].map((item, i) => (
                <div key={i} className="bg-[#060606] p-7 md:p-9">
                  <p className="text-white/20 text-xs uppercase tracking-wider mb-3">{item.label}</p>
                  <p className={`text-2xl md:text-3xl font-light mb-2 ${item.color}`}>{item.value}</p>
                  <p className="text-white/35 text-xs font-light leading-relaxed">{item.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── THREE HORIZONS ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <p className="text-xs tracking-[0.3em] uppercase text-white/20 mb-8">Three Business Model Horizons</p>
            <div className="space-y-px rounded-2xl overflow-hidden border border-white/5">
              {[
                {
                  horizon: "H1",
                  title: "Compute & Synthesis",
                  label: "Serviceable Obtainable Market",
                  tam: "$100B / yr",
                  tamColor: "text-white",
                  desc: "Companies paying to run their existing R&D through our LPM and Autonomous Labs. Global R&D spend in heavy industry, materials, and pharma is ~$1.5 Trillion/yr. 70% is wasted on failed physical experiments. We replace that waste with AI compute.",
                  model: "Contract fees per engagement",
                },
                {
                  horizon: "H2",
                  title: "IP & Milestone Licensing",
                  label: "Serviceable Addressable Market",
                  tam: "$250B / yr",
                  tamColor: "text-blue-300",
                  desc: "Shodh AI co-owns the intellectual property. We discover the molecule/alloy, license the patent to Boeing, Pfizer, or Tesla, and receive milestone payouts. The Isomorphic Labs / Schrödinger model: $1B–$3B per asset in biobucks. Replicated across batteries, space, and bio.",
                  model: "Co-IP + milestone payments",
                },
                {
                  horizon: "H3",
                  title: "Programmable Matter API",
                  label: "Total Addressable Market",
                  tam: "$1T+",
                  tamColor: "text-emerald-300",
                  desc: "Every time a localized micro-reactor prints a cancer drug, or a 3D printer builds a hypersonic part using our zero-defect CAD file, our software takes a microscopic royalty — an API call for the physical world. We become the AWS of physical goods.",
                  model: "Per-unit software royalty",
                },
              ].map((h, i) => (
                <div key={i} className={`p-8 md:p-10 bg-[#060606] ${i > 0 ? "border-t border-white/5" : ""}`}>
                  <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start">
                    <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-2">
                      <span className="text-white/15 font-mono text-4xl md:text-5xl font-bold leading-none">{h.horizon}</span>
                      <div className="md:hidden w-px h-8 bg-white/5" />
                    </div>
                    <div>
                      <p className="text-white/25 text-xs uppercase tracking-wider mb-1">{h.label}</p>
                      <h3 className="text-xl md:text-2xl font-light text-white mb-3">{h.title}</h3>
                      <p className="text-white/45 font-light text-sm leading-relaxed max-w-2xl">{h.desc}</p>
                    </div>
                    <div className="md:text-right shrink-0">
                      <p className={`text-2xl md:text-3xl font-light ${h.tamColor}`}>{h.tam}</p>
                      <p className="text-white/25 text-xs mt-1">{h.model}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── VALUE COMPRESSION MATRIX ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <p className="text-xs tracking-[0.3em] uppercase text-white/20 mb-8">Value Compression Matrix</p>
            <div className="rounded-2xl overflow-hidden border border-white/5">
              {/* Header */}
              <div className="grid grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-px bg-white/5 text-xs text-white/25 uppercase tracking-wider">
                <div className="bg-[#060606] px-5 py-3">Industry</div>
                <div className="bg-[#060606] px-5 py-3">Legacy Cost / Time</div>
                <div className="bg-[#060606] px-5 py-3">Shodh AI</div>
                <div className="bg-[#060606] px-5 py-3">Economic Value Created</div>
              </div>
              {[
                {
                  industry: "Solid-State Batteries",
                  bottleneck: "Electrolyte that prevents dendrites at scale",
                  legacy: "$1B / 10 Yrs",
                  shodh: "$10M / 8 Mo",
                  value: "$990M saved + 9 yrs early-to-market ($10B+ EV share)",
                  valueColor: "text-blue-300",
                },
                {
                  industry: "Aerospace & Defense",
                  bottleneck: "Heat-resistant alloy surviving Mach 15 reentry",
                  legacy: "$400M / 6 Yrs",
                  shodh: "$3M / 3 Mo",
                  value: "$397M saved + instant qualification for next-gen defense contracts",
                  valueColor: "text-violet-300",
                },
                {
                  industry: "Bio-Manufacturing",
                  bottleneck: "Continuous-flow micro-reactors for unstable biologics",
                  legacy: "$800M / 8 Yrs",
                  shodh: "$8M / 6 Mo",
                  value: "$792M saved + 7.5 extra patent monopoly years before generics",
                  valueColor: "text-emerald-300",
                },
                {
                  industry: "Climate Tech (Carbon)",
                  bottleneck: "Catalyst for economically viable room-temp DAC",
                  legacy: "$250M / 5 Yrs",
                  shodh: "$2M / 2 Mo",
                  value: "$248M saved + unlocks billions in government green tax credits",
                  valueColor: "text-lime-300",
                },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-px bg-white/5">
                  <div className="bg-[#060606] px-5 py-5">
                    <p className="text-white/80 font-light text-sm">{row.industry}</p>
                    <p className="text-white/30 text-xs mt-1">{row.bottleneck}</p>
                  </div>
                  <div className="bg-[#060606] px-5 py-5">
                    <p className="text-white/30 font-light text-sm line-through">{row.legacy}</p>
                  </div>
                  <div className="bg-[#060606] px-5 py-5">
                    <p className="text-emerald-400 font-medium text-sm">{row.shodh}</p>
                  </div>
                  <div className="bg-[#060606] px-5 py-5">
                    <p className={`font-light text-sm leading-relaxed ${row.valueColor}`}>{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── THE ONE-LINER ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-10 md:p-14 text-center">
              <p className="text-white/25 text-xs uppercase tracking-wider mb-6">The TAM One-Liner</p>
              <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-4xl mx-auto">
                "We do not measure our TAM by the size of the manufacturing sector. We measure our TAM by the{" "}
                <span className="text-white font-normal">Trillions of dollars of GDP destroyed every year by the speed of physical time.</span>
                {" "}By turning physical trial-and-error into a compiled software problem, we capture the arbitrage between a{" "}
                <span className="text-white font-normal">10-year legacy supply chain</span> and a{" "}
                <span className="text-emerald-300 font-normal">10-day AI generation loop."</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 8: ALPHAFOLD MOMENT ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/25 mb-8">08 — The Proof</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-4 max-w-3xl">
            Our AlphaFold Moment.
          </h2>
          <p className="text-white/40 font-light max-w-xl mb-16">
            We ran a blind 25-day "Sim-to-Real" sprint. We didn't just simulate — we generated the recipe, physically built it, and predicted the degradation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch mb-12">
          {/* STEP 1 */}
          <div className="relative p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl h-full flex flex-col">
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-400 font-medium text-sm">1</div>
            <h3 className="text-xl font-medium text-white mb-6 pl-4">The AI Prediction</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <p className="text-white/60 text-sm font-mono mb-2">/prompt</p>
              <p className="text-white text-sm font-mono">"Generate 5 unique battery architectures and their manufacturing recipes."</p>
            </div>
            <div className="space-y-4 mb-6 flex-grow">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 mt-1">
                  <Settings className="w-4 h-4 text-white/70" />
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Process Generated</p>
                  <p className="text-sm text-white/90">Calendering pressure, binder %, mixing ratios.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 mt-1">
                  <TrendingDown className="w-4 h-4 text-white/70" />
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Prediction Made</p>
                  <p className="text-sm text-white/90">AI blind-predicts exact failure point (Cycle 1,420).</p>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10 mt-auto text-center">
              <p className="text-white/80 text-sm font-medium tracking-wide">Zero historical data used. 100% Zero-Shot.</p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="relative p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl h-full flex flex-col">
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-400 font-medium text-sm">2</div>
            <h3 className="text-xl font-medium text-white mb-6 pl-4">The Physical Build</h3>
            <div className="space-y-4 mb-6 flex-grow flex flex-col justify-center">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] items-center">
                <div className="space-y-2">
                  <p className="text-xs text-white/50 uppercase tracking-wider">Digital: AI-Generated</p>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black/40">
                    <img src="/GIFs_Microstrcuture/sample_003_20260206_125915_3d_render.gif" alt="AI-generated microstructure render" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center pt-6">
                  <div className="w-14 h-px bg-gradient-to-r from-indigo-300/70 to-emerald-300/70" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-white/50 uppercase tracking-wider">Physical: Actual SEM</p>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black">
                    <img src="/REAL_SEM/sample_003_20260206_125915_sem_isosurface.png" alt="Physical SEM cross-section" className="w-full h-full object-cover grayscale" />
                  </div>
                </div>
              </div>
              <button type="button" onClick={() => setExpandedAlphaFoldView("matrices")} className="self-start inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xs uppercase tracking-[0.18em]">
                <Maximize2 className="w-3.5 h-3.5" />
                View all 5 generated matrices
              </button>
            </div>
            <div className="pt-4 border-t border-white/10 mt-auto text-center">
              <p className="text-white/80 text-sm font-medium leading-relaxed">The Sim-to-Real Match: AI's digital imagination perfectly translated into physical reality.</p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="relative p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl h-full flex flex-col">
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30 text-rose-400 font-medium text-sm">3</div>
            <h3 className="text-xl font-medium text-white mb-6 pl-4">The Real-World Test</h3>
            <div className="relative bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex-grow min-h-[260px] flex items-center justify-center overflow-hidden">
              <button type="button" onClick={() => setExpandedAlphaFoldView("chart")} className="absolute top-3 left-3 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/70 hover:text-white hover:bg-black/50 transition-colors z-10 inline-flex items-center gap-2">
                <Maximize2 className="w-3.5 h-3.5" />
                Click to Expand Data
              </button>
              <LineChart className="w-full h-full min-h-[260px]" />
            </div>
            <div className="pt-4 border-t border-white/10 mt-auto text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium tracking-[0.12em] uppercase">
                <Zap className="w-3.5 h-3.5" />
                <span>~70% Zero-Shot Accuracy</span>
              </div>
              <p className="text-white/80 text-sm font-medium leading-relaxed">Accurately predicted the exact physical failure point of all 5 diverse recipes.</p>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-emerald-900/20 border border-white/10 text-center">
          <p className="text-lg md:text-xl text-white font-light leading-relaxed max-w-4xl mx-auto">
            <strong className="font-medium">The Takeaway:</strong> We didn't just guess the material; our AI wrote the physical instructions to scale it. 70% accuracy today → perfect factory blueprints for the world's industrial giants tomorrow.
          </p>
        </div>

        {/* AlphaFold Modals */}
        <AnimatePresence>
          {expandedAlphaFoldView === "chart" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl p-6 md:p-10">
              <div className="relative h-full max-w-6xl mx-auto rounded-3xl border border-white/10 bg-[#0b0b0b] shadow-2xl overflow-hidden flex flex-col">
                <button type="button" onClick={() => setExpandedAlphaFoldView(null)} className="absolute top-5 right-5 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
                <div className="p-8 md:p-10 border-b border-white/10">
                  <p className="text-xs text-white/45 uppercase tracking-[0.22em] mb-3">Expanded Data View</p>
                  <h3 className="text-2xl md:text-4xl font-light text-white mb-3">The Real-World Test</h3>
                  <p className="text-white/60 max-w-3xl leading-relaxed">Three representative curves from the 5-recipe sweep: fast-failure cell, commercial baseline, and AI-optimized architecture.</p>
                </div>
                <div className="flex-1 p-6 md:p-10 min-h-0">
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
                    <LineChart detailed className="w-full h-full min-h-[420px]" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {expandedAlphaFoldView === "matrices" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl p-6 md:p-10 overflow-y-auto">
              <div className="relative max-w-6xl mx-auto rounded-3xl border border-white/10 bg-[#0b0b0b] shadow-2xl overflow-hidden">
                <button type="button" onClick={() => setExpandedAlphaFoldView(null)} className="absolute top-5 right-5 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
                <div className="p-8 md:p-10 border-b border-white/10">
                  <p className="text-xs text-white/45 uppercase tracking-[0.22em] mb-3">Expanded Sim-to-Real View</p>
                  <h3 className="text-2xl md:text-4xl font-light text-white mb-3">All 5 Generated Matrices</h3>
                  <p className="text-white/60 max-w-3xl leading-relaxed">AI-generated voxel structures alongside the matching real SEM outputs from the wet-lab build.</p>
                </div>
                <div className="p-6 md:p-10 grid gap-6 md:grid-cols-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={`matrix-${i}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
                      <p className="text-xs text-white/45 uppercase tracking-[0.18em] mb-4">Sample {i + 1}</p>
                      <div className="grid gap-4 sm:grid-cols-2 items-center">
                        <div className="space-y-2">
                          <p className="text-[11px] text-white/50 uppercase tracking-[0.16em]">AI Generated</p>
                          <div className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/50">
                            <img src={`/GIFs_Microstrcuture/sample_00${i}_20260206_125915_3d_render.gif`} alt={`AI-generated structure ${i + 1}`} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[11px] text-white/50 uppercase tracking-[0.16em]">Real SEM</p>
                          <div className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-black">
                            <img src={`/REAL_SEM/sample_00${i}_20260206_125915_sem_isosurface.png`} alt={`Real SEM structure ${i + 1}`} className="w-full h-full object-cover grayscale" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ─── SECTION 9: GTM ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/25 mb-8">09 — Go-To-Market</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-20 max-w-3xl">
            The Co-Creation<br /><span className="font-normal">Flywheel.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden mb-12">
          {[
            {
              phase: "Phase 1",
              title: "The Co-Creators",
              sub: "Next 18–24 months",
              points: [
                "3–5 anchor partners — Biocon/Syngene, Aarti Industries, + 1 battery anchor.",
                "Embed engineers. Solve their scale-up bottlenecks.",
                "Charge upfront contract fees + revenue-share on manufactured product.",
                "They fund our training. Their proprietary sim-to-real data flows into the LPM.",
              ],
            },
            {
              phase: "Phase 2",
              title: "Generalization",
              sub: "Scale to 10 partners",
              points: [
                "Expand to 10 global Tier-1 partners (Sandoz, LG Chem, Dr. Reddy's, Novartis).",
                "Same policy: upfront contracts + revenue-sharing.",
                "LPM ingests enough high-fidelity real-world data to achieve true Generalization.",
              ],
            },
            {
              phase: "Tipping Point",
              title: "IP Monopoly",
              sub: "Proper GTM scale",
              points: [
                "No more embedded engineers. Model operates autonomously.",
                "Deploy Zero-Shot Manufacturing software globally — thousands of factories.",
                "From co-creation → pure, high-margin IP and licensing monopoly.",
              ],
            },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-[#060606] p-8 md:p-10 ${i === 2 ? "bg-white/[0.02]" : ""}`}
            >
              <p className="text-white/25 text-xs uppercase tracking-wider mb-1">{p.phase}</p>
              <h3 className="text-xl font-medium text-white mb-1">{p.title}</h3>
              <p className="text-white/30 text-xs mb-6">{p.sub}</p>
              <ul className="space-y-3">
                {p.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-white/50 font-light leading-relaxed">
                    <ChevronRight className="w-4 h-4 text-white/20 mt-0.5 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 10: THE ASK ─── */}
      <section className="px-6 py-28 md:py-40 border-t border-white/5 max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/25 mb-12">10 — The Ask</p>
          <p className="text-white/30 font-light tracking-[0.2em] mb-4">Language came. Code came.</p>
          <h2 className="text-5xl md:text-8xl font-extralight tracking-tight mb-4">Science is here.</h2>
          <p className="text-xl text-white/40 font-light mb-20 max-w-xl mx-auto">
            We are building the foundation model for the physical world. This is the capital structure.
          </p>

          <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden max-w-4xl mx-auto mb-20">
            {[
              { amount: "$25M", source: "IndiaAI Mission", desc: "Sovereign NVIDIA GPU compute" },
              { amount: "$25M", source: "ANRF", desc: "Autonomous robotic lab infrastructure" },
              { amount: "$50M", source: "Equity Round", desc: "Talent, engineering teams, global market capture" },
            ].map((item, i) => (
              <div key={i} className={`bg-[#060606] p-8 md:p-10 ${i === 2 ? "bg-white/[0.03]" : ""}`}>
                <p className="text-4xl md:text-5xl font-light text-white mb-2">{item.amount}</p>
                <p className="text-white/50 text-sm font-light mb-1">{item.source}</p>
                <p className="text-white/25 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto space-y-8">
            <p className="text-white/50 font-light leading-relaxed">
              We are raising $50M in equity to hire the world's best AI researchers, deploy Federated Data Engineering teams into our first anchor partners, and lock in the global market.
            </p>
            <div className="pt-8 border-t border-white/5">
              <h3 className="text-2xl md:text-4xl font-light text-white mb-8">
                Shodh AI is built in India.<br />
                <span className="text-white/50">We are making it for the world.</span>
              </h3>
              <a
                href="mailto:arastu@shodh.ai"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all text-lg"
              >
                <Mail className="w-5 h-5" />
                Partner with Us
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
