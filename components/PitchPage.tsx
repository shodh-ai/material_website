"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BrainCircuit, Activity, Zap, Beaker, Factory, Database, Lock, TrendingUp, Cpu, Network, Users } from "lucide-react";

export default function PitchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a] text-white selection:bg-white/30 font-sans">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
            <span className="text-sm font-light tracking-[0.2em] uppercase text-white/60">Investor Briefing</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-24 space-y-40">
        
        {/* Chapter 1: The AI Evolution */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="inline-block px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium tracking-widest uppercase mb-4">
            Chapter 1
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight text-white">
            The AI Evolution
          </h1>
          <h2 className="text-2xl md:text-3xl font-light text-white/60 pb-8 border-b border-white/10">
            Language &rarr; Code &rarr; Physical World
          </h2>
          
          <div className="prose prose-invert prose-lg max-w-none text-white/80 font-light leading-relaxed">
            <p>
              In 2022, AI mastered Language (ChatGPT). In 2024, AI mastered Code (Copilot). Today, in 2026, the final and largest frontier is <strong>Science and the Physical World</strong>.
            </p>
            <p>
              Everyone knows this. That's why billions are pouring into AI for Science. But there is a massive, trillion-dollar lie in the industry right now: <em>People think discovering a new molecule solves the problem.</em>
            </p>
            <p className="text-2xl text-white font-medium mt-8 border-l-4 border-indigo-500 pl-6 py-2 bg-indigo-500/5 rounded-r-lg">
              It doesn't.
            </p>
          </div>
        </motion.section>

        {/* Chapter 2: The "Aha!" Moment */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          <div className="inline-block px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium tracking-widest uppercase mb-4">
            Chapter 2
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-12">
            The "Aha!" Moment: <br/><span className="text-amber-400">The Scale-Up Bottleneck</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-white/80 font-light text-lg leading-relaxed">
              <p>
                Let me give you a real example from our partner, Kiran Mazumdar-Shaw at Biocon.
              </p>
              <p>
                Right now, making a life-saving drug takes a 16-step chemical batch process. It's slow and insanely expensive. Biocon knows that if they use novel bio-enzymes, they can cut that 16-step process down to just 3 steps.
              </p>
              <p className="text-white font-medium">So what's the problem? Scale-up.</p>
              <p>
                When you take that delicate bio-enzyme out of a tiny lab test-tube and put it into a massive, industrial steel reactor, the fluid dynamics and heat kill the enzyme. The drug fails.
              </p>
            </div>
            
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4 text-white/40 line-through">
                  <Beaker className="w-8 h-8" />
                  <span className="text-xl">Discovery Bottleneck</span>
                </div>
                <div className="flex items-center gap-4 text-amber-400">
                  <Factory className="w-8 h-8" />
                  <span className="text-2xl font-medium">Engineering Bottleneck</span>
                </div>
                <p className="text-sm text-white/60 italic pt-4 border-t border-white/10">
                  "There are thousands of miracle molecules, better batteries, and super-enzymes sitting on shelves right now. We already discovered them! But we can't commercialize them because we don't know how to physically manufacture them at scale."
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Chapter 3: The Competitor Landscape */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          <div className="inline-block px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-medium tracking-widest uppercase mb-4">
            Chapter 3
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white">
            Why Everyone Else Is Stuck
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">The "Architects"</h3>
              <p className="text-xs text-white/40 mb-4 uppercase tracking-wider">Isomorphic, Recursion</p>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                They use AI to discover new atoms and molecules. They draw brilliant blueprints. But they don't know how to build the house. They hand the molecule to J&J or Novartis and say, "Good luck figuring out how to manufacture this."
              </p>
            </div>
            
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <Network className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">The "Landlords"</h3>
              <p className="text-xs text-white/40 mb-4 uppercase tracking-wider">Lila Sciences</p>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                They built cool, automated robotic labs and they rent them out to other companies. It's a great "lab-for-hire" business, but they are just selling pickaxes. They don't own the gold.
              </p>
            </div>
            
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">The "Dreamers"</h3>
              <p className="text-xs text-white/40 mb-4 uppercase tracking-wider">Radical AI</p>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                They want to discover materials and manufacture them autonomously. But they have a "Cold Start" problem. How do you train an AI to manufacture things if no giant pharma or chemical company will share their secret factory data with you?
              </p>
            </div>
          </div>
        </motion.section>

        {/* Chapter 4: The Masterplan */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-3xl -z-10" />
          
          <div className="p-8 md:p-12 rounded-3xl border border-emerald-500/20">
            <div className="inline-block px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium tracking-widest uppercase mb-6">
              Chapter 4
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-8">
              The Shodh Masterplan <span className="text-emerald-400">(The Wedge)</span>
            </h2>
            
            <div className="space-y-8 text-white/80 font-light text-lg leading-relaxed">
              <p className="text-xl text-white font-medium">
                We bypass all of this. We are not starting at discovery, we are starting at Scale-Up (The Mesoscale).
              </p>
              
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                  <Users className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p>
                    We go to Aarti Industries and Syngene and say: "You have molecules you can't scale. We have the AI to simulate the fluid dynamics, porous structures, and physical reactors to scale them for you."
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 mt-1">
                  <Lock className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p>
                    We deploy our engineers to sit inside their secure servers (Federated Data Environments). We solve their $500M manufacturing headaches.
                  </p>
                </div>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mt-8">
                <p className="text-emerald-100 font-medium">
                  But here is the magic: As our AI solves their scale-up problems, our AI learns the deep physics of how the real world works. They pay us, and we get the most valuable, proprietary sim-to-real physics data on earth. We solve Radical AI's cold-start problem because the world's biggest industrial giants are literally feeding us the data.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Chapter 5: The Grand Business Model */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium tracking-widest uppercase mb-4">
            Chapter 5
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white">
            How We Make The Billions
          </h2>
          <p className="text-xl text-white/60 font-light italic border-l-2 border-white/20 pl-4">
            "VCs always ask: 'Are you just going to be a software tool that takes a tiny 2% cut while Novartis makes $10 Billion?' Absolutely not."
          </p>
          
          <div className="space-y-6">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-colors relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/50 group-hover:bg-blue-400 transition-colors" />
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <span className="text-2xl font-bold text-blue-400">1</span>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-2">Phase 1: Co-Creation & FDEs <span className="text-white/40 text-lg font-light">(Years 1-2)</span></h3>
                  <p className="text-white/70 font-light leading-relaxed">
                    We deploy teams to 10 anchor partners (like Syngene and Aarti). We charge them for the scale-up, and we capture the physics data.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/30 transition-colors relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500/50 group-hover:bg-indigo-400 transition-colors" />
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
                  <span className="text-2xl font-bold text-indigo-400">2</span>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-2">Phase 2: The Isomorphic Catch-up <span className="text-white/40 text-lg font-light">(Years 3-4)</span></h3>
                  <p className="text-white/70 font-light leading-relaxed">
                    Because we solved the scale-up, J&J and Novartis will come to us with Isomorphic's discoveries and say, "Scale this for us." At this point, we don't charge a software fee. We say: <strong>"We will scale this, but we want a 10% royalty on the global drug sales."</strong>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/50 transition-colors relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 group-hover:bg-purple-400 transition-colors shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <TrendingUp className="w-8 h-8 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white mb-2">Phase 3: The Endgame <span className="text-purple-400 text-lg font-light">(Zero-Shot Discovery to Mfg)</span></h3>
                  <p className="text-white/80 font-light leading-relaxed">
                    Once our model is fully trained, we do both. We discover the molecule (Atomic level) AND we generate the exact factory blueprint to make it (Mesoscale). We patent the drug/material ourselves. <span className="text-white font-medium border-b border-purple-500/50 pb-0.5">We don't take a cut; we own the asset.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Chapter 6: The Proof */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-medium tracking-widest uppercase mb-4">
            Chapter 6
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-8">
            The Science Moat
          </h2>
          
          <div className="bg-[#0f172a] rounded-3xl p-8 md:p-12 border border-cyan-900/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />
            
            <p className="text-xl text-white/80 font-light mb-8">
              "You might be thinking, 'This sounds like magic, does the AI actually work?'"
            </p>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-cyan-500/30 flex-1" />
              <span className="text-cyan-400 font-medium uppercase tracking-widest text-sm">YES.</span>
              <div className="h-px bg-cyan-500/30 flex-1" />
            </div>
            
            <p className="text-lg text-white/90 font-light leading-relaxed mb-8">
              We just ran a 25-day sprint (The AlphaFold Matrix). We used our AI to predict the physical failure rates and structural degradation of 30 battery cells <em>before they were ever built</em>. 
            </p>
            <p className="text-lg text-white/90 font-light leading-relaxed mb-8">
              We then built them in the lab. Our AI's digital 3D models perfectly matched the physical microscopic scans.
            </p>
            
            <div className="bg-black/40 rounded-xl p-6 text-center border border-cyan-500/20">
              <p className="text-xl text-cyan-100 font-medium">
                We have mathematically proven that our AI understands physical reality.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Chapter 7: The Ask */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-12 border-t border-white/10 space-y-12 text-center"
        >
          <div className="inline-block px-3 py-1 rounded-full border border-white/30 bg-white/5 text-white/60 text-xs font-medium tracking-widest uppercase mb-4">
            Chapter 7
          </div>
          <h2 className="text-4xl md:text-6xl font-light text-white mb-12">
            The $100M War Chest
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center text-center">
              <Cpu className="w-8 h-8 text-green-400 mb-4" />
              <h4 className="text-2xl font-medium text-white mb-2">$25M</h4>
              <p className="text-sm text-white/60 font-light">Indian Government guaranteed NVIDIA GPU compute.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center text-center">
              <Activity className="w-8 h-8 text-blue-400 mb-4" />
              <h4 className="text-2xl font-medium text-white mb-2">$35M</h4>
              <p className="text-sm text-white/60 font-light">ANRF RDI funds for physical autonomous robotic lab.</p>
            </div>
            <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex flex-col items-center text-center shadow-[0_0_30px_rgba(99,102,241,0.15)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent" />
              <Database className="w-8 h-8 text-indigo-400 mb-4 relative z-10" />
              <h4 className="text-2xl font-medium text-white mb-2 relative z-10">$40M</h4>
              <p className="text-sm text-white/80 font-medium relative z-10">Equity Round. We are raising from you.</p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-8 text-left">
            <h3 className="text-2xl font-medium text-white text-center">What does your money buy?</h3>
            <p className="text-xl text-white/80 font-light leading-relaxed text-center">
              It buys the human brains to conquer the globe. We are using this equity to hire the world's top AI researchers, a massive team of Federated Data Engineers to deploy into our first 10 global partners, and a global sales team to capture the market before anyone else realizes the game has changed.
            </p>
          </div>
          
          <div className="pt-20">
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight mb-12">
              Language came. Code came. Science is here. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 font-medium">
                Shodh AI is building the operating system for the physical world.
              </span>
            </h2>
            
            <a 
              href="mailto:arastu@shodh.ai"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-black bg-white rounded-full hover:bg-white/90 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              Partner with Us
            </a>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
