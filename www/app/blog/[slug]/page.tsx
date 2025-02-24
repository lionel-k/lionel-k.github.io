import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "@/app/blog/[slug]/BlogPostClient";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";
import { BlogPost } from "@/lib/types/blog";

// This would typically come from your API or content management system
const SAMPLE_POST: BlogPost = {
  slug: "mastering-a-new-language",
  title: "Mastering a New Language: Effective Strategies for Success",
  description:
    "Discover proven techniques and strategies to accelerate your language learning journey and achieve fluency faster.",
  category: "Language Learning",
  coverImage: "/blog/mastering-language-learning.jpg",
  author: {
    name: "Sarah Johnson",
    avatar: "/authors/sarah-johnson.jpg",
    bio: "Language learning expert with over 10 years of experience in teaching multiple languages",
  },
  date: "2024-02-20",
  tableOfContents: [
    { id: "power-of-immersion", text: "The Power of Immersion", level: 2 },
    {
      id: "creating-immersive-environment",
      text: "Creating an Immersive Environment",
      level: 3,
    },
    {
      id: "memory-techniques",
      text: "Memory Techniques for Vocabulary",
      level: 2,
    },
    { id: "spaced-repetition", text: "The Spaced Repetition System", level: 3 },
    { id: "word-association", text: "Word Association Method", level: 3 },
    {
      id: "consistent-routine",
      text: "Building a Consistent Routine",
      level: 2,
    },
    { id: "speaking-day-one", text: "Speaking from Day One", level: 2 },
  ],
  highlights: [
    "Understand the importance of immersion in language learning",
    "Learn effective memory techniques for vocabulary retention",
    "Discover how to build a consistent learning routine",
    "Master the art of speaking from day one",
  ],
  content: "...", // This would be the actual MDX content
  cta: {
    text: "Start Your Language Learning Journey",
    link: "/books",
  },
  tags: [
    "language learning",
    "education",
    "self-improvement",
    "study techniques",
  ],
  readingTime: "8 min read",
  conclusion:
    "Remember that language learning is a journey, not a destination. By implementing these strategies consistently, you'll be well on your way to achieving fluency in your target language.",
};

type PageParams = { slug: string };

export async function generateStaticParams(): Promise<PageParams[]> {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  try {
    const resolvedParams = await params;
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
