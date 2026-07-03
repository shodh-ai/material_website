"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const inter = Inter({ subsets: ["latin"], display: "swap" });
import {
  Languages,
  Pill,
  HeartPulse,
  Target,
  Brain,
  Shuffle,
  TrendingUp,
  ShieldCheck,
  GitBranch,
  Bot,
  ArrowDown,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Atom,
  FlaskConical,
  ChevronRight,
  Droplets,
  Leaf,
  Ban,
  Recycle,
  Globe,
  Beaker,
  Plane,
  Gauge,
  Zap,
  Battery,
  Flame,
  Activity,
  Lightbulb,
} from "lucide-react";

const Molecule3D = dynamic(() => import("@/components/Molecule3D"), {
  ssr: false,
  loading: () => <Spinner color="emerald" />,
});

const LipidMolecule3D = dynamic(() => import("@/components/LipidMolecule3D"), {
  ssr: false,
  loading: () => <Spinner color="green" />,
});

const WaterDropletSim = dynamic(() => import("@/components/WaterDropletSim"), {
  ssr: false,
  loading: () => <Spinner color="cyan" />,
});

const ShockwaveHeatmap = dynamic(() => import("@/components/ShockwaveHeatmap"), {
  ssr: false,
  loading: () => <Spinner color="orange" />,
});

const PolymerElectrolyte3D = dynamic(() => import("@/components/PolymerElectrolyte3D"), {
  ssr: false,
  loading: () => <Spinner color="amber" />,
});

const DiffusionChart = dynamic(() => import("@/components/DiffusionChart"), {
  ssr: false,
  loading: () => <Spinner color="violet" />,
});

type Phase = "idle" | "thinking" | "done";
type DemoId = "pharma" | "coating" | "aero" | "battery";
type ViewerType = "molecule" | "lipid" | "shockwave" | "polymer";

type DemoConfig = {
  id: DemoId;
  tabLabel: string;
  tabIcon: any;
  accent: "emerald" | "green" | "orange" | "amber";
  inputText: React.ReactNode;
  thoughtSteps: { icon: any; label: string; detail: string }[];
  viewerType: ViewerType;
  viewerLabel: string;
  scorecard: { label: string; value: string; unit: string; sub: string; highlight: boolean }[];
  hasRecipe: boolean;
  synthesisSteps?: { step: number; title: string; detail: string }[];
  opentronsCode?: string;
  hasWaterSim: boolean;
  hasInsight: boolean;
  insightText?: React.ReactNode;
  hasDiffusionChart: boolean;
  closingText: React.ReactNode;
};

function Spinner({ color }: { color: "emerald" | "green" | "cyan" | "orange" | "amber" | "violet" }) {
  const colors: Record<string, string> = { emerald: "emerald-400", green: "green-400", cyan: "cyan-400", orange: "orange-400", amber: "amber-400", violet: "violet-400" };
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className={`h-10 w-10 animate-spin rounded-full border-2 border-${colors[color]}/30 border-t-${colors[color]}`} />
    </div>
  );
}

const STEP_DELAY = 650;

const pharmaCode = `from opentrons import protocol_api

metadata = {
    'apiLevel': '2.13',
    'protocolName': 'p53_Y220C_Goldilocks_4Step_Synthesis'
}

def run(protocol: protocol_api.ProtocolContext):
    tips_300 = protocol.load_labware('opentrons_96_tiprack_300ul', '1')
    tips_1000 = protocol.load_labware('opentrons_96_tiprack_1000ul', '2')
    reactor = protocol.load_labware('glassvial_10ml', '3')
    reagents = protocol.load_labware('tube_rack_15ml', '4')

    p300 = protocol.load_instrument('p300_single', 'right', tip_racks=[tips_300])
    p1000 = protocol.load_instrument('p1000_single', 'left', tip_racks=[tips_1000])

    # Step 1: Boc protection of azaindole NH
    p300.pick_up_tip()
    p300.transfer(200, reagents['A1'], reactor['A1'], new_tip='never')
    p300.mix(3, 200, reactor['A1'])
    p300.drop_tip()
    protocol.delay(minutes=45)

    # Step 2: O-alkylation
    p1000.pick_up_tip()
    p1000.transfer(500, reagents['B1'], reactor['A1'], new_tip='never')
    p1000.mix(5, 500, reactor['A1'])
    p1000.drop_tip()
    protocol.delay(minutes=90)

    # Step 3: Boc deprotection
    p300.pick_up_tip()
    p300.transfer(150, reagents['C1'], reactor['A1'], new_tip='never')
    p300.mix(3, 200, reactor['A1'])
    p300.drop_tip()
    protocol.delay(minutes=30)

    # Step 4: Sulfonylation + purification
    p300.pick_up_tip()
    p300.transfer(180, reagents['D1'], reactor['A1'], new_tip='never')
    p300.mix(5, 200, reactor['A1'])
    p300.drop_tip()
    protocol.delay(minutes=60)

    protocol.comment("Synthesis complete. Ready for HPLC purification.")`;

