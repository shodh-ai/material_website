"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowLeft,
  Rocket,
  Zap,
  Brain,
  Globe,
  Atom,
  Factory,
  Code2,
  FlaskConical,
  Send,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";
import { submitCareerApplication } from "./actions";
import Footer from "@/components/Footer";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const openRoles = [
  {
    title: "ML Research Engineer — Physics Foundation Models",
    team: "Core AI",
    location: "Bangalore, India",
    type: "Full-time",
    description:
      "Build and train our Meso-Foundation Model. Work on 3D Diffusion Transformers, Fourier Neural Operators, and physics-informed architectures. You'll be training models on 10M+ synthetic physics simulations.",
    requirements: [
      "Strong background in ML/DL (PyTorch)",
      "Experience with transformers, diffusion models, or neural operators",
      "Physics or materials science intuition is a plus",
      "Published research preferred",
    ],
    icon: Brain,
    color: "#48cae4",
  },
  {
    title: "Computational Materials Scientist",
    team: "Physics Engine",
    location: "Bangalore, India",
    type: "Full-time",
    description:
      "Design and run Monte Carlo simulations, build physics kernels (Fick's Law, Butler-Volmer), and generate the synthetic training data that powers our AI. Bridge the gap between first-principles physics and machine learning.",
    requirements: [
      "PhD or MS in Materials Science, Physics, or Chemical Engineering",
      "Experience with DFT, MD, or continuum simulations",
      "Proficiency in Python and scientific computing",
      "Understanding of battery electrochemistry is a strong plus",
    ],
    icon: Atom,
    color: "#a855f7",
  },
  {
    title: "Full-Stack Engineer",
    team: "Product",
    location: "Bangalore, India",
    type: "Full-time",
    description:
      "Build the interfaces for our Matter Compiler — the tools that factories and R&D teams use daily. Work on real-time 3D visualization, simulation dashboards, and the SkandaX platform.",
    requirements: [
      "Strong TypeScript/React/Next.js skills",
      "Experience with 3D visualization (Three.js, WebGL) is a plus",
      "Backend experience (Node.js, Python, PostgreSQL)",
      "Passion for building beautiful, functional products",
    ],
    icon: Code2,
    color: "#22c55e",
  },
  {
    title: "Forward Deployed Engineer (FDE)",
    team: "Deployment",
    location: "Munich / Tokyo / Bangalore",
    type: "Full-time",
    description:
      "Deploy SkandaX directly into partner R&D centers and Gigafactories. Work on-site with Tier-1 OEMs (Tata, BMW, Panasonic) to design next-gen battery recipes using our AI platform.",
    requirements: [
      "2+ years in a technical customer-facing role",
      "Strong engineering fundamentals (ML, materials, or manufacturing)",
      "Willingness to travel and work on-site with partners",
      "Excellent communication skills",
    ],
    icon: Factory,
    color: "#f59e0b",
  },
  {
    title: "Research Intern — AI for Science",
    team: "Core AI",
    location: "Bangalore, India",
    type: "Internship (6 months)",
    description:
      "Join our research team and work on cutting-edge problems at the intersection of AI and physics. Contribute to publications, build novel architectures, and help train the world's first Physics Foundation Model.",
    requirements: [
      "Currently pursuing MS/PhD in ML, Physics, or related field",
      "Strong coding skills (Python, PyTorch)",
      "Curiosity about scientific AI applications",
      "Self-driven and eager to publish",
    ],
    icon: FlaskConical,
    color: "#ec4899",
  },
];

