"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Factory, Beaker, Battery, Rocket, Atom, Layers, Cpu, Boxes, Sparkles, Zap, ArrowRight } from "lucide-react";

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const layers = [
  { n: "01", Icon: Atom,    color: "blue",    title: "Discovery Layer",          body: "Integrating atomic/molecule discovery across biology and materials." },
  { n: "02", Icon: Layers,  color: "rose",    title: "Mesoscale Physics Engine", body: "The core bridge. Simulating the lab-to-production gap to eliminate hundreds of manual wet-lab experiments." },
  { n: "03", Icon: Cpu,     color: "emerald", title: "Control Layer",            body: "Translating physical physics into real-time process control." },
  { n: "04", Icon: Boxes,   color: "violet",  title: "Digital Twin Layer",       body: "Dynamic, physics-enabled twins for the macro factory setup." },
];

const partners = [
  { mono: "BJ", name: "Biocon & Jubilant",            sector: "Pharma / Biologics scale-up",            color: "emerald", Icon: Beaker  },
  { mono: "AI", name: "Aarti Industries",             sector: "Chemical meso-scale production",         color: "amber",   Icon: Factory },
  { mono: "BM", name: "Leading Battery Manufacturer", sector: "Quantum-to-Macro stability",             color: "cyan",    Icon: Battery },
  { mono: "GE", name: "GE Aerospace",                 sector: "In talks for macro structural dynamics", color: "violet",  Icon: Rocket  },
];

