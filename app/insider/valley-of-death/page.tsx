"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Atom, Cog, Factory, Microscope, Sparkles } from "lucide-react";

const WIDTH = 1600;
const HEIGHT = 900;
const FLOOR = 860;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0, 0, 0.2, 1] } },
};

const failureExamples =[
  "Battery: chemistry proven ➔ catches fire on the factory line",
  "Biologic: large molecule works ➔ collapses under shear stress in bioreactor",
  "Biocatalyst: active in micro-flask ➔ doesn't survive in cellular factory physics",
  "mRNA / LNP: stable formulation ➔ degrades during continuous fluid mixing",
  "Solid-State Electrolyte: perfect ion flow ➔ dendrites pierce macro-scale cells",
  "Green Hydrogen Catalyst: active in lab ➔ poisoned by impurities in pilot plant",
  "Advanced Alloy: passes stress test ➔ micro-fractures during 3D printing",
  "Semiconductor Photoresist: sub-nm accuracy ➔ uneven thermal spin-coating at scale",
  "Cultured Meat: cells multiply in petri dish ➔ starve in 10,000L tank",
  "Carbon Capture Solvent: absorbs CO2 ➔ degrades during continuous recycling",
  "Small Molecule Drug: binds to target perfectly ➔ crystallizes incorrectly in bulk vat",
  "Perovskite Solar Cell: 25% efficiency in lab ➔ degrades in ambient factory air",
  "Bio-Plastic: fully compostable ➔ extrudes poorly in industrial molds",
  "Hypersonic Coating: handles Mach 10 in wind tunnel ➔ peels off full-scale wing",
  "Next-Gen Concrete: carbon-negative mix ➔ cures unevenly in macro pours",
  "Nuclear Fuel: stable atomic lattice ➔ swells under macro thermal stress",
  "Metamaterial: acoustic cloaking works ➔ deforms under macro-manufacturing",
  "Industrial Adhesive: bonds perfectly in lab ➔ loses tackiness under factory heat",
];

const discoveryLines =["AI Discovery is Solved.", "Seconds to generate new candidates.", "Biology: AlphaFold 3, Evo 2", "Materials & Chemistry: GNoME, MatterGen"];

const disconnectLines =[
  "Models propose discoveries; physical production lags.",
  "The gap between the quantum/micro scale and the physical factory floor.",
];

type RidgeLayerConfig = {
  id: string;
  seed: number;
  yShift: number;
  noise: number;
  frequency: number;
  roll: number;
  steps: number;
  opacity: number;
  gradient: string;
  smooth: boolean;
  shiftX: number;
  shiftY: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function smoothStep(edge0: number, edge1: number, value: number) {
  const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
}

function hash(seed: number, index: number) {
  const value = Math.sin(seed * 127.1 + index * 311.7) * 43758.5453123;
  return (value - Math.floor(value)) * 2 - 1;
}

function valueNoise(seed: number, x: number) {
  const index = Math.floor(x);
  const fraction = x - index;
  const eased = fraction * fraction * (3 - 2 * fraction);
  return lerp(hash(seed, index), hash(seed, index + 1), eased);
}

function octaveNoise(seed: number, x: number) {
  let total = 0;
  let amplitude = 1;
  let frequency = 1;
  let normalizer = 0;

  for (let octave = 0; octave < 4; octave += 1) {
    total += valueNoise(seed + octave * 19, x * frequency) * amplitude;
    normalizer += amplitude;
    amplitude *= 0.52;
    frequency *= 2;
  }

  return total / normalizer;
}

function guideY(xPercent: number) {
  if (xPercent <= 30) {
    return 230 + Math.sin((xPercent / 30) * Math.PI) * 16;
  }

  if (xPercent <= 60) {
    const t = (xPercent - 30) / 30;
    const drop = (Math.exp(t * 3.25) - 1) / (Math.exp(3.25) - 1);
    return lerp(250, 716, drop);
  }

  const t = (xPercent - 60) / 40;
  const plateau = smoothStep(87, 100, xPercent);
  const jaggedWall = (Math.sin(t * 54) * 22 + Math.sin(t * 113) * 10) * (1 - plateau);
  return lerp(716, 205, Math.pow(t, 0.56)) + jaggedWall + plateau * 20;
}

function roughness(xPercent: number) {
  const drop = smoothStep(28, 60, xPercent);
  const wall = smoothStep(60, 88, xPercent);
  const plateau = smoothStep(88, 100, xPercent);
  return 0.18 + drop * 0.38 + wall * 0.72 - plateau * 0.42;
}

const ridgeLayerConfigs: RidgeLayerConfig[] =[
  { id: "background", seed: 4, yShift: 58, noise: 64, frequency: 0.035, roll: 54, steps: 64, opacity: 0.2, gradient: "ridgeBackground", smooth: true, shiftX: -10, shiftY: -4 },
  { id: "midground", seed: 17, yShift: 24, noise: 46, frequency: 0.08, roll: 24, steps: 92, opacity: 0.5, gradient: "ridgeMidground", smooth: true, shiftX: -18, shiftY: -8 },
  { id: "foreground", seed: 39, yShift: 146, noise: 82, frequency: 0.17, roll: 12, steps: 136, opacity: 1, gradient: "ridgeForeground", smooth: false, shiftX: -28, shiftY: -12 },
];

function layerY(xPercent: number, layer: RidgeLayerConfig) {
  const noise = octaveNoise(layer.seed, xPercent * layer.frequency) * layer.noise * roughness(xPercent);
  const roll = Math.sin((xPercent + layer.seed) * 0.055) * layer.roll;
  return clamp(guideY(xPercent) + layer.yShift + noise + roll, 90, 835);
}

function pointsForLayer(layer: RidgeLayerConfig) {
  return Array.from({ length: layer.steps }, (_, index) => {
    const xPercent = (index / (layer.steps - 1)) * 100;
    return[WIDTH * (xPercent / 100), layerY(xPercent, layer)] as const;
  });
}

function format(value: number) {
  return value.toFixed(2);
}

function pathFromPoints(points: readonly (readonly[number, number])[], smooth: boolean) {
  const [firstX, firstY] = points[0];
  let line = `M ${format(firstX)} ${format(firstY)}`;

  if (smooth) {
    for (let index = 0; index < points.length - 1; index += 1) {
      const previous = points[index - 1] ?? points[index];
      const current = points[index];
      const next = points[index + 1];
      const following = points[index + 2] ?? next;
      const cp1x = current[0] + (next[0] - previous[0]) / 6;
      const cp1y = current[1] + (next[1] - previous[1]) / 6;
      const cp2x = next[0] - (following[0] - current[0]) / 6;
      const cp2y = next[1] - (following[1] - current[1]) / 6;
      line += ` C ${format(cp1x)} ${format(cp1y)} ${format(cp2x)} ${format(cp2y)} ${format(next[0])} ${format(next[1])}`;
    }
  } else {
    line += points.slice(1).map(([x, y]) => ` L ${format(x)} ${format(y)}`).join("");
  }

  return `${line} L ${WIDTH} ${FLOOR} L 0 ${FLOOR} Z`;
}

const generatedRidges = ridgeLayerConfigs.map((layer) => ({ ...layer, path: pathFromPoints(pointsForLayer(layer), layer.smooth) }));
const mainLayer = ridgeLayerConfigs[1];
const failureMarkers = failureExamples.map((text, index) => {
  const progress = index / (failureExamples.length - 1);
  const xPercent = 62 + progress * 34 + (index % 2 === 0 ? -1.2 : 1.2);
  const yPercent = ((layerY(xPercent, mainLayer) - 8) / HEIGHT) * 100;
  return { text, x: xPercent, y: yPercent, delay: index * 0.035 };
});

const physicalIpPhases =[
  ["01", "Predictive", "Will this molecule, material, or process scale?"],
  ["02", "Prescriptive", "What process conditions should we run?"],
  ["03", "Generative", "Design the product, process, and factory together."],
];

const worldModelOutputs =[
  "Material composition",
  "Mesoscale manufacturing route",
  "Process parameters",
  "Factory operating window",
  "Quality-control plan",
  "Cost and carbon profile",
  "Dynamic production twin",
];

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#48cae4]/30 bg-[#48cae4]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#48cae4] backdrop-blur-md">
      <span className="h-2 w-2 rounded-full bg-[#48cae4] shadow-[0_0_14px_#48cae4]" />
      {children}
    </span>
  );
}

function ArrowPill() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/50 backdrop-blur-xl">
      <span>➔</span>
      <ArrowRight className="h-3.5 w-3.5 text-[#48cae4]" />
      <span>➔</span>
    </div>
  );
}

