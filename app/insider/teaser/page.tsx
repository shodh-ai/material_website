"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";
import {
  Atom,
  Beaker,
  CheckCircle2,
  Cpu,
  Database,
  Factory,
  FlaskConical,
  Globe2,
  Microscope,
  Network,
  Orbit,
  Rocket,
  Sparkles,
  TrendingDown,
  Zap,
} from "lucide-react";
import CanvasLayer from "@/components/three/CanvasLayer";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0, 0, 0.2, 1] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0, 0, 0.2, 1] } },
};

const layers = [
  {
    number: "01",
    title: "Discovery Layer",
    text: "Integrates atomic, molecular, biological, and material discovery.",
    icon: Atom,
  },
  {
    number: "02",
    title: "Mesoscale Physics Engine",
    text: "The core bridge. Simulates the lab-to-production gap where most failures emerge: mixing, shear, heat transfer, mass transfer, reaction kinetics, phase behavior, degradation, impurities, and instability.",
    icon: Orbit,
  },
  {
    number: "03",
    title: "Control Layer",
    text: "Translates physics predictions into process parameters, operating windows, control policies, and experiment plans.",
    icon: Cpu,
  },
  {
    number: "04",
    title: "Digital Twin Layer",
    text: "Creates dynamic, physics-enabled twins for reactors, production lines, and factory-scale systems.",
    icon: Factory,
  },
];

const pillarExamples = [
  {
    title: "Pharma / Biologics",
    lines: ["Batch → continuous flow", "2–3 years → months", "Biologics manufacturing unlock"],
    icon: Beaker,
  },
  {
    title: "Batteries",
    lines: ["Coating, drying, thermal risk", "Scrap reduction + faster qualification", "EV battery yield unlock"],
    icon: Zap,
  },
  {
    title: "Chemicals",
    lines: ["Catalyst + reactor scale-up", "Fewer pilot iterations", "Capex risk reduction"],
    icon: FlaskConical,
  },
  {
    title: "Gene Delivery",
    lines: ["LNP / mRNA stability", "Faster formulation scale-up", "Genomics manufacturing unlock"],
    icon: Atom,
  },
  {
    title: "Carbon Capture",
    lines: ["Multiphase porous flow", "Faster field validation", "Energy transition unlock"],
    icon: Globe2,
  },
  {
    title: "Industrial Materials",
    lines: ["Crystallization + particle morphology", "Repeatable production recipes", "Specialty materials manufacturing unlock"],
    icon: Factory,
  },
];

const partners = [
  ["Biocon & Jubilant", "Pharma / biologics scale-up"],
  ["Aarti Industries", "Chemical meso-scale production"],
  ["Tier 1 US Battery Manufacturer", "Cell stability, coating, and production-scale failure prediction"],
  ["GE Aerospace", "Structural and thermal dynamics"],
];

const generatedOutputs = [
  "the material composition,",
  "the mesoscale manufacturing route,",
  "the process parameters,",
  "the factory operating window,",
  "the quality-control plan,",
  "the cost and carbon profile,",
  "the dynamic production twin.",
];

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#48cae4]/30 bg-[#48cae4]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#48cae4] backdrop-blur-md">
      <span className="h-2 w-2 rounded-full bg-[#48cae4] shadow-[0_0_12px_#48cae4]" />
      {children}
    </span>
  );
}

