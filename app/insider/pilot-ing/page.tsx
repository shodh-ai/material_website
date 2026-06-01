"use client";

import { Suspense, useMemo, useRef } from "react";
import Image from "next/image";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, BatteryCharging, Factory, FlaskConical, LockKeyhole, Pill, ShieldCheck, Sparkles, Waves } from "lucide-react";
import * as THREE from "three";
import { OBJLoader } from "three-stdlib";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0, 0, 0.2, 1] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0, 0, 0.2, 1] } },
};

const sectors = [
  { label: "Pharma", icon: Pill, copy: "Bioreactors, continuous flow, purity-critical synthesis." },
  { label: "Energy", icon: BatteryCharging, copy: "Battery wetting, coating, drying, thermal stability." },
  { label: "Chemicals", icon: FlaskConical, copy: "Catalyst scale-up, mixing, crystallization, yield." },
  { label: "Industry", icon: Factory, copy: "Heat flow, aerospace materials, specialty manufacturing." },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#48cae4]/30 bg-[#48cae4]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#2498aa] backdrop-blur-md">
      <span className="h-2 w-2 rounded-full bg-[#48cae4] shadow-[0_0_12px_#48cae4]" />
      {children}
    </span>
  );
}

function SlideFrame({ children }: { children: React.ReactNode }) {
  return (
    <section className="pointer-events-auto px-4 pb-24 sm:px-6 md:px-10 md:pb-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
        variants={staggerContainer}
        className="mx-auto max-w-[1540px] rounded-[2.4rem] border border-[#0b2338]/10 bg-white/68 p-3 shadow-[0_40px_120px_rgba(8,20,33,0.14)] backdrop-blur-xl sm:p-5 md:p-7"
      >
        <motion.div variants={scaleIn}>{children}</motion.div>
      </motion.div>
    </section>
  );
}

function LightPanel({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative mx-auto w-full max-w-[1500px] overflow-hidden rounded-[1.4rem] border border-black/10 bg-[#f6f5ef] p-5 shadow-[0_30px_90px_rgba(8,20,33,0.22)] sm:p-6 md:aspect-[16/9] md:min-h-0 md:rounded-[2rem] md:p-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(72,202,228,0.16),transparent_29%),radial-gradient(circle_at_78%_22%,rgba(181,255,72,0.16),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.84),rgba(238,240,236,0.92))]" />
      <div className="relative z-10 p-2 md:p-12 lg:p-14">
        <Badge>{eyebrow}</Badge>
        <h2 className="mt-5 max-w-5xl text-4xl font-black uppercase leading-[0.98] tracking-tight text-[#0b2338] sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h2>
        {copy ? <p className="mt-5 max-w-4xl text-base font-bold leading-snug text-[#0b2338]/70 sm:text-lg md:text-xl">{copy}</p> : null}
      </div>
      {children}
    </section>
  );
}

function ValleyGraphic() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-[58%] md:h-full">
      <svg className="h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="pilotValleyLeft" x1="0" x2="1">
            <stop offset="0" stopColor="#8bbccc" />
            <stop offset="1" stopColor="#48cae4" />
          </linearGradient>
          <linearGradient id="pilotValleyRight" x1="0" x2="1">
            <stop offset="0" stopColor="#87b7af" />
            <stop offset="1" stopColor="#b5ff48" />
          </linearGradient>
          <linearGradient id="pilotValleyBase" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#48cae4" stopOpacity="0.2" />
            <stop offset="1" stopColor="#aeb8b7" stopOpacity="0.94" />
          </linearGradient>
        </defs>
        <g stroke="#cfd6d4" strokeWidth="1" opacity="0.34">
          {Array.from({ length: 15 }, (_, index) => (
            <path key={`grid-a-${index}`} d={`M ${-260 + index * 140} 840 L ${500 + index * 140} 410`} />
          ))}
          {Array.from({ length: 15 }, (_, index) => (
            <path key={`grid-b-${index}`} d={`M ${-120 + index * 140} 400 L ${640 + index * 140} 840`} />
          ))}
        </g>
        <path d="M 0 820 L 0 594 C 110 562 188 490 296 442 C 388 402 496 482 660 522 L 742 754 L 770 820 Z" fill="url(#pilotValleyLeft)" opacity="0.82" />
        <path d="M 830 820 L 902 650 L 988 510 L 1058 355 C 1094 270 1134 154 1244 98 C 1348 46 1462 290 1600 568 L 1600 820 Z" fill="url(#pilotValleyRight)" opacity="0.8" />
        <path d="M 690 520 L 770 820 L 830 820 L 930 520 L 1018 520 L 880 820 L 720 820 L 610 520 Z" fill="#48cae4" opacity="0.12" />
        <path d="M 690 720 C 742 692 806 690 856 706 C 898 718 928 710 952 696 L 892 820 L 708 820 Z" fill="url(#pilotValleyBase)" />
        <path d="M 704 790 C 764 760 828 762 896 792" fill="none" stroke="#48cae4" strokeLinecap="round" strokeWidth="3" opacity="0.32" />
      </svg>
    </div>
  );
}

