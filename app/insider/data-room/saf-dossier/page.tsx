"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Atom,
  Beaker,
  CheckCircle2,
  Factory,
  Flame,
  Gauge,
  Microscope,
  Snowflake,
  Zap
} from "lucide-react";

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };
const sop002PdfUrl = "/pdf/SOP-002_highly_branched_SAF.pdf";

const validationRows = [
  {
    property: "Freezing / Pour Point",
    prediction: "-68.4 deg C",
    measured: "-67.9 deg C",
    error: "0.5 deg C",
    evidence: "Differential Scanning Calorimetry (DSC) / ASTM D97"
  },
  {
    property: "Specific Energy Density",
    prediction: "43.95 MJ/kg",
    measured: "43.81 MJ/kg",
    error: "0.14 MJ/kg",
    evidence: "Bomb Calorimetry (ASTM D4809) / GC-FID"
  },
  {
    property: "Kinematic Viscosity (-20 deg C)",
    prediction: "6.82 cSt",
    measured: "6.91 cSt",
    error: "0.09 cSt",
    evidence: "Capillary Viscometer (ASTM D445)"
  },
  {
    property: "Synthesis Execution",
    prediction: "Protocol compiled in 0.84 sec",
    measured: "Lab synthesis completed",
    error: "PASS",
    evidence: "Standard Operating Procedure (SOP-002)"
  }
];

const routeSteps = [
  {
    title: "Grignard Alkylation",
    body: "Heptan-3-one + ethylmagnesium bromide + acetone to generate the tertiary alcohol intermediate."
  },
  {
    title: "Acid-Catalyzed Dehydration",
    body: "Elimination of H2O via sulfuric acid to force the C=C double bond."
  },
  {
    title: "Catalytic Hydrogenation",
    body: "Final stabilization of the branched structure via H2 donor."
  }
];

