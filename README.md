# Shodh website

This is the maintained repository for the company website, research library, and engineering articles.

- Company website: https://shodh.ai
- Formal papers and technical reports: https://shodh.ai/research
- Engineering articles: https://shodh.ai/engineering

## Development

```sh
npm install
npm run dev
```

## Research publishing

The complete research library lives in this repository. Update the catalog and manuscript assets in `public/research/library-content/`, then regenerate the static pages:

```sh
npm run research:build
npm run build
```

The research generator needs Python 3 and its standard library. Commit the regenerated pages with their source changes so the regular website deployment serves them directly. See [the research publishing guide](scripts/research/README.md) for routes and content locations.

Engineering content lives in `app/blog/posts/` and is served by `app/engineering/`. Keep existing PDF and image paths when updating articles.

## Legacy research hostname

`research.shodh.ai` is still attached to its existing hosting project. The redirect-only deployment configuration is maintained in [deploy/legacy-research-redirect](deploy/legacy-research-redirect/README.md). It must be connected to that project before the old hostname redirects; merging repository content does not change DNS or hosting settings.
