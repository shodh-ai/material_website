"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2, ArrowLeft, Mail, Building2, Layers, AlertCircle, 
  Beaker, Factory, Cpu, Network, Settings, TrendingDown, Maximize2, X,
  Zap, Database, Microscope, Shield, BrainCircuit, Activity, DollarSign, Clock, RefreshCw
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
            <span className="text-sm font-light tracking-[0.2em] uppercase text-white/60">ANRF Briefing</span>
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
            {/* Hero */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6"
              >
                <Shield className="w-4 h-4 text-white/60" />
                <span className="text-white/60 text-xs font-light tracking-[0.2em] uppercase">
                  ANRF Proposal
                </span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
                Shodh AI <br />
                <span className="text-white font-normal text-3xl md:text-5xl mt-4 block">
                  Build in India. Make for the World.
                </span>
              </h1>
              <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed font-light mb-6">
                We are one of the 12 companies building Foundation Models under the India AI Mission. We are building the world's largest Large Physics Model (LPM) to transform how science, R&D, and manufacturing are done forever.
              </p>
              <p className="text-base text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
                Just as an LLM scales with text to understand language, our LPM scales with industrial simulation and real-world failure data to understand physics. We are drastically reducing the discovery-to-manufacturing timeline.
              </p>
            </div>
 
            <div className="max-w-5xl mx-auto space-y-16">
              
              {/* Chapter 1: Discovery vs Scale-up & TAM */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  The Reality & The Market
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-8 tracking-tight">
                  Discovery is solved. <span className="font-normal text-blue-400">Scale-up is not.</span>
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <div className="space-y-5 text-white/70 font-light leading-relaxed">
                    <p>A real example from our partner, Kiran Mazumdar-Shaw at Biocon / Syngene:</p>
                    <p>Making a life-saving drug typically takes a 16-step chemical batch process. It's slow and insanely expensive. Biocon has novel bio-enzymes that can cut that 16-step process down to just 3 steps.</p>
                    <p className="text-white font-medium text-lg border-l-2 border-blue-500/50 pl-4 py-1">So what's the problem? Scale-up.</p>
                    <p>When you take a delicate bio-enzyme out of the pristine lab and put it into a massive industrial steel reactor, the chaotic fluid dynamics and heat kill the enzyme. The drug fails. Scale-up is currently a multi-year, trial-and-error nightmare.</p>
                  </div>
                  
                  {/* Financial Impact Box (Udit's Feedback) */}
                  <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10">
                    <h3 className="text-white font-medium mb-6 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                      The Economic Impact of Shodh
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/50">Traditional US API Setup</span>
                          <span className="text-white/50 line-through">~$500 Million</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/70">Traditional India Setup</span>
                          <span className="text-white/70">~$100 Million</span>
                        </div>
                        <div className="flex justify-between text-lg font-medium text-emerald-400 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                          <span>With Shodh AI (Zero-Shot)</span>
                          <span>~$5 Million</span>
                        </div>
                      </div>

                      <div className="h-px w-full bg-white/10" />

                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-white/80 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          Discovery-to-Manufacturing Time
                        </h4>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 bg-white/5 h-12 rounded-lg relative overflow-hidden border border-white/10">
                            <div className="absolute inset-y-0 left-0 bg-white/20 w-full flex items-center px-3 text-xs text-white/60">5 Years (Standard)</div>
                          </div>
                          <div className="flex-1 bg-blue-500/20 h-12 rounded-lg relative overflow-hidden border border-blue-500/30">
                            <div className="absolute inset-y-0 left-0 bg-blue-500 w-[10%] shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
                            <div className="absolute inset-y-0 left-0 w-full flex items-center px-3 text-xs text-blue-100 font-medium">6 Months</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
 
              {/* Chapter 2: The Timeline / Landscape Graph */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Competitive Landscape
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
                  Mapping the Future of Science
                </h2>
                <p className="text-white/60 font-light mb-10 max-w-2xl">
                  Incredible companies are solving molecular discovery and early lab synthesis. But the trillion-dollar industrial manufacturing bottleneck remains empty. That is where Shodh AI lives.
                </p>
                
                {/* 2D Landscape Graph (Addressing Radical AI vs Shodh AI) */}
                <div className="relative w-full aspect-square md:aspect-[21/9] bg-[#050505] border-l-2 border-b-2 border-white/20 rounded-sm p-4 md:p-8 mt-12 mb-8">
                  {/* Grid lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                  
                  {/* Axis Labels */}
                  <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-white/40 tracking-[0.2em] uppercase font-medium whitespace-nowrap">
                    Complexity of Physics
                  </div>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-white/40 tracking-[0.2em] uppercase font-medium whitespace-nowrap">
                    Production Scale (Output)
                  </div>

                  {/* X Axis milestones */}
                  <div className="absolute -bottom-6 left-[10%] text-[10px] text-white/30">In-Silico (Digital)</div>
                  <div className="absolute -bottom-6 left-[50%] -translate-x-1/2 text-[10px] text-white/30">1 Gram (Test Tube)</div>
                  <div className="absolute -bottom-6 right-[10%] text-[10px] text-white/30">10,000 Tons (Factory)</div>

                  {/* Nodes */}
                  
                  {/* Isomorphic / Recursion */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute left-[15%] bottom-[20%] group"
                  >
                    <div className="w-4 h-4 rounded-full bg-purple-500/50 border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)] relative z-10" />
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-48 bg-black border border-white/10 p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                      <p className="text-purple-400 font-medium text-sm mb-1">Digital Discovery</p>
                      <p className="text-white text-xs mb-1">Isomorphic Labs, Recursion</p>
                      <p className="text-white/50 text-[10px]">Pure software play. Inventing molecules on a computer.</p>
                    </div>
                  </motion.div>

                  {/* Radical AI */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute left-[50%] bottom-[50%] -translate-x-1/2 group"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500/50 border-2 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)] relative z-10" />
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-56 bg-black border border-white/10 p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                      <p className="text-emerald-400 font-medium text-sm mb-1">Autonomous Lab Synthesis</p>
                      <p className="text-white text-xs mb-1">Radical AI, Lila Sciences</p>
                      <p className="text-white/50 text-[10px]">Using robotic labs to autonomously synthesize the first 1 gram of a novel molecule perfectly.</p>
                    </div>
                  </motion.div>

                  {/* Shodh AI */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute left-[85%] bottom-[85%] group"
                  >
                    <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-pulse blur-md" />
                    <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-[0_0_30px_rgba(59,130,246,0.8)] relative z-10" />
                    <div className="absolute top-10 right-0 w-64 bg-blue-950/40 backdrop-blur-md border border-blue-500/30 p-4 rounded-xl opacity-100 z-20">
                      <p className="text-blue-400 font-medium text-sm mb-1">Industrial Scale-Up</p>
                      <p className="text-white font-bold text-sm mb-2">SHODH AI</p>
                      <p className="text-blue-100/70 text-[11px] leading-relaxed">Designing the actual factory physics to manufacture 10,000 tons safely. A true Large Physics Model.</p>
                    </div>
                  </motion.div>

                  {/* Connecting dashed line indicating the flow */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      d="M 15% 20% C 30% 20%, 35% 50%, 50% 50% C 65% 50%, 70% 85%, 85% 85%" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.2)" 
                      strokeWidth="2" 
                      strokeDasharray="5,5" 
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              </motion.section>
 
              {/* Chapter 3: The Vision for India (Original Context) */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
              >
                <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
                  The Vision for India
                </h2>
                <div className="space-y-6 text-lg text-white/80 font-light leading-relaxed">
                  <p>
                    If India wants to transition from being the "outsourced manufacturer of the world" to the R&D and Patent Exporter of the world, we cannot rely on 10-year, trial-and-error scale-up cycles.
                  </p>
                  <p>
                    We need a Large Physics Model (LPM).
                  </p>
                  <p className="font-medium text-white">
                    An LPM gives India the power of Zero-Shot Discovery and Zero-Shot Manufacturing.
                  </p>
                  <p>
                    It means we don't just invent a new green hydrogen catalyst or a bio-enzyme; the AI simultaneously generates the exact, perfect physical blueprint to manufacture it at scale. We generate the IP, we own the patents locally, and we export the technology globally.
                  </p>
                </div>
              </motion.section>
 
              {/* Chapter 4: The Math & The Flywheel */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  How it Works
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
                  The Universal Physics Engine
                </h2>
                <p className="text-lg text-white/70 font-light leading-relaxed mb-10">
                  How can one AI model solve both battery degradation and pharmaceutical bioreactors? Because at the mesoscale, physics is universal. Whether it's an aerospace alloy or a pharma continuous-flow reactor, almost all industrial scale-up comes down to one core interaction: <span className="text-white font-medium">A solid reacting with a fluid inside a porous structure.</span>
                </p>
                
                {/* The Equations */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {[
                    { title: "Navier-Stokes", desc: "To understand how fluids move through pipes and how chemicals mix." },
                    { title: "Phase Field (Cahn-Hilliard)", desc: "Teaches the AI how materials separate, alloys solidify, and microstructures form." },
                    { title: "Solid Mechanics", desc: "Hooke's Law. To predict how a battery swells or an alloy cracks under pressure." },
                    { title: "Heat Transfer", desc: "Fourier's Law. Manufacturing is entirely about thermal gradients and cooling." },
                    { title: "Electromagnetism", desc: "Maxwell's Equations. Electrical fields and ion transport for EV batteries." },
                    { title: "Chemical Kinetics", desc: "Arrhenius equation. To predict exactly how fast a reaction will happen." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <h4 className="text-white font-medium mb-2">{item.title}</h4>
                      <p className="text-sm text-white/60 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* The Flywheel */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-blue-100 mb-2">The Data Flywheel</h3>
                    <p className="text-blue-100/70 font-light leading-relaxed">
                      We embed these equations into the neural network architecture and train it on synthetic simulations. As we deploy with customers, real-world factory failure data is fed back into the model. Just like an LLM, the LPM scales: <strong>more data = higher accuracy = faster scale-ups for the next customer.</strong>
                    </p>
                  </div>
                </div>
              </motion.section>
 
              {/* Chapter 5: The Blueprint (Original Context) */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  The Secret Sauce
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-8 tracking-tight">
                  The AlphaFold Blueprint
                </h2>
                
                <div className="bg-[#0b0b0b] border border-white/10 rounded-xl p-6 md:p-8 mb-10">
                  <div className="space-y-6 text-center text-lg">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <span className="text-white/60">DeepMind (Biology):</span>
                      <span className="bg-white/10 px-3 py-1 rounded">Real Lab Data (PDB)</span>
                      <span className="text-white/40">+</span>
                      <span className="bg-white/10 px-3 py-1 rounded">Synthetic Data</span>
                      <span className="text-white/40">=</span>
                      <span className="text-white font-medium">AlphaFold</span>
                    </div>
                    <div className="w-full h-px bg-white/10" />
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <span className="text-white">Shodh AI (Physics):</span>
                      <span className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded border border-blue-500/30">Real Lab Data (ANRF Lab)</span>
                      <span className="text-white/40">+</span>
                      <span className="bg-emerald-500/20 text-emerald-200 px-3 py-1 rounded border border-emerald-500/30">Synthetic Data (IndiaAI GPUs)</span>
                      <span className="text-white/40">=</span>
                      <span className="text-white font-medium">Large Physics Model</span>
                    </div>
                  </div>
                </div>
 
                <div className="grid md:grid-cols-2 gap-8 text-white/70 font-light leading-relaxed">
                  <div>
                    <h4 className="text-xl text-white font-medium mb-3">95% Massive Compute</h4>
                    <p>We use IndiaAI's 200,000 GPUs to run millions of synthetic physics simulations. This generates massive synthetic data cleanly and virtually for free.</p>
                  </div>
                  <div>
                    <h4 className="text-xl text-white font-medium mb-3">5% High-Fidelity Real Data</h4>
                    <p>To bridge the "Sim-to-Real" gap and stop AI hallucinations, we need real physical anchors. This is where we need ANRF. We need a pristine, robotic dataset of real-world materials and physical failures.</p>
                  </div>
                </div>
              </motion.section>
 
              {/* Chapter 6: Our AlphaFold Moment (The Proof) */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  The Proof
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tight">
                  Our AlphaFold Moment
                </h2>
                <p className="text-lg text-white/70 font-light leading-relaxed max-w-3xl mb-12">
                  We released our first Large Model with India AI at the summit, targeting the Silicon-Graphite Anode (the hardest problem in the battery world). 
                  <br/><br/>
                  <strong className="text-white font-medium">Generative Model:</strong> Generates Microstructure + Process of generation. <br/>
                  <strong className="text-white font-medium">Forward Model:</strong> Predicts cycle life from SEM image of battery anode half-cell.
                </p>
 
                <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-12">
                  {/* Step 1 */}
                  <div className="relative p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-400 font-medium text-sm">1</div>
                    <h3 className="text-xl font-medium text-white mb-6 pl-4">AI Generation</h3>
                    
                    <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
                      <p className="text-white/60 text-sm font-mono mb-2">/prompt</p>
                      <p className="text-white text-sm font-mono">"Generate microstructure & process for Si-Gr Anode."</p>
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
                    </div>
                  </div>
 
                  {/* Step 2 */}
                  <div className="relative p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-400 font-medium text-sm">2</div>
                    <h3 className="text-xl font-medium text-white mb-6 pl-4">Physical Build</h3>
                    
                    <div className="space-y-4 mb-6 flex-grow flex flex-col justify-center">
                      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] items-center">
                        <div className="space-y-2">
                          <p className="text-xs text-white/50 uppercase tracking-wider">Digital: AI</p>
                          <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black/40">
                            <img src="/GIFs_Microstrcuture/sample_003_20260206_125915_3d_render.gif" alt="AI-generated" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div className="hidden lg:flex items-center justify-center pt-6">
                          <div className="w-14 h-px bg-gradient-to-r from-indigo-300/70 to-emerald-300/70" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs text-white/50 uppercase tracking-wider">Physical: SEM</p>
                          <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black">
                            <img src="/REAL_SEM/sample_003_20260206_125915_sem_isosurface.png" alt="SEM" className="w-full h-full object-cover grayscale" />
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setExpandedAlphaFoldView("matrices")}
                        className="self-start inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xs uppercase tracking-[0.18em]"
                      >
                        <Maximize2 className="w-3.5 h-3.5" /> View all matrices
                      </button>
                    </div>
                  </div>
 
                  {/* Step 3 */}
                  <div className="relative p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30 text-rose-400 font-medium text-sm">3</div>
                    <h3 className="text-xl font-medium text-white mb-6 pl-4">The Real-World Test</h3>
                    
                    <div className="relative bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex-grow min-h-[260px] flex items-center justify-center overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setExpandedAlphaFoldView("chart")}
                        className="absolute top-3 left-3 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/70 hover:text-white hover:bg-black/50 transition-colors z-10 inline-flex items-center gap-2"
                      >
                        <Maximize2 className="w-3.5 h-3.5" /> Expand
                      </button>
                      <LineChart className="w-full h-full min-h-[260px]" />
                    </div>
                    
                    <div className="pt-4 border-t border-white/10 mt-auto text-center space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium tracking-[0.12em] uppercase">
                        <Zap className="w-3.5 h-3.5" />
                        <span>~70% Zero-Shot Accuracy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
 
              {/* Chapter 7: The ANRF Solution (Original Context) */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-light tracking-[0.2em] uppercase mb-6">
                  Building the National Asset
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-8 tracking-tight">
                  The ANRF Solution
                </h2>
                <p className="text-lg text-white/80 font-light leading-relaxed mb-10">
                  Other nations know the data bottleneck is the key. The US is backing massive autonomous labs. China has built city-sized automated facilities. India has the brains and the GPUs, but we are missing the automated physical data engine.
                  <br /><br />
                  We propose that Shodh AI and ANRF co-create a <strong>National Autonomous Lab Facility</strong>. 
                </p>
 
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
                  <h3 className="text-xl text-white font-medium mb-6 text-center">The Closed-Loop National Asset</h3>
                  <div className="grid md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-[#0a0a0a] rounded-xl border border-white/10 relative">
                      <BrainCircuit className="w-6 h-6 mx-auto mb-3 text-blue-400" />
                      <h4 className="text-white font-medium text-sm mb-1">1. AI Predicts</h4>
                      <p className="text-xs text-white/50">LPM designs 10,000 new materials</p>
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-white/20" />
                    </div>
                    <div className="p-4 bg-[#0a0a0a] rounded-xl border border-white/10 relative">
                      <Factory className="w-6 h-6 mx-auto mb-3 text-emerald-400" />
                      <h4 className="text-white font-medium text-sm mb-1">2. Robots Build</h4>
                      <p className="text-xs text-white/50">Automated synthesis 24/7</p>
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-white/20" />
                    </div>
                    <div className="p-4 bg-[#0a0a0a] rounded-xl border border-white/10 relative">
                      <Activity className="w-6 h-6 mx-auto mb-3 text-rose-400" />
                      <h4 className="text-white font-medium text-sm mb-1">3. Robots Test</h4>
                      <p className="text-xs text-white/50">Physical testing & failure logging</p>
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-white/20" />
                    </div>
                    <div className="p-4 bg-[#0a0a0a] rounded-xl border border-white/10">
                      <Database className="w-6 h-6 mx-auto mb-3 text-purple-400" />
                      <h4 className="text-white font-medium text-sm mb-1">4. AI Learns</h4>
                      <p className="text-xs text-white/50">Data feeds back into sovereign model</p>
                    </div>
                  </div>
                </div>
              </motion.section>
 
              {/* Chapter 8: The Ask / Closer (Original Context) */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-emerald-900/20 border border-white/20 text-center"
              >
                <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tight">
                  The Global Arms Race
                </h2>
                <p className="text-lg text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-10">
                  This specific combination—a Large Physics Model directly hooked up to robotic experimentation—is the absolute bleeding edge of global science. 
                  <br /><br />
                  If India only provides the GPUs, we will still be dependent on the West for physical data. By partnering with ANRF to build this Autonomous Lab, we combine IndiaAI's compute with a sovereign physical data engine. <strong>We don't just participate in the next industrial revolution; we own the operating system for it.</strong>
                </p>
                
                <a
                  href="mailto:arastu@shodh.ai"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all text-lg"
                >
                  <Mail className="w-5 h-5" />
                  Partner with Shodh AI
                </a>
              </motion.section>
            </div>
 
            {/* Modals for Chart and Matrices */}
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
                    </div>
                    <div className="p-6 md:p-10 grid gap-6 md:grid-cols-2">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={`matrix-pair-${i}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
                          <p className="text-xs text-white/45 uppercase tracking-[0.18em] mb-4">Sample {i + 1}</p>
                          <div className="grid gap-4 sm:grid-cols-2 items-center">
                            <div className="space-y-2">
                              <p className="text-[11px] text-white/50 uppercase tracking-[0.16em]">AI Generated</p>
                              <div className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/50">
                                <img src={`/GIFs_Microstrcuture/sample_00${i}_20260206_125915_3d_render.gif`} alt={`AI ${i+1}`} className="w-full h-full object-cover" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-[11px] text-white/50 uppercase tracking-[0.16em]">Real SEM</p>
                              <div className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-black">
                                <img src={`/REAL_SEM/sample_00${i}_20260206_125915_sem_isosurface.png`} alt={`SEM ${i+1}`} className="w-full h-full object-cover grayscale" />
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
 
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}