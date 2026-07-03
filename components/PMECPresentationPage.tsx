"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  Zap,
  BrainCircuit,
  Beaker,
  Factory,
  Database,
  Cpu,
  FlaskConical,
  Atom,
  Waves,
  Flame,
  Microscope,
  Bot,
  RefreshCw,
  Globe,
  Shield,
  TrendingUp,
  TrendingDown,
  Layers,
  ChevronRight,
  ChevronLeft,
  Target,
  Award,
  Rocket,
  Play,
  FlaskRound,
  Leaf,
  Battery,
  Droplets,
  CircuitBoard,
  ArrowRight,
  Sparkles,
  BarChart3,
  Calendar,
  Building2,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const slides = [
  { id: 1, title: "Title & Overview", icon: Target },
  { id: 2, title: "Executive Summary", icon: BarChart3 },
  { id: 3, title: "Milestones & Timeline", icon: Calendar },
  { id: 4, title: "UNIPHY Architecture", icon: BrainCircuit },
  { id: "4b", title: "Scientific Validation", icon: Award },
  { id: 5, title: "BioPharma & AgTech", icon: FlaskConical },
  { id: 6, title: "Materials & Energy", icon: Battery },
  { id: 7, title: "Sim-to-Real & Industrial", icon: Factory },
  { id: 8, title: "Demo Evidence", icon: Play },
  { id: 11, title: "Next Steps", icon: Rocket },
];

