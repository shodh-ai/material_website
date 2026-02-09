"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Cpu,
  Shield,
  Target,
  TrendingUp,
  Zap,
  Globe,
  DollarSign,
  Clock,
  ChevronRight,
  Layers,
  Lock,
  BarChart3,
  Rocket,
  CheckCircle2,
  Radio,
  Wrench,
  FlaskConical,
  Server
} from "lucide-react";
import Link from "next/link";

const marketData = [
  { domain: "Batteries", size: "$300B", relevance: "Beachhead (Silicon, NMC, LFP)" },
  { domain: "Hydrogen/Fuel Cells", size: "$200B by 2030", relevance: "Same transport physics" },
  { domain: "Cement", size: "$600B", relevance: "Microstructure optimization" },
  { domain: "Alloys", size: "$500B", relevance: "Grain structure → properties" },
  { domain: "Semiconductors", size: "$200B", relevance: "Advanced packaging materials" },
  { domain: "Chemicals", size: "$5T", relevance: "Catalysts, membranes" },
  { domain: "Pharmaceuticals", size: "$1.5T", relevance: "Drug delivery materials" },
];

const moats = [
  {
    title: "Data Flywheel",
    desc: "More customers → More data → Better model → More customers. Federated network effect.",
    icon: TrendingUp,
  },
  {
    title: "Physics Prior",
    desc: "Mesoscale data doesn't exist at scale. We manufactured our own training distribution. 12-month head start.",
    icon: Cpu,
  },
  {
    title: "Multimodal Architecture",
    desc: "No one else fuses Recipe + Microstructure + Performance. Requires specialized lab + materials expertise + AI talent.",
    icon: Layers,
  },
  {
    title: "IP Portfolio",
    desc: "100+ patents on microstructure designs and process recipes by Year 2.",
    icon: Lock,
  },
];

const revenueLayers = [
  {
    layer: "Layer 0",
    name: "API Platform",
    tag: "Primary Growth Engine",
    pricing: "$0.01 per prediction, $1 per generated structure",
    scale: "100 companies × 10k sims/month = $120M ARR",
    margin: "95%",
    color: "#48cae4",
  },
  {
    layer: "Layer 1",
    name: "NRE Partnerships",
    tag: "The Bridge",
    pricing: "$3-7M per 18-month design engagement",
    scale: "10-15 partnerships/year = $50-100M/year",
    margin: "70%",
    color: "#a855f7",
  },
  {
    layer: "Layer 2",
    name: "Factory SaaS",
    tag: "Recurring Revenue",
    pricing: "$250-500k per production line per year",
    scale: "100+ lines globally = $50-100M ARR",
    margin: "90%",
    color: "#22c55e",
  },
  {
    layer: "Layer 3",
    name: "IP Royalties",
    tag: "Exponential Upside",
    pricing: "$0.50-1.50 per kWh produced",
    scale: "20% of next-gen production = $100-300M/year",
    margin: "98%",
    color: "#f59e0b",
  },
];

const aggressiveProjections = [
  { year: "Year 1 (2026)", revenue: "$10-20M", valuation: "$300-500M", multiple: "20-30x", event: "Silicon proven, 5-10 NRE deals, API beta" },
  { year: "Year 2 (2027)", revenue: "$50-100M", valuation: "$1-2B", multiple: "15-20x", event: "Platform launched, 100+ customers" },
  { year: "Year 3 (2028)", revenue: "$300-500M", valuation: "$5-8B", multiple: "18-25x", event: "Multi-chemistry, federated learning" },
  { year: "Year 4 (2029)", revenue: "$1B+", valuation: "$25-40B", multiple: "25-30x", event: "Materials OS, 1,000+ customers" },
  { year: "Year 5 (2030)", revenue: "$2B+", valuation: "$50B+", multiple: "25-30x", event: "IPO" },
];

