"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Atom, Battery, Beaker, Cpu, Factory, GitBranch, Layers, Rocket, ServerCog, ShieldCheck, Zap } from "lucide-react";

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const architecture = [
  {
    label: "Layer 1",
    title: "The Discovery Layer",
    Icon: Atom,
    color: "blue",
    body: "Integrating across atomic/molecule discovery models (biology, materials, chemicals) to intake novel structural targets.",
  },
  {
    label: "Layer 2",
    title: "The Mesoscale Physics Engine",
    Icon: Layers,
    color: "rose",
    body: "The core bridge. Modeling the chaotic physical lab environment in simulation to reduce wet-lab experimentation requirements by an order of magnitude.",
  },
  {
    label: "Layer 3",
    title: "The Control Layer",
    Icon: Cpu,
    color: "emerald",
    body: "Translating the simulated physics into exact, real-time factory process control parameters (temperature gradients, flow rates, pressure).",
  },
  {
    label: "Layer 4",
    title: "The Digital Twin Layer",
    Icon: Factory,
    color: "violet",
    body: "Providing dynamic, physics-enabled digital twin capability for the entire macro production setup of the factory.",
  },
];

const moatCards = [
  {
    title: "Supercomputer Math on AI Hardware",
    subtitle: "The Shifted-FP32 D3Q27 Cumulant Engine.",
    Icon: ServerCog,
    color: "blue",
    body: "We mathematically compress FP64 (Double Precision) calculations into FP32 memory by storing only the deviation from the rest state. This allows our engine to run natively on Google TPUs and NVIDIA B200s, unlocking a 10x-50x speedup without sacrificing thermodynamic accuracy.",
  },
  {
    title: "Surviving Extreme Turbulence",
    subtitle: "Cumulant Collision Operators.",
    Icon: Zap,
    color: "rose",
    body: "Legacy software tears itself apart at high Reynolds numbers. By upgrading to a D3Q27 lattice and replacing standard MRT with Cumulant operators, our model strips out \"ghost\" numerical noise, remaining totally stable during violent, industrial-scale fluid flows.",
  },
  {
    title: "Zero Spurious Currents",
    subtitle: "Cahn-Hilliard Phase-Field Integration.",
    Icon: ShieldCheck,
    color: "cyan",
    body: "We ripped out outdated multiphase models and wired in the 2024 SOTA Cahn-Hilliard equations. Spurious currents (\"fake wind\") drop from Mach-level errors down to near absolute zero. Bubbles, droplets, and chemicals now act like real physics instead of pixelated approximations.",
  },
  {
    title: "Hyperscale Domain Decomposition",
    subtitle: "64-TPU Pod Native.",
    Icon: GitBranch,
    color: "emerald",
    body: "Engineered entirely in Google JAX. Using jax.shmap primitives, our spatial domain decomposition naturally splits massive 3D factory simulations across interconnected 64-TPU Pods.",
  },
];

const anchors = [
  {
    name: "Biocon",
    vertical: "Bio-Enzymes & Biologicals",
    problem: "Bioreactor Scale-Up",
    detail: "Deploying the World Foundational Model to scale complex biologicals from lab synthesis to commercial bioreactors.",
    color: "blue",
    Icon: Beaker,
  },
  {
    name: "Aarti Industries",
    vertical: "Specialty Chemicals",
    problem: "Chemical Meso-Scale Production",
    detail: "Solving heat, pressure, and flow bottlenecks in high-stress chemical reactions at scale.",
    color: "rose",
    Icon: Factory,
  },
  {
    name: "Jubilant Ingrevia",
    vertical: "Agro-Pharma & CDMO",
    problem: "Accelerating Continuous Manufacturing",
    detail: "Transforming slow batch reactions into continuous flow chemistry at industrial scale.",
    color: "emerald",
    Icon: Beaker,
  },
  {
    name: "A123 Systems (USA)",
    vertical: "Advanced Battery Manufacturing",
    problem: "Quantum-to-Macro Scale-up Instability",
    detail: "Using the Mesoscale Physics Engine to stabilize the production of next-generation battery chemistries. While discovery AI finds new anode molecules, A123 utilizes Shodh AI to model the physical production environment, ensuring the molecule’s structural integrity survives the chaotic heat and pressure of a commercial chemical reactor.",
    trigger: "Compressing battery scale-up timelines from 2 years of manual iteration down to a 3-month digital-to-physical loop, accelerating time-to-market for US electric vehicle and grid storage systems.",
    color: "cyan",
    Icon: Battery,
  },
];

