"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
  category: "aero" | "protein";
};

const items: GalleryItem[] = [
  {
    src: "/Screenshot 2026-06-30 at 3.49.55 PM.png",
    alt: "Aerodynamics output 1",
    category: "aero",
  },
  {
    src: "/Screenshot 2026-06-30 at 3.50.00 PM.png",
    alt: "Aerodynamics output 2",
    category: "aero",
  },
  {
    src: "/image (26).png",
    alt: "Aerodynamics output 3",
    category: "aero",
  },
  {
    src: "/6989e3d45b7a3c2eb3795578_beyond-alphafold-with-isomorphic-labs-drug-design-engine_l.jpg",
    alt: "Protein model output",
    category: "protein",
  },
];

const aeroMetrics = [
  ["Compute Time", "45 ms", "vs Legacy CFD: 72 hours"],
  ["Mass Conservation", "0.00001%", "Loss"],
  ["Fluid Grid", "3D Navier-Stokes", "Compressible Flow"],
];

export default function Page() {
  const [lightbox, setLightbox] = useState<null | GalleryItem>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const aero = items.filter((i) => i.category === "aero");
  const protein = items.find((i) => i.category === "protein");

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030712] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.22),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.18),transparent_30%),linear-gradient(135deg,#030712_0%,#08111f_45%,#020617_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:64px_64px]" />

      <section className="relative min-h-screen px-6 py-10 lg:px-12 flex items-center">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-8 inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
              Physics Model Output Deck
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              Model Outputs
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-slate-300">
              A two-slide preview of zero-shot physics simulation and molecule-to-recipe generation.
            </p>
          </div>

          <div className="relative h-[520px]">
            <div className="absolute left-0 top-10 h-72 w-[72%] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-cyan-950/40">
              <Image src={aero[0].src} alt={aero[0].alt} fill className="object-cover" priority />
            </div>
            <div className="absolute right-0 top-0 h-64 w-[56%] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-emerald-950/40">
              <Image src={protein?.src || ""} alt={protein?.alt || "Protein model output"} fill className="object-cover" priority />
            </div>
            <div className="absolute bottom-0 right-8 h-64 w-[72%] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-blue-950/40">
              <Image src={aero[2].src} alt={aero[2].alt} fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen px-6 py-10 lg:px-12 flex items-center">
        <div className="mx-auto w-full max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl lg:p-8">
          <div className="mb-7 flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">Slide 01 · Aerodynamics</div>
              <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-[-0.04em] sm:text-6xl">
                Simulating National Infrastructure in Milliseconds
              </h2>
              <p className="mt-4 text-lg text-slate-300">Zero-Shot Aerodynamics & Compressible Flow</p>
            </div>
            <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
              Train / Plane CFD
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {aero.map((img) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightbox(img)}
                className="group relative h-[330px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30 shadow-2xl shadow-black/30 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35"
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover transition duration-500 group-hover:scale-105" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />
              </button>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
            {aeroMetrics.map(([label, value, note]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/25 p-5 shadow-xl shadow-black/20">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{label}</div>
                <div className="mt-3 text-3xl font-black tracking-[-0.04em] text-white">{value}</div>
                <div className="mt-1 text-sm text-cyan-100/75">{note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen px-6 py-10 lg:px-12 flex items-center">
        <div className="mx-auto w-full max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl lg:p-8">
          <div className="mb-7 flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200/80">Slide 02 · Protein & Synthesis</div>
              <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-[-0.04em] sm:text-6xl">
                Automated Sovereign Drug Discovery
              </h2>
              <p className="mt-4 text-lg text-slate-300">Target: p53 Y220C (Oncology)</p>
            </div>
            <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-100">
              Molecule + Recipe
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            {protein && (
              <button
                type="button"
                onClick={() => setLightbox(protein)}
                className="relative min-h-[520px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/30 shadow-2xl shadow-black/30 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/35"
              >
                <Image src={protein.src} alt={protein.alt} fill className="object-cover transition duration-500 hover:scale-105" priority />
              </button>
            )}

            <div className="rounded-[1.75rem] border border-emerald-300/15 bg-[#06120f]/90 p-6 shadow-2xl shadow-emerald-950/25">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="text-2xl font-black tracking-[-0.03em] text-white">AI-Generated Retrosynthesis & Validation</h3>
                <span className="shrink-0 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                  Zero-Shot
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-sm leading-6 text-slate-200">
                <div className="mb-4 text-emerald-200">Target: CCCCS(=O)(=O)NCCOc1cncc2[nH]c(F)c(C(F)(F)F)c12</div>

                <div className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Validation Metrics</div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <div className="text-slate-400">Binding Affinity</div>
                    <div className="mt-1 text-lg font-black text-white">-14.16</div>
                    <div className="text-xs text-emerald-100/70">kcal/mol · ~40 pM</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <div className="text-slate-400">Stability</div>
                    <div className="mt-1 text-lg font-black text-white">0.048</div>
                    <div className="text-xs text-emerald-100/70">eV/Å · MACE</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <div className="text-slate-400">hERG Gap</div>
                    <div className="mt-1 text-lg font-black text-white">+7.89</div>
                    <div className="text-xs text-emerald-100/70">kcal/mol</div>
                  </div>
                </div>

                <div className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Automated 4-Step Synthesis Route</div>
                <ol className="mt-3 space-y-3 text-slate-200">
                  <li>1. Protect azaindole NH on the fluoro/trifluoromethyl core.</li>
                  <li>2. O-alkylate with tert-butyl N-(2-bromoethyl)carbamate (CAS 39684-80-5).</li>
                  <li>3. Boc deprotect to expose the aminoethyl ether.</li>
                  <li>4. Sulfonylate with butane-1-sulfonyl chloride (CAS 2386-60-9) & purify.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
              aria-label="Close"
            >
              Close
            </button>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1920}
              height={1200}
              className="max-h-[82vh] w-full rounded-2xl object-contain ring-1 ring-white/10"
            />
          </div>
        </div>
      )}
    </main>
  );
}
