interface EmptyStateProps {
  searchQuery: string;
  onClearSearch: () => void;
}

export default function EmptyState({
  searchQuery,
  onClearSearch,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-lg text-gray-600">
        {searchQuery
          ? "No blog posts match your search."
          : "No blog posts found."}
      </p>
      {searchQuery && (
        <button
          onClick={onClearSearch}
          className="mt-4 text-[#DAA520] hover:text-[#B8941F] font-medium transition-colors"
        >
          Clear search
        </button>
      )}
    </div>
  );
}
