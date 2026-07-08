import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import { ArrowUpRight, Atom, Cpu, Factory, FlaskConical, Gauge, Network, Orbit, ShieldCheck, Waves, Zap } from "lucide-react";
import UnicornBackground from "@/components/UnicornBackground";

const syne = localFont({
  src: "../../public/shodh-new/Syne/Syne-VariableFont_wght.ttf",
  display: "swap",
  weight: "100 900",
});

const visionCards = [
  {
    title: "Universal World Model",
    body: "Control and optimize factory scale-up across chemistry, biology, and industrial systems.",
    icon: Orbit,
  },
  {
    title: "Physics-native AI",
    body: "UNIPHY reasons over thermodynamics, fluid dynamics, and quantum chemistry in one latent space.",
    icon: Atom,
  },
  {
    title: "Physical OS",
    body: "The operating system for the physical economy: from recipe to factory execution.",
    icon: Network,
  },
];

const gapCards = [
  {
    title: "1L → 10,000L",
    body: "Scale-up still takes 12–18 months and millions in physical iteration.",
    icon: Gauge,
  },
  {
    title: "Physics breaks",
    body: "Fluids clog, heat spikes, shear destroys yield, and batches fail.",
    icon: Zap,
  },
  {
    title: "Tools are split",
    body: "Discovery software and factory software do not speak the same physics language.",
    icon: Waves,
  },
];

const products = [
  {
    eyebrow: "Recipe engine",
    title: "Shodh SYNTH",
    body: "Maps low-cost, thermodynamically stable manufacturing routes for LNPs, peptides, and advanced pharma cores.",
    icon: FlaskConical,
  },
  {
    eyebrow: "Factory twin",
    title: "Shodh SCALE",
    body: "Simulates non-Newtonian flow, shear stress, and thermal runaway from bench data and 3D CAD before machines turn on.",
    icon: Factory,
  },
];

const proofCards = [
  {
    value: "14 min",
    title: "Thermal runaway predicted",
    body: "10,000L failure replayed from historical factory data.",
  },
  {
    value: "$8M",
    title: "Avoided loss potential",
    body: "A preventable catastrophic scale-up failure at Tier-1 scale.",
  },
  {
    value: "80%",
    title: "COGS reduction mapped",
    body: "A 6-step route compressed into a novel 2-step pathway.",
  },
  {
    value: "94%",
    title: "Shodh-100 benchmark",
    body: "UNIPHY vs. GPT-4o at 12% on industrial physics tasks.",
  },
];

const scaleCards = [
  {
    title: "100B physics model",
    body: "Expand into nuclear, semiconductors, and cross-domain factory scale-up.",
    icon: Cpu,
  },
  {
    title: "Physical validation",
    body: "Run near-miss stress tests at pilot plants and build the Sim-to-Real leaderboard.",
    icon: ShieldCheck,
  },
  {
    title: "Factory deployment",
    body: "Install edge AI into SCADA-connected enterprise workflows.",
    icon: Factory,
  },
  {
    title: "Core R&D",
    body: "Mesh-free neural operators and continuous-time mathematics for Tokenizer V2.",
    icon: Atom,
  },
];

