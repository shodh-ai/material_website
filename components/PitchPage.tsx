"use client";

import { useState } from "react";
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
  Users,
  Settings,
  TrendingDown,
  Maximize2,
  X
} from "lucide-react";
import LineChart from "./LineChart";

export default function PitchPage() {
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
                    BEYOND THE ATOM: THE FINAL FRONTIER OF AI.
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="max-w-5xl mx-auto mb-16"
            >
              <div className="p-4 md:p-6 rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
                <div className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
                  <iframe
                    src="https://www.youtube.com/embed/8O-aKNmuNk8"
                    title="Shodh AI Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
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
                Shodh AI — <span className="font-normal">Build in India. Made for the World.</span>
              </h2>
              
              <div className="space-y-4 text-white/70 font-light leading-relaxed max-w-4xl">
                <p>
                  One of the 12 companies mandated by the IndiaAI Mission to build foundational models
                </p>
                <p>
                  Indian Govt Is building a capacity of 200,000 GPU clusters, we get first priority access to it, free of cost.
                </p>
                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white/90">
                    We are going for $25M equivalent GPU access from India AI (At world’s lowest cost)
                  </p>
                </div>
                <p className="text-white text-lg font-medium">
                  Anchored on India AI and sovereign/RDI structuring, we are building the world&apos;s first <span className="font-semibold">Large Physical Model (LPM)</span>
                </p>
                <p className="text-white text-lg font-medium">
                  Translating India&apos;s deep-tech talent into Global - <span className="font-semibold">ZERO SHOT DISCOVERY, ENGINEERING AND MANUFACTURING.</span>
                </p>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white text-lg font-light leading-relaxed">
                    “We have the cost-structure of a sovereign Indian project, but the revenue ceiling of a global Silicon Valley monopoly.”
                  </p>
                </div>
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
              
              <div className="grid gap-8">
                <div className="space-y-5 text-white/70 font-light leading-relaxed">
                  <p>
                    Real example from our partner, Kiran Mazumdar-Shaw at Biocon / Syngene.
                  </p>
                  <p>
                    Making a life-saving drug takes a 16-step chemical batch process
                  </p>
                  <p>
                    Slow and insanely expensive
                  </p>
                  <p>
                    Biocon can use novel bio-enzymes, can cut that 16-step process down to just 3 steps.
                  </p>
                  <p className="text-white font-medium text-lg border-l-2 border-white/20 pl-4 py-1">So what&apos;s the problem? Scale-up.</p>
                  <p>
                    When you take delicate bio-enzyme out of lab and put into massive, industrial steel reactor, the fluid dynamics and heat kill the enzyme. The drug fails.
                  </p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10 flex flex-col justify-center">
                  <div className="space-y-8">
                      <div className="flex items-center gap-4 text-white/40 line-through">
                        <Beaker className="w-6 h-6" />
                        <span className="text-lg">Discovery Bottleneck</span>
                      </div>
                      <div className="flex items-center gap-4 text-white">
                        <Factory className="w-6 h-6" />
                        <span className="text-xl font-medium">Engineering Bottleneck</span>
                      </div>
                      <p className="text-lg md:text-xl text-white/85 pt-5 border-t border-white/10 mt-2 leading-relaxed font-light max-w-4xl">
                        "There are THOUSANDS of miracle molecules, better batteries, and super-enzymes sitting on shelves right now. We already discovered them! But we can&apos;t COMMERCIALISE them because we don&apos;t know how to physically manufacture them at scale."
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
                  <div className="space-y-3 text-white/60 font-light text-sm leading-relaxed">
                    <p>Use AI to discover new atoms and molecules. Draw brilliant blueprints.</p>
                    <p className="text-white/90 font-medium tracking-wide">BUT</p>
                    <p>Don&apos;t know how to build. They hand the molecule to J&amp;J or Novartis and say, "Good luck figuring out how to manufacture this."</p>
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-medium text-white mb-1">The "Landlords"</h3>
                  <p className="text-xs text-white/40 mb-4 uppercase tracking-widest">Lila Sciences</p>
                  <div className="space-y-3 text-white/60 font-light text-sm leading-relaxed">
                    <p>Built cool, automated robotic labs and they rent them out to other companies.</p>
                    <p className="text-white/90 font-medium tracking-wide">BUT</p>
                    <p>It&apos;s a great "lab-for-hire" business, they are just selling pickaxes.</p>
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-medium text-white mb-1">The "Dreamers"</h3>
                  <p className="text-xs text-white/40 mb-4 uppercase tracking-widest">Radical AI</p>
                  <div className="space-y-3 text-white/60 font-light text-sm leading-relaxed">
                    <p>Want to discover materials and manufacture them autonomously.</p>
                    <p className="text-white/90 font-medium tracking-wide">BUT</p>
                    <p>have a "Cold Start" problem.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white/90 font-medium leading-relaxed">
                  Our Thesis: You can’t start the AI Discovery cycle from lab, start it from making it manufacturable and then come back.
                </p>
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
                SHODH AI : The Wedge
              </h2>
              
              <div className="space-y-8 text-white/70 font-light leading-relaxed relative z-10">
                <p className="text-xl text-white font-medium">
                  We bypass all of this. We are not starting at discovery, we are starting at Scale-Up (The MESOSCALE).
                </p>

                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 space-y-5">
                    <p className="text-white/90 font-medium uppercase tracking-[0.2em] text-xs">
                      CO-CREATION PILOTS WITH 2 Anchor Clients
                    </p>
                    <ul className="space-y-5 text-base md:text-lg leading-relaxed">
                      <li className="pl-5 relative space-y-4">
                        <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-white/60" />
                        <p>
                          <span className="text-white font-medium">Biocon / Syngene (Anchor Client)</span> : Kiran Mazumdar-Shaw officially agreed to co-create with us. She is super excited to guide hands on
                        </p>
                        <ul className="space-y-3 text-white/70 text-sm md:text-base ml-2">
                          <li className="pl-5 relative">
                            <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-white/35" />
                            Has offered her Syngene wet-labs for our physical compiler loop
                          </li>
                          <li className="pl-5 relative">
                            <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-white/35" />
                            Is in discussions to join our advisory board.
                          </li>
                        </ul>
                      </li>
                      <li className="pl-5 relative space-y-4">
                        <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-white/60" />
                        <p>
                          <span className="text-white font-medium">Aarti Industries ($3B+ Chem Giant):</span> Mirik Gogri has agreed to co-create our chem AI product.
                        </p>
                        <ul className="space-y-3 text-white/70 text-sm md:text-base ml-2">
                          <li className="pl-5 relative">
                            <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-white/35" />
                            Instead of just internal use, we are jointly building a product that can be deployed to their global clients (BASF, Dow, DuPont, etc.).
                          </li>
                        </ul>
                      </li>
                      <li className="pl-5 relative">
                        <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-white/60" />
                        <span className="text-white font-medium">Board-Level LOI Pipeline:</span> Currently in active, board-level LOI discussions with <span className="text-white font-medium">Sandoz, Dr. Reddy’s, LG Chem, and a major Chinese battery manufacturer.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 space-y-4">
                    <p className="text-white/90 font-medium uppercase tracking-[0.2em] text-xs">
                      Our Play
                    </p>
                    <p>
                      Go to Aarti Industries and Syngene and say:
                    </p>
                    <p className="text-white border-l-2 border-white/20 pl-4 py-1">
                      "You have molecules you can&apos;t scale. We have the AI to simulate the fluid dynamics, porous structures, and physical reactors to scale them for you."
                    </p>
                    <p>
                      Deploy our engineers to sit inside their secure servers (Federated Data Environments).
                    </p>
                    <p>
                      We solve their $500M manufacturing headaches.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-8">
                  <div className="space-y-3 text-white/90 font-medium leading-relaxed">
                    <p>
                      But here is the magic:
                    </p>
                    <p>
                      As our AI solves their scale-up problems, our AI learns the deep physics of how the real world works.
                    </p>
                    <p>
                      They pay us, and we get the most valuable, proprietary sim-to-real physics data on earth. We solve Cold-start problem because the world&apos;s biggest industrial giants are literally feeding us the data.
                    </p>
                  </div>
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
                The Commercial Engine: <span className="font-normal">From Nodes to IP</span>
              </h2>
              <p className="text-lg text-white/50 font-light italic mb-10">
                "Question: &apos;Are you just going to be a software tool that takes a tiny 2% cut while Novartis makes $10 Billion?&apos; Absolutely not. This is frontier AI"
              </p>
              
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="text-xl font-medium text-white mb-3">Phase 1: Co-Creation &amp; FDEs <span className="text-white/40 text-sm font-light uppercase tracking-wider ml-2">(Years 1)</span></h3>
                  <div className="space-y-3 text-white/60 font-light leading-relaxed">
                    <p>Deploy teams to 10 anchor partners (like Syngene and Aarti). We charge them for the scale-up, and we capture the physics data.</p>
                  </div>
                </div>
                
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="text-xl font-medium text-white mb-3">Phase 2: The Isomorphic Catch-up <span className="text-white/40 text-sm font-light uppercase tracking-wider ml-2">(Years 2)</span></h3>
                  <div className="space-y-3 text-white/60 font-light leading-relaxed">
                    <p>Because we solved the scale-up, J&amp;J and Novartis will come to us with Isomorphic&apos;s discoveries and say, "Scale this for us." At this point, we don&apos;t charge a software fee. We say: "We will scale this, but we want a 10% royalty on the global drug sales."</p>
                  </div>
                </div>
                
                <div className="p-6 rounded-xl bg-white/10 border border-white/20">
                  <h3 className="text-xl font-medium text-white mb-3">Phase 3: The Endgame <span className="text-white/60 text-sm font-light uppercase tracking-wider ml-2">(Zero-Shot Discovery to Mfg)</span></h3>
                  <div className="space-y-3 text-white/70 font-light leading-relaxed">
                    <p>Once our model is fully trained, we do both.</p>
                    <p>We discover the molecule (Atomic level) AND we generate the exact factory blueprint to make it (Mesoscale).</p>
                    <p className="text-white font-medium">We patent the drug/material ourselves. We don&apos;t take a cut; we own the asset.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Chapter 6: Our AlphaFold Moment */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
            >
              <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                Chapter 6: The Proof
              </div>
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tight">
                Our AlphaFold Moment
              </h2>
              <p className="text-lg text-white/70 font-light leading-relaxed max-w-3xl mb-12">
                We ran a blind 25-day "Sim-to-Real" sprint to prove our AI can generate a material and the exact factory recipe to build it.
              </p>

              {/* 3-Step Visual Pipeline */}
                <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-12">
                  
                  {/* STEP 1: The AI Prediction */}
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

                  {/* STEP 2: The Physical Build */}
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

                  {/* STEP 3: The Real-World Test */}
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
                      <div className="absolute top-14 left-3 sm:top-3 sm:left-auto sm:right-2 bg-rose-500/20 border border-rose-500/30 rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-lg z-10 backdrop-blur-sm">
                        <Zap className="w-4 h-4 text-rose-400" />
                        <span className="text-rose-400 font-medium text-xs">~70% Zero-Shot Accuracy</span>
                      </div>
                      
                      <LineChart className="w-full h-full min-h-[260px]" />
                    </div>
                    
                    <div className="pt-4 border-t border-white/10 mt-auto text-center">
                      <p className="text-white/80 text-sm font-medium leading-relaxed">
                        The model didn't just find the best battery; it accurately predicted the exact physical failure point of all 5 diverse architectural recipes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Footer - The Mic Drop */}
                <div className="mt-8 p-8 rounded-xl bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-emerald-900/30 border border-white/20 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 mix-blend-overlay"></div>
                  <p className="text-lg md:text-xl text-white font-light leading-relaxed relative z-10 max-w-4xl mx-auto">
                    <strong className="font-medium text-white">The Takeaway:</strong> We didn't just guess the material; our AI wrote the physical instructions to scale it. If we can predict battery degradation with 70% accuracy today, we can generate perfect, 100% accurate factory blueprints for the world's largest industrial giants tomorrow.
                  </p>
                </div>

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

              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  The Shodh AI Endgame
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
                  <span className="font-normal">AI-defined manufacturing</span>
                </h2>
                <p className="text-lg text-white/60 font-light leading-relaxed max-w-4xl mb-12">
                  Once our Multi-Scale Foundation Model maps the physics of scale-up, we stop just optimizing old industries. We unlock the impossible.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                    <div className="h-56 md:h-64 bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-transparent border-b border-white/10 p-6 flex items-end justify-between relative">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_45%)]" />
                      <div className="relative z-10 max-w-[75%]">
                        <p className="text-xs text-cyan-300/80 uppercase tracking-[0.2em] mb-3">Decentralized Healthcare</p>
                        <h3 className="text-2xl text-white font-medium">Suitcase Pharma</h3>
                      </div>
                      <div className="relative z-10 w-20 h-20 rounded-2xl border border-white/15 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                        <Building2 className="w-9 h-9 text-cyan-200/80" />
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3 text-white/65 font-light leading-relaxed text-sm md:text-base">
                        <li>End reliance on massive API factories.</li>
                        <li>Generate blueprints for hyper-compact, continuous-flow reactors.</li>
                        <li>Let hospitals or defense bases produce antibiotics, chemotherapy, and anti-venoms on-demand.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                    <div className="h-56 md:h-64 bg-gradient-to-br from-orange-500/20 via-rose-500/10 to-transparent border-b border-white/10 p-6 flex items-end justify-between relative">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_45%)]" />
                      <div className="relative z-10 max-w-[75%]">
                        <p className="text-xs text-orange-200/80 uppercase tracking-[0.2em] mb-3">Aerospace & Defense</p>
                        <h3 className="text-2xl text-white font-medium">Zero-Defect Hypersonic &amp; Space Alloys</h3>
                      </div>
                      <div className="relative z-10 w-20 h-20 rounded-2xl border border-white/15 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                        <Zap className="w-9 h-9 text-orange-200/80" />
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3 text-white/65 font-light leading-relaxed text-sm md:text-base">
                        <li>Traditional mills fail for hypersonic and deep-space materials.</li>
                        <li>Generate exact laser paths for 3D printing High-Entropy Alloys.</li>
                        <li>License zero-defect manufacturing codes to ISRO, SpaceX, and defense primes.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                    <div className="h-56 md:h-64 bg-gradient-to-br from-emerald-500/20 via-lime-500/10 to-transparent border-b border-white/10 p-6 flex items-end justify-between relative">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_45%)]" />
                      <div className="relative z-10 max-w-[75%]">
                        <p className="text-xs text-emerald-200/80 uppercase tracking-[0.2em] mb-3">Synthetic Biology</p>
                        <h3 className="text-2xl text-white font-medium">Programmable Bio-Scaffolds</h3>
                      </div>
                      <div className="relative z-10 w-20 h-20 rounded-2xl border border-white/15 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                        <Layers className="w-9 h-9 text-emerald-200/80" />
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3 text-white/65 font-light leading-relaxed text-sm md:text-base">
                        <li>Synthetic biology needs the right physical environment to survive.</li>
                        <li>Design microscopic, generative breathing scaffolds.</li>
                        <li>Build the physical homes for spider-silk, mycelium leather, and synthetic organs.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                    <div className="h-56 md:h-64 bg-gradient-to-br from-violet-500/20 via-indigo-500/10 to-transparent border-b border-white/10 p-6 flex items-end justify-between relative">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_45%)]" />
                      <div className="relative z-10 max-w-[75%]">
                        <p className="text-xs text-violet-200/80 uppercase tracking-[0.2em] mb-3">Sovereign Resilience</p>
                        <h3 className="text-2xl text-white font-medium">The Self-Healing Supply Chain</h3>
                      </div>
                      <div className="relative z-10 w-20 h-20 rounded-2xl border border-white/15 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                        <Network className="w-9 h-9 text-violet-200/80" />
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3 text-white/65 font-light leading-relaxed text-sm md:text-base">
                        <li>Act as sovereign defense when supply chains break.</li>
                        <li>Discover alternative chemistry from local materials in 48 hours.</li>
                        <li>Generate factory CAD files fast enough to keep a country running.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-xl bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-emerald-900/30 border border-white/20 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 mix-blend-overlay"></div>
                  <p className="text-lg md:text-xl text-white font-light leading-relaxed relative z-10 max-w-4xl mx-auto">
                    <strong className="font-medium text-white">The Ultimate Moat:</strong> Software ate the world of information. Shodh AI is writing the code to eat the physical world. We are transitioning humanity from discovering matter to compiling it.
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
                    <h4 className="text-2xl font-medium text-white mb-2">$25M</h4>
                    <p className="text-sm text-white/50 font-light">ANRF RDI funds for physical autonomous robotic lab.</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/10 border border-white/20 flex flex-col items-center">
                    <h4 className="text-2xl font-medium text-white mb-2">$50M</h4>
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
                      Shodh AI is building the Multi-Scale Foundation Model for the physical world.
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
