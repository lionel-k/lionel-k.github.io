import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { remark } from "remark";
import html from "remark-html";

interface BlogPostParams {
  params: {
    slug: string;
  };
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

  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <article className="container max-w-screen-xl mx-auto py-16">
      <header className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          {post.metadata.title}
        </h1>
        <p className="text-gray-500">
          By {post.metadata.author} ·{" "}
          {new Date(post.metadata.date).toLocaleDateString()}
        </p>
      </header>
      <div
        className="prose prose-lg mx-auto"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
