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
    detail: "Deploying the universal base model to generate the AI blueprint for scaling complex biologicals from lab synthesis to commercial bioreactors.",
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

type DeckVariant = "right" | "front";

export default function ShodhDeckV3Right({ variant = "right" }: { variant?: DeckVariant }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeVision, setActiveVision] = useState(0);
  const [displayedPrompt, setDisplayedPrompt] = useState("");
  const [expandedAlphaFoldView, setExpandedAlphaFoldView] = useState<"chart" | "matrices" | null>(null);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFront = variant === "front";

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
          <span className="text-xs font-light tracking-[0.3em] uppercase text-white/30">Shodh AI — Confidential Investor Briefing</span>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden border-b border-white/5">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 mix-blend-screen" style={{ filter: 'brightness(1.5) contrast(1.2)' }}>
            <source src="/video.mp4" type="video/mp4" />
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

      <div className="relative xl:pl-72 2xl:pl-80">
        <div className="hidden xl:block absolute left-4 top-10 bottom-0 w-56 pointer-events-none 2xl:left-6">
          <nav className="sticky top-28 z-40 flex flex-col gap-6 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 pointer-events-auto">
            {[
              { label: "1. The Thesis", href: "#thesis", desc: "Bits vs Atoms, Valley of Death" },
              { label: "2. The LPM", href: "#lpm", desc: "Generative workflow, Zero-shot" },
              { label: "3. Sim-to-Real Proof", href: "#proof", desc: "3D Data factory, Silicon Anode" },
              { label: "4. Enterprise Anchors", href: "#anchors", desc: "Big Tech Moat, Anchor Partners" },
              { label: "5. The Capital Stack", href: "#capital", desc: "The $100M structure, Roadmap" }
            ].map((item, i) => (
              <a key={i} href={item.href} className="group flex flex-col items-start gap-1 text-left">
                <span className="text-xs font-mono tracking-widest text-white/40 group-hover:text-white transition-colors">{item.label}</span>
                <span className="text-[10px] text-white/20 group-hover:text-white/40 transition-colors max-w-[140px] leading-tight">{item.desc}</span>
              </a>
            ))}
          </nav>
        </div>

      {/* ─── 00: BITS VS. ATOMS ─── */}
      <section id="thesis" className="px-6 py-28 md:py-36 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade}>
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">{isFront ? "Why This Matters Now" : "The Macro Reality"}</p>
            <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-10 max-w-5xl">
              {isFront ? (
                <>
                  The first wave of AI automated<br /><span className="text-white/35">digital work.</span><br />
                  <span className="font-normal">The next wave expands what humanity can physically build.</span>
                </>
              ) : (
                <>
                  OpenAI/Anthropic fighting for<br /><span className="text-white/35">20% of the economy.</span><br />
                  <span className="font-normal">AI-for-science unlocks the other 80%.</span>
                </>
              )}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mb-12">
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
                <p className="text-white/30 text-xs uppercase tracking-wider mb-3">The Digital Economy — Bits</p>
                <p className="text-5xl font-extralight text-white/25 mb-4">20%</p>
                <p className="text-white/45 font-light text-sm leading-relaxed mb-4">{isFront ? "OpenAI, Anthropic, and others compress human work in language, code, and digital workflows." : "Automating Digital Labor. Foundation models today are replacing human workers to optimize existing digital workflows. It is an efficiency game."}</p>
                <div className="flex flex-wrap gap-2">
                  {(isFront ? ["GPT", "Claude", "Gemini", "Llama"] : ["Code Generation", "Copywriting", "Customer Support", "SaaS Workflows"]).map((m) => (
                    <span key={m} className="text-xs px-2.5 py-1 rounded-full border border-white/8 text-white/30">{m}</span>
                  ))}
                </div>
              </div>
              <div className="p-8 rounded-2xl border border-rose-500/20 bg-rose-950/10">
                <p className="text-rose-400/70 text-xs uppercase tracking-wider mb-3">The Physical Economy — Atoms</p>
                <p className="text-5xl font-extralight text-white mb-4">80%</p>
                <p className="text-white/65 font-light text-sm leading-relaxed mb-4">{isFront ? <>Manufacturing, energy, semiconductors, chemicals, pharma, defense. AI for science does not just replace experts — it lets us engineer systems, materials, and factories <span className="text-white font-normal">humans could never manually search or optimize.</span></> : <>Expanding the Boundaries of Physics. AI for Science isn&apos;t replacing humans. It is solving physical constraints human minds cannot compute, creating entirely new zero-to-billion dollar markets.</>}</p>
                <div className="flex flex-wrap gap-2">
                  {(isFront ? ["Pharma", "Batteries", "Chemicals", "Defense", "Materials"] : ["Solid-State Batteries", "Space Alloys", "Semiconductor Lithography", "Next-Gen Chemicals"]).map((m) => (
                    <span key={m} className="text-xs px-2.5 py-1 rounded-full border border-rose-500/20 text-rose-300/60">{m}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="max-w-3xl border-l-2 border-rose-500/30 pl-6 py-2">
              <p className="text-white/60 font-light text-xl leading-relaxed">
                {isFront ? <>The frontier is shifting from replacing what humans already do to building what humans still <span className="text-white font-normal">cannot design, test, or manufacture on their own.</span></> : <>Building the AI for the physical world will be <span className="text-white font-normal">vastly more consequential</span> — and create <span className="text-white font-normal">vastly larger companies</span> — than AI for the digital world. Automating the digital world saves billions. Compiling the physical world creates trillions.</>}
              </p>
            </div>
          </motion.div>
        </div>
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
              "One of 12 foundational model teams selected by the sovereign IndiaAI Mission — with priority access on national GPU compute.",
              "Mandate to build AI for Science — the foundation model for the physical world.",
              "Founder Pedigree: PhD, Cambridge University — Material Science & Photonic Engineering. Former Microsoft Research.",
              "Early Traction — The Sim-to-Real Proof: Our v1 300M parameter model achieved ~70% zero-shot accuracy predicting physical failure points in silicon anode battery wet-lab builds. We have proven the math translates to reality. Now, we scale to 10B.",
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
                { src: "/demo/nvidia-partner-logo.png", alt: "NVIDIA", className: "h-10 max-w-[168px]" },
                { src: "/DeepMind_logo.png", alt: "Google DeepMind", className: "h-8 max-w-[120px]" },
                { src: "/logos/google-logo.svg", alt: "Google", className: "h-8 max-w-[120px]" },
                { src: "/india-ai-logo-650x311.png", alt: "IndiaAI" },
              ].map((logo) => (
                <div key={logo.alt} className={`${logo.alt === "NVIDIA" ? "h-10" : "h-8"} flex items-center opacity-55 hover:opacity-80 transition-opacity duration-200`}>
                  <img src={logo.src} alt={logo.alt} className={`${logo.className ?? "h-8 max-w-[120px]"} w-auto object-contain`} style={{ filter: "brightness(0) invert(1)" }} />
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </section>

      {/* ─── 01: THE PROBLEM ─── */}
      <section className="px-6 py-28 md:py-36 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade}>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-white/40 font-mono text-base">01</span>
              <div className="h-px w-8 bg-white/15 shrink-0" />
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">The Problem: The Mesoscale Valley of Death</p>
            </div>

            {isFront && (
            <div className="mb-10 p-6 rounded-2xl bg-amber-950/10 border border-amber-500/20">
              <p className="text-amber-400/70 text-xs uppercase tracking-wider mb-3">The Investor Misconception</p>
              <p className="text-white/70 font-light text-base leading-relaxed">
                <>AI for science is not one market. It has two layers: <span className="text-white font-normal">discovery</span>, which finds candidates, and <span className="text-white font-normal">mesoscale</span>, which turns them into reliable industrial output. Discovery is accelerating toward abundance. Mesoscale remains scarce, expensive, and mission-critical.</>
              </p>
            </div>
            )}
            <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-6 max-w-4xl">
              {isFront ? (
                <>
                  Discovery creates<br /><span className="text-white/40">possibility.</span><br />
                  Mesoscale creates<br /><span className="font-normal text-white">industry.</span>
                </>
              ) : (
                <>
                  The Two Layers of<br /><span className="font-normal">AI for Science.</span>
                </>
              )}
            </h2>
            {!isFront && (
            <p className="text-white/50 font-light text-lg md:text-2xl mb-14 max-w-3xl leading-relaxed">
              Industry&apos;s bottleneck is not only discovery.<br />The deeper bottleneck is <span className="text-white font-normal">the mesoscale.</span>
            </p>
            )}
            {isFront && (
            <p className="text-white/70 font-light text-xl max-w-3xl mb-6">
              AI for science has two very different value layers.
            </p>
            )}
            {isFront ? (
              <div className="space-y-8 mb-6">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
                  <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-6 md:p-8">
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <p className="text-white/35 text-xs uppercase tracking-[0.22em]">AI for Science Map</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-950/10 text-rose-300/70 text-[11px] uppercase tracking-[0.18em]">
                        <span>Shodh owns mesoscale</span>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
                      <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                        <p className="text-white/35 text-xs uppercase tracking-wider mb-2">Layer 1</p>
                        <h3 className="text-white text-2xl font-light mb-3">Discovery</h3>
                        <p className="text-white/55 text-sm leading-relaxed mb-4">Find the molecule, protein, material, or architecture that could work.</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {["AlphaFold", "Isomorphic", "Schrödinger"].map((item) => (
                            <span key={item} className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-white/45">{item}</span>
                          ))}
                        </div>
                        <div className="pt-4 border-t border-white/8">
                          <p className="text-emerald-300/70 text-xs uppercase tracking-wider mb-1">Economic direction</p>
                          <p className="text-white/50 text-sm">Faster, cheaper, increasingly abundant.</p>
                        </div>
                      </div>
                      <div className="hidden md:flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-white/25" />
                      </div>
                      <div className="rounded-2xl border border-rose-500/20 bg-rose-950/12 p-5 shadow-[0_0_40px_rgba(244,63,94,0.08)]">
                        <p className="text-rose-300/70 text-xs uppercase tracking-wider mb-2">Layer 2</p>
                        <h3 className="text-white text-2xl font-light mb-3">Mesoscale</h3>
                        <p className="text-white/70 text-sm leading-relaxed mb-4">Figure out the reactor, process window, yield, purity, defects, and scaling conditions that make discovery manufacturable.</p>
                        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-white/45">
                          {[
                            "Heat transfer",
                            "Turbulence",
                            "Diffusion",
                            "Pressure",
                            "Yield",
                            "Defects",
                          ].map((item) => (
                            <div key={item} className="rounded-lg border border-rose-500/10 bg-black/20 px-3 py-2">{item}</div>
                          ))}
                        </div>
                        <div className="pt-4 border-t border-rose-500/10">
                          <p className="text-rose-300/70 text-xs uppercase tracking-wider mb-1">Economic direction</p>
                          <p className="text-white/70 text-sm">Scarce, painful, high-margin, and still largely uncontested.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-6 md:p-8">
                    <p className="text-white/35 text-xs uppercase tracking-[0.22em] mb-6">Valley of Death</p>
                    <div className="space-y-5">
                      <div className="grid grid-cols-[1fr_auto_1fr_auto_1.2fr] items-center gap-3 text-center">
                        <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-5">
                          <p className="text-white/35 text-[11px] uppercase tracking-wider mb-1">Step 1</p>
                          <p className="text-white font-light">Discovery</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/20 mx-auto" />
                        <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-5">
                          <p className="text-white/35 text-[11px] uppercase tracking-wider mb-1">Step 2</p>
                          <p className="text-white font-light">Lab Proof</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/20 mx-auto" />
                        <div className="rounded-2xl border border-rose-500/20 bg-rose-950/15 px-4 py-5">
                          <p className="text-rose-300/70 text-[11px] uppercase tracking-wider mb-1">Step 3</p>
                          <p className="text-white font-light">Commercial Scale-Up</p>
                        </div>
                      </div>
                      <div className="relative h-16 rounded-2xl overflow-hidden border border-red-500/15 bg-black/20">
                        <div className="absolute inset-y-0 left-[36%] right-[12%] bg-gradient-to-r from-red-950/40 via-red-500/20 to-rose-950/40" />
                        <div className="absolute inset-y-0 left-[36%] right-[12%] border-x border-red-500/20 border-dashed" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="px-4 py-2 rounded-full bg-[#060606] border border-red-500/20 text-red-300 text-xs uppercase tracking-[0.18em]">
                            Valley of Death
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-center">
                          <p className="text-red-300 text-2xl font-extralight mb-1">90%</p>
                          <p className="text-white/40 text-[11px] uppercase tracking-wider">Fail to reach market</p>
                        </div>
                        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-center">
                          <p className="text-white text-2xl font-extralight mb-1">6–8y</p>
                          <p className="text-white/40 text-[11px] uppercase tracking-wider">Trial-and-error scale-up</p>
                        </div>
                        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-center">
                          <p className="text-white text-2xl font-extralight mb-1">$500M</p>
                          <p className="text-white/40 text-[11px] uppercase tracking-wider">Capital burned per program</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 mb-6">
                <div className="p-8 rounded-2xl border border-white/8 bg-white/[0.02]">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-white/60 font-mono text-base">Layer 1</span>
                    <div className="h-px flex-1 bg-white/8" />
                    <span className="text-white/60 text-sm uppercase tracking-wider">Discovery — The Microscale</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-4">The Players</p>
                      <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
                          <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Frontier AI</p>
                          <p className="text-white font-light text-base">Google DeepMind, Microsoft, NVIDIA, Isomorphic</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
                          <p className="text-white/50 text-xs uppercase tracking-wider mb-1">AI Labs</p>
                          <p className="text-white font-light text-base">Radical AI, Lila Science</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-4">The Reality</p>
                      <ul className="space-y-3">
                        {[
                          "Rapidly commoditizing. Discovery relies on clean, public digital data.",
                          "In three years, predicting a molecular structure will be free.",
                          "When the supply of \u201cdigital molecules\u201d goes to infinity, the value of a discovery drops to zero.",
                        ].map((point, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-white/70 font-light text-base leading-relaxed">
                            <span className="text-white/30 shrink-0 mt-1">&mdash;</span><span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-8 rounded-2xl border border-rose-500/20 bg-rose-950/10">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-rose-300/80 font-mono text-base">Layer 2</span>
                    <div className="h-px flex-1 bg-rose-500/20" />
                    <span className="text-rose-300/80 text-sm uppercase tracking-wider">Manufacturing — The Mesoscale</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-rose-300/50 text-xs uppercase tracking-wider mb-2">The Players</p>
                      <p className="text-white font-light text-base leading-relaxed">Legacy process engineering and physical trial-and-error. No dedicated AI layer exists.</p>
                    </div>
                    <div>
                      <p className="text-rose-300/50 text-xs uppercase tracking-wider mb-3">The Reality</p>
                      <ul className="space-y-2.5">
                        <li className="flex items-start gap-2.5 text-white font-light text-base leading-relaxed">
                          <span className="text-rose-300/40 shrink-0 mt-1">&mdash;</span>
                          <span>Completely unsolved. Moving a digital molecule into a 10,000-liter factory reactor means fighting the chaotic laws of physics — thermodynamics, fluid dynamics, and heat transfer.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isFront && (
            <div className="border-l-2 border-white/10 pl-6 py-2 mb-16 max-w-3xl">
              <p className="text-white/55 font-light leading-relaxed">The world does not need more breakthroughs that die in pilot plants. It needs an intelligence layer that converts scientific possibility into repeatable production, cost advantage, and global supply.</p>
            </div>
            )}
          </motion.div>

        </div>
      </section>

      {/* ─── VALLEY OF DEATH ─── */}
      {!isFront && (
      <section className="px-6 py-28 md:py-36 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade}>
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">The Bottleneck</p>
            <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-4 max-w-4xl">
              The<br /><span className="font-normal">&ldquo;Valley of Death.&rdquo;</span>
            </h2>
            <p className="text-white font-light text-2xl max-w-3xl mb-10 leading-relaxed">
              90% of AI-discovered molecules will never see the market.
            </p>
            <div className="border-l-2 border-white/15 pl-6 py-1 mb-16 max-w-3xl space-y-4">
              <p className="text-white/70 font-light text-base leading-relaxed">Thousands of discovered new enzymes, proteins, molecules, and novel materials already exist — but none of them are easily scalable, mesoscale-producible, or manufacturable at volume.</p>
              <p className="text-white/70 font-light text-base leading-relaxed">There are constant cancer solutions discovered in labs. <span className="text-white font-normal">None of them convert in the real world.</span></p>
            </div>
          </motion.div>


          <motion.div {...fade} className="mb-6 p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-white/10">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-6">Case Study — Biocon</p>
            <p className="text-white font-light text-xl leading-relaxed mb-3 max-w-3xl">
              &ldquo;We have novel biocatalysts that can cut our 16-step API synthesis to 3 steps. But when we scale to an industrial reactor, the enzyme dies.&rdquo;
            </p>
            <p className="text-white/60 font-light text-base italic mb-6">— Kiran Mazumdar-Shaw, Chairperson, Biocon</p>
            <div className="pt-5 border-t border-white/8">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Biocon</p>
              <p className="text-white/55 font-light text-sm">India’s largest biopharmaceutical company. $1.5B in revenue.</p>
            </div>
          </motion.div>

          <motion.div {...fade} className="mb-12 p-8 md:p-10 rounded-2xl bg-rose-950/10 border border-rose-500/20">
            <p className="text-rose-300/60 text-xs uppercase tracking-wider mb-6">Case Study — Log9 Materials</p>
            <p className="text-white font-light text-2xl leading-relaxed mb-3 max-w-3xl">
              &ldquo;My company is dead.&rdquo;
            </p>
            <p className="text-white/60 font-light text-base italic mb-6">— Akshay Singhal, Founder, Log9 Materials</p>
            <div className="pt-5 border-t border-rose-500/15 grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-rose-300/50 text-xs uppercase tracking-wider mb-1">Log9 Materials</p>
                <p className="text-white/70 font-light text-sm">One of the most celebrated deep-tech battery startups in India.</p>
              </div>
              <div>
                <p className="text-rose-300/50 text-xs uppercase tracking-wider mb-1">The Result</p>
                <p className="text-white font-light text-sm">10 years of R&amp;D wiped out.</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fade}>
            <p className="text-white/60 text-xs uppercase tracking-wider mb-6">The Cost of the Valley</p>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  label: "The Time Trap",
                  stat: "6–8 yrs",
                  desc: "Stuck in physical pilot-plant trial-and-error.",
                  color: "text-white", border: "border-white/8", bg: "bg-white/[0.02]",
                },
                {
                  label: "The Lost Monopoly",
                  stat: "$1.35B",
                  desc: "Lost in patent monopoly revenue per molecule due to scale-up delays.",
                  color: "text-red-300", border: "border-red-500/20", bg: "bg-red-950/10",
                },
              ].map((item, i) => (
                <motion.div key={i} {...fade} transition={{ delay: i * 0.08 }} className={`p-6 rounded-2xl border ${item.border} ${item.bg}`}>
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-3">{item.label}</p>
                  <p className={`text-5xl font-extralight ${item.color} mb-3`}>{item.stat}</p>
                  <p className="text-white/80 font-light text-base leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* ─── THE SECRET: PROCESS IS THE PRODUCT ─── */}
      <section className="px-6 py-28 md:py-36 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade}>
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">The Secret</p>
            <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-6 max-w-4xl">
              {isFront ? <>When discovery gets cheaper,<br /><span className="font-normal">process captures the margin.</span></> : <>Once Discovery is commoditized,<br /><span className="font-normal">Process becomes everything.</span></>}
            </h2>
            <p className="text-white/50 font-light text-xl max-w-3xl mb-16 leading-relaxed">
              {isFront ? <>In the physical world, <span className="text-white font-normal">process is the moat.</span> Knowing what to make is not enough; the value sits in making it reproducibly, at scale, with superior yield, lower defects, and lower cost.</> : <>In the physical world, <span className="text-white font-normal">Process IS the Product.</span> Knowing the formula is worthless without knowing how to make it at scale.</>}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {[
              {
                industry: "Semiconductors & Quantum Chips", stat: "99%",
                color: "text-blue-300", border: "border-blue-500/20", bg: "bg-blue-950/5",
                body: isFront ? "NVIDIA, AMD, and Apple design the chip. TSMC captures enormous value by making the impossible manufacturable. It made the fabless world real by owning the process node." : "TSMC controls the world because they mastered lithography physics. In quantum, knowing the qubit architecture is useless if you can’t manufacture the photonic chips with atomic precision.",
              },
              {
                industry: "Batteries & Energy Storage", stat: "90%",
                color: "text-emerald-300", border: "border-emerald-500/20", bg: "bg-emerald-950/5",
                body: isFront ? "We have known promising battery chemistries for years. The winner is whoever can mass-produce them with low defects, high yield, and the right cost curve." : "We’ve known about solid-state chemistry for a decade. The winner is whoever can mass-produce them without defects at $50/kWh — breaking China’s monopoly.",
              },
              {
                industry: "Aerospace, Defense & Nuclear", stat: "90%",
                color: "text-violet-300", border: "border-violet-500/20", bg: "bg-violet-950/5",
                body: isFront ? "Knowing the alloy is not enough. The margin sits in the thermal path, cooling curve, and process window that prevents micro-cracks at production scale." : "Knowing the superalloy mix is useless without the exact thermal cooling gradient to forge it for a Raptor engine or a next-gen nuclear reactor.",
              },
              {
                industry: "Specialty Chemicals", stat: "80%",
                color: "text-amber-300", border: "border-amber-500/20", bg: "bg-amber-950/5",
                body: isFront ? "Everyone can know the target molecule. The winner achieves 99.9% purity, yield, and throughput in continuous flow. That operational secret compounds into huge margins." : "Everyone knows the public molecules. The winner achieves 99.9% purity in continuous flow with the lowest heat waste. That operational secret is worth billions.",
              },
              {
                industry: "Biopharma & Biologics", stat: "40%",
                color: "text-rose-300", border: "border-rose-500/20", bg: "bg-rose-950/5",
                body: isFront ? "Process engineering in biopharma protects the yield, stability, and purity of every biologic. The molecule is discovered in a vial; the margin is manufactured in the reactor." : "The FDA’s literal rule is \"The Process is the Product.\" If you change the fluid dynamics in a 10,000L bioreactor, the cell dies. The IP is the drug; the scale-up is the gross margin.",
              },
            ].map((item, i) => (
              <motion.div key={i} {...fade} transition={{ delay: i * 0.08 }} className={`p-8 rounded-2xl border ${item.border} ${item.bg}`}>
                <div className="flex items-start justify-between mb-4">
                  <p className="text-white/35 text-xs uppercase tracking-wider">{item.industry}</p>
                  <p className={`text-3xl font-extralight ${item.color}`}>{item.stat}</p>
                </div>
                <p className={`font-light text-sm mb-2 ${item.color}`}>Process is {item.stat} of the value.</p>
                <p className="text-white/50 font-light text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} className="p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-white/10">
            {isFront ? (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-white/35 text-xs uppercase tracking-wider mb-4">The Insight That Changes Everything</p>
                  <p className="text-white/50 font-light text-lg leading-relaxed mb-3">Discovery gives you a candidate.</p>
                  <p className="text-2xl md:text-3xl font-extralight text-white leading-tight">Our Large Physics Model gives you the <span className="font-normal">exact manufacturing process</span> that turns it into a scalable business.</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-2xl">&#x1F9EA;</span>
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider">Discovery Layer</p>
                      <p className="text-white/55 font-light">Many teams can propose the molecule</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 rounded-xl bg-rose-950/20 border border-rose-500/20">
                    <span className="text-2xl">&#x1F525;</span>
                    <div>
                      <p className="text-rose-300/60 text-xs uppercase tracking-wider">Process Layer — Shodh AI</p>
                      <p className="text-white font-light">We compile the factory</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <p className="text-white/40 text-xs uppercase tracking-wider">The Insight That Changes Everything</p>
                <div className="grid md:grid-cols-2 gap-8 items-end">
                  <div>
                    <p className="text-white/60 font-light text-xl leading-relaxed mb-4">Discovery gives you a digital blueprint.</p>
                    <p className="text-3xl md:text-4xl font-extralight text-white leading-tight">Our Large Physics Model gives you the <span className="font-normal">exact factory process</span> to actually build it.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Layer 1 — Discovery</p>
                      <p className="text-white/70 font-light text-base">A digital molecule exists in a computer.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-rose-500/25 bg-rose-950/15">
                      <p className="text-rose-300/70 text-xs uppercase tracking-wider mb-2">Layer 2 — Shodh AI</p>
                      <p className="text-white font-light text-base">The LPM compiles the exact factory process to manufacture it at scale.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── 02: THE SOLUTION ─── */}
      <section id="lpm" className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <div className="flex items-center gap-4 mb-10">
            <span className="text-white/40 font-mono text-base">02</span>
            <div className="h-px w-8 bg-white/15 shrink-0" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">The Solution: The Large Physics Model (LPM)</p>
          </div>
          <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-4">{isFront ? "The Grand Vision" : "The Fourth Industrial Revolution"}</p>
          <h2 className="text-5xl md:text-8xl font-extralight leading-[0.92] tracking-tight mb-8 max-w-5xl">
            {isFront ? <>Humanity stops discovering by accident<br /><span className="font-normal">and starts building by design.</span></> : <>Steam. Electricity. Computers.<br /><span className="font-normal">Now: manufacturing by design.</span></>}
          </h2>
          <p className="text-white/55 font-light text-lg max-w-2xl mb-16 leading-relaxed">
            {isFront ? <>AI for science will not just speed up research. It will widen the set of medicines, materials, reactors, chips, and energy systems civilization can <span className="text-white font-normal">reliably manufacture.</span></> : "Nations that control the manufacturing blueprint define the new industrial order. Invention will no longer be luck."}
          </p>
        </motion.div>

        {isFront && (
        <motion.div {...fade} className="mb-14 border-t border-white/5 pt-14">
          <h3 className="text-3xl md:text-5xl font-extralight leading-tight tracking-tight mb-3 max-w-3xl">
            The Vision:<br /><span className="font-normal">Generative Manufacturing.</span>
          </h3>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-8">From Testing Guesses to Generating Blueprints.</p>
          <p className="text-white/55 font-light text-lg max-w-2xl mb-14 leading-relaxed">
            Stop guessing. Input your <span className="text-white font-normal">intent</span> — the AI works backward and writes the exact factory machine code.
          </p>
        </motion.div>
        )}


        {/* 5-Step Workflow Diagram — Skandax Style Redesign */}
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



        {/* Towards Zero Shot Manufacturing */}
        {!isFront && (
        <>
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
                <span className="text-xs text-white/35 font-mono ml-3">shodh-ai — lpm-v2 — prompt</span>
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
                  <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">Physics Engine — Coupling</p>
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
          <p className="text-white/70 font-light text-xl max-w-3xl mb-5 leading-relaxed">
            We unified the underlying math of the physical world into a single foundation model.
          </p>
          <p className="text-white/55 font-light text-base max-w-3xl mb-12 leading-relaxed">
            To create the &ldquo;Fabless Physical Economy,&rdquo; we had to solve a mathematical impossibility. You cannot build a factory using trial-and-error. You need a model that can process the laws of physics backward—starting from the perfect product and generating the exact factory process to make it.
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

          <p className="text-white/50 text-xs uppercase tracking-wider mb-4">What the LPM Actually Does</p>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/8">
              <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Neural Operator</p>
              <p className="text-white/75 font-light text-sm leading-relaxed">Processes 3D/4D physics across all domains in milliseconds, not months.</p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/8">
              <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Fully Invertible — Inverse Design</p>
              <p className="text-white/75 font-light text-sm leading-relaxed">You input the desired zero-defect outcome. The LPM generates the exact thermal, fluid, and pressure recipe to manufacture it.</p>
            </div>
          </div>
        </motion.div>

        {/* Patent stat */}
        <motion.div {...fade} className="mt-10 p-8 rounded-2xl bg-emerald-950/15 border border-emerald-500/20">
          <p className="text-emerald-300/60 text-xs uppercase tracking-wider mb-3">The ROI — Patent Life Recovered</p>
          <p className="text-5xl font-extralight text-emerald-300 mb-4">+6.75 <span className="text-2xl">yrs</span></p>
          <p className="text-white/75 font-light text-base">By skipping the pilot plant, we unlock <span className="text-emerald-300 font-normal">$1.35B in monopoly revenue</span> per molecule for our partners.</p>
        </motion.div>
        </>
        )}
      </section>


      {/* ─── 03: TECHNOLOGY & DATA ENGINE ─── */}
      {!isFront && (
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

              {/* Shodh AI LPM - simple dot marker */}
              <div className="absolute left-[75%] top-[16.6%] -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-rose-500/20 rounded-full animate-ping" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 border-2 border-white shadow-[0_0_30px_#fb7185] relative z-10 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full opacity-60" />
                  </div>
                </div>
                <div className="absolute top-10 left-10 w-28">
                  <p className="text-rose-300 text-xs font-bold leading-tight">Shodh AI LPM</p>
                  <p className="text-white/50 text-[10px]">10B → Target</p>
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

          {/* Graph explanation */}
          <div className="mt-10 grid md:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/8 space-y-2">
              <p className="text-rose-300/70 text-xs uppercase tracking-wider">Why 3D is harder than 1D</p>
              <p className="text-white/65 font-light text-sm leading-relaxed">Biology models fold 1D sequences. Physics requires 3D tensors — position, time, temperature, pressure — all at once. Orders of magnitude more complex. Current SOTA: Aurora at 1.3B params. Our target: <span className="text-white font-normal">The 10B+ Large Physics Model.</span> In computational load, a 10B 3D multi-physics model is equivalent to a 100B-parameter LLM.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/[0.015] border border-white/5 space-y-2">
              <p className="text-white/40 text-xs uppercase tracking-wider">Where we stand</p>
              <p className="text-white/55 font-light text-sm leading-relaxed">FNO proved AI can solve physics PDEs. The 3D track is now accelerating. We are building on this with <span className="text-white font-normal">Google JAX</span> and <span className="text-white font-normal">NVIDIA Physics NeMo.</span></p>
            </div>
          </div>
        </motion.div>

        {/* ── Two-Stage Model Architecture ── */}
        <motion.div {...fade} className="mb-16">
          <h3 className="text-2xl md:text-4xl font-extralight text-white mb-2 max-w-3xl">Engineering the SOTA.</h3>
          <p className="text-white/40 font-light text-sm max-w-2xl mb-10">Two stages. Two milestones. One architecture.</p>

          <div className="mb-6 p-8 rounded-2xl border border-blue-500/20 bg-blue-950/10">
            <div className="mb-5">
              <p className="text-blue-300/60 text-xs uppercase tracking-wider mb-1">Stage 1 — Now</p>
              <h4 className="text-white font-light text-2xl">The 50B 3D-Foundation Model</h4>
              <p className="text-blue-300/50 text-xs mt-1">Anchor-Partner Deployment</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3 text-white/65 font-light text-sm leading-relaxed">
                <p>The universal base model — validated at the edge. The 50B foundation is deployed into secure federated enclaves at Biocon, Jubilant, and Aarti, using their historical failure data to fine-tune the final 20% weights without their IP ever leaving their walls.</p>
                <p>Achieves <span className="text-white font-normal">90% accuracy</span> on their specific process environments. First commercial deployments in Year 1.</p>
                <p className="text-white/30 font-mono text-xs">JAX/FLAX · FNO/UPT · Mixture of Experts</p>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
                  <p className="text-blue-300/60 text-xs uppercase tracking-wider mb-3">The Milestones</p>
                  <ul className="space-y-2 text-white/70 font-light text-sm">
                    <li className="flex items-start gap-2"><span className="text-blue-300/60">→</span> <span><span className="text-white font-normal">Architecture validated</span> on real industrial data</span></li>
                    <li className="flex items-start gap-2"><span className="text-blue-300/60">→</span> <span><span className="text-white font-normal">3 × $10M NRE contracts</span> triggered on proven outcomes</span></li>
                    <li className="flex items-start gap-2"><span className="text-blue-300/60">→</span> <span><span className="text-white font-normal">Sim-to-Real loop</span> closes at commercial accuracy</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl border border-rose-500/20 bg-rose-950/10">
            <div className="mb-5">
              <p className="text-rose-300/60 text-xs uppercase tracking-wider mb-1">And Stage 2 — The Vision</p>
              <h4 className="text-white font-light text-2xl">The 500B+ Foundation Model</h4>
              <p className="text-rose-300/50 text-xs mt-1">Universal Manufacturing Intelligence</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3 text-white/65 font-light text-sm leading-relaxed">
                <p>A client brings a completely novel molecule, composite, or device — never seen before. The LPM outputs the gigafactory blueprint. No physical trial-and-error required.</p>
                <p>The 50B model handles known process families well. The 500B model handles the <span className="text-white font-normal">hard edge cases</span>: chaotic turbulence, multi-phase reactions, and extreme-condition manufacturing.</p>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
                  <p className="text-rose-300/60 text-xs uppercase tracking-wider mb-3">Industries Unlocked</p>
                  <ul className="space-y-1.5 text-white/70 font-light text-sm">
                    <li className="flex items-start gap-2"><span className="text-rose-300/60">→</span> Aerospace composites</li>
                    <li className="flex items-start gap-2"><span className="text-rose-300/60">→</span> Semiconductor lithography</li>
                    <li className="flex items-start gap-2"><span className="text-rose-300/60">→</span> Nuclear fusion materials</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/10">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">What it requires</p>
                  <p className="text-white/60 font-light text-sm">Scale-up in sovereign compute. Powered by the Sim-to-Real flywheel built in Stage 1.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </section>
      )}

      {/* ─── PROOF: TRAINING ARCHITECTURE & ALPHAFOLD MOMENT ─── */}
      <section id="proof" className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px w-8 bg-white/15 shrink-0" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">The Proof — Early Work</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            {isFront ? <>Proof that the<br /><span className="font-normal">physics stack works.</span></> : <>How it will<br /><span className="font-normal">be done.</span></>}
          </h2>
          {isFront && (
          <p className="text-white/55 font-light text-lg max-w-2xl mb-16 leading-relaxed">
            We already demonstrated the core architecture with a compressed <span className="text-white font-normal">300M parameter model</span> in one of the hardest multiphysics environments: silicon anode.
          </p>
          )}
          {!isFront && <div className="mb-16" />}
        </motion.div>

        {/* Slide 1: The Training Architecture */}
        <motion.div {...fade} className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-white/25 font-mono text-sm">01</span>
            <h3 className="text-xl md:text-2xl font-light text-white">The Training Architecture</h3>
          </div>
          <p className="text-white font-light text-xl max-w-3xl mb-2 leading-relaxed">How We Build It: The 80/20 Data Strategy</p>
          <p className="text-white/50 font-light text-sm max-w-2xl mb-8">How do we actually build a 10B 3D-tensor physics model?</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-blue-950/10 border border-blue-500/20">
              <p className="text-blue-300/70 text-xs uppercase tracking-wider mb-2">The 80% Foundation — Pure Physics</p>
              <p className="text-white/75 font-light text-sm leading-relaxed">We train the base LPM on millions of synthetically generated 3D fluid and thermodynamic simulations. The AI learns the universal laws of physics — Navier-Stokes, Fick&apos;s Law.</p>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/20">
              <p className="text-emerald-300/70 text-xs uppercase tracking-wider mb-2">The 20% Fine-Tuning — The Domain Expert</p>
              <p className="text-white/75 font-light text-sm leading-relaxed">We deploy the universal base model inside secure federated enclaves at the client site. We fine-tune the final 20% weights using their highly classified historical failure data without their IP ever leaving their walls.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/8">
              <p className="text-white/60 text-xs uppercase tracking-wider mb-2">The 90%+ Output</p>
              <p className="text-white/75 font-light text-sm leading-relaxed">The resulting &ldquo;Expert Model&rdquo; hits 90%+ accuracy on their specific chemical processes. Their IP never leaves their walls.</p>
            </div>
            <div className="p-6 rounded-2xl bg-amber-950/10 border border-amber-500/20">
              <p className="text-amber-300/70 text-xs uppercase tracking-wider mb-2">Why 90% is a Revolution</p>
              <p className="text-white/75 font-light text-sm leading-relaxed">Partners simulate 10,000 scale-up scenarios in minutes, discard 9,997 dead-ends, and physically build only the top 3. We compress 7 years of trial-and-error into 1 targeted pilot.</p>
            </div>
          </div>
        </motion.div>

        {/* Slide 2: The Core Moat — 3D Data Factory */}
        <motion.div {...fade} className="mb-16 border-t border-white/5 pt-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-white/25 font-mono text-sm">02</span>
            <h3 className="text-xl md:text-2xl font-light text-white">The Secret Weapon: Our Proprietary 3D Data Factory</h3>
          </div>
          <p className="text-white/50 font-light text-sm mb-8 max-w-2xl">You cannot scrape the internet for 3D factory physics. We had to invent the data engine.</p>
          <p className="text-white/55 font-light text-base max-w-3xl mb-10 leading-relaxed">
            We built an algorithmic 3D microstructure generation pipeline. Cross-referenced against real-world Scanning Electron Microscope (SEM) tomography, our synthetic structures achieved a <span className="text-white font-normal">95% morphological match to physical reality.</span> We generate the infinite training ground in milliseconds, completely in-house.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <p className="text-white/40 text-xs uppercase tracking-widest">Real-World Tomography — Commercial Battery SEM</p>
              </div>
              <div className="grid grid-cols-2 gap-px bg-white/5 p-px">
                <div className="bg-[#060606] min-h-[200px] overflow-hidden flex items-center justify-center">
                  <img src="/SEM_comparison/Samsung_25R6_sem_slices copy.png" alt="Real SEM slices — Samsung 25R6" className="w-full h-full object-contain opacity-90" />
                </div>
                <div className="bg-[#060606] min-h-[200px] overflow-hidden flex items-center justify-center">
                  <img src="/SEM_comparison/Samsung_25R6_sem_isosurface.png" alt="Real SEM isosurface — Samsung 25R6" className="w-full h-full object-contain opacity-90" />
                </div>
              </div>
              <p className="text-white/25 text-xs px-5 py-3 font-light">Samsung 25R6 — Physical scan data</p>
            </div>
            <div className="rounded-2xl border border-blue-500/20 bg-blue-950/5 overflow-hidden">
              <div className="px-5 py-3 border-b border-blue-500/10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400/50" />
                <p className="text-blue-300/60 text-xs uppercase tracking-widest">Shodh AI — Generated Digital Twin</p>
              </div>
              <div className="bg-[#060606] min-h-[200px] overflow-hidden flex items-center justify-center">
                <img src="/SEM_comparison/sample_003_20260206_125915_sem_isosurface.png" alt="Shodh AI generated SEM isosurface" className="w-full h-full object-contain opacity-95" />
              </div>
              <p className="text-blue-300/40 text-xs px-5 py-3 font-light">Algorithmically generated — no physical scan required</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-blue-950/10 border border-blue-500/15">
              <p className="text-blue-300/70 text-xs uppercase tracking-wider mb-2">95% Morphological Match</p>
              <p className="text-white/60 font-light text-sm leading-relaxed">Our AI generates synthetic physical structures with mathematical parity to real-world physics — allowing us to train the 10B model without waiting months for physical lab scans.</p>
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

        {/* Slide 3: The Early Pilot */}
        <motion.div {...fade} className="mb-10 border-t border-white/5 pt-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-white/25 font-mono text-sm">03</span>
            <h3 className="text-xl md:text-2xl font-light text-white">Our &ldquo;AlphaFold&rdquo; Moment: The Sandbox Pilot</h3>
          </div>
          <p className="text-white/55 font-light text-sm mb-6 max-w-2xl">Before raising $50M to scale the 10B LPM, we ran a ruthless Sandbox Pilot to prove this architecture actually learns physics.</p>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/8">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-2">The Sandbox</p>
              <p className="text-white/70 font-light text-sm leading-relaxed">We chose the silicon anode — the biggest unsolved problem in next-gen lithium batteries, and one of the most chaotic, degradation-heavy environments in the physical world.</p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/8">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-2">The Digital Training</p>
              <p className="text-white/70 font-light text-sm leading-relaxed">Using our 3D Data Factory, we generated 100,000 synthetic microstructures and trained a lightweight AI model on mechanical stress and capacity fade physics.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch mb-12">
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
              <p className="text-white/80 text-sm font-medium leading-relaxed">The Sim-to-Real Match: AI&apos;s digital output perfectly translated into physical reality.</p>
            </div>
          </div>

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

        {/* Slide 4: The Hero Slide */}
        <motion.div {...fade} className="mt-12 border-t border-white/5 pt-12 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-white/25 font-mono text-sm">04</span>
            <h3 className="text-xl md:text-2xl font-light text-white">The Wet-Lab Validation: Closing the Sim2Real Gap</h3>
          </div>
          <p className="text-white/40 font-light text-sm max-w-2xl mb-10">We took the AI&apos;s 5 digital recipes into a physical wet-lab — mixed the chemicals, coated the foils, manufactured the physical cells, and put them on stress-testers until they broke.</p>
        </motion.div>

        <div className="p-8 rounded-xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-emerald-900/20 border border-white/10 mb-0">
          <p className="text-white/35 text-xs uppercase tracking-wider mb-4">The Scaling Law Guarantee</p>
          <p className="text-lg md:text-xl text-white font-light leading-relaxed max-w-4xl">
            The physical reality matched the AI&apos;s digital prediction. <span className="font-medium">~70% zero-shot accuracy.</span> We successfully digitized physical failure.
          </p>
        </div>

        {/* Modals */}
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



      {/* ─── WHY BIG TECH CAN'T TOUCH US ─── */}
      {!isFront && (
      <section id="anchors" className="px-6 py-28 md:py-36 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade}>
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">Competitive Moat</p>
            <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-3 max-w-3xl">
              The Competitive Moat<br /><span className="font-normal">&amp; Revenue Engine.</span>
            </h2>
            <p className="text-white/45 font-light text-lg max-w-2xl mb-16 leading-relaxed">Why Big Tech won&apos;t build this, and how we monetize it.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div {...fade} className="p-8 rounded-2xl border border-white/8 bg-white/[0.02]">
              <div className="space-y-6">
                {[
                  {
                    title: "No Public Data",
                    desc: "AI models require data. Industrial manufacturing data is highly classified. There is no internet to scrape for chemical scale-up failures.",
                  },
                  {
                    title: "The \"Dirty-Hands\" B2B Gap",
                    desc: "Big Tech sells zero-marginal-cost software APIs. They will not integrate deeply into legacy 1990s factory systems.",
                  },
                  {
                    title: "Wrong Business Model",
                    desc: "Big Tech wants cheap SaaS subscriptions. Industrial giants demand shared-risk, IP-secured, outcome-based contracts.",
                  },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-white font-light text-sm">{item.title}</p>
                    <p className="text-white/50 font-light text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade} transition={{ delay: 0.1 }} className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/5">
              <div className="space-y-6">
                {[
                  {
                    title: "Base-Model + Edge Fine-Tuning",
                    desc: "We pre-train the 80% physics foundation on our sovereign GPUs. We fine-tune the last 20% locally at the client's site.",
                  },
                  {
                    title: "Federated Enclave Deployment",
                    desc: "Client IP never leaves their walls. Our model only extracts the physics gradients, satisfying elite corporate paranoia.",
                  },
                  {
                    title: "Outcome-as-a-Service (Licensing)",
                    desc: "We don&apos;t sell SaaS. If we compress a 7-year scale-up into 6 months, we charge a multi-million-dollar Zero-Trust Deployment Fee + a perpetual royalty on the factory&apos;s physical yield.",
                  },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-emerald-300/90 font-light text-sm">{item.title}</p>
                    <p className="text-white/55 font-light text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* ─── 06: VALIDATION & ANCHORS ─── */}
      <section className="px-6 py-28 md:py-36 max-w-6xl mx-auto border-b border-white/5">
        <motion.div {...fade}>
          <div className="flex items-center gap-4 mb-10">
            <span className="text-white/40 font-mono text-base">06</span>
            <div className="h-px w-8 bg-white/15 shrink-0" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">Industry Validation & Anchors</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            Three anchor partners.<br /><span className="font-normal">Three trillion-dollar markets.</span>
          </h2>
          <p className="text-white/50 font-light text-lg max-w-2xl mb-16 leading-relaxed">
            Each partner has personally validated our thesis — and each one is a gateway to a global industry.
          </p>
        </motion.div>

        <div className="space-y-6 mb-10">

          {/* ── Biocon ── */}
          <motion.div {...fade} className="p-8 md:p-10 rounded-2xl border border-blue-500/20 bg-blue-950/5">
            <div className="flex flex-col md:flex-row md:items-start gap-4 mb-8">
              <p className="text-4xl md:text-5xl font-bold text-blue-300 shrink-0">Biocon</p>
              <div className="md:pt-2">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Bio-Enzymes & Biologicals</p>
                <p className="text-white/60 font-light text-sm">Bioreactor Scale-Up</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1.5">The Partner</p>
                  <p className="text-white/80 font-light text-sm">Kiran Mazumdar-Shaw — Founder & Chairperson</p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1.5">The Personal Angle</p>
                  <p className="text-white/55 font-light text-sm leading-relaxed">Kiran is personally championing our tech. She understands that discovering novel biocatalysts is useless if they die in commercial bioreactors. She is mentoring us to crack &ldquo;Biotransformation&rdquo; at an industrial scale.</p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1.5">The Project</p>
                  <p className="text-white/55 font-light text-sm leading-relaxed">Taking Biocon&apos;s complex biologicals from 5L benchtop synthesis to 10,000L commercial bioreactors — optimizing oxygen mass transfer and impeller shear-stress to prevent microbe death.</p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1.5">Blueprint & Bounty Trigger</p>
                  <p className="text-white/55 font-light text-sm">Compressing a 7-year API scale-up into 6 months.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-blue-950/20 border border-blue-500/10">
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-3">Market Unlocked</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <p className="text-white/45 text-xs">TAM — Global Biomanufacturing</p>
                      <p className="text-blue-300 font-light text-lg">$300B+</p>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <p className="text-white/45 text-xs">SAM — Scale-Up & Yield Optimization</p>
                      <p className="text-blue-300/60 font-light">$35B</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-white/45 font-light text-sm leading-relaxed">If we prove it with Biocon, every global pharma giant — Pfizer, Novartis — becomes an immediate target for our LPM.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Aarti Industries ── */}
          <motion.div {...fade} transition={{ delay: 0.1 }} className="p-8 md:p-10 rounded-2xl border border-rose-500/20 bg-rose-950/5">
            <div className="flex flex-col md:flex-row md:items-start gap-4 mb-8">
              <p className="text-4xl md:text-5xl font-bold text-rose-300 shrink-0">Aarti Industries</p>
              <div className="md:pt-2">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Specialty Chemicals</p>
                <p className="text-white/60 font-light text-sm">High-Exothermic Batch Reactions</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1.5">The Partner</p>
                  <p className="text-white/80 font-light text-sm">Mirik Gogri — Promoter</p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1.5">The Personal Angle</p>
                  <p className="text-white/55 font-light text-sm leading-relaxed">Mirik gave us the blueprint for our &ldquo;Zero-Trust&rdquo; enterprise deployment: <span className="text-white/80 italic">&ldquo;Start with historical, non-confidential data to prove the AI works. Once you prove the math, we&apos;ll scale it.&rdquo;</span> This pragmatism shaped our entire federated Go-To-Market strategy.</p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1.5">The Project</p>
                  <p className="text-white/55 font-light text-sm leading-relaxed">Solving heat dissipation and pressure bottlenecks in highly volatile batch reactions. Mapping historical generic molecules to prove Sim2Real accuracy is &gt;90%.</p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1.5">Blueprint & Bounty Trigger</p>
                  <p className="text-white/55 font-light text-sm">Safely transitioning hazardous batch chemistries into continuous flow — without physical pilot-plant explosions.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/10">
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-3">Market Unlocked</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <p className="text-white/45 text-xs">TAM — Global Specialty Chemicals</p>
                      <p className="text-rose-300 font-light text-lg">$800B+</p>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <p className="text-white/45 text-xs">SAM — Chemical Process Engineering</p>
                      <p className="text-rose-300/60 font-light">$60B</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-white/45 font-light text-sm leading-relaxed">If we prove it with Aarti, we immediately unlock the BASF, Dow, and DuPonts of the world.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Jubilant Ingrevia ── */}
          <motion.div {...fade} transition={{ delay: 0.2 }} className="p-8 md:p-10 rounded-2xl border border-emerald-500/20 bg-emerald-950/5">
            <div className="flex flex-col md:flex-row md:items-start gap-4 mb-8">
              <p className="text-4xl md:text-5xl font-bold text-emerald-300 shrink-0">Jubilant Ingrevia</p>
              <div className="md:pt-2">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Agro-Pharma & CDMO</p>
                <p className="text-white/60 font-light text-sm">Accelerated CDMO & Agro-Pharma</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1.5">The Partner</p>
                  <p className="text-white/80 font-light text-sm">Deepak Jain — CEO</p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1.5">The Personal Angle</p>
                  <p className="text-white/55 font-light text-sm leading-relaxed">Deepak validated our entire thesis in one meeting: <span className="text-white/80 italic">&ldquo;Big Tech is playing in the discovery layer. Route of Synthesis is already solved. The real 8-year bottleneck is commercial process scale-up.&rdquo;</span> He challenged us to beat a 9-month agro-molecule optimization using our AI.</p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1.5">The Project</p>
                  <p className="text-white/55 font-light text-sm leading-relaxed">Using the LPM to generate continuous flow manufacturing parameters — feed rates, temperature gradients — for high-volume agrochemicals in weeks instead of months.</p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1.5">Blueprint & Bounty Trigger</p>
                  <p className="text-white/55 font-light text-sm">Allowing Jubilant to take on 3× more CDMO clients per year by shrinking scale-up engineering time by 80%.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/10">
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-3">Market Unlocked</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <p className="text-white/45 text-xs">TAM — Global CDMO & Agrochemicals</p>
                      <p className="text-emerald-300 font-light text-lg">$250B+</p>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <p className="text-white/45 text-xs">SAM — CDMO Process Tech</p>
                      <p className="text-emerald-300/60 font-light">$25B</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-white/45 font-light text-sm leading-relaxed">If we prove it with Jubilant, we become the de facto backend for the entire global CDMO industry.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </section>


      {/* ─── 09: THE ASK & CAPITAL STACK ─── */}
      <section id="capital" className="px-6 py-28 md:py-40 max-w-6xl mx-auto">
        <motion.div {...fade}>
          <div className="flex items-center gap-4 mb-10">
            <span className="text-white/40 font-mono text-base">09</span>
            <div className="h-px w-8 bg-white/15 shrink-0" />
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">The Ask & The $100M Capital Stack</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-6 max-w-3xl">
            $100M to prove the<br /><span className="font-normal">scaling laws of physical AI.</span>
          </h2>
          <p className="text-white/55 font-light text-lg max-w-2xl mb-4 leading-relaxed">
            We are structuring a $100M capitalization to build the 10B parameter foundation for the physical world and capture the global enterprise market.
          </p>
        </motion.div>

        {/* Capital table */}
        <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden mb-16">
          {[
            {
              amount: "$25M", source: "Sovereign Compute", tag: "", tagColor: "text-emerald-300", tagBg: "bg-emerald-950/40 border-emerald-500/30",
              desc: "IndiaAI Mission allocation for priority national GPU clusters. Covering burn on core model training.", note: "",
            },
            {
              amount: "$25M", source: "Autonomous Lab Infrastructure", tag: "", tagColor: "text-emerald-300", tagBg: "bg-emerald-950/40 border-emerald-500/30",
              desc: "ANRF funding for model training, wet-lab validation and robotic synthesis infrastructure. Covering burn on hardware.", note: "",
            },
            {
              amount: "$50M", source: "The Equity Raise", tag: "Active", tagColor: "text-white", tagBg: "bg-white/5 border-white/20",
              desc: "Hire elite global AI researchers. Prove the 10B parameter scaling laws, perfect the 3D synthetic data factory, and deploy secure enterprise inference infrastructure across our anchor partners. 100% deployed on model talent and GTM.", note: "",
            },
          ].map((item, i) => (
            <motion.div key={i} {...fade} transition={{ delay: i * 0.1 }} className={`bg-[#060606] p-8 md:p-10 ${i === 2 ? "bg-white/[0.02]" : ""}`}>
              <p className="text-4xl md:text-5xl font-light text-white mb-2">{item.amount}</p>
              <p className="text-white/65 text-sm font-light mb-2">{item.source}</p>
              {item.tag && <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full border ${item.tagBg} ${item.tagColor} mb-4`}>{item.tag}</span>}
              <p className="text-white/40 text-xs leading-relaxed mb-2">{item.desc}</p>
              {item.note && <p className="text-white/25 text-xs italic">{item.note}</p>}
            </motion.div>
          ))}
        </div>

        {/* Execution Roadmap */}
        <div className="mb-16 space-y-3">
          <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-6">The Execution Roadmap (24 Months)</p>
          {[
            {
              phase: "Phase 1", months: "Months 1–12", title: "The Anchor Proof",
              borderL: "border-blue-500/40", border: "border-blue-500/15", numColor: "text-blue-300",
              execution: "Deliver the 10B parameter 3D-Tensor LPM (10× larger than current physics SOTA). Deploy federated compute enclaves directly into the first 3 anchor partners (Aarti, Biocon, Jubilant).",
              outcome: "Convert pilots into 7-figure Enterprise Foundation Model Access fees. Achieve ~90%+ commercial accuracy in production. Lock in milestone-based IP royalty agreements.",
            },
            {
              phase: "Phase 2", months: "Months 13–24", title: "The Global 10",
              borderL: "border-violet-500/40", border: "border-violet-500/15", numColor: "text-violet-300",
              execution: "Weaponize the initial anchor case studies to target the Tier 1 global manufacturers.",
              outcome: "Sign 10 global Tier-1 manufacturing giants (e.g., BASF, Pfizer, A123) to multi-million dollar Enterprise Licensing and process-royalty structures.",
            },
            {
              phase: "Phase 3", months: "Post-Round", title: "The Monopoly Scale",
              borderL: "border-emerald-500/40", border: "border-emerald-500/15", numColor: "text-emerald-300",
              execution: null as string | null,
              outcome: "With the 10B physics proven at scale, we transition from Anchor Edge-Deployments to a hyper-scalable Global Process API. Having de-risked the Sim-to-Real math, we will trigger a multi-billion-dollar mega-round to scale compute, train the 100B+ Universal Model, and map the entire global physical supply chain. Shodh AI will have proven the science, validated the business model, and established the definitive Go-To-Market playbook for industrial AI.",
            },
          ].map((p, i) => (
            <motion.div key={i} {...fade} transition={{ delay: i * 0.1 }} className={`p-6 md:p-8 rounded-2xl border-l-2 ${p.borderL} border ${p.border} bg-white/[0.015]`}>
              <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                <div className="md:w-40 shrink-0">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{p.phase}</p>
                  <p className={`text-sm font-mono ${p.numColor} mb-1`}>{p.months}</p>
                  <p className="text-white font-light text-sm">{p.title}</p>
                </div>
                <div className="flex-1 space-y-3">
                  {p.execution && (
                    <div>
                      <p className="text-white/35 text-xs uppercase tracking-wider mb-1">The Execution</p>
                      <p className="text-white/55 font-light text-sm leading-relaxed">{p.execution}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-white/35 text-xs uppercase tracking-wider mb-1">The Outcome</p>
                    <p className="text-white/70 font-light text-sm leading-relaxed">{p.outcome}</p>
                  </div>
                </div>
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
    </div>
  );
}
