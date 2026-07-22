import { NextResponse, type NextRequest } from "next/server";
import { canViewPath, VIEWER_COOKIE } from "./lib/viewer-access";

const publicExactPaths = new Set([
  "/",
  "/access",
  "/founders-associate",
  "/api/founders-associate",
  "/api/viewer-access",
  "/api/footer-contact",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/research",
  "/careers",
  "/materials-discovery",
  "/project-skanda",
  "/Founders_Associate.png",
  "/Logo_White BG.png",
]);

const publicPathPrefixes = ["/shodh-new/"];

function isPublicPath(pathname: string) {
  return (
    publicExactPaths.has(pathname) ||
    publicPathPrefixes.some((prefix) => pathname.startsWith(prefix))
  );
}

function routeFromPageChunk(pathname: string) {
  const decodedPath = decodeURIComponent(pathname);
  const rootPageMatch = decodedPath.match(
    /^\/_next\/static\/chunks\/app\/page(?:-[^/]+)?\.js$/
  );
  if (rootPageMatch) return "/";

  const pageMatch = decodedPath.match(
    /^\/_next\/static\/chunks\/app\/(.+)\/page(?:-[^/]+)?\.js$/
  );
  return pageMatch ? `/${pageMatch[1]}` : null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next/static/")) {
    const pageRoute = routeFromPageChunk(pathname);
    if (!pageRoute || isPublicPath(pageRoute)) {
      return NextResponse.next();
    }

    const viewerCode = request.cookies.get(VIEWER_COOKIE)?.value;
    return canViewPath(viewerCode, pageRoute)
      ? NextResponse.next()
      : new NextResponse(null, { status: 404 });
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const viewerCode = request.cookies.get(VIEWER_COOKIE)?.value;
  if (canViewPath(viewerCode, pathname)) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }

  if (pathname.startsWith("/api/")) {
    return new NextResponse(null, { status: 404 });
  }

  const accessUrl = request.nextUrl.clone();
  accessUrl.pathname = "/access";
  accessUrl.search = "";
  accessUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(accessUrl);
}

export const config = {
  matcher: ["/((?!_next/image).*)"],
};
