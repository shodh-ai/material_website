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
            Building the foundation model for the physical world at the mesoscale.
          </p>
        </motion.div>
      </section>

      {/* ─── SECTION 1: IDENTITY ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">01 — Identity</p>
          <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-16 max-w-4xl">
            Backed by the IndiaAI Mission.<br />
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
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">02 — The Trillion-Dollar Bottleneck</p>
          <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-16 max-w-4xl">
            The bottleneck is<br /><span className="text-white/40">not only</span> discovery.<br />
            The deeper bottleneck is<br /><span className="font-normal">the mesoscale.</span>
          </h2>
          <div className="space-y-8 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-white/40 text-sm uppercase tracking-wider mb-4">The Atomic Layer — Accelerating</p>
                <p className="text-white/50 text-xl font-light">AI for science is split into two layers.</p>
                <p className="text-white/30 font-light">The atomic layer — focused on discovery — is already dominated by models like AlphaFold and Isomorphic Labs.</p>
              </div>
              <div className="space-y-2 border-l border-white/10 pl-8">
                <p className="text-white/50 text-sm uppercase tracking-wider mb-4">The Mesoscale — Unsolved</p>
                <p className="text-white text-xl font-light">90% of discovered molecules will never see the market.</p>
                <p className="text-white/60 font-light">Moving from lab-scale discovery to commercial continuous manufacturing takes 6 to 8 years of expensive, physical trial-and-error.</p>
              </div>
            </div>
            <div className="border-l-2 border-white/10 pl-6 py-2">
              <p className="text-white/60 font-light text-lg">Today, industries possess millions of digitally discovered molecules, bio-enzymes, and novel materials. Industries don&apos;t just need new discoveries; they need to know <span className="text-white font-normal">how to manufacture them at scale.</span></p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── SECTION 2b: THE PIPELINE LANDSCAPE ─── */}
      <section className="px-6 py-16 md:py-24 border-t border-white/5 max-w-6xl mx-auto">
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

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              num: "01",
              stage: "Digital Discovery",
              players: ["Isomorphic Labs", "Schrödinger"],
              desc: "AI predicts molecular structures in silico. Billions of candidates screened in days.",
              gap: "The output is a digital prediction — not a manufacturing blueprint.",
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

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 flex flex-col justify-between">
            <div>
              <p className="text-white/60 font-light text-sm leading-relaxed mb-4">By compressing the 7-year scale-up phase into 3 months, we give pharmaceutical and chemical companies their patent life back.</p>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Patent Life Recovered</p>
              <p className="text-5xl font-extralight text-emerald-300 mb-1">+6.75 <span className="text-2xl">yrs</span></p>
            </div>
            <p className="text-white/60 font-light text-sm leading-relaxed mt-4">Patents last 20 years. At $200M/yr profit → <span className="text-white font-normal">$1.35B in new monopoly revenue</span> per engagement.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">How We Fit Together</p>
            <p className="text-white/65 font-light text-sm leading-relaxed">Isomorphic Labs and Radical AI are not our competitors — they are our upstream. They hand us the molecule. We build the factory. The entire AI discovery pipeline converges on Stage 3 as its bottleneck. <span className="text-white font-normal">We are the only team working on it.</span></p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Our Structural Advantage</p>
            <p className="text-white/65 font-light text-sm leading-relaxed">Every dollar invested in Isomorphic, Schrödinger, or Recursion creates more demand for Shodh AI. As Stage 1 and Stage 2 accelerate, the Stage 3 bottleneck becomes more acute. <span className="text-white font-normal">We are the only exit for the pipeline.</span></p>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: 10-YEAR VISION / TERMINAL ─── */}
      <section className="py-28 md:py-36 border-t border-white/5">
        <div className="px-6 max-w-6xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">03 — The Solution</p>
            <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-6 max-w-4xl">
              One Math Architecture<br /><span className="font-normal">for the Physical World.</span>
            </h2>
            <p className="text-white/40 font-light max-w-xl">
              By transitioning from deterministic solvers to AI-driven Neural Operators, we are compressing 6 years of R&amp;D and scale-up engineering into 6 months.
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
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">04 — The Technology</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Engineering the<br /><span className="font-normal">10-Billion Parameter SOTA.</span>
          </h2>
          <p className="text-white/60 font-light max-w-xl mb-20">
            Neural operators have reached an inflection point, proving AI can beat traditional solvers. We are scaling this to unprecedented levels.
          </p>
        </motion.div>

        {/* Structural Advantage narrative */}
        <div className="pt-10 border-t border-white/5 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">The Scale Leap</p>
            <p className="text-white/60 font-light leading-relaxed">
              Current state-of-the-art AI weather models sit at 150M parameters. Advanced science models sit at 500M. We are building the world&apos;s first <span className="text-white font-normal">10-Billion parameter</span> physics foundation model.
            </p>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Our Sovereign Infrastructure</p>
            <p className="text-white/60 font-light leading-relaxed">
              Backed by direct technical collaboration with Google&apos;s JAX team, DeepMind, and Nvidia&apos;s Nemo Modulus team. We built a proprietary JAX/FLAX-based data and training engine to overcome the cold-start problem of physical data.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: THE BOTTLENECK ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">05 — The Data Engine</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Solving the<br />
            <span className="font-normal">Cold-Start Problem.</span>
          </h2>
          <p className="text-white/40 font-light max-w-xl mb-20">
            Physical data doesn&apos;t exist on the internet. We built the infrastructure to generate it at scale.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Proprietary 3D Microstructure Generation</p>
              <p className="text-white/70 font-light leading-relaxed">We algorithmically generate synthetic physical structures with <span className="text-white font-normal">95% morphological accuracy</span> compared to real-world Scanning Electron Microscope (SEM) data.</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Massive DNS Data Engine</p>
              <p className="text-white/70 font-light leading-relaxed">We run highly advanced Direct Numerical Simulations (DNS) across priority GPU clusters to create massive, high-fidelity synthetic training data.</p>
            </div>
            <div className="border-l-2 border-white/10 pl-6 py-2">
              <p className="text-white text-xl font-light">Legacy solvers: months per simulation.</p>
              <p className="text-emerald-400 text-xl font-light">Our Neural Operators: milliseconds.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-4">State-of-the-Art Architecture</p>
              <p className="text-white/70 font-light leading-relaxed">
                Advancing from standard FNOs (Fourier Neural Operators) to UPT (Universal Physics Transformers) with cutting-edge compression. Starting with LBM for porous media and fluids, expanding to JAX-based FEM for solids and FDTD for electromagnetics.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/15">
              <p className="text-emerald-400/70 text-xs uppercase tracking-wider mb-4">The Unified Architecture</p>
              <p className="text-white/70 font-light leading-relaxed">
                Ultimately unified in a <span className="text-white font-normal">Mixture of Experts (MoE)</span> architecture — a single model that routes each physical problem to its specialist expert layer.
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
            Why one model solves<br /><span className="font-normal">Pharma, Batteries, and Specialty Chemicals.</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 max-w-4xl">
          <p className="text-white/70 font-light text-lg md:text-xl leading-relaxed mb-4">
            These industries look completely different on paper. Physically, they are the exact same problem: <span className="text-white font-normal">a fluid moving through a porous solid under heat, pressure, and chemical reaction.</span>
          </p>
          <p className="text-white/50 font-light leading-relaxed">
            A drug bioreactor. A solid-state battery. A carbon membrane. Strip away the industry names, and the physics is identical. We coupled the five governing equations into one unified model—the LPM.
          </p>
        </motion.div>

        <div className="mb-16">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-6">The Unified Physics Stack</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { eq: "Navier-Stokes & Fick's Law", desc: "Fluid flow and chemical diffusion.", hoverText: "hover:text-blue-300", hoverBox: "hover:bg-blue-500/5 hover:border-blue-500/20", num: "1" },
              { eq: "Phase Field / Cahn-Hilliard", desc: "How materials separate and solidify.", hoverText: "hover:text-violet-300", hoverBox: "hover:bg-violet-500/5 hover:border-violet-500/20", num: "2" },
              { eq: "Solid Mechanics & Fourier's Law", desc: "How materials crack and distribute heat.", hoverText: "hover:text-orange-300", hoverBox: "hover:bg-orange-500/5 hover:border-orange-500/20", num: "3" },
              { eq: "Maxwell's Equations", desc: "Electrical fields and ion transport.", hoverText: "hover:text-cyan-300", hoverBox: "hover:bg-cyan-500/5 hover:border-cyan-500/20", num: "4" },
              { eq: "Arrhenius Equation", desc: "Reaction kinetics—how fast chemistry happens.", hoverText: "hover:text-emerald-300", hoverBox: "hover:bg-emerald-500/5 hover:border-emerald-500/20", num: "5" },
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
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">07 — Two Engines</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Forward Validation<br />&amp; <span className="font-normal">Inverse Generation.</span>
          </h2>
          <p className="text-white/60 font-light max-w-2xl mb-16 text-lg">
            The LPM operates as a complete operating system for physical R&amp;D.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">The Forward Model — Predictive</p>
            <p className="text-white/70 font-light leading-relaxed mb-5">
              Validates R&amp;D instantly. It predicts physical outcomes and system failures at{" "}
              <span className="text-white font-medium">95% accuracy,</span> bridging the sim-to-real gap.
            </p>
            <p className="text-white/40 text-sm font-mono italic">&quot;What will happen when we scale this molecule to an industrial reactor?&quot;</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
            <p className="text-emerald-400/70 text-xs uppercase tracking-wider mb-4">The Inverse Model — Generative Process Compiler</p>
            <p className="text-white/70 font-light leading-relaxed mb-5">
              A true generative engineering engine. You input the desired material or chemical outcome, and the model works backward to output the exact{" "}
              <span className="text-emerald-300 font-medium">manufacturability parameters</span> — flow rates, thermal limits, pressures — required to build it in the real world.
            </p>
            <p className="text-emerald-300/70 text-sm font-mono italic">&quot;We need this outcome. What exact process parameters produce it?&quot;</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 md:p-10 rounded-2xl bg-white/[0.015] border border-white/5">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Legacy Solvers — COMSOL, Ansys</p>
            <p className="text-white/70 font-light leading-relaxed">
              Too slow, computationally expensive, and fail to adapt to real-world complexities. Months to simulate one configuration. <span className="text-white/90">Mathematically impossible to invert.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 08: THE ULTIMATE MOAT ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">08 — Validated by Industry Titans</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            The physics of scale-up<br /><span className="font-normal">is universal.</span>
          </h2>
          <p className="text-white/60 font-light max-w-2xl mb-16 text-lg">
            We are proving the cross-industry scalability of the LPM by co-developing proprietary applications with three global anchor partners across three distinct verticals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              num: "Biocon",
              title: "Bio-enzymes & Biologicals",
              sub: "Biotransformation Scale-Up",
              desc: "Co-developing the AI blueprint to scale bio-enzymes and complex biologicals from lab synthesis to commercial continuous manufacturing.",
              color: "text-blue-300",
              border: "border-blue-500/20",
              bg: "bg-blue-950/10",
            },
            {
              num: "Jubilant",
              title: "Agro-Pharma & CDMO",
              sub: "Continuous Manufacturing (Flow Chemistry)",
              desc: "Accelerating Continuous Manufacturing for Jubilant Ingrevia — transforming batch reactions to continuous flow chemistry at industrial scale.",
              color: "text-emerald-300",
              border: "border-emerald-500/20",
              bg: "bg-emerald-950/10",
            },
            {
              num: "Aarti",
              title: "Specialty Chemicals",
              sub: "High-Stress Batch Reactions",
              desc: "Solving the most complex scale-up bottlenecks in specialty chemicals and high-stress batch reactions for Aarti Industries.",
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
              Advisory Board &amp; Early Backers: <span className="font-normal text-emerald-300">Guided by industry veterans.</span>
            </p>
            <div className="shrink-0 text-center">
              <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Our Advisors</p>
              <p className="text-white/60 font-light text-sm max-w-xs">Arun Seth · Kiran Mazumdar-Shaw (Founder, Biocon) · Deepak Jain (CEO, Jubilant Ingrevia)</p>
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
          <p className="text-white/40 font-light max-w-xl mb-6">
            We ran a blind 25-day &quot;Sim-to-Real&quot; sprint. We didn&apos;t just simulate — we generated the recipe, physically built it, and predicted the degradation.
          </p>
          <p className="text-white/55 font-light max-w-xl mb-16 text-sm border-l-2 border-white/10 pl-4">
            We proved the core physics engine first on complex battery matrices; we are now deploying the same Navier-Stokes/Fluid architecture to Jubilant and Biocon&apos;s bioreactors.
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

      {/* ─── SECTION 10: THE BUSINESS MODEL ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">10 — The Business Model</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Path to<br /><span className="font-normal">Value Capture.</span>
          </h2>
          <p className="text-white/60 font-light max-w-2xl mb-4 text-lg">
            Software can be open-sourced. Physical reality cannot. The open-source community gets the base physics solver. The enterprise gets the proprietary scale-up blueprint.
          </p>
          <p className="text-white/40 font-light max-w-2xl mb-16">
            Three compounding revenue layers.
          </p>
        </motion.div>

        <div className="space-y-px rounded-2xl overflow-hidden border border-white/5 mb-12">
          {[
            {
              num: "01",
              title: "Immediate Cash Flow: NRE & Compute",
              sub: "Break-even or better from Day 1",
              label: "Immediate Cash Flow",
              desc: "Partners pay an upfront fee to run their specific bottlenecks through the LPM. Operates at break-even or better from Day 1.",
              model: "$2M – $5M per engagement",
              color: "text-blue-300",
              bg: "bg-blue-950/5",
            },
            {
              num: "02",
              title: "The Multiplier: Biobucks & Milestones",
              sub: "IP Co-Ownership",
              label: "The Multiplier",
              desc: "We co-own the physical discoveries. When the Shodh AI blueprint successfully scales in the partner's physical pilot plant, we secure commercial milestone payouts.",
              model: "$5M – $15M per milestone",
              color: "text-violet-300",
              bg: "bg-violet-950/5",
            },
            {
              num: "03",
              title: "True Zero-Shot Manufacturing: Royalties",
              sub: "Perpetual Revenue Streams",
              label: "True Zero-Shot Manufacturing",
              desc: "A software royalty on every physical product globally manufactured using a Shodh AI-generated blueprint. Every factory we design becomes a perpetual revenue stream.",
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

      {/* ─── SECTION 11: THE GO-TO-MARKET TIMELINE ─── */}
      <section className="px-6 py-28 md:py-36 border-t border-white/5 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">11 — The Go-To-Market Timeline</p>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            From NRE to<br /><span className="font-normal">Global Standard.</span>
          </h2>
          <p className="text-white/60 font-light max-w-2xl mb-16 text-lg">
            Three tightly sequenced phases to move from pilot to planetary infrastructure.
          </p>
        </motion.div>

        <div className="space-y-4 mb-12">
          {[
            {
              phase: "Phase 1",
              months: "Months 1–8",
              title: "The Open Source Trojan Horse",
              points: [
                "Train and open-source the 10-Billion parameter base LPM. Instantly replace legacy solvers (COMSOL, ANSYS) across academia to establish the global default standard.",
                "Push zero-shot accuracy from 70% to 90%.",
              ],
              color: "border-blue-500/30",
              numColor: "text-blue-300/40",
            },
            {
              phase: "Phase 2",
              months: "Months 9–16",
              title: "Anchor Conversion",
              points: [
                "Deliver the first fully-scaled digital blueprints for our initial anchors (Biocon, Jubilant Ingrevia, Aarti).",
                "Convert pilots into paid NRE contracts and collect first milestone IP payments as blueprints hit pilot scale.",
              ],
              color: "border-violet-500/30",
              numColor: "text-violet-300/40",
            },
            {
              phase: "Phase 3",
              months: "Months 17–24",
              title: "The Horizontal Sweep",
              points: [
                "Use our first three zero-to-billion case studies to lock in the next 10 global Tier-1 manufacturing giants.",
                "Set up the $500M Mega-Round to generalize the LPM across all physical supply chains globally.",
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
      </section>

      {/* ─── SECTION 12: THE $100M CAPITAL STACK ─── */}
      <section className="px-6 py-28 md:py-40 border-t border-white/5 max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-12">12 — The $100M Capital Stack</p>
          <p className="text-white/30 font-light tracking-[0.2em] mb-4">Language came. Code came.</p>
          <h2 className="text-5xl md:text-8xl font-extralight tracking-tight mb-4">Science is here.</h2>
          <p className="text-xl text-white/40 font-light mb-4 max-w-xl mx-auto">
            We are structuring a $100M capitalization to build the foundation model for the physical world.
          </p>
          <p className="text-white/30 font-light max-w-xl mx-auto mb-20">
            $50M in sovereign, non-dilutive backing is already secured — your $50M equity check punches like a $100M check.
          </p>

          <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden max-w-4xl mx-auto mb-20">
            {[
              {
                amount: "$25M",
                source: "Sovereign Compute",
                tag: "Secured",
                desc: "IndiaAI Mission allocation for priority national GPU/TPU clusters. Zero VC burn on compute.",
                tagColor: "text-emerald-300",
                tagBg: "bg-emerald-950/40 border-emerald-500/30",
              },
              {
                amount: "$25M",
                source: "Autonomous Lab Infra",
                tag: "Secured",
                desc: "ANRF funding for wet-lab validation and robotic infrastructure.",
                tagColor: "text-emerald-300",
                tagBg: "bg-emerald-950/40 border-emerald-500/30",
              },
              {
                amount: "$50M",
                source: "The Equity Raise",
                tag: "Active",
                desc: "Hire the world's elite AI researchers, deploy Federated Data Engineering teams to anchor partners, and execute global market capture.",
                tagColor: "text-white",
                tagBg: "bg-white/5 border-white/20",
              },
            ].map((item, i) => (
              <div key={i} className={`bg-[#060606] p-8 md:p-10 ${i === 2 ? "bg-white/[0.03]" : ""}`}>
                <p className="text-4xl md:text-5xl font-light text-white mb-2">{item.amount}</p>
                <p className="text-white/70 text-sm font-light mb-2">{item.source}</p>
                <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full border ${item.tagBg} ${item.tagColor} mb-3`}>{item.tag}</span>
                <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="pt-8 border-t border-white/5">
              <h3 className="text-2xl md:text-4xl font-light text-white mb-8">
                We are not just discovering the future.<br />
                <span className="text-white/50">We are manufacturing it.</span>
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
