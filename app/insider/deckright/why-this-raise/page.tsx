import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type DocumentSection = {
  accent: string;
  title: string;
  amount: string;
  details?: string[];
};

const sections: DocumentSection[] = [
  {
    accent: "border-blue-200 bg-blue-50/80",
    title: "Private Compute & Data",
    amount: "$25.0M",
    details: [
      "Enterprise Compute (VPC) - $15.0M",
      "• AWS/GCP clusters for secure client fine-tuning (Bypassing Gov Cloud)",
      "• Total = 3,000 to 4,000 H1/B1 GPUs",
      "• 18.75 Million GPU Hours",
      "• Private = 1000 GPUs, India AI = 1700 GPUs",
      "• Both for 2 years almost",
      "",
      "Data Engineering Pipeline - $10.0M",
      "• Ingesting, cleaning, & processing massive CAD and proprietary failure data",
      "• High-Performance Hot Storage ($3.5M)",
      "• CPU \"Pre-Processing\" Fleet ($3.0M)",
      "• Secure Data Shifting & Cloud Egress ($2.0M)",
      "• MLOps Tooling & Orchestration ($1.5M)",
    ],
  },
  {
    accent: "border-emerald-200 bg-emerald-50/80",
    title: "In-House Wet Lab OPEX",
    amount: "$10.0M",
    details: [
      "Wet Lab Operations - $10.0M",
      "• Precursor chemicals, consumables, & power to generate our proprietary data moat",
      "• Hardware CAPEX financed via $10M Debt",
    ],
  },
  {
    accent: "border-violet-200 bg-violet-50/80",
    title: "Elite HQ Engineering",
    amount: "$8.0M",
    details: [
      "Global Sniper Fund - $2.0M",
      "• Poach 3-4 God-Tier Physics-ML Architects (ex-DeepMind/Nvidia/Google Brain)",
      "",
      "Core India HQ Team - $6.0M",
      "• 25 Elite Math/Physics/Lab Devs",
      "• Paid at top-1% Indian market rates (50-60 lac CTC)",
    ],
  },
  {
    accent: "border-amber-200 bg-amber-50/80",
    title: "Global FDE Team",
    amount: "$6.5M",
    details: [
      "FDE Salaries - $5.0M",
      "• Scaling 10 → 30 Forward Deployed Engineers to embed with global clients",
      "• ($100k avg.)",
      "",
      "Global T&E / Hardware - $1.5M",
      "• Travel, onsite integration costs, and highly secure deployment hardware",
    ],
  },
  {
    accent: "border-rose-200 bg-rose-50/80",
    title: "Enterprise GTM & Sales",
    amount: "$3.0M",
    details: [
      "Sales Sharks & CAC - $3.0M",
      "• Enterprise sales executives & marketing to close $5M+ ARR software licenses",
    ],
  },
  {
    accent: "border-slate-200 bg-slate-100/90",
    title: "Legal, IP & Security",
    amount: "$2.5M",
    details: [
      "IP & Royalty Structuring - $1.5M",
      "• Global method patents & ironclad Master Service Agreements (MSAs)",
      "",
      "Enterprise Compliance - $1.0M",
      "• SOC2 Type II, ISO 27001 certification, Pen-testing & rigorous security audits",
    ],
  },
  {
    accent: "border-indigo-200 bg-indigo-50/80",
    title: "Buffer / Contingency",
    amount: "$5.0M",
  },
];

export default function WhyThisRaisePage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbfdff_0%,#f4f8fd_45%,#eef3f9_100%)] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-4">
          <Link href="/insider/deckright" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Back to deck
          </Link>
        </div>
      </header>

      <main className="px-6 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <section className="rounded-[2rem] border border-slate-200 bg-white/95 px-8 py-12 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="mb-10 text-center">
              <h1 className="text-5xl font-bold text-slate-950 mb-6">Why This Raise</h1>
              <div className="rounded-[2rem] border-2 border-[#1a73e8]/30 bg-gradient-to-br from-white to-[#f0f7ff] px-10 py-8 shadow-[0_20px_50px_rgba(26,115,232,0.15)] inline-block">
                <p className="whitespace-pre-line text-center text-3xl font-bold leading-[1.3] tracking-tight text-slate-950">
                  {`Total Equity Ask: $60.0M\n(24-Month Operating Runway)`}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white/50">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-300">
                    <th className="text-left py-5 px-8 text-xl font-bold text-slate-900">Category</th>
                    <th className="text-center py-5 px-6 text-xl font-bold text-slate-900">Amount</th>
                    <th className="text-left py-5 px-8 text-xl font-bold text-slate-900">Allocation Details</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.map((section, index) => (
                    <tr key={section.title} className={`border-b border-slate-200 transition-colors hover:bg-white/30 ${index % 2 === 0 ? 'bg-white/20' : ''} ${section.accent}`}>
                      <td className="py-6 px-8">
                        <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <span className="text-xl font-bold text-white bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-3 rounded-xl shadow-md inline-block min-w-[120px]">
                          {section.amount}
                        </span>
                      </td>
                      <td className="py-6 px-8">
                        {section.details && (
                          <table className="w-full text-sm">
                            <tbody>
                              {section.details.map((detail, detailIndex) => {
                                if (detail.startsWith("•")) {
                                  return (
                                    <tr key={detailIndex}>
                                      <td className="py-2 pl-6 text-slate-600 font-medium">•</td>
                                      <td className="py-2 px-3 text-slate-700 leading-relaxed">{detail.substring(1).trim()}</td>
                                    </tr>
                                  );
                                } else if (detail.trim() === "") {
                                  return <tr key={detailIndex}><td className="py-3" colSpan={2}></td></tr>;
                                } else {
                                  return (
                                    <tr key={detailIndex}>
                                      <td className="py-3 font-bold text-slate-900 text-base" colSpan={2}>{detail}</td>
                                    </tr>
                                  );
                                }
                              })}
                            </tbody>
                          </table>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 pt-8 border-t-2 border-slate-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center md:text-left">
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Total Investment</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">$60.0M</p>
                  <p className="text-sm text-slate-600 mt-1">24-Month Runway</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Categories</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">7</p>
                  <p className="text-sm text-slate-600 mt-1">Strategic Areas</p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Largest Allocation</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">41.7%</p>
                  <p className="text-sm text-slate-600 mt-1">Private Compute & Data</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
