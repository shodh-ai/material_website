export const VIEWER_COOKIE = "shodhViewerAccess";

type ViewerRules = Record<string, string[]>;

const BUILT_IN_VIEWER_RULES: ViewerRules = {
  "ShodhPitch-Atlas-2026": ["/pitch-tomorrow", "/investor-memo", "/meeting-intro"],
  "ShodhPitch-Orbit-2026": ["/pitch-tomorrow", "/investor-memo", "/meeting-intro"],
  "ShodhPitch-Foundry-2026": ["/pitch-tomorrow", "/investor-memo", "/meeting-intro"],
};

function getRules(): ViewerRules {
  try {
    const parsed = JSON.parse(process.env.VIEWER_ACCESS_RULES || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return BUILT_IN_VIEWER_RULES;
    }

    return {
      ...BUILT_IN_VIEWER_RULES,
      ...(Object.fromEntries(
        Object.entries(parsed).filter(
          ([code, paths]) =>
            code.length >= 16 &&
            Array.isArray(paths) &&
            paths.every((path) => typeof path === "string")
        )
      ) as ViewerRules),
    };
  } catch {
    return BUILT_IN_VIEWER_RULES;
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
