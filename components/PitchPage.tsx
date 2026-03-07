"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Lock,
  CheckCircle2,
  FileText,
  Download,
  ArrowLeft,
  Linkedin,
  Mail,
  Building2,
  User,
  Shield,
  Eye,
  Clock,
  TrendingUp,
  Zap,
  Layers,
  AlertCircle,
  ChevronDown,
  BrainCircuit,
  Activity,
  Beaker,
  Factory,
  Database,
  Cpu,
  Network,
  Users
} from "lucide-react";

export default function PitchPage() {
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
            <span className="text-sm font-light tracking-[0.2em] uppercase text-white/60">Investor Briefing</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key="access"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6"
              >
                <CheckCircle2 className="w-4 h-4 text-white/60" />
                <span className="text-white/60 text-xs font-light tracking-[0.2em] uppercase">
                  Access Granted
                </span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
                Welcome to the <br />
                <span className="text-white font-normal">
                  Investor Data Room
                </span>
              </h1>
              <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed font-light">
                You now have full access to our investor materials.
              </p>
            </div>

            {/* Founder's Letter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-5xl mx-auto mb-16"
            >
              <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-5xl font-light text-white mb-4 uppercase tracking-tight">
                    TO PERISH IN ARROGANT PRESUMPTIONS.
                  </h2>
                </div>

                {/* Letter Content */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    <strong className="text-white">To our Future Partners,</strong>
                  </p>

                  <p className="text-white/70 leading-relaxed mb-4">
                    There is a reason this industry is empty.
                  </p>

                  <p className="text-white/70 leading-relaxed mb-4">
                    We are building for a market that doesn't exist on a spreadsheet yet. Jensen Huang calls these "Zero-Billion Dollar Markets"—industries that are currently zero, but are inevitably destined to become the infrastructure of the future.
                  </p>

                  <p className="text-white/70 leading-relaxed mb-4">
                    Our competitors, Lila Science ($550M) and Radical AI ($55M), have raised massive war chests to solve the "Lab Problem." They are building brilliant tools for scientists to discover molecules.
                  </p>

                  <p className="text-white/70 leading-relaxed mb-4">
                    <strong className="text-white">But discovery is not delivery.</strong>
                  </p>

                  <p className="text-white/70 leading-relaxed mb-4">
                    We are playing a different game. We are not just building a tool for the Lab; we are building the <strong className="text-white">Foundation Model for the Physical World.</strong>
                  </p>

                  <p className="text-white/70 leading-relaxed mb-4">
                    This is not "Predictive Maintenance" or simple factory optimization. We are not just tweaking the temperature of a furnace.
                  </p>

                  <p className="text-white/70 leading-relaxed mb-4">
                    <strong className="text-white">Invention will not be luck, but by design.</strong>
                  </p>

                  <p className="text-white/70 leading-relaxed mb-4">
                    Our AI enables a new paradigm: <strong className="text-white">Inverse Design</strong>. It allows a human to imagine a material that shouldn't exist—a battery that is both cheaper and energy-dense—and then generates both the molecular recipe to invent it and the machine code to manufacture it.
                  </p>

                  <p className="text-white/70 leading-relaxed mb-4">
                    We are giving nations and industries the sovereign power to invent their own energy future, breaking the reliance on decades of slow academic trial-and-error.
                  </p>

                  <p className="text-white/70 leading-relaxed mb-4">
                    We have chosen the hardest path. We operate at the intersection of Mesoscale Physics, Generative AI, and Heavy Manufacturing. It is painful. It requires suffering. But as we say internally: <em className="text-white/90">To perish in arrogant presumptions is our motto.</em>
                  </p>

                  <p className="text-white/70 leading-relaxed mb-4">
                    We'd rather fail trying to build a Type 1 Civilization than succeed at building another SaaS app.
                  </p>

                  <p className="text-white/70 leading-relaxed mb-6">
                    If you believe that the next Trillion-Dollar company will be built in the physical world, not the digital one...
                  </p>

                  <p className="text-white text-lg font-medium mb-8">
                    Welcome to Shodh AI.
                  </p>

                  {/* Signature Placeholder */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-white font-medium text-lg">Arastu</p>
                    <p className="text-white/50 text-sm">CEO, Shodh AI</p>

                    <div className="mt-4">
                      <div className="w-40 h-40 overflow-hidden rounded-xl border border-white/10">
                        <img
                          src="/Arastu_Sharma_l.jpeg"
                          alt="Arastu, CEO"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Sections from Chapter 1-7 */}
            <div className="max-w-5xl mx-auto space-y-16">
              
              {/* Chapter 1: The AI Evolution */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Chapter 1: The AI Evolution
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-8 tracking-tight">
                  Language &rarr; Code &rarr; <span className="font-normal">Physical World</span>
                </h2>
                
                <div className="prose prose-invert max-w-none text-white/70 font-light leading-relaxed space-y-6">
                  <p>
                    In 2022, AI mastered Language (ChatGPT). In 2024, AI mastered Code (Copilot). Today, in 2026, the final and largest frontier is <strong className="text-white font-medium">Science and the Physical World</strong>.
                  </p>
                  <p>
                    Everyone knows this. That's why billions are pouring into AI for Science. But there is a massive, trillion-dollar lie in the industry right now: <em className="text-white/90">People think discovering a new molecule solves the problem.</em>
                  </p>
                  <p className="text-xl text-white font-medium mt-8 border-l-2 border-white/20 pl-6 py-2">
                    It doesn't.
                  </p>
                </div>
              </motion.section>

              {/* Chapter 2: The "Aha!" Moment */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Chapter 2: The "Aha!" Moment
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-10 tracking-tight">
                  The Scale-Up Bottleneck
                </h2>
                
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6 text-white/70 font-light leading-relaxed">
                    <p>
                      Let me give you a real example from our partner, Kiran Mazumdar-Shaw at Biocon.
                    </p>
                    <p>
                      Right now, making a life-saving drug takes a 16-step chemical batch process. It's slow and insanely expensive. Biocon knows that if they use novel bio-enzymes, they can cut that 16-step process down to just 3 steps.
                    </p>
                    <p className="text-white font-medium text-lg border-l-2 border-white/20 pl-4 py-1">So what's the problem? Scale-up.</p>
                    <p>
                      When you take that delicate bio-enzyme out of a tiny lab test-tube and put it into a massive, industrial steel reactor, the fluid dynamics and heat kill the enzyme. The drug fails.
                    </p>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col justify-center">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 text-white/40 line-through">
                        <Beaker className="w-6 h-6" />
                        <span className="text-lg">Discovery Bottleneck</span>
                      </div>
                      <div className="flex items-center gap-4 text-white">
                        <Factory className="w-6 h-6" />
                        <span className="text-xl font-medium">Engineering Bottleneck</span>
                      </div>
                      <p className="text-sm text-white/50 italic pt-4 border-t border-white/10 mt-4 leading-relaxed">
                        "There are thousands of miracle molecules, better batteries, and super-enzymes sitting on shelves right now. We already discovered them! But we can't commercialize them because we don't know how to physically manufacture them at scale."
                      </p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Chapter 3: The Competitor Landscape */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Chapter 3: The Competitor Landscape
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-10 tracking-tight">
                  Why Everyone Else Is Stuck
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-medium text-white mb-1">The "Architects"</h3>
                    <p className="text-xs text-white/40 mb-4 uppercase tracking-widest">Isomorphic, Recursion</p>
                    <p className="text-white/60 font-light text-sm leading-relaxed">
                      They use AI to discover new atoms and molecules. They draw brilliant blueprints. But they don't know how to build the house. They hand the molecule to J&J or Novartis and say, "Good luck figuring out how to manufacture this."
                    </p>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-medium text-white mb-1">The "Landlords"</h3>
                    <p className="text-xs text-white/40 mb-4 uppercase tracking-widest">Lila Sciences</p>
                    <p className="text-white/60 font-light text-sm leading-relaxed">
                      They built cool, automated robotic labs and they rent them out to other companies. It's a great "lab-for-hire" business, but they are just selling pickaxes. They don't own the gold.
                    </p>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-medium text-white mb-1">The "Dreamers"</h3>
                    <p className="text-xs text-white/40 mb-4 uppercase tracking-widest">Radical AI</p>
                    <p className="text-white/60 font-light text-sm leading-relaxed">
                      They want to discover materials and manufacture them autonomously. But they have a "Cold Start" problem. How do you train an AI to manufacture things if no giant pharma or chemical company will share their secret factory data with you?
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Chapter 4: The Masterplan */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6 relative z-10">
                  Chapter 4: The Masterplan
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-8 tracking-tight relative z-10">
                  The Wedge
                </h2>
                
                <div className="space-y-8 text-white/70 font-light leading-relaxed relative z-10">
                  <p className="text-xl text-white font-medium">
                    We bypass all of this. We are not starting at discovery, we are starting at Scale-Up (The Mesoscale).
                  </p>
                  
                  <p>
                    We go to Aarti Industries and Syngene and say: "You have molecules you can't scale. We have the AI to simulate the fluid dynamics, porous structures, and physical reactors to scale them for you."
                  </p>
                  
                  <p>
                    We deploy our engineers to sit inside their secure servers (Federated Data Environments). We solve their $500M manufacturing headaches.
                  </p>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-8">
                    <p className="text-white/90 font-medium">
                      But here is the magic: As our AI solves their scale-up problems, our AI learns the deep physics of how the real world works. They pay us, and we get the most valuable, proprietary sim-to-real physics data on earth. We solve Radical AI's cold-start problem because the world's biggest industrial giants are literally feeding us the data.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Chapter 5: The Grand Business Model */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Chapter 5: The Grand Business Model
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tight">
                  How we make the billions
                </h2>
                <p className="text-lg text-white/50 font-light italic mb-10">
                  "VCs always ask: 'Are you just going to be a software tool that takes a tiny 2% cut while Novartis makes $10 Billion?' Absolutely not."
                </p>
                
                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-medium text-white mb-2">Phase 1: Co-Creation & FDEs <span className="text-white/40 text-sm font-light uppercase tracking-wider ml-2">(Years 1-2)</span></h3>
                    <p className="text-white/60 font-light leading-relaxed">
                      We deploy teams to 10 anchor partners (like Syngene and Aarti). We charge them for the scale-up, and we capture the physics data.
                    </p>
                  </div>
                  
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-medium text-white mb-2">Phase 2: The Isomorphic Catch-up <span className="text-white/40 text-sm font-light uppercase tracking-wider ml-2">(Years 3-4)</span></h3>
                    <p className="text-white/60 font-light leading-relaxed">
                      Because we solved the scale-up, J&J and Novartis will come to us with Isomorphic's discoveries and say, "Scale this for us." At this point, we don't charge a software fee. We say: <strong className="text-white font-medium">"We will scale this, but we want a 10% royalty on the global drug sales."</strong>
                    </p>
                  </div>
                  
                  <div className="p-6 rounded-xl bg-white/10 border border-white/20">
                    <h3 className="text-xl font-medium text-white mb-2">Phase 3: The Endgame <span className="text-white/60 text-sm font-light uppercase tracking-wider ml-2">(Zero-Shot Discovery to Mfg)</span></h3>
                    <p className="text-white/70 font-light leading-relaxed">
                      Once our model is fully trained, we do both. We discover the molecule (Atomic level) AND we generate the exact factory blueprint to make it (Mesoscale). We patent the drug/material ourselves. <span className="text-white font-medium">We don't take a cut; we own the asset.</span>
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Chapter 6: The Proof */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Chapter 6: The Proof
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-8 tracking-tight">
                  The Science Moat
                </h2>
                
                <p className="text-lg text-white/60 font-light mb-8 italic">
                  "You might be thinking, 'This sounds like magic, does the AI actually work?'"
                </p>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center space-y-6">
                  <h3 className="text-2xl font-medium text-white uppercase tracking-widest">Yes.</h3>
                  <div className="h-px w-16 bg-white/20 mx-auto" />
                  <p className="text-white/70 font-light leading-relaxed max-w-3xl mx-auto">
                    We just ran a 25-day sprint (The AlphaFold Matrix). We used our AI to predict the physical failure rates and structural degradation of 30 battery cells before they were ever built. We then built them in the lab. Our AI's digital 3D models perfectly matched the physical microscopic scans.
                  </p>
                  <p className="text-white font-medium text-lg pt-4">
                    We have mathematically proven that our AI understands physical reality.
                  </p>
                </div>
              </motion.section>

              {/* Chapter 7: The Ask */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5 text-center"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Chapter 7: The Ask
                </div>
                <h2 className="text-4xl md:text-6xl font-light text-white mb-12 tracking-tight">
                  The $100M War Chest
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
                    <h4 className="text-2xl font-medium text-white mb-2">$25M</h4>
                    <p className="text-sm text-white/50 font-light">Indian Government guaranteed NVIDIA GPU compute.</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
                    <h4 className="text-2xl font-medium text-white mb-2">$35M</h4>
                    <p className="text-sm text-white/50 font-light">ANRF RDI funds for physical autonomous robotic lab.</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/10 border border-white/20 flex flex-col items-center">
                    <h4 className="text-2xl font-medium text-white mb-2">$40M</h4>
                    <p className="text-sm text-white/80 font-medium">Equity Round. We are raising from you.</p>
                  </div>
                </div>
                
                <div className="max-w-3xl mx-auto space-y-6 text-left mb-16">
                  <h3 className="text-2xl font-medium text-white text-center">What does your money buy?</h3>
                  <p className="text-lg text-white/60 font-light leading-relaxed text-center">
                    It buys the human brains to conquer the globe. We are using this equity to hire the world's top AI researchers, a massive team of Federated Data Engineers to deploy into our first 10 global partners, and a global sales team to capture the market before anyone else realizes the game has changed.
                  </p>
                </div>
                
                <div className="pt-12 border-t border-white/10">
                  <h2 className="text-2xl md:text-4xl font-light text-white leading-tight mb-10">
                    Language came. Code came. Science is here. <br/>
                    <strong className="font-normal text-white/80 mt-4 block">
                      Shodh AI is building the operating system for the physical world.
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

            {/* Additional Resources */}
            <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-white/[0.02] border border-white/5 mt-16">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Shield className="w-6 h-6 text-white/60" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-light text-white mb-2">Need More Information?</h3>
                  <p className="text-white/60 leading-relaxed mb-4 font-light">
                    For additional materials, financial models, or to schedule a deep-dive session with our founding team,
                    please contact us directly.
                  </p>
                  <a
                    href="mailto:arastu@shodh.ai"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white font-light hover:bg-white/20 border border-white/10 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Investor Relations
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
