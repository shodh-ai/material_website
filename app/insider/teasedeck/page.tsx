"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Zap, Building2, Factory, Beaker, DollarSign } from "lucide-react";
import LineChart from "@/components/LineChart";

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function TeaserDeckPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

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

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-10 max-w-6xl mx-auto text-center">
        <motion.div {...fade}>
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6">Shodh AI</p>
          <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter mb-6 leading-[0.9]">The Large<br /><span className="italic font-light text-rose-300">Physics Model.</span></h1>
          <p className="text-lg md:text-2xl text-white/45 font-light max-w-2xl mx-auto">Building the foundation model for manufacturing physics.</p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div {...fade} className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-white/50 text-xs flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            Backed by the IndiaAI Mission
          </div>
          <div className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-white/50 text-xs flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            Built with NVIDIA, Google DeepMind, and JAX
          </div>
        </motion.div>

        {/* The Hook */}
        <motion.div {...fade} className="mt-16 max-w-3xl mx-auto">
          <div className="p-6 rounded-2xl border border-white/12 bg-white/[0.03]">
            <p className="text-white text-xl md:text-2xl font-light leading-relaxed italic text-center">&ldquo;AI-for-science is not just about discovery. It is about <span className="text-rose-300">compiling the physical world.</span>&rdquo;</p>
          </div>
        </motion.div>
      </section>

      {/* Slide 2: The Macro Thesis */}
      <section className="py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-extralight leading-tight tracking-tight mb-4 max-w-4xl mx-auto">OpenAI/Anthropic are fighting for <span className="text-white/50">20%</span> of the economy.<br />AI-for-science unlocks the <span className="text-rose-300">other 80%.</span></h2>
          </motion.div>

          <motion.div {...fade} className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Left Box - Digital Economy */}
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">20% - The Digital Economy</p>
              <p className="text-white/60 text-sm font-light mb-4">(Bits)</p>
              <p className="text-white/70 font-light text-base leading-relaxed">Automating digital workflows.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["GPT", "Claude", "Gemini"].map((name) => (
                  <span key={name} className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-white/50 text-xs">{name}</span>
                ))}
              </div>
            </div>

            {/* Right Box - Physical Economy */}
            <div className="p-8 rounded-2xl border border-rose-500/20 bg-rose-950/5">
              <p className="text-rose-300/70 text-xs uppercase tracking-widest mb-4">80% - The Physical Economy</p>
              <p className="text-rose-300/60 text-sm font-light mb-4">(Atoms)</p>
              <p className="text-white/70 font-light text-base leading-relaxed">Solving physical constraints human minds cannot compute.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Solid-State Batteries", "Space Alloys", "Next-Gen Chemicals"].map((name) => (
                  <span key={name} className="px-3 py-1.5 rounded-lg border border-rose-500/15 bg-rose-950/10 text-rose-200/70 text-xs">{name}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div {...fade} className="text-center">
            <p className="text-lg md:text-xl text-white/60 font-light max-w-3xl mx-auto">Automating the digital world saves <span className="text-white/80">billions.</span> Compiling the physical world creates <span className="text-rose-300 font-medium">trillions.</span></p>
          </motion.div>
        </div>
      </section>

      {/* Slide 3: The Problem */}
      <section className="py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">The Problem</p>
            <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-4">The <span className="text-rose-300">&ldquo;Valley of Death.&rdquo;</span></h2>
            <p className="text-white/45 font-light text-xl">90% of AI-discovered molecules will never see the market.</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div {...fade} className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] text-center">
              <p className="text-5xl md:text-6xl font-extralight text-rose-300 mb-3">90%</p>
              <p className="text-white/50 text-sm font-light">Fail to reach market</p>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] text-center">
              <p className="text-5xl md:text-6xl font-extralight text-amber-300 mb-3">6–8</p>
              <p className="text-white/50 text-sm font-light">Years stuck in physical trial-and-error scale-up</p>
            </div>
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] text-center">
              <p className="text-5xl md:text-6xl font-extralight text-blue-300 mb-3">$1.35B</p>
              <p className="text-white/50 text-sm font-light">Lost in monopoly revenue due to scale-up delays</p>
            </div>
          </motion.div>

          {/* Core Insight */}
          <motion.div {...fade} className="max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl border border-rose-500/15 bg-rose-950/5">
              <p className="text-rose-300/70 text-xs uppercase tracking-wider mb-3">The Core Insight</p>
              <p className="text-white/70 font-light text-base leading-relaxed">Once Discovery is commoditized, <span className="text-white font-normal">Process becomes everything.</span> Knowing the formula is worthless without knowing how to make it at scale.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slide 4: The Solution */}
      <section className="py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">The Solution</p>
            <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-4">Towards <span className="text-emerald-300">Zero-Shot Manufacturing.</span></h2>
          </motion.div>

          {/* Terminal UI */}
          <motion.div {...fade} className="mb-12 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <p className="ml-4 text-white/40 text-xs font-mono">shodh-lpm-terminal</p>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="flex items-start gap-2 mb-4">
                  <span className="text-emerald-400">$</span>
                  <div>
                    <p className="text-white/50 mb-1">Prompt:</p>
                    <p className="text-white">&ldquo;Design a solid-state battery that charges in 60s, uses zero lithium, and cannot catch fire.&rdquo;</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-400">→</span>
                  <div>
                    <p className="text-white/50 mb-1">Output:</p>
                    <p className="text-white">Compiles the exact factory blueprint:</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <span className="px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-950/10 text-emerald-300 text-xs">Temp: 120°C</span>
                      <span className="px-3 py-1.5 rounded-lg border border-blue-500/20 bg-blue-950/10 text-blue-300 text-xs">Press: 50MPa</span>
                      <span className="px-3 py-1.5 rounded-lg border border-violet-500/20 bg-violet-950/10 text-violet-300 text-xs">Speed: 2m/s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ROI Box */}
          <motion.div {...fade} className="max-w-2xl mx-auto text-center">
            <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/5">
              <p className="text-emerald-300/70 text-xs uppercase tracking-wider mb-2">The ROI</p>
              <p className="text-white/70 font-light text-lg">Compresses <span className="text-white font-normal">5 years</span> of physical pilot-plant trial-and-error into <span className="text-emerald-300 font-medium">6 months.</span></p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slide 5: Secret Weapon & Proof */}
      <section className="py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">The Secret Weapon & Proof</p>
            <h2 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight mb-4">Our Proprietary <span className="text-blue-300">3D Data Factory</span> & <span className="text-violet-300">Wet-Lab Proof.</span></h2>
          </motion.div>

          <motion.div {...fade} className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* SEM Comparison */}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Generates synthetic physical structures with a 95% morphological match to physical reality.</p>
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

            {/* Line Chart */}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">The Silicon Anode Wet-Lab Validation</p>
              <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-4 min-h-[280px] flex items-center justify-center">
                <LineChart className="w-full h-full min-h-[240px]" />
              </div>
            </div>
          </motion.div>

          {/* The Stat */}
          <motion.div {...fade} className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-rose-500/10 border border-rose-500/20">
              <Zap className="w-4 h-4 text-rose-300" />
              <span className="text-rose-300 font-medium">~70% Zero-Shot Accuracy</span>
            </div>
            <p className="mt-4 text-white/60 font-light text-sm max-w-2xl mx-auto">We accurately blind-predicted the exact physical failure point of all 5 diverse battery recipes on the first try.</p>
          </motion.div>
        </div>
      </section>

      {/* Slide 6: Enterprise Traction */}
      <section className="py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Enterprise Traction</p>
            <h2 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight mb-4">Three anchor partners.<br />Three <span className="text-emerald-300">trillion-dollar</span> markets.</h2>
          </motion.div>

          <motion.div {...fade} className="grid md:grid-cols-3 gap-6">
            {/* Biocon */}
            <div className="p-6 rounded-2xl border border-blue-500/15 bg-blue-950/5">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-5 h-5 text-blue-400" />
                <p className="text-blue-300 font-medium">Biocon</p>
              </div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Bio-Enzymes & Biologicals</p>
              <div className="pt-3 border-t border-white/5">
                <p className="text-white/40 text-xs">TAM:</p>
                <p className="text-2xl font-extralight text-white">$300B+</p>
              </div>
            </div>

            {/* Aarti Industries */}
            <div className="p-6 rounded-2xl border border-amber-500/15 bg-amber-950/5">
              <div className="flex items-center gap-3 mb-4">
                <Factory className="w-5 h-5 text-amber-400" />
                <p className="text-amber-300 font-medium">Aarti Industries</p>
              </div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Specialty Chemicals</p>
              <div className="pt-3 border-t border-white/5">
                <p className="text-white/40 text-xs">TAM:</p>
                <p className="text-2xl font-extralight text-white">$800B+</p>
              </div>
            </div>

            {/* Jubilant Ingrevia */}
            <div className="p-6 rounded-2xl border border-emerald-500/15 bg-emerald-950/5">
              <div className="flex items-center gap-3 mb-4">
                <Beaker className="w-5 h-5 text-emerald-400" />
                <p className="text-emerald-300 font-medium">Jubilant Ingrevia</p>
              </div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Agro-Pharma & CDMO</p>
              <div className="pt-3 border-t border-white/5">
                <p className="text-white/40 text-xs">TAM:</p>
                <p className="text-2xl font-extralight text-white">$250B+</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slide 7: The Ask */}
      <section className="py-24 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fade} className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">The Ask</p>
            <h2 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight mb-4">$100M to prove the <span className="text-rose-300">scaling laws</span> of physical AI.</h2>
          </motion.div>

          <motion.div {...fade} className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Sovereign Compute */}
            <div className="p-6 rounded-2xl border border-emerald-500/15 bg-emerald-950/5">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <p className="text-emerald-300 font-medium text-sm">Sovereign Compute</p>
              </div>
              <p className="text-3xl font-extralight text-white mb-2">$25M</p>
              <p className="text-white/50 text-xs">IndiaAI Mission</p>
            </div>

            {/* Autonomous Lab */}
            <div className="p-6 rounded-2xl border border-blue-500/15 bg-blue-950/5">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-5 h-5 text-blue-400" />
                <p className="text-blue-300 font-medium text-sm">Autonomous Lab Infrastructure</p>
              </div>
              <p className="text-3xl font-extralight text-white mb-2">$10M</p>
              <p className="text-white/50 text-xs">ANRF</p>
            </div>

            {/* Equity Raise */}
            <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-950/5">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-5 h-5 text-rose-400" />
                <p className="text-rose-300 font-medium text-sm">The Equity Raise</p>
              </div>
              <p className="text-3xl font-extralight text-white mb-2">$60M</p>
              <p className="text-white/50 text-xs">Active</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div {...fade} className="text-center">
            <a href="mailto:arastu@shodh.ai" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors">
              Partner with Us
              <span className="text-black/60 text-sm">- arastu@shodh.ai</span>
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
