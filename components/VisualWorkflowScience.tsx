"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Droplets, ArrowDownRight, ArrowUpRight, BrainCircuit } from "lucide-react";

export default function VisualWorkflowScience() {
    return (
        <div className="w-full py-12 overflow-x-auto">
            <div className="min-w-[1000px] max-w-5xl mx-auto px-6">
                
                {/* Main Workflow Container */}
                <div className="relative">
                    
                    {/* Top Flow: Central Brain & Branches */}
                    <div className="flex flex-col items-center gap-12 mb-16">
                        
                        {/* THE SHARED BRAIN */}
                        <div className="relative w-full max-w-md mx-auto">
                            <div className="absolute inset-0 border-2 border-[#48cae4]/20 bg-[#48cae4]/5 rounded-2xl transform translate-x-2 translate-y-2"></div>
                            <div className="absolute inset-0 border-2 border-[#48cae4]/20 bg-[#48cae4]/10 rounded-2xl transform translate-x-1 translate-y-1"></div>
                            
                            <div className="relative border-2 border-[#48cae4]/50 bg-[#0a0a0a] backdrop-blur-sm p-8 rounded-2xl text-center shadow-[0_0_30px_rgba(72,202,228,0.1)]">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 rounded-full bg-[#48cae4]/10 flex items-center justify-center border border-[#48cae4]/30">
                                        <BrainCircuit className="w-8 h-8 text-[#48cae4]" />
                                    </div>
                                </div>
                                <div className="text-sm font-bold text-[#48cae4]/70 uppercase tracking-widest mb-3">Core Engine</div>
                                <div className="text-2xl font-bold text-white mb-3 tracking-tight">THE SHARED BRAIN</div>
                                <div className="text-sm text-white/70 leading-relaxed font-light">
                                    AI generation of 3D Porous Geometry & Microstructures
                                </div>
                            </div>
                        </div>

                        {/* Connector Arrows */}
                        <div className="flex justify-center w-full relative h-16">
                            <div className="absolute left-1/2 top-0 w-[50%] h-full border-t-2 border-l-2 border-white/20 rounded-tl-3xl -translate-x-full"></div>
                            <div className="absolute left-1/2 top-0 w-[50%] h-full border-t-2 border-r-2 border-white/20 rounded-tr-3xl"></div>
                            
                            <ArrowDownRight className="absolute left-[calc(25%-12px)] bottom-0 w-6 h-6 text-white/40 translate-y-1/2" />
                            <ArrowDownRight className="absolute right-[calc(25%-12px)] bottom-0 w-6 h-6 text-white/40 translate-y-1/2 -scale-x-100" />
                        </div>

                        {/* Branches */}
                        <div className="flex w-full gap-8">
                            
                            {/* LEFT BRANCH: Batteries */}
                            <div className="flex-1">
                                <div className="border-2 border-green-500/20 bg-green-500/[0.02] backdrop-blur-sm p-8 rounded-2xl h-full">
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-green-500/20">
                                        <Zap className="w-6 h-6 text-green-400" />
                                        <div className="text-xl font-bold text-white">Batteries (Silicon-Graphite)</div>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <div className="text-xs font-bold text-green-400/70 uppercase tracking-wider mb-2">Plug-in Physics</div>
                                            <div className="space-y-2">
                                                <div className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></div>
                                                    <div className="text-sm text-white/80 font-light"><strong className="text-white font-medium">Solid Mechanics</strong> (Swelling)</div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></div>
                                                    <div className="text-sm text-white/80 font-light"><strong className="text-white font-medium">Fick's Law</strong> (Lithium Diffusion)</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-white/5">
                                            <div className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Status</div>
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                                                Validated in 25-day lab sprint with 80% accuracy
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-4 text-xs text-white/40 font-medium uppercase tracking-widest">What we proved (Hard Mode)</div>
                            </div>

                            {/* RIGHT BRANCH: Chemical Flow Reactors */}
                            <div className="flex-1">
                                <div className="border-2 border-blue-500/30 bg-blue-500/[0.05] backdrop-blur-sm p-8 rounded-2xl h-full shadow-[0_0_20px_rgba(59,130,246,0.1)] relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-6 opacity-10">
                                        <Droplets className="w-24 h-24 text-blue-400" />
                                    </div>
                                    
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-500/20 relative z-10">
                                        <Droplets className="w-6 h-6 text-blue-400" />
                                        <div className="text-xl font-bold text-white">Chemical Flow Reactors</div>
                                    </div>
                                    
                                    <div className="space-y-6 relative z-10">
                                        <div>
                                            <div className="text-xs font-bold text-blue-400/70 uppercase tracking-wider mb-2">Plug-in Physics</div>
                                            <div className="space-y-2">
                                                <div className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                                                    <div className="text-sm text-white/80 font-light"><strong className="text-white font-medium">Navier-Stokes</strong> (Fluid Flow)</div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                                                    <div className="text-sm text-white/80 font-light"><strong className="text-white font-medium">Fourier's Law</strong> (Heat Transfer)</div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                                                    <div className="text-sm text-white/80 font-light"><strong className="text-white font-medium">Chemical Kinetics</strong></div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-white/5">
                                            <div className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Status</div>
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium">
                                                Ready for Pilot deployment
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-4 text-xs text-blue-400/60 font-medium uppercase tracking-widest">What we do for Aarti</div>
                            </div>
                            
                        </div>
                    </div>

                    {/* Bottom Core Concept Summary */}
                    <div className="max-w-3xl mx-auto text-center p-6 bg-white/[0.02] rounded-xl border border-white/10 mt-8">
                        <div className="text-white/80 font-light italic text-lg leading-relaxed">
                            "Whether it is lithium flowing through a battery anode, or benzene flowing through a chemical reactor, the math is the same."
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
