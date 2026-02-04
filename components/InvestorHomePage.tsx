"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";
import Footer from "@/components/Footer";
import CanvasLayer from "@/components/three/CanvasLayer";
import InvestmentThesisSection from "@/components/InvestmentThesisSection";
import VisualWorkflow from "@/components/VisualWorkflow";
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
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] } }
};


// ============================================
// CHAPTER 5: GENESIS PROTOCOL - Business Layers
// ============================================
const businessLayers = [
  {
    layer: "01",
    title: "Strategic Design Partnerships",
    subtitle: "The FDE Model",
    description: "We deploy Forward Deployed Engineers (FDEs) directly into R&D centers of Tier-1 OEMs in Japan and Europe. Partners pay for 18-month Design Sprints where our engineers use SkandaX to design next-gen Silicon or Sodium-Ion recipes on-site.",
    metric: "$3M-7M",
    metricLabel: "per 18-month sprint",
    color: "#48cae4",
    icon: Beaker,
    features: ["Forward Deployed Engineers", "On-site design sprints", "Non-dilutive funding"],
    example: "Tata, BMW, Panasonic pay $3M-7M for custom battery design"
  },
  {
    layer: "02",
    title: "The Yield Operating System",
    subtitle: "SaaS per Production Line",
    description: "SkandaX DEPLOY becomes the factory's operating system. We are Yield Insurance—if our AI prevents even one bad batch or reduces ramp-up time by 3 months, the software pays for itself 10x over. Once integrated into PLC/MES sensors, switching costs become astronomical.",
    metric: "$250K-500K",
    metricLabel: "annual per line",
    color: "#a855f7",
    icon: Factory,
    features: ["Factory Guard Edge Node", "Yield insurance", "PLC/MES integration"],
    example: "Every production line running our software = recurring revenue"
  },
  {
    layer: "03",
    title: "The Sovereign Royalty",
    subtitle: "IP Tax (Intel Inside Model)",
    description: "Because we used SkandaX GENESIS to create the proprietary microstructure and machine recipe, we own the IP. We take a small Technology Tax on every battery produced using a Shodh-proprietary design. This is exponential upside—as partners scale from 1 GWh to 100 GWh, our revenue explodes with zero marginal cost.",
    metric: "$0.50-1.50",
    metricLabel: "per kWh produced",
    color: "#f59e0b",
    icon: TrendingUp,
    features: ["Production royalties", "Zero marginal cost", "IP powerhouse"],
    example: "Similar to ARM in semiconductors or Qualcomm in mobile"
  }
];

