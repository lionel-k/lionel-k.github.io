import { getAllBlogPosts } from "@/lib/blog";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRssDate(isoDate: string): string {
  const d = new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(isoDate) ? `${isoDate}T12:00:00.000Z` : isoDate
  );
  return d.toUTCString();
}

export async function GET() {
  const posts = await getAllBlogPosts();
  const base = SITE_URL.replace(/\/$/, "");
  const siteLink = `${base}/`;

  const items = posts
    .map((post) => {
      const url = new URL(`/blog/${post.slug}`, `${base}/`).href;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${toRssDate(post.date)}</pubDate>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
    </item>`;
    })
    .join("\n");

  const lastBuildDate =
    posts.length > 0
      ? toRssDate(posts[0].date)
      : new Date().toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${escapeXml(siteLink)}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
