export default function Loading() {
  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="h-12 w-48 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4" />
          <div className="h-6 w-96 bg-gray-200 rounded-lg animate-pulse mx-auto" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg"
            >
              <div className="relative h-48 w-full bg-gray-200 animate-pulse" />
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-3" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="mt-6 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                  <div className="ml-3">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1" />
                    <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
