"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ────────────────────────────────
   Types
   ──────────────────────────────── */
type SlideLayout =
  | "title"
  | "statement"
  | "process"
  | "features"
  | "case-study"
  | "comparison"
  | "grid"
  | "list"
  | "stats"
  | "timeline"
  | "close";

type Bullet = { bold: string; text?: string };

type SlideData = {
  id: number;
  layout: SlideLayout;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  bullets?: Bullet[];
  items?: { label: string; desc: string; highlight?: boolean }[];
  cols?: { title: string; items: string[]; highlight?: boolean }[];
  stats?: { label: string; value: string; sub?: string }[];
  timeline?: { phase: string; text: string }[];
  meta?: { status?: string; problem?: string; output?: string; result?: string };
  bigStat?: { before: string; after: string; label: string }[];
  footer?: string;
};

/* ────────────────────────────────
   Content
   ──────────────────────────────── */
const slides: SlideData[] = [
  {
    id: 1,
    layout: "title",
    title: "Shodh AI",
    subtitle: "Physics AI for Discovery-to-Manufacturing",
    bullets: [
      { bold: "Discover faster." },
      { bold: "Validate earlier." },
      { bold: "Manufacture profitably." },
    ],
  },
  {
    id: 2,
    layout: "statement",
    eyebrow: "The Problem",
    title: "Physical innovation breaks between lab and factory",
    subtitle:
      "New molecules, materials, and processes fail because teams cannot answer fast enough:",
    bullets: [
      { bold: "Will it work?" },
      { bold: "Can we synthesize it?" },
      { bold: "Can we scale it?" },
      { bold: "Can we manufacture it profitably?" },
    ],
    footer: "Shodh reduces the trial-and-error behind those questions.",
  },
  {
    id: 3,
    layout: "process",
    eyebrow: "Trust First",
    title: "We prove it on your past before touching your future",
    subtitle: "Every pilot starts with blind validation.",
    items: [
      {
        label: "You give us historical runs with hidden outcomes.",
        desc: "",
      },
      {
        label: "Shodh predicts failures, bottlenecks, and better process windows.",
        desc: "",
      },
      {
        label: "You compare predictions against reality.",
        desc: "",
      },
    ],
    footer:
      "If Shodh cannot predict the past, we do not ask you to trust it with the future.",
  },
  {
    id: 4,
    layout: "features",
    eyebrow: "What Shodh Is",
    title: "Physics models + factory data + inverse design",
    subtitle: "Shodh combines:",
    bullets: [
      { bold: "physics simulators" },
      { bold: "neural operators" },
      { bold: "multiphysics expert routing" },
      { bold: "inverse design" },
      { bold: "factory-specific adapters" },
    ],
    footer: "to generate new candidates, recipes, process windows, CAD / SDF geometries, and patentable IP.",
  },
  {
    id: 5,
    layout: "case-study",
    eyebrow: "One Worked Example",
    title: "How Shodh found the hidden failure mode",
    meta: {
      status: "Validated Proof Point",
      problem:
        "Anonymized specialty-chemical reactor data: geometry, feed rate, temperature history, impurity data, and yield.",
      output:
        "Shodh identified a high-residence-time thermal zone causing secondary impurity formation.",
      result:
        "Change feed angle, feed rate, RPM curve, jacket temperature profile, and static insert geometry.",
    },
    bigStat: [
      { before: "84–85%", after: "98–99%", label: "Yield" },
      { before: "4–5%", after: "<0.1%", label: "Impurity" },
    ],
    footer:
      "Yield prediction error was <1 percentage point. Shodh identifies the physical failure mode and generates a better operating policy.",
  },
  {
    id: 6,
    layout: "list",
    eyebrow: "What Shodh Is Not",
    title: "We do not replace your lab or plant",
    subtitle: "Shodh does not remove physical validation.",
    bullets: [
      { bold: "where to look" },
      { bold: "what to test" },
      { bold: "which process windows to try" },
      {
        bold: "which candidates are most likely to survive scale-up",
      },
    ],
    footer: "The goal is fewer experiments before confidence is high.",
  },
  {
    id: 7,
    layout: "comparison",
    eyebrow: "Why We Are Different",
    title: "Others solve pieces. Shodh connects discovery to manufacturing.",
    cols: [
      {
        title: "Drug discovery AI",
        items: [
          "Finds molecules, but often stops before synthesis, CMC, and scale-up.",
        ],
      },
      {
        title: "Materials AI",
        items: [
          "Finds candidates, but often stops before pilot-line manufacturability.",
        ],
      },
      {
        title: "Digital twins",
        items: [
          "Optimize known equipment, but rarely invent new products, recipes, or geometries.",
        ],
      },
      {
        title: "Shodh",
        items: [
          "Connects candidate, process, validation, manufacturing, and ROI.",
        ],
        highlight: true,
      },
    ],
  },
  {
    id: 8,
    layout: "list",
    eyebrow: "Ideal Customer",
    title: "Where Shodh creates the most value",
    subtitle: "Shodh is best for companies with:",
    bullets: [
      { bold: "$50M+ annual R&D or manufacturing spend" },
      { bold: "expensive physical experiments" },
      { bold: "scale-up or pilot-line bottlenecks" },
      { bold: "high-value molecules, materials, or processes" },
      {
        bold: "clear ROI from speed, yield, scrap, CapEx, or IP",
      },
    ],
    footer:
      "Initial focus: pharma / CDMO, specialty chemicals, battery manufacturing, automotive materials and thermal systems.",
  },
  {
    id: 9,
    layout: "grid",
    eyebrow: "ROI by Segment",
    title: "Different industries. Different ROI levers.",
    items: [
      {
        label: "Pharma / CDMO",
        desc: "Target: 30–60% fewer route or process-development experiments. Value: faster CMC, better synthesis route, lower CapEx, more CDMO throughput.",
      },
      {
        label: "Specialty chemicals",
        desc: "Target: 10–30% yield or COGS improvement. Value: lower impurities, safer process windows, faster scale-up.",
      },
      {
        label: "Batteries",
        desc: "Target: 15–30% scrap reduction and 20–50% faster wetting / formation optimization. Value: fewer failed pilot builds, better units-per-hour, faster line qualification.",
      },
      {
        label: "Automotive / materials",
        desc: "Target: 20–40% fewer validation iterations. Value: faster qualification, lower test cost, stronger material / thermal IP.",
      },
    ],
  },
  {
    id: 10,
    layout: "stats",
    eyebrow: "Validated Proof: Specialty Chemicals",
    title: "More yield from the same plant",
    meta: { status: "validated, anonymized industrial proof point" },
    stats: [
      { label: "Yield", value: "84–85% → 98–99%" },
      { label: "Impurities", value: "4–5% → <0.1%" },
      { label: "Thermal variance", value: "18.4°C² → 3.1°C²" },
      { label: "COGS bridge", value: "32% lower" },
      { label: "Prediction error", value: "<1 percentage point" },
    ],
    footer: "More product, less waste, safer process scale-up.",
  },
  {
    id: 11,
    layout: "stats",
    eyebrow: "Validated Proof: CDMO Process Invention",
    title: "From batch process to flow hardware",
    meta: { status: "validated, anonymized process-invention proof point" },
    stats: [
      { label: "Residence time", value: "18 hours → 14 minutes" },
      { label: "Pressure drop", value: "1.6 bar" },
      { label: "Gas-liquid interface", value: "4.1× baseline" },
      { label: "Purity / ee target", value: "99.1%" },
      { label: "CapEx avoided", value: "~$15–18M" },
    ],
    footer: "New process hardware, not just a better recipe.",
  },
  {
    id: 12,
    layout: "stats",
    eyebrow: "Validated Proof: Biologics Scale-Up",
    title: "Fewer failed biologics scale-up runs",
    meta: { status: "validated / anonymized biologics scale-up proof point" },
    stats: [
      { label: "Pilot batches", value: "16 → 3" },
      { label: "R&D cost", value: "$8.0M → $1.5M" },
      { label: "Titer / productivity", value: "+21%" },
      { label: "Time saved", value: "16 months" },
    ],
    footer: "Fewer failed scale-up runs and faster biologics development.",
  },
  {
    id: 13,
    layout: "stats",
    eyebrow: "Validated Proof: De Novo Formulation",
    title: "From million-candidate search to 12 experiments",
    meta: { status: "university lab + model validation proof point" },
    stats: [
      { label: "Candidate search", value: "1.2M → 12 recommended" },
      { label: "Wet-lab experiments", value: "240 → 18" },
      { label: "Discovery time", value: "18 months → 6 weeks" },
      {
        label: "Predicted vs. lab viscosity",
        value: "R² = 0.998",
      },
      { label: "IP output", value: "2 formulation disclosures" },
    ],
    footer: "New product discovery with far fewer experiments.",
  },
  {
    id: 14,
    layout: "grid",
    eyebrow: "Battery Pilot Example",
    title: "Manufacturability before pilot-line spend",
    meta: {
      status:
        "proposed battery pilot based on validated cross-industry physics",
    },
    items: [
      {
        label: "Scrap",
        desc: "19.7% → 8.7%",
      },
      {
        label: "Formation time",
        desc: "72h → 31h",
      },
      {
        label: "Projected value",
        desc: "$4.97M / year on one line",
      },
      {
        label: "IP output",
        desc: "1–2 process or structure disclosures",
      },
    ],
    footer:
      "Factory adapter + process windows + manufacturing IP tracks.",
  },
  {
    id: 15,
    layout: "timeline",
    eyebrow: "Pilot Offer",
    title: "90 days to prove value",
    timeline: [
      {
        phase: "Month 1",
        text: "Blind validation — Predict hidden outcomes from historical data.",
      },
      {
        phase: "Month 2",
        text: "Inverse design — Generate candidates, recipes, process windows, or geometries.",
      },
      {
        phase: "Month 3",
        text: "Controlled validation — Run limited experiments and calculate ROI.",
      },
    ],
    stats: [
      { label: "Pilot price", value: "$250K–$750K" },
      { label: "Success metric", value: "agreed before kickoff" },
      {
        label: "If we miss",
        value: "stop or extend validation at no additional platform fee",
      },
    ],
  },
  {
    id: 16,
    layout: "grid",
    eyebrow: "Commercial Path",
    title: "Start small. Expand after proof.",
    items: [
      {
        label: "90-day paid pilot",
        desc: "$250K–$750K",
      },
      {
        label: "Enterprise license",
        desc: "$1M–$5M / year after validation",
      },
      {
        label: "AI-for-hire program",
        desc: "$500K–$3M for discovery, process invention, or scale-up",
      },
      {
        label: "IP co-creation",
        desc: "upfront + milestones + royalty or gain-share",
      },
    ],
  },
  {
    id: 17,
    layout: "list",
    eyebrow: "What We Need",
    title: "Minimal data required",
    items: [
      {
        label: "Discovery pilot",
        desc: "target properties, constraints, historical hits / failures, validation budget",
      },
      {
        label: "Manufacturing pilot",
        desc: "10–30 historical batches, process telemetry, equipment geometry, QC outcomes, defect labels",
      },
      {
        label: "Security options",
        desc: "obfuscated chemistry names, normalized telemetry, secure deployment, clear IP boundaries",
      },
    ],
  },
  {
    id: 18,
    layout: "close",
    title: "Discovery is the start. Manufacturing is the proof.",
    subtitle:
      "Shodh helps companies move from idea → candidate → process → validation → manufacturing → IP with fewer experiments, lower cost, faster scale-up, and more proprietary advantage.",
    bullets: [{ bold: "Shodh turns physics into products." }],
  },
];

