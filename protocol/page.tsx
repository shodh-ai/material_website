"use client";

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
  Activity,
  ArrowRight
} from "lucide-react";
import CanvasLayer from "@/components/three/CanvasLayer";

export default function SkandaPage() {
  return (
    <div className="relative min-h-screen w-full text-[#f0f0ff] selection:bg-[#48cae4] selection:text-[#081421] overflow-x-hidden">
      {/* Background Layer */}
      <CanvasLayer />

      <main id="html-scroll-container" className="relative z-[2] w-full pointer-events-none">
        <Navbar />

        {/* HERO SECTION - FULL SCREEN, CENTERED (User requested "Just one thing") */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto pt-20 pb-12 relative">
          <div className="w-full text-center space-y-8">
            <div className="flex items-center justify-center gap-3">
              <div className="w-2 h-2 bg-[#48cae4] rounded-full shadow-[0_0_10px_#48cae4] animate-pulse" />
              <span className="text-[#48cae4] text-xs font-bold tracking-[0.2em] uppercase">The Core Architecture</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium tracking-tight leading-[1.05] break-words uppercase">
              The Skanda <br className="hidden md:block" /> Protocol
            </h1>

            <p className="text-base md:text-xl text-white/90 font-light max-w-3xl mx-auto drop-shadow-md leading-relaxed">
              The Universal "Matter Compiler" for Mesoscale Manufacturing.
            </p>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
            <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
          </div>
        </section>

        {/* SECTION 1: THE THESIS */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32 pt-10">
          <div className="pointer-events-auto rounded-3xl border border-white/10 bg-[#081421]/80 backdrop-blur-md shadow-2xl p-6 sm:p-10 lg:p-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-16 leading-tight text-center">
              1. The Thesis: Solving the <br/> "Missing Middle"
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
              
              {/* Atomic AI */}
              <div className="flex flex-col p-8 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                <span className="text-xs font-mono text-white/40 block mb-4 tracking-widest">0.1 NM (ANGSTROMS)</span>
                <h3 className="text-2xl font-bold text-white mb-2">Atomic AI</h3>
                <p className="text-[#48cae4] text-xs font-mono mb-6">GOOGLE GNoME</p>
                <p className="text-white/60 text-sm leading-relaxed mt-auto">
                   Good at finding molecules. But molecules don't build batteries on their own.
                </p>
              </div>

              {/* The Mesoscale (Target) */}
              <div className="relative flex flex-col p-8 border-2 border-[#48cae4] rounded-2xl bg-[#48cae4]/5 shadow-[0_0_40px_rgba(72,202,228,0.1)] transform md:-translate-y-4">
                <div className="absolute top-0 right-0 px-4 py-1 bg-[#48cae4] text-[#081421] text-[10px] font-black uppercase tracking-widest rounded-bl-lg">Target Zone</div>
                <span className="text-xs font-mono text-[#48cae4] block mb-4 tracking-widest">10NM – 100μM</span>
                <h3 className="text-3xl font-bold text-white mb-2">The Mesoscale</h3>
                <p className="text-white text-xs font-mono mb-6 font-bold">SHODH AI / SKANDA</p>
                <p className="text-white text-sm leading-relaxed font-medium mt-auto">
                  Pores, Grains, Defects. The structural regime where manufacturing actually fails.
                </p>
              </div>

              {/* System AI */}
              <div className="flex flex-col p-8 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                <span className="text-xs font-mono text-white/40 block mb-4 tracking-widest">METERS (MACRO)</span>
                <h3 className="text-2xl font-bold text-white mb-2">System AI</h3>
                <p className="text-[#48cae4] text-xs font-mono mb-6">ANSYS / CAD</p>
                <p className="text-white/60 text-sm leading-relaxed mt-auto">
                  Good at simulating cars and planes, but blind to the material physics inside.
                </p>
              </div>
            </div>

            <div className="bg-[#48cae4]/10 border-l-4 border-[#48cae4] p-8 md:p-10 rounded-r-2xl">
              <p className="text-xl md:text-2xl italic text-white/90 font-light leading-relaxed">
                "In a Gigafactory, yield loss is almost never an 'atomic' problem; it is a structural problem. If you control the structure, you control the yield."
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE ENGINE */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32">
          <div className="pointer-events-auto">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-16 leading-tight">
              2. The Engine: <br className="md:hidden" /> 3D Diffusion Transformers
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-10">
                <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed border-l-2 border-[#48cae4] pl-6">
                  To solve the scale-up problem, we cannot use traditional AI that just predicts a number. We need AI that <strong className="text-white">designs the solution.</strong>
                </p>
                {/* Full Original Content Restored */}
                <div className="space-y-6 text-base md:text-lg text-white/70 leading-relaxed">
                  <p>
                    We utilize a 3D Diffusion Transformer (DiT)—the same core architecture behind OpenAI’s Sora, but retrained for Physics. Instead of pixels, Skanda treats matter as <strong className="text-white">3D Voxels</strong>.
                  </p>
                  <p>
                    It learns the "grammar" of how particles pack, pores connect, and binders stretch.
                  </p>
                </div>
              </div>

              {/* Architecture Spec Card */}
              <div className="bg-[#0a1628]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                   <Cpu className="w-6 h-6 text-[#48cae4]" /> 
                   <h3 className="text-xl md:text-2xl font-bold text-white">Architecture Spec</h3>
                </div>
                
                <div className="flex flex-col gap-4">
                  {[
                    { icon: <Box className="w-5 h-5"/>, label: "Input", title: "3D Voxels", desc: "Volumetric data representing density and porosity." }, // Full text
                    { icon: <Network className="w-5 h-5"/>, label: "Model", title: "DiT (Diffusion Transformer)", desc: "Generative design capable of handling complex topology." }, // Full text
                    { icon: <Zap className="w-5 h-5"/>, label: "Validator", title: "FNO (Fourier Neural Ops)", desc: "Validates designs in milliseconds vs. hours in traditional solvers." } // Full text
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-start gap-6 p-6 bg-white/5 rounded-xl border border-white/5 hover:border-[#48cae4]/30 transition-colors">
                      <div className="p-3 bg-[#48cae4]/10 rounded-lg text-[#48cae4] shrink-0 w-fit mt-1">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-[#48cae4] text-[10px] font-bold uppercase tracking-widest mb-1 block">{item.label}</span>
                        <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                        <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                  <span className="text-[#48cae4] font-mono text-xs md:text-sm tracking-widest">THROUGHPUT: 1,000,000+ DESIGNS / MINUTE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: UNIVERSAL BRAIN */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32">
          <div className="pointer-events-auto">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-10 leading-tight">
              3. The Universal Brain
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-16 max-w-4xl">
              We don't build a new AI for every material. We built a Universal Brain that understands geometry, and we plug in "Physics Cartridges."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { id: "01", title: "Energy Cartridge", icon: <Zap className="w-6 h-6 text-[#48cae4]" />, desc: "Teaches the AI how ions navigate battery pores.", app: "Batteries, Supercaps" },
                { id: "02", title: "Fluid Cartridge", icon: <Activity className="w-6 h-6 text-[#48cae4]" />, desc: "Teaches the AI how gas bubbles escape porous media.", app: "Hydrogen Electrolyzers" },
                { id: "03", title: "Mechanics Cartridge", icon: <Layers className="w-6 h-6 text-[#48cae4]" />, desc: "Teaches the AI how metal grains slip under stress.", app: "Jet Engines, Armor" }
              ].map((card, i) => (
                <div key={i} className="p-8 border border-white/10 rounded-2xl bg-[#081421]/60 backdrop-blur-sm hover:border-[#48cae4]/50 transition-all group">
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-white/20 text-xs tracking-widest">KERNEL {card.id}</span>
                    <div className="group-hover:scale-110 transition-transform duration-300 bg-white/5 p-2 rounded-lg">{card.icon}</div>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-4">{card.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-8 min-h-[50px]">{card.desc}</p>
                  <div className="inline-block px-3 py-1.5 bg-[#48cae4]/10 rounded border border-[#48cae4]/20">
                    <span className="text-[#48cae4] text-[10px] font-bold uppercase tracking-wide">{card.app}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#48cae4]/5 border border-[#48cae4]/20 p-8 rounded-xl text-center">
              <p className="text-sm md:text-base text-[#48cae4]">
                <strong className="uppercase mr-2">The Network Effect:</strong> 
                A "clogged pore" in a battery is mathematically identical to a "clogged pore" in a hydrogen filter. By solving one, Skanda gets smarter at all of them.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: SKANDA-MORPH */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32">
          <div className="pointer-events-auto bg-[#081421]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left: Visual Block */}
              <div className="order-2 lg:order-1 relative">
                <div className="absolute inset-0 bg-[#48cae4]/10 blur-[80px] rounded-full opacity-30" />
                <div className="relative border border-white/10 bg-[#0a1628] rounded-2xl overflow-hidden p-8 md:p-10">
                  <div className="space-y-4 font-mono">
                    <div className="flex items-center justify-between opacity-50 p-4 bg-white/5 rounded-lg border border-white/5">
                      <span className="text-white/40 text-sm">Design (Perfect Geometry)</span>
                      <span className="text-red-400 text-[10px] uppercase font-bold tracking-wider">Unmanufacturable</span>
                    </div>
                    
                    <div className="flex justify-center text-white/20 py-2">↓</div>

                    <div className="flex items-center gap-6 p-6 border border-[#48cae4]/30 bg-[#48cae4]/5 rounded-xl">
                      <div className="p-3 bg-[#48cae4]/20 rounded-lg">
                        <ScanLine className="text-[#48cae4] w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Skanda-Morph Engine</h4>
                        <p className="text-xs text-[#48cae4]">Simulating Shear, Crush, Deform...</p>
                      </div>
                    </div>

                    <div className="flex justify-center text-white/20 py-2">↓</div>

                    <div className="bg-[#081421] p-6 rounded-lg border border-white/10 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#48cae4]" />
                      <span className="text-[#48cae4] text-[10px] font-bold uppercase block mb-4 tracking-widest">Output: Machine Code</span>
                      <div className="text-sm text-white/80 space-y-3 font-mono">
                        <div className="flex justify-between border-b border-white/5 pb-2"><span>SET TEMP:</span> <span className="text-white">140°C</span></div>
                        <div className="flex justify-between border-b border-white/5 pb-2"><span>SET PRESSURE:</span> <span className="text-white">220 MPa</span></div>
                        <div className="flex justify-between"><span>SET LINE_SPEED:</span> <span className="text-white">45 m/min</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Text */}
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-10 leading-tight">
                  4. Skanda-Morph: <br/> The Process Compiler
                </h2>
                <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
                  The fatal flaw of Lab AI is the assumption of "Perfect Geometry." But manufacturing is violent—it shears, crushes, and deforms matter.
                </p>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-2 h-2 bg-[#48cae4] rounded-full mt-3 flex-shrink-0 shadow-[0_0_8px_#48cae4]" />
                    <p className="text-white/70 text-base md:text-lg">
                      <strong className="text-white">Digital Twin:</strong> Simulates the Rheology (mixing) and Calendering (crushing) of the material.
                    </p>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-2 h-2 bg-[#48cae4] rounded-full mt-3 flex-shrink-0 shadow-[0_0_8px_#48cae4]" />
                    <p className="text-white/70 text-base md:text-lg">
                      <strong className="text-white">Zero-Shot Manufacturing:</strong> It doesn't just give you a 3D design; it gives you the factory settings to build it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: THE DATA MOAT */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32">
          <div className="pointer-events-auto bg-[#081421]/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-16 text-center">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium text-white mb-8">
              5. The Data Moat: <br/> The Physics Hypercube
            </h2>
            <p className="text-xl text-white/60 mb-16 italic">
              "We don't wait for data from slow labs. We manufacture our own data."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-white/[0.03] p-10 rounded-2xl border border-white/5 hover:border-[#48cae4]/30 transition-all">
                <h3 className="text-[#48cae4] text-5xl md:text-6xl font-medium mb-4 tracking-tight">10M+</h3>
                <p className="text-white font-bold text-xl mb-4">Synthetic Simulations</p>
                <p className="text-sm md:text-base text-white/60 leading-relaxed">
                  We taught our AI the fundamental laws of physics (Thermodynamics, Stress-Strain) before it ever saw a real battery.
                </p>
              </div>
              <div className="bg-white/[0.03] p-10 rounded-2xl border border-white/5 hover:border-[#48cae4]/30 transition-all">
                <h3 className="text-[#48cae4] text-5xl md:text-6xl font-medium mb-4 tracking-tight">Sim2Real</h3>
                <p className="text-white font-bold text-xl mb-4">CT Scan Calibration</p>
                <p className="text-sm md:text-base text-white/60 leading-relaxed">
                  We use X-ray CT scans of real manufactured parts to "calibrate" the AI, teaching it the messy reality of factory humidity and gravity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: THE NEURAL EDGE */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32">
          <div className="pointer-events-auto">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-16 leading-tight">
              6. The Neural Edge: <br className="hidden md:block"/> Decentralized Compute
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-2 space-y-8">
                <p className="text-xl md:text-2xl text-white/80 font-light border-l-4 border-[#48cae4] pl-8 leading-relaxed mb-12">
                  Industrial AI cannot live in the cloud. A production line moving at 50m/min requires microsecond decisions.
                </p>
                
                <div className="grid grid-cols-1 gap-6">
                   <div className="flex flex-col sm:flex-row gap-8 items-start p-8 bg-[#081421]/60 border border-white/10 rounded-2xl backdrop-blur-sm">
                      <div className="p-4 bg-white/5 border border-white/5 rounded-2xl shrink-0">
                        <Server className="w-8 h-8 text-[#48cae4]" />
                      </div>
                      <div>
                         <h4 className="text-white text-2xl font-bold mb-3">Skanda-Edge Nodes</h4>
                         <p className="text-white/60 text-base leading-relaxed">
                           Powered by NVIDIA Orin/IGX. Deployed directly on the production line for real-time inference.
                         </p>
                      </div>
                   </div>
                   <div className="flex flex-col sm:flex-row gap-8 items-start p-8 bg-[#081421]/60 border border-white/10 rounded-2xl backdrop-blur-sm">
                      <div className="p-4 bg-white/5 border border-white/5 rounded-2xl shrink-0">
                        <Lock className="w-8 h-8 text-[#48cae4]" />
                      </div>
                      <div>
                         <h4 className="text-white text-2xl font-bold mb-3">Federated Learning</h4>
                         <p className="text-white/60 text-base leading-relaxed">
                           The AI learns from local defects and sends only the math (Gradients) to our central brain. Raw proprietary data never leaves the factory.
                         </p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="col-span-1 bg-[#48cae4]/5 border border-[#48cae4]/20 p-10 rounded-3xl flex flex-col justify-center items-center text-center backdrop-blur-md">
                <Network className="w-16 h-16 text-[#48cae4] mb-8 opacity-80" />
                <span className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">THE NEW METRIC</span>
                <h3 className="text-3xl font-bold text-white mb-6">Compute-per-GWh</h3>
                <p className="text-base text-white/70 italic leading-relaxed">
                   "In the age of Software-Defined Materials, Yield is a function of Edge Compute."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GAMMA EMBED SECTION - FIXED DISAPPEARANCE */}
        <section className="px-4 sm:px-8 md:px-12 lg:px-20 max-w-[1440px] mx-auto mb-32">
          <div className="pointer-events-auto">
            <h3 className="text-white text-3xl font-bold mb-10">
              Interactive <span className="text-[#48cae4]">Demo</span>
            </h3>

            {/* 
              Switched to Flex Column Layout: 
              This ensures the header stays at top and iframe fills the rest without Z-index overlapping issues.
            */}
            <div className="w-full h-[600px] md:h-[850px] bg-[#081421] rounded-3xl overflow-hidden border border-white/10 flex flex-col">
               {/* Header Block (Fixed Height) */}
               <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#081421]/90 backdrop-blur-sm shrink-0">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#48cae4] rounded-full animate-pulse" />
                    <span className="text-white font-medium text-sm tracking-widest uppercase">SkandaX: Live Preview</span>
                  </div>
                  <span className="text-white/30 text-xs font-mono hidden sm:block">SECURE CONNECTION</span>
               </div>

               {/* Iframe Block (Fills remaining space) */}
               <div className="flex-grow w-full relative">
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

        {/* BOTTOM LINE */}
        <section className="px-4 sm:px-6 md:px-10 max-w-[95%] lg:max-w-[90%] mx-auto mb-32 text-center relative z-10">
          <div className="pointer-events-auto border-t border-white/10 pt-20">
             <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium text-white mb-10">The Bottom Line</h2>
             <p className="text-xl md:text-2xl text-white/60 mb-16 max-w-4xl mx-auto leading-relaxed">
                Shodh AI is moving the industry from <br className="hidden md:block"/>
                <span className="text-white decoration-[#48cae4] underline decoration-2 underline-offset-8">Discovery by Luck</span> to <span className="text-white decoration-[#48cae4] underline decoration-2 underline-offset-8">Discovery by Design</span>.
             </p>
             <div className="inline-flex items-center gap-4 bg-[#48cae4] text-[#081421] px-10 py-5 rounded-full font-bold tracking-widest uppercase hover:bg-white transition-colors cursor-pointer text-sm md:text-base">
                Deploy Skanda Protocol <ArrowRight className="w-5 h-5" />
             </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}