"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";

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
        alt="Shodh World Model Architecture — Discovery Embedding to Dynamic Digital Twin"
        fill
        priority
        sizes="(max-width: 1500px) 100vw, 1500px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(240,239,233,0.96)_0%,rgba(240,239,233,0.0)_24%,rgba(240,239,233,0.0)_66%,rgba(240,239,233,0.97)_100%)]" />

      <div className="relative z-10 mx-auto text-center md:absolute md:left-1/2 md:top-[3.5%] md:w-[740px] md:max-w-[62%] md:-translate-x-1/2">
        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#4b6b00] sm:text-xs">The Architecture</p>
        <h2 className="mt-1.5 text-3xl font-medium uppercase leading-none tracking-tight text-[#111] sm:text-4xl lg:text-[2.3rem]">
          The Shodh-Stack
        </h2>
      </div>

      <div className="relative z-10 mt-4 md:absolute md:left-[17%] md:top-[17.5%] md:mt-0 md:w-[16%]">
        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#4b6b00] sm:text-[10px]">Input</p>
        <h4 className="mt-1 text-xs font-medium uppercase leading-[1.08] tracking-tight text-[#111] sm:text-[13px]">
          Multi-Scale<br />Ingestion
        </h4>
        <div className="mt-1 hidden h-[42px] md:block">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 160 86" fill="none">
            <path d="M28 10 C44 17 54 27 62 42 C68 53 70 63 69 76" stroke="#0b2338" strokeOpacity="0.42" strokeWidth="2" />
            <path d="M69 76 L62 63 L77 64 Z" fill="#0b2338" fillOpacity="0.42" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 mt-4 md:absolute md:left-[7%] md:top-[33%] md:mt-0 md:w-[12%]">
        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#4b6b00] sm:text-[10px]">01 / Input</p>
        <h3 className="mt-1 text-sm font-medium uppercase leading-tight tracking-tight text-[#111] sm:text-base">
          Multi-Scale Ingestion<br />Quantum, micro, and macro physics fuse into one latent space.
        </h3>
      </div>

      <div className="relative z-10 mt-4 text-center md:absolute md:left-[35%] md:top-[17.5%] md:mt-0 md:w-[28%]">
        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#4b6b00] sm:text-[10px]">02 / Core Engine</p>
        <h3 className="mt-1 text-sm font-medium uppercase leading-snug tracking-tight text-[#111] sm:text-base">
          Layer 0: World Model (SHODH-WM)<br />10B-parameter unsupervised MoE learning physics via Neural ODEs and cross-attention.
        </h3>
      </div>

      <div className="relative z-10 mt-4 md:absolute md:left-[65%] md:top-[17.5%] md:mt-0 md:w-[20%]">
        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#4b6b00] sm:text-[10px]">03 / Factory Systems</p>
        <h3 className="mt-1 text-sm font-medium uppercase leading-snug tracking-tight text-[#111] sm:text-base">
          Layer 1 &amp; 2: The Adapters<br />SaaS SKUs plus air-gapped client LoRAs for imperfect factories.
        </h3>
      </div>

      <div className="relative z-10 mt-4 flex flex-col justify-center rounded-2xl border border-white/55 bg-white/48 px-5 py-6 shadow-[0_20px_60px_rgba(8,20,33,0.14)] backdrop-blur-sm md:absolute md:right-[-0.7%] md:top-[27%] md:mt-0 md:h-[50%] md:w-[13%]">
        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#4b6b00] sm:text-[10px]">04 / Output</p>
        <h3 className="mt-2 text-xl font-medium uppercase leading-tight tracking-tight text-[#111]">
          Generative Output
        </h3>
      </div>

      <div className="relative z-10 mx-auto mt-4 max-w-[720px] rounded-full border border-[#0b2338]/10 bg-white/58 px-6 py-3 text-center shadow-[0_14px_45px_rgba(8,20,33,0.10)] backdrop-blur-sm md:absolute md:bottom-[22%] md:left-1/2 md:mt-0 md:w-[58%] md:-translate-x-1/2">
        <p className="text-sm font-semibold leading-tight text-[#0b2338]/78 sm:text-base">
          The world&apos;s first AI that turns molecular discoveries into manufacturable physical products.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-4 w-full max-w-[1180px] rounded-[1.15rem] border border-black/10 bg-white/62 px-6 py-4 text-center shadow-[0_18px_50px_rgba(8,20,33,0.10)] backdrop-blur-sm md:absolute md:bottom-[3.2%] md:left-1/2 md:mt-0 md:w-[88%] md:-translate-x-1/2">
        <p className="text-sm font-medium uppercase leading-tight tracking-tight text-[#111] sm:text-base md:whitespace-nowrap">
          Reducing mass-production scale-up from 4 years &amp; $1.5B to 3 months &amp; $2M.
        </p>
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

