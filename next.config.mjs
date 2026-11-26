import { readFileSync } from 'node:fs';
const researchPaths = JSON.parse(readFileSync(new URL('./lib/research-routes.json', import.meta.url), 'utf8'));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['ssh2'],
  },
  async redirects() {
    const articleAliases = {
      'how-tf32-changed-the-flow': 'tf32-rheology-flow',
      'bit-exact-triton-reactor-kernels': 'h100-bit-exact-triton',
      'when-scientific-ai-passes-the-wrong-test': 'when-scientific-ai-passes-the-wrong-test',
      'one-crystal-one-token': 'one-crystal-one-token',
      'antibody-tokenizer-rotation-invariance': 'antibody-tokenizer-rotation-invariance',
    };
    return [
      { source: '/blog', destination: '/engineering', statusCode: 301 },
      ...Object.entries(articleAliases).map(([oldSlug, slug]) => ({
        source: `/blog/${oldSlug}`, destination: `/engineering/${slug}`, statusCode: 301,
      })),
      ...Object.entries(articleAliases).filter(([oldSlug, slug]) => oldSlug !== slug).map(([oldSlug, slug]) => ({
        source: `/engineering/${oldSlug}`, destination: `/engineering/${slug}`, statusCode: 301,
      })),
      // New posts follow the engineering URL scheme; retain the private benchmark.
      { source: '/blog/:slug((?!lucan-scientific-performance$)[^/]+)', destination: '/engineering/:slug', statusCode: 301 },
    ];
  },
  async rewrites() {
    // Serve the pre-rendered library at clean public URLs. Existing research
    // articles, public PDFs and protected pages retain their main-site routes.
    const origin = '/research/library-content';
    const libraryRoutes = researchPaths.map((path) => ({
      source: path,
      destination: `${origin}${path.slice('/research'.length) || '/home'}.html`,
    }));
    const assetRoutes = ['papers', 'social', 'brand'].map((prefix) => ({
      source: `/research/${prefix}/:path*`,
      destination: `${origin}/${prefix}/:path*`,
    }));
    const publicFiles = ['app.js', 'styles.css', 'catalog.json', 'routes.json'].map((name) => ({
      source: `/research/${name}`,
      destination: `${origin}/${name}`,
    }));
    return {
      beforeFiles: [
        { source: '/', destination: '/shodh-new/index.html' },
        ...libraryRoutes, ...assetRoutes, ...publicFiles,
      ],
    };
  },
  async headers() {
    return [
      {
        source: '/shodh-new/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/shodh-new/vendor/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/shodh-new/Syne/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/shodh-new/main.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/shodh-new/fluid-config.json',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
      },
    ];
  },
};

export default nextConfig;
