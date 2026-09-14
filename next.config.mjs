/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['ssh2'],
  },
  async redirects() {
    // Preserve published research URLs when the Biotechnology collection moves.
    return [
      { source: '/research/biotechnology', destination: '/industries/biotechnology', permanent: true },
      { source: '/biotechnology', destination: '/industries/biotechnology', permanent: true },
      { source: '/research/biomanufacturing-scale-up', destination: '/biotechnology/scale-up', permanent: true },
      ...Object.entries({
        'molecule-to-manufacturing': 'molecule-to-manufacturing',
        'car-t-manufacturing': 'cell-gene-therapy',
        'scale-up-valley-of-death': 'scale-up',
        'biologics-manufacturability': 'biologics-manufacturing',
        'purification-formulation-delivery': 'formulation-delivery',
      }).map(([legacy, current]) => ({
        source: `/research/biotechnology/${legacy}`,
        destination: `/biotechnology/${current}`,
        permanent: true,
      })),
    ];
  },
  async rewrites() {
    // Serve the marketing site directly at the canonical URL so crawlers read
    // the same document and content that visitors see.
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/shodh-new/index.html',
        },
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
