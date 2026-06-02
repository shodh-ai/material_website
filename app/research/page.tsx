import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BrainCircuit,
  ChevronRight,
  Database,
  Factory,
  FileText,
  Lock,
  Microscope,
  Network,
  Sparkles,
} from "lucide-react";
import CanvasLayer from "@/components/three/CanvasLayer";

const researchPillars = [
  {
    title: "Multi-physics foundation models",
    label: "Continuum + atomistic + process",
    text: "Models that learn the coupling between transport, thermodynamics, reaction kinetics, microstructure, and manufacturability.",
    icon: BrainCircuit,
  },
  {
    title: "Differentiable inverse design",
    label: "Targets into recipes",
    text: "Optimization systems that work backward from yield, purity, throughput, stability, and cost constraints into practical process windows.",
    icon: Network,
  },
  {
    title: "Sim-to-real calibration",
    label: "Synthetic data grounded in plants",
    text: "Closed-loop calibration pipelines that convert plant telemetry, microscopy, and experiment logs into better predictive physics.",
    icon: Microscope,
  },
];

const publications = [
  {
    status: "Available",
    title: "Bridging the Scale-Up Chasm",
    description: "A technical overview of how differentiable physics and generative design can compress chemical and materials scale-up.",
    meta: "Whitepaper",
    href: "http://arxiv.org/abs/2605.15179",
  },
  {
    status: "In progress",
    title: "Shodh AI V3.0 Architecture Report",
    description: "A deeper systems paper on unifying quantum, atomistic, mesoscale, and continuum modeling inside one production-grade engine.",
    meta: "Architecture report",
    href: "mailto:contact@shodhai.com?subject=Shodh%20AI%20V3.0%20Architecture%20Report%20Waitlist",
  },
  {
    status: "Case study",
    title: "Factory-Calibrated Digital Twins",
    description: "How process telemetry can tune simulation priors for reactor design, battery materials, and specialty chemical manufacturing.",
    meta: "Research brief",
    href: "mailto:contact@shodhai.com?subject=Factory-Calibrated%20Digital%20Twins%20Brief",
  },
];

const stack = [
  { title: "Physics kernels", text: "Differentiable solvers and learned operators for flow, heat, mass transfer, electrochemistry, and reaction systems.", icon: Atom },
  { title: "Industrial datasets", text: "Structured pipelines for microscopy, sensor telemetry, CAD, lab notebooks, and pilot-plant operating histories.", icon: Database },
  { title: "Generative CAD", text: "Geometry and recipe generation constrained by manufacturability, safety, operating envelopes, and downstream validation.", icon: Factory },
  { title: "Secure deployment", text: "On-premise and air-gapped research workflows for customers with classified chemistry and production IP.", icon: Lock },
];

const roadmap = [
  "Publish scale-up and inverse-design benchmarks for process engineering.",
  "Release partner case studies across specialty chemicals, batteries, and advanced materials.",
  "Expand the foundation model to bridge molecular, mesoscale, and factory-scale physics.",
];

