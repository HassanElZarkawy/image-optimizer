/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: [],
    formats: ['image/webp'],
  },
  // Move Sharp to server-only processing with proper configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't attempt to load node-specific modules on the client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        child_process: false,
        process: false,
        os: false,
        util: false,
        stream: false,
        zlib: false,
        crypto: false,
      };
    }

    return config;
  },
  // Add experimental configuration for properly handling Node.js modules
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
    outputFileTracingExcludes: {
      '*': [
        'node_modules/sharp/**/*',
      ],
    },
  },
}

module.exports = nextConfig
