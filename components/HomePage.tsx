"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CanvasLayer from "@/components/three/CanvasLayer";
import { ArrowUpRight, FileText } from "lucide-react";

// Data for the new Protocol section
const steps = [
  {
    number: "01",
    image: "/scale.svg",
    title: "The Scale",
    description:
      "Atomic models are too small to be useful. We model the Mesoscale—where pores, grains, and defects actually determine if a material works in a factory.",
  },
  {
    number: "02",
    image: "/Design.svg",
    title: "The Design",
    description:
      "We don't do trial and error. You define the target—like heat resistance or energy density—and SkandaX generates the exact microstructure to achieve it.",
  },
  {
    number: "03",
    image: "/Lab.svg",
    title: "The Lab",
    description:
      "Discovery stops at the lab door. We are building Autonomous Robotics to synthesize and test these materials in days, closing the loop between software and hardware.",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full text-[#f0f0ff] selection:bg-[#48cae4] selection:text-[#081421] overflow-x-hidden">
      <CanvasLayer />

      <main id="html-scroll-container" className="relative z-[2] w-full pointer-events-none">
        <Navbar />

        {/* HERO SECTION */}
        <section className="min-h-screen flex items-center px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto pt-28 md:pt-36 pb-12">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 pointer-events-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-[#48cae4] rounded-full shadow-[0_0_10px_#48cae4]" />
                <span className="text-[#48cae4] text-xs font-bold tracking-[0.2em] uppercase">Shodh AI</span>
              </div>

              {/* Text scales smoothly from mobile -> laptop -> 32" screen */}
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-12xl font-medium tracking-tight leading-[1.05] break-words">
                BUILDING
                <br />
                THE TYPE 1
                <br />
                CIVILIZATION.
              </h1>

              <p className="mt-6 text-base md:text-xl text-white/90 font-light max-w-2xl drop-shadow-md">
                Mastery over the planet requires AI for material science.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/demo"
                  className="pointer-events-auto rounded-full bg-[#48cae4] text-[#081421] px-8 py-4 text-sm font-bold hover:brightness-110 transition shadow-lg shadow-[#48cae4]/20"
                >
                  Try the Demo
                </Link>
                <Link
                  href="/genesis"
                  className="pointer-events-auto rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white hover:bg-white/20 transition backdrop-blur-md"
                >
                  Read the Manifesto
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 pointer-events-auto mt-8 lg:mt-0">
              <div className="rounded-2xl border border-white/20 bg-black/40 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70 tracking-[0.2em] uppercase font-semibold">IndiaAI Mission</span>
                  <Image src="/shodhai_logo.svg" alt="Shodh AI" width={110} height={26} className="opacity-90" />
                </div>
                <p className="mt-6 text-base md:text-lg text-white/90 leading-relaxed font-light">
                  Generative AI for Mesoscale manufacturing. From design intent to factory success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SCROLL SECTION 1: CHEMISTRY */}
        <section className="min-h-[50vh] md:h-[60vh] py-12 md:py-0 flex items-center px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto">
          <div className="pointer-events-auto max-w-2xl w-full">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium drop-shadow-lg 2xl:whitespace-nowrap leading-tight">CHEMISTRY IS TOO SLOW.</h2>
            <p className="mt-6 text-white/90 text-lg sm:text-xl md:text-3xl lg:text-4xl font-light leading-relaxed">
              10,000 failures. 10 years. 1 material.
              <br />
              Discovery is the human <br className="hidden md:block" />bottleneck. We are removing it.
            </p>
          </div>
          <div className="hidden md:block md:w-1/2" />
        </section>

        {/* SCROLL SECTION 2: PHYSICS */}
        <section className="min-h-[50vh] md:h-[60vh] py-12 md:py-0 flex items-center justify-center px-6 md:px-10 max-w-6xl mx-auto">
          <div className="w-full md:w-1/2 pointer-events-auto text-left">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium drop-shadow-lg 2xl:whitespace-nowrap leading-tight">PHYSICS, GENERATED.</h2>
            <p className="mt-6 text-white/90 text-lg sm:text-xl md:text-3xl lg:text-4xl font-light leading-relaxed">
              Introducing SkandaX.
              <br />
              We don&#39;t guess the chemistry;<br />
              we choose the result.
            </p>
          </div>
          <div className="hidden md:block md:w-1/2" />
        </section>

        {/* SCROLL SECTION 3: BEYOND */}
        <section className="min-h-[50vh] md:h-[60vh] py-12 md:py-0 flex items-center px-6 md:px-10 max-w-6xl mx-auto">
          <div className="w-full md:w-1/2 hidden md:block" />
          <div className="w-full md:w-1/2 pointer-events-auto">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium drop-shadow-lg 2xl:whitespace-nowrap leading-tight">BEYOND SCIENCE FICTION.</h2>
            <p className="mt-6 text-white/90 text-lg sm:text-xl md:text-3xl lg:text-4xl font-light leading-relaxed">
              Generative design. Autonomous robotic labs.
              <br />
              Materials that endure heat, pressure, and time.
              <br />
              The future is physical.
            </p>
          </div>
        </section>

        {/* GENESIS PROTOCOL */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32 mt-10 md:mt-20">
          <div className="pointer-events-auto rounded-3xl border border-white/10 bg-[#081421]/80 backdrop-blur-md shadow-2xl p-6 sm:p-10 lg:p-16 2xl:py-[120px] 2xl:px-[80px]">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-16 items-center">

              <div className="w-full xl:col-span-7">
                <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-lg bg-gray-800/60 backdrop-blur-md border border-white/10">
                  <div className="w-4 h-4 bg-[#48cae4] rounded-lg" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">The System</span>
                </div>

                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 pt-[2px] leading-tight">
                  THE GENESIS PROTOCOL.
                </h2>

                <p className="text-base md:text-lg text-white/70 mb-12 leading-relaxed max-w-xl">
                  Shodh AI deletes the iteration loop. We are compressing 5 years of lab failure into 6 months of factory success.
                </p>

                <Link
                  href="/genesis"
                  className="inline-flex items-center gap-2 rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] rounded-br-[32px] bg-white text-[#081421] px-6 py-3 text-[16px] font-regular hover:bg-gray-200 transition"
                >
                  READ THE MANIFESTO <span>→</span>
                </Link>
              </div>

              <div className="w-full xl:col-span-5 bg-white/5 border border-white/10 rounded-xl p-6 md:p-10 text-sm md:text-lg 2xl:text-2xl font-mono leading-loose text-center">
                <div className="mb-6 md:mb-8 opacity-60">
                  <span className="block text-xs md:text-sm 2xl:text-base uppercase tracking-wider text-white/50 mb-2">Traditional (5 Years)</span>
                  <span className="text-white block">
                    Design → Lab → <span className="text-red-400">Fail</span> → Repeat
                  </span>
                </div>
                <div>
                  <span className="block text-xs md:text-sm 2xl:text-base uppercase tracking-wider text-[#48cae4] mb-2">Shodh AI (6 Months)</span>
                  <span className="text-white block">
                    Design → <span className="text-[#48cae4]">Matter Compiler</span> → Success
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SKANDA PROTOCOL (UPDATED) */}
        <section className="relative pointer-events-auto w-full bg-none py-32 px-6 md:px-10 flex flex-col items-center overflow-hidden">
          
          {/* Background Decor (Subtle Grid) */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#48cae4 1px, transparent 1px), linear-gradient(to right, #48cae4 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="relative z-10 w-full max-w-[1440px] flex flex-col items-center">

            {/* Header Section */}
            <div className="relative w-full flex flex-col items-center text-center">

              {/* Badge */}
              <div className="flex items-center gap-2 bg-[#48cae4]/10 border border-[#48cae4]/20 rounded px-3 py-2.5 w-fit mb-8 backdrop-blur-md">
                <div className="w-2.5 h-2.5 bg-[#48cae4] rounded-sm shadow-[0_0_8px_#48cae4]" />
                <span className="text-[#48cae4] text-xs tracking-wider uppercase font-medium">
                  HOW IT WORKS
                </span>
              </div>

              {/* Main Title */}
              <h2 className="text-white text-4xl md:text-7xl font-medium uppercase tracking-tighter mb-6">
                The Skanda Protocol
              </h2>

              {/* Secondary Title */}
              <p className="text-white/60 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-10">
                Skanda: a <span className="text-white">Foundation Model for Matter</span> — a generative LMM trained on physics-first simulations and deployed as an industrial OS.
              </p>

              {/* Button */}
              <div className="relative flex flex-col items-center mb-20">
                {/* Connecting Line (Top) */}
                <div className="w-px h-10 bg-gradient-to-b from-[#48cae4] to-transparent mb-4 opacity-50" />

                <Link
                  href="/protocol"
                  className="group relative flex items-center gap-3 px-8 py-4 bg-white/[0.03] hover:bg-white/[0.08] text-white rounded-full border border-white/10 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#48cae4]/20 via-transparent to-transparent transition-opacity duration-500" />

                  <FileText className="w-4 h-4 text-[#48cae4]" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase relative z-10">
                    Read Whitepaper
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-white/50 group-hover:text-[#48cae4]" />
                </Link>

                {/* Connecting Line (Bottom) */}
                <div className="w-px h-16 bg-gradient-to-t from-[#48cae4] to-transparent mt-4 opacity-30" />
              </div>
            </div>

            {/* Grid Container */}
            <div className="w-full border border-white/10 rounded-3xl bg-white/[0.01] backdrop-blur-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="group relative flex flex-col items-center text-center px-10 py-20 hover:bg-white/[0.02] transition-colors duration-500"
                  >
                    <span className="absolute top-8 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 text-white/5 text-5xl font-black group-hover:text-[#48cae4]/10 transition-colors">
                      {step.number}
                    </span>

                    <div className="relative mb-12">
                      <div className="absolute inset-0 bg-[#48cae4] blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-full" />
                      <div className="relative w-28 h-28 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-[#48cae4]/40 group-hover:rotate-[360deg] transition-all duration-1000">
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={80}
                          height={80}
                          className="w-14 h-14 invert opacity-70 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>

                    <h3 className="text-white text-2xl font-medium mb-6 group-hover:text-[#48cae4] transition-colors tracking-wide">
                      {step.title}
                    </h3>

                    <p className="text-white/50 text-sm leading-relaxed max-w-[280px] mx-auto">
                      {step.description.split("Mesoscale").map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="text-white font-semibold underline decoration-[#48cae4]/30 decoration-2 underline-offset-4">Mesoscale</span>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NATIONAL MANDATE */}
        <section className="px-4 sm:px-6 md:px-10 max-w-6xl mx-auto pb-24 mt-24">
          <div className="pointer-events-auto rounded-3xl border border-white/10 bg-white/95 text-[#081421] p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#48cae4]/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#081421]/10 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#081421]/5 px-3 py-1.5 mb-5">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#48cae4]">National Mandate</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-6">
                  SELECTED TO LEAD THE <br />&#39;AI FOR SCIENCE&#39; <br />REVOLUTION.
                </h2>

                <p className="text-base sm:text-lg text-[#081421]/70 mb-8 max-w-xl">
                  Shodh AI is the flagship partner of the IndiaAI Mission. We are making the national foundation for scientific intelligence.
                </p>

                <div className="rounded-2xl border border-[#081421]/10 bg-white p-4 sm:p-5">
                  <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#081421]/60 mb-3">
                    Strategic Partners
                  </div>
                  <div className="flex flex-wrap items-center gap-6 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-500">
                    <Image src="/demo/india-ai-logo.png" alt="IndiaAI" width={100} height={35} className="object-contain md:w-[120px] md:h-[40px]" />
                    <Image src="/demo/nvidia-partner-logo.png" alt="Nvidia" width={100} height={35} className="object-contain md:w-[120px] md:h-[40px]" />
                    <div className="h-8 flex items-center font-bold text-lg md:text-xl text-gray-400">Google</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-[#081421]/10 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#081421]/50">Today</div>
                      <div className="h-2 w-2 rounded-full bg-[#48cae4]" />
                    </div>
                    <h4 className="font-bold text-[#081421] mb-2">WE BUILD.</h4>
                    <div className="text-xs font-semibold text-[#48cae4] mb-2">THE MISSION: ENERGY STORAGE.</div>
                    <p className="text-sm text-[#081421]/70">Removing defects and scaling safe, high-density EV batteries for the global market.</p>
                  </div>

                  <div className="rounded-2xl border border-[#081421]/10 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#081421]/50">Tomorrow</div>
                      <div className="h-2 w-2 rounded-full bg-[#081421]" />
                    </div>
                    <h4 className="font-bold text-[#081421] mb-2">WE DISCOVER.</h4>
                    <div className="text-xs font-semibold text-[#48cae4] mb-2">THE MISSION: POST-LITHIUM.</div>
                    <p className="text-sm text-[#081421]/70">Pioneering Sodium-Ion chemistries and non-lithium alternatives to secure material independence.</p>
                  </div>

                  <div className="rounded-2xl border border-[#081421]/10 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#081421]/50">Future</div>
                      <div className="h-2 w-2 rounded-full bg-[#081421]/40" />
                    </div>
                    <h4 className="font-bold text-[#081421] mb-2">WE DESIGN.</h4>
                    <div className="text-xs font-semibold text-[#48cae4] mb-2">THE MISSION: TYPE 1 CIVILIZATION.</div>
                    <p className="text-sm text-[#081421]/70">Materials for Fusion, Space Exploration, and Quantum Computing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
