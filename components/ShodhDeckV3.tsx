"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Check, ArrowRight, Battery, Shield, Beaker, Leaf, Cpu, Factory, Droplets, BrainCircuit, AlertTriangle, Mail, Settings, TrendingDown, Maximize2, Zap, X } from "lucide-react";
import LineChart from "./LineChart";

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

const visionItems = [
  { id: "energy", industry: "Clean Energy", Icon: Battery, color: "blue", prompt: "Design a solid-state battery that charges in 60 seconds, uses zero lithium, and cannot catch fire.", physics: ["Phase Field (crystal growth)", "Electromagnetism", "Solid Mechanics"], impact: "Fossil fuels become economically obsolete. Electric jets become viable. Infinite grid storage unlocked." },
  { id: "defense", industry: "Defense & Space", Icon: Shield, color: "violet", prompt: "Generate the 3D-printer laser path to fuse an alloy that survives atmospheric reentry at Mach 15 without micro-fractures.", physics: ["Heat Transfer (Fourier)", "Solid Mechanics (von Mises)", "Fluid Dynamics"], impact: "Hypersonic travel and permanent lunar/Martian habitats become structurally possible. Zero-defect aerospace." },
  { id: "pharma", industry: "Pharma & Bio", Icon: Beaker, color: "emerald", prompt: "Output the blueprint for a suitcase-sized micro-reactor capable of continuously synthesizing cheap insulin from raw chemicals.", physics: ["Chemical Kinetics (Arrhenius)", "Navier-Stokes (micro-fluids)"], impact: "Decentralized medicine. Life-saving drugs printed locally, anywhere. End of vulnerable global supply chains." },
  { id: "climate", industry: "Climate Tech", Icon: Leaf, color: "lime", prompt: "Design a porous bio-scaffold that perfectly mimics a leaf to convert atmospheric CO2 and sunlight into liquid fuel.", physics: ["Fick's Law (Diffusion)", "Porous Media Flows", "Chemical Kinetics"], impact: "Synthetic terraforming. Stop drilling for oil. Start printing drop-in fuels out of thin air." },
  { id: "semi", industry: "Semiconductors", Icon: Cpu, color: "cyan", prompt: "Design a 3D architecture for a microchip that processes light instead of electricity, reducing heat by 99%.", physics: ["Maxwell's Equations", "Heat Transfer (Fourier)"], impact: "The post-silicon era. Computations 1000x faster, 1000x less energy. Powers the next generation of AI." },
  { id: "industry", industry: "Heavy Industry", Icon: Factory, color: "orange", prompt: "Design the continuous-flow reduction reactor to manufacture zero-emission green steel at room temperature using ambient hydrogen.", physics: ["Fick's Law", "Thermodynamics", "Navier-Stokes"], impact: "Decarbonizing dirt. Eliminate 15% of global emissions from raw material and cement manufacturing." },
  { id: "water", industry: "Clean Water", Icon: Droplets, color: "sky", prompt: "Design a scalable biomimetic porous membrane that filters salt from seawater using only ambient kinetic energy.", physics: ["Fick's Law (Osmosis)", "Electromagnetism (Ion rejection)", "Solid Mechanics"], impact: "Infinite freshwater. Drought becomes technologically obsolete. Unlock growth for the Global South." },
  { id: "computing", industry: "Next-Gen AI Compute", Icon: BrainCircuit, color: "rose", prompt: "Design the 3D micro-fluidic cooling architecture to be printed directly inside a 2nm AI chip to dissipate 1000 watts of heat.", physics: ["Fourier's Law (Heat Transfer)", "Navier-Stokes (micro-fluids)", "Thermodynamics"], impact: "Moore's Law is dying because chips melt. Shodh AI generates the cooling architectures to build 100x more powerful AI clusters." },
];

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  blue:    { bg: "bg-blue-500/10",    border: "border-blue-500/30",    text: "text-blue-300" },
  violet:  { bg: "bg-violet-500/10",  border: "border-violet-500/30",  text: "text-violet-300" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-300" },
  lime:    { bg: "bg-lime-500/10",    border: "border-lime-500/30",    text: "text-lime-300" },
  cyan:    { bg: "bg-cyan-500/10",    border: "border-cyan-500/30",    text: "text-cyan-300" },
  orange:  { bg: "bg-orange-500/10",  border: "border-orange-500/30",  text: "text-orange-300" },
  sky:     { bg: "bg-sky-500/10",     border: "border-sky-500/30",     text: "text-sky-300" },
  rose:    { bg: "bg-rose-500/10",    border: "border-rose-500/30",    text: "text-rose-300" },
};

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function ShodhDeckV3() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeVision, setActiveVision] = useState(0);
  const [displayedPrompt, setDisplayedPrompt] = useState("");
  const [expandedAlphaFoldView, setExpandedAlphaFoldView] = useState<"chart" | "matrices" | null>(null);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

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
          <span className="text-xs font-light tracking-[0.3em] uppercase text-white/30">Shodh AI - Confidential Investor Briefing</span>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden border-b border-white/5">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 mix-blend-screen" style={{ filter: 'brightness(1.5) contrast(1.2)' }}>
            <source src="/13815479_3840_2160_100fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060606]/50 to-[#060606] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,6,6,0.8)_100%)] pointer-events-none" />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-10">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white">Confidential Investor Briefing</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-medium tracking-tighter mb-4 leading-[0.9] text-white drop-shadow-2xl">
            The Large<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30 italic font-light">
              Physics Model
            </span>
          </h1>
          <p className="text-lg md:text-xl font-mono text-white/40 mb-10 tracking-widest drop-shadow-md">(LPM)</p>
          
          <p className="text-xl md:text-3xl text-white/80 font-light max-w-3xl mx-auto mb-14 leading-relaxed drop-shadow-lg">
            Building the foundation model for manufacturing physics.
          </p>
        </motion.div>
      </section>

      {/* ─── IDENTITY ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">Identity</p>
          <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-16 max-w-4xl">
            Backed by the IndiaAI Mission.<br />
            <span className="font-normal">Built in India. For the World.</span>
          </h2>
          <div className="space-y-8 max-w-3xl">
            {[
              "One of 12 foundational model teams selected by the sovereign IndiaAI Mission - with priority access on national GPU compute.",
              "Mandate to build AI for Science - the foundation model for the physical world.",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-white/50 mt-2.5 shrink-0" />
                <p className="text-white/70 font-light leading-relaxed text-lg md:text-xl">{text}</p>
              </div>
            ))}
          </div>
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
                  <img src={logo.src} alt={logo.alt} className="h-full w-auto max-w-[120px] object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── 01: THE PROBLEM ─── */}
      <section className="relative px-6 py-28 md:py-36 border-b border-white/5 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-70 mix-blend-screen" style={{ filter: 'brightness(1.2) contrast(1.2) hue-rotate(1.1)' }}>
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-transparent to-[#060606]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div {...fade}>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-white/40 font-mono text-base">01</span>
              <div className="h-px w-8 bg-white/15 shrink-0" />
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">The Problem: The Mesoscale Valley of Death</p>
            </div>
            <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-14 max-w-4xl drop-shadow-2xl">
              Industry&apos;s bottleneck is<br /><span className="text-white/40">not only</span> discovery.<br />
              The deeper bottleneck is<br /><span className="font-normal text-white">the mesoscale.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mb-6">
              <div className="space-y-3 bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <p className="text-white/40 text-xs uppercase tracking-wider">The Atomic Layer - Accelerating</p>
                <p className="text-white/80 text-lg font-light">AI for science is split into two layers.</p>
                <p className="text-white/50 font-light text-sm leading-relaxed">The atomic layer - focused on discovery - is already dominated by models like AlphaFold and Isomorphic Labs.</p>
              </div>
              <div className="space-y-3 bg-red-950/20 backdrop-blur-sm p-6 rounded-2xl border border-red-500/20">
                <p className="text-red-400 text-xs uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3" /> The Mesoscale - Unsolved
                </p>
                <p className="text-white text-lg font-light">90% of discovered molecules will never see the market.</p>
                <p className="text-white/60 font-light text-sm leading-relaxed">Moving from lab-scale to commercial manufacturing takes 6–8 years of expensive, physical trial-and-error.</p>
              </div>
            </div>
            <div className="border-l-2 border-white/10 pl-6 py-2 mb-16 max-w-3xl">
              <p className="text-white/55 font-light leading-relaxed">It is our thesis that thousands of discovered new enzymes, proteins, molecules, and novel materials already exist - but none of them are easily scalable, mesoscale-producible, or manufacturable at volume. There are constant cancer solutions discovered in labs. <span className="text-white font-normal">None of them convert in the real world.</span></p>
            </div>
          </motion.div>

        {/* Timeline track - desktop */}
        <div className="relative z-10 hidden lg:flex items-center mb-3">
          <div className="w-3 h-3 rounded-full bg-[#060606] border border-white/20 shrink-0" />
          <div className="flex-1 h-px bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-[#060606] border border-white/20 shrink-0" />
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-rose-500/40" />
          <div className="w-5 h-5 rounded-full bg-rose-500 shadow-[0_0_18px_rgba(244,63,94,0.5)] shrink-0" />
        </div>
        <div className="relative z-10 hidden lg:grid lg:grid-cols-3 gap-6 mb-8">
          {["01 - Digital Discovery", "02 - Lab Synthesis", "03 - Industrial Scale-Up"].map((l, i) => (
            <p key={i} className={`text-xs uppercase tracking-wider ${i === 2 ? "text-rose-400" : "text-white/70"}`}>{l}</p>
          ))}
        </div>

        <div className="relative z-10 grid lg:grid-cols-3 gap-6 mb-10">
          {[
            {
              num: "01", stage: "Digital Discovery",
              players: ["Isomorphic Labs", "Schrödinger"],
              desc: "AI predicts molecular structures in silico. Billions of candidates screened in days.",
              gap: "Output: a digital prediction - not a manufacturing blueprint.",
              border: "border-white/5", bg: "bg-white/[0.01]", numColor: "text-white/40",
              tagBorder: "border-white/15", tagText: "text-white/70", gapColor: "text-white/60",
            },
            {
              num: "02", stage: "Lab Synthesis",
              players: ["Emerald Cloud Lab", "Radical AI"],
              desc: "Autonomous robotic labs synthesize milligrams of material. Proof of existence - not proof of scale.",
              gap: "The industry spends 7 years and $500M building blind physical pilot plants.",
              border: "border-white/5", bg: "bg-white/[0.01]", numColor: "text-white/40",
              tagBorder: "border-white/15", tagText: "text-white/70", gapColor: "text-white/60",
            },
            {
              num: "03", stage: "Industrial Scale-Up",
              players: ["Shodh AI - The Bottleneck"],
              desc: "At the 10,000-litre scale, turbulence, heat transfer, and pressure tear novel molecules apart. 90% of discovered molecules fail here.",
              gap: "Ours to own.",
              border: "border-rose-500/20", bg: "bg-rose-950/10", numColor: "text-rose-400/60",
              tagBorder: "border-rose-500/25", tagText: "text-rose-300/60", gapColor: "text-rose-400/50",
            },
          ].map((s, i) => (
            <motion.div key={i} {...fade} transition={{ delay: i * 0.1 }} className={`rounded-xl border ${s.border} ${s.bg} p-7 md:p-9 flex flex-col`}>
              <p className={`text-[52px] font-extralight leading-none mb-5 ${s.numColor}`}>{s.num}</p>
              <h3 className={`text-base md:text-lg font-light mb-3 ${i === 2 ? "text-white" : "text-white/85"}`}>{s.stage}</h3>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {s.players.map((p, j) => (
                  <span key={j} className={`text-xs px-2.5 py-1 rounded-full border ${s.tagBorder} ${s.tagText} bg-white/[0.02]`}>{p}</span>
                ))}
              </div>
              <p className="text-white/75 font-light text-sm leading-relaxed mb-4 flex-grow">{s.desc}</p>
              <div className={`pt-4 border-t ${i === 2 ? "border-rose-500/10" : "border-white/5"}`}>
                <p className={`text-xs font-light leading-relaxed ${s.gapColor}`}>{s.gap}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-4">
          <motion.div {...fade} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <p className="text-white/55 text-xs uppercase tracking-wider mb-3">How We Fit Together</p>
            <p className="text-white/75 font-light text-sm leading-relaxed">Isomorphic Labs and Radical AI are not our competitors - they are our upstream. They hand us the molecule. We build the factory. <span className="text-white font-normal">We are the only exit for the pipeline.</span></p>
          </motion.div>
          <motion.div {...fade} transition={{ delay: 0.05 }} className="p-6 rounded-2xl bg-rose-950/15 border border-rose-500/20 backdrop-blur-sm">
            <p className="text-white/55 text-xs uppercase tracking-wider mb-3">Structural Advantage</p>
            <p className="text-white/75 font-light text-sm leading-relaxed">Every dollar invested in Isomorphic, Schrödinger, or Recursion creates more demand for Shodh AI. <span className="text-white font-normal">We are the only team solving it.</span></p>
          </motion.div>
        </div>
        </div>
      </section>

      {/* ─── 02: THE SOLUTION ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <div className="flex items-center gap-4 mb-10">
            <span className="text-white/40 font-mono text-base">02</span>
            <div className="h-px w-8 bg-white/15 shrink-0" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">The Solution: The Large Physics Model (LPM)</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-3 max-w-3xl">
            The Vision:<br /><span className="font-normal">Generative Manufacturing.</span>
          </h2>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-10">From Testing Guesses to Generating Blueprints.</p>
          <p className="text-white/55 font-light text-lg max-w-2xl mb-14 leading-relaxed">
            Stop guessing. Input your <span className="text-white font-normal">intent</span> - the AI works backward and writes the exact factory machine code.
          </p>
        </motion.div>

        {/* 5-Step Workflow Diagram - Skandax Style Redesign */}
        <motion.div {...fade} className="mb-14 pb-4">
          {/* Main Diagram Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_24px_1fr_24px_1fr_24px_1fr_24px_1fr] items-center gap-y-6">

            {/* Step 1: Input */}
            <div className="p-5 md:p-6 rounded-xl border border-white/20 bg-[#060606] shadow-[0_0_30px_rgba(255,255,255,0.03)] flex flex-col h-full min-h-[300px]">
              <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">Step 1: Input</p>
              <p className="text-white font-semibold text-lg mb-4">THE INTENT</p>
              <div className="text-xs text-white/70 space-y-3">
                <p className="font-semibold text-white/90">TARGET: NEXT-GEN EV CELL</p>
                <div>
                  <p className="text-white/50 mb-1">Performance:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Energy Density: {'>'} 800 Wh/L</li>
                    <li>Fast Charge: 4C</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/50 mb-1">Constraints:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Vol. Expansion: {'<'} 7%</li>
                    <li>Cobalt-Free</li>
                  </ul>
                </div>
              </div>
              <p className="text-white/30 text-[10px] italic mt-auto pt-4 border-t border-white/10">The Customer&apos;s Problem</p>
            </div>

            <div className="hidden md:flex justify-center"><ArrowRight className="w-5 h-5 text-white/30 shrink-0" /></div>

            {/* Step 2: Genesis (Stacked Cards Effect) */}
            <div className="relative h-[220px] md:h-[240px] flex flex-col justify-center w-full">
              <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl translate-x-2 translate-y-2 max-w-[90%]" />
              <div className="absolute inset-0 bg-white/10 border border-white/15 rounded-xl translate-x-1 translate-y-1 max-w-[95%]" />
              <div className="relative bg-[#060606] border border-white/30 rounded-xl p-5 flex flex-col justify-center shadow-lg h-full z-10">
                <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">Step 2</p>
                <p className="text-white font-semibold text-lg mb-1">GENESIS</p>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-3">Inverse Design</p>
                <p className="text-white/70 text-sm leading-relaxed">Generates 10,000 candidate microstructures</p>
              </div>
              <p className="absolute -bottom-6 left-0 right-0 text-center text-white/40 text-[10px]">Generates the Material</p>
            </div>

            <div className="hidden md:flex justify-center"><ArrowRight className="w-5 h-5 text-white/30 shrink-0" /></div>

            {/* Step 3: Validate (Circular) */}
            <div className="flex flex-col items-center justify-center w-full relative h-[220px] md:h-[240px]">
              <div className="w-40 h-40 md:w-44 md:h-44 rounded-full border-2 border-dashed border-white/20 bg-white/[0.02] flex flex-col items-center justify-center p-4 text-center mx-auto">
                <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">Step 3</p>
                <p className="text-white font-semibold text-lg mb-1">VALIDATE</p>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-2">Physics Screening</p>
                <p className="text-white/70 text-[11px] md:text-xs leading-tight">Simulates 10,000 designs, kills 9,999 failures</p>
              </div>
              <p className="absolute -bottom-6 left-0 right-0 text-center text-white/40 text-[10px]">Kills the Failures (Virtual Cycler)</p>
            </div>

            <div className="hidden md:flex justify-center"><ArrowRight className="w-5 h-5 text-white/30 shrink-0" /></div>

            {/* Step 4: Deploy */}
            <div className="flex flex-col items-center w-full relative h-[220px] md:h-[240px] justify-center">
              <div className="w-full bg-[#060606] border border-white/20 rounded-xl p-5 flex flex-col justify-center h-full">
                <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">Step 4</p>
                <p className="text-white font-semibold text-lg mb-1">DEPLOY</p>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-3">Process Compilation</p>
                <p className="text-white/60 text-[11px] md:text-xs mb-2">Converts to factory settings:</p>
                <ul className="text-white/80 text-[11px] md:text-xs font-mono space-y-1">
                  <li>• Temp: 120°C</li>
                  <li>• Press: 50MPa</li>
                  <li>• Speed: 2m/s</li>
                </ul>
              </div>
              <p className="absolute -bottom-6 left-0 right-0 text-center text-white/40 text-[10px]">Translates to Factory Code</p>
            </div>

            <div className="hidden md:flex justify-center"><ArrowRight className="w-5 h-5 text-white/30 shrink-0" /></div>

            {/* Step 5: Output */}
            <div className="relative w-full h-[220px] md:h-[240px] flex flex-col justify-center">
              <div className="absolute -top-3 -right-3 w-10 h-10 md:w-12 md:h-12 bg-[#060606] rounded-full border border-white/20 flex items-center justify-center z-10 shadow-xl">
                <Check className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="w-full bg-[#060606] border-2 border-white/30 rounded-xl p-5 flex flex-col h-full relative z-0">
                <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">Step 5: Output</p>
                <p className="text-white font-semibold text-lg mb-1">THE REALITY</p>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-2 md:mb-3">Zero-Shot Manufacturing</p>
                <p className="text-white/80 text-[11px] md:text-xs leading-relaxed mb-auto">Battery produced successfully on first try</p>
                
                <div className="pt-2 md:pt-3 border-t border-white/10 mt-2">
                  <div className="flex justify-between text-[11px] md:text-xs mb-1">
                    <span className="text-white/40">Traditional:</span>
                    <span className="text-white font-semibold">5 Years</span>
                  </div>
                  <div className="flex justify-between text-[11px] md:text-xs">
                    <span className="text-sky-400">Shodh AI:</span>
                    <span className="text-sky-400 font-bold">6 Months</span>
                  </div>
                </div>
              </div>
              <p className="absolute -bottom-6 left-0 right-0 text-center text-white/40 text-[10px]">5 Years → 6 Months</p>
            </div>

          </div>

          {/* Dotted reinforcement line - Only show on desktop/tablet where it aligns properly */}
          <div className="mt-16 relative hidden md:block">
            <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-white/15" />
            <div className="absolute left-12 top-1/2 -translate-y-1/2 w-3 h-3 border-t-2 border-l-2 border-white/30 -rotate-45" />
            <div className="absolute right-12 top-0 h-full border-r-2 border-dashed border-white/15" />
            
            <div className="flex justify-center relative">
              <span className="bg-[#060606] px-4 py-1.5 rounded-full border border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                Sim-to-Real Reinforcement Data
              </span>
            </div>
          </div>
        </motion.div>


        <motion.div {...fade} className="mb-16 pt-6 border-t border-white/5">
          <p className="text-white font-light text-xl">We are compressing the 7-year Valley of Death into <span className="font-normal">6 months.</span></p>
        </motion.div>

        {/* Towards Zero Shot Manufacturing */}
        <div className="border-t border-white/5 pt-16 mb-10">
          <motion.div {...fade} className="mb-14">
            <h3 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-3 max-w-4xl">
              Towards Zero Shot<br /><span className="font-normal">Manufacturing.</span>
            </h3>
            <p className="text-white/35 font-light text-lg max-w-xl">One Math Architecture for the Physical World.</p>
          </motion.div>

          {/* Interactive terminal demo */}
          <div className="grid lg:grid-cols-[260px_1fr] gap-6">
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
                      isActive ? `${c.bg} ${c.border} ${c.text}` : "bg-white/[0.02] border-white/5 text-white/40 hover:text-white/70 hover:bg-white/5"
                    }`}
                  >
                    <item.Icon className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-light whitespace-nowrap">{item.industry}</span>
                  </button>
                );
              })}
            </div>

            <motion.div
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl border ${colors.border} bg-black/60 backdrop-blur-sm overflow-hidden`}
            >
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <span className="text-xs text-white/35 font-mono ml-3">shodh-ai - lpm-v2 - prompt</span>
              </div>
              <div className="p-6 md:p-10 space-y-8 font-mono">
                <div>
                  <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">User Prompt</p>
                  <p className="text-xs text-white/30 mb-1">&gt; input:</p>
                  <p className={`text-base md:text-lg ${colors.text} leading-relaxed`}>
                    &ldquo;{displayedPrompt}<span className="animate-pulse">▋</span>&rdquo;
                  </p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">Physics Engine - Coupling</p>
                  <div className="space-y-1.5">
                    {active.physics.map((p, physIdx) => (
                      <div key={physIdx} className="flex items-center gap-2 text-sm text-white/60">
                        <span className="text-white/35">◆</span>{p}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`rounded-xl ${colors.bg} border ${colors.border} p-5`}>
                  <p className="text-white/40 text-xs mb-3 uppercase tracking-wider font-sans">10-Year Grand Impact</p>
                  <p className={`text-base font-sans font-light ${colors.text} leading-relaxed`}>{active.impact}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Introducing LPM */}
        <motion.div {...fade} className="border-t border-white/8 pt-14 mb-10">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Introducing</p>
          <h3 className="text-3xl md:text-5xl font-extralight text-white mb-6">
            The Large Physics Model <span className="text-white/35 font-light">(LPM)</span>
          </h3>
          <p className="text-white/60 font-light text-lg max-w-3xl mb-4 leading-relaxed">
            To make this generative workflow possible, we had to unify the underlying math of the physical world.
          </p>
          <p className="text-white/45 font-light text-base max-w-3xl mb-12 leading-relaxed">
            Legacy tools (COMSOL, Ansys) are deterministic calculators. They take months to run one scenario and are <span className="text-white font-normal">mathematically impossible to invert</span> - meaning they can never be &ldquo;generative.&rdquo; The LPM is a Neural Operator that replaces deterministic math entirely. We coupled the 5 governing equations of industrial scale-up into a single, invertible foundation model.
          </p>

          {/* Equations → LPM convergence */}
          <div className="mb-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
              {[
                { domain: "Fluid Flow", name: "Navier-Stokes", color: "text-blue-300", border: "border-blue-500/20", bg: "bg-blue-950/5" },
                { domain: "Chemical Diffusion", name: "Fick's Law", color: "text-violet-300", border: "border-violet-500/20", bg: "bg-violet-950/5" },
                { domain: "Material Separation", name: "Cahn-Hilliard", color: "text-cyan-300", border: "border-cyan-500/20", bg: "bg-cyan-950/5" },
                { domain: "Stress & Heat", name: "Solid Mechanics + Fourier", color: "text-amber-300", border: "border-amber-500/20", bg: "bg-amber-950/5" },
                { domain: "Electromagnetics", name: "Maxwell's Equations", color: "text-rose-300", border: "border-rose-500/20", bg: "bg-rose-950/5" },
              ].map((eq, i) => (
                <motion.div key={i} {...fade} transition={{ delay: i * 0.07 }} className={`p-4 rounded-xl border ${eq.border} ${eq.bg} flex flex-col gap-1`}>
                  <p className="font-light text-sm text-white leading-tight">{eq.domain}</p>
                  <p className={`font-mono text-xs ${eq.color} opacity-60`}>{eq.name}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mb-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-white/15" />
                <ChevronRight className="w-4 h-4 text-white/20 rotate-90" />
              </div>
            </div>
            <motion.div {...fade} className="mx-auto max-w-xs p-5 rounded-2xl bg-white/[0.04] border border-white/15 text-center">
              <p className="text-white/35 text-xs uppercase tracking-widest mb-1">Foundation Model</p>
              <p className="text-white text-3xl font-extralight tracking-widest">LPM</p>
              <p className="text-white/35 font-light text-xs mt-1">Large Physics Model</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-white/35 text-xs uppercase tracking-wider mb-2">Invertible</p>
              <p className="text-white/55 font-light text-sm leading-relaxed">Works backward from a desired outcome to generate the physical recipe.</p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-white/35 text-xs uppercase tracking-wider mb-2">Neural Operator</p>
              <p className="text-white/55 font-light text-sm leading-relaxed">Processes 3D physics across all domains in milliseconds.</p>
            </div>
          </div>
        </motion.div>

        {/* Impact for Anchor Partners + Industrial Revolution */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <motion.div {...fade} className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 flex flex-col">
            <p className="text-white/35 text-xs uppercase tracking-wider mb-4">Impact for Our Anchor Partners</p>
            <p className="text-white/55 font-light text-sm leading-relaxed mb-3">
              Biocon&apos;s API synthesis relies on 16+ steps in legacy batch reactors. Novel biocatalysts promise a reduction to 2–3 steps - but industrializing them hits a wall: suboptimal fluid dynamics and mass transfer kill enzyme yields at scale.
            </p>
            <p className="text-white/55 font-light text-sm leading-relaxed mb-6">
              Shodh AI designs the exact continuous-flow architecture for each enzyme, compressing 7 years of scale-up into 6 months.
            </p>
            <div className="border-t border-emerald-500/10 pt-4 mt-auto">
              <p className="text-white/35 text-xs uppercase tracking-wider mb-2">Patent Life Recovered</p>
              <p className="text-4xl font-extralight text-emerald-300">+6.75 <span className="text-xl">yrs</span></p>
              <p className="text-white/40 font-light text-xs mt-1">→ <span className="text-white/60 font-normal">$1.35B in monopoly revenue</span> per engagement</p>
            </div>
          </motion.div>

          <motion.div {...fade} transition={{ delay: 0.1 }} className="p-8 rounded-2xl bg-gradient-to-br from-blue-950/20 via-transparent to-violet-950/20 border border-white/8 flex flex-col">
            <p className="text-white/35 text-xs uppercase tracking-wider mb-5">The Fourth Industrial Revolution</p>
            <h4 className="text-white font-light text-2xl leading-snug mb-5">The physical world is the next frontier of AI.</h4>
            <p className="text-white/55 font-light text-sm leading-relaxed mb-3">
              Steam. Electricity. Computers. Now: <span className="text-white font-normal">manufacturing by design.</span> The fourth revolution opens zero-to-billion markets for those bold enough to stake science - and gives an insurmountable competitive edge to those who move first.
            </p>
            <p className="text-white/40 font-light text-sm leading-relaxed mt-auto">
              Nations that control the manufacturing blueprint will define the new industrial order. Invention will no longer be luck. It will be <span className="text-white/70 font-normal">by design.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 03: TECHNOLOGY & DATA ENGINE ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <div className="flex items-center gap-4 mb-10">
            <span className="text-white/40 font-mono text-base">03</span>
            <div className="h-px w-8 bg-white/15 shrink-0" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">The Technology & Data Engine</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-4 max-w-3xl">
            The AI-for-Science<br /><span className="font-normal">Inflection Point.</span>
          </h2>
          <p className="text-white/60 font-light text-lg max-w-3xl mb-14 leading-relaxed">
            We are not waiting for a future breakthrough. The science is already here. We are taking the validated inflection point of AI physics and pushing it to an unprecedented industrial scale.
          </p>
        </motion.div>

        {/* ── Inflection Point Graph (1D vs 3D Physical Complexity) ── */}
        <motion.div {...fade} className="mb-16 rounded-2xl border border-white/8 bg-[#060606] p-8 md:p-12 overflow-hidden relative">
          
          <div className="absolute inset-0 bg-gradient-to-t from-white/[0.03] to-transparent pointer-events-none" />
          
          <p className="text-white/30 text-sm uppercase tracking-[0.2em] mb-4 text-center relative z-10">The Physical Complexity View</p>
          <p className="text-white/50 text-base mb-12 text-center relative z-10 max-w-3xl mx-auto">1D Discovery Models (Sequences) vs. 3D Physical Models (Multi-Physics Tensors)</p>
          
          <div className="relative h-[650px] w-full max-w-6xl mx-auto border border-white/20 bg-white/[0.05] rounded-xl pl-20 backdrop-blur-sm">
            {/* Grid Lines */}
            <div className="absolute inset-0 left-20">
              {[0, 50, 100].map((pct, i) => (
                <div key={`h2-${i}`} className="absolute w-full border-b border-white/20" style={{ top: `${pct}%` }} />
              ))}
              {[0, 16.7, 33.3, 50, 66.7, 83.3, 100].map((pct, i) => (
                <div key={`v2-${i}`} className="absolute h-full border-r border-white/10 border-dashed" style={{ left: `${pct}%` }} />
              ))}
            </div>

            {/* Layer Labels on Left */}
            <div className="absolute left-2 top-[25%] -translate-y-1/2 text-xs text-white/60 font-bold pr-3">
              <p className="text-rose-400 text-sm mb-1">3D Physical Layer</p>
              <p className="text-white/40 text-[10px]">Tensors</p>
              <p className="text-white/40 text-[10px]">(Manufacturing / Sim)</p>
            </div>
            <div className="absolute left-2 top-[75%] -translate-y-1/2 text-xs text-white/60 font-bold pr-3">
              <p className="text-emerald-400 text-sm mb-1">1D Discovery Layer</p>
              <p className="text-white/40 text-[10px]">Sequences</p>
              <p className="text-white/40 text-[10px]">(In Silico)</p>
            </div>

            {/* X-Axis Labels */}
            <div className="absolute -bottom-10 left-20 right-0 flex justify-between text-xs text-white/60 font-mono px-4">
              <span>2018</span><span>2020</span><span>2022</span><span>2024</span><span>2026</span><span>2028</span>
            </div>
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-xs text-white/50 tracking-widest uppercase">
              Year
            </div>

            {/* Zone Background Highlights */}
            <div className="absolute inset-0 left-20 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-[50%] bg-rose-500/5 border-b border-rose-500/20" />
              <div className="absolute top-[50%] left-0 right-0 h-[50%] bg-emerald-500/5" />
            </div>

            {/* SVG for Trend Lines connecting all points in order */}
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0" style={{ left: '5rem', width: 'calc(100% - 5rem)' }} preserveAspectRatio="none">
              <defs>
                <filter id="glowGreen">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glowRose">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* 1D Discovery Track (Emerald) connecting all 1D points */}
              {/* AlphaFold2 (33.3%, 83%) -> AlphaFold3 (50%, 78%) -> C2S (66.7%, 75%) -> Evo2 (75%, 72%) */}
              <path 
                d="M 33.3% 83% L 50% 78% L 66.7% 75% L 75% 72%" 
                fill="none" 
                stroke="#34d399" 
                strokeWidth="4"
                strokeDasharray="6 6"
                filter="url(#glowGreen)"
                vectorEffect="non-scaling-stroke"
                className="opacity-80"
              />

              {/* 3D Physical Track (Rose) connecting all 3D points */}
              {/* FNO (25%, 45%) -> GraphCast (50%, 40%) -> FourCastNet (58.3%, 42%) -> Aurora (66.7%, 35%) -> Shodh AI (75%, 16.6%) */}
              <path 
                d="M 25% 45% L 50% 40% L 58.3% 42% L 66.7% 35% L 75% 16.6%" 
                fill="none" 
                stroke="#fb7185" 
                strokeWidth="4"
                strokeDasharray="6 6"
                filter="url(#glowRose)"
                vectorEffect="non-scaling-stroke"
                className="opacity-80"
              />
            </svg>

            {/* Nodes & Annotations */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ left: '5rem', width: 'calc(100% - 5rem)' }}>
              
              {/* ===== LAYER 2: 1D SEQUENCES (BOTTOM) ===== */}
              
              {/* AlphaFold 2 (2020, ~1B params) */}
              <div className="absolute left-[33.3%] top-[83%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-[0_0_14px_#10b981]" />
                <div className="absolute -top-16 -left-20 w-44">
                  <p className="text-emerald-300 text-xs leading-tight font-semibold">AlphaFold 2</p>
                  <p className="text-white/70 text-[11px]">Protein Structure Prediction</p>
                </div>
              </div>

              {/* AlphaFold 3 (2024, enhanced) - positioned slightly after AF2 */}
              <div className="absolute left-[50%] top-[78%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-white shadow-[0_0_12px_#10b981]" />
                <div className="absolute top-4 -left-16 w-40">
                  <p className="text-emerald-200 text-[11px] leading-tight font-medium">AlphaFold 3</p>
                  <p className="text-white/60 text-[10px]">Drug Discovery (Multi-modal)</p>
                </div>
              </div>

              {/* C2S (2024, 27B params) - FIXED: Moved to 1D Layer */}
              <div className="absolute left-[66.7%] top-[75%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-5 h-5 rounded-full bg-emerald-400 border-2 border-white shadow-[0_0_16px_#10b981]" />
                <div className="absolute -top-16 -left-12 w-44">
                  <p className="text-emerald-300 text-sm leading-tight font-semibold">C2S (Google)</p>
                  <p className="text-white/70 text-xs">27B • Scientific Discovery</p>
                </div>
              </div>

              {/* Evo 2 (2025, 40B params) */}
              <div className="absolute left-[75%] top-[72%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-[0_0_18px_#10b981] animate-pulse" />
                <div className="absolute -top-16 left-4 w-52">
                  <p className="text-emerald-400 text-sm leading-tight font-bold">Evo 2 (Arc/NVIDIA)</p>
                  <p className="text-white/70 text-xs">40B • Genomics Foundation Model</p>
                  <p className="text-white/50 text-[10px] mt-1">9.3T nucleotides trained</p>
                </div>
              </div>

              {/* ===== LAYER 1: 3D PHYSICAL MODELS (TOP) ===== */}
              
              {/* FNO */}
              <div className="absolute left-[25%] top-[45%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-400 border-2 border-white shadow-[0_0_12px_#fb7185]" />
                <div className="absolute top-4 -left-12 w-36">
                  <p className="text-rose-300 text-[11px] leading-tight font-medium">FNO</p>
                  <p className="text-white/70 text-[10px]">Neural Operators</p>
                </div>
              </div>

              {/* GraphCast */}
              <div className="absolute left-[50%] top-[40%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 rounded-full bg-rose-400 border-2 border-white shadow-[0_0_14px_#fb7185]" />
                <div className="absolute -top-14 -left-16 w-40">
                  <p className="text-rose-300 text-xs leading-tight font-semibold">GraphCast</p>
                  <p className="text-white/70 text-[11px]">Weather Forecasting</p>
                </div>
              </div>

              {/* FourCastNet */}
              <div className="absolute left-[58.3%] top-[42%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 rounded-full bg-rose-300 border border-white shadow-[0_0_10px_#fb7185]" />
                <div className="absolute top-4 -left-10 w-32">
                  <p className="text-rose-200 text-[10px] leading-tight">FourCastNet</p>
                  <p className="text-white/60 text-[9px]">Extreme Weather</p>
                </div>
              </div>

              {/* Aurora */}
              <div className="absolute left-[66.7%] top-[35%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 rounded-full bg-rose-400 border-2 border-white shadow-[0_0_14px_#fb7185]" />
                <div className="absolute -top-16 -left-12 w-48">
                  <p className="text-rose-300 text-xs leading-tight font-semibold">Aurora</p>
                  <p className="text-white/70 text-[11px]">1.3B • Earth System</p>
                </div>
              </div>

              {/* Shodh AI LPM - AT THE TOP OF 3D */}
              <div className="absolute left-[75%] top-[16.6%] -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-rose-500/30 rounded-full animate-ping" />
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 border-2 border-white shadow-[0_0_40px_#fb7185] relative z-10 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full opacity-50" />
                  </div>
                </div>
                <div className="absolute top-0 left-16 w-80 bg-[#0a0a0a] border-2 border-rose-500/60 rounded-xl p-5 shadow-2xl">
                  <p className="text-rose-400 text-lg leading-tight font-bold mb-2">Shodh AI - LPM</p>
                  <p className="text-white text-sm font-semibold mb-2">10B Parameters</p>
                  <p className="text-white/90 text-xs leading-snug mb-3 font-medium">The ONLY 3D Multi-Physics Neural Operator for Mesoscale Inverse Manufacturing</p>
                  <div className="pt-3 border-t border-white/20">
                    <p className="text-white/70 text-[11px] leading-relaxed">AlphaFold discovers molecules. GraphCast predicts weather. Shodh AI generates factory blueprints.</p>
                  </div>
                </div>
              </div>

              {/* Arrow from Discovery to Manufacturing */}
              <svg className="absolute left-[75%] top-[70%] w-40 h-80 overflow-visible pointer-events-none z-0">
                <defs>
                  <marker id="arrowhead" markerWidth="12" markerHeight="12" refX="10" refY="3" orient="auto">
                    <polygon points="0 0, 12 3, 0 6" fill="#fb7185" />
                  </marker>
                </defs>
                <path d="M 0 0 Q -30 -150, 0 -330" stroke="#fb7185" strokeWidth="2.5" fill="none" strokeDasharray="6 4" markerEnd="url(#arrowhead)" />
              </svg>
              <div className="absolute left-[77%] top-[50%] w-40 bg-[#060606]/80 p-2 rounded border border-rose-500/20 backdrop-blur-sm z-20">
                <p className="text-rose-300 text-[10px] leading-tight italic font-medium text-center">Discovery flows UP to Manufacturing</p>
              </div>

            </div>
          </div>

          {/* Insight Box */}
          <div className="mt-10 p-6 rounded-xl bg-gradient-to-r from-rose-900/20 via-rose-900/10 to-emerald-900/20 border border-rose-500/20">
            <p className="text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">The Physics/Science Narrative</p>
            <p className="text-white/70 text-sm leading-relaxed">AlphaFold and Evo 2 operate in <span className="text-emerald-400 font-semibold">1D sequence space</span> for discovery. GraphCast, Aurora, and Shodh AI operate in <span className="text-rose-400 font-semibold">3D tensor space</span> for physical simulation and manufacturing. Shodh AI is the only one at the top mastering 3D multi-physics inverse design.</p>
          </div>
        </motion.div>

        {/* ── The Moat ── */}
        <motion.div {...fade} className="mb-16 p-7 md:p-10 rounded-2xl border border-white/8 bg-white/[0.01]">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">The Moat - Why Microsoft and Google Cannot Win This</p>
          <p className="text-white/65 font-light text-base max-w-3xl mb-4 leading-relaxed">
            Models like AlphaFold and Aurora were trained because the data was <span className="text-white font-normal">public</span> - the Protein Data Bank, global weather telemetry. Manufacturing failure data does not exist on the internet. It sits inside heavily guarded corporate silos.
          </p>
          <p className="text-white/65 font-light text-base max-w-3xl leading-relaxed">
            Big Tech cannot scrape a bioreactor&apos;s thermal failure data. Building the manufacturing foundation model requires a pure B2B, federated-learning approach - deploying directly inside enterprise infrastructure. <span className="text-white font-normal">That is our exact GTM.</span>
          </p>
        </motion.div>

        {/* ── Engineering 10B SOTA ── */}
        <motion.div {...fade} className="mb-16">
          <h3 className="text-2xl md:text-4xl font-extralight text-white mb-4 max-w-3xl">Engineering the 10-Billion Parameter SOTA.</h3>
          <p className="text-white/60 font-light text-base max-w-3xl mb-4 leading-relaxed">
            Current state-of-the-art physics models max out around 1.3B parameters. We are building the world&apos;s first <span className="text-white font-normal">10-Billion parameter manufacturing physics model.</span>
          </p>
          <p className="text-white/50 font-light text-sm max-w-3xl mb-8 leading-relaxed">
            Because the physical world is processed in high-resolution 3D multi-physics tensors (X, Y, Z, Time, Temperature, Pressure), a 10B parameter physics model requires the equivalent computational complexity of a 100B+ parameter text-based LLM.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <div className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
              <p className="text-white/45 text-xs uppercase tracking-wider mb-2">Training Partnership</p>
              <p className="text-white/75 font-light text-sm leading-relaxed">Direct collaboration with <span className="text-white font-normal">Google&apos;s JAX team</span> and <span className="text-white font-normal">NVIDIA Modulus & Physics NeMo</span>.</p>
            </div>
            <div className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
              <p className="text-white/45 text-xs uppercase tracking-wider mb-2">Cold-Start Strategy</p>
              <p className="text-white/75 font-light text-sm leading-relaxed">Base model hits <span className="text-white font-normal">90% accuracy</span> via sovereign GPU allocation + synthetic data. Final 10% fine-tuned via enterprise data.</p>
            </div>
            <div className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
              <p className="text-white/45 text-xs uppercase tracking-wider mb-2">Why It Works</p>
              <p className="text-white/75 font-light text-sm leading-relaxed">We push the model to the edge of generalization before enterprises ever share a single proprietary data point.</p>
            </div>
          </div>
        </motion.div>

        {/* ── Sub-section 1: 3D Microstructure Generation ── */}
        <motion.div {...fade} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-white/25 font-mono text-sm">1.</span>
            <h3 className="text-xl md:text-2xl font-light text-white">Proprietary 3D Microstructure Generation</h3>
          </div>
          <p className="text-white/55 font-light text-base max-w-3xl mb-10 leading-relaxed">
            We algorithmically generate synthetic physical structures with <span className="text-white font-normal">95% morphological accuracy</span> compared to real-world lab data. We generate the physical training ground in milliseconds.
          </p>

          {/* Image comparison block */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Left: Real-World */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <p className="text-white/40 text-xs uppercase tracking-widest">Real-World Tomography - Commercial Battery SEM</p>
              </div>
              <div className="grid grid-cols-2 gap-px bg-white/5 p-px">
                <div className="bg-[#060606] min-h-[200px] overflow-hidden flex items-center justify-center">
                  <img
                    src="/SEM_comparison/Samsung_25R6_sem_slices copy.png"
                    alt="Real SEM slices - Samsung 25R6"
                    className="w-full h-full object-contain opacity-90"
                  />
                </div>
                <div className="bg-[#060606] min-h-[200px] overflow-hidden flex items-center justify-center">
                  <img
                    src="/SEM_comparison/Samsung_25R6_sem_isosurface.png"
                    alt="Real SEM isosurface - Samsung 25R6"
                    className="w-full h-full object-contain opacity-90"
                  />
                </div>
              </div>
              <p className="text-white/25 text-xs px-5 py-3 font-light">Samsung 25R6 - Physical scan data</p>
            </div>

            {/* Right: Shodh AI Generated */}
            <div className="rounded-2xl border border-blue-500/20 bg-blue-950/5 overflow-hidden">
              <div className="px-5 py-3 border-b border-blue-500/10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400/50" />
                <p className="text-blue-300/60 text-xs uppercase tracking-widest">Shodh AI - Generated Digital Twin</p>
              </div>
              <div className="bg-[#060606] min-h-[200px] overflow-hidden flex items-center justify-center">
                <img
                  src="/SEM_comparison/sample_003_20260206_125915_sem_isosurface.png"
                  alt="Shodh AI generated SEM isosurface"
                  className="w-full h-full object-contain opacity-95"
                />
              </div>
              <p className="text-blue-300/40 text-xs px-5 py-3 font-light">Algorithmically generated - no physical scan required</p>
            </div>
          </div>

          {/* 95% match callout + validation */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-blue-950/10 border border-blue-500/15">
              <p className="text-blue-300/70 text-xs uppercase tracking-wider mb-2">95% Morphological Match</p>
              <p className="text-white/60 font-light text-sm leading-relaxed">
                Our AI generates synthetic physical structures with perfect mathematical parity to real-world physics - allowing us to train the 10B model without waiting months for physical lab scans.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <span className="text-white/50 text-xs">✓</span>
              </div>
              <div>
                <p className="text-white/35 text-xs uppercase tracking-wider mb-1">Validated by</p>
                <p className="text-white/70 font-light text-sm leading-relaxed">Scientists from <span className="text-white font-normal">Hiroshima University</span> and <span className="text-white font-normal">IIT</span></p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Sub-section 2: DNS Data Engine ── */}
        <motion.div {...fade} transition={{ delay: 0.1 }} className="border-t border-white/5 pt-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-white/25 font-mono text-sm">2.</span>
            <h3 className="text-xl md:text-2xl font-light text-white">Massive DNS Data Engine</h3>
          </div>
          <p className="text-white/55 font-light text-base max-w-3xl mb-10 leading-relaxed">
            Running Direct Numerical Simulations (DNS) on priority national GPU clusters, we generate millions of high-fidelity synthetic training data points. What takes legacy solvers months per simulation, our Neural Operators process in milliseconds.
          </p>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
              <p className="text-white/35 text-xs uppercase tracking-wider mb-1">Legacy Solvers (COMSOL, Ansys)</p>
              <p className="text-white/40 font-mono text-base line-through">Months per simulation</p>
            </div>
            <div className="h-px w-12 bg-white/10 hidden md:block" />
            <div>
              <p className="text-emerald-400/60 text-xs uppercase tracking-wider mb-1">Shodh AI Neural Operators</p>
              <p className="text-emerald-300 font-mono text-base">Milliseconds. Fully invertible.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── 04: PRODUCT OUTPUT ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <div className="flex items-center gap-4 mb-10">
            <span className="text-white/40 font-mono text-base">04</span>
            <div className="h-px w-8 bg-white/15 shrink-0" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">Product Output: What The User Gets</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            A two-way<br /><span className="font-normal">engineering engine.</span>
          </h2>
          <p className="text-white/55 font-light text-lg max-w-2xl mb-16 leading-relaxed">
            The LPM operates in both directions. It can predict physical failure - and it can invert that logic to generate a factory blueprint from scratch.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Forward Model */}
          <motion.div {...fade} className="rounded-2xl border border-blue-500/30 bg-blue-950/10 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-blue-500/10 bg-blue-950/10">
              <p className="text-blue-300/70 text-xs uppercase tracking-[0.25em]">The Forward Model - Predict Failure</p>
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
                <p className="text-white/30 text-xs font-mono uppercase mb-2">Output - 90%+ Accuracy</p>
                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 font-mono text-sm text-blue-200 leading-relaxed">
                  AI predicts the exact physical degradation and system failure point in milliseconds.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Inverse Model */}
          <motion.div {...fade} transition={{ delay: 0.1 }} className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-emerald-500/10 bg-emerald-950/10">
              <p className="text-emerald-400/50 text-xs uppercase tracking-[0.25em]">The Inverse Model - Generative Process Compiler</p>
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
          <div className="flex items-center gap-4 mb-10">
            <span className="text-white/40 font-mono text-base">05</span>
            <div className="h-px w-8 bg-white/15 shrink-0" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">The Strategy: Why Open Source?</p>
          </div>
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
          <div className="flex items-center gap-4 mb-10">
            <span className="text-white/40 font-mono text-base">06</span>
            <div className="h-px w-8 bg-white/15 shrink-0" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">Industry Validation & Anchors</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Why one model solves Pharma,<br /><span className="font-normal">Batteries, and Chemicals.</span>
          </h2>
          <div className="max-w-2xl mb-16 space-y-4">
            <p className="text-white/65 font-light text-lg leading-relaxed">
              These industries look completely different on paper. Physically, they are the exact same problem: <span className="text-white font-normal">a fluid moving through a porous solid under heat, pressure, and chemical reaction.</span>
            </p>
            <p className="text-white/50 font-light leading-relaxed">
              A drug bioreactor. A solid-state battery. A carbon membrane. Strip away the industry names, and the physics is identical. We coupled the five governing equations into one unified model - the LPM.
            </p>
            <p className="text-white/50 font-light leading-relaxed">
              We are proving the LPM across three highly distinct trillion-dollar verticals <span className="text-white font-normal">right now:</span>
            </p>
          </div>
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
          <div className="flex items-center gap-4 mb-10">
            <span className="text-white/40 font-mono text-base">07</span>
            <div className="h-px w-8 bg-white/15 shrink-0" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">The Proof: Our AlphaFold Moment</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            25-day blind<br /><span className="font-normal">Sim-to-Real sprint.</span>
          </h2>
          <p className="text-white/55 font-light text-lg max-w-2xl mb-16 leading-relaxed">
            To validate the underlying physics engine, we ran a blind sprint on solid-state batteries - one of the most complex multiphysics environments in materials science. We didn&apos;t just simulate - we generated the recipe, physically built it, and predicted the degradation.
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

      {/* ─── 08: REVENUE ARCHITECTURE ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <div className="flex items-center gap-4 mb-10">
            <span className="text-white/40 font-mono text-base">08</span>
            <div className="h-px w-8 bg-white/15 shrink-0" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">The Revenue Architecture</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Three compounding<br /><span className="font-normal">revenue layers.</span>
          </h2>
          <p className="text-white/55 font-light text-lg max-w-2xl mb-16 leading-relaxed">
            We operate on three layers for enterprise partners - from immediate NRE cash flow to perpetual royalties on global physical output.
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
          <div className="flex items-center gap-4 mb-10">
            <span className="text-white/40 font-mono text-base">09</span>
            <div className="h-px w-8 bg-white/15 shrink-0" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">The Ask & The $100M Capital Stack</p>
          </div>
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
          <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-6">Go-To-Market Roadmap - What the $50M buys</p>
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
            Partner with Us - arastu@shodh.ai
          </a>
        </motion.div>
      </section>
    </div>
  );
}
