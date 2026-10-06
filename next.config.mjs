/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      // pdfjs-dist optionally requires node-canvas; not needed in the browser
      resolveAlias: { canvas: "./src/utils/emptyModule.ts" },
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude server-only packages from client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        winston: false,
        fs: false,
        net: false,
        tls: false,
      };
    }
    // pdfjs-dist optionally requires node-canvas; not needed in the browser
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
