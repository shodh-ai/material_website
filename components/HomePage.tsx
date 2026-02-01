"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CanvasLayer from "@/components/three/CanvasLayer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full text-[#f0f0ff] selection:bg-[#48cae4] selection:text-[#081421]">
      <CanvasLayer />

      <main id="html-scroll-container" className="relative z-[2] w-full pointer-events-none">
        <Navbar />

        <section className="min-h-screen flex items-center px-6 md:px-10 max-w-6xl mx-auto pt-28 md:pt-36">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 pointer-events-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-[#48cae4] rounded-full shadow-[0_0_10px_#48cae4]" />
                <span className="text-[#48cae4] text-xs font-bold tracking-[0.2em] uppercase">Shodh AI</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05]">
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

            <div className="lg:col-span-5 pointer-events-auto">
              <div className="rounded-2xl border border-white/20 bg-black/40 p-8 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70 tracking-[0.2em] uppercase font-semibold">IndiaAI Mission</span>
                  <Image src="/shodhai_logo.svg" alt="Shodh AI" width={110} height={26} className="opacity-90" />
                </div>
                <p className="mt-6 text-lg text-white/90 leading-relaxed font-light">
                  Generative AI for Mesoscale manufacturing. From design intent to factory success.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="h-[60vh] flex items-center px-6 md:px-10 max-w-6xl mx-auto">
          <div className="pointer-events-auto max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-medium drop-shadow-lg">CHEMISTRY IS TOO SLOW.</h2>
            <p className="mt-6 text-white/90 text-lg md:text-xl font-light leading-relaxed">
              10,000 failures. 10 years. 1 material.
              <br />
              Discovery is the human bottleneck. We are removing it.
            </p>
          </div>
        </section>

        <section className="h-[60vh] flex items-center px-6 md:px-10 max-w-6xl mx-auto">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6 pointer-events-auto">
              <h2 className="text-3xl md:text-5xl font-medium drop-shadow-lg">PHYSICS, GENERATED.</h2>
              <p className="mt-6 text-white/90 text-lg md:text-xl font-light leading-relaxed">
                Introducing SkandaX.
                <br />
                We don&#39;t guess the chemistry; we choose the result.
              </p>
            </div>
            <div className="lg:col-span-6" />
          </div>
        </section>

        <section className="h-[60vh] flex items-center px-6 md:px-10 max-w-6xl mx-auto">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 hidden lg:block" />

            <div className="lg:col-span-8 pointer-events-auto">
              <h2 className="text-3xl md:text-5xl font-medium drop-shadow-lg">BEYOND SCIENCE FICTION.</h2>
              <p className="mt-6 text-white/90 text-lg md:text-xl font-light leading-relaxed">
                Generative design. Autonomous robotic labs.
                <br />
                Materials that endure heat, pressure, and time.
                <br />
                The future is physical.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 max-w-6xl mx-auto mb-32 mt-20">
          <div className="pointer-events-auto rounded-3xl border border-white/10 bg-[#081421]/80 backdrop-blur-md p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 bg-[#48cae4] rounded-full animate-pulse" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#48cae4]">The System</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-medium text-white mb-6">THE GENESIS PROTOCOL.</h2>
                <p className="text-lg text-white/70 mb-8 leading-relaxed">
                  Shodh AI deletes the iteration loop. We are compressing 5 years of lab failure into 6 months of factory success.
                </p>
                <Link
                  href="/genesis"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#081421] px-6 py-3 text-sm font-bold hover:bg-gray-200 transition"
                >
                  READ THE MANIFESTO <span>→</span>
                </Link>
              </div>

              <div className="w-full md:w-auto bg-white/5 border border-white/10 rounded-xl p-6 text-sm font-mono leading-loose min-w-[300px]">
                <div className="mb-4 opacity-50">
                  <span className="block text-xs uppercase tracking-wider text-white/50 mb-1">Traditional (5 Years)</span>
                  <span className="text-white">
                    Design → Lab → <span className="text-red-400">Fail</span> → Repeat
                  </span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#48cae4] mb-1">Shodh AI (6 Months)</span>
                  <span className="text-white">
                    Design → <span className="text-[#48cae4]">Matter Compiler</span> → Success
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 max-w-6xl mx-auto pb-24">
          <div className="pointer-events-auto rounded-3xl bg-white text-[#081421] p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
              <div>
                <span className="text-[#48cae4] font-bold tracking-widest text-xs uppercase mb-2 block">Our Methodology</span>
                <h2 className="text-3xl md:text-5xl font-medium text-[#081421]">The Skanda Protocol</h2>
              </div>
              <Link
                href="/protocol"
                className="inline-flex items-center gap-2 rounded-full border border-[#081421]/10 bg-[#f4f4f9] px-6 py-3 text-sm font-semibold text-[#081421] hover:bg-[#e4e4e9] transition"
              >
                Read Whitepaper <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-[#f8f9fa] border border-gray-100">
                <div className="w-10 h-10 bg-[#081421] rounded-full flex items-center justify-center text-white font-bold mb-4">1</div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-2">The Scale</h3>
                <p className="text-[#081421]/80 leading-relaxed">
                  Atomic models are too small to be useful. We model the Mesoscale—where pores, grains, and defects actually determine if a material works in a factory.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#f8f9fa] border border-gray-100">
                <div className="w-10 h-10 bg-[#48cae4] rounded-full flex items-center justify-center text-[#081421] font-bold mb-4">2</div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-2">The Design</h3>
                <p className="text-[#081421]/80 leading-relaxed">
                  We don&#39;t do trial and error. You define the target—like heat resistance or energy density—and SkandaX generates the exact microstructure to achieve it.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#f8f9fa] border border-gray-100">
                <div className="w-10 h-10 bg-[#081421] rounded-full flex items-center justify-center text-white font-bold mb-4">3</div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-2">The Lab</h3>
                <p className="text-[#081421]/80 leading-relaxed">
                  Discovery stops at the lab door. We are building Autonomous Robotics to synthesize and test these materials in days, closing the loop between software and hardware.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 max-w-6xl mx-auto pb-24">
          <div className="pointer-events-auto rounded-3xl bg-white text-[#081421] p-8 md:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#48cae4] mb-4">National Mandate</div>
                <h2 className="text-3xl md:text-5xl font-medium leading-tight mb-6">
                  SELECTED TO LEAD THE <br />&#39;AI FOR SCIENCE&#39; <br />REVOLUTION.
                </h2>
                <p className="text-lg text-[#081421]/70 mb-8">
                  Shodh AI is the flagship partner of the IndiaAI Mission. We are making the national foundation for scientific intelligence.
                </p>

                <div className="flex flex-wrap items-center gap-6 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-500">
                  <Image src="/demo/india-ai-logo.png" alt="IndiaAI" width={120} height={40} className="object-contain" />
                  <Image src="/demo/nvidia-partner-logo.png" alt="Nvidia" width={120} height={40} className="object-contain" />
                  <div className="h-8 flex items-center font-bold text-xl text-gray-400">Google</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-[#f8f9fa] border-l-4 border-[#48cae4]">
                  <h4 className="font-bold text-[#081421]">TODAY: WE BUILD.</h4>
                  <div className="text-xs font-semibold text-[#48cae4] mt-1 mb-1">THE MISSION: ENERGY STORAGE.</div>
                  <p className="text-sm text-gray-600">Removing defects and scaling safe, high-density EV batteries for the global market.</p>
                </div>
                <div className="p-5 rounded-xl bg-[#f8f9fa] border-l-4 border-[#081421]">
                  <h4 className="font-bold text-[#081421]">TOMORROW: WE DISCOVER.</h4>
                  <div className="text-xs font-semibold text-[#48cae4] mt-1 mb-1">THE MISSION: POST-LITHIUM.</div>
                  <p className="text-sm text-gray-600">Pioneering Sodium-Ion chemistries and non-lithium alternatives to secure material independence.</p>
                </div>
                <div className="p-5 rounded-xl bg-[#f8f9fa] border-l-4 border-gray-300">
                  <h4 className="font-bold text-[#081421]">THE FUTURE: WE DESIGN.</h4>
                  <div className="text-xs font-semibold text-[#48cae4] mt-1 mb-1">THE MISSION: TYPE 1 CIVILIZATION.</div>
                  <p className="text-sm text-gray-600">Materials for Fusion, Space Exploration, and Quantum Computing.</p>
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
