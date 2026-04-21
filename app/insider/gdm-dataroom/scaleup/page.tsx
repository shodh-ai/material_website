"use client";
import GdmDocShell from "@/components/GdmDocShell";
import { EyeOff, Lock } from "lucide-react";

function RedactedPreview({
  src,
  title,
  note,
}: {
  src: string;
  title: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/60 overflow-hidden shadow-xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-2">
          <EyeOff className="w-3.5 h-3.5 text-rose-300" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-white/60">
            Partner Data · Shown with Safety Redactions
          </span>
        </div>
        <span className="text-[10px] text-white/30 font-mono truncate max-w-[60%]">
          {title}
        </span>
      </div>

      <div className="relative bg-black">
        <div
          className="relative w-full"
          style={{ height: "560px" }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <iframe
            src={`${src}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
          />
          {/* Soft vignette so the dialog reads on top, but file stays visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute left-1/2 bottom-6 -translate-x-1/2 max-w-md w-[92%]">
            <div className="flex flex-col items-center gap-2 px-5 py-4 rounded-xl border border-rose-400/40 bg-black/80 backdrop-blur-md shadow-2xl">
              <EyeOff className="w-5 h-5 text-rose-300" />
              <p className="text-[10px] tracking-[0.35em] uppercase text-rose-300 font-semibold">
                Redacted for Safety
              </p>
              <p className="text-white/70 text-xs font-light text-center leading-relaxed">
                This is non-commercial partner data — not under NDA — which we
                are showing for transparency. We are still redacting sensitive
                regions for safety.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-white/10 bg-white/[0.02] text-[11px] text-white/45 font-light leading-relaxed">
        {note}
      </div>
    </div>
  );
}

export default function ScaleUpPage() {
  return (
    <GdmDocShell
      eyebrow="File 04 · Shodh AI — Commercial Scale-Up Case Study (Ongoing Pilot)"
      title="Scale-Up Proof — Batch-to-Continuous Conversion"
      classification="Confidential · Tier-1 Specialty Chemical Manufacturer (Aarti Industries) · NDA"
    >
      <article className="prose prose-invert max-w-none font-light text-white/70 leading-relaxed">
        <h2 className="text-2xl font-light text-white mt-0 mb-4">
          1. The Scale-Up Bottleneck
        </h2>
        <p>
          The partner currently relies on time-dependent{" "}
          <strong className="text-white">Batch Processing</strong> for a
          primary substitution reaction (A + B + C → P + S1 + S2). At the pilot
          scale, processing 70kg of organic feed requires up to 5 to 10 hours
          of maintenance time inside the reactor vessel to achieve target
          yields (98.5%+).
        </p>
        <p>
          The partner&apos;s objective is to scale up by transitioning to a{" "}
          <strong className="text-white">Continuous Flow Process</strong> to
          drastically increase factory throughput. However, converting batch
          kinetics (stirred tank) to continuous flow (tubular reactor)
          fundamentally alters the mesoscale physics—specifically fluid
          mixing, residence time, and heat transfer.
        </p>

        <h2 className="text-2xl font-light text-white mt-10 mb-4">
          2. The Shodh AI Approach
        </h2>
        <p>
          The partner provided Shodh AI with their highly classified R&amp;D
          Lab kinetics (Time vs. Concentration across 30°C–50°C) and Pilot
          Batch data (Mass balance, Conversion %, Selectivity %).
        </p>
        <p>
          Our objective is not to run a basic statistical regression, but to
          map these 1D time-domain chemical kinetics into a{" "}
          <strong className="text-white">3D spatial flow environment</strong>.
          Our Large Physics Model (LPM) utilizes its JAX-native Lattice
          Boltzmann (Navier-Stokes) and Fick&apos;s Law solvers to simulate
          how the molecules mix and react as they are pumped through specific
          3D pipe geometries.
        </p>

        <div className="not-prose my-8 rounded-xl border border-rose-400/20 bg-rose-950/10 p-5">
          <div className="flex items-start gap-3">
            <Lock className="w-4 h-4 text-rose-300 mt-0.5 shrink-0" />
            <div>
              <p className="text-rose-300 text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                A Note on the Partner Artifacts Below
              </p>
              <p className="text-white/70 text-sm font-light leading-relaxed">
                The two documents below are{" "}
                <span className="text-white">non-commercial partner data</span>{" "}
                (a pilot reactor GA drawing and an early AI-modelling case
                study) that Shodh AI used during early validation. This
                material is{" "}
                <span className="text-white">not under NDA</span>, so we are
                showing the files directly for transparency — but we are still{" "}
                <span className="text-white">redacting sensitive regions for safety</span>.
              </p>
            </div>
          </div>
        </div>

        <div className="not-prose grid md:grid-cols-2 gap-5 my-8">
          <RedactedPreview
            src="/deepmind/Pilot Reactor GA drawing.pdf"
            title="Pilot Reactor GA Drawing"
            note="Partner-supplied General Arrangement drawing of the pilot batch reactor vessel. Used to calibrate the 3D voxel geometry pipeline for the substitution reaction (A + B + C → P + S1 + S2). Non-commercial partner data — shown directly, with safety redactions."
          />
          <RedactedPreview
            src="/deepmind/Case Study _AI Modelling (CL-1 CONFIDENTIAL).pdf"
            title="Case Study — AI Modelling (CL-1 Confidential)"
            note="Early AI-modelling case study on lab kinetics and mass-balance data used by Shodh AI during initial validation. Non-commercial partner data — shown directly for transparency, with safety redactions."
          />
        </div>

        <h2 className="text-2xl font-light text-white mt-10 mb-4">
          3. Early Validation: Mapping 1D Kinetics to 3D Fluid Dynamics
        </h2>
        <p>
          In continuous flow, chemical conversion is entirely dependent on the
          physical geometry of the mixer. If fluid flows are laminar, reagents
          A and B only react at their boundary interface, severely limiting
          yield.
        </p>
        <p>
          To validate our forward surrogate model, we are testing the
          partner&apos;s kinetic parameters across baseline 3D flow geometries
          before generating novel inverse designs:
        </p>
        <ul className="space-y-3 my-4">
          <li>
            <strong className="text-white">
              Test Case 1: Standard T-Junction:
            </strong>{" "}
            Our JAX engine simulated feeds A, B, and C colliding in a standard
            T-junction pipe. The surrogate accurately predicted that laminar
            flow dominance and poor transverse mixing resulted in thick
            unreacted boundary layers, predicting a severe drop in Conversion
            efficiency (&lt; 85%) compared to the batch baseline.
          </li>
          <li>
            <strong className="text-white">
              Test Case 2: Static Tube Mixer (Helical Baffles):
            </strong>{" "}
            We generated a 3D voxel grid of a tubular pipe containing twisted
            static baffles. The LBM solver demonstrated that the baffles
            successfully induced chaotic advection (folding and stretching the
            fluid layers). By coupling this 3D velocity field with our
            Fick&apos;s Law chemical transport, the surrogate predicted a
            drastic improvement in spatial mixing, pushing predicted Conversion
            back toward the &gt; 95% range.
          </li>
        </ul>

        <h2 className="text-2xl font-light text-white mt-10 mb-4">
          4. Target Outcomes &amp; Next Steps
        </h2>
        <p>
          This early validation proves that our JAX engine successfully couples
          real-world reaction kinetics with complex 3D fluid dynamics.
        </p>
        <p>
          <strong className="text-white">
            The Ongoing Go/No-Go Milestone:
          </strong>{" "}
          Our Inverse Diffusion model is currently iterating through thousands
          of procedural static mixer geometries and mass flow rates to find the
          optimal physical blueprint required to hit the partner&apos;s strict
          continuous flow targets:
        </p>
        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          {[
            { k: "Target Conversion", v: "≥ 99.8%" },
            { k: "Target Yield", v: "≥ 96.5%" },
            { k: "Target Selectivity", v: "≥ 96.8%" },
          ].map((t) => (
            <div
              key={t.k}
              className="p-5 rounded-xl border border-emerald-500/25 bg-emerald-950/10"
            >
              <p className="text-emerald-300/80 text-xs uppercase tracking-wider mb-2">
                {t.k}
              </p>
              <p className="text-white text-2xl font-light font-mono">{t.v}</p>
            </div>
          ))}
        </div>
        <p>
          Once the LPM identifies the optimal continuous flow parameters
          (geometry, temperature profile, residence time), the partner will
          physically machine the AI-generated static mixer for engineering lab
          trials. Achieving these validation metrics in the physical continuous
          flow loop will trigger the conversion of this pilot into a
          commercial deployment and royalty-sharing agreement.
        </p>
      </article>
    </GdmDocShell>
  );
}
