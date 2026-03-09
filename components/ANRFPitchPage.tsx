"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowLeft,
  Mail,
  Zap,
  Maximize2,
  X,
  BrainCircuit,
  Beaker,
  Factory,
  Database,
  Cpu,
  FlaskConical,
  Atom,
  Waves,
  Flame,
  Magnet,
  Microscope,
  Bot,
  RefreshCw,
  Globe,
  Shield,
  TrendingUp,
  ChevronRight,
  AlertTriangle,
  Settings,
  TrendingDown,
  Layers,
} from "lucide-react";
import LineChart from "./LineChart";

export default function ANRFPitchPage() {
  const [expandedAlphaFoldView, setExpandedAlphaFoldView] = useState<"chart" | "matrices" | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <span className="text-sm font-light tracking-[0.2em] uppercase text-white/60">ANRF Briefing</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key="anrf-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6"
              >
                <CheckCircle2 className="w-4 h-4 text-white/60" />
                <span className="text-white/60 text-xs font-light tracking-[0.2em] uppercase">
                  Confidential Briefing
                </span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
                THE ANRF MASTER BRIEFING
              </h1>
              <p className="text-xl text-white/50 font-light tracking-wide">
                Building India's Large Physics Model
              </p>
            </div>

            {/* All Sections */}
            <div className="max-w-5xl mx-auto space-y-16">

              {/* Section 1: Genesis */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 1: The Genesis
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-8 tracking-tight">
                  Who We Are & <span className="font-normal">What We Just Built</span>
                </h2>

                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white/90 text-lg font-light leading-relaxed">
                      Shodh AI is built in India, made for the world.
                    </p>
                    <p className="text-white/60 text-sm mt-2 font-light">One of the 12 companies mandated by the IndiaAI Mission.</p>
                  </div>

                  <div className="space-y-3 text-white/70 font-light">
                    <p className="text-white font-medium text-lg">Our singular goal:</p>
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-white text-xl font-medium">Build the world's largest Large Physics Model (LPM).</p>
                      <p className="text-white/60 mt-1">Transform how global R&D and manufacturing are done — forever.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-white font-medium">We didn't just write a whitepaper. We proved the science.</p>
                    <p className="text-white/70 font-light">At the IndiaAI summit, we released our first foundational model — targeting the hardest problem in the battery world: the <span className="text-white font-medium">Silicon-Graphite Anode.</span></p>

                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
                            <BrainCircuit className="w-4 h-4 text-blue-300" />
                          </div>
                          <p className="text-white font-medium text-sm uppercase tracking-wider">The Generative Model</p>
                        </div>
                        <p className="text-white/60 text-sm font-light leading-relaxed">Diffusion model that generates 3D microstructures and the exact manufacturing process to create them.</p>
                      </div>
                      <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
                            <TrendingUp className="w-4 h-4 text-emerald-300" />
                          </div>
                          <p className="text-white font-medium text-sm uppercase tracking-wider">The Forward Model</p>
                        </div>
                        <p className="text-white/60 text-sm font-light leading-relaxed">Predicts physical cycle-life and degradation directly from a digital blueprint.</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-emerald-900/20 border border-white/15 mt-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Zap className="w-5 h-5 text-yellow-300" />
                        <p className="text-white font-medium">The Result</p>
                      </div>
                      <ul className="space-y-2 text-white/70 font-light text-sm">
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />~70% zero-shot accuracy predicting physical degradation in our initial blind wet-lab study.</li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Currently scaling for a major publication.</li>
                        <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />We have created our <span className="text-white font-medium">'AlphaFold Moment' for materials science.</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Section 2: The Language of Physics */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 2: The Paradigm Shift
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-8 tracking-tight">
                  The Language <span className="font-normal">of Physics</span>
                </h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-3">2022: LLMs</p>
                      <p className="text-white/80 font-light leading-relaxed">Read the entire internet.</p>
                      <p className="text-white/60 text-sm mt-1">Learned the grammar of human language.</p>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/15">
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Today: LPMs</p>
                      <p className="text-white font-medium leading-relaxed">Trained on millions of 3D physical simulations, equations & real wet-lab data.</p>
                      <p className="text-white/60 text-sm mt-1">Learning the fundamental language of physics.</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-white/70 font-light">
                    <p className="text-white font-medium">Why does this matter?</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                        <AlertTriangle className="w-5 h-5 text-yellow-400/70 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white/80 font-medium">The old way:</p>
                          <p className="text-white/60 font-light text-sm">Simulating a battery charging required a supercomputer running for <span className="text-white">weeks</span> — just for a few seconds of real time.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                        <Zap className="w-5 h-5 text-emerald-400/70 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white/80 font-medium">Our LPM:</p>
                          <p className="text-white/60 font-light text-sm">Predicts how a new material will swell, heat up, and perform — in <span className="text-white">milliseconds.</span></p>
                        </div>
                      </li>
                    </ul>
                  </div>


                </div>
              </motion.section>

              {/* Section 3: Discovery vs Scale-up */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 3: The Reality of AI for Science
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-8 tracking-tight">
                  Discovery vs. <span className="font-normal">Scale-Up</span>
                </h2>

                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Real example — our partner Kiran Mazumdar-Shaw at Biocon</p>
                    <ul className="space-y-2 text-white/70 font-light">
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Making a life-saving drug requires a <span className="text-white font-medium">16-step chemical batch process.</span></li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Slow. Insanely expensive.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Novel bio-enzymes can cut this to just <span className="text-white font-medium">3 steps.</span></li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-white font-medium text-lg border-l-2 border-white/20 pl-4">So what's the problem? Scale-up.</p>
                      <p className="text-white/60 text-sm mt-2 font-light">Take a delicate bio-enzyme from a lab flask → put into massive industrial steel reactor → fluid dynamics and heat <span className="text-white">kill the enzyme.</span> The drug fails.</p>
                    </div>
                  </div>

                  <p className="text-white font-medium">This creates a clear picture of where the industry is stuck:</p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium text-white/50">1</div>
                        <p className="text-white/50 text-xs uppercase tracking-wider">Stage 1</p>
                      </div>
                      <p className="text-white font-medium mb-1">Digital Discovery</p>
                      <p className="text-white/50 text-sm font-light">Isomorphic Labs — AI invents a molecule on a computer.</p>
                    </div>
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium text-white/50">2</div>
                        <p className="text-white/50 text-xs uppercase tracking-wider">Stage 2</p>
                      </div>
                      <p className="text-white font-medium mb-1">Lab Synthesis</p>
                      <p className="text-white/50 text-sm font-light">Radical AI — robotic labs make 1 gram in a test tube.</p>
                    </div>
                    <div className="p-5 rounded-xl bg-white/10 border border-white/20">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium text-white">3</div>
                        <p className="text-white text-xs uppercase tracking-wider font-medium">Stage 3 — Us</p>
                      </div>
                      <p className="text-white font-medium mb-1">Industrial Scale-Up</p>
                      <p className="text-white/70 text-sm font-light">The Valley of Death. We design the actual factory physics to manufacture 10,000 tons safely.</p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Section 4: The Mesoscale */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 4: The Universal Secret
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-8 tracking-tight">
                  The Mesoscale: <span className="font-normal">Where Industries Are Won or Lost</span>
                </h2>

                <div className="space-y-6">
                  <div className="space-y-3 text-white/70 font-light">
                    <p className="text-white font-medium text-lg">How can one AI solve both battery degradation and pharmaceutical scale-up?</p>
                    <p>Because the real bottlenecks don't happen in giant machines.</p>
                    <p>They happen at the <span className="text-white font-medium">Mesoscale</span> — larger than a single atom, microscopic compared to the final product.</p>
                  </div>

                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white font-medium mb-4">Every multi-trillion-dollar industry on Earth boils down to one interaction:</p>
                    <p className="text-white text-xl font-medium text-center py-4 border-y border-white/10">
                      A fluid moving through a microscopic, sponge-like solid — and reacting with it.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/20 mb-3">
                        <Zap className="w-5 h-5 text-blue-300" />
                      </div>
                      <p className="text-white font-medium mb-1">Batteries</p>
                      <p className="text-white/50 text-sm font-light">Two solid porous sponges soaking in a liquid electrolyte.</p>
                    </div>
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20 mb-3">
                        <Beaker className="w-5 h-5 text-emerald-300" />
                      </div>
                      <p className="text-white font-medium mb-1">Pharma / Chemicals</p>
                      <p className="text-white/50 text-sm font-light">Liquid chemicals flowing through a solid porous catalyst.</p>
                    </div>
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/20 mb-3">
                        <Waves className="w-5 h-5 text-cyan-300" />
                      </div>
                      <p className="text-white font-medium mb-1">Green Hydrogen</p>
                      <p className="text-white/50 text-sm font-light">Gas pumping through a solid porous membrane.</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-emerald-900/20 border border-white/15">
                    <p className="text-white font-medium text-lg leading-relaxed">By building an AI that simulates how fluids interact with porous solids, we haven't just solved batteries.</p>
                    <p className="text-white/70 mt-2 font-light">We have built an AI that can engineer the entire 21st-century industrial transformation.</p>
                  </div>
                </div>
              </motion.section>

              {/* Section 5: The Math */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 5: The Physics Engine
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
                  Digitizing the <span className="font-normal">Laws of the Universe</span>
                </h2>
                <p className="text-white/50 font-light mb-8">Legacy software takes weeks. Our LPM couples 6 branches of physics — simultaneously.</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: <Atom className="w-5 h-5 text-violet-300" />,
                      color: "violet",
                      name: "Phase Field Models",
                      law: "Cahn-Hilliard",
                      desc: "The gold standard of the mesoscale. Predicts how materials mix, solidify, or grow dendrites.",
                    },
                    {
                      icon: <Layers className="w-5 h-5 text-blue-300" />,
                      color: "blue",
                      name: "Solid Mechanics",
                      law: "Hooke's Law",
                      desc: "When lithium enters a battery's pores, it swells. We predict exactly when it cracks.",
                    },
                    {
                      icon: <Waves className="w-5 h-5 text-cyan-300" />,
                      color: "cyan",
                      name: "Fluid Flow & Diffusion",
                      law: "Navier-Stokes & Fick's Law",
                      desc: "Calculates fluid flow through pores and chemical diffusion simultaneously.",
                    },
                    {
                      icon: <Flame className="w-5 h-5 text-orange-300" />,
                      color: "orange",
                      name: "Heat Transfer",
                      law: "Fourier's Law",
                      desc: "Predicts thermal gradients to prevent battery explosions or bio-enzyme death.",
                    },
                    {
                      icon: <Magnet className="w-5 h-5 text-pink-300" />,
                      color: "pink",
                      name: "Electromagnetism",
                      law: "Maxwell's Equations",
                      desc: "Governs electrical fields and ion transport.",
                    },
                    {
                      icon: <Zap className="w-5 h-5 text-yellow-300" />,
                      color: "yellow",
                      name: "Chemical Kinetics",
                      law: "Arrhenius Equation",
                      desc: "Calculates how fast the reactions happen.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                      <div className={`w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 shrink-0 mt-0.5`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{item.law}</p>
                        <p className="text-white/55 text-sm font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-white font-medium">By unifying all 6 into a single neural network — Shodh AI generates the perfect physical blueprint in seconds.</p>
                </div>
              </motion.section>

              {/* Section 6: The 95/5 Rule */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 6: The Geopolitical Threat
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-8 tracking-tight">
                  The 95/5 Rule
                </h2>

                <div className="space-y-6">
                  <p className="text-white/70 font-light">Building this requires two things:</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                          <p className="text-white font-medium text-sm">95%</p>
                        </div>
                        <p className="text-white font-medium">Massive Compute</p>
                      </div>
                      <div className="flex items-start gap-2 mt-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <p className="text-white/60 text-sm font-light">Solved. IndiaAI Mission secures a 200,000 GPU cluster. We have priority access — sovereign compute.</p>
                      </div>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                          <p className="text-white font-medium text-sm">5%</p>
                        </div>
                        <p className="text-white font-medium">High-Fidelity Real-World Data</p>
                      </div>
                      <div className="flex items-start gap-2 mt-3">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                        <p className="text-white/80 text-sm font-medium">This is the bottleneck.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-white/70 font-light">
                    <p className="text-white font-medium">Why can't we just scrape data like OpenAI did?</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                        <ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />
                        <p>You cannot scrape the physical world. Scientific papers are messy.</p>
                      </li>
                      <li className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                        <ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />
                        <p>Scientists rarely publish <span className="text-white font-medium">failed experiments</span> — but an AI learning physics desperately needs to know what not to do.</p>
                      </li>
                      <li className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                        <ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />
                        <p>Training only on computer simulations causes the AI to hallucinate — the <span className="text-white font-medium">"Sim-to-Real Gap."</span></p>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-3">What other nations are already doing</p>
                    <ul className="space-y-3 text-white/70 font-light">
                      <li className="flex items-start gap-2">
                        <Globe className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />
                        <p><span className="text-white font-medium">USA:</span> Government and massive funds backing Lila Sciences & Radical AI — building autonomous robotic labs.</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <Globe className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />
                        <p><span className="text-white font-medium">China:</span> XtalPi built a city-sized autonomous lab. Generating robotic physical data 24/7.</p>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-white font-medium text-lg">India does not have this. Yet.</p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Section 7: The AlphaFold Moment — KEPT EXACTLY */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 7: The Secret Sauce
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
                  The AlphaFold Blueprint
                </h2>
                <p className="text-white/50 font-light mb-8">How DeepMind's mathematical secret is our exact playbook.</p>

                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <p className="text-white font-medium">People assume AlphaFold trained on millions of real, lab-tested proteins.</p>
                    <p className="text-white/60 font-light">That's mathematically impossible — only 170,000 mapped proteins existed.</p>
                    <p className="text-white font-medium mt-2">Their secret: <span className="text-white/80 font-normal">Self-Distillation.</span></p>
                    <ul className="space-y-2 text-white/60 font-light text-sm mt-2">
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Take a small real dataset.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Ask the AI to hallucinate millions of synthetic shapes.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Mix the best synthetic ones back in.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />AlphaFold was mostly synthetic data — strictly anchored by a small foundation of real data.</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-emerald-900/20 border border-white/15">
                    <p className="text-white font-medium mb-4 text-center text-lg">This is the exact blueprint for Shodh AI:</p>
                    <div className="grid md:grid-cols-3 gap-4 items-center">
                      <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-center">
                        <Database className="w-6 h-6 text-blue-300 mx-auto mb-2" />
                        <p className="text-white font-medium text-sm">Real Lab Data</p>
                        <p className="text-white/50 text-xs mt-1">from ANRF</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white/50 text-2xl font-light">+</p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-center">
                        <Cpu className="w-6 h-6 text-emerald-300 mx-auto mb-2" />
                        <p className="text-white font-medium text-sm">Synthetic PDE Simulations</p>
                        <p className="text-white/50 text-xs mt-1">from IndiaAI GPUs</p>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-white/50 text-sm mb-2">equals</p>
                      <p className="text-white text-xl font-medium">Large Physics Model</p>
                    </div>
                  </div>

                  <p className="text-white/60 font-light">We use IndiaAI's GPUs to run millions of synthetic physics simulations — fast and free. But we need a <span className="text-white font-medium">pristine, robotic dataset of real-world physical failures</span> to anchor those simulations so the AI doesn't hallucinate.</p>
                </div>

                {/* The AlphaFold Proof - 3 Step Visual - EXACT COPY */}
                <div className="mt-12">
                  <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-6">Our Proof of Concept</p>
                  <p className="text-lg text-white/70 font-light leading-relaxed max-w-3xl mb-12">
                    We ran a blind 25-day "Sim-to-Real" sprint to prove our AI can generate a material and the exact factory recipe to build it.
                  </p>

                  <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-12">

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
                              <img
                                src="/GIFs_Microstrcuture/sample_003_20260206_125915_3d_render.gif"
                                alt="AI-generated microstructure render"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          <div className="hidden lg:flex items-center justify-center pt-6">
                            <div className="w-14 h-px bg-gradient-to-r from-indigo-300/70 to-emerald-300/70" />
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs text-white/50 uppercase tracking-wider">Physical: Actual SEM</p>
                            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black">
                              <img
                                src="/REAL_SEM/sample_003_20260206_125915_sem_isosurface.png"
                                alt="Physical SEM cross-section"
                                className="w-full h-full object-cover grayscale"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setExpandedAlphaFoldView("matrices")}
                          className="self-start inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xs uppercase tracking-[0.18em]"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          View all 5 generated matrices
                        </button>
                      </div>

                      <div className="pt-4 border-t border-white/10 mt-auto text-center">
                        <p className="text-white/80 text-sm font-medium leading-relaxed">
                          The Sim-to-Real Match: The AI's digital imagination perfectly translated into physical reality.
                        </p>
                      </div>
                    </div>

                    {/* STEP 3 */}
                    <div className="relative p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl h-full flex flex-col">
                      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30 text-rose-400 font-medium text-sm">3</div>
                      <h3 className="text-xl font-medium text-white mb-6 pl-4">The Real-World Test</h3>

                      <div className="relative bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex-grow min-h-[260px] flex items-center justify-center overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setExpandedAlphaFoldView("chart")}
                          className="absolute top-3 left-3 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/70 hover:text-white hover:bg-black/50 transition-colors z-10 inline-flex items-center gap-2"
                        >
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
                        <p className="text-white/80 text-sm font-medium leading-relaxed">
                          The model didn't just find the best battery; it accurately predicted the exact physical failure point of all 5 diverse architectural recipes.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mic Drop */}
                  <div className="mt-8 p-8 rounded-xl bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-emerald-900/30 border border-white/20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 mix-blend-overlay"></div>
                    <p className="text-lg md:text-xl text-white font-light leading-relaxed relative z-10 max-w-4xl mx-auto">
                      <strong className="font-medium text-white">The Takeaway:</strong> We didn't just guess the material; our AI wrote the physical instructions to scale it. If we can predict battery degradation with 70% accuracy today, we can generate perfect, 100% accurate factory blueprints for the world's largest industrial giants tomorrow.
                    </p>
                  </div>

                  {/* Expanded Views */}
                  <AnimatePresence>
                    {expandedAlphaFoldView === "chart" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl p-6 md:p-10"
                      >
                        <div className="relative h-full max-w-6xl mx-auto rounded-3xl border border-white/10 bg-[#0b0b0b] shadow-2xl overflow-hidden flex flex-col">
                          <button
                            type="button"
                            onClick={() => setExpandedAlphaFoldView(null)}
                            className="absolute top-5 right-5 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          <div className="p-8 md:p-10 border-b border-white/10">
                            <p className="text-xs text-white/45 uppercase tracking-[0.22em] mb-3">Expanded Data View</p>
                            <h3 className="text-2xl md:text-4xl font-light text-white mb-3">The Real-World Test</h3>
                            <p className="text-white/60 max-w-3xl leading-relaxed">
                              Three representative curves from the 5-recipe sweep show the full physical landscape: an intended fast-failure cell, a commercial baseline, and the AI-optimized architecture, with dotted predictions tracking the wet-lab knee and failure point in each case.
                            </p>
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
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl p-6 md:p-10 overflow-y-auto"
                      >
                        <div className="relative max-w-6xl mx-auto rounded-3xl border border-white/10 bg-[#0b0b0b] shadow-2xl overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setExpandedAlphaFoldView(null)}
                            className="absolute top-5 right-5 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          <div className="p-8 md:p-10 border-b border-white/10">
                            <p className="text-xs text-white/45 uppercase tracking-[0.22em] mb-3">Expanded Sim-to-Real View</p>
                            <h3 className="text-2xl md:text-4xl font-light text-white mb-3">All 5 Generated Matrices</h3>
                            <p className="text-white/60 max-w-3xl leading-relaxed">
                              Side-by-side comparison of the AI-generated voxel structures and the matching real SEM outputs from the wet-lab build.
                            </p>
                          </div>

                          <div className="p-6 md:p-10 grid gap-6 md:grid-cols-2">
                            {[0, 1, 2, 3, 4].map((i) => (
                              <div key={`matrix-pair-${i}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
                                <p className="text-xs text-white/45 uppercase tracking-[0.18em] mb-4">Sample {i + 1}</p>
                                <div className="grid gap-4 sm:grid-cols-2 items-center">
                                  <div className="space-y-2">
                                    <p className="text-[11px] text-white/50 uppercase tracking-[0.16em]">AI Generated</p>
                                    <div className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/50">
                                      <img
                                        src={`/GIFs_Microstrcuture/sample_00${i}_20260206_125915_3d_render.gif`}
                                        alt={`AI-generated structure ${i + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <p className="text-[11px] text-white/50 uppercase tracking-[0.16em]">Real SEM</p>
                                    <div className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-black">
                                      <img
                                        src={`/REAL_SEM/sample_00${i}_20260206_125915_sem_isosurface.png`}
                                        alt={`Real SEM structure ${i + 1}`}
                                        className="w-full h-full object-cover grayscale"
                                      />
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
                </div>
              </motion.section>

              {/* Section 8: The ANRF Solution */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 8: The ANRF Solution
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
                  The Closed-Loop <span className="font-normal">National Asset</span>
                </h2>
                <p className="text-white/50 font-light mb-8">The National Autonomous Cloud-Lab — in partnership with ANRF.</p>

                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <p className="text-white font-medium">Right now, human PhD students take 10–20 years to commercialize a new material.</p>
                    <p className="text-white/60 font-light">By building a fully automated, robotic lab controlled by our LPM — we remove the human bottleneck entirely.</p>
                  </div>

                  <p className="text-white font-medium">The continuous loop:</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        icon: <BrainCircuit className="w-6 h-6 text-blue-300" />,
                        color: "blue",
                        step: "Step 1",
                        title: "The AI Predicts",
                        desc: "Our LPM runs the math and predicts a new architecture.",
                      },
                      {
                        icon: <Bot className="w-6 h-6 text-emerald-300" />,
                        color: "emerald",
                        step: "Step 2",
                        title: "The Robots Build",
                        desc: "Robotic arms and fluid dispensers physically mix and bake the material.",
                      },
                      {
                        icon: <Microscope className="w-6 h-6 text-violet-300" />,
                        color: "violet",
                        step: "Step 3",
                        title: "The Robots Test",
                        desc: "Automated microscopes test the material to failure.",
                      },
                      {
                        icon: <RefreshCw className="w-6 h-6 text-orange-300" />,
                        color: "orange",
                        step: "Step 4",
                        title: "The AI Learns",
                        desc: "Exact physical results feed back into the foundation model to correct its math.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{item.step}</p>
                          <p className="text-white font-medium mb-1">{item.title}</p>
                          <p className="text-white/55 text-sm font-light leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-emerald-900/30 border border-white/20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 mix-blend-overlay"></div>
                    <p className="text-xl md:text-2xl text-white font-medium relative z-10">We compress a 20-year discovery timeline into a few months.</p>
                  </div>
                </div>
              </motion.section>

              {/* Section 9: The Vision / Closer */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5 text-center"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 9: The Vision for India
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
                  India's Sovereign Edge <span className="font-normal">in the Next Industrial Era</span>
                </h2>

                <div className="space-y-8 max-w-4xl mx-auto text-left mt-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-3">India Today</p>
                      <p className="text-white/70 font-light leading-relaxed">The outsourced manufacturer of the world.</p>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/15">
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-3">India with LPM</p>
                      <p className="text-white font-medium leading-relaxed">The R&D and Patent Exporter of the world.</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <p className="text-white font-medium">What Zero-Shot Discovery + Zero-Shot Manufacturing means:</p>
                    <ul className="space-y-2 text-white/65 font-light">
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />We don't just invent a new material. We simultaneously generate the exact factory blueprint.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />We own the IP. We own the patents locally. We export the technology globally.</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <p className="text-white font-medium">The hard truth about India's current path:</p>
                    <ul className="space-y-2 text-white/65 font-light">
                      <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-yellow-400/70 mt-0.5 shrink-0" />If India only provides the GPUs — we will still be dependent on the West for physical data.</li>
                      <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-yellow-400/70 mt-0.5 shrink-0" />The combination of LPM + robotic experimentation is the bleeding edge of global science today.</li>
                    </ul>
                  </div>

                  <div className="p-8 rounded-xl bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-emerald-900/30 border border-white/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 mix-blend-overlay"></div>
                    <div className="relative z-10 space-y-4">
                      <p className="text-white font-medium text-lg">By partnering with ANRF to build this Autonomous Lab:</p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-center">
                          <Cpu className="w-6 h-6 text-blue-300 mx-auto mb-2" />
                          <p className="text-white text-sm font-medium">IndiaAI's Compute</p>
                        </div>
                        <div className="flex items-center justify-center">
                          <p className="text-white/50 text-2xl font-light">+</p>
                        </div>
                        <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-center">
                          <Database className="w-6 h-6 text-emerald-300 mx-auto mb-2" />
                          <p className="text-white text-sm font-medium">Sovereign Physical Data Engine</p>
                        </div>
                      </div>
                      <p className="text-white/80 text-center font-light mt-4">We don't just participate in the next industrial revolution.</p>
                      <p className="text-white text-center text-xl font-medium">We build the foundation for it.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-12 border-t border-white/10 mt-12">
                  <h2 className="text-2xl md:text-4xl font-light text-white leading-tight mb-10">
                    India has the compute. <br />
                    ANRF has the mandate. <br />
                    <strong className="font-normal text-white/80 mt-4 block">
                      Shodh AI has the physics engine.
                    </strong>
                  </h2>

                  <a
                    href="mailto:arastu@shodh.ai"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all text-lg"
                  >
                    <Mail className="w-5 h-5" />
                    Partner with ANRF
                  </a>
                </div>
              </motion.section>

            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
