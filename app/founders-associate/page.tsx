"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

export default function FoundersAssociatePage() {
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
      const response = await fetch("/api/founders-associate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          backgroundStory: data.get("background-story"),
          whyShodh: data.get("why-shodh"),
          difficultExample: data.get("hard-thing"),
          website: data.get("website"),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit your application.");
      }

      form.reset();
      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to submit your application."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="founders-associate">
      <iframe
        aria-hidden="true"
        className="home-background"
        src="/shodh-new/index.html"
        tabIndex={-1}
        title=""
      />
      <div className="backdrop" />

      <section className="application-card" aria-label="Founders Associate application">
        <Image
          alt="Founders Associate"
          className="application-graphic"
          src="/founders-associate-hiring.jpg"
          width={1225}
          height={1280}
          sizes="(max-width: 900px) calc(100vw - 76px), 732px"
          priority
          unoptimized
        />
        {submitted ? (
          <div className="success-message" role="status">
            <strong>Application received.</strong>
            <p>Thank you. The Shodh AI team will review your responses.</p>
          </div>
        ) : (
        <form className="application-form" onSubmit={handleSubmit}>
          <div className="contact-fields">
            <label htmlFor="name">
              <span>NAME</span>
              Full name
            </label>
            <input id="name" name="name" autoComplete="name" maxLength={120} required />

            <label htmlFor="email">
              <span>EMAIL</span>
              Email address
            </label>
            <input id="email" name="email" type="email" autoComplete="email" maxLength={254} required />
          </div>

          <label htmlFor="background-story">
            <span>ABOUT YOU</span>
            Tell us your story—where you have been and what you have done
          </label>
          <textarea
            id="background-story"
            name="background-story"
            rows={5}
            minLength={20}
            maxLength={4000}
            required
          />

          <label htmlFor="why-shodh">
            <span>01</span>
            A short note on why you want to work with Shodh AI
          </label>
          <textarea id="why-shodh" name="why-shodh" rows={5} minLength={20} maxLength={4000} required />

          <label htmlFor="hard-thing">
            <span>02</span>
            One example of something difficult you have built, organized, sold, written, researched, or executed
          </label>
          <textarea id="hard-thing" name="hard-thing" rows={5} minLength={20} maxLength={6000} required />

          <div className="website-field" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit application"}
          </button>
        </form>
        )}
      </section>

      <style jsx>{`
        .founders-associate {
          min-height: 100svh;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 48px 24px;
          color: #fff;
          font-family: "Syne", "Plus Jakarta Sans", system-ui, sans-serif;
        }
        .home-background, .backdrop {
          border: 0;
          height: 100%;
          inset: 0;
          position: fixed;
          width: 100%;
        }
        .home-background {
          z-index: -2;
          pointer-events: none;
        }
        .backdrop {
          z-index: -1;
          background: rgba(1, 5, 11, 0.57);
          backdrop-filter: blur(5px);
        }
        .application-card {
          width: min(760px, 100%);
          margin: 0 auto;
          padding: clamp(28px, 5vw, 56px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 28px;
          background: rgba(7, 12, 22, 0.74);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(24px) saturate(150%);
        }
        .application-graphic {
          display: block;
          width: min(100%, 580px);
          height: auto;
          margin: 0 auto 34px;
        }
        .application-form {
          display: grid;
          gap: 16px;
        }
        .contact-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 18px;
          margin-bottom: 16px;
        }
        label {
          display: flex;
          gap: 12px;
          align-items: baseline;
          font-size: 15px;
          font-weight: 650;
          line-height: 1.35;
        }
        label span {
          color: rgba(255, 255, 255, 0.45);
          font-size: 11px;
          letter-spacing: 0.08em;
        }
        input, textarea {
          width: 100%;
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 14px;
          outline: none;
          background: rgba(255, 255, 255, 0.07);
          color: #fff;
          font: 15px/1.5 "Plus Jakarta Sans", system-ui, sans-serif;
          transition: border-color .2s ease, background .2s ease;
        }
        textarea {
          resize: vertical;
          margin-bottom: 18px;
        }
        input:focus, textarea:focus {
          border-color: rgba(255, 255, 255, 0.85);
          background: rgba(255, 255, 255, 0.12);
        }
        button {
          min-height: 52px;
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 14px;
          background: #fff;
          color: #07101c;
          cursor: pointer;
          font: 700 14px/1 "Plus Jakarta Sans", system-ui, sans-serif;
          transition: opacity .2s ease, transform .2s ease;
        }
        button:hover { transform: translateY(-1px); }
        button:disabled { cursor: wait; opacity: .6; transform: none; }
        .website-field {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
        }
        .form-error { margin: 0; color: #ffb4b4; font-size: 14px; }
        .success-message {
          padding: 28px;
          border: 1px solid rgba(135, 255, 190, .35);
          border-radius: 18px;
          background: rgba(52, 211, 153, .09);
          text-align: center;
        }
        .success-message strong { display: block; font-size: 22px; }
        .success-message p { margin: 8px 0 0; color: rgba(255,255,255,.72); }
        @media (max-width: 560px) {
          .founders-associate { padding: 18px 14px; }
          .application-card { border-radius: 20px; }
          .application-graphic { margin-bottom: 28px; }
          .contact-fields { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
