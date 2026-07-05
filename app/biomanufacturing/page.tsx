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
        <div className="relative mx-auto flex min-h-[86vh] max-w-7xl flex-col px-6 py-8 md:px-10 lg:px-14">
          <header className="flex items-center justify-between px-0 py-3">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/shodh-new/White%20Shodh%20AI%20Brandmark.svg" alt="Shodh AI" width={40} height={40} priority className="h-10 w-10 invert" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#000042]/25 bg-transparent px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#000042] transition hover:border-[#000042]/60 hover:bg-[#000042]/10"
            >
              Home
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </header>

          <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-7">
              <h1 className="max-w-5xl text-5xl font-medium leading-[0.98] tracking-[-0.06em] text-[#000042] sm:text-6xl md:text-7xl lg:text-8xl">
                The Universal Foundation Model for Physical Science
              </h1>
              <p className="mt-8 max-w-3xl text-xl font-light leading-relaxed text-[rgba(0,0,66,0.75)] md:text-2xl">
                Accelerating complex synthesis, tech transfer, and biomanufacturing scale-up.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[2rem] border border-[#000042]/10 bg-white/30 p-6 shadow-2xl shadow-[#000042]/10 backdrop-blur-xl md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#000042]/55">Platform Vision</p>
                  <Atom className="h-8 w-8 text-[#000042]" />
                </div>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-[rgba(0,0,66,0.75)]">
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
            <div className="flex min-h-[52vh] flex-col justify-between bg-white px-6 py-10 md:px-10 lg:min-h-[78vh] lg:px-[60px] lg:py-[60px]">
              <div className="max-w-xl space-y-5 text-[16px] font-normal leading-[1.45] tracking-[-0.01em] text-[#000042] md:text-[18px]">
                {module.points.map((point) => (
                  <p key={point.label}>
                    <span className="font-semibold">{point.label}: </span>
                    {point.body}
                  </p>
                ))}
              </div>
              <div className="mt-14 max-w-full">
                <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#000042]">{module.eyebrow}</p>
                <h2 className="mt-5 max-w-full whitespace-normal text-[44px] font-semibold uppercase leading-[0.86] tracking-[-0.02em] text-[#000042] sm:text-[58px] lg:text-[66px] xl:text-[72px]">
                  {module.title}
                </h2>
                <p className="mt-4 text-sm text-[rgba(0,0,66,0.55)] md:text-base">{module.subtitle}</p>
              </div>
            </div>
          );
          const visual = (
            <div className="flex min-h-[52vh] items-center justify-center px-6 py-10 md:px-10 lg:min-h-[78vh] lg:px-[60px] lg:py-[60px]">
              <div className="flex h-full min-h-[420px] w-full flex-col items-center justify-between text-[#000042]">
                <span className="text-xs font-semibold uppercase tracking-[1.5px] text-[#000042]/75">
                  {index === 0 ? "Advanced Synthesis" : "Scale-Up Digital Twin"}
                </span>
                <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/40 bg-white/20 text-[#000042] backdrop-blur-md">
                  <Icon className="h-14 w-14 stroke-[1.5]" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[1.5px] text-[#000042]/75">Step {index + 1}</span>
              </div>
            </div>
          );

          return (
            <article key={module.title} className="grid min-h-[78vh] grid-cols-1 lg:grid-cols-2">
              {reversed ? visual : panel}
              {reversed ? panel : visual}
            </article>
          );
        })}
      </section>

      <section className="relative z-10 border-y border-[#000042]/10 bg-transparent px-6 py-20 text-[#1a1a2e] md:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#000042]/50">Agentic Integration & Workflow Ecosystem</p>
            <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-[#000042] md:text-6xl">Built to become the physics layer for AI-native R&D.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {ecosystemCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-3xl border border-[#000042]/10 bg-white/30 p-6 shadow-xl shadow-[#000042]/5 backdrop-blur-md">
                  <Icon className="h-8 w-8 text-[#000042]" />
                  <h3 className="mt-6 text-xl font-semibold text-[#000042]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[rgba(0,0,66,0.75)]">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-14">
        <div className="rounded-[2rem] border border-[#000042]/10 bg-white/30 p-8 shadow-2xl shadow-[#000042]/10 md:p-12 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#000042]">Partnership Opportunity</p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-[#000042] md:text-6xl">Deploy Shodh AI on real-world scale-up challenges.</h2>
              <p className="mt-6 text-lg leading-relaxed text-[rgba(0,0,66,0.75)]">
                We are seeking strategic partnerships with biomanufacturing leaders. By ingesting proprietary pilot-plant telemetry, our models close the Sim-to-Real gap so engineering teams can reduce trial-and-error, prevent failed batches, and accelerate Tech Transfer.
              </p>
            </div>
            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-[#000042] p-6 text-white">
                <p className="text-sm uppercase tracking-[0.2em] text-white/55">Outcome</p>
                <p className="mt-4 text-3xl font-light leading-tight">Months of iteration compressed into actionable simulation loops.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