const conservativeProjections = [
  { year: "Year 1 (2025-26)", revenue: "$5-15M", valuation: "$150-300M", event: "Silicon proven, 3-5 NRE deals" },
  { year: "Year 2 (2026-27)", revenue: "$30-80M", valuation: "$500M-1.5B", event: "Platform launched, 30-50 customers" },
  { year: "Year 3 (2027-28)", revenue: "$100-250M", valuation: "$2-5B", event: "Multi-chemistry, 100+ customers" },
  { year: "Year 5 (2029-30)", revenue: "$300-800M", valuation: "$5-15B", event: "Royalty model kicking in" },
  { year: "Year 7+ (2031+)", revenue: "$1B+", valuation: "$20-50B+", event: "Industry standard, IPO" },
];

export default function DataRoomManifesto() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="max-w-5xl mx-auto mb-16"
    >
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
          <FileText className="w-4 h-4 text-white/60" />
          <span className="text-white/60 text-xs font-light tracking-[0.2em] uppercase">
            The Manifesto
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">

        {/* Hero Banner */}
        <div className="relative p-10 md:p-16 text-center bg-gradient-to-b from-white/[0.04] to-transparent">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
            Shodh AI
          </h2>
          <p className="text-lg md:text-xl text-white/50 font-light mb-8">
            AI Infrastructure Company for Physical Matter
          </p>
          <div className="h-px w-24 bg-white/20 mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto">
            AI conquered the digital world.{" "}
            <strong className="text-white">
              We&apos;re building the AI that builds the physical world.
            </strong>
          </p>
        </div>

        <div className="px-8 md:px-12 pb-12 space-y-14">

          {/* ─── WHAT WE'RE BUILDING ─── */}
          <section>
            <SectionHeader icon={Target} title="What We're Building" />

            <div className="space-y-4 text-white/70 font-light leading-relaxed mb-8">
              <p>
                <strong className="text-white">The Vision:</strong> No advanced
                manufacturer builds new materials without running them through
                Skanda first.
              </p>
              <p>
                <strong className="text-white">The Product:</strong> A physics
                foundation model that operates at the mesoscale (10nm–100μm) —
                the critical length scale where 90% of industrial materials fail
                during manufacturing.
              </p>
            </div>

            {/* Scale Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-2 font-medium">
                  Google / Microsoft
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Atomic scale (too small to predict factory yield)
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-2 font-medium">
                  Traditional FEA
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  System scale (too big to understand failure)
                </p>
              </div>
              <div className="p-5 rounded-xl bg-[#48cae4]/[0.08] border border-[#48cae4]/20">
                <p className="text-xs text-[#48cae4] uppercase tracking-wider mb-2 font-medium">
                  Skanda — Mesoscale
                </p>
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  Where real manufacturing happens
                </p>
              </div>
            </div>
          </section>

          <Divider />

          {/* ─── TECHNICAL BREAKTHROUGH (STATUS: LIVE) ─── */}
          <section>
            <SectionHeader icon={Zap} title="The Technical Breakthrough" />

            <div className="space-y-5">
              {/* 1. Forward Model — COMPLETED */}
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-[#22c55e]" />
                <div className="pl-4">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
                    <h4 className="text-white text-sm font-medium">1. The Forward Model (Predictor)</h4>
                    <span className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-[#22c55e]/15 text-[#22c55e]">Completed</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Training Data</p>
                      <p className="text-white text-sm font-mono font-medium">787,000</p>
                      <p className="text-white/40 text-xs">synthetic microstructures</p>
                    </div>
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Performance</p>
                      <p className="text-[#22c55e] text-sm font-mono font-medium">99% R²</p>
                      <p className="text-white/40 text-xs">on 168k test samples</p>
                    </div>
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Speed</p>
                      <p className="text-[#48cae4] text-sm font-mono font-medium">50 ms</p>
                      <p className="text-white/40 text-xs">vs 4 hrs traditional solvers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Inverse Model — DEMO READY */}
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-[#48cae4]" />
                <div className="pl-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Radio className="w-5 h-5 text-[#48cae4]" />
                    <h4 className="text-white text-sm font-medium">2. The Inverse Model (Designer)</h4>
                    <span className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-[#48cae4]/15 text-[#48cae4]">Demo Ready</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Current State</p>
                      <p className="text-white text-sm font-mono font-medium">87% validation accuracy</p>
                    </div>
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1">The Alpha</p>
                      <p className="text-white/70 text-sm">Generates 3D voxel grids from target performance specs in seconds</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-[#48cae4]/[0.06] border border-[#48cae4]/10">
                    <p className="text-white/70 text-sm font-light">
                      <strong className="text-[#48cae4]">Live Demo:</strong> Showcasing real-time inference at the IndiaAI Summit
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Process Model — NEW */}
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-[#a855f7]" />
                <div className="pl-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Wrench className="w-5 h-5 text-[#a855f7]" />
                    <h4 className="text-white text-sm font-medium">3. The Process Model (The &quot;Matter Compiler&quot;)</h4>
                    <span className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-[#a855f7]/15 text-[#a855f7]">New</span>
                  </div>
                  <div className="space-y-3 mt-3">
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1">The Bridge</p>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Designing the structure is only half the battle. Our Process Model translates 3D geometry into factory recipes — Mixing speeds, Drying temperatures, Calendering pressures.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#a855f7]/[0.06] border border-[#a855f7]/10">
                      <p className="text-white/70 text-sm font-light">
                        <strong className="text-[#a855f7]">Result:</strong> True &quot;Sim-to-Real&quot; autonomy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Divider />

          {/* ─── WHY IT'S DEFENSIBLE ─── */}
          <section>
            <SectionHeader icon={Shield} title="Why It's Defensible" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {moats.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                        <Icon className="w-4 h-4 text-white/50" />
                      </div>
                      <h4 className="text-white text-sm font-medium">
                        Moat #{i + 1}: {m.title}
                      </h4>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed font-light">
                      {m.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <Divider />

          {/* ─── THE HARDWARE MOAT: AUTONOMOUS LAB ─── */}
          <section>
            <SectionHeader icon={FlaskConical} title="The Hardware Moat: The Autonomous Lab" />

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 mb-6">
              <p className="text-white/70 font-light leading-relaxed">
                We are building the world&apos;s first <strong className="text-white">Closed-Loop Data Factory</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-[#48cae4]" />
                  <p className="text-xs text-[#48cae4] uppercase tracking-wider font-medium">Data Velocity</p>
                </div>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  Our autonomous lab generates data <strong className="text-white">10x faster</strong> than traditional manual labs.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-[#22c55e]" />
                  <p className="text-xs text-[#22c55e] uppercase tracking-wider font-medium">Safety &amp; Scale</p>
                </div>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  We handle &quot;exotic&quot; and dangerous chemistries (Solid-state Lithium Metal, toxic electrolytes) in <strong className="text-white">100% inert, robotic environments</strong> where humans cannot go.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="w-4 h-4 text-[#a855f7]" />
                  <p className="text-xs text-[#a855f7] uppercase tracking-wider font-medium">Federated Learning</p>
                </div>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  We deploy &quot;Mini-Nodes&quot; at partner sites (BMW, Umicore, Tesla).
                </p>
              </div>
            </div>

            {/* Federated Flow */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-4 font-medium text-center">The Federated Deployment Stack</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <FlaskConical className="w-4 h-4 text-[#48cae4]" />
                    <p className="text-[#48cae4] text-xs font-medium uppercase tracking-wider">Mini Autonomous Lab</p>
                  </div>
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    A compact, containerized robotic lab deployed on-site at partner facilities for continuous sample fabrication, cycling, and characterization.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Server className="w-4 h-4 text-[#22c55e]" />
                    <p className="text-[#22c55e] text-xs font-medium uppercase tracking-wider">Edge Compute Node</p>
                  </div>
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    NVIDIA IGX / Orin-based GPU node co-located with the mini-lab. Runs local model training and inference — no data ever leaves the facility.
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 text-white/70 border border-white/10">Generate data locally</span>
                <span className="text-white/30">→</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 text-white/70 border border-white/10">Train on the edge GPU</span>
                <span className="text-white/30">→</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 text-white/70 border border-white/10">Send only gradients to central model</span>
              </div>
              <p className="text-center text-white/50 text-sm mt-4 font-light">
                <strong className="text-white">Result:</strong> We learn from the world&apos;s proprietary factory floors without ever compromising their trade secrets.
              </p>
            </div>
          </section>

          <Divider />

          {/* ─── MARKET OPPORTUNITY ─── */}
          <section>
            <SectionHeader icon={Globe} title="The Market Opportunity" />

            <div className="mb-6">
              <p className="text-2xl text-white font-light mb-1">
                Total Addressable Market:{" "}
                <span className="text-[#48cae4]">$8–10T</span>
              </p>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-white/5 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/[0.03]">
                    <th className="text-left px-5 py-3 text-xs text-white/40 font-medium uppercase tracking-wider">
                      Domain
                    </th>
                    <th className="text-left px-5 py-3 text-xs text-white/40 font-medium uppercase tracking-wider">
                      Market Size
                    </th>
                    <th className="text-left px-5 py-3 text-xs text-white/40 font-medium uppercase tracking-wider">
                      Skanda Relevance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.map((row, i) => (
                    <tr
                      key={i}
                      className="border-t border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-5 py-3.5 text-white text-sm font-medium">
                        {row.domain}
                      </td>
                      <td className="px-5 py-3.5 text-white/60 text-sm font-light font-mono">
                        {row.size}
                      </td>
                      <td className="px-5 py-3.5 text-white/50 text-sm font-light">
                        {row.relevance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-white/40 text-sm mt-4 font-light">
              Conservative Beachhead:{" "}
              <strong className="text-white/70">
                $1T+ in electrochemical systems alone
              </strong>
            </p>
          </section>

          <Divider />

          {/* ─── WHY THE PLATFORM SCALES ─── */}
          <section>
            <SectionHeader icon={Layers} title="Why the Platform Scales" />

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 mb-6">
              <p className="text-white/70 font-light leading-relaxed mb-4">
                <strong className="text-white">The Physics Insight:</strong>{" "}
                Tortuosity is tortuosity whether it&apos;s lithium ions in a battery,
                hydrogen in a fuel cell membrane, or water in a concrete pore.
              </p>
              <p className="text-white font-light text-sm">
                The foundation model transfers. Each new domain is a fine-tuning
                job, not a rebuild.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { yr: "Year 1", desc: "Battery platform → Revenue from NRE + SaaS" },
                { yr: "Year 2", desc: "Hydrogen + Sodium-ion → 2x customer base" },
                { yr: "Year 3", desc: "Catalysts + Membranes → Horizontal platform" },
                { yr: "Year 4-5", desc: "Metallurgy + Cement → Full materials OS" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-[#48cae4] text-xs font-medium uppercase tracking-wider mb-2">
                    {item.yr}
                  </p>
                  <p className="text-white/50 text-xs leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ─── REVENUE MODEL ─── */}
          <section>
            <SectionHeader icon={DollarSign} title="The Revenue Model: Four Compounding Layers" />

            <div className="space-y-4">
              {revenueLayers.map((layer, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/5 relative overflow-hidden"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                    style={{ backgroundColor: layer.color }}
                  />
                  <div className="pl-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: `${layer.color}15`,
                          color: layer.color,
                        }}
                      >
                        {layer.layer}
                      </span>
                      <h4 className="text-white text-sm font-medium">
                        {layer.name}
                      </h4>
                      <span className="text-white/30 text-xs font-light">
                        {layer.tag}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div>
                        <p className="text-white/30 text-xs uppercase tracking-wider mb-1">
                          Pricing
                        </p>
                        <p className="text-white/60 text-sm font-light">
                          {layer.pricing}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/30 text-xs uppercase tracking-wider mb-1">
                          Scale
                        </p>
                        <p className="text-white/60 text-sm font-light">
                          {layer.scale}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/30 text-xs uppercase tracking-wider mb-1">
                          Gross Margin
                        </p>
                        <p className="text-white/60 text-sm font-light">
                          {layer.margin}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-white/40 text-sm mt-4 font-light">
              All four layers stack and compound by Year 3.
            </p>
          </section>

          <Divider />

          {/* ─── GTM PLAYBOOK ─── */}
          <section>
            <SectionHeader icon={Rocket} title="The GTM Playbook" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  phase: "Year 1: PROVE",
                  items: ["FDE deals → Silicon validated", "$10-20M revenue"],
                  color: "#48cae4",
                },
                {
                  phase: "Year 2: PRODUCTIZE",
                  items: ["API platform → Self-service", "$50-100M revenue"],
                  color: "#a855f7",
                },
                {
                  phase: "Year 3: SCALE",
                  items: ["Multi-chemistry → Federated", "$300-500M revenue"],
                  color: "#22c55e",
                },
                {
                  phase: "Year 5: DOMINATE",
                  items: ["Materials OS → Royalties", "$1B+ revenue"],
                  color: "#f59e0b",
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <p
                    className="text-xs font-medium uppercase tracking-wider mb-3"
                    style={{ color: p.color }}
                  >
                    {p.phase}
                  </p>
                  <ul className="space-y-1.5">
                    {p.items.map((item, j) => (
                      <li
                        key={j}
                        className="text-white/50 text-sm font-light leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ─── SOVEREIGN ADVANTAGE: CAPITAL EFFICIENCY ─── */}
          <section>
            <SectionHeader icon={Globe} title="The Sovereign Advantage: Capital Efficiency" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-xl bg-[#f59e0b]/[0.06] border border-[#f59e0b]/15">
                <p className="text-xs text-[#f59e0b] uppercase tracking-wider mb-3 font-medium">The IndiaAI Mission</p>
                <p className="text-white/70 text-sm font-light leading-relaxed">
                  As a flagship partner, we have <strong className="text-white">Priority Access to Sovereign H100 GPU Clusters</strong>.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-[#48cae4]/[0.06] border border-[#48cae4]/15">
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-xs text-[#48cae4] uppercase tracking-wider font-medium">GPU Grant</p>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#f59e0b]/15 text-[#f59e0b] uppercase tracking-wider">In Process</span>
                </div>
                <p className="text-white/70 text-sm font-light leading-relaxed">
                  Proposal submitted: <strong className="text-white font-mono">₹120 Cr (~$12M)</strong> for sovereign GPU compute allocation.
                </p>
              </div>
            </div>
          </section>

          <Divider />

          {/* ─── FINANCIAL PROJECTIONS ─── */}
          <section>
            <SectionHeader icon={BarChart3} title="Financial Projections" />

            {/* Aggressive Case */}
            <div className="mb-8">
              <h4 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-4">
                Aggressive Case
              </h4>
              <div className="rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/[0.03]">
                      <th className="text-left px-4 py-3 text-xs text-white/40 font-medium uppercase tracking-wider">
                        Year
                      </th>
                      <th className="text-left px-4 py-3 text-xs text-white/40 font-medium uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="text-left px-4 py-3 text-xs text-white/40 font-medium uppercase tracking-wider">
                        Valuation
                      </th>
                      <th className="text-left px-4 py-3 text-xs text-white/40 font-medium uppercase tracking-wider hidden md:table-cell">
                        Multiple
                      </th>
                      <th className="text-left px-4 py-3 text-xs text-white/40 font-medium uppercase tracking-wider hidden lg:table-cell">
                        What Happens
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {aggressiveProjections.map((row, i) => (
                      <tr
                        key={i}
                        className="border-t border-white/5 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-4 py-3 text-white text-sm font-medium whitespace-nowrap">
                          {row.year}
                        </td>
                        <td className="px-4 py-3 text-white/70 text-sm font-mono font-light">
                          {row.revenue}
                        </td>
                        <td className="px-4 py-3 text-[#48cae4] text-sm font-mono font-light">
                          {row.valuation}
                        </td>
                        <td className="px-4 py-3 text-white/40 text-sm font-light hidden md:table-cell">
                          {row.multiple}
                        </td>
                        <td className="px-4 py-3 text-white/40 text-sm font-light hidden lg:table-cell">
                          {row.event}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Conservative Case */}
            <div>
              <h4 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-4">
                Conservative Case
              </h4>
              <div className="rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/[0.03]">
                      <th className="text-left px-4 py-3 text-xs text-white/40 font-medium uppercase tracking-wider">
                        Year
                      </th>
                      <th className="text-left px-4 py-3 text-xs text-white/40 font-medium uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="text-left px-4 py-3 text-xs text-white/40 font-medium uppercase tracking-wider">
                        Valuation
                      </th>
                      <th className="text-left px-4 py-3 text-xs text-white/40 font-medium uppercase tracking-wider hidden md:table-cell">
                        What Happens
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {conservativeProjections.map((row, i) => (
                      <tr
                        key={i}
                        className="border-t border-white/5 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-4 py-3 text-white text-sm font-medium whitespace-nowrap">
                          {row.year}
                        </td>
                        <td className="px-4 py-3 text-white/70 text-sm font-mono font-light">
                          {row.revenue}
                        </td>
                        <td className="px-4 py-3 text-[#48cae4] text-sm font-mono font-light">
                          {row.valuation}
                        </td>
                        <td className="px-4 py-3 text-white/40 text-sm font-light hidden md:table-cell">
                          {row.event}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-white/30 text-sm mt-4 font-light italic">
              Both scenarios represent top 1% outcomes for AI infrastructure companies.
            </p>
          </section>

          <Divider />

          {/* ─── WHY NOW ─── */}
          <section>
            <SectionHeader icon={Clock} title="Why Now (The Window Is Closing)" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-xs text-[#22c55e] uppercase tracking-wider mb-3 font-medium">
                  The Tailwinds
                </p>
                <ul className="space-y-2">
                  <li className="text-white/60 text-sm font-light flex items-start gap-2">
                    <span className="text-[#22c55e] mt-0.5 shrink-0">✓</span>
                    Energy transition = $10T in new battery capacity by 2030
                  </li>
                  <li className="text-white/60 text-sm font-light flex items-start gap-2">
                    <span className="text-[#22c55e] mt-0.5 shrink-0">✓</span>
                    Supply chain sovereignty = Western govts funding domestic manufacturing
                  </li>
                  <li className="text-white/60 text-sm font-light flex items-start gap-2">
                    <span className="text-[#22c55e] mt-0.5 shrink-0">✓</span>
                    No credible competitor at mesoscale = 12-18 month head start
                  </li>
                </ul>
              </div>
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-xs text-[#f59e0b] uppercase tracking-wider mb-3 font-medium">
                  The Threats
                </p>
                <ul className="space-y-2">
                  <li className="text-white/60 text-sm font-light flex items-start gap-2">
                    <span className="text-[#f59e0b] mt-0.5 shrink-0">⚠</span>
                    Google/Microsoft realize mesoscale gap (12-18 months)
                  </li>
                  <li className="text-white/60 text-sm font-light flex items-start gap-2">
                    <span className="text-[#f59e0b] mt-0.5 shrink-0">⚠</span>
                    Chinese labs partner with CATL for data (6-12 months)
                  </li>
                  <li className="text-white/60 text-sm font-light flex items-start gap-2">
                    <span className="text-[#f59e0b] mt-0.5 shrink-0">⚠</span>
                    Window closes by 2027
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#48cae4]/[0.06] border border-[#48cae4]/15 text-center">
              <p className="text-white/80 text-sm font-light">
                Our window:{" "}
                <strong className="text-white">
                  18-24 months to establish platform lock-in.
                </strong>
              </p>
            </div>
          </section>

          <Divider />

          {/* ─── EXECUTION MILESTONES: THE 18-MONTH SPRINT ─── */}
          <section>
            <SectionHeader icon={Rocket} title="Execution Milestones: The 18-Month Sprint" />

            <div className="space-y-5">
              {/* Phase 1 */}
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-[#48cae4]" />
                <div className="pl-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded bg-[#48cae4]/15 text-[#48cae4]">Phase 1</span>
                    <h4 className="text-white text-sm font-medium">Physical Validation (Months 0-6)</h4>
                  </div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Goal: Solve the &quot;Hardest&quot; Physics (Silicon Anodes)</p>
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-2">The Milestone</p>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 text-sm">
                      <span className="px-3 py-1.5 rounded-lg bg-white/5 text-white/70 border border-white/10">SkandaX generates a design</span>
                      <span className="text-white/30 hidden md:block">→</span>
                      <span className="px-3 py-1.5 rounded-lg bg-white/5 text-white/70 border border-white/10">Build it in Autonomous Lab</span>
                      <span className="text-white/30 hidden md:block">→</span>
                      <span className="px-3 py-1.5 rounded-lg bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20">Real battery matches AI prediction (&gt;90% R²)</span>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm mt-3 font-light">Outcome: <strong className="text-white">Scientific De-risking</strong></p>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-[#a855f7]" />
                <div className="pl-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded bg-[#a855f7]/15 text-[#a855f7]">Phase 2</span>
                    <h4 className="text-white text-sm font-medium">Platform Scalability (Months 6-12)</h4>
                  </div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Goal: Prove &quot;Transfer Learning&quot;</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Execution</p>
                      <p className="text-white/70 text-sm leading-relaxed">Expand to Cathodes (NMC/LFP) and Hydrogen.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#a855f7]/[0.06] border border-[#a855f7]/10">
                      <p className="text-white/70 text-sm font-light">
                        <strong className="text-[#a855f7]">The Flex:</strong> Phase 2 requires <strong className="text-white">70% less data</strong> than Phase 1 because the &quot;Physics Backbone&quot; is already built.
                      </p>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm mt-3 font-light">Outcome: <strong className="text-white">Economic De-risking</strong></p>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-[#22c55e]" />
                <div className="pl-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded bg-[#22c55e]/15 text-[#22c55e]">Phase 3</span>
                    <h4 className="text-white text-sm font-medium">Industrial Integration (Months 12-18)</h4>
                  </div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Goal: Factory Deployment</p>
                  <div>
                    <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Execution</p>
                    <p className="text-white/70 text-sm leading-relaxed">Deploy &quot;SkandaX DEPLOY&quot; (Edge Node) into a partner&apos;s Gigafactory pilot line.</p>
                  </div>
                  <p className="text-white/50 text-sm mt-3 font-light">Outcome: <strong className="text-white">Commercial Dominance</strong></p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-5 rounded-xl bg-[#22c55e]/[0.06] border border-[#22c55e]/15 text-center">
              <p className="text-white text-lg font-light mb-2">
                18-Month Sprint → <strong>$500M–1B Valuation</strong>
              </p>
              <p className="text-white/50 text-sm font-light leading-relaxed max-w-2xl mx-auto">
                Historically, deeptech platforms that successfully cross the &quot;Sim-to-Real&quot; chasm — moving from laboratory discovery to industrial deployment — command strategic valuations of $500M+.
              </p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Helper components ─── */

function SectionHeader({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
        <Icon className="w-4 h-4 text-white/50" />
      </div>
      <h3 className="text-xl font-light text-white">{title}</h3>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-white/5" />;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/50 text-sm">{label}</span>
      <span className="text-white text-sm font-mono font-medium">{value}</span>
    </div>
  );
}
