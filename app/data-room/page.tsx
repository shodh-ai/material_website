"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Lock,
  CheckCircle2,
  FileText,
  Download,
  ArrowLeft,
  Linkedin,
  Mail,
  Building2,
  User,
  Shield,
  Eye,
  Clock,
  TrendingUp,
  Zap,
  Layers,
  AlertCircle
} from "lucide-react";
import { submitInvestorApplication } from "./actions";

// Document metadata
const documents = [
  {
    id: "genesis-protocol",
    title: "The Genesis Protocol 2.0",
    subtitle: "Global Value Capture Strategy",
    description: "Deep dive into our 3-layer revenue model: Strategic Design Partnerships, SaaS Operating System, and Sovereign Royalties.",
    pages: "Strategic GTM",
    icon: TrendingUp,
    color: "#48cae4",
    category: "Business Model",
    readTime: "12 min read"
  },
  {
    id: "18-month-sprint",
    title: "The 18-Month Sprint",
    subtitle: "The Path to $500M Valuation",
    description: "Detailed execution roadmap across 3 phases: Physics Validator, Platform Scalability, and Industrial Integration.",
    pages: "Execution Plan",
    icon: Zap,
    color: "#a855f7",
    category: "Roadmap",
    readTime: "15 min read"
  },
  {
    id: "skanda-architecture",
    title: "The Skanda Protocol",
    subtitle: "Universal Matter Compiler Architecture",
    description: "Technical deep-dive into our 10M Synthetic Physics Brain, Fourier Neural Operators, and 100,000x acceleration.",
    pages: "Technical Whitepaper",
    icon: Layers,
    color: "#22c55e",
    category: "Technology",
    readTime: "25 min read"
  }
];

export default function DataRoomPage() {
  const [step, setStep] = useState<"form" | "access">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    firm: ""
  });
  const [accessGranted, setAccessGranted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitInvestorApplication(formData);

      if (result.success) {
        setAccessGranted(true);
        setStep("access");
      } else {
        setError("Failed to save your application. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = (docId: string) => {
    // In production, this would trigger actual document download
    console.log(`Downloading document: ${docId}`);
  };

  return (
    <div className="min-h-screen bg-[#081421] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#48cae4] rounded-full animate-pulse" />
            <span className="text-sm font-bold tracking-wider uppercase">Shodh AI Data Room</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {/* STEP 1: INVESTOR ONBOARDING FORM */}
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#48cae4]/10 rounded-full border border-[#48cae4]/30 mb-6">
                  <Lock className="w-4 h-4 text-[#48cae4]" />
                  <span className="text-[#48cae4] text-xs font-bold tracking-wider uppercase">
                    Protected Access
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-medium mb-6">
                  Welcome to the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48cae4] to-[#a855f7]">
                    Investor Data Room
                  </span>
                </h1>
                <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                  Access our complete investor materials including technical whitepapers,
                  financial projections, and strategic roadmaps.
                </p>
              </div>

              <motion.form
                onSubmit={handleFormSubmit}
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm">
                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#48cae4]/50 focus:bg-white/10 transition-all"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#48cae4]/50 focus:bg-white/10 transition-all"
                      />
                    </div>


                    {/* Firm Field */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                        <Building2 className="w-4 h-4" />
                        Firm / Organization
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firm}
                        onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                        placeholder="Acme Ventures"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#48cae4]/50 focus:bg-white/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-500 text-sm">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-8 px-6 py-4 rounded-xl bg-gradient-to-r from-[#48cae4] to-[#a855f7] text-white font-medium hover:shadow-lg hover:shadow-[#48cae4]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Access Data Room"
                    )}
                    {!isSubmitting && <ArrowLeft className="w-5 h-5 rotate-180" />}
                  </button>

                  <p className="text-center text-white/40 text-sm mt-6">
                    Your information is encrypted and stored securely
                  </p>
                </div>
              </motion.form>
            </motion.div>
          )}


          {/* STEP 3: DATA ROOM ACCESS */}
          {step === "access" && accessGranted && (
            <motion.div
              key="access"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#22c55e]/10 rounded-full border border-[#22c55e]/30 mb-6"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                  <span className="text-[#22c55e] text-xs font-bold tracking-wider uppercase">
                    Access Granted
                  </span>
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-medium mb-6">
                  Welcome, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48cae4] to-[#a855f7]">
                    {formData.name.split(' ')[0]}
                  </span>
                </h1>
                <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                  You now have full access to our investor materials. All documents are confidential and protected under NDA.
                </p>
              </div>

              {/* User Info Card */}
              <div className="max-w-4xl mx-auto mb-12 p-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#48cae4]/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-[#48cae4]" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">Investor</p>
                      <p className="text-white font-medium">{formData.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#a855f7]/20 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#a855f7]" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">Organization</p>
                      <p className="text-white font-medium">{formData.firm}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {documents.map((doc, index) => {
                  const Icon = doc.icon;
                  return (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all overflow-hidden"
                    >
                      {/* Background Glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at center, ${doc.color}10, transparent 70%)`
                        }}
                      />

                      {/* Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="text-xs font-bold tracking-wider uppercase px-2 py-1 rounded"
                          style={{
                            backgroundColor: `${doc.color}20`,
                            color: doc.color
                          }}
                        >
                          {doc.category}
                        </span>
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${doc.color}20` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: doc.color }} />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-medium text-white mb-2">{doc.title}</h3>
                      <p className="text-white/50 text-sm mb-3">{doc.subtitle}</p>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">{doc.description}</p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {doc.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {doc.pages}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link
                          href={`/data-room/${doc.id}`}
                          className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Read
                        </Link>
                        <button
                          onClick={() => handleDownload(doc.id)}
                          className="px-4 py-2 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2"
                          style={{
                            borderColor: `${doc.color}40`,
                            backgroundColor: `${doc.color}10`,
                            color: doc.color
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Additional Resources */}
              <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-[#48cae4]/10 via-[#a855f7]/10 to-[#f59e0b]/10 border border-[#48cae4]/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#48cae4]/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-[#48cae4]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-white mb-2">Need More Information?</h3>
                    <p className="text-white/70 leading-relaxed mb-4">
                      For additional materials, financial models, or to schedule a deep-dive session with our founding team,
                      please contact us directly.
                    </p>
                    <a
                      href="mailto:investors@shodh.ai"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#48cae4] to-[#a855f7] text-white font-medium hover:shadow-lg hover:shadow-[#48cae4]/30 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      Contact Investor Relations
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
