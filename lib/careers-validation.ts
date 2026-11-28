import { careerRoles, PROOF_WORD_LIMIT, type MicroGate } from "./careers-application";

export function countWords(value: string): number {
  return value.trim().split(/\s+/u).filter(Boolean).length;
}

export function isPublicArtifactUrl(value: string): boolean {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase().replace(/\.$/, "");
    return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password &&
      hostname.includes(".") && !hostname.includes(":") && !/^\d+\.\d+\.\d+\.\d+$/.test(hostname) &&
      !/(^|\.)(localhost|local|internal|test|invalid|example)$/.test(hostname) &&
      !/(^|\.)example\.(com|org|net)$/.test(hostname);
  } catch {
    return false;
  }
}

type Application = {
  name: string;
  email: string;
  role: string;
  artifactUrl: string;
  agency: string;
  bsDetector: string;
  microGate: MicroGate;
  microGateResponse: string;
};

type ValidationResult = { ok: true; application: Application } |
  { ok: false; error: string; field: string };

export function validateCareerApplication(body: Record<string, unknown>): ValidationResult {
  const string = (key: string) => typeof body[key] === "string" ? (body[key] as string).trim() : "";
  const fields = ["name", "email", "role", "artifactUrl", "agency", "bsDetector", "microGate", "microGateResponse"] as const;
  for (const field of fields) {
    if (!string(field)) return { ok: false, error: "Complete every required field before submitting.", field };
  }
  const role = careerRoles.find((item) => item.id === string("role"));
  if (!role) return { ok: false, error: "Choose one of the four open roles.", field: "role" };
  if (string("name").length > 120) return { ok: false, error: "Keep your name under 120 characters.", field: "name" };
  if (string("email").length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string("email"))) {
    return { ok: false, error: "Enter a valid email address so we can contact you.", field: "email" };
  }
  if (string("artifactUrl").length > 2000 || !isPublicArtifactUrl(string("artifactUrl"))) {
    return { ok: false, error: "Link to one real artifact using a public http:// or https:// URL.", field: "artifactUrl" };
  }
  for (const field of ["agency", "bsDetector"] as const) {
    if (countWords(string(field)) > PROOF_WORD_LIMIT || string(field).length > 4000) {
      return { ok: false, error: `Keep each written answer to ${PROOF_WORD_LIMIT} words or fewer.`, field };
    }
  }
  const gate = string("microGate");
  if (!["systems", "science"].includes(gate) || (role.gate !== "either" && gate !== role.gate)) {
    return { ok: false, error: "Choose the micro-gate for your role; Wildcard applicants may choose either.", field: "microGate" };
  }
  if (string("microGateResponse").length > 4000) return { ok: false, error: "Keep your micro-gate answer under 4,000 characters.", field: "microGateResponse" };
  return { ok: true, application: {
    name: string("name"), email: string("email").toLowerCase(), role: role.id,
    artifactUrl: new URL(string("artifactUrl")).href, agency: string("agency"), bsDetector: string("bsDetector"),
    microGate: gate as MicroGate, microGateResponse: string("microGateResponse"),
  } };
}
