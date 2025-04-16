export default function Loading() {
  return (
    <div className="min-h-screen animate-in fade-in duration-300">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 py-4">
        <div className="h-6 w-64 bg-gray-800 rounded-lg animate-pulse" />
      </div>

      <div className="min-h-[calc(100vh-4rem)] flex flex-col max-w-lg mx-auto px-4 py-2">
        <div className="w-full bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] backdrop-blur-sm rounded-lg py-4 px-4 mb-4 text-center border border-[#DAA520]/20 animate-pulse">
          <div className="inline-flex items-center gap-3 justify-center">
            <div className="h-6 w-6 bg-[#DAA520] rounded-lg" />
            <div className="h-8 w-32 bg-gray-800 rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] animate-pulse"
            />
          ))}
        </div>

        <div className="mt-auto">
          <div className="h-12 w-full bg-gray-800 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
