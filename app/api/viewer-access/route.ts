import { NextResponse } from "next/server";
import {
  canViewPath,
  normalizeNextPath,
  VIEWER_COOKIE,
} from "@/lib/viewer-access";

export async function POST(request: Request) {
  const formData = await request.formData();
  const code = String(formData.get("code") || "").trim();
  const nextPath = normalizeNextPath(formData.get("next"));
  const pathname = new URL(nextPath, request.url).pathname;

  if (!(await canViewPath(code, pathname))) {
    const failedUrl = new URL("/access", request.url);
    failedUrl.searchParams.set("next", nextPath);
    failedUrl.searchParams.set("error", "invalid");
    return NextResponse.redirect(failedUrl, 303);
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url), 303);
  response.cookies.set(VIEWER_COOKIE, code, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
