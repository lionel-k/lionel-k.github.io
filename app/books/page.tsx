import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LANGUAGES } from "@/lib/constants";

export default function Books() {
  return (
    <div className="flex flex-col">
      {/* Hero Section (Dark) */}
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-28 text-white overflow-hidden">
        {/* Optionally reduce pattern opacity or remove it if you want less “darkness” */}
        <div className="absolute inset-0 opacity-5 pattern-cross pattern-[#DAA520] pattern-size-6 pointer-events-none" />

        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-block bg-[#DAA520]/20 px-6 py-2 rounded-full text-[#DAA520] text-sm font-semibold">
              Discover Bilingual African Language Books
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl bg-gradient-to-r from-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
              Our Books Collection
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-300 max-w-2xl mx-auto">
              Explore bilingual books for Kirundi, Kinyarwanda, Lingala, and
              more—no experience needed!
            </p>
          </div>
        </div>
      </section>

      {/* Languages Section (Light) */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-white text-gray-900">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Available African Languages
            </h2>
            <p className="text-xl text-gray-600">
              Discover the amazing languages of Africa!
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {LANGUAGES.map((language) => (
              <div
                key={language.slug}
                className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100"
              >
                {/* Optional subtle overlay/pattern if you want some texture */}
                <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('/african-pattern.svg')]" />

                <div className="relative">
                  <img
                    src={language.coverImage}
                    alt={`${language.name} cover`}
                    className="mb-6 w-full h-48 object-cover rounded-xl"
                  />
                  <h3 className="text-2xl font-bold mb-4">{language.name}</h3>

                  {language.comingSoon ? (
                    <div className="mt-6">
                      <span className="inline-block px-4 py-2 bg-[#DAA520]/20 text-[#DAA520] rounded-full text-sm font-medium">
                        Coming Soon
                      </span>
                    </div>
                  ) : (
                    <Link
                      href={`/books/${language.slug}`}
                      className="mt-6 inline-flex items-center justify-center w-full py-3 px-6 text-lg font-semibold text-black bg-[#DAA520] rounded-lg hover:bg-[#B8860B] transition-all"
                    >
                      View Collection
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
