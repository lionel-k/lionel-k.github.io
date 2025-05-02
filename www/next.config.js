/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
