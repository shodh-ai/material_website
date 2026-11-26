# Main-domain research library

Formal papers are pre-rendered HTML in `public/research/library-content`. Clean URLs are mapped by `lib/research-routes.json` and `next.config.mjs`. Engineering posts are static Next.js pages in `app/engineering` using the existing content in `app/blog/posts`. Blog asset URLs are retained.

Run `python3 scripts/research/publish.py` after editing the public catalog or presentation metadata. The generator preserves PDF and report bytes, builds paper pages and the collection, and sets main-domain canonical and social metadata. Add new manuscript paths to `lib/research-routes.json`; the sitemap imports that list.

The LUCAN-10B manuscript is the unmodified 17-page PDF under `papers/lucan-10b/`. Its preview comes from Figure 1. The earlier physical-intelligence whitepaper retains its existing main-site URL.

The old `research.shodh.ai` host is a separate Vercel project; permanent redirects require its publishing login. The main site needs no proxy or origin bypass.
