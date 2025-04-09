import Link from "next/link";
import { LANGUAGES } from "@/lib/constants";

export default function FlashcardsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Choose a Language to Learn</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {LANGUAGES.map((language) => (
          <Link
            key={language.slug}
            href={`/flashcards/${language.slug}`}
            className="block p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
          >
            <h2 className="text-xl font-semibold">{language.name}</h2>
            {language.comingSoon && (
              <span className="inline-block mt-2 px-2 py-1 text-sm bg-gray-100 rounded">
                Coming Soon
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