const coatingCode = `from opentrons import protocol_api

metadata = {
    'apiLevel': '2.13',
    'protocolName': 'PFAS_Free_Biolipid_Coating_Synthesis'
}

def run(protocol: protocol_api.ProtocolContext):
    tips_300 = protocol.load_labware('opentrons_96_tiprack_300ul', '1')
    tips_1000 = protocol.load_labware('opentrons_96_tiprack_1000ul', '2')
    reactor = protocol.load_labware('glassvial_50ml', '3')
    reagents = protocol.load_labware('tube_rack_50ml', '4')

    p300 = protocol.load_instrument('p300_single', 'right', tip_racks=[tips_300])
    p1000 = protocol.load_instrument('p1000_single', 'left', tip_racks=[tips_1000])

    # Step 1: Esterification of long-chain fatty acid
    p1000.pick_up_tip()
    p1000.transfer(2000, reagents['A1'], reactor['A1'], new_tip='never')
    p1000.transfer(800, reagents['A2'], reactor['A1'], new_tip='never')
    p1000.mix(5, 1000, reactor['A1'])
    p1000.drop_tip()
    protocol.delay(minutes=120)

    # Step 2: Enzymatic ester breakpoint insertion
    p300.pick_up_tip()
    p300.transfer(300, reagents['B1'], reactor['A1'], new_tip='never')
    p300.mix(3, 200, reactor['A1'])
    p300.drop_tip()
    protocol.delay(minutes=90)

    # Step 3: Chain extension via condensation
    p1000.pick_up_tip()
    p1000.transfer(1500, reagents['C1'], reactor['A1'], new_tip='never')
    p1000.mix(5, 1000, reactor['A1'])
    p1000.drop_tip()
    protocol.delay(minutes=180)

    # Step 4: Purification & solvent removal
    p300.pick_up_tip()
    p300.transfer(200, reagents['D1'], reactor['A1'], new_tip='never')
    p300.mix(3, 200, reactor['A1'])
    p300.drop_tip()
    protocol.delay(minutes=45)

    protocol.comment("PFAS-free biolipid coating ready for application.")`;

