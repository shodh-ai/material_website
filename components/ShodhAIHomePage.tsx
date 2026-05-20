"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Atom,
  Beaker,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Download,
  Factory,
  FileText,
  FlaskConical,
  Lock,
  Mail,
  Network,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import CanvasLayer from "@/components/three/CanvasLayer";

const navLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "Research", href: "#research" },
  { label: "Company", href: "#company" },
];

const pillars = [
  {
    title: "The Foundation Brain",
    subtitle: "Multi-Physics MoE",
    icon: Cpu,
    text: "Trained on Google TPUs and NVIDIA H100s, it models thermodynamics, flow, and mass conservation together.",
  },
  {
    title: "The 4D Digital Twin",
    subtitle: "Factory-specific reality model",
    icon: Network,
    text: "Your sensor logs teach the model the friction, wear, and thermal drift of your actual line, not an ideal factory.",
  },
  {
    title: "The Inverse CAD Generator",
    subtitle: "MIMIC",
    icon: Factory,
    text: "Give it yield, purity, and throughput targets. It works backward into machine geometry and operating parameters.",
  },
];

const industries = [
  {
    title: "Specialty Chemicals & CDMOs",
    icon: FlaskConical,
    application: "Batch-to-continuous flow, yield purity, and reactor dead-zone removal.",
    impact: "Solves purity bottlenecks while reducing physical qualification costs.",
  },
  {
    title: "Energy & Advanced Materials",
    icon: Atom,
    application: "High-silicon anodes, thick-gel wetting, and semi-solid battery scale-up.",
    impact: "Cuts pilot iterations for next-generation gigafactories.",
  },
  {
    title: "Heavy Industry & Aerospace",
    icon: Rocket,
    application: "Thermal management, immersion cooling, and extreme-environment flow geometry.",
    impact: "Generates manufacturable parts that improve heat transfer and reduce pressure drop.",
  },
];

const freeDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "proton.me", "protonmail.com"];
const whitepaperUrl = "http://arxiv.org/abs/2605.15179";
const contactEmail = "contact@shodhai.com";
const waitlistEmailAddress = "waitlist@shodh.ai";

