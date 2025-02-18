/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.lingu.africa",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*"],
      },
    ],
  },
};
