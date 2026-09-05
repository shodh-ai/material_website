import { createHash, randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 24_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

async function saveLocally(application: Record<string, string>) {
  const directory = path.join(process.cwd(), ".data");
  await mkdir(directory, { recursive: true, mode: 0o700 });
  await appendFile(
    path.join(directory, "ai-engineer-intern-applications.jsonl"),
    `${JSON.stringify({ id: randomUUID(), ...application, createdAt: new Date().toISOString() })}\n`,
    { encoding: "utf8", mode: 0o600 }
  );
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Submission is too large." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  if (clean(body.website, 200)) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const application = {
    name: clean(body.name, 120),
    email: clean(body.email, 254).toLowerCase(),
    phone: clean(body.phone, 40),
    linkedin: clean(body.linkedin, 500),
    experience: clean(body.experience, 40),
    backgroundStory: clean(body.backgroundStory, 4_000),
    whyShodh: clean(body.whyShodh, 4_000),
    projectExample: clean(body.projectExample, 6_000),
  };

  if (!application.name || !EMAIL_PATTERN.test(application.email)) {
    return NextResponse.json({ error: "Please enter your name and a valid email address." }, { status: 400 });
  }

  if (
    application.backgroundStory.length < 20 ||
    application.whyShodh.length < 20 ||
    application.projectExample.length < 20
  ) {
    return NextResponse.json({ error: "Please provide a complete answer to all three questions." }, { status: 400 });
  }

  try {
    if (!process.env.CAREERS_DATABASE_URL) {
      if (process.env.NODE_ENV === "development") {
        await saveLocally(application);
        return NextResponse.json({ success: true }, { status: 201 });
      }

      console.error("AI Engineer Intern submission failed: CAREERS_DATABASE_URL is missing");
      return NextResponse.json(
        { error: "Applications are temporarily unavailable. Please try again shortly." },
        { status: 503 }
      );
    }

    const sql = neon(process.env.CAREERS_DATABASE_URL);
    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const source = forwardedFor || request.headers.get("x-real-ip") || "unknown";
    const sourceHash = createHash("sha256")
      .update(`${source}:${process.env.APPLICATION_HASH_SALT || process.env.CAREERS_DATABASE_URL}`)
      .digest("hex");
    const userAgent = clean(request.headers.get("user-agent"), 500);

    await sql`
      CREATE TABLE IF NOT EXISTS ai_engineer_intern_applications (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        linkedin TEXT,
        experience TEXT,
        background_story TEXT NOT NULL,
        why_shodh TEXT NOT NULL,
        project_example TEXT NOT NULL,
        source_hash TEXT NOT NULL,
        user_agent TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS ai_engineer_intern_source_created_idx
      ON ai_engineer_intern_applications (source_hash, created_at DESC)
    `;

    const recent = await sql`
      SELECT COUNT(*)::int AS count
      FROM ai_engineer_intern_applications
      WHERE source_hash = ${sourceHash}
        AND created_at > NOW() - INTERVAL '15 minutes'
    `;

    if ((recent[0]?.count ?? 0) >= 5) {
      return NextResponse.json({ error: "Too many submissions. Please wait and try again." }, { status: 429 });
    }

    await sql`
      INSERT INTO ai_engineer_intern_applications
        (name, email, phone, linkedin, experience, background_story, why_shodh, project_example, source_hash, user_agent)
      VALUES
        (${application.name}, ${application.email}, ${application.phone}, ${application.linkedin}, ${application.experience}, ${application.backgroundStory}, ${application.whyShodh}, ${application.projectExample}, ${sourceHash}, ${userAgent})
    `;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("AI Engineer Intern database error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "We couldn't save your application. Please try again." }, { status: 500 });
  }
}