// ============================================
// CHAPTER 6: ROADMAP - $500M Milestones
// ============================================
const roadmapPhases = [
  {
    phase: "PHASE 1",
    title: "The Physics Validator",
    focus: "Silicon Anodes (0-6 Months)",
    timeline: "Months 0-6",
    milestone: "Scientific De-risking",
    valuation: "$50M",
    capital: "Initial $5M",
    description: "Master the hardest physics first. Train SkandaX on 10M-point Physics Hypercube and run Parent-Child Protocol in autonomous lab to generate 1,000 ground truth data points. Prove >95% accuracy on silicon-graphite expansion prediction.",
    color: "#48cae4",
    icon: Battery,
    kpis: ["10M synthetic simulation dataset", ">95% failure prediction accuracy", "First pilot partner (Tata/Exide)"]
  },
  {
    phase: "PHASE 2",
    title: "Platform Scalability",
    focus: "Cathodes & Global Expansion (6-12 Months)",
    timeline: "Months 6-12",
    milestone: "Economic De-risking",
    valuation: "$200M",
    capital: "$15M total",
    description: "Demonstrate Transfer Learning advantage. Expand to NMC/LFP cathodes with 70% less data than Phase 1. Deploy FDE teams to Japan and Europe. Open Munich and Tokyo offices. Prove marginal cost drops >50% per iteration.",
    color: "#a855f7",
    icon: Atom,
    kpis: ["3 FDE teams deployed globally", "3+ material chemistries", "$5M in NRE revenue"]
  },
  {
    phase: "PHASE 3",
    title: "Industrial Integration",
    focus: "Factory Deployment (12-18 Months)",
    timeline: "Months 12-18",
    milestone: "Commercial De-risking",
    valuation: "$500M+",
    capital: "$20M total",
    description: "Move from lab to production line. Deploy Factory Guard into partner Gigafactory. Launch full-cell digital twin. AI reads real-time sensor data and flags micro-defects. On-site teams in Tokyo and Munich oversee factory-floor reality.",
    color: "#f59e0b",
    icon: Rocket,
    kpis: ["Factory Guard in 2 facilities", "10%+ yield improvement", "$10M ARR achieved"]
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

        {/* ============================================ */}
        {/* CHAPTER 1: THE INEVITABILITY - Hero */}
        {/* ============================================ */}
        <section className="min-h-screen flex flex-col items-center px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto pt-28 md:pt-36 pb-12">
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
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-12xl font-medium tracking-tight leading-[1.05] break-normal"
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

            </motion.div>

            {/* 3D Visual placeholder - right side */}
            <div className="lg:col-span-5 pointer-events-auto mt-8 lg:mt-0 relative z-10">
              {/* The 3D petal canvas renders here */}
            </div>
          </div>

          {/* The Thesis Card - Now positioned below the hero grid */}
          <motion.div
            className="w-full max-w-3xl pointer-events-auto mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="rounded-2xl border border-white/20 bg-black/60 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs text-white/70 tracking-[0.2em] uppercase font-semibold">The Thesis</span>
                <Sparkles className="w-5 h-5 text-[#48cae4]" />
              </div>
              <h3 className="text-2xl font-medium text-white mb-4">The Inevitable Shift</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#48cae4] flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 leading-relaxed">
                    <strong className="text-white">The market is desperate.</strong> Every industry needs better materials. Yesterday.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 mt-6">
                  <p className="text-white/70 text-lg italic leading-relaxed">
                    "The world is moving from <span className="text-white font-medium">Discovery by Luck</span> to <span className="text-[#48cae4] font-medium">Discovery by Design</span>. It is inevitable."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ============================================ */}
        {/* CHAPTER 2: THE \"ZOMBIE MATERIAL\" CRISIS */}
        {/* ============================================ */}
        <section className="min-h-screen py-32 px-6 md:px-10 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
          <div className="max-w-7xl mx-auto">

            {/* Video Section - Full Width with Overlay Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-screen left-[50%] right-[50%] -mx-[50vw] mb-32 pointer-events-auto"
            >
              <div className="relative w-full overflow-hidden bg-black/40">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                >
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Overlay - Centered Title */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-black/20">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                  >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full backdrop-blur-md border border-red-500/40 mb-6">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 text-xs font-bold tracking-[0.15em] uppercase">
                        The Problem
                      </span>
                    </motion.div>

                    <motion.h2
                      variants={fadeInUp}
                      className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium uppercase tracking-tight text-white mb-6 leading-[1.1] drop-shadow-2xl"
                    >
                      BEYOND THE
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-400">
                        SCIENCE FICTION.
                      </span>
                    </motion.h2>

                    <motion.p
                      variants={fadeInUp}
                      className="text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
                    >
                      The world has already begun. AI for science is the next big thing—and it's inevitable.
                    </motion.p>
                  </motion.div>
                </div>

                {/* Bottom Corner - Documentary Label */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-[#48cae4] rounded-full animate-pulse" />
                    <span className="text-[#48cae4] text-xs font-bold tracking-[0.2em] uppercase">Documentary Preview</span>
                  </div>
                  <h3 className="text-white text-2xl font-medium tracking-tight">The Genesis of Shodh AI</h3>
                </div>
              </div>
            </motion.div>

            {/* ============================================ */}
            {/* CHAPTER 4: THE SOVEREIGN MOAT */}
            {/* ============================================ */}
            <section className="relative w-screen left-[50%] right-[50%] -mx-[50vw] pointer-events-auto bg-[#f0f0ff] py-32 px-6 md:px-10 border-t border-white/5 overflow-hidden">
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
                    className="text-4xl md:text-6xl lg:text-7xl font-medium uppercase tracking-tight text-gray-900 mb-6 leading-[1.1]"
                  >
                    BUILT IN INDIA.
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9933] via-[#4a5568] to-[#138808]">
                      SCALED FOR THE WORLD.
                    </span>
                  </motion.h2>

                  <motion.p
                    variants={fadeInUp}
                    className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed"
                  >
                    Selected by the <strong className="text-gray-900">IndiaAI Mission</strong>.
                    The government provides the CAPEX (GPUs and Robots), allowing our capital to stay focused on <span className="text-[#4338ca]">IP and Talent</span>.
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
                  <motion.div variants={scaleIn} className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#ff9933]/30 shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-[#ff9933]/20 flex items-center justify-center mb-4">
                      <Award className="w-6 h-6 text-[#ff9933]" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">The Mandate</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Official partner of IndiaAI Mission. Government-backed infrastructure. National priority status.
                    </p>
                  </motion.div>

                  <motion.div variants={scaleIn} className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#48cae4]/30 shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-[#48cae4]/20 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-[#48cae4]" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">The Mission</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Selected by IndiaAI to spearhead India's AI for Science mission. Leading the nation's frontier research initiative.
                    </p>
                  </motion.div>

                  <motion.div variants={scaleIn} className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#a855f7]/30 shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-[#a855f7]/20 flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-[#a855f7]" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">The Partners</h3>
                    <p className="text-gray-600 leading-relaxed">
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
                  <p className="text-center text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-12">
                    Backed By National & Global Leaders
                  </p>

                  <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl font-bold text-gray-900 tracking-tighter">
                        India<span className="text-[#ff9933]">AI</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-gray-900 tracking-tight">NVIDIA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-gray-900 tracking-tight">Google</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

          </div>
        </section>

        {/* ============================================ */}
        {/* CHAPTER 3: THE MATTER COMPILER */}
        {/* ============================================ */}
        <section className="relative w-screen left-[50%] right-[50%] -mx-[50vw] pointer-events-auto bg-[#f0f0ff] py-32 px-6 md:px-10 overflow-hidden">
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
                className="text-4xl md:text-6xl lg:text-7xl font-medium uppercase tracking-tight text-gray-900 mb-6 leading-[1.1]"
              >
                TRANSLATING INTENT
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48cae4] via-[#a855f7] to-[#48cae4]">
                  INTO REALITY.
                </span>
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-700 font-light max-w-3xl mx-auto leading-relaxed mb-4"
              >
                Introducing <strong className="text-gray-900">SkandaX</strong>—the first "Matter Compiler."
                <br />
                <span className="text-gray-600">
                  A closed-loop AI system that translates material requirements into manufacturable reality. From intent to factory-ready materials in 6 months instead of 5 years.
                </span>
              </motion.p>
            </motion.div>

            {/* Interactive Diagram */}
            <div className="pointer-events-auto mb-12">
              <VisualWorkflow />
            </div>

          </div>
        </section>

        {/* ============================================ */}
        {/* CHAPTER 5: MARKET & DEPLOYMENT */}
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
                <Globe className="w-4 h-4 text-[#48cae4]" />
                <span className="text-[#48cae4] text-xs font-bold tracking-[0.15em] uppercase">
                  Market & Deployment
                </span>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-medium uppercase tracking-tight text-white mb-6 leading-[1.1]"
              >
                BUILT FOR THE
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48cae4] via-[#a855f7] to-[#22c55e]">
                  ENERGY VALUE CHAIN.
                </span>
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed mb-4"
              >
                <strong className="text-white">Current Beachhead: Energy Storage.</strong>
                <br />
                <span className="text-white/90">
                  We are deploying our engine to solve the $300B bottleneck in EV batteries (Silicon, Sodium, Solid-State) before scaling to Hydrogen and Alloys.
                </span>
              </motion.p>
            </motion.div>

            {/* 3-Column Grid: The Who & How */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-auto"
            >
              {/* Column 1: THE CHEMIST */}
              <motion.div variants={scaleIn} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#48cae4]/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#48cae4]/20 flex items-center justify-center mb-6">
                  <Beaker className="w-6 h-6 text-[#48cae4]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">THE CHEMIST</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-white/50 uppercase tracking-wider text-xs mb-1">Who</p>
                    <p className="text-white font-medium">Material Suppliers</p>
                  </div>
                  <div>
                    <p className="text-white/50 uppercase tracking-wider text-xs mb-1">Pain</p>
                    <p className="text-white/70 italic">"Is this new molecule scalable?"</p>
                  </div>
                  <div>
                    <p className="text-white/50 uppercase tracking-wider text-xs mb-1">Product</p>
                    <p className="text-[#48cae4] font-bold">SKANDAX VALIDATE</p>
                  </div>
                  <div>
                    <p className="text-white/50 uppercase tracking-wider text-xs mb-1">Value</p>
                    <p className="text-white/80">Validate recipes in weeks, not years.</p>
                  </div>
                </div>
              </motion.div>

              {/* Column 2: THE FACTORY */}
              <motion.div variants={scaleIn} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#a855f7]/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#a855f7]/20 flex items-center justify-center mb-6">
                  <Factory className="w-6 h-6 text-[#a855f7]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">THE FACTORY</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-white/50 uppercase tracking-wider text-xs mb-1">Who</p>
                    <p className="text-white font-medium">Gigafactories</p>
                  </div>
                  <div>
                    <p className="text-white/50 uppercase tracking-wider text-xs mb-1">Pain</p>
                    <p className="text-white/70 italic">"Yield is too low. Scrap is too high."</p>
                  </div>
                  <div>
                    <p className="text-white/50 uppercase tracking-wider text-xs mb-1">Product</p>
                    <p className="text-[#a855f7] font-bold">SKANDAX DEPLOY</p>
                  </div>
                  <div>
                    <p className="text-white/50 uppercase tracking-wider text-xs mb-1">Value</p>
                    <p className="text-white/80">Zero-Shot Manufacturing & Yield Guard.</p>
                  </div>
                </div>
              </motion.div>

              {/* Column 3: THE STRATEGIST */}
              <motion.div variants={scaleIn} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#22c55e]/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#22c55e]/20 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-[#22c55e]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">THE STRATEGIST</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-white/50 uppercase tracking-wider text-xs mb-1">Who</p>
                    <p className="text-white font-medium">Automotive OEMs (Tesla, Tata, BMW)</p>
                  </div>
                  <div>
                    <p className="text-white/50 uppercase tracking-wider text-xs mb-1">Pain</p>
                    <p className="text-white/70 italic">"We are trapped by supplier roadmaps. We need to own our tech."</p>
                  </div>
                  <div>
                    <p className="text-white/50 uppercase tracking-wider text-xs mb-1">Product</p>
                    <p className="text-[#22c55e] font-bold">SKANDAX GENESIS</p>
                  </div>
                  <div>
                    <p className="text-white/50 uppercase tracking-wider text-xs mb-1">Value</p>
                    <p className="text-white/80">Generate Proprietary IP. Break dependence on external suppliers. Create unique, owned chemistries in-house.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CHAPTER 6: THE DATA ROOM */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-screen left-[50%] right-[50%] -mx-[50vw] pointer-events-auto"
        >
          <div className="relative w-full overflow-hidden bg-black/40">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            >
              <source src="/9.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay - Centered Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-black/30">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp}>
                  <Rocket className="w-16 h-16 text-[#48cae4] mx-auto mb-6" />
                </motion.div>

                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight text-white mb-6 leading-[1.1] drop-shadow-2xl"
                >
                  JOIN THE
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48cae4] via-white to-[#a855f7]">
                    MISSION.
                  </span>
                </motion.h2>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg md:text-2xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-lg mb-8"
                >
                  We're building the future of materials. Get full access to our data room and see why India's sovereign AI bet is unstoppable.
                </motion.p>

                <motion.div variants={fadeInUp}>
                  <Link
                    href="/data-room"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-white text-gray-900 text-lg font-bold hover:shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all"
                  >
                    <Rocket className="w-5 h-5" />
                    ACCESS THE DATA ROOM
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                  <p className="text-white/70 text-sm mt-4 drop-shadow-lg">
                    For serious investors ready to move fast
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <Footer />
      </main>
    </div>
  );
}
