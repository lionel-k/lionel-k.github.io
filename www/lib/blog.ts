import { BlogPost, BlogPostMetadata, TableOfContents } from "./types/blog";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function getAllBlogPosts(): Promise<BlogPostMetadata[]> {
  try {
    const files = await fs.readdir(BLOG_DIR);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const content = await fs.readFile(path.join(BLOG_DIR, file), "utf8");
          const { data } = matter(content);
          return {
            ...data,
            slug: file.replace(/\.mdx$/, ""),
          } as BlogPostMetadata;
        })
    );

    // Sort posts by date in descending order
    return posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error("Error getting blog posts:", error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const content = await fs.readFile(filePath, "utf8");
    const { data, content: mdxContent } = matter(content);

    // Generate table of contents from raw MDX content
    const tableOfContents = generateTableOfContents(mdxContent);

    // Convert MDX content to HTML
    const processedContent = await remark().use(html).process(mdxContent);
    const contentHtml = processedContent.toString();

    return {
      ...data,
      slug,
      content: contentHtml,
      tableOfContents,
    } as BlogPost;
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    return null;
  }
}

export function generateTableOfContents(content: string): TableOfContents[] {
  // Match both ## and ### headings
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TableOfContents[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // Count the number of # symbols
    const text = match[2].trim();
    headings.push({
      id: text.toLowerCase().replace(/[^\w]+/g, "-"),
      text,
      level,
    });
  }

  return headings;
}