export default function TeaserRightPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <div className="min-h-screen bg-[#060606] text-white overflow-x-hidden" style={{ cursor: "none" }}>
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
          <p className="text-xs text-white/40 font-mono tracking-widest">TEASER DECK — CONFIDENTIAL</p>
        </div>
      </header>

      {/* SLIDE 1 — TITLE */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 mix-blend-screen" style={{ filter: 'brightness(1.5) contrast(1.2)' }}>
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060606]/50 to-[#060606] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,6,6,0.85)_100%)] pointer-events-none" />
        </div>

        <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-rose-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center pt-24 pb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-10">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white">Confidential Teaser</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter mb-6 leading-[0.9] drop-shadow-2xl">
            The World Foundational<br />
            <span className="italic font-light text-rose-300">Model of Physics</span>
          </h1>

          <p className="text-lg md:text-2xl text-white/70 font-light max-w-3xl mx-auto mb-14 italic drop-shadow-lg">
            From Molecule Discovery to Physical Factory Production.
          </p>

          {/* Built With / Backed By */}
          <motion.div {...fade} className="max-w-4xl mx-auto w-full mb-10">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm text-center">
                <p className="text-white/55 text-[10px] uppercase tracking-[0.25em] mb-3">Built With</p>
                <p className="text-white font-medium text-sm">NVIDIA & Google DeepMind</p>
              </div>
              <div className="p-5 rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm text-center">
                <p className="text-white/55 text-[10px] uppercase tracking-[0.25em] mb-3">Backed By</p>
                <p className="text-white font-medium text-sm">Sovereign IndiaAI Mission <span className="text-white/60">(Priority National Compute)</span></p>
              </div>
            </div>
          </motion.div>

          {/* Logos */}
          <motion.div {...fade} className="flex flex-wrap items-center justify-center gap-8">
            {[
              { src: "/demo/nvidia-partner-logo.png", alt: "NVIDIA",          className: "h-10 max-w-[168px]" },
              { src: "/DeepMind_logo.png",            alt: "Google DeepMind", className: "h-8 max-w-[120px]"  },
              { src: "/india-ai-logo-650x311.png",    alt: "IndiaAI",         className: "h-8 max-w-[120px]"  },
            ].map((logo) => (
              <div key={logo.alt} className={`${logo.alt === "NVIDIA" ? "h-10" : "h-8"} flex items-center opacity-70 hover:opacity-100 transition-opacity duration-200`}>
                <img src={logo.src} alt={logo.alt} className={`${logo.className} w-auto object-contain`} style={{ filter: "brightness(0) invert(1)" }} />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* SLIDE 2 — THE PROBLEM */}
      <section className="py-28 px-6 md:px-10 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose-500/5 blur-[140px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div {...fade} className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Slide 2 — The Problem</p>
            <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-5">
              The Trillion-Dollar<br />
              <span className="text-rose-300">&ldquo;Valley of Death.&rdquo;</span>
            </h2>
            <p className="text-white/65 font-light text-lg md:text-xl max-w-3xl mx-auto">
              AI has solved discovery, but it has failed at production.
            </p>
          </motion.div>

          <motion.div {...fade} className="grid md:grid-cols-3 gap-4">
            <div className="p-7 rounded-2xl border border-white/10 bg-white/[0.02]">
              <p className="text-white/50 text-[10px] uppercase tracking-[0.25em] mb-3">The Disconnect</p>
              <p className="text-white/75 font-light text-sm leading-relaxed">
                Foundational AI (like <span className="italic text-white">Evo 2</span> for biology or Google&rsquo;s <span className="italic text-white">GNoME</span> for materials) can discover a miracle molecule in seconds. But moving that molecule into a bioreactor or chemical plant requires manual, multi-stage lab experiments.
              </p>
            </div>
            <div className="p-7 rounded-2xl border border-rose-500/25 bg-rose-950/10">
              <p className="text-rose-300/80 text-[10px] uppercase tracking-[0.25em] mb-3">The Cost</p>
              <p className="text-white/75 font-light text-sm leading-relaxed mb-4">
                This creates a &ldquo;Valley of Death&rdquo; between the Quantum/Micro scale and the factory floor. The industry average to cross this gap is:
              </p>
              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl font-extralight text-rose-300">2.5</p>
                  <p className="text-white/60 text-xs uppercase tracking-wider">years</p>
                </div>
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl font-extralight text-rose-300">$1.5M+</p>
                  <p className="text-white/60 text-xs uppercase tracking-wider">per iteration</p>
                </div>
              </div>
            </div>
            <div className="p-7 rounded-2xl border border-amber-500/25 bg-amber-950/10">
              <p className="text-amber-300/80 text-[10px] uppercase tracking-[0.25em] mb-3">The Reality</p>
              <p className="text-white/80 font-light text-base leading-relaxed mb-4">
                A battery works on a computer screen but catches fire in the factory.
              </p>
              <p className="text-amber-200 font-medium text-sm">Physics is currently siloed.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SLIDE 3 — THE SOLUTION */}
      <section className="py-28 px-6 md:px-10 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[140px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div {...fade} className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Slide 3 — The Solution</p>
            <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-5">
              The <span className="text-emerald-300">World Foundational Model.</span>
            </h2>
            <p className="text-white/65 font-light text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              We are building the first continuous AI model that understands the thread of physics connecting a single electron to a full-scale factory. It operates on four continuous layers:
            </p>
          </motion.div>

          <motion.div {...fade} className="mb-12">
            <div className="grid md:grid-cols-4 gap-4 md:gap-3 relative">
              {layers.map((l, i) => (
                <div key={l.n} className="relative">
                  <div className={`h-full p-6 rounded-2xl border border-${l.color}-500/25 bg-gradient-to-b from-${l.color}-950/15 to-transparent backdrop-blur-sm transition-all hover:border-${l.color}-500/50`}>
                    <div className="flex items-center justify-between mb-5">
                      <span className={`text-${l.color}-300/60 font-mono text-xs tracking-widest`}>{l.n}</span>
                      <div className={`w-10 h-10 rounded-xl border border-${l.color}-500/30 bg-${l.color}-500/10 flex items-center justify-center`}>
                        <l.Icon className={`w-5 h-5 text-${l.color}-300`} />
                      </div>
                    </div>
                    <p className={`text-${l.color}-300 font-medium text-sm mb-3`}>{l.title}</p>
                    <p className="text-white/65 font-light text-sm leading-relaxed">{l.body}</p>
                  </div>
                  {i < layers.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10 w-4 h-4 items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white/25" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fade} className="text-center">
            <div className="inline-block p-7 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-950/20 to-transparent max-w-3xl backdrop-blur-sm">
              <p className="text-emerald-300/80 text-[10px] uppercase tracking-[0.3em] mb-4">The ROI</p>
              <div className="flex items-center justify-center gap-6 mb-3 flex-wrap">
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-extralight text-rose-300">2.5 yrs</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mt-1">today</p>
                </div>
                <ArrowRight className="w-6 h-6 text-white/40" />
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-extralight text-emerald-300">&lt; 3 mo</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mt-1">with shodh ai</p>
                </div>
              </div>
              <p className="text-white/70 font-light text-sm">
                Saving over <span className="text-white font-medium">$1M per product lifecycle.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SLIDE 4 — TRACTION & THE REALITY GAP */}
      <section className="py-28 px-6 md:px-10 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[140px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div {...fade} className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Slide 4 — Traction & The Reality Gap</p>
            <h2 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight mb-5">
              Traction & <span className="text-blue-300">&ldquo;The Reality Gap.&rdquo;</span>
            </h2>
            <p className="text-white/65 font-light text-lg max-w-3xl mx-auto leading-relaxed">
              We do not build theoretical software. Our only benchmark is <span className="text-blue-300">&ldquo;Sim-to-Real&rdquo;</span> transfer&mdash;what we predict in the model is successfully synthesized in the physical lab.
            </p>
          </motion.div>

          <motion.div {...fade}>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-blue-300" />
                <p className="text-blue-300/80 text-[10px] uppercase tracking-[0.3em]">The Flywheel is Live</p>
              </div>
              <p className="text-white/75 font-light text-base md:text-lg max-w-3xl leading-relaxed">
                We are actively working with <span className="text-white font-medium">Fortune 500 anchor partners</span> who are feeding our model highly-guarded, proprietary physical data:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {partners.map((p) => (
                <div key={p.name} className={`group p-5 rounded-2xl border border-${p.color}-500/20 bg-${p.color}-950/10 hover:border-${p.color}-500/40 transition-colors`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg border border-${p.color}-500/30 bg-${p.color}-500/10 flex items-center justify-center`}>
                      <span className={`text-${p.color}-300 text-xs font-bold tracking-wider`}>{p.mono}</span>
                    </div>
                    <p.Icon className={`w-4 h-4 text-${p.color}-300/60`} />
                  </div>
                  <p className={`text-${p.color}-300 font-medium text-sm mb-1 leading-tight`}>{p.name}</p>
                  <p className="text-white/55 text-[11px] leading-snug">{p.sector}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SLIDE 5 — GO-TO-MARKET */}
      <section className="py-28 px-6 md:px-10 border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] rounded-full bg-rose-500/5 blur-[140px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div {...fade} className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Slide 5 — Go-To-Market</p>
            <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-5">
              The <span className="text-rose-300">25 Billion-Dollar</span> Pillars.
            </h2>
            <p className="text-white/65 font-light text-lg md:text-xl max-w-3xl mx-auto">
              We aren&rsquo;t boiling the ocean on Day 1. We are targeting <span className="text-white font-medium">25 highly specific, high-ROI data silos.</span>
            </p>
          </motion.div>

          <motion.div {...fade} className="grid md:grid-cols-3 gap-4">
            <div className="p-7 rounded-2xl border border-blue-500/25 bg-gradient-to-br from-blue-950/15 to-transparent">
              <div className="flex items-center gap-2 mb-3">
                <Factory className="w-4 h-4 text-blue-300" />
                <p className="text-blue-300/80 text-[10px] uppercase tracking-[0.3em]">Anchor Problems</p>
              </div>
              <p className="text-white/75 font-light text-sm leading-relaxed">
                We partner with industry giants to solve massive standalone bottlenecks <span className="text-white/60">(e.g., transitioning from batch-to-continuous flow).</span>
              </p>
            </div>
            <div className="p-7 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-950/15 to-transparent">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-emerald-300" />
                <p className="text-emerald-300/80 text-[10px] uppercase tracking-[0.3em]">The Flywheel</p>
              </div>
              <p className="text-white/75 font-light text-sm leading-relaxed">
                They pay us to solve their niche problems. <span className="text-emerald-300">We get paid to absorb their proprietary data.</span>
              </p>
            </div>
            <div className="p-7 rounded-2xl border border-rose-500/25 bg-gradient-to-br from-rose-950/15 to-transparent">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-rose-300" />
                <p className="text-rose-300/80 text-[10px] uppercase tracking-[0.3em]">The Convergence</p>
              </div>
              <p className="text-white/75 font-light text-sm leading-relaxed">
                As we solve these 25 pillars, the distinct mesoscale models <span className="text-rose-300 font-medium">merge into one Universal Model.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SLIDE 6 — END GAME */}
      <section className="py-28 px-6 md:px-10 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-rose-500/5 blur-[160px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div {...fade} className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Slide 6 — The End Game</p>
            <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-5">
              Generative <span className="text-rose-300">Physical IP.</span>
            </h2>
            <p className="text-white/65 font-light text-lg md:text-xl max-w-3xl mx-auto">
              Once the core foundational model is complete, we transition from predictive digital twins to <span className="text-rose-300 font-medium">Generative Physical Reality.</span>
            </p>
          </motion.div>

          <motion.div {...fade} className="grid md:grid-cols-2 gap-5">
            {/* The Future — terminal */}
            <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-rose-500/40" />
                <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
                <span className="text-xs text-white/35 font-mono ml-3">shodh-ai — world-model — prompt</span>
              </div>
              <div className="p-7 space-y-7 font-mono">
                <div>
                  <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">The Future</p>
                  <p className="text-xs text-white/30 mb-2">&gt; you type a prompt:</p>
                  <p className="text-base md:text-lg text-rose-300 leading-relaxed italic">
                    &ldquo;Design a carbon-negative concrete.&rdquo;
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-3">&gt; the World Model generates simultaneously:</p>
                  <div className="space-y-2 text-sm text-white/75">
                    <div className="flex items-start gap-3"><span className="text-rose-300/70 mt-0.5">◆</span><span>The molecule</span></div>
                    <div className="flex items-start gap-3"><span className="text-rose-300/70 mt-0.5">◆</span><span>The mesoscale manufacturing blueprint</span></div>
                    <div className="flex items-start gap-3"><span className="text-rose-300/70 mt-0.5">◆</span><span>The macro factory control code</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Business */}
            <div className="p-8 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-950/15 to-transparent flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-emerald-300" />
                <p className="text-emerald-300/80 text-[10px] uppercase tracking-[0.3em]">The Business</p>
              </div>
              <p className="text-white font-light text-lg md:text-xl leading-relaxed">
                We evolve from <span className="text-white font-medium">SaaS</span> to <span className="text-emerald-300 font-medium">owning a royalty stake in the physical IP of the next century.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-white/30 text-xs">© 2026 Shodh AI. Confidential.</p>
      </footer>
    </div>
  );
}
