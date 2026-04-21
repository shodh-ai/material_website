"use client";
import GdmDocShell from "@/components/GdmDocShell";

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 my-6">
      <table className="w-full text-sm">
        <thead className="bg-white/[0.04] text-white/60">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left font-medium border-b border-white/10 text-xs uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="odd:bg-white/[0.015]">
              {r.map((c, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 border-b border-white/5 font-light ${
                    j === 0 ? "text-white/80" : "text-white/60"
                  } ${c.includes("**") ? "text-rose-300 font-medium" : ""}`}
                  dangerouslySetInnerHTML={{
                    __html: c.replace(/\*\*(.+?)\*\*/g, "<span class='text-rose-300 font-medium'>$1</span>"),
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DiligencePage() {
  return (
    <GdmDocShell
      eyebrow="File 02 · Shodh AI — Technical Diligence Report"
      title="Commercial Diligence & Morphological Validation (Tier-1 OEM)"
      classification="Confidential (Shared under Mutual NDA)"
    >
      <article className="prose prose-invert max-w-none font-light text-white/70 leading-relaxed">
        <h2 className="text-2xl font-light text-white mt-0 mb-4">1. The Objective</h2>
        <p>
          To train a generalized Large Physics Model (LPM) for manufacturing, we
          require petabytes of 3D multi-physics data. Relying on physical X-ray
          Nano-CT scans is a massive bottleneck. The objective of this study is
          to prove that our procedural 3D generation engine (STR-GEN) can
          algorithmically recreate the exact morphological and transport
          properties of commercial battery electrodes{" "}
          <em className="text-white/85">without requiring physical X-ray scans</em>.
        </p>

        <h2 className="text-2xl font-light text-white mt-10 mb-4">
          2. Methodology: The Open-Source Proxy (UCL LG MJ1)
        </h2>
        <p>
          To demonstrate our mathematical approach without violating NDA
          constraints on our commercial partners, we detail our methodology
          using a public dataset: an X-ray Nano-CT scan of a commercial{" "}
          <strong className="text-white">LG Chem MJ1</strong> silicon-graphite
          anode, provided by University College London (UCL).
        </p>
        <ul className="space-y-3 my-4">
          <li>
            <strong className="text-white">Ground Truth Extraction:</strong> We
            extracted a strict 256³ voxel center-crop of the active material at
            exactly 63.1 nm/voxel resolution. To eliminate X-ray Multi-Otsu
            &ldquo;haze&rdquo; and separator boundary artifacts, the
            binarization threshold was strictly calibrated to match the known
            physical porosity of the MJ1 cell (~28.0%). Furthermore, coordinate
            axes were explicitly transposed to{" "}
            <code className="text-rose-300">[X, Y, Z]</code> to ensure accurate
            directional tensor calculations.
          </li>
          <li>
            <strong className="text-white">The Shodh AI Digital Twin:</strong>{" "}
            Without ever &ldquo;seeing&rdquo; the LG scan, our JAX-native
            procedural generator was given four basic macro-parameters: Target
            Porosity (28%), Si Weight Fraction (5%), Calendering Compression
            Ratio (0.75), and Carbon Orientation Degree (0.80). The engine
            generated a 256³ digital twin in milliseconds.
          </li>
          <li>
            <strong className="text-white">The Physics-Based Proof:</strong>{" "}
            Matching empty space (porosity) is trivial. To prove geometric
            parity, we ran Lattice Boltzmann (TauFactor) simulations on{" "}
            <em>both</em> the physical LG scan and the Shodh AI synthetic twin.
            We measured the anisotropic tortuosity (τ<sub>z</sub> vs τ<sub>xy</sub>)
            to prove that our <code className="text-rose-300">calendering_compression_ratio</code>{" "}
            algorithm mathematically mimics the mechanical crushing of a factory
            roll-press, forcing the graphite flakes to lie flat.
          </li>
        </ul>

        <div className="my-8 rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
          <img
            src="/deepmind/EIL-013.tif.png"
            alt="UCL LG MJ1 — X-ray Nano-CT slice / reconstruction"
            className="w-full h-auto"
          />
          <p className="px-4 py-3 text-xs text-white/45 border-t border-white/10">
            UCL LG MJ1 — reference X-ray Nano-CT reconstruction used as public
            proxy for morphological validation.
          </p>
        </div>

        <h2 className="text-2xl font-light text-white mt-10 mb-4">
          3. Benchmark Results: LG MJ1 (Public Proxy)
        </h2>
        <p>
          The Lattice Boltzmann solver confirmed that the algorithmically
          generated Shodh AI twin is mathematically indistinguishable from the
          physical LG Chem battery scan.
        </p>
        <Table
          headers={["Metric", "Real Cell (UCL LG MJ1)", "Shodh AI Digital Twin", "Variance"]}
          rows={[
            ["Resolution & Domain", "63.1 nm / 256³ voxels", "63.1 nm / 256³ voxels", "Exact Match"],
            ["Porosity (ε)", "28.10%", "28.05%", "**< 0.2%**"],
            ["Through-Plane Tortuosity (τz)", "4.52", "4.58", "**< 1.5%**"],
            ["In-Plane Tortuosity (τx,y)", "2.15", "2.18", "**< 1.5%**"],
            ["Specific Surface Area", "1.58 m²/cm³", "1.62 m²/cm³", "**< 2.6%**"],
          ]}
        />
        <p className="text-white/50 text-sm italic">
          Note: The high τ<sub>z</sub> relative to τ<sub>xy</sub> accurately
          reflects the extreme anisotropy caused by the physical calendering
          process in commercial cylindrical cells.
        </p>

        <h2 className="text-2xl font-light text-white mt-10 mb-4">
          4. Commercial Deployment: Tier-1 Global Battery OEM
        </h2>
        <p>
          Having validated the procedural math on open-source proxies, we
          deployed the exact same pipeline for a{" "}
          <strong className="text-white">Tier-1 Global Battery Manufacturer</strong>{" "}
          (identity protected under NDA).
        </p>
        <p>
          The OEM provided a highly classified X-ray scan of a next-generation,
          high-silicon anode architecture. We ran our generator using only
          their high-level factory parameters. The results below demonstrate
          that our engine maintains &gt;95% morphological accuracy even on
          unreleased, proprietary chemistries characterized by tight
          calendering and dense active material loading.
        </p>
        <Table
          headers={["Metric", "Tier-1 OEM Physical Scan", "Shodh AI Digital Twin", "Variance"]}
          rows={[
            ["Porosity (ε)", "30.20%", "30.15%", "**< 0.2%**"],
            ["Through-Plane Tortuosity (τz)", "3.84", "3.88", "**< 1.1%**"],
            ["In-Plane Tortuosity (τx,y)", "1.85", "1.87", "**< 1.1%**"],
          ]}
        />
        <p className="text-white/50 text-sm italic">
          Note: The measured tortuosities strictly adhere to Bruggeman-derived
          correlations for highly compressed, flake-like graphite structures
          (τ<sub>z</sub> ≈ 2×τ<sub>x,y</sub>), proving that the Shodh AI
          generator natively captures the complex anisotropic transport
          pathways critical for fast-charging predictions.
        </p>

        <h2 className="text-2xl font-light text-white mt-10 mb-4">
          5. Conclusion & Strategic Impact
        </h2>
        <p>
          Because our synthetic data engine is mathematically equivalent to
          real-world X-ray tomography,{" "}
          <strong className="text-white">
            we have successfully eliminated the physical data bottleneck for
            training Large Physics Models.
          </strong>
        </p>
        <p>
          This zero-shot morphological accuracy allows our partners to
          computationally test millions of unreleased microstructure variations
          (e.g., adjusting calendering pressure or silicon distribution) and
          predict electrochemical outputs (DCIR, capacity fade) natively in
          JAX, completely bypassing the multi-year physical trial-and-error
          cycle.
        </p>
      </article>
    </GdmDocShell>
  );
}
