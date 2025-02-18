import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import {
  getBlogPost,
  generateTableOfContents,
  getAllBlogPosts,
} from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";

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

interface Props {
  params: {
    slug: string;
  };
}

// This function tells Next.js which paths to pre-render
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found - Lingu Africa",
    };
  }

  return {
    title: `${post.title} - Lingu Africa Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
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
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  // Generate table of contents from the content
  const tableOfContents = generateTableOfContents(post.content);

  // Add table of contents to the post
  const postWithToc = {
    ...post,
    tableOfContents,
  };

  return <BlogPostClient post={postWithToc} />;
}
