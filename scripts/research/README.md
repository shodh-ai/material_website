# Main-domain research library

`material_website` is the maintained source for research publishing. The previous standalone research checkout is retained as an archive; it is not needed to build or serve this website.

## Content and routes

- `public/research/library-content/catalog.json`: public manuscript metadata and download paths.
- `public/research/library-content/papers/`: manuscript PDFs, extracted text, reports, and bibliography files.
- `scripts/research/`: page generator, styles, client-side filtering, and presentation overrides.
- `lib/research-routes.json`: clean research routes, also used by the main sitemap.
- `next.config.mjs`: local rewrites from `/research` and paper URLs to generated HTML and assets.
- `app/engineering/` and `app/blog/posts/`: static Next.js engineering pages and article content.

The main website serves research HTML and downloads directly. No request to the old research host is required.

## Publish an update

1. Add the approved PDF and supporting files under `public/research/library-content/`, and update `catalog.json`. Preserve existing download paths and reviewed document bytes.
2. Update `presentation.json` here if the paper needs a display override, and add its clean URL to `lib/research-routes.json`.
3. Run `npm run research:build` from the repository root. This uses Python 3 with no third-party Python dependencies.
4. Review and commit the generated HTML and asset changes with their sources, then use the normal website build/deployment (`npm run build`).

The generator sets canonical and social metadata under `https://shodh.ai/research`. Engineering articles keep their existing asset URLs.

The LUCAN-10B manuscript is the unmodified 17-page PDF under `papers/lucan-10b/`. Its preview comes from Figure 1. The earlier physical-intelligence whitepaper retains its existing main-site URL.

## Old hostname

The optional [redirect deployment](../../deploy/legacy-research-redirect/README.md) is in this same repository. The owner of the existing `shodh-research` hosting project must connect that directory to activate the redirects. The main-domain research pages are independent of that deployment.