function SlideShell({
  eyebrow,
  title,
  subtitle,
  children,
  tone = "cyan",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  tone?: "cyan" | "red" | "purple" | "amber" | "green" | "lightCyan" | "lightAmber";
}) {
  const toneClass = {
    cyan: "from-[#48cae4]/20 via-transparent to-[#48cae4]/5 border-[#48cae4]/20",
    red: "from-red-500/20 via-transparent to-orange-500/5 border-red-400/20",
    purple: "from-purple-500/20 via-transparent to-[#48cae4]/5 border-purple-400/20",
    amber: "from-amber-500/20 via-transparent to-[#48cae4]/5 border-amber-400/20",
    green: "from-emerald-500/20 via-transparent to-[#48cae4]/5 border-emerald-400/20",
    lightCyan: "from-[#f0f0ff] via-white to-[#e8fbff] border-black/10",
    lightAmber: "from-[#f0f0ff] via-white to-[#fff7ed] border-black/10",
  }[tone];
  const isLight = tone === "lightCyan" || tone === "lightAmber";

  return (
    <section className="relative px-4 py-24 sm:px-6 md:px-10 md:py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={staggerContainer}
        className={`pointer-events-auto mx-auto max-w-7xl rounded-[2rem] border bg-gradient-to-br ${toneClass} ${isLight ? "text-gray-900 shadow-[0_30px_80px_rgba(8,20,33,0.25)]" : "bg-black/50 shadow-2xl"} p-6 backdrop-blur-xl md:p-10 lg:p-12`}
      >
        <motion.div variants={fadeInUp} className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Badge>{eyebrow}</Badge>
          <div className={`h-px min-w-24 flex-1 bg-gradient-to-r ${isLight ? "from-black/20" : "from-white/20"} to-transparent`} />
        </motion.div>
        <motion.h2 variants={fadeInUp} className={`max-w-5xl text-4xl font-medium uppercase leading-[1.02] tracking-tight sm:text-5xl md:text-7xl ${isLight ? "text-gray-900" : "text-white"}`}>
          {title}
        </motion.h2>
        {subtitle ? (
          <motion.p variants={fadeInUp} className={`mt-6 max-w-4xl text-lg font-light leading-relaxed md:text-2xl ${isLight ? "text-gray-600" : "text-white/78"}`}>
            {subtitle}
          </motion.p>
        ) : null}
        <div className="mt-10">{children}</div>
      </motion.div>
    </section>
  );
}

