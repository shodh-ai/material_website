"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BrainCircuit, Activity, Zap, Factory, ShieldCheck, Database, Goal, Beaker, PlayCircle, Lock, Droplets, Thermometer, Wind, Combine, Timer, Cpu } from "lucide-react";
import VisualWorkflowPilots from "./VisualWorkflowPilots";

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a] text-white selection:bg-white/30">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span className="text-sm font-light tracking-[0.2em] uppercase text-white/60">Enterprise Pilot LOI</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20 space-y-32">
        
        {/* Title Slide */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12">
            <div className="text-2xl md:text-3xl font-light tracking-widest text-white/80">SHODH AI</div>
            <div className="text-white/20 text-xl md:text-2xl font-light">×</div>
            <div className="text-2xl md:text-3xl font-light tracking-widest text-white border-b border-white/20 pb-1 px-4 text-emerald-400 text-center">
              DR. REDDY'S
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight mb-6">
            The Generative Physics Engine <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              for Next-Gen APIs.
            </span>
          </h1>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <span className="px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-300/80 text-xs font-medium tracking-wide uppercase">
              Backed by IndiaAI Mission
            </span>
            <span className="px-4 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-300/80 text-xs font-medium tracking-wide uppercase">
              NVIDIA Accelerated Partner
            </span>
          </div>
        </motion.section>

        {/* 1. About Shodh AI & The Macro Shift */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 opacity-5">
            <BrainCircuit className="w-96 h-96" />
          </div>

          {/* Intro */}
          <div className="mb-16 relative z-10 space-y-6">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-emerald-400 block">1. About Shodh AI</span>
            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight mb-6">
              India's Sovereign Generative Physics Platform
            </h2>
            <p className="text-xl text-white/80 font-light leading-relaxed max-w-3xl">
              We're building India's first <strong className="text-white font-medium">Large Material Model (LMM)</strong> that understands the fundamental physics of the mesoscale-<strong className="text-white font-medium">fluid dynamics, heat transfer, and mass transport.</strong>
            </p>
            <p className="text-white/60 font-light leading-relaxed max-w-4xl">
              We've launched our foundational mesoscale physics model (Project Skanda, in collaboration with NVIDIA), backed by the <strong className="text-white/80 font-medium">India AI Mission</strong>. Our platform scales across chemicals, batteries, and pharma, with early validation in a mesoscale battery model now proving <strong className="text-white/80 font-medium">70-80% lab accuracy</strong>. As one of 12 IndiaAI foundational model companies, we're positioned to build sovereign deep-tech IP, complementing atomic discovery models by acting as the <strong className="text-white/80 font-medium">intelligence layer for physical factory scale-up.</strong>
            </p>
          </div>

          {/* The Macro Shift */}
          <div className="relative z-10 pt-12 border-t border-white/10">
            <h3 className="text-2xl font-light text-white leading-tight mb-8">
              AI Conquered Language. Then Discovery. <span className="text-emerald-400 font-medium">Now, Manufacturing.</span>
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white/40 font-medium">1</div>
                <div>
                  <h4 className="text-lg text-white font-medium mb-1">Era 1: AI for Information <span className="text-white/40 font-light text-sm">(2020-2023)</span></h4>
                  <p className="text-white/60 font-light">Models like ChatGPT learned the rules of language to generate text and code.</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white/40 font-medium">2</div>
                <div>
                  <h4 className="text-lg text-white font-medium mb-1">Era 2: AI for Digital Discovery <span className="text-white/40 font-light text-sm">(2024-2025)</span></h4>
                  <p className="text-white/60 font-light">Models like AlphaFold and Isomorphic learned the rules of biology to invent miracle molecules and new materials in silico.</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start p-6 -mx-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-medium">3</div>
                <div>
                  <h4 className="text-lg text-white font-medium mb-2">Era 3: AI for Physical Realization <span className="text-emerald-400/80 text-sm ml-2 font-light">(Shodh AI)</span></h4>
                  <p className="text-white/80 font-light leading-relaxed">
                    Discoveries are useless if they cannot exist in the real world. Shodh AI masters the universal laws of physics to turn Era 2 discoveries into scalable realities-simulating infinite "what if" physical designs without physical trials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 2. The Problem */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-red-400 mb-4 block">The Universal Bottleneck</span>
            <h2 className="text-3xl md:text-4xl font-light text-white">21st-Century Discoveries Trapped in 19th-Century Scale-Up</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Beaker className="w-5 h-5 text-white/40" />
                The Reality
              </h3>
              <p className="text-white/60 font-light leading-relaxed">
                AI invents molecules fast, but lab-to-factory scaling warps physics-heat traps, flows fail, and reactions explode.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)]">
              <h3 className="text-red-300 font-medium mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-400" />
                The "Valley of Death"
              </h3>
              <p className="text-white/80 font-light leading-relaxed">
                Enterprises waste 5+ years and $500M+ on trial-and-error physical pilots. Billions in R&D value remain trapped.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 4. The Core Moat (Universal Physics Engine) */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-emerald-400 mb-4 block">The Core Moat</span>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">From Trial-and-Error to "Zero-Shot Engineering"</h2>
            <p className="text-white/70 font-light leading-relaxed max-w-3xl mx-auto text-lg">
              <strong className="text-emerald-300">The Business Impact:</strong> Cut pilot CapEx by 80% and go to market 5x faster.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col justify-center">
              <h3 className="text-white/60 font-medium mb-3 text-xl">The Legacy Way</h3>
              <p className="text-white/50 font-light leading-relaxed">
                Legacy software calculates physics sequentially. You map flow first, then wait weeks for heat mapping. The result? Compounding errors and failed real-world pilots.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.1)] flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -right-10 -top-10 opacity-10">
                <BrainCircuit className="w-48 h-48 text-emerald-400" />
              </div>
              <h3 className="text-emerald-300 font-medium mb-3 text-xl flex items-center gap-2 relative z-10">
                <Zap className="w-6 h-6" /> The Shodh Breakthrough
              </h3>
              <p className="text-white/90 font-light leading-relaxed relative z-10">
                Our Neural Operators process real-world physics <strong className="text-white font-medium">simultaneously as a single, unified state</strong>.
              </p>
            </div>
          </div>

          {/* Simple Physics Diagram */}
          <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-b from-[#0a0a0a] to-[#111111] border border-white/10 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05),transparent_50%)]"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative z-10">
              
              {/* Left Column */}
              <div className="space-y-6 flex-1 max-w-sm">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
                  <Droplets className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Flow & Mixing</h4>
                    <p className="text-white/50 text-xs font-light">(Navier-Stokes & Fick's Law)</p>
                    <p className="text-white/70 text-sm mt-2 font-light">How fluids move and blend.</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
                  <Thermometer className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Heat & Thermal</h4>
                    <p className="text-white/50 text-xs font-light">(Fourier's Law)</p>
                    <p className="text-white/70 text-sm mt-2 font-light">How the system heats up and cools down.</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
                  <Wind className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Stress & Swelling</h4>
                    <p className="text-white/50 text-xs font-light">(Solid Mechanics)</p>
                    <p className="text-white/70 text-sm mt-2 font-light">How materials expand, crack, or warp.</p>
                  </div>
                </div>
              </div>

              {/* Center Brain */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center relative">
                <div className="w-48 h-48 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.2)] relative z-10 backdrop-blur-sm">
                  <div className="w-32 h-32 rounded-full bg-emerald-500/20 flex items-center justify-center animate-pulse">
                    <BrainCircuit className="w-16 h-16 text-emerald-300" />
                  </div>
                </div>
                <div className="absolute -bottom-8 bg-black border border-emerald-500/30 px-6 py-2 rounded-full z-20">
                  <span className="text-emerald-400 font-medium text-sm whitespace-nowrap">Shodh Foundation Model</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6 flex-1 max-w-sm">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
                  <Combine className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Solidification</h4>
                    <p className="text-white/50 text-xs font-light">(Phase Field)</p>
                    <p className="text-white/70 text-sm mt-2 font-light">How microstructures physically form.</p>
                  </div>
                </div>
                
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
                  <Timer className="w-6 h-6 text-orange-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Reaction Speed</h4>
                    <p className="text-white/50 text-xs font-light">(Chemical Kinetics)</p>
                    <p className="text-white/70 text-sm mt-2 font-light">How fast the chemistry actually happens.</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
                  <Cpu className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Conductivity</h4>
                    <p className="text-white/50 text-xs font-light">(Maxwell's Equations)</p>
                    <p className="text-white/70 text-sm mt-2 font-light">How electrons and ions move through material.</p>
                  </div>
                </div>
              </div>
              
            </div>

            <div className="mt-16 text-center max-w-2xl mx-auto p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
              <p className="text-emerald-100/90 font-light leading-relaxed">
                <strong className="text-emerald-400 font-medium">The Takeaway:</strong> Because our AI understands these universal laws together, the first time you physically build a reactor or battery, it works perfectly.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 5. The Workflow (Skandax) */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center mb-16">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-emerald-400 mb-4 block">The Workflow</span>
            <h2 className="text-3xl md:text-5xl font-light text-white">The Anatomy of Zero-Shot Manufacturing</h2>
            <p className="text-white/50 font-light mt-4 max-w-2xl mx-auto">How we turn intent into physical reality, compressing 5 years of trial-and-error into 6 months.</p>
          </div>

          <div className="w-[100vw] relative left-1/2 right-1/2 -mx-[50vw] bg-white/[0.02] border-y border-white/5 py-16 mb-16">
            <VisualWorkflowPilots />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-emerald-400 font-medium mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">1</span>
                Intent
              </div>
              <p className="text-white/60 text-sm font-light leading-relaxed">You give us the target specs (e.g., Fast Charge EV Cell, 800 Wh/L).</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-emerald-400 font-medium mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">2</span>
                Genesis
              </div>
              <p className="text-white/60 text-sm font-light leading-relaxed">Our AI instantly imagines 10,000 candidate structural architectures.</p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
              <div className="text-emerald-300 font-medium mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">3</span>
                Validate
              </div>
              <p className="text-white/80 text-sm font-light leading-relaxed">We simulate the coupled physics, instantly killing the 9,995 failures.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-emerald-400 font-medium mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">4</span>
                Deploy
              </div>
              <p className="text-white/60 text-sm font-light leading-relaxed">We translate the winning structure into exact factory compilation codes.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
              <div className="relative z-10">
                <div className="text-white font-medium mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">5</span>
                  Reality
                </div>
                <p className="text-white/80 text-sm font-light leading-relaxed">You manufacture it successfully on the first try. Flawless scale-up.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 6. The Value to Target Company */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <span className="text-xs font-light tracking-[0.2em] uppercase text-emerald-400 block">The Value to Dr. Reddy's</span>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-8">Shrinking Factories. Maximizing API Yields.</h2>
          
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 max-w-3xl mx-auto text-left mb-8 relative">
            <ul className="space-y-8">
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                  <Factory className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2 text-lg">Batch-to-Continuous Flow</h4>
                  <p className="text-white/70 font-light leading-relaxed">
                    We generate mathematically perfect mesoscale flow-reactors, allowing Dr. Reddy's to transition complex API manufacturing from massive $500M batch-vats into high-yield, continuous "Suitcase Factories."
                  </p>
                </div>
              </li>
              
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2 text-lg">Zero-Shot Scale-Up</h4>
                  <p className="text-white/70 font-light leading-relaxed">
                    We eliminate the trial-and-error of physical pilot plants, predicting thermal and mixing behaviors flawlessly to accelerate your time-to-market.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* 6. Social Proof */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/5"
        >
          <div className="mb-12 text-center">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-emerald-400 mb-4 block">Social Proof</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Trusted by Industry Leaders</h2>
            <p className="text-white/50 font-light">Co-creating the future of physical manufacturing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-xs text-purple-400 uppercase tracking-widest mb-2 font-medium">Biopharma</div>
              <h4 className="text-lg text-white font-medium mb-3">Biocon / Syngene</h4>
              <p className="text-white/60 font-light text-sm mb-4">With Kiran Mazumdar-Shaw-slashing 16-step API processes via generative flow reactors.</p>
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70">
                16 Steps → 3 Steps
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-xs text-blue-400 uppercase tracking-widest mb-2 font-medium">Specialty Chemicals</div>
              <h4 className="text-lg text-white font-medium mb-3">Aarti Industries</h4>
              <p className="text-white/60 font-light text-sm mb-4">With Mirik Gogri-using Digital Twins to eliminate exothermic risks in massive batch scales.</p>
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70">
                Zero-Risk Exothermics
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-xs text-emerald-400 uppercase tracking-widest mb-2 font-medium">Energy Storage</div>
              <h4 className="text-lg text-white font-medium mb-3">Project Skanda</h4>
              <p className="text-white/60 font-light text-sm mb-4">IndiaAI foundational model validating mesoscale battery physics rapidly.</p>
              <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-300">
                25-Day Validation
              </div>
            </div>
          </div>
        </motion.section>

        {/* 7. Security */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-emerald-400 mb-4 block">Enterprise-Grade</span>
            <h2 className="text-3xl md:text-4xl font-light text-white">Sovereign Infrastructure. Complete Data Privacy.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 text-center border border-white/5 rounded-2xl bg-white/[0.01]">
              <Database className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-white font-medium mb-2">Unmatched Compute</h4>
              <p className="text-white/60 font-light text-sm">IndiaAI-backed 32k+ GPUs for rapid simulations-bypassing slow public cloud queues.</p>
            </div>
            
            <div className="p-6 text-center border border-emerald-500/20 rounded-2xl bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
              <Lock className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-white font-medium mb-2">The Private Vault</h4>
              <p className="text-white/80 font-light text-sm">Zero IP risk. Your chemical formulas remain locked; the AI learns the physics only.</p>
            </div>

            <div className="p-6 text-center border border-white/5 rounded-2xl bg-white/[0.01]">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-white font-medium mb-2">Future-Proofing</h4>
              <p className="text-white/60 font-light text-sm">Pilots today enable co-developed autonomous labs for robotic validation tomorrow.</p>
            </div>
          </div>
        </motion.section>

        {/* 8. The Ask */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/5"
        >
          <div className="mb-12">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-emerald-400 mb-4 block">The Collaboration Path</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">A 30-Day "In-Silico" Validation Pilot</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 items-center">
              <div className="w-12 h-12 rounded-full bg-white/5 text-white/50 flex items-center justify-center shrink-0 font-medium text-lg">1</div>
              <div>
                <h4 className="text-lg text-white font-medium">Identify</h4>
                <p className="text-white/60 font-light text-sm mt-1">Share your top scale-up bottleneck with our team.</p>
              </div>
            </div>
            
            <div className="flex gap-6 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 items-center shadow-[0_0_20px_rgba(16,185,129,0.05)]">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-medium text-lg">2</div>
              <div>
                <h4 className="text-lg text-white font-medium">Simulate</h4>
                <p className="text-white/80 font-light text-sm mt-1">We run 1M+ physics scenarios concurrently on sovereign GPUs.</p>
              </div>
            </div>
            
            <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 items-center">
              <div className="w-12 h-12 rounded-full bg-white/5 text-white/50 flex items-center justify-center shrink-0 font-medium text-lg">3</div>
              <div>
                <h4 className="text-lg text-white font-medium">Deliver</h4>
                <p className="text-white/60 font-light text-sm mt-1">Receive a scalable blueprint to entirely skip physical pilots.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 9. Next Steps */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <span className="text-xs font-light tracking-[0.2em] uppercase text-emerald-400 block">Next Steps</span>
          <h2 className="leading-tight">
            <span className="text-white/50 text-2xl md:text-3xl font-light">Bypass the Pilot Plant</span> <br />
            <span className="text-white text-4xl md:text-5xl font-medium mt-4 block">Unlock Your Breakthroughs Now.</span>
          </h2>
          
          <div className="py-8">
            <a href="mailto:arastu@shodh.ai" className="bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 rounded-full font-medium transition-colors inline-flex items-center gap-2">
              <PlayCircle className="w-5 h-5" />
              Connect with Founder
            </a>
            <p className="text-white/40 text-sm mt-4 font-light">Reply to discuss your bottleneck and launch a zero-risk pilot.</p>
          </div>

          <div className="pt-16 border-t border-white/10 max-w-3xl mx-auto text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col">
              <span className="text-white font-medium text-xl">Arastu Sharma, PhD</span>
              <span className="text-white/50 font-light mt-1">Founder & CEO, Shodh AI</span>
            </div>
            
            <div className="flex flex-col md:items-end gap-2 text-sm">
              <a href="mailto:arastu@shodh.ai" className="text-emerald-400 hover:text-emerald-300 transition-colors">arastu@shodh.ai</a>
              <Link href="/demo" className="text-white/50 hover:text-white transition-colors underline underline-offset-4">
                Watch 60-second Shodh AI Demo Video
              </Link>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
