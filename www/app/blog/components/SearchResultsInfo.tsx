interface SearchResultsInfoProps {
  searchQuery: string;
  resultsCount: number;
}

export default function SearchResultsInfo({
  searchQuery,
  resultsCount,
}: SearchResultsInfoProps) {
  if (!searchQuery) return null;

  return (
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600">
        {resultsCount === 0
          ? "No posts found"
          : `Found ${resultsCount} ${resultsCount === 1 ? "post" : "posts"}`}{" "}
        for "{searchQuery}"
      </p>
    </div>
  );
}
