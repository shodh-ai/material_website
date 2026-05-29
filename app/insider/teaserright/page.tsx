"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";
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
          <linearGradient id="teaserupLeftMountainProduction" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#8bbccc" />
            <stop offset="1" stopColor="#48cae4" />
          </linearGradient>
          <linearGradient id="teaserupRightMountainProduction" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#87b7af" />
            <stop offset="1" stopColor="#b5ff48" />
          </linearGradient>
          <linearGradient id="teaserupMountainFadeProduction" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#f6f5ef" stopOpacity="0" />
            <stop offset="0.62" stopColor="#f6f5ef" stopOpacity="0.62" />
            <stop offset="1" stopColor="#f6f5ef" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="teaserupValleyGlowProduction" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#48cae4" stopOpacity="0" />
            <stop offset="0.56" stopColor="#48cae4" stopOpacity="0.18" />
            <stop offset="1" stopColor="#48cae4" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id="teaserupValleyBaseProduction" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#48cae4" stopOpacity="0.2" />
            <stop offset="0.52" stopColor="#dfe5e3" stopOpacity="0.78" />
            <stop offset="1" stopColor="#aeb8b7" stopOpacity="0.96" />
          </linearGradient>
          <radialGradient id="teaserupSunGlowProduction" cx="50%" cy="50%" r="50%">
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
        <circle cx="1120" cy="230" r="210" fill="url(#teaserupSunGlowProduction)" />
        <circle cx="1120" cy="230" r="112" fill="#b5ff48" opacity="0.1" />

        <path
          d="M 0 820 L 0 594 C 78 570 125 548 173 510 C 217 475 244 448 305 438 C 362 429 407 456 466 473 C 520 488 588 492 660 522 L 698 638 L 742 754 L 770 820 Z"
          fill="url(#teaserupLeftMountainProduction)"
          opacity="0.84"
        />
        <path d="M 590 500 L 660 522 L 698 638 L 742 754 L 770 820 L 714 820 L 665 700 L 626 558 Z" fill="#60757b" opacity="0.34" />
        <path
          d="M 830 820 L 870 754 L 922 622 L 965 550 L 1008 536 L 1058 355 C 1080 310 1102 262 1124 205 C 1150 137 1190 98 1244 98 C 1302 98 1351 142 1388 204 C 1428 270 1460 336 1492 410 C 1526 489 1564 540 1600 568 L 1600 820 Z"
          fill="url(#teaserupRightMountainProduction)"
          opacity="0.82"
        />
        <path d="M 830 820 L 870 754 L 922 622 L 965 550 L 1008 536 L 966 668 L 906 758 L 860 820 Z" fill="#7b8e8c" opacity="0.38" />
        <path d="M 690 520 L 770 820 L 830 820 L 930 520 L 1018 520 L 880 820 L 720 820 L 610 520 Z" fill="url(#teaserupValleyGlowProduction)" />
        <path d="M 690 720 C 730 698 782 690 832 704 C 870 714 912 712 952 696 L 892 820 L 708 820 Z" fill="url(#teaserupValleyBaseProduction)" opacity="0.92" />
        <path d="M 708 792 C 755 769 834 768 892 792" fill="none" stroke="#48cae4" strokeLinecap="round" strokeWidth="2" opacity="0.26" />
        <path
          d="M 1058 355 C 1080 310 1102 262 1124 205 C 1150 137 1190 98 1244 98 C 1288 98 1328 124 1362 168 C 1322 238 1280 304 1232 372 C 1188 435 1142 489 1094 522 L 1008 536 Z"
          fill="#ffffff"
          opacity="0.22"
        />

        <rect x="1040" y="0" width="560" height="900" fill="url(#teaserupMountainFadeProduction)" />
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
          <linearGradient id="teaserupPillarTop" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#d7fbf4" />
          </linearGradient>
          <linearGradient id="teaserupPillarFront" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#eefdfa" />
            <stop offset="1" stopColor="#c7e4ef" />
          </linearGradient>
          <linearGradient id="teaserupPillarSide" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#c7d8ef" />
            <stop offset="1" stopColor="#9db7e1" />
          </linearGradient>
          <linearGradient id="teaserupFoundationGlow" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#48cae4" />
            <stop offset="0.5" stopColor="#b5ff48" />
            <stop offset="1" stopColor="#48cae4" />
          </linearGradient>
          <radialGradient id="teaserupPillarGlow" cx="50%" cy="50%" r="50%">
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
        <circle cx="800" cy="680" r="500" fill="url(#teaserupPillarGlow)" />

        <g opacity="0.46" transform="translate(800 560) scale(1.12) translate(-800 -560)">
          {Array.from({ length: 19 }, (_, index) => {
            const x = 135 + (index % 10) * 142 + (index > 9 ? 72 : 0);
            const y = 270 + Math.floor(index / 10) * 76;
            const height = 206;
            return (
              <g key={`rear-pillar-${index}`}>
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
              <path d={`M ${leftX} ${topY} L ${centerX} ${peakY} L ${rightX} ${topY} L ${centerX} ${bottomY} Z`} fill="url(#teaserupPillarTop)" stroke="#0b2338" strokeOpacity="0.32" strokeWidth="2" />
              <path d={`M ${frontX} ${frontY} L ${centerX} ${frontY + 34} L ${centerX} 748 L ${frontX} 714 Z`} fill="url(#teaserupPillarFront)" stroke="#0b2338" strokeOpacity="0.22" />
              <path d={`M ${centerX} ${frontY + 34} L ${sideX} ${frontY} L ${sideX} 714 L ${centerX} 748 Z`} fill="url(#teaserupPillarSide)" stroke="#0b2338" strokeOpacity="0.18" />
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

function TractionInfographic() {
  return (
    <section className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[1.4rem] border border-black/10 bg-[#f6f5ef] p-5 shadow-[0_30px_90px_rgba(8,20,33,0.22)] sm:p-6 md:aspect-[16/9] md:min-h-0 md:rounded-[2rem] md:p-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_34%,rgba(72,202,228,0.16),transparent_28%),radial-gradient(circle_at_78%_68%,rgba(181,255,72,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(232,244,245,0.96))]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Traction and compounding flywheel infographic">
        <defs>
          <linearGradient id="tractionBridge" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#48cae4" />
            <stop offset="0.5" stopColor="#b5ff48" />
            <stop offset="1" stopColor="#48cae4" />
          </linearGradient>
          <radialGradient id="tractionGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#b5ff48" stopOpacity="0.26" />
            <stop offset="0.58" stopColor="#48cae4" stopOpacity="0.08" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="#f6f5ef" />
        <g stroke="#cde0df" strokeWidth="1" opacity="0.42">
          {Array.from({ length: 14 }, (_, index) => (
            <path key={`traction-grid-a-${index}`} d={`M ${-140 + index * 140} 820 L ${420 + index * 140} 500`} />
          ))}
          {Array.from({ length: 14 }, (_, index) => (
            <path key={`traction-grid-b-${index}`} d={`M ${60 + index * 140} 500 L ${620 + index * 140} 820`} />
          ))}
        </g>
        <circle cx="800" cy="560" r="430" fill="url(#tractionGlow)" />
        <path d="M 235 615 C 390 465 540 455 700 565 C 860 675 1015 662 1190 505 C 1250 452 1318 420 1390 410" fill="none" stroke="url(#tractionBridge)" strokeWidth="18" strokeLinecap="round" opacity="0.28" />
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

export default function InsiderTeaserUpPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f6f5ef] text-[#0b2338] selection:bg-[#48cae4] selection:text-[#081421]">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#0b2338]/10 bg-[#f6f5ef]/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-10">
          <div className="flex items-center gap-3">
            <Image src="/shodhai_logo.svg" alt="Shodh AI" width={132} height={30} className="h-4 w-auto [filter:brightness(0)_saturate(100%)_invert(10%)_sepia(22%)_saturate(1393%)_hue-rotate(169deg)_brightness(94%)_contrast(98%)]" priority />
          </div>
          <p className="hidden text-xs font-bold uppercase tracking-[0.24em] text-[#0b2338]/45 sm:block">Insider Teaser</p>
        </div>
      </header>

      <main id="html-scroll-container" className="pointer-events-none relative z-[2] w-full">
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

        <section className="px-4 pb-20 sm:px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="pointer-events-auto mx-auto max-w-7xl rounded-[2rem] border border-[#0b2338]/10 bg-white/72 p-6 shadow-[0_30px_90px_rgba(8,20,33,0.16)] backdrop-blur-xl md:p-8"
          >
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <motion.div variants={scaleIn} className="rounded-2xl border border-[#48cae4]/24 bg-[#e8fbff]/70 p-5 backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#48cae4]">Founder</p>
                <p className="mt-2 text-lg font-medium leading-snug text-[#0b2338]">PhD, Cambridge Materials Science &amp; Photonic Engineering. Former Microsoft Research.</p>
              </motion.div>
              <motion.div variants={scaleIn} className="rounded-2xl border border-[#0b2338]/10 bg-white/78 p-5 backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b2338]/45">WORLD'S FIRST</p>
                <p className="mt-2 text-2xl font-medium text-[#0b2338]">Unified Multi-Physics Foundation Model.</p>
              </motion.div>
              <motion.div variants={scaleIn} className="rounded-2xl border border-[#b5ff48]/30 bg-[#f4ffe7]/75 p-5 backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4b6b00]">National-scale compute backing</p>
                <p className="mt-2 text-lg font-medium leading-snug text-[#0b2338]">~1M compute hours from IndiaAI</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

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

        <section className="pointer-events-auto px-4 pb-24 sm:px-6 md:px-10 md:pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={staggerContainer}
            className="mx-auto max-w-[1540px] rounded-[2.4rem] border border-[#0b2338]/10 bg-white/68 p-3 shadow-[0_40px_120px_rgba(8,20,33,0.14)] backdrop-blur-xl sm:p-5 md:p-7"
          >
            <motion.div variants={scaleIn}>
              <WorldFoundationalModelInfographic />
            </motion.div>
          </motion.div>
        </section>

        <section className="pointer-events-auto px-4 pb-24 sm:px-6 md:px-10 md:pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={staggerContainer}
            className="mx-auto max-w-[1540px] rounded-[2.4rem] border border-[#0b2338]/10 bg-white/68 p-3 shadow-[0_40px_120px_rgba(8,20,33,0.14)] backdrop-blur-xl sm:p-5 md:p-7"
          >
            <motion.div variants={scaleIn}>
              <PhysicsAiArchitectureImageInfographic />
            </motion.div>
          </motion.div>
        </section>

        <section className="pointer-events-auto px-4 pb-24 sm:px-6 md:px-10 md:pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={staggerContainer}
            className="mx-auto max-w-[1540px] rounded-[2.4rem] border border-[#0b2338]/10 bg-white/68 p-3 shadow-[0_40px_120px_rgba(8,20,33,0.14)] backdrop-blur-xl sm:p-5 md:p-7"
          >
            <motion.div variants={scaleIn}>
              <PillarsInfographic />
            </motion.div>
          </motion.div>
        </section>

        <section className="pointer-events-auto px-4 pb-24 sm:px-6 md:px-10 md:pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={staggerContainer}
            className="mx-auto max-w-[1540px] rounded-[2.4rem] border border-[#0b2338]/10 bg-white/68 p-3 shadow-[0_40px_120px_rgba(8,20,33,0.14)] backdrop-blur-xl sm:p-5 md:p-7"
          >
            <motion.div variants={scaleIn}>
              <TractionInfographic />
            </motion.div>
          </motion.div>
        </section>

        <LightSlideShell eyebrow="The End Game" title="Generative Physical IP" tone="cyan">
          <motion.div variants={fadeInUp} className="rounded-2xl border border-[#0b2338]/10 bg-white/75 p-6 shadow-lg backdrop-blur-xl md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#48cae4]">The New Interface for Invention</p>
            <p className="mt-4 text-gray-700">A user asks the World Model:</p>
            <p className="mt-3 rounded-2xl border border-[#0b2338]/10 bg-[#f6f5ef]/80 p-5 text-xl font-light italic leading-relaxed text-[#0b2338] md:text-3xl">“Design a fusion-reactor material optimized for extreme heat flux, radiation tolerance, long operating life, and scalable manufacturing.”</p>
            <p className="mt-6 text-gray-700">The World Model returns a production-ready blueprint:</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {generatedOutputs.map((output) => (
                <div key={output} className="rounded-xl border border-[#48cae4]/15 bg-[#48cae4]/10 px-4 py-3 text-gray-700">{output}</div>
              ))}
            </div>
          </motion.div>
        </LightSlideShell>

        <LightSlideShell eyebrow="Business & Vision" title="The Business & Vision" tone="amber">
          <motion.div variants={fadeInUp} className="rounded-2xl border border-[#b5ff48]/25 bg-[#f4ffe7]/75 p-6 shadow-lg backdrop-blur-xl md:p-8">
            <Globe2 className="mb-5 h-8 w-8 text-[#4b6b00]" />
            <p className="mt-4 text-lg leading-relaxed text-gray-700">We begin as the foundation model for industrial scale-up - and expand into the zero-to-billion engine for physical IP.</p>
            <p className="mt-3 text-lg leading-relaxed text-gray-700">Paid deployments and milestone-based programs fund the model’s expansion; long term, Shodh participates in the physical IP it helps generate through licensing, royalties, joint ventures, and co-development.</p>
            <p className="mt-3 text-lg leading-relaxed text-gray-700">We give companies and nations the ability to generate, validate, and manufacture new physical technologies.</p>
            <p className="mt-3 text-2xl font-medium leading-snug text-[#0b2338]">Just as LLMs made intelligence programmable, Shodh makes physical invention programmable.</p>
          </motion.div>
        </LightSlideShell>

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
