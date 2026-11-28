"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { mountFluid } from "../engineering/fluid-scene";
import ApplicationForm from "./application-form";
import { careerRoles } from "../../lib/careers-application";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  Brain,
  Check,
  ChevronDown,
  Code2,
  Globe2,
  Moon,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";
const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const roleIcons = [Code2, Brain, Atom, Sparkles];
const openRoles = careerRoles.map((role, index) => ({ ...role, icon: roleIcons[index] }));

export default function CareersPage() {
  // Dark by default, like the rest of the site; a saved light choice is respected.
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const fluidRef = useRef<HTMLDivElement>(null);

  // The same live fluid background (and palettes) as the home, research and engineering pages.
  useEffect(() => (fluidRef.current ? mountFluid(fluidRef.current, theme) : undefined), [theme]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("shodh-theme");
      setTheme(saved === "light" ? "light" : "dark");
    } catch {}
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("shodh-theme", next);
    } catch {}
  };

  return (
    <div className="careers-page" data-theme={theme}>
      <div ref={fluidRef} className="careers-fluid-bg" aria-hidden="true" />

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
            {"We are a small, high-agency research lab building Physical AI from bare silicon up to foundation models. We use AI agents heavily as force multipliers—which means we don’t hire people who wait for Jira tickets or grind LeetCode. We hire entrepreneur-level builders who can command agents, catch subtle lies in code and physics, and own hard problems from zero to verified proof."}
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
            <p>{String(openRoles.length).padStart(2, "0")} OPEN ROLES · JAIPUR</p>
          </div>

          <div className="careers-role-list">
            {openRoles.map((role, index) => {
              const Icon = role.icon;
              const isExpanded = expandedRole === index;
              return (
                <motion.article key={role.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className={`careers-role ${isExpanded ? "is-expanded" : ""}`}>
                  <button className="careers-role-summary" onClick={() => setExpandedRole(isExpanded ? null : index)} aria-expanded={isExpanded} aria-controls={`role-detail-${role.id}`}>
                    <span className="careers-role-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="careers-role-icon"><Icon size={23} /></span>
                    <span className="careers-role-name">
                      <strong>{role.title}</strong>
                      <span>{role.skills}</span>
                    </span>
                    <span className="careers-role-arrow"><ChevronDown size={22} /></span>
                  </button>

                  {isExpanded && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="careers-role-detail" id={`role-detail-${role.id}`}>
                      <div className="careers-role-overview">
                        <p>{role.description}</p>

                      </div>
                      <div>
                        <span className="careers-detail-label">WHAT YOU&apos;LL BRING</span>
                        <ul>
                          {role.requirements.map((requirement) => <li key={requirement}><Check size={15} />{requirement}</li>)}
                        </ul>
                      </div>
                      <a href="#apply" onClick={() => setSelectedRole(role.id)} className="careers-primary-button">
                        APPLY WITH PROOF OF WORK <ArrowRight size={17} />
                      </a>
                    </motion.div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </section>

        <ApplicationForm selectedRole={selectedRole} onRoleChange={setSelectedRole} />
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