function IterationPurposeInfographic() {
  const steps = [
    {
      number: "01",
      tag: "Current reality",
      title: "Manual Pilot Iterations",
      copy: "Factory teams burn months on repeated physical trials, failed batches, and disconnected process learnings.",
      className: "md:left-[5%] md:bottom-[8%]",
    },
    {
      number: "02",
      tag: "Shodh loop",
      title: "Physics-Guided Simulation",
      copy: "The World Model tests operating windows in latent space before hardware, reducing expensive trial-and-error.",
      className: "md:left-[28%] md:bottom-[14%]",
    },
    {
      number: "03",
      tag: "Optimization",
      title: "Zero-Iteration Recipe",
      copy: "Model outputs converge into process settings, CAD changes, and executable factory instructions.",
      className: "md:left-[52%] md:bottom-[11%]",
    },
    {
      number: "04",
      tag: "Deployment",
      title: "Factory-Ready Scale-Up",
      copy: "Each deployment returns sensor data, yield data, and failure modes that make the next deployment faster.",
      className: "md:right-[4%] md:bottom-[16%]",
    },
  ];

  return (
    <section className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[1.4rem] border border-black/10 bg-[#f6f5ef] p-5 shadow-[0_30px_90px_rgba(8,20,33,0.22)] sm:p-6 md:aspect-[16/9] md:min-h-0 md:rounded-[2rem] md:p-0">
      <Image
        src="/can_you_make_it_super_202605011206.jpeg"
        alt="Iteration compression architecture background"
        fill
        priority={false}
        sizes="(max-width: 1500px) 100vw, 1500px"
        className="object-cover opacity-45 md:opacity-85"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(246,245,239,0.82),rgba(246,245,239,0.2)_34%,rgba(246,245,239,0.18)_70%,rgba(246,245,239,0.86)),linear-gradient(90deg,rgba(246,245,239,0.44),rgba(246,245,239,0.06)_42%,rgba(246,245,239,0.34))]" />

      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="iterationThread" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#48cae4" />
            <stop offset="0.46" stopColor="#7ee85f" />
            <stop offset="1" stopColor="#b5ff48" />
          </linearGradient>
          <filter id="iterationThreadGlow" x="-20%" y="-80%" width="140%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d="M 80 548 C 230 486 318 500 420 555 C 540 620 620 610 735 535 C 860 454 948 458 1055 520 C 1180 592 1285 568 1502 440" fill="none" stroke="url(#iterationThread)" strokeWidth="9" strokeLinecap="round" opacity="0.86" filter="url(#iterationThreadGlow)" />
        <path d="M 80 548 C 230 486 318 500 420 555 C 540 620 620 610 735 535 C 860 454 948 458 1055 520 C 1180 592 1285 568 1502 440" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.72" />
        {[380, 740, 1080].map((x, index) => (
          <g key={x} transform={`translate(${x} ${index === 1 ? 535 : index === 2 ? 520 : 555})`}>
            <circle r="24" fill="#ffffff" opacity="0.94" />
            <path d="M -7 -10 L 9 0 L -7 10 Z" fill="#4b6b00" />
          </g>
        ))}
      </svg>

      <div className="relative z-10 max-w-[760px] md:absolute md:left-[6%] md:top-[7%]">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#4b6b00]">Iteration Compression</p>
        <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-[#0b2338] md:text-6xl">From Pilot Iterations to Factory Certainty</h2>
        <p className="mt-4 max-w-[650px] text-base font-bold leading-tight text-[#0b2338]/70 md:text-lg">Shodh replaces repeated manual trials with a closed-loop system that learns from every deployment.</p>
      </div>

      <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2 md:static md:mt-0 md:block">
        {steps.map((step) => (
          <div key={step.title} className={`relative rounded-3xl border border-[#0b2338]/10 bg-white/78 p-5 text-left shadow-[0_24px_80px_rgba(11,35,56,0.14)] backdrop-blur-xl md:absolute md:w-[22%] md:min-h-[210px] md:bg-white/72 ${step.className}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#4b6b00]">{step.tag}</p>
                <h3 className="mt-2 text-xl font-black uppercase leading-tight tracking-tight text-[#0b2338]">{step.title}</h3>
              </div>
              <p className="text-4xl font-black leading-none tracking-tight text-[#48cae4]">{step.number}</p>
            </div>
            <p className="mt-4 text-sm font-bold leading-snug text-[#0b2338]/68">{step.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function IcebergOpportunityInfographic() {
  return (
    <section className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[1.4rem] border border-[#0b2338]/10 bg-[#f6f5ef] p-5 shadow-[0_30px_90px_rgba(8,20,33,0.22)] sm:p-6 md:aspect-[16/9] md:min-h-0 md:rounded-[2rem] md:p-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(72,202,228,0.13),transparent_30%),radial-gradient(circle_at_78%_22%,rgba(11,35,56,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.86),rgba(238,240,236,0.94))]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="none" role="img" aria-label="Subtle iceberg opportunity landscape">
        <defs>
          <linearGradient id="icebergVisibleCyan" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#f2fdff" stopOpacity="0.88" />
            <stop offset="0.58" stopColor="#bdeff5" stopOpacity="0.7" />
            <stop offset="1" stopColor="#73d7e8" stopOpacity="0.52" />
          </linearGradient>
          <linearGradient id="icebergSubmergedCyan" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#0b2338" stopOpacity="0.46" />
            <stop offset="0.46" stopColor="#0b2338" stopOpacity="0.28" />
            <stop offset="1" stopColor="#48cae4" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="icebergWaterBand" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#48cae4" stopOpacity="0.16" />
            <stop offset="1" stopColor="#48cae4" stopOpacity="0.04" />
          </linearGradient>
          <clipPath id="icebergAboveWater">
            <rect x="0" y="0" width="3000" height="500" />
          </clipPath>
          <clipPath id="icebergBelowWater">
            <rect x="0" y="500" width="3000" height="400" />
          </clipPath>
        </defs>

        <rect width="1600" height="900" fill="#f6f5ef" />
        <g stroke="#cfd6d4" strokeWidth="1" opacity="0.34">
          {Array.from({ length: 15 }, (_, index) => (
            <path key={`iceberg-grid-a-${index}`} d={`M ${-260 + index * 140} 840 L ${500 + index * 140} 410`} />
          ))}
          {Array.from({ length: 15 }, (_, index) => (
            <path key={`iceberg-grid-b-${index}`} d={`M ${-120 + index * 140} 400 L ${640 + index * 140} 840`} />
          ))}
        </g>

        <path d="M 0 500 C 190 476 338 464 520 478 C 720 494 884 520 1088 500 C 1284 480 1444 462 1600 492 L 1600 900 L 0 900 Z" fill="url(#icebergWaterBand)" />
        <path d="M 0 500 C 190 476 338 464 520 478 C 720 494 884 520 1088 500 C 1284 480 1444 462 1600 492" fill="none" stroke="#48cae4" strokeWidth="3" strokeLinecap="round" opacity="0.32" />
        <path d="M 0 522 C 220 494 390 496 590 516 C 792 536 960 536 1166 504 C 1350 476 1480 486 1600 516" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.48" />

        <g transform="translate(1370 0) scale(-1.12 1.05)">
          <path
            d="M 650 820 L 720 742 L 802 604 L 900 524 L 988 500 L 1058 350 C 1088 286 1118 210 1165 144 C 1215 74 1292 44 1360 78 C 1428 112 1476 194 1518 286 C 1558 372 1582 458 1600 520 C 1655 612 1728 724 1820 820 L 650 820 Z"
            fill="url(#icebergVisibleCyan)"
            opacity="0.9"
            clipPath="url(#icebergAboveWater)"
          />
          <path
            d="M 520 820 L 600 738 L 700 642 L 840 560 L 988 500 L 1600 520 C 1715 600 1868 704 2140 820 L 520 820 Z"
            fill="url(#icebergSubmergedCyan)"
            opacity="0.92"
            clipPath="url(#icebergBelowWater)"
          />
          <path d="M 650 820 L 720 742 L 802 604 L 900 524 L 988 500 L 944 642 L 842 756 L 770 820 Z" fill="#0b2338" opacity="0.08" clipPath="url(#icebergBelowWater)" />
          <path d="M 988 500 L 1058 350 C 1088 286 1118 210 1165 144 C 1192 214 1218 302 1246 408 C 1278 528 1322 656 1390 820 L 770 820 L 842 756 L 944 642 Z" fill="#ffffff" opacity="0.16" clipPath="url(#icebergAboveWater)" />
          <path d="M 988 500 L 840 560 L 700 642 L 600 738 L 520 820 L 2140 820 C 1868 704 1715 600 1600 520 Z" fill="#0b2338" opacity="0.12" clipPath="url(#icebergBelowWater)" />
          <path d="M 720 820 L 850 740 L 1040 690 L 1260 724 L 1460 820 Z" fill="#0b2338" opacity="0.1" clipPath="url(#icebergBelowWater)" />
          <path d="M 980 820 L 1160 760 L 1380 716 L 1660 762 L 1880 820 Z" fill="#48cae4" opacity="0.08" clipPath="url(#icebergBelowWater)" />
          <path d="M 1180 820 L 1388 778 L 1640 742 L 1960 786 L 2140 820 Z" fill="#0b2338" opacity="0.08" clipPath="url(#icebergBelowWater)" />
          <path d="M 760 790 C 960 720 1138 710 1330 754 C 1490 792 1640 794 1848 748" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.12" clipPath="url(#icebergBelowWater)" />
          <path d="M 1010 840 C 1210 784 1400 780 1604 812 C 1740 834 1886 824 2050 780" fill="none" stroke="#48cae4" strokeWidth="2" opacity="0.1" clipPath="url(#icebergBelowWater)" />
        </g>
      </svg>
      <div className="relative z-10 flex min-h-[760px] w-full flex-col px-8 py-8 md:min-h-0 md:p-12 lg:p-14">
        <div className="max-w-[880px]">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#4b6b00] sm:text-xs">Opportunity</p>
          <h1 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight text-[#0b2338] sm:text-4xl lg:text-5xl">
            Where We Win
          </h1>
          <p className="mt-4 max-w-[760px] text-base font-semibold leading-snug text-[#0b2338]/72 sm:text-lg">
            We own the physics of manufacturing across pharma scale-up and hard-tech invention.
          </p>
        </div>

        <div className="mt-8 grid w-full gap-4 md:grid-cols-2 lg:mt-10">
          {[
            ["Pharma & Biologics", "Discovery", "Biology problem", "Done by partners", "$1.6T pharma market"],
            ["Pharma & Biologics", "Scale-Up", "Physics problem", "Solved by Shodh AI", "$250B+ biologics manufacturing"],
            ["Hard Tech", "Discovery", "Physics problem", "Materials, batteries, fuels, alloys", "$2T+ industrial materials"],
            ["Hard Tech", "Scale-Up", "Physics problem", "Factory hardware + process recipes", "$1T+ advanced manufacturing"],
          ].map(([segment, stage, problem, owner, tam]) => (
            <div key={`${segment}-${stage}`} className="min-h-[155px] rounded-[1.35rem] border border-[#0b2338]/10 bg-white/68 p-5 shadow-[0_18px_55px_rgba(11,35,56,0.08)] backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#4b6b00]">{segment}</p>
                  <h3 className="mt-2 text-2xl font-black uppercase leading-none tracking-tight text-[#0b2338]">{stage}</h3>
                </div>
                <p className="rounded-full border border-[#48cae4]/25 bg-[#e8fbff]/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#0b2338]">{tam}</p>
              </div>
              <p className="mt-4 text-base font-black leading-tight text-[#0b2338]">{problem}</p>
              <p className="mt-2 text-sm font-bold leading-snug text-[#0b2338]/68">{owner}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-[#b5ff48]/30 bg-[#f4ffe7]/80 px-6 py-4 text-center shadow-[0_18px_55px_rgba(11,35,56,0.08)] backdrop-blur-xl md:mt-auto">
          <p className="text-sm font-black uppercase leading-tight tracking-tight text-[#0b2338] sm:text-base">
            Pharma: partners find molecules, Shodh scales them. Hard tech: Shodh owns discovery and scale-up.
          </p>
        </div>
      </div>
    </section>
  );
}

function TractionInfographic() {
  const modelBlocks = [
    {
      title: "Enterprise Licensing",
      label: "Tier 1 / Palantir Model",
      action: "$1M–$5M/year Industry Adapter licenses.",
      yield: "Predictable ARR funds compute and model expansion.",
      tone: "cyan",
    },
    {
      title: "Milestone IP",
      label: "Tier 2 / Isomorphic Model",
      action: "NRE + milestone payments for impossible bottlenecks.",
      yield: "Scale-up wins create asymmetric upside.",
      tone: "green",
    },
    {
      title: "Royalties & Equity",
      label: "Upside / Physical IP",
      action: "Royalty or equity on manufactured breakthroughs.",
      yield: "Example: a cut of every next-gen battery sold.",
      tone: "amber",
    },
  ];

  const getToneClass = (tone: string) => {
    if (tone === "cyan") return "border-[#48cae4]/30 bg-[#e8fbff]/78";
    if (tone === "green") return "border-[#b5ff48]/35 bg-[#f4ffe7]/78";
    return "border-[#f5c451]/35 bg-[#fff7df]/82";
  };

  return (
    <section className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[1.4rem] border border-black/10 bg-[#f6f5ef] p-5 shadow-[0_30px_90px_rgba(8,20,33,0.22)] sm:p-6 md:aspect-[16/9] md:min-h-0 md:rounded-[2rem] md:p-0">
      <Image
        src="/can_you_make_it_super_202605011206.jpeg"
        alt="Data flywheel business model architecture background"
        fill
        priority={false}
        sizes="(max-width: 1500px) 100vw, 1500px"
        className="object-contain opacity-35 md:scale-[0.86] md:opacity-68"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(246,245,239,0.9),rgba(246,245,239,0.34)_32%,rgba(246,245,239,0.26)_68%,rgba(246,245,239,0.92)),linear-gradient(90deg,rgba(246,245,239,0.52),rgba(246,245,239,0.14)_44%,rgba(246,245,239,0.42))]" />
      <div className="relative z-10 mx-auto max-w-[1060px] text-center md:absolute md:left-1/2 md:top-[6%] md:w-[1060px] md:max-w-[88%] md:-translate-x-1/2">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#4b6b00]">Business Model</p>
        <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-[#0b2338] md:text-6xl">SaaS Cash Flow + IP Upside</h2>
        <div className="mx-auto mt-4 max-w-[980px] rounded-2xl border border-[#0b2338]/10 bg-white/62 px-5 py-3 shadow-sm backdrop-blur-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#4b6b00]">Two Engines</p>
          <p className="mt-2 text-sm font-bold leading-snug text-[#0b2338]/72 md:text-base">
            Immediate enterprise software revenue plus biotech-style upside from solved manufacturing bottlenecks.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-8 grid gap-7 md:absolute md:left-[6%] md:bottom-[13%] md:mt-0 md:w-[88%] md:grid-cols-3">
        {modelBlocks.map((block, index) => (
          <div key={block.title} className={`relative min-h-[178px] rounded-3xl border p-5 shadow-[0_18px_58px_rgba(11,35,56,0.09)] backdrop-blur-xl ${getToneClass(block.tone)}`}>
            {index < modelBlocks.length - 1 && (
              <div className="pointer-events-none absolute -right-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#0b2338]/10 bg-white/90 text-2xl font-black text-[#4b6b00] shadow-lg md:flex">
                →
              </div>
            )}
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#4b6b00]">{block.label}</p>
            <h3 className="text-xl font-black uppercase leading-tight tracking-tight text-[#0b2338] lg:text-2xl">{block.title}</h3>
            <div className="mt-4 space-y-3">
              <p className="text-base font-black leading-snug text-[#0b2338]">{block.action}</p>
              <p className="text-sm font-bold leading-relaxed text-[#0b2338]/72">{block.yield}</p>
            </div>
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

        <section className="pointer-events-auto px-4 pb-24 sm:px-6 md:px-10 md:pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={staggerContainer}
            className="mx-auto max-w-[1540px] rounded-[2.4rem] border border-[#0b2338]/10 bg-white/68 p-3 shadow-[0_40px_120px_rgba(8,20,33,0.14)] backdrop-blur-xl sm:p-5 md:p-7"
          >
            <motion.div variants={scaleIn}>
              <IcebergOpportunityInfographic />
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
