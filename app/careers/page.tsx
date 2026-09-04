"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  Brain,
  Check,
  ChevronDown,
  Code2,
  Factory,
  FlaskConical,
  Globe2,
  Moon,
  Send,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";
import { submitCareerApplication } from "./actions";

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const openRoles = [
  {
    title: "AI Engineer Intern",
    team: "Core AI",
    location: "Jaipur, India",
    type: "Internship",
    description:
      "Build and ship applied AI systems across model development, evaluation, data pipelines, and product integrations. You will work closely with the engineering team on real problems with measurable outcomes.",
    conversion:
      "Full-time conversion is evaluated solely on demonstrated performance during the internship.",
    requirements: [
      "Strong Python fundamentals and hands-on experience with modern ML frameworks",
      "Experience building with LLMs, agents, retrieval, or model evaluation",
      "Ability to move from an open-ended problem to a tested working system",
      "High ownership, clear communication, and strong learning velocity",
    ],
    icon: Brain,
  },
  {
    title: "ML Research Engineer — Physics Foundation Models",
    team: "Core AI",
    location: "Bangalore, India",
    type: "Full-time",
    description:
      "Build and train our Meso-Foundation Model. Work on 3D Diffusion Transformers, Fourier Neural Operators, and physics-informed architectures across 10M+ synthetic physics simulations.",
    requirements: [
      "Strong background in ML/DL and PyTorch",
      "Experience with transformers, diffusion models, or neural operators",
      "Physics or materials science intuition is a plus",
      "Published research preferred",
    ],
    icon: Brain,
  },
  {
    title: "Computational Materials Scientist",
    team: "Physics Engine",
    location: "Bangalore, India",
    type: "Full-time",
    description:
      "Design and run Monte Carlo simulations, build physics kernels, and generate the synthetic training data that powers our AI. Bridge first-principles physics and machine learning.",
    requirements: [
      "PhD or MS in Materials Science, Physics, or Chemical Engineering",
      "Experience with DFT, MD, or continuum simulations",
      "Proficiency in Python and scientific computing",
      "Battery electrochemistry knowledge is a strong plus",
    ],
    icon: Atom,
  },
  {
    title: "Full-Stack Engineer",
    team: "Product",
    location: "Bangalore, India",
    type: "Full-time",
    description:
      "Build the interfaces for our Matter Compiler: the tools factories and R&D teams use daily. Work on real-time 3D visualization, simulation dashboards, and SkandaX.",
    requirements: [
      "Strong TypeScript, React, and Next.js skills",
      "3D visualization experience is a plus",
      "Backend experience with Node.js, Python, or PostgreSQL",
      "Passion for precise, functional products",
    ],
    icon: Code2,
  },
  {
    title: "Forward Deployed Engineer (FDE)",
    team: "Deployment",
    location: "Munich / Tokyo / Bangalore",
    type: "Full-time",
    description:
      "Deploy SkandaX directly into partner R&D centers and gigafactories. Work on-site with industrial teams to design next-generation material and process recipes.",
    requirements: [
      "2+ years in a technical customer-facing role",
      "Strong engineering fundamentals in ML, materials, or manufacturing",
      "Willingness to travel and work on-site with partners",
      "Excellent communication skills",
    ],
    icon: Factory,
  },
  {
    title: "Research Intern — AI for Science",
    team: "Core AI",
    location: "Bangalore, India",
    type: "Internship · 6 months",
    description:
      "Work on frontier problems at the intersection of AI and physics. Contribute to publications, build novel architectures, and help train a Physics Foundation Model.",
    requirements: [
      "Currently pursuing an MS/PhD in ML, Physics, or a related field",
      "Strong Python and PyTorch skills",
      "Curiosity about scientific AI applications",
      "Self-driven and eager to publish",
    ],
    icon: FlaskConical,
  },
];

