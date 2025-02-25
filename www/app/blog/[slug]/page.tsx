import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "@/app/blog/[slug]/BlogPostClient";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";

interface StaticParams {
  slug: string;
}

export async function generateStaticParams(): Promise<StaticParams[]> {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface Props {
  params: Promise<StaticParams>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const post = await getBlogPost(resolvedParams.slug);

    if (!post) {
      return {
        title: "Post Not Found - Lingu Africa",
      };
    }

    const authorName =
      typeof post.author === "string" ? post.author : post.author.name;

    return {
      title: `${post.title}`,
      description: post.description,
      metadataBase: new URL(
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      ),
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}`,
        publishedTime: post.date,
        authors: [authorName],
        images: [
          {
            url: post.coverImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: [post.coverImage],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error - Lingu Africa",
    };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  try {
    const post = await getBlogPost(resolvedParams.slug);

    if (!post) {
      notFound();
    }

    return <BlogPostClient post={post} />;
  } catch (error) {
    console.error("Error loading blog post:", error);
    notFound();
  }
}
