import Link from "next/link";
import { formatDate } from "@/lib/utils";

const BLOG_POSTS = [
  {
    slug: "importance-of-bilingual-education",
    title: "The Importance of Bilingual Education for African Children",
    excerpt:
      "Discover how bilingual education can help preserve cultural heritage while preparing children for a global future.",
    date: "2024-03-20",
    author: "Dr. Sarah Johnson",
    category: "Education",
  },
  {
    slug: "preserving-african-languages",
    title: "Preserving African Languages Through Literature",
    excerpt:
      "Learn about the vital role of literature in keeping African languages alive for future generations.",
    date: "2024-03-15",
    author: "Prof. Jean-Pierre Kabila",
    category: "Culture",
  },
  {
    slug: "teaching-tips-bilingual-books",
    title: "Teaching Tips: Using Bilingual Books at Home",
    excerpt:
      "Practical strategies for parents to make the most of bilingual books in their children's education.",
    date: "2024-03-10",
    author: "Maria Ndayishimiye",
    category: "Parenting",
  },
];

export const metadata = {
  title: "Blog | African Stories",
  description:
    "Explore articles about African literature, language learning, and cultural preservation.",
};

export default function BlogPage() {
  return (
    <div className="container max-w-screen-xl mx-auto py-16">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col rounded-lg border border-gray-200 p-6"
          >
            <div className="flex-1">
              <p className="text-sm text-gray-500">
                {formatDate(new Date(post.date))} · {post.category}
              </p>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="mt-2 text-xl font-semibold hover:text-[#DAA520]">
                  {post.title}
                </h2>
              </Link>
              <p className="mt-3 text-gray-600">{post.excerpt}</p>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-500">By {post.author}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