function encodeMailto(subject: string, body: string, recipient = contactEmail) {
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ShodhAIHomePage() {
  const [whitepaperEmail, setWhitepaperEmail] = useState("");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [downloadMessage, setDownloadMessage] = useState("");
  const [waitlistMessage, setWaitlistMessage] = useState("");
  const [demoForm, setDemoForm] = useState({ name: "", email: "", company: "", challenge: "" });
  const [demoMessage, setDemoMessage] = useState("");

  const isCorporateEmail = (email: string) => {
    const domain = email.trim().toLowerCase().split("@")[1];
    return Boolean(domain && !freeDomains.includes(domain));
  };

  const handleWhitepaper = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isCorporateEmail(whitepaperEmail)) {
      setDownloadMessage("Please use a corporate email to access the whitepaper.");
      return;
    }
    setDownloadMessage("Access granted. Opening the whitepaper.");
    window.open(whitepaperUrl, "_blank", "noopener,noreferrer");
  };

  const handleWaitlist = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!waitlistEmail.includes("@")) {
      setWaitlistMessage("Enter a valid email to join early access.");
      return;
    }
    setWaitlistMessage("Opening your email client to confirm early access.");
    window.location.href = encodeMailto(
      "Shodh AI V3.0 Early Access Waitlist",
      `Please add me to the Shodh AI V3.0 Architecture Report early access waitlist.\n\nEmail: ${waitlistEmail}`,
      waitlistEmailAddress
    );
  };

  const handleDemo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!demoForm.name || !demoForm.email || !demoForm.company) {
      setDemoMessage("Please add your name, corporate email, and company.");
      return;
    }
    setDemoMessage("Opening your email client with a pre-filled demo request.");
    window.location.href = encodeMailto(
      "Book a Technical Demo",
      `Name: ${demoForm.name}\nEmail: ${demoForm.email}\nCompany: ${demoForm.company}\n\nManufacturing challenge:\n${demoForm.challenge || "Not provided"}`
    );
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#081421] text-[#f0f0ff] selection:bg-[#48cae4] selection:text-[#081421]">
      <CanvasLayer />
      <main id="html-scroll-container" className="relative z-[2] w-full pointer-events-none scroll-smooth">
        <header className="fixed left-0 right-0 top-0 z-50 pointer-events-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 shadow-2xl backdrop-blur-xl">
              <Link href="#top" className="flex items-center gap-3" aria-label="Shodh AI home">
                <Image src="/shodhai_logo.svg" alt="Shodh AI" width={136} height={32} className="h-5 w-auto" priority />
              </Link>

              <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </nav>

              <Link
                href="#book-demo"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-xs font-semibold text-[#081421] transition hover:bg-[#dffbff] md:px-5"
              >
                Book Demo
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        <section id="top" className="min-h-screen px-4 pb-16 pt-32 sm:px-6 md:px-10 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <div className="pointer-events-auto max-w-5xl">
              <div className="mb-6 inline-flex items-center gap-3 rounded-lg border border-[#48cae4]/20 bg-[#48cae4]/10 px-3 py-2 backdrop-blur-md">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#48cae4] shadow-[0_0_12px_#48cae4]" />
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#48cae4]">Scale-ready physical products</span>
              </div>

              <h1 className="max-w-6xl text-5xl font-medium uppercase leading-[0.98] tracking-tight text-white sm:text-6xl md:text-8xl lg:text-9xl">
                The world model for physical manufacturing.
              </h1>

              <p className="mt-7 max-w-3xl text-lg font-light leading-relaxed text-white/82 md:text-2xl">
                We turn lab-scale chemical, biological, and materials discoveries into scale-ready production systems.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="#book-demo" className="inline-flex items-center gap-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-[30px] bg-white px-6 py-3 text-base font-medium text-[#081421] transition hover:bg-[#dffbff]">
                  Book Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#solutions" className="inline-flex items-center gap-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-[30px] border border-white/30 bg-white/5 px-6 py-3 text-base font-medium text-white backdrop-blur transition hover:bg-white/10">
                  See the engine
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="company" className="pointer-events-auto px-4 pb-24 sm:px-6 md:px-10 scroll-mt-28">
          <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-[#081421]/80 p-6 shadow-2xl backdrop-blur-xl md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#48cae4]">Built in India. Scaled for the world.</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-medium uppercase leading-tight text-white md:text-5xl">
              Backed by IndiaAI, NVIDIA, and Google.
            </h2>
          </div>
        </section>

        <section className="pointer-events-auto bg-[#f0f0ff] px-4 py-28 text-[#081421] sm:px-6 md:px-10">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-black/10 bg-white p-6 shadow-2xl">
                <div className="absolute inset-x-8 top-1/2 h-1 -translate-y-1/2 bg-black/10" />
                <div className="absolute left-1/2 top-16 bottom-16 w-32 -translate-x-1/2 rounded-full bg-[#081421] shadow-[0_0_80px_rgba(8,20,33,0.25)]" />
                <div className="relative flex h-[360px] items-center justify-between gap-6">
                  <div className="w-36 rounded-2xl border border-[#48cae4]/30 bg-[#48cae4]/10 p-5 text-center shadow-xl">
                    <Beaker className="mx-auto h-12 w-12 text-[#173a68]" />
                    <p className="mt-4 text-sm font-bold uppercase tracking-wider">1L Lab Beaker</p>
                  </div>
                  <div className="z-10 rounded-full border border-white/20 bg-[#081421] px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-white shadow-2xl">Reality Crash</div>
                  <div className="w-36 rounded-2xl border border-black/10 bg-black/[0.03] p-5 text-center shadow-xl">
                    <Factory className="mx-auto h-12 w-12 text-[#081421]" />
                    <p className="mt-4 text-sm font-bold uppercase tracking-wider">10,000L Factory</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#173a68]">The Problem</p>
              <h2 className="mt-4 text-4xl font-medium uppercase leading-tight tracking-tight md:text-7xl">The scale-up crash</h2>
              <p className="mt-8 text-3xl font-medium leading-tight md:text-5xl">Chemistry doesn't fail. Physics fails at scale.</p>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-black/65">
                <p>AI and labs discover molecules fast. Scaling them from 1L to 10,000L still takes years, pilot plants, scrap, and iteration.</p>
                <p>Fluid dynamics, shear stress, and thermal dead-zones appear at production scale. Legacy simulation cannot bridge that gap.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="pointer-events-auto px-4 py-28 sm:px-6 md:px-10 scroll-mt-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#48cae4]">Physics-constrained inverse design</p>
              <h2 className="mt-4 text-4xl font-medium uppercase leading-tight tracking-tight text-white md:text-7xl">From target to factory geometry.</h2>
              <p className="mt-6 text-lg leading-relaxed text-white/68 md:text-xl">Set the target: yield, purity, throughput. Shodh AI works backward into printable geometry and operating conditions that can hit it.</p>
            </div>

            <div className="mb-10 grid overflow-hidden rounded-3xl border border-white/10 bg-black/25 backdrop-blur-xl md:grid-cols-3">
              {[
                { label: "01 Intent", value: "Target yield, purity, throughput" },
                { label: "02 Physics", value: "Differentiable thermodynamics + flow" },
                { label: "03 Reality", value: "CAD geometry + operating recipe" },
              ].map((step) => (
                <div key={step.label} className="border-b border-white/10 p-8 md:border-b-0 md:border-r last:md:border-r-0">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#48cae4]">{step.label}</p>
                  <p className="mt-4 text-2xl font-medium text-white">{step.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {pillars.map((pillar) => (
                <article key={pillar.title} className="group rounded-3xl border border-white/10 bg-[#081421]/85 p-8 shadow-2xl backdrop-blur-md transition hover:border-[#48cae4]/35 hover:bg-[#0a1a30]">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#48cae4]/25 bg-[#48cae4]/10 text-[#48cae4] transition group-hover:scale-105">
                    <pillar.icon className="h-7 w-7" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#48cae4]">{pillar.subtitle}</p>
                  <h3 className="mt-3 text-2xl font-medium text-white">{pillar.title}</h3>
                  <p className="mt-5 text-base leading-relaxed text-white/62">{pillar.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="industries" className="pointer-events-auto bg-[#f0f0ff] px-4 py-28 text-[#081421] sm:px-6 md:px-10 scroll-mt-28">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-16 max-w-4xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#173a68]">Industries & Traction</p>
              <h2 className="mt-4 text-4xl font-medium uppercase leading-tight tracking-tight md:text-7xl">One physics engine. Many industrial frontiers.</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {industries.map((industry) => (
                <article key={industry.title} className="flex min-h-[340px] flex-col rounded-3xl border border-black/10 bg-white p-8 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#081421] text-[#48cae4]">
                    <industry.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-3xl font-medium leading-tight">{industry.title}</h3>
                  <div className="mt-8 space-y-5 text-base leading-relaxed text-black/65">
                    <p><span className="font-semibold text-[#081421]">Application: </span>{industry.application}</p>
                    <p><span className="font-semibold text-[#081421]">Impact: </span>{industry.impact}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pointer-events-auto px-4 py-28 sm:px-6 md:px-10">
          <div className="mx-auto grid max-w-7xl items-center gap-12 rounded-3xl border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur-xl md:p-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="relative mx-auto flex h-72 w-72 items-center justify-center rounded-full border border-[#48cae4]/20 bg-[#48cae4]/5">
                <div className="absolute inset-8 rounded-full border border-white/10" />
                <div className="absolute inset-16 rounded-full border border-[#48cae4]/25 bg-[#48cae4]/10" />
                <Lock className="relative h-20 w-20 text-[#48cae4]" />
                <div className="absolute -bottom-4 rounded-full border border-white/15 bg-white px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#081421]">100% IP Ownership</div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#48cae4]">Enterprise Security</p>
              <h2 className="mt-4 text-4xl font-medium uppercase leading-tight tracking-tight text-white md:text-7xl">Zero-trust for classified IP.</h2>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/68">
                <p className="text-2xl font-medium text-white">Your chemistry and telemetry stay inside your walls.</p>
                <p>Universal physics stays separate from trade secrets. Deployment can be air-gapped and on-premise.</p>
                <p>You retain full ownership of generated CAD, compositions, outputs, and patents.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="research" className="pointer-events-auto bg-[#f0f0ff] px-4 py-28 text-[#081421] sm:px-6 md:px-10 scroll-mt-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#173a68]">Research</p>
              <h2 className="mt-4 text-4xl font-medium uppercase leading-tight tracking-tight md:text-7xl">Intelligence at the edge of physics</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-xl md:p-10">
                <FileText className="h-12 w-12 text-[#173a68]" />
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#173a68]">Currently Available</p>
                <h3 className="mt-3 text-3xl font-medium">Whitepaper: Bridging the Scale-Up Chasm</h3>
                <p className="mt-5 text-base leading-relaxed text-black/60">How differentiable physics can replace trial-and-error scale-up.</p>
                <form onSubmit={handleWhitepaper} className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={whitepaperEmail}
                    onChange={(event) => setWhitepaperEmail(event.target.value)}
                    placeholder="you@company.com"
                    className="min-h-12 flex-1 rounded-xl border border-black/10 bg-black/[0.03] px-4 text-sm outline-none transition focus:border-[#173a68]"
                  />
                  <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#081421] px-5 text-sm font-semibold text-white transition hover:bg-[#173a68]">
                    <Download className="h-4 w-4" />
                    Open Whitepaper
                  </button>
                </form>
                {downloadMessage && <p className="mt-3 text-sm font-medium text-[#173a68]">{downloadMessage}</p>}
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-[#081421] p-8 text-white shadow-xl md:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(72,202,228,0.24),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.10),transparent)]" />
                <div className="absolute inset-0 backdrop-blur-[1px]" />
                <div className="relative">
                  <ShieldCheck className="h-12 w-12 text-[#48cae4]" />
                  <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#48cae4]">Coming Q4</p>
                  <h3 className="mt-3 text-3xl font-medium">Shodh AI V3.0 Architecture Report</h3>
                  <p className="mt-5 text-base leading-relaxed text-white/65">Our next model bridges quantum, atomistic, and continuum physics in one differentiable engine.</p>
                  <form onSubmit={handleWaitlist} className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      required
                      value={waitlistEmail}
                      onChange={(event) => setWaitlistEmail(event.target.value)}
                      placeholder="engineer@company.com"
                      className="min-h-12 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/40 transition focus:border-[#48cae4]"
                    />
                    <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#081421] transition hover:bg-[#dffbff]">
                      Join Waitlist
                    </button>
                  </form>
                  {waitlistMessage && <p className="mt-3 text-sm font-medium text-[#48cae4]">{waitlistMessage}</p>}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="book-demo" className="pointer-events-auto px-4 py-28 sm:px-6 md:px-10 scroll-mt-28">
          <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl border border-white/10 bg-[#081421]/85 p-6 shadow-2xl backdrop-blur-xl md:p-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#48cae4]">Build with us</p>
              <h2 className="mt-4 text-4xl font-medium uppercase leading-tight tracking-tight text-white md:text-7xl">Ready to scale your next breakthrough?</h2>
              <p className="mt-6 text-2xl font-light text-white/70">Stop guessing. Start generating.</p>
              <div className="mt-10 grid gap-4 text-white/70">
                {["Generated factory geometry", "Air-gapped deployment", "Physics-first yield targets"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#48cae4]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleDemo} className="lg:col-span-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="min-h-12 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#48cae4]" placeholder="Name" value={demoForm.name} onChange={(event) => setDemoForm({ ...demoForm, name: event.target.value })} />
                <input type="email" className="min-h-12 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#48cae4]" placeholder="Corporate email" value={demoForm.email} onChange={(event) => setDemoForm({ ...demoForm, email: event.target.value })} />
                <input className="min-h-12 rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#48cae4] sm:col-span-2" placeholder="Company" value={demoForm.company} onChange={(event) => setDemoForm({ ...demoForm, company: event.target.value })} />
                <textarea className="min-h-32 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#48cae4] sm:col-span-2" placeholder="What are you trying to scale?" value={demoForm.challenge} onChange={(event) => setDemoForm({ ...demoForm, challenge: event.target.value })} />
              </div>
              <button type="submit" className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#081421] transition hover:bg-[#dffbff]">
                Book a Technical Demo
                <Mail className="h-4 w-4" />
              </button>
              {demoMessage && <p className="mt-3 text-sm font-medium text-[#48cae4]">{demoMessage}</p>}
            </form>
          </div>
        </section>

        <footer className="pointer-events-auto relative w-full overflow-hidden border-t border-white/10 px-4 py-10 sm:px-6 md:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(72,202,228,0.10),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(8,20,33,0.96))]" />
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 text-sm text-white/55">
            <div className="overflow-hidden">
              <h1 className="w-full select-none whitespace-nowrap text-[clamp(4.5rem,22vw,24rem)] font-normal leading-[0.9] text-white">
                Shodh AI
              </h1>
            </div>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <Image src="/shodhai_logo.svg" alt="Shodh AI" width={136} height={32} className="h-5 w-auto" />
              <div className="flex flex-wrap gap-5">
                <Link href={encodeMailto("Privacy Policy Request", "Please send me Shodh AI's privacy policy.")} className="hover:text-white">Privacy Policy</Link>
                <Link href={encodeMailto("Terms of Service Request", "Please send me Shodh AI's terms of service.")} className="hover:text-white">Terms of Service</Link>
                <Link href="mailto:contact@shodhai.com" className="hover:text-white">Contact Engineering Team</Link>
              </div>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider">2026 Shodh AI. All rights reserved</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
