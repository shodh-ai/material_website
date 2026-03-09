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
  Settings,
  TrendingDown,
  TrendingUp,
  ChevronRight,
  AlertTriangle,
  Layers,
  Waves,
  DollarSign,
  Users,
  Globe,
  Building2,
  ArrowRight,
  Shield,
} from "lucide-react";
import LineChart from "./LineChart";

export default function VCPitchPage() {
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
            <span className="text-sm font-light tracking-[0.2em] uppercase text-white/60">VC Pitch</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key="vc-content"
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
                  Confidential — Investor Briefing
                </span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-tight">
                THE SHODH AI VC PITCH
              </h1>
              <p className="text-xl text-white/50 font-light tracking-wide">
                The Large Physics Model
              </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-16">

              {/* Section 1: Identity */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 1: The Identity
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-8 tracking-tight">
                  Who is <span className="font-normal">Shodh AI?</span>
                </h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-3">2022 — LLMs</p>
                      <p className="text-white/80 font-light leading-relaxed">Ingested the entire internet.</p>
                      <p className="text-white/50 text-sm mt-1">Learned the grammar of human language.</p>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/15">
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Today — Shodh AI</p>
                      <p className="text-white font-medium leading-relaxed">Building the world's first Large Physics Model (LPM).</p>
                      <p className="text-white/60 text-sm mt-1 font-light">Backed by the IndiaAI Mission.</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <p className="text-white font-medium">How we are training it:</p>
                    <ul className="space-y-2 text-white/65 font-light">
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Priority access to a <span className="text-white font-medium">200,000 GPU cluster</span> — sovereign Indian compute.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Training on millions of physical simulations and real-world industrial data.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Just like an LLM gets smarter with more text — our LPM has a <span className="text-white font-medium">scaling law</span>: more industrial data = more physical understanding.</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-emerald-900/20 border border-white/15">
                    <p className="text-white font-medium text-lg">We are turning physical engineering into a software calculation.</p>
                    <p className="text-white/50 text-sm mt-1 font-light">The cost-structure of a sovereign Indian project. The revenue ceiling of a global Silicon Valley monopoly.</p>
                  </div>
                </div>
              </motion.section>

              {/* Section 2: The Landscape */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 2: The Landscape
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
                  The Timeline <span className="font-normal">of a Molecule</span>
                </h2>
                <p className="text-white/50 font-light mb-8">Why an LPM is the most valuable technology on Earth today.</p>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium text-white/50">1</div>
                      <p className="text-white/50 text-xs uppercase tracking-wider">Stage 1</p>
                    </div>
                    <p className="text-white font-medium mb-1">Digital Discovery</p>
                    <p className="text-white/50 text-sm font-light mb-2">Isomorphic Labs — AI invents a molecule on a computer.</p>
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                      <span className="text-white/40 text-xs">Takes days</span>
                    </div>
                  </div>
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium text-white/50">2</div>
                      <p className="text-white/50 text-xs uppercase tracking-wider">Stage 2</p>
                    </div>
                    <p className="text-white font-medium mb-1">Lab Synthesis</p>
                    <p className="text-white/50 text-sm font-light mb-2">Radical AI — robotic cloud-labs make 1 gram in a test tube.</p>
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                      <span className="text-white/40 text-xs">Takes weeks</span>
                    </div>
                  </div>
                  <div className="p-5 rounded-xl bg-white/10 border border-white/20">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium text-white">3</div>
                      <p className="text-white text-xs uppercase tracking-wider font-medium">Stage 3 — The Wall</p>
                    </div>
                    <p className="text-white font-medium mb-1">Industrial Scale-Up</p>
                    <p className="text-white/70 text-sm font-light mb-2">10,000-ton continuous-flow factory. This is where it dies.</p>
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                      <span className="text-rose-300 text-xs font-medium">Takes 5–7 Years</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <p className="text-white font-medium">GV and Big Tech have conquered Stages 1 and 2.</p>
                  <p className="text-white/60 font-light">The industry is crashing into the wall of Stage 3.</p>
                  <p className="text-white/60 font-light">What works in a 1-gram test tube <span className="text-white font-medium">completely fails</span> when exposed to the turbulent fluid dynamics and extreme heat of an industrial factory.</p>
                </div>
              </motion.section>

              {/* Section 3: The Problem & Biocon */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 3: The Problem
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
                  The Biocon Story: <span className="font-normal">Why We Target the Mesoscale</span>
                </h2>
                <p className="text-white/50 font-light mb-8">Quantifying the bottleneck with our anchor partner, Kiran Mazumdar-Shaw at Biocon.</p>

                <div className="space-y-5">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <p className="text-white font-medium">The situation:</p>
                    <ul className="space-y-2 text-white/65 font-light">
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Scaling a life-saving API requires a <span className="text-white font-medium">16-step chemical batch process.</span></li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Novel bio-enzymes can cut this to just <span className="text-white font-medium">3 steps.</span></li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-white font-medium text-lg border-l-2 border-white/20 pl-4">So what's the problem? Scale-up.</p>
                      <p className="text-white/60 font-light text-sm mt-2">Pump fragile enzymes into an industrial steel reactor → heat and fluid dynamics kill the enzyme. The scale-up fails.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Legacy US plant</p>
                      <p className="text-white text-2xl font-medium">$500M</p>
                      <p className="text-white/40 text-sm font-light mt-1">5 years to build</p>
                    </div>
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Legacy India plant</p>
                      <p className="text-white text-2xl font-medium">$100M</p>
                      <p className="text-white/40 text-sm font-light mt-1">Still years of delays</p>
                    </div>
                    <div className="p-5 rounded-xl bg-white/10 border border-white/20 text-center">
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Shodh AI target</p>
                      <p className="text-white text-2xl font-medium">$5M</p>
                      <p className="text-white/60 text-sm font-medium mt-1">6-month deployment</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white font-medium">Shodh AI solves Stage 3.</p>
                    <p className="text-white/60 font-light mt-1">We target the mesoscale — the physics of scale-up — so discoveries actually survive in the real world.</p>
                  </div>
                </div>
              </motion.section>

              {/* Section 4: The Vision */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 4: The Ultimate Vision
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-8 tracking-tight">
                  Zero-Shot Discovery <span className="font-normal">& Manufacturing</span>
                </h2>

                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <p className="text-white font-medium">Because we solve the hardest part first — scale-up — we unlock the ultimate endgame of AI for Science.</p>
                    <ul className="space-y-2 text-white/65 font-light mt-2">
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Shodh AI won't just <em>invent</em> a new green hydrogen catalyst or miracle drug.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Our LPM <em>understands</em> scale-up — so it simultaneously generates the <span className="text-white font-medium">exact factory blueprint</span> to manufacture it.</li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 shrink-0">
                        <Beaker className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Old world</p>
                        <p className="text-white font-medium">Discovery → decade of scale-up R&D → factory</p>
                      </div>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/15 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 shrink-0">
                        <Zap className="w-5 h-5 text-emerald-300" />
                      </div>
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Shodh AI</p>
                        <p className="text-white font-medium">Discovery + factory blueprint — simultaneously — in months.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-emerald-900/20 border border-white/15 text-center">
                    <p className="text-white font-medium text-lg">Discovery-to-manufacturing: from a decade down to a few months.</p>
                  </div>
                </div>
              </motion.section>

              {/* Section 5: The Science */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 5: The Science
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
                  How Does It <span className="font-normal">Actually Work?</span>
                </h2>
                <p className="text-white/50 font-light mb-8">How can one AI model scale up both a pharmaceutical bioreactor and a battery?</p>

                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white font-medium mb-3">Every multi-trillion-dollar industry boils down to one interaction:</p>
                    <p className="text-white text-xl font-medium text-center py-4 border-y border-white/10">
                      A fluid moving through a microscopic, sponge-like solid.
                    </p>
                  </div>

                  <p className="text-white/65 font-light">We teach our neural network the universal mathematics of this zone:</p>

                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      {
                        icon: <Waves className="w-5 h-5 text-cyan-300" />,
                        title: "Navier-Stokes & Fick's Law",
                        desc: "Fluid flow and chemical diffusion.",
                      },
                      {
                        icon: <Layers className="w-5 h-5 text-violet-300" />,
                        title: "Phase Field / Cahn-Hilliard",
                        desc: "How materials separate and solidify.",
                      },
                      {
                        icon: <Zap className="w-5 h-5 text-orange-300" />,
                        title: "Solid Mechanics & Heat Transfer",
                        desc: "How materials crack, swell, and heat up.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 shrink-0">{item.icon}</div>
                        <div>
                          <p className="text-white font-medium text-sm">{item.title}</p>
                          <p className="text-white/50 text-xs font-light mt-1">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <p className="text-white font-medium">How we train it — the AlphaFold blueprint:</p>
                    <ul className="space-y-2 text-white/65 font-light">
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Use 200,000 GPUs to generate millions of synthetic physics simulations (solving the PDEs).</li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Anchor that synthetic data with high-fidelity, real-world data from our robotic lab partners.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Result: coupled multiphysics in <span className="text-white font-medium">milliseconds</span>, not weeks.</li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Section 6: TAM & The Billions */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 6: The Opportunity
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
                  The TAM: <span className="font-normal">The Billions</span>
                </h2>
                <p className="text-white/50 font-light mb-8">Back to Biocon's $500M, 5-year factory nightmare.</p>

                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
                    <p className="text-white font-medium">The Shodh AI play:</p>
                    <ul className="space-y-2 text-white/65 font-light">
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Design a 3D-printed, continuous-flow <span className="text-white font-medium">'Suitcase Factory'</span> — sculpted to keep their enzymes alive.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Take a $500M CapEx nightmare and shrink it to a $5M, 6-month deployment.</li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 items-center">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Legacy CapEx</p>
                      <p className="text-4xl font-light text-white/40 line-through">$500M</p>
                      <p className="text-white/40 text-sm mt-1">5 years</p>
                    </div>
                    <div className="p-6 rounded-xl bg-white/10 border border-white/20 text-center">
                      <p className="text-white/60 text-xs uppercase tracking-wider mb-3">Shodh AI deployment</p>
                      <p className="text-4xl font-medium text-white">$5M</p>
                      <p className="text-white/60 text-sm mt-1 font-medium">6 months</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <p className="text-white font-medium">Apply this across the full landscape:</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {["Global Pharmaceuticals", "Solid-State Batteries", "High-Performance Alloys", "Green Chemicals"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-white/65 font-light text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-emerald-900/20 border border-white/15 text-center">
                    <p className="text-white font-medium text-lg">Multi-trillion-dollar infrastructure TAM.</p>
                    <p className="text-white/60 font-light mt-1">We are fundamentally repricing the cost of physical creation.</p>
                  </div>
                </div>
              </motion.section>

              {/* Section 7: AlphaFold Moment — exact copy */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 7: The Proof
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tight">
                  Our AlphaFold Moment
                </h2>
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

                <div className="mt-8 p-8 rounded-xl bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-emerald-900/30 border border-white/20 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 mix-blend-overlay"></div>
                  <p className="text-lg md:text-xl text-white font-light leading-relaxed relative z-10 max-w-4xl mx-auto">
                    <strong className="font-medium text-white">The Takeaway:</strong> We didn't just guess the material; our AI wrote the physical instructions to scale it. If we can predict battery degradation with 70% accuracy today, we can generate perfect, 100% accurate factory blueprints for the world's largest industrial giants tomorrow.
                  </p>
                </div>

                {/* Expanded modals */}
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
              </motion.section>

              {/* Section 8: Business Model & GTM */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 8: Business Model & GTM
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
                  The Two-Phased <span className="font-normal">Flywheel</span>
                </h2>
                <p className="text-white/50 font-light mb-8">When building a foundational LPM, you don't launch with a self-serve SaaS subscription. You launch with highly strategic, highly profitable industrial partnerships.</p>

                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10 text-sm font-medium text-white">1</div>
                      <p className="text-white font-medium text-lg">Phase 1: The Co-Creators <span className="text-white/40 text-sm font-light ml-2">(Next 18–24 months)</span></p>
                    </div>
                    <ul className="space-y-2 text-white/65 font-light ml-11">
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />3–5 global anchor partners. Already have <span className="text-white font-medium">Biocon / Syngene</span> (pharma) and <span className="text-white font-medium">Aarti Industries</span> (chemicals). Locking in third for batteries.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Deploy engineers directly into their secure environments to solve their hardest scale-up bottlenecks.</li>
                    </ul>
                    <div className="ml-11 space-y-3 mt-2">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <p className="text-white/50 text-xs uppercase tracking-wider">How we make money today — The Aarti Model</p>
                        <ul className="space-y-1 text-white/65 font-light text-sm mt-2">
                          <li className="flex items-start gap-2"><ChevronRight className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0" />Upfront contract fees — cash-flow positive on deployment.</li>
                          <li className="flex items-start gap-2"><ChevronRight className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0" />Revenue-sharing on the final manufactured product. Cut of the margins we unlock.</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <p className="text-white/50 text-xs uppercase tracking-wider">The hidden value</p>
                        <p className="text-white/65 font-light text-sm mt-1">While they pay us, our LPM absorbs their proprietary sim-to-real physics data. They are literally funding the training of our foundation model.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10 text-sm font-medium text-white">2</div>
                      <p className="text-white font-medium text-lg">Phase 2: The Generalization Expansion <span className="text-white/40 text-sm font-light ml-2">(10 partners)</span></p>
                    </div>
                    <ul className="space-y-2 text-white/65 font-light ml-11">
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Validated across first 3–5 anchors → expand to 10 global Tier-1 partners.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Same policy: upfront contracts + revenue-sharing.</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-xl bg-white/10 border border-white/20 space-y-3">
                    <p className="text-white font-medium">The Tipping Point — Proper GTM:</p>
                    <ul className="space-y-2 text-white/70 font-light">
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />LPM achieves true <span className="text-white font-medium">Generalization</span>. No more embedded engineers needed.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Transition to Zero-Shot Manufacturing software — deployed globally across thousands of factories.</li>
                      <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />From co-creation model → <span className="text-white font-medium">pure, high-margin IP and licensing monopoly.</span></li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Section 9: The Pipeline */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 9: The Global Pipeline
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
                  The Pipeline <span className="font-normal">to Execute Phase 2</span>
                </h2>
                <p className="text-white/50 font-light mb-8">We already have the pipeline in motion.</p>

                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: "Biocon / Syngene", domain: "Pharma", status: "Anchor — Active", color: "emerald" },
                      { name: "Aarti Industries", domain: "Chemicals", status: "Anchor — Active", color: "emerald" },
                      { name: "Sandoz", domain: "Pharma", status: "Board-level LOI", color: "blue" },
                      { name: "LG Chem", domain: "Batteries", status: "Board-level LOI", color: "blue" },
                      { name: "Dr. Reddy's", domain: "Pharma", status: "Deep conversations", color: "white" },
                      { name: "Novartis", domain: "Pharma", status: "Deep conversations", color: "white" },
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-white/40 text-xs uppercase tracking-wider mt-0.5">{item.domain}</p>
                        </div>
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          item.color === "emerald"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                            : item.color === "blue"
                            ? "bg-blue-500/10 border-blue-500/20 text-blue-300"
                            : "bg-white/5 border-white/10 text-white/50"
                        }`}>
                          {item.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* Section 10: The $100M War Chest */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5 text-center"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Section 10: The Ask
                </div>
                <h2 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-tight">
                  The $100M War Chest
                </h2>
                <p className="text-white/50 font-light mb-12">Language came. Code came. Science is here.</p>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
                    <h4 className="text-2xl font-medium text-white mb-2">$25M</h4>
                    <p className="text-sm text-white/50 font-light text-center">Indian Government — sovereign NVIDIA GPU compute.</p>
                    <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">Secured</div>
                  </div>
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
                    <h4 className="text-2xl font-medium text-white mb-2">$25M</h4>
                    <p className="text-sm text-white/50 font-light text-center">ANRF — autonomous robotic lab infrastructure.</p>
                    <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">Secured</div>
                  </div>
                  <div className="p-6 rounded-xl bg-white/10 border border-white/20 flex flex-col items-center">
                    <h4 className="text-2xl font-medium text-white mb-2">$50M</h4>
                    <p className="text-sm text-white/80 font-medium text-center">Equity Round. We are raising from you.</p>
                    <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium">Raising Now</div>
                  </div>
                </div>

                <div className="max-w-3xl mx-auto p-6 rounded-xl bg-white/5 border border-white/10 text-left mb-12 space-y-3">
                  <p className="text-white font-medium text-center mb-4">What does your $50M buy?</p>
                  <ul className="space-y-2 text-white/65 font-light">
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />World's top AI researchers.</li>
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Massive team of Federated Data Engineers — deployed into our first 10 global partners.</li>
                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />Global sales team to lock in the market before Big Tech realizes they are fighting the wrong war.</li>
                  </ul>
                </div>

                <div className="pt-10 border-t border-white/10">
                  <h2 className="text-2xl md:text-4xl font-light text-white leading-tight mb-10">
                    Shodh AI is built in India. <br />
                    <strong className="font-normal text-white/80 mt-4 block">
                      We are making it for the world.
                    </strong>
                  </h2>

                  <a
                    href="mailto:arastu@shodh.ai"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all text-lg"
                  >
                    <Mail className="w-5 h-5" />
                    Partner with Us
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
