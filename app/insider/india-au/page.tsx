"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { Globe2 } from "lucide-react";

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

const partners = [
  ["Specialty Chemicals", "Aarti Industries", "Proprietary data shared; early validation underway for chemical scale-up."],
  ["Pharma & Biologics", "Jubilant + Biocon", "Scoped biologics use cases across batch optimization and continuous manufacturing."],
  ["Batteries", "Tier-1 Battery Supplier", "Data access aligned; model-build discussion underway."],
  ["Aerospace", "GE Aerospace", "Scoped aerospace manufacturing use case."],
];

const generatedOutputs = [
  "Validated formulation",
  "Manufacturing route",
  "Process recipe + operating window",
  "Quality-control plan",
  "Cost, yield, and carbon profile",
  "Scale-up risk map",
  "Dynamic factory model",
];

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#48cae4]/30 bg-[#48cae4]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#48cae4] backdrop-blur-md">
      <span className="h-2 w-2 rounded-full bg-[#48cae4] shadow-[0_0_12px_#48cae4]" />
      {children}
    </span>
  );
}

function LightSlideShell({
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
  tone?: "cyan" | "amber";
}) {
  const toneClass = {
    cyan: "from-[#f6f5ef] via-white to-[#e8fbff] border-[#48cae4]/18",
    amber: "from-[#f6f5ef] via-white to-[#f4ffe7] border-[#b5ff48]/20",
  }[tone];

  return (
    <section className="pointer-events-auto px-4 pb-24 sm:px-6 md:px-10 md:pb-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
        variants={staggerContainer}
        className={`mx-auto max-w-7xl rounded-[2rem] border bg-gradient-to-br ${toneClass} p-6 text-[#0b2338] shadow-[0_30px_90px_rgba(8,20,33,0.16)] backdrop-blur-xl md:p-10 lg:p-12`}
      >
        <motion.div variants={fadeInUp} className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Badge>{eyebrow}</Badge>
          <div className="h-px min-w-24 flex-1 bg-gradient-to-r from-black/20 to-transparent" />
        </motion.div>
        <motion.h2 variants={fadeInUp} className="max-w-5xl text-4xl font-black uppercase leading-[1.02] tracking-tight text-[#0b2338] sm:text-5xl md:text-7xl">
          {title}
        </motion.h2>
        {subtitle ? (
          <motion.p variants={fadeInUp} className="mt-6 max-w-4xl text-lg font-semibold leading-relaxed text-black/62 md:text-2xl">
            {subtitle}
          </motion.p>
        ) : null}
        <div className="mt-10">{children}</div>
      </motion.div>
    </section>
  );
}

