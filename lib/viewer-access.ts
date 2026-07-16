export const VIEWER_COOKIE = "shodhViewerAccess";

type ViewerRules = Record<string, string[]>;

function getRules(): ViewerRules {
  try {
    const parsed = JSON.parse(process.env.VIEWER_ACCESS_RULES || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([code, paths]) =>
          code.length >= 16 &&
          Array.isArray(paths) &&
          paths.every((path) => typeof path === "string")
      )
    ) as ViewerRules;
  } catch {
    return {};
  }
}

export function normalizeNextPath(value: unknown) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  return value;
}

export function canViewPath(code: string | undefined, pathname: string) {
  if (!code) return false;
  const allowedPaths = getRules()[code];
  if (!allowedPaths) return false;

  return allowedPaths.some(
    (allowedPath) =>
      allowedPath === "*" ||
      pathname === allowedPath ||
      pathname.startsWith(`${allowedPath.replace(/\/$/, "")}/`)
  );
}
