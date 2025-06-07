/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core configuration
  reactStrictMode: true,
  transpilePackages: ['@supabase/supabase-js'],
  output: 'standalone', // For Docker/Kubernetes deployments
  
  // Webpack configuration
  webpack: (config) => {
    // Disable problematic warnings
    config.module.exprContextCritical = false;
    config.ignoreWarnings = [
      { module: /@supabase\/realtime-js/ },
      { file: /node_modules\/@supabase/ }
    ];

    // Improve bundle performance
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 244 * 1024, // 244KB
    };

    return config;
  },

  // Security headers (optional but recommended)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ],
      },
    ];
  },

  // Supabase/SSR optimization
  experimental: {
    serverActions: {
      allowedOrigins: [
        process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/https?:\/\//, '') || 'localhost:3000',
        '*.vercel.app'
      ],
    },
    optimizePackageImports: [
      '@supabase/supabase-js',
      '@supabase/ssr'
    ],
  },

  // Environment variables
  env: {
    SUPABASE_WARNING_SUPPRESS: '1', // Suppresses Supabase warnings
  }
};

module.exports = nextConfig;