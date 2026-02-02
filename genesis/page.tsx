"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, Globe, Cpu, Beaker, Factory, Coins } from "lucide-react";
import Image from "next/image";
import CanvasLayer from "@/components/three/CanvasLayer";

export default function GenesisPage() {
  return (
    <div className="relative min-h-screen w-full text-[#f0f0ff] selection:bg-[#48cae4] selection:text-[#081421] overflow-x-hidden">
      <CanvasLayer />
      
      <main id="html-scroll-container" className="relative z-[2] w-full pointer-events-none">
        <Navbar />

        {/* HERO SECTION */}
        <section className="min-h-screen flex items-center px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto pt-28 md:pt-36 pb-12">
          <div className="w-full text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-2 h-2 bg-[#48cae4] rounded-full shadow-[0_0_10px_#48cae4]" />
              <span className="text-[#48cae4] text-xs font-bold tracking-[0.2em] uppercase">The Genesis Protocol</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium tracking-tight leading-[1.05] break-words mb-8">
              "Shodh AI deletes the <br className="hidden md:block"/> physical iteration loop."
            </h1>
            
            <p className="text-base md:text-xl text-white/90 font-light max-w-3xl mx-auto drop-shadow-md">
              The First Generative AI for Manufacturable Matter.
            </p>
          </div>
        </section>

        {/* THE SHIFT COMPARISON */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32 mt-10 md:mt-20">
          <div className="pointer-events-auto rounded-3xl border border-white/10 bg-[#081421]/80 backdrop-blur-md shadow-2xl p-6 sm:p-10 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Old Way */}
              <div>
                <h4 className="text-white font-medium mb-4 flex items-center gap-2 text-2xl md:text-3xl">
                  <span style={{ width: '10px', height: '10px', backgroundColor: 'red-500', borderRadius: '50%', display: 'inline-block' }} /> Old Way (5 Years)
                </h4>
                <div className="flex flex-wrap gap-3 text-sm md:text-base font-mono text-white/70">
                  <span>Design</span>
                  <span>→</span>
                  <span>Lab</span>
                  <span className="text-red-400">→ Fail</span>
                  <span>→</span>
                  <span>Lab</span>
                  <span className="text-red-400">→ Fail</span>
                  <span>→</span>
                  <span>Factory</span>
                  <span className="text-red-400">→ Fail</span>
                  <span>→</span>
                  <span>Product</span>
                </div>
              </div>

              {/* Shodh Way */}
              <div className="relative">
                <div className="absolute -inset-4 bg-[#48cae4]/5 rounded-xl blur-lg" />
                <div className="relative">
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2 text-2xl md:text-3xl">
                    <span className="w-2 h-2 bg-[#48cae4] rounded-full animate-pulse" /> Shodh Way (6 Months)
                  </h4>
                  <div className="flex flex-wrap gap-3 text-sm md:text-base font-mono text-white">
                    <span>Design</span>
                    <span>→</span>
                    <span className="text-[#48cae4] font-bold">Simulation (Matter Compiler)</span>
                    <span className="text-white/40 italic">(Virtual Fail)</span>
                   
                    <span>→</span>
                    <span>Factory</span>
                    <span className="text-[#48cae4] font-bold">→ Success</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: MANIFESTO */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32">
          <div className="pointer-events-auto">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-12 leading-tight">
              1. The Manifesto: The "Zombie Material" Crisis
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
              <div className="space-y-6">
                <p className="text-xl md:text-2xl italic text-white/90 font-light">
                  "The rate of innovation is limited by the speed of physical iteration."
                </p>
                <p className="text-base md:text-lg text-white/80 font-light leading-relaxed">
                  "Google GNoME solved Atoms. But Atoms don't build Batteries. Microstructures do."
                </p>
                <p className="text-base md:text-lg text-white/80 font-light leading-relaxed">
                  "We are the only AI that solves the Inverse Design of Manufacturing."
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 space-y-6">
                <div>
                  <h4 className="text-[#48cae4] font-bold uppercase text-xs tracking-wider mb-2">The Competitor Flaw</h4>
                  <p className="text-white/80 text-sm md:text-base">Google GNoME and Microsoft MatterGen have discovered millions of stable crystals.</p>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-red-400 font-bold uppercase text-xs tracking-wider mb-2">The Reality</h4>
                  <p className="text-white/80 text-sm md:text-base">99% of them are <strong className="text-white">"Zombie Materials."</strong> They exist in a computer but die in the factory because they cannot be processed at scale.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#48cae4]/10 border-l-4 border-[#48cae4] p-6 md:p-8 rounded-r-lg">
              <h3 className="text-xl md:text-2xl font-medium text-white mb-4">The Shodh Thesis</h3>
              <p className="text-white/70 italic mb-6 text-base md:text-lg">Discovery without Manufacturability is vanity.</p>
              
              <h3 className="text-xl md:text-2xl font-medium text-white mb-4">Our Solution</h3>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                We do not separate "Chemistry" from "Process." Our AI generates the Material and the Manufacturing Instruction simultaneously. We don't just find the needle in the haystack; we tell you how to build the magnet.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE ENGINE */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32">
          <div className="pointer-events-auto">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-12 leading-tight">
              2. The Engine: The Matter Compiler
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 font-light italic mb-12 border-l-2 border-white/20 pl-6">
              "We translate Intent into Reality. Our Physics Kernels simulate the factory before we build the material."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                 <h3 className="text-xl md:text-2xl font-bold text-white mb-4">The Concept</h3>
                 <p className="text-white/70 leading-relaxed text-base md:text-lg">
                   Just as software compilers turn abstract code into machine-readable binary, Shodh turns abstract Physics Targets (Energy Density) into machine-readable Factory Settings (Mix Speed, Temp, Pressure).
                 </p>
              </div>
              <div>
                 <h3 className="text-xl md:text-2xl font-bold text-white mb-4">The Result</h3>
                 <p className="text-white/70 leading-relaxed text-base md:text-lg">
                   <strong className="text-[#48cae4]">"Zero-Shot Manufacturing."</strong> The recipe works the first time it hits the line.
                 </p>
              </div>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-xl p-6 md:p-8 mb-16">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">The Mechanism</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm md:text-base">
                  <div className="bg-white/5 p-4 rounded border border-white/5">
                     <strong className="block text-[#48cae4] mb-2">1. Generate</strong>
                     <span className="text-white/70">The Inverse Model proposes a new chemistry.</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded border border-white/5">
                     <strong className="block text-[#48cae4] mb-2">2. Simulate</strong>
                     <span className="text-white/70">The Physics Kernel tests it for stability.</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded border border-white/5">
                     <strong className="block text-[#48cae4] mb-2">3. Compile</strong>
                     <span className="text-white/70">The Process Model checks if existing factory machines can build it.</span>
                  </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#0a1628] border border-white/10 p-6 md:p-8 rounded-xl opacity-60">
                <h3 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-white mb-6">
                  <Cpu className="w-5 h-5" /> Code Compiler
                </h3>
                <div className="space-y-4 font-mono text-sm md:text-base text-white/60">
                  <div className="flex justify-between p-3 bg-white/5 rounded"><span>Input</span> <span className="text-white">English Code (Python)</span></div>
                  <div className="flex justify-center text-white/20">↓</div>
                  <div className="flex justify-between p-3 bg-white/5 rounded"><span>Output</span> <span className="text-white">Machine Code (0s & 1s)</span></div>
                  <div className="flex justify-center text-white/20">↓</div>
                  <div className="flex justify-between p-3 bg-white/5 rounded"><span>Execution</span> <span className="text-white">CPU executes it</span></div>
                </div>
              </div>

              <div className="bg-[#48cae4]/5 border border-[#48cae4]/30 p-6 md:p-8 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#48cae4] blur-[80px] opacity-20" />
                <h3 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-white mb-6">
                  <Zap className="w-5 h-5 text-[#48cae4]" /> Matter Compiler
                </h3>
                <div className="space-y-4 font-mono text-sm md:text-base text-white/80">
                  <div className="flex justify-between p-3 bg-[#48cae4]/10 rounded border border-[#48cae4]/20"><span>Input</span> <span className="text-[#48cae4]">Intent (High Energy Anode)</span></div>
                  <div className="flex justify-center text-[#48cae4]/50">↓</div>
                  <div className="flex justify-between p-3 bg-[#48cae4]/10 rounded border border-[#48cae4]/20"><span>Output</span> <span className="text-[#48cae4]">Process Params (Temp, Pressure)</span></div>
                  <div className="flex justify-center text-[#48cae4]/50">↓</div>
                  <div className="flex justify-between p-3 bg-[#48cae4]/10 rounded border border-[#48cae4]/20"><span>Execution</span> <span className="text-[#48cae4]">Factory Machine executes it</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT DEFINITIONS */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32">
          <div className="pointer-events-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "SkandaX SIMULATE",
                role: "\"The Truth.\"",
                desc: "A physics-calibrated virtual reality that replaces physical testing. It deletes experimentation."
              },
              {
                title: "SkandaX COMPILER",
                role: "\"The Instruction.\"",
                desc: "The software layer that runs inside the factory (Federated). It translates our recipes into machine controls."
              },
              {
                title: "SkandaX GENESIS",
                role: "\"The Inventor.\"",
                desc: "The Generative Engine. It creates proprietary IP (Recipes) that we license to the world."
              }
            ].map((card, i) => (
              <div key={i} className="p-6 md:p-8 border border-white/10 rounded-xl bg-gradient-to-b from-white/5 to-transparent hover:border-[#48cae4]/50 transition-colors">
                <h3 className="text-[#48cae4] text-xs font-bold uppercase tracking-widest mb-2">{card.role}</h3>
                <h4 className="text-xl md:text-2xl font-medium text-white mb-4">{card.title}</h4>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: BUSINESS MODEL */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32">
          <div className="pointer-events-auto">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-12 leading-tight">
              3. The Business Model
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-12">Here is how we capture value in three layers:</p>

            <div className="space-y-8">
              {/* Layer 1 */}
              <div className="bg-[#0a1628] border border-white/10 p-6 md:p-8 rounded-2xl hover:border-[#48cae4]/30 transition-all">
                <div className="flex flex-col md:flex-row gap-8">
                   <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Layer 1: The "Bridge"</h3>
                      <p className="text-[#48cae4] text-xs font-mono mb-4">PAID TO DEVELOP</p>
                      <p className="text-white/60 text-sm md:text-base">The Product: <strong className="text-white">SkandaX SIMULATE & GENESIS</strong></p>
                   </div>
                   <div className="md:w-2/3 space-y-4">
                      <p className="text-sm md:text-base text-white/80"><strong className="text-white">The Customer Problem:</strong> "We have a chemistry that works in a beaker but cracks on the coating line. Fix it."</p>
                      <p className="text-sm md:text-base text-white/80"><strong className="text-white">The Model:</strong> NRE (Non-Recurring Engineering) Fees.</p>
                      <p className="text-sm md:text-base text-white/80"><strong className="text-white">How it Works:</strong> Large partners (e.g., Tata, Umicore) pay us a significant upfront fee (e.g., <span className="text-[#48cae4]">$2M - $5M</span>) to use our Generative Engine to solve a specific "Impossible Problem."</p>
                      <div className="bg-white/5 p-3 rounded">
                         <strong className="block text-white text-xs uppercase mb-1">Why Investors Love It</strong>
                         <span className="text-white/60 text-sm">This is Non-Dilutive Capital. It pays our burn rate today, so we don't have to sell equity to keep the lights on.</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Layer 2 */}
              <div className="bg-[#0a1628] border border-white/10 p-6 md:p-8 rounded-2xl hover:border-[#48cae4]/30 transition-all">
                <div className="flex flex-col md:flex-row gap-8">
                   <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Layer 2: The "Rent"</h3>
                      <p className="text-[#48cae4] text-xs font-mono mb-4">PAID TO OPERATE</p>
                      <p className="text-white/60 text-sm md:text-base">The Product: <strong className="text-white">SkandaX COMPILER</strong></p>
                   </div>
                   <div className="md:w-2/3 space-y-4">
                      <p className="text-sm md:text-base text-white/80"><strong className="text-white">The Customer Problem:</strong> "Great, you fixed the design. Now, how do we run our machines to ensure it doesn't fail next week?"</p>
                      <p className="text-sm md:text-base text-white/80"><strong className="text-white">The Model:</strong> Annual Software License (SaaS).</p>
                      <p className="text-sm md:text-base text-white/80"><strong className="text-white">How it Works:</strong> To manufacture the material successfully, the factory must run our "Compiler" software on their production line to adjust temperature and pressure in real-time. We charge a recurring fee per production line (e.g., <span className="text-[#48cae4]">$250k/year/line</span>).</p>
                      <p className="text-xs italic text-white/50 border-l-2 border-[#48cae4] pl-3">"The Compiler operates as a federated control layer, integrating with existing PLC/MES systems without replacing factory hardware."</p>
                      <div className="bg-white/5 p-3 rounded">
                         <strong className="block text-white text-xs uppercase mb-1">Why Investors Love It</strong>
                         <span className="text-white/60 text-sm">This is High-Margin ARR. It creates a "Data Moat"—once our software is installed, we are the operating system of that factory.</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Layer 3 */}
              <div className="bg-[#0a1628] border border-white/10 p-6 md:p-8 rounded-2xl hover:border-[#48cae4]/30 transition-all">
                <div className="flex flex-col md:flex-row gap-8">
                   <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Layer 3: The "Empire"</h3>
                      <p className="text-[#48cae4] text-xs font-mono mb-4">PAID ON SCALE</p>
                      <p className="text-white/60 text-sm md:text-base">The Product: <strong className="text-white">The Shodh-Inside™ Recipe</strong></p>
                   </div>
                   <div className="md:w-2/3 space-y-4">
                      <p className="text-sm md:text-base text-white/80"><strong className="text-white">The Customer Problem:</strong> "We need a competitive advantage. We need the best battery on the market."</p>
                      <p className="text-sm md:text-base text-white/80"><strong className="text-white">The Model:</strong> Production Royalties (The "Intel Inside" Tax).</p>
                      <p className="text-sm md:text-base text-white/80"><strong className="text-white">How it Works:</strong> Because we generated the molecular structure and the process recipe, we own the IP. We take a small cut of every unit produced.</p>
                      <p className="text-sm md:text-base text-white/80"><strong className="text-white">Example:</strong> $1.00 per kWh of battery produced.</p>
                      <p className="text-sm md:text-base text-white/80"><strong className="text-white">Scale:</strong> A 20 GWh factory = <span className="text-[#48cae4]">$20M/year</span> in pure profit.</p>
                      <div className="bg-white/5 p-3 rounded">
                         <strong className="block text-white text-xs uppercase mb-1">Why Investors Love It</strong>
                         <span className="text-white/60 text-sm">This is Exponential Upside. We have Zero Marginal Cost. Whether the factory builds 1 battery or 1 million, our cost is the same, but our revenue explodes.</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: ROADMAP */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32">
          <div className="pointer-events-auto">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-12 leading-tight">
               4. The Roadmap: From Battery to Universal Matter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-lg">
                  <span className="text-[#48cae4] font-mono text-xs mb-2 block">PHASE 1</span>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-4">Energy Storage</h3>
                  <p className="text-white/60 text-sm md:text-base mb-4">(The Beachhead)</p>
                  <p className="text-white text-sm md:text-base">Silicon Anodes, Sodium-Ion, Solid State.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-lg">
                  <span className="text-white/40 font-mono text-xs mb-2 block">PHASE 2</span>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-4">Molecular Transport</h3>
                  <p className="text-white/60 text-sm md:text-base mb-4">(The Expansion)</p>
                  <p className="text-white text-sm md:text-base">Green Hydrogen Electrolyzers, Membranes.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-lg">
                  <span className="text-white/40 font-mono text-xs mb-2 block">PHASE 3</span>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-4">Structural Physics</h3>
                  <p className="text-white/60 text-sm md:text-base mb-4">(The Endgame)</p>
                  <p className="text-white text-sm md:text-base">Alloys, Armor, Semiconductors.</p>
              </div>
            </div>
          </div>
        </section>
        {/* SUMMARY TABLE */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32">
          <div className="pointer-events-auto">
            <h3 className="text-white text-xl md:text-2xl font-bold mb-6">Summary: The "Revenue-Product" Map</h3>
            <div className="overflow-x-auto border border-white/10 rounded-xl bg-white/[0.02]">
            <table className="w-full text-left text-sm md:text-base">
                <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white font-medium">
                    <th className="p-6">Stage</th>
                    <th className="p-6">The Product Used</th>
                    <th className="p-6">The Revenue Stream</th>
                    <th className="p-6">The Economics</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/[0.02]">
                    <td className="p-6 text-white font-bold">1. Design</td>
                    <td className="p-6 text-[#48cae4]">SkandaX GENESIS</td>
                    <td className="p-6">Development Fee (NRE)</td>
                    <td className="p-6 text-white/60">Covers our Costs (Cash Flow).</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                    <td className="p-6 text-white font-bold">2. Build</td>
                    <td className="p-6 text-[#48cae4]">SkandaX COMPILER</td>
                    <td className="p-6">Software License (SaaS)</td>
                    <td className="p-6 text-white/60">Covers our Growth (Recurring).</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                    <td className="p-6 text-white font-bold">3. Scale</td>
                    <td className="p-6 text-[#48cae4]">The IP Recipe</td>
                    <td className="p-6">Unit Royalty</td>
                    <td className="p-6 text-white/60">Creates the Unicorn (Profit).</td>
                </tr>
                </tbody>
            </table>
            </div>
          </div>
        </section>

        {/* SECTION 7: DEPLOYMENT LANDSCAPE */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32">
          <div className="pointer-events-auto">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-12 leading-tight">
              7. The Deployment Landscape: A Layered Engagement Model
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-light mb-12">
              We do not sell one product to everyone. We engage the market in three layers, aligning our commercial model with the customer's specific pain point in the value chain.
            </p>

            <div className="grid grid-cols-1 gap-12 mb-20">
              {/* L1 */}
              <div className="border border-white/10 p-6 md:p-8 rounded-xl bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-6">
                  <Beaker className="text-[#48cae4] w-6 h-6" />
                  <h3 className="text-white font-bold text-xl md:text-2xl">Layer 1: The "Bridge" Engagement</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 text-sm md:text-base text-white/70">
                      <p><strong className="text-white">Revenue Model:</strong> Development Fees (NRE) & Joint Development.</p>
                      <p><strong className="text-white">The Customer:</strong> Material Producers & Technology Owners.</p>
                      <p><strong className="text-white">The Pain Point:</strong> "We have a chemistry that works in the lab, but fails to scale."</p>
                      <p><strong className="text-white">Why they buy:</strong> They are stuck in the "Valley of Death." They pay Shodh AI to use SkandaX GENESIS to fix their microstructure and generate a manufacturable recipe.</p>
                  </div>
                  <div className="space-y-4 text-sm md:text-base">
                      <div>
                          <span className="text-[#48cae4] font-bold block mb-1">Battery Leaders (Cell & Chem):</span>
                          <p className="text-white/60">LG Energy Solution, Panasonic Energy, Samsung SDI, SK On, Northvolt, AESC.</p>
                      </div>
                      <div>
                          <span className="text-[#48cae4] font-bold block mb-1">Green Hydrogen & Electrolyzers:</span>
                          <p className="text-white/60">Thyssenkrupp Nucera, Nel Hydrogen, ITM Power, Plug Power.</p>
                      </div>
                      <div>
                          <span className="text-[#48cae4] font-bold block mb-1">Specialty Chemicals:</span>
                          <p className="text-white/60">BASF, Umicore, Johnson Matthey, Solvay, Arkema.</p>
                      </div>
                  </div>
                </div>
              </div>

              {/* L2 */}
              <div className="border border-white/10 p-6 md:p-8 rounded-xl bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-6">
                  <Factory className="text-[#48cae4] w-6 h-6" />
                  <h3 className="text-white font-bold text-xl md:text-2xl">Layer 2: The "Rent" Engagement</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 text-sm md:text-base text-white/70">
                      <p><strong className="text-white">Revenue Model:</strong> Annual Software Licensing (SaaS).</p>
                      <p><strong className="text-white">The Customer:</strong> Factory Operators & Equipment Owners.</p>
                      <p><strong className="text-white">The Pain Point:</strong> "We need to stop yield drift and control the line in real-time."</p>
                      <p><strong className="text-white">Why they buy:</strong> Once the line is running, variance is the enemy. They deploy SkandaX COMPILER directly onto the machines to lock in the "Perfect Digital Twin" and maintain yield.</p>
                  </div>
                  <div className="space-y-4 text-sm md:text-base">
                      <div>
                          <span className="text-[#48cae4] font-bold block mb-1">Automotive OEMs (Gigafactory Owners):</span>
                          <p className="text-white/60">Tesla, Volkswagen Group, BMW, Toyota, Mercedes-Benz, Stellantis, Ford.</p>
                      </div>
                      <div>
                          <span className="text-[#48cae4] font-bold block mb-1">Semiconductors & Equipment:</span>
                          <p className="text-white/60">TSMC, Intel, Samsung Electronics, Applied Materials, ASML, Lam Research.</p>
                      </div>
                      <div>
                          <span className="text-[#48cae4] font-bold block mb-1">Industrial Process Operators:</span>
                          <p className="text-white/60">Air Liquide, Linde, Air Products.</p>
                      </div>
                  </div>
                </div>
              </div>

              {/* L3 */}
              <div className="border border-white/10 p-6 md:p-8 rounded-xl bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-6">
                  <Coins className="text-[#48cae4] w-6 h-6" />
                  <h3 className="text-white font-bold text-xl md:text-2xl">Layer 3: The "Empire" Engagement</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 text-sm md:text-base text-white/70">
                      <p><strong className="text-white">Revenue Model:</strong> Production Royalties & IP Licensing.</p>
                      <p><strong className="text-white">The Customer:</strong> Strategic Sectors & Commodity Giants.</p>
                      <p><strong className="text-white">The Pain Point:</strong> "We need a fundamental material advantage to dominate the market."</p>
                      <p><strong className="text-white">Why they buy:</strong> In these sectors, performance is binary (it works or it doesn't). They license the Shodh Proprietary Recipe because it creates a moat that competitors cannot replicate.</p>
                  </div>
                  <div className="space-y-4 text-sm md:text-base">
                      <div>
                          <span className="text-[#48cae4] font-bold block mb-1">Aerospace & Defense:</span>
                          <p className="text-white/60">Lockheed Martin, Raytheon, Boeing, Airbus, Safran, BAE Systems.</p>
                      </div>
                      <div>
                          <span className="text-[#48cae4] font-bold block mb-1">Strategic Metals & Alloys:</span>
                          <p className="text-white/60">ArcelorMittal, Nippon Steel, POSCO, Alcoa, Rio Tinto.</p>
                      </div>
                      <div>
                          <span className="text-[#48cae4] font-bold block mb-1">Energy Infrastructure:</span>
                          <p className="text-white/60">Siemens Energy, GE Vernova.</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* INDIA BEACHHEAD */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF9933]/10 via-white/5 to-[#138808]/10 border border-white/10 p-6 md:p-8">
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start justify-between">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="text-white" />
                    <h3 className="text-xl md:text-2xl font-bold text-white">The Strategic Beachhead: India 🇮🇳</h3>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                      <div>
                          <strong className="text-[#48cae4] text-xs uppercase tracking-wider block mb-1">The Model</strong>
                          <p className="text-white/80 text-sm md:text-base">Sovereign Partnership & PLI Alignment.</p>
                      </div>
                      <div>
                          <strong className="text-[#48cae4] text-xs uppercase tracking-wider block mb-1">The Players</strong>
                          <ul className="text-white/70 text-sm md:text-base space-y-1 list-disc pl-4">
                              <li><strong className="text-white">Conglomerates:</strong> Tata Group, Reliance Industries, Mahindra, Hindalco.</li>
                              <li><strong className="text-white">New Energy:</strong> Ola Electric, Amara Raja, Exide.</li>
                              <li><strong className="text-white">National Assets:</strong> ISRO, DRDO, HAL.</li>
                          </ul>
                      </div>
                  </div>

                  <p className="text-white/70 leading-relaxed text-sm md:text-base">
                    <strong className="text-white">Why India Matters:</strong> India is not just a market; it is a launchpad. With the IndiaAI Mission and massive PLI schemes for batteries and hydrogen, these players are seeking Technology Sovereignty—reducing reliance on foreign IP. Shodh AI provides the domestic Operating System for this transition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
