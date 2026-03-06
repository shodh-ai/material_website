"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Beaker, BrainCircuit, Activity, Zap, PlayCircle, Goal, Database, GitBranch, Factory, Building2, TestTube } from "lucide-react";

export default function BioconPage() {
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
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
            <span className="text-sm font-light tracking-[0.2em] uppercase text-white/60">Biocon/Syngene Pilot</span>
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
            <div className="text-white/20 text-xl md:text-2xl font-light">+</div>
            <div className="text-2xl md:text-3xl font-light tracking-widest text-white border-b border-white/20 pb-1 px-4 text-purple-400 text-center">
              BIOCON / SYNGENE
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
            Co-Creation / Strategic Pilot for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">
              Disruptive Biotransformation
            </span>
          </h1>
          
          <div className="pt-12 flex justify-center">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 max-w-2xl text-left relative overflow-hidden">
              <p className="text-white/80 font-light leading-relaxed text-lg italic">
                Dear Kiran Ma'am,
              </p>
            </div>
          </div>
        </motion.section>

        {/* 1. About Shodh AI */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 opacity-5">
            <BrainCircuit className="w-96 h-96" />
          </div>
          <div className="mb-12 relative z-10">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-purple-400 mb-4 block">1. About Shodh AI</span>
            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
              India's Sovereign Generative Physics Platform
            </h2>
          </div>
          
          <div className="space-y-8 relative z-10">
            <p className="text-xl text-white/80 font-light leading-relaxed">
              What AlphaFold did for biomolecule discovery, <strong className="text-white font-medium">Shodh AI is doing for physical manufacturing.</strong>
            </p>
            <p className="text-white/60 font-light leading-relaxed">
              We're building India's first Large Material Model (LMM) stacking mesoscale and atomic AI layers—starting with mesoscale for rapid scale-up, then expanding to atomic for full-stack innovation.
            </p>
            <p className="text-white/60 font-light leading-relaxed">
              We've launched our foundational mesoscale physics model (Project Skanda, in collaboration with NVIDIA), backed by the India AI Mission. Our platform scales across pharma, batteries, and chemicals, with early validation in a mesoscale battery model now proving 70-80% lab accuracy. As one of 12 IndiaAI foundational model companies, we're positioned to build sovereign deep-tech IP, complementing global leaders like DeepMind while leveraging India's compute edge for cost-effective disruption.
            </p>
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
            <span className="text-xs font-light tracking-[0.2em] uppercase text-red-400 mb-4 block">2. The Problem</span>
            <h2 className="text-3xl md:text-4xl font-light text-white">The 16-Step Bottleneck in Legacy Manufacturing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Factory className="w-5 h-5 text-white/40" />
                The Legacy Reality
              </h3>
              <p className="text-white/60 font-light leading-relaxed">
                As you mentioned, current API synthesis relies on 16+ steps in massive batch reactors, costing years and $500M+ in CapEx.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Beaker className="w-5 h-5 text-white/40" />
                The Enzyme Wall
              </h3>
              <p className="text-white/60 font-light leading-relaxed">
                Novel biocatalysts (enzymes) promise reduction to 2-3 steps, but industrializing them hits a wall: suboptimal fluid dynamics, mass transfer, and thermal environments kill yields at scale.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20 text-center">
            <p className="text-white/80 font-light leading-relaxed max-w-3xl mx-auto">
              Enzymes must thrive in custom porous structures for high-speed continuous flow, but designing these via trial-and-error takes too long. <strong className="text-red-300 font-medium">This is the global manufacturing chokepoint</strong>—where atomic discovery (e.g., DeepMind/Isomorphic Labs) meets real-world physics.
            </p>
          </div>
        </motion.section>

        {/* 3. Aligning with Mandate */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-purple-900/10 to-transparent border border-purple-500/20"
        >
          <div className="mb-12">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-purple-400 mb-4 block">3. Aligning with Your Disruptive Mandate</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">Full-Stack Synergy (Atomic + Mesoscale)</h2>
            <p className="text-white/70 font-light leading-relaxed max-w-3xl">
              Your guidance to bypass legacy processes for true disruption is spot on. Discovering novel enzymes (biological "software" via AlphaFold or Syngene labs) is only half the battle—if placed in outdated batch reactors, yields fail. <strong className="text-white font-medium">Shodh AI designs the "hardware":</strong> generative continuous-flow architectures tailored to enzymes' exact thermodynamic needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-purple-300 font-medium mb-2 text-lg">The Catalyst</h3>
              <div className="text-xs text-purple-400/60 uppercase tracking-widest mb-4">Atomic Layer, Future Phase</div>
              <p className="text-white/70 font-light leading-relaxed">
                Co-discover/engineer enzymes for new 3-step pathways.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-purple-500/10 border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.05)]">
              <h3 className="text-purple-300 font-medium mb-2 text-lg">The Environment</h3>
              <div className="text-xs text-purple-400/60 uppercase tracking-widest mb-4">Mesoscale Layer, Starting Point</div>
              <p className="text-white/90 font-light leading-relaxed">
                Optimize porous scaffolds, tortuosity, and porosity for perfect mass transfer, enabling 100x faster reactions under continuous flow.
              </p>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-white/80 font-light leading-relaxed max-w-3xl mx-auto">
              This co-design skips 16 steps to 2-3, turning fragile enzymes into scalable powerhouses. For now, we're not competing with atomic models—<strong className="text-white">we're the missing physics layer that makes them manufacturable.</strong>
            </p>
          </div>
        </motion.section>

        {/* 4. The Impact */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <span className="text-xs font-light tracking-[0.2em] uppercase text-purple-400 block">4. The Impact</span>
          <h2 className="text-3xl md:text-5xl font-light text-white">Programmable "Suitcase Factories"</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-8">
            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="text-white/50 text-sm mb-2">From</div>
              <div className="text-2xl text-white font-light">5-year, $500M</div>
              <div className="text-white/40 text-sm mt-1">Batch facilities</div>
            </div>
            <ArrowLeft className="w-6 h-6 text-white/20 rotate-180 rotate-90 md:rotate-180 md:rotate-0" />
            <div className="p-6 rounded-xl border border-purple-500/30 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
              <div className="text-purple-400/70 text-sm mb-2">To</div>
              <div className="text-2xl text-white font-medium">$5M</div>
              <div className="text-purple-300/80 text-sm mt-1">Rapidly deployable continuous plants</div>
            </div>
          </div>

          <p className="text-white/70 font-light leading-relaxed max-w-3xl mx-auto text-lg">
            This slashes costs, accelerates time-to-market, and maximizes any enzyme's yield. For India, it means sovereign control over programmable manufacturing, reducing import dependency and leading the next industrial revolution in biotech.
          </p>
        </motion.section>

        {/* 5. The Distributive Pilot */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/5"
        >
          <div className="mb-12">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-purple-400 mb-4 block">5. The Distributive Pilot</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">How We Collaborate</h2>
            <p className="text-white/50 font-light">30-Day In-Silico Validation & 3D-Print-Ready Design</p>
          </div>
          
          <div className="space-y-6 mb-12">
            <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 items-start">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5 text-white/50" />
              </div>
              <div>
                <h4 className="text-lg text-white font-medium mb-2">Input <span className="text-white/40 font-light">(Syngene)</span></h4>
                <p className="text-white/60 font-light">Select a target multi-step API; provide enzyme parameters (off-the-shelf or newly discovered).</p>
              </div>
            </div>
            
            <div className="flex gap-6 p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 items-start shadow-[0_0_20px_rgba(168,85,247,0.05)]">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg text-white font-medium mb-2">Shodh AI <span className="text-purple-300/60 font-light">(Intelligence Layer)</span></h4>
                <p className="text-white/80 font-light">Leverage IndiaAI's GPU clusters for 1M+ virtual simulations in hours. <strong className="text-white font-medium">Output:</strong> Optimized porous flow architectures, pressures, and dynamics for enzyme thriving at scale.</p>
              </div>
            </div>
            
            <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 items-start">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <TestTube className="w-5 h-5 text-white/50" />
              </div>
              <div>
                <h4 className="text-lg text-white font-medium mb-2">Syngene <span className="text-white/40 font-light">(Physical Compiler)</span></h4>
                <p className="text-white/60 font-light">3D-print the designs, run wet-lab flow chemistry, and validate yields.</p>
              </div>
            </div>
            
            <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 items-start">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-white/50" />
              </div>
              <div>
                <h4 className="text-lg text-white font-medium mb-2">The Flywheel</h4>
                <p className="text-white/60 font-light">Real-world data loops back to refine our models, creating proprietary, unbreakable Sim-to-Real IP.</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-purple-900/20 border border-purple-500/30 text-center">
            <h4 className="text-purple-300 font-medium mb-2">Timeline</h4>
            <p className="text-white/80 font-light text-sm">
              30 days to in-silico validation and 3D-print-ready designs—proving step/cycle reductions and establishing the blueprint for full validation. Scalable to full APIs, with LOI for ongoing collaboration.
            </p>
          </div>
        </motion.section>

        {/* 6. The India Impact */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <span className="text-xs font-light tracking-[0.2em] uppercase text-purple-400 block">6. The India Impact</span>
          <h2 className="leading-tight">
            <span className="text-white/50 text-2xl md:text-3xl font-light">From Pharmacy of the World</span> <br />
            <span className="text-white text-4xl md:text-6xl font-medium mt-4 block">to Global Programmable Manufacturing Leader</span>
          </h2>
          <p className="text-white/70 font-light leading-relaxed max-w-3xl mx-auto text-lg mt-8 mb-16">
            With IndiaAI compute and NVIDIA partnership, we're building ethical, AI-native biotech sovereignty. Partnering with Biocon/Syngene positions India as the hub for AI-biology convergence—transforming healthcare, sustainability, and economic resilience.
          </p>

          <div className="pt-16 border-t border-white/10 max-w-3xl mx-auto text-left">
            <p className="text-white/80 font-light mb-6 text-lg">Looking forward to working with you,</p>
            <div className="flex flex-col">
              <span className="text-white font-medium text-xl">Arastu Sharma, PhD</span>
              <span className="text-white/50 font-light mt-1">Founder & CEO, Shodh AI</span>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
