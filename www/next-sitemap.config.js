/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.lingu.africa",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  priority: 0.7,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/api/*"],
      },
    ],
  },
};
