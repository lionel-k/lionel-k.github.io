import { BlogPost, BlogPostMetadata } from "./types/blog";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

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

    return {
      ...data,
      slug,
      content: mdxContent,
    } as BlogPost;
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    return null;
  }
}

export function generateTableOfContents(content: string) {
  const headings = content.match(/^##\s+(.+)$/gm) || [];
  return headings.map((heading) => {
    const text = heading.replace(/^##\s+/, "").trim();
    return {
      id: text.toLowerCase().replace(/[^\w]+/g, "-"),
      text,
      level: 2,
    };
  });
}
