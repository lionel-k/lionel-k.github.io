import { BlogPostMetadata } from "@/lib/types/blog";
import BlogPostCard from "./BlogPostCard";

interface BlogPostsGridProps {
  posts: BlogPostMetadata[];
}

export default function BlogPostsGrid({ posts }: BlogPostsGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
