const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const cache = new Map();
const queries = [];
let storage = "saved";
let transactions = 0;
let checks = 0;
const sql = (strings, ...values) => {
  const query = { text: strings.join("?"), values };
  queries.push(query);
  return Promise.resolve(query);
};
sql.transaction = async (statements) => {
  transactions += 1;
  await Promise.all(statements);
  if (storage === "failed") throw new Error("Simulated storage failure");
  return [[], storage === "limited" ? [] : [{ id: 123 }]];
};
// Compile the real route and validators; replace only external database I/O.
function load(file) {
  file = path.resolve(root, file);
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} };
  cache.set(file, module);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const customRequire = (name) => {
    if (name === "@neondatabase/serverless") return { neon: () => sql };
    if (name.startsWith(".")) return load(path.resolve(path.dirname(file), name + ".ts"));
    return require(name);
  };
  const execute = vm.runInThisContext(`(function(exports, require, module) { ${code}\n})`, { filename: file });
  execute(module.exports, customRequire, module);
  return module.exports;
}
const { validateCareerApplication, countWords } = load("lib/careers-validation.ts");
const { careerRoles, microGates } = load("lib/careers-application.ts");
const { POST, GET } = load("app/api/careers/route.ts");
const { middleware } = load("middleware.ts");
const { NextRequest } = require("next/server");
const valid = {
  name: "Verification Candidate", email: "candidate@shodh.ai", role: "gpu-tpu-systems",
  artifactUrl: "https://github.com/shodh-ai/material_website", agency: "I built a working tool.",
  bsDetector: "I compared the result to an independent reference.", microGate: "systems",
  microGateResponse: "The host timer measures queued work. I would synchronize the device. I would use device events. I would repeat after warmup.",
};
function check(condition) { assert.ok(condition); checks += 1; }
async function request(body, options = {}) {
  return POST(new Request("https://shodh.ai/api/careers", {
    method: "POST", body: typeof body === "string" ? body : JSON.stringify(body),
    headers: { "content-type": "application/json", ...options.headers },
  }));
}
(async () => {
  check((await middleware(new NextRequest("https://shodh.ai/api/careers"))).headers.get("x-middleware-next") === "1");
  check((await middleware(new NextRequest("https://shodh.ai/api/private-unlisted"))).status === 404);
  check(careerRoles.length === 4);
  check(microGates.systems.code.split("\n").length === 15);
  check(countWords(" one\n two\t three ") === 3);
  check(validateCareerApplication(valid).ok);
  for (const field of Object.keys(valid)) check(!validateCareerApplication({ ...valid, [field]: "" }).ok);
  for (const artifactUrl of ["javascript:alert(1)", "file:///etc/passwd", "https://localhost/a", "http://127.0.0.1/a", "https://example.com/", "https://user:pass@github.com/x", "https://10.0.0.1/x"]) {
    check(!validateCareerApplication({ ...valid, artifactUrl }).ok);
  }
  for (const field of ["agency", "bsDetector"]) {
    check(validateCareerApplication({ ...valid, [field]: "word ".repeat(120) }).ok);
    check(!validateCareerApplication({ ...valid, [field]: "word ".repeat(121) }).ok);
  }
  check(!validateCareerApplication({ ...valid, role: "frontier-models" }).ok);
  check(validateCareerApplication({ ...valid, role: "frontier-models", microGate: "science" }).ok);
  for (const microGate of ["science", "systems"]) check(validateCareerApplication({ ...valid, role: "wildcard", microGate }).ok);
  check(!validateCareerApplication({ ...valid, microGateResponse: "x".repeat(4001) }).ok);
  for (const body of [null, [], "{", { ...valid, artifactUrl: "" }, { ...valid, bsDetector: "word ".repeat(121) }]) {
    const response = await request(body);
    check(response.status === 400);
  }
  check((await request("x".repeat(24001))).status === 413);
  const savedDatabaseUrl = process.env.CAREERS_DATABASE_URL;
  const originalError = console.error;
  try {
    console.error = () => {};
    delete process.env.CAREERS_DATABASE_URL;
    check((await request(valid)).status === 503);
    check((await GET()).status === 503);
    const beforeHoneypot = queries.length;
    check((await request({ ...valid, website: "bot-filled" })).status === 201);
    check(queries.length === beforeHoneypot);
    process.env.CAREERS_DATABASE_URL = "postgres://mock.invalid/test";
    const available = await GET();
    check(available.status === 200 && (await available.json()).acceptingApplications);
    check(available.headers.get("Cache-Control") === "no-store");
    const success = await request(valid);
    check(success.status === 201 && (await success.json()).success);
    const insert = queries.find((query) => query.text.includes("INSERT INTO careers_proof_applications"));
    for (const value of [valid.name, valid.email, valid.role, valid.artifactUrl, valid.agency, valid.bsDetector, valid.microGate, valid.microGateResponse, microGates.systems.version]) {
      check(insert.values.includes(value));
    }
    check(queries.some((query) => query.text.includes("pg_advisory_xact_lock")));
    storage = "limited";
    check((await request(valid)).status === 429);
    storage = "failed";
    check((await request(valid)).status === 500);
    check(transactions === 3);
  } finally {
    console.error = originalError;
    if (savedDatabaseUrl === undefined) delete process.env.CAREERS_DATABASE_URL;
    else process.env.CAREERS_DATABASE_URL = savedDatabaseUrl;
  }
  console.log(`Passed ${checks} careers checks (validation and route persistence/error paths; database I/O mocked).`);
})().catch((error) => { console.error(error); process.exitCode = 1; });