export default function ResearchPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#081421] text-[#f0f0ff] selection:bg-[#48cae4] selection:text-[#081421]">
      <CanvasLayer />
      <main id="html-scroll-container" className="relative z-[2] w-full pointer-events-none scroll-smooth">
        <header className="fixed left-0 right-0 top-0 z-50 pointer-events-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 shadow-2xl backdrop-blur-xl">
              <Link href="/" className="flex items-center gap-3" aria-label="Shodh AI home">
                <Image src="/shodhai_logo.svg" alt="Shodh AI" width={136} height={32} className="h-5 w-auto" priority />
              </Link>
              <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
                <Link href="#publications" className="transition-colors hover:text-white">Publications</Link>
                <Link href="#platform" className="transition-colors hover:text-white">Platform</Link>
                <Link href="#roadmap" className="transition-colors hover:text-white">Roadmap</Link>
              </nav>
              <Link href="mailto:contact@shodhai.com?subject=Research%20Collaboration" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-xs font-semibold text-[#081421] transition hover:bg-[#dffbff] md:px-5">
                Collaborate
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        <section className="pointer-events-auto px-4 pb-20 pt-32 sm:px-6 md:px-10 md:pb-28 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-6xl">
              <div className="mb-6 inline-flex items-center gap-3 rounded-lg border border-[#48cae4]/20 bg-[#48cae4]/10 px-3 py-2 backdrop-blur-md">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#48cae4] shadow-[0_0_12px_#48cae4]" />
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#48cae4]">Research at Shodh AI</span>
              </div>
              <h1 className="text-5xl font-medium uppercase leading-[0.98] tracking-tight text-white sm:text-6xl md:text-8xl lg:text-9xl">
                Intelligence at the edge of physics.
              </h1>
              <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-white/78 md:text-2xl">
                We build foundation models, differentiable physics engines, and inverse-design systems for the hard industrial frontier: turning molecules, materials, and lab discoveries into scale-ready production.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="#publications" className="inline-flex items-center gap-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-[30px] bg-white px-6 py-3 text-base font-medium text-[#081421] transition hover:bg-[#dffbff]">
                  Read research
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="mailto:contact@shodhai.com?subject=Research%20Partnership" className="inline-flex items-center gap-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-[30px] border border-white/30 bg-white/5 px-6 py-3 text-base font-medium text-white backdrop-blur transition hover:bg-white/10">
                  Partner with us
                </Link>
              </div>
            </div>

            <div className="mt-20 grid overflow-hidden rounded-3xl border border-white/10 bg-black/25 backdrop-blur-xl md:grid-cols-3">
              {[
                { value: "4D", label: "Digital twins across space and time" },
                { value: "10M+", label: "Synthetic physics samples under active modeling" },
                { value: "100%", label: "Customer IP isolation for sensitive chemistry" },
              ].map((metric) => (
                <div key={metric.label} className="border-b border-white/10 p-8 md:border-b-0 md:border-r last:md:border-r-0">
                  <p className="text-4xl font-medium text-white md:text-6xl">{metric.value}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pointer-events-auto bg-[#f0f0ff] px-4 py-24 text-[#081421] sm:px-6 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#173a68]">Research agenda</p>
              <h2 className="mt-4 text-4xl font-medium uppercase leading-tight tracking-tight md:text-7xl">The core bets.</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {researchPillars.map((pillar) => (
                <article key={pillar.title} className="rounded-3xl border border-black/10 bg-white p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#081421] text-[#48cae4]">
                    <pillar.icon className="h-7 w-7" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#173a68]">{pillar.label}</p>
                  <h3 className="mt-3 text-3xl font-medium leading-tight">{pillar.title}</h3>
                  <p className="mt-5 text-base leading-relaxed text-black/62">{pillar.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="publications" className="pointer-events-auto px-4 py-24 sm:px-6 md:px-10 scroll-mt-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#48cae4]">Publications & briefs</p>
                <h2 className="mt-4 text-4xl font-medium uppercase leading-tight tracking-tight text-white md:text-7xl">Open technical work.</h2>
              </div>
              <Link href="mailto:contact@shodhai.com?subject=Research%20Access" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#48cae4] transition hover:text-white">
                Request access
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5">
              {publications.map((paper) => (
                <Link key={paper.title} href={paper.href} className="group grid gap-6 rounded-3xl border border-white/10 bg-[#081421]/85 p-6 shadow-2xl backdrop-blur-md transition hover:border-[#48cae4]/35 hover:bg-[#0a1a30] md:grid-cols-12 md:p-8">
                  <div className="md:col-span-2">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#48cae4]/25 bg-[#48cae4]/10 text-[#48cae4]">
                      <FileText className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#48cae4]">{paper.status} · {paper.meta}</p>
                    <h3 className="mt-3 text-2xl font-medium text-white md:text-4xl">{paper.title}</h3>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/62">{paper.description}</p>
                  </div>
                  <div className="flex items-center md:col-span-2 md:justify-end">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition group-hover:border-[#48cae4]/40 group-hover:text-white">
                      Open
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="platform" className="pointer-events-auto bg-[#f0f0ff] px-4 py-24 text-[#081421] sm:px-6 md:px-10 scroll-mt-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#173a68]">Research platform</p>
              <h2 className="mt-4 text-4xl font-medium uppercase leading-tight tracking-tight md:text-7xl">From equations to factories.</h2>
              <p className="mt-6 text-lg leading-relaxed text-black/65 md:text-xl">
                Shodh AI research is not a paper exercise. Every model is evaluated against whether it can reduce pilot iterations, improve yield, or generate manufacturable process decisions.
              </p>
            </div>
            <div className="grid gap-5 lg:col-span-7 sm:grid-cols-2">
              {stack.map((item) => (
                <article key={item.title} className="rounded-3xl border border-black/10 bg-white p-7 shadow-xl">
                  <item.icon className="h-10 w-10 text-[#173a68]" />
                  <h3 className="mt-6 text-2xl font-medium">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-black/60">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="pointer-events-auto px-4 py-24 sm:px-6 md:px-10 scroll-mt-28">
          <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur-xl md:p-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#48cae4]">Next frontier</p>
              <h2 className="mt-4 text-4xl font-medium uppercase leading-tight tracking-tight text-white md:text-6xl">Research we want to make real.</h2>
              <p className="mt-6 text-lg leading-relaxed text-white/62">
                We are looking for industrial partners, research labs, and frontier engineers working on problems where physics breaks at scale.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {roadmap.map((item, index) => (
                  <div key={item} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#48cae4]/10 text-sm font-bold text-[#48cae4]">0{index + 1}</div>
                    <p className="text-lg leading-relaxed text-white/76">{item}</p>
                  </div>
                ))}
              </div>
              <Link href="mailto:contact@shodhai.com?subject=Research%20Collaboration" className="mt-8 inline-flex items-center gap-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-[30px] bg-white px-6 py-3 text-base font-medium text-[#081421] transition hover:bg-[#dffbff]">
                Start a research conversation
                <Sparkles className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <footer className="pointer-events-auto relative w-full overflow-hidden border-t border-white/10 px-4 py-10 sm:px-6 md:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(72,202,228,0.10),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(8,20,33,0.96))]" />
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 text-sm text-white/55">
            <div className="overflow-hidden">
              <h1 className="w-full select-none whitespace-nowrap text-[clamp(4.5rem,22vw,24rem)] font-normal leading-[0.9] text-white">Shodh AI</h1>
            </div>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <Image src="/shodhai_logo.svg" alt="Shodh AI" width={136} height={32} className="h-5 w-auto" />
              <div className="flex flex-wrap gap-5">
                <Link href="/" className="hover:text-white">Home</Link>
                <Link href="/protocol" className="hover:text-white">Protocol</Link>
                <Link href="mailto:contact@shodhai.com" className="hover:text-white">Contact</Link>
              </div>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider">2026 Shodh AI. All rights reserved</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
