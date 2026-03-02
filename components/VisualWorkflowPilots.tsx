"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

export default function VisualWorkflowPilots() {
    return (
        <div className="w-full py-12 overflow-x-auto">
            <div className="min-w-[1200px] max-w-7xl mx-auto">
                
                {/* Main Workflow Container */}
                <div className="relative">
                    
                    {/* Top Flow: Input → Genesis → Validate → Deploy → Output */}
                    <div className="flex items-center justify-between gap-4 mb-16">
                        
                        {/* STEP 1: THE INTENT (Input) */}
                        <div className="flex-1">
                            <div className="border-2 border-white/20 bg-white/[0.05] backdrop-blur-sm p-6 rounded-lg">
                                <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Step 1: Input</div>
                                <div className="text-lg font-bold text-white mb-4">THE INTENT</div>
                                <div className="text-xs text-white/70 space-y-2">
                                    <div className="font-semibold text-white">TARGET: NEXT-GEN EV CELL</div>
                                    <div className="space-y-1">
                                        <div className="font-medium text-white/80">Performance:</div>
                                        <div>• Energy Density: &gt; 800 Wh/L</div>
                                        <div>• Fast Charge: 4C (0-80% in 15 mins)</div>
                                        <div>• Cycle Life: &gt; 1000 Cycles @ 45°C</div>
                                    </div>
                                    <div className="space-y-1 mt-2">
                                        <div className="font-medium text-white/80">Constraints:</div>
                                        <div>• Vol. Expansion: &lt; 7%</div>
                                        <div>• Temp Range: -30°C to +60°C</div>
                                        <div>• Cathode: Cobalt-Free</div>
                                        <div>• Anode: Silicon-Dominant</div>
                                    </div>
                                </div>
                                <div className="mt-4 text-xs text-white/50 italic">Multi-Objective Constraints</div>
                            </div>
                            <div className="text-center mt-3 text-xs text-white/60 font-medium">The Customer's Problem</div>
                        </div>

                        <ArrowRight className="w-8 h-8 text-white/40 flex-shrink-0" />

                        {/* STEP 2: SKANDAX GENESIS */}
                        <div className="flex-1">
                            <div className="relative">
                                {/* Stacked effect */}
                                <div className="absolute inset-0 border-2 border-white/10 bg-white/[0.02] rounded-lg transform translate-x-2 translate-y-2"></div>
                                <div className="absolute inset-0 border-2 border-white/10 bg-white/[0.03] rounded-lg transform translate-x-1 translate-y-1"></div>
                                <div className="relative border-2 border-white/20 bg-white/[0.08] backdrop-blur-sm p-6 rounded-lg">
                                    <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Step 2</div>
                                    <div className="text-lg font-bold text-white mb-2">SKANDAX GENESIS</div>
                                    <div className="text-sm text-white/70 mb-2">INVERSE DESIGN</div>
                                    <div className="text-xs text-white/60">Generates 10,000 candidate microstructures</div>
                                </div>
                            </div>
                            <div className="text-center mt-3 text-xs text-white/60 font-medium">Generates the Material</div>
                        </div>

                        <ArrowRight className="w-8 h-8 text-white/40 flex-shrink-0" />

                        {/* STEP 3: SKANDAX VALIDATE */}
                        <div className="flex-1">
                            <div className="border-2 border-dashed border-white/20 bg-white/[0.05] backdrop-blur-sm p-6 rounded-full aspect-square flex flex-col items-center justify-center">
                                <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Step 3</div>
                                <div className="text-lg font-bold text-white mb-2 text-center">SKANDAX VALIDATE</div>
                                <div className="text-sm text-white/70 mb-2">PHYSICS SCREENING</div>
                                <div className="text-xs text-white/60 text-center">Simulates 10,000 designs, kills 9,995 failures</div>
                            </div>
                            <div className="text-center mt-3 text-xs text-white/60 font-medium">Kills the Failures (Virtual Cycler)</div>
                        </div>

                        <ArrowRight className="w-8 h-8 text-white/40 flex-shrink-0" />

                        {/* STEP 4: SKANDAX DEPLOY */}
                        <div className="flex-1">
                            <div className="border-2 border-white/20 bg-white/[0.05] backdrop-blur-sm p-6 rounded-lg">
                                <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Step 4</div>
                                <div className="text-lg font-bold text-white mb-2">SKANDAX DEPLOY</div>
                                <div className="text-sm text-white/70 mb-2">PROCESS COMPILATION</div>
                                <div className="text-xs text-white/60 space-y-1">
                                    <div>Converts microstructure to factory settings:</div>
                                    <div>• Temp: 120°C</div>
                                    <div>• Press: 50MPa</div>
                                    <div>• Speed: 2m/s</div>
                                </div>
                            </div>
                            <div className="text-center mt-3 text-xs text-white/60 font-medium">Translates to Factory Code</div>
                        </div>

                        <ArrowRight className="w-8 h-8 text-white/40 flex-shrink-0" />

                        {/* STEP 5: THE REALITY (Output) */}
                        <div className="flex-1">
                            <div className="relative">
                                <div className="border-4 border-white/20 bg-white/[0.08] backdrop-blur-sm p-6 rounded-lg">
                                    <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Step 5: Output</div>
                                    <div className="text-lg font-bold text-white mb-2">THE REALITY</div>
                                    <div className="text-sm text-white/70 mb-2">ZERO-SHOT MANUFACTURING</div>
                                    <div className="text-xs text-white/60">Battery produced successfully on first try</div>
                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-white/50">Traditional:</span>
                                            <span className="font-bold text-white">5 Years</span>
                                        </div>
                                        <div className="flex items-center justify-center my-1">
                                            <ArrowRight className="w-4 h-4 text-white/40 rotate-90" />
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-[#48cae4]">Shodh AI:</span>
                                            <span className="font-bold text-[#48cae4]">6 Months</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Stamp overlay */}
                                <div className="absolute -top-2 -right-2 w-20 h-20 border-2 border-white/20 rounded-full flex items-center justify-center bg-[#111] transform rotate-12">
                                    <CheckCircle className="w-10 h-10 text-white/60" />
                                </div>
                            </div>
                            <div className="text-center mt-3 text-xs text-white/60 font-medium">5 Years → 6 Months</div>
                        </div>
                    </div>

                    {/* Feedback Loop Arrow */}
                    <div className="relative h-20">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 80" preserveAspectRatio="none">
                            <defs>
                                <marker id="arrowhead-feedback" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                                    <polygon points="0 0, 10 5, 0 10" fill="rgba(255,255,255,0.4)" />
                                </marker>
                            </defs>
                            <path
                                d="M 1050 10 L 1050 40 L 150 40 L 150 10"
                                stroke="rgba(255,255,255,0.4)"
                                strokeWidth="2"
                                strokeDasharray="8 4"
                                fill="none"
                                markerEnd="url(#arrowhead-feedback)"
                            />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/[0.08] px-4 py-1 rounded border border-white/10">
                            <div className="text-xs font-medium text-white/60 uppercase tracking-wider">Sim-to-Real Reinforcement Data</div>
                        </div>
                    </div>

                    {/* Bottom Summary */}
                    <div className="mt-12 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center p-6 bg-white/[0.03] rounded-lg border border-white/10">
                            <div className="text-sm font-bold text-white mb-2">GENESIS</div>
                            <div className="text-xs text-white/60">imagines the chemistry</div>
                        </div>
                        <div className="text-center p-6 bg-white/[0.03] rounded-lg border border-white/10">
                            <div className="text-sm font-bold text-white mb-2">VALIDATE</div>
                            <div className="text-xs text-white/60">proves the physics</div>
                        </div>
                        <div className="text-center p-6 bg-white/[0.03] rounded-lg border border-white/10">
                            <div className="text-sm font-bold text-white mb-2">DEPLOY</div>
                            <div className="text-xs text-white/60">instructs the factory</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
