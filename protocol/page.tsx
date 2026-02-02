import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Cpu, 
  Layers, 
  ScanLine, 
  Network, 
  Box, 
  Zap, 
  Server, 
  Lock, 
  Activity 
} from "lucide-react";
import Image from "next/image";

export default function SkandaPage() {
  return (
    <main className="min-h-screen w-full relative bg-[#081421] text-[#f0f0ff] font-sans selection:bg-[#48cae4] selection:text-[#081421]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/Frame 626503.png" 
          alt="Background"
          fill
          priority
          className="object-cover opacity-60"
        />
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#081421]/30 via-[#081421]/80 to-[#081421]" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <div className="pt-40 pb-20 px-6 md:px-10 max-w-6xl mx-auto">
          
          {/* --- HERO SECTION --- */}
          <header className="text-center mb-24">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-2 bg-[#48cae4] rounded-full shadow-[0_0_8px_#48cae4] animate-pulse" />
              <span className="text-[#48cae4] text-xs font-bold tracking-[0.2em] uppercase">
                The Core Architecture
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-medium uppercase tracking-tight mb-8 text-white leading-[1.1]">
              The Skanda Protocol
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto">
              The Universal "Matter Compiler" for Mesoscale Manufacturing.
            </p>
          </header>

          {/* --- SECTION 1: THE THESIS --- */}
          <section className="mb-32">
            <div className="border border-white/10 rounded-2xl bg-white/[0.02] p-8 md:p-12 backdrop-blur-sm">
              <h2 className="text-2xl md:text-4xl font-medium text-white mb-10 text-center">
                1. The Thesis: Solving the "Missing Middle"
              </h2>

              <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 mb-10">
                <div className="flex-1 p-6 border border-white/10 rounded-xl bg-white/5 opacity-50 grayscale">
                    <span className="text-xs font-mono text-white/50 block mb-2">0.1 nm (Angstroms)</span>
                    <h3 className="text-lg font-bold text-white mb-2">Atomic AI</h3>
                    <p className="text-sm text-white/60 mb-2">Google GNoME</p>
                    <p className="text-xs text-white/40">Good at finding molecules.</p>
                </div>

                <div className="flex-1 p-6 border-2 border-[#48cae4] rounded-xl bg-[#48cae4]/5 relative overflow-hidden transform md:-translate-y-2 shadow-[0_0_30px_rgba(72,202,228,0.1)]">
                    <div className="absolute top-0 right-0 px-2 py-1 bg-[#48cae4] text-[#081421] text-[10px] font-bold uppercase tracking-wider">Target Zone</div>
                    <span className="text-xs font-mono text-[#48cae4] block mb-2">10nm – 100μm</span>
                    <h3 className="text-xl font-bold text-white mb-2">The Mesoscale</h3>
                    <p className="text-sm text-white mb-2 font-bold">Shodh AI / Skanda</p>
                    <p className="text-xs text-white/80">Pores, Grains, Defects. The structural regime where manufacturing actually fails.</p>
                </div>

                <div className="flex-1 p-6 border border-white/10 rounded-xl bg-white/5 opacity-50 grayscale">
                    <span className="text-xs font-mono text-white/50 block mb-2">Meters (Macro)</span>
                    <h3 className="text-lg font-bold text-white mb-2">System AI</h3>
                    <p className="text-sm text-white/60 mb-2">Ansys / CAD</p>
                    <p className="text-xs text-white/40">Good at simulating cars/planes.</p>
                </div>
              </div>

              <div className="text-center max-w-2xl mx-auto">
                <p className="text-lg text-white/80 italic">
                  "In a Gigafactory, yield loss is almost never an 'atomic' problem; it is a structural problem. If you control the structure, you control the yield."
                </p>
              </div>
            </div>
          </section>

          {/* --- SECTION 2: THE ENGINE --- */}
          <section className="mb-32">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-5xl font-medium text-white mb-6">
                  2. The Engine: <br/>
                  <span className="text-[#48cae4]">3D Diffusion Transformers</span>
                </h2>
                <div className="prose prose-invert text-white/70 space-y-4">
                  <p>
                    To solve the scale-up problem, we cannot use traditional AI that just predicts a number. We need AI that <strong className="text-white">designs the solution.</strong>
                  </p>
                  <p>
                    We utilize a 3D Diffusion Transformer (DiT)—the same core architecture behind OpenAI’s Sora, but retrained for Physics. Instead of pixels, Skanda treats matter as <strong>3D Voxels</strong>.
                  </p>
                  <p>
                    It learns the "grammar" of how particles pack, pores connect, and binders stretch.
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 w-full">
                <div className="bg-[#0a1628] border border-white/10 p-6 rounded-xl relative">
                   <div className="absolute -top-3 -right-3 bg-[#48cae4] text-[#081421] text-xs font-bold px-3 py-1 rounded-full uppercase">
                      Architecture Spec
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                        <Box className="text-[#48cae4] w-6 h-6 mt-1" />
                        <div>
                          <h4 className="text-white font-bold text-sm">Input: 3D Voxels</h4>
                          <p className="text-xs text-white/60">Not images. Volumetric data representing density and porosity.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                        <Cpu className="text-[#48cae4] w-6 h-6 mt-1" />
                        <div>
                          <h4 className="text-white font-bold text-sm">Model: DiT (Diffusion Transformer)</h4>
                          <p className="text-xs text-white/60">Generative design capable of handling complex topology.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-[#48cae4]/20">
                        <Zap className="text-[#48cae4] w-6 h-6 mt-1" />
                        <div>
                          <h4 className="text-white font-bold text-sm">Validator: FNO (Fourier Neural Ops)</h4>
                          <p className="text-xs text-white/60">Validates designs in milliseconds vs. hours in traditional solvers.</p>
                        </div>
                      </div>
                   </div>
                   <div className="mt-6 text-center border-t border-white/10 pt-4">
                      <span className="text-[#48cae4] font-mono text-sm"> Throughput: 1,000,000+ designs / minute</span>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- SECTION 3: UNIVERSAL BRAIN --- */}
          <section className="mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">
                3. The Universal Brain: Swappable Physics Kernels
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                We don't build a new AI for every material. We built a Universal Brain that understands geometry, and we plug in "Physics Cartridges."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: "A",
                  title: "Energy Cartridge",
                  icon: <Zap className="w-5 h-5 text-[#48cae4]" />,
                  desc: "Teaches the AI how ions navigate battery pores.",
                  app: "Batteries, Supercaps"
                },
                {
                  id: "B",
                  title: "Fluid Cartridge",
                  icon: <Activity className="w-5 h-5 text-[#48cae4]" />,
                  desc: "Teaches the AI how gas bubbles escape porous media.",
                  app: "Hydrogen Electrolyzers"
                },
                {
                  id: "C",
                  title: "Mechanics Cartridge",
                  icon: <Layers className="w-5 h-5 text-[#48cae4]" />,
                  desc: "Teaches the AI how metal grains slip under stress.",
                  app: "Jet Engines, Armor"
                }
              ].map((card, i) => (
                <div key={i} className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-6 rounded-xl hover:border-[#48cae4]/50 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-white/20 text-xs">KERNEL {card.id}</span>
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-white/70 text-sm mb-4 min-h-[40px]">{card.desc}</p>
                  <div className="bg-[#48cae4]/10 rounded px-3 py-2">
                    <span className="text-[#48cae4] text-xs font-mono uppercase">{card.app}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-[#48cae4]/5 border border-[#48cae4]/20 p-4 rounded-lg text-center max-w-3xl mx-auto">
              <p className="text-sm text-[#48cae4]">
                <strong className="uppercase mr-2">The Network Effect:</strong> 
                A "clogged pore" in a battery is mathematically identical to a "clogged pore" in a hydrogen filter. By solving one, Skanda gets smarter at all of them.
              </p>
            </div>
          </section>

          {/* --- SECTION 4: SKANDA-MORPH --- */}
          <section className="mb-32">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative">
                   <div className="absolute inset-0 bg-[#48cae4]/20 blur-[100px] rounded-full opacity-20" />
                   <div className="relative border border-white/10 bg-[#0a1628] rounded-xl overflow-hidden p-8">
                      <div className="space-y-6">
                         <div className="flex items-center justify-between opacity-50">
                            <span className="text-white/40 text-sm">Design (Perfect Geometry)</span>
                            <span className="text-red-400 text-xs">Unmanufacturable</span>
                         </div>
                         <div className="h-px bg-white/10 w-full" />
                         <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#48cae4]/20 rounded-lg">
                               <ScanLine className="text-[#48cae4] w-6 h-6" />
                            </div>
                            <div>
                               <h4 className="text-white font-bold">Skanda-Morph Engine</h4>
                               <p className="text-xs text-white/60">Simulates Shear, Crush, Deform</p>
                            </div>
                         </div>
                         <div className="h-px bg-white/10 w-full" />
                         <div className="bg-white/5 p-4 rounded border border-white/10">
                            <span className="text-[#48cae4] text-xs font-bold uppercase block mb-1">Output: Machine Code</span>
                            <div className="font-mono text-xs text-white/80 space-y-1">
                                <div className="flex justify-between"><span>TEMP:</span> <span>140°C</span></div>
                                <div className="flex justify-between"><span>PRESSURE:</span> <span>220 MPa</span></div>
                                <div className="flex justify-between"><span>LINE SPEED:</span> <span>45 m/min</span></div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="order-1 lg:order-2">
                   <h2 className="text-3xl md:text-5xl font-medium text-white mb-6">
                     4. Skanda-Morph: <br/>
                     <span className="text-white/50">The Process Compiler</span>
                   </h2>
                   <p className="text-white/80 text-lg mb-6">
                     The fatal flaw of Lab AI is the assumption of "Perfect Geometry." But manufacturing is violent—it shears, crushes, and deforms matter.
                   </p>
                   <ul className="space-y-4">
                      <li className="flex gap-3">
                         <span className="w-1.5 h-1.5 bg-[#48cae4] rounded-full mt-2.5" />
                         <p className="text-white/70 text-sm">
                           <strong className="text-white">Digital Twin:</strong> Simulates the Rheology (mixing) and Calendering (crushing) of the material.
                         </p>
                      </li>
                      <li className="flex gap-3">
                         <span className="w-1.5 h-1.5 bg-[#48cae4] rounded-full mt-2.5" />
                         <p className="text-white/70 text-sm">
                           <strong className="text-white">Zero-Shot Manufacturing:</strong> It doesn't just give you a 3D design; it gives you the factory settings to build it.
                         </p>
                      </li>
                   </ul>
                </div>
             </div>
          </section>

          {/* --- SECTION 5: DATA MOAT --- */}
          <section className="mb-32 bg-white/[0.02] border-y border-white/10 py-20 -mx-6 md:-mx-10 px-6 md:px-10">
             <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-medium text-white mb-8">
                   5. The Data Moat: The Physics Hypercube
                </h2>
                <p className="text-xl text-white/60 mb-12">
                   "We don't wait for data from slow labs. We manufacture our own data."
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                   <div className="bg-[#081421] p-8 rounded-xl border border-white/10">
                      <h3 className="text-[#48cae4] text-4xl font-bold mb-2">10 Million+</h3>
                      <p className="text-white font-medium mb-4">Synthetic Simulations</p>
                      <p className="text-sm text-white/60">
                         We taught our AI the fundamental laws of physics (Thermodynamics, Stress-Strain) before it ever saw a real battery.
                      </p>
                   </div>
                   <div className="bg-[#081421] p-8 rounded-xl border border-white/10">
                      <h3 className="text-[#48cae4] text-4xl font-bold mb-2">Sim-to-Real</h3>
                      <p className="text-white font-medium mb-4">CT Scan Calibration</p>
                      <p className="text-sm text-white/60">
                         We use X-ray CT scans of real manufactured parts to "calibrate" the AI, teaching it the messy reality of factory humidity and gravity.
                      </p>
                   </div>
                </div>
             </div>
          </section>

          {/* --- SECTION 6: THE NEURAL EDGE --- */}
          <section className="mb-32">
            <h2 className="text-3xl md:text-5xl font-medium text-white mb-12">
               6. The Neural Edge: Decentralized Compute
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="col-span-1 md:col-span-2">
                  <p className="text-xl text-white/80 font-light mb-8">
                     Industrial AI cannot live in the cloud. A production line moving at 50m/min requires microsecond decisions.
                  </p>
                  <div className="space-y-6">
                     <div className="flex gap-4">
                        <Server className="w-8 h-8 text-[#48cae4] flex-shrink-0" />
                        <div>
                           <h4 className="text-white font-bold mb-1">Skanda-Edge Nodes</h4>
                           <p className="text-white/60 text-sm">Powered by NVIDIA Orin/IGX. Deployed directly on the production line for real-time inference.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <Lock className="w-8 h-8 text-[#48cae4] flex-shrink-0" />
                        <div>
                           <h4 className="text-white font-bold mb-1">Federated Learning</h4>
                           <p className="text-white/60 text-sm">The AI learns from local defects and sends only the math (Gradients) to our central brain. Raw proprietary data never leaves the factory.</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="col-span-1 bg-white/5 border border-white/10 p-8 rounded-xl flex flex-col justify-center items-center text-center">
                  <Network className="w-12 h-12 text-[#48cae4] mb-4 opacity-80" />
                  <span className="text-white/40 text-xs uppercase tracking-widest mb-2">The New Metric</span>
                  <h3 className="text-2xl font-bold text-white mb-2">Compute-per-GWh</h3>
                  <p className="text-sm text-white/60">
                     "In the age of Software-Defined Materials, Yield is a function of Edge Compute."
                  </p>
               </div>
            </div>
          </section>

          {/* --- NEW SECTION: GAMMA EMBED (Full Width) --- */}
          <section className="mb-32">
            <div className="w-full bg-gradient-to-b from-[#48cae4]/20 to-transparent rounded-2xl p-1">
              <div className="bg-[#081421] rounded-2xl overflow-hidden border border-white/10 relative group">
                {/* Header for the Embed */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#48cae4] rounded-full animate-pulse" />
                    <span className="text-white font-medium text-sm tracking-wide">SkandaX: Interactive Demo</span>
                  </div>
                  <span className="text-white/30 text-xs font-mono">LIVE PREVIEW</span>
                </div>
                
                {/* The Iframe (Full Width) */}
                <div className="w-full h-[600px] md:h-[800px] bg-black/50 relative">
                    <iframe 
                      src="https://gamma.app/embed/k6ywudw9ptsjmly" 
                      className="absolute inset-0 w-full h-full border-0"
                      allowFullScreen 
                      title="SkandaX: Applied on Battery"
                    />
                </div>
              </div>
            </div>
          </section>

          {/* --- BOTTOM LINE --- */}
          <section className="text-center py-20 border-t border-white/10">
             <h2 className="text-white text-3xl font-bold mb-6">The Bottom Line</h2>
             <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto">
                Shodh AI is moving the industry from <span className="text-white decoration-[#48cae4] underline decoration-2 underline-offset-4">Discovery by Luck</span> to <span className="text-white decoration-[#48cae4] underline decoration-2 underline-offset-4">Discovery by Design</span>.
             </p>
             <div className="inline-block border border-[#48cae4] bg-[#48cae4]/10 px-8 py-4 rounded-full">
                <p className="text-[#48cae4] font-bold tracking-wide uppercase text-sm md:text-base">
                   We are the Operating System for the Physical World.
                </p>
             </div>
          </section>

        </div>
      </div>
      <Footer />
    </main>
  );
}