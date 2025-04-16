export default function Loading() {
  return (
    <div className="min-h-screen animate-in fade-in duration-300">
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-16 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="h-12 w-48 bg-gray-800 rounded-lg animate-pulse mx-auto" />
            <div className="mt-4 h-6 w-96 bg-gray-800 rounded-lg animate-pulse mx-auto" />
            <div className="mt-8 h-10 w-64 bg-gray-800 rounded-lg animate-pulse mx-auto" />
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-[#0A0A0A]">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-video rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-8 animate-pulse"
              >
                <div className="h-8 w-32 bg-gray-800 rounded-lg mb-3" />
                <div className="h-4 w-full bg-gray-800 rounded-lg mb-2" />
                <div className="h-4 w-3/4 bg-gray-800 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
