# material_website

## Review the Biotechnology collection locally

Use Node.js 22 and npm (verified with Node 22.23.1 / npm 10.9.8). GitHub access to this repository is required.

```sh
git clone --branch codex/biotechnology-collection --single-branch https://github.com/shodh-ai/material_website.git
cd material_website
npm ci
npm run dev
```

Open http://localhost:3000/industries/biotechnology. If port 3000 is occupied, run `npm run dev -- --port 3001` and use port 3001 in the URL.

No environment variables, API keys or database are required to review the Biotechnology articles and interactive diagrams. Other site features such as contact submissions and private data rooms use separate services.

For a production-mode review, stop the development server, then run:

```sh
npm run build
npm run start
```

The five article routes are:

- `/biotechnology/molecule-to-manufacturing` — Platform Perspective
- `/biotechnology/cell-gene-therapy` — Application Perspective
- `/biotechnology/scale-up` — Technical Whitepaper
- `/biotechnology/biologics-manufacturing` — Application Perspective
- `/biotechnology/formulation-delivery` — Application Perspective

Each article expands its paired two-page document with the industry problem, physical-scale visual, technical explanation, evidence boundaries, references and manufacturing consequence. The five paired PDFs are delivered separately and are excluded from this branch. Python is not needed to run the website.

See [PDF authoring instructions](scripts/biotechnology/README.md) to regenerate documents and [reference verification](docs/biotechnology-reference-check.md) for the final editorial audit.