export default function CareersPage() {
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    linkedin: "",
    message: "",
  });

  const handleApply = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setFormData((prev) => ({ ...prev, role: roleTitle }));
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const result = await submitCareerApplication(formData);
      if (result.success) {
        setSubmitted(true);
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#081421] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#48cae4] rounded-full animate-pulse" />
            <span className="text-xs text-white/50 tracking-widest uppercase">We're Hiring</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#48cae4]/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-[#48cae4]/10 rounded-full border border-[#48cae4]/30 mb-8">
              <Rocket className="w-4 h-4 text-[#48cae4]" />
              <span className="text-[#48cae4] text-xs font-bold tracking-widest uppercase">
                Join Shodh AI
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              BUILD THE FUTURE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48cae4] via-[#a855f7] to-[#48cae4]">
                OF MATTER.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed mb-10"
            >
              We're building the world's first Physics Foundation Model — the "GPT for Materials."
              Join us in solving the hardest problems at the intersection of AI and science.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-white/50">
                <MapPin className="w-4 h-4" />
                Bangalore · Munich · Tokyo
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <Sparkles className="w-4 h-4" />
                IndiaAI Mission Partner
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <Globe className="w-4 h-4" />
                Backed by NVIDIA & Google
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Shodh */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          >
            <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-white/[0.03] border border-white/10">
              <Zap className="w-8 h-8 text-[#48cae4] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Frontier Research</h3>
              <p className="text-white/60 leading-relaxed">
                Work on problems no one else is solving. Train foundation models on 10M+ physics simulations. Publish at top venues.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-white/[0.03] border border-white/10">
              <Globe className="w-8 h-8 text-[#a855f7] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Global Impact</h3>
              <p className="text-white/60 leading-relaxed">
                Your work directly impacts how batteries, alloys, and materials are designed and manufactured worldwide. Real factories, real products.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-white/[0.03] border border-white/10">
              <Rocket className="w-8 h-8 text-[#f59e0b] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Sovereign Mission</h3>
              <p className="text-white/60 leading-relaxed">
                Selected by IndiaAI Mission. Government-backed compute. NVIDIA & Google partnerships. You're building India's AI for Science stack.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-white/50 text-lg">
              {openRoles.length} roles across AI, Science, Engineering, and Deployment
            </p>
          </motion.div>

          <div className="space-y-4">
            {openRoles.map((role, index) => {
              const Icon = role.icon;
              const isExpanded = expandedRole === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedRole(isExpanded ? null : index)}
                    className="w-full p-6 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${role.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: role.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-1">{role.title}</h3>
                      <div className="flex flex-wrap gap-3 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {role.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {role.type}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase"
                          style={{
                            backgroundColor: `${role.color}15`,
                            color: role.color,
                          }}
                        >
                          {role.team}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-white/30 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                    />
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="px-6 pb-6 border-t border-white/5"
                    >
                      <div className="pt-4">
                        <p className="text-white/70 leading-relaxed mb-6">{role.description}</p>
                        <h4 className="text-sm font-bold text-white/50 tracking-wider uppercase mb-3">
                          Requirements
                        </h4>
                        <ul className="space-y-2 mb-6">
                          {role.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                              <CheckCircle2
                                className="w-4 h-4 shrink-0 mt-0.5"
                                style={{ color: role.color }}
                              />
                              {req}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => handleApply(role.title)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-gray-900 text-sm font-bold hover:bg-gray-100 transition-colors"
                        >
                          Apply for this role
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      {showForm && (
        <section id="application-form" className="py-20 px-6">
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <CheckCircle2 className="w-16 h-16 text-[#22c55e] mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Application Submitted!</h2>
                <p className="text-white/60 text-lg mb-8">
                  Thank you for your interest in Shodh AI. We'll review your application and get back to you soon.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  Back to Home
                </Link>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold mb-2">Apply Now</h2>
                <p className="text-white/50 mb-8">
                  Applying for: <span className="text-[#48cae4] font-medium">{selectedRole}</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-white/50 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#48cae4]/50 focus:ring-1 focus:ring-[#48cae4]/50 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/50 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#48cae4]/50 focus:ring-1 focus:ring-[#48cae4]/50 transition-colors"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-white/50 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#48cae4]/50 focus:ring-1 focus:ring-[#48cae4]/50 transition-colors"
                        placeholder="+91 ..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/50 mb-2">LinkedIn Profile</label>
                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#48cae4]/50 focus:ring-1 focus:ring-[#48cae4]/50 transition-colors"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/50 mb-2">Years of Experience</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#48cae4]/50 focus:ring-1 focus:ring-[#48cae4]/50 transition-colors"
                    >
                      <option value="" className="bg-[#081421]">Select experience</option>
                      <option value="0-1" className="bg-[#081421]">0-1 years (Student/Fresh grad)</option>
                      <option value="1-3" className="bg-[#081421]">1-3 years</option>
                      <option value="3-5" className="bg-[#081421]">3-5 years</option>
                      <option value="5-10" className="bg-[#081421]">5-10 years</option>
                      <option value="10+" className="bg-[#081421]">10+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-white/50 mb-2">
                      Why do you want to join Shodh AI? *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#48cae4]/50 focus:ring-1 focus:ring-[#48cae4]/50 transition-colors resize-none"
                      placeholder="Tell us about yourself, your motivation, and what excites you about AI for Science..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-white text-gray-900 font-bold text-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-900 rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Application
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* General Application CTA */}
      {!showForm && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10"
            >
              <Sparkles className="w-10 h-10 text-[#48cae4] mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Don't see your role?</h2>
              <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
                We're always looking for exceptional people. Send us a general application and tell us how you'd contribute to the mission.
              </p>
              <button
                onClick={() => handleApply("General Application")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-gray-900 text-lg font-bold hover:bg-gray-100 transition-colors"
              >
                <Send className="w-5 h-5" />
                Send General Application
              </button>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
