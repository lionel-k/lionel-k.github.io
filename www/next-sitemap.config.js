/** @type {import('next-sitemap').IConfig} */
const CANONICAL_URL = "https://lingu.africa";

module.exports = {
  siteUrl: CANONICAL_URL,
  generateRobotsTxt: true,
  exclude: ["/404", "/500"], // Add any paths you want to exclude
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    // Only include canonical URLs (without www)
    const url = new URL(path, CANONICAL_URL);

    // Return the canonical version of the URL
    return {
      loc: url.toString(), // This ensures the URL is properly formatted
      changefreq: "daily",
      priority: path === "/" ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    };
  },
};
