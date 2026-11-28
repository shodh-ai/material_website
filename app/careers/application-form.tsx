"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { careerRoles, microGates, PROOF_WORD_LIMIT, type MicroGate } from "../../lib/careers-application";
import { countWords, validateCareerApplication } from "../../lib/careers-validation";

type Props = { selectedRole: string; onRoleChange: (role: string) => void };

export default function ApplicationForm({ selectedRole, onRoleChange }: Props) {
  const [agency, setAgency] = useState("");
  const [bsDetector, setBsDetector] = useState("");
  const [wildcardGate, setWildcardGate] = useState<MicroGate>("systems");
  const [gateAnswers, setGateAnswers] = useState({ systems: "", science: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");
  const role = careerRoles.find((item) => item.id === selectedRole);
  const gate: MicroGate = role?.gate === "science" ? "science" : role?.gate === "systems" ? "systems" : wildcardGate;
  const challenge = microGates[gate];
  const agencyWords = countWords(agency);
  const detectorWords = countWords(bsDetector);
  const overLimit = agencyWords > PROOF_WORD_LIMIT || detectorWords > PROOF_WORD_LIMIT;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const result = validateCareerApplication(payload);
    if (!result.ok) {
      setError(result.error);
      (form.elements.namedItem(result.field) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const response = await fetch("/api/careers", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || "We couldn’t save your application. Please try again.");
        setStatus("idle");
        if (data.field) (form.elements.namedItem(data.field) as HTMLElement | null)?.focus();
        return;
      }
      setStatus("success");
    } catch {
      setError("We couldn’t reach the application service. Your answers are still here; please try again.");
      setStatus("idle");
    }
  }

  return (
    <section id="apply" className="careers-application" aria-labelledby="application-title">
      <div className="careers-section-heading">
        <div><p className="careers-eyebrow">SHOW YOUR WORK</p><h2 id="application-title">PROOF OF WORK.</h2></div>
        <p>ONE ARTIFACT. THREE ANSWERS. REAL EVIDENCE.</p>
      </div>
      <p className="careers-application-intro">Skip the résumé. Show us what you shipped, what you owned, and what you proved wrong. Four proof-of-work fields are required, alongside your contact details and role choice. Your answers will be reviewed by the team.</p>
      {status === "success" ? (
        <div className="careers-application-success" role="status" tabIndex={-1}>
          <Check size={28} aria-hidden="true" /><h3>Application received.</h3>
          <p>Your artifact and answers have been saved for the team to review. We’ll use the email you provided if we’d like to continue.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="careers-application-form" aria-label="Proof-of-work application" aria-busy={status === "submitting"}>
          <fieldset className="careers-contact-fields" disabled={status === "submitting"}>
            <legend>Contact &amp; role</legend>
            <div className="careers-contact-grid">
              <label htmlFor="applicant-name">Name <span aria-hidden="true">*</span><input id="applicant-name" name="name" autoComplete="name" maxLength={120} required /></label>
              <label htmlFor="applicant-email">Email <span aria-hidden="true">*</span><input id="applicant-email" name="email" type="email" autoComplete="email" maxLength={254} required /></label>
              <label className="careers-role-select" htmlFor="application-role">Role <span aria-hidden="true">*</span>
                <select id="application-role" name="role" value={selectedRole} onChange={(event) => onRoleChange(event.target.value)} required>
                  <option value="" disabled>Choose a role</option>
                  {careerRoles.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
                </select>
              </label>
            </div>
          </fieldset>
          <fieldset className="careers-proof-field" data-proof-field="artifact" disabled={status === "submitting"}>
            <legend>01 — Your #1 shipped artifact</legend>
            <p id="artifact-help">Link to ONE thing you built, broke, or published: a GitHub repo, paper, kernel benchmark, startup, or deep blog. A real artifact URL is required to submit.</p>
            <label htmlFor="artifact-url">Artifact URL <span aria-hidden="true">*</span></label>
            <input id="artifact-url" name="artifactUrl" type="url" placeholder="https://github.com/you/your-project" autoComplete="url" maxLength={2000} aria-describedby="artifact-help" required />
          </fieldset>
          <fieldset className="careers-proof-field" data-proof-field="agency" disabled={status === "submitting"}>
            <legend>02 — Entrepreneurial agency</legend>
            <label htmlFor="agency">What is the hardest thing you built or pushed from 0 → 1 without anyone asking you to? <span aria-hidden="true">*</span></label>
            <textarea id="agency" name="agency" rows={5} maxLength={4000} value={agency} onChange={(event) => setAgency(event.target.value)} aria-describedby="agency-count" aria-invalid={agencyWords > PROOF_WORD_LIMIT} required />
            <p id="agency-count" className={`careers-word-count ${agencyWords > PROOF_WORD_LIMIT ? "is-over-limit" : ""}`}>{agencyWords} / {PROOF_WORD_LIMIT} words</p>
          </fieldset>
          <fieldset className="careers-proof-field" data-proof-field="bs-detector" disabled={status === "submitting"}>
            <legend>03 — The “BS detector”</legend>
            <label htmlFor="bs-detector">Tell us about a time a model, solver, or test looked green—and how you proved it was actually broken. <span aria-hidden="true">*</span></label>
            <textarea id="bs-detector" name="bsDetector" rows={5} maxLength={4000} value={bsDetector} onChange={(event) => setBsDetector(event.target.value)} aria-describedby="detector-count" aria-invalid={detectorWords > PROOF_WORD_LIMIT} required />
            <p id="detector-count" className={`careers-word-count ${detectorWords > PROOF_WORD_LIMIT ? "is-over-limit" : ""}`}>{detectorWords} / {PROOF_WORD_LIMIT} words</p>
          </fieldset>
          <fieldset className="careers-proof-field" data-proof-field="micro-gate" disabled={status === "submitting"}>
            <legend>04 — A 15-minute micro-gate</legend>
            <p>Choose one challenge matched to your role. Wildcard applicants can choose either. Spend about 15 minutes; there is no countdown.</p>
            <label htmlFor="micro-gate">Challenge <span aria-hidden="true">*</span></label>
            <select id="micro-gate" name="microGate" value={gate} onChange={(event) => setWildcardGate(event.target.value as MicroGate)} required>
              {(["systems", "science"] as const).filter((option) => !role || role.gate === "either" || role.gate === option).map((option) => <option key={option} value={option}>{microGates[option].title}</option>)}
            </select>
            <div className="careers-micro-challenge" aria-live="polite">
              <h3>{challenge.title}</h3>
              {"code" in challenge ? <pre aria-label="GPU benchmark challenge"><code>{challenge.code}</code></pre> : <blockquote><span>Hypothetical benchmark claim</span>{challenge.claim}</blockquote>}
              <label htmlFor="micro-gate-response">{challenge.prompt} <span aria-hidden="true">*</span></label>
            </div>
            <textarea id="micro-gate-response" name="microGateResponse" rows={7} maxLength={4000} value={gateAnswers[gate]} onChange={(event) => setGateAnswers((answers) => ({ ...answers, [gate]: event.target.value }))} placeholder={gate === "systems" ? "Four sentences: identify the failure, propose a fix, and verify it." : "1. First falsification test\n2. Second falsification test\n3. Third falsification test"} required />
          </fieldset>
          <div className="careers-honeypot" aria-hidden="true"><label>Leave this blank<input name="website" autoComplete="off" tabIndex={-1} /></label></div>
          {error && <p className="careers-form-error" role="alert">{error}</p>}
          <p className="careers-application-note">We’ll use your contact details, artifact link, and answers to review this application and follow up about this role.</p>
          <button className="careers-primary-button" type="submit" disabled={status === "submitting" || overLimit}>
            {status === "submitting" ? "SAVING APPLICATION…" : "SUBMIT PROOF OF WORK"}<ArrowRight size={17} aria-hidden="true" />
          </button>
        </form>
      )}
    </section>
  );
}