const demos: Record<DemoId, DemoConfig> = {
  pharma: {
    id: "pharma",
    tabLabel: "Pharma · p53 Cancer",
    tabIcon: Pill,
    accent: "emerald",
    inputText: (
      <>
        &ldquo;Design an oral pill for the{" "}
        <span className="font-semibold text-cyan-700">p53 Y220C</span> cancer mutation
        that won&apos;t cause{" "}
        <span className="font-semibold text-cyan-700">heart arrhythmias</span>.&rdquo;
      </>
    ),
    thoughtSteps: [
      { icon: Languages, label: "Translating intent...", detail: "Parsing natural language → molecular design space" },
      { icon: Pill, label: "Setting Constraints: Oral Pill", detail: "0 Lipinski violations · CLogP < 3.0 · MW < 500 Da" },
      { icon: HeartPulse, label: "Setting Constraints: Heart Safety", detail: "hERG selectivity gap > +1.5 kcal/mol" },
      { icon: Target, label: "Setting Constraints: Target Specificity", detail: "p53 Y220C mutant rescue · wild-type sparing" },
      { icon: Brain, label: "Encoding molecular latents...", detail: "Mapping constraints → 512-dim latent space" },
      { icon: Shuffle, label: "Sampling candidate structures...", detail: "10,000 candidates via inverse diffusion" },
      { icon: TrendingUp, label: "Scoring binding affinity...", detail: "Free energy perturbation · top 50 candidates" },
      { icon: ShieldCheck, label: "Checking ADMET safety...", detail: "Ames mutagenicity · hERG · hepatotoxicity — ALL PASS" },
      { icon: GitBranch, label: "Generating retrosynthesis route...", detail: "4-step convergent synthesis identified" },
      { icon: Bot, label: "Writing robotic synthesis protocol...", detail: "Opentrons OT-2 automation script generated" },
    ],
    viewerType: "molecule",
    viewerLabel: 'p53 Y220C "Goldilocks" Reactivator',
    scorecard: [
      { label: "Binding Affinity", value: "-14.16", unit: "kcal/mol", sub: "~40 picomolar (pM)", highlight: true },
      { label: "hERG Selectivity Gap", value: "+7.89", unit: "kcal/mol", sub: "Cardiac safety margin", highlight: false },
      { label: "Lipinski Violations", value: "0", unit: "rules", sub: "Oral bioavailability confirmed", highlight: false },
      { label: "CLogP", value: "2.1", unit: "", sub: "Within target range (< 3.0)", highlight: false },
      { label: "ADMET / Ames", value: "PASS", unit: "", sub: "Non-mutagenic · non-toxic", highlight: true },
      { label: "MACE Stability", value: "0.048", unit: "eV/Å", sub: "Thermodynamically stable", highlight: false },
    ],
    hasRecipe: true,
    synthesisSteps: [
      { step: 1, title: "Protect azaindole NH", detail: "Boc protection on the fluoro/trifluoromethyl core" },
      { step: 2, title: "O-alkylation", detail: "tert-Butyl N-(2-bromoethyl)carbamate (CAS 39684-80-5)" },
      { step: 3, title: "Boc deprotection", detail: "TFA-mediated removal to expose aminoethyl ether" },
      { step: 4, title: "Sulfonylation", detail: "Butane-1-sulfonyl chloride (CAS 2386-60-9) & HPLC purification" },
    ],
    opentronsCode: pharmaCode,
    hasWaterSim: false,
    hasInsight: false,
    hasDiffusionChart: false,
    closingText: (
      <>
        It doesn&apos;t just invent the drug — it writes the{" "}
        <span className="font-bold">robotic code</span> to manufacture it.
      </>
    ),
  },
  coating: {
    id: "coating",
    tabLabel: "Green Materials · PFAS-Free",
    tabIcon: Leaf,
    accent: "green",
    inputText: (
      <>
        &ldquo;Design a highly{" "}
        <span className="font-semibold text-green-700">waterproof industrial coating</span>{" "}
        to replace toxic{" "}
        <span className="font-semibold text-green-700">Teflon (PFAS)</span>. It must be{" "}
        <span className="font-semibold text-green-700">100% biodegradable</span> in the
        environment.&rdquo;
      </>
    ),
    thoughtSteps: [
      { icon: Languages, label: "Translating intent...", detail: "Parsing natural language → polymer design space" },
      { icon: Ban, label: "Setting Constraints: C-F bond count = 0", detail: "Zero carbon-fluorine bonds · no PFAS / forever chemicals" },
      { icon: Recycle, label: "Setting Constraints: Ester breakpoints", detail: "Include hydrolyzable ester groups for microbial digestion" },
      { icon: TrendingUp, label: "Targeting Objective: Maximize hydrophobicity", detail: "Optimize LogP · maximize water contact angle" },
      { icon: Brain, label: "Encoding polymer latents...", detail: "Mapping constraints → 512-dim latent space" },
      { icon: Shuffle, label: "Sampling candidate structures...", detail: "10,000 lipid-chain candidates via inverse diffusion" },
      { icon: Droplets, label: "Simulating water contact angle...", detail: "Coarse-grained MD · virtual droplet on surface" },
      { icon: Leaf, label: "Checking biodegradability...", detail: "Ester hydrolysis half-life < 180 days · PASS" },
      { icon: Globe, label: "Checking environmental toxicity...", detail: "No bioaccumulation · LC50 > 100 mg/L · PASS" },
      { icon: Beaker, label: "Generating synthesis protocol...", detail: "4-step enzymatic esterification route identified" },
    ],
    viewerType: "lipid",
    viewerLabel: 'PFAS-Free Biodegradable Lipid Coating',
    scorecard: [
      { label: "Water Contact Angle", value: "118.6°", unit: "", sub: "Exceeds flat Teflon (114°)", highlight: true },
      { label: "LogP (Hydrophobicity)", value: "4.6", unit: "", sub: "Zero bioaccumulation risk", highlight: true },
      { label: "C-F Bond Count", value: "0", unit: "bonds", sub: "No PFAS / forever chemicals", highlight: false },
      { label: "Biodegradation Half-Life", value: "94", unit: "days", sub: "Ester hydrolysis · microbial digestion", highlight: false },
      { label: "Env. Toxicity (LC50)", value: ">100", unit: "mg/L", sub: "Non-toxic to aquatic life", highlight: false },
      { label: "Ester Breakpoints", value: "2", unit: "sites", sub: "Hydrolyzable bonds for biodegradation", highlight: false },
    ],
    hasRecipe: true,
    synthesisSteps: [
      { step: 1, title: "Fatty acid esterification", detail: "Long-chain C16 fatty acid + glycerol → wax ester" },
      { step: 2, title: "Enzymatic ester insertion", detail: "Lipase-catalyzed breakpoint for microbial digestion" },
      { step: 3, title: "Chain condensation", detail: "Extend to C30+ for maximum hydrophobicity" },
      { step: 4, title: "Purification", detail: "Solvent removal & film-casting ready for application" },
    ],
    opentronsCode: coatingCode,
    hasWaterSim: true,
    hasInsight: false,
    hasDiffusionChart: false,
    closingText: (
      <>
        Solving the{" "}
        <span className="font-bold">forever chemicals crisis</span> — high-performance
        coatings that nature can digest.
      </>
    ),
  },
  aero: {
    id: "aero",
    tabLabel: "Aerodynamics · Mach 5",
    tabIcon: Plane,
    accent: "orange",
    inputText: (
      <>
        &ldquo;Simulate the aerodynamic{" "}
        <span className="font-semibold text-orange-700">shockwave</span> of a{" "}
        <span className="font-semibold text-orange-700">Mach 5</span> jet flying at
        high altitude.&rdquo;
      </>
    ),
    thoughtSteps: [
      { icon: Languages, label: "Translating intent...", detail: "Parsing natural language → CFD simulation parameters" },
      { icon: Gauge, label: "Loading Lobe 2 (Compressible Fluids)", detail: "Activating supersonic flow solver module" },
      { icon: Target, label: "Setting Boundary Conditions: Velocity = Mach 5", detail: "Free-stream velocity 1700 m/s · altitude 20 km" },
      { icon: Target, label: "Setting Boundary Conditions: Fluid = Air", detail: "γ = 1.4 · Prandtl-Blasius profile · ρ = 0.088 kg/m³" },
      { icon: Brain, label: "Encoding flow-field latents...", detail: "Mapping geometry + conditions → 512-dim latent space" },
      { icon: Shuffle, label: "Running neural CFD inference...", detail: "10B model · single-shot prediction (no mesh needed)" },
      { icon: Activity, label: "Resolving shock discontinuities...", detail: "Capturing bow shock · expansion fans · slip lines" },
      { icon: TrendingUp, label: "Computing thermodynamic fields...", detail: "Pressure · density · temperature · Mach contours" },
      { icon: ShieldCheck, label: "Validating physics residual...", detail: "nRMSE vs ground-truth DNS · 0.054 — PASS" },
      { icon: Beaker, label: "Generating visualization...", detail: "Heat-map .mp4 rendered from .npz field arrays" },
    ],
    viewerType: "shockwave",
    viewerLabel: 'Mach 5 Shockwave — Pressure Field',
    scorecard: [
      { label: "Physics Residual", value: "0.054", unit: "nRMSE", sub: "vs ground-truct DNS", highlight: true },
      { label: "Mach Number", value: "5.0", unit: "M", sub: "Supersonic regime", highlight: false },
      { label: "Shock Resolution", value: "Sharp", unit: "", sub: "No blurring at discontinuities", highlight: true },
      { label: "Inference Time", value: "45", unit: "ms", sub: "vs Legacy CFD: 72 hours", highlight: false },
      { label: "Mesh Required", value: "No", unit: "", sub: "Mesh-free neural inference", highlight: false },
      { label: "Field Variables", value: "4", unit: "fields", sub: "P · ρ · T · M", highlight: false },
    ],
    hasRecipe: false,
    hasWaterSim: false,
    hasInsight: true,
    insightText: (
      <>
        The <span className="font-bold">10B model</span> correctly resolves extreme
        thermodynamic discontinuities (shocks) without blurring — a feat traditional
        CFD requires <span className="font-bold">72 hours</span> of mesh-based
        computation to achieve.
      </>
    ),
    hasDiffusionChart: false,
    closingText: (
      <>
        <span className="font-bold">72 hours → 45 milliseconds.</span> Neural CFD
        resolves shocks that legacy solvers choke on.
      </>
    ),
  },
  battery: {
    id: "battery",
    tabLabel: "Battery · Solid-State",
    tabIcon: Battery,
    accent: "amber",
    inputText: (
      <>
        &ldquo;Design a{" "}
        <span className="font-semibold text-amber-700">solid-state polymer electrolyte</span>{" "}
        for an EV battery that will not catch fire at{" "}
        <span className="font-semibold text-amber-700">high voltages or 150°C</span>.&rdquo;
      </>
    ),
    thoughtSteps: [
      { icon: Languages, label: "Translating intent...", detail: "Parsing natural language → quantum chemistry design space" },
      { icon: Brain, label: "Loading Quantum Lobe...", detail: "Activating MACE-MP equivariant force field module" },
      { icon: Zap, label: "Setting Constraints: HOMO-LUMO gap > 4.5 eV", detail: "High-voltage electrochemical stability window" },
      { icon: Flame, label: "Executing MACE-MP thermal stress test at 150°C", detail: "Molecular dynamics · 100 ps · NVT ensemble" },
      { icon: Target, label: "Setting Constraints: Li+ conductivity > 10⁻⁴ S/cm", detail: "Room-temperature ionic transport target" },
      { icon: Brain, label: "Encoding polymer latents...", detail: "Mapping constraints → 512-dim latent space" },
      { icon: Shuffle, label: "Sampling candidate structures...", detail: "10,000 PEG/carbamate variants via inverse diffusion" },
      { icon: Activity, label: "Simulating Li+ diffusion...", detail: "Nernst-Einstein · hopping mechanism analysis" },
      { icon: ShieldCheck, label: "Checking thermal safety...", detail: "150°C smoke test · no decomposition · PASS" },
      { icon: Beaker, label: "Generating synthesis protocol...", detail: "4-step polymerization route identified" },
    ],
    viewerType: "polymer",
    viewerLabel: 'PEG/Carbamate Solid-State Electrolyte',
    scorecard: [
      { label: "Voltage Stability", value: "7.4", unit: "eV", sub: "HOMO-LUMO gap (target > 4.5)", highlight: true },
      { label: "150°C Thermal Test", value: "PASS", unit: "", sub: "No smoke · no decomposition", highlight: true },
      { label: "Li+ Conductivity", value: "1.2×10⁻⁴", unit: "S/cm", sub: "Room temperature", highlight: false },
      { label: "Flash Point", value: ">200", unit: "°C", sub: "Non-flammable electrolyte", highlight: false },
      { label: "MACE Stability", value: "0.031", unit: "eV/Å", sub: "Thermodynamically stable", highlight: false },
      { label: "Decomposition Temp", value: "210", unit: "°C", sub: "Well above operating range", highlight: false },
    ],
    hasRecipe: false,
    hasWaterSim: false,
    hasInsight: false,
    hasDiffusionChart: true,
    closingText: (
      <>
        <span className="font-bold">Fire-proof batteries</span> — quantum-accurate
        polymer design that survives 150°C without breaking a sweat.
      </>
    ),
  },
};

