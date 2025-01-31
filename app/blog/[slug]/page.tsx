import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { remark } from "remark";
import remarkGfm from "remark-gfm"; // ❶ Add GFM for bold, tables, etc.
import html from "remark-html";

interface BlogPostParams {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: BlogPostParams): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Not Found",
      description: "The page you're looking for doesn't exist.",
    };
  }
  return {
    title: post.metadata.title,
    description: post.metadata.excerpt,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.excerpt,
      type: "article",
      publishedTime: post.metadata.date,
      authors: [post.metadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.excerpt,
    },
  };
}

export default async function BlogPost({ params }: BlogPostParams) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  // ❷ Convert Markdown -> HTML, including GFM features
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(post.content);

  const contentHtml = processedContent.toString();

  return (
    <article className="mx-auto max-w-screen-md px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-3">
          {post.metadata.title}
        </h1>
        <p className="text-sm text-gray-500 sm:text-base">
          By {post.metadata.author} &middot;{" "}
          {new Date(post.metadata.date).toLocaleDateString()}
        </p>
      </header>

      {/* ❸ The "prose" class from Tailwind Typography ensures nice markdown styling */}
      <div
        className="prose prose-lg sm:prose-xl mx-auto text-gray-800"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