const examples = [
  "A biocatalyst works in a vial, but enzyme activity collapses when shear stress and thermal gradients appear inside a production bioreactor.",
  "A specialty chemical route is stable in bench chemistry, but runaway heat release makes the same reaction unsafe in continuous industrial flow.",
  "A battery anode works perfectly at the atomic level but becomes highly unstable in a physical chemical reactor.",
  "A novel aerospace alloy looks optimal in simulation, but micro-fractures emerge when cooling rates vary across a full-scale manufacturing line.",
];

export default function CommercialPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div className="min-h-screen bg-[#060606] text-white overflow-x-hidden" style={{ cursor: "none" }}>
      <div className="pointer-events-none fixed z-[9999] transition-transform duration-75" style={{ left: mousePos.x, top: mousePos.y, transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.14) 16%, rgba(255,255,255,0.05) 42%, transparent 70%)" }} />
      <div className="pointer-events-none fixed z-[9999]" style={{ left: mousePos.x, top: mousePos.y, transform: "translate(-50%,-50%)", width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.8)" }} />

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/45 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/insider" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Insider</span>
          </Link>
          <p className="text-xs text-white/40 font-mono tracking-widest">SHODH AI - CONFIDENTIAL</p>
        </div>
      </header>

      <section className="min-h-screen flex items-center justify-center px-6 text-center relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-55 mix-blend-screen" style={{ filter: "brightness(1.45) contrast(1.15)" }}>
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060606]/55 to-[#060606] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,6,6,0.86)_100%)] pointer-events-none" />
        </div>
        <div className="absolute top-1/4 -left-32 w-[34rem] h-[34rem] rounded-full bg-rose-500/10 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/5 -right-32 w-[34rem] h-[34rem] rounded-full bg-emerald-500/10 blur-[140px] pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center pt-24 pb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-10">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white">CONFIDENTIAL COMMERCIAL BRIEFING</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter mb-6 leading-[0.9] drop-shadow-2xl">
            The World Foundational<br />
            <span className="italic font-light text-rose-300">Model</span>
          </h1>
          <p className="text-xl md:text-3xl text-white/75 font-light max-w-3xl mx-auto mb-10 leading-tight italic drop-shadow-lg">
            From Molecule Discovery to Physical<br className="hidden md:block" /> Factory Production.
          </p>
          <p className="text-base md:text-xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed">
            We are building the end-to-end continuous physics engine. We reduce the time-to-solution from discovery to physical realization from <span className="text-rose-300 font-medium">2.5 years</span> to <span className="text-emerald-300 font-medium">under 3 months.</span>
          </p>
        </motion.div>
      </section>

      {/* The Validation */}
      <section className="py-28 px-6 md:px-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div {...fade} className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-8">The Validation</p>
            <div className="grid md:grid-cols-2 gap-4 mb-6 max-w-4xl mx-auto">
              <div className="p-5 rounded-2xl border border-white/20 bg-white/[0.05] text-center">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Built With</p>
                <p className="text-white font-medium text-sm">NVIDIA & Google DeepMind</p>
              </div>
              <div className="p-5 rounded-2xl border border-white/20 bg-white/[0.05] text-center">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Backed By</p>
                <p className="text-white font-medium text-sm">Sovereign IndiaAI Mission (Priority National Compute)</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-white/15 bg-white/[0.03] text-center max-w-4xl mx-auto mb-10">
              <p className="text-white/60 text-xs uppercase tracking-wider mb-3">The SOTA</p>
              <p className="text-white font-light text-base leading-relaxed">
                Validated in architectural reviews with <span className="text-white font-semibold">Google DeepMind</span> as a global first - the world's first unification of 3D mesoscale physics and generative inverse-design at foundation scale.
              </p>
            </div>
            {/* Logos */}
            <div className="flex flex-wrap items-center justify-center gap-8">
              {[
                { src: "/demo/nvidia-partner-logo.png", alt: "NVIDIA", className: "h-10 max-w-[168px]" },
                { src: "/DeepMind_logo.png", alt: "Google DeepMind", className: "h-8 max-w-[120px]" },
                { src: "/india-ai-logo-650x311.png", alt: "IndiaAI", className: "h-8 max-w-[120px]" },
              ].map((logo) => (
                <div key={logo.alt} className={`${logo.alt === "NVIDIA" ? "h-10" : "h-8"} flex items-center opacity-70 hover:opacity-100 transition-opacity duration-200`}>
                  <img src={logo.src} alt={logo.alt} className={`${logo.className} w-auto object-contain`} style={{ filter: "brightness(0) invert(1)" }} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Identity - IndiaAI Mission */}
      <section className="py-28 px-6 md:px-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[550px] h-[550px] rounded-full bg-rose-500/5 blur-[150px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div {...fade}>
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">Identity</p>
            <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-16 max-w-4xl">
              Backed by the IndiaAI Mission.<br />
              <span className="font-normal">Built in India. For the World.</span>
            </h2>
            <div className="space-y-8 max-w-3xl">
              {[
                "One of 12 foundational model teams selected by the sovereign IndiaAI Mission - with priority access on national GPU compute.",
                "Mandate to build AI for Science - the foundation model for the physical world.",
                "Founder Pedigree: PhD, Cambridge University - Material Science & Photonic Engineering. Former Microsoft Research.",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-white/50 mt-2.5 shrink-0" />
                  <p className="text-white/70 font-light leading-relaxed text-lg md:text-xl">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-28 px-6 md:px-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-rose-500/5 blur-[150px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div {...fade} className="mb-14">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-white/40 font-mono text-base">01</span>
              <div className="h-px w-8 bg-white/15 shrink-0" />
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">The Valley of Death</p>
            </div>
            <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-8 max-w-5xl">
              AI has solved discovery.<br />
              <span className="text-rose-300">It is failing at production.</span>
            </h2>
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
              <div className="space-y-6 text-white/65 font-light text-base md:text-lg leading-relaxed">
                <p>Molecule discovery is now dramatically accelerated with Generative Foundational Models. AI models like <span className="text-white font-normal">Evo 2</span> for biology and Google&apos;s <span className="text-white font-normal">GNoME</span> for materials can discover miracle candidates in seconds.</p>
                <p>However, taking a digital molecule to production in a physical bioreactor or chemical plant takes an industry average of <span className="text-rose-300 font-normal">2.5 years</span> and multi-million dollars per iteration.</p>
                <p>Why? Because the production environment is chaotic. The process has to be manually tested in a wet-lab environment with multi-stage reactors, hundreds of physical experiments, and varying flow conditions. A battery anode works perfectly at the atomic level but becomes highly unstable in a physical chemical reactor.</p>
                <p>This creates a massive <span className="text-white font-normal">&quot;Valley of Death&quot;</span> between the Quantum/Atomic scale and the Mesoscale factory floor. Foundational models leave their customers stranded at the micro-level.</p>
              </div>
              <div className="space-y-3">
                {examples.map((example, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/[0.025]">
                    <p className="text-white/70 text-sm font-light leading-relaxed">{example}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-28 px-6 md:px-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div {...fade} className="mb-14">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-white/40 font-mono text-base">02</span>
              <div className="h-px w-8 bg-white/15 shrink-0" />
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">The World Foundational Model</p>
            </div>
            <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-8 max-w-5xl">
              Bridging the Micro to the Macro.<br />
              <span className="text-emerald-300">One continuous intelligence layer.</span>
            </h2>
            <p className="text-white/65 font-light text-lg leading-relaxed max-w-4xl mb-12">
              We are building a unified Physics Foundational Model that handles the entire pipeline-from discovery to physical realization-by accurately simulating the mesoscale. Our architecture consists of four continuous engines:
            </p>
          </motion.div>

          <motion.div {...fade} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {architecture.map((item) => (
              <div key={item.label} className={`p-6 rounded-2xl border border-${item.color}-500/25 bg-${item.color}-950/10`}>
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-${item.color}-300/70 font-mono text-xs tracking-widest`}>{item.label}</span>
                  <item.Icon className={`w-5 h-5 text-${item.color}-300`} />
                </div>
                <p className={`text-${item.color}-300 font-medium text-sm mb-3`}>{item.title}</p>
                <p className="text-white/65 font-light text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </motion.div>

          <motion.div {...fade} className="p-7 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-950/20 to-transparent max-w-3xl">
            <p className="text-emerald-300/80 text-xs uppercase tracking-[0.25em] mb-3">The ROI</p>
            <p className="text-white/80 font-light text-lg leading-relaxed">Effectively reducing time-to-production from <span className="text-rose-300 font-medium">2.5 years</span> to <span className="text-emerald-300 font-medium">under 3 months</span>, with average savings of <span className="text-white font-medium">$1M+ per cycle.</span></p>
          </motion.div>
        </div>
      </section>

      <section className="py-28 px-6 md:px-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-blue-500/5 blur-[160px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div {...fade} className="mb-14">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-white/40 font-mono text-base">03</span>
              <div className="h-px w-8 bg-white/15 shrink-0" />
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">The Engine Architecture</p>
            </div>
            <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-4 max-w-5xl">
              The Global SOTA in Physics AI.
            </h2>
            <p className="text-white/35 text-lg md:text-xl font-light max-w-4xl mb-8">Engineered for Hyperscale. Built for Heavy Industry.</p>
            <div className="space-y-4 text-white/65 font-light text-base md:text-lg leading-relaxed max-w-4xl">
              <p>Legacy deterministic solvers (e.g., Ansys, Dassault) are built on 1990s CPU-bound math. They are mathematically restricted to &quot;forward simulation,&quot; forcing engineers into computationally exhaustive trial-and-error to find optimal manufacturing parameters.</p>
              <p>We are deploying the <span className="text-white font-medium">State-of-the-Art (SOTA) in AI Physics</span>. Engineered entirely in Google JAX for hyperscale GPU/TPU acceleration, our architecture natively couples governing PDEs into a single, invertible latent space.</p>
            </div>
          </motion.div>

          <motion.div {...fade} className="grid md:grid-cols-2 gap-4 mb-12">
            {/* TECH 1 */}
            <div className="p-6 rounded-2xl border border-blue-500/25 bg-blue-950/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-300 font-medium text-sm">TECH 1</span>
                <span className="text-white/25 font-mono text-xs">TECH</span>
              </div>
              <p className="text-blue-300 font-medium text-base mb-1">Mesh-Free Neural Surrogates</p>
              <p className="text-white/60 text-xs mb-4">(The SOTA Forward Engine)</p>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Why it&apos;s SOTA:</p>
              <p className="text-white/70 font-light text-sm leading-relaxed mb-4">Traditional solvers require rigid, pixelated grids that crash under high physical stress. We utilize the latest <span className="text-white font-medium">Universal Physics Transformers (UPT)</span> and <span className="text-white font-medium">3D Fourier Neural Operators (FNO)</span>. This allows us to ingest raw, non-uniform 3D CAD meshes directly into a compressed AI latent space to predict continuous physical fields at scale.</p>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-2">The Impact:</p>
              <p className="text-white/70 font-light text-sm leading-relaxed">We reduce a 400-hour high-fidelity compute sweep down to seconds.</p>
            </div>

            {/* TECH 2 */}
            <div className="p-6 rounded-2xl border border-rose-500/25 bg-rose-950/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-rose-300 font-medium text-sm">TECH 2</span>
                <span className="text-white/25 font-mono text-xs">TECH</span>
              </div>
              <p className="text-rose-300 font-medium text-base mb-1">Generative Inverse Design</p>
              <p className="text-white/60 text-xs mb-4">(The Core Moat)</p>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Why it&apos;s SOTA:</p>
              <p className="text-white/70 font-light text-sm leading-relaxed mb-4">Legacy software makes you guess the parameters. We deploy <span className="text-white font-medium">Score-Based Generative Diffusion models</span> for inverse design. The engineer inputs the target physical constraint (e.g., &quot;Maximum residual stress &lt; 400 MPa&quot;). The model mathematically works backward to generate the exact thermal cooling gradients, flow rates, and manufacturing parameters required to achieve a zero-defect product.</p>
            </div>

            {/* TECH 3 */}
            <div className="p-6 rounded-2xl border border-emerald-500/25 bg-emerald-950/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-emerald-300 font-medium text-sm">TECH 3</span>
                <span className="text-white/25 font-mono text-xs">TECH</span>
              </div>
              <p className="text-emerald-300 font-medium text-base mb-1">Deeply Coupled Multiphysics</p>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Why it&apos;s SOTA:</p>
              <p className="text-white/70 font-light text-sm leading-relaxed">Most AI models today only simulate one physical domain at a time. Industrial manufacturing doesn&apos;t happen in a vacuum. Our JAX-native engine simultaneously resolves <span className="text-white font-medium">Fluid Dynamics (turbulence)</span>, <span className="text-white font-medium">Thermal &amp; Solid Mechanics (residual stress)</span>, and <span className="text-white font-medium">Phase Evolution (crystal growth)</span> in one continuous, coupled simulation.</p>
            </div>

            {/* TECH 4 */}
            <div className="p-6 rounded-2xl border border-violet-500/25 bg-violet-950/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-violet-300 font-medium text-sm">TECH 4</span>
                <span className="text-white/25 font-mono text-xs">TECH</span>
              </div>
              <p className="text-violet-300 font-medium text-base mb-1">Sim-to-Real Generative Alignment</p>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Why it&apos;s SOTA:</p>
              <p className="text-white/70 font-light text-sm leading-relaxed">Neural surrogates historically degrade when real-world factory equipment deviates from idealized textbook physics. We bridge the &quot;Reality Gap&quot; using <span className="text-white font-medium">Few-Shot Generative Alignment (via LoRA)</span>. By ingesting a sparse set of actual physical failure data (e.g., thermocouple logs or X-ray defect scans), we fine-tune the base model to mathematically correct for the unmodeled thermodynamic friction specific to your exact foundry equipment.</p>
            </div>
          </motion.div>

          <motion.div {...fade} className="p-7 rounded-2xl border border-rose-500/25 bg-gradient-to-br from-rose-950/20 to-transparent max-w-4xl">
            <p className="text-rose-300/80 text-xs uppercase tracking-[0.25em] mb-3">The Benchmark</p>
            <p className="text-white/80 font-light text-lg leading-relaxed">Our only metric is physical reality. What our engine predicts in the latent space is validated and successfully synthesized on the factory floor.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-28 px-6 md:px-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-rose-500/5 blur-[150px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div {...fade} className="mb-14">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-white/40 font-mono text-base">04</span>
              <div className="h-px w-8 bg-white/15 shrink-0" />
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">Validation & Anchors</p>
            </div>
            <h2 className="text-4xl md:text-7xl font-extralight leading-tight tracking-tight mb-8 max-w-5xl">
              Enterprise anchors across pharma,<br />
              <span className="text-rose-300">chemicals, and batteries.</span>
            </h2>
          </motion.div>

          <motion.div {...fade} className="grid md:grid-cols-2 gap-4">
            {anchors.map((anchor) => (
              <div key={anchor.name} className={`p-7 rounded-2xl border border-${anchor.color}-500/25 bg-${anchor.color}-950/10`}>
                <div className="flex items-center justify-between mb-5">
                  <anchor.Icon className={`w-5 h-5 text-${anchor.color}-300`} />
                  <span className={`text-${anchor.color}-300/60 text-xs uppercase tracking-widest`}>{anchor.vertical}</span>
                </div>
                <p className={`text-${anchor.color}-300 font-medium text-xl mb-2`}>{anchor.name}</p>
                <p className="text-white/80 text-sm mb-4">Problem: {anchor.problem}</p>
                <p className="text-white/62 font-light text-sm leading-relaxed mb-4">{anchor.detail}</p>
                {anchor.trigger && (
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/35 text-xs uppercase tracking-[0.25em] mb-2">Blueprint & Bounty Trigger</p>
                    <p className="text-white/65 font-light text-sm leading-relaxed">{anchor.trigger}</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The AI-for-Science Inflection Point */}
      <section className="py-28 px-6 md:px-10 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full bg-blue-500/5 blur-[160px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div {...fade}>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-white/40 font-mono text-base">05</span>
              <div className="h-px w-8 bg-white/15 shrink-0" />
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">The Technology & Data Engine</p>
            </div>
            <h2 className="text-4xl md:text-6xl font-extralight leading-tight tracking-tight mb-4 max-w-3xl">
              The AI-for-Science<br /><span className="font-normal">Inflection Point.</span>
            </h2>
            <p className="text-white/60 font-light text-lg max-w-3xl mb-14 leading-relaxed">
              We are not waiting for a future breakthrough. The science is already here. We are taking the validated inflection point of AI physics and pushing it to an unprecedented industrial scale.
            </p>
          </motion.div>

          {/* Inflection Point Graph */}
          <motion.div {...fade} className="mb-16 rounded-2xl border border-white/8 bg-[#060606] p-8 md:p-12 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white/[0.03] to-transparent pointer-events-none" />
            <p className="text-white/30 text-sm uppercase tracking-[0.2em] mb-4 text-center relative z-10">The Physical Complexity View</p>
            <p className="text-white/50 text-base mb-12 text-center relative z-10 max-w-3xl mx-auto">1D Discovery Models (Sequences) vs. 3D Physical Models (Multi-Physics Tensors)</p>

            <div className="relative h-[650px] w-full max-w-6xl mx-auto border border-white/20 bg-white/[0.05] rounded-xl pl-20 backdrop-blur-sm">
              {/* Grid Lines */}
              <div className="absolute inset-0 left-20">
                {[0, 50, 100].map((pct, i) => (
                  <div key={`h2-${i}`} className="absolute w-full border-b border-white/20" style={{ top: `${pct}%` }} />
                ))}
                {[0, 16.7, 33.3, 50, 66.7, 83.3, 100].map((pct, i) => (
                  <div key={`v2-${i}`} className="absolute h-full border-r border-white/10 border-dashed" style={{ left: `${pct}%` }} />
                ))}
              </div>

              {/* Layer Labels on Left */}
              <div className="absolute left-2 top-[25%] -translate-y-1/2 text-xs text-white/60 font-bold pr-3">
                <p className="text-rose-400 text-sm mb-1">3D Physical Layer</p>
                <p className="text-white/40 text-[10px]">Tensors</p>
                <p className="text-white/40 text-[10px]">(Manufacturing / Sim)</p>
              </div>
              <div className="absolute left-2 top-[75%] -translate-y-1/2 text-xs text-white/60 font-bold pr-3">
                <p className="text-emerald-400 text-sm mb-1">1D Discovery Layer</p>
                <p className="text-white/40 text-[10px]">Sequences</p>
                <p className="text-white/40 text-[10px]">(In Silico)</p>
              </div>

              {/* X-Axis Labels */}
              <div className="absolute -bottom-10 left-20 right-0 flex justify-between text-xs text-white/60 font-mono px-4">
                <span>2018</span><span>2020</span><span>2022</span><span>2024</span><span>2026</span><span>2028</span>
              </div>
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-xs text-white/50 tracking-widest uppercase">Year</div>

              {/* Zone Background Highlights */}
              <div className="absolute inset-0 left-20 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-[50%] bg-rose-500/5 border-b border-rose-500/20" />
                <div className="absolute top-[50%] left-0 right-0 h-[50%] bg-emerald-500/5" />
              </div>

              {/* SVG for Trend Lines */}
              <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0" style={{ left: '5rem', width: 'calc(100% - 5rem)' }} preserveAspectRatio="none">
                <defs>
                  <filter id="glowGreen">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="glowRose">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <path d="M 33.3% 83% L 50% 78% L 66.7% 75% L 75% 72%" fill="none" stroke="#34d399" strokeWidth="4" strokeDasharray="6 6" filter="url(#glowGreen)" vectorEffect="non-scaling-stroke" className="opacity-80" />
                <path d="M 25% 45% L 50% 40% L 58.3% 42% L 66.7% 35% L 75% 16.6%" fill="none" stroke="#fb7185" strokeWidth="4" strokeDasharray="6 6" filter="url(#glowRose)" vectorEffect="non-scaling-stroke" className="opacity-80" />
              </svg>

              {/* Nodes & Annotations */}
              <div className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ left: '5rem', width: 'calc(100% - 5rem)' }}>
                {/* 1D Discovery Layer (Bottom) */}
                <div className="absolute left-[33.3%] top-[83%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-[0_0_14px_#10b981]" />
                  <div className="absolute -top-16 -left-20 w-44">
                    <p className="text-emerald-300 text-xs leading-tight font-semibold">AlphaFold 2</p>
                    <p className="text-white/70 text-[11px]">Protein Structure Prediction</p>
                  </div>
                </div>
                <div className="absolute left-[50%] top-[78%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-white shadow-[0_0_12px_#10b981]" />
                  <div className="absolute top-4 -left-16 w-40">
                    <p className="text-emerald-200 text-[11px] leading-tight font-medium">AlphaFold 3</p>
                    <p className="text-white/60 text-[10px]">Drug Discovery (Multi-modal)</p>
                  </div>
                </div>
                <div className="absolute left-[66.7%] top-[75%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 rounded-full bg-emerald-400 border-2 border-white shadow-[0_0_16px_#10b981]" />
                  <div className="absolute -top-16 -left-12 w-44">
                    <p className="text-emerald-300 text-sm leading-tight font-semibold">C2S (Google)</p>
                    <p className="text-white/70 text-xs">27B • Scientific Discovery</p>
                  </div>
                </div>
                <div className="absolute left-[75%] top-[72%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-[0_0_18px_#10b981] animate-pulse" />
                  <div className="absolute -top-16 left-4 w-52">
                    <p className="text-emerald-400 text-sm leading-tight font-bold">Evo 2 (Arc/NVIDIA)</p>
                    <p className="text-white/70 text-xs">40B • Genomics Foundation Model</p>
                    <p className="text-white/50 text-[10px] mt-1">9.3T nucleotides trained</p>
                  </div>
                </div>

                {/* 3D Physical Models (Top) */}
                <div className="absolute left-[25%] top-[45%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-400 border-2 border-white shadow-[0_0_12px_#fb7185]" />
                  <div className="absolute top-4 -left-12 w-36">
                    <p className="text-rose-300 text-[11px] leading-tight font-medium">FNO</p>
                    <p className="text-white/70 text-[10px]">Neural Operators</p>
                  </div>
                </div>
                <div className="absolute left-[50%] top-[40%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 rounded-full bg-rose-400 border-2 border-white shadow-[0_0_14px_#fb7185]" />
                  <div className="absolute -top-14 -left-16 w-40">
                    <p className="text-rose-300 text-xs leading-tight font-semibold">GraphCast</p>
                    <p className="text-white/70 text-[11px]">Weather Forecasting</p>
                  </div>
                </div>
                <div className="absolute left-[58.3%] top-[42%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3 h-3 rounded-full bg-rose-300 border border-white shadow-[0_0_10px_#fb7185]" />
                  <div className="absolute top-4 -left-10 w-32">
                    <p className="text-rose-200 text-[10px] leading-tight">FourCastNet</p>
                    <p className="text-white/60 text-[9px]">Extreme Weather</p>
                  </div>
                </div>
                <div className="absolute left-[66.7%] top-[35%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 rounded-full bg-rose-400 border-2 border-white shadow-[0_0_14px_#fb7185]" />
                  <div className="absolute -top-16 -left-12 w-48">
                    <p className="text-rose-300 text-xs leading-tight font-semibold">Aurora</p>
                    <p className="text-white/70 text-[11px]">1.3B • Earth System</p>
                  </div>
                </div>
                <div className="absolute left-[75%] top-[16.6%] -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-rose-500/20 rounded-full animate-ping" />
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 border-2 border-white shadow-[0_0_30px_#fb7185] relative z-10 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full opacity-60" />
                    </div>
                  </div>
                  <div className="absolute top-10 left-10 w-28">
                    <p className="text-rose-300 text-xs font-bold leading-tight">Shodh AI LPM</p>
                    <p className="text-white/50 text-[10px]">10B → Target</p>
                  </div>
                </div>

                {/* Arrow from Discovery to Manufacturing */}
                <svg className="absolute left-[75%] top-[70%] w-40 h-80 overflow-visible pointer-events-none z-0">
                  <defs>
                    <marker id="arrowhead" markerWidth="12" markerHeight="12" refX="10" refY="3" orient="auto">
                      <polygon points="0 0, 12 3, 0 6" fill="#fb7185" />
                    </marker>
                  </defs>
                  <path d="M 0 0 Q -30 -150, 0 -330" stroke="#fb7185" strokeWidth="2.5" fill="none" strokeDasharray="6 4" markerEnd="url(#arrowhead)" />
                </svg>
                <div className="absolute left-[77%] top-[50%] w-40 bg-[#060606]/80 p-2 rounded border border-rose-500/20 backdrop-blur-sm z-20">
                  <p className="text-rose-300 text-[10px] leading-tight italic font-medium text-center">Discovery flows UP to Manufacturing</p>
                </div>
              </div>
            </div>

            {/* Graph explanation */}
            <div className="mt-10 grid md:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/8 space-y-2">
                <p className="text-rose-300/70 text-xs uppercase tracking-wider">Why 3D is harder than 1D</p>
                <p className="text-white/65 font-light text-sm leading-relaxed">Biology models fold 1D sequences. Physics requires 3D tensors - position, time, temperature, pressure - all at once. Orders of magnitude more complex. Current SOTA: Aurora at 1.3B params. Our target: <span className="text-white font-normal">The 10B+ Large Physics Model.</span> In computational load, a 10B 3D multi-physics model is equivalent to a 100B-parameter LLM.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.015] border border-white/5 space-y-2">
                <p className="text-white/40 text-xs uppercase tracking-wider">Where we stand</p>
                <p className="text-white/55 font-light text-sm leading-relaxed">FNO proved AI can solve physics PDEs. The 3D track is now accelerating. We are building on this with <span className="text-white font-normal">Google JAX</span> and <span className="text-white font-normal">NVIDIA Physics NeMo.</span></p>
              </div>
            </div>

            {/* Two-Stage Model Architecture */}
            <motion.div {...fade} className="mt-16">
              <h3 className="text-2xl md:text-4xl font-extralight text-white mb-2 max-w-3xl">Engineering the SOTA.</h3>
              <p className="text-white/40 font-light text-sm max-w-2xl mb-10">Two stages. Two milestones. One architecture.</p>

              {/* Stage 1 */}
              <div className="mb-6 p-8 rounded-2xl border border-blue-500/20 bg-blue-950/10">
                <div className="mb-5">
                  <p className="text-blue-300/60 text-xs uppercase tracking-wider mb-1">Stage 1 - Now</p>
                  <h4 className="text-white font-light text-2xl">The 50B 3D-Foundation Model</h4>
                  <p className="text-blue-300/50 text-xs mt-1">Anchor-Partner Deployment</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-white/65 font-light text-sm leading-relaxed">
                    <p>The universal base model - validated at the edge. The 50B foundation is deployed into secure federated enclaves at Biocon, Jubilant, and Aarti, using their historical failure data to fine-tune the final 20% weights without their IP ever leaving their walls.</p>
                    <p>Achieves <span className="text-white font-normal">90% accuracy</span> on their specific process environments. First commercial deployments in Year 1.</p>
                    <p className="text-white/30 font-mono text-xs">JAX/FLAX · FNO/UPT · Mixture of Experts</p>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
                      <p className="text-blue-300/60 text-xs uppercase tracking-wider mb-3">The Milestones</p>
                      <ul className="space-y-2 text-white/70 font-light text-sm">
                        <li className="flex items-start gap-2"><span className="text-blue-300/60">→</span> <span><span className="text-white font-normal">Architecture validated</span> on real industrial data</span></li>
                        <li className="flex items-start gap-2"><span className="text-blue-300/60">→</span> <span><span className="text-white font-normal">3 × $10M NRE contracts</span> triggered on proven outcomes</span></li>
                        <li className="flex items-start gap-2"><span className="text-blue-300/60">→</span> <span><span className="text-white font-normal">Sim-to-Real loop</span> closes at commercial accuracy</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="p-8 rounded-2xl border border-rose-500/20 bg-rose-950/10">
                <div className="mb-5">
                  <p className="text-rose-300/60 text-xs uppercase tracking-wider mb-1">And Stage 2 - The Vision</p>
                  <h4 className="text-white font-light text-2xl">The 500B+ Foundation Model</h4>
                  <p className="text-rose-300/50 text-xs mt-1">Universal Manufacturing Intelligence</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-white/65 font-light text-sm leading-relaxed">
                    <p>A client brings a completely novel molecule, composite, or device - never seen before. The LPM outputs the gigafactory blueprint. No physical trial-and-error required.</p>
                    <p>The 50B model handles known process families well. The 500B model handles the <span className="text-white font-normal">hard edge cases</span>: chaotic turbulence, multi-phase reactions, and extreme-condition manufacturing.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
                      <p className="text-rose-300/60 text-xs uppercase tracking-wider mb-3">Industries Unlocked</p>
                      <ul className="space-y-1.5 text-white/70 font-light text-sm">
                        <li className="flex items-start gap-2"><span className="text-rose-300/60">→</span> Aerospace composites</li>
                        <li className="flex items-start gap-2"><span className="text-rose-300/60">→</span> Semiconductor lithography</li>
                        <li className="flex items-start gap-2"><span className="text-rose-300/60">→</span> Nuclear fusion materials</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/10">
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">What it requires</p>
                      <p className="text-white/60 font-light text-sm">Scale-up in sovereign compute. Powered by the Sim-to-Real flywheel built in Stage 1.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-white/30 text-xs">© 2026 Shodh AI. Confidential.</p>
      </footer>
    </div>
  );
}
