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
          {
            href: `${CANONICAL_URL}${path}`,
            rel: "canonical",
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
            rel: "alternate",
          },
          {
            href: `${WWW_URL}${path}`,
            rel: "canonical",
          },
        ],
      },
    ];
  },
  additionalPaths: async (config) => {
    const { globby } = await import("globby");

    // Find all book and language paths
    const bookPaths = await globby(
      [
        "app/books/**/page.tsx",
        "app/books/**/route.ts",
        "!app/api/**/*",
        "!app/_*/**/*",
      ],
      {
        cwd: "www",
      }
    );

    // Convert file paths to URL paths
    const paths = bookPaths
      .map((page) => {
        return (
          "/" +
          page
            .replace("app/", "")
            .replace("/page.tsx", "")
            .replace("/route.ts", "")
            .replace(/\/\[.*?\]/g, "/*") // Replace dynamic segments with *
            .replace(/^index$/, "")
        ); // Replace index with empty string for root
      })
      .filter(Boolean);

    // Return both versions for each path
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
          {
            href: `${CANONICAL_URL}${path}`,
            rel: "canonical",
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
            rel: "alternate",
          },
          {
            href: `${WWW_URL}${path}`,
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