function ShodhWorldModelArchitectureInfographic() {
  return (
    <section className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[1.4rem] border border-black/10 bg-[#f0efe9] p-5 shadow-[0_30px_90px_rgba(8,20,33,0.22)] sm:p-6 md:aspect-[16/9] md:min-h-0 md:rounded-[2rem] md:p-0">
      <Image
        src="/image_nvidia_intro.jpeg"
        alt="Shodh World Model Architecture - Discovery Embedding to Dynamic Digital Twin"
        fill
        priority
        sizes="(max-width: 1500px) 100vw, 1500px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(240,239,233,0.96)_0%,rgba(240,239,233,0.0)_24%,rgba(240,239,233,0.0)_66%,rgba(240,239,233,0.97)_100%)]" />

      <div className="relative z-10 mx-auto text-center md:absolute md:left-1/2 md:top-[3.5%] md:w-[740px] md:max-w-[62%] md:-translate-x-1/2">
        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#4b6b00] sm:text-xs">Architecture</p>
        <h2 className="mt-1.5 text-3xl font-medium uppercase leading-none tracking-tight text-[#111] sm:text-4xl lg:text-[2.3rem]">
          Shodh World Model Architecture
        </h2>
      </div>

      <div className="relative z-10 mt-4 md:absolute md:left-[17%] md:top-[17.5%] md:mt-0 md:w-[16%]">
        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#4b6b00] sm:text-[10px]">Input</p>
        <h4 className="mt-1 text-xs font-medium uppercase leading-[1.08] tracking-tight text-[#111] sm:text-[13px]">
          Industry Typical<br />Discovery Model +<br />Data- NRE Projects
        </h4>
        <div className="mt-1 hidden h-[42px] md:block">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 160 86" fill="none">
            <path d="M28 10 C44 17 54 27 62 42 C68 53 70 63 69 76" stroke="#0b2338" strokeOpacity="0.42" strokeWidth="2" />
            <path d="M69 76 L62 63 L77 64 Z" fill="#0b2338" fillOpacity="0.42" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 mt-4 md:absolute md:left-[7%] md:top-[35%] md:mt-0 md:w-[15%]">
        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#4b6b00] sm:text-[10px]">01 / Input</p>
        <h3 className="mt-1 text-base font-medium uppercase leading-tight tracking-tight text-[#111] sm:text-lg">
          Discovery Embedding<br />Pipeline
        </h3>
      </div>

      <div className="relative z-10 mt-4 text-center md:absolute md:left-[35%] md:top-[17.5%] md:mt-0 md:w-[28%]">
        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#4b6b00] sm:text-[10px]">02 / Core Engine</p>
        <h3 className="mt-1 text-sm font-medium uppercase leading-snug tracking-tight text-[#111] sm:text-base">
          Universal Multi-Physics World Model (Shodh-MOE)
        </h3>
      </div>

      <div className="relative z-10 mt-3 md:absolute md:left-[65%] md:top-[15.5%] md:mt-0 md:w-[20%]">
        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#4b6b00] sm:text-[10px]">03 / Factory Systems</p>
        <h3 className="mt-1 text-base font-medium uppercase leading-tight tracking-tight text-[#111] sm:text-lg">
          Dynamic Digital Twin
          <span className="ml-1 text-xs font-medium normal-case text-[#48cae4]">(Omniverse)+</span>
        </h3>
      </div>

      <div className="relative z-10 mt-4 flex flex-col justify-center rounded-2xl border border-white/55 bg-white/48 px-5 py-6 shadow-[0_20px_60px_rgba(8,20,33,0.14)] backdrop-blur-sm md:absolute md:right-[-0.7%] md:top-[27%] md:mt-0 md:h-[50%] md:w-[13%]">
        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#4b6b00] sm:text-[10px]">04 / Output</p>
        <h3 className="mt-2 text-xl font-medium uppercase leading-tight tracking-tight text-[#111]">
          Production Ready Artifact
        </h3>
      </div>

      <div className="relative z-10 mx-auto mt-6 w-full text-center md:absolute md:bottom-[17%] md:left-[13%] md:mx-0 md:mt-0 md:w-[74%]">
        <div className="h-[24px] w-full rounded-full border border-[#4b6b00]/40 bg-[linear-gradient(90deg,rgba(75,107,0,0.72),rgba(181,255,72,0.46),rgba(72,202,228,0.32),rgba(75,107,0,0.72))] shadow-[0_12px_36px_rgba(75,107,0,0.2)]" />
        <p className="mt-2 text-xl font-medium leading-tight tracking-tight text-[#111]">Control Plan</p>
      </div>

      <div className="relative z-10 mx-auto mt-4 w-full max-w-[1180px] rounded-[1.15rem] border border-black/10 bg-white/62 px-6 py-4 text-center shadow-[0_18px_50px_rgba(8,20,33,0.10)] backdrop-blur-sm md:absolute md:bottom-[3.2%] md:left-1/2 md:mt-0 md:w-[88%] md:-translate-x-1/2">
        <p className="text-sm font-medium uppercase leading-tight tracking-tight text-[#111] sm:text-base md:whitespace-nowrap">
          Reducing Discovery to Production Ready Prototyping from 2.5 Yrs/$50M per process to 3 Months/$2M
        </p>
      </div>
    </section>
  );
}

function BioReactorWorldModelInfographic() {
  const panel = "rounded-[1.5rem] border border-[#0b2338]/10 bg-white/68 p-4 shadow-[0_22px_70px_rgba(8,20,33,0.12)] backdrop-blur-xl";
  const panelTitle = "text-center text-[13px] font-medium leading-tight tracking-tight text-[#111]";
  const greenNode = "rounded-xl border border-[#4b6b00]/20 bg-[#6fb400] px-4 py-3 text-center text-sm font-medium leading-tight tracking-tight text-white shadow-[0_16px_42px_rgba(75,107,0,0.16)]";
  const paleGreenNode = "rounded-xl border border-[#4b6b00]/18 bg-[#f4ffe7]/88 px-4 py-3 text-center text-base font-medium leading-tight tracking-tight text-[#4b6b00] shadow-[0_14px_38px_rgba(75,107,0,0.10)]";
  const blueNode = "rounded-xl border border-[#48cae4]/18 bg-[#123f78] px-4 py-3 text-center text-sm font-medium leading-tight tracking-tight text-white shadow-[0_16px_42px_rgba(8,20,33,0.16)]";
  const whiteNode = "rounded-xl border border-[#0b2338]/10 bg-white/80 px-4 py-3 text-center text-sm font-medium leading-tight tracking-tight text-[#111] shadow-sm";
  const annotation = "text-[12px] font-medium leading-tight tracking-tight text-[#111]/78";

  return (
    <section className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[1.4rem] border border-[#0b2338]/10 bg-[#f6f5ef] p-5 shadow-[0_30px_90px_rgba(8,20,33,0.22)] sm:p-6 md:aspect-[16/9] md:min-h-[760px] md:rounded-[2rem] md:p-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(181,255,72,0.14),transparent_26%),radial-gradient(circle_at_78%_76%,rgba(72,202,228,0.14),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.78),rgba(238,240,236,0.94))]" />

      <div className="relative z-10 mx-auto text-center md:absolute md:left-1/2 md:top-[3.2%] md:w-[760px] md:max-w-[70%] md:-translate-x-1/2">
        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#4b6b00] sm:text-xs">Architecture</p>
        <h2 className="mt-1.5 text-3xl font-medium uppercase leading-none tracking-tight text-[#111] sm:text-4xl lg:text-[2.25rem]">
          Shodh World Model Architecture
        </h2>
      </div>

      <div className="relative z-10 mt-20 grid gap-5 md:absolute md:inset-x-[4%] md:top-[12%] md:mt-0 md:grid-cols-[1fr_40px_1.4fr_40px_1fr] md:grid-rows-[240px_54px_280px_54px_260px] md:gap-0">
        <div className={`${panel} md:col-start-1 md:row-start-1`}>
          <p className={panelTitle}>1. In-Silico Generation &amp; Bio-Pillar</p>
          <div className="mx-auto mt-5 w-[76%] space-y-5">
            <div className={paleGreenNode}>Evo 2</div>
            <div className="mx-auto h-5 w-px bg-[#4b6b00]/36" />
            <div className={paleGreenNode}>ProteinMPNN</div>
          </div>
        </div>

        <div className="hidden items-center justify-center md:col-start-2 md:row-start-1 md:flex">
          <div className="relative h-px w-full bg-[#0b2338]/30 after:absolute after:right-0 after:top-1/2 after:h-0 after:w-0 after:-translate-y-1/2 after:border-y-[7px] after:border-l-[10px] after:border-y-transparent after:border-l-[#0b2338]/45" />
        </div>

        <div className={`${panel} md:col-start-3 md:row-start-1`}>
          <p className={panelTitle}>1. NVIDIA Discovery Ecosystem (Input)</p>
          <div className="mt-8 grid grid-cols-[1fr_0.9fr_1.1fr] items-center gap-5">
            <div className={greenNode}>NVIDIA BioNeMo</div>
            <p className={annotation}>Molecular Sequence /<br />PDE</p>
            <div className={whiteNode}>Biologic Drug Molecule</div>
          </div>
        </div>

        <div className="hidden items-center justify-center md:col-start-4 md:row-start-1 md:flex">
          <div className="relative h-px w-full bg-[#0b2338]/30 after:absolute after:right-0 after:top-1/2 after:h-0 after:w-0 after:-translate-y-1/2 after:border-y-[7px] after:border-l-[10px] after:border-y-transparent after:border-l-[#0b2338]/45" />
        </div>

        <div className={`${panel} md:col-start-5 md:row-start-1`}>
          <p className={panelTitle}>3. Shodh AI: Micro-Physics Engine</p>
          <div className="mx-auto mt-4 w-[82%] space-y-3 text-center">
            <div className={blueNode}>SHODH AI Micro Physics Solver</div>
            <p className={annotation}>Simulates thermal<br />motion &amp; viscosity</p>
            <div className={blueNode}>Atomic Shear-Stress Profiler</div>
            <p className={annotation}>Calculates<br />Denaturation Limit</p>
            <div className={whiteNode}>Max Allowable Fluid<br />Shear - Pascals</div>
          </div>
        </div>

        <div className="hidden items-center justify-center md:col-start-1 md:row-start-2 md:flex">
          <div className="relative h-full w-px bg-[#0b2338]/24 after:absolute after:bottom-0 after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-x-[7px] after:border-t-[10px] after:border-x-transparent after:border-t-[#0b2338]/42" />
        </div>

        <div className="hidden items-center justify-center md:col-start-3 md:row-start-2 md:flex">
          <div className="relative h-full w-px bg-[#0b2338]/24 after:absolute after:bottom-0 after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-x-[7px] after:border-t-[10px] after:border-x-transparent after:border-t-[#0b2338]/42" />
        </div>

        <div className="hidden items-center justify-center md:col-start-5 md:row-start-2 md:flex">
          <div className="relative h-full w-px bg-[#0b2338]/24 after:absolute after:bottom-0 after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-x-[7px] after:border-t-[10px] after:border-x-transparent after:border-t-[#0b2338]/42" />
        </div>

        <div className={`${panel} md:col-start-1 md:row-start-3`}>
          <p className={panelTitle}>2. LLM Agentic Constraints</p>
          <div className="mx-auto mt-4 w-[78%]">
            <div className="rounded-xl border border-[#d6a400]/24 bg-[#fff4c7]/92 px-4 py-3 text-center text-sm font-medium leading-tight tracking-tight text-[#111] shadow-[0_14px_38px_rgba(214,164,0,0.12)]">Reasoning Agent / NeMo Guardrails</div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-5 text-center text-sm font-medium leading-tight text-[#0b2338]">
            <p>Prompts for factory<br />bounds</p>
            <p>Outputs: Volume, Flow<br />Rate, Machining Limits.</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-5">
            <div className="flex aspect-square max-h-[96px] items-center justify-center rounded-full border border-[#0b2338]/22 bg-white/72 px-4 text-center text-sm font-medium leading-tight text-[#111]">Biocon<br />Engineer</div>
            <div className="flex items-center justify-center rounded-xl border border-[#0b2338]/12 bg-white/72 px-4 text-center text-sm font-medium leading-tight text-[#111]">Manufacturing<br />Constraints</div>
          </div>
        </div>

        <div className="hidden items-center justify-center md:col-start-2 md:row-start-3 md:flex">
          <div className="relative h-px w-full bg-[#0b2338]/30 after:absolute after:right-0 after:top-1/2 after:h-0 after:w-0 after:-translate-y-1/2 after:border-y-[7px] after:border-l-[10px] after:border-y-transparent after:border-l-[#0b2338]/45" />
        </div>

        <div className={`${panel} md:col-start-3 md:row-start-3 md:row-span-3`}>
          <p className={panelTitle}>4. Shodh AI: Generative Inverse Compiler (Meso-Scale)</p>
          <div className="mt-5 grid grid-cols-[0.95fr_1.35fr_0.95fr] items-start gap-3">
            <p className={`${annotation} pt-4 text-right`}>Semantic &amp; Physical<br />Boundary Conditions</p>
            <div className="space-y-3">
              <div className={blueNode}>Multi-Modal Physics Ingestion</div>
              <div className={blueNode}>Proprietary Large Physics Model</div>
              <div className={blueNode}>High-Fidelity 3D Neural Decoder</div>
              <div className={blueNode}>Exact Mass &amp; Momentum Conservation Layer</div>
            </div>
            <div className={`${annotation} space-y-5 pt-4`}>
              <p>Target Geometry:<br />MASKED</p>
              <p>Generative Topology<br />Optimization</p>
              <p>Hard Projection<br />Constraints</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 px-8">
            <div className={whiteNode}>Optimized 3D<br />Bioreactor SDF</div>
            <div className={whiteNode}>Fluid Velocity &amp;<br />Pressure Tensors</div>
          </div>
        </div>

        <div className="hidden items-center justify-center md:col-start-4 md:row-start-3 md:flex">
          <div className="relative h-px w-full bg-[#0b2338]/30 after:absolute after:right-0 after:top-1/2 after:h-0 after:w-0 after:-translate-y-1/2 after:border-y-[7px] after:border-l-[10px] after:border-y-transparent after:border-l-[#0b2338]/45" />
        </div>

        <div className="hidden items-center justify-center md:col-start-5 md:row-start-4 md:flex">
          <div className="relative h-full w-px bg-[#0b2338]/24 after:absolute after:bottom-0 after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-x-[7px] after:border-t-[10px] after:border-x-transparent after:border-t-[#0b2338]/42" />
        </div>

        <div className={`${panel} md:col-start-5 md:row-start-5`}>
          <p className={panelTitle}>5. NVIDIA Ecosystem (Output &amp; Co-Build)</p>
          <div className="mx-auto mt-4 w-[76%] space-y-3 text-center">
            <div className={greenNode}>NVIDIA PhysX/IsaacSim</div>
            <p className={annotation}>Applies Live Physical<br />Overlays</p>
            <div className={greenNode}>NVIDIA Omniverse</div>
            <div className="mx-auto flex h-20 w-20 rotate-45 items-center justify-center border border-[#4b6b00]/30 bg-[#6fb400] shadow-[0_16px_42px_rgba(75,107,0,0.14)]">
              <p className="-rotate-45 text-center text-[10px] font-medium leading-tight text-white">Real-Time<br />Bioreactor<br />Digital Twin</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center md:col-start-5 md:row-start-3">
          <p className="text-center text-xl font-medium leading-tight tracking-tight text-[#111]">High-Bandwidth 3D<br />Streaming</p>
        </div>

        <div className="flex items-center justify-center md:col-start-4 md:row-start-5">
          <p className="text-center text-xl font-medium leading-tight tracking-tight text-[#111]">OpenUSD / OpenVDB API<br />connector</p>
        </div>
      </div>
    </section>
  );
}

function MermaidReferenceArchitectureInfographic() {
  return (
    <section className="relative mx-auto w-full max-w-[1600px] overflow-hidden rounded-[1.4rem] border border-[#0b2338]/10 bg-[#f6f5ef] p-5 shadow-[0_30px_90px_rgba(8,20,33,0.22)] sm:p-6 md:rounded-[2rem] md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(118,185,0,0.14),transparent_26%),radial-gradient(circle_at_82%_72%,rgba(72,202,228,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(232,244,245,0.95))]" />

      <div className="relative z-10 mx-auto max-w-[1040px] text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#4b6b00]">Reference Architecture</p>
        <h2 className="mx-auto max-w-[900px] text-4xl font-bold uppercase leading-none tracking-tight text-[#0b2338] md:text-5xl">The Biologic Drug Scale-Up Pipeline</h2>
      </div>

      <div className="relative z-10 mx-auto mt-8 w-full max-w-[1500px]">
        <img
          src="/biologic.svg"
          alt="Biologic Drug Scale-Up Pipeline"
          className="h-auto w-full rounded-[1.35rem]"
        />
      </div>
    </section>
  );
}

function EVBatteryScaleUpInfographic() {
  return (
    <section className="relative mx-auto w-full max-w-[1600px] overflow-hidden rounded-[1.4rem] border border-[#0b2338]/10 bg-[#f6f5ef] p-5 shadow-[0_30px_90px_rgba(8,20,33,0.22)] sm:p-6 md:rounded-[2rem] md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(118,185,0,0.14),transparent_26%),radial-gradient(circle_at_82%_72%,rgba(72,202,228,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(232,244,245,0.95))]" />

      <div className="relative z-10 mx-auto max-w-[1040px] text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#4b6b00]">Reference Architecture</p>
        <h2 className="mx-auto max-w-[900px] text-4xl font-bold uppercase leading-none tracking-tight text-[#0b2338] md:text-5xl">EV Battery Scale-Up &amp; Multiphase Manufacturing</h2>
      </div>

      <div className="relative z-10 mx-auto mt-8 w-full max-w-[1500px]">
        <img
          src="/d2.svg"
          alt="EV Battery Scale-Up & Multiphase Manufacturing"
          className="h-auto w-full rounded-[1.35rem]"
        />
      </div>
    </section>
  );
}

function ProductionValleyInfographic() {
  return (
    <section className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[1.4rem] border border-[#0b2338]/10 bg-[#f6f5ef] p-5 shadow-[0_30px_90px_rgba(8,20,33,0.22)] sm:p-6 md:aspect-[16/9] md:min-h-0 md:rounded-[2rem] md:p-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(72,202,228,0.16),transparent_28%),radial-gradient(circle_at_76%_18%,rgba(181,255,72,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(238,240,236,0.92))]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        role="img"
        aria-label="Discovery to industrial production valley of death diagram"
      >
        <defs>
          <linearGradient id="nvadaLeftMountain" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#8bbccc" />
            <stop offset="1" stopColor="#48cae4" />
          </linearGradient>
          <linearGradient id="nvadaRightMountain" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#87b7af" />
            <stop offset="1" stopColor="#b5ff48" />
          </linearGradient>
          <linearGradient id="nvadaMountainFade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#f6f5ef" stopOpacity="0" />
            <stop offset="0.62" stopColor="#f6f5ef" stopOpacity="0.62" />
            <stop offset="1" stopColor="#f6f5ef" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="nvadaValleyGlow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#48cae4" stopOpacity="0" />
            <stop offset="0.56" stopColor="#48cae4" stopOpacity="0.18" />
            <stop offset="1" stopColor="#48cae4" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="nvadaValleyBase" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#48cae4" stopOpacity="0.2" />
            <stop offset="0.52" stopColor="#dfe5e3" stopOpacity="0.78" />
            <stop offset="1" stopColor="#aeb8b7" stopOpacity="0.96" />
          </linearGradient>
          <radialGradient id="nvadaSunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#b5ff48" stopOpacity="0.34" />
            <stop offset="0.46" stopColor="#48cae4" stopOpacity="0.1" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1600" height="900" fill="#f6f5ef" />
        <g stroke="#cfd6d4" strokeWidth="1" opacity="0.42">
          {Array.from({ length: 15 }, (_, index) => (
            <path key={`nvada-valley-grid-a-${index}`} d={`M ${-260 + index * 140} 840 L ${500 + index * 140} 410`} />
          ))}
          {Array.from({ length: 15 }, (_, index) => (
            <path key={`nvada-valley-grid-b-${index}`} d={`M ${-120 + index * 140} 400 L ${640 + index * 140} 840`} />
          ))}
        </g>
        <circle cx="1120" cy="230" r="210" fill="url(#nvadaSunGlow)" />
        <circle cx="1120" cy="230" r="112" fill="#b5ff48" opacity="0.1" />

        <path
          d="M 0 820 L 0 594 C 78 570 125 548 173 510 C 217 475 244 448 305 438 C 362 429 407 456 466 473 C 520 488 588 492 660 522 L 698 638 L 742 754 L 770 820 Z"
          fill="url(#nvadaLeftMountain)"
          opacity="0.84"
        />
        <path d="M 590 500 L 660 522 L 698 638 L 742 754 L 770 820 L 714 820 L 665 700 L 626 558 Z" fill="#60757b" opacity="0.34" />
        <path
          d="M 830 820 L 870 754 L 922 622 L 965 550 L 1008 536 L 1058 355 C 1080 310 1102 262 1124 205 C 1150 137 1190 98 1244 98 C 1302 98 1351 142 1388 204 C 1428 270 1460 336 1492 410 C 1526 489 1564 540 1600 568 L 1600 820 Z"
          fill="url(#nvadaRightMountain)"
          opacity="0.82"
        />
        <path d="M 830 820 L 870 754 L 922 622 L 965 550 L 1008 536 L 966 668 L 906 758 L 860 820 Z" fill="#7b8e8c" opacity="0.38" />
        <path d="M 690 520 L 770 820 L 830 820 L 930 520 L 1018 520 L 880 820 L 720 820 L 610 520 Z" fill="url(#nvadaValleyGlow)" />
        <path d="M 690 720 C 730 698 782 690 832 704 C 870 714 912 712 952 696 L 892 820 L 708 820 Z" fill="url(#nvadaValleyBase)" opacity="0.92" />
        <path d="M 708 792 C 755 769 834 768 892 792" fill="none" stroke="#48cae4" strokeLinecap="round" strokeWidth="2" opacity="0.26" />
        <path
          d="M 1058 355 C 1080 310 1102 262 1124 205 C 1150 137 1190 98 1244 98 C 1288 98 1328 124 1362 168 C 1322 238 1280 304 1232 372 C 1188 435 1142 489 1094 522 L 1008 536 Z"
          fill="#ffffff"
          opacity="0.22"
        />

        <rect x="1040" y="0" width="560" height="900" fill="url(#nvadaMountainFade)" />
      </svg>

      <div className="relative z-10 w-full text-left md:absolute md:left-[7%] md:top-[8%] md:w-[700px] md:max-w-[52%]">
        <h1 className="text-3xl font-medium uppercase leading-none tracking-tight text-[#111] sm:text-4xl lg:text-5xl">The Missing Model Between Discovery and Factory</h1>
        <p className="mt-4 text-base font-bold uppercase tracking-[0.18em] text-[#4b6b00] sm:text-lg">Trillion-Dollar Valley of Death</p>
      </div>

      <div className="relative z-10 mt-8 max-w-none rounded-2xl border border-black/10 bg-white/65 p-4 backdrop-blur-xl md:absolute md:left-[7%] md:top-[49%] md:mt-0 md:max-w-[430px] md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#4b6b00] sm:text-xs">Discovery</p>
        <h2 className="mt-3 text-2xl font-medium uppercase leading-none tracking-tight text-[#111] sm:text-3xl lg:text-4xl">AI has accelerated discovery</h2>
        <div className="mt-4 space-y-2 text-sm font-light leading-snug text-black/66 sm:text-base">
          <p>Biology: AlphaFold 3, Evo 2</p>
          <p>Materials &amp; Chemistry: GNoME, MatterGen</p>
        </div>
      </div>

      <div className="relative z-10 mt-4 max-w-none rounded-2xl border border-black/10 bg-white/65 p-4 text-left backdrop-blur-xl md:absolute md:right-[7%] md:top-[48%] md:mt-0 md:max-w-[410px] md:border-0 md:bg-transparent md:p-0 md:text-right md:backdrop-blur-none">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#4b6b00] sm:text-xs">Industrial Deployment</p>
        <h2 className="mt-3 text-2xl font-medium uppercase leading-none tracking-tight text-[#111] sm:text-3xl lg:text-4xl">Physical production still lags</h2>
        <p className="ml-auto mt-4 max-w-[350px] text-sm font-medium leading-snug text-[#0b2338]/70 sm:text-base">Scale-up breaks across batteries, biologics, catalysts, materials, semiconductors industrial lines.</p>
      </div>

      <div className="relative z-10 mt-4 w-full rounded-2xl border border-black/10 bg-white/65 p-4 text-center backdrop-blur-xl md:absolute md:left-1/2 md:top-[48%] md:mt-0 md:w-[380px] md:max-w-[30%] md:-translate-x-1/2 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <div className="mx-auto space-y-2 text-sm font-light leading-tight tracking-tight text-black/62 sm:text-base">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#4b6b00] sm:text-xs">The Missing Layer</p>
          <p className="font-medium text-[#0b2338]/72">Discoveries fail when physics changes across scale, process, and factory conditions.</p>
        </div>
      </div>

      <div className="relative z-10 mt-4 w-full rounded-[1.25rem] border border-black/10 bg-white/68 px-5 py-4 text-center shadow-lg backdrop-blur-xl md:absolute md:bottom-[16%] md:left-1/2 md:mt-0 md:w-[440px] md:max-w-[36%] md:-translate-x-1/2">
        <p className="mt-3 text-base font-medium uppercase leading-tight tracking-tight text-[#111] sm:text-lg">Crossing from discovery to factory can cost ~$50M and 2.5 years</p>
        <p className="mt-3 text-sm font-medium leading-snug text-[#0b2338]/72 sm:text-base">driven by 30+ manual pilot iterations.at $1.5M+ each.</p>
      </div>
    </section>
  );
}

function WorldFoundationalModelInfographic() {
  const cards = [
    {
      number: "01",
      title: "Discovery Encoder",
      tag: "Discovery",
      copy: "Represents molecules, materials, biology, and process targets in one physical latent space.",
    },
    {
      number: "02",
      title: "Physics Latent Model",
      tag: "Core bridge",
      copy: "Learns mesoscale regimes: mixing, heat, mass transfer, reactions, phases, shear, and instability.",
    },
    {
      number: "03",
      title: "Action / Policy Model",
      tag: "Operating window",
      copy: "Turns predictions into process recipes, experiments, controls, and operating windows.",
    },
    {
      number: "04",
      title: "Factory Execution Model",
      tag: "Factory systems",
      copy: "Maintains a live production model for reactors, lines, quality, yield, and scale-up.",
    },
  ];

  return (
    <section className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[1.4rem] border border-black/10 bg-[#f6f5ef] p-5 shadow-[0_30px_90px_rgba(8,20,33,0.22)] sm:p-6 md:aspect-[16/9] md:min-h-0 md:rounded-[2rem] md:p-0">
      <Image
        src="/can_you_make_it_super_202605011206.jpeg"
        alt="Physics AI architecture panels from molecule to factory"
        fill
        priority={false}
        sizes="(max-width: 1500px) 100vw, 1500px"
        className="object-cover opacity-45 md:opacity-100"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(246,245,239,0.74),rgba(246,245,239,0.08)_34%,rgba(246,245,239,0.18)),linear-gradient(90deg,rgba(246,245,239,0.28),rgba(246,245,239,0.02)_36%,rgba(246,245,239,0.26))]" />

      <div className="relative z-10 max-w-[630px] md:absolute md:left-[7%] md:top-[8%]">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#4b6b00]">The Solution</p>
        <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-[#0b2338] md:text-5xl">The World Foundation Model</h2>
        <p className="mt-4 max-w-[560px] text-base font-semibold leading-tight text-black/70 md:text-lg">One continuous model that learns the thread between discovery and factory</p>
      </div>

      <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2 md:absolute md:bottom-[7%] md:left-[5%] md:mt-0 md:w-[90%] md:grid-cols-4">
        {cards.map((card) => (
        <div key={card.title} className="min-h-[160px] rounded-3xl border border-[#0b2338]/10 bg-white/78 p-5 shadow-[0_22px_70px_rgba(11,35,56,0.12)] backdrop-blur-xl md:bg-white/64">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#4b6b00]">{card.tag}</p>
              <h3 className="mt-2 text-xl font-black uppercase leading-none tracking-tight text-[#0b2338] lg:text-2xl">{card.title}</h3>
            </div>
            <p className="text-4xl font-black leading-none tracking-tight text-[#48cae4]">{card.number}</p>
          </div>
          <p className="mt-4 text-sm font-semibold leading-tight text-black/62">{card.copy}</p>
        </div>
        ))}
      </div>

    </section>
  );
}

function PhysicsAiArchitectureImageInfographic() {
  const cards = [
    {
      number: "01",
      title: "Physical Data Engine",
      tag: "Physical data engine",
      copy: "Turns physics priors, expert process knowledge, simulations, experiments, and industrial ground truth into foundational-scale physical datasets.",
      className: "md:left-[4.5%] md:top-[34%] md:w-[32%] md:text-left",
    },
    {
      number: "02",
      title: "World Model Pretraining",
      tag: "World model pretraining",
      copy: "Learns cross-scale physical behavior from quantum and molecular systems to mesoscale processes and factory-scale production.",
      className: "md:left-1/2 md:bottom-[7%] md:w-[36%] md:-translate-x-1/2 md:text-left",
    },
    {
      number: "03",
      title: "Deployment Learning Loop",
      tag: "Deployment learning loop",
      copy: "Every partner deployment returns ground-truth production data, improving the model and increasing defensibility.",
      className: "md:right-[4.5%] md:top-[34%] md:w-[32%] md:text-right",
    },
  ];

  return (
    <section className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[1.4rem] border border-black/10 bg-[#f6f5ef] p-5 shadow-[0_30px_90px_rgba(8,20,33,0.22)] sm:p-6 md:aspect-[16/9] md:min-h-0 md:rounded-[2rem] md:p-0">
      <Image
        src="/make_them_much_larger_covering_202605011255.jpeg"
        alt="Physics-AI architecture loop system"
        fill
        priority={false}
        sizes="(max-width: 1500px) 100vw, 1500px"
        className="object-cover opacity-35 saturate-[0.78] md:opacity-70"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(246,245,239,0.82),rgba(246,245,239,0.18)_34%,rgba(246,245,239,0.22)_68%,rgba(246,245,239,0.82)),linear-gradient(90deg,rgba(246,245,239,0.5),rgba(246,245,239,0.08)_50%,rgba(246,245,239,0.5))]" />

      <div className="relative z-10 mx-auto max-w-[860px] text-center md:absolute md:left-1/2 md:top-[5%] md:w-[860px] md:max-w-[76%] md:-translate-x-1/2">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#4b6b00]">Our Enablement Strategy</p>
        <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight text-[#0b2338] sm:text-4xl lg:text-5xl">The Physical-World Pretraining Engine</h2>
        <p className="mx-auto mt-4 max-w-[760px] text-base font-bold leading-tight text-black/70 sm:text-lg">Our IP flywheel turns physics, experiments, partner know-how, and deployments into compounding physical intelligence.</p>
      </div>

      <div className="relative z-10 mt-8 grid gap-4 md:static md:z-auto md:mt-0 md:block">
      {cards.map((card) => (
        <div key={card.title} className={`relative md:absolute ${card.className} min-h-[178px] rounded-3xl border border-[#0b2338]/12 bg-[#f7f5ea]/88 p-5 text-left shadow-[0_28px_90px_rgba(11,35,56,0.18)] backdrop-blur-xl sm:p-7`}>
          <div className="flex items-start justify-between gap-4">
            <div className={card.number === "03" ? "md:order-2" : ""}>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4b6b00]">{card.number} / {card.tag}</p>
              <h3 className="mt-3 text-2xl font-black uppercase leading-none tracking-tight text-[#0b2338] lg:text-3xl">{card.title}</h3>
            </div>
            <p className="text-5xl font-black leading-none tracking-tight text-[#48cae4]">{card.number}</p>
          </div>
          <p className={`mt-5 text-base font-semibold leading-tight text-[#0b2338]/72 ${card.className.includes("text-right") ? "md:ml-auto md:max-w-[390px]" : card.className.includes("text-center") ? "md:mx-auto md:max-w-[390px]" : "md:max-w-[390px]"}`}>{card.copy}</p>
        </div>
      ))}
      </div>
    </section>
  );
}

function PillarsInfographic() {
  return (
    <section className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[1.4rem] border border-black/10 bg-[#f6f5ef] p-5 shadow-[0_30px_90px_rgba(8,20,33,0.22)] sm:p-6 md:aspect-[16/9] md:min-h-0 md:rounded-[2rem] md:p-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(72,202,228,0.14),transparent_30%),radial-gradient(circle_at_50%_75%,rgba(181,255,72,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(232,244,245,0.96))]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label="The 25 Billion-Dollar Pillars industrial deployment infographic">
        <defs>
          <linearGradient id="nvadaPillarTop" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#d7fbf4" />
          </linearGradient>
          <linearGradient id="nvadaPillarFront" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#eefdfa" />
            <stop offset="1" stopColor="#c7e4ef" />
          </linearGradient>
          <linearGradient id="nvadaPillarSide" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#c7d8ef" />
            <stop offset="1" stopColor="#9db7e1" />
          </linearGradient>
          <linearGradient id="nvadaFoundationGlow" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#48cae4" />
            <stop offset="0.5" stopColor="#b5ff48" />
            <stop offset="1" stopColor="#48cae4" />
          </linearGradient>
          <radialGradient id="nvadaPillarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#b5ff48" stopOpacity="0.26" />
            <stop offset="0.54" stopColor="#48cae4" stopOpacity="0.08" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1600" height="900" fill="#f6f5ef" />
        <g stroke="#cde0df" strokeWidth="1" opacity="0.42">
          {Array.from({ length: 13 }, (_, index) => (
            <path key={`nvada-pillars-grid-a-${index}`} d={`M ${-110 + index * 150} 820 L ${430 + index * 150} 510`} />
          ))}
          {Array.from({ length: 13 }, (_, index) => (
            <path key={`nvada-pillars-grid-b-${index}`} d={`M ${80 + index * 150} 510 L ${620 + index * 150} 820`} />
          ))}
        </g>
        <circle cx="800" cy="680" r="500" fill="url(#nvadaPillarGlow)" />

        <g opacity="0.46" transform="translate(800 560) scale(1.12) translate(-800 -560)">
          {Array.from({ length: 19 }, (_, index) => {
            const x = 135 + (index % 10) * 142 + (index > 9 ? 72 : 0);
            const y = 270 + Math.floor(index / 10) * 76;
            const height = 206;
            return (
              <g key={`nvada-rear-pillar-${index}`}>
                <path d={`M ${x} ${y} L ${x + 44} ${y - 24} L ${x + 88} ${y} L ${x + 44} ${y + 24} Z`} fill="#f9fffb" stroke="#0b2338" strokeOpacity="0.12" />
                <path d={`M ${x + 12} ${y + 10} L ${x + 44} ${y + 28} L ${x + 44} ${y + height} L ${x + 12} ${y + height - 18} Z`} fill="#d9eeee" />
                <path d={`M ${x + 44} ${y + 28} L ${x + 76} ${y + 10} L ${x + 76} ${y + height - 18} L ${x + 44} ${y + height} Z`} fill="#dbe8f7" />
              </g>
            );
          })}
        </g>

        <g opacity="0.82" transform="translate(800 690) scale(1.16) translate(-800 -690)">
          {[
            [236, 324, 412, 264, 384],
            [434, 522, 610, 462, 582],
            [632, 720, 808, 660, 780],
            [830, 918, 1006, 858, 978],
            [1028, 1116, 1204, 1056, 1176],
            [1226, 1314, 1402, 1254, 1374],
          ].map(([leftX, centerX, rightX, frontX, sideX]) => {
            const topY = 532;
            const peakY = 482;
            const bottomY = 582;
            const frontY = 564;

            return (
            <g key={`${centerX}-${topY}`}>
              <path d={`M ${leftX} ${topY} L ${centerX} ${peakY} L ${rightX} ${topY} L ${centerX} ${bottomY} Z`} fill="url(#nvadaPillarTop)" stroke="#0b2338" strokeOpacity="0.32" strokeWidth="2" />
              <path d={`M ${frontX} ${frontY} L ${centerX} ${frontY + 34} L ${centerX} 748 L ${frontX} 714 Z`} fill="url(#nvadaPillarFront)" stroke="#0b2338" strokeOpacity="0.22" />
              <path d={`M ${centerX} ${frontY + 34} L ${sideX} ${frontY} L ${sideX} 714 L ${centerX} 748 Z`} fill="url(#nvadaPillarSide)" stroke="#0b2338" strokeOpacity="0.18" />
            </g>
            );
          })}
        </g>
      </svg>

      <div className="relative z-10 mx-auto max-w-[900px] text-center md:absolute md:left-1/2 md:top-[5%] md:w-[900px] md:max-w-[82%] md:-translate-x-1/2">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#4b6b00]">GTM &amp; Deployment Strategy</p>
        <h2 className="text-4xl font-bold uppercase leading-none tracking-tight text-[#0b2338] md:text-5xl">25+ Billion-Dollar Industrial Pillars</h2>
        <p className="mx-auto mt-3 max-w-[920px] text-lg font-light leading-tight text-black/64">One base physics model. Many industrial problems. One compounding World Model.</p>
      </div>

      <div className="relative z-10 mt-72 grid gap-3 sm:grid-cols-2 md:absolute md:left-[14%] md:top-[63%] md:mt-0 md:w-[72%] md:grid-cols-4">
        {[
          ["Pharma / Biologics", "Batch → continuous flow", "Biologics manufacturing unlock"],
          ["Batteries", "Coating, drying, thermal risk", "EV battery yield unlock"],
          ["Chemicals", "Catalyst + reactor scale-up", "Capex risk reduction"],
          ["Industrial Materials", "Crystallization + morphology", "Specialty materials unlock"],
        ].map(([title, mechanism, unlock]) => (
          <div key={title} className="flex min-h-[124px] flex-col justify-between rounded-2xl border border-black/10 bg-white/68 px-3 py-4 text-center shadow-sm backdrop-blur-xl">
            <p className="min-h-[32px] text-sm font-bold uppercase leading-tight text-[#0b2338]">{title}</p>
            <p className="text-sm font-light leading-snug text-black/62">{mechanism}</p>
            <p className="min-h-[28px] text-sm font-bold leading-snug text-[#4b6b00]">{unlock}</p>
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto mt-6 max-w-[1000px] text-center md:absolute md:bottom-[5%] md:left-1/2 md:mt-0 md:w-[1000px] md:max-w-[86%] md:-translate-x-1/2">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#4b6b00]">and other potential pillars</p>
        <p className="mx-auto mt-2 max-w-[960px] text-lg font-semibold leading-snug text-[#0b2338]/72">Semiconductors, advanced manufacturing, metamaterials, tissue engineering, nuclear materials, hypersonic materials, industrial heat flow, LNP / mRNA stability, Carbon Capture, and smart manufacturing.</p>
      </div>
    </section>
  );
}

function WeekendSprintTimelineInfographic() {
  const milestones = [
    {
      date: "Nov 2025",
      items: [
        "Compute Secured: Project ‘Skanda’ (Physics Model Decomposition of Battery Processes) submitted to the IndiaAI Mission.",
        "Awarded 1M H100 GPU hours via the IndiaAI Mission..",
      ],
    },
    {
      date: "Feb 2026",
      items: [
        "First Generative Physics Model: Published validated battery micro-structure diffusion model (~70% zero-shot accuracy).",
        "NVIDIA Synergy: Training successfully scaled utilizing NVIDIA NeMo..",
      ],
    },
    {
      date: "May 2026",
      items: [
        "Core Architecture Breakthroughs: JAX Engines Live – Benchmarked 1-Billion voxel multi-physics at 1.6 GLUPS.",
        "shodh-moe Convergence – Achieved 100% unsupervised routing between conflicting physics domains (Fluids vs. Batteries)..",
      ],
    },
    {
      date: "May 2026",
      items: [
        "Commercial NREs & ‘The Ask’: Tier-1 contracts signed across EV Batteries, Biologics, and Aerospace.",
        "The Ask: NVIDIA co-development support (Triton, PhysicsNeMo, Omniverse) to scale these enterprise pipelines natively..",
      ],
    },
    {
      date: "June 2026 (Target)",
      items: [
        "Target Ecosystem Integration: First Universal Physical Compiler streaming live 3D physics directly into NVIDIA Omniverse..",
      ],
    },
  ];

  return (
    <section className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[1.4rem] border border-black/10 bg-[#f6f5ef] p-5 shadow-[0_30px_90px_rgba(8,20,33,0.22)] sm:p-6 md:rounded-[2rem] md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(181,255,72,0.16),transparent_26%),radial-gradient(circle_at_82%_66%,rgba(72,202,228,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(232,244,245,0.96))]" />

      <div className="relative z-10 mx-auto max-w-[1040px] text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#4b6b00]">Execution Timeline</p>
        <h2 className="mx-auto max-w-[900px] text-4xl font-bold uppercase leading-none tracking-tight text-[#0b2338] md:text-5xl">Current Status &amp; Momentum (The Timeline)</h2>
      </div>

      <div className="relative z-10 mx-auto mt-10 max-w-[1200px] overflow-hidden rounded-2xl border border-[#0b2338]/10 bg-white/72 shadow-[0_22px_70px_rgba(8,20,33,0.12)] backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#0b2338]/10 bg-[#f6f5ef]/50">
                <th className="w-[170px] px-6 py-4 text-left text-xs font-black uppercase tracking-tight text-[#0b2338]">Date</th>
                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-tight text-[#0b2338]">Milestone</th>
              </tr>
            </thead>
            <tbody>
              {milestones.map((milestone, index) => (
                <tr key={milestone.date} className={index % 2 === 0 ? "bg-white/40" : "bg-[#e8f7f8]/42"}>
                  <td className="px-6 py-5 align-middle text-sm font-black text-[#0b2338]">{milestone.date}</td>
                  <td className="px-6 py-5 text-sm font-semibold leading-relaxed text-[#0b2338]">
                    <ul className="list-disc space-y-2 pl-5">
                      {milestone.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function TractionInfographic() {
  return (
    <section className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[1.4rem] border border-black/10 bg-[#f6f5ef] p-5 shadow-[0_30px_90px_rgba(8,20,33,0.22)] sm:p-6 md:aspect-[16/9] md:min-h-0 md:rounded-[2rem] md:p-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_34%,rgba(72,202,228,0.16),transparent_28%),radial-gradient(circle_at_78%_68%,rgba(181,255,72,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(232,244,245,0.96))]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Traction and compounding flywheel infographic">
        <defs>
          <linearGradient id="nvadaTractionBridge" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#48cae4" />
            <stop offset="0.5" stopColor="#b5ff48" />
            <stop offset="1" stopColor="#48cae4" />
          </linearGradient>
          <radialGradient id="nvadaTractionGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#b5ff48" stopOpacity="0.26" />
            <stop offset="0.58" stopColor="#48cae4" stopOpacity="0.08" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="#f6f5ef" />
        <g stroke="#cde0df" strokeWidth="1" opacity="0.42">
          {Array.from({ length: 14 }, (_, index) => (
            <path key={`nvada-traction-grid-a-${index}`} d={`M ${-140 + index * 140} 820 L ${420 + index * 140} 500`} />
          ))}
          {Array.from({ length: 14 }, (_, index) => (
            <path key={`nvada-traction-grid-b-${index}`} d={`M ${60 + index * 140} 500 L ${620 + index * 140} 820`} />
          ))}
        </g>
        <circle cx="800" cy="560" r="430" fill="url(#nvadaTractionGlow)" />
        <path d="M 235 615 C 390 465 540 455 700 565 C 860 675 1015 662 1190 505 C 1250 452 1318 420 1390 410" fill="none" stroke="url(#nvadaTractionBridge)" strokeWidth="18" strokeLinecap="round" opacity="0.28" />
        <path d="M 235 615 C 390 465 540 455 700 565 C 860 675 1015 662 1190 505 C 1250 452 1318 420 1390 410" fill="none" stroke="#0b2338" strokeWidth="2" strokeDasharray="12 16" strokeLinecap="round" opacity="0.28" />
        {[260, 515, 800, 1085, 1340].map((cx, index) => (
          <g key={cx} opacity={0.65}>
            <path d={`M ${cx - 72} ${650 - (index % 2) * 60} L ${cx} ${610 - (index % 2) * 60} L ${cx + 72} ${650 - (index % 2) * 60} L ${cx} ${690 - (index % 2) * 60} Z`} fill="#ffffff" stroke="#0b2338" strokeOpacity="0.18" strokeWidth="2" />
            <path d={`M ${cx - 46} ${668 - (index % 2) * 60} L ${cx} ${694 - (index % 2) * 60} L ${cx} 790 L ${cx - 46} 764 Z`} fill="#d9eeee" opacity="0.72" />
            <path d={`M ${cx} ${694 - (index % 2) * 60} L ${cx + 46} ${668 - (index % 2) * 60} L ${cx + 46} 764 L ${cx} 790 Z`} fill="#dbe8f7" opacity="0.76" />
          </g>
        ))}
      </svg>

      <div className="relative z-10 mx-auto max-w-[940px] text-center md:absolute md:left-1/2 md:top-[6%] md:w-[940px] md:max-w-[84%] md:-translate-x-1/2">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#4b6b00]">Traction</p>
        <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-[#0b2338] md:text-5xl">Industrial design partners across four pillars</h2>
        <p className="mx-auto mt-4 max-w-[780px] text-lg font-semibold leading-tight text-black/64">Partners are bringing proprietary production data and high-value manufacturing problems to ground the World Model in real factory physics.</p>
      </div>

      <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2 md:absolute md:left-[6%] md:top-[34%] md:mt-0 md:w-[88%] md:grid-cols-4">
        {partners.map(([pillar, name, text], index) => (
          <div key={name} className="min-h-[220px] rounded-3xl border border-[#0b2338]/10 bg-white/68 p-5 shadow-[0_22px_70px_rgba(11,35,56,0.1)] backdrop-blur-xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#4b6b00]">{String(index + 1).padStart(2, "0")} / {pillar}</p>
            <h3 className="mt-3 text-lg font-black uppercase leading-none tracking-tight text-[#0b2338] lg:text-xl">{name}</h3>
            <p className="mt-4 text-sm font-semibold leading-tight text-black/62">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function InsiderNvidiaAPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f6f5ef] text-[#0b2338] selection:bg-[#48cae4] selection:text-[#081421]">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#0b2338]/10 bg-[#f6f5ef]/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-10">
          <div className="flex items-center gap-3">
            <Image src="/shodhai_logo.svg" alt="Shodh AI" width={132} height={30} className="h-4 w-auto [filter:brightness(0)_saturate(100%)_invert(10%)_sepia(22%)_saturate(1393%)_hue-rotate(169deg)_brightness(94%)_contrast(98%)]" priority />
          </div>
          <p className="hidden text-xs font-bold uppercase tracking-[0.24em] text-[#0b2338]/45 sm:block">Insider · NVIDIA</p>
        </div>
      </header>

      <main id="html-scroll-container" className="pointer-events-none relative z-[2] w-full">
        {/* ── HERO ── */}
        <section className="flex min-h-screen items-center px-4 pb-20 pt-32 sm:px-6 md:px-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <motion.div variants={staggerContainer} className="pointer-events-auto lg:col-span-8">
              <motion.div variants={fadeInUp} className="mb-7 flex flex-wrap gap-3">
                <span className="rounded-full border border-[#0b2338]/10 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0b2338]/70 backdrop-blur-md">Confidential</span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-[2.65rem] font-black uppercase leading-[1.02] tracking-tight text-[#0b2338] sm:text-7xl md:text-8xl lg:text-9xl">
                World Model<span className="hidden sm:inline"> for</span>
                <br />
                <span className="bg-gradient-to-r from-[#0b2338] via-[#48cae4] to-[#4b6b00] bg-clip-text text-transparent">
                  <span className="sm:hidden">for Physical<br /></span>
                  <span className="hidden sm:inline">Physical </span>
                  Invention
                </span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="mt-7 max-w-4xl text-xl font-semibold leading-relaxed text-black/68 md:text-3xl">
                A frontier AI model that turns discoveries into manufacturable products
              </motion.p>
            </motion.div>
            <div className="pointer-events-auto relative z-10 min-h-[320px] lg:col-span-4" />
          </motion.div>
        </section>

        {/* ── SLIDE 1: SHODH WORLD MODEL ARCHITECTURE ──} */}
        <section className="pointer-events-auto px-4 pb-24 pt-4 sm:px-6 md:px-10 md:pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={staggerContainer}
            className="mx-auto max-w-[1540px] rounded-[2.4rem] border border-[#0b2338]/10 bg-white/68 p-3 shadow-[0_40px_120px_rgba(8,20,33,0.14)] backdrop-blur-xl sm:p-5 md:p-7"
          >
            <motion.div variants={scaleIn}>
              <ShodhWorldModelArchitectureInfographic />
            </motion.div>
          </motion.div>
        </section>

        {/* ── SLIDE 2: NVIDIA IMAGE ── */}
        <section className="pointer-events-auto px-4 pb-24 pt-4 sm:px-6 md:px-10 md:pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={staggerContainer}
            className="mx-auto max-w-[1540px] rounded-[2.4rem] border border-[#0b2338]/10 bg-white/68 p-3 shadow-[0_40px_120px_rgba(8,20,33,0.14)] backdrop-blur-xl sm:p-5 md:p-7"
          >
            <motion.div variants={scaleIn} className="flex items-center justify-center">
              <img src="/nvdia.svg" alt="NVIDIA" className="h-auto w-full max-w-[1200px] object-contain" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── SLIDE 3: TIMELINE ──} */}
        <section className="pointer-events-auto px-4 pb-24 pt-4 sm:px-6 md:px-10 md:pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={staggerContainer}
            className="mx-auto max-w-[1540px] rounded-[2.4rem] border border-[#0b2338]/10 bg-white/68 p-3 shadow-[0_40px_120px_rgba(8,20,33,0.14)] backdrop-blur-xl sm:p-5 md:p-7"
          >
            <motion.div variants={scaleIn}>
              <WeekendSprintTimelineInfographic />
            </motion.div>
          </motion.div>
        </section>

        {/* ── SLIDE 3: MERMAID REFERENCE ARCHITECTURE ──} */}
        <section className="pointer-events-auto px-4 pb-24 pt-4 sm:px-6 md:px-10 md:pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={staggerContainer}
            className="mx-auto max-w-[1540px] rounded-[2.4rem] border border-[#0b2338]/10 bg-white/68 p-3 shadow-[0_40px_120px_rgba(8,20,33,0.14)] backdrop-blur-xl sm:p-5 md:p-7"
          >
            <motion.div variants={scaleIn}>
              <MermaidReferenceArchitectureInfographic />
            </motion.div>
          </motion.div>
        </section>

        {/* ── SLIDE 4: EV BATTERY SCALE-UP ── */}
        <section className="pointer-events-auto px-4 pb-24 pt-4 sm:px-6 md:px-10 md:pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={staggerContainer}
            className="mx-auto max-w-[1540px] rounded-[2.4rem] border border-[#0b2338]/10 bg-white/68 p-3 shadow-[0_40px_120px_rgba(8,20,33,0.14)] backdrop-blur-xl sm:p-5 md:p-7"
          >
            <motion.div variants={scaleIn}>
              <EVBatteryScaleUpInfographic />
            </motion.div>
          </motion.div>
        </section>

        {/* ── APPENDIX ──} */}
        <section className="pointer-events-auto px-4 pb-24 pt-8 sm:px-6 md:px-10 md:pb-32">
          <div className="mx-auto max-w-[1040px] text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#4b6b00]">Appendix</p>
            <h2 className="mt-3 text-3xl font-bold uppercase leading-none tracking-tight text-[#0b2338] md:text-4xl">Additional Details</h2>
          </div>
        </section>

        {/* ── APPENDIX SLIDE 1: PRODUCTION VALLEY ── */}
        <section className="pointer-events-auto px-4 pb-24 pt-4 sm:px-6 md:px-10 md:pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={staggerContainer}
            className="mx-auto max-w-[1540px] rounded-[2.4rem] border border-[#0b2338]/10 bg-white/68 p-3 shadow-[0_40px_120px_rgba(8,20,33,0.14)] backdrop-blur-xl sm:p-5 md:p-7"
          >
            <motion.div variants={scaleIn}>
              <ProductionValleyInfographic />
            </motion.div>
          </motion.div>
        </section>

        {/* ── APPENDIX SLIDE 2: GENERATIVE PHYSICAL IP ── */}
        <section className="pointer-events-auto px-4 pb-24 pt-4 sm:px-6 md:px-10 md:pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={staggerContainer}
            className="mx-auto max-w-[1540px] rounded-[2.4rem] border border-[#0b2338]/10 bg-white/68 p-3 shadow-[0_40px_120px_rgba(8,20,33,0.14)] backdrop-blur-xl sm:p-5 md:p-7"
          >
            <motion.div variants={scaleIn}>
              <LightSlideShell eyebrow="The End Game" title="Generative Physical IP" tone="cyan">
                <motion.div variants={fadeInUp} className="rounded-2xl border border-[#0b2338]/10 bg-white/75 p-6 shadow-lg backdrop-blur-xl md:p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#48cae4]">The New Interface for Invention</p>
                  <p className="mt-4 text-gray-700">A user asks the World Model:</p>
                  <p className="mt-3 rounded-2xl border border-[#0b2338]/10 bg-[#f6f5ef]/80 p-5 text-xl font-light italic leading-relaxed text-[#0b2338] md:text-3xl">"Design a fusion-reactor material optimized for extreme heat flux, radiation tolerance, long operating life, and scalable manufacturing."</p>
                  <p className="mt-6 text-gray-700">The World Model returns a production-ready blueprint:</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {generatedOutputs.map((output) => (
                      <div key={output} className="rounded-xl border border-[#48cae4]/15 bg-[#48cae4]/10 px-4 py-3 text-gray-700">{output}</div>
                    ))}
                  </div>
                </motion.div>
              </LightSlideShell>
            </motion.div>
          </motion.div>
        </section>

        <footer className="pointer-events-auto relative w-full overflow-hidden border-t border-[#0b2338]/10 bg-[#f6f5ef]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(72,202,228,0.14),transparent_26%),radial-gradient(circle_at_82%_72%,rgba(181,255,72,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.58),rgba(246,245,239,0.96))]" />
          <div className="relative z-10 px-4 pb-8 pt-12 sm:px-6 sm:pt-16 md:px-10 md:pt-20">
            <div className="mb-10 overflow-hidden">
              <h1 className="w-full select-none whitespace-nowrap text-[clamp(4.5rem,22vw,24rem)] font-normal leading-[0.9] text-[#0b2338]">
                Shodh AI
              </h1>
            </div>
            <div className="pb-2 text-xs font-bold uppercase tracking-wider text-[#0b2338]/70">
              2026 Shodh AI. All rights reserved
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
