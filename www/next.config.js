/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com"],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
  },
  // Ensure static files are handled correctly
  distDir: ".next",
  assetPrefix: process.env.NODE_ENV === "production" ? "/_next" : "",
  generateBuildId: async () => {
    return "build-" + Date.now();
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: "raw-loader",
    });
    return config;
  },
  // Note: Custom headers don't work with output: export
  // These need to be configured in your hosting provider
};

module.exports = nextConfig;
