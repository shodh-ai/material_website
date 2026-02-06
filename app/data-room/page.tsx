"use client";

import { useState, useEffect } from "react";
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

  // Restore access state from localStorage on mount
  useEffect(() => {
    const savedAccess = localStorage.getItem('dataRoomAccess');
    if (savedAccess) {
      const { accessGranted: granted, formData: savedFormData } = JSON.parse(savedAccess);
      if (granted) {
        setAccessGranted(true);
        setFormData(savedFormData);
        setStep('access');
      }
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitInvestorApplication(formData);

      if (result.success) {
        setAccessGranted(true);
        setStep("access");
        // Persist access state to localStorage
        localStorage.setItem('dataRoomAccess', JSON.stringify({
          accessGranted: true,
          formData
        }));
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
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <span className="text-sm font-light tracking-[0.2em] uppercase text-white/60">Shodh AI Data Room</span>
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
                  <Lock className="w-4 h-4 text-white/60" />
                  <span className="text-white/60 text-xs font-light tracking-[0.2em] uppercase">
                    Protected Access
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
                  Welcome to the <br />
                  <span className="text-white font-normal">
                    Investor Data Room
                  </span>
                </h1>
                <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed font-light">
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
                <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-light text-white/50 mb-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all font-light"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-light text-white/50 mb-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all font-light"
                      />
                    </div>


                    {/* Firm Field */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-light text-white/50 mb-2">
                        <Building2 className="w-4 h-4" />
                        Firm / Organization
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firm}
                        onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                        placeholder="Acme Ventures"
                        className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all font-light"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm font-light">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-8 px-6 py-4 rounded-lg bg-white text-black font-light hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      "Access Data Room"
                    )}
                    {!isSubmitting && <ArrowLeft className="w-5 h-5 rotate-180" />}
                  </button>

                  <p className="text-center text-white/30 text-sm mt-6 font-light">
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6"
                >
                  <CheckCircle2 className="w-4 h-4 text-white/60" />
                  <span className="text-white/60 text-xs font-light tracking-[0.2em] uppercase">
                    Access Granted
                  </span>
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
                  Welcome, <br />
                  <span className="text-white font-normal">
                    {formData.name.split(' ')[0]}
                  </span>
                </h1>
                <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed font-light">
                  You now have full access to our investor materials.
                </p>
              </div>

              {/* User Info Card */}
              <div className="max-w-4xl mx-auto mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <User className="w-5 h-5 text-white/60" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-light">Investor</p>
                      <p className="text-white font-light">{formData.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Building2 className="w-5 h-5 text-white/60" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-light">Organization</p>
                      <p className="text-white font-light">{formData.firm}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder's Letter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-5xl mx-auto mb-16"
              >
                <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-5xl font-light text-white mb-4 uppercase tracking-tight">
                      TO PERISH IN ARROGANT PRESUMPTIONS.
                    </h2>
                  </div>

                  {/* Founder Photo */}
                  <div className="flex justify-center mb-8">
                    <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                      <img 
                        src="/Arastu_Sharma_l.jpeg" 
                        alt="Arastu, CEO" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <User className="w-16 h-16 text-white/40" />
                    </div>
                  </div>

                  {/* Letter Content */}
                  <div className="prose prose-invert max-w-none">
                    <p className="text-white/80 text-lg leading-relaxed mb-6">
                      <strong className="text-white">To our Future Partners,</strong>
                    </p>

                    <p className="text-white/70 leading-relaxed mb-4">
                      There is a reason this industry is empty.
                    </p>

                    <p className="text-white/70 leading-relaxed mb-4">
                      We are building for a market that doesn't exist on a spreadsheet yet. Jensen Huang calls these "Zero-Billion Dollar Markets"—industries that are currently zero, but are inevitably destined to become the infrastructure of the future.
                    </p>

                    <p className="text-white/70 leading-relaxed mb-4">
                      Our competitors, Lila Science ($550M) and Radical AI ($55M), have raised massive war chests to solve the "Lab Problem." They are building brilliant tools for scientists to discover molecules.
                    </p>

                    <p className="text-white/70 leading-relaxed mb-4">
                      <strong className="text-white">But discovery is not delivery.</strong>
                    </p>

                    <p className="text-white/70 leading-relaxed mb-4">
                      We are playing a different game. We are not just building a tool for the Lab; we are building the <strong className="text-white">Foundation Model for the Physical World.</strong>
                    </p>

                    <p className="text-white/70 leading-relaxed mb-4">
                      This is not "Predictive Maintenance" or simple factory optimization. We are not just tweaking the temperature of a furnace.
                    </p>

                    <p className="text-white/70 leading-relaxed mb-4">
                      <strong className="text-white">Invention will not be luck, but by design.</strong>
                    </p>

                    <p className="text-white/70 leading-relaxed mb-4">
                      Our AI enables a new paradigm: <strong className="text-white">Inverse Design</strong>. It allows a human to imagine a material that shouldn't exist—a battery that is both cheaper and energy-dense—and then generates both the molecular recipe to invent it and the machine code to manufacture it.
                    </p>

                    <p className="text-white/70 leading-relaxed mb-4">
                      We are giving nations and industries the sovereign power to invent their own energy future, breaking the reliance on decades of slow academic trial-and-error.
                    </p>

                    <p className="text-white/70 leading-relaxed mb-4">
                      We have chosen the hardest path. We operate at the intersection of Mesoscale Physics, Generative AI, and Heavy Manufacturing. It is painful. It requires suffering. But as we say internally: <em className="text-white/90">To perish in arrogant presumptions is our motto.</em>
                    </p>

                    <p className="text-white/70 leading-relaxed mb-4">
                      We'd rather fail trying to build a Type 1 Civilization than succeed at building another SaaS app.
                    </p>

                    <p className="text-white/70 leading-relaxed mb-6">
                      If you believe that the next Trillion-Dollar company will be built in the physical world, not the digital one...
                    </p>

                    <p className="text-white text-lg font-medium mb-8">
                      Welcome to Shodh AI.
                    </p>

                    {/* Signature Placeholder */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <div className="mb-4">
                        <img 
                          src="/founder-signature.png" 
                          alt="Arastu Signature" 
                          className="h-16 w-auto"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <p className="text-white font-medium text-lg">Arastu</p>
                      <p className="text-white/50 text-sm">CEO, Shodh AI</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Founder Photo Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-5xl mx-auto mb-16"
              >
                <div className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex flex-col items-center">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-white/10 mb-6">
                      <img 
                        src="/Arastu_Sharma_l.jpeg" 
                        alt="Arastu Sharma - Founder & CEO, Shodh AI" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-light text-white mb-1">Arastu Sharma</h3>
                    <p className="text-white/50 text-sm font-light tracking-wide">Founder & CEO, Shodh AI</p>
                  </div>
                </div>
              </motion.div>

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
                      className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all overflow-hidden"
                    >
                      {/* Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-light tracking-[0.2em] uppercase px-2 py-1 rounded bg-white/5 text-white/50 border border-white/10">
                          {doc.category}
                        </span>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10">
                          <Icon className="w-5 h-5 text-white/60" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-light text-white mb-2">{doc.title}</h3>
                      <p className="text-white/40 text-sm mb-3 font-light">{doc.subtitle}</p>
                      <p className="text-white/60 text-sm leading-relaxed mb-4 font-light">{doc.description}</p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-white/30 mb-4 font-light">
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
                          className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-light hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Read
                        </Link>
                        <button
                          onClick={() => handleDownload(doc.id)}
                          className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/60 text-sm font-light hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Additional Resources */}
              <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                    <Shield className="w-6 h-6 text-white/60" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-light text-white mb-2">Need More Information?</h3>
                    <p className="text-white/60 leading-relaxed mb-4 font-light">
                      For additional materials, financial models, or to schedule a deep-dive session with our founding team,
                      please contact us directly.
                    </p>
                    <a
                      href="mailto:investors@shodh.ai"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-light hover:bg-white/90 transition-all"
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
