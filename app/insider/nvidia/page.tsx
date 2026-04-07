"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Settings, TrendingDown, Zap, Maximize2 } from "lucide-react";
import LineChart from "@/components/LineChart";

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function NvidiaPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <div className="min-h-screen bg-[#060606] text-white" style={{ cursor: "none" }}>
      <div className="pointer-events-none fixed z-[9999] transition-transform duration-75" style={{ left: mousePos.x, top: mousePos.y, transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.18) 15%, rgba(255,255,255,0.06) 40%, transparent 70%)" }} />
      <div className="pointer-events-none fixed z-[9999]" style={{ left: mousePos.x, top: mousePos.y, transform: "translate(-50%,-50%)", width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.8)" }} />

      {/* Header */}
      <header className="border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/insider/deckright" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
            <ArrowLeft className="w-4 h-4" /><span className="text-sm font-light">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-white/80 font-light text-sm tracking-tight">Shodh AI</span>
            <span className="text-white/30 text-lg">×</span>
            <img src="/demo/nvidia-partner-logo.png" alt="NVIDIA" className="h-8 opacity-70" style={{ filter: "brightness(0) invert(1)" }} />
          </div>
          <span className="text-xs font-light tracking-[0.3em] uppercase text-white/30">Technical Discussion</span>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-[55vh] flex flex-col items-center justify-center px-6 text-center border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,113,133,0.06)_0%,transparent_65%)] pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-10">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">Shodh AI × NVIDIA - Technical Discussion</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter mb-6 leading-[0.9]">Large<br /><span className="italic font-light text-rose-300">Physics Model.</span></h1>
          <p className="text-lg md:text-2xl text-white/45 font-light max-w-2xl mx-auto">Translating discovery into manufacturing.</p>
        </motion.div>
      </section>

      {/* Body + side nav */}
      <div className="relative xl:pl-72 2xl:pl-80">
        <div className="hidden xl:block absolute left-4 top-10 bottom-0 w-56 pointer-events-none 2xl:left-6">
          <nav className="sticky top-28 z-40 flex flex-col gap-5 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 pointer-events-auto">
            {[
              { label: "01 Physical Complexity", href: "#s1",  desc: "1D -> 3D, AlphaFold -> Shodh" },
              { label: "01b The LPM",            href: "#lpm", desc: "Neural Operator, Invertible Design" },
              { label: "02 Data Engine",         href: "#s2",  desc: "STR-GEN, PyBaMM, 95% Match" },
              { label: "03 Neural Surrogate",    href: "#s3", desc: "Sim-to-Real, Wet-Lab Proof" },
              { label: "04 The Bottleneck",      href: "#s4", desc: "Legacy solvers, Differentiability" },
              { label: "05 JAX Physics Engine",  href: "#s5", desc: "Navier-Stokes, Multiphase" },
              { label: "06 Scale Ask",           href: "#s6", desc: "50B Model, GPU, NVIDIA" },
            ].map((item, i) => (
              <a key={i} href={item.href} className="group flex flex-col gap-1">
                <span className="text-xs font-mono tracking-widest text-white/40 group-hover:text-white transition-colors">{item.label}</span>
                <span className="text-[10px] text-white/20 group-hover:text-white/40 transition-colors max-w-[140px] leading-tight">{item.desc}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="px-6 md:px-10 py-16 max-w-6xl">

          {/* -- SLIDE 1 -- */}
          <section id="s1" className="mb-24 border-b border-white/5 pb-24">
            <motion.div {...fade} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white/25 font-mono text-sm">01</span>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">The Physical Complexity View</p>
              </div>
              <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-4 max-w-4xl">AI for Science: From Sequences to <span className="text-rose-300 font-light">3D Tensors</span></h2>
              <p className="text-white/45 font-light text-xl mb-10">The missing layer in the AI-for-Science stack: Industrial Mesoscale.</p>
              <div className="space-y-4 mb-10 max-w-3xl">
                {[
                  { c: "emerald", title: "The 1D World", body: "AlphaFold mapped biological sequences to solve protein discovery." },
                  { c: "blue",    title: "The Macro World", body: "GraphCast mapped the planetary icosahedral grid to learn atmospheric dynamics." },
                  { c: "rose",    title: "The Mesoscale World", body: "Shodh AI maps microscopic pores and chemical reactors to a 3D voxel grid to learn the dynamics of industrial manufacturing." },
                ].map((row) => (
                  <div key={row.title} className={`flex items-start gap-4 p-5 rounded-xl border border-${row.c}-500/15 bg-${row.c}-950/5`}>
                    <div className={`w-2 h-2 mt-2 rounded-full bg-${row.c}-400 shrink-0`} />
                    <div>
                      <p className={`text-${row.c}-300 text-sm font-medium mb-1`}>{row.title}</p>
                      <p className="text-white/65 font-light text-sm leading-relaxed">{row.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Inflection Point Graph */}
            <motion.div {...fade} className="rounded-2xl border border-white/8 bg-[#060606] p-8 md:p-12 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-white/[0.03] to-transparent pointer-events-none" />
              <p className="text-white/30 text-sm uppercase tracking-[0.2em] mb-4 text-center relative z-10">The Physical Complexity View</p>
              <p className="text-white/50 text-base mb-12 text-center relative z-10 max-w-3xl mx-auto">1D Discovery Models (Sequences) vs. 3D Physical Models (Multi-Physics Tensors)</p>
              <div className="relative h-[650px] w-full max-w-6xl mx-auto border border-white/20 bg-white/[0.05] rounded-xl pl-20 backdrop-blur-sm">
                <div className="absolute inset-0 left-20">
                  {[0,50,100].map((p,i) => <div key={`h${i}`} className="absolute w-full border-b border-white/20" style={{top:`${p}%`}} />)}
                  {[0,16.7,33.3,50,66.7,83.3,100].map((p,i) => <div key={`v${i}`} className="absolute h-full border-r border-white/10 border-dashed" style={{left:`${p}%`}} />)}
                </div>
                <div className="absolute left-2 top-[25%] -translate-y-1/2 pr-3">
                  <p className="text-rose-400 text-sm mb-1 font-bold">3D Physical Layer</p>
                  <p className="text-white/40 text-[10px]">Tensors (Manufacturing / Sim)</p>
                </div>
                <div className="absolute left-2 top-[75%] -translate-y-1/2 pr-3">
                  <p className="text-emerald-400 text-sm mb-1 font-bold">1D Discovery Layer</p>
                  <p className="text-white/40 text-[10px]">Sequences (In Silico)</p>
                </div>
                <div className="absolute -bottom-10 left-20 right-0 flex justify-between text-xs text-white/60 font-mono px-4">
                  <span>2018</span><span>2020</span><span>2022</span><span>2024</span><span>2026</span><span>2028</span>
                </div>
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-xs text-white/50 tracking-widest uppercase">Year</div>
                <div className="absolute inset-0 left-20 pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-[50%] bg-rose-500/5 border-b border-rose-500/20" />
                  <div className="absolute top-[50%] left-0 right-0 h-[50%] bg-emerald-500/5" />
                </div>
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0" style={{left:"5rem",width:"calc(100% - 5rem)"}} preserveAspectRatio="none">
                  <defs>
                    <filter id="ggNV"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="grNV"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                  </defs>
                  <path d="M 33.3% 83% L 50% 78% L 66.7% 75% L 75% 72%" fill="none" stroke="#34d399" strokeWidth="4" strokeDasharray="6 6" filter="url(#ggNV)" vectorEffect="non-scaling-stroke" className="opacity-80"/>
                  <path d="M 25% 45% L 50% 40% L 58.3% 42% L 66.7% 35% L 75% 16.6%" fill="none" stroke="#fb7185" strokeWidth="4" strokeDasharray="6 6" filter="url(#grNV)" vectorEffect="non-scaling-stroke" className="opacity-80"/>
                </svg>
                <div className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{left:"5rem",width:"calc(100% - 5rem)"}}>
                  <div className="absolute left-[33.3%] top-[83%] -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-[0_0_14px_#10b981]"/>
                    <div className="absolute -top-16 -left-20 w-44"><p className="text-emerald-300 text-xs font-semibold">AlphaFold 2</p><p className="text-white/70 text-[11px]">Protein Structure Prediction</p></div>
                  </div>
                  <div className="absolute left-[50%] top-[78%] -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-white shadow-[0_0_12px_#10b981]"/>
                    <div className="absolute top-4 -left-16 w-40"><p className="text-emerald-200 text-[11px] font-medium">AlphaFold 3</p><p className="text-white/60 text-[10px]">Drug Discovery (Multi-modal)</p></div>
                  </div>
                  <div className="absolute left-[66.7%] top-[75%] -translate-x-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 rounded-full bg-emerald-400 border-2 border-white shadow-[0_0_16px_#10b981]"/>
                    <div className="absolute -top-16 -left-12 w-44"><p className="text-emerald-300 text-sm font-semibold">C2S (Google)</p><p className="text-white/70 text-xs">27B - Scientific Discovery</p></div>
                  </div>
                  <div className="absolute left-[75%] top-[72%] -translate-x-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-[0_0_18px_#10b981] animate-pulse"/>
                    <div className="absolute -top-16 left-4 w-52"><p className="text-emerald-400 text-sm font-bold">Evo 2 (Arc/NVIDIA)</p><p className="text-white/70 text-xs">40B - Genomics Foundation Model</p></div>
                  </div>
                  <div className="absolute left-[25%] top-[45%] -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-400 border-2 border-white shadow-[0_0_12px_#fb7185]"/>
                    <div className="absolute top-4 -left-12 w-36"><p className="text-rose-300 text-[11px] font-medium">FNO</p><p className="text-white/70 text-[10px]">Neural Operators</p></div>
                  </div>
                  <div className="absolute left-[50%] top-[40%] -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 rounded-full bg-rose-400 border-2 border-white shadow-[0_0_14px_#fb7185]"/>
                    <div className="absolute -top-14 -left-16 w-40"><p className="text-rose-300 text-xs font-semibold">GraphCast</p><p className="text-white/70 text-[11px]">Weather Forecasting</p></div>
                  </div>
                  <div className="absolute left-[58.3%] top-[42%] -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 rounded-full bg-rose-300 border border-white shadow-[0_0_10px_#fb7185]"/>
                    <div className="absolute top-4 -left-10 w-32"><p className="text-rose-200 text-[10px]">FourCastNet</p><p className="text-white/60 text-[9px]">Extreme Weather</p></div>
                  </div>
                  <div className="absolute left-[66.7%] top-[35%] -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 rounded-full bg-rose-400 border-2 border-white shadow-[0_0_14px_#fb7185]"/>
                    <div className="absolute -top-16 -left-12 w-48"><p className="text-rose-300 text-xs font-semibold">Aurora</p><p className="text-white/70 text-[11px]">1.3B - Earth System</p></div>
                  </div>
                  <div className="absolute left-[75%] top-[16.6%] -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="absolute inset-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-rose-500/30 rounded-full animate-ping"/>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 border-2 border-white shadow-[0_0_40px_#fb7185] relative z-10 flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full opacity-50"/>
                      </div>
                    </div>
                    <div className="absolute bottom-full right-0 mb-3 w-52 bg-[#0a0a0a] border border-rose-500/40 rounded-xl p-3 shadow-2xl">
                      <p className="text-rose-400 text-sm font-bold mb-1">SHODH AI - LPM</p>
                      <p className="text-white/70 text-xs leading-snug">Aimed at 10B-50B 3D Multi-Physics neural operator for mesoscale inverse manufacturing</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 p-6 rounded-xl bg-gradient-to-r from-rose-900/20 via-rose-900/10 to-emerald-900/20 border border-rose-500/20">
                <p className="text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">The Physics / Science Narrative</p>
                <p className="text-white/70 text-sm leading-relaxed">AlphaFold and Evo 2 operate in <span className="text-emerald-400 font-semibold">1D sequence space</span> for discovery. GraphCast, Aurora, and Shodh AI operate in <span className="text-rose-400 font-semibold">3D tensor space</span> for physical simulation and manufacturing. Shodh AI is the only one mastering 3D multi-physics inverse design at the mesoscale.</p>
              </div>
            </motion.div>
          </section>

          {/* -- LPM SLIDE -- */}
          <section id="lpm" className="mb-24 border-b border-white/5 pb-24">
            <motion.div {...fade} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white/25 font-mono text-sm">01b</span>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">The Solution - The Large Physics Model</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight mb-4 max-w-4xl">The Large Physics Model <span className="text-rose-300 font-light">(LPM)</span></h2>
              <p className="text-white/45 font-light text-xl mb-6">Unifying the governing PDEs of the physical world into a single neural operator.</p>
              <p className="text-white/55 font-light text-base max-w-3xl mb-8 leading-relaxed">We formulate manufacturing as a fully invertible inverse-design problem.</p>
              <div className="max-w-3xl mb-10">
                <div className="p-5 rounded-xl border border-rose-500/15 bg-rose-950/5">
                  <p className="text-rose-300/70 text-xs uppercase tracking-wider mb-3">What the LPM Actually Does</p>
                  <ul className="space-y-3 text-white/65 font-light text-sm leading-relaxed">
                    <li className="flex gap-2"><span className="text-rose-400 shrink-0">-</span><span>It operates as a <span className="text-white font-normal">3D Multi-Physics Neural Surrogate</span>.</span></li>
                    <li className="flex gap-2"><span className="text-rose-400 shrink-0">-</span><span>It processes massive <span className="text-white font-normal">3D/4D physics tensors</span> across all domains in milliseconds.</span></li>
                    <li className="flex gap-2"><span className="text-rose-400 shrink-0">-</span><span><span className="text-white font-normal">Fully Invertible:</span> You input the desired zero-defect physical outcome. The LPM runs the physics backward to generate the exact thermal, fluid, and pressure recipe required to manufacture it.</span></li>
                  </ul>
                </div>
              </div>
            </motion.div>
            <motion.div {...fade}>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                {[
                  { domain: "Fluid Flow",          name: "Navier-Stokes",           color: "text-blue-300",   border: "border-blue-500/20",   bg: "bg-blue-950/5" },
                  { domain: "Chemical Diffusion",   name: "Fick's Law",              color: "text-violet-300", border: "border-violet-500/20", bg: "bg-violet-950/5" },
                  { domain: "Material Separation",  name: "Cahn-Hilliard",           color: "text-cyan-300",   border: "border-cyan-500/20",   bg: "bg-cyan-950/5" },
                  { domain: "Stress & Heat",        name: "Solid Mechanics + Fourier",color: "text-amber-300", border: "border-amber-500/20", bg: "bg-amber-950/5" },
                  { domain: "Electromagnetics",     name: "Maxwell's Equations",     color: "text-rose-300",   border: "border-rose-500/20",   bg: "bg-rose-950/5" },
                ].map((eq, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${eq.border} ${eq.bg} flex flex-col gap-1`}>
                    <p className="font-light text-sm text-white leading-tight">{eq.domain}</p>
                    <p className={`font-mono text-xs ${eq.color} opacity-60`}>{eq.name}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mb-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-px h-8 bg-white/15"/>
                  <svg width="16" height="10" viewBox="0 0 16 10"><path d="M0 0L8 10L16 0" fill="rgba(255,255,255,0.2)"/></svg>
                </div>
              </div>
              <div className="flex justify-center mb-8">
                <div className="max-w-xs w-full p-5 rounded-2xl bg-white/[0.04] border border-white/15 text-center">
                  <p className="text-white/35 text-xs uppercase tracking-widest mb-1">Foundation Model</p>
                  <p className="text-white text-3xl font-extralight tracking-widest">LPM</p>
                  <p className="text-white/35 font-light text-xs mt-1">Large Physics Model</p>
                </div>
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
          </section>

          {/* -- SLIDE 2 -- */}
          <section id="s2" className="mb-24 border-b border-white/5 pb-24">
            <motion.div {...fade} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white/25 font-mono text-sm">02</span>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">Phase 1 Sandbox - The Synthetic Data Engine</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight mb-4 max-w-4xl">Phase 1 Sandbox: The Synthetic Data Engine <span className="text-emerald-300 font-light">(Silicon Anodes)</span></h2>
              <p className="text-white/45 font-light text-xl mb-8">Overcoming the lack of open-source data via physically-validated synthetic generation.</p>
              <div className="max-w-3xl mb-10">
                <div className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">The Problem</p>
                  <p className="text-white/65 font-light text-sm leading-relaxed">No open-source dataset links mesoscale 3D microstructures to electrochemical performance, limiting physics-informed ML.</p>
                </div>
              </div>
            </motion.div>
            <motion.div {...fade} className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                <p className="text-white/25 text-xs uppercase tracking-widest mb-1 text-center">The Synthetic Pipeline</p>
                <p className="text-white/20 text-[10px] text-center mb-5 font-mono">STR-GEN &rarr; PyBaMM &rarr; Training Dataset</p>
                <div className="flex flex-col items-center">
                  <div className="w-64 px-5 py-3 rounded-xl border-2 border-red-800/60 bg-red-900/15 text-center">
                    <p className="text-red-300 text-sm font-medium">No Open-Source Data</p>
                  </div>
                  <div className="flex flex-col items-center py-1"><div className="w-px h-4 bg-white/20"/><svg width="10" height="6" viewBox="0 0 10 6"><path d="M0 0L5 6L10 0" fill="rgba(255,255,255,0.25)"/></svg></div>
                  <div className="w-64 px-5 py-3 rounded-xl border-2 border-blue-600/60 bg-blue-900/15 text-center">
                    <p className="text-blue-300 text-sm font-semibold">STR-GEN</p>
                    <p className="text-white/35 text-[11px] mt-0.5 font-mono">ε &bull; τ &bull; D &bull; L</p>
                  </div>
                  <div className="flex flex-col items-center py-1"><div className="w-px h-4 bg-white/20"/><svg width="10" height="6" viewBox="0 0 10 6"><path d="M0 0L5 6L10 0" fill="rgba(255,255,255,0.25)"/></svg></div>
                  <div className="w-64 px-5 py-3 rounded-xl border-2 border-purple-600/60 bg-purple-900/15 text-center">
                    <p className="text-purple-300 text-sm font-semibold">PyBaMM Simulation</p>
                    <p className="text-white/35 text-[11px] mt-0.5 font-mono">DFN &bull; V(t) &bull; Q-fade &bull; Z(ω) &bull; SEI</p>
                  </div>
                  <div className="flex flex-col items-center py-1"><div className="w-px h-4 bg-white/20"/><svg width="10" height="6" viewBox="0 0 10 6"><path d="M0 0L5 6L10 0" fill="rgba(255,255,255,0.25)"/></svg></div>
                  <div className="w-64 px-5 py-3 rounded-xl border-2 border-green-600/60 bg-green-900/15 text-center">
                    <p className="text-green-300 text-sm font-semibold">Synthetic Dataset</p>
                    <p className="text-white/35 text-[11px] mt-0.5">microstructure &rarr; performance pairs</p>
                  </div>
                  <div className="flex flex-col items-center py-1"><div className="w-px h-4 bg-white/20"/><svg width="10" height="6" viewBox="0 0 10 6"><path d="M0 0L5 6L10 0" fill="rgba(255,255,255,0.25)"/></svg></div>
                  <div className="w-64 px-5 py-3 rounded-xl border-2 border-amber-600/60 bg-amber-900/15 text-center">
                    <p className="text-amber-300 text-sm font-semibold">Physics-Informed ML</p>
                  </div>
                </div>
                <p className="text-white/25 text-xs mt-5 text-center font-light leading-relaxed">An infinite, algorithmically generated training ground for our neural networks.</p>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
                  <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-400/60"/>
                    <p className="text-white/40 text-xs uppercase tracking-widest">The Physical Validation - Hardware Demo</p>
                  </div>
                  <video autoPlay loop muted playsInline className="w-full max-h-[300px] object-cover">
                    <source src="/Animated_Sliding_Glass_Lid_Video.mp4" type="video/mp4"/>
                  </video>
                  <p className="text-white/25 text-xs px-5 py-3 font-light">Custom vacuum-sealed transfer vessel - transporting live silicon anodes into the SEM to prevent oxidation</p>
                </div>
                <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-950/5">
                  <p className="text-emerald-300/70 text-xs uppercase tracking-wider mb-2">The Verdict - 95% Morphological Match</p>
                  <p className="text-white/65 font-light text-sm leading-relaxed">Cross-referencing our procedural STR-GEN structures against uncorrupted physical scans, we achieved a <span className="text-white font-normal">95% morphological match</span>. The synthetic data is mathematically equivalent to reality.</p>
                </div>
              </div>
            </motion.div>
            <motion.div {...fade} className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
                <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/20"/>
                  <p className="text-white/40 text-xs uppercase tracking-widest">Real-World Tomography - Commercial Battery SEM</p>
                </div>
                <div className="grid grid-cols-2 gap-px bg-white/5 p-px">
                  <div className="bg-[#060606] min-h-[200px] overflow-hidden flex items-center justify-center">
                    <img src="/SEM_comparison/Samsung_25R6_sem_slices copy.png" alt="Real SEM slices - Samsung 25R6" className="w-full h-full object-contain opacity-90"/>
                  </div>
                  <div className="bg-[#060606] min-h-[200px] overflow-hidden flex items-center justify-center">
                    <img src="/SEM_comparison/Samsung_25R6_sem_isosurface.png" alt="Real SEM isosurface - Samsung 25R6" className="w-full h-full object-contain opacity-90"/>
                  </div>
                </div>
                <p className="text-white/25 text-xs px-5 py-3 font-light">Samsung 25R6 - Physical scan data</p>
              </div>
              <div className="rounded-2xl border border-blue-500/20 bg-blue-950/5 overflow-hidden">
                <div className="px-5 py-3 border-b border-blue-500/10 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400/50"/>
                  <p className="text-blue-300/60 text-xs uppercase tracking-widest">Shodh AI - Generated Digital Twin</p>
                </div>
                <div className="bg-[#060606] min-h-[200px] overflow-hidden flex items-center justify-center">
                  <img src="/SEM_comparison/sample_003_20260206_125915_sem_isosurface.png" alt="Shodh AI generated SEM isosurface" className="w-full h-full object-contain opacity-95"/>
                </div>
                <p className="text-blue-300/40 text-xs px-5 py-3 font-light">Algorithmically generated - no physical scan required</p>
              </div>
            </motion.div>
          </section>

          {/* -- SLIDE 3 -- */}
          <section id="s3" className="mb-24 border-b border-white/5 pb-24">
            <motion.div {...fade} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white/25 font-mono text-sm">03</span>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">Phase 1 - The Neural Surrogate & Wet-Lab Validation</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight mb-4 max-w-4xl">Phase 1 Sandbox: Natively Learning PDEs & <span className="text-blue-300 font-light">Closing the Sim-to-Real Gap</span></h2>
              <p className="text-white/45 font-light text-xl mb-8">Digital predictions mean nothing without physical validation.</p>
              <div className="space-y-4 max-w-3xl mb-8">
                <div className="p-5 rounded-xl border border-blue-500/15 bg-blue-950/5">
                  <p className="text-blue-300/70 text-xs uppercase tracking-wider mb-3">The Digital Surrogate (Training on the Data)</p>
                  <ul className="space-y-2 text-white/65 font-light text-sm leading-relaxed">
                    <li className="flex gap-2"><span className="text-blue-400 shrink-0">-</span><span>Trained a Conditional Diffusion model <span className="font-mono text-white/80 text-xs">(skanda_charge2sem)</span> on 100,000 of our synthetic microstructures.</span></li>
                    <li className="flex gap-2"><span className="text-blue-400 shrink-0">-</span><span>Achieved <span className="text-white font-normal">87% zero-shot accuracy</span> mapping target performances back to physical manufacturing configurations.</span></li>
                  </ul>
                </div>
              </div>
            </motion.div>
            <motion.div {...fade} className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-blue-500/20 bg-blue-950/5 p-6">
                <p className="text-blue-300/70 text-xs uppercase tracking-widest mb-4">The Forward Surrogate</p>
                <div className="mb-5 space-y-3">
                  <div className="flex items-stretch gap-1.5">
                    <div className="flex-1 px-2 py-4 rounded-xl border-2 border-blue-600/55 bg-blue-900/15 text-center flex flex-col justify-center">
                      <p className="text-blue-300 text-[10px] font-semibold tracking-wide mb-1">Microstructure Params</p>
                      <p className="text-white/35 text-[10px] font-mono">e - t - D - L</p>
                    </div>
                    <div className="flex items-center text-white/25 text-sm px-0.5">-></div>
                    <div className="flex-1 px-2 py-4 rounded-xl border-2 border-purple-600/55 bg-purple-900/15 text-center flex flex-col justify-center">
                      <p className="text-purple-300 text-[10px] font-semibold tracking-wide mb-1">Encoder</p>
                      <p className="text-white/35 text-[10px] font-mono">CNN</p>
                    </div>
                    <div className="flex items-center text-white/25 text-sm px-0.5">-></div>
                    <div className="flex-1 px-2 py-4 rounded-xl border-2 border-indigo-500/55 bg-indigo-900/15 text-center flex flex-col justify-center">
                      <p className="text-indigo-300 text-[10px] font-semibold tracking-wide mb-1">Prediction</p>
                      <p className="text-white/35 text-[10px]">mlp-based</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 px-1">
                    <div className="flex-1 flex justify-start">
                      <div className="px-4 py-2 rounded-lg border border-amber-600/50 bg-amber-900/15">
                        <p className="text-amber-300 text-xs font-bold">R2 = 0.99</p>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-1.5">
                      {["V(t)", "Q-fade", "Z(w)", "SEI"].map(o => (
                        <div key={o} className="px-2 py-1.5 rounded-lg border border-green-600/40 bg-green-900/10 text-center">
                          <p className="text-green-300 text-[10px] font-mono">{o}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-white/20 text-[10px] font-mono text-center">skanda_sem2charge</p>
                </div>
                <p className="text-white/65 font-light text-sm leading-relaxed mb-3">CNN -> MLP architecture mapping microstructure parameters <span className="font-mono text-white/80 text-xs">(e, t, D, L)</span> to full electrochemical time-series outputs <span className="font-mono text-white/80 text-xs">(V(t), Qfade, Z(w), SEI)</span>.</p>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                  <div className="w-2 h-2 mt-1 rounded-full bg-emerald-400 shrink-0"/>
                  <p className="text-emerald-300 font-medium text-sm">Result: Achieved R2 = 0.99 on held-out test sets, matching PyBaMM simulator dynamics at a fraction of compute.</p>
                </div>
              </div>
              <div className="rounded-2xl border border-violet-500/20 bg-violet-950/5 p-6">
                <p className="text-violet-300/70 text-xs uppercase tracking-widest mb-4">The Inverse Design (Diffusion)</p>
                <div className="mb-5 space-y-2">
                  <div className="flex justify-center mb-1">
                    <div className="flex flex-col items-center gap-0.5">
                      <p className="text-white/30 text-[10px] italic">Gaussian noise z</p>
                      <div className="w-px h-3 bg-white/20"/>
                      <svg width="8" height="5" viewBox="0 0 8 5"><path d="M0 0L4 5L8 0" fill="rgba(255,255,255,0.25)"/></svg>
                    </div>
                  </div>
                  <div className="flex items-stretch gap-1.5">
                    <div className="flex-1 px-2 py-4 rounded-xl border-2 border-green-600/55 bg-green-900/15 text-center flex flex-col justify-center">
                      <p className="text-green-300 text-[10px] font-semibold tracking-wide mb-1">Target Performance</p>
                      <p className="text-white/35 text-[10px] font-mono">V(t) - Q-fade - Z(u)</p>
                    </div>
                    <div className="flex items-center text-white/25 text-sm px-0.5">-></div>
                    <div className="flex-1 px-2 py-4 rounded-xl border-2 border-purple-600/55 bg-purple-900/15 text-center flex flex-col justify-center">
                      <p className="text-purple-300 text-[10px] font-semibold tracking-wide mb-1">Conditional Diffusion</p>
                      <p className="text-white/35 text-[10px]">denoising - conditioned on target</p>
                    </div>
                    <div className="flex items-center text-white/25 text-sm px-0.5">-></div>
                    <div className="flex-1 px-2 py-4 rounded-xl border-2 border-blue-600/55 bg-blue-900/15 text-center flex flex-col justify-center">
                      <p className="text-blue-300 text-[10px] font-semibold tracking-wide mb-1">Microstructure Config</p>
                      <p className="text-white/35 text-[10px] font-mono">e - t - D - L</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className="px-5 py-2 rounded-lg border border-amber-600/50 bg-amber-900/15">
                      <p className="text-amber-300 text-xs font-bold">87% Accuracy</p>
                    </div>
                    <p className="text-white/20 text-[10px] font-mono">skanda_charge2sem</p>
                  </div>
                </div>
                <p className="text-white/65 font-light text-sm leading-relaxed mb-3">Formulated inverse design as a Conditional Diffusion process <span className="font-mono text-white/80 text-xs">(skanda_charge2sem)</span> to solve the ill-posed, non-unique mapping of target performance back to physical microstructures.</p>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-violet-950/20 border border-violet-500/20">
                  <div className="w-2 h-2 mt-1 rounded-full bg-violet-400 shrink-0"/>
                  <p className="text-violet-300 font-medium text-sm">Result: 87% zero-shot accuracy in generating physically viable manufacturing configurations.</p>
                </div>
              </div>
            </motion.div>
            <motion.div {...fade} className="mt-8">
              <div className="p-6 rounded-2xl border border-violet-500/20 bg-violet-950/5">
                <p className="text-violet-300/70 text-xs uppercase tracking-wider mb-4">The Wet-Lab Physical Validation (Ongoing Blind Study)</p>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="text-violet-400 shrink-0 text-sm font-medium mt-0.5">-</span>
                    <div>
                      <p className="text-white/80 text-sm font-normal mb-1">Rigorous Testing Protocol</p>
                      <p className="text-white/60 font-light text-sm leading-relaxed">To isolate true chemical performance from random lab variance (e.g., poor cell crimping), we are actively executing an N=6 coin cell physical blind study across 5 distinct matrix recipes.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-violet-400 shrink-0 text-sm font-medium mt-0.5">-</span>
                    <div>
                      <p className="text-white/80 text-sm font-normal mb-1">The Matrix</p>
                      <p className="text-white/60 font-light text-sm leading-relaxed">We prompted the AI to generate both baseline formulations and boundary-pushing recipes <span className="text-white/80">(The AI Safe Bet vs. The AI Hero)</span>. We also built intentionally flawed physical designs (brittle/choked cells) to force specific mechanical cracking (LAM) and high-resistance failures.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-violet-400 shrink-0 text-sm font-medium mt-0.5">-</span>
                    <div>
                      <p className="text-white/80 text-sm font-normal mb-1">Early Signals</p>
                      <p className="text-white/60 font-light text-sm leading-relaxed">Initial physical stress-tests are successfully tracking the AI&apos;s predicted trend lines. The physical cells are failing exactly in the extreme modes <span className="text-white/80">(Loss of Active Material, porosity bottlenecks)</span> that the digital diffusion model predicted.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div {...fade} className="mt-8">
              <div className="grid lg:grid-cols-3 gap-6 items-stretch">
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
                  </div>
                  <div className="pt-4 border-t border-white/10 mt-auto text-center">
                    <p className="text-white/80 text-sm font-medium leading-relaxed">The Sim-to-Real Match: AI&apos;s digital output perfectly translated into physical reality.</p>
                  </div>
                </div>

                <div className="relative p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl h-full flex flex-col">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30 text-rose-400 font-medium text-sm">3</div>
                  <h3 className="text-xl font-medium text-white mb-6 pl-4">The Real-World Test</h3>
                  <div className="relative bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex-grow min-h-[260px] flex items-center justify-center overflow-hidden">
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
            </motion.div>
          </section>

          {/* -- SLIDE 4 -- */}
          <section id="s4" className="mb-24 border-b border-white/5 pb-24">
            <motion.div {...fade}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white/25 font-mono text-sm">04</span>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">The Bottleneck - Why We Abandoned Legacy Solvers</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight mb-10 max-w-4xl">The Bottleneck: Moving from <span className="text-orange-300 font-light">1D Discovery to 3D Manufacturing</span></h2>
              <div className="space-y-5 max-w-4xl">
                {[
                  { accent: "border-orange-500/30 bg-orange-950/5", label: "The Limitation of Legacy Solvers", labelColor: "text-orange-300/80", body: "PyBaMM is incredible for 1D battery discovery, but it is physically incapable of simulating 3D factory scale-up (e.g., continuous multiphase flow, complex fluid mixing for CDMOs like Aarti Industries)." },
                  { accent: "border-red-500/20 bg-white/[0.02]", label: "The Differentiability Problem", labelColor: "text-red-300/80", body: "Legacy process engineering solvers cannot backpropagate." },
                  { accent: "border-rose-500/20 bg-rose-950/5", label: "The Pivot", labelColor: "text-rose-300/80", body: "To build a Universal Manufacturing Foundation Model, we could not rely on black-box simulators. We required a physics engine where the laws of thermodynamics and fluid dynamics are natively embedded in the computational graph." },
                ].map((item) => (
                  <div key={item.label} className={`p-6 rounded-2xl border ${item.accent}`}>
                    <p className={`text-xs uppercase tracking-wider mb-2 ${item.labelColor}`}>{item.label}</p>
                    <p className="text-white/70 font-light text-base leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* -- SLIDE 5 -- */}
          <section id="s5" className="mb-24 border-b border-white/5 pb-24">
            <motion.div {...fade} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white/25 font-mono text-sm">05</span>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">Phase 2 - The Pure-JAX 3D Physics Engine</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight mb-4 max-w-4xl">Phase 2: A Native-JAX <span className="text-cyan-300 font-light">Differentiable Physics Engine</span></h2>
              <p className="text-white/45 font-light text-xl mb-10">Executing Navier-Stokes and Multiphase Thermodynamics entirely on GPUs via XLA.</p>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mb-8">
                <div className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
                  <p className="text-cyan-300/70 text-xs uppercase tracking-wider mb-2">Foundation</p>
                  <p className="text-white/65 font-light text-sm leading-relaxed">Built a hardware-agnostic, fully differentiable 3D physics engine from scratch using native JAX.</p>
                </div>
                <div className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
                  <p className="text-cyan-300/70 text-xs uppercase tracking-wider mb-2">Compiler Optimization</p>
                  <p className="text-white/65 font-light text-sm leading-relaxed">Entire physics pipeline compiles down via <span className="font-mono text-white/80 text-xs">jax.jit</span> and <span className="font-mono text-white/80 text-xs">jax.vmap</span> for massively parallel GPU acceleration.</p>
                </div>
              </div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-4">End-to-End Differentiable Solvers</p>
              <div className="space-y-3 max-w-4xl mb-10">
                {[
                  { name: "Navier-Stokes", cls: "border-blue-500/20 bg-blue-950/5", ac: "text-blue-300", dot: "bg-blue-400", desc: "Incompressible fluid flow through 3D pores utilizing LBM D3Q19 lattice and bounce-back boundary conditions." },
                  { name: "Fick's Law",    cls: "border-violet-500/20 bg-violet-950/5", ac: "text-violet-300", dot: "bg-violet-400", desc: "Steady-state species diffusion solved via iterative jax.lax.scan over the 3D concentration field." },
                  { name: "Cahn-Hilliard / Shan-Chen", cls: "border-cyan-500/20 bg-cyan-950/5", ac: "text-cyan-300", dot: "bg-cyan-400", desc: "Multiphase Lattice Boltzmann Method (LBM) modeling complex electrolyte wetting and two-phase transport." },
                ].map((eq) => (
                  <div key={eq.name} className={`flex items-start gap-4 p-4 rounded-xl border ${eq.cls}`}>
                    <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${eq.dot}`}/>
                    <div>
                      <p className={`text-sm font-medium mb-1 ${eq.ac}`}>{eq.name}</p>
                      <p className="text-white/60 font-light text-sm leading-relaxed">{eq.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fade} className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
              <p className="text-white/25 text-xs uppercase tracking-widest mb-6 text-center">JAX-Native Physics Simulation Architecture</p>
              <div className="flex flex-col items-center">
                <div className="w-72 px-5 py-3 rounded-xl border-2 border-blue-500/60 bg-blue-900/15 text-center">
                  <p className="text-blue-300 text-sm font-semibold">Voxel Geometry</p>
                  <p className="text-white/35 text-[11px] mt-0.5 font-mono">generate_geometry.py - sphere-pack - z, D</p>
                </div>
                <div className="relative w-full h-10">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-white/20"/>
                  <div className="absolute top-4 left-[16.5%] right-[16.5%] h-px bg-white/20"/>
                  <div className="absolute top-4 left-[16.5%] w-px h-6 bg-white/20"/>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-6 bg-white/20"/>
                  <div className="absolute top-4 right-[16.5%] w-px h-6 bg-white/20"/>
                </div>
                <div className="grid grid-cols-3 gap-3 w-full">
                  <div className="px-3 py-3 rounded-xl border-2 border-blue-500/50 bg-blue-900/10 text-center">
                    <p className="text-blue-300 text-xs font-semibold mb-1">Navier-Stokes</p>
                    <p className="text-white/30 text-[10px] font-mono leading-relaxed">LBM D3Q19 - bounce-back BCs - flow field</p>
                  </div>
                  <div className="px-3 py-3 rounded-xl border-2 border-purple-600/50 bg-purple-900/10 text-center">
                    <p className="text-purple-300 text-xs font-semibold mb-1">Fick&apos;s Law</p>
                    <p className="text-white/30 text-[10px] font-mono leading-relaxed">iterative JAX scan - 3D diffusion field</p>
                  </div>
                  <div className="px-3 py-3 rounded-xl border-2 border-indigo-600/50 bg-indigo-900/10 text-center">
                    <p className="text-indigo-300 text-xs font-semibold mb-1">Cahn-Hilliard / Shan-Chen</p>
                    <p className="text-white/30 text-[10px] font-mono leading-relaxed">multiphase LBM - electrolyte wetting</p>
                  </div>
                </div>
                <div className="relative w-full h-10">
                  <div className="absolute top-0 left-[16.5%] w-px h-4 bg-white/20"/>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-white/20"/>
                  <div className="absolute top-0 right-[16.5%] w-px h-4 bg-white/20"/>
                  <div className="absolute top-4 left-[16.5%] right-[16.5%] h-px bg-white/20"/>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-6 bg-white/20"/>
                </div>
                <div className="w-80 px-5 py-3 rounded-xl border-2 border-green-600/60 bg-green-900/15 text-center">
                  <p className="text-green-300 text-sm font-semibold">Physics Fields</p>
                  <p className="text-white/35 text-[11px] mt-0.5 font-mono">t_eff - D_eff - wetting fraction -> microstructure features</p>
                </div>
                <div className="flex flex-col items-center py-1"><div className="w-px h-4 bg-white/20"/><svg width="10" height="6" viewBox="0 0 10 6"><path d="M0 0L5 6L10 0" fill="rgba(255,255,255,0.25)"/></svg></div>
                <div className="px-7 py-3 rounded-xl border-2 border-amber-600/60 bg-amber-900/15 text-center">
                  <p className="text-amber-300 text-sm font-semibold font-mono">JAX - jit - vmap - GPU</p>
                </div>
              </div>
            </motion.div>
            <motion.div {...fade}>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-5">Validation Results - JAX-LaB Physics Engine</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { file: "1a_ch_slice.png",             label: "CH Phase Field",         sub: "Mid-plane slice" },
                  { file: "1b_ch_isosurface.png",        label: "CH Interface f=0",       sub: "(3D)" },
                  { file: "2a_ficks_slice.png",          label: "Fick's Concentration",   sub: "Slice" },
                  { file: "2b_ficks_isosurface.png",     label: "Fick's 25%/75% Shells",  sub: "(3D)" },
                  { file: "3a_multiphase_phase_slice.png",label: "Multiphase Phase Field", sub: "Slice" },
                  { file: "3b_multiphase_vel_slice.png", label: "Multiphase Velocity",    sub: "Magnitude slice" },
                  { file: "3c_multiphase_interface.png", label: "Multiphase Interface",   sub: "Isosurface (3D)" },
                  { file: "4a_ns_velocity_slice.png",    label: "NS Velocity Magnitude",  sub: "Slice" },
                  { file: "4b_ns_streamlines.png",       label: "NS Streamlines",         sub: "(3D)" },
                ].map((img) => (
                  <div key={img.file} className="rounded-xl overflow-hidden border border-white/8 bg-[#060606]">
                    <div className="aspect-square overflow-hidden flex items-center justify-center bg-black/40">
                      <img src={`/jax-lab_results/${img.file}`} alt={img.label} className="w-full h-full object-cover"/>
                    </div>
                    <div className="px-3 py-2">
                      <p className="text-white/60 text-xs font-medium">{img.label}</p>
                      <p className="text-white/30 text-[10px]">{img.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* -- SLIDE 6 -- */}
          <section id="s6" className="mb-24">
            <motion.div {...fade}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white/25 font-mono text-sm">06</span>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">Scaling the 50B Model - The Infrastructure Ask</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight mb-4 max-w-4xl">Scaling the 3D Trunk: <span className="text-rose-300 font-light">Architecture & Infrastructure</span></h2>
              <p className="text-white/45 font-light text-xl mb-10">Transitioning from edge-validation to universal scale.</p>
              <div className="space-y-4 max-w-4xl mb-10">
                <div className="p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">The Compute Stack</p>
                  <p className="text-white/70 font-light text-base leading-relaxed">Deploying a $60M capital structure to generate petabytes of HDF5 tensors and train our foundational 3D multi-physics model.</p>
                </div>
                <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-950/5">
                  <p className="text-rose-300/70 text-xs uppercase tracking-wider mb-2">The Target Architecture</p>
                  <p className="text-white/70 font-light text-base leading-relaxed">Transitioning beyond standard FNOs to <span className="text-white font-normal">Mesh-Free Neural Surrogates (GP-UPT / UPT++)</span>. Ingesting raw CAD geometries directly into a compressed latent space, utilizing FNO-blocks &ldquo;under the hood&rdquo; for mathematical stability.</p>
                </div>
                <div className="p-6 rounded-2xl border border-cyan-500/20 bg-cyan-950/5">
                  <p className="text-cyan-300/70 text-xs uppercase tracking-wider mb-2">The 80/20 Deployment Model</p>
                  <p className="text-white/70 font-light text-base leading-relaxed"><span className="text-white font-normal">80% Base Physics</span> trained on sovereign clusters. <span className="text-white font-normal">20% Edge Fine-Tuning</span> deployed into highly secure, federated VPC enclaves (e.g., Biocon, Aarti) to learn chaotic failure data without moving client IP.</p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                <p className="text-white/35 text-xs uppercase tracking-widest mb-6">Discussion Points for NVIDIA / DGX Cloud</p>
                <div className="space-y-5">
                  {[
                    { n: "01", text: "Optimizing GPU cluster scaling for heavy 3D tensor workloads." },
                    { n: "02", text: "Pushing CUDA/JAX sharding limits across multi-node, federated clusters." },
                    { n: "03", text: "Best practices for GPU kernel optimization on highly-coupled PDE neural architectures." },
                    { n: "04", text: "Structuring secure NVIDIA DGX Cloud VPC enclaves for our 20% federated edge-deployments." },
                  ].map((pt) => (
                    <div key={pt.n} className="flex items-start gap-5">
                      <span className="text-white/20 font-mono text-sm shrink-0 mt-0.5">{pt.n}</span>
                      <p className="text-white/75 font-light text-base leading-relaxed">{pt.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

        </div>
      </div>

      <footer className="border-t border-white/5 px-6 py-10 text-center">
        <p className="text-white/20 text-xs tracking-widest uppercase">Shodh AI x NVIDIA - Technical Discussion - Confidential</p>
      </footer>
    </div>
  );
}
