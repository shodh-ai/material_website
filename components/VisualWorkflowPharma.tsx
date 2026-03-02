"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Droplets, ThermometerSun, Wind } from "lucide-react";

export default function VisualWorkflowPharma() {
    return (
        <div className="w-full py-12 overflow-x-auto">
            <div className="min-w-[1200px] max-w-7xl mx-auto">
                
                {/* Main Workflow Container */}
                <div className="relative">
                    
                    {/* Top Flow: Input → Genesis → Validate → Deploy → Output */}
                    <div className="flex items-center justify-between gap-4 mb-16">
                        
                        {/* STEP 1: THE INTENT (Input) */}
                        <div className="flex-1">
                            <div className="border-2 border-white/20 bg-white/[0.05] backdrop-blur-sm p-6 rounded-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10 flex gap-2">
                                    <ThermometerSun className="w-8 h-8" />
                                    <Wind className="w-8 h-8" />
                                </div>
                                <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Step 1: Input</div>
                                <div className="text-lg font-bold text-white mb-4 relative z-10">THE PHYSICS INTENT</div>
                                <div className="text-xs text-white/70 space-y-3 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                                        <div className="font-semibold text-white/90">Thermodynamics (Heat)</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                        <div className="font-semibold text-white/90">Fluid Dynamics (Flow)</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                                        <div className="font-semibold text-white/90">Solid Mechanics (Compression)</div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/50 italic">
                                    Complex Multi-Physics Inputs
                                </div>
                            </div>
                            <div className="text-center mt-3 text-xs text-white/60 font-medium">The Lab Reality</div>
                        </div>

                        <ArrowRight className="w-8 h-8 text-white/40 flex-shrink-0" />

                        {/* STEP 2: SKANDA FOUNDATION MODEL */}
                        <div className="flex-[1.5]">
                            <div className="relative">
                                {/* Stacked effect */}
                                <div className="absolute inset-0 border-2 border-white/10 bg-white/[0.02] rounded-lg transform translate-x-2 translate-y-2"></div>
                                <div className="absolute inset-0 border-2 border-white/10 bg-white/[0.03] rounded-lg transform translate-x-1 translate-y-1"></div>
                                
                                <div className="relative border-2 border-[#48cae4]/50 bg-[#48cae4]/5 backdrop-blur-sm p-6 rounded-lg text-center">
                                    <div className="text-xs font-bold text-[#48cae4]/70 uppercase tracking-wider mb-3">Step 2: The Brain</div>
                                    <div className="text-xl font-bold text-white mb-2">SKANDA FOUNDATION MODEL</div>
                                    <div className="text-sm text-[#48cae4] mb-4">MESOSCALE AI PHYSICS ENGINE</div>
                                    
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="p-3 bg-white/5 rounded border border-white/10 text-left">
                                            <div className="text-xs font-bold text-white/70 mb-1">INVERSE DESIGN</div>
                                            <div className="text-[10px] text-white/40">Generates 10,000 formulations</div>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded border border-white/10 text-left">
                                            <div className="text-xs font-bold text-white/70 mb-1">PHYSICS SCREENING</div>
                                            <div className="text-[10px] text-white/40">Simulates scale-up failures</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-3 text-xs text-[#48cae4]/80 font-medium">Predicts Scale-Up Physics</div>
                        </div>

                        <ArrowRight className="w-8 h-8 text-white/40 flex-shrink-0" />

                        {/* STEP 3: THE REALITY (Output) */}
                        <div className="flex-1">
                            <div className="relative">
                                <div className="border-4 border-green-500/30 bg-green-500/5 backdrop-blur-sm p-6 rounded-lg">
                                    <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Step 3: Output</div>
                                    <div className="text-lg font-bold text-white mb-4">THE REALITY</div>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                                            <div>
                                                <div className="text-sm font-semibold text-white/90">Perfect Dissolution</div>
                                                <div className="text-xs text-white/50">Target release profile met</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                                            <div>
                                                <div className="text-sm font-semibold text-white/90">Shelf Stability</div>
                                                <div className="text-xs text-white/50">No degradation over time</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                                            <div>
                                                <div className="text-sm font-semibold text-white/90">99% Mfg Yield</div>
                                                <div className="text-xs text-white/50">At full commercial scale</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 pt-4 border-t border-white/10">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-white/50">Trial & Error:</span>
                                            <span className="font-bold text-white">3-5 Years</span>
                                        </div>
                                        <div className="flex items-center justify-center my-1">
                                            <ArrowRight className="w-4 h-4 text-white/30 rotate-90" />
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-green-400">Zero-Shot:</span>
                                            <span className="font-bold text-green-400">Months</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Stamp overlay */}
                                <div className="absolute -top-3 -right-3 w-16 h-16 border-2 border-green-500/50 rounded-full flex items-center justify-center bg-[#111] transform rotate-12">
                                    <CheckCircle className="w-8 h-8 text-green-400" />
                                </div>
                            </div>
                            <div className="text-center mt-3 text-xs text-green-400/80 font-medium">Zero-Shot Scale-Up</div>
                        </div>
                    </div>

                    {/* Bottom Industries Summary */}
                    <div className="mt-12 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center p-4 bg-white/[0.02] rounded-lg border border-white/10">
                            <div className="text-sm font-bold text-white mb-1">PHARMA</div>
                            <div className="text-xs text-white/50">Generics & Biosimilars</div>
                        </div>
                        <div className="text-center p-4 bg-white/[0.02] rounded-lg border border-white/10">
                            <div className="text-sm font-bold text-white mb-1">BATTERIES</div>
                            <div className="text-xs text-white/50">Cells & Slurry</div>
                        </div>
                        <div className="text-center p-4 bg-white/[0.02] rounded-lg border border-white/10">
                            <div className="text-sm font-bold text-white mb-1">ALLOYS & CHEMICALS</div>
                            <div className="text-xs text-white/50">Specialty Materials</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
