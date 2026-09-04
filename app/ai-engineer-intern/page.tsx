"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const expectations = [
  "Build and ship applied AI systems across model development, evaluation, data pipelines, and product integrations.",
  "Work with LLMs, agents, retrieval systems, or model evaluation on real engineering problems.",
  "Take ownership of open-ended problems and turn them into tested, working systems.",
  "Communicate clearly, learn quickly, and measure the outcomes of your work.",
];

export default function AIEngineerInternPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/ai-engineer-intern", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          linkedin: data.get("linkedin"),
          experience: data.get("experience"),
          backgroundStory: data.get("background-story"),
          whyShodh: data.get("why-shodh"),
          projectExample: data.get("project-example"),
          website: data.get("website"),
        }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Unable to submit your application.");

      form.reset();
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to submit your application.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="intern-page">
      <iframe aria-hidden="true" className="home-background" src="/shodh-new/index.html" tabIndex={-1} title="" />
      <div className="backdrop" />

      <Link href="/careers#open-positions" className="back-link">
        <ArrowLeft size={15} /> BACK TO CAREERS
      </Link>

      <section className="application-card" aria-label="AI Engineer Intern application">
        <img
          alt="We're hiring an AI Engineer Intern at Shodh AI"
          className="application-graphic"
          src="/AI_Engineer_Intern.png"
        />

        <div className="conversion-note">
          <span>PERFORMANCE-BASED FULL-TIME PATH</span>
          <strong>Full-time conversion is evaluated solely on demonstrated performance during the internship.</strong>
        </div>

        <div className="expectations">
          <p className="eyebrow">WHAT YOU&apos;LL DO</p>
          <ul>
            {expectations.map((item) => <li key={item}><Check size={16} />{item}</li>)}
          </ul>
        </div>

        <div className="divider" />

        {submitted ? (
          <div className="success-message" role="status">
            <span><Check size={30} /></span>
            <p className="eyebrow">APPLICATION RECEIVED</p>
            <h2>THANK YOU.</h2>
            <p>The team will review your application and contact you if there is a strong match.</p>
            <Link href="/careers" className="primary-action">VIEW OTHER ROLES <ArrowRight size={16} /></Link>
          </div>
        ) : (
          <form className="application-form" onSubmit={handleSubmit}>
            <div className="form-heading">
              <p className="eyebrow">YOUR APPLICATION</p>
              <h2>TELL US WHAT<br />YOU CAN BUILD.</h2>
            </div>

            <div className="field-grid">
              <label><span>FULL NAME *</span><input name="name" autoComplete="name" maxLength={120} required /></label>
              <label><span>EMAIL *</span><input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
              <label><span>PHONE</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
              <label><span>LINKEDIN</span><input name="linkedin" type="url" autoComplete="url" maxLength={500} /></label>
              <label className="wide"><span>EXPERIENCE</span><select name="experience" defaultValue=""><option value="">Select experience</option><option value="0-1">0–1 years · Student / fresh graduate</option><option value="1-3">1–3 years</option><option value="3+">3+ years</option></select></label>
            </div>

            <label className="long-answer"><span>ABOUT YOU *</span>Tell us what you have studied, built, or explored so far<textarea name="background-story" rows={5} minLength={20} maxLength={4000} required /></label>
            <label className="long-answer"><span>01</span>Why do you want to work with Shodh AI?<textarea name="why-shodh" rows={5} minLength={20} maxLength={4000} required /></label>
            <label className="long-answer"><span>02</span>Describe one AI project you built. What did you own, how did you evaluate it, and what was the outcome?<textarea name="project-example" rows={6} minLength={20} maxLength={6000} required /></label>

            <div className="website-field" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary-action submit" type="submit" disabled={submitting}>
              {submitting ? "SUBMITTING…" : <>SUBMIT APPLICATION <ArrowRight size={16} /></>}
            </button>
          </form>
        )}
      </section>

      <style jsx>{`
        @font-face { font-family: "Shodh Syne"; src: url("/shodh-new/Syne/Syne-VariableFont_wght.ttf") format("truetype"); font-weight: 100 900; font-display: swap; }
        .intern-page { min-height: 100svh; position: relative; isolation: isolate; overflow: hidden; padding: 92px 24px 60px; color: #fff; font-family: "Shodh Syne", system-ui, sans-serif; }
        .home-background, .backdrop { border: 0; height: 100%; inset: 0; position: fixed; width: 100%; }
        .home-background { z-index: -2; pointer-events: none; }
        .backdrop { z-index: -1; background: rgba(1, 5, 11, .64); backdrop-filter: blur(6px) saturate(85%); }
        .back-link { position: fixed; z-index: 2; top: 26px; left: 28px; display: inline-flex; align-items: center; gap: 8px; color: rgba(255,255,255,.7); font-size: 11px; font-weight: 700; letter-spacing: .1em; }
        .back-link:hover { color: #fff; }
        .application-card { width: min(860px, 100%); margin: 0 auto; padding: clamp(30px, 5vw, 64px); border: 1px solid rgba(255,255,255,.22); border-radius: 28px; background: rgba(7,12,22,.78); box-shadow: 0 24px 90px rgba(0,0,0,.48); backdrop-filter: blur(26px) saturate(145%); }
        .eyebrow { color: rgba(255,255,255,.5); font-size: 12px; font-weight: 700; letter-spacing: .14em; }
        .application-graphic { display: block; width: 100%; height: auto; margin: 0 auto 38px; }
        .form-heading h2, .success-message h2 { font-weight: 560; letter-spacing: -.045em; }
        .conversion-note { margin-top: 38px; padding: 22px 24px; border-left: 2px solid #fff; background: rgba(255,255,255,.08); }
        .conversion-note span { display: block; margin-bottom: 9px; color: rgba(255,255,255,.5); font-size: 11px; font-weight: 750; letter-spacing: .13em; }
        .conversion-note strong { font-size: 16px; font-weight: 560; line-height: 1.5; }
        .expectations { margin-top: 46px; }
        .expectations ul { display: grid; gap: 14px; margin-top: 20px; }
        .expectations li { display: flex; align-items: flex-start; gap: 12px; color: rgba(255,255,255,.74); font-size: 16px; line-height: 1.5; }
        .expectations li :global(svg) { flex: 0 0 auto; margin-top: 4px; }
        .divider { height: 1px; margin: 58px 0; background: rgba(255,255,255,.22); }
        .form-heading h2 { margin-top: 18px; font-size: clamp(42px, 7vw, 72px); line-height: .9; }
        .application-form { display: grid; gap: 26px; }
        .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px 30px; margin: 20px 0 8px; }
        label { display: grid; gap: 10px; color: rgba(255,255,255,.86); font-size: 16px; font-weight: 600; line-height: 1.45; }
        label span { color: rgba(255,255,255,.48); font-size: 12px; font-weight: 700; letter-spacing: .1em; }
        input, select, textarea { width: 100%; border: 1px solid rgba(255,255,255,.23); border-radius: 12px; outline: none; background: rgba(255,255,255,.065); color: #fff; padding: 15px; font: 16px/1.5 "Shodh Syne", system-ui, sans-serif; transition: border-color .2s ease, background .2s ease; }
        input:focus, select:focus, textarea:focus { border-color: rgba(255,255,255,.85); background: rgba(255,255,255,.1); }
        select option { color: #07101c; }
        textarea { margin-top: 2px; resize: vertical; }
        .wide { grid-column: 1 / -1; }
        .long-answer { margin-top: 4px; }
        .website-field { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
        .primary-action { width: max-content; display: inline-flex; align-items: center; justify-content: center; gap: 12px; padding: 15px 26px; border: 1px solid #fff; border-radius: 40px; background: #fff; color: #07101c; font: 750 12px/1 "Shodh Syne", system-ui, sans-serif; letter-spacing: .1em; transition: background .2s ease, color .2s ease; }
        .primary-action:hover { background: transparent; color: #fff; }
        .submit { justify-self: end; margin-top: 12px; cursor: pointer; }
        .submit:disabled { opacity: .55; cursor: wait; }
        .form-error { color: #ffb4b4; font-size: 14px; }
        .success-message { min-height: 390px; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; }
        .success-message > span { width: 62px; height: 62px; display: grid; place-items: center; margin-bottom: 28px; border: 1px solid rgba(255,255,255,.4); border-radius: 50%; }
        .success-message h2 { margin: 18px 0 20px; font-size: clamp(48px, 8vw, 80px); }
        .success-message > p:not(.eyebrow) { color: rgba(255,255,255,.7); font-size: 18px; }
        .success-message .primary-action { margin-top: 32px; }
        @media (max-width: 620px) {
          .intern-page { padding: 72px 14px 20px; }
          .back-link { top: 20px; left: 18px; }
          .application-card { border-radius: 20px; }
          .field-grid { grid-template-columns: 1fr; }
          .wide { grid-column: auto; }
          .submit { width: 100%; justify-self: stretch; }
        }
      `}</style>
    </main>
  );
}
