"use client";
import GdmDocShell from "@/components/GdmDocShell";

const PDF_URL =
  "/1_Academic_Preprint_Mesoscale_Battery_Sim2Real.pdf.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH";

export default function PreprintPage() {
  return (
    <GdmDocShell
      eyebrow="File 01 · Academic Preprint"
      title="Mesoscale Battery Sim2Real"
      classification="Viewer Only · Do Not Distribute"
    >
      <div
        className="rounded-2xl border border-white/10 bg-black/60 overflow-hidden"
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400/80" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/50">
              Secure In-Browser Viewer
            </span>
          </div>
          <span className="text-[11px] text-white/30 font-mono">
            1_Academic_Preprint_Mesoscale_Battery_Sim2Real.pdf
          </span>
        </div>
        <div className="relative w-full" style={{ height: "85vh" }}>
          <iframe
            src={PDF_URL}
            title="Academic Preprint - Mesoscale Battery Sim2Real"
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
        <div className="px-4 py-3 border-t border-white/10 bg-white/[0.02] text-[11px] text-white/40 font-light">
          This document is displayed in a view-only mode within the Shodh AI
          Data Room. Downloading, redistribution, or external sharing is
          restricted under the terms of the mutual NDA.
        </div>
      </div>
    </GdmDocShell>
  );
}
