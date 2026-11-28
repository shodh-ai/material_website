# Proof-of-work careers applications

The four roles and versioned micro-gates are defined in `lib/careers-application.ts`. The form on `/careers` posts to `/api/careers`. It uses the existing server-only `CAREERS_DATABASE_URL` connection; credentials must stay outside Git.

Applications are saved in the same careers database, in `careers_proof_applications`. The first successful submission creates the table and source/time index if needed. Existing internship and founder-associate records are retained in their original tables.

The hiring team can review these columns in its existing database dashboard:

- `name`, `email`, `role`, `artifact_url`
- `entrepreneurial_agency`, `bs_detector`
- `micro_gate`, `micro_gate_version`, `micro_gate_response`
- `created_at`

The role identifier maps to one of the four roles in `lib/careers-application.ts`. Challenge versions preserve which prompt an applicant answered. Review the artifact and responses manually; the website does not score candidates or make hiring decisions. URL validation checks public HTTP(S) URL syntax and rejects local/reserved/example addresses; it does not fetch the URL or verify authorship.

Both the browser and server require all answers and enforce 120-word limits on the agency and BS-detector fields. The micro-gate asks for four sentences (Systems/GPU) or three falsification tests (ML/Science); answer quality and format are reviewed by the team. Wildcard applicants can choose either challenge. Resume uploads are not requested.

The API records a salted hash of the request source for rate limiting, plus the user agent. Five submissions per source per 15 minutes are allowed, with serialization for concurrent requests. Honeypot submissions are discarded. Success is returned only after persistence, except for the bot honeypot response. Save failures leave the applicant's answers on the page for retry.

`GET /api/careers` provides a read-only, uncached availability check. It returns only `acceptingApplications`; it never returns records or credentials.

Run `npm run test:careers` for validation and API tests. Database I/O is mocked so tests do not create candidate records. Run `npm run build` for production compilation and type checks.