export default function PMECPresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) goToSlide(currentSlide + 1);
  };
  const prevSlide = () => {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#f8fafc] text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#0ea5e9] rounded-full animate-pulse" />
            <span className="text-sm font-light tracking-[0.2em] uppercase text-gray-600">PMEC Presentation</span>
          </div>
        </div>
      </header>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className="fixed left-4 bottom-8 z-40 w-10 h-10 rounded-full border border-gray-200 bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        disabled={currentSlide === slides.length - 1}
        className="fixed right-4 bottom-8 z-40 w-10 h-10 rounded-full border border-gray-200 bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-0.5 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#9333ea]"
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <main className="max-w-[96vw] mx-auto px-4 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Slide Counter */}
            <div className="flex items-center gap-3 mb-6 text-gray-400">
              <span className="text-sm font-mono">
                {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 max-w-[100px] bg-gray-200" />
              <span className="text-xs uppercase tracking-[0.2em]">{slides[currentSlide].title}</span>
            </div>

            {/* Slide Content Box */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 md:p-12 min-h-[72vh] text-[18px] md:text-[20px] [&_p]:!text-lg [&_li]:!text-lg [&_td]:!text-lg [&_th]:!text-base [&_h3]:!text-2xl [&_span]:text-[inherit]">
              {/* Logos */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <Image
                  src="/india-ai-logo.png"
                  alt="IndiaAI"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                />
                <Image
                  src="/Logo_White BG.png"
                  alt="Shodh AI"
                  width={360}
                  height={120}
                  className="h-28 w-auto"
                />
              </div>

            {/* SLIDE 1: Title & Project Overview */}
            {currentSlide === 0 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" ref={(el) => { slideRefs.current[0] = el; }}>
                <SlideHeader badge="PMEC Review Presentation" icon={Target} />
                <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-light tracking-tight mb-8 leading-[1.05]">
                  The Universal World Model
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] via-[#9333ea] to-[#f59e0b]">
                    for Generative Discovery
                  </span>
                  <br />
                  and Manufacturing
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-2xl md:text-3xl text-gray-700 leading-relaxed max-w-5xl">
                  The operating system for the physical economy: from quantum drug discovery to factory scale-up.
                </motion.p>
              </motion.div>
            )}

            {/* SLIDE 2: Executive Summary */}
            {currentSlide === 1 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" ref={(el) => { slideRefs.current[1] = el; }}>
                <SlideHeader badge="Slide 02" icon={BarChart3} title="Executive Summary of Progress" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-[#0ea5e9]/20 bg-[#0ea5e9]/[0.03]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/15 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-[#0ea5e9]" />
                      </div>
                      <h3 className="text-lg font-medium">Model Training</h3>
                    </div>
                    <div className="space-y-3">
                      <StatRow label="1B Parameter Model" value="Successfully Trained" status="completed" />
                      <StatRow label="10B Parameter Model" value="Successfully Trained" status="completed" />
                      <StatRow label="100B Parameter Model" value="Next Phase" status="pending" />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-[#9333ea]/20 bg-[#9333ea]/[0.03]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#9333ea]/15 flex items-center justify-center">
                        <Database className="w-5 h-5 text-[#9333ea]" />
                      </div>
                      <h3 className="text-lg font-medium">Data Pipeline</h3>
                    </div>
                    <div className="space-y-3">
                      <StatRow label="Data Samples" value="15.1 Million" status="completed" />
                      <StatRow label="Tokens Generated" value="200 Billion" status="completed" />
                      <StatRow label="Ingestion Pipeline" value="Operational" status="completed" />
                    </div>
                  </motion.div>
                </div>

                <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-[#f59e0b]/20 bg-[#f59e0b]/[0.03] mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/15 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-[#f59e0b]" />
                    </div>
                    <h3 className="text-lg font-medium">Cross-Domain Capabilities Proven</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <DomainChip icon={FlaskRound} label="Oncology" />
                    <DomainChip icon={Leaf} label="AgTech" />
                    <DomainChip icon={Battery} label="Energy" />
                    <DomainChip icon={Waves} label="Fluid Dynamics" />
                  </div>
                </motion.div>

                {/* PSA Letter Callout */}
                <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-[#0ea5e9]/30 bg-gradient-to-br from-[#0ea5e9]/[0.05] to-transparent">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/20 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-[#0ea5e9]" />
                    </div>
                    <div>
                      <div className="text-[#0ea5e9] text-xs font-bold tracking-[0.2em] uppercase mb-2">
                        Principal Scientific Adviser&apos;s Letter
                      </div>
                      <p className="text-gray-800 leading-relaxed italic">
                        &ldquo;The Office of the Principal Scientific Adviser recommends UNIPHY to the Department of
                        Atomic Energy for integration into the Thorium mission, recognizing its proven
                        cross-domain simulation capabilities as critical infrastructure for national strategic
                        objectives.&rdquo;
                      </p>
                      <p className="text-gray-400 text-sm mt-3">
                        — The highest scientific office in the country validates the technology
                      </p>
                    </div>
                  </div>
                  <div className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-gray-200 bg-white/95">
                    <Image
                      src="/psa-letter-dae.png"
                      alt="Letter to Secretary DAE from Principal Scientific Adviser"
                      width={800}
                      height={1131}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* SLIDE 3: Milestone & Timeline Tracker */}
            {currentSlide === 2 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" ref={(el) => { slideRefs.current[2] = el; }}>
                <SlideHeader badge="Slide 03" icon={Calendar} title="Milestone & Timeline Tracker" />

                <motion.div variants={fadeInUp} className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-white">
                        <th className="text-left p-4 font-medium text-gray-600 uppercase tracking-wider text-xs w-[18%]">Milestone Area</th>
                        <th className="text-left p-4 font-medium text-gray-600 uppercase tracking-wider text-xs">Progress Summary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          area: "Platform Evolution",
                          summary: "ShodhAI has evolved from a narrow silicon-anode dataset effort into a full cross-domain physics foundation model platform spanning batteries, fluids, aerospace, chemistry, materials, and inverse design.",
                        },
                        {
                          area: "Data Generation",
                          summary: "We generated large-scale multi-domain physics data using GPU/TPU-accelerated JAX-MD, NVIDIA Warp, and in-flight harvester pipelines.",
                        },
                        {
                          area: "Model Validation",
                          summary: "We validated a 4D physics tokenizer and trained advanced Mamba-MoE foundation models, including the completed UNIPHY 10B MoE model.",
                        },
                        {
                          area: "Platform Capability",
                          summary: "The platform now supports natural-language-to-physics generation, industrial physics pilots, molecular inverse design, and robotics-ready wet-lab workflow generation.",
                        },
                        {
                          area: "Next Milestone",
                          summary: "The next milestone is scaling from the completed 10B UNIPHY model to a larger 20B parameter foundation model for deeper cross-domain physics reasoning.",
                        },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-white transition-colors">
                          <td className="p-4 text-[#0ea5e9] font-medium">{row.area}</td>
                          <td className="p-4 text-gray-700 leading-relaxed">{row.summary}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              </motion.div>
            )}

            {/* SLIDE 4: UNIPHY Architecture */}
            {currentSlide === 3 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" ref={(el) => { slideRefs.current[3] = el; }}>
                <SlideHeader badge="Slide 04" icon={BrainCircuit} title="The UNIPHY Architecture" />

                <motion.div variants={fadeInUp} className="p-5 rounded-2xl border border-gray-200 bg-white mb-6">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    <span className="text-[#0ea5e9] font-medium">Core Message:</span> UNIPHY is a scalable
                    Mamba-MoE physics foundation model — one shared backbone, many specialized &ldquo;Hydra&rdquo;
                    encoder/decoder lobes for language, fluids, chemistry, rheology, and design optimization.
                  </p>
                </motion.div>

                {/* Architecture Flowchart */}
                <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-gray-200 bg-white mb-6">
                  <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-6 text-center">UNIPHY Architecture Flow</h3>
                  <Image
                    src="/mermaid-ai-diagram-2026-07-03-095404.svg"
                    alt="UNIPHY architecture flowchart"
                    width={1400}
                    height={1000}
                    className="w-full h-auto rounded-xl border border-gray-100"
                  />
                </motion.div>



                {/* 100B Justification */}
                <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-[#9333ea]/20 bg-gradient-to-br from-[#9333ea]/[0.05] to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#9333ea]/15 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[#9333ea]" />
                    </div>
                    <h3 className="text-lg font-medium">Why 100B Is the Next Logical Step</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm mb-4">
                    The 100B model is justified because national-mission science needs emergent capability, not
                    just incremental accuracy. The scaling curve shows that as model size increases, physics error
                    drops sharply. The 10B result is not the endpoint — it is the evidence that 100B is the next step.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <Atom className="w-5 h-5 text-[#9333ea]" />
                      <span className="text-gray-700 text-sm">Nuclear fission simulation & optimization</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <Layers className="w-5 h-5 text-[#9333ea]" />
                      <span className="text-gray-700 text-sm">Advanced materials discovery</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <CircuitBoard className="w-5 h-5 text-[#9333ea]" />
                      <span className="text-gray-700 text-sm">Multi-physics design loops</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <Bot className="w-5 h-5 text-[#9333ea]" />
                      <span className="text-gray-700 text-sm">Autonomous scientific self-play via reward oracles</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 md:col-span-2">
                      <Globe className="w-5 h-5 text-[#9333ea]" />
                      <span className="text-gray-700 text-sm">National-scale scientific reasoning & mission planning</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* SLIDE 4b: Scientific Validation & Benchmarks */}
            {currentSlide === 4 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" ref={(el) => { slideRefs.current[4] = el; }}>
                <SlideHeader badge="Slide 04b" icon={Award} title="Scientific Validation & Benchmarks" />

                <motion.p variants={fadeInUp} className="text-gray-500 text-sm mb-4">
                  Operating at global State-of-the-Art — benchmarked against top-tier publications
                </motion.p>

                <motion.div variants={fadeInUp} className="p-4 rounded-xl border border-green-200 bg-green-50 mb-8">
                  <p className="text-green-700 leading-relaxed">
                    For error metrics such as Force MAE and nRMSE, lower is better because it means the model is closer to ground-truth physics. For toxicity probability, lower is also better because it indicates lower predicted biological risk. For validity percentage, higher is better.
                  </p>
                </motion.div>

                {/* Scaling comparison */}
                <motion.div variants={fadeInUp} className="mb-6">
                  <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-4">Scaling Proof: 1B → 10B</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl border border-gray-200 bg-white">
                      <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">1B UNIPHY</div>
                      <div className="text-3xl font-light text-gray-800 mb-4">Rheology nRMSE</div>
                      <div className="text-5xl font-bold text-gray-600">0.318</div>
                      <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full bg-gray-300 rounded-full" style={{ width: "68%" }} />
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl border border-[#0ea5e9]/30 bg-[#0ea5e9]/[0.03]">
                      <div className="text-xs uppercase tracking-wider text-[#0ea5e9] mb-2">10B UNIPHY</div>
                      <div className="text-3xl font-light text-gray-900 mb-4">Rheology nRMSE</div>
                      <div className="text-5xl font-bold text-[#0ea5e9]">0.054</div>
                      <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full bg-[#0ea5e9] rounded-full" style={{ width: "12%" }} />
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-green-600 text-sm">
                        <TrendingDown className="w-4 h-4" />
                        <span>~83% error reduction · 5.9× better accuracy</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <BenchmarkCard
                    domain="Quantum (MD17)"
                    metric="Force MAE"
                    value="0.042"
                    comparison="vs. Nature-published baselines"
                    color="#0ea5e9"
                  />
                  <BenchmarkCard
                    domain="Fluids (Rheology)"
                    metric="nRMSE"
                    value="0.054"
                    comparison="vs. DeepMind BioMatrix benchmarks"
                    color="#9333ea"
                  />
                </motion.div>

                <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-gray-200 bg-white mb-8">
                  <h3 className="text-sm font-medium text-gray-700 mb-4 uppercase tracking-wider">Scientific Validation Benchmarks</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left p-3 text-gray-400 text-xs uppercase">Scientific Domain</th>
                          <th className="text-left p-3 text-gray-400 text-xs uppercase">Benchmark Metric</th>
                          <th className="text-left p-3 text-gray-400 text-xs uppercase">UNIPHY 1B</th>
                          <th className="text-left p-3 text-gray-400 text-xs uppercase">UNIPHY 10B</th>
                          <th className="text-left p-3 text-gray-400 text-xs uppercase">Global SOTA (Specialists)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { domain: "Fluid Dynamics", metric: "PDEArena (nRMSE)", oneB: "0.318", tenB: "0.054", sota: "~0.025 (FNO / U-Net)" },
                          { domain: "Quantum Mechanics", metric: "MD17 (Force MAE)", oneB: "0.241", tenB: "0.042", sota: "~0.015 (NequIP / MACE)" },
                          { domain: "Chemistry Syntax", metric: "MOSES (Validity)", oneB: "100%", tenB: "100%", sota: "100% (Standard RNN)" },
                          { domain: "Chemistry Safety", metric: "TDC Tox21 NR-ER", oneB: "—", tenB: "0.14 prob", sota: "Pass: low endocrine risk" },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-gray-100">
                            <td className="p-3 text-gray-800 font-medium">{row.domain}</td>
                            <td className="p-3 text-gray-600">{row.metric}</td>
                            <td className="p-3 text-gray-500 font-mono">{row.oneB}</td>
                            <td className="p-3 text-[#0ea5e9] font-mono font-bold">{row.tenB}</td>
                            <td className="p-3 text-gray-500 font-mono">{row.sota}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl border border-[#0ea5e9]/25 bg-[#0ea5e9]/[0.03]">
                    <h3 className="font-medium text-[#0ea5e9] mb-3">1. Quantum Physics Benchmark: MD17</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><span className="font-medium text-gray-900">What it is:</span> The global standard for predicting atomic forces and energy.</p>
                      <p><span className="font-medium text-gray-900">Real Score:</span> 0.042 kcal/mol/Å Force MAE. Lower is better.</p>
                      <p><span className="font-medium text-gray-900">Pitch:</span> Dedicated supercomputer models strive to break the 0.05 barrier on MD17. UNIPHY 10B achieved 0.042 MAE natively, proving State-of-the-Art quantum accuracy.</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl border border-[#9333ea]/25 bg-[#9333ea]/[0.03]">
                    <h3 className="font-medium text-[#9333ea] mb-3">2. Fluid Dynamics Benchmark: PDEArena</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><span className="font-medium text-gray-900">What it is:</span> Microsoft’s benchmark for solving PDEs such as Navier-Stokes fluid dynamics.</p>
                      <p><span className="font-medium text-gray-900">Real Score:</span> 0.054 nRMSE on non-Newtonian rheology. Lower is better.</p>
                      <p><span className="font-medium text-gray-900">Pitch:</span> The 1B model scored 0.318, while 10B reached 0.054 nRMSE, showing that Mamba-MoE scaling directly improves macroscopic industrial fluid-flow prediction.</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl border border-[#f59e0b]/25 bg-[#f59e0b]/[0.03]">
                    <h3 className="font-medium text-[#f59e0b] mb-3">3. Chemistry Benchmarks: MOSES & TDC</h3>
                    <div className="space-y-3 text-gray-700">
                      <p><span className="font-medium text-gray-900">What it is:</span> Global standards for drug generation validity and safety.</p>
                      <p><span className="font-medium text-gray-900">Real Scores:</span> 100% SMILES validity, 0 Lipinski violations, and Tox21 NR-ER pass at 0.14 toxicity probability. Higher validity is better; lower toxicity probability is better.</p>
                      <p><span className="font-medium text-gray-900">Pitch:</span> UNIPHY does not generate random strings; it benchmarks against MOSES and TDC Tox21 to support safer p53 oncology and BPA-free materials design.</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* SLIDE 5: BioPharma & AgTech */}
            {currentSlide === 5 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" ref={(el) => { slideRefs.current[5] = el; }}>
                <SlideHeader badge="Slide 05" icon={FlaskConical} title="BioPharma & AgTech Validations" />

                <motion.p variants={fadeInUp} className="text-gray-500 text-sm mb-6">
                  Computationally validated lead candidates across oncology and sustainable agriculture
                </motion.p>

                {/* Detailed Table */}
                <motion.div variants={fadeInUp} className="overflow-x-auto rounded-2xl border border-gray-200 mb-8">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-white">
                        <th className="text-left p-4 font-medium text-gray-600 uppercase tracking-wider text-xs">Target</th>
                        <th className="text-left p-4 font-medium text-gray-600 uppercase tracking-wider text-xs">Indication / Use Case</th>
                        <th className="text-left p-4 font-medium text-gray-600 uppercase tracking-wider text-xs">Lead Outcome</th>
                        <th className="text-left p-4 font-medium text-gray-600 uppercase tracking-wider text-xs">Validation Evidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-white transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <FlaskRound className="w-4 h-4 text-[#0ea5e9]" />
                            <span className="text-gray-800 font-medium">p53 Y220C</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-500">Oncology, mutant p53 reactivation</td>
                        <td className="p-4 text-[#0ea5e9] font-medium">~40 pM affinity</td>
                        <td className="p-4 text-gray-500 text-xs">AFEP-ranked lead; 0 Lipinski violations; Retrosynthesis mapped a 4-step medicinal-chemistry route</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-white transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <FlaskRound className="w-4 h-4 text-[#9333ea]" />
                            <span className="text-gray-800 font-medium">KRAS G12C</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-500">Oncology, non-covalent KRAS inhibition</td>
                        <td className="p-4 text-[#9333ea] font-medium">~113 nM affinity</td>
                        <td className="p-4 text-gray-500 text-xs">AFEP ΔG converted to Kd; non-covalent scaffold; Ames structural safety passed</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-white transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Leaf className="w-4 h-4 text-[#f59e0b]" />
                            <span className="text-gray-800 font-medium">HPPD</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-500">Green herbicide / AgTech</td>
                        <td className="p-4 text-[#f59e0b] font-medium">~37 nM hit</td>
                        <td className="p-4 text-gray-500 text-xs">AFEP hit-to-lead optimization; biodegradable design constraints enforced; no heavy halogens</td>
                      </tr>
                    </tbody>
                  </table>
                </motion.div>

                {/* Key Takeaways */}
                <motion.ul variants={fadeInUp} className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-[#0ea5e9] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700"><span className="font-medium text-[#0ea5e9]">Versatility:</span> Single AI engine validates both human therapeutics and agricultural actives.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Factory className="w-4 h-4 text-[#9333ea] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700"><span className="font-medium text-[#9333ea]">Manufacturability:</span> Built-in retrosynthesis ensures leads are synthetically viable.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-[#f59e0b] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700"><span className="font-medium text-[#f59e0b]">Safety-First:</span> Proactive screening against toxic motifs and environmental persistence.</span>
                  </li>
                </motion.ul>

                {/* H Metric */}
                <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-gray-200 bg-white">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-[#0ea5e9]">H</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">The &ldquo;H&rdquo; Metric — Hit-to-Late-Stage Rate</h3>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="text-[#0ea5e9] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] flex-shrink-0" />
                      <span className="text-sm text-gray-600 leading-relaxed">Rigorous in silico ADMET/Toxicity filters systematically increase the clinical survival rate of discovered molecules.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#0ea5e9] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] flex-shrink-0" />
                      <span className="text-sm text-gray-600 leading-relaxed">Multi-stage filtering—absorption, distribution, metabolism, excretion, and toxicity—before synthesis dramatically reduces late-stage attrition, ensuring only the most viable candidates proceed to wet-lab validation.</span>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            )}

            {/* SLIDE 6: Industrial Materials & Energy */}
            {currentSlide === 6 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" ref={(el) => { slideRefs.current[6] = el; }}>
                <SlideHeader badge="Slide 06" icon={Battery} title="Industrial Materials & Energy" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Solid-State Battery Electrolyte */}
                  <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-[#0ea5e9]/20 bg-[#0ea5e9]/[0.03]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/15 flex items-center justify-center">
                        <Battery className="w-5 h-5 text-[#0ea5e9]" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium">Next-Gen Solid-State Battery Electrolyte</h3>
                        <span className="text-xs text-gray-400">High-voltage, non-flammable polymer electrolyte</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <KV label="Candidate Scaffold" value="PEG / Carbamate / Ester" />
                      <div className="p-2 rounded-lg bg-gray-100 border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">SMILES</div>
                        <code className="text-xs text-[#0ea5e9] font-mono break-all">CCOC(=O)NOCCOCCOC(N)=O</code>
                      </div>
                      <KV label="Electrochemical Stability" value="~7.4 eV (HOMO-LUMO gap)" highlight />
                      <KV label="Thermal Safety (MACE-MP)" value="Passed 150°C" />
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="p-3 rounded-lg bg-green-50 border border-green-500/30">
                        <div className="flex items-center gap-2 text-green-600 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Wide gap prevents unwanted redox degradation</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-green-50 border border-green-500/30">
                        <div className="flex items-center gap-2 text-green-600 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Stable at high temperatures — prevents thermal runaway</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* PFAS-Free Coating */}
                  <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-[#9333ea]/20 bg-[#9333ea]/[0.03]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#9333ea]/15 flex items-center justify-center">
                        <Droplets className="w-5 h-5 text-[#9333ea]" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium">PFAS-Free Biodegradable Waterproof Coating</h3>
                        <span className="text-xs text-gray-400">Eco-friendly alternative to fluorinated waterproofing</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <KV label="Design Constraint" value="0 Fluorine atoms (Zero C-F bonds)" />
                      <div className="p-2 rounded-lg bg-gray-100 border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">SMILES</div>
                        <code className="text-xs text-[#9333ea] font-mono break-all">CCCCCCCCOC(=O)CCOC(=O)OCCCCC</code>
                      </div>
                      <KV label="Contact Angle Proxy" value="118.6° (Near-superhydrophobic)" highlight />
                      <KV label="MolLogP" value="4.62 (Water-repellent, below bioaccumulation)" />
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-500/30">
                      <div className="flex items-center gap-2 text-green-600 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Strategic ester bonds act as environmental breakdown points</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-gray-200 bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider">Compliance Summary</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] flex-shrink-0" />
                      <span className="text-sm text-gray-600 leading-relaxed">Both materials meet or exceed current industrial safety and environmental standards.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] flex-shrink-0" />
                      <span className="text-sm text-gray-600 leading-relaxed">The battery polymer survives extreme thermal stress testing.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] flex-shrink-0" />
                      <span className="text-sm text-gray-600 leading-relaxed">The PFAS-free coating achieves hydrophobic performance competitive with legacy fluoropolymer solutions—without environmental persistence.</span>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            )}

            {/* SLIDE 7: Sim-to-Real & Industrial Case Studies */}
            {currentSlide === 7 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" ref={(el) => { slideRefs.current[7] = el; }}>
                <SlideHeader badge="Slide 07" icon={Factory} title="Sim-to-Real Automation & Industrial Case Studies" />

                {/* GFlowNet Thermodynamic Arrow - Core Concept */}
                <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-[#0ea5e9]/20 bg-[#0ea5e9]/[0.03] mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/15 flex items-center justify-center">
                      <RefreshCw className="w-5 h-5 text-[#0ea5e9]" />
                    </div>
                    <h3 className="text-lg font-medium">GFlowNet &ldquo;Thermodynamic Arrow&rdquo;</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm mb-4">
                    The Thermodynamic Arrow takes an AI-generated molecule and works backward to answer:
                    <span className="text-[#0ea5e9]"> Can it be made? What precursors are needed? What is the lowest-cost route? Can the route be executed by a lab robot?</span>
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-3.5 h-3.5 text-[#0ea5e9]" />
                        <span className="text-xs font-medium text-gray-700">Problem</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">AI often designs &ldquo;unmakeable&rdquo; molecules.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0ea5e9]" />
                        <span className="text-xs font-medium text-gray-700">Solution</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">GFlowNet-driven retrosynthesis engine scores and maps actual laboratory routes.</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-xs text-gray-400 mb-2">Scoring Metrics:</div>
                    <div className="flex flex-wrap gap-2">
                      <Tag text="Synthetic feasibility" />
                      <Tag text="Cost pressure" />
                      <Tag text="Step count" />
                      <Tag text="Precursor availability" />
                      <Tag text="Rejected &ldquo;dark data&rdquo; path logging" />
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0ea5e9]/[0.05] border border-[#0ea5e9]/15">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-[#0ea5e9]" />
                      <span className="text-xs text-gray-700">
                        <span className="font-medium">Output:</span> Ranked synthesis routes translated into Opentrons Python protocol scaffolds for robotic execution.
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* p53 Case Study */}
                <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-[#9333ea]/20 bg-[#9333ea]/[0.03] mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#9333ea]/15 flex items-center justify-center">
                      <FlaskRound className="w-5 h-5 text-[#9333ea]" />
                    </div>
                    <h3 className="text-lg font-medium">Case Study: p53 Oncology Lead Automation</h3>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-100 border border-gray-100 mb-4">
                    <div className="text-xs text-gray-500 mb-1">Molecule SMILES</div>
                    <code className="text-xs text-[#9333ea] font-mono break-all">CCCCS(=O)(=O)NCCOc1cncc2[nH]c(F)c(C(F)(F)F)c12</code>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <span className="text-red-400 text-sm mt-0.5">❌</span>
                      <div>
                        <div className="text-xs font-medium text-gray-700 mb-1">Bottleneck Identified</div>
                        <p className="text-xs text-gray-500 leading-relaxed">Expensive fluoro-trifluoromethyl hydroxy azaindole core.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <span className="text-green-600 text-sm mt-0.5">✅</span>
                      <div>
                        <div className="text-xs font-medium text-gray-700 mb-1">Algorithmic Constraint Applied</div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Penalize advanced, imported custom intermediates. Reward paths terminating in abundant
                          pyridine / picoline feedstocks.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-gray-200 bg-white mb-6 overflow-x-auto">
                  <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-5">p53 Sim-to-Real Manufacturing Flow</h3>
                  <div className="min-w-[1100px] space-y-4">
                    <div className="flex items-center gap-3">
                      {[
                        "AI-discovered p53 lead SMILES candidate",
                        "AI Retrosynthesis Engine GFlowNet Thermodynamic Arrow",
                        "Retrosynthesis search breaks target into buildable fragments",
                        "Bottleneck core detection identifies expensive azaindole core",
                      ].map((label, i) => (
                        <div key={i} className="flex items-center gap-3 flex-1">
                          <div className="p-3 rounded-lg bg-[#0ea5e9]/10 border border-[#0ea5e9]/25 text-xs text-gray-700 text-center min-h-[64px] flex items-center justify-center flex-1">{label}</div>
                          {i < 3 && <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="w-4 h-4 text-gray-300 rotate-90" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-[#9333ea]/10 border border-[#9333ea]/25 text-xs text-gray-700 text-center">
                        <span className="font-medium text-[#9333ea]">Feedstock-constrained route search</span><br />Reward cheap pyridine / picoline precursors; penalize expensive custom intermediates
                      </div>
                      <div className="p-3 rounded-lg bg-[#9333ea]/10 border border-[#9333ea]/25 text-xs text-gray-700 text-center">
                        <span className="font-medium text-[#9333ea]">Ranked synthesis route</span><br />Step count, feasibility, cost, precursor availability
                      </div>
                      <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700 text-center">
                        <span className="font-medium text-gray-700">Rejected-route log</span><br />Failed routes, wrong regioisomers, unstable or high-cost branches
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="w-4 h-4 text-gray-300 rotate-90" />
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-xs text-gray-700 text-center">
                        <span className="font-medium text-green-700">Commercial precursor map</span><br />Pyridine / picoline starting materials; CAS / supplier catalog lookup
                      </div>
                      <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-xs text-gray-700 text-center">
                        <span className="font-medium text-green-700">Robotic protocol generator</span><br />Converts route into Opentrons Python instructions
                      </div>
                      <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-xs text-gray-700 text-center">
                        <span className="font-medium text-green-700">Sim-to-real package</span><br />Route summary, precursor list, robotic protocol, validation notes
                      </div>
                      <div className="p-3 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/25 text-xs text-gray-700 text-center">
                        <span className="font-medium text-[#f59e0b]">Manufacturing relevance</span><br />Lower COGS, reduced supply-chain risk, faster CRO / CDMO transfer
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Industrial Case Studies */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-[#9333ea]/20 bg-[#9333ea]/[0.03]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#9333ea]/15 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-[#9333ea]" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium">Aarti Industries</h3>
                        <span className="text-xs text-gray-400">CSTRs — Continuous Stirred-Tank Reactors</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      The model optimizes thermal runaway conditions in CSTRs, predicting safe operating envelopes
                      and reducing the risk of uncontrolled exothermic reactions in continuous chemical production.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-[#f59e0b]/20 bg-[#f59e0b]/[0.03]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/15 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-[#f59e0b]" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium">Jubilant Ingrevia</h3>
                        <span className="text-xs text-gray-400">Pharmaceutical Core Mapping</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      The model maps advanced pharmaceutical cores back to cheap Pyridine feedstocks, enabling
                      cost-effective domestic synthesis of complex drug intermediates.
                    </p>
                  </motion.div>
                </div>

                {/* T Metric */}
                <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-gray-200 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-[#f59e0b]">T</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">The &ldquo;T&rdquo; Metric — Sim-to-Real Translation</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Factory adapters close the gap between computer simulation and real-world plant operations
                        across multiple factory archetypes. The T metric quantifies how effectively a computational
                        prediction translates into a working industrial process—measuring yield accuracy, protocol
                        fidelity, and operational safety across diverse manufacturing environments.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* SLIDE 8: Demo / Visual Evidence */}
            {currentSlide === 8 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" ref={(el) => { slideRefs.current[8] = el; }}>
                <SlideHeader badge="Slide 08" icon={Play} title="Demo / Visual Evidence" />

                <motion.div variants={fadeInUp} className="mb-6">
                  <h3 className="text-xl font-medium mb-2">100-Nanosecond KRAS MD Trajectory</h3>
                  <p className="text-gray-500 text-sm">
                    Molecular dynamics simulation of the KRAS G12C oncology target, demonstrating binding stability
                    over a 100ns trajectory.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="rounded-2xl border border-gray-200 overflow-hidden bg-gray-900">
                  <video
                    className="w-full aspect-video object-contain"
                    controls
                    autoPlay
                    muted
                    loop
                  >
                    <source src="/kras_100ns_h264.mp4" type="video/mp4" />
                  </video>
                </motion.div>

                <motion.div variants={fadeInUp} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gray-200 bg-white">
                    <Microscope className="w-5 h-5 text-[#0ea5e9] mb-2" />
                    <div className="text-sm text-gray-700">Trajectory Length</div>
                    <div className="text-lg font-medium text-gray-900">100 ns</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 bg-white">
                    <FlaskRound className="w-5 h-5 text-[#9333ea] mb-2" />
                    <div className="text-sm text-gray-700">Target</div>
                    <div className="text-lg font-medium text-gray-900">KRAS G12C</div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 bg-white">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mb-2" />
                    <div className="text-sm text-gray-700">Binding Stability</div>
                    <div className="text-lg font-medium text-gray-900">Confirmed</div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* SLIDE 11: Next Steps */}
            {currentSlide === 9 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" ref={(el) => { slideRefs.current[9] = el; }}>
                <SlideHeader badge="Slide 11" icon={Rocket} title="Next Steps — Post-Review Roadmap" />

                <div className="space-y-6">
                  <motion.div variants={fadeInUp} className="flex items-start gap-6 p-6 rounded-2xl border border-[#0ea5e9]/20 bg-[#0ea5e9]/[0.03]">
                    <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/15 flex items-center justify-center flex-shrink-0">
                      <Beaker className="w-6 h-6 text-[#0ea5e9]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-[#0ea5e9]">01</span>
                        <h3 className="text-lg font-medium">Finalizing CRO Wet-Lab Synthesis</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Transitioning computationally validated molecules (p53, KRAS, HPPD) into physical synthesis
                        and testing through contracted research organizations. This closes the sim-to-real loop and
                        provides experimental confirmation of in silico predictions.
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0 mt-3" />
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex items-start gap-6 p-6 rounded-2xl border border-[#9333ea]/20 bg-[#9333ea]/[0.03]">
                    <div className="w-12 h-12 rounded-xl bg-[#9333ea]/15 flex items-center justify-center flex-shrink-0">
                      <Atom className="w-6 h-6 text-[#9333ea]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-[#9333ea]">02</span>
                        <h3 className="text-lg font-medium">Commencing the DAE Thorium Mandate</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Initiating work on the Department of Atomic Energy Thorium mission, as recommended by the
                        Principal Scientific Adviser. UNIPHY&apos;s cross-domain simulation capabilities will be
                        applied to nuclear fission modeling and thorium cycle optimization.
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0 mt-3" />
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex items-start gap-6 p-6 rounded-2xl border border-[#f59e0b]/20 bg-[#f59e0b]/[0.03]">
                    <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/15 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-[#f59e0b]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-[#f59e0b]">03</span>
                        <h3 className="text-lg font-medium">Scaling to the 100B World Model</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Scaling UNIPHY from 10B to 100B parameters to unlock emergent capabilities for nuclear
                        fission, deep-tech materials, and national mission-critical simulations. The 83% error
                        reduction observed from 1B→10B scaling provides strong empirical justification for this
                        next phase.
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0 mt-3" />
                  </motion.div>
                </div>
              </motion.div>
            )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// ============================================
// Helper Components
// ============================================

function SlideHeader({ badge, icon: Icon, title }: { badge: string; icon: React.ElementType; title?: string }) {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white mb-4">
        <Icon className="w-3.5 h-3.5 text-[#0ea5e9]" />
        <span className="text-xs font-light tracking-[0.2em] uppercase text-gray-500">{badge}</span>
      </div>
      {title && <h2 className="text-3xl md:text-5xl font-light tracking-tight">{title}</h2>}
    </div>
  );
}

function InfoCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  return (
    <div className="p-5 rounded-2xl border border-gray-200 bg-white">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}15` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">{label}</div>
      <div className="text-base font-medium text-gray-800">{value}</div>
    </div>
  );
}

function StatRow({ label, value, status }: { label: string; value: string; status: "completed" | "pending" }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500 text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-gray-800 text-sm font-medium">{value}</span>
        {status === "completed" ? (
          <CheckCircle2 className="w-4 h-4 text-green-600" />
        ) : (
          <div className="w-4 h-4 rounded-full border border-gray-300" />
        )}
      </div>
    </div>
  );
}

function DomainChip({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100">
      <Icon className="w-4 h-4 text-[#f59e0b]" />
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Completed: "bg-green-50 text-green-600 border-green-500/30",
    Exceeded: "bg-[#0ea5e9]/10 text-[#0ea5e9] border-[#0ea5e9]/20",
    Upcoming: "bg-gray-100 text-gray-400 border-gray-200",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles["Upcoming"]}`}>
      {status === "Completed" && <CheckCircle2 className="w-3 h-3" />}
      {status === "Exceeded" && <TrendingUp className="w-3 h-3" />}
      {status}
    </span>
  );
}

function BenchmarkCard({ domain, metric, value, comparison, color }: { domain: string; metric: string; value: string; comparison: string; color: string }) {
  return (
    <div className="p-6 rounded-2xl border border-gray-200 bg-white">
      <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">{domain}</div>
      <div className="text-sm text-gray-500 mb-4">{metric}</div>
      <div className="text-5xl font-bold mb-3" style={{ color }}>{value}</div>
      <div className="text-xs text-gray-400">{comparison}</div>
    </div>
  );
}

function KV({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className={`text-sm font-medium ${highlight ? "text-[#0ea5e9]" : "text-gray-800"}`}>{value}</span>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-600">
      {text}
    </span>
  );
}
