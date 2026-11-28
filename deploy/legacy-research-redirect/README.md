# Legacy research hostname redirects

This directory keeps the old research host's redirect configuration in the same repository as the main website. It is a separate, redirect-only deployment; it does not serve the manuscript collection.

## Connect the existing host

The owner of the existing Vercel project `shodh-research` can connect the Git repository `shodh-ai/material_website` and set its Root Directory to:

```text
deploy/legacy-research-redirect
```

Use the Other framework preset, no install or build command, and `public` as the output directory. Deploy to production on that existing project, retaining its `research.shodh.ai` domain. Do not move the main site's project or create another research content deployment. Project credentials and local `.vercel` state must remain outside Git.

This configuration has not been connected to the old hosting project. The repository merge alone does not activate it.

## Routing

The host root and `/index.html` permanently redirect to `https://shodh.ai/research`. Sitemap and robots requests use the main-domain endpoints. Legacy `.html` paper links become clean paper URLs; remaining paper, PDF, and asset paths retain their path under `/research`. All rules use HTTP 301.

After the project owner deploys it, verify the actual HTTP status and Location header for `/`, a paper slug, an `.html` paper link, and a PDF. Confirm that the final destinations return successfully before retiring the old deployment.
