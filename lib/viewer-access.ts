export const VIEWER_COOKIE = "shodhViewerAccess";

type ViewerRules = Record<string, string[]>;

const BUILT_IN_VIEWER_RULES: ViewerRules = {
  "Shodh-Viewer-2026": ["*"],
  "Shodh-Access-2026": ["*"],
  "Shodh-Investor-2026": ["*"],
};

const LUCAN_BENCHMARK_PATH = "/blog/lucan-scientific-performance";
const LUCAN_BENCHMARK_PASSWORD_SHA256 =
  "bd96820841f7449bbf8a6649fd80c0fdef4525b7d1042580019ca7e89faecc63";

async function sha256(value: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value)
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

async function isLucanBenchmarkPassword(code: string, pathname: string) {
  const isLucanPath =
    pathname === LUCAN_BENCHMARK_PATH ||
    pathname.startsWith(`${LUCAN_BENCHMARK_PATH}/`);

  return isLucanPath && (await sha256(code)) === LUCAN_BENCHMARK_PASSWORD_SHA256;
}

function getRules(): ViewerRules {
  const lucanPassword = process.env.PMEC_BLOG_PASSWORD?.trim();
  const environmentRules: ViewerRules = lucanPassword
    ? { [lucanPassword]: [LUCAN_BENCHMARK_PATH] }
    : {};

  try {
    const parsed = JSON.parse(process.env.VIEWER_ACCESS_RULES || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ...BUILT_IN_VIEWER_RULES, ...environmentRules };
    }

    return {
      ...BUILT_IN_VIEWER_RULES,
      ...environmentRules,
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
    return { ...BUILT_IN_VIEWER_RULES, ...environmentRules };
  }
}

export function normalizeNextPath(value: unknown) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  return value;
}

export async function canViewPath(code: string | undefined, pathname: string) {
  if (!code) return false;
  const allowedPaths = getRules()[code];
  const allowedByViewerRule = allowedPaths?.some(
    (allowedPath) =>
      allowedPath === "*" ||
      pathname === allowedPath ||
      pathname.startsWith(`${allowedPath.replace(/\/$/, "")}/`)
  );

  return Boolean(allowedByViewerRule) || isLucanBenchmarkPassword(code, pathname);
}
