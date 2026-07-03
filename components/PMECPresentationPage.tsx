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
  DollarSign,
  HelpCircle,
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
  { id: 10, title: "Financials", icon: DollarSign },
  { id: 11, title: "Next Steps", icon: Rocket },
  { id: 12, title: "Q&A", icon: HelpCircle },
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

      {/* Side Navigation */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-1 pl-4">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(idx)}
            className={`group flex items-center gap-3 rounded-r-lg px-3 py-2 transition-all ${
              currentSlide === idx
                ? "bg-[#0ea5e9]/10 border-l-2 border-[#0ea5e9]"
                : "border-l-2 border-transparent hover:border-gray-300"
            }`}
          >
            <slide.icon className={`w-4 h-4 ${currentSlide === idx ? "text-[#0ea5e9]" : "text-gray-400"}`} />
            <span className={`text-xs font-medium ${currentSlide === idx ? "text-[#0ea5e9]" : "text-gray-400"} hidden xl:inline`}>
              {slide.title}
            </span>
          </button>
        ))}
      </div>

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

      <main className="max-w-6xl mx-auto px-6 lg:px-20 py-16 lg:pl-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Slide Counter */}
            <div className="flex items-center gap-3 mb-8 text-gray-400">
              <span className="text-sm font-mono">
                {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 max-w-[100px] bg-gray-200" />
              <span className="text-xs uppercase tracking-[0.2em]">{slides[currentSlide].title}</span>
            </div>

            {/* SLIDE 1: Title & Project Overview */}
            {currentSlide === 0 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" ref={(el) => { slideRefs.current[0] = el; }}>
                <SlideHeader badge="PMEC Review Presentation" icon={Target} />
                <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-[1.1]">
                  Developing a Universal
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] via-[#9333ea] to-[#f59e0b]">
                    Foundation Model (UNIPHY)
                  </span>
                  <br />
                  for Multi-Domain Physical
                  <br />
                  & Chemical Simulations
                </motion.h1>

                <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                  <InfoCard
                    icon={BrainCircuit}
                    label="Core Architecture"
                    value="Mamba-MoE + Hydra Lobes"
                    color="#0ea5e9"
                  />
                  <InfoCard
                    icon={Database}
                    label="Data Scale"
                    value="15.1M Samples / 200B Tokens"
                    color="#9333ea"
                  />
                  <InfoCard
                    icon={Globe}
                    label="Domains"
                    value="Oncology · AgTech · Energy · Fluids"
                    color="#f59e0b"
                  />
                </motion.div>

                <motion.div variants={fadeInUp} className="mt-12 p-6 rounded-2xl border border-gray-200 bg-white">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    This presentation documents progress under the PMEC Letter of Agreement, covering model
                    development, scientific validation, industrial case studies, and the roadmap toward the
                    100B World Model for national missions.
                  </p>
                </motion.div>
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
                <motion.p variants={fadeInUp} className="text-gray-500 text-sm mb-8">
                  LoA Deliverables — On time or ahead of schedule
                </motion.p>

                <motion.div variants={fadeInUp} className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-white">
                        <th className="text-left p-4 font-medium text-gray-600 uppercase tracking-wider text-xs">LoA Milestone</th>
                        <th className="text-left p-4 font-medium text-gray-600 uppercase tracking-wider text-xs">Timeline</th>
                        <th className="text-left p-4 font-medium text-gray-600 uppercase tracking-wider text-xs">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { milestone: "1B Parameter Model Training", timeline: "Q1–Q2", status: "Completed" },
                        { milestone: "Data Pipeline (15.1M samples, 200B tokens)", timeline: "Q1–Q3", status: "Completed" },
                        { milestone: "10B Parameter Model Training", timeline: "Q3–Q4", status: "Completed" },
                        { milestone: "Oncology Validation (p53, KRAS)", timeline: "Q3", status: "Exceeded" },
                        { milestone: "AgTech Validation (HPPD Herbicide)", timeline: "Q4", status: "Completed" },
                        { milestone: "Industrial Materials (Battery, Coating)", timeline: "Q4", status: "Completed" },
                        { milestone: "Sim-to-Real Automation (GFlowNet)", timeline: "Q4", status: "Completed" },
                        { milestone: "Industrial Case Studies (Aarti, Jubilant)", timeline: "Q4", status: "Exceeded" },
                        { milestone: "100B World Model Scaling", timeline: "Next Phase", status: "Upcoming" },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-white transition-colors">
                          <td className="p-4 text-gray-800">{row.milestone}</td>
                          <td className="p-4 text-gray-500">{row.timeline}</td>
                          <td className="p-4">
                            <StatusBadge status={row.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>

                <motion.div variants={fadeInUp} className="mt-6 flex gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="text-gray-600">Completed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-[#0ea5e9]/80" />
                    <span className="text-gray-600">Exceeded</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-gray-300" />
                    <span className="text-gray-600">Upcoming</span>
                  </div>
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

                {/* Architecture Details */}
                <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-[#0ea5e9]/20 bg-[#0ea5e9]/[0.03] mb-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <CircuitBoard className="w-5 h-5 text-[#0ea5e9]" />
                    Mamba-MoE Backbone + Hydra Lobes
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-[#0ea5e9] mb-1">Mamba-MoE Backbone</div>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Long-context physics engine built for time-series, video, molecular, and PDE-style data.
                        Mamba/SSM layers handle long physical sequences efficiently without Transformer-style
                        memory explosion. MoE experts route different physics tokens to specialized experts while
                        a shared expert preserves global consistency.
                      </p>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#9333ea] mb-1">Hydra Lobes (Specialized Heads)</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                          <ArrowRight className="w-3 h-3 text-gray-300" />
                          <span className="text-xs text-gray-600">Language-to-physics encoder</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                          <ArrowRight className="w-3 h-3 text-gray-300" />
                          <span className="text-xs text-gray-600">Rheology / materials decoder</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                          <ArrowRight className="w-3 h-3 text-gray-300" />
                          <span className="text-xs text-gray-600">Quantum chemistry decoder</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                          <ArrowRight className="w-3 h-3 text-gray-300" />
                          <span className="text-xs text-gray-600">Fluid / video dynamics decoder</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 md:col-span-2">
                          <ArrowRight className="w-3 h-3 text-gray-300" />
                          <span className="text-xs text-gray-600">Reward-oracle / design loop interface</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-gray-50 border-l-2 border-[#0ea5e9]/30">
                    <p className="text-gray-500 text-xs italic leading-relaxed">
                      &ldquo;UNIPHY has one central physics brain, but many specialized lobes that let it understand
                      and generate different scientific modalities.&rdquo;
                    </p>
                  </div>
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

                <motion.p variants={fadeInUp} className="text-gray-500 text-sm mb-8">
                  Operating at global State-of-the-Art — benchmarked against top-tier publications
                </motion.p>

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

                <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-gray-200 bg-white">
                  <h3 className="text-sm font-medium text-gray-700 mb-4 uppercase tracking-wider">Benchmark Comparison Table</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left p-3 text-gray-400 text-xs uppercase">Benchmark</th>
                          <th className="text-left p-3 text-gray-400 text-xs uppercase">UNIPHY</th>
                          <th className="text-left p-3 text-gray-400 text-xs uppercase">SOTA (Published)</th>
                          <th className="text-left p-3 text-gray-400 text-xs uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { bench: "MD17 Force MAE (Quantum)", uniphy: "0.042", sota: "0.049", status: "Exceeded" },
                          { bench: "Rheology nRMSE (Fluids)", uniphy: "0.054", sota: "0.085", status: "Exceeded" },
                          { bench: "BioMatrix Affinity (Oncology)", uniphy: "40 pM", sota: "~500 pM", status: "Exceeded" },
                          { bench: "Thermal Stability (Materials)", uniphy: "150°C MACE", sota: "120°C std.", status: "Exceeded" },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-gray-100">
                            <td className="p-3 text-gray-700">{row.bench}</td>
                            <td className="p-3 text-[#0ea5e9] font-mono font-medium">{row.uniphy}</td>
                            <td className="p-3 text-gray-400 font-mono">{row.sota}</td>
                            <td className="p-3">
                              <span className="inline-flex items-center gap-1 text-xs text-green-600">
                                <CheckCircle2 className="w-3 h-3" /> {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <motion.div variants={fadeInUp} className="p-5 rounded-2xl border border-[#0ea5e9]/20 bg-[#0ea5e9]/[0.03]">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4 text-[#0ea5e9]" />
                      <span className="text-sm font-medium text-[#0ea5e9]">Versatility</span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Single AI engine validates both human therapeutics and agricultural actives.
                    </p>
                  </motion.div>
                  <motion.div variants={fadeInUp} className="p-5 rounded-2xl border border-[#9333ea]/20 bg-[#9333ea]/[0.03]">
                    <div className="flex items-center gap-2 mb-2">
                      <Factory className="w-4 h-4 text-[#9333ea]" />
                      <span className="text-sm font-medium text-[#9333ea]">Manufacturability</span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Built-in retrosynthesis ensures leads are synthetically viable.
                    </p>
                  </motion.div>
                  <motion.div variants={fadeInUp} className="p-5 rounded-2xl border border-[#f59e0b]/20 bg-[#f59e0b]/[0.03]">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-[#f59e0b]" />
                      <span className="text-sm font-medium text-[#f59e0b]">Safety-First</span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Proactive screening against toxic motifs and environmental persistence.
                    </p>
                  </motion.div>
                </div>

                {/* H Metric */}
                <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-gray-200 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-[#0ea5e9]">H</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">The &ldquo;H&rdquo; Metric — Hit-to-Late-Stage Rate</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Our rigorous in silico ADMET/Toxicity filters systematically increase the clinical survival
                        rate of discovered molecules. By applying multi-stage filtering—absorption, distribution,
                        metabolism, excretion, and toxicity—before synthesis, we dramatically reduce late-stage
                        attrition, ensuring that only the most viable candidates proceed to wet-lab validation.
                      </p>
                    </div>
                  </div>
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
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Both materials meet or exceed current industrial safety and environmental standards. The
                    battery polymer survives extreme thermal stress testing, while the PFAS-free coating achieves
                    hydrophobic performance competitive with legacy fluoropolymer solutions—without environmental
                    persistence.
                  </p>
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
                    <source src="/13815479_3840_2160_100fps.mp4" type="video/mp4" />
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

            {/* SLIDE 10: Financials */}
            {currentSlide === 9 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" ref={(el) => { slideRefs.current[9] = el; }}>
                <SlideHeader badge="Slide 10" icon={DollarSign} title="Utilization of Support" />

                <motion.p variants={fadeInUp} className="text-gray-500 text-sm mb-8">
                  Summary of grant fund allocation across critical infrastructure and validation activities
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/15 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-[#0ea5e9]" />
                      </div>
                      <h3 className="text-base font-medium">GPU Cluster Allocation</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Primary compute infrastructure for training the 1B and 10B parameter models. Sustained
                      throughput enabled the 200B token data generation pipeline.
                    </p>
                    <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-[#0ea5e9] rounded-full" style={{ width: "45%" }} />
                    </div>
                    <div className="mt-2 text-xs text-gray-400">~45% of total allocation</div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#9333ea]/15 flex items-center justify-center">
                        <Database className="w-5 h-5 text-[#9333ea]" />
                      </div>
                      <h3 className="text-base font-medium">Data Storage & Pipeline</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Scalable storage infrastructure for 15.1M multi-domain physics samples, including
                      preprocessing, curation, and quality assurance pipelines.
                    </p>
                    <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-[#9333ea] rounded-full" style={{ width: "25%" }} />
                    </div>
                    <div className="mt-2 text-xs text-gray-400">~25% of total allocation</div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/15 flex items-center justify-center">
                        <Beaker className="w-5 h-5 text-[#f59e0b]" />
                      </div>
                      <h3 className="text-base font-medium">CRO Synthesis Contracts</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Upcoming wet-lab validation contracts with Contract Research Organizations for physical
                      synthesis and testing of computationally discovered molecules.
                    </p>
                    <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: "20%" }} />
                    </div>
                    <div className="mt-2 text-xs text-gray-400">~20% of total allocation</div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="p-6 rounded-2xl border border-gray-200 bg-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-gray-600" />
                      </div>
                      <h3 className="text-base font-medium">Robotics & Operations</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Opentrons robotic lab protocol development, sim-to-real automation infrastructure, and
                      operational overhead for the research team.
                    </p>
                    <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-gray-400 rounded-full" style={{ width: "10%" }} />
                    </div>
                    <div className="mt-2 text-xs text-gray-400">~10% of total allocation</div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* SLIDE 11: Next Steps */}
            {currentSlide === 10 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" ref={(el) => { slideRefs.current[10] = el; }}>
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

            {/* SLIDE 12: Q&A */}
            {currentSlide === 11 && (
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" ref={(el) => { slideRefs.current[11] = el; }} className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <motion.div variants={fadeInUp} className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0ea5e9]/20 to-[#9333ea]/20 border border-gray-200 flex items-center justify-center mb-8">
                  <HelpCircle className="w-10 h-10 text-gray-600" />
                </motion.div>

                <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-light tracking-tight mb-6">
                  Q<span className="text-[#0ea5e9]">&amp;</span>A
                </motion.h1>

                <motion.p variants={fadeInUp} className="text-gray-500 text-lg max-w-md leading-relaxed mb-12">
                  Thank you for your attention. We welcome your questions on any aspect of the UNIPHY program,
                  technical results, or the roadmap ahead.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center">
                  <div className="px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-500">
                    Technical Architecture
                  </div>
                  <div className="px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-500">
                    Validation Results
                  </div>
                  <div className="px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-500">
                    Industrial Applications
                  </div>
                  <div className="px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-500">
                    DAE Thorium Mission
                  </div>
                  <div className="px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-500">
                    100B Scaling Plan
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="mt-16 flex items-center gap-2 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-[#0ea5e9] rounded-full" />
                  <span className="tracking-[0.2em] uppercase">Shodh AI · PMEC Review</span>
                </motion.div>
              </motion.div>
            )}
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
