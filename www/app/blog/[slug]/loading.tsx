export default function Loading() {
  return (
    <article className="min-h-screen">
      {/* Hero section with cover image */}
      <div className="relative h-[60vh] min-h-[400px] w-full bg-gray-200 animate-pulse" />

      <div className="container px-4 mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />

          {/* Meta information */}
          <div className="mt-8 flex items-center justify-between border-b border-gray-200 pb-8">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
              <div className="ml-3">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1" />
                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Key Highlights */}
          <div className="mt-8 rounded-lg bg-gray-50 p-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-4 w-full bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Table of Contents */}
          <div className="mt-8 rounded-lg border border-gray-200 p-6">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"
                  style={{ marginLeft: `${Math.floor(index / 2) * 1}rem` }}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="mt-8 space-y-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-4 w-full bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>

          {/* Conclusion */}
          <div className="mt-12 rounded-lg bg-gray-50 p-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-20 w-full bg-gray-200 rounded animate-pulse" />
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <div className="h-12 w-48 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>

          {/* Tags */}
          <div className="mt-12 flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
