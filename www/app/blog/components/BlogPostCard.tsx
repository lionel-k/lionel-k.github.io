import Image from "next/image";
import Link from "next/link";
import { BlogPostMetadata } from "@/lib/types/blog";

interface BlogPostCardProps {
  post: BlogPostMetadata;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col">
      <Link href={`/blog/${post.slug}`} title={post.title}>
        <div className="relative aspect-[4/3] w-full mb-6 overflow-hidden rounded-xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span>•</span>
          <span>{post.readingTime}</span>
          <span>•</span>
          <span className="text-gray-600 text-sm font-medium">
            {post.category}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#DAA520] transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 line-clamp-2">{post.description}</p>
      </Link>
    </article>
  );
}
