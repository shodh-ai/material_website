import { normalizeNextPath } from "@/lib/viewer-access";

export const metadata = {
  title: "Viewer access · Shodh AI",
  robots: { index: false, follow: false },
};

export default function AccessPage({
  searchParams,
}: {
  searchParams: { next?: string; error?: string };
}) {
  const nextPath = normalizeNextPath(searchParams.next);
  const hasError = searchParams.error === "invalid";

  return (
    <main className="access-page">
      <form action="/api/viewer-access" method="post" className="access-card">
        <p className="eyebrow">SHODH AI</p>
        <h1>Viewer access</h1>
        <p className="description">
          Enter the private viewing code you received for this page.
        </p>
        <input type="hidden" name="next" value={nextPath} />
        <label htmlFor="code">Viewing code</label>
        <input
          id="code"
          name="code"
          type="password"
          autoComplete="one-time-code"
          required
          minLength={16}
          aria-invalid={hasError}
        />
        {hasError && <p className="error">That code does not grant access to this page.</p>}
        <button type="submit">Continue</button>
        <a href="/">Return to homepage</a>
      </form>

      <style>{`
        .access-page { min-height: 100svh; display: grid; place-items: center; padding: 24px; background: #01050b; color: white; font-family: system-ui, sans-serif; }
        .access-card { width: min(440px, 100%); display: grid; gap: 14px; padding: 36px; border: 1px solid rgba(255,255,255,.14); border-radius: 20px; background: rgba(255,255,255,.05); }
        .eyebrow { margin: 0; font-size: 11px; font-weight: 700; letter-spacing: .18em; color: rgba(255,255,255,.55); }
        h1 { margin: 0; font-size: 36px; letter-spacing: -.04em; }
        .description { margin: 0 0 12px; color: rgba(255,255,255,.68); line-height: 1.5; }
        label { font-size: 13px; font-weight: 650; }
        input { min-height: 48px; padding: 0 14px; border: 1px solid rgba(255,255,255,.2); border-radius: 10px; background: rgba(255,255,255,.07); color: white; font-size: 17px; outline: none; }
        input:focus { border-color: rgba(255,255,255,.8); }
        button { min-height: 48px; margin-top: 4px; border: 0; border-radius: 10px; background: white; color: #01050b; font-weight: 750; cursor: pointer; }
        a { color: rgba(255,255,255,.58); font-size: 13px; text-align: center; text-decoration: none; }
        .error { margin: 0; color: #fda4af; font-size: 13px; }
      `}</style>
    </main>
  );
}