export default function CareersPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    linkedin: "",
    message: "",
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("shodh-theme");
      setTheme(saved === "dark" ? "dark" : "light");
    } catch {}
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("shodh-theme", next);
    } catch {}
  };

  const handleApply = (roleTitle: string) => {
    if (roleTitle === "AI Engineer Intern") {
      window.location.href = "/ai-engineer-intern";
      return;
    }
    setSelectedRole(roleTitle);
    setFormData((current) => ({ ...current, role: roleTitle }));
    setShowForm(true);
    setTimeout(() => document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmissionError("");
    try {
      const result = await submitCareerApplication(formData);
      if (result.success) setSubmitted(true);
      else setSubmissionError(result.error ?? "Failed to submit application. Please try again.");
    } catch {
      setSubmissionError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="careers-page" data-theme={theme}>
      <div className="careers-fluid-bg" aria-hidden="true" />

      <header className="careers-header">
        <Link href="/" className="careers-logo" aria-label="Shodh AI home">
          <Image src="/shodh-new/White%20Shodh%20AI%20Brandmark.svg" alt="Shodh AI" width={52} height={52} priority />
        </Link>
        <div className="careers-header-actions">
          <button className="careers-theme-toggle" onClick={toggleTheme} aria-label={`Use ${theme === "light" ? "dark" : "light"} mode`}>
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <a href="#open-positions" className="careers-pill-link">OPEN POSITIONS</a>
        </div>
      </header>

      <main>
        <section className="careers-hero">
          <motion.p initial="hidden" animate="visible" variants={reveal} className="careers-hero-intro">
            Join the team building intelligence that invents new molecules, materials, processes, and machines — then shows how to make them real.
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={stagger} className="careers-hero-title-wrap">
            <motion.p variants={reveal} className="careers-eyebrow">WE&apos;RE HIRING · INDIAAI MISSION</motion.p>
            <motion.h1 variants={reveal} className="careers-hero-title">
              BUILD THE FUTURE<br />OF PHYSICAL<br />INVENTION
            </motion.h1>
          </motion.div>

          <a className="careers-scroll-cue" href="#why-shodh" aria-label="Explore careers">
            <span>EXPLORE</span>
            <ChevronDown size={18} />
          </a>
        </section>

        <section id="why-shodh" className="careers-statement">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.p variants={reveal} className="careers-eyebrow">WHY SHODH</motion.p>
            <motion.h2 variants={reveal}>SCIENCE BECOMES<br />REAL HERE.</motion.h2>
            <motion.p variants={reveal} className="careers-statement-copy">
              Work across chemistry, physics, AI, and manufacturing. Build systems that leave the screen and enter labs, pilot plants, and factories.
            </motion.p>
          </motion.div>

          <div className="careers-principles">
            {[
              { n: "01", icon: Zap, title: "Frontier research", copy: "Train foundation models on millions of physics simulations and publish work that advances AI for science." },
              { n: "02", icon: Globe2, title: "Physical impact", copy: "Your work shapes how materials and industrial processes are designed, validated, and manufactured." },
              { n: "03", icon: Sparkles, title: "Global mission", copy: "Build in India for the world with IndiaAI compute and an international network of research and industry partners." },
            ].map((item) => (
              <motion.article key={item.n} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="careers-principle">
                <div className="careers-principle-top"><span>{item.n}</span><item.icon size={21} /></div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="open-positions" className="careers-roles-section">
          <div className="careers-section-heading">
            <div>
              <p className="careers-eyebrow">WORK WITH US</p>
              <h2>OPEN POSITIONS</h2>
            </div>
            <p>{String(openRoles.length).padStart(2, "0")} ROLES · BANGALORE AND GLOBAL</p>
          </div>

          <div className="careers-role-list">
            {openRoles.map((role, index) => {
              const Icon = role.icon;
              const isExpanded = expandedRole === index;
              return (
                <motion.article key={role.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className={`careers-role ${isExpanded ? "is-expanded" : ""}`}>
                  <button className="careers-role-summary" onClick={() => setExpandedRole(isExpanded ? null : index)} aria-expanded={isExpanded}>
                    <span className="careers-role-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="careers-role-icon"><Icon size={23} /></span>
                    <span className="careers-role-name">
                      <strong>{role.title}</strong>
                      <span>{role.team} · {role.location} · {role.type}</span>
                    </span>
                    <span className="careers-role-arrow"><ChevronDown size={22} /></span>
                  </button>

                  {isExpanded && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="careers-role-detail">
                      <div className="careers-role-overview">
                        <p>{role.description}</p>
                        {"conversion" in role && role.conversion && (
                          <div className="careers-conversion-note">
                            <span>PERFORMANCE-BASED FULL-TIME PATH</span>
                            <strong>{role.conversion}</strong>
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="careers-detail-label">WHAT YOU&apos;LL BRING</span>
                        <ul>
                          {role.requirements.map((requirement) => <li key={requirement}><Check size={15} />{requirement}</li>)}
                        </ul>
                      </div>
                      <button onClick={() => handleApply(role.title)} className="careers-primary-button">
                        APPLY FOR THIS ROLE <ArrowRight size={17} />
                      </button>
                    </motion.div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="careers-open-call">
          <p className="careers-eyebrow">OPEN CALL</p>
          <h2>DON&apos;T SEE<br />YOUR ROLE?</h2>
          <div>
            <p>Exceptional people rarely fit a template. Tell us what you can build and why this mission matters to you.</p>
            <button onClick={() => handleApply("General Application")} className="careers-primary-button">
              SEND A GENERAL APPLICATION <ArrowRight size={17} />
            </button>
          </div>
        </section>

        {showForm && (
          <section id="application-form" className="careers-application">
            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="careers-success">
                <span><Check size={36} /></span>
                <p className="careers-eyebrow">APPLICATION RECEIVED</p>
                <h2>THANK YOU.</h2>
                <p>We&apos;ll review your application and get back to you soon.</p>
                <Link href="/" className="careers-primary-button">BACK TO HOME <ArrowRight size={17} /></Link>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
                <div className="careers-form-heading">
                  <div><p className="careers-eyebrow">JOIN SHODH AI</p><h2>APPLY NOW</h2></div>
                  <p>Applying for<br /><strong>{selectedRole}</strong></p>
                </div>
                <form onSubmit={handleSubmit} className="careers-form">
                  <label><span>FULL NAME *</span><input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" /></label>
                  <label><span>EMAIL *</span><input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@email.com" /></label>
                  <label><span>PHONE</span><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 ..." /></label>
                  <label><span>LINKEDIN</span><input type="url" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} placeholder="linkedin.com/in/..." /></label>
                  <label className="careers-form-wide"><span>EXPERIENCE</span><select value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })}><option value="">Select experience</option><option value="0-1">0–1 years · Student / fresh graduate</option><option value="1-3">1–3 years</option><option value="3-5">3–5 years</option><option value="5-10">5–10 years</option><option value="10+">10+ years</option></select></label>
                  <label className="careers-form-wide"><span>WHY DO YOU WANT TO JOIN SHODH AI? *</span><textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about yourself, what you can build, and what excites you about AI for science." /></label>
                  {submissionError && <p className="careers-form-error" role="alert">{submissionError}</p>}
                  <button type="submit" disabled={submitting} className="careers-primary-button careers-submit">
                    {submitting ? "SUBMITTING..." : <>SUBMIT APPLICATION <Send size={17} /></>}
                  </button>
                </form>
              </motion.div>
            )}
          </section>
        )}
      </main>

      <footer className="careers-footer">
        <div>
          <p>MANUFACTURING INTELLIGENCE,<br />GROUNDED IN PHYSICS.</p>
          <h2>SHODH AI</h2>
        </div>
        <nav>
          <Link href="/research">RESEARCH</Link>
          <Link href="/materials-discovery">MATERIALS DISCOVERY</Link>
          <Link href="/project-skanda">PROJECT SKANDA</Link>
          <Link href="/careers">CAREERS</Link>
          <a href="https://www.linkedin.com/company/shodh-ai/" target="_blank" rel="noreferrer">LINKEDIN</a>
          <span>2026 SHODH AI. ALL RIGHTS RESERVED</span>
        </nav>
      </footer>

      <Link href="/" className="careers-back"><ArrowLeft size={15} /> HOME</Link>
    </div>
  );
}
