import { useState, useMemo } from "react";
import { BlogPostMetadata } from "@/lib/types/blog";

export function useSearchPosts(posts: BlogPostMetadata[]) {
  const [searchQuery, setSearchQuery] = useState("");

  // Efficient filtering with useMemo to prevent unnecessary re-computations
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;

    const query = searchQuery.toLowerCase().trim();

    return posts.filter((post) => {
      // Search in title, description, category, and tags
      const searchableText = [
        post.title,
        post.description,
        post.category,
        ...(post.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [posts, searchQuery]);

  const clearSearch = () => setSearchQuery("");

  return {
    searchQuery,
    setSearchQuery,
    filteredPosts,
    clearSearch,
  };
}
