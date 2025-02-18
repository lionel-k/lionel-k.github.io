import { BlogPost, BlogPostMetadata, TableOfContents } from "./types/blog";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { visit, SKIP } from "unist-util-visit";

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
          // Extract date and slug from filename (YYYY-MM-DD-slug.mdx)
          const [year, month, day, ...slugParts] = file
            .replace(/\.mdx$/, "")
            .split("-");
          const date = `${year}-${month}-${day}`;
          const slug = slugParts.join("-");
          return {
            ...data,
            slug,
            date,
          } as BlogPostMetadata;
        })
    );

    // Filter out future-dated posts
    const filteredPosts = posts.filter((post) => {
      return new Date(post.date) <= new Date();
    });

    // Sort posts by date in descending order
    return filteredPosts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error("Error getting blog posts:", error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // Find the file that matches the pattern: YYYY-MM-DD-{slug}.mdx
    const files = await fs.readdir(BLOG_DIR);
    const blogFile = files.find((file) => {
      const [year, month, day, ...slugParts] = file
        .replace(/\.mdx$/, "")
        .split("-");
      return slugParts.join("-") === slug;
    });

    if (!blogFile) {
      return null;
    }

    const filePath = path.join(BLOG_DIR, blogFile);
    const content = await fs.readFile(filePath, "utf8");
    const { data, content: mdxContent } = matter(content);

    // Extract date from filename
    const [year, month, day] = blogFile.replace(/\.mdx$/, "").split("-");
    const date = `${year}-${month}-${day}`;

    // Generate table of contents from raw MDX content
    const tableOfContents = generateTableOfContents(mdxContent);

    // Extract conclusion from the content
    const conclusionMatch = mdxContent.match(
      /## Conclusion\s+([\s\S]+?)(?=\n##|$)/
    );
    const conclusion = conclusionMatch ? conclusionMatch[1].trim() : "";

    // Convert MDX content to HTML with heading IDs
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .use(() => (tree) => {
        let foundFirstH1 = false;
        visit(tree, "heading", (node: any, index: number, parent: any) => {
          // Remove the first h1 heading
          if (node.depth === 1 && !foundFirstH1) {
            parent.children.splice(index, 1);
            foundFirstH1 = true;
            return [SKIP, index];
          }
          // Add IDs to remaining headings
          const textNode = node.children.find(
            (child: any) => child.type === "text"
          );
          if (textNode) {
            const id = textNode.value.toLowerCase().replace(/[^\w]+/g, "-");
            node.data = { hProperties: { id } };
          }
        });
      })
      .process(mdxContent);
    const contentHtml = processedContent.toString();

    return {
      ...data,
      slug,
      date,
      content: contentHtml,
      tableOfContents,
      conclusion,
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