export default function InsiderTeaserPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-[#f0f0ff] selection:bg-[#48cae4] selection:text-[#081421]">
      <CanvasLayer />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#081421]/55 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-10">
          <div className="flex items-center gap-3">
            <Image src="/shodhai_logo.svg" alt="Shodh AI" width={132} height={30} className="h-4 w-auto" priority />
          </div>
          <p className="hidden text-xs font-bold uppercase tracking-[0.24em] text-white/45 sm:block">Insider Teaser</p>
        </div>
      </header>

      <main id="html-scroll-container" className="relative z-[2] w-full pointer-events-none">
        <section className="flex min-h-screen items-center px-4 pb-20 pt-32 sm:px-6 md:px-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <motion.div variants={staggerContainer} className="pointer-events-auto lg:col-span-8">
              <motion.div variants={fadeInUp} className="mb-7 flex flex-wrap gap-3">
                <Badge>Slide 1 — Title</Badge>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">Confidential</span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-5xl font-medium uppercase leading-[1.02] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
                The World
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#48cae4] to-white">Foundational Model</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="mt-7 max-w-4xl text-xl font-light leading-relaxed text-white/88 md:text-3xl">
                From Molecule Discovery to Physical Factory Production
              </motion.p>
            </motion.div>
            <div className="pointer-events-auto relative z-10 min-h-[320px] lg:col-span-4" />
          </motion.div>
        </section>

        <section className="px-4 pb-20 sm:px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="pointer-events-auto mx-auto max-w-7xl rounded-[2rem] border border-white/12 bg-black/45 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <motion.p variants={fadeInUp} className="max-w-5xl text-xl font-light leading-relaxed text-white/82 md:text-3xl">
              Frontier Physics-AI system that links discovery, mesoscale piloting, process control, and a “digital brain”, delivering a production-ready blueprint for scalable industrial deployment
            </motion.p>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <motion.div variants={scaleIn} className="rounded-2xl border border-purple-300/20 bg-black/55 p-5 backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-200/70">Founder</p>
                <p className="mt-2 text-lg font-medium leading-snug text-white">PhD, Cambridge University — Materials Science & Photonic Engineering. Former Microsoft Research.</p>
              </motion.div>
              <motion.div variants={scaleIn} className="rounded-2xl border border-white/15 bg-black/55 p-5 backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Built With</p>
                <p className="mt-2 text-2xl font-medium text-white">NVIDIA & Google</p>
              </motion.div>
              <motion.div variants={scaleIn} className="rounded-2xl border border-[#ff9933]/25 bg-black/55 p-5 backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff9933]/80">Backed By</p>
                <p className="mt-2 text-lg font-medium leading-snug text-white">Sovereign IndiaAI Mission — Priority National Compute</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <SlideShell eyebrow="Slide 2 — The Problem" title="The Trillion-Dollar “Valley of Death”" subtitle="AI has accelerated discovery. But physical production is still slow, manual, and expensive." tone="red">
          <div className="grid gap-6 lg:grid-cols-3">
            <motion.div variants={scaleIn} className="rounded-2xl border border-white/12 bg-black/50 p-6 backdrop-blur-xl">
              <Microscope className="mb-5 h-8 w-8 text-red-300" />
              <h3 className="mb-3 text-2xl font-medium text-white">The Disconnect</h3>
              <p className="leading-relaxed text-white/72">Foundation models like <span className="font-medium text-white">Evo 2</span> for biology and <span className="font-medium text-white">GNoME</span> for materials can propose promising <span className="text-[#48cae4]">molecules, materials, proteins, electrolytes, catalysts, and chemicals</span> at unprecedented speed.</p>
              <p className="mt-4 leading-relaxed text-white/72">But moving that candidate into a <span className="font-medium text-white">bioreactor, chemical reactor, battery line, or factory</span> still requires <span className="text-red-300">manual, multi-stage experimentation</span>.</p>
            </motion.div>
            <motion.div variants={scaleIn} className="rounded-2xl border border-red-400/25 bg-red-950/20 p-6 backdrop-blur-xl">
              <TrendingDown className="mb-5 h-8 w-8 text-red-300" />
              <h3 className="mb-3 text-2xl font-medium text-white">The Cost</h3>
              <p className="leading-relaxed text-white/72">This creates a <span className="font-medium text-white">Valley of Death</span> between the <span className="text-red-300">quantum/micro scale</span> and the <span className="text-orange-300">factory floor</span>.</p>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-white/45">Industry average to cross the gap:</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-black/35 p-4"><p className="text-3xl font-medium text-white">2.5 years</p></div>
                <div className="rounded-xl border border-white/10 bg-black/35 p-4"><p className="text-3xl font-medium text-white">$1.5M+</p><p className="text-sm text-white/50">per iteration</p></div>
              </div>
            </motion.div>
            <motion.div variants={scaleIn} className="rounded-2xl border border-white/12 bg-black/50 p-6 backdrop-blur-xl">
              <Factory className="mb-5 h-8 w-8 text-orange-300" />
              <h3 className="mb-3 text-2xl font-medium text-white">The Reality</h3>
              <div className="space-y-4 leading-relaxed text-white/72">
                <p>A battery can work on a <span className="font-medium text-white">computer screen</span> and fail on the <span className="text-orange-300">factory line</span>.</p>
                <p>A biologic can work in a <span className="font-medium text-white">flask</span> and collapse in a <span className="text-orange-300">bioreactor</span>.</p>
                <p>A material can pass <span className="font-medium text-white">lab tests</span> and fracture during <span className="text-orange-300">industrial production</span>.</p>
                <p className="text-xl font-medium text-white">Physics is currently siloed.</p>
              </div>
            </motion.div>
          </div>
        </SlideShell>

        <SlideShell eyebrow="Slide 3 — The Solution" title="The World Foundational Model" subtitle="We are building a continuous physics AI model that learns the thread of physics connecting molecules, materials, processes, and factories." tone="lightCyan">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-gray-500">It operates across four continuous layers:</p>
          <div className="grid gap-5 md:grid-cols-2">
            {layers.map((layer) => {
              const Icon = layer.icon;
              return (
                <motion.div key={layer.number} variants={scaleIn} className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-lg backdrop-blur-xl">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#48cae4]/12 text-[#48cae4]"><Icon className="h-6 w-6" /></div>
                    <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#48cae4]">{layer.number}</p>
                  </div>
                  <h3 className="text-2xl font-medium text-gray-900">{layer.title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-600">{layer.text}</p>
                </motion.div>
              );
            })}
          </div>
          <motion.div variants={fadeInUp} className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 backdrop-blur-xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">The ROI</p>
            <p className="mt-3 text-3xl font-medium text-gray-900 md:text-5xl">2.5 years today → less than 3 months with Saving over $1M</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="mt-5 rounded-2xl border border-[#48cae4]/20 bg-[#48cae4]/10 p-6 backdrop-blur-xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#48cae4]">Strategic Value</p>
            <p className="mt-3 text-xl leading-relaxed text-gray-700">Shodh AI helps companies capture more of their patent-protected revenue window by reducing the time between discovery, scale-up, and commercialization.</p>
          </motion.div>
        </SlideShell>

        <SlideShell eyebrow="Slide 4 — The Technology" title="A Model That Learns Physics" subtitle="LLMs learned language. Shodh AI is learning physics." tone="lightCyan">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <motion.div variants={fadeInUp} className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-lg backdrop-blur-xl md:p-8">
              <p className="text-lg leading-relaxed text-gray-600">You cannot scrape the internet for factory physics.</p>
              <p className="mt-4 text-2xl font-medium leading-snug text-gray-900">So we create physics data ourselves and benchmark it against reality.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="rounded-2xl border border-red-200 bg-red-50/70 p-6 shadow-lg backdrop-blur-xl md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-500">The Core Challenge</p>
              <h3 className="mt-3 text-3xl font-medium text-gray-900">The Reality Gap</h3>
              <p className="mt-4 leading-relaxed text-gray-600">The hard part is making it predict what actually happens in a lab, reactor, pilot plant, or factory.</p>
            </motion.div>
          </div>
          <motion.div variants={fadeInUp} className="mt-6 rounded-2xl border border-purple-200 bg-white/70 p-6 shadow-lg backdrop-blur-xl md:p-8">
            <p className="text-xl leading-relaxed text-gray-700">That gap between simulated physics and physical reality is the Reality Gap.</p>
            <p className="mt-3 text-2xl font-medium leading-snug text-gray-900">Shodh AI’s moat is closing this gap.</p>
          </motion.div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {[
              ["1. Synthetic Physics Engine", "Our proprietary JAX-native engine generates large-scale physics data across molecular dynamics, Brownian dynamics, fluid dynamics, and mesoscale process physics."],
              ["2. Reality Benchmark", "Partner ground truth from labs, reactors, pilot runs, and factories calibrates the model against the real world."],
              ["3. Continuous Improvement", "Every industrial deployment reduces the Reality Gap and makes the model more general."],
            ].map(([title, text]) => (
              <motion.div key={title} variants={scaleIn} className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-lg backdrop-blur-xl">
                <Database className="mb-5 h-7 w-7 text-[#48cae4]" />
                <h3 className="text-xl font-medium text-gray-900">{title}</h3>
                <p className="mt-3 leading-relaxed text-gray-600">{text}</p>
              </motion.div>
            ))}
          </div>
        </SlideShell>

        <SlideShell eyebrow="Slide 5 — Commercial Strategy" title="The 25 Billion-Dollar Pillars" subtitle="One base physics model. Twenty-five industrial adapters. One compounding World Model." tone="lightAmber">
          <motion.div variants={fadeInUp} className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-lg backdrop-blur-xl md:p-8">
            <p className="text-xl font-medium leading-relaxed text-gray-900">Each Pillar is a paid industrial deployment:</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-600">Revenue</p>
                <p className="mt-2 text-lg font-medium text-gray-900">NRE + milestones + platform license</p>
              </div>
              <div className="rounded-xl border border-purple-200 bg-purple-50/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-600">Future Upside</p>
                <p className="mt-2 text-lg font-medium text-gray-900">royalty / value-share on process and material IP</p>
              </div>
            </div>
          </motion.div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillarExamples.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div key={pillar.title} variants={scaleIn} className="rounded-2xl border border-amber-200 bg-white/70 p-5 shadow-lg backdrop-blur-xl">
                  <div className="mb-4 flex items-center gap-3">
                    <Icon className="h-7 w-7 text-amber-300" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">{pillar.title}</h3>
                  <div className="mt-4 space-y-2">
                    {pillar.lines.map((line) => (
                      <p key={line} className="rounded-xl border border-black/10 bg-white/75 p-3 leading-relaxed text-gray-700">{line}</p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
          <motion.div variants={fadeInUp} className="mt-6 rounded-2xl border border-[#48cae4]/20 bg-[#48cae4]/10 p-6 backdrop-blur-xl">
            <p className="text-xl font-medium leading-relaxed text-gray-900">...and 19 additional Pillars spanning Semiconductors, Advanced Manufacturing, Metamaterials, Tissue Engineering, Nuclear Materials, Hypersonic Materials, Industrial Heat Flow, and Smart Manufacturing.</p>
          </motion.div>
        </SlideShell>

        <SlideShell eyebrow="Slide 6 — Traction & Why We Win" title="Traction & Why We Win" subtitle="We are validating the Pillars with major industrial partners." tone="lightCyan">
          <div className="grid gap-6">
            <motion.div variants={fadeInUp} className="rounded-2xl border border-emerald-200 bg-white/70 p-6 shadow-lg backdrop-blur-xl md:p-8">
              <h3 className="text-2xl font-medium text-gray-900">Anchor Partners</h3>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {partners.map(([name, text]) => (
                  <div key={name} className="rounded-xl border border-black/10 bg-white/75 p-4">
                    <p className="font-medium text-gray-900">{name}</p>
                    <p className="mt-1 text-sm text-gray-500">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div variants={fadeInUp} className="mt-6 rounded-2xl border border-[#48cae4]/20 bg-white/75 p-6 shadow-lg backdrop-blur-xl md:p-8">
            <h3 className="text-2xl font-medium text-gray-900">The Compounding Flywheel</h3>
            <p className="mt-4 text-2xl font-medium leading-snug text-gray-900">Customers pay us to solve bottlenecks. Each deployment creates ground truth. Each solved Pillar strengthens the World Model.</p>
          </motion.div>
        </SlideShell>

        <SlideShell eyebrow="Slide 7 — The End Game" title="Generative Physical IP" tone="cyan">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              ["The first phase is predictive:", "Will this molecule, material, or process scale?"],
              ["The second phase is prescriptive:", "What process conditions should we run?"],
              ["The third phase is generative:", "Design the product, process, and factory together."],
            ].map(([title, text]) => (
              <motion.div key={title} variants={scaleIn} className="rounded-2xl border border-[#48cae4]/18 bg-black/50 p-6 backdrop-blur-xl">
                <Sparkles className="mb-5 h-7 w-7 text-[#48cae4]" />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/45">{title}</p>
                <p className="mt-3 text-2xl font-medium leading-snug text-white">{text}</p>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeInUp} className="mt-8 rounded-2xl border border-white/12 bg-black/55 p-6 backdrop-blur-xl md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#48cae4]">Future interface</p>
            <p className="mt-4 text-white/75">A user prompts:</p>
            <p className="mt-3 rounded-2xl border border-white/12 bg-white/[0.04] p-5 text-xl font-light italic leading-relaxed text-white md:text-3xl">“Design a carbon-negative concrete optimized for Indian climate, local feedstock, low cost, and scalable manufacturing.”</p>
            <p className="mt-6 text-white/75">The World Model generates:</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {generatedOutputs.map((output) => (
                <div key={output} className="rounded-xl border border-[#48cae4]/15 bg-[#48cae4]/10 px-4 py-3 text-white/75">{output}</div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="mt-8 rounded-2xl border border-purple-400/20 bg-purple-950/15 p-6 backdrop-blur-xl md:p-8">
            <Globe2 className="mb-5 h-8 w-8 text-purple-300" />
            <h3 className="text-3xl font-medium text-white">The Business & Vision</h3>
            <p className="mt-4 text-lg leading-relaxed text-white/75">We begin as enterprise physics AI and expand into the zero-to-billion engine for physical IP.</p>
            <p className="mt-3 text-lg leading-relaxed text-white/75">Long term, Shodh AI participates in the physical IP layer of the next industrial century through licensing, royalties, joint ventures, and co-development.</p>
            <p className="mt-3 text-lg leading-relaxed text-white/75">We give companies and nations the ability to imagine, validate, and manufacture.</p>
            <p className="mt-3 text-2xl font-medium leading-snug text-white">Just as LLMs made intelligence programmable, Shodh AI makes physical invention programmable.</p>
          </motion.div>
        </SlideShell>

        <section className="px-4 pb-24 pt-8 sm:px-6 md:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="pointer-events-auto mx-auto max-w-5xl rounded-[2rem] border border-black/10 bg-gradient-to-br from-[#f0f0ff] via-white to-[#e8fbff] p-8 text-center shadow-[0_30px_80px_rgba(8,20,33,0.25)] backdrop-blur-xl md:p-12">
            <motion.div variants={fadeInUp} className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#48cae4]/12 text-[#48cae4]">
              <Network className="h-7 w-7" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl font-medium uppercase tracking-tight text-gray-900 md:text-6xl">The World Foundational Model</motion.h2>
            <motion.p variants={fadeInUp} className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-gray-600">From discovery to mesoscale piloting to process control to real-world factory production.</motion.p>
          </motion.div>
        </section>

        <footer className="pointer-events-auto relative w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#081421]">
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 px-4 pb-8 pt-12 sm:px-6 sm:pt-16 md:px-10 md:pt-20">
            <div className="mb-10 overflow-hidden">
              <h1 className="w-full select-none whitespace-nowrap text-[clamp(4.5rem,22vw,24rem)] font-normal leading-[0.9] text-[#f0f0ff]">
                Shodh AI
              </h1>
            </div>
            <div className="pb-2 text-xs uppercase tracking-wider text-[#f0f0ff]">
              2026 Shodh AI. All rights reserved
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
