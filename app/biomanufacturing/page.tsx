import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";
import { ArrowUpRight, Atom, Factory, FlaskConical, Network, Orbit, Waves } from "lucide-react";
import UnicornBackground from "@/components/UnicornBackground";

const syne = localFont({
  src: "../../public/shodh-new/Syne/Syne-VariableFont_wght.ttf",
  display: "swap",
  weight: "100 900",
});

const platformPoints = [
  "A unified engine for molecular discovery and manufacturing physics",
  "Seamless bridging from quantum molecular design to macroscopic factory scale-up",
  "CDMOs, biopharma companies, and industrial leaders can compress discovery and manufacturing timelines from years to weeks",
];

const modules = [
  {
    eyebrow: "Flagship Enterprise Module 1",
    title: "Shodh SYNTH",
    subtitle: "Advanced Modalities & Retrosynthesis",
    icon: FlaskConical,
    points: [
      {
        label: "Beyond Small Molecules",
        body: "UNIPHY models the physical folding and self-assembly of advanced modalities including Lipid Nanoparticles, highly flexible Peptides, and Targeted Protein Degraders.",
      },
      {
        label: "Autonomous Manufacturing",
        body: "The synthesis engine calculates cost-effective and thermodynamically stable routes for novel molecules, then translates recipes into executable robotic laboratory code.",
      },
    ],
  },
  {
    eyebrow: "Flagship Enterprise Module 2",
    title: "Shodh SCALE",
    subtitle: "Bioreactor Digital Twins & Tech Transfer",
    icon: Factory,
    points: [
      {
        label: "Sim-to-Real Biomanufacturing",
        body: "Shodh SCALE ingests bench-scale chemistry and 3D CAD reactor geometries to simulate production in CSTRs and Fed-Batch Bioreactors.",
      },
      {
        label: "Coupling Biology to Fluid Dynamics",
        body: "By integrating biological telemetry, the platform models shear-stress interactions with cellular rupture limits to optimize RPM and oxygen transfer without destroying yield.",
      },
    ],
  },
];

const ecosystemCards = [
  {
    title: "API-first architecture",
    body: "Plug Shodh AI into modern enterprise AI workflows as the Physics & Math Engine for autonomous agents.",
    icon: Network,
  },
  {
    title: "Natural language orchestration",
    body: "Researchers can prompt an LLM agent to execute multi-physics simulations and receive actionable scale-up data.",
    icon: Waves,
  },
  {
    title: "Strategic deployment",
    body: "Pilot-plant telemetry helps mathematically close the Sim-to-Real gap for faster tech transfer and fewer failed batches.",
    icon: Orbit,
  },
];

