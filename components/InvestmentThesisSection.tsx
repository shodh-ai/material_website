"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Lightbulb, Zap, Users, Factory, Car, Beaker } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 }
  }
};

export default function InvestmentThesisSection() {
  return (
    <section className="min-h-screen py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#060914] via-[#07121f] to-[#060914] px-6 md:px-12 py-16 md:py-20 shadow-2xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-[#48cae4]/10 rounded-full backdrop-blur-md border border-[#48cae4]/30 mb-6">
            <Lightbulb className="w-4 h-4 text-[#48cae4]" />
            <span className="text-[#48cae4] text-xs font-bold tracking-[0.15em] uppercase">
              The Investment Thesis
            </span>
          </motion.div>

          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-medium uppercase tracking-tight text-white mb-6 leading-[1.1]"
          >
            THE WORLD'S FIRST
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48cae4] via-[#a855f7] to-[#f59e0b]">
              GENERATIVE AI FOR MATTER.
            </span>
          </motion.h2>

          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/65 font-light max-w-3xl mx-auto leading-relaxed"
          >
            We bridge the <strong className="text-white">"Missing Middle"</strong> between atomic discovery and factory-scale production.
          </motion.p>
        </motion.div>

        {/* Three Core Points */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
        >
          {/* What It Is */}
          <motion.div 
            variants={fadeInUp}
            className="p-7 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#48cae4]/30 transition-all pointer-events-auto"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#48cae4]/15 ring-1 ring-[#48cae4]/30 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-[#48cae4]" />
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-white">What it is</h3>
            </div>
            <p className="text-white/75 leading-relaxed">
              The world’s first <strong className="text-white">Generative AI for manufacturable matter</strong>.
            </p>
            <p className="text-white/55 leading-relaxed mt-2">
              It connects atomic discovery to factory-scale reality.
            </p>
          </motion.div>

          {/* Why It Works */}
          <motion.div 
            variants={fadeInUp}
            className="p-7 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#a855f7]/30 transition-all pointer-events-auto"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#a855f7]/15 ring-1 ring-[#a855f7]/30 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-[#a855f7]" />
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-white">Why it works</h3>
            </div>
            <p className="text-white/75 leading-relaxed">
              Our <strong className="text-white">Matter Compiler</strong> solves chemistry and the manufacturing process together.
            </p>
            <p className="text-white/55 leading-relaxed mt-2">
              It deletes the 5-year iteration loop.
            </p>
          </motion.div>

          {/* Who Is It For */}
          <motion.div 
            variants={fadeInUp}
            className="p-7 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#f59e0b]/30 transition-all pointer-events-auto"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#f59e0b]/15 ring-1 ring-[#f59e0b]/30 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-[#f59e0b]" />
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-white">Who it’s for</h3>
            </div>
            <p className="text-white/75 leading-relaxed mb-5">
              The three pillars of the <strong className="text-white">$1.2T energy transition</strong>.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#48cae4]/15 ring-1 ring-[#48cae4]/25 flex items-center justify-center flex-shrink-0">
                  <Beaker className="w-5 h-5 text-[#48cae4]" />
                </div>
                <p className="text-white/70">Material producers: validate new chemistries in weeks.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#a855f7]/15 ring-1 ring-[#a855f7]/25 flex items-center justify-center flex-shrink-0">
                  <Factory className="w-5 h-5 text-[#a855f7]" />
                </div>
                <p className="text-white/70">Gigafactories: guarantee yield and enable zero-shot manufacturing.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f59e0b]/15 ring-1 ring-[#f59e0b]/25 flex items-center justify-center flex-shrink-0">
                  <Car className="w-5 h-5 text-[#f59e0b]" />
                </div>
                <p className="text-white/70">Automotive OEMs: own sovereign, high-performance battery IP.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-7 rounded-2xl bg-white/5 border border-white/10 text-center pointer-events-auto"
        >
          <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
            We don't just predict materials. <br className="hidden md:block" />
            We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48cae4] to-[#a855f7]">compile them into reality</span>.
          </p>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
