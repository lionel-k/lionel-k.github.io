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
        .filter(
          (file) => file.endsWith(".mdx") && !file.endsWith(".backup.mdx")
        )
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

    // Filter out future-dated posts only in production
    const filteredPosts =
      process.env.NODE_ENV === "production"
        ? posts.filter((post) => new Date(post.date) <= new Date())
        : posts;

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
    // Get all blog posts first to find adjacent posts
    const allPosts = await getAllBlogPosts();
    const currentPostIndex = allPosts.findIndex((post) => post.slug === slug);

    if (currentPostIndex === -1) {
      return null;
    }

    // Find the file that matches the pattern: YYYY-MM-DD-{slug}.mdx
    const files = await fs.readdir(BLOG_DIR);
    const blogFile = files.find((file) => {
      if (file.endsWith(".backup.mdx")) return false;
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
    const usedIds = new Set<string>();
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
            let id = textNode.value.toLowerCase().replace(/[^\w]+/g, "-");

            // Handle duplicate IDs
            let uniqueId = id;
            let counter = 1;
            while (usedIds.has(uniqueId)) {
              uniqueId = `${id}-${counter}`;
              counter++;
            }
            usedIds.add(uniqueId);

            node.data = { hProperties: { id: uniqueId } };
          }
        });
      })
      .process(mdxContent);
    const contentHtml = processedContent.toString();

    // Get adjacent posts information
    const adjacentPosts = {
      // Previous points to newer posts (higher index since posts are sorted by date desc)
      previous:
        currentPostIndex < allPosts.length - 1
          ? {
              slug: allPosts[currentPostIndex + 1].slug,
              title: allPosts[currentPostIndex + 1].title,
            }
          : undefined,
      // Next points to older posts (lower index)
      next:
        currentPostIndex > 0
          ? {
              slug: allPosts[currentPostIndex - 1].slug,
              title: allPosts[currentPostIndex - 1].title,
            }
          : undefined,
    };

    return {
      ...data,
      slug,
      date,
      content: contentHtml,
      tableOfContents,
      conclusion,
      adjacentPosts,
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
  const usedIds = new Set<string>();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // Count the number of # symbols
    const text = match[2].trim();
    let id = text.toLowerCase().replace(/[^\w]+/g, "-");

    // Handle duplicate IDs by appending a number
    let uniqueId = id;
    let counter = 1;
    while (usedIds.has(uniqueId)) {
      uniqueId = `${id}-${counter}`;
      counter++;
    }
    usedIds.add(uniqueId);

    headings.push({
      id: uniqueId,
      text,
      level,
    });
  }

  return headings;
}
