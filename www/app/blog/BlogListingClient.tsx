"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogPostMetadata } from "@/lib/types/blog";

interface BlogListingClientProps {
  posts: BlogPostMetadata[];
}

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02]"
        >
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between bg-white p-6">
            <div className="flex-1">
              <p className="text-sm font-medium text-primary">
                {post.category}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">
                {post.title}
              </h3>
              <p className="mt-3 text-base text-gray-500 line-clamp-3">
                {post.description}
              </p>
            </div>
            <div className="mt-6">
              <div className="flex items-center text-sm text-gray-500">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span className="mx-2">•</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
