"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  BrainCircuit,
  Activity,
  Factory,
  Goal,
  Beaker,
  PlayCircle,
  Cpu,
  TrendingUp,
} from "lucide-react";
import VisualWorkflowPilots from "./VisualWorkflowPilots";

export default function EVAutomationProposalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a] text-white selection:bg-white/30">
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span className="text-sm font-light tracking-[0.2em] uppercase text-white/60">Banker Briefing</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20 space-y-32">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12">
            <div className="text-2xl md:text-3xl font-light tracking-widest text-white/80">SHODH AI</div>
            <div className="text-white/20 text-xl md:text-2xl font-light">×</div>
            <div className="text-2xl md:text-3xl font-light tracking-widest border-b border-white/20 pb-1 px-4 text-emerald-400 text-center uppercase">
              [TARGET COMPANY / BANKER NAME]
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight mb-6">
            The Large Physics Model (LPM) for Next-Gen EV Manufacturing.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              Accelerating Discovery-to-Gigafactory Scale-Up.
            </span>
          </h1>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 opacity-5">
            <BrainCircuit className="w-96 h-96" />
          </div>

          <div className="mb-16 relative z-10 space-y-6">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-emerald-400 block">Section 1: The Introduction / The Mandate</span>
            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight mb-6">
              World’s First Generative Physics Platform
            </h2>
            <p className="text-xl text-white/80 font-light leading-relaxed max-w-4xl">
              AI has mastered language (LLMs) and code. Shodh AI is mastering the physical world. As one of the 12 elite companies mandated by the IndiaAI Mission, and equipped with priority access to India’s massive 200,000 GPU cluster, we are building the world’s first Large Physics Model (LPM).
            </p>
            <p className="text-white/60 font-light leading-relaxed max-w-4xl">
              We do not discover novel chemistries and stop there. We bridge the trillion-dollar void between Discovery and Manufacturing. We translate digital discoveries into physical, manufacturable reality.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-red-400 mb-4 block">Section 2: The Bottleneck & The Financial Impact</span>
            <h2 className="text-3xl md:text-4xl font-light text-white">The "Gigafactory Valley of Death"</h2>
            <p className="text-white/40 font-light mt-4">(Udit's ROI Requirement)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Beaker className="w-5 h-5 text-white/40" />
                The Bottleneck
              </h3>
              <p className="text-white/60 font-light leading-relaxed">
                Currently, US automakers and battery startups invest billions discovering novel solid-state or high-silicon chemistries. But translating a successful "coin-cell" discovery into Gigafactory-level yield takes 7 to 10 years and $1B+ in CapEx.
              </p>
              <p className="text-white/60 font-light leading-relaxed mt-4">
                The bottleneck is engineering, not chemistry. When novel materials scale up, the mesoscale physics-microstructure cracking, fluid dynamics, porosity, and heat transfer-cause massive defect rates and scrap.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)]">
              <h3 className="text-red-300 font-medium mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-400" />
                The Shodh AI Financial Impact
              </h3>
              <ul className="space-y-5 text-white/80 font-light leading-relaxed">
                <li>
                  <strong className="text-white font-medium">Our Large Physics Model generates the exact manufacturing architecture to scale the chemistry on day one.</strong>
                </li>
                <li>
                  <strong className="text-emerald-300 font-medium">Time Compressed:</strong> We reduce the discovery-to-manufacturing scale-up timeline from 5+ years to 6 months.
                </li>
                <li>
                  <strong className="text-emerald-300 font-medium">CapEx Saved:</strong> By replacing physical trial-and-error with "Zero-Shot" in-silico engineering, we save OEMs $300M to $500M in wasted pilot-plant CapEx and scrap rates.
                </li>
                <li>
                  <strong className="text-white font-medium">The Result:</strong> US automakers can bypass the scale-up bottleneck and compete directly with established Asian supply chains.
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center mb-16">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-emerald-400 mb-4 block">Section 3: The Tech / How It Works</span>
            <h2 className="text-3xl md:text-5xl font-light text-white">The Anatomy of Zero-Shot Manufacturing</h2>
            <p className="text-white/50 font-light mt-4 max-w-3xl mx-auto">From Trial-and-Error to Software-Defined Scale-Up.</p>
          </div>

          <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.08)] max-w-4xl mx-auto">
            <p className="text-white/90 font-light leading-relaxed text-lg">
              How does a Large Physics Model work? It scales with real-world physics data. We pre-train our neural networks on massive synthetic simulations of core physics equations (Navier-Stokes, Fick’s Law, Fourier’s heat transfer).
            </p>
          </div>

          <div className="w-[100vw] relative left-1/2 right-1/2 -mx-[50vw] bg-white/[0.02] border-y border-white/5 py-16 mb-4">
            <VisualWorkflowPilots />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                <Cpu className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-white font-medium mb-3 text-xl">The 3D Microstructure</h3>
              <p className="text-white/70 font-light leading-relaxed">
                When an OEM provides a target chemistry, Shodh AI's Inverse Generative Engine outputs: The 3D Microstructure: The optimal physical architecture to prevent degradation (e.g., solid-state cracking).
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                <Factory className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-white font-medium mb-3 text-xl">The Process Compiler (The Factory Recipe)</h3>
              <p className="text-white/70 font-light leading-relaxed">
                The exact, human-readable manufacturing parameters required to build it (e.g., Calendering pressure: 0.8, Binder ratio: 5%, Temperature: 120°C).
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/5"
        >
          <div className="mb-12 text-center">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-emerald-400 mb-4 block">Section 4: The Proof</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Our "AlphaFold Moment" for Batteries</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-xs text-emerald-400 uppercase tracking-widest mb-2 font-medium">The AI Prediction</div>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                Our LPM generated 5 novel battery architectures and their manufacturing recipes, blindly predicting their exact physical capacity fade and failure points.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-xs text-cyan-400 uppercase tracking-widest mb-2 font-medium">The Physical Build</div>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                We built the 30 physical cells in our wet lab using the AI's exact factory parameters.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
              <div className="text-xs text-emerald-300 uppercase tracking-widest mb-2 font-medium">The Result</div>
              <p className="text-white/90 font-light text-sm leading-relaxed">
                The physical battery degradation perfectly mirrored our AI's digital prediction with ~70% zero-shot accuracy. We successfully proved that Gigafactory-level physical failure can be predicted and solved entirely in software.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-emerald-400 mb-4 block">Section 5: Traction & Trust</span>
            <h2 className="text-3xl md:text-4xl font-light text-white">Trusted by Industry Titans</h2>
            <p className="text-white/50 font-light mt-4 max-w-3xl mx-auto">
              We use a federated co-creation model, deploying our AI into the secure servers of global giants to solve their scale-up bottlenecks while maintaining 100% data privacy for their IP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-xs text-purple-400 uppercase tracking-widest mb-2 font-medium">Biopharma</div>
              <h4 className="text-lg text-white font-medium mb-3">Biocon / Syngene</h4>
              <p className="text-white/60 font-light text-sm leading-relaxed">Co-creating generative continuous-flow biomanufacturing.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-xs text-blue-400 uppercase tracking-widest mb-2 font-medium">Specialty Chemicals</div>
              <h4 className="text-lg text-white font-medium mb-3">Aarti Industries ($3B+ Chem Giant)</h4>
              <p className="text-white/60 font-light text-sm leading-relaxed">Co-creating chemical scale-up architectures.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-xs text-emerald-400 uppercase tracking-widest mb-2 font-medium">Active Pipeline</div>
              <h4 className="text-lg text-white font-medium mb-3">Board-Level Discussions</h4>
              <p className="text-white/60 font-light text-sm leading-relaxed">Board-level LOI discussions with top-tier global automakers,advanced chemicals, and Big Pharma.</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/5"
        >
          <div className="mb-12">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-emerald-400 mb-4 block">Section 6: The Ask</span>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">The 30-Day "In-Silico" Co-Creation Pilot</h2>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 items-center">
              <div className="w-12 h-12 rounded-full bg-white/5 text-white/50 flex items-center justify-center shrink-0 font-medium text-lg">1</div>
              <div>
                <h4 className="text-lg text-white font-medium flex items-center gap-2"><Goal className="w-5 h-5 text-white/50" /> Input (OEM)</h4>
                <p className="text-white/60 font-light text-sm mt-1">Provide a target chemistry (e.g., solid-state, high-silicon anode, sodium) that is struggling to scale or yield.</p>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 items-center shadow-[0_0_20px_rgba(16,185,129,0.05)]">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-medium text-lg">2</div>
              <div>
                <h4 className="text-lg text-white font-medium flex items-center gap-2"><TrendingUp className="w-5 h-5 text-emerald-400" /> Intelligence (Shodh AI)</h4>
                <p className="text-white/80 font-light text-sm mt-1">Large Physics Model optimised on specific scale-up target</p>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 items-center">
              <div className="w-12 h-12 rounded-full bg-white/5 text-white/50 flex items-center justify-center shrink-0 font-medium text-lg">3</div>
              <div>
                <h4 className="text-lg text-white font-medium flex items-center gap-2"><Factory className="w-5 h-5 text-white/50" /> Output (The Blueprint)</h4>
                <p className="text-white/60 font-light text-sm mt-1">We deliver the optimized 3D physical architecture and the exact manufacturing parameters (pressures, thermodynamics, binder ratios) required to successfully manufacture it at scale.</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <span className="text-xs font-light tracking-[0.2em] uppercase text-emerald-400 block">Next Steps</span>
          <h2 className="leading-tight">
            <span className="text-white text-4xl md:text-5xl font-medium mt-4 block">Unlock Your Breakthroughs Now.</span>
          </h2>

          <div className="py-8">
            <a href="mailto:arastu@shodh.ai?subject=Schedule%20Board%20Briefing%20-%20EV%20Automation%20Proposal" className="bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 rounded-full font-medium transition-colors inline-flex items-center gap-2">
              <PlayCircle className="w-5 h-5" />
              Schedule Board Briefing
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