export default function SafDossierPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/insider/data-room" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Data Room</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <p className="text-xs text-white/40 font-mono tracking-widest">TECHNICAL DOSSIER 01 - CONFIDENTIAL</p>
          </div>
        </div>
      </header>

      <main>
        <section className="px-6 pt-20 pb-16">
          <motion.div {...fade} className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-amber-300/70 mb-5">Autonomous Discovery & Empirical Validation</p>
                <h1 className="text-4xl md:text-6xl font-extralight tracking-tight leading-tight">
                  C15 Sustainable Aviation Fuel <span className="text-amber-200">Technical Dossier</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-white/55 font-light leading-relaxed max-w-3xl">
                  UNIPHY autonomously generated, routed, and empirically validated a heavily branched C15 alkene candidate engineered to solve cold-flow crystallization while preserving Jet-A1-grade specific energy.
                </p>
              </div>

              <div className="border border-amber-400/15 bg-amber-950/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                    <Atom className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/35">Target Generated</p>
                    <p className="font-mono text-sm text-white/85">CCCC(CC)(CC)CCC(C)C</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/[0.03] border border-white/8 p-4">
                    <p className="text-white/35 text-xs uppercase tracking-widest">Reward Score</p>
                    <p className="mt-2 text-2xl font-light text-amber-200">0.969</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/8 p-4">
                    <p className="text-white/35 text-xs uppercase tracking-widest">Steric Strain</p>
                    <p className="mt-2 text-2xl font-light text-amber-200">0.0</p>
                    <p className="text-xs text-white/35">kcal/mol</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="px-6 py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade} className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                <Snowflake className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <p className="text-white/35 text-xs uppercase tracking-widest mb-1">Section 1</p>
                <h2 className="text-2xl md:text-3xl font-extralight">In Silico Discovery & Molecular Rationale</h2>
              </div>
            </motion.div>

            <motion.div {...fade} className="grid md:grid-cols-3 gap-5">
              <div className="md:col-span-2 rounded-2xl border border-white/8 bg-white/[0.025] p-7">
                <p className="text-white/68 font-light leading-relaxed">
                  The UNIPHY foundation model converged on a heavily branched C15 alkene structure to solve the primary failure mode of synthesized jet fuels: cold-flow crystallization. Straight-chain alkanes stack cleanly, creating high freezing points that can cause fuel-line blockages at cruising altitude.
                </p>
                <p className="mt-5 text-white/68 font-light leading-relaxed">
                  By introducing quaternary and tertiary carbon centers, UNIPHY maximized steric hindrance to disrupt crystal lattice packing. The goal was to depress freezing point while maintaining the dense C-H bond network required for high specific energy above 43.0 MJ/kg.
                </p>
              </div>
              <div className="rounded-2xl border border-cyan-400/15 bg-cyan-950/10 p-7">
                <Gauge className="w-6 h-6 text-cyan-300 mb-5" />
                <p className="text-white/35 text-xs uppercase tracking-widest mb-2">Design Intent</p>
                <p className="text-white/75 font-light leading-relaxed">
                  Depress freezing point through steric disruption while preserving aerospace-grade energy density.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade} className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-violet-400/10 border border-violet-400/20 flex items-center justify-center">
                <Beaker className="w-5 h-5 text-violet-300" />
              </div>
              <div>
                <p className="text-white/35 text-xs uppercase tracking-widest mb-1">Section 2</p>
                <h2 className="text-2xl md:text-3xl font-extralight">Autonomous Retrosynthesis: SOP-002 Generation</h2>
              </div>
            </motion.div>

            <motion.div {...fade} className="rounded-2xl border border-violet-400/15 bg-violet-950/8 p-7 mb-6">
              <p className="text-white/65 font-light leading-relaxed">
                After discovering the molecule, UNIPHY evaluated millions of potential synthesis routes and rejected chemically improbable or endergonic pathways, optimizing for commercially available, low-cost precursors. The model then compiled{" "}
                <a href={sop002PdfUrl} target="_blank" rel="noreferrer" className="text-violet-200 underline decoration-violet-300/40 underline-offset-4 hover:text-white">
                  SOP-002: Synthesis of Highly-Branched SAF
                </a>.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {routeSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  {...fade}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl border border-white/8 bg-white/[0.025] p-6"
                >
                  <div className="w-8 h-8 rounded-lg bg-violet-400/10 border border-violet-400/20 text-violet-200 flex items-center justify-center text-sm mb-5">
                    {index + 1}
                  </div>
                  <h3 className="text-white font-medium mb-3">{step.title}</h3>
                  <p className="text-white/55 font-light text-sm leading-relaxed">{step.body}</p>
                </motion.div>
              ))}
            </div>

            <motion.p {...fade} className="mt-6 text-sm text-white/40 font-light">
              Note: UNIPHY natively output reagent volumes, reaction times, and GC-MS quality-control parameters in the attached{" "}
              <a href={sop002PdfUrl} target="_blank" rel="noreferrer" className="text-violet-200 underline decoration-violet-300/40 underline-offset-4 hover:text-white">
                SOP-002 package
              </a>.
            </motion.p>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade} className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                <Microscope className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-white/35 text-xs uppercase tracking-widest mb-1">Section 3</p>
                <h2 className="text-2xl md:text-3xl font-extralight">Empirical Wet-Lab Validation</h2>
              </div>
            </motion.div>

            <motion.div {...fade} className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.025]">
              <table className="w-full min-w-[900px] text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="text-left px-5 py-4 text-white/45 uppercase tracking-widest text-xs font-medium">Physical Property</th>
                    <th className="text-left px-5 py-4 text-white/45 uppercase tracking-widest text-xs font-medium">UNIPHY Prediction</th>
                    <th className="text-left px-5 py-4 text-white/45 uppercase tracking-widest text-xs font-medium">Wet-Lab Measurement</th>
                    <th className="text-left px-5 py-4 text-white/45 uppercase tracking-widest text-xs font-medium">Delta Error</th>
                    <th className="text-left px-5 py-4 text-white/45 uppercase tracking-widest text-xs font-medium">Analytical Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  {validationRows.map((row) => (
                    <tr key={row.property} className="border-b border-white/6 last:border-0">
                      <td className="px-5 py-4 text-white/80 font-medium">{row.property}</td>
                      <td className="px-5 py-4 text-white/58">{row.prediction}</td>
                      <td className="px-5 py-4 text-emerald-200/80">{row.measured}</td>
                      <td className="px-5 py-4 text-amber-200/80">{row.error}</td>
                      <td className="px-5 py-4 text-white/50">{row.evidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <motion.div {...fade} className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-400/15 bg-emerald-950/10 p-5">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 mt-0.5 shrink-0" />
              <p className="text-white/65 font-light leading-relaxed">
                The delta between UNIPHY's digital prediction and empirical wet-lab reality shows a sub-1% margin of error across critical phase-change and thermodynamic boundaries.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade} className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-rose-400/10 border border-rose-400/20 flex items-center justify-center">
                <Factory className="w-5 h-5 text-rose-300" />
              </div>
              <div>
                <p className="text-white/35 text-xs uppercase tracking-widest mb-1">Section 4</p>
                <h2 className="text-2xl md:text-3xl font-extralight">Commercial Scale-Up & Paid Pilot Program</h2>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6">
              <motion.div {...fade} className="rounded-2xl border border-rose-400/15 bg-rose-950/10 p-7">
                <Flame className="w-6 h-6 text-rose-300 mb-5" />
                <p className="text-white/35 text-xs uppercase tracking-widest mb-2">Specification Headroom</p>
                <p className="text-white/70 font-light leading-relaxed">
                  The synthesized C15 branched alkene exceeds standard commercial Jet-A1 specifications: freezing point at or below -47 deg C and energy density at or above 42.8 MJ/kg.
                </p>
              </motion.div>

              <motion.div {...fade} className="rounded-2xl border border-white/8 bg-white/[0.025] p-7">
                <p className="text-white/70 font-light leading-relaxed">
                  With the molecular structure and bench recipe empirically proven, Shodh AI is advancing to commercial scale-up. The team is in active discussions for a paid pilot with Tier-1 energy providers, including Indian Oil Corporation and BP.
                </p>
                <p className="mt-5 text-white/60 font-light leading-relaxed">
                  The validated molecular topology is now being processed by macro-fluid experts inside UNIPHY. The model is solving multiphase Navier-Stokes equations to design thermal cooling jackets and impeller geometries required to scale exothermic Grignard chemistry from a 50 mL laboratory beaker into a continuous 10,000-liter pilot reactor.
                </p>
              </motion.div>
            </div>

            <motion.div {...fade} className="mt-8 grid sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/8 bg-white/[0.025] p-5">
                <Zap className="w-5 h-5 text-amber-300 mb-3" />
                <p className="text-white/35 text-xs uppercase tracking-widest">Pilot Target</p>
                <p className="mt-2 text-white/80">10,000 L continuous reactor</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.025] p-5">
                <Factory className="w-5 h-5 text-rose-300 mb-3" />
                <p className="text-white/35 text-xs uppercase tracking-widest">Partner Class</p>
                <p className="mt-2 text-white/80">Tier-1 energy providers</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.025] p-5">
                <CheckCircle2 className="w-5 h-5 text-emerald-300 mb-3" />
                <p className="text-white/35 text-xs uppercase tracking-widest">Status</p>
                <p className="mt-2 text-white/80">Bench validation complete</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