export default function DiscussionPage() {
  return (
    <main className={`${syne.className} biomanufacturing-page relative min-h-screen bg-transparent text-[#1a1a2e] selection:bg-[#000042] selection:text-white`}>
      <div className="unicorn-bg-print-hide">
        <UnicornBackground />
      </div>

      <section className="relative z-10 min-h-screen overflow-hidden border-b border-[#000042]/20">
        <img className="print-bg hidden" src="/webgl-bg-light.png" alt="" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 sm:px-6 sm:py-8 md:px-10 lg:px-14">
          <header className="flex items-center justify-between py-2 sm:py-3">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/shodh-new/White%20Shodh%20AI%20Brandmark.svg" alt="Shodh AI" width={40} height={40} priority className="h-8 w-8 invert sm:h-10 sm:w-10" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#000042]/25 bg-transparent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#000042] transition hover:border-[#000042]/60 hover:bg-[#000042]/10 sm:px-5 sm:py-2 sm:text-[11px]"
            >
              Home
              <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Link>
          </header>

          <div className="grid flex-1 items-center gap-8 py-10 sm:gap-12 sm:py-16 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#000042]/55 sm:text-xs sm:tracking-[0.24em]">Shodh AI / UNIPHY</p>
              <h1 className="mt-4 max-w-5xl text-[38px] font-medium leading-[1.02] tracking-[-0.04em] text-[#000042] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                The World Model for Factory Scale-Up
              </h1>
              <p className="mt-5 max-w-3xl text-base font-light leading-relaxed text-[rgba(0,0,66,0.75)] sm:mt-8 sm:text-lg md:text-xl lg:text-2xl">
                From molecular recipe to factory control, one physics-native intelligence layer.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[1.5rem] border border-[#000042]/10 bg-white/30 p-5 shadow-2xl shadow-[#000042]/10 backdrop-blur-xl sm:rounded-[2rem] sm:p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000042]/55 sm:text-xs sm:tracking-[0.24em]">Operating System</p>
                  <Atom className="h-6 w-6 text-[#000042] sm:h-8 sm:w-8" />
                </div>
                <div className="mt-6 grid gap-3">
                  {visionCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <div key={card.title} className="rounded-2xl border border-[#000042]/10 bg-white/25 px-4 py-4 text-[rgba(0,0,66,0.75)]">
                        <div className="flex items-start gap-3">
                          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#000042]" />
                          <div>
                            <h3 className="text-base font-semibold text-[#000042]">{card.title}</h3>
                            <p className="mt-1 text-sm leading-relaxed">{card.body}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 min-h-screen border-y border-[#000042]/10 px-5 py-12 text-[#1a1a2e] sm:px-6 sm:py-20 md:px-10 lg:px-14">
        <img className="print-bg hidden" src="/webgl-bg-light.png" alt="" />
        <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl flex-col justify-center">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000042]/50 sm:text-xs sm:tracking-[0.24em]">Tech Transfer Gap</p>
            <h2 className="mt-3 text-4xl font-medium tracking-[-0.04em] text-[#000042] sm:mt-4 sm:text-5xl md:text-7xl">
              The recipe works in the lab. The factory breaks the physics.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-14">
            {gapCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-3xl border border-[#000042]/10 bg-white/30 p-6 shadow-xl shadow-[#000042]/5 backdrop-blur-md md:p-7">
                  <Icon className="h-8 w-8 text-[#000042]" />
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-[#000042]">{card.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-[rgba(0,0,66,0.75)]">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-[#000042]/10">
        <img className="print-bg hidden" src="/webgl-bg-light.png" alt="" />
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <article key={product.title} className={index === 0 ? "flex min-h-[50vh] flex-col justify-between bg-white px-5 py-10 sm:px-6 md:px-10 lg:min-h-screen lg:px-[60px] lg:py-[60px]" : "flex min-h-[50vh] flex-col justify-between bg-transparent px-5 py-10 sm:px-6 md:px-10 lg:min-h-screen lg:px-[60px] lg:py-[60px]"}>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#000042] sm:text-[11px]">{product.eyebrow}</p>
                  <h2 className="mt-5 text-[42px] font-semibold uppercase leading-[0.88] tracking-[-0.02em] text-[#000042] sm:text-[56px] lg:text-[72px]">
                    {product.title}
                  </h2>
                </div>
                <div className="my-10 flex justify-center lg:my-0">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/40 bg-white/30 text-[#000042] shadow-xl shadow-[#000042]/5 backdrop-blur-md sm:h-28 sm:w-28">
                    <Icon className="h-14 w-14 stroke-[1.5] sm:h-16 sm:w-16" />
                  </div>
                </div>
                <p className="max-w-xl text-[17px] leading-relaxed tracking-[-0.01em] text-[rgba(0,0,66,0.78)] sm:text-[19px]">
                  {product.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 min-h-screen border-y border-[#000042]/10 px-5 py-12 text-[#1a1a2e] sm:px-6 sm:py-20 md:px-10 lg:px-14">
        <img className="print-bg hidden" src="/webgl-bg-light.png" alt="" />
        <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl flex-col justify-center">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000042]/50 sm:text-xs sm:tracking-[0.24em]">Evidence</p>
              <h2 className="mt-3 text-4xl font-medium tracking-[-0.04em] text-[#000042] sm:mt-4 sm:text-5xl md:text-7xl">
                Factory-grade physics, already turning into paid deployment.
              </h2>
            </div>
            <div className="rounded-3xl bg-[#000042] p-6 text-white shadow-2xl shadow-[#000042]/15 lg:col-span-5 lg:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">Commercial traction</p>
              <p className="mt-4 text-3xl font-light leading-tight tracking-[-0.04em] md:text-4xl">
                LOIs converted into a paid pilot before physical production begins.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:mt-14">
            {proofCards.map((card) => (
              <div key={card.title} className="rounded-3xl border border-[#000042]/10 bg-white/30 p-5 shadow-xl shadow-[#000042]/5 backdrop-blur-md md:p-6">
                <p className="text-5xl font-semibold tracking-[-0.06em] text-[#000042]">{card.value}</p>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em] text-[#000042]">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[rgba(0,0,66,0.75)]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 min-h-screen px-5 py-12 sm:px-6 sm:py-20 md:px-10 lg:px-14">
        <img className="print-bg hidden" src="/webgl-bg-light.png" alt="" />
        <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl flex-col justify-center">
          <div className="rounded-[1.5rem] border border-[#000042]/10 bg-white/30 p-6 shadow-2xl shadow-[#000042]/10 backdrop-blur-xl sm:rounded-[2rem] md:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000042] sm:text-xs sm:tracking-[0.24em]">Scale Plan</p>
                <h2 className="mt-3 text-4xl font-medium tracking-[-0.04em] text-[#000042] sm:mt-4 sm:text-5xl md:text-7xl">
                  Turn UNIPHY into the industrial control layer.
                </h2>
              </div>
              <div className="lg:col-span-4">
                <div className="rounded-3xl bg-[#000042] p-5 text-white sm:p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/55">Next milestone</p>
                  <p className="mt-3 text-2xl font-light leading-tight tracking-[-0.04em] sm:mt-4 sm:text-3xl">100B parameters, physical validation, factory deployment.</p>
                </div>
              </div>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {scaleCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="rounded-3xl border border-[#000042]/10 bg-white/35 p-5 shadow-xl shadow-[#000042]/5 backdrop-blur-md">
                    <Icon className="h-7 w-7 text-[#000042]" />
                    <h3 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-[#000042]">{card.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[rgba(0,0,66,0.75)]">{card.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
