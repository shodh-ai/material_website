"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Battery, Zap, Shield, Cpu, Factory, Droplets, Thermometer, Timer, Layers, Box } from "lucide-react";

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const IP_TRACKS = [
  {
    number: "1",
    title: "The \"Self-Healing\" Elastomeric Semi-Solid Matrix",
    type: "Material IP",
    bottleneck: "Silicon anodes expand by up to 300% during cycling. Standard semi-solid gels tear or delaminate under this mechanical stress, killing the battery's cycle life. Chemists are currently bottlenecked by trial-and-error polymer mixing.",
    solution: "We couple our mesoscale physics engine (Cauchy Stress Tensors) with atomic generative AI. Instead of simulating failures, the AI inversely generates the exact viscoelasticity, cross-linking density, and polymer composition required to stretch 300% without structural tearing.",
    value: "Dominance in cycle-life for luxury OEMs.",
    outcome: "Composition of Matter Patent. A123 exclusively owns the chemical formula for a self-healing semi-solid matrix.",
    icon: Layers,
    color: "blue",
  },
  {
    number: "2",
    title: "The \"Ultra-Wetting\" Electrode Architecture",
    type: "Structural IP",
    bottleneck: "Semi-solid electrolytes are highly viscous (like honey). Injecting this gel into a dense Silicon anode takes hours of factory floor time, destroying throughput and risking lithium dendrites at dry spots.",
    solution: "Bounded by Navier-Stokes and Cahn-Hilliard phase-field mechanics, our generative model outputs the optimal 3D microscopic architecture. It calculates the exact calendering porosities and laser-etched micro-channel geometries required to create capillary vacuum forces that pull the thick gel into the electrode instantly.",
    value: "Drastically increases gigafactory units-per-hour (UPH) yield without altering the gel chemistry. Reduces electrolyte injection/wetting time from hours to minutes, multiplying factory line throughput by up to 10x without compromising density.",
    outcome: "Structural / Utility Patent. A123 patents the specific electrode 3D geometry optimized for high-viscosity gels.",
    icon: Droplets,
    color: "cyan",
  },
  {
    number: "3",
    title: "\"Flash Formation\" Protocol",
    type: "Process IP",
    bottleneck: "The first factory charge (Formation) builds the Solid-Electrolyte Interphase (SEI) layer. For complex semi-solid cells, this must be done incredibly slowly (1–3 weeks), tying up massive amounts of factory real estate, capital, and electricity.",
    solution: "Constrained by Fick's Law of diffusion and Butler-Volmer kinetics, our model inversely generates a proprietary electro-thermal charging algorithm. It outputs the precise millisecond Pulsed-Current sequence (current spikes + rests) required to force a perfect, stable SEI layer to grow in hours instead of weeks.",
    value: "Shrinks the formation phase from weeks to 24 hours. Massive reduction in Gigafactory OPEX and elimination of the largest physical bottleneck in battery mass production.",
    outcome: "Process Patent. A123 owns an exclusive charging algorithm that slashes formation time by up to 50%.",
    icon: Timer,
    color: "orange",
  },
  {
    number: "4",
    title: "The \"Silicon-Cage\" Calendering Parameters",
    type: "Process IP",
    bottleneck: "Balancing energy density with silicon expansion. If factory rollers pack the electrode too tight, the 300% expansion crushes the particles. If packed too loose, energy density drops.",
    solution: "Our core architecture recently achieved ~70% zero-shot accuracy predicting mechanical degradation in physical solid-state wet-lab builds. Ingesting A123's specific Silicon-to-Gel ratio, the LPM works backward from the point of fracture mechanics to output the precise, theoretically optimal mechanical pressure the gigafactory rollers must apply to create the perfect microscopic \"buffer void.\"",
    value: "Achieves \"Zero-Day Tech Transfer,\" bypassing dozens of expensive, scrapped physical pilot-plant runs. \"First-Time-Right\" mechanical tolerances. Eliminates 50+ trial-and-error pilot runs and reduces roll-to-roll scrap rates to near zero.",
    outcome: "Process Patent. A123 locks down the definitive manufacturing tolerances for stabilizing 20%+ Silicon anodes.",
    icon: Box,
    color: "violet",
  },
  {
    number: "5",
    title: "The \"Thermal Fortress\" Immersion Geometry",
    type: "System IP",
    bottleneck: "A123 is pioneering immersion cooling. Standard cell casings are not hydrodynamically optimized to transfer heat to immersion fluids during a thermal event.",
    solution: "We use inverse fluid dynamics to generate an optimized cell/pack casing exterior (e.g., micro-turbulence generators) that exponentially increases the convective heat transfer coefficient.",
    value: "Physically guarantees that thermal runaway cannot propagate from one cell to another. Unlocks the highly risk-averse luxury OEM market (Mercedes/Audi).",
    outcome: "System / Mechanical Patent on immersion-optimized battery architectures.",
    icon: Shield,
    color: "rose",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  blue:    { bg: "bg-blue-500/10",    border: "border-blue-500/20",    text: "text-blue-300",    glow: "shadow-[0_0_30px_rgba(59,130,246,0.1)]" },
  cyan:    { bg: "bg-cyan-500/10",    border: "border-cyan-500/20",    text: "text-cyan-300",    glow: "shadow-[0_0_30px_rgba(6,182,212,0.1)]" },
  orange:  { bg: "bg-orange-500/10",  border: "border-orange-500/20",  text: "text-orange-300",  glow: "shadow-[0_0_30px_rgba(249,115,22,0.1)]" },
  violet:  { bg: "bg-violet-500/10",  border: "border-violet-500/20",  text: "text-violet-300",  glow: "shadow-[0_0_30px_rgba(139,92,246,0.1)]" },
  rose:    { bg: "bg-rose-500/10",    border: "border-rose-500/20",    text: "text-rose-300",    glow: "shadow-[0_0_30px_rgba(244,63,94,0.1)]" },
};

export default function A123Page() {
  return (
    <div className="min-h-screen bg-[#060606] text-white selection:bg-white/30">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">Back</span>
          </Link>
          <span className="text-xs font-light tracking-[0.3em] uppercase text-white/30">Shodh AI × A123 Systems — Strategic IP Co-Creation</span>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden border-b border-white/5">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 mix-blend-screen" style={{ filter: 'brightness(1.5) contrast(1.2)' }}>
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060606]/50 to-[#060606] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,6,6,0.8)_100%)] pointer-events-none" />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-10">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white">Strategic Partnership Proposal</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-medium tracking-tighter mb-4 leading-[0.9] text-white drop-shadow-2xl">
            The Large<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30 italic font-light">
              Physics Model
            </span>
          </h1>
          <p className="text-lg md:text-xl font-mono text-white/40 mb-10 tracking-widest drop-shadow-md">(LPM)</p>
          
          <p className="text-xl md:text-3xl text-white/80 font-light max-w-3xl mx-auto mb-6 leading-relaxed drop-shadow-lg">
            Shodh AI × A123 Systems
          </p>
          <p className="text-lg text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
            Transforming Battery Physics into Proprietary Assets
          </p>
        </motion.div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-20 space-y-32">
        
        {/* Title Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12">
            <div className="text-2xl md:text-3xl font-light tracking-widest text-white/80">SHODH AI</div>
            <div className="text-white/20 text-xl md:text-2xl font-light">×</div>
            <div className="text-2xl md:text-3xl font-light tracking-widest text-white border-b border-white/20 pb-1 px-4 text-amber-400 text-center">
              A123 SYSTEMS
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <span className="px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-300/80 text-xs font-medium tracking-wide uppercase">
              Semi-Solid + Silicon
            </span>
            <span className="px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-300/80 text-xs font-medium tracking-wide uppercase">
              Zero-to-Billion IP
            </span>
          </div>
        </motion.section>

        {/* 1. The Core Paradigm Shift */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 opacity-5">
            <Battery className="w-96 h-96" />
          </div>

          <div className="relative z-10 space-y-12">
            {/* Sub-heading */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-light text-white/60 leading-tight">
                State of the Global Battery Landscape: <span className="text-amber-400">2026</span>
              </h2>
            </div>
            
            <span className="text-xs font-light tracking-[0.2em] uppercase text-amber-400 block">1. The Core Paradigm Shift</span>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight mb-8">
              The global race for the next-generation battery has moved from <span className="text-white font-normal">chemical discovery</span> to <span className="text-amber-400 font-normal">mesoscale manufacturability.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* All-Solid-State */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                  <span className="text-xs uppercase tracking-wider text-white/40">All-Solid-State</span>
                </div>
                <p className="text-white font-medium mb-2">Toyota</p>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  Stuck in lab delays (2027+). Requires entirely new, multi-billion-dollar dry-room and high-pressure sintering gigafactories.
                </p>
                <div className="mt-4 inline-block px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-300">
                  Not Ready
                </div>
              </div>

              {/* Liquid / LFP */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-white/40 rounded-full" />
                  <span className="text-xs uppercase tracking-wider text-white/40">Liquid / LFP</span>
                </div>
                <p className="text-white font-medium mb-2">CATL / BYD</p>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  Commoditized. A volume war won purely on scale and price.
                </p>
                <div className="mt-4 inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/50">
                  Saturated
                </div>
              </div>

              {/* Semi-Solid + Silicon */}
              <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 shadow-[0_0_40px_rgba(245,158,11,0.1)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  <span className="text-xs uppercase tracking-wider text-amber-400">Semi-Solid + Silicon</span>
                </div>
                <p className="text-white font-medium mb-2">The Frontier</p>
                <p className="text-white/80 font-light text-sm leading-relaxed">
                  The optimal "brownfield" technology. Delivers 350+ Wh/kg safely and can be manufactured on retrofitted liquid-battery lines.
                </p>
                <div className="mt-4 inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs text-amber-300">
                  The Opportunity
                </div>
              </div>
            </div>

            <div className="border-l-2 border-amber-500/30 pl-6 py-2">
              <p className="text-white/70 font-light text-lg leading-relaxed">
                Early movers (WeLion / NIO) have validated the chemistry in the real world, but are trapped at a <span className="text-white font-normal">boutique, high-cost price point</span> due to massive manufacturing bottlenecks.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 2. The A123 Opportunity */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-amber-400 mb-4 block">2. The A123 Opportunity</span>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              The company that wins is not the one that discovers the semi-solid chemistry;
            </h2>
            <h2 className="text-3xl md:text-5xl font-light text-amber-400 leading-tight mt-2">
              it is the company that masters the physics of manufacturing it at scale.
            </h2>
          </div>

          <div className="p-8 rounded-2xl bg-amber-500/5 border border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.05)]">
            <p className="text-white/80 font-light text-lg leading-relaxed text-center">
              A123's <span className="text-white font-medium">brownfield gigafactories</span> are the ultimate weapon, provided the physical scale-up bottlenecks 
              <span className="text-amber-400"> (gel wetting, silicon expansion, formation times)</span> can be mathematically solved.
            </p>
          </div>
        </motion.section>

        {/* 3. Shodh AI × A123: Strategic IP Co-Creation */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 md:p-16 rounded-3xl bg-gradient-to-b from-[#0a0a0a] to-[#111111] border border-white/10 relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05),transparent_50%)]"></div>
          
          <div className="relative z-10 space-y-10">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-amber-400 block">3. Shodh AI × A123 Systems</span>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              Strategic IP Co-Creation
            </h2>

            {/* Traditional R&D vs Shodh AI */}
            <div className="mb-8">
              <p className="text-white/50 font-light text-lg leading-relaxed mb-6">
                The traditional way of R&D is years of forward thinking — <span className="text-white/70">Parameter Guess → Simulate → Evaluate Failure → Iterate</span> — and building expensive pilot plants to do that.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 shadow-[0_0_40px_rgba(245,158,11,0.1)]">
              <h3 className="text-amber-300 font-medium mb-6 text-xl flex items-center gap-3">
                <Zap className="w-6 h-6" /> What Shodh AI Provides
              </h3>
              <p className="text-white/80 font-light leading-relaxed text-lg mb-6">
                A <span className="text-white font-medium">10-Billion Parameter Large Physics Model (LPM)</span> acting as a <span className="text-amber-400">Generative Inverse Compiler</span>. 
                We input the target physical outcome, and our AI works backward through the governing physics to generate the exact material compositions, structural architectures, and factory processes required.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                  <p className="text-xs uppercase tracking-wider text-white/40 mb-2">Input</p>
                  <p className="text-white/80 font-light text-sm">Target physical outcome (e.g., "zero micro-cracking at 300% expansion")</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <p className="text-xs uppercase tracking-wider text-amber-400/70 mb-2">Process</p>
                  <p className="text-white/80 font-light text-sm">LPM runs governing PDEs backward in milliseconds</p>
                </div>
                <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                  <p className="text-xs uppercase tracking-wider text-white/40 mb-2">Output</p>
                  <p className="text-white/80 font-light text-sm">Exact manufacturing parameters & 3D architectures</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-5 h-5 text-amber-400" />
                <span className="text-xs uppercase tracking-wider text-white/40">The Technology</span>
              </div>
              <p className="text-white/70 font-light leading-relaxed mb-4">
                With help of DeepMind and NVIDIA teams, Shodh AI is deploying the world's first <span className="text-white font-medium">Native-JAX Large Physics Model (LPM)</span>.
              </p>
              <p className="text-white/70 font-light leading-relaxed">
                We utilize <span className="text-amber-400">Inverse-Generative Diffusion Models</span>. The engineer inputs the target physical constraint 
                (e.g., "zero micro-cracking at 300% volume expansion" or "sub-10 minute electrolyte wetting"). 
                The LPM runs the governing PDEs <span className="text-white font-medium">(Navier-Stokes, Fick's Law, Solid Mechanics)</span> backward in milliseconds 
                to mathematically generate the precise manufacturing parameters and 3D architectures required to achieve that outcome.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 4. Zero-to-Billion IP Generation Tracks */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center mb-16">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-amber-400 mb-4 block">4. IP Generation Tracks</span>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-4">"Zero-to-Billion" IP Generation</h2>
            <p className="text-white/50 font-light max-w-2xl mx-auto">
              Transforming complex physics into proprietary assets.
            </p>
          </div>

          <div className="space-y-8">
            {IP_TRACKS.map((track, index) => {
              const colors = colorMap[track.color];
              const Icon = track.icon;
              return (
                <motion.div
                  key={track.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 rounded-3xl ${colors.bg} border ${colors.border} ${colors.glow}`}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Left: Number & Title */}
                    <div className="md:w-1/3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-full ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <span className={`text-xs uppercase tracking-wider ${colors.text}`}>{track.type}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-light text-white leading-tight">
                        {track.title}
                      </h3>
                    </div>

                    {/* Right: Details */}
                    <div className="md:w-2/3 space-y-6">
                      {/* Bottleneck */}
                      <div>
                        <p className="text-xs uppercase tracking-wider text-red-400/70 mb-2">The Technical Bottleneck</p>
                        <p className="text-white/60 font-light leading-relaxed text-sm">
                          {track.bottleneck}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                        <p className="text-xs uppercase tracking-wider text-amber-400/70 mb-2">The Shodh AI Inverse Engine</p>
                        <p className="text-white/80 font-light leading-relaxed text-sm">
                          {track.solution}
                        </p>
                      </div>

                      {/* Value & Outcome */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-emerald-400/70 mb-2">Value to A123</p>
                          <p className="text-white/70 font-light leading-relaxed text-sm">
                            {track.value}
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                          <p className="text-xs uppercase tracking-wider text-white/40 mb-1">IP Outcome</p>
                          <p className="text-white/80 font-light text-sm">
                            {track.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* 5. Summary */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-8 p-10 md:p-16 rounded-3xl bg-gradient-to-b from-amber-500/5 to-transparent border border-amber-500/10"
        >
          <span className="text-xs font-light tracking-[0.2em] uppercase text-amber-400 block">Summary</span>
          <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
            From Physics to Patents
          </h2>
          <p className="text-white/70 font-light text-lg max-w-3xl mx-auto leading-relaxed">
            We propose partnering with A123 to execute on these "Zero-to-Billion" IP generation tracks, 
            transforming complex physics into <span className="text-white font-normal">proprietary assets</span> that lock down the definitive manufacturing advantages for the semi-solid battery era.
          </p>
          
          <div className="pt-8">
            <a href="mailto:arastu@shodh.ai" className="bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 rounded-full font-medium transition-colors inline-flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Connect with Founder
            </a>
            <p className="text-white/40 text-sm mt-4 font-light">arastu@shodh.ai</p>
          </div>

          <div className="pt-16 border-t border-white/10 max-w-3xl mx-auto text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col">
              <span className="text-white font-medium text-xl">Arastu Sharma, PhD</span>
              <span className="text-white/50 font-light mt-1">Founder & CEO, Shodh AI</span>
            </div>
            
            <div className="flex flex-col md:items-end gap-2 text-sm">
              <a href="mailto:arastu@shodh.ai" className="text-amber-400 hover:text-amber-300 transition-colors">arastu@shodh.ai</a>
              <Link href="/demo" className="text-white/50 hover:text-white transition-colors underline underline-offset-4">
                Watch Shodh AI Demo
              </Link>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
