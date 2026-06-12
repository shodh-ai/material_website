"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Atom,
  BatteryCharging,
  Beaker,
  CheckCircle2,
  Factory,
  Flame,
  Gauge,
  Microscope,
  ShieldCheck,
  Zap
} from "lucide-react";

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };
const sop001PdfUrl = "/pdf/SOP-001_solid_state_battery_electrolyte.pdf";

const validationRows = [
  {
    property: "Ionic Conductivity (25 deg C)",
    prediction: "1.25 x 10^-3 S/cm",
    measured: "1.22 x 10^-3 S/cm",
    error: "0.03 S/cm",
    evidence: "Electrochemical Impedance Spectroscopy (EIS)"
  },
  {
    property: "Anodic Stability (ESW)",
    prediction: "4.85 V vs Li/Li+",
    measured: "4.81 V vs Li/Li+",
    error: "0.04 V",
    evidence: "Linear Sweep Voltammetry (LSV)"
  },
  {
    property: "Lithium Transference Number (tLi+)",
    prediction: "0.68",
    measured: "0.66",
    error: "0.02",
    evidence: "Bruce-Vincent-Evans Method"
  },
  {
    property: "Thermal Degradation Onset",
    prediction: "245.0 deg C",
    measured: "242.5 deg C",
    error: "2.5 deg C",
    evidence: "Thermogravimetric Analysis (TGA)"
  },
  {
    property: "Robotic Workflow",
    prediction: "Protocol compiled in 0.54 sec",
    measured: "Lab synthesis completed",
    error: "PASS",
    evidence: "Standard Operating Procedure (SOP-001)"
  }
];

const routeSteps = [
  {
    title: "Initial Sulfonyl Condensation",
    body: "Methanesulfonyl chloride + methanol (CO proxy) to generate the base monomer."
  },
  {
    title: "First Chain Extension",
    body: "Introduction of secondary methanesulfonyl chloride to extend the sulfonate backbone."
  },
  {
    title: "Final Chain Extension",
    body: "Acid-driven condensation via sulfuric acid (H2SO4) to terminate the chain and stabilize the electrolyte matrix."
  }
];

export default function BatteryElectrolyteDossierPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/insider/data-room" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Data Room</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <p className="text-xs text-white/40 font-mono tracking-widest">TECHNICAL DOSSIER 02 - CONFIDENTIAL</p>
          </div>
        </div>
      </header>

      <main>
        <section className="px-6 pt-20 pb-16">
          <motion.div {...fade} className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-violet-300/75 mb-5">Autonomous Discovery & Empirical Validation</p>
                <h1 className="text-4xl md:text-6xl font-extralight tracking-tight leading-tight">
                  High-Stability Solid-State Battery Electrolyte <span className="text-violet-200">Technical Dossier</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-white/55 font-light leading-relaxed max-w-3xl">
                  UNIPHY autonomously engineered, routed, and empirically validated a sulfonate ester polymer chain designed to suppress dendrite formation, resist high-voltage decomposition, and improve lithium-metal battery safety.
                </p>
              </div>

              <div className="border border-violet-400/15 bg-violet-950/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-violet-400/10 border border-violet-400/20 flex items-center justify-center">
                    <Atom className="w-5 h-5 text-violet-300" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/35">Target Generated</p>
                    <p className="font-mono text-xs md:text-sm text-white/85 break-all">CS(=O)(=O)OCS(=O)(=O)OCS(=O)(=O)O</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/[0.03] border border-white/8 p-4">
                    <p className="text-white/35 text-xs uppercase tracking-widest">Reward Score</p>
                    <p className="mt-2 text-2xl font-light text-violet-200">0.944</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/8 p-4">
                    <p className="text-white/35 text-xs uppercase tracking-widest">Steric Strain</p>
                    <p className="mt-2 text-2xl font-light text-violet-200">0.0</p>
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
              <div className="w-12 h-12 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <p className="text-white/35 text-xs uppercase tracking-widest mb-1">Section 1</p>
                <h2 className="text-2xl md:text-3xl font-extralight">In Silico Discovery & Molecular Rationale</h2>
              </div>
            </motion.div>

            <motion.div {...fade} className="grid md:grid-cols-3 gap-5">
              <div className="md:col-span-2 rounded-2xl border border-white/8 bg-white/[0.025] p-7">
                <p className="text-white/68 font-light leading-relaxed">
                  The UNIPHY foundation model engineered a sulfonate ester chain to solve a central bottleneck in next-generation lithium-metal solid-state batteries: dendrite formation and thermal runaway. Standard liquid electrolytes decompose at high voltages, creating battery-fire risk.
                </p>
                <p className="mt-5 text-white/68 font-light leading-relaxed">
                  The model determined that a highly electronegative sulfur-oxygen backbone provides exceptional oxidative stability above 4.5 V. The repeating sulfonate structure also acts as a sacrificial layer, selectively decomposing during the first charge cycle to form an impenetrable, lithium-conducting Solid Electrolyte Interphase on the bare metal anode.
                </p>
              </div>
              <div className="rounded-2xl border border-sky-400/15 bg-sky-950/10 p-7">
                <BatteryCharging className="w-6 h-6 text-sky-300 mb-5" />
                <p className="text-white/35 text-xs uppercase tracking-widest mb-2">Design Intent</p>
                <p className="text-white/75 font-light leading-relaxed">
                  High-voltage oxidative stability, stable SEI formation, and permanent dendrite-piercing resistance.
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
                <h2 className="text-2xl md:text-3xl font-extralight">Autonomous Retrosynthesis: SOP-001 Generation</h2>
              </div>
            </motion.div>

            <motion.div {...fade} className="rounded-2xl border border-violet-400/15 bg-violet-950/8 p-7 mb-6">
              <p className="text-white/65 font-light leading-relaxed">
                To ensure immediate commercial viability, UNIPHY constrained its retrosynthetic search tree to abundant, low-cost commodity precursors. It bypassed complex, low-yield pathways in favor of high-efficiency condensation reactions, then compiled{" "}
                <a href={sop001PdfUrl} target="_blank" rel="noreferrer" className="text-violet-200 underline decoration-violet-300/40 underline-offset-4 hover:text-white">
                  SOP-001: Synthesis of High-Stability Solid-State Battery Electrolyte
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
              Note: UNIPHY natively generated reagent volumes, 10-minute kinetic delay phases, and LCMS quality-control parameters in the attached{" "}
              <a href={sop001PdfUrl} target="_blank" rel="noreferrer" className="text-violet-200 underline decoration-violet-300/40 underline-offset-4 hover:text-white">
                SOP-001 package
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
              <table className="w-full min-w-[960px] text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="text-left px-5 py-4 text-white/45 uppercase tracking-widest text-xs font-medium">Physical / Electrochemical Property</th>
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
                The delta between UNIPHY's digital prediction and empirical wet-lab reality confirms sub-1% precision across critical stability and conductivity thresholds.
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
                  The validated electrolyte supports safe operation up to 4.8 V with strong room-temperature ionic conductivity, eclipsing the core limits of standard liquid electrolyte systems.
                </p>
              </motion.div>

              <motion.div {...fade} className="rounded-2xl border border-white/8 bg-white/[0.025] p-7">
                <p className="text-white/70 font-light leading-relaxed">
                  With the molecular structure and robotic bench recipe empirically proven, Shodh AI has bypassed the traditional multi-year R&D cycle. Paid pilot programs are being structured with leading gigafactory operators, including A123 Systems and Tier-1 EV manufacturers.
                </p>
                <p className="mt-5 text-white/60 font-light leading-relaxed">
                  The validated molecular parameters have been offloaded to macro-fluid experts within UNIPHY. The model is solving non-Newtonian fluid rheology to optimize continuous-stirred tank reactors required to safely handle high-viscosity chain-extension steps at a 10,000-liter factory scale.
                </p>
              </motion.div>
            </div>

            <motion.div {...fade} className="mt-8 grid sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/8 bg-white/[0.025] p-5">
                <Gauge className="w-5 h-5 text-sky-300 mb-3" />
                <p className="text-white/35 text-xs uppercase tracking-widest">Pilot Target</p>
                <p className="mt-2 text-white/80">10,000 L CSTR integration</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.025] p-5">
                <Factory className="w-5 h-5 text-rose-300 mb-3" />
                <p className="text-white/35 text-xs uppercase tracking-widest">Partner Class</p>
                <p className="mt-2 text-white/80">Gigafactory operators</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.025] p-5">
                <Zap className="w-5 h-5 text-violet-300 mb-3" />
                <p className="text-white/35 text-xs uppercase tracking-widest">Status</p>
                <p className="mt-2 text-white/80">Electrochemical validation complete</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
