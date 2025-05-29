"use client";

import { BlogPostMetadata } from "@/lib/types/blog";
import { useSearchPosts } from "./hooks/useSearchPosts";
import SearchBar from "./components/SearchBar";
import SearchResultsInfo from "./components/SearchResultsInfo";
import BlogPostsGrid from "./components/BlogPostsGrid";
import EmptyState from "./components/EmptyState";

interface BlogListingClientProps {
  posts: BlogPostMetadata[];
}

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  const { searchQuery, setSearchQuery, filteredPosts, clearSearch } =
    useSearchPosts(posts);

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={clearSearch}
        />
        <SearchResultsInfo
          searchQuery={searchQuery}
          resultsCount={filteredPosts.length}
        />
      </div>

      {/* Results Section */}
      {filteredPosts.length === 0 ? (
        <EmptyState searchQuery={searchQuery} onClearSearch={clearSearch} />
      ) : (
        <BlogPostsGrid posts={filteredPosts} />
      )}
    </div>
  );
}
