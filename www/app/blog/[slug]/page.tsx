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

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const imageUrl = post.coverImage.startsWith("http")
      ? post.coverImage
      : `${baseUrl}${post.coverImage}`;

    // Common image metadata for both OpenGraph and Twitter
    const imageMetadata = {
      url: imageUrl,
      width: 1200,
      height: 600,
      alt: post.title,
      type: "image/webp",
      secureUrl: imageUrl.replace("http:", "https:"),
    };

    return {
      title: `${post.title}`,
      description: post.description,
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        url: `${baseUrl}/blog/${post.slug}`,
        publishedTime: post.date,
        authors: [authorName],
        siteName: "Lingu Africa",
        locale: "en_US",
        images: [imageMetadata],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        site: "@linguafrica",
        creator: "@linguafrica",
        images: [imageMetadata],
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
