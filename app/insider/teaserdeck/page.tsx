"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Zap, Building2, Factory, Beaker, Cpu, Shield, Battery, Leaf, Droplets, BrainCircuit, Mail, X } from "lucide-react";
import LineChart from "@/components/LineChart";

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

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

export default function TeaserDeckPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeVision, setActiveVision] = useState(0);
  const [displayedPrompt, setDisplayedPrompt] = useState("");
  const [showLandscapePopup, setShowLandscapePopup] = useState(false);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
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
      {/* Custom cursor */}
      <div className="pointer-events-none fixed z-[9999] transition-transform duration-75" style={{ left: mousePos.x, top: mousePos.y, transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.18) 15%, rgba(255,255,255,0.06) 40%, transparent 70%)" }} />
      <div className="pointer-events-none fixed z-[9999]" style={{ left: mousePos.x, top: mousePos.y, transform: "translate(-50%,-50%)", width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.8)" }} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/insider" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Insider</span>
          </Link>
          <p className="text-xs text-white/40 font-mono tracking-widest">TEASER DECK - CONFIDENTIAL</p>
        </div>
      </header>

      {/* Slide 1: Hero - Title & The Absolute SOTA */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden border-b border-white/5">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 mix-blend-screen" style={{ filter: 'brightness(1.5) contrast(1.2)' }}>
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060606]/50 to-[#060606] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,6,6,0.8)_100%)] pointer-events-none" />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center pt-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-10">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white">Confidential Teaser</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter mb-4 leading-[0.9] drop-shadow-2xl">
            Shodh AI: The Large<br />
            <span className="italic font-light text-rose-300">Physics Model (LPM)</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white/60 font-light max-w-2xl mx-auto mb-10 drop-shadow-lg">
            Building the foundation model for manufacturing physics.
          </p>

          {/* The Validation */}
          <motion.div {...fade} className="mt-8 max-w-4xl mx-auto w-full">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-6">The Validation</p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 rounded-2xl border border-white/20 bg-white/[0.05] text-center">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Built With</p>
                <p className="text-white font-medium text-sm">NVIDIA & Google DeepMind</p>
              </div>
              <div className="p-5 rounded-2xl border border-white/20 bg-white/[0.05] text-center">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Backed By</p>
                <p className="text-white font-medium text-sm">Sovereign IndiaAI Mission (Priority National Compute)</p>
              </div>
            </div>
            {/* The SOTA Box */}
            <div className="p-6 rounded-2xl border border-white/15 bg-white/[0.03] text-center">
              <p className="text-white/60 text-xs uppercase tracking-wider mb-3">The SOTA</p>
              <p className="text-white font-light text-base leading-relaxed">
                Validated in architectural reviews with <span className="text-white font-semibold">Google DeepMind</span> as a global first - the world's first unification of 3D mesoscale physics and generative inverse-design at foundation scale.
              </p>
            </div>
          </motion.div>

          {/* Logos */}
          <motion.div {...fade} className="mt-10 flex flex-wrap items-center justify-center gap-8">
            {[
              { src: "/demo/nvidia-partner-logo.png", alt: "NVIDIA", className: "h-10 max-w-[168px]" },
              { src: "/DeepMind_logo.png", alt: "Google DeepMind", className: "h-8 max-w-[120px]" },
              { src: "/india-ai-logo-650x311.png", alt: "IndiaAI" },
            ].map((logo) => (
              <div key={logo.alt} className={`${logo.alt === "NVIDIA" ? "h-10" : "h-8"} flex items-center opacity-70 hover:opacity-100 transition-opacity duration-200`}>
                <img src={logo.src} alt={logo.alt} className={`${logo.className ?? "h-8 max-w-[120px]"} w-auto object-contain`} style={{ filter: "brightness(0) invert(1)" }} />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Slide 2: The Macro Thesis (Bits vs. Atoms) */}
      <section className="py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Slide 2: The Macro Thesis</p>
            <h2 className="text-3xl md:text-5xl font-extralight leading-tight tracking-tight mb-4 max-w-4xl mx-auto">
              OpenAI is fighting for <span className="text-white/50">20%</span> of the economy.<br />
              We are unlocking the <span className="text-rose-300">other 80%.</span>
            </h2>
          </motion.div>

          <motion.div {...fade} className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Left Box - Digital Economy */}
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">The 20% Digital Economy</p>
              <p className="text-white/50 text-sm font-light mb-4">LLMs are automating text and code. It is rapidly becoming a crowded efficiency game.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Text Generation", "Code Completion", "Digital Workflows"].map((name) => (
                  <span key={name} className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-white/50 text-xs">{name}</span>
                ))}
              </div>
            </div>

            {/* Right Box - Physical Economy */}
            <div className="p-8 rounded-2xl border border-rose-500/20 bg-rose-950/5">
              <p className="text-rose-300/70 text-xs uppercase tracking-widest mb-4">The 80% Physical Economy</p>
              <p className="text-white/60 font-light text-sm leading-relaxed mb-4">Atoms, energy, and materials drive global GDP, yet remain constrained by human cognitive limits.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Manufacturing", "Energy", "Materials", "Chemicals"].map((name) => (
                  <span key={name} className="px-3 py-1.5 rounded-lg border border-rose-500/15 bg-rose-950/10 text-rose-200/70 text-xs">{name}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div {...fade} className="text-center">
            <div className="p-6 rounded-2xl border border-rose-500/15 bg-rose-950/5 max-w-3xl mx-auto">
              <p className="text-rose-300/70 text-xs uppercase tracking-wider mb-3">The Insight</p>
              <p className="text-lg md:text-xl text-white font-light">
                Automating the digital world saves <span className="text-white font-medium">billions.</span><br />
                Compiling the physical world creates <span className="text-rose-300 font-medium">trillions.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slide 3: The Problem (The Valley of Death) */}
      <section className="py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Slide 3: The Problem</p>
            <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-4">
              AI Discovery is heavily funded.<br />
              <span className="text-rose-300">AI Manufacturing is completely broken.</span>
            </h2>
          </motion.div>

          {/* Two Layers */}
          <motion.div {...fade} className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/5">
              <p className="text-emerald-300/70 text-xs uppercase tracking-widest mb-3">Layer 1: AI Discovery (Rapidly Maturing)</p>
              <p className="text-white/70 font-light text-base leading-relaxed">
                Models can now predict a miracle molecular structure in a lab environment in days.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-rose-500/20 bg-rose-950/5">
              <p className="text-rose-300/70 text-xs uppercase tracking-widest mb-3">Layer 2: The Mesoscale (Unsolved)</p>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                The greatest bottleneck to human progress isn't discovery; it's manufacturability. Trillion-dollar innovations (next-gen batteries, novel bio-materials) are stuck in labs because humans cannot compute how to scale them.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div {...fade} className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] text-center">
              <p className="text-5xl md:text-6xl font-extralight text-rose-300 mb-3">90%</p>
              <p className="text-white/50 text-sm font-light">of AI-discovered materials die in scale-up</p>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] text-center">
              <p className="text-5xl md:text-6xl font-extralight text-amber-300 mb-3">6–8</p>
              <p className="text-white/50 text-sm font-light">Years wasted in physical scaling</p>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] text-center">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">The Human Bottleneck</p>
              <p className="text-white/70 font-light text-sm">Scale-up relies on human intuition and blind trial-and-error in expensive physical pilot plants</p>
            </div>
          </motion.div>

          {/* Button for AI for Science Landscape */}
          <motion.div {...fade} className="text-center">
            <button
              onClick={() => setShowLandscapePopup(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-gray-900 hover:bg-gray-100 transition-all text-sm font-medium shadow-lg hover:shadow-xl"
            >
              <span>Current Landscape of the AI for Science World</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Light-themed Popup for Physical Complexity View */}
      <AnimatePresence>
        {showLandscapePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLandscapePopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-auto rounded-2xl bg-white text-gray-900 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowLandscapePopup(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gray-400 font-mono text-sm">01</span>
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-500">The Physical Complexity View</p>
                </div>
                <h2 className="text-3xl md:text-5xl font-extralight leading-tight tracking-tight mb-4 max-w-4xl">
                  AI for Science: From Sequences to <span className="text-rose-500 font-light">3D Tensors</span>
                </h2>
                <p className="text-gray-500 font-light text-lg mb-8">The missing layer in the AI-for-Science stack: Industrial Mesoscale.</p>

                {/* Three layers */}
                <div className="space-y-4 mb-10 max-w-3xl">
                  {[
                    { c: "emerald", title: "The 1D World", body: "AlphaFold mapped biological sequences to solve protein discovery." },
                    { c: "blue",    title: "The Macro World", body: "GraphCast mapped the planetary icosahedral grid to learn atmospheric dynamics." },
                    { c: "rose",    title: "The Mesoscale World", body: "Shodh AI maps microscopic pores and chemical reactors to a 3D voxel grid to learn the dynamics of industrial manufacturing." },
                  ].map((row) => (
                    <div key={row.title} className={`flex items-start gap-4 p-5 rounded-xl border border-${row.c}-200 bg-${row.c}-50`}>
                      <div className={`w-2 h-2 mt-2 rounded-full bg-${row.c}-500 shrink-0`} />
                      <div>
                        <p className={`text-${row.c}-600 text-sm font-medium mb-1`}>{row.title}</p>
                        <p className="text-gray-600 font-light text-sm leading-relaxed">{row.body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Light-themed Graph */}
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-10 overflow-hidden relative">
                  <p className="text-gray-400 text-sm uppercase tracking-[0.2em] mb-4 text-center">The Physical Complexity View</p>
                  <p className="text-gray-500 text-base mb-10 text-center max-w-3xl mx-auto">1D Discovery Models (Sequences) vs. 3D Physical Models (Multi-Physics Tensors)</p>
                  
                  <div className="relative h-[500px] w-full max-w-5xl mx-auto border border-gray-300 bg-white rounded-xl pl-20">
                    {/* Grid lines */}
                    <div className="absolute inset-0 left-20">
                      {[0,50,100].map((p,i) => <div key={`h${i}`} className="absolute w-full border-b border-gray-200" style={{top:`${p}%`}} />)}
                      {[0,16.7,33.3,50,66.7,83.3,100].map((p,i) => <div key={`v${i}`} className="absolute h-full border-r border-gray-100 border-dashed" style={{left:`${p}%`}} />)}
                    </div>
                    
                    {/* Y-axis labels */}
                    <div className="absolute left-2 top-[25%] -translate-y-1/2 pr-3">
                      <p className="text-rose-500 text-sm mb-1 font-bold">3D Physical Layer</p>
                      <p className="text-gray-400 text-[10px]">Tensors (Manufacturing / Sim)</p>
                    </div>
                    <div className="absolute left-2 top-[75%] -translate-y-1/2 pr-3">
                      <p className="text-emerald-500 text-sm mb-1 font-bold">1D Discovery Layer</p>
                      <p className="text-gray-400 text-[10px]">Sequences (In Silico)</p>
                    </div>
                    
                    {/* X-axis labels */}
                    <div className="absolute -bottom-8 left-20 right-0 flex justify-between text-xs text-gray-400 font-mono px-4">
                      <span>2018</span><span>2020</span><span>2022</span><span>2024</span><span>2026</span><span>2028</span>
                    </div>
                    <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-xs text-gray-400 tracking-widest uppercase">Year</div>
                    
                    {/* Colored zones */}
                    <div className="absolute inset-0 left-20 pointer-events-none">
                      <div className="absolute top-0 left-0 right-0 h-[50%] bg-rose-50 border-b border-rose-200" />
                      <div className="absolute top-[50%] left-0 right-0 h-[50%] bg-emerald-50" />
                    </div>
                    
                    {/* SVG paths */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0" style={{left:"5rem",width:"calc(100% - 5rem)"}} preserveAspectRatio="none">
                      <defs>
                        <filter id="ggLight"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                        <filter id="grLight"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                      </defs>
                      <path d="M 33.3% 83% L 50% 78% L 66.7% 75% L 75% 72%" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="6 6" filter="url(#ggLight)" vectorEffect="non-scaling-stroke" className="opacity-80"/>
                      <path d="M 25% 45% L 50% 40% L 58.3% 42% L 66.7% 35% L 75% 16.6%" fill="none" stroke="#f43f5e" strokeWidth="4" strokeDasharray="6 6" filter="url(#grLight)" vectorEffect="non-scaling-stroke" className="opacity-80"/>
                    </svg>
                    
                    {/* Data points */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{left:"5rem",width:"calc(100% - 5rem)"}}>
                      {/* Emerald points - 1D Discovery */}
                      <div className="absolute left-[33.3%] top-[83%] -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-lg"/>
                        <div className="absolute -top-16 -left-20 w-44"><p className="text-emerald-600 text-xs font-semibold">AlphaFold 2</p><p className="text-gray-500 text-[11px]">Protein Structure Prediction</p></div>
                      </div>
                      <div className="absolute left-[50%] top-[78%] -translate-x-1/2 -translate-y-1/2">
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-white shadow-lg"/>
                        <div className="absolute top-4 -left-16 w-40"><p className="text-emerald-500 text-[11px] font-medium">AlphaFold 3</p><p className="text-gray-400 text-[10px]">Drug Discovery (Multi-modal)</p></div>
                      </div>
                      <div className="absolute left-[66.7%] top-[75%] -translate-x-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 rounded-full bg-emerald-400 border-2 border-white shadow-lg"/>
                        <div className="absolute -top-16 -left-12 w-44"><p className="text-emerald-600 text-sm font-semibold">C2S (Google)</p><p className="text-gray-500 text-xs">27B • Scientific Discovery</p></div>
                      </div>
                      <div className="absolute left-[75%] top-[72%] -translate-x-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-lg animate-pulse"/>
                        <div className="absolute -top-16 left-4 w-52"><p className="text-emerald-600 text-sm font-bold">Evo 2 (Arc/NVIDIA)</p><p className="text-gray-500 text-xs">40B • Genomics Foundation Model</p></div>
                      </div>
                      
                      {/* Rose points - 3D Physical */}
                      <div className="absolute left-[25%] top-[45%] -translate-x-1/2 -translate-y-1/2">
                        <div className="w-3.5 h-3.5 rounded-full bg-rose-400 border-2 border-white shadow-lg"/>
                        <div className="absolute top-4 -left-12 w-36"><p className="text-rose-500 text-[11px] font-medium">FNO</p><p className="text-gray-500 text-[10px]">Neural Operators</p></div>
                      </div>
                      <div className="absolute left-[50%] top-[40%] -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 rounded-full bg-rose-400 border-2 border-white shadow-lg"/>
                        <div className="absolute -top-14 -left-16 w-40"><p className="text-rose-500 text-xs font-semibold">GraphCast</p><p className="text-gray-500 text-[11px]">Weather Forecasting</p></div>
                      </div>
                      <div className="absolute left-[58.3%] top-[42%] -translate-x-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 rounded-full bg-rose-300 border border-white shadow-lg"/>
                        <div className="absolute top-4 -left-10 w-32"><p className="text-rose-400 text-[10px]">FourCastNet</p><p className="text-gray-400 text-[9px]">Extreme Weather</p></div>
                      </div>
                      <div className="absolute left-[66.7%] top-[35%] -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 rounded-full bg-rose-400 border-2 border-white shadow-lg"/>
                        <div className="absolute -top-16 -left-12 w-48"><p className="text-rose-500 text-xs font-semibold">Aurora</p><p className="text-gray-500 text-[11px]">1.3B • Earth System</p></div>
                      </div>
                      <div className="absolute left-[75%] top-[16.6%] -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                          <div className="absolute inset-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 bg-rose-200 rounded-full animate-ping"/>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 border-2 border-white shadow-xl relative z-10 flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-full opacity-70"/>
                          </div>
                        </div>
                        <div className="absolute bottom-full right-0 mb-3 w-52 bg-white border border-rose-200 rounded-xl p-3 shadow-lg">
                          <p className="text-rose-500 text-sm font-bold mb-1">SHODH AI - LPM</p>
                          <p className="text-gray-600 text-xs leading-snug">Aimed at 10B–50B 3D Multi-Physics neural operator for mesoscale inverse manufacturing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom narrative */}
                <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-rose-50 via-white to-emerald-50 border border-rose-200">
                  <p className="text-rose-500 text-xs font-bold uppercase tracking-wider mb-2">The Physics / Science Narrative</p>
                  <p className="text-gray-600 text-sm leading-relaxed">AlphaFold and Evo 2 operate in <span className="text-emerald-600 font-semibold">1D sequence space</span> for discovery. GraphCast, Aurora, and Shodh AI operate in <span className="text-rose-500 font-semibold">3D tensor space</span> for physical simulation and manufacturing. Shodh AI is the only one mastering 3D multi-physics inverse design at the mesoscale.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide 4: The Paradigm Shift */}
      <section className="py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Slide 4: The Paradigm Shift</p>
            <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-4">
              In the physical world,<br /><span className="text-emerald-300">Process becomes everything.</span>
            </h2>
            <p className="text-white/50 font-light text-xl mt-6 max-w-2xl mx-auto">
              Knowing a material's formula is worthless without knowing how to build it reliably at scale.
            </p>
          </motion.div>

          {/* Industry Examples */}
          <motion.div {...fade} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-950/5">
              <p className="text-blue-300 font-medium text-sm mb-3">Semiconductors</p>
              <p className="text-white/80 font-light text-sm">TSMC controls the world because they mastered lithography physics.</p>
            </div>
            <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/5">
              <p className="text-emerald-300 font-medium text-sm mb-3">Batteries</p>
              <p className="text-white/80 font-light text-sm">The chemistry is known; the winner is whoever can mass-produce it defect-free.</p>
            </div>
            <div className="p-6 rounded-2xl border border-violet-500/20 bg-violet-950/5">
              <p className="text-violet-300 font-medium text-sm mb-3">Aerospace, Defense & Nuclear</p>
              <p className="text-white/80 font-light text-sm">Knowing the superalloy mix is useless without the exact thermal cooling gradient to forge it.</p>
            </div>
            <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-950/5">
              <p className="text-amber-300 font-medium text-sm mb-3">Specialty Chemicals</p>
              <p className="text-white/80 font-light text-sm">Everyone knows the public molecules. The winner achieves 99.9% purity in continuous flow.</p>
            </div>
            <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-950/5">
              <p className="text-rose-300 font-medium text-sm mb-3">Biopharma</p>
              <p className="text-white/80 font-light text-sm">The FDA's literal regulatory rule is: "The Process is the Product."</p>
            </div>
          </motion.div>

          {/* The Promise */}
          <motion.div {...fade} className="text-center">
            <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-950/5 max-w-3xl mx-auto">
              <p className="text-rose-300/70 text-xs uppercase tracking-wider mb-3">The Shodh AI Promise</p>
              <p className="text-white font-light text-lg leading-relaxed">
                Discovery gives you a candidate.<br />
                <span className="text-white font-medium">We give you the blueprint to actually build it-unlocking impossible, zero-to-billion product categories that currently die in the lab.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slide 5: The Solution (Zero-Shot Manufacturing) */}
      <section className="py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Slide 5: The Solution</p>
            <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-4">
              The Generative <span className="text-emerald-300">Physics Compiler</span>
            </h2>
            <p className="text-white/50 font-light text-xl mt-4">
              Moving beyond statistical guessing to fundamental physical reasoning.
            </p>
          </motion.div>

          {/* Interactive terminal demo */}
          <motion.div {...fade} className="mb-12">
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
          </motion.div>

          {/* Tech Moat */}
          <motion.div {...fade} className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-violet-500/10 border border-violet-500/20">
              <Zap className="w-4 h-4 text-violet-300" />
              <span className="text-violet-300 font-medium text-sm">Tech Moat: Native-JAX differentiable solvers + Score-Based Generative Alignment</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slide 6: Unfair Advantage (Sim-to-Real Proof) */}
      <section className="py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Slide 6: Unfair Advantage</p>
            <h2 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight mb-4">
              We proved the math translates to <span className="text-blue-300">physical reality.</span>
            </h2>
          </motion.div>

          <motion.div {...fade} className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* SEM Comparison */}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">The Proprietary Data Engine</p>
              <p className="text-white/60 font-light text-sm mb-4">You cannot scrape the internet for 3D factory physics. We built a synthetic 3D Data Factory achieving a <span className="text-white font-medium">95% morphological match</span> to physical reality.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
                  <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <p className="text-white/40 text-xs uppercase tracking-widest">Real SEM</p>
                  </div>
                  <div className="bg-[#060606] min-h-[180px] overflow-hidden flex items-center justify-center">
                    <img src="/SEM_comparison/Samsung_25R6_sem_isosurface.png" alt="Real SEM isosurface" className="w-full h-full object-contain opacity-90" />
                  </div>
                </div>
                <div className="rounded-2xl border border-blue-500/20 bg-blue-950/5 overflow-hidden">
                  <div className="px-4 py-2 border-b border-blue-500/10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400/50" />
                    <p className="text-blue-300/60 text-xs uppercase tracking-widest">AI Generated</p>
                  </div>
                  <div className="bg-[#060606] min-h-[180px] overflow-hidden flex items-center justify-center">
                    <img src="/SEM_comparison/sample_003_20260206_125915_sem_isosurface.png" alt="AI generated SEM" className="w-full h-full object-contain opacity-95" />
                  </div>
                </div>
              </div>
            </div>

            {/* Wet Lab Validation */}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">The Wet-Lab Validation (Silicon Anode)</p>
              <div className="space-y-4 mb-4">
                <p className="text-white/70 font-light text-sm">We asked the AI to generate 5 unique battery architectures and exact manufacturing recipes.</p>
                <p className="text-white/70 font-light text-sm">We physically built the cells in a wet lab and broke them.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-4 min-h-[200px] flex items-center justify-center">
                <LineChart className="w-full h-full min-h-[160px]" />
              </div>
            </div>
          </motion.div>

          {/* The Result */}
          <motion.div {...fade} className="text-center">
            <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-950/5 max-w-2xl mx-auto">
              <p className="text-rose-300/70 text-xs uppercase tracking-wider mb-3">The Result</p>
              <p className="text-white/80 font-light text-lg">
                Our v1 model achieved <span className="text-rose-300 font-medium">~70% zero-shot accuracy</span> predicting the exact physical failure point of all 5 recipes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slide 7: Commercial Validation */}
      <section className="py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Slide 7: Commercial Validation</p>
            <h2 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight mb-4">
              Three anchor partners.<br />Three <span className="text-emerald-300">trillion-dollar</span> markets.
            </h2>
            <p className="text-white/50 font-light text-lg mt-4">
              Global industrial giants providing classified, historical failure data for outcome-based deployments.
            </p>
          </motion.div>

          <motion.div {...fade} className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Biocon */}
            <div className="p-6 rounded-2xl border border-blue-500/15 bg-blue-950/5">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-5 h-5 text-blue-400" />
                <p className="text-blue-300 font-medium">Biocon</p>
              </div>
              <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Biomanufacturing</p>
              <p className="text-white/80 font-light text-sm">Scaling next-generation biocatalysts and therapeutics from a single lab-beaker to global commercial production.</p>
            </div>

            {/* Aarti Industries */}
            <div className="p-6 rounded-2xl border border-amber-500/15 bg-amber-950/5">
              <div className="flex items-center gap-3 mb-4">
                <Factory className="w-5 h-5 text-amber-400" />
                <p className="text-amber-300 font-medium">Aarti Industries</p>
              </div>
              <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Specialty Chem</p>
              <p className="text-white/80 font-light text-sm">Unlocking the commercial viability of novel, highly exothermic chemicals that were previously too unstable to scale.</p>
            </div>

            {/* Jubilant Ingrevia */}
            <div className="p-6 rounded-2xl border border-emerald-500/15 bg-emerald-950/5">
              <div className="flex items-center gap-3 mb-4">
                <Beaker className="w-5 h-5 text-emerald-400" />
                <p className="text-emerald-300 font-medium">Jubilant Ingrevia</p>
              </div>
              <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Agro-Pharma</p>
              <p className="text-white/80 font-light text-sm">Architecting the zero-to-one scale-up of advanced agrochemical compounds via continuous manufacturing.</p>
            </div>
          </motion.div>

          {/* Pipeline Expansion */}
          <motion.div {...fade} className="text-center">
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] max-w-2xl mx-auto">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Pipeline Expansion</p>
              <p className="text-white/70 font-light text-sm">
                Actively architecting IP co-creation tracks with industrial giants including <span className="text-white font-medium">GE Aerospace</span> and <span className="text-white font-medium">A123 Systems</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slide 8: Identity & Moats */}
      <section className="py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Slide 8: Identity & Moats</p>
            <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-4">
              We are not just discovering the future.<br />
              <span className="text-rose-300">We are manufacturing it.</span>
            </h2>
          </motion.div>

          <motion.div {...fade} className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Founder Pedigree */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Founder Pedigree</p>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                PhD, Cambridge University (Material Science & Photonic Engineering). Former Microsoft Research.
              </p>
            </div>

            {/* Compute Advantage */}
            <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/5">
              <p className="text-emerald-300/70 text-xs uppercase tracking-wider mb-3">Compute Advantage</p>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                Backed by the sovereign IndiaAI Mission, guaranteeing priority access to national GPU clusters.
              </p>
            </div>

            {/* Advisory Board */}
            <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-950/5">
              <p className="text-blue-300/70 text-xs uppercase tracking-wider mb-3">Advisory Board</p>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                Anchored by industrial veterans (Arun Seth, Manish Duggar).
              </p>
            </div>
          </motion.div>

          {/* Closing Statement */}
          <motion.div {...fade} className="text-center mb-12">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] max-w-3xl mx-auto">
              <p className="text-3xl md:text-4xl font-extralight text-white/80 leading-relaxed">
                Language came. Code came. <span className="text-rose-300 italic">Physics is here.</span>
              </p>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div {...fade} className="text-center">
            <a href="mailto:arastu@shodh.ai" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors">
              <Mail className="w-4 h-4" />
              Contact: arastu@shodh.ai
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-white/30 text-xs">© 2026 Shodh AI. Confidential.</p>
      </footer>
    </div>
  );
}
