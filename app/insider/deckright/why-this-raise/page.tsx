import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type DiagramGroup = {
  accent: string;
  title: string;
  details?: string[];
};

const centralText = `Total Equity Ask:
$60.0M
(24-Month Operating
Runway)`;

const groups: DiagramGroup[] = [
  {
    accent: "border-blue-200 bg-blue-50/80",
    title: `1. Private Compute &
Data $25.0M`,
    details: [
      `$15.0M: Enterprise Compute (VPC)

AWS/GCP clusters for secure client fine-
tuning (Bypassing Gov Cloud)

Total = 
3,000 to 4,000 H1/B1 GPUs.
 18.75 Million GPU Hours.

Private = 1000 GPUs 
India AI = 1700 GPUs

Both for 2 years almost
`,
      `$10.0M: Data Engineering Pipeline

Ingesting, cleaning, & processing
massive CAD and proprietary failure
data

High-Performance Hot Storage
($3.5M)

CPU "Pre-Processing" Fleet ($3.0M)

Secure Data Shifting & Cloud Egress
($2.0M)

MLOps Tooling & Orchestration
($1.5M)`,
    ],
  },
  {
    accent: "border-emerald-200 bg-emerald-50/80",
    title: `2. In-House Wet Lab
OPEX
$10.0M`,
    details: [
      `$10.0M: Wet Lab Operations

Precursor chemicals, consumables, & power
to generate our proprietary data moat 

*Hardware CAPEX financed via $25M
Debt

`,
    ],
  },
  {
    accent: "border-violet-200 bg-violet-50/80",
    title: `3. Elite HQ
Engineering

$8.0M`,
    details: [
      `$2.0M: Global Sniper Fund

Poach 3-4 God-Tier
Physics-ML Architects(ex-
DeepMind/Nvidia/Google
Brain)`,
      `$6.0M: Core India HQ
Team

25 Elite
Math/Physics/Lab Devs
paid at top-1% Indian
market rates

(50-60 lac) CTC `,
    ],
  },
  {
    accent: "border-amber-200 bg-amber-50/80",
    title: `4. Global FDE
Team $6.5M`,
    details: [
      `$5.0M: FDE Salaries

Scaling 10 → 30 Forward
Deployed Engineers to
embed with global clients

($100k avg.)`,
      `$1.5M: Global T&E /
Hardware

Travel, onsite integration
costs, and highly secure
deployment hardware`,
    ],
  },
  {
    accent: "border-rose-200 bg-rose-50/80",
    title: `5. Enterprise GTM &
Sales
$3.0M`,
    details: [
      `$3.0M: Sales Sharks &
CAC

Enterprise sales
executives & marketing 
to close $5M+ ARR
software licenses`,
    ],
  },
  {
    accent: "border-slate-200 bg-slate-100/90",
    title: `6. Legal, IP &
Security
$2.5M`,
    details: [
      `$1.5M: IP & Royalty
Structuring

Global method patents &
ironclad

Master Service
Agreements (MSAs)`,
      `$1.0M: Enterprise
Compliance

SOC2 Type II, ISO
27001 certification, Pen-
testing & rigorous
security audits`,
    ],
  },
  {
    accent: "border-indigo-200 bg-indigo-50/80",
    title: `7. Buffer /
Contingency $5.0M`,
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
        <div className="mx-auto max-w-[1680px]">
          <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 px-5 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:px-8 md:py-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(26,115,232,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(52,168,83,0.08),transparent_24%)]" />
            <div className="relative">
              {/* Vertical central spine */}
              <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
                {/* Central node */}
                <div className="rounded-[2rem] border border-[#1a73e8]/20 bg-[linear-gradient(135deg,#ffffff_0%,#f0f7ff_100%)] px-10 py-10 shadow-[0_20px_50px_rgba(26,115,232,0.15)]">
                  <p className="whitespace-pre-line text-center text-[clamp(1.5rem,2.2vw,2.2rem)] font-semibold leading-[1.3] tracking-tight text-slate-950">
                    {centralText}
                  </p>
                </div>

                {/* Vertical line */}
                <div className="mt-8 h-12 w-0.5 bg-gradient-to-b from-slate-300 to-slate-400" />

                {/* Horizontal branches container */}
                <div className="w-full">
                  {/* Groups 1-4 (top row) */}
                  <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {groups.slice(0, 4).map((group, index) => (
                      <div key={group.title} className="relative">
                        {/* Connector line from vertical spine */}
                        <div className="absolute left-1/2 top-[-48px] h-12 w-0.5 -translate-x-1/2 bg-slate-300" />
                        
                        {/* Main bucket card */}
                        <div className={`rounded-[1.6rem] border px-6 py-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ${group.accent}`}>
                          <p className="whitespace-pre-line text-center text-[1.3rem] font-semibold leading-[1.35] tracking-tight text-slate-950">
                            {group.title}
                          </p>
                        </div>

                        {/* Horizontal sub-details */}
                        {group.details && (
                          <div className="mt-4 flex flex-col gap-3">
                            {group.details.map((detail) => (
                              <div key={detail} className="ml-4 rounded-[1.2rem] border border-slate-200 bg-white/95 px-5 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                                <p className="whitespace-pre-line text-sm leading-[1.5] text-slate-700">
                                  {detail}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Middle connector */}
                  <div className="my-8 h-0.5 w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

                  {/* Groups 5-7 (bottom row) */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-3 xl:px-32">
                    {groups.slice(4).map((group, index) => (
                      <div key={group.title} className="relative">
                        {/* Connector line from vertical spine */}
                        <div className="absolute left-1/2 top-[-48px] h-12 w-0.5 -translate-x-1/2 bg-slate-300" />
                        
                        {/* Main bucket card */}
                        <div className={`rounded-[1.6rem] border px-6 py-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ${group.accent}`}>
                          <p className="whitespace-pre-line text-center text-[1.3rem] font-semibold leading-[1.35] tracking-tight text-slate-950">
                            {group.title}
                          </p>
                        </div>

                        {/* Horizontal sub-details */}
                        {group.details && (
                          <div className="mt-4 flex flex-col gap-3">
                            {group.details.map((detail) => (
                              <div key={detail} className="ml-4 rounded-[1.2rem] border border-slate-200 bg-white/95 px-5 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                                <p className="whitespace-pre-line text-sm leading-[1.5] text-slate-700">
                                  {detail}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
