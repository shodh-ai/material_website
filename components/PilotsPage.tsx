"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Building2, TestTube, Cpu, Zap, Beaker, Factory } from "lucide-react";
import VisualWorkflowPilots from "./VisualWorkflowPilots";
import VisualWorkflowPharma from "./VisualWorkflowPharma";

export default function PilotsPage() {
  const [industry, setIndustry] = useState<"pharma" | "battery">("pharma");

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
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <span className="text-sm font-light tracking-[0.2em] uppercase text-white/60">Pilot Partnership</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20 space-y-32">
        
        {/* Slide 1: Title (Common) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="text-3xl font-light tracking-widest text-white/80">SHODH AI</div>
            <div className="text-white/20 text-2xl font-light">X</div>
            <div className="text-3xl font-light tracking-widest text-white border-b border-white/20 pb-1 px-4">
              [CUSTOMER NAME]
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-tight">
            Accelerating Manufacturing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Scale-Up & Tech Transfer.
            </span>
          </h1>
          
          <div className="pt-12 inline-flex items-center gap-6 px-6 py-3 rounded-full bg-white/[0.02] border border-white/5 text-sm text-white/50 font-light tracking-widest uppercase">
            <span>Partnered with</span>
            <span className="text-white/80 font-medium">IndiaAI</span>
            <span className="text-white/20">&</span>
            <span className="text-white/80 font-medium">NVIDIA</span>
          </div>
        </motion.section>

        {/* Slide 2: The Problem */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/5"
        >
          <div className="mb-12">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-red-400 mb-4 block">The "Scale-Up Trap"</span>
            <h2 className="text-3xl md:text-4xl font-light text-white">Why Manufacturing Projects Get Delayed.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-white/50" />
                  The Reality
                </h3>
                <p className="text-white/60 font-light leading-relaxed">
                  "In the lab, everything works perfectly. But when you move to the factory floor, physics changes. The 'Scale-Up' Gap is Costing Billions."
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Factory className="w-4 h-4 text-white/50" />
                  Trial & Error
                </h3>
                <p className="text-white/60 font-light leading-relaxed">
                  You spend 6–18 months running pilot batches to get the recipe right.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 font-bold">Time</span>
                </div>
                <div>
                  <p className="text-white/80 font-light leading-relaxed">
                    <strong className="text-white font-medium">3-5 years lost</strong> in formulation and tech-transfer.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 font-bold">Yield</span>
                </div>
                <div>
                  <p className="text-white/80 font-light leading-relaxed">
                    <strong className="text-white font-medium">Millions lost.</strong> Every failed batch and delayed "First-to-File" opportunities in a commercial reactor/line costs Millions.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 font-bold">Risk</span>
                </div>
                <div>
                  <p className="text-white/80 font-light leading-relaxed">
                    <strong className="text-white font-medium">Trial-and-error</strong> is no longer a viable strategy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Slide 3: How it Works */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-24"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Translating Intent to Reality</h2>
            <p className="text-white/50 font-light max-w-2xl mx-auto">From multi-physics inputs to guaranteed manufacturing yield.</p>
          </div>

          <div className="w-[100vw] relative left-1/2 right-1/2 -mx-[50vw] bg-white/[0.02] border-y border-white/5 py-12">
            <VisualWorkflowPilots />
          </div>

          <div className="w-[100vw] relative left-1/2 right-1/2 -mx-[50vw] py-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-light text-white">Complex Physics into Perfect Formulations</h3>
            </div>
            <VisualWorkflowPharma />
          </div>
        </motion.section>

        {/* Industry Toggle Section */}
        <section className="scroll-mt-32" id="industry-specific">
          <div className="flex justify-center mb-16">
            <div className="inline-flex p-1 bg-white/[0.05] rounded-xl border border-white/10">
              <button
                onClick={() => setIndustry("pharma")}
                className={`flex items-center gap-2 px-8 py-4 rounded-lg text-sm font-medium transition-all ${
                  industry === "pharma" 
                    ? "bg-white text-black shadow-lg" 
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.05]"
                }`}
              >
                <Beaker className="w-4 h-4" />
                Pharma
              </button>
              <button
                onClick={() => setIndustry("battery")}
                className={`flex items-center gap-2 px-8 py-4 rounded-lg text-sm font-medium transition-all ${
                  industry === "battery" 
                    ? "bg-white text-black shadow-lg" 
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.05]"
                }`}
              >
                <Zap className="w-4 h-4" />
                Battery
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {industry === "pharma" ? (
              <motion.div
                key="pharma"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-16"
              >
                {/* Pharma Slide 4 */}
                <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-light tracking-[0.2em] uppercase text-blue-400 mb-4 block">The Vision – Why This Changes Your P&L</span>
                  <h2 className="text-3xl font-light text-white mb-10">From "Lab-Scale" to "Global Dominance."</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <div className="text-blue-400 font-medium">Value Prop 1</div>
                      <h4 className="text-xl text-white font-light">Zero-Shot Scale-Up</h4>
                      <p className="text-white/60 font-light text-sm leading-relaxed">
                        We predict exactly how a drug will formulate in a 5,000L reactor before you even turn it on.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="text-blue-400 font-medium">Value Prop 2</div>
                      <h4 className="text-xl text-white font-light">Kill the Pilot Plant Bottleneck</h4>
                      <p className="text-white/60 font-light text-sm leading-relaxed">
                        Reduce physical experiments by 90%. Your existing infrastructure can now handle 10x the projects.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="text-blue-400 font-medium">Value Prop 3</div>
                      <h4 className="text-xl text-white font-light">First-to-Market</h4>
                      <p className="text-white/60 font-light text-sm leading-relaxed">
                        In the generics and biosimilars game, speed is everything. We cut your CMC timeline from years to months.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pharma Slide 5 */}
                <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/20 relative overflow-hidden">
                  <Cpu className="absolute -bottom-10 -right-10 w-64 h-64 text-blue-500/5" />
                  <span className="text-xs font-light tracking-[0.2em] uppercase text-blue-400 mb-4 block relative z-10">The Offer – A "Closed-Loop" Private Brain</span>
                  <h2 className="text-3xl font-light text-white mb-8 relative z-10">We Build Your Proprietary AI.</h2>
                  
                  <div className="space-y-8 relative z-10">
                    <div>
                      <h4 className="text-white font-medium mb-2">The Concept</h4>
                      <p className="text-white/60 font-light">A dedicated AI brain for your Manufacturing Plant.</p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">The Mechanism</h4>
                      <ul className="space-y-2 text-white/60 font-light list-disc list-inside ml-4">
                        <li>We deploy the Skanda Foundation Model securely.</li>
                        <li>We train it on your specific formulation data (mixer speeds, compression forces, excipient ratios).</li>
                      </ul>
                    </div>
                    <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                      <h4 className="text-blue-300 font-medium mb-2">Result</h4>
                      <p className="text-white/80 font-light">
                        A specialized <strong className="text-white">"Your AI"</strong> that understands the unique physics of your factory. It becomes your permanent IP asset. No competitor ever gets access to your model.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pharma Slide 6 */}
                <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-light tracking-[0.2em] uppercase text-blue-400 mb-4 block">The Long-Term Partnership</span>
                  <h2 className="text-3xl font-light text-white mb-10">A Multi-Year Strategic Advantage.</h2>
                  
                  <div className="space-y-6">
                    <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-medium shrink-0">1</div>
                      <div>
                        <h4 className="text-lg text-white font-medium mb-2">Phase 1 (The Pilot - 90 Days)</h4>
                        <p className="text-white/60 font-light">We prove the value. We take one "problem formulation" and solve the scale-up issue.</p>
                      </div>
                    </div>
                    <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-medium shrink-0">2</div>
                      <div>
                        <h4 className="text-lg text-white font-medium mb-2">Phase 2 (The Platform)</h4>
                        <p className="text-white/60 font-light">We deploy the AI across all your manufacturing sites.</p>
                      </div>
                    </div>
                    <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-medium shrink-0">3</div>
                      <div>
                        <h4 className="text-lg text-white font-medium mb-2">Phase 3 (The Future)</h4>
                        <p className="text-white/60 font-light"><strong className="text-white">"Inverse Design."</strong> You tell the AI what drug performance you need, and the AI invents the formulation for you.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="battery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-16"
              >
                {/* Battery Slide 4 */}
                <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-light tracking-[0.2em] uppercase text-green-400 mb-4 block">The Vision – Why This Changes Your P&L</span>
                  <h2 className="text-3xl font-light text-white mb-10">Out-Innovate the Global Competition.</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <div className="text-green-400 font-medium">Value Prop 1</div>
                      <h4 className="text-xl text-white font-light">Virtual Commissioning</h4>
                      <p className="text-white/60 font-light text-sm leading-relaxed">
                        Predict how a new slurry will mix, coat, and dry before you waste expensive raw materials.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="text-green-400 font-medium">Value Prop 2</div>
                      <h4 className="text-xl text-white font-light">Yield Maximization</h4>
                      <p className="text-white/60 font-light text-sm leading-relaxed">
                        Identify the invisible micro-defects (cracking, tortuosity) that kill battery life before they leave the factory.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="text-green-400 font-medium">Value Prop 3</div>
                      <h4 className="text-xl text-white font-light">Vendor Independence</h4>
                      <p className="text-white/60 font-light text-sm leading-relaxed">
                        Don't rely on Chinese technology transfers. Build your own IP and process knowledge.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Battery Slide 5 */}
                <div className="p-10 rounded-3xl bg-gradient-to-br from-green-900/10 to-transparent border border-green-500/20 relative overflow-hidden">
                  <Building2 className="absolute -bottom-10 -right-10 w-64 h-64 text-green-500/5" />
                  <span className="text-xs font-light tracking-[0.2em] uppercase text-green-400 mb-4 block relative z-10">The Offer – A "Closed-Loop" Private Brain</span>
                  <h2 className="text-3xl font-light text-white mb-8 relative z-10">We Build Your Proprietary AI.</h2>
                  
                  <div className="space-y-8 relative z-10">
                    <div>
                      <h4 className="text-white font-medium mb-2">The Concept</h4>
                      <p className="text-white/60 font-light">A dedicated AI brain for your Gigafactory.</p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">The Mechanism</h4>
                      <ul className="space-y-2 text-white/60 font-light list-disc list-inside ml-4">
                        <li>We deploy the Skanda Foundation Model securely.</li>
                        <li>We train it on your specific line data (mixing speeds, oven temps, formation data).</li>
                      </ul>
                    </div>
                    <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                      <h4 className="text-green-300 font-medium mb-2">Result</h4>
                      <p className="text-white/80 font-light">
                        A specialized <strong className="text-white">"Your AI"</strong> that understands the unique physics of your factory. It becomes your permanent IP asset.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Battery Slide 6 */}
                <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-light tracking-[0.2em] uppercase text-green-400 mb-4 block">The Long-Term Partnership</span>
                  <h2 className="text-3xl font-light text-white mb-10">A Multi-Year Strategic Advantage.</h2>
                  
                  <div className="space-y-6">
                    <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center font-medium shrink-0">1</div>
                      <div>
                        <h4 className="text-lg text-white font-medium mb-2">Phase 1 (The Pilot - 90 Days)</h4>
                        <p className="text-white/60 font-light">We optimize one specific cell chemistry or process step to prove yield improvement.</p>
                      </div>
                    </div>
                    <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center font-medium shrink-0">2</div>
                      <div>
                        <h4 className="text-lg text-white font-medium mb-2">Phase 2 (The Platform)</h4>
                        <p className="text-white/60 font-light">Real-time integration into the Gigafactory (The "AI Factory Guard").</p>
                      </div>
                    </div>
                    <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center font-medium shrink-0">3</div>
                      <div>
                        <h4 className="text-lg text-white font-medium mb-2">Phase 3 (The Future)</h4>
                        <p className="text-white/60 font-light"><strong className="text-white">Generative Design.</strong> The AI invents new battery architectures for you that don't exist yet.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Call to Action */}
        <section className="text-center py-20">
          <h2 className="text-4xl font-light text-white mb-8">Ready to Transform Your Manufacturing?</h2>
          <button className="px-8 py-4 bg-white text-black rounded-lg font-medium text-lg hover:bg-white/90 transition-colors inline-flex items-center gap-2">
            Let's sign the LOI
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>
        </section>

      </main>
    </div>
  );
}
