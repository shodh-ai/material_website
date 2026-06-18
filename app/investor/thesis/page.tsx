import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shodh AI: Foundation Model for Industrial Scale-Up",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t-2 border-black bg-white px-4 py-10 md:px-10 md:py-14 xl:px-16">
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        <div>
          <p className="w-fit border border-black bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-black">
            {number}
          </p>
        </div>
        <div className="max-w-none">
          <h2 className="mb-7 max-w-6xl text-2xl font-semibold tracking-tight text-black md:text-4xl">
            {title}
          </h2>
          <div className="max-w-none space-y-5 text-base leading-8 text-black md:text-lg md:leading-9">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function Highlight({ children }: { children: ReactNode }) {
  return <strong className="bg-amber-50 px-1 font-semibold text-black">{children}</strong>;
}

function Emphasis({ children }: { children: ReactNode }) {
  return <em className="font-semibold text-black">{children}</em>;
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-4 border-black bg-amber-50 px-5 py-4 text-xl font-semibold leading-9 text-black md:text-2xl md:leading-10">
      {children}
    </p>
  );
}

export default function IndustrialScaleUpPage() {
  return (
    <main className="min-h-screen w-full bg-white font-mono text-black selection:bg-black selection:text-white [&_*]:!rounded-none [&_*]:!shadow-none [&_div]:!border-black [&_h1]:!font-semibold [&_h2]:!font-semibold [&_p]:!text-black [&_section]:!border-black [&_section]:!bg-white [&_strong]:!text-black">
      <header className="w-full border-b-2 border-black bg-white px-4 py-12 md:px-10 md:py-16 xl:px-16 xl:py-20">
        <div className="flex w-full flex-col gap-6 border-b-2 border-black pb-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-7xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-black">
              Shodh AI Investor Brief
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-black md:text-6xl xl:text-7xl">
              Shodh AI: Foundation Model for Industrial Scale-Up
            </h1>
          </div>
          <p className="w-fit shrink-0 border border-black bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-black">
            Confidential Review
          </p>
        </div>
        <p className="mt-8 max-w-6xl text-lg leading-8 text-black md:text-2xl md:leading-10">
          Shodh is building the <Highlight>"physics-native intelligence layer"</Highlight> that connects lab discovery, process engineering, plant constraints, and commercial manufacturability.
        </p>
      </header>

      <Section number="01" title="The Problem: Scale-Up “Death Valley”">
        <p>Industrial innovation often fails between lab success and factory production.</p>
        <p>
          A molecule, battery material, or catalyst may work well in a lab. But it can fail at plant scale because of <Highlight>heat transfer</Highlight>, <Highlight>fluid shear</Highlight>, <Highlight>viscosity</Highlight>, <Highlight>mixing behavior</Highlight>, or <Highlight>equipment limits</Highlight>.
        </p>
        <p>
          Today, scale-up still depends on <Emphasis>trial-and-error</Emphasis>, <Emphasis>expert intuition</Emphasis>, and <Emphasis>siloed software</Emphasis>.
        </p>
        <p>
          Discovery AI creates molecules, but stops before <Highlight>manufacturability</Highlight>. Engineering simulators optimize flow, but do not deeply understand chemistry. Digital twins monitor plants, but rarely connect back to molecular behavior.
        </p>
        <p>Shodh connects these layers into one continuous computational loop.</p>
        <p>The core question Shodh answers is simple:</p>
        <Callout>“Can this scientific discovery be manufactured reliably, economically, and at scale?”</Callout>
      </Section>

      <Section number="02" title="Shodh’s Multiscale Advantage">
        <p>
          Shodh is building a <Highlight>physics-native foundation model</Highlight> for industrial R&amp;D and manufacturing scale-up.
        </p>
        <p>
          It unifies <Emphasis>chemistry</Emphasis> and <Emphasis>physics</Emphasis> in one AI architecture. This creates a <Highlight>“zoom-in / zoom-out”</Highlight> capability.
        </p>
        <p>
          <Highlight>Micro to Macro:</Highlight> Start with a new molecular structure. Predict whether it can survive heat transfer, shear stress, mixing constraints, and reactor conditions in a <Emphasis>10,000-liter plant</Emphasis>.
        </p>
        <p>
          <Highlight>Macro to Micro:</Highlight> Start with a factory process facing yield loss or instability. Trace the root cause back to molecular behavior, process conditions, and equipment interactions.
        </p>
      </Section>

      <Section number="03" title="Faster Process Optimization">
        <p>Shodh shifts industrial R&amp;D from a slow physical loop:</p>
        <Callout>“Guess → Test → Learn”</Callout>
        <p>to a computational loop:</p>
        <Callout>“Simulate → Inverse-Design → Validate → Scale”</Callout>
        <p>
          The lab remains essential. But Shodh moves most of the search into computation. This reduces blind experimentation and compresses scale-up timelines from <Emphasis>years to weeks</Emphasis>.
        </p>
        <p>
          Key use cases include <Highlight>reaction yield optimization</Highlight>, <Highlight>process-window design</Highlight>, <Highlight>lab-to-pilot-to-plant feasibility</Highlight>, <Highlight>failure-mode prediction</Highlight>, rheology, mixing, and exothermic heat-transfer management.
        </p>
      </Section>

      <Section number="04" title="Technical Progress and Commercial Traction">
        <p>
          Shodh has built and validated a <Highlight>1-billion parameter multiscale physical foundation model</Highlight>. The model is now scaling toward <Highlight>a trillion parameters</Highlight>.
        </p>
        <p>
          Shodh is supported by IndiaAI-backed compute access. Larger compute proposals are under active discussion, including an anticipated <Highlight>30 million compute hours allocation</Highlight>.
        </p>
        <p>
          In technical discussions with <Highlight>Google Cloud’s senior TPU engineering team</Highlight>, including Distinguished Scientist <Highlight>Diwakar Gupta</Highlight>, Shodh’s workload was discussed as operating at the <Emphasis>extreme edge of AI-for-science compute</Emphasis>, with potential relevance not only for <Highlight>large-scale TPU training</Highlight> but also as feedback for <Highlight>future TPU architecture and silicon development</Highlight>.
        </p>
        <p>
          Shodh is also engaging with industrial partners across specialty chemicals, energy storage, sustainable fuels, and biopharma.
        </p>
        <p>
          The company is building <Emphasis>"sim-to-real calibration layers"</Emphasis> that adapt the model to each partner’s plant conditions and historical data.
        </p>
        <p>
          Shodh’s commercial and technical direction is supported by senior leaders across biopharma and enterprise technology, including <Highlight>Rahul Singhvi</Highlight> and <Highlight>Arun Seth</Highlight>.
        </p>
      </Section>
    </main>
  );
}
