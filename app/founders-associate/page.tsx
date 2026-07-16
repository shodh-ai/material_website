"use client";

export default function FoundersAssociatePage() {
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
        <img
          alt="Founders Associate"
          className="application-graphic"
          src="/Founders_Associate.png"
        />
        <form className="application-form">
          <label htmlFor="why-shodh">
            <span>01</span>
            A short note on why you want to work with Shodh AI
          </label>
          <textarea id="why-shodh" name="why-shodh" rows={5} />

          <label htmlFor="hard-thing">
            <span>02</span>
            One example of something difficult you have built, organized, sold, written, researched, or executed
          </label>
          <textarea id="hard-thing" name="hard-thing" rows={5} />
        </form>
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
        textarea {
          width: 100%;
          resize: vertical;
          margin-bottom: 18px;
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 14px;
          outline: none;
          background: rgba(255, 255, 255, 0.07);
          color: #fff;
          font: 15px/1.5 "Plus Jakarta Sans", system-ui, sans-serif;
          transition: border-color .2s ease, background .2s ease;
        }
        textarea:focus {
          border-color: rgba(255, 255, 255, 0.85);
          background: rgba(255, 255, 255, 0.12);
        }
        @media (max-width: 560px) {
          .founders-associate { padding: 18px 14px; }
          .application-card { border-radius: 20px; }
          .application-graphic { margin-bottom: 28px; }
        }
      `}</style>
    </main>
  );
}