export default function IntroPage() {
  return (
    <main className={`${syne.className} relative min-h-screen bg-transparent text-[#1a1a2e] selection:bg-[#000042] selection:text-white`}>
      <UnicornBackground />
      <section className="relative z-10 overflow-hidden border-b border-[#000042]/20">
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col px-5 py-6 sm:px-6 sm:py-8 md:px-10 lg:px-14">
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
              <h1 className="max-w-5xl text-[34px] font-medium leading-[1.02] tracking-[-0.04em] text-[#000042] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                The Universal Foundation Model for Physical Science
              </h1>
              <p className="mt-5 max-w-3xl text-base font-light leading-relaxed text-[rgba(0,0,66,0.75)] sm:mt-8 sm:text-lg md:text-xl lg:text-2xl">
                Accelerating complex synthesis, tech transfer, and biomanufacturing scale-up.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[1.5rem] border border-[#000042]/10 bg-white/30 p-5 shadow-2xl shadow-[#000042]/10 backdrop-blur-xl sm:rounded-[2rem] sm:p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000042]/55 sm:text-xs sm:tracking-[0.24em]">Platform Vision</p>
                  <Atom className="h-6 w-6 text-[#000042] sm:h-8 sm:w-8" />
                </div>
                <div className="mt-5 space-y-3 text-sm leading-relaxed text-[rgba(0,0,66,0.75)] sm:mt-6 sm:space-y-4 sm:text-base md:text-lg">
                  <p>
                    Shodh AI has built the world’s first Large Physics Model: UNIPHY, a 10-billion-parameter Mamba-MoE foundation model trained on over 15 million multi-domain physics and chemistry trajectories.
                  </p>
                  <p>
                    Unlike standard LLMs that predict the next word, UNIPHY natively simulates thermodynamics, fluid dynamics, chemistry, and molecular behavior in a continuous thermodynamic latent space.
                  </p>
                  <p className="font-semibold text-[#000042]">UNIPHY enables:</p>
                </div>
                <div className="mt-6 space-y-3">
                  {platformPoints.map((point) => (
                    <div key={point} className="rounded-2xl border border-[#000042]/10 bg-white/25 px-4 py-3 text-sm leading-relaxed text-[rgba(0,0,66,0.75)]">
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-[#000042]/10">
        {modules.map((module, index) => {
          const Icon = module.icon;
          const reversed = index % 2 === 1;
          const panel = (
            <div className="flex min-h-[auto] flex-col justify-between gap-8 bg-white px-5 py-8 sm:px-6 sm:py-10 md:px-10 lg:min-h-[78vh] lg:px-[60px] lg:py-[60px]">
              <div className="max-w-xl space-y-4 text-[15px] font-normal leading-[1.5] tracking-[-0.01em] text-[#000042] sm:space-y-5 sm:text-[16px] md:text-[18px]">
                {module.points.map((point) => (
                  <p key={point.label}>
                    <span className="font-semibold">{point.label}: </span>
                    {point.body}
                  </p>
                ))}
              </div>
              <div className="mt-2 max-w-full lg:mt-14">
                <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#000042] sm:text-[11px]">{module.eyebrow}</p>
                <h2 className="mt-4 max-w-full whitespace-normal text-[36px] font-semibold uppercase leading-[0.88] tracking-[-0.02em] text-[#000042] sm:mt-5 sm:text-[44px] lg:text-[66px] xl:text-[72px]">
                  {module.title}
                </h2>
                <p className="mt-3 text-sm text-[rgba(0,0,66,0.55)] sm:mt-4 md:text-base">{module.subtitle}</p>
              </div>
            </div>
          );
          const visual = (
            <div className="flex min-h-[280px] items-center justify-center px-5 py-10 sm:min-h-[52vh] sm:px-6 md:px-10 lg:min-h-[78vh] lg:px-[60px] lg:py-[60px]">
              <div className="flex h-full min-h-[240px] w-full flex-col items-center justify-between text-[#000042] sm:min-h-[420px]">
                <span className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#000042]/75 sm:text-xs">
                  {index === 0 ? "Advanced Synthesis" : "Scale-Up Digital Twin"}
                </span>
                <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/40 bg-white/20 text-[#000042] backdrop-blur-md sm:h-24 sm:w-24 sm:rounded-[28px]">
                  <Icon className="h-12 w-12 stroke-[1.5] sm:h-14 sm:w-14" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#000042]/75 sm:text-xs">Step {index + 1}</span>
              </div>
            </div>
          );

          return (
            <article key={module.title} className="grid min-h-[auto] grid-cols-1 lg:min-h-[78vh] lg:grid-cols-2">
              {reversed ? visual : panel}
              {reversed ? panel : visual}
            </article>
          );
        })}
      </section>

      <section className="relative z-10 border-y border-[#000042]/10 bg-transparent px-5 py-12 text-[#1a1a2e] sm:px-6 sm:py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000042]/50 sm:text-xs sm:tracking-[0.24em]">Agentic Integration & Workflow Ecosystem</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-[#000042] sm:mt-4 sm:text-4xl md:text-6xl">Built to become the physics layer for AI-native R&D.</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3">
            {ecosystemCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-3xl border border-[#000042]/10 bg-white/30 p-5 shadow-xl shadow-[#000042]/5 backdrop-blur-md sm:p-6">
                  <Icon className="h-7 w-7 text-[#000042] sm:h-8 sm:w-8" />
                  <h3 className="mt-4 text-lg font-semibold text-[#000042] sm:mt-6 sm:text-xl">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[rgba(0,0,66,0.75)] sm:mt-3">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-20 md:px-10 lg:px-14">
        <div className="rounded-[1.5rem] border border-[#000042]/10 bg-white/30 p-6 shadow-2xl shadow-[#000042]/10 sm:rounded-[2rem] md:p-12 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000042] sm:text-xs sm:tracking-[0.24em]">Partnership Opportunity</p>
              <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-[#000042] sm:mt-4 sm:text-4xl md:text-6xl">Deploy Shodh AI on real-world scale-up challenges.</h2>
              <p className="mt-5 text-base leading-relaxed text-[rgba(0,0,66,0.75)] sm:mt-6 sm:text-lg">
                We are seeking strategic partnerships with biomanufacturing leaders. By ingesting proprietary pilot-plant telemetry, our models close the Sim-to-Real gap so engineering teams can reduce trial-and-error, prevent failed batches, and accelerate Tech Transfer.
              </p>
            </div>
            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-[#000042] p-5 text-white sm:p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/55">Outcome</p>
                <p className="mt-3 text-2xl font-light leading-tight sm:mt-4 sm:text-3xl">Months of iteration compressed into actionable simulation loops.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