/* ────────────────────────────────
   Animation variants
   ──────────────────────────────── */
const easeBezier: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeBezier },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.4, ease: easeBezier },
  }),
};

/* ────────────────────────────────
   Helpers
   ──────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-block rounded-full border border-[#48cae4]/30 bg-[#48cae4]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#48cae4] backdrop-blur-md">
      {children}
    </span>
  );
}

function SlideNumber({ n }: { n: number }) {
  return (
    <span className="absolute right-6 top-6 text-xs font-bold tabular-nums tracking-widest text-white/20 md:right-10 md:top-10">
      {String(n).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
    </span>
  );
}

/* ────────────────────────────────
   Layout renderers
   ──────────────────────────────── */
function TitleSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Eyebrow>Sales Deck</Eyebrow>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-6xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-8xl md:text-9xl"
      >
        {slide.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-6 max-w-2xl text-xl font-medium uppercase tracking-wide text-white/60 sm:text-2xl md:text-3xl"
      >
        {slide.subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex flex-wrap justify-center gap-4"
      >
        {slide.bullets?.map((b, i) => (
          <span
            key={i}
            className="rounded-full border border-[#b5ff48]/25 bg-[#b5ff48]/10 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-[#b5ff48]"
          >
            {b.bold}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function StatementSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow>{slide.eyebrow}</Eyebrow>
      <h2 className="max-w-5xl text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
        {slide.title}
      </h2>
      {slide.subtitle && (
        <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-white/60 md:text-xl">
          {slide.subtitle}
        </p>
      )}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {slide.bullets?.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            <p className="text-xl font-black uppercase leading-tight text-white sm:text-2xl">
              {b.bold}
            </p>
            {b.text && (
              <p className="mt-2 text-sm text-white/50">{b.text}</p>
            )}
          </motion.div>
        ))}
      </div>
      {slide.footer && (
        <p className="mt-8 text-sm font-medium uppercase tracking-wide text-[#48cae4]">
          {slide.footer}
        </p>
      )}
    </div>
  );
}

function ProcessSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow>{slide.eyebrow}</Eyebrow>
      <h2 className="max-w-5xl text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
        {slide.title}
      </h2>
      {slide.subtitle && (
        <p className="mt-4 text-lg font-medium text-white/50">
          {slide.subtitle}
        </p>
      )}
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {slide.items?.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <span className="absolute -top-3 left-6 rounded-full bg-[#48cae4] px-3 py-1 text-xs font-black text-[#081421]">
              0{i + 1}
            </span>
            <p className="mt-2 text-lg font-bold uppercase leading-snug text-white">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
      {slide.footer && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 max-w-3xl text-base font-medium italic leading-relaxed text-[#b5ff48]"
        >
          {slide.footer}
        </motion.p>
      )}
    </div>
  );
}

function FeaturesSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow>{slide.eyebrow}</Eyebrow>
      <h2 className="max-w-5xl text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
        {slide.title}
      </h2>
      {slide.subtitle && (
        <p className="mt-4 text-lg font-medium text-white/50">
          {slide.subtitle}
        </p>
      )}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {slide.bullets?.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + i * 0.07 }}
            className="flex items-center gap-3 rounded-xl border border-[#48cae4]/20 bg-[#48cae4]/5 px-5 py-4"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#48cae4] shadow-[0_0_8px_#48cae4]" />
            <span className="text-sm font-bold uppercase tracking-wide text-[#48cae4]">
              {b.bold}
            </span>
          </motion.div>
        ))}
      </div>
      {slide.footer && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 max-w-4xl text-lg font-medium leading-relaxed text-white/70"
        >
          {slide.footer}
        </motion.p>
      )}
    </div>
  );
}

function CaseStudySlide({ slide }: { slide: SlideData }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow>{slide.eyebrow}</Eyebrow>
      <h2 className="max-w-4xl text-3xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
        {slide.title}
      </h2>
      {slide.meta?.problem && (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-xl border-l-4 border-[#48cae4] bg-white/[0.03] p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#48cae4]">
                Input
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {slide.meta.problem}
              </p>
            </div>
            <div className="rounded-xl border-l-4 border-[#b5ff48] bg-white/[0.03] p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#b5ff48]">
                Model Prediction
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {slide.meta.output}
              </p>
            </div>
            <div className="rounded-xl border-l-4 border-white/30 bg-white/[0.03] p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Generated Recommendation
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {slide.meta.result}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {slide.bigStat?.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                  {s.label}
                </p>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-white/40 line-through">
                    {s.before}
                  </span>
                  <span className="text-4xl font-black text-[#b5ff48] md:text-5xl">
                    {s.after}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      {slide.footer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 rounded-xl border border-[#b5ff48]/20 bg-[#b5ff48]/5 p-4"
        >
          <p className="text-sm font-medium text-[#b5ff48]">{slide.footer}</p>
        </motion.div>
      )}
    </div>
  );
}

function ComparisonSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow>{slide.eyebrow}</Eyebrow>
      <h2 className="max-w-5xl text-3xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
        {slide.title}
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {slide.cols?.map((col, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.1 }}
            className={`rounded-2xl border p-6 ${
              col.highlight
                ? "border-[#b5ff48]/30 bg-[#b5ff48]/10"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <p
              className={`text-xs font-bold uppercase tracking-widest ${
                col.highlight ? "text-[#b5ff48]" : "text-white/40"
              }`}
            >
              {col.title}
            </p>
            <p
              className={`mt-4 text-sm leading-relaxed ${
                col.highlight ? "text-white/90" : "text-white/60"
              }`}
            >
              {col.items[0]}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GridSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="flex h-full flex-col justify-center">
      {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
      <h2 className="max-w-5xl text-3xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
        {slide.title}
      </h2>
      {slide.meta?.status && (
        <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/30">
          Status: {slide.meta.status}
        </p>
      )}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {slide.items?.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-[#48cae4]">
              {item.label}
            </p>
            <p className="mt-2 text-base font-medium leading-relaxed text-white/70">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
      {slide.footer && (
        <p className="mt-6 text-sm font-medium text-white/50">
          {slide.footer}
        </p>
      )}
    </div>
  );
}

function ListSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="flex h-full flex-col justify-center">
      {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}
      <h2 className="max-w-5xl text-3xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
        {slide.title}
      </h2>
      {slide.subtitle && (
        <p className="mt-4 text-lg font-medium text-white/50">
          {slide.subtitle}
        </p>
      )}
      <div className="mt-8 space-y-3">
        {slide.bullets?.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.07 }}
            className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-4"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#48cae4]" />
            <p className="text-base font-bold uppercase tracking-wide text-white">
              {b.bold}
            </p>
          </motion.div>
        ))}
        {slide.items?.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.07 }}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-[#48cae4]">
              {item.label}
            </p>
            <p className="mt-1 text-base leading-relaxed text-white/60">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
      {slide.footer && (
        <p className="mt-6 text-sm font-medium text-white/50">
          {slide.footer}
        </p>
      )}
    </div>
  );
}

function StatsSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow>{slide.eyebrow}</Eyebrow>
      <h2 className="max-w-4xl text-3xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
        {slide.title}
      </h2>
      {slide.meta?.status && (
        <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/30">
          Status: {slide.meta.status}
        </p>
      )}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {slide.stats?.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.07 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-white/40">
              {s.label}
            </p>
            <p className="mt-3 text-2xl font-black text-[#b5ff48] sm:text-3xl">
              {s.value}
            </p>
            {s.sub && (
              <p className="mt-1 text-xs text-white/40">{s.sub}</p>
            )}
          </motion.div>
        ))}
      </div>
      {slide.footer && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-sm font-medium text-[#48cae4]"
        >
          {slide.footer}
        </motion.p>
      )}
    </div>
  );
}

function TimelineSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow>{slide.eyebrow}</Eyebrow>
      <h2 className="max-w-4xl text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
        {slide.title}
      </h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {slide.timeline?.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.1 }}
            className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <span className="absolute -top-3 left-6 rounded-full bg-[#48cae4] px-3 py-1 text-xs font-black text-[#081421]">
              {t.phase}
            </span>
            <p className="mt-3 text-base leading-relaxed text-white/70">
              {t.text}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {slide.stats?.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.07 }}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
              {s.label}
            </p>
            <p className="mt-1 text-sm font-bold text-[#b5ff48]">{s.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CloseSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="max-w-4xl text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {slide.title}
      </motion.h2>
      {slide.subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 max-w-3xl text-lg font-medium leading-relaxed text-white/60 md:text-xl"
        >
          {slide.subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        {slide.bullets?.map((b, i) => (
          <span
            key={i}
            className="inline-block rounded-full border border-[#b5ff48]/30 bg-[#b5ff48]/10 px-6 py-3 text-lg font-black uppercase tracking-wide text-[#b5ff48]"
          >
            {b.bold}
          </span>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-16 flex flex-wrap justify-center gap-3 text-xs font-bold uppercase tracking-widest text-white/20"
      >
        <span>idea</span>
        <span className="text-white/10">→</span>
        <span>candidate</span>
        <span className="text-white/10">→</span>
        <span>process</span>
        <span className="text-white/10">→</span>
        <span>validation</span>
        <span className="text-white/10">→</span>
        <span>manufacturing</span>
        <span className="text-white/10">→</span>
        <span>ip</span>
      </motion.div>
    </div>
  );
}

function SlideRenderer({ slide }: { slide: SlideData }) {
  switch (slide.layout) {
    case "title":
      return <TitleSlide slide={slide} />;
    case "statement":
      return <StatementSlide slide={slide} />;
    case "process":
      return <ProcessSlide slide={slide} />;
    case "features":
      return <FeaturesSlide slide={slide} />;
    case "case-study":
      return <CaseStudySlide slide={slide} />;
    case "comparison":
      return <ComparisonSlide slide={slide} />;
    case "grid":
      return <GridSlide slide={slide} />;
    case "list":
      return <ListSlide slide={slide} />;
    case "stats":
      return <StatsSlide slide={slide} />;
    case "timeline":
      return <TimelineSlide slide={slide} />;
    case "close":
      return <CloseSlide slide={slide} />;
    default:
      return null;
  }
}

/* ────────────────────────────────
   Main component
   ──────────────────────────────── */
export default function SlideDeck() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= slides.length) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter")
        next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Home") goTo(0);
      if (e.key === "End") goTo(slides.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 30) next();
      if (e.deltaY < -30) prev();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  let touchStartY = 0;
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].screenY;
      if (touchStartY - endY > 50) next();
      if (endY - touchStartY > 50) prev();
    };
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev]);

  const slide = slides[current];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#081421] text-white selection:bg-[#48cae4] selection:text-[#081421]">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] -top-[10%] h-[50%] w-[50%] rounded-full bg-[#48cae4]/[0.04] blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[50%] w-[50%] rounded-full bg-[#b5ff48]/[0.03] blur-[120px]" />
      </div>

      {/* Slide content */}
      <div className="relative z-10 mx-auto h-full max-w-6xl px-6 pb-24 pt-12 md:px-12 md:pb-28 md:pt-16">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="h-full"
          >
            <SlideNumber n={current + 1} />
            <SlideRenderer slide={slide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-[#081421]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12">
          {/* Prev */}
          <button
            onClick={prev}
            disabled={current === 0}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white/50"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Dots + counter */}
          <div className="flex items-center gap-4">
            <div className="hidden gap-1.5 sm:flex">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current
                      ? "w-6 bg-[#48cae4]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold tabular-nums tracking-widest text-white/30">
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Next */}
          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white/50"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] w-full bg-white/5">
          <motion.div
            className="h-full bg-[#48cae4]"
            animate={{ width: `${((current + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