function ValleyGraphic() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const parallax = (x: number, y: number) => ({ transform: `translate3d(${mouse.x * x}px, ${mouse.y * y}px, 0)` });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setMouse({ x: ((event.clientX - rect.left) / rect.width - 0.5) * 2, y: ((event.clientY - rect.top) / rect.height - 0.5) * 2 });
  }

  return (
    <section className="px-4 pb-20 sm:px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease:[0, 0, 0.2, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        className="relative mx-auto min-h-[760px] w-full max-w-[1540px] overflow-hidden rounded-[2.25rem] border border-white/12 bg-[#06101b] shadow-[0_40px_140px_rgba(0,0,0,0.55)] lg:aspect-[16/9] lg:min-h-0"
      >
        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" role="img" aria-label="Generative ridge plot showing AI discovery, the valley of death, and production realization failures">
          <defs>
            <linearGradient id="sky" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#081421" /><stop offset="0.45" stopColor="#07101c" /><stop offset="1" stopColor="#02050a" /></linearGradient>
            <linearGradient id="ridgeBackground" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#48cae4" stopOpacity="0.78" /><stop offset="0.45" stopColor="#1a6a8b" stopOpacity="0.34" /><stop offset="1" stopColor="#081421" stopOpacity="0" /></linearGradient>
            <linearGradient id="ridgeMidground" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#7be7ff" stopOpacity="0.9" /><stop offset="0.42" stopColor="#14506a" stopOpacity="0.58" /><stop offset="1" stopColor="#05080f" stopOpacity="0.06" /></linearGradient>
            <linearGradient id="ridgeForeground" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#48cae4" stopOpacity="0.72" /><stop offset="0.22" stopColor="#102d42" stopOpacity="0.95" /><stop offset="1" stopColor="#010308" stopOpacity="1" /></linearGradient>
            <radialGradient id="valleyShadow" cx="50%" cy="73%" r="34%"><stop offset="0" stopColor="#010206" stopOpacity="0.96" /><stop offset="0.52" stopColor="#081421" stopOpacity="0.62" /><stop offset="1" stopColor="#081421" stopOpacity="0" /></radialGradient>
            <linearGradient id="mist" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#d9fbff" stopOpacity="0" /><stop offset="0.44" stopColor="#48cae4" stopOpacity="0.13" /><stop offset="1" stopColor="#081421" stopOpacity="0.9" /></linearGradient>
            <filter id="softGlow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          <rect width={WIDTH} height={HEIGHT} fill="url(#sky)" />
          <circle cx="236" cy="158" r="210" fill="#48cae4" opacity="0.08" />
          <circle cx="1360" cy="190" r="280" fill="#48cae4" opacity="0.06" />
          <ellipse cx="790" cy="720" rx="430" ry="230" fill="url(#valleyShadow)" />
          <g stroke="#48cae4" strokeOpacity="0.1" strokeWidth="1">{Array.from({ length: 9 }, (_, index) => <line key={index} x1="0" x2={WIDTH} y1={160 + index * 76} y2={160 + index * 76} />)}</g>
          {generatedRidges.map((layer, index) => (
            <g key={layer.id} transform={`translate(${mouse.x * layer.shiftX} ${mouse.y * layer.shiftY})`}>
              <motion.path d={layer.path} fill={`url(#${layer.gradient})`} initial={{ opacity: 0, pathLength: 0.9 }} animate={{ opacity: layer.opacity, pathLength: 1 }} transition={{ duration: 1.5, delay: index * 0.18, ease: [0, 0, 0.2, 1] }} />
            </g>
          ))}
          <path d="M 0 584 C 290 534 520 668 790 622 C 1050 580 1320 654 1600 594 L 1600 900 L 0 900 Z" fill="url(#mist)" opacity="0.86" />
          <line x1="260" y1="250" x2="260" y2="438" stroke="#48cae4" strokeOpacity="0.45" strokeWidth="1.4" strokeDasharray="8 10" />
          <circle cx="260" cy="438" r="5" fill="#48cae4" filter="url(#softGlow)" />
          <line x1="1060" y1="718" x2="1320" y2="280" stroke="#48cae4" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="6 12" />
        </svg>

        <div className="absolute inset-0 hidden lg:block">
          <motion.div className="absolute left-[4.5%] top-[9%] z-20 w-[27%] rounded-3xl border border-[#48cae4]/24 bg-[#081421]/58 p-6 shadow-2xl backdrop-blur-xl" style={parallax(12, -8)} initial="hidden" animate="visible" variants={fadeInUp}>
            <Badge>LEFT SIDE: DISCOVERY</Badge>
            <h2 className="mt-5 text-4xl font-medium uppercase leading-none tracking-tight text-white">AI Discovery is Solved.</h2>
            <div className="mt-5 space-y-3 text-base leading-relaxed text-white/72">
              {discoveryLines.slice(1).map((line) => <p key={line}>{line}</p>)}
            </div>
            <div className="mt-5 flex items-center gap-3 text-[#48cae4]"><Atom className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-[0.2em]">High plateau / low noise</span></div>
          </motion.div>

          <div className="absolute left-[31%] top-[26%] z-20"><ArrowPill /></div>

          <motion.div className="absolute left-[36%] top-[8%] z-20 w-[30%] rounded-3xl border border-red-300/20 bg-black/52 p-6 shadow-2xl backdrop-blur-xl" style={parallax(-5, -10)} initial="hidden" animate="visible" variants={fadeInUp}>
            <Badge>MIDDLE: THE DISCONNECT</Badge>
            <h2 className="mt-5 text-5xl font-medium uppercase leading-[0.94] tracking-tight text-white">The “Valley of Death”</h2>
            <div className="mt-5 space-y-3 text-base leading-relaxed text-white/72">
              {disconnectLines.map((line) => <p key={line}>{line}</p>)}
            </div>
          </motion.div>

          <div className="absolute left-[66%] top-[26%] z-20"><ArrowPill /></div>

          <motion.div className="absolute right-[4.5%] top-[7%] z-20 w-[27%] rounded-3xl border border-[#48cae4]/24 bg-[#081421]/58 p-6 shadow-2xl backdrop-blur-xl" style={parallax(-12, -6)} initial="hidden" animate="visible" variants={fadeInUp}>
            <Badge>RIGHT SIDE: PRODUCTION REALIZATION</Badge>
            <h2 className="mt-5 text-4xl font-medium uppercase leading-none tracking-tight text-white">The Mountain of Failure.</h2>
            <p className="mt-5 text-base leading-relaxed text-white/70">18 scale-up failures mapped along the climb from promising science to physical production.</p>
            <div className="mt-5 flex items-center gap-3 text-[#48cae4]"><Factory className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-[0.2em]">Jagged wall / late plateau</span></div>
          </motion.div>

          <motion.div className="absolute left-[34%] top-[66%] z-20 w-[31%] rounded-3xl border border-red-300/25 bg-[#05070c]/72 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl" style={parallax(4, 8)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.3 }}>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-200/70">The Cost</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-4xl font-medium text-white">~$50M</p><p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/40">lost per molecule</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-4xl font-medium text-white">2.5 Years</p><p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/40">production lag</p></div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/66">The Grind: Avg. 30+ manual lab iterations (at $1.5M+ per iteration).</p>
          </motion.div>

          {failureMarkers.map((marker) => (
            <motion.div key={marker.text} className="absolute z-30 max-w-[265px] rounded-full border border-[#48cae4]/18 bg-[#07121f]/78 px-3 py-1.5 text-[10px] font-medium leading-tight text-white/82 shadow-[0_10px_30px_rgba(0,0,0,0.42)] backdrop-blur-md" style={{ left: `${marker.x}%`, top: `${marker.y}%`, transform: "translate(-50%, -50%)" }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: 0.55 + marker.delay }}>
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#48cae4] shadow-[0_0_10px_#48cae4]" />{marker.text}
            </motion.div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[42%] bg-gradient-to-t from-[#081421] via-[#081421]/72 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-50 rounded-[2.25rem] ring-1 ring-inset ring-white/10" />
      </motion.div>

      <div className="mx-auto mt-6 grid max-w-7xl gap-4 lg:hidden">
        <div className="rounded-3xl border border-[#48cae4]/20 bg-black/45 p-5 backdrop-blur-xl"><Badge>LEFT SIDE: DISCOVERY</Badge><div className="mt-4 space-y-2 text-white/76">{discoveryLines.map((line) => <p key={line}>{line}</p>)}</div></div>
        <div className="rounded-3xl border border-red-300/20 bg-black/45 p-5 backdrop-blur-xl"><Badge>MIDDLE: THE DISCONNECT</Badge><h2 className="mt-4 text-3xl font-medium text-white">The “Valley of Death”</h2><div className="mt-4 space-y-2 text-white/72">{disconnectLines.map((line) => <p key={line}>{line}</p>)}<p>The Cost: ~$50 Million & 2.5 Years lost per molecule.</p><p>The Grind: Avg. 30+ manual lab iterations (at $1.5M+ per iteration).</p></div></div>
        <div className="rounded-3xl border border-[#48cae4]/20 bg-black/45 p-5 backdrop-blur-xl"><Badge>RIGHT SIDE: PRODUCTION REALIZATION</Badge><div className="mt-5 grid gap-2 sm:grid-cols-2">{failureExamples.map((line) => <p key={line} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/72">{line}</p>)}</div></div>
      </div>
    </section>
  );
}

function WorldFoundationalModelInfographic() {
  return (
    <section className="relative aspect-[16/9] w-full max-w-[1500px] overflow-hidden rounded-[2rem] border border-black/10 bg-[#f6f5ef] shadow-2xl">
      <Image
        src="/remove_all_text_2K_202604301933.jpeg"
        alt="Textless isometric Physics-AI architecture illustration"
        fill
        priority
        sizes="(max-width: 1500px) 100vw, 1500px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(246,245,239,0.08),rgba(246,245,239,0.02)_46%,rgba(246,245,239,0.34)),radial-gradient(circle_at_66%_17%,rgba(255,255,255,0.72),transparent_32%)]" />

      <div className="absolute right-[5%] top-[5%] w-[40%] rounded-3xl border border-[#0b2338]/10 bg-[#f7f5ea]/84 p-6 text-right shadow-[0_22px_70px_rgba(11,35,56,0.12)] backdrop-blur-xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#4b6b00]">Slide 4 — Technology &amp; IP</p>
        <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-[#0b2338]">The World Foundational Model</h2>
        <p className="ml-auto mt-3 max-w-[540px] text-sm font-semibold leading-tight text-black/64">We are building a continuous physics AI model that learns the thread of physics connecting molecules, materials, processes, and factories.</p>
        <p className="mt-4 text-[11px] font-black uppercase tracking-[0.22em] text-[#4b6b00]">Four continuous layers</p>

        <div className="mt-3 grid gap-2 text-left">
          <div className="rounded-2xl border border-[#0b2338]/10 bg-white/70 p-3">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#4b6b00]">01</p>
            <h3 className="mt-1 text-lg font-black uppercase leading-none tracking-tight text-[#0b2338]">Discovery Layer</h3>
            <p className="mt-1 text-xs font-semibold leading-tight text-black/66">Integrates atomic, molecular, biological, and material discovery.</p>
          </div>
          <div className="rounded-2xl border border-[#0b2338]/10 bg-white/70 p-3">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#4b6b00]">02</p>
            <h3 className="mt-1 text-lg font-black uppercase leading-none tracking-tight text-[#0b2338]">Mesoscale Physics Engine</h3>
            <p className="mt-1 text-xs font-semibold leading-tight text-black/66">The core bridge. Simulates the lab-to-production gap: mixing, shear, heat transfer, mass transfer, reaction kinetics, phase behavior, degradation, impurities, and instability.</p>
          </div>
          <div className="rounded-2xl border border-[#0b2338]/10 bg-white/70 p-3">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#4b6b00]">03</p>
            <h3 className="mt-1 text-lg font-black uppercase leading-none tracking-tight text-[#0b2338]">Control Layer</h3>
            <p className="mt-1 text-xs font-semibold leading-tight text-black/66">Translates physics predictions into process parameters, operating windows, control policies, and experiment plans.</p>
          </div>
          <div className="rounded-2xl border border-[#0b2338]/10 bg-white/70 p-3">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#4b6b00]">04</p>
            <h3 className="mt-1 text-lg font-black uppercase leading-none tracking-tight text-[#0b2338]">Digital Twin Layer</h3>
            <p className="mt-1 text-xs font-semibold leading-tight text-black/66">Creates dynamic, physics-enabled twins for reactors, production lines, and factory-scale systems.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AbstractThreeWheelInfographic() {
  const wheels =[
    {
      eyebrow: "Wheel 1",
      title: "Discovery",
      copy: "AI compresses candidate generation from years to seconds.",
      stat: "Seconds",
      x: 420,
      y: 500,
      color: "#48cae4",
      soft: "#bdf2fb",
    },
    {
      eyebrow: "Wheel 2",
      title: "Scale-Up",
      copy: "The valley: manual iteration, process risk, and lost time.",
      stat: "~$50M / 2.5Y",
      x: 800,
      y: 500,
      color: "#72d7d3",
      soft: "#d7f4ee",
    },
    {
      eyebrow: "Wheel 3",
      title: "Production",
      copy: "The prize: repeatable manufacturing and profitable output.",
      stat: "Profitability",
      x: 1180,
      y: 500,
      color: "#b5ff48",
      soft: "#e6ffd3",
    },
  ];

  return (
    <section className="relative aspect-[16/9] w-full max-w-[1500px] overflow-hidden rounded-[2rem] border border-black/10 bg-[#f6f5ef] shadow-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_28%,rgba(72,202,228,0.16),transparent_24%),radial-gradient(circle_at_74%_28%,rgba(181,255,72,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(238,243,238,0.96))]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Abstract three wheel scale-up infographic">
        <defs>
          <linearGradient id="wheelBridge" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#48cae4" />
            <stop offset="0.5" stopColor="#72d7d3" />
            <stop offset="1" stopColor="#b5ff48" />
          </linearGradient>
          <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="0.58" stopColor="#48cae4" stopOpacity="0.12" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id="wheelShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#0b2338" floodOpacity="0.13" />
          </filter>
        </defs>

        <rect width="1600" height="900" fill="#f6f5ef" />
        <g stroke="#cfd6d4" strokeWidth="1" opacity="0.42">
          {Array.from({ length: 13 }, (_, index) => (
            <path key={`wheel-grid-a-${index}`} d={`M ${-190 + index * 145} 780 L ${430 + index * 145} 420`} />
          ))}
          {Array.from({ length: 13 }, (_, index) => (
            <path key={`wheel-grid-b-${index}`} d={`M ${80 + index * 145} 420 L ${700 + index * 145} 780`} />
          ))}
        </g>

        <path d="M 420 500 C 560 390 660 390 800 500 C 940 610 1040 610 1180 500" fill="none" stroke="url(#wheelBridge)" strokeWidth="18" strokeLinecap="round" opacity="0.28" />
        <path d="M 420 500 C 560 390 660 390 800 500 C 940 610 1040 610 1180 500" fill="none" stroke="#0b2338" strokeWidth="2" strokeDasharray="10 16" strokeLinecap="round" opacity="0.34" />

        {wheels.map((wheel, wheelIndex) => (
          <g key={wheel.title} filter="url(#wheelShadow)">
            <circle cx={wheel.x} cy={wheel.y} r="176" fill="url(#wheelGlow)" />
            <circle cx={wheel.x} cy={wheel.y} r="136" fill={wheel.soft} opacity="0.74" stroke="#0b2338" strokeOpacity="0.18" strokeWidth="2" />
            <circle cx={wheel.x} cy={wheel.y} r="98" fill="#ffffff" opacity="0.78" stroke={wheel.color} strokeOpacity="0.65" strokeWidth="5" />
            <circle cx={wheel.x} cy={wheel.y} r="58" fill={wheel.color} opacity="0.22" />
            {Array.from({ length: 12 }, (_, index) => {
              const angle = (index / 12) * Math.PI * 2 + wheelIndex * 0.18;
              const inner = 112;
              const outer = 136;
              return (
                <line
                  key={`${wheel.title}-tick-${index}`}
                  x1={wheel.x + Math.cos(angle) * inner}
                  y1={wheel.y + Math.sin(angle) * inner}
                  x2={wheel.x + Math.cos(angle) * outer}
                  y2={wheel.y + Math.sin(angle) * outer}
                  stroke="#0b2338"
                  strokeOpacity="0.22"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              );
            })}
            <path d={`M ${wheel.x - 46} ${wheel.y} C ${wheel.x - 24} ${wheel.y - 38} ${wheel.x + 28} ${wheel.y - 38} ${wheel.x + 50} ${wheel.y} C ${wheel.x + 28} ${wheel.y + 38} ${wheel.x - 24} ${wheel.y + 38} ${wheel.x - 46} ${wheel.y} Z`} fill="none" stroke="#0b2338" strokeOpacity="0.5" strokeWidth="4" />
            <circle cx={wheel.x + 8} cy={wheel.y} r="11" fill={wheel.color} />
          </g>
        ))}
      </svg>

      <div className="absolute left-1/2 top-[8%] w-[760px] max-w-[72%] -translate-x-1/2 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#4b6b00]">Continuous physical IP</p>
        <h2 className="mt-3 text-5xl font-medium uppercase leading-none tracking-tight text-[#111]">The Three Wheels of Scale-Up</h2>
        <p className="mx-auto mt-4 max-w-[600px] text-lg font-light leading-tight text-black/62">Discovery, scale-up, and production must turn together. When the middle wheel stalls, the whole machine stops.</p>
      </div>

      <div className="absolute left-[7%] top-[61%] w-[86%] grid grid-cols-3 gap-5">
        {wheels.map((wheel) => (
          <div key={wheel.title} className="rounded-2xl border border-black/10 bg-white/70 p-5 text-center shadow-sm backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#4b6b00]">{wheel.eyebrow}</p>
            <h3 className="mt-2 text-2xl font-black uppercase leading-none tracking-tight text-[#0b2338]">{wheel.title}</h3>
            <p className="mx-auto mt-3 max-w-[300px] text-sm font-medium leading-tight text-black/62">{wheel.copy}</p>
            <p className="mt-4 text-xl font-black uppercase leading-none tracking-tight text-[#0b2338]">{wheel.stat}</p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[4%] left-1/2 w-[560px] max-w-[60%] -translate-x-1/2 rounded-full border border-black/10 bg-white/72 px-6 py-3 text-center shadow-sm backdrop-blur-xl">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-black/46">The cost to scale: ~$50M and 2.5 years, driven by 30+ manual iterations.</p>
      </div>
    </section>
  );
}

function PhysicsAiArchitectureRingsInfographic() {
  const rings =[
    {
      number: "01",
      title: "Input Engine",
      tag: "Data moat",
      copy: "Synthetic simulations, process knowledge, partner ground truth.",
      cx: 210,
      cy: 692,
      outer: 382,
      inner: 166,
      colors:["#78cfe2", "#5abed5", "#9ee2ee", "#3caac3"],
      rotate: -0.32,
      labelClass: "left-[7%] top-[39%] w-[25%]",
    },
    {
      number: "02",
      title: "Core Model",
      tag: "One latent space",
      copy: "Multi-scale physics unified inside one continuous model.",
      cx: 800,
      cy: 666,
      outer: 430,
      inner: 178,
      colors:["#61d2c8", "#8be4d8", "#38b6bd", "#b5f6df"],
      rotate: -0.1,
      labelClass: "left-1/2 top-[36%] w-[26%] -translate-x-1/2",
    },
    {
      number: "03",
      title: "Digital Brain",
      tag: "Realization",
      copy: "Production blueprint, dynamic twin, factory feedback loop.",
      cx: 1392,
      cy: 692,
      outer: 382,
      inner: 166,
      colors:["#b5ff48", "#8fd64e", "#d6ff8c", "#74b847"],
      rotate: 0.24,
      labelClass: "right-[7%] top-[39%] w-[25%]",
    },
  ];

  function point(cx: number, cy: number, angle: number, radius: number, scaleY = 0.72) {
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius * scaleY,
    };
  }

  function ribbonFacetPath(cx: number, cy: number, outer: number, inner: number, start: number, end: number, offset: number, scaleY = 0.72) {
    const mid = (start + end) / 2;
    const p1 = point(cx, cy, start, outer - offset, scaleY);
    const p2 = point(cx, cy, mid, outer - offset * 0.4, scaleY);
    const p3 = point(cx, cy, end, outer - offset * 0.9, scaleY);
    const p4 = point(cx, cy, end, inner + offset * 0.45, scaleY);
    const p5 = point(cx, cy, mid, inner + offset * 0.2, scaleY);
    const p6 = point(cx, cy, start, inner + offset * 0.75, scaleY);
    return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} L ${p5.x} ${p5.y} L ${p6.x} ${p6.y} Z`;
  }

  return (
    <section className="relative aspect-[16/9] w-full max-w-[1500px] overflow-hidden rounded-[2rem] border border-black/10 bg-[#f6f5ef] shadow-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_78%,rgba(72,202,228,0.18),transparent_26%),radial-gradient(circle_at_79%_78%,rgba(181,255,72,0.18),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(238,243,238,0.95))]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Low poly three wheel Physics AI Architecture infographic">
        <defs>
          <filter id="polyRingShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="26" stdDeviation="18" floodColor="#0b2338" floodOpacity="0.18" />
          </filter>
          <linearGradient id="ringLoopStroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#48cae4" />
            <stop offset="0.52" stopColor="#5bd6ca" />
            <stop offset="1" stopColor="#b5ff48" />
          </linearGradient>
          {rings.map((ring) => (
            <mask key={`${ring.title}-mask`} id={`tubeMask${ring.number}`}>
              <rect width="1600" height="900" fill="black" />
              <ellipse cx={ring.cx} cy={ring.cy} rx={ring.outer} ry={ring.outer * 0.72} fill="white" />
              <ellipse cx={ring.cx} cy={ring.cy} rx={ring.inner} ry={ring.inner * 0.72} fill="black" />
            </mask>
          ))}
        </defs>

        <rect width="1600" height="900" fill="#f6f5ef" />
        <g stroke="#cfd6d4" strokeWidth="1" opacity="0.34">
          {Array.from({ length: 12 }, (_, index) => (
            <path key={`poly-grid-a-${index}`} d={`M ${-180 + index * 155} 775 L ${475 + index * 155} 395`} />
          ))}
          {Array.from({ length: 12 }, (_, index) => (
            <path key={`poly-grid-b-${index}`} d={`M ${65 + index * 155} 395 L ${720 + index * 155} 775`} />
          ))}
        </g>

        {rings.map((ring, ringIndex) => (
          <g key={ring.title} filter="url(#polyRingShadow)" mask={`url(#tubeMask${ring.number})`} transform={`rotate(${ring.rotate * 57.2958} ${ring.cx} ${ring.cy})`}>
            <ellipse cx={ring.cx} cy={ring.cy} rx={ring.outer} ry={ring.outer * 0.72} fill={ring.colors[1]} opacity="0.88" />
            <ellipse cx={ring.cx - ring.outer * 0.16} cy={ring.cy - ring.outer * 0.08} rx={ring.outer * 0.72} ry={ring.outer * 0.36} fill="#ffffff" opacity="0.16" />
            {Array.from({ length: 28 }, (_, index) => {
              const start = -Math.PI + (index / 28) * Math.PI * 2 + ringIndex * 0.04;
              const end = -Math.PI + ((index + 1.08) / 28) * Math.PI * 2 + ringIndex * 0.04;
              const offset = 8 + ((index * 11 + ringIndex * 7) % 42);
              return (
                <path
                  key={`${ring.title}-facet-${index}`}
                  d={ribbonFacetPath(ring.cx, ring.cy, ring.outer - (index % 3) * 4, ring.inner + (index % 2) * 8, start, end, offset)}
                  fill={ring.colors[index % ring.colors.length]}
                  stroke="#0b2338"
                  strokeOpacity="0.18"
                  strokeWidth="1.5"
                  opacity={0.6 + (index % 4) * 0.08}
                />
              );
            })}
            <g stroke="#0b2338" strokeOpacity="0.22" strokeWidth="1.5" fill="none">
              {Array.from({ length: 24 }, (_, index) => {
                const a = -Math.PI + (index / 24) * Math.PI * 2;
                const b = -Math.PI + ((index + 1.35) / 24) * Math.PI * 2;
                const p1 = point(ring.cx, ring.cy, a, ring.outer - 18 - (index % 3) * 18);
                const p2 = point(ring.cx, ring.cy, b, ring.inner + 20 + (index % 4) * 28);
                return <path key={`${ring.title}-crease-${index}`} d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`} />;
              })}
              {Array.from({ length: 12 }, (_, index) => {
                const a = -Math.PI + (index / 12) * Math.PI * 2 + 0.1;
                const b = -Math.PI + ((index + 0.75) / 12) * Math.PI * 2 + 0.1;
                const p1 = point(ring.cx, ring.cy, a, ring.outer - 52);
                const p2 = point(ring.cx, ring.cy, b, ring.outer - 105);
                const p3 = point(ring.cx, ring.cy, a + 0.34, ring.inner + 42);
                return <path key={`${ring.title}-tri-${index}`} d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`} />;
              })}
            </g>
            <ellipse cx={ring.cx} cy={ring.cy} rx={ring.inner} ry={ring.inner * 0.72} fill="#f6f5ef" opacity="0.98" />
            <ellipse cx={ring.cx} cy={ring.cy} rx={ring.inner} ry={ring.inner * 0.72} fill="none" stroke="#0b2338" strokeOpacity="0.24" strokeWidth="2" />
          </g>
        ))}

        <path d="M 332 694 C 500 542 620 542 764 662 C 925 796 1064 792 1278 662" fill="none" stroke="url(#ringLoopStroke)" strokeWidth="15" strokeLinecap="round" opacity="0.16" />
      </svg>

      <div className="absolute left-1/2 top-[7%] w-[860px] max-w-[76%] -translate-x-1/2 text-center">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#4b6b00]">Our core IP</p>
        <h2 className="mt-3 text-5xl font-black uppercase leading-none text-[#0b2338]">The Physics-AI Architecture</h2>
        <p className="mx-auto mt-4 max-w-[700px] text-lg font-semibold leading-tight text-black/62">A single digital system that unifies complex physics and learns from the real world.</p>
      </div>

      {rings.map((ring) => (
        <div key={ring.title} className={`absolute ${ring.labelClass} rounded-3xl border border-[#0b2338]/10 bg-white/62 p-4 text-center shadow-[0_20px_70px_rgba(11,35,56,0.1)] backdrop-blur-xl`}>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#4b6b00]">{ring.number} / {ring.tag}</p>
          <h3 className="mt-2 text-xl font-black uppercase leading-none text-[#0b2338]">{ring.title}</h3>
          <p className="mx-auto mt-3 max-w-[290px] text-xs font-semibold leading-tight text-black/62">{ring.copy}</p>
        </div>
      ))}

      <div className="absolute bottom-[5%] left-1/2 w-[610px] max-w-[62%] -translate-x-1/2 rounded-full border border-[#0b2338]/10 bg-[#f7f5ea]/68 px-6 py-3 text-center shadow-sm backdrop-blur-xl">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b2338]">Factory data feeds back. The World Model compounds.</p>
      </div>
    </section>
  );
}

function PhysicsAiArchitectureImageInfographic() {
  const cards =[
    {
      number: "01",
      title: "Input Engine",
      tag: "Data Moat",
      lines:["Synthetic simulations", "Domain process knowledge", "Partner ground-truth"],
      className: "left-[5.5%] top-[22%] w-[27%] text-left",
    },
    {
      number: "02",
      title: "Core Model",
      tag: "One Latent Space",
      lines:["Fluids", "Thermo", "Chemistry", "Scale-up"],
      className: "left-1/2 bottom-[9%] w-[30%] -translate-x-1/2 text-center",
    },
    {
      number: "03",
      title: "Digital Brain",
      tag: "Realization & Refinement",
      lines:["Production blueprint", "Dynamic twin", "Factory feedback loop"],
      className: "right-[5.5%] top-[21%] w-[27%] text-right",
    },
  ];

  return (
    <section className="relative aspect-[16/9] w-full max-w-[1500px] overflow-hidden rounded-[2rem] border border-black/10 bg-[#f6f5ef] shadow-2xl">
      <Image
        src="/make_them_much_larger_covering_202605011255.jpeg"
        alt="Physics-AI architecture loop system"
        fill
        priority={false}
        sizes="(max-width: 1500px) 100vw, 1500px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(246,245,239,0.7),rgba(246,245,239,0.04)_30%,rgba(246,245,239,0.1)_70%,rgba(246,245,239,0.44)),linear-gradient(90deg,rgba(246,245,239,0.36),rgba(246,245,239,0.02)_35%,rgba(246,245,239,0.3))]" />

      <div className="absolute left-1/2 top-[6%] w-[820px] max-w-[74%] -translate-x-1/2 text-center">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#4b6b00]">Our core IP</p>
        <h2 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight text-[#0b2338]">The Physics-AI Architecture</h2>
        <p className="mx-auto mt-4 max-w-[650px] text-lg font-semibold leading-tight text-black/64">Unifying complex physics into one digital system that learns from the real world.</p>
      </div>

      {cards.map((card) => (
        <div key={card.title} className={`absolute ${card.className} rounded-3xl border border-[#0b2338]/10 bg-[#f7f5ea]/64 p-5 shadow-[0_22px_70px_rgba(11,35,56,0.13)] backdrop-blur-xl`}>
          <div className="flex items-start justify-between gap-4">
            <div className={card.className.includes("text-right") ? "order-2" : ""}>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#4b6b00]">{card.number} / {card.tag}</p>
              <h3 className="mt-2 text-2xl font-black uppercase leading-none tracking-tight text-[#0b2338]">{card.title}</h3>
            </div>
            <p className="text-4xl font-black leading-none tracking-tight text-[#48cae4]">{card.number}</p>
          </div>
          <div className={`mt-4 flex flex-wrap gap-2 ${card.className.includes("text-right") ? "justify-end" : card.className.includes("text-center") ? "justify-center" : ""}`}>
            {card.lines.map((line) => (
              <span key={line} className="rounded-full border border-[#0b2338]/10 bg-white/48 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#0b2338]/70">
                {line}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function ClosingRealityGapPanelInfographic() {
  const cards =[
    {
      number: "01",
      title: "Discovery Layer",
      tag: "Discovery",
      copy: "Atomic, molecular, biological, and material discovery.",
      className: "left-[7%] top-[55%] w-[21%]",
    },
    {
      number: "02",
      title: "Mesoscale Physics",
      tag: "Core bridge",
      copy: "Simulates mixing, shear, heat, mass transfer, reactions, phases, and instability.",
      className: "left-[30%] top-[48%] w-[24%]",
    },
    {
      number: "03",
      title: "Control Layer",
      tag: "Operating window",
      copy: "Turns predictions into process parameters, policies, and experiment plans.",
      className: "left-[55%] top-[42%] w-[22%]",
    },
    {
      number: "04",
      title: "Digital Twin",
      tag: "Factory systems",
      copy: "Physics-enabled twins for reactors, production lines, and factories.",
      className: "right-[5%] top-[56%] w-[21%]",
    },
  ];

  return (
    <section className="relative aspect-[16/9] w-full max-w-[1500px] overflow-hidden rounded-[2rem] border border-black/10 bg-[#f6f5ef] shadow-2xl">
      <Image
        src="/can_you_make_it_super_202605011206.jpeg"
        alt="Physics AI architecture panels from molecule to factory"
        fill
        priority={false}
        sizes="(max-width: 1500px) 100vw, 1500px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(246,245,239,0.74),rgba(246,245,239,0.08)_34%,rgba(246,245,239,0.18)),linear-gradient(90deg,rgba(246,245,239,0.28),rgba(246,245,239,0.02)_36%,rgba(246,245,239,0.26))]" />

      <div className="absolute left-[7%] top-[8%] max-w-[630px]">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#4b6b00]">Four continuous layers</p>
        <h2 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight text-[#0b2338]">The World Foundational Model</h2>
        <p className="mt-4 max-w-[560px] text-lg font-semibold leading-tight text-black/64">A continuous physics AI model learning the thread between molecules, materials, processes, and factories.</p>
      </div>

      {cards.map((card) => (
        <div key={card.title} className={`absolute ${card.className} rounded-3xl border border-[#0b2338]/10 bg-white/64 p-5 shadow-[0_22px_70px_rgba(11,35,56,0.12)] backdrop-blur-xl`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#4b6b00]">{card.tag}</p>
              <h3 className="mt-2 text-2xl font-black uppercase leading-none tracking-tight text-[#0b2338]">{card.title}</h3>
            </div>
            <p className="text-4xl font-black leading-none tracking-tight text-[#48cae4]">{card.number}</p>
          </div>
          <p className="mt-4 text-sm font-semibold leading-tight text-black/62">{card.copy}</p>
        </div>
      ))}

      <div className="absolute bottom-[8%] right-[7%] w-[420px] rounded-full border border-[#0b2338]/10 bg-[#f7f5ea]/78 px-6 py-4 text-center shadow-sm backdrop-blur-xl">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b2338]">Discovery to factory, one continuous model.</p>
      </div>
    </section>
  );
}

function ClosingRealityGapWaveInfographic() {
  const steps =[
    ["Discovery", "Atoms, molecules, biology, materials"],
    ["Mesoscale Engine", "Mixing, shear, heat, mass transfer, reactions"],
    ["Control", "Parameters, windows, policies, experiments"],
    ["Digital Twin", "Reactors, lines, and factory-scale systems"],
  ];

  return (
    <section className="relative aspect-[16/9] w-full max-w-[1500px] overflow-hidden rounded-[2rem] border border-black/10 bg-[#f6f5ef] shadow-2xl">
      <Image
        src="/remove_the_molecule_type_wave_202605011212.jpeg"
        alt="Continuous physics wave connecting molecule, process model, dashboards, and factory"
        fill
        priority={false}
        sizes="(max-width: 1500px) 100vw, 1500px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(246,245,239,0.82),rgba(246,245,239,0.08)_42%,rgba(246,245,239,0.18)),radial-gradient(circle_at_17%_76%,rgba(72,202,228,0.16),transparent_22%),radial-gradient(circle_at_78%_57%,rgba(181,255,72,0.14),transparent_22%)]" />

      <div className="absolute left-1/2 top-[7%] w-[860px] max-w-[76%] -translate-x-1/2 text-center">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#4b6b00]">The World Foundational Model</p>
        <h2 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight text-[#0b2338]">Molecules to Factories</h2>
        <p className="mx-auto mt-4 max-w-[700px] text-lg font-semibold leading-tight text-black/62">A continuous physics AI model connecting discovery, mesoscale physics, control, and digital twins.</p>
      </div>

      <div className="absolute left-[6%] top-[63%] grid w-[88%] grid-cols-4 gap-3">
        {steps.map(([title, copy], index) => (
          <div key={title} className="rounded-3xl border border-[#0b2338]/10 bg-white/64 p-4 text-center shadow-[0_18px_60px_rgba(11,35,56,0.1)] backdrop-blur-xl">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#4b6b00]">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-xl font-black uppercase leading-none tracking-tight text-[#0b2338]">{title}</h3>
            <p className="mx-auto mt-3 max-w-[290px] text-sm font-semibold leading-tight text-black/62">{copy}</p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[6%] left-1/2 w-[560px] max-w-[60%] -translate-x-1/2 rounded-full border border-[#0b2338]/10 bg-[#f7f5ea]/76 px-6 py-3 text-center shadow-sm backdrop-blur-xl">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b2338]">Learning the thread of physics across scale.</p>
      </div>
    </section>
  );
}

export default function ValleyOfDeathPage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 overflow-hidden bg-[#f6f5ef] px-4 py-8 text-[#111]">
      <section className="relative aspect-[16/9] w-full max-w-[1500px] overflow-hidden rounded-[2rem] border border-black/10 bg-[#f6f5ef] shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(72,202,228,0.16),transparent_28%),radial-gradient(circle_at_76%_18%,rgba(181,255,72,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(238,240,236,0.92))]" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Minimal dark Valley of Death pitch deck diagram"
        >
          <defs>
            <linearGradient id="leftMountain" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#8bbccc" />
              <stop offset="1" stopColor="#48cae4" />
            </linearGradient>
            <linearGradient id="rightMountain" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#87b7af" />
              <stop offset="1" stopColor="#b5ff48" />
            </linearGradient>
            <linearGradient id="mountainFade" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#f6f5ef" stopOpacity="0" />
              <stop offset="0.62" stopColor="#f6f5ef" stopOpacity="0.62" />
              <stop offset="1" stopColor="#f6f5ef" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="valleyGlow" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#48cae4" stopOpacity="0" />
              <stop offset="0.56" stopColor="#48cae4" stopOpacity="0.18" />
              <stop offset="1" stopColor="#48cae4" stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id="valleyBase" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#48cae4" stopOpacity="0.2" />
              <stop offset="0.52" stopColor="#dfe5e3" stopOpacity="0.78" />
              <stop offset="1" stopColor="#aeb8b7" stopOpacity="0.96" />
            </linearGradient>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#b5ff48" stopOpacity="0.34" />
              <stop offset="0.46" stopColor="#48cae4" stopOpacity="0.1" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1600" height="900" fill="#f6f5ef" />
          <g stroke="#cfd6d4" strokeWidth="1" opacity="0.42">
            {Array.from({ length: 15 }, (_, index) => (
              <path key={`valley-grid-a-${index}`} d={`M ${-260 + index * 140} 840 L ${500 + index * 140} 410`} />
            ))}
            {Array.from({ length: 15 }, (_, index) => (
              <path key={`valley-grid-b-${index}`} d={`M ${-120 + index * 140} 400 L ${640 + index * 140} 840`} />
            ))}
          </g>
          <circle cx="1120" cy="230" r="210" fill="url(#sunGlow)" />
          <circle cx="1120" cy="230" r="112" fill="#b5ff48" opacity="0.1" />

          <path
            d="M 0 820 L 0 594 C 78 570 125 548 173 510 C 217 475 244 448 305 438 C 362 429 407 456 466 473 C 520 488 588 492 660 522 L 698 638 L 742 754 L 770 820 Z"
            fill="url(#leftMountain)"
            opacity="0.84"
          />
          <path
            d="M 590 500 L 660 522 L 698 638 L 742 754 L 770 820 L 714 820 L 665 700 L 626 558 Z"
            fill="#60757b"
            opacity="0.34"
          />
          <path
            d="M 830 820 L 870 754 L 922 622 L 965 550 L 1008 536 L 1058 355 C 1080 310 1102 262 1124 205 C 1150 137 1190 98 1244 98 C 1302 98 1351 142 1388 204 C 1428 270 1460 336 1492 410 C 1526 489 1564 540 1600 568 L 1600 820 Z"
            fill="url(#rightMountain)"
            opacity="0.82"
          />
          <path
            d="M 830 820 L 870 754 L 922 622 L 965 550 L 1008 536 L 966 668 L 906 758 L 860 820 Z"
            fill="#7b8e8c"
            opacity="0.38"
          />
          <path
            d="M 690 520 L 770 820 L 830 820 L 930 520 L 1018 520 L 880 820 L 720 820 L 610 520 Z"
            fill="url(#valleyGlow)"
          />
          <path
            d="M 690 720 C 730 698 782 690 832 704 C 870 714 912 712 952 696 L 892 820 L 708 820 Z"
            fill="url(#valleyBase)"
            opacity="0.92"
          />
          <path
            d="M 708 792 C 755 769 834 768 892 792"
            fill="none"
            stroke="#48cae4"
            strokeLinecap="round"
            strokeWidth="2"
            opacity="0.26"
          />
          <path
            d="M 1058 355 C 1080 310 1102 262 1124 205 C 1150 137 1190 98 1244 98 C 1288 98 1328 124 1362 168 C 1322 238 1280 304 1232 372 C 1188 435 1142 489 1094 522 L 1008 536 Z"
            fill="#ffffff"
            opacity="0.22"
          />

          <rect x="1040" y="0" width="560" height="900" fill="url(#mountainFade)" />
        </svg>

        <div className="absolute left-[9%] top-[53%] max-w-[455px]">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#4b6b00]">Discovery</p>
          <h2 className="mt-3 text-4xl font-medium uppercase leading-none tracking-tight text-[#111]">AI has accelerated discovery</h2>
          <div className="mt-5 space-y-2 text-base font-light leading-snug text-black/66">
            <p>Biology: AlphaFold 3, Evo 2</p>
            <p>Materials &amp; Chemistry: GNoME, MatterGen</p>
          </div>
        </div>

        <div className="absolute right-[7%] top-[47%] max-w-[410px] text-right">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#4b6b00]">Production Realization</p>
          <h2 className="mt-3 text-4xl font-medium uppercase leading-none tracking-tight text-[#111]">Physical production still lags</h2>
          <p className="ml-auto mt-5 max-w-[330px] text-base font-light leading-snug text-black/64">Scale-up breaks across batteries, biologics, catalysts, materials, semiconductors, and factories.</p>
        </div>

        <div className="absolute left-1/2 top-[11%] w-[600px] max-w-[45%] -translate-x-1/2 text-center">
          <h1 className="text-5xl font-medium uppercase leading-none tracking-tight text-[#111]">Valley of Death</h1>
          <p className="mx-auto mt-4 max-w-[520px] text-xl font-light leading-tight tracking-tight text-black/62">Models propose discoveries; physical production lags.</p>
        </div>

        <div className="absolute bottom-[13%] left-1/2 w-[320px] -translate-x-1/2 rounded-[1.25rem] border border-black/10 bg-white/64 px-5 py-4 text-center shadow-lg backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#4b6b00]">To cross the valley</p>
          <p className="mt-3 text-3xl font-medium uppercase leading-none tracking-tight text-[#111]">2.5B and 1.5 years wasted</p>
        </div>
      </section>

      <section className="relative aspect-[16/9] w-full max-w-[1500px] overflow-hidden rounded-[2rem] border border-black/10 bg-[#f6f5ef] shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(72,202,228,0.16),transparent_28%),radial-gradient(circle_at_76%_18%,rgba(181,255,72,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(238,240,236,0.92))]" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Discovery to industrial production valley of death diagram"
        >
          <defs>
            <linearGradient id="leftMountainProduction" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#8bbccc" />
              <stop offset="1" stopColor="#48cae4" />
            </linearGradient>
            <linearGradient id="rightMountainProduction" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#87b7af" />
              <stop offset="1" stopColor="#b5ff48" />
            </linearGradient>
            <linearGradient id="mountainFadeProduction" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#f6f5ef" stopOpacity="0" />
              <stop offset="0.62" stopColor="#f6f5ef" stopOpacity="0.62" />
              <stop offset="1" stopColor="#f6f5ef" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="valleyGlowProduction" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#48cae4" stopOpacity="0" />
              <stop offset="0.56" stopColor="#48cae4" stopOpacity="0.18" />
              <stop offset="1" stopColor="#48cae4" stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id="valleyBaseProduction" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#48cae4" stopOpacity="0.2" />
              <stop offset="0.52" stopColor="#dfe5e3" stopOpacity="0.78" />
              <stop offset="1" stopColor="#aeb8b7" stopOpacity="0.96" />
            </linearGradient>
            <radialGradient id="sunGlowProduction" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#b5ff48" stopOpacity="0.34" />
              <stop offset="0.46" stopColor="#48cae4" stopOpacity="0.1" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1600" height="900" fill="#f6f5ef" />
          <g stroke="#cfd6d4" strokeWidth="1" opacity="0.42">
            {Array.from({ length: 15 }, (_, index) => (
              <path key={`production-valley-grid-a-${index}`} d={`M ${-260 + index * 140} 840 L ${500 + index * 140} 410`} />
            ))}
            {Array.from({ length: 15 }, (_, index) => (
              <path key={`production-valley-grid-b-${index}`} d={`M ${-120 + index * 140} 400 L ${640 + index * 140} 840`} />
            ))}
          </g>
          <circle cx="1120" cy="230" r="210" fill="url(#sunGlowProduction)" />
          <circle cx="1120" cy="230" r="112" fill="#b5ff48" opacity="0.1" />

          <path
            d="M 0 820 L 0 594 C 78 570 125 548 173 510 C 217 475 244 448 305 438 C 362 429 407 456 466 473 C 520 488 588 492 660 522 L 698 638 L 742 754 L 770 820 Z"
            fill="url(#leftMountainProduction)"
            opacity="0.84"
          />
          <path
            d="M 590 500 L 660 522 L 698 638 L 742 754 L 770 820 L 714 820 L 665 700 L 626 558 Z"
            fill="#60757b"
            opacity="0.34"
          />
          <path
            d="M 830 820 L 870 754 L 922 622 L 965 550 L 1008 536 L 1058 355 C 1080 310 1102 262 1124 205 C 1150 137 1190 98 1244 98 C 1302 98 1351 142 1388 204 C 1428 270 1460 336 1492 410 C 1526 489 1564 540 1600 568 L 1600 820 Z"
            fill="url(#rightMountainProduction)"
            opacity="0.82"
          />
          <path
            d="M 830 820 L 870 754 L 922 622 L 965 550 L 1008 536 L 966 668 L 906 758 L 860 820 Z"
            fill="#7b8e8c"
            opacity="0.38"
          />
          <path
            d="M 690 520 L 770 820 L 830 820 L 930 520 L 1018 520 L 880 820 L 720 820 L 610 520 Z"
            fill="url(#valleyGlowProduction)"
          />
          <path
            d="M 690 720 C 730 698 782 690 832 704 C 870 714 912 712 952 696 L 892 820 L 708 820 Z"
            fill="url(#valleyBaseProduction)"
            opacity="0.92"
          />
          <path
            d="M 708 792 C 755 769 834 768 892 792"
            fill="none"
            stroke="#48cae4"
            strokeLinecap="round"
            strokeWidth="2"
            opacity="0.26"
          />
          <path
            d="M 1058 355 C 1080 310 1102 262 1124 205 C 1150 137 1190 98 1244 98 C 1288 98 1328 124 1362 168 C 1322 238 1280 304 1232 372 C 1188 435 1142 489 1094 522 L 1008 536 Z"
            fill="#ffffff"
            opacity="0.22"
          />

          <rect x="1040" y="0" width="560" height="900" fill="url(#mountainFadeProduction)" />
        </svg>

        <div className="absolute left-[9%] top-[52%] max-w-[430px]">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#4b6b00]">Discovery</p>
          <h2 className="mt-3 text-4xl font-medium uppercase leading-none tracking-tight text-[#111]">AI has accelerated discovery</h2>
          <div className="mt-5 space-y-2 text-base font-light leading-snug text-black/66">
            <p>Biology: AlphaFold 3, Evo 2</p>
            <p>Materials &amp; Chemistry: GNoME, MatterGen</p>
          </div>
        </div>

        <div className="absolute right-[7%] top-[48%] max-w-[390px] text-right">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#4b6b00]">Production Realization</p>
          <p className="ml-auto mt-4 max-w-[350px] text-base font-light leading-snug text-black/64">Scale-up breaks across batteries, biologics, catalysts, materials, semiconductors, and factories.</p>
        </div>

        <div className="absolute right-[7%] top-[9%] w-[560px] max-w-[42%] text-right">
          <h1 className="text-5xl font-medium uppercase leading-none tracking-tight text-[#111]">Discovery to Industrial Production</h1>
        </div>

        <div className="absolute left-1/2 top-[57%] w-[380px] max-w-[30%] -translate-x-1/2 text-center">
          <div className="mx-auto space-y-2 text-base font-light leading-tight tracking-tight text-black/62">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#4b6b00]">The Disconnect</p>
            <p>Models propose discoveries; production lags.</p>
          </div>
        </div>

        <div className="absolute bottom-[16%] left-1/2 w-[440px] max-w-[36%] -translate-x-1/2 rounded-[1.25rem] border border-black/10 bg-white/64 px-5 py-4 text-center shadow-lg backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#4b6b00]">Valley of Death</p>
          <p className="mt-3 text-lg font-medium uppercase leading-tight tracking-tight text-[#111]">The gap between quantum/micro scale and the factory floor costs ~$50 Million &amp; 2.5 Years</p>
          <p className="mt-3 text-sm font-light leading-snug text-black/62">Driven by 30+ manual lab iterations at $1.5M+ each.</p>
        </div>
      </section>

      <AbstractThreeWheelInfographic />

      <PhysicsAiArchitectureRingsInfographic />

      <PhysicsAiArchitectureImageInfographic />

      <ClosingRealityGapPanelInfographic />

      <ClosingRealityGapWaveInfographic />

      <section className="relative aspect-[16/9] w-full max-w-[1500px] overflow-hidden rounded-[2rem] border border-black/10 bg-[#f6f5ef] shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(181,255,72,0.16),transparent_24%),radial-gradient(circle_at_78%_34%,rgba(72,202,228,0.1),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(238,240,236,0.92))]" />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Closing the reality gap unified physics architecture diagram">
          <defs>
            <linearGradient id="mapTile" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#e9ece8" />
            </linearGradient>
            <linearGradient id="mapSide" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#cfd6d4" />
              <stop offset="1" stopColor="#aeb8b7" />
            </linearGradient>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#b5ff48" stopOpacity="0.28" />
              <stop offset="0.58" stopColor="#48cae4" stopOpacity="0.08" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1600" height="900" fill="#f6f5ef" />
          <g stroke="#cfd6d4" strokeWidth="1" opacity="0.5">
            {Array.from({ length: 15 }, (_, index) => (
              <path key={`grid-a-${index}`} d={`M ${-220 + index * 140} 790 L ${520 + index * 140} 370`} />
            ))}
            {Array.from({ length: 15 }, (_, index) => (
              <path key={`grid-b-${index}`} d={`M ${-80 + index * 140} 365 L ${660 + index * 140} 790`} />
            ))}
          </g>
          <circle cx="800" cy="464" r="390" fill="url(#mapGlow)" />

          <path d="M 230 520 L 458 398 L 675 520 L 448 650 Z" fill="url(#mapTile)" stroke="#222" strokeOpacity="0.32" strokeWidth="2" />
          <path d="M 230 520 L 448 650 L 448 688 L 230 558 Z" fill="url(#mapSide)" />
          <path d="M 448 650 L 675 520 L 675 558 L 448 688 Z" fill="#c1cac8" />

          <path d="M 620 420 L 800 320 L 980 420 L 800 524 Z" fill="url(#mapTile)" stroke="#222" strokeOpacity="0.38" strokeWidth="2" />
          <path d="M 620 420 L 800 524 L 800 566 L 620 462 Z" fill="url(#mapSide)" />
          <path d="M 800 524 L 980 420 L 980 462 L 800 566 Z" fill="#c1cac8" />

          <path d="M 925 555 L 1155 424 L 1376 548 L 1144 682 Z" fill="url(#mapTile)" stroke="#222" strokeOpacity="0.32" strokeWidth="2" />
          <path d="M 925 555 L 1144 682 L 1144 720 L 925 593 Z" fill="url(#mapSide)" />
          <path d="M 1144 682 L 1376 548 L 1376 586 L 1144 720 Z" fill="#c1cac8" />

          <path d="M 516 534 C 606 512 666 470 728 432" fill="none" stroke="#222" strokeLinecap="round" strokeWidth="12" opacity="0.12" />
          <path d="M 516 534 C 606 512 666 470 728 432" fill="none" stroke="#222" strokeLinecap="round" strokeWidth="3" opacity="0.66" />
          <path d="M 890 432 C 988 478 1050 522 1120 594" fill="none" stroke="#222" strokeLinecap="round" strokeWidth="12" opacity="0.12" />
          <path d="M 890 432 C 988 478 1050 522 1120 594" fill="none" stroke="#222" strokeLinecap="round" strokeWidth="3" opacity="0.66" />
          <path d="M 1175 650 C 930 782 630 760 404 625" fill="none" stroke="#b5ff48" strokeDasharray="10 14" strokeLinecap="round" strokeWidth="8" opacity="0.34" />
          <path d="M 1175 650 C 930 782 630 760 404 625" fill="none" stroke="#222" strokeLinecap="round" strokeWidth="2" opacity="0.42" />

          <g opacity="0.96">
            <path d="M 372 482 L 432 448 L 492 482 L 432 516 Z" fill="#dfe5e3" stroke="#222" strokeOpacity="0.34" />
            <path d="M 392 482 L 432 460 L 472 482 L 432 504 Z" fill="#f8faf8" stroke="#222" strokeOpacity="0.48" />
            <path d="M 336 548 L 376 526 L 416 548 L 376 570 Z" fill="#dfe5e3" stroke="#222" strokeOpacity="0.25" />
            <path d="M 500 548 L 540 526 L 580 548 L 540 570 Z" fill="#dfe5e3" stroke="#222" strokeOpacity="0.25" />
            <circle cx="432" cy="482" r="12" fill="#48cae4" opacity="0.9" />
            <path d="M 324 506 L 350 492 L 376 506 L 350 520 Z M 486 458 L 512 444 L 538 458 L 512 472 Z M 526 594 L 552 580 L 578 594 L 552 608 Z" fill="#9eff6e" opacity="0.72" />
          </g>

          <g opacity="0.98">
            <circle cx="800" cy="420" r="92" fill="#b5ff48" opacity="0.18" />
            <circle cx="800" cy="420" r="58" fill="#f8faf8" stroke="#222" strokeOpacity="0.58" strokeWidth="2" />
            <path d="M 750 420 L 800 392 L 850 420 L 800 448 Z" fill="#b5ff48" opacity="0.36" />
            <path d="M 800 362 L 814 392 L 800 420 L 786 392 Z M 800 420 L 840 430 L 858 458 L 820 448 Z M 800 420 L 760 430 L 742 458 L 780 448 Z" fill="#48cae4" opacity="0.48" />
            <circle cx="800" cy="420" r="10" fill="#222" />
          </g>

          <g opacity="0.96">
            <path d="M 1060 574 L 1120 540 L 1180 574 L 1120 608 Z" fill="#b5ff48" opacity="0.18" />
            <path d="M 1084 548 L 1122 526 L 1160 548 L 1122 570 Z" fill="#f8faf8" stroke="#222" strokeOpacity="0.44" />
            <path d="M 1084 548 L 1122 570 L 1122 626 L 1084 604 Z" fill="#c8d0ce" />
            <path d="M 1122 570 L 1160 548 L 1160 604 L 1122 626 Z" fill="#e1e6e4" />
            <path d="M 1210 570 L 1256 544 L 1302 570 L 1256 596 Z" fill="#f8faf8" stroke="#222" strokeOpacity="0.38" />
            <path d="M 1210 570 L 1256 596 L 1256 650 L 1210 624 Z" fill="#c8d0ce" />
            <path d="M 1256 596 L 1302 570 L 1302 624 L 1256 650 Z" fill="#e1e6e4" />
            <path d="M 1016 624 L 1044 608 L 1072 624 L 1044 640 Z M 1186 654 L 1214 638 L 1242 654 L 1214 670 Z M 1324 548 L 1352 532 L 1380 548 L 1352 564 Z" fill="#9eff6e" opacity="0.72" />
          </g>
        </svg>

        <div className="absolute left-1/2 top-[7%] w-[760px] max-w-[70%] -translate-x-1/2 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#4b6b00]">Closing the reality gap</p>
          <h2 className="mt-3 text-5xl font-medium uppercase leading-none tracking-tight text-[#111]">Our IP: The Unified Physics Architecture</h2>
          <p className="mx-auto mt-4 max-w-[560px] text-lg font-light leading-tight text-black/62">A technical map from data to unified physics to realization.</p>
        </div>

        <div className="absolute left-[8%] top-[32%] w-[24%] text-left">
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[#4b6b00]">01 / Data Engine</p>
          <h3 className="mt-3 text-3xl font-medium uppercase leading-none tracking-tight text-[#111]">Sim + ground truth</h3>
          <p className="mt-4 max-w-[310px] text-sm font-light leading-relaxed text-black/64">Synthetic physics plus partner process data.</p>
        </div>

        <div className="absolute left-1/2 top-[72%] w-[32%] -translate-x-1/2 text-center">
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[#4b6b00]">02 / The Moat</p>
          <h3 className="mt-3 text-4xl font-medium uppercase leading-none tracking-tight text-[#111]">One physics space</h3>
          <p className="mx-auto mt-4 max-w-[360px] text-sm font-light leading-relaxed text-black/64">Molecules, heat, and flow inside one continuous latent model.</p>
        </div>

        <div className="absolute right-[8%] top-[32%] w-[24%] text-right">
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[#4b6b00]">03 / Digital Brain</p>
          <h3 className="mt-3 text-3xl font-medium uppercase leading-none tracking-tight text-[#111]">Blueprint + control</h3>
          <p className="ml-auto mt-4 max-w-[310px] text-sm font-light leading-relaxed text-black/64">A digital twin that learns from every factory run.</p>
        </div>

        <div className="absolute bottom-[7%] left-1/2 w-[620px] max-w-[58%] -translate-x-1/2 rounded-[1.5rem] border border-black/10 bg-white/70 px-6 py-4 text-center shadow-lg backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/38">Continuous refinement loop</p>
          <p className="mt-2 text-xl font-light leading-tight text-black/72">Factory data feeds back. The model compounds.</p>
        </div>
      </section>

      <WorldFoundationalModelInfographic />

      <section className="hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(72,202,228,0.13),transparent_30%),radial-gradient(circle_at_71%_74%,rgba(181,255,72,0.15),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(236,245,244,0.96))]" />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label="World Foundational Model stacked layer infographic">
          <defs>
            <linearGradient id="wfmPanel" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#d8fbf4" stopOpacity="0.92" />
              <stop offset="1" stopColor="#b9eef0" stopOpacity="0.76" />
            </linearGradient>
            <linearGradient id="wfmPanelBlue" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#dff9ff" stopOpacity="0.96" />
              <stop offset="1" stopColor="#cde7ff" stopOpacity="0.86" />
            </linearGradient>
            <linearGradient id="wfmArrow" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#48cae4" />
              <stop offset="1" stopColor="#1d7f95" />
            </linearGradient>
            <radialGradient id="vortexGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#48cae4" stopOpacity="0.62" />
              <stop offset="0.5" stopColor="#b5ff48" stopOpacity="0.2" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="screenGlow" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#0a5064" />
              <stop offset="1" stopColor="#48cae4" />
            </linearGradient>
          </defs>

          <rect width="1600" height="900" fill="#f6f5ef" />
          <g stroke="#cde0df" strokeWidth="1" opacity="0.38">
            {Array.from({ length: 12 }, (_, index) => (
              <path key={`model-grid-a-${index}`} d={`M ${-80 + index * 150} 820 L ${440 + index * 150} 520`} />
            ))}
            {Array.from({ length: 12 }, (_, index) => (
              <path key={`model-grid-b-${index}`} d={`M ${120 + index * 150} 520 L ${640 + index * 150} 820`} />
            ))}
          </g>

          <g opacity="0.34" stroke="#48cae4" strokeWidth="2" fill="none">
            <path d="M 210 190 L 238 174 L 266 190 L 266 222 L 238 238 L 210 222 Z" />
            <path d="M 145 255 L 170 240 L 195 255 L 195 284 L 170 299 L 145 284 Z" />
            <path d="M 1360 750 L 1388 734 L 1416 750 L 1416 782 L 1388 798 L 1360 782 Z" />
            <path d="M 1460 610 L 1486 595 L 1512 610 L 1512 640 L 1486 655 L 1460 640 Z" />
          </g>

          <rect x="515" y="168" width="570" height="88" rx="18" fill="url(#wfmPanel)" />
          <rect x="515" y="276" width="570" height="170" rx="22" fill="url(#wfmPanel)" />
          <rect x="515" y="466" width="570" height="112" rx="18" fill="url(#wfmPanelBlue)" />
          <rect x="515" y="598" width="570" height="150" rx="20" fill="url(#wfmPanelBlue)" />

          <path d="M 800 256 L 800 292" stroke="url(#wfmArrow)" strokeWidth="12" strokeLinecap="round" />
          <path d="M 764 288 L 800 324 L 836 288 Z" fill="url(#wfmArrow)" />
          <path d="M 800 446 L 800 478" stroke="url(#wfmArrow)" strokeWidth="12" strokeLinecap="round" />
          <path d="M 764 474 L 800 510 L 836 474 Z" fill="url(#wfmArrow)" />
          <path d="M 800 578 L 800 610" stroke="url(#wfmArrow)" strokeWidth="12" strokeLinecap="round" />
          <path d="M 764 606 L 800 642 L 836 606 Z" fill="url(#wfmArrow)" />

          <g>
            <text x="540" y="226" fill="#0b2338" fontSize="62" fontWeight="800">01</text>
            <circle cx="690" cy="212" r="31" fill="#ffffff" stroke="#0b2338" strokeOpacity="0.42" strokeWidth="3" />
            <path d="M 650 212 C 674 188 706 188 730 212 C 706 236 674 236 650 212 Z M 690 172 C 714 196 714 228 690 252 C 666 228 666 196 690 172 Z" fill="none" stroke="#0b2338" strokeWidth="3" opacity="0.72" />
            <circle cx="690" cy="212" r="6" fill="#48cae4" />
            <path d="M 770 212 L 812 188 L 854 212 L 812 236 Z" fill="#ffffff" stroke="#0b2338" strokeOpacity="0.42" strokeWidth="3" />
            <circle cx="812" cy="212" r="9" fill="#48cae4" />
            <circle cx="778" cy="196" r="7" fill="#b5ff48" />
            <circle cx="848" cy="228" r="7" fill="#b5ff48" />
            <path d="M 812 212 L 778 196 M 812 212 L 848 228" stroke="#0b2338" strokeOpacity="0.48" strokeWidth="3" />
            <path d="M 900 232 C 936 176 974 246 1010 190 M 902 192 C 938 248 974 178 1010 234" fill="none" stroke="#0b2338" strokeWidth="3" opacity="0.58" />
            <circle cx="925" cy="198" r="6" fill="#48cae4" />
            <circle cx="985" cy="226" r="6" fill="#b5ff48" />
          </g>

          <g>
            <circle cx="800" cy="360" r="94" fill="url(#vortexGlow)" />
            <path d="M 695 360 C 738 308 846 302 886 354 C 924 404 836 450 792 410 C 756 378 822 340 842 370 C 858 394 820 414 800 392" fill="none" stroke="#0b2338" strokeWidth="4" strokeLinecap="round" opacity="0.42" />
            <path d="M 720 358 C 758 326 838 318 866 360 C 892 400 826 430 796 398 C 774 374 820 352 832 374" fill="none" stroke="#48cae4" strokeWidth="9" strokeLinecap="round" opacity="0.8" />
            <path d="M 620 348 L 710 348 M 620 382 L 710 382 M 892 348 L 982 348 M 892 382 L 982 382" stroke="#0b2338" strokeOpacity="0.48" strokeWidth="3" strokeLinecap="round" />
            <path d="M 646 326 C 678 292 710 286 742 308 M 858 416 C 900 438 936 434 972 404" fill="none" stroke="#b5ff48" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
            <circle cx="630" cy="414" r="18" fill="#ffffff" stroke="#0b2338" strokeOpacity="0.38" strokeWidth="2" />
            <circle cx="970" cy="304" r="18" fill="#ffffff" stroke="#0b2338" strokeOpacity="0.38" strokeWidth="2" />
            <path d="M 622 414 L 638 414 M 630 406 L 630 422 M 962 304 L 978 304 M 970 296 L 970 312" stroke="#48cae4" strokeWidth="3" />
          </g>

          <g>
            <text x="540" y="542" fill="#0b2338" fontSize="62" fontWeight="800">03</text>
            <rect x="672" y="494" width="140" height="56" rx="8" fill="#ffffff" stroke="#0b2338" strokeOpacity="0.4" strokeWidth="2" />
            <path d="M 690 532 L 716 512 L 742 524 L 770 502 L 792 518" fill="none" stroke="#48cae4" strokeWidth="4" strokeLinecap="round" />
            <rect x="832" y="494" width="142" height="56" rx="8" fill="#ffffff" stroke="#0b2338" strokeOpacity="0.4" strokeWidth="2" />
            <circle cx="884" cy="522" r="22" fill="#48cae4" opacity="0.28" stroke="#0b2338" strokeOpacity="0.36" strokeWidth="3" />
            <path d="M 884 500 L 884 522 L 902 536" stroke="#0b2338" strokeOpacity="0.54" strokeWidth="3" strokeLinecap="round" />
            <path d="M 1006 506 L 1032 492 L 1058 506 L 1032 520 Z M 1006 536 L 1032 522 L 1058 536 L 1032 550 Z" fill="#b5ff48" opacity="0.66" stroke="#0b2338" strokeOpacity="0.24" />
          </g>

          <g>
            <text x="540" y="692" fill="#0b2338" fontSize="62" fontWeight="800">04</text>
            <path d="M 660 696 L 735 654 L 810 696 L 735 738 Z" fill="#ffffff" stroke="#0b2338" strokeOpacity="0.34" strokeWidth="2" />
            <path d="M 690 694 L 718 678 L 746 694 L 746 728 L 690 728 Z" fill="#d7e5e4" stroke="#0b2338" strokeOpacity="0.28" />
            <path d="M 758 684 L 786 668 L 814 684 L 814 728 L 758 728 Z" fill="#d7e5e4" stroke="#0b2338" strokeOpacity="0.28" />
            <path d="M 874 666 L 982 604 L 1096 666 L 988 730 Z" fill="#ffffff" stroke="#0b2338" strokeOpacity="0.36" strokeWidth="2" />
            <path d="M 924 650 L 976 620 L 1028 650 L 976 680 Z" fill="#d8fbf4" stroke="#0b2338" strokeOpacity="0.32" strokeWidth="2" />
            <path d="M 924 650 L 976 680 L 976 718 L 924 688 Z" fill="#bdd1d0" />
            <path d="M 976 680 L 1028 650 L 1028 688 L 976 718 Z" fill="#e0e9e8" />
            <rect x="1115" y="602" width="130" height="100" rx="10" fill="url(#screenGlow)" opacity="0.9" />
            <path d="M 1132 676 L 1160 650 L 1190 662 L 1224 624" fill="none" stroke="#b5ff48" strokeWidth="5" strokeLinecap="round" />
            <path d="M 1115 702 L 1060 732 L 1190 732 L 1245 702 Z" fill="#b9c7c7" opacity="0.6" />
          </g>
        </svg>

        {/* Global Section Header */}
        <div className="absolute left-1/2 top-[5%] w-[850px] max-w-[78%] -translate-x-1/2 text-center">
          <h2 className="text-5xl font-bold uppercase leading-none tracking-tight text-[#0b2338]">The World Foundational Model</h2>
          <p className="mx-auto mt-3 max-w-[650px] text-base font-light leading-tight text-black/64">A continuous physics AI model that learns the thread of physics connecting molecules, materials, processes, and factories.</p>
        </div>

        {/* Layer 01 */}
        <div className="absolute left-[68%] top-[19%] w-[26%] text-left">
          <p className="text-2xl font-bold uppercase leading-none tracking-tight text-[#0b2338]">Discovery Layer</p>
          <p className="mt-3 max-w-[330px] text-sm font-light leading-relaxed text-black/64">Integrates atomic, molecular, biological, and material discovery.</p>
        </div>

        {/* Layer 02 */}
        <div className="absolute right-[68%] top-[32%] w-[28%] flex flex-row items-start justify-end gap-5 text-right">
          <div className="pt-2">
            <h3 className="text-2xl font-bold uppercase leading-none tracking-tight text-[#0b2338]">Mesoscale Physics Engine</h3>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0b2338]">The Core Bridge</p>
            <p className="mt-1 text-sm font-light leading-relaxed text-black/64">Simulates the lab-to-production gap where most failures emerge.</p>
          </div>
          <p className="text-[5.5rem] font-black leading-none tracking-tighter text-[#0b2338]">02</p>
        </div>

        <div className="absolute left-[68%] top-[34%] w-[26%] text-left">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0b2338]">Key factors reviewed:</p>
          <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1 text-sm font-medium leading-snug text-black/66">
            <p>• Mixing</p>
            <p>• Degradation</p>
            <p>• Shear</p>
            <p>• Impurities</p>
            <p>• Heat Transfer</p>
            <p>• Instability</p>
            <p>• Mass Transfer</p>
            <p></p>
            <p>• Reaction Kinetics</p>
            <p></p>
            <p>• Phase Behavior</p>
          </div>
        </div>

        {/* Layer 03 */}
        <div className="absolute right-[68%] top-[54%] w-[26%] text-right">
          <p className="text-2xl font-bold uppercase leading-none tracking-tight text-[#0b2338]">Control Layer</p>
          <p className="mt-3 text-sm font-light leading-relaxed text-black/64">Translates physics predictions into process parameters, operating windows, control policies, and experiment plans.</p>
        </div>

        {/* Layer 04 */}
        <div className="absolute right-[68%] top-[70%] w-[26%] text-right">
          <p className="text-2xl font-bold uppercase leading-none tracking-tight text-[#0b2338]">Digital Twin Layer</p>
          <p className="mt-3 text-sm font-light leading-relaxed text-black/64">Creates dynamic, physics-enabled twins for reactors, production lines, and factory-scale systems.</p>
        </div>

        <div className="absolute bottom-[4%] left-1/2 w-[460px] -translate-x-1/2 rounded-full border border-black/10 bg-white/60 px-7 py-3 text-center shadow-sm backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#4b6b00]">Learning the thread of physics</p>
        </div>
      </section>

      <section className="relative aspect-[16/9] w-full max-w-[1500px] overflow-hidden rounded-[2rem] border border-black/10 bg-[#f6f5ef] shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(72,202,228,0.14),transparent_30%),radial-gradient(circle_at_50%_75%,rgba(181,255,72,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(232,244,245,0.96))]" />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label="The 25 Billion-Dollar Pillars industrial deployment infographic">
          <defs>
            <linearGradient id="pillarTop" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d7fbf4" />
            </linearGradient>
            <linearGradient id="pillarFront" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#eefdfa" />
              <stop offset="1" stopColor="#c7e4ef" />
            </linearGradient>
            <linearGradient id="pillarSide" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#c7d8ef" />
              <stop offset="1" stopColor="#9db7e1" />
            </linearGradient>
            <linearGradient id="foundationGlow" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#48cae4" />
              <stop offset="0.5" stopColor="#b5ff48" />
              <stop offset="1" stopColor="#48cae4" />
            </linearGradient>
            <radialGradient id="pillarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#b5ff48" stopOpacity="0.26" />
              <stop offset="0.54" stopColor="#48cae4" stopOpacity="0.08" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1600" height="900" fill="#f6f5ef" />
          <g stroke="#cde0df" strokeWidth="1" opacity="0.42">
            {Array.from({ length: 13 }, (_, index) => (
              <path key={`pillars-grid-a-${index}`} d={`M ${-110 + index * 150} 820 L ${430 + index * 150} 510`} />
            ))}
            {Array.from({ length: 13 }, (_, index) => (
              <path key={`pillars-grid-b-${index}`} d={`M ${80 + index * 150} 510 L ${620 + index * 150} 820`} />
            ))}
          </g>
          <circle cx="800" cy="680" r="500" fill="url(#pillarGlow)" />

          <g opacity="0.46" transform="translate(800 560) scale(1.12) translate(-800 -560)">
            {Array.from({ length: 19 }, (_, index) => {
              const x = 135 + (index % 10) * 142 + (index > 9 ? 72 : 0);
              const y = 270 + Math.floor(index / 10) * 76;
              const height = 172 + ((index % 3) * 34);
              return (
                <g key={`rear-pillar-${index}`}>
                  <path d={`M ${x} ${y} L ${x + 44} ${y - 24} L ${x + 88} ${y} L ${x + 44} ${y + 24} Z`} fill="#f9fffb" stroke="#0b2338" strokeOpacity="0.12" />
                  <path d={`M ${x + 12} ${y + 10} L ${x + 44} ${y + 28} L ${x + 44} ${y + height} L ${x + 12} ${y + height - 18} Z`} fill="#d9eeee" />
                  <path d={`M ${x + 44} ${y + 28} L ${x + 76} ${y + 10} L ${x + 76} ${y + height - 18} L ${x + 44} ${y + height} Z`} fill="#dbe8f7" />
                </g>
              );
            })}
          </g>

          <path d="M 250 748 L 800 438 L 1350 748 L 800 850 Z" fill="#ffffff" stroke="#0b2338" strokeOpacity="0.22" strokeWidth="2" />
          <path d="M 250 748 L 800 850 L 800 884 L 250 782 Z" fill="#bdd1d0" opacity="0.75" />
          <path d="M 800 850 L 1350 748 L 1350 782 L 800 884 Z" fill="#dfe8e7" opacity="0.88" />
          <path d="M 440 722 C 575 642 680 600 800 598 C 930 596 1048 650 1186 722" fill="none" stroke="url(#foundationGlow)" strokeLinecap="round" strokeWidth="9" opacity="0.78" />

          <g opacity="0.82" transform="translate(800 690) scale(1.16) translate(-800 -690)">
            <g>
              <path d="M 236 558 L 324 508 L 412 558 L 324 608 Z" fill="url(#pillarTop)" stroke="#0b2338" strokeOpacity="0.32" strokeWidth="2" />
              <path d="M 264 590 L 324 624 L 324 748 L 264 714 Z" fill="url(#pillarFront)" stroke="#0b2338" strokeOpacity="0.22" />
              <path d="M 324 624 L 384 590 L 384 714 L 324 748 Z" fill="url(#pillarSide)" stroke="#0b2338" strokeOpacity="0.18" />
              <circle cx="324" cy="558" r="34" fill="#48cae4" opacity="0.22" />
              <path d="M 308 558 C 320 542 340 542 352 558 C 340 574 320 574 308 558 Z" fill="none" stroke="#0b2338" strokeOpacity="0.54" strokeWidth="3" />
              <circle cx="330" cy="558" r="6" fill="#b5ff48" />
            </g>

            <g>
              <path d="M 434 528 L 522 478 L 610 528 L 522 578 Z" fill="url(#pillarTop)" stroke="#0b2338" strokeOpacity="0.32" strokeWidth="2" />
              <path d="M 462 560 L 522 594 L 522 748 L 462 714 Z" fill="url(#pillarFront)" stroke="#0b2338" strokeOpacity="0.22" />
              <path d="M 522 594 L 582 560 L 582 714 L 522 748 Z" fill="url(#pillarSide)" stroke="#0b2338" strokeOpacity="0.18" />
              <path d="M 492 532 L 522 514 L 552 532 L 522 550 Z" fill="#b5ff48" opacity="0.58" stroke="#0b2338" strokeOpacity="0.28" />
              <path d="M 506 558 L 538 558 M 510 574 L 544 574 M 514 590 L 550 590" stroke="#0b2338" strokeOpacity="0.38" strokeWidth="3" strokeLinecap="round" />
            </g>

            <g>
              <path d="M 632 500 L 720 450 L 808 500 L 720 550 Z" fill="url(#pillarTop)" stroke="#0b2338" strokeOpacity="0.32" strokeWidth="2" />
              <path d="M 660 530 L 720 564 L 720 748 L 660 714 Z" fill="url(#pillarFront)" stroke="#0b2338" strokeOpacity="0.22" />
              <path d="M 720 564 L 780 530 L 780 714 L 720 748 Z" fill="url(#pillarSide)" stroke="#0b2338" strokeOpacity="0.18" />
              <circle cx="720" cy="502" r="34" fill="#b5ff48" opacity="0.24" />
              <path d="M 700 502 L 718 486 L 742 494 L 746 518 L 726 532 L 704 522 Z" fill="none" stroke="#0b2338" strokeOpacity="0.54" strokeWidth="3" />
            </g>

            <g>
              <path d="M 830 528 L 918 478 L 1006 528 L 918 578 Z" fill="url(#pillarTop)" stroke="#0b2338" strokeOpacity="0.32" strokeWidth="2" />
              <path d="M 858 560 L 918 594 L 918 748 L 858 714 Z" fill="url(#pillarFront)" stroke="#0b2338" strokeOpacity="0.22" />
              <path d="M 918 594 L 978 560 L 978 714 L 918 748 Z" fill="url(#pillarSide)" stroke="#0b2338" strokeOpacity="0.18" />
              <path d="M 888 530 C 908 504 946 504 968 530 C 946 556 908 556 888 530 Z" fill="#48cae4" opacity="0.24" stroke="#0b2338" strokeOpacity="0.36" strokeWidth="3" />
              <circle cx="926" cy="530" r="8" fill="#b5ff48" />
            </g>

            <g>
              <path d="M 1028 558 L 1116 508 L 1204 558 L 1116 608 Z" fill="url(#pillarTop)" stroke="#0b2338" strokeOpacity="0.32" strokeWidth="2" />
              <path d="M 1056 590 L 1116 624 L 1116 748 L 1056 714 Z" fill="url(#pillarFront)" stroke="#0b2338" strokeOpacity="0.22" />
              <path d="M 1116 624 L 1176 590 L 1176 714 L 1116 748 Z" fill="url(#pillarSide)" stroke="#0b2338" strokeOpacity="0.18" />
              <path d="M 1086 558 L 1116 540 L 1146 558 L 1116 576 Z" fill="#48cae4" opacity="0.26" stroke="#0b2338" strokeOpacity="0.3" />
              <path d="M 1092 578 C 1110 592 1130 592 1148 578" fill="none" stroke="#b5ff48" strokeWidth="6" strokeLinecap="round" opacity="0.72" />
            </g>

            <g>
              <path d="M 1226 588 L 1314 538 L 1402 588 L 1314 638 Z" fill="url(#pillarTop)" stroke="#0b2338" strokeOpacity="0.32" strokeWidth="2" />
              <path d="M 1254 620 L 1314 654 L 1314 748 L 1254 714 Z" fill="url(#pillarFront)" stroke="#0b2338" strokeOpacity="0.22" />
              <path d="M 1314 654 L 1374 620 L 1374 714 L 1314 748 Z" fill="url(#pillarSide)" stroke="#0b2338" strokeOpacity="0.18" />
              <path d="M 1286 590 L 1314 574 L 1342 590 L 1314 606 Z M 1290 614 L 1338 586" stroke="#0b2338" strokeOpacity="0.44" strokeWidth="3" fill="none" />
              <circle cx="1314" cy="590" r="34" fill="#b5ff48" opacity="0.18" />
            </g>
          </g>
        </svg>

        <div className="absolute left-1/2 top-[5%] w-[900px] max-w-[82%] -translate-x-1/2 text-center">
          <h2 className="text-5xl font-bold uppercase leading-none tracking-tight text-[#0b2338]">The 25 Billion-Dollar Pillars</h2>
          <p className="mx-auto mt-3 max-w-[720px] text-lg font-light leading-tight text-black/64">One base physics model. Twenty-five industrial adapters. One compounding World Model.</p>
        </div>

        <div className="absolute left-[8%] top-[19%] w-[24%] rounded-2xl border border-black/10 bg-white/62 p-4 shadow-sm backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4b6b00]">Deployment economics</p>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-black/64">
            <div>
              <p className="text-xl font-bold uppercase leading-none text-[#0b2338]">Revenue</p>
              <p className="mt-1">NRE + milestones + platform license</p>
            </div>
            <div>
              <p className="text-xl font-bold uppercase leading-none text-[#0b2338]">Future Upside</p>
              <p className="mt-1">Royalty / value-share on process and material IP</p>
            </div>
          </div>
        </div>

        <div className="absolute right-[8%] top-[20%] w-[25%] text-right">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4b6b00]">Industrial adapter layer</p>
          <p className="mt-3 text-3xl font-bold uppercase leading-none tracking-tight text-[#0b2338]">Each pillar is a paid deployment</p>
          <p className="ml-auto mt-4 max-w-[330px] text-sm font-light leading-relaxed text-black/64">The foundation improves as every industry contributes new factory physics.</p>
        </div>

        <div className="absolute left-[6%] top-[71%] grid w-[88%] grid-cols-6 gap-3">
          {[
            ["Pharma / Biologics", "Batch → continuous flow", "Biologics manufacturing unlock"],
            ["Batteries", "Coating, drying, thermal risk", "EV battery yield unlock"],
            ["Chemicals", "Catalyst + reactor scale-up", "Capex risk reduction"],
            ["Gene Delivery", "LNP / mRNA stability", "Genomics manufacturing unlock"],
            ["Carbon Capture", "Multiphase porous flow", "Energy transition unlock"],
            ["Industrial Materials", "Crystallization + morphology", "Specialty materials unlock"],
          ].map(([title, mechanism, unlock]) => (
            <div key={title} className="rounded-2xl border border-black/10 bg-white/68 px-3 py-4 text-center shadow-sm backdrop-blur-xl">
              <p className="text-sm font-bold uppercase leading-tight text-[#0b2338]">{title}</p>
              <p className="mt-2 text-xs font-light leading-snug text-black/62">{mechanism}</p>
              <p className="mt-2 text-xs font-bold leading-snug text-[#4b6b00]">{unlock}</p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-[3%] left-1/2 w-[720px] max-w-[74%] -translate-x-1/2 rounded-full border border-black/10 bg-white/72 px-7 py-3 text-center shadow-sm backdrop-blur-xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/46">+19 additional pillars: semiconductors, advanced manufacturing, metamaterials, tissue engineering, nuclear materials, hypersonic materials, industrial heat flow, smart manufacturing</p>
        </div>
      </section>

      <section id="generative-physical-ip" className="relative aspect-[16/9] w-full max-w-[1500px] overflow-hidden rounded-[2rem] border border-[#68ffe5]/20 bg-[#06100f] shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_23%_25%,rgba(72,202,228,0.18),transparent_26%),radial-gradient(circle_at_76%_68%,rgba(181,255,72,0.16),transparent_24%),radial-gradient(circle_at_53%_46%,rgba(255,92,141,0.12),transparent_20%),linear-gradient(135deg,#06100f,#0b1119_50%,#030706)]" />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Generative Physical IP prompt to factory infographic">
          <defs>
            <linearGradient id="ipGridLine" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#48cae4" stopOpacity="0" />
              <stop offset="0.5" stopColor="#48cae4" stopOpacity="0.42" />
              <stop offset="1" stopColor="#b5ff48" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ipCore" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#48cae4" />
              <stop offset="0.54" stopColor="#b5ff48" />
              <stop offset="1" stopColor="#ff5c8d" />
            </linearGradient>
            <radialGradient id="ipCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#b5ff48" stopOpacity="0.52" />
              <stop offset="0.36" stopColor="#48cae4" stopOpacity="0.24" />
              <stop offset="1" stopColor="#06100f" stopOpacity="0" />
            </radialGradient>
            <filter id="ipBlur"><feGaussianBlur stdDeviation="8" /></filter>
          </defs>

          <rect width="1600" height="900" fill="#06100f" />
          <g stroke="url(#ipGridLine)" strokeWidth="1" opacity="0.24">
            {Array.from({ length: 13 }, (_, index) => (
              <path key={`ip-grid-h-${index}`} d={`M 90 ${130 + index * 58} C 450 ${105 + index * 42} 1040 ${170 + index * 28} 1510 ${120 + index * 52}`} />
            ))}
            {Array.from({ length: 12 }, (_, index) => (
              <path key={`ip-grid-v-${index}`} d={`M ${130 + index * 125} 96 C ${190 + index * 92} 340 ${80 + index * 132} 590 ${160 + index * 102} 804`} />
            ))}
          </g>

          <circle cx="790" cy="462" r="315" fill="url(#ipCoreGlow)" opacity="0.88" />
          <circle cx="790" cy="462" r="188" fill="none" stroke="#48cae4" strokeOpacity="0.34" strokeWidth="2" strokeDasharray="10 18" />
          <circle cx="790" cy="462" r="126" fill="none" stroke="#b5ff48" strokeOpacity="0.42" strokeWidth="2" />
          <path d="M 674 462 C 708 372 872 352 922 438 C 978 535 804 612 740 520 C 696 458 792 410 830 456 C 858 490 808 524 782 492" fill="none" stroke="url(#ipCore)" strokeLinecap="round" strokeWidth="15" opacity="0.9" />
          <path d="M 630 462 L 540 384 M 628 472 L 526 528 M 952 454 L 1066 350 M 944 486 L 1070 572 M 790 330 L 790 220 M 790 594 L 790 704" stroke="#48cae4" strokeOpacity="0.32" strokeWidth="5" strokeLinecap="round" />

          <g opacity="0.88">
            <path d="M 1096 626 L 1246 540 L 1396 626 L 1246 712 Z" fill="#0f1e22" stroke="#b5ff48" strokeOpacity="0.34" strokeWidth="2" />
            <path d="M 1126 616 L 1188 580 L 1250 616 L 1188 652 Z" fill="#17282d" stroke="#48cae4" strokeOpacity="0.45" />
            <path d="M 1268 614 L 1328 580 L 1388 614 L 1328 648 Z" fill="#17282d" stroke="#48cae4" strokeOpacity="0.45" />
            <path d="M 1152 646 L 1202 618 L 1252 646 L 1252 700 L 1152 700 Z" fill="#243132" stroke="#b5ff48" strokeOpacity="0.32" />
            <path d="M 1280 650 L 1350 610 L 1350 696 L 1280 696 Z" fill="#243132" stroke="#b5ff48" strokeOpacity="0.32" />
            <path d="M 1132 710 L 1246 776 L 1360 710" fill="none" stroke="#48cae4" strokeOpacity="0.3" strokeWidth="2" />
            <path d="M 1188 612 L 1188 582 M 1328 612 L 1328 582" stroke="#ff5c8d" strokeOpacity="0.8" strokeWidth="5" strokeLinecap="round" />
          </g>

          <g opacity="0.92">
            <path d="M 252 526 L 396 444 L 540 526 L 396 608 Z" fill="#0f1e22" stroke="#48cae4" strokeOpacity="0.4" strokeWidth="2" />
            <path d="M 314 520 C 352 486 436 486 478 520 C 436 554 352 554 314 520 Z" fill="none" stroke="#b5ff48" strokeWidth="5" strokeOpacity="0.66" />
            <circle cx="396" cy="520" r="13" fill="#48cae4" />
            <circle cx="346" cy="502" r="8" fill="#ff5c8d" opacity="0.9" />
            <circle cx="452" cy="538" r="8" fill="#b5ff48" opacity="0.9" />
          </g>
        </svg>

        <div className="absolute left-[5.5%] top-[7%] z-20 w-[31%]">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#b5ff48]">The end game</p>
          <h2 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight text-white">Generative Physical IP</h2>
          <div className="mt-6 grid gap-3">
            {physicalIpPhases.map(([number, title, copy]) => (
              <div key={number} className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl">
                <p className="text-3xl font-black leading-none text-[#48cae4]">{number}</p>
                <div>
                  <p className="text-xl font-bold uppercase leading-none text-white">{title}</p>
                  <p className="mt-2 text-sm font-light leading-snug text-white/70">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-[34%] top-[16%] z-20 w-[32%] rounded-[1.75rem] border border-[#48cae4]/25 bg-[#03100f]/75 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <div className="flex items-center gap-5 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5c8d]" />
              <span className="h-3 w-3 rounded-full bg-[#f8d66d]" />
              <span className="h-3 w-3 rounded-full bg-[#b5ff48]" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Future interface</p>
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[#48cae4]">User prompt</p>
          <p className="mt-3 text-2xl font-medium leading-tight tracking-tight text-white">Design a carbon-negative concrete optimized for Indian climate, local feedstock, low cost, and scalable manufacturing.</p>
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#b5ff48]/20 bg-[#b5ff48]/10 px-4 py-3">
            <Sparkles className="h-5 w-5 text-[#b5ff48]" />
            <p className="text-sm font-medium text-white/80">World Model compiles material, process, factory, economics, and carbon into one manufacturable blueprint.</p>
          </div>
        </div>

        <div className="absolute left-1/2 top-[47%] z-10 flex h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/15 bg-black/40 text-center shadow-[0_0_90px_rgba(72,202,228,0.28)] backdrop-blur-md">
          <Cog className="h-9 w-9 text-[#b5ff48]" />
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">World Model</p>
          <p className="mt-1 text-xl font-black uppercase leading-none text-white">Compiler</p>
        </div>

        <div className="absolute right-[5.5%] top-[9%] z-20 w-[31%]">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#48cae4]">Generated blueprint</p>
          <h3 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-white">Product + process + factory</h3>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {worldModelOutputs.map((output, index) => (
              <div key={output} className={`rounded-2xl border p-3 shadow-sm backdrop-blur-xl ${index === 6 ? "col-span-2 border-[#b5ff48]/25 bg-[#b5ff48]/10" : "border-white/10 bg-white/[0.055]"}`}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-sm font-semibold leading-tight text-white/90">{output}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-[5%] left-[7%] z-20 flex w-[86%] items-center justify-between gap-5 rounded-[1.5rem] border border-white/10 bg-black/30 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Microscope className="h-6 w-6 text-[#48cae4]" />
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">From question</p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-[#48cae4] via-[#b5ff48] to-[#ff5c8d]" />
          <div className="flex items-center gap-3">
            <Factory className="h-6 w-6 text-[#ff5c8d]" />
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">To operating factory</p>
          </div>
        </div>
      </section>
    </main>
  );
}
