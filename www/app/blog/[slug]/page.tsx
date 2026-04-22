import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import BlogPostClient from "@/app/blog/[slug]/BlogPostClient";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";
import { getTruncatedTitle, getTruncatedDescription } from "@/lib/metadata";
import type { BlogPost } from "@/lib/types/blog";

function getBlogPostPublicUrls(post: BlogPost) {
  const baseUrl = new URL(SITE_URL).origin;
  const authorName =
    typeof post.author === "string" ? post.author : post.author.name;
  const imageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${baseUrl}${post.coverImage}`;
  // Match Next.js trailingSlash: true and alternates.canonical
  const articleUrl = `${baseUrl}/blog/${post.slug}/`;
  return { baseUrl, articleUrl, imageUrl, authorName };
}

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

    const { baseUrl, articleUrl, imageUrl, authorName } =
      getBlogPostPublicUrls(post);

    const imageMetadata = {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: post.title,
    };

    const metaTitle = getTruncatedTitle(post.title);
    const metaDescription = getTruncatedDescription(post.description);

    return {
      title: metaTitle,
      description: metaDescription,
      metadataBase: new URL(baseUrl),
      authors: [{ name: authorName }],
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        url: articleUrl,
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
      alternates: {
        canonical: articleUrl,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
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

    const { articleUrl, imageUrl, authorName } = getBlogPostPublicUrls(post);

    const blogPostingJsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: imageUrl,
      author: {
        "@type": "Person" as const,
        name: authorName,
      },
      publisher: {
        "@type": "Organization" as const,
        name: "Lingu Africa",
      },
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: {
        "@type": "WebPage" as const,
        "@id": articleUrl,
      },
    };

    return (
      <>
        <Script
          id={`blogpost-schema-${post.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogPostingJsonLd),
          }}
        />
        <BlogPostClient post={post} />
      </>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    notFound();
  }
}
