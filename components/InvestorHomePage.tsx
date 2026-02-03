"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CanvasLayer from "@/components/three/CanvasLayer";
import { 
  ArrowUpRight, 
  FileText, 
  Battery, 
  Atom, 
  Rocket, 
  Cpu, 
  Zap, 
  Globe, 
  Lock, 
  TrendingUp, 
  Layers, 
  Factory,
  Microscope,
  Beaker,
  Target,
  ChevronRight,
  Play,
  Shield,
  Database,
  Award,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Users,
  BarChart3
} from "lucide-react";

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

// ============================================
// CHAPTER 3: MATTER COMPILER - Interactive Diagram
// ============================================
function MatterCompilerDiagram() {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { 
      id: 0, 
      label: "Intent", 
      desc: "Define target properties", 
      icon: Target, 
      detail: "Specify exact material requirements: heat resistance, energy density, durability. No guesswork.",
      color: "#48cae4"
    },
    { 
      id: 1, 
      label: "AI Design", 
      desc: "3D Diffusion Transformer", 
      icon: Cpu, 
      detail: "SkandaX generates optimal mesoscale microstructure in minutes, not years.",
      color: "#a855f7"
    },
    { 
      id: 2, 
      label: "Robotics", 
      desc: "Autonomous synthesis", 
      icon: Factory, 
      detail: "Robotic labs synthesize and test materials 24/7 without human intervention.",
      color: "#22c55e"
    },
    { 
      id: 3, 
      label: "Sensors", 
      desc: "Real-time validation", 
      icon: Zap, 
      detail: "High-precision sensors validate performance against target specifications.",
      color: "#f59e0b"
    },
    { 
      id: 4, 
      label: "Data Loop", 
      desc: "Federated learning", 
      icon: Database, 
      detail: "Factory data stays private. Intelligence compounds globally. The moat deepens.",
      color: "#ef4444"
    },
  ];

  return (
    <div className="relative w-full">
      {/* Flow Diagram */}
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 mb-12">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === index;
          
          return (
            <div key={step.id} className="flex items-center gap-4 w-full md:w-auto">
              <motion.button
                onClick={() => setActiveStep(index)}
                className={`relative flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300 w-full md:w-40 ${
                  isActive 
                    ? "bg-gradient-to-br from-[#48cae4]/20 to-[#a855f7]/10 border-2 border-[#48cae4] shadow-lg shadow-[#48cae4]/20" 
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-to-br from-[#48cae4] to-[#a855f7] shadow-lg shadow-[#48cae4]/50" 
                    : "bg-white/10 border border-white/20"
                }`}>
                  <Icon className={`w-8 h-8 ${isActive ? "text-white" : "text-white/60"}`} />
                </div>
                
                <div className="text-center">
                  <p className={`text-sm font-bold tracking-wider uppercase transition-colors ${
                    isActive ? "text-[#48cae4]" : "text-white/70"
                  }`}>
                    {step.label}
                  </p>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-2 w-16 h-1 bg-gradient-to-r from-[#48cae4] to-[#a855f7] rounded-full"
                  />
                )}
              </motion.button>
              
              {index < steps.length - 1 && (
                <ChevronRight className="hidden md:block w-6 h-6 text-white/30 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Panel */}
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 backdrop-blur-sm"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#48cae4]/20 flex items-center justify-center flex-shrink-0">
            {(() => {
              const Icon = steps[activeStep].icon;
              return <Icon className="w-6 h-6 text-[#48cae4]" />;
            })()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[#48cae4] font-mono text-xs tracking-wider">STEP {activeStep + 1} OF 5</span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#48cae4]/50 to-transparent" />
            </div>
            <h4 className="text-2xl font-medium text-white mb-3">{steps[activeStep].label}</h4>
            <p className="text-white/70 leading-relaxed mb-2 text-lg">{steps[activeStep].desc}</p>
            <p className="text-white/50 leading-relaxed">{steps[activeStep].detail}</p>
          </div>
        </div>
      </motion.div>

      {/* Unit Economics Callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#48cae4]/10 to-[#a855f7]/10 border border-[#48cae4]/30"
      >
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <p className="text-white/60 text-sm mb-1">Traditional R&D Cycle</p>
            <p className="text-3xl font-bold text-white">5 Years</p>
          </div>
          <ArrowUpRight className="w-8 h-8 text-[#48cae4] rotate-90" />
          <div>
            <p className="text-[#48cae4] text-sm mb-1">Shodh AI Cycle</p>
            <p className="text-3xl font-bold text-[#48cae4]">6 Months</p>
          </div>
          <div className="w-full md:w-auto">
            <p className="text-white/90 text-lg font-medium">
              <span className="text-[#48cae4]">10x faster.</span> This is the unit economics that changes everything.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================
// CHAPTER 5: GENESIS PROTOCOL - Business Layers
// ============================================
const businessLayers = [
  {
    layer: "01",
    title: "The Bridge",
    subtitle: "NRE / Development Fees",
    description: "Cash flow from enterprise partnerships. We co-develop custom materials for industry leaders.",
    metric: "$2-5M",
    metricLabel: "per engagement",
    color: "#48cae4",
    icon: Beaker,
    features: ["Custom material design", "Pilot validation", "IP co-creation"],
    example: "Tata Steel pays $3M for custom alloy development"
  },
  {
    layer: "02",
    title: "The Rent",
    subtitle: "SaaS for Factory Lines",
    description: "Recurring revenue from deployed Matter Compilers. Factories pay per-use for continuous optimization.",
    metric: "$50K-200K",
    metricLabel: "annual per line",
    color: "#a855f7",
    icon: Factory,
    features: ["Real-time optimization", "Federated learning", "24/7 monitoring"],
    example: "100 factory lines = $10M ARR"
  },
  {
    layer: "03",
    title: "The Empire",
    subtitle: "Production Royalties",
    description: "Exponential upside from every unit produced using our materials. The true scale play.",
    metric: "1-5%",
    metricLabel: "per unit royalty",
    color: "#f59e0b",
    icon: TrendingUp,
    features: ["Per-unit fees", "Global scale", "Passive income"],
    example: "1M EVs/year = $50-250M in royalties"
  }
];

// ============================================
// CHAPTER 6: ROADMAP - $500M Milestones
// ============================================
const roadmapPhases = [
  {
    phase: "PHASE 1",
    title: "Beachhead",
    focus: "EV Batteries & Energy Storage",
    timeline: "Months 0-12",
    milestone: "Closed-Loop Validation",
    valuation: "$50M",
    capital: "$5M",
    description: "Prove the Matter Compiler with silicon anode batteries. First commercial deployment with Tata/Tesla.",
    color: "#48cae4",
    icon: Battery,
    kpis: ["First paying customer", "AI→Robot→Data loop proven", "94%+ prediction accuracy"]
  },
  {
    phase: "PHASE 2",
    title: "Expansion",
    focus: "Hydrogen & Membranes",
    timeline: "Months 12-24",
    milestone: "Multi-Vertical Traction",
    valuation: "$200M",
    capital: "$15M",
    description: "Scale to hydrogen catalysts and separation membranes. 10+ enterprise clients across 3 verticals.",
    color: "#a855f7",
    icon: Atom,
    kpis: ["10+ enterprise clients", "$10M ARR", "3 material verticals"]
  },
  {
    phase: "PHASE 3",
    title: "Endgame",
    focus: "Aerospace & Fusion",
    timeline: "Months 24-36",
    milestone: "Global Category Leader",
    valuation: "$500M+",
    capital: "$20M total",
    description: "Enter aerospace materials and fusion reactor components. IPO or strategic acquisition by energy/tech titan.",
    color: "#f59e0b",
    icon: Rocket,
    kpis: ["Category leadership", "$50M+ ARR", "Strategic exit options"]
  }
];

// ============================================
// CHAPTER 7: DATA ROOM - Whitepaper Cards
// ============================================
const dataRoomCards = [
  {
    title: "The Skanda Protocol",
    subtitle: "Technical Whitepaper",
    description: "Deep dive into our 3D Diffusion Transformers, Physics Kernels, and Federated Learning architecture.",
    pages: "42 pages",
    locked: false,
    icon: FileText,
    color: "#48cae4",
    link: "/protocol"
  },
  {
    title: "The Mesoscale Advantage",
    subtitle: "Research Blog",
    description: "Why atomic models fail and how mesoscale simulation unlocks factory-ready materials.",
    pages: "15 min read",
    locked: false,
    icon: Microscope,
    color: "#a855f7",
    link: "/blog/mesoscale"
  },
  {
    title: "Sim-to-Real Calibration",
    subtitle: "Case Study",
    description: "How we achieved 94% accuracy in predicting real-world battery performance from simulation.",
    pages: "Case Study",
    locked: false,
    icon: Target,
    color: "#22c55e",
    link: "/case-studies/sim-to-real"
  },
  {
    title: "Sovereign Patent Strategy",
    subtitle: "Protected Access",
    description: "Full patent portfolio, team credentials, and cap table. NDA required for access.",
    pages: "Investor Only",
    locked: true,
    icon: Lock,
    color: "#f59e0b",
    link: "#investor-portal"
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
export default function InvestorHomePage() {
  return (
    <div className="relative min-h-screen w-full text-[#f0f0ff] selection:bg-[#48cae4] selection:text-[#081421] overflow-x-hidden">
      <CanvasLayer />

      <main id="html-scroll-container" className="relative z-[2] w-full pointer-events-none">
        <Navbar />

        {/* ============================================ */}
        {/* CHAPTER 1: THE INEVITABILITY - Hero */}
        {/* ============================================ */}
        <section className="min-h-screen flex items-center px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto pt-28 md:pt-36 pb-12">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div 
              className="lg:col-span-7 pointer-events-auto"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                <div className="bg-[#24292F]/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-[#48cae4] rounded-sm shadow-[0_0_8px_#48cae4] animate-pulse" />
                  <span className="text-[#ffffff] text-xs font-bold tracking-[0.2em] uppercase">Shodh AI</span>
                </div>
                <div className="bg-[#48cae4]/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-[#48cae4]/30">
                  <span className="text-[#48cae4] text-xs font-bold tracking-[0.2em] uppercase">IndiaAI Mission</span>
                </div>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-12xl font-medium tracking-tight leading-[1.05] break-words"
              >
                BUILDING
                <br />
                THE TYPE 1
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#48cae4] to-white">
                  CIVILIZATION.
                </span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="mt-6 text-base md:text-xl text-white/90 font-light max-w-2xl drop-shadow-md leading-relaxed"
              >
                AI for Science isn't just coming—it's the next <strong className="text-white">$0 to $1 Trillion market</strong>. 
                We are at the perfect "Compute + Physics" intersection. 
                <span className="text-[#48cae4]"> Shodh AI is India's sovereign answer</span> to the global race for material dominance.
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <p className="text-white/70 text-sm italic leading-relaxed">
                  "The world is moving from <span className="text-white font-medium">Discovery by Luck</span> to <span className="text-[#48cae4] font-medium">Discovery by Design</span>. It is inevitable."
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="mt-10 flex flex-wrap gap-[20px]"
              >
                <Link
                  href="#investor-portal"
                  className="inline-flex items-center gap-2 rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] rounded-br-[28px] bg-gradient-to-r from-[#48cae4] to-[#a855f7] text-white px-8 py-4 text-[16px] font-medium hover:shadow-lg hover:shadow-[#48cae4]/30 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  REQUEST DATA ROOM ACCESS
                </Link>
                <Link
                  href="/genesis"
                  className="inline-flex items-center gap-2 rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] rounded-br-[28px] text-[#ffffff] px-8 py-4 text-[16px] font-medium border border-[#ffffff] hover:bg-white/10 transition-all"
                >
                  READ THE MANIFESTO
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="lg:col-span-5 pointer-events-auto mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="rounded-2xl border border-white/20 bg-black/40 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs text-white/70 tracking-[0.2em] uppercase font-semibold">The Thesis</span>
                  <Sparkles className="w-5 h-5 text-[#48cae4]" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-4">The Perfect Storm</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#48cae4] flex-shrink-0 mt-0.5" />
                    <p className="text-white/80 leading-relaxed">
                      <strong className="text-white">Compute is abundant.</strong> GPUs are commoditized. The infrastructure is ready.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#48cae4] flex-shrink-0 mt-0.5" />
                    <p className="text-white/80 leading-relaxed">
                      <strong className="text-white">Physics is understood.</strong> We know the equations. We just need to solve them at scale.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#48cae4] flex-shrink-0 mt-0.5" />
                    <p className="text-white/80 leading-relaxed">
                      <strong className="text-white">The market is desperate.</strong> Every industry needs better materials. Yesterday.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CHAPTER 2: THE "ZOMBIE MATERIAL" CRISIS */}
        {/* ============================================ */}
        <section className="min-h-screen py-32 px-6 md:px-10 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-20"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full backdrop-blur-md border border-red-500/30 mb-6">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-xs font-bold tracking-[0.15em] uppercase">
                  The Problem
                </span>
              </motion.div>

              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-medium uppercase tracking-tight text-white mb-6 leading-[1.1]"
              >
                BEYOND THE
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-400">
                  SCIENCE FICTION.
                </span>
              </motion.h2>

              <motion.p 
                variants={fadeInUp}
                className="text-xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed"
              >
                Our competitors focus on the <strong className="text-white">Lab</strong>. 
                We focus on the <strong className="text-[#48cae4]">Factory</strong>.
                <br />
                <span className="text-white/90 mt-2 block">
                  We don't just invent the battery; we empower every factory in the world to invent their own.
                </span>
              </motion.p>
            </motion.div>

            {/* Competitor Comparison */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 pointer-events-auto"
            >
              <motion.div variants={scaleIn} className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white">The Old Way</h3>
                </div>
                <p className="text-white/60 leading-relaxed mb-4">
                  Radical AI, Lila, and others build materials in the lab. Beautiful science. But it stops at the lab door.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-red-400/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="text-sm">Lab-scale only</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-400/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="text-sm">No factory integration</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-400/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="text-sm">Limited scalability</span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={scaleIn} className="p-8 rounded-2xl bg-gradient-to-br from-[#48cae4]/10 to-[#a855f7]/10 border-2 border-[#48cae4]/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#48cae4]/30 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#48cae4]" />
                  </div>
                  <h3 className="text-xl font-medium text-white">The Shodh Way</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-4">
                  We build the <strong className="text-[#48cae4]">Matter Compiler</strong>—the engine that makes materials possible at factory scale.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#48cae4]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">Factory-first design</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#48cae4]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">Closed-loop AI→Robot→Data</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#48cae4]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">Global scale from day one</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* The Flex */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-gradient-to-r from-[#48cae4]/20 via-[#a855f7]/20 to-[#48cae4]/20 border border-[#48cae4]/30 text-center pointer-events-auto"
            >
              <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
                "We aren't just building a better battery; <br className="hidden md:block" />
                we are building <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48cae4] to-[#a855f7]">the machine that makes the battery possible.</span>"
              </p>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CHAPTER 3: THE MATTER COMPILER */}
        {/* ============================================ */}
        <section className="min-h-screen py-32 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-20"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-[#48cae4]/10 rounded-full backdrop-blur-md border border-[#48cae4]/30 mb-6">
                <Cpu className="w-4 h-4 text-[#48cae4]" />
                <span className="text-[#48cae4] text-xs font-bold tracking-[0.15em] uppercase">
                  The Technology
                </span>
              </motion.div>

              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-medium uppercase tracking-tight text-white mb-6 leading-[1.1]"
              >
                TRANSLATING INTENT
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48cae4] via-[#a855f7] to-[#48cae4]">
                  INTO REALITY.
                </span>
              </motion.h2>

              <motion.p 
                variants={fadeInUp}
                className="text-xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed mb-4"
              >
                Introducing <strong className="text-[#48cae4]">SkandaX</strong>—the first "Matter Compiler."
                <br />
                <span className="text-white/90">
                  Turning a 5-year cycle into 6 months. This is the unit economics that changes everything.
                </span>
              </motion.p>
            </motion.div>

            {/* Interactive Diagram */}
            <div className="pointer-events-auto mb-20">
              <MatterCompilerDiagram />
            </div>

            {/* The Tech Stack */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto"
            >
              <motion.div variants={scaleIn} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#48cae4]/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#48cae4]/20 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-[#48cae4]" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">3D Diffusion Transformers</h3>
                <p className="text-white/60 leading-relaxed">
                  Generative AI trained on physics-first simulations. Designs materials at the mesoscale—where it actually matters.
                </p>
              </motion.div>

              <motion.div variants={scaleIn} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#a855f7]/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#a855f7]/20 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-[#a855f7]" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Physics Kernels</h3>
                <p className="text-white/60 leading-relaxed">
                  Ground truth from first principles. No black boxes. Every prediction is rooted in thermodynamics and mechanics.
                </p>
              </motion.div>

              <motion.div variants={scaleIn} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#22c55e]/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#22c55e]/20 flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-[#22c55e]" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Federated Learning</h3>
                <p className="text-white/60 leading-relaxed">
                  Factory data stays theirs. The intelligence stays ours. The moat deepens with every deployment.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CHAPTER 4: THE SOVEREIGN MOAT */}
        {/* ============================================ */}
        <section className="relative w-full pointer-events-auto bg-[#081421] py-32 px-6 md:px-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-20"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff9933]/10 rounded-full backdrop-blur-md border border-[#ff9933]/30 mb-6">
                <Shield className="w-4 h-4 text-[#ff9933]" />
                <span className="text-[#ff9933] text-xs font-bold tracking-[0.15em] uppercase">
                  Sovereign Advantage
                </span>
              </motion.div>

              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-medium uppercase tracking-tight text-white mb-6 leading-[1.1]"
              >
                BUILT IN INDIA.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9933] via-white to-[#138808]">
                  SCALED FOR THE WORLD.
                </span>
              </motion.h2>

              <motion.p 
                variants={fadeInUp}
                className="text-xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed"
              >
                Selected by the <strong className="text-white">IndiaAI Mission</strong>. 
                The government provides the CAPEX (GPUs and Robots), allowing our capital to stay focused on <span className="text-[#48cae4]">IP and Talent</span>.
              </motion.p>
            </motion.div>

            {/* Three Pillars */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            >
              <motion.div variants={scaleIn} className="p-8 rounded-2xl bg-gradient-to-br from-[#ff9933]/10 to-transparent border border-[#ff9933]/30">
                <div className="w-12 h-12 rounded-xl bg-[#ff9933]/20 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-[#ff9933]" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">The Mandate</h3>
                <p className="text-white/70 leading-relaxed">
                  Official partner of IndiaAI Mission. Government-backed infrastructure. National priority status.
                </p>
              </motion.div>

              <motion.div variants={scaleIn} className="p-8 rounded-2xl bg-gradient-to-br from-[#48cae4]/10 to-transparent border border-[#48cae4]/30">
                <div className="w-12 h-12 rounded-xl bg-[#48cae4]/20 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#48cae4]" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">The Talent</h3>
                <p className="text-white/70 leading-relaxed">
                  Built by the top 0.00001% of India's engineering elite. IIT + Stanford + MIT pedigree.
                </p>
              </motion.div>

              <motion.div variants={scaleIn} className="p-8 rounded-2xl bg-gradient-to-br from-[#a855f7]/10 to-transparent border border-[#a855f7]/30">
                <div className="w-12 h-12 rounded-xl bg-[#a855f7]/20 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-[#a855f7]" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">The Partners</h3>
                <p className="text-white/70 leading-relaxed">
                  Backed by NVIDIA, Google, and global energy leaders. Access to compute and distribution.
                </p>
              </motion.div>
            </motion.div>

            {/* Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border-t border-white/10 pt-16"
            >
              <p className="text-center text-xs font-bold tracking-[0.2em] text-white/30 uppercase mb-12">
                Backed By National & Global Leaders
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold text-white tracking-tighter">
                    India<span className="text-[#ff9933]">AI</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-white tracking-tight">NVIDIA</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-white tracking-tight">Google</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CHAPTER 5: THE GENESIS PROTOCOL - Business Model */}
        {/* ============================================ */}
        <section className="min-h-screen py-32 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-20"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-[#22c55e]/10 rounded-full backdrop-blur-md border border-[#22c55e]/30 mb-6">
                <DollarSign className="w-4 h-4 text-[#22c55e]" />
                <span className="text-[#22c55e] text-xs font-bold tracking-[0.15em] uppercase">
                  The Business Model
                </span>
              </motion.div>

              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-medium uppercase tracking-tight text-white mb-6 leading-[1.1]"
              >
                CAPTURING VALUE
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48cae4] via-[#a855f7] to-[#f59e0b]">
                  AT EVERY SCALE.
                </span>
              </motion.h2>

              <motion.p 
                variants={fadeInUp}
                className="text-xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed"
              >
                Three revenue layers. From cash flow to recurring to exponential. 
                <br />
                <span className="text-white/90">
                  We bridge the "Valley of Death" for the world's biggest conglomerates.
                </span>
              </motion.p>
            </motion.div>

            {/* Business Layers */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8 pointer-events-auto"
            >
              {businessLayers.map((layer, index) => {
                const Icon = layer.icon;
                return (
                  <motion.div
                    key={layer.layer}
                    variants={fadeInUp}
                    className="p-8 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-1">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: `${layer.color}20` }}
                        >
                          <Icon className="w-8 h-8" style={{ color: layer.color }} />
                        </div>
                      </div>

                      <div className="lg:col-span-7">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-white/40 font-mono text-sm">LAYER {layer.layer}</span>
                          <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        </div>
                        <h3 className="text-3xl font-medium text-white mb-2">{layer.title}</h3>
                        <p className="text-white/50 text-sm uppercase tracking-wider mb-4">{layer.subtitle}</p>
                        <p className="text-white/70 leading-relaxed mb-4">{layer.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {layer.features.map((feature, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1 rounded-full text-xs border"
                              style={{ 
                                borderColor: `${layer.color}40`,
                                backgroundColor: `${layer.color}10`,
                                color: layer.color
                              }}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-4">
                        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-white/50 text-sm mb-2">{layer.metricLabel}</p>
                          <p className="text-4xl font-bold mb-4" style={{ color: layer.color }}>
                            {layer.metric}
                          </p>
                          <p className="text-white/60 text-sm italic">
                            e.g., {layer.example}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 p-10 rounded-3xl bg-gradient-to-r from-[#22c55e]/20 via-[#48cae4]/20 to-[#a855f7]/20 border border-[#48cae4]/30 text-center pointer-events-auto"
            >
              <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
                "We don't just sell software. <br className="hidden md:block" />
                We sell <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48cae4] to-[#a855f7]">the future of manufacturing.</span>"
              </p>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CHAPTER 6: THE ROADMAP - $500M Path */}
        {/* ============================================ */}
        <section className="min-h-screen py-32 px-6 md:px-10 bg-gradient-to-b from-transparent via-[#48cae4]/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-20"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-[#f59e0b]/10 rounded-full backdrop-blur-md border border-[#f59e0b]/30 mb-6">
                <TrendingUp className="w-4 h-4 text-[#f59e0b]" />
                <span className="text-[#f59e0b] text-xs font-bold tracking-[0.15em] uppercase">
                  The Roadmap
                </span>
              </motion.div>

              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-medium uppercase tracking-tight text-white mb-6 leading-[1.1]"
              >
                THE ROAD TO
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48cae4] via-[#a855f7] to-[#f59e0b]">
                  $500M VALUATION.
                </span>
              </motion.h2>

              <motion.p 
                variants={fadeInUp}
                className="text-xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed"
              >
                <strong className="text-white">$20M fuels a 24-month high-intensity burn</strong> to hit the "Closed-Loop" milestone.
                <br />
                <span className="text-white/90">
                  Strategic acquisition by a global energy/tech titan or a sovereign IPO.
                </span>
              </motion.p>
            </motion.div>

            {/* Roadmap Timeline */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8 pointer-events-auto"
            >
              {roadmapPhases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <motion.div
                    key={phase.phase}
                    variants={fadeInUp}
                    className="relative p-8 rounded-2xl border transition-all"
                    style={{ 
                      borderColor: `${phase.color}40`,
                      backgroundColor: `${phase.color}05`
                    }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      <div className="lg:col-span-2">
                        <div 
                          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: `${phase.color}20` }}
                        >
                          <Icon className="w-10 h-10" style={{ color: phase.color }} />
                        </div>
                        <span 
                          className="text-xs font-bold tracking-wider uppercase"
                          style={{ color: phase.color }}
                        >
                          {phase.phase}
                        </span>
                      </div>

                      <div className="lg:col-span-6">
                        <h3 className="text-3xl font-medium text-white mb-2">{phase.title}</h3>
                        <p className="text-white/50 text-sm uppercase tracking-wider mb-4">{phase.focus}</p>
                        <p className="text-white/70 leading-relaxed mb-6">{phase.description}</p>
                        
                        <div className="space-y-2">
                          <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Key Milestones</p>
                          {phase.kpis.map((kpi, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" style={{ color: phase.color }} />
                              <span className="text-white/70 text-sm">{kpi}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-4">
                        <div className="space-y-4">
                          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-white/50 text-sm mb-2">Timeline</p>
                            <p className="text-2xl font-bold text-white">{phase.timeline}</p>
                          </div>
                          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-white/50 text-sm mb-2">Target Valuation</p>
                            <p className="text-3xl font-bold" style={{ color: phase.color }}>
                              {phase.valuation}
                            </p>
                          </div>
                          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-white/50 text-sm mb-2">Capital Required</p>
                            <p className="text-2xl font-bold text-white">{phase.capital}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {index < roadmapPhases.length - 1 && (
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                        <ChevronRight className="w-8 h-8 text-white/20 rotate-90" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CHAPTER 7: THE DATA ROOM */}
        {/* ============================================ */}
        <section className="min-h-screen py-32 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-20"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20 mb-6">
                <Database className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-bold tracking-[0.15em] uppercase">
                  Architecture & Evidence
                </span>
              </motion.div>

              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-medium uppercase tracking-tight text-white mb-6 leading-[1.1]"
              >
                THE DATA ROOM.
              </motion.h2>

              <motion.p 
                variants={fadeInUp}
                className="text-xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed"
              >
                Deep technical documentation, case studies, and protected investor materials.
              </motion.p>
            </motion.div>

            {/* Data Room Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 pointer-events-auto"
            >
              {dataRoomCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    variants={scaleIn}
                    className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden"
                  >
                    {card.locked && (
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/20 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-[#f59e0b]" />
                        </div>
                      </div>
                    )}

                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${card.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: card.color }} />
                    </div>

                    <h3 className="text-2xl font-medium text-white mb-2">{card.title}</h3>
                    <p className="text-white/50 text-sm uppercase tracking-wider mb-4">{card.subtitle}</p>
                    <p className="text-white/70 leading-relaxed mb-6">{card.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-sm">{card.pages}</span>
                      {!card.locked ? (
                        <Link
                          href={card.link}
                          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                          style={{ color: card.color }}
                        >
                          Read More
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f59e0b]/20 text-[#f59e0b] text-sm font-medium hover:bg-[#f59e0b]/30 transition-all">
                          <Lock className="w-3 h-3" />
                          Request Access
                        </button>
                      )}
                    </div>

                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${card.color}10, transparent 70%)`
                      }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Investor Portal CTA */}
            <motion.div
              id="investor-portal"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-[#48cae4]/20 via-[#a855f7]/20 to-[#f59e0b]/20 border-2 border-[#48cae4]/30 text-center pointer-events-auto"
            >
              <Lock className="w-16 h-16 text-[#48cae4] mx-auto mb-6" />
              <h3 className="text-3xl md:text-4xl font-medium text-white mb-4">
                Ready to See the Full Picture?
              </h3>
              <p className="text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto">
                Access our complete investor data room: patents, team credentials, cap table, financial projections, and technical architecture.
              </p>
              <button className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#48cae4] to-[#a855f7] text-white text-lg font-medium hover:shadow-lg hover:shadow-[#48cae4]/30 transition-all">
                <Lock className="w-5 h-5" />
                REQUEST DATA ROOM ACCESS
                <ArrowUpRight className="w-5 h-5" />
              </button>
              <p className="text-white/40 text-sm mt-4">
                NDA required • Qualified investors only
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
