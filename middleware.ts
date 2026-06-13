import { NextResponse, type NextRequest } from "next/server";

const protectedPaths = [
  "/investor/data-room",
  "/Shodh_Industrial_Validation_Portfolio_Final_Polished.pdf",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedPath = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  const hasAccess = request.cookies.get("shodhInvestorDataRoomAccess")?.value === "granted";

  if (!hasAccess && pathname !== "/investor/data-room") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/investor/data-room";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: [
    "/investor/data-room/:path*",
    "/Shodh_Industrial_Validation_Portfolio_Final_Polished.pdf",
  ],
};
