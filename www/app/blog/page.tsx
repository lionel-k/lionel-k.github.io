import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import BlogListingClient from "@/app/blog/BlogListingClient";
import { sharedMetadata } from "@/lib/metadata";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Blog | Lingu.Africa",
  description:
    "Discover expert insights and practical tips on language learning and cultural diversity. Learn strategies to master new languages and embrace cultures.",
  keywords: [
    "blog",
    "language learning",
    "cultural diversity",
    "education",
    "African languages",
    "bilingual learning",
  ],
  openGraph: {
    ...sharedMetadata.openGraph,
    title: "Blog | Lingu.Africa",
    description:
      "Discover expert insights and practical tips on language learning and cultural diversity. Learn strategies to master new languages and embrace cultures.",
    url: `${SITE_URL}/blog`,
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    ...sharedMetadata.twitter,
    title: "Blog | Lingu.Africa",
    description:
      "Discover expert insights and practical tips on language learning and cultural diversity. Learn strategies to master new languages and embrace cultures.",
  },
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
