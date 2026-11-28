import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import { microGates } from "../../../lib/careers-application";
import { validateCareerApplication } from "../../../lib/careers-validation";

export const runtime = "nodejs";
const MAX_BODY_BYTES = 24_000;

// Read-only availability check: no applicant data or configuration is returned.
export async function GET() {
  const headers = { "Cache-Control": "no-store" };
  if (!process.env.CAREERS_DATABASE_URL) {
    return NextResponse.json({ acceptingApplications: false }, { status: 503, headers });
  }
  try {
    await neon(process.env.CAREERS_DATABASE_URL)`SELECT 1`;
    return NextResponse.json({ acceptingApplications: true }, { headers });
  } catch {
    return NextResponse.json({ acceptingApplications: false }, { status: 503, headers });
  }
}

export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Submission is too large." }, { status: 413 });
  }
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Submission is too large." }, { status: 413 });
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ success: true }, { status: 201 });
  }
  const result = validateCareerApplication(body);
  if (!result.ok) return NextResponse.json({ error: result.error, field: result.field }, { status: 400 });
  const application = result.application;
  const databaseUrl = process.env.CAREERS_DATABASE_URL;
  if (!databaseUrl) {
    console.error("Proof-of-work submission failed: careers database is not configured");
    return NextResponse.json({ error: "Applications are temporarily unavailable. Your answers have been kept on this page; please try again shortly." }, { status: 503 });
  }
  try {
    const sql = neon(databaseUrl);
    const source = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
    const sourceHash = createHash("sha256").update(`${source}:${process.env.CAREERS_APPLICATION_HASH_SALT || databaseUrl}`).digest("hex");
    const userAgent = (request.headers.get("user-agent") || "").slice(0, 500);
    await sql`
      CREATE TABLE IF NOT EXISTS careers_proof_applications (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        role TEXT NOT NULL,
        artifact_url TEXT NOT NULL,
        entrepreneurial_agency TEXT NOT NULL,
        bs_detector TEXT NOT NULL,
        micro_gate TEXT NOT NULL,
        micro_gate_version TEXT NOT NULL,
        micro_gate_response TEXT NOT NULL,
        source_hash TEXT NOT NULL,
        user_agent TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS careers_proof_source_created_idx ON careers_proof_applications (source_hash, created_at DESC)`;
    // Serialize submissions from one source so concurrent requests cannot bypass the limit.
    const [, inserted] = await sql.transaction([
      sql`SELECT pg_advisory_xact_lock(hashtextextended(${sourceHash}, 0))`,
      sql`
        INSERT INTO careers_proof_applications
          (name, email, role, artifact_url, entrepreneurial_agency, bs_detector, micro_gate, micro_gate_version, micro_gate_response, source_hash, user_agent)
        SELECT ${application.name}, ${application.email}, ${application.role}, ${application.artifactUrl},
          ${application.agency}, ${application.bsDetector}, ${application.microGate}, ${microGates[application.microGate].version},
          ${application.microGateResponse}, ${sourceHash}, ${userAgent}
        WHERE (SELECT COUNT(*) FROM careers_proof_applications WHERE source_hash = ${sourceHash} AND created_at > NOW() - INTERVAL '15 minutes') < 5
        RETURNING id
      `,
    ]);
    if (!inserted.length) return NextResponse.json({ error: "Too many submissions. Please wait 15 minutes and try again." }, { status: 429 });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    console.error("Proof-of-work application could not be saved");
    return NextResponse.json({ error: "We couldn’t save your application. Your answers have been kept on this page; please try again." }, { status: 500 });
  }
}
