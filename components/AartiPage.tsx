"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Beaker, BrainCircuit, Activity, Zap, Goal, Database, GitBranch, Factory, Building2, TestTube } from "lucide-react";

export default function AartiPage() {
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
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            <span className="text-sm font-light tracking-[0.2em] uppercase text-white/60">Aarti Industries Pilot</span>
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
            <div className="text-2xl md:text-3xl font-light tracking-widest text-white border-b border-white/20 pb-1 px-4 text-blue-400 text-center">
              AARTI INDUSTRIES
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
            Co-Creation / Strategic Pilot for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
              AI-Driven Process Intensification & Scale-Up
            </span>
          </h1>
          
          <div className="pt-12 flex justify-center">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 max-w-2xl text-left relative overflow-hidden">
              <p className="text-white/80 font-light leading-relaxed text-lg italic">
                Dear Mirik and Team,
              </p>
            </div>
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
            <span className="text-xs font-light tracking-[0.2em] uppercase text-blue-400 block">1. About Shodh AI</span>
            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight mb-6">
              India's Sovereign Generative Physics Platform
            </h2>
            <p className="text-xl text-white/80 font-light leading-relaxed max-w-3xl">
              We're building India's first <strong className="text-white font-medium">Large Material Model (LMM)</strong> that understands the fundamental physics of the mesoscale—<strong className="text-white font-medium">fluid dynamics, heat transfer, and mass transport.</strong>
            </p>
            <p className="text-white/60 font-light leading-relaxed max-w-4xl">
              We've launched our foundational mesoscale physics model (Project Skanda, in collaboration with NVIDIA), backed by the <strong className="text-white/80 font-medium">India AI Mission</strong>. Our platform scales across chemicals, batteries, and pharma, with early validation in a mesoscale battery model now proving <strong className="text-white/80 font-medium">70-80% lab accuracy</strong>. As one of 12 IndiaAI foundational model companies, we're positioned to build sovereign deep-tech IP, complementing atomic discovery models by acting as the <strong className="text-white/80 font-medium">intelligence layer for physical factory scale-up.</strong>
            </p>
          </div>

          {/* The Macro Shift */}
          <div className="relative z-10 pt-12 border-t border-white/10">
            <h3 className="text-2xl font-light text-white leading-tight mb-8">
              AI Conquered Language. Then Discovery. <span className="text-blue-400 font-medium">Now, Manufacturing.</span>
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
              
              <div className="flex gap-6 items-start p-6 -mx-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-medium">3</div>
                <div>
                  <h4 className="text-lg text-white font-medium mb-2">Era 3: AI for Physical Realization <span className="text-blue-400/80 text-sm ml-2 font-light">(Shodh AI)</span></h4>
                  <p className="text-white/80 font-light leading-relaxed">
                    Discoveries are useless if they cannot exist in the real world. Shodh AI masters the universal laws of physics to turn Era 2 discoveries into scalable realities—simulating infinite "what if" physical designs without physical trials.
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
            <span className="text-xs font-light tracking-[0.2em] uppercase text-red-400 mb-4 block">2. The Problem</span>
            <h2 className="text-3xl md:text-4xl font-light text-white">The "Valley of Death" in Chemical Scale-Up</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Beaker className="w-5 h-5 text-white/40" />
                The Lab Illusion
              </h3>
              <p className="text-white/60 font-light leading-relaxed">
                As discussed, designing a specialty chemical in a 1-liter lab beaker is only the beginning.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Factory className="w-5 h-5 text-white/40" />
                The Scale-Up Reality
              </h3>
              <p className="text-white/60 font-light leading-relaxed">
                Scaling them to 10,000-liter batch reactors introduces massive physical bottlenecks: unpredictable mixing dynamics, inefficient separation, and the constant risk of thermal runaway in highly exothermic processes like nitration in your Benzene and DCB lines.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20 text-center">
            <p className="text-white/80 font-light leading-relaxed max-w-3xl mx-auto">
              Currently, the chemical industry solves this via trial-and-error physical "Pilot Plants," costing months of time and millions in CapEx. <strong className="text-red-300 font-medium">This is the global manufacturing chokepoint</strong>—where chemical formulas meet the messy reality of multi-physics.
            </p>
          </div>
        </motion.section>

        {/* 3. Aligning with Mandate */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/20"
        >
          <div className="mb-12">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-blue-400 mb-4 block">3. Aligning with Your R&D Mandate</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">Zero-Shot Engineering</h2>
            <p className="text-white/70 font-light leading-relaxed max-w-3xl">
              Your focus on optimizing unit operations—specifically mixing, crystallization, and distillation—is exactly where AI-driven physics excels. We propose moving Aarti Industries toward <strong className="text-white font-medium">"Zero-Shot Engineering."</strong> By training our model on Aarti's proprietary 1L-to-10kL historical scale-up data, we create a "Digital Scale-Up Twin" that instantly predicts how a new chemical will behave at industrial scale.
            </p>
            <p className="text-white/70 font-light leading-relaxed max-w-3xl mt-4">
              This allows your 400+ scientists to instantly predict how a new chemical will behave at industrial scale, eliminating the trial-and-error pilot phase and designing highly efficient, generative continuous-flow architectures. Furthermore, by generating AI-optimized internal architectures for distillation towers, we target a <strong className="text-white font-medium">30–50% reduction in energy use and emissions</strong>, aligning perfectly with Aarti's sustainability and OpEx goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-blue-300 font-medium mb-2 text-lg">The Chemistry</h3>
              <div className="text-xs text-blue-400/60 uppercase tracking-widest mb-4">Atomic Layer</div>
              <p className="text-white/70 font-light leading-relaxed">
                Aarti R&D continues to discover and refine world-class specialty chemicals and benzene derivatives.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.05)]">
              <h3 className="text-blue-300 font-medium mb-2 text-lg">The Scale-Up</h3>
              <div className="text-xs text-blue-400/60 uppercase tracking-widest mb-4">Mesoscale Layer, Starting Point</div>
              <p className="text-white/90 font-light leading-relaxed">
                Shodh AI's physics engine accurately predicts the exact fluid dynamics, heat transfer, and continuous-flow geometries needed to safely scale the reaction from 1L to 10kL.
              </p>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-white/80 font-light leading-relaxed max-w-3xl mx-auto">
              For now, we aren't predicting new chemical formulas—<strong className="text-white">we are the missing physics layer that makes your new chemicals instantly manufacturable at scale.</strong>
            </p>
          </div>
        </motion.section>

        {/* 4. The Impact */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/5"
        >
          <div className="mb-12 text-center">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-blue-400 mb-4 block">4. The Impact</span>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Co-Creating a Global Industry Standard</h2>
            <p className="text-white/70 font-light leading-relaxed max-w-3xl mx-auto text-lg">
              As Mirik suggested, we are proposing a <strong className="text-white font-medium">Co-Creation Partnership</strong>. By combining Aarti's deep expertise in chemical scale-up with Shodh AI's generative physics platform, we can build the world's first Foundation Model for Chemical Scale-Up.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="p-8 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.05)]">
              <h3 className="text-blue-300 font-medium mb-4 text-xl flex items-center gap-3">
                <Zap className="w-6 h-6 text-blue-400" />
                The Aarti Advantage
              </h3>
              <p className="text-white/80 font-light leading-relaxed">
                You gain an unbeatable time-to-market advantage by replacing physical pilot plants with digital twins, unlocking massive CapEx savings and accelerating production timelines.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-white font-medium mb-4 text-xl flex items-center gap-3">
                <Goal className="w-6 h-6 text-white/40" />
                The Global Upside
              </h3>
              <p className="text-white/60 font-light leading-relaxed">
                Together, we co-create a "Scale-Up AI" product that has the potential to become the gold standard for the global chemical engineering sector.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 5. The Distributive Pilot */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/5"
        >
          <div className="mb-12">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-blue-400 mb-4 block">5. The Distributive Pilot</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">How We Collaborate</h2>
            <p className="text-white/50 font-light">30-Day In-Silico Validation ("Co-Creation")</p>
          </div>
          
          <div className="space-y-6 mb-12">
            <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 items-start">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5 text-white/50" />
              </div>
              <div>
                <h4 className="text-lg text-white font-medium mb-2">Input <span className="text-white/40 font-light">(Aarti R&D)</span></h4>
                <p className="text-white/60 font-light">Provide historical or current bottleneck data on a specific unit operation (e.g., 1L to 10kL mixing parameters, an energy-intensive distillation column, or a highly exothermic nitro-aromatic batch reaction).</p>
              </div>
            </div>
            
            <div className="flex gap-6 p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 items-start shadow-[0_0_20px_rgba(59,130,246,0.05)]">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-lg text-white font-medium mb-2">Shodh AI <span className="text-blue-300/60 font-light">(Intelligence Layer)</span></h4>
                <p className="text-white/80 font-light">Leverage IndiaAI's GPU clusters to run 1M+ virtual physics simulations. <strong className="text-white font-medium">Output:</strong> An optimized generative scale-up prediction, or a 3D continuous-flow reactor blueprint customized to that chemical's thermodynamics.</p>
              </div>
            </div>
            
            <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 items-start">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <TestTube className="w-5 h-5 text-white/50" />
              </div>
              <div>
                <h4 className="text-lg text-white font-medium mb-2">Aarti <span className="text-white/40 font-light">(Physical Compiler)</span></h4>
                <p className="text-white/60 font-light">Validate the AI's physical prediction against your real-world lab or pilot-plant results.</p>
              </div>
            </div>
            
            <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 items-start">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-white/50" />
              </div>
              <div>
                <h4 className="text-lg text-white font-medium mb-2">The Flywheel</h4>
                <p className="text-white/60 font-light">Aarti's proprietary physical data loops back into our secure "Private Vault," refining the model's physical accuracy for your exclusive pipeline without exposing your chemical IP.</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-blue-900/20 border border-blue-500/30 text-center">
            <h4 className="text-blue-300 font-medium mb-2">Timeline</h4>
            <p className="text-white/80 font-light text-sm">
              30 days to in-silico validation and scale-up predictions—proving process intensification and establishing the blueprint for full-scale continuous flow integration.
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
          <span className="text-xs font-light tracking-[0.2em] uppercase text-blue-400 block">6. The India Impact</span>
          <h2 className="leading-tight">
            <span className="text-white/50 text-2xl md:text-3xl font-light">From Chemical Manufacturer</span> <br />
            <span className="text-white text-4xl md:text-6xl font-medium mt-4 block">to Global AI-Industrial Leader</span>
          </h2>
          <p className="text-white/70 font-light leading-relaxed max-w-3xl mx-auto text-lg mt-8 mb-16">
            With IndiaAI compute and NVIDIA partnership, we're building ethical, AI-native industrial sovereignty. Partnering with Aarti Industries positions India as the global hub for AI-driven Process Intensification and advanced materials—transforming chemical sustainability, safety, and economic resilience worldwide.
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
