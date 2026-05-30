import { NextResponse } from "next/server";

const recipientEmail = "ellwil@shodh.ai";
const defaultFromEmail = "Shodh AI Website <website@shodh.ai>";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = asText(payload.name);
  const email = asText(payload.email);
  const company = asText(payload.company);
  const message = asText(payload.message);

  if (!name || !email || !company || !message) {
    return NextResponse.json(
      { error: "Name, email, company, and message are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const subject = `New Shodh AI footer inquiry from ${name}`;
  const text = [
    "New footer contact form submission",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <h2>New footer contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_EMAIL_FROM || defaultFromEmail,
      to: [recipientEmail],
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Footer contact email failed:", details);
    return NextResponse.json(
      { error: "Unable to send email." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
