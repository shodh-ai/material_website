import { createHash } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
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

  // Bots commonly fill fields hidden from people. Return success without storing it.
  if (clean(body.website, 200)) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 254).toLowerCase();
  const backgroundStory = clean(body.backgroundStory, 4_000);
  const whyShodh = clean(body.whyShodh, 4_000);
  const difficultExample = clean(body.difficultExample, 6_000);

  if (!name || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Please enter your name and a valid email address." },
      { status: 400 }
    );
  }

  if (
    backgroundStory.length < 20 ||
    whyShodh.length < 20 ||
    difficultExample.length < 20
  ) {
    return NextResponse.json(
      { error: "Please provide a complete answer to all three questions." },
      { status: 400 }
    );
  }

  if (!process.env.CAREERS_DATABASE_URL) {
    console.error("Founders Associate submission failed: CAREERS_DATABASE_URL is missing");
    return NextResponse.json(
      { error: "Applications are temporarily unavailable. Please try again shortly." },
      { status: 503 }
    );
  }

  try {
    const sql = neon(process.env.CAREERS_DATABASE_URL);
    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const source = forwardedFor || request.headers.get("x-real-ip") || "unknown";
    const sourceHash = createHash("sha256")
      .update(`${source}:${process.env.CAREERS_APPLICATION_HASH_SALT || process.env.CAREERS_DATABASE_URL}`)
      .digest("hex");
    const userAgent = clean(request.headers.get("user-agent"), 500);

    await sql`
      CREATE TABLE IF NOT EXISTS founders_associate_applications (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        background_story TEXT NOT NULL,
        why_shodh TEXT NOT NULL,
        difficult_example TEXT NOT NULL,
        source_hash TEXT NOT NULL,
        user_agent TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      ALTER TABLE founders_associate_applications
      ADD COLUMN IF NOT EXISTS background_story TEXT
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS founders_associate_source_created_idx
      ON founders_associate_applications (source_hash, created_at DESC)
    `;

    const recent = await sql`
      SELECT COUNT(*)::int AS count
      FROM founders_associate_applications
      WHERE source_hash = ${sourceHash}
        AND created_at > NOW() - INTERVAL '15 minutes'
    `;

    if ((recent[0]?.count ?? 0) >= 5) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait and try again." },
        { status: 429 }
      );
    }

    await sql`
      INSERT INTO founders_associate_applications
        (name, email, background_story, why_shodh, difficult_example, source_hash, user_agent)
      VALUES
        (${name}, ${email}, ${backgroundStory}, ${whyShodh}, ${difficultExample}, ${sourceHash}, ${userAgent})
    `;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Founders Associate database error:", error);
    return NextResponse.json(
      { error: "We couldn't save your application. Please try again." },
      { status: 500 }
    );
  }
}