export default function PhysicsDemoPage() {
  const [demoId, setDemoId] = useState<DemoId>("pharma");
  const [phase, setPhase] = useState<Phase>("idle");
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [copied, setCopied] = useState(false);

  const demo = demos[demoId];

  const runDemo = useCallback(() => {
    setPhase("thinking");
    setVisibleSteps(0);
  }, []);

  const switchDemo = useCallback((id: DemoId) => {
    setDemoId(id);
    setPhase("idle");
    setVisibleSteps(0);
  }, []);

  useEffect(() => {
    if (phase !== "thinking") return;
    if (visibleSteps >= demo.thoughtSteps.length) {
      const t = setTimeout(() => setPhase("done"), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleSteps((s) => s + 1), STEP_DELAY);
    return () => clearTimeout(t);
  }, [phase, visibleSteps, demo.thoughtSteps.length]);

  const copyCode = () => {
    if (demo.opentronsCode) {
      navigator.clipboard.writeText(demo.opentronsCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const a = demo.accent;
  const accentMap: Record<string, Record<string, string>> = {
    emerald: {
      text: "emerald", border: "border-emerald-200", bg: "from-emerald-50",
      shadow: "shadow-emerald-100", icon: "text-emerald-600", label: "text-emerald-700",
      hl: "text-emerald-700", hlBorder: "border-emerald-300 bg-emerald-50",
      badge: "border-emerald-300 bg-emerald-50 text-emerald-700",
      step: "bg-emerald-100 text-emerald-700",
      closeBorder: "border-emerald-200 bg-emerald-50",
      closeIcon: "text-emerald-600", closeBody: "text-emerald-900/90",
      btn: "from-emerald-600 to-cyan-600", btnShadow: "shadow-emerald-500/20",
      conn: "text-emerald-500",
    },
    green: {
      text: "green", border: "border-green-200", bg: "from-green-50",
      shadow: "shadow-green-100", icon: "text-green-600", label: "text-green-700",
      hl: "text-green-700", hlBorder: "border-green-300 bg-green-50",
      badge: "border-green-300 bg-green-50 text-green-700",
      step: "bg-green-100 text-green-700",
      closeBorder: "border-green-200 bg-green-50",
      closeIcon: "text-green-600", closeBody: "text-green-900/90",
      btn: "from-green-600 to-emerald-600", btnShadow: "shadow-green-500/20",
      conn: "text-green-500",
    },
    orange: {
      text: "orange", border: "border-orange-200", bg: "from-orange-50",
      shadow: "shadow-orange-100", icon: "text-orange-600", label: "text-orange-700",
      hl: "text-orange-700", hlBorder: "border-orange-300 bg-orange-50",
      badge: "border-orange-300 bg-orange-50 text-orange-700",
      step: "bg-orange-100 text-orange-700",
      closeBorder: "border-orange-200 bg-orange-50",
      closeIcon: "text-orange-600", closeBody: "text-orange-900/90",
      btn: "from-orange-600 to-red-600", btnShadow: "shadow-orange-500/20",
      conn: "text-orange-500",
    },
    amber: {
      text: "amber", border: "border-amber-200", bg: "from-amber-50",
      shadow: "shadow-amber-100", icon: "text-amber-600", label: "text-amber-700",
      hl: "text-amber-700", hlBorder: "border-amber-300 bg-amber-50",
      badge: "border-amber-300 bg-amber-50 text-amber-700",
      step: "bg-amber-100 text-amber-700",
      closeBorder: "border-amber-200 bg-amber-50",
      closeIcon: "text-amber-600", closeBody: "text-amber-900/90",
      btn: "from-amber-600 to-orange-600", btnShadow: "shadow-amber-500/20",
      conn: "text-amber-500",
    },
  };
  const ac = accentMap[a];

  return (
    <main className={`${inter.className} min-h-screen overflow-x-hidden bg-white text-slate-900`}>
      <div className="mx-auto max-w-5xl px-5 py-10 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <Image
            src="/shodhai_logo.svg"
            alt="Shodh AI"
            width={136}
            height={32}
            priority
            className="h-7 w-auto [filter:brightness(0)_saturate(100%)_invert(10%)_sepia(22%)_saturate(1393%)_hue-rotate(169deg)_brightness(94%)_contrast(98%)]"
          />
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="hidden sm:inline">an IndiaAI mission company</span>
            <Image
              src="/india-ai-logo.png"
              alt="IndiaAI"
              width={59}
              height={28}
              className="h-7 w-auto"
            />
          </div>
        </div>

        {/* Demo Selector Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {(Object.keys(demos) as DemoId[]).map((id) => {
            const d = demos[id];
            const TabIcon = d.tabIcon;
            const isActive = id === demoId;
            return (
              <button
                key={id}
                onClick={() => switchDemo(id)}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-200 ${
                  isActive
                    ? accentMap[d.accent].badge
                    : "border-slate-200 bg-slate-50 text-slate-400 hover:border-slate-300 hover:text-slate-800"
                }`}
              >
                <TabIcon className="h-4 w-4" />
                {d.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Run Button */}
        <div className="mb-12 text-center">
          <button
            onClick={runDemo}
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${ac.btn} px-6 py-3 text-sm font-bold text-white shadow-lg ${ac.btnShadow} transition hover:scale-105`}
          >
            {phase === "idle" ? "Run Demo" : <><RotateCcw className="h-4 w-4" /> Replay</>}
          </button>
        </div>

        {/* Input Section */}
        <SectionWrapper delay={0}>
          <SectionBadge icon={Languages} text="Step 1 — Input" color="cyan" />
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-700">
                <Languages className="h-5 w-5" />
              </div>
              <div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">User Types</div>
                <p className="text-lg leading-relaxed text-slate-900">
                  {demo.inputText}
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>

        <Connector active={phase !== "idle"} accentColor={ac.conn} />

        {/* Thought Process Section */}
        <SectionWrapper delay={0.1}>
          <SectionBadge icon={Brain} text="Step 2 — Thought Process" color="violet" />
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
              <div className={`h-2.5 w-2.5 rounded-full ${phase === "thinking" ? "animate-pulse bg-violet-500" : phase === "done" ? "bg-emerald-500" : "bg-slate-400"}`} />
              <span className="font-mono text-xs text-slate-400">
                {phase === "idle" && "awaiting input..."}
                {phase === "thinking" && "processing constraints → latent space → candidates..."}
                {phase === "done" && "design complete ✓"}
              </span>
            </div>

            <div className="space-y-1.5 font-mono">
              <AnimatePresence mode="popLayout">
                {demo.thoughtSteps.slice(0, visibleSteps).map((step, i) => {
                  const Icon = step.icon;
                  const isLatest = i === visibleSteps - 1 && phase === "thinking";
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-start gap-3 rounded-lg px-3 py-2 ${isLatest ? "bg-violet-50" : ""}`}
                    >
                      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${isLatest ? "text-violet-600" : "text-slate-400"}`} />
                      <div className="min-w-0">
                        <span className={`text-sm font-semibold ${isLatest ? "text-violet-700" : "text-slate-700"}`}>
                          {step.label}
                        </span>
                        {isLatest && (
                          <motion.span
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className="ml-1 inline-block h-3.5 w-1.5 bg-violet-500 align-middle"
                          />
                        )}
                        <div className="text-xs text-slate-500">{step.detail}</div>
                      </div>
                      {!isLatest && phase === "done" && (
                        <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-500" />
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {phase === "thinking" && (
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
                  animate={{ width: `${(visibleSteps / demo.thoughtSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        </SectionWrapper>

        <Connector active={phase === "done"} accentColor={ac.conn} />

        {/* Output Section */}
        <AnimatePresence>
          {phase === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionBadge icon={Atom} text="Step 3 — Output" color={ac.text} />

              {/* Molecule + Scorecard */}
              <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                {/* 3D Molecule Viewer */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative h-[420px] overflow-hidden rounded-2xl border ${ac.border} bg-gradient-to-br ${ac.bg} to-white shadow-xl ${ac.shadow}`}
                >
                  <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
                    <FlaskConical className={`h-4 w-4 ${ac.icon}`} />
                    <span className={`text-xs font-semibold uppercase tracking-wider ${ac.label}`}>
                      {demo.viewerType === "shockwave" ? "Shockwave Heatmap" : demo.viewerType === "polymer" ? "3D Polymer Viewer" : "3D Molecule Viewer"}
                    </span>
                  </div>
                  <div className="absolute right-4 top-4 z-10 rounded-full border border-slate-200 bg-white/70 px-3 py-1 font-mono text-[10px] text-slate-400">
                    {demo.viewerType === "shockwave" ? "neural CFD output" : "drag to rotate · scroll to zoom"}
                  </div>
                  {demo.viewerType === "molecule" && <Molecule3D />}
                  {demo.viewerType === "lipid" && <LipidMolecule3D />}
                  {demo.viewerType === "shockwave" && <ShockwaveHeatmap />}
                  {demo.viewerType === "polymer" && <PolymerElectrolyte3D />}
                  <div className="absolute bottom-4 left-4 z-10 font-mono text-[10px] text-slate-500">
                    {demo.viewerLabel}
                  </div>
                </motion.div>

                {/* Scorecard */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 backdrop-blur-sm"
                >
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Scorecard</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {demo.scorecard.map((metric, i) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                        className={`rounded-xl border p-3 ${
                          metric.highlight
                            ? ac.hlBorder
                            : "border-slate-200 bg-slate-100/60"
                        }`}
                      >
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                          {metric.label}
                        </div>
                        <div className={`mt-1.5 text-2xl font-black tracking-tight ${
                          metric.highlight ? ac.hl : "text-slate-900"
                        }`}>
                          {metric.value}
                          {metric.unit && (
                            <span className="ml-1 text-xs font-medium text-slate-400">{metric.unit}</span>
                          )}
                        </div>
                        <div className="mt-0.5 text-[10px] text-slate-500">{metric.sub}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Insight (aero demo only) */}
              {demo.hasInsight && demo.insightText && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={`mt-5 flex items-start gap-3 rounded-2xl border p-5 ${ac.closeBorder}`}
                >
                  <Lightbulb className={`h-6 w-6 shrink-0 ${ac.closeIcon}`} />
                  <div>
                    <div className={`mb-1 text-xs font-semibold uppercase tracking-wider ${ac.label}`}>Key Insight</div>
                    <p className={`text-sm leading-relaxed ${ac.closeBody}`}>
                      {demo.insightText}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Li+ Diffusion Chart (battery demo only) */}
              {demo.hasDiffusionChart && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 backdrop-blur-sm"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
                      <Activity className="h-4 w-4 text-violet-600" />
                      Li+ Diffusion Rate
                    </h3>
                    <span className="rounded-full border border-violet-300 bg-violet-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-700">
                      Stable at 150°C
                    </span>
                  </div>
                  <div className="relative h-[280px] overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
                    <DiffusionChart />
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    Li+ diffusion rate holds steady across temperature cycles — confirming
                    stable ionic transport in the PEG/carbamate electrolyte even at 150°C.
                  </p>
                </motion.div>
              )}

              {/* Water Droplet Simulation (coating demo only) */}
              {demo.hasWaterSim && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 backdrop-blur-sm"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
                      <Droplets className="h-4 w-4 text-cyan-700" />
                      Water Contact Simulation
                    </h3>
                    <span className="rounded-full border border-cyan-300 bg-cyan-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-700">
                      Coarse-Grained MD
                    </span>
                  </div>
                  <div className="relative h-[300px] overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
                    <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
                      <Droplets className="h-3.5 w-3.5 text-cyan-700" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700/80">
                        Virtual droplet beading on coating surface
                      </span>
                    </div>
                    <WaterDropletSim />
                    <div className="absolute bottom-4 right-4 z-10 rounded-lg border border-cyan-300 bg-white/80 px-3 py-1.5 font-mono text-xs text-cyan-700">
                      θ = 118.6°
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Synthesis Recipe */}
              {demo.hasRecipe && demo.synthesisSteps && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 backdrop-blur-sm"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
                      <GitBranch className={`h-4 w-4 ${ac.icon}`} />
                      Synthesis Recipe
                    </h3>
                    <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${ac.badge}`}>
                      4-Step Route
                    </span>
                  </div>

                  {/* Steps */}
                  <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {demo.synthesisSteps.map((s, i) => (
                      <motion.div
                        key={s.step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                        className="relative rounded-xl border border-slate-200 bg-slate-100 p-4"
                      >
                        <div className={`mb-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${ac.step}`}>
                          {s.step}
                        </div>
                        <div className="text-sm font-semibold text-slate-900">{s.title}</div>
                        <div className="mt-1 text-xs leading-relaxed text-slate-400">{s.detail}</div>
                        {i < demo.synthesisSteps!.length - 1 && (
                          <ChevronRight className="absolute -right-2.5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-900/15 lg:block" />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Opentrons Code Block */}
                  <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <Bot className={`h-4 w-4 ${ac.icon}`} />
                        <span className="font-mono text-xs text-slate-400">opentrons_protocol.py</span>
                      </div>
                      <button
                        onClick={copyCode}
                        className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-slate-200 transition hover:bg-white/10"
                      >
                        {copied ? "Copied ✓" : "Copy"}
                      </button>
                    </div>
                    <pre className="max-h-[340px] overflow-auto p-4 text-xs leading-relaxed">
                      <code className="font-mono text-slate-300">{demo.opentronsCode}</code>
                    </pre>
                  </div>

                  <div className={`mt-4 flex items-center gap-2 rounded-xl border p-4 ${ac.closeBorder}`}>
                    <Sparkles className={`h-5 w-5 shrink-0 ${ac.closeIcon}`} />
                    <p className={`text-sm ${ac.closeBody}`}>
                      {demo.closingText}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Closing text for demos without recipe */}
              {!demo.hasRecipe && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className={`mt-5 flex items-center gap-2 rounded-xl border p-4 ${ac.closeBorder}`}
                >
                  <Sparkles className={`h-5 w-5 shrink-0 ${ac.closeIcon}`} />
                  <p className={`text-sm ${ac.closeBody}`}>
                    {demo.closingText}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-20 border-t border-slate-200 pt-8 text-center">
          <p className="text-xs text-slate-400">
            Shodh AI · Physics Foundation Model for Molecular Design
          </p>
        </div>
      </div>
    </main>
  );
}

function SectionWrapper({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionBadge({ icon: Icon, text, color }: { icon: any; text: string; color: string }) {
  const colors: Record<string, string> = {
    cyan: "border-cyan-300 bg-cyan-50 text-cyan-700",
    violet: "border-violet-300 bg-violet-50 text-violet-700",
    emerald: "border-emerald-300 bg-emerald-50 text-emerald-700",
    green: "border-green-300 bg-green-50 text-green-700",
    orange: "border-orange-300 bg-orange-50 text-orange-700",
    amber: "border-amber-300 bg-amber-50 text-amber-700",
  };
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${colors[color]}`}>
      <Icon className="h-3.5 w-3.5" />
      {text}
    </div>
  );
}

function Connector({ active, accentColor }: { active: boolean; accentColor: string }) {
  return (
    <div className="flex justify-center py-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: active ? 1 : 0.4, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <ArrowDown className={`h-5 w-5 ${active ? accentColor : "text-slate-300"}`} />
      </motion.div>
    </div>
  );
}
