/** @type {import('next-sitemap').IConfig} */
const CANONICAL_URL = "https://lingu.africa";
const WWW_URL = "https://www.lingu.africa";

module.exports = {
  siteUrl: CANONICAL_URL,
  generateRobotsTxt: true,
  exclude: ["/404", "/500", "/_*", "/api/*", "/favicon.ico"],
  transform: async (config, path) => {
    // Skip excluded paths
    if (
      path.startsWith("/_") ||
      path.includes("/api/") ||
      path === "/404" ||
      path === "/500" ||
      path === "/favicon.ico"
    ) {
      return null;
    }

    // Return both canonical and non-canonical versions as separate entries
    return [
      {
        loc: `${CANONICAL_URL}${path}`,
        changefreq: "daily",
        priority: path === "/" ? 1.0 : 0.8,
        lastmod: new Date().toISOString(),
        alternateRefs: [
          {
            href: `${WWW_URL}${path}`,
            rel: "alternate",
          },
        ],
      },
      {
        loc: `${WWW_URL}${path}`,
        changefreq: "daily",
        priority: path === "/" ? 1.0 : 0.8,
        lastmod: new Date().toISOString(),
        alternateRefs: [
          {
            href: `${CANONICAL_URL}${path}`,
            rel: "canonical",
          },
        ],
      },
    ];
  },
  additionalPaths: async (config) => {
    // Return additional paths for both canonical and non-canonical
    const paths = ["/terms", "/privacy", "/about", "/books", "/"];
    return paths.flatMap((path) => [
      {
        loc: `${CANONICAL_URL}${path}`,
        changefreq: "daily",
        priority: path === "/" ? 1.0 : 0.8,
        lastmod: new Date().toISOString(),
        alternateRefs: [
          {
            href: `${WWW_URL}${path}`,
            rel: "alternate",
          },
        ],
      },
      {
        loc: `${WWW_URL}${path}`,
        changefreq: "daily",
        priority: path === "/" ? 1.0 : 0.8,
        lastmod: new Date().toISOString(),
        alternateRefs: [
          {
            href: `${CANONICAL_URL}${path}`,
            rel: "canonical",
          },
        ],
      },
    ]);
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/404", "/500", "/_*", "/api/*"],
      },
    ],
    additionalLines: ["# Host", `Host: ${CANONICAL_URL}`],
  },
};
