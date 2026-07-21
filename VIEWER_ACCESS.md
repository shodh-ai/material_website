# Private viewer access

The homepage (`/`), Founders Associate application (`/founders-associate` and
its submission API), and the assets under `/shodh-new/` are public. Every other
page, API, and direct file is denied by default.

Set `VIEWER_ACCESS_RULES` in the deployment environment to a JSON object whose
keys are private viewing codes and whose values are the exact route/file
prefixes that code may access. Codes must be at least 16 characters long.

Example:

```text
VIEWER_ACCESS_RULES={"replace-with-a-long-random-code":["/investor/data-room","/pdf","/pre-prints","/Shodh_Industrial_Validation_Portfolio_Final_Polished.pdf"]}
```

Generate each code independently:

```sh
openssl rand -hex 24
```

Send a viewer the normal page URL. They will be redirected to `/access`, enter
their code, and receive an `HttpOnly`, `SameSite=Strict` cookie valid for eight
hours. A code can access only its configured paths. Use `"*"` only for a trusted
internal administrator and never for an external viewer.

For a private page with files from `public/`, list those file paths or
directories in the same rule.

Changing or removing a code in the deployment environment revokes it on the
next deployment. Existing cookies stop working because the middleware checks
the code against the environment on every request.
