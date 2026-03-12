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

export default function MasterDeckPageV2() {
  const [expandedAlphaFoldView, setExpandedAlphaFoldView] = useState<"chart" | "matrices" | null>(null);
  const [activeVision, setActiveVision] = useState(0);
  const [displayedPrompt, setDisplayedPrompt] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const active = visionItems[activeVision];
  const colors = colorMap[active.color];

  return (
    <div className="min-h-screen bg-[#060606] text-white word-hover-effect" style={{ cursor: "none" }}>
      <style jsx global>{`
        .word-hover-effect p,
        .word-hover-effect h1,
        .word-hover-effect h2,
        .word-hover-effect h3,
        .word-hover-effect li,
        .word-hover-effect span {
          word-spacing: 0.15em;
        }
        .word-hover-effect p:hover,
        .word-hover-effect h1:hover,
        .word-hover-effect h2:hover,
        .word-hover-effect h3:hover,
        .word-hover-effect li:hover,
        .word-hover-effect span:hover {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: wordSweep 0.6s ease-out;
        }
        @keyframes wordSweep {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 0%; }
        }
      `}</style>
      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed z-[9999] transition-transform duration-75"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.24) 15%, rgba(255,255,255,0.10) 35%, rgba(255,255,255,0.03) 55%, transparent 75%)",
        }}
      />
      {/* Custom cursor dot */}
      <div
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.7)",
        }}
      />
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
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">01 — Identity</p>
          <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-16 max-w-4xl">
            Backed by the IndiaAI Mission.<br />
            <span className="text-white/50">200,000 GPUs.</span><br />
            <span className="font-normal">Built in India. For the World.</span>
          </h2>
          <div className="space-y-8 max-w-3xl">
            {[
              "One of 12 foundational model teams selected by the sovereign IndiaAI Mission — with priority access on national GPU compute.",
              "Mandate to build AI for Science — the foundation model for the physical world.",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-white/50 mt-2.5 shrink-0" />
                <p className="text-white/70 font-light leading-relaxed text-lg md:text-xl">{text}</p>
              </div>
            ))}
          </div>

          {/* Partner logos */}
          <div className="mt-14">
            <p className="text-xs tracking-[0.25em] uppercase text-white/30 mb-6">Built with</p>
            <div className="flex flex-wrap items-center gap-8">
              {[
                { src: "/DeepMind_logo.png", alt: "Google DeepMind" },
                { src: "/logos/google-logo.svg", alt: "Google" },
                { src: "/demo/nvidia-partner-logo.png", alt: "NVIDIA" },
                { src: "/india-ai-logo-650x311.png", alt: "IndiaAI" },
              ].map((logo) => (
                <div key={logo.alt} className="h-8 flex items-center opacity-55 hover:opacity-80 transition-opacity duration-200">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-full w-auto max-w-[120px] object-contain"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION 2: PARADIGM ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-t border-white/5">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">02 — Paradigm</p>
          <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-16 max-w-4xl">
            LLMs learned the<br />grammar of <span className="text-white/40">text.</span><br />
            We are learning the<br /><span className="font-normal">physics of the real world.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            <div className="space-y-2">
              <p className="text-white/40 text-sm uppercase tracking-wider mb-4">2022 — LLMs</p>
              <p className="text-white/50 text-xl font-light">Ingested the entire internet.</p>
              <p className="text-white/30 font-light">Scaling law: more text → better language.</p>
            </div>
            <div className="space-y-2 border-l border-white/10 pl-8">
              <p className="text-white/50 text-sm uppercase tracking-wider mb-4">Today — Shodh AI</p>
              <p className="text-white text-xl font-light">Ingesting millions of physical simulations and real-world degradation data.</p>
              <p className="text-white/60 font-light">Scaling law: more physical failure data → deeper manufacturing understanding.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION 3: 10-YEAR VISION / TERMINAL ─── */}
      <section className="py-28 md:py-36 border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">03 — The 10-Year Vision</p>
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
                <span className="text-xs text-white/35 font-mono ml-3">shodh-ai — lpm-v2 — prompt</span>
              </div>

              <div className="p-6 md:p-10 space-y-8 font-mono">
                {/* Prompt */}
                <div>
                  <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">User Prompt</p>
                  <p className="text-xs text-white/30 mb-1">&gt; input:</p>
                  <p className={`text-base md:text-lg ${colors.text} leading-relaxed`}>
                    "{displayedPrompt}
                    <span className="animate-pulse">▋</span>"
                  </p>
                </div>

                {/* Physics */}
                <div>
                  <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">Physics Engine — Coupling</p>
                  <div className="space-y-1.5">
                    {active.physics.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                        <span className="text-white/35">◆</span>
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className={`rounded-xl ${colors.bg} border ${colors.border} p-5`}>
                  <p className="text-white/40 text-xs mb-3 uppercase tracking-wider font-sans">10-Year Grand Impact</p>
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
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">04 — The Landscape</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Where every molecule<br />goes to die.
          </h2>
          <p className="text-white/60 font-light max-w-xl mb-20">
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
            <p key={i} className={`text-xs uppercase tracking-wider ${i === 2 ? "text-rose-400/80" : "text-white/60"}`}>{l}</p>
          ))}
        </div>

        {/* Stage cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              num: "01",
              stage: "Digital Discovery",
              players: ["Isomorphic Labs", "Schrödinger"],
              desc: "AI predicts molecular structures in silico. Billions of candidates screened in days.",
              gap: "The output is a digital prediction — not a manufacturing blueprint.",
              time: "Days",
              border: "border-white/5",
              bg: "bg-white/[0.01]",
              numColor: "text-white/5",
              tagBorder: "border-white/8",
              tagText: "text-white/60",
              gapColor: "text-white/65",
            },
            {
              num: "02",
              stage: "Lab Synthesis",
              players: ["Emerald Cloud Lab", "Radical AI"],
              desc: "Autonomous robotic labs synthesize milligrams of material. Proof of existence — but not proof of scale.",
              gap: "The industry spends 7 years and $500M building blind physical pilot plants trying to figure out how to manufacture it.",
              time: "Weeks",
              border: "border-white/5",
              bg: "bg-white/[0.01]",
              numColor: "text-white/5",
              tagBorder: "border-white/8",
              tagText: "text-white/60",
              gapColor: "text-white/65",
            },
            {
              num: "03",
              stage: "Industrial Scale-Up",
              players: ["Shodh AI — The Bottleneck"],
              desc: "At the 10,000-litre scale, the turbulence, heat transfer, and pressure of an industrial reactor tear novel molecules apart.",
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

              <p className="text-white/70 font-light text-base leading-relaxed mb-5 flex-grow">{s.desc}</p>

              <div className={`pt-4 border-t ${i === 2 ? "border-rose-500/10" : "border-white/5"}`}>
                <p className={`text-xs font-light leading-relaxed ${s.gapColor}`}>{s.gap}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Structural Advantage narrative */}
        <div className="pt-10 border-t border-white/5 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Our Structural Advantage</p>
            <p className="text-white/60 font-light leading-relaxed">
              Isomorphic and Schrödinger are not our competitors; they are our upstream pipeline. They hand us the molecule. We build the blueprint for the factory. Every dollar invested in AI drug discovery creates more bottleneck demand for Shodh AI.
            </p>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">The Bottleneck We Own</p>
            <p className="text-white/60 font-light leading-relaxed">
              The industry spends 7 years and $500M building blind physical pilot plants. Every dollar invested in Stage 1 and Stage 2 AI accelerates the pipeline — and makes the Stage 3 bottleneck more acute. We are the only exit.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: THE BOTTLENECK ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">05 — The Bottleneck</p>
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
              <p className="text-white/40 text-xs uppercase tracking-wider mb-4">The Situation</p>
              <p className="text-white/70 font-light leading-relaxed">Biocon's bio-enzymes can cut a 16-step drug process down to just 3 steps.</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-4">The Problem</p>
              <p className="text-white/70 font-light leading-relaxed">Pump those fragile enzymes into an industrial steel reactor. The heat and fluid dynamics tear them apart. The scale-up fails. Every time.</p>
            </div>
            <div className="border-l-2 border-white/10 pl-6 py-2">
              <p className="text-white text-xl font-light">Discovery is solved.</p>
              <p className="text-rose-400 text-xl font-light">Engineering is broken.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-4">The Industry Reality</p>
              <p className="text-white/70 font-light leading-relaxed">
                The industry spends 7 years and $500M building blind physical pilot plants to figure out how to manufacture it. The reactor tears the molecule apart. The scale-up fails. Every time.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/15">
              <p className="text-emerald-400/70 text-xs uppercase tracking-wider mb-4">The Shodh AI Answer</p>
              <p className="text-white/70 font-light leading-relaxed">
                We generate the complete manufacturing blueprint before a single physical reactor is built. Reactor geometry, fluid dynamics, thermal profiles — all computed.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 6: THE SCIENCE ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">06 — The Science</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            One model.<br /><span className="font-normal">Every industry.</span>
          </h2>
        </motion.div>

        {/* Central unified concept — animated wave gradient */}
        {/* LPM intro */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <p className="text-white/70 font-light text-xl md:text-2xl leading-relaxed max-w-4xl mb-6">
            We are building a <span className="text-white font-normal">Large Physics Model (LPM)</span> that masters the underlying math. By unifying the governing equations — Navier-Stokes, Fourier's Law, Fick's Law — we are building a single AI architecture that can scale a pharma bioreactor today and a solid-state battery tomorrow.
          </p>
          <p className="text-white/50 font-light leading-relaxed max-w-3xl">
            We coupled the five governing equations that describe this interaction into one unified model — the LPM. That is why it generalizes across every industry.
          </p>
        </motion.div>

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

        <div className="mb-16">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-6">The Five Governing Equations</p>
          <p className="text-white/50 text-sm font-light mb-8">Hover to explore each layer of the physics stack.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { eq: "Navier-Stokes & Fick's Law", desc: "Fluid flow and chemical diffusion through pores.", hoverText: "hover:text-blue-300", hoverBox: "hover:bg-blue-500/5 hover:border-blue-500/20", num: "1" },
              { eq: "Phase Field / Cahn-Hilliard", desc: "How materials separate, solidify, and grow dendrites.", hoverText: "hover:text-violet-300", hoverBox: "hover:bg-violet-500/5 hover:border-violet-500/20", num: "2" },
              { eq: "Solid Mechanics & Fourier's Law", desc: "How materials crack, swell, and distribute heat.", hoverText: "hover:text-orange-300", hoverBox: "hover:bg-orange-500/5 hover:border-orange-500/20", num: "3" },
              { eq: "Maxwell's Equations", desc: "Electrical fields and ion transport.", hoverText: "hover:text-cyan-300", hoverBox: "hover:bg-cyan-500/5 hover:border-cyan-500/20", num: "4" },
              { eq: "Arrhenius Equation", desc: "Reaction kinetics — how fast chemistry happens.", hoverText: "hover:text-emerald-300", hoverBox: "hover:bg-emerald-500/5 hover:border-emerald-500/20", num: "5" },
            ].map((item, i) => (
              <div key={i} className={`group flex flex-col gap-3 p-6 rounded-2xl border border-white/5 transition-all duration-200 cursor-default ${item.hoverBox}`}>
                <span className="text-white/20 font-mono text-3xl font-bold leading-none">{item.num}</span>
                <p className={`font-light text-base text-white/70 transition-colors duration-200 ${item.hoverText}`}>{item.eq}</p>
                <p className="text-white/45 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 07: THE INFLECTION POINT ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">07 — The Inflection Point</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Science has crossed<br />the <span className="font-normal">threshold.</span>
          </h2>
          <p className="text-white/60 font-light max-w-2xl mb-16 text-lg">
            Moving from slow simulation to instant Inverse Design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">The Legacy — 40 Years</p>
            <p className="text-white/70 font-light leading-relaxed mb-5">
              Simulating fluid dynamics required CPU-bound legacy solvers — COMSOL, OpenFOAM. Months to simulate one configuration. Mathematically impossible to invert.
            </p>
            <p className="text-white/40 text-sm font-mono italic">&quot;What happens if we put this fluid in this reactor?&quot;</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
            <p className="text-emerald-400/70 text-xs uppercase tracking-wider mb-4">The Breakthrough — Fourier Neural Operators</p>
            <p className="text-white/70 font-light leading-relaxed mb-5">
              Continuous 3D Fourier Neural Operators (FNOs) can learn continuous partial differential equations — simulating industrial physics{" "}
              <span className="text-emerald-300 font-medium">10,000× faster</span> than legacy software, and critically, the problem becomes <span className="text-white/90">invertible</span>.
            </p>
            <p className="text-emerald-300/70 text-sm font-mono italic">&quot;We need this fluid to survive scale-up. What exact shape should the reactor be?&quot;</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 md:p-10 rounded-2xl bg-white/[0.015] border border-white/5">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Where We Are — V0 Proof</p>
            <p className="text-white/70 font-light leading-relaxed">
              We closed the sim-to-real loop. Our V0 proxy engine predicted physical degradation with{" "}
              <span className="text-white font-normal">70% zero-shot accuracy.</span>{" "}The loop works. But 70% is not enough for an industrial giant to bet a $100M pilot plant on.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-8 md:p-10 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
            <p className="text-emerald-400/70 text-xs uppercase tracking-wider mb-4">Where We&apos;re Going — Skanda V1.0</p>
            <p className="text-white/70 font-light leading-relaxed">
              We are using the $50M Series A and our synthetic data to train <span className="text-white font-normal">Skanda V1.0</span> — a Continuous 3D FNO. Our explicit technical milestone: push accuracy from{" "}
              <span className="text-white/60 line-through">70%</span> to <span className="text-emerald-300 font-semibold">90%</span>, predicting scale-up fluid dynamics 10,000× faster than legacy software.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 08: THE ULTIMATE MOAT ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">08 — The Ultimate Moat</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Why we cannot be<br /><span className="font-normal">open-sourced or distilled.</span>
          </h2>
          <p className="text-white/60 font-light max-w-2xl mb-16 text-lg">
            A $5B LLM can be distilled for $10M — because language is free on the internet. Physics is not on the internet.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              num: "95%",
              title: "Synthetic Physics",
              sub: "The GPU Data Factory",
              desc: "We generate millions of mathematically perfect 3D microstructures and run highly advanced Direct Numerical Simulations across our sovereign GPU compute clusters — via IndiaAI.",
              color: "text-blue-300",
              border: "border-blue-500/20",
              bg: "bg-blue-950/10",
            },
            {
              num: "5%",
              title: "Physical Ground-Truth",
              sub: "The Anchor",
              desc: "Skanda V1.0 gets us to 90% accuracy, narrowing the search space from thousands of configurations to just five viable candidates. Our Bengaluru Autonomous Wet-Lab physically synthesizes those top five to bridge the final 10%.",
              color: "text-emerald-300",
              border: "border-emerald-500/20",
              bg: "bg-emerald-950/10",
            },
            {
              num: "∞",
              title: "Proprietary Feedback",
              sub: "The Closed Loop",
              desc: "Every physical synthesis result — pass or fail — is fed back into the model's weights. The AI learns from the lab. The lab learns from the AI. This closed loop is unreplicable.",
              color: "text-rose-300",
              border: "border-rose-500/20",
              bg: "bg-rose-950/10",
            },
          ].map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`p-8 rounded-2xl border ${m.border} ${m.bg} flex flex-col`}>
              <p className={`text-4xl md:text-5xl font-bold mb-3 ${m.color}`}>{m.num}</p>
              <h3 className="text-white font-light text-lg mb-1">{m.title}</h3>
              <p className="text-white/40 text-xs italic mb-4">{m.sub}</p>
              <p className="text-white/65 font-light text-sm leading-relaxed flex-grow">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
            <p className="text-xl md:text-2xl font-light text-white leading-relaxed max-w-2xl">
              The AI + The Lab = <span className="font-normal text-emerald-300">100% guaranteed, lab-validated client success.</span>
            </p>
            <div className="shrink-0 text-center">
              <p className="text-white/30 text-xs uppercase tracking-wider mb-1">The Conclusion</p>
              <p className="text-white/60 font-light text-sm max-w-xs">We own the closed-loop failure data. Therefore, we own the market.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION 09: THE PROOF (ALPHAFOLD MOMENT) ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">09 — The Proof</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-4 max-w-3xl">
            Our AlphaFold Moment.
          </h2>
          <p className="text-white/40 font-light max-w-xl mb-16">
            We ran a blind 25-day &quot;Sim-to-Real&quot; sprint. We didn&apos;t just simulate — we generated the recipe, physically built it, and predicted the degradation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch mb-12">
          {/* STEP 1 */}
          <div className="relative p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl h-full flex flex-col">
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-400 font-medium text-sm">1</div>
            <h3 className="text-xl font-medium text-white mb-6 pl-4">The AI Prediction</h3>
            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
              <p className="text-white/60 text-sm font-mono mb-2">/prompt</p>
              <p className="text-white text-sm font-mono">&quot;Generate 5 unique battery architectures and their manufacturing recipes.&quot;</p>
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
              <p className="text-white/80 text-sm font-medium leading-relaxed">The Sim-to-Real Match: AI&apos;s digital imagination perfectly translated into physical reality.</p>
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
            <strong className="font-medium">The Takeaway:</strong> We didn&apos;t just guess the material; our AI wrote the physical instructions to scale it. 70% accuracy today → perfect factory blueprints for the world&apos;s industrial giants tomorrow.
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

      {/* ─── SECTION 09: UNIT ECONOMICS ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">09 — The Unit Economics</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            The Deep Tech Equation:<br /><span className="font-normal">Time is Monopoly.</span>
          </h2>
          <p className="text-white/60 font-light max-w-2xl mb-16 text-lg">
            We do not sell &quot;cost savings.&quot; We sell Zero-to-Billion market capture.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">The Old Economics</p>
            <p className="text-white/70 font-light leading-relaxed mb-4">
              Amortize $500M over 7 years of blind physical pilot builds. Batch failure after batch failure. Patent life ticks down with every wasted month of trial-and-error.
            </p>
            <p className="text-white/35 text-sm font-mono italic">7-year scale-up × 20-year patent = only 13 years of monopoly left.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
            <p className="text-emerald-400/70 text-xs uppercase tracking-wider mb-4">The Shodh AI Economics</p>
            <p className="text-white/70 font-light leading-relaxed mb-4">
              We front-load the heavy CapEx. We absorb the massive upfront cost of GPU model training and autonomous robotic validation. We compress the 7-year physical scale-up into a 6-month digital-to-physical loop.
            </p>
            <p className="text-emerald-300/70 text-sm font-mono italic">6-month scale-up × 20-year patent = <span className="text-emerald-300 font-semibold">19.5 years of monopoly.</span></p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 md:p-12 rounded-2xl bg-white/[0.015] border border-white/5">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-4">The Ultimate ROI</p>
          <p className="text-2xl md:text-3xl font-extralight text-white leading-tight mb-4">
            We don&apos;t just save a client money.
          </p>
          <p className="text-white/65 font-light max-w-3xl text-lg leading-relaxed">
            We hand them a validated factory blueprint <span className="text-emerald-300 font-normal">6.5 years early</span> — effectively recovering +6.5 years of global patent monopoly. At $200M/yr in monopoly profit, that is{" "}
            <span className="text-white font-normal">$1.3 billion in new revenue</span> we unlock per engagement.
          </p>
        </motion.div>
      </section>

      {/* ─── SECTION 10: GTM ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">10 — The Go-To-Market</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Open Core.<br /><span className="font-normal">Proprietary Scale.</span>
          </h2>
          <p className="text-white/60 font-light max-w-2xl mb-4 text-lg">
            How we capture the ecosystem and the enterprise simultaneously.
          </p>
          <p className="text-white/45 font-light max-w-2xl mb-16">
            We are deploying a &quot;Red Hat&quot; strategy — open the standard, monetize the enterprise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-white/20 font-mono text-3xl font-bold leading-none">1</span>
              <div>
                <p className="text-white font-light text-lg">The Open Standard</p>
                <p className="text-white/40 text-xs italic">Porous Media V1.0</p>
              </div>
            </div>
            <p className="text-white/65 font-light leading-relaxed flex-grow">
              We leverage our sovereign <span className="text-white/90">IndiaAI compute grants</span> to train and open-source the base Skanda V1.0 porous media solver. We make Skanda the default computational standard across global academia — starving legacy software competitors (COMSOL, ANSYS) of their future user base and building a massive developer ecosystem.
            </p>
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-white/35 text-sm italic">Non-dilutive. Government-funded. Zero VC burn on compute.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-8 rounded-2xl bg-violet-950/20 border border-violet-500/20 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-violet-300/40 font-mono text-3xl font-bold leading-none">2</span>
              <div>
                <p className="text-white font-light text-lg">The Venture Monopoly</p>
                <p className="text-white/40 text-xs italic">Asset-Level Co-Creation</p>
              </div>
            </div>
            <p className="text-white/65 font-light leading-relaxed flex-grow">
              The open-source community gets the base physics solver. But a base model doesn&apos;t know the proprietary chemical kinetics of Biocon&apos;s specific cancer enzyme. We freeze the base model and fine-tune it in a <span className="text-white/90">closed loop using proprietary wet-lab data</span> from our Anchor Partners. We retain exclusive commercial IP on these bespoke, highly lucrative scale-up blueprints.
            </p>
            <div className="mt-6 pt-4 border-t border-violet-500/10">
              <p className="text-violet-300/50 text-sm italic">Software can be open-sourced. Physical reality cannot.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 11: REVENUE ARCHITECTURE ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">11 — Revenue Architecture</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Path to<br /><span className="font-normal">Value Capture.</span>
          </h2>
          <p className="text-white/60 font-light max-w-2xl mb-16 text-lg">
            How we monetize the Layer 2 Co-Creation. Because we do heavy model training and physical lab validation, our unit economics must reflect the value of invention — not a SaaS subscription.
          </p>
        </motion.div>

        <div className="space-y-px rounded-2xl overflow-hidden border border-white/5 mb-12">
          {[
            {
              num: "01",
              title: "Upfront NRE",
              sub: "Compute & Validation",
              label: "Immediate Cash Flow",
              desc: "Anchor partners pay a $2M–$5M upfront contract fee to run their specific bottlenecks through our LPM and autonomous lab. This covers our massive GPU compute and wet-lab burn. We operate at break-even or better from Day 1.",
              model: "$2M – $5M per engagement",
              color: "text-blue-300",
              bg: "bg-blue-950/5",
            },
            {
              num: "02",
              title: "IP Co-Ownership & Milestones",
              sub: "The Biobucks Model",
              label: "The Multiplier",
              desc: "We do not just sell software — we co-own the physical discoveries. When the Shodh AI blueprint successfully scales in the partner's physical pilot plant, we secure clinical and commercial milestone payouts.",
              model: "$5M – $15M per milestone",
              color: "text-violet-300",
              bg: "bg-violet-950/5",
            },
            {
              num: "03",
              title: "The Endgame",
              sub: "Royalties on Physical Production",
              label: "True Zero-Shot Manufacturing",
              desc: "We take a single-digit software royalty on every physical product globally manufactured using a Shodh AI-generated blueprint. Every factory we design becomes a perpetual revenue stream.",
              model: "% royalty on manufactured output",
              color: "text-emerald-300",
              bg: "bg-emerald-950/10",
            },
          ].map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className={`p-8 md:p-10 bg-[#060606] ${i > 0 ? "border-t border-white/5" : ""} ${h.bg}`}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                <div className="md:w-24 shrink-0">
                  <span className={`font-mono text-4xl md:text-5xl font-bold leading-none ${h.color} opacity-40`}>{h.num}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{h.label}</p>
                  <h3 className="text-xl md:text-2xl font-light text-white mb-0.5">{h.title}</h3>
                  <p className="text-white/45 text-sm italic mb-3">{h.sub}</p>
                  <p className="text-white/65 font-light text-base leading-relaxed max-w-2xl mb-4">{h.desc}</p>
                  <p className={`text-sm font-medium ${h.color}`}>{h.model}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 12: MILESTONES & THE ASK ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">12 — The Milestones &amp; The $50M Ask</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            The Series A<br /><span className="font-normal">Execution Plan.</span>
          </h2>
          <p className="text-white/60 font-light max-w-2xl mb-16 text-lg">
            Path to the Mega-Round. We are raising $50M to build the foundation model for the physical world.
          </p>
        </motion.div>

        <div className="space-y-4 mb-12">
          {[
            {
              phase: "Phase 1",
              months: "Months 1–8",
              title: "Infra & The Base Model",
              points: [
                "Hit the Technical KPI: Deploy capital to scale the Autonomous Validation Lab and train Skanda V1.0 — upgrading simulation accuracy from our proven 70% baseline to a commercially dominant 90%.",
                "Release the open-source base model. Establish the Layer 1 global standard across academia.",
              ],
              color: "border-blue-500/30",
              numColor: "text-blue-300/40",
            },
            {
              phase: "Phase 2",
              months: "Months 9–16",
              title: "Anchor Delivery & Revenue Conversion",
              points: [
                "Deliver the first fully-scaled digital blueprints for anchor partners (Biocon, Aarti Industries).",
                "Convert early pilots into paid NRE contracts. Transition to first multi-million dollar IP Milestone Payouts as they hit pilot scale.",
              ],
              color: "border-violet-500/30",
              numColor: "text-violet-300/40",
            },
            {
              phase: "Phase 3",
              months: "Months 17–24",
              title: "Generalization",
              points: [
                "Leverage the validated FNO architecture to sign 3 net-new global Tier-1 partners in adjacent physical domains (Aerospace alloys, Next-Gen EV Batteries).",
              ],
              color: "border-emerald-500/30",
              numColor: "text-emerald-300/40",
            },
          ].map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`p-8 rounded-2xl bg-white/[0.02] border-l-2 border ${p.color} bg-[#060606]`}>
              <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                <div className="md:w-32 shrink-0">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{p.phase}</p>
                  <p className={`text-sm font-mono ${p.numColor}`}>{p.months}</p>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-light text-white mb-4">{p.title}</h3>
                  <ul className="space-y-2">
                    {p.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-white/55 font-light leading-relaxed">
                        <ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-transparent to-blue-950/20 border border-white/10 text-center">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-4">The Endgame</p>
          <p className="text-2xl md:text-3xl font-extralight text-white leading-tight mb-4 max-w-3xl mx-auto">
            By Month 24, we will have commercial proof that our AI successfully generated physical factories across multiple trillion-dollar industries.
          </p>
          <p className="text-white/55 font-light max-w-2xl mx-auto">
            With that undeniable traction, we will set up the{" "}
            <span className="text-emerald-300 font-normal">$500M Phase 2 Mega-Round</span> to generalize the LPM across all physics globally — achieving true Programmable Matter.
          </p>
        </motion.div>
      </section>

      {/* ─── SECTION 10: THE ASK ─── */}
      <section className="px-6 py-28 md:py-40 border-t border-white/5 max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-12">10 — The Ask</p>
          <p className="text-white/30 font-light tracking-[0.2em] mb-4">Language came. Code came.</p>
          <h2 className="text-5xl md:text-8xl font-extralight tracking-tight mb-4">Science is here.</h2>
          <p className="text-xl text-white/40 font-light mb-20 max-w-xl mx-auto">
            We are building the foundation model for the physical world. This is the capital structure.
          </p>

          <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden max-w-4xl mx-auto mb-20">
            {[
              { amount: "$25M", source: "IndiaAI Mission", desc: "Sovereign GPU/TPU compute" },
              { amount: "$25M", source: "ANRF", desc: "Autonomous robotic lab infrastructure" },
              { amount: "$50M", source: "Equity Round", desc: "Talent, engineering teams, global market capture" },
            ].map((item, i) => (
              <div key={i} className={`bg-[#060606] p-8 md:p-10 ${i === 2 ? "bg-white/[0.03]" : ""}`}>
                <p className="text-4xl md:text-5xl font-light text-white mb-2">{item.amount}</p>
                <p className="text-white/50 text-sm font-light mb-1">{item.source}</p>
                <p className="text-white/40 text-xs">{item.desc}</p>
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
      {/* ─── YOUTUBE VIDEO ─── */}
      <section className="px-6 pb-0 pt-16 border-t border-white/5 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="rounded-2xl overflow-hidden border border-white/5 bg-white/[0.01]">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/8O-aKNmuNk8"
                title="Shodh AI Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── FOUNDER'S LETTER ─── */}
      <section className="px-6 py-28 md:py-36 border-white/5 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-4xl font-light text-white mb-0 uppercase tracking-tight">
                BEYOND THE ATOM: THE FINAL FRONTIER OF AI.
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              {/* Left: photo + signature */}
              <div className="flex flex-row md:flex-col items-center md:items-start gap-5 md:gap-4 shrink-0 md:w-40">
                <div className="w-28 h-32 md:w-full md:h-44 rounded-xl overflow-hidden border border-white/10 shrink-0">
                  <img
                    src="/Arastu_Sharma_l.jpeg"
                    alt="Arastu Sharma"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "50% 5%" }}
                  />
                </div>
                <div>
                  <p className="text-white font-medium text-sm leading-snug">Arastu Sharma, PhD</p>
                  <p className="text-white/50 text-xs mt-1">Cambridge, ex-Microsoft</p>
                  <p className="text-white/50 text-xs">CEO, Shodh AI</p>
                </div>
              </div>

              {/* Right: letter text */}
              <div className="space-y-5 flex-1">
                <p className="text-white/80 text-lg leading-relaxed">
                  <strong className="text-white">To our Future Partners,</strong>
                </p>
                <p className="text-white/70 leading-relaxed">There is a reason this industry is empty.</p>
                <p className="text-white/70 leading-relaxed">
                  We are building for a market that doesn't exist on a spreadsheet yet. Jensen Huang calls these "Zero-Billion Dollar Markets" — industries that are currently zero, but are inevitably destined to become the infrastructure of the future.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Our competitors, Lila Science ($550M) and Radical AI ($55M), have raised massive war chests to solve the "Lab Problem." They are building brilliant tools for scientists to discover molecules.
                </p>
                <p className="text-white/70 leading-relaxed">
                  <strong className="text-white">But discovery is not delivery.</strong>
                </p>
                <p className="text-white/70 leading-relaxed">
                  We are playing a different game. We are not just building a tool for the Lab; we are building the{" "}
                  <strong className="text-white">Foundation Model for the Physical World.</strong>
                </p>
                <p className="text-white/70 leading-relaxed">
                  This is not "Predictive Maintenance" or simple factory optimization. We are not just tweaking the temperature of a furnace.
                </p>
                <p className="text-white/70 leading-relaxed">
                  <strong className="text-white">Invention will not be luck, but by design.</strong>
                </p>
                <p className="text-white/70 leading-relaxed">
                  Our AI enables a new paradigm: <strong className="text-white">Inverse Design</strong>. It allows a human to imagine a material that shouldn't exist — a battery that is both cheaper and energy-dense — and then generates both the molecular recipe to invent it and the machine code to manufacture it.
                </p>
                <p className="text-white/70 leading-relaxed">
                  We are giving nations and industries the sovereign power to invent their own energy future, breaking the reliance on decades of slow academic trial-and-error.
                </p>
                <p className="text-white/70 leading-relaxed">
                  We have chosen the hardest path. We operate at the intersection of Mesoscale Physics, Generative AI, and Heavy Manufacturing. It is painful. It requires suffering. But as we say internally:{" "}
                  <em className="text-white/90">To perish in arrogant presumptions is our motto.</em>
                </p>
                <p className="text-white/70 leading-relaxed">
                  If you believe that the next Trillion-Dollar company will be built in the physical world, not the digital one...
                </p>
                <p className="text-white text-lg font-medium">Welcome to Shodh AI.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
