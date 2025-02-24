import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import BlogListingClient from "@/app/blog/BlogListingClient";

export const metadata: Metadata = {
  title: "Blog - Lingu Africa",
  description:
    "Discover expert insights and practical tips on language learning and cultural diversity. Learn strategies to master new languages and embrace cultures.",
};

// This function tells Next.js to pre-render the blog listing page
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="min-h-screen">
      <section className="relative bg-gradient-to-b from-[#F5F2EC] to-[#FAF8F5] py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 text-gray-900">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600">
              Discover insights about language learning, culture, and education
            </p>
          </div>
          <BlogListingClient posts={posts} />
        </div>
      </section>
    </main>
  );
}