function RealityCrashSlide() {
  return (
    <LightPanel
      eyebrow="Why We Do This"
      title={'The Trillion-Dollar "Reality Crash"'}
      copy="AI and labs now discover breakthrough molecules, drugs, and materials faster than factories can scale them."
    >
      <ValleyGraphic />
      <div className="relative z-10 grid gap-4 px-7 pb-8 pt-2 md:absolute md:bottom-[7%] md:left-[5%] md:w-[90%] md:grid-cols-3 md:p-0">
        {[
          ["1L → 10,000L", "Scale-up still takes years of physical pilot trials and millions in custom plants."],
          ["Physics Fails at Scale", "Fluid dynamics, shear stress, and thermal dead zones break recipes that worked in the lab."],
          ["Margins Collapse", "Scrap, delays, and qualification loops turn scientific wins into commercial bottlenecks."],
        ].map(([title, copy]) => (
          <div key={title} className="rounded-[1.25rem] border border-[#0b2338]/10 bg-white/76 p-5 shadow-[0_18px_55px_rgba(11,35,56,0.12)] backdrop-blur-xl">
            <h3 className="text-xl font-black uppercase leading-tight tracking-tight text-[#0b2338]">{title}</h3>
            <p className="mt-3 text-sm font-bold leading-snug text-[#0b2338]/68 sm:text-base">{copy}</p>
          </div>
        ))}
      </div>
    </LightPanel>
  );
}

function ArchitectureSlide() {
  const layers = [
    ["Quantum / Molecular", "Chemistry, materials, biology"],
    ["Multi-Physics Core", "PDE-bound fluid, heat, mass, phase dynamics"],
    ["Factory Digital Twin", "Reactors, lines, controls, telemetry"],
    ["Blueprint Output", "CAD, recipes, operating windows"],
  ];

  return (
    <LightPanel
      eyebrow="What We Are"
      title="The First Universal Physics Engine"
      copy="Shodh AI is not a text generator. It is a differentiable Foundation World Model trained on the physical laws that govern manufacturing."
    >
      <Image src="/image_nvidia_intro.jpeg" alt="" fill sizes="1500px" className="object-cover opacity-25" />
      <div className="relative z-10 px-7 pb-8 md:absolute md:bottom-[7%] md:left-[5%] md:w-[90%] md:px-0 md:pb-0">
        <div className="grid gap-4 md:grid-cols-4">
          {layers.map(([title, copy], index) => (
            <div key={title} className="relative min-h-[170px] rounded-[1.3rem] border border-[#0b2338]/10 bg-white/74 p-5 shadow-[0_22px_70px_rgba(11,35,56,0.12)] backdrop-blur-xl">
              {index < layers.length - 1 ? <ArrowRight className="absolute -right-6 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 rounded-full border border-[#0b2338]/10 bg-white p-2 text-[#4b6b00] shadow-lg md:block" /> : null}
              <p className="text-4xl font-black leading-none text-[#48cae4]">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-black uppercase leading-tight tracking-tight text-[#0b2338]">{title}</h3>
              <p className="mt-3 text-sm font-bold leading-snug text-[#0b2338]/68">{copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-[1.25rem] border border-[#b5ff48]/35 bg-[#f4ffe7]/80 px-5 py-4 shadow-sm backdrop-blur-xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#4b6b00]">Zero Hallucinations</p>
          <p className="mt-2 text-base font-bold leading-snug text-[#0b2338]/76">
            The engine is mathematically constrained by Partial Differential Equations, so every generated blueprint must obey real physics.
          </p>
        </div>
      </div>
    </LightPanel>
  );
}

function ReactorObject({ url, color, position, scale }: { url: string; color: string; position: [number, number, number]; scale: number }) {
  const obj = useLoader(OBJLoader, url);
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.55,
        roughness: 0.23,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
      }),
    [color]
  );
  const scene = useMemo(() => {
    const clone = obj.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = material;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [obj, material]);

  return <primitive object={scene} position={position} scale={scale} />;
}

function ReactorAssembly() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.22;
  });

  return (
    <group ref={groupRef} rotation={[-0.18, -0.55, 0]} position={[0, -0.25, 0]}>
      <ReactorObject url="/mimic_v3_assets/reactor_shell.obj" color="#dff8ff" position={[0, 0, 0]} scale={0.018} />
      <ReactorObject url="/mimic_v3_assets/agitator_shaft.obj" color="#0b2338" position={[0, 0, 0]} scale={0.018} />
      <ReactorObject url="/mimic_v3_assets/impeller_blades.obj" color="#48cae4" position={[0, 0, 0]} scale={0.018} />
    </group>
  );
}

function ReactorCanvas() {
  return (
    <div className="h-[360px] w-full md:h-full">
      <Canvas shadows camera={{ position: [0, 1.2, 6.5], fov: 34 }} dpr={[1, 2]} gl={{ antialias: true }}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 5]} intensity={2.6} castShadow />
        <pointLight position={[-4, 3, 2]} intensity={1.6} color="#b5ff48" />
        <Suspense fallback={null}>
          <ReactorAssembly />
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/blue_photo_studio_1k.hdr" blur={0.75} />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.55} />
      </Canvas>
    </div>
  );
}

