import Link from "next/link";
import { LANGUAGES } from "@/lib/constants";

export default function Languages() {
  return (
    <div className="flex flex-col">
      {/* Languages Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            Available African Languages
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {LANGUAGES.map((language) => (
              <div
                key={language.slug}
                className="rounded-lg border border-gray-200 p-8 text-center"
              >
                <img
                  src={language.coverImage}
                  alt={`${language.name} book`}
                  className="mb-4 w-32 h-32 object-cover rounded-md mx-auto"
                />
                <h3 className="text-xl font-semibold mb-4 capitalize">
                  {language.name}
                </h3>
                <p className="text-gray-600">{language.discoverBooks}</p>
                {language.comingSoon ? (
                  <span className="mt-4 inline-block rounded-md bg-gray-400 px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm cursor-not-allowed">
                    Coming Soon
                  </span>
                ) : (
                  <Link
                    href={`/books/${language.slug}`}
                    className="mt-4 inline-block rounded-md bg-[#DAA520] px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#B8860B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DAA520]"
                  >
                    View Books Collection
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
