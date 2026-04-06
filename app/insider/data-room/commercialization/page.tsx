"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Target, DollarSign, BarChart3, Crown, Building2, Factory, Beaker, Zap } from "lucide-react";

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function CommercializationPage() {
  return (
    <div className="min-h-screen bg-[#060606] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/insider/data-room" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Data Room</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <p className="text-xs text-white/40 font-mono tracking-widest">CONFIDENTIAL — FOR INVESTOR REVIEW ONLY</p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-16 px-6 max-w-5xl mx-auto">
        <motion.div {...fade} className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">DATA ROOM APPENDIX</p>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-tight mb-4 leading-tight">Shodh AI — Commercialization,<br /><span className="text-rose-300">Unit Economics & Scaling Thesis</span></h1>
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/20 bg-rose-950/10 text-rose-300/70 text-xs">
            <Zap className="w-3.5 h-3.5" />
            Boardroom-Ready Memorandum
          </div>
        </motion.div>
      </section>

      {/* Section 1: Core Thesis */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade} className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-600/10 border border-rose-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Section 1</p>
              <h2 className="text-2xl md:text-3xl font-extralight">The Core Thesis: Redefining Foundation Model Economics</h2>
            </div>
          </motion.div>

          <motion.div {...fade} className="space-y-6">
            <p className="text-white/70 font-light text-lg leading-relaxed">
              Standard B2B SaaS companies are valued on linear metrics <span className="text-white/50">(Seats × Subscription Fee = ARR)</span>, constrained by customer acquisition cost and churn. <span className="text-white font-normal">Shodh AI is not a SaaS company.</span> We are a Frontier AI Foundation Model for the physical economy.
            </p>

            <div className="p-6 rounded-2xl border border-rose-500/15 bg-rose-950/5">
              <p className="text-white/70 font-light text-base leading-relaxed">
                Our economic model mirrors <span className="text-rose-300 font-medium">semiconductor IP licensing</span> combined with the <span className="text-rose-300 font-medium">hyper-scaling of foundation models</span>. We do not charge subscriptions for marginal workflow efficiency; we charge <span className="text-white font-normal">Outcome-as-a-Service fees</span> and <span className="text-white font-normal">Process Royalties</span> for creating multi-billion-dollar physical assets.
              </p>
            </div>

            <p className="text-white/60 font-light text-base leading-relaxed">
              To value Shodh AI, investors must evaluate our <span className="text-white font-normal">non-linear scaling laws</span>, our definition of <span className="text-white font-normal">Product-Market Fit (PMF)</span>, and our <span className="text-white font-normal">asymmetric revenue engine</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: PMF & Strategy */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade} className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Section 2</p>
              <h2 className="text-2xl md:text-3xl font-extralight">Defining PMF & The <span className="text-blue-300">&ldquo;Horizontal Tech, Vertical GTM&rdquo;</span> Strategy</h2>
            </div>
          </motion.div>

          <motion.div {...fade} className="space-y-8">
            {/* PMF Definition */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <p className="text-blue-300/70 text-xs uppercase tracking-wider mb-3">Product-Market Fit Definition</p>
              <p className="text-white/70 font-light text-base leading-relaxed">
                For Shodh AI, PMF is defined by a single metric: <span className="text-white font-normal">Sim-to-Real Convergence at the Mesoscale</span>. We achieve PMF when our AI generates a digital factory recipe that translates into the physical wet-lab/foundry with <span className="text-emerald-300 font-medium">&gt;90% zero-shot accuracy</span>.
              </p>
            </div>

            {/* Strategy */}
            <div className="p-6 rounded-2xl border border-blue-500/15 bg-blue-950/5">
              <p className="text-blue-300/70 text-xs uppercase tracking-wider mb-4">The &ldquo;Horizontal Tech, Vertical GTM&rdquo; Strategy</p>
              <p className="text-white/60 font-light text-sm mb-6 leading-relaxed">
                A common question is how we can simultaneously address Aerospace, Pharma, and Batteries. The answer is the separation of technology and commercialization:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
                  <p className="text-white/80 text-sm font-medium mb-2">Horizontal Technology</p>
                  <p className="text-white/55 font-light text-sm leading-relaxed">
                    The foundational math is identical. The <span className="font-mono text-white/70">Navier-Stokes</span> and <span className="font-mono text-white/70">Phase-Field</span> tensors that solve a solid-state battery are the exact same PDEs that solve a biological bioreactor. Every pilot trains the identical underlying physics engine.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-blue-500/15 bg-blue-950/10">
                  <p className="text-blue-300 text-sm font-medium mb-2">Vertical GTM</p>
                  <p className="text-white/55 font-light text-sm leading-relaxed">
                    From a commercial Go-To-Market perspective, we are surgically focused. For the next 18-24 months, our revenue engine is locked exclusively on two adjacent verticals: <span className="text-white font-normal">Specialty Chemicals</span> and <span className="text-white font-normal">Batteries</span> (e.g., Jubilant Ingrevia, A123).
                  </p>
                </div>
              </div>

              <p className="mt-6 text-white/50 font-light text-sm leading-relaxed">
                Pilots in Pharma (Biocon) and Aerospace (GE) run concurrently strictly as <span className="text-white/70">Technical Validations</span> to prove to the market that our Total Addressable Market is <span className="text-rose-300 font-medium">$1.7 Trillion</span>, not just $100 Billion.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Revenue Engine */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade} className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Section 3</p>
              <h2 className="text-2xl md:text-3xl font-extralight">The Revenue Engine: <span className="text-emerald-300">Outcome-as-a-Service</span></h2>
            </div>
          </motion.div>

          <motion.div {...fade} className="mb-6">
            <p className="text-white/60 font-light text-base leading-relaxed">
              Our business model transitions clients from Capex-heavy physical trial-and-error to high-margin, software-driven IP co-creation. The revenue stack operates in <span className="text-white font-normal">three compounding tiers</span>:
            </p>
          </motion.div>

          {/* Tier 1 */}
          <motion.div {...fade} className="mb-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300 font-medium text-sm">1</div>
                <div>
                  <p className="text-white font-medium">Tier 1: Staged Enterprise Conversion</p>
                  <p className="text-white/40 text-xs">(PoV to NRE)</p>
                </div>
              </div>
              <p className="text-white/50 font-light text-sm mb-4">Industrial giants do not buy unproven deep-tech on day one. We operate a highly disciplined &ldquo;Proof-of-Value&rdquo; (PoV) pipeline.</p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-blue-400 shrink-0 text-sm">—</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">The Model</p>
                    <p className="text-white/50 font-light text-sm">Anchor Pilots are initially executed at cost (subsidized by our sovereign compute grants) using their highly classified, historical failure data.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-blue-400 shrink-0 text-sm">—</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">The Trigger</p>
                    <p className="text-white/50 font-light text-sm">Upon hitting the &gt;90% Sim-to-Real accuracy threshold, the pilot converts into a live factory deployment.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-blue-400 shrink-0 text-sm">—</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">The Economics</p>
                    <p className="text-white/50 font-light text-sm"><span className="text-emerald-300 font-medium">$1.0M – $3.0M</span> upfront NRE (Non-Recurring Engineering) fee to deploy the finalized edge-enclave into their secure VPC.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tier 2 */}
          <motion.div {...fade} className="mb-6">
            <div className="p-6 rounded-2xl border border-violet-500/15 bg-violet-950/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-300 font-medium text-sm">2</div>
                <div>
                  <p className="text-white font-medium">Tier 2: Milestone Bounties & IP Generation</p>
                  <p className="text-white/40 text-xs">(Medium-Term Upside)</p>
                </div>
              </div>
              <p className="text-white/50 font-light text-sm mb-4">We align our incentives with the client&apos;s P&L. If we compress a 7-year API scale-up into 6 months, we recover an average of <span className="text-white font-normal">$1.35B in monopoly patent life</span> for the partner.</p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-violet-400 shrink-0 text-sm">—</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">The Model</p>
                    <p className="text-white/50 font-light text-sm">Success-based bounties triggered upon successful physical pilot plant scale-up.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-violet-400 shrink-0 text-sm">—</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">The Economics</p>
                    <p className="text-white/50 font-light text-sm"><span className="text-violet-300 font-medium">$5.0M – $10.0M</span> cash bounty per successful molecule/alloy.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tier 3 */}
          <motion.div {...fade}>
            <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-950/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-300 font-medium text-sm">3</div>
                <div>
                  <p className="text-white font-medium">Tier 3: Physical Process Royalties</p>
                  <p className="text-white/40 text-xs">(The Long-Term Monopoly)</p>
                </div>
              </div>
              <p className="text-white/50 font-light text-sm mb-4">This is the <span className="text-rose-300 font-medium">ultimate valuation driver</span>. By inversely generating the exact manufacturing recipe, we become co-inventors of the process IP.</p>
              <div className="space-y-3 mb-4">
                <div className="flex gap-3">
                  <span className="text-rose-400 shrink-0 text-sm">—</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">The Model</p>
                    <p className="text-white/50 font-light text-sm">Perpetual royalties tied to the gigafactory&apos;s physical yield.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-rose-400 shrink-0 text-sm">—</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">The Economics (Example)</p>
                    <p className="text-white/50 font-light text-sm"><span className="text-rose-300 font-mono">$1.00/kWh</span> of solid-state batteries produced.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-rose-500/15 bg-rose-950/10">
                <p className="text-white/70 font-light text-sm leading-relaxed">
                  A single mid-sized gigafactory outputting <span className="text-white font-mono">20 GWh</span> annually generates <span className="text-rose-300 font-medium text-base">$20M in pure-profit ARR</span> for Shodh AI, lasting the <span className="text-white font-normal">10-year lifecycle</span> of the factory.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: 5-Year Financial Profile */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade} className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Section 4</p>
              <h2 className="text-2xl md:text-3xl font-extralight">5-Year Financial Profile & <span className="text-amber-300">Scaling Economics</span></h2>
            </div>
          </motion.div>

          <motion.div {...fade} className="mb-8">
            <p className="text-white/60 font-light text-base leading-relaxed">
              While Shodh AI&apos;s terminal value is tied to our position as the standard compiler for global manufacturing, our 5-year operating model is grounded in measurable enterprise deployment and royalty expansion.
            </p>
          </motion.div>

          {/* Year 1-2 */}
          <motion.div {...fade} className="mb-6">
            <div className="p-6 rounded-2xl border border-blue-500/15 bg-blue-950/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-300 font-medium">Years 1-2</p>
                  <p className="text-white/50 text-sm">The Edge-Compute Phase (Validating the Foundation)</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extralight text-white">$10M–$15M</p>
                  <p className="text-white/40 text-xs">ARR</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-blue-400 shrink-0 text-sm">—</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Go-To-Market</p>
                    <p className="text-white/50 font-light text-sm">3-5 Anchor Partners (Aarti, Biocon, Jubilant, A123).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-blue-400 shrink-0 text-sm">—</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Unit Economics (The FDE Reality)</p>
                    <p className="text-white/50 font-light text-sm">Gross margins sit at <span className="text-white/70">~60%</span> in this phase. We actively deploy Forward Deployed Engineers (FDEs) to handle bespoke enterprise data silos and consume heavy compute to fine-tune the 20% edge models.</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-xl border border-emerald-500/15 bg-emerald-950/10">
                <p className="text-emerald-300/70 text-xs uppercase tracking-wider mb-1">Note on De-risking</p>
                <p className="text-white/50 font-light text-sm">This 24-month phase is fully capitalized by the current $60M raise. However, we anticipate hitting the critical &ldquo;Sim-to-Real&rdquo; validation milestone at <span className="text-white font-normal">Month 10</span>, effectively dropping the core technological risk to zero and triggering a massive markup in enterprise value.</p>
              </div>
            </div>
          </motion.div>

          {/* Year 3-4 */}
          <motion.div {...fade} className="mb-6">
            <div className="p-6 rounded-2xl border border-violet-500/15 bg-violet-950/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-violet-300 font-medium">Years 3-4</p>
                  <p className="text-white/50 text-sm">The IP Bounty & Licensing Phase (Scaling)</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extralight text-white">$50M–$80M</p>
                  <p className="text-white/40 text-xs">ARR + $20M+ bounties</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-violet-400 shrink-0 text-sm">—</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Go-To-Market</p>
                    <p className="text-white/50 font-light text-sm">15–20 Global Tier-1 Manufacturers (e.g., BASF, LG Chem).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-violet-400 shrink-0 text-sm">—</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Unit Economics</p>
                    <p className="text-white/50 font-light text-sm">The base physics model now handles 90%+ of the computation zero-shot. FDE requirements drop significantly. Gross margins expand to <span className="text-white/70">85%+</span>. We begin recognizing recurring Process Royalties on physical factory output.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Year 5+ */}
          <motion.div {...fade}>
            <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-950/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-rose-300 font-medium">Year 5+</p>
                  <p className="text-white/50 text-sm">The Ecosystem Phase (Monopoly)</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extralight text-white">$250M+</p>
                  <p className="text-white/40 text-xs">ARR</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-rose-400 shrink-0 text-sm">—</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Go-To-Market</p>
                    <p className="text-white/50 font-light text-sm">Broad commercial API access for global mid-market deep-tech.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-rose-400 shrink-0 text-sm">—</span>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Unit Economics (The Royalty API)</p>
                    <p className="text-white/50 font-light text-sm">This is not a cheap compute API. Mid-market companies upload their CAD/Chemistry; our API outputs the factory blueprint bound by smart contracts that automatically capture fractional royalties on their physical production. Gross margins reach frictionless software levels <span className="text-white/70">(90%+)</span>.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Multiplier Effect & Comparables */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fade} className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/20 flex items-center justify-center">
              <Crown className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Section 5</p>
              <h2 className="text-2xl md:text-3xl font-extralight">The Multiplier Effect & <span className="text-purple-300">Enterprise Value Anchors</span></h2>
            </div>
          </motion.div>

          <motion.div {...fade} className="mb-8">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <p className="text-white/60 font-light text-base leading-relaxed">
                In traditional SaaS, valuation multiples contract as revenue grows. In Foundation Models, <span className="text-white font-normal">multiples expand because of the data flywheel</span>. Every failed chemical reaction mapped by Aarti and every fractured anode mapped by A123 feeds our base tensor architecture. We are capturing industrial failure data that <span className="text-rose-300 font-medium">cannot be scraped from the internet</span>.
              </p>
            </div>
          </motion.div>

          <motion.div {...fade} className="mb-6">
            <p className="text-white/50 font-light text-sm mb-6">We structure our enterprise value and GTM execution against three category-defining deep-tech comparables:</p>
          </motion.div>

          {/* Comparables Grid */}
          <motion.div {...fade} className="grid md:grid-cols-3 gap-6">
            {/* Palantir */}
            <div className="p-6 rounded-2xl border border-blue-500/15 bg-blue-950/5">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-medium">Palantir</p>
                  <p className="text-blue-300/70 text-xs">$60B+ Valuation</p>
                </div>
              </div>
              <p className="text-white/55 font-light text-sm leading-relaxed">
                Scaled by deploying <span className="text-white/70">Forward Deployed Engineers (FDEs)</span> to solve complex, secure enterprise data silos before transitioning to a high-margin commercial platform (Foundry). <span className="text-white font-normal">Shodh AI is executing the exact same GTM motion, but for physical factory physics instead of data analytics.</span>
              </p>
            </div>

            {/* Scale AI */}
            <div className="p-6 rounded-2xl border border-emerald-500/15 bg-emerald-950/5">
              <div className="flex items-center gap-3 mb-4">
                <Factory className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-white font-medium">Scale AI</p>
                  <p className="text-emerald-300/70 text-xs">$14B+ Valuation</p>
                </div>
              </div>
              <p className="text-white/55 font-light text-sm leading-relaxed">
                Capitalized on creating the proprietary <span className="text-white/70">RLHF data layer</span> for digital LLMs. <span className="text-white font-normal">Shodh AI is creating the algorithmic RLHF layer (via our 3D synthetic data factory) for physical manufacturing.</span>
              </p>
            </div>

            {/* ARM */}
            <div className="p-6 rounded-2xl border border-amber-500/15 bg-amber-950/5">
              <div className="flex items-center gap-3 mb-4">
                <Beaker className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-white font-medium">ARM Holdings</p>
                  <p className="text-amber-300/70 text-xs">$100B+ Valuation</p>
                </div>
              </div>
              <p className="text-white/55 font-light text-sm leading-relaxed">
                Fabless licensing of digital compute architecture. <span className="text-white font-normal">Shodh AI is the fabless licensing compiler for physical chemistry and thermodynamics.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-white/30 text-xs mb-4">© 2026 Shodh AI. Confidential — For Investor Review Only.</p>
        <Link href="/insider/data-room" className="text-white/50 hover:text-white text-sm transition-colors">
          ← Back to Data Room
        </Link>
      </footer>
    </div>
  );
}