function InverseDesignSlide() {
  return (
    <LightPanel
      eyebrow="What We Do"
      title="We Don't Simulate Guesses. We Engineer Guarantees."
      copy="Legacy tools ask engineers to guess a design, simulate it, and wait to learn what failed. Shodh reverses the workflow with physics-constrained inverse design."
    >
      <div className="relative z-10 grid gap-6 px-7 pb-8 md:absolute md:bottom-[6%] md:left-[5%] md:top-[36%] md:w-[90%] md:grid-cols-[1fr_1.1fr] md:px-0 md:pb-0">
        <div className="grid gap-3">
          {[
            ["Input", "State the business target: 99.8% flow yield, zero dead zones, 50% faster battery wetting."],
            ["Engine", "The AI works backward through millions of coupled variables under physics constraints."],
            ["Output", "Receive 3D-printable geometries, reactor architectures, recipes, and operating parameters."],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-[1.25rem] border border-[#0b2338]/10 bg-white/76 p-5 shadow-[0_18px_55px_rgba(11,35,56,0.12)] backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4b6b00]">{title}</p>
              <p className="mt-2 text-base font-bold leading-snug text-[#0b2338]/74">{copy}</p>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-[1.5rem] border border-[#48cae4]/24 bg-[#0b2338] shadow-[0_28px_90px_rgba(11,35,56,0.25)]">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/8 px-5 py-3">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#b5ff48]">Generated CAD Component</p>
            <Sparkles className="h-4 w-4 text-[#48cae4]" />
          </div>
          <ReactorCanvas />
        </div>
      </div>
    </LightPanel>
  );
}

function ImpactSlide() {
  return (
    <LightPanel
      eyebrow="Why This Changes The World"
      title="Eradicating Trial-and-Error R&D"
      copy="The platform is live across the hardest scale-up bottlenecks: aerospace thermodynamics, pharmaceutical bioreactors, solid-state batteries, and specialty chemicals."
    >
      <div className="relative z-10 px-7 pb-8 md:absolute md:bottom-[7%] md:left-[5%] md:w-[90%] md:px-0 md:pb-0">
        <div className="grid gap-4 md:grid-cols-4">
          {sectors.map(({ label, icon: Icon, copy }) => (
            <div key={label} className="rounded-[1.25rem] border border-[#0b2338]/10 bg-white/72 p-5 shadow-[0_18px_55px_rgba(11,35,56,0.11)] backdrop-blur-xl">
              <Icon className="h-8 w-8 text-[#2498aa]" />
              <h3 className="mt-4 text-xl font-black uppercase tracking-tight text-[#0b2338]">{label}</h3>
              <p className="mt-2 text-sm font-bold leading-snug text-[#0b2338]/66">{copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[1.35rem] border border-[#48cae4]/28 bg-[#e8fbff]/74 p-5 shadow-sm backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2498aa]">Sim-to-Real Calibration</p>
            <p className="mt-3 text-base font-bold leading-snug text-[#0b2338]/74">
              We ingest messy sensor logs to learn the friction, wear, fouling, rust, and drift of each real assembly line.
            </p>
          </div>
          <div className="rounded-[1.35rem] border border-[#b5ff48]/35 bg-[#f4ffe7]/80 p-5 shadow-sm backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4b6b00]">Real-World ROI</p>
            <p className="mt-3 text-base font-bold leading-snug text-[#0b2338]/76">
              For a GE Aerospace CDMO partner, Shodh redesigned a failing reactor, solved a critical purity bottleneck in under 5 iterations, and avoided millions in qualification cost.
            </p>
          </div>
        </div>
      </div>
    </LightPanel>
  );
}

function SecuritySlide() {
  return (
    <LightPanel
      eyebrow="Why Talk To Us"
      title="Drop-In, Scale-Ready Intelligence"
      copy="Your factory of the future is ready to deploy without surrendering formulas, telemetry, or ownership."
    >
      <div className="relative z-10 grid gap-5 px-7 pb-8 md:absolute md:bottom-[7%] md:left-[5%] md:w-[90%] md:grid-cols-[1fr_1fr_1.15fr] md:px-0 md:pb-0">
        {[
          [LockKeyhole, "Zero-Trust Security", "Universal physics is separated from proprietary trade secrets; formulas and factory telemetry stay inside your walls."],
          [ShieldCheck, "100% IP Ownership", "You retain exclusive ownership of generated CAD, material formulas, operating recipes, and manufacturing IP."],
          [Waves, "Let's Talk", "Stop guessing. Start generating. Scale the next physical breakthrough with a production-ready AI engine."],
        ].map(([Icon, title, copy]) => {
          const LucideIcon = Icon as typeof LockKeyhole;
          return (
            <div key={title as string} className="flex min-h-[230px] flex-col rounded-[1.35rem] border border-[#0b2338]/10 bg-white/76 p-6 shadow-[0_18px_55px_rgba(11,35,56,0.12)] backdrop-blur-xl">
              <LucideIcon className="h-9 w-9 text-[#2498aa]" />
              <h3 className="mt-5 text-2xl font-black uppercase leading-tight tracking-tight text-[#0b2338]">{title as string}</h3>
              <p className="mt-4 text-base font-bold leading-snug text-[#0b2338]/70">{copy as string}</p>
            </div>
          );
        })}
      </div>
    </LightPanel>
  );
}

export default function PilotIngPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f6f5ef] text-[#0b2338] selection:bg-[#48cae4] selection:text-[#081421]">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#0b2338]/10 bg-[#f6f5ef]/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-10">
          <Image src="/shodhai_logo.svg" alt="Shodh AI" width={132} height={30} className="h-4 w-auto [filter:brightness(0)_saturate(100%)_invert(10%)_sepia(22%)_saturate(1393%)_hue-rotate(169deg)_brightness(94%)_contrast(98%)]" priority />
          <p className="hidden text-xs font-bold uppercase tracking-[0.24em] text-[#0b2338]/45 sm:block">Insider Pilot</p>
        </div>
      </header>

      <main id="html-scroll-container" className="relative z-[2] w-full">
        <section className="flex min-h-screen items-center px-4 pb-20 pt-32 sm:px-6 md:px-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <motion.div variants={staggerContainer} className="lg:col-span-8">
              <motion.div variants={fadeInUp} className="mb-7 flex flex-wrap gap-3">
                <span className="rounded-full border border-[#0b2338]/10 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0b2338]/70 backdrop-blur-md">Confidential</span>
                <span className="rounded-full border border-[#48cae4]/24 bg-[#e8fbff]/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#2498aa] backdrop-blur-md">Factory Floor Ready</span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-[2.5rem] font-black uppercase leading-[1.02] tracking-tight text-[#0b2338] sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl">
                The World Model
                <br />
                <span className="bg-gradient-to-r from-[#0b2338] via-[#48cae4] to-[#4b6b00] bg-clip-text text-transparent">For Physical Manufacturing</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="mt-7 max-w-4xl text-xl font-semibold leading-relaxed text-black/68 md:text-3xl">
                Turning lab-scale chemical, biological, and material discoveries into mass-production reality.
              </motion.p>
            </motion.div>
            <motion.div variants={scaleIn} className="lg:col-span-4">
              <div className="rounded-[1.8rem] border border-[#b5ff48]/30 bg-[#f4ffe7]/78 p-6 shadow-[0_24px_80px_rgba(11,35,56,0.12)] backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4b6b00]">World's First</p>
                <p className="mt-3 text-2xl font-black uppercase leading-tight text-[#0b2338]">Multi-Physics AI Engine ready to deploy on your factory floor.</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <SlideFrame>
          <RealityCrashSlide />
        </SlideFrame>
        <SlideFrame>
          <ArchitectureSlide />
        </SlideFrame>
        <SlideFrame>
          <InverseDesignSlide />
        </SlideFrame>
        <SlideFrame>
          <ImpactSlide />
        </SlideFrame>
        <SlideFrame>
          <SecuritySlide />
        </SlideFrame>

        <footer className="relative w-full overflow-hidden border-t border-[#0b2338]/10 bg-[#f6f5ef]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(72,202,228,0.14),transparent_26%),radial-gradient(circle_at_82%_72%,rgba(181,255,72,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.58),rgba(246,245,239,0.96))]" />
          <div className="relative z-10 px-4 pb-8 pt-12 sm:px-6 sm:pt-16 md:px-10 md:pt-20">
            <div className="mb-10 overflow-hidden">
              <h1 className="w-full select-none whitespace-nowrap text-[clamp(4.5rem,22vw,24rem)] font-normal leading-[0.9] text-[#0b2338]">Shodh AI</h1>
            </div>
            <div className="pb-2 text-xs font-bold uppercase tracking-wider text-[#0b2338]/70">2026 Shodh AI. All rights reserved</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
