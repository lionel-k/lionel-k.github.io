import Link from "next/link";
import { ArrowRight, Book } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { LANGUAGES, FAQ_ITEMS } from "@/lib/constants";
import { FAQ } from "@/components/FAQ";
import { languagesConfig } from "@/lib/languagesConfig";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lingu.Africa - Bilingual African Language Books",
  description:
    "Explore our collection of bilingual books in various African languages. Perfect for families worldwide.",
  openGraph: {
    title: "Lingu.Africa - Bilingual African Language Books",
    description:
      "Explore our collection of bilingual books in various African languages. Perfect for families worldwide.",
    url: "https://www.lingu.africa/",
    siteName: "Lingu.Africa",
    images: [
      {
        url: "https://www.lingu.africa/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lingu.Africa - Bilingual African Language Books",
    description:
      "Explore our collection of bilingual books in various African languages. Perfect for families worldwide.",
    images: ["https://www.lingu.africa/logo.png"],
    creator: "@linguafrica",
  },
};

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-28 text-white overflow-hidden">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8 inline-block bg-[#DAA520]/20 px-6 py-2 rounded-full text-[#DAA520] text-sm font-semibold">
                Preserving African Heritage Through Language
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl bg-gradient-to-r from-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
                African Language Books That Connect Generations
              </h1>
              <p className="mt-8 text-xl leading-8 text-gray-300 max-w-2xl mx-auto">
                Beautiful bilingual books designed to help families teach
                African languages to children, regardless of prior language
                experience!
              </p>
              <div className="mt-12 flex items-center justify-center gap-x-6">
                <Link
                  href="#languages"
                  className="flex items-center gap-2 rounded-full bg-[#DAA520] px-8 py-4 text-lg font-semibold text-black shadow-lg hover:bg-[#B8860B] transition-all transform hover:scale-105"
                >
                  <Book className="h-6 w-6" />
                  Explore Our Books
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 opacity-10 pattern-cross pattern-[#DAA520] pattern-size-6" />
        </section>

        {/* Best Sellers Section */}
        <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Kirundi's Favorite Language Books
              </h2>
              <p className="text-xl text-gray-600">
                Trusted by 5,000+ families worldwide
              </p>
            </div>
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {languagesConfig.kirundi.books
                .filter((book) => book.bestSeller)
                .map((book) => (
                  <div
                    key={book.slug}
                    className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#DAA520]/10 to-transparent rounded-2xl pointer-events-none" />
                    <img
                      src={`/images/kirundi/${book.slug}/cover.png`}
                      alt={`${book.title} cover`}
                      className="mb-6 w-full h-64 object-contain transform group-hover:scale-105 transition-transform"
                    />
                    <h3 className="text-2xl text-center font-bold text-gray-900 mb-3">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-center mb-6">
                      {book.description.short}
                    </p>
                    <Link
                      target="_blank"
                      href={book.amazonUrl}
                      className="mt-6 inline-flex items-center justify-center w-full py-3 px-6 text-lg font-semibold text-black bg-[#DAA520] rounded-lg hover:bg-[#B8860B] transition-all cursor-pointer"
                    >
                      View on Amazon
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Languages Section */}
        <section id="languages" className="py-20 bg-[#0A0A0A] text-white">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Explore Our African Languages
              </h2>
              <p className="text-xl text-gray-300">
                Celebrating linguistic diversity across the continent. More
                African languages coming soon!
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {LANGUAGES.map((language) => (
                <div
                  key={language.slug}
                  className="relative bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] rounded-2xl p-8 border border-[#DAA520]/20 hover:border-[#DAA520]/40 transition-all"
                >
                  <div className="absolute inset-0 bg-[url('/african-pattern.svg')] opacity-10" />
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {language.name}
                    </h3>
                    {language.comingSoon ? (
                      <div className="mt-6">
                        <span className="inline-block mt-4 px-4 py-2 bg-[#DAA520]/20 text-[#DAA520] rounded-full text-sm font-medium">
                          Coming Soon
                        </span>
                      </div>
                    ) : (
                      <Link
                        href={`/books/${language.slug}`}
                        className="mt-6 inline-flex items-center justify-center w-full py-3 px-6 text-lg font-semibold text-black bg-[#DAA520] rounded-lg hover:bg-[#B8860B] transition-all"
                      >
                        Explore {language.name}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-b from-white to-[#FAF8F5]">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Your Questions Answered
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our bilingual books
              </p>
            </div>
            <div className="mx-auto max-w-4xl">
              <FAQ items={FAQ_ITEMS} />
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#FAF8F5] text-gray-900">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Amazon Reviews</h2>
              <p className="text-xl text-gray-600">
                Browse snapshots of what readers are sharing on Amazon!
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Review Image Card 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col">
                <img
                  src="/images/reviews/1.png"
                  alt="Amazon review screenshot 1"
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>

              {/* Review Image Card 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col">
                <img
                  src="/images/reviews/2.png"
                  alt="Amazon review screenshot 2"
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>

              {/* Review Image Card 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col">
                <img
                  src="/images/reviews/3.png"
                  alt="Amazon review screenshot 3"
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>

              {/* Duplicate or remove cards as necessary for more images */}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-black text-white">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-4xl text-center bg-contain bg-no-repeat bg-center py-8">
              <div className="bg-black backdrop-blur-sm rounded-3xl p-12">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Join Our Cultural Community
                </h3>
                <p className="text-xl text-gray-300 mb-8">
                  Get updates on new languages, exclusive discounts, and free
                  learning resources for African diaspora families
                </p>
                <NewsletterForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
