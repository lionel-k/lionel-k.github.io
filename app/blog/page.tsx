import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog | Lingu.Africa",
  description:
    "Explore articles about African literature, language learning, and cultural preservation.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container max-w-screen-xl mx-auto py-16">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col rounded-lg border border-gray-200 p-6"
          >
            <div className="flex-1">
              <p className="text-sm text-gray-500">
                {formatDate(new Date(post.metadata.date))} ·{" "}
                {post.metadata.category}
              </p>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="mt-2 text-xl font-semibold hover:text-[#DAA520]">
                  {post.metadata.title}
                </h2>
              </Link>
              <p className="mt-3 text-gray-600">{post.metadata.excerpt}</p>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-500">By {post.metadata.author}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
