import Link from "next/link";
import { ArrowRight, Book, ChevronRight } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { LANGUAGES, FAQ_ITEMS, SITE_URL } from "@/lib/constants";
import { FAQ } from "@/components/FAQ";
import { languagesConfig } from "@/lib/languagesConfig";
import { OptimizedImage } from "@/components/OptimizedImage";
import { AmazonLink } from "@/components/AmazonLink";
import { getLatestBlogPosts } from "@/lib/blog";
import Head from "next/head";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lingu.Africa - Bilingual African Language Books",
  description:
    "Explore our collection of bilingual books in various African languages. Perfect for families worldwide.",
  openGraph: {
    title: "Lingu.Africa - Bilingual African Language Books",
    description:
      "Explore our collection of bilingual books in various African languages. Perfect for families worldwide.",
    url: SITE_URL,
    siteName: "Lingu.Africa",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
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
    images: [`${SITE_URL}/logo.png`],
    creator: "@lionel.kubwimana",
  },
};

export default async function Home() {
  // Get the latest 3 blog posts
  const latestPosts = await getLatestBlogPosts(3);

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
              {/* Pre-rendered h1 element to avoid CLS and improve LCP */}
              <h1
                className="text-5xl font-bold tracking-tight sm:text-7xl text-white font-display"
                style={{
                  textRendering: "optimizeSpeed",
                  display: "block",
                  contain: "paint",
                  willChange: "auto",
                  maxHeight: "999999px", // Prevent font boosting on mobile
                }}
                id="hero-heading"
              >
                Teach Your Children Their African Language
              </h1>
              <p className="mt-8 text-xl leading-8 text-gray-300 max-w-2xl mx-auto">
                Beautifully bilingual books that make learning fun and natural,
                no prior language experience needed!
              </p>
              <div className="mt-12 flex items-center justify-center gap-x-6">
                <Link
                  href="#languages"
                  className="flex items-center gap-2 rounded-full bg-[#DAA520] px-8 py-4 text-lg font-semibold text-black shadow-lg hover:bg-[#B8860B] transition-all transform hover:scale-105"
                  prefetch={true}
                >
                  <Book aria-hidden="true" className="h-6 w-6" />
                  <span>Explore Our Books</span>
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
                .map((book, index) => (
                  <div
                    key={book.slug}
                    className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#DAA520]/10 to-transparent rounded-2xl pointer-events-none" />
                    <AmazonLink
                      href={book.amazonUrl}
                      className="block mb-6 cursor-pointer"
                    >
                      <OptimizedImage
                        src={`/images/kirundi/${book.slug}/cover.webp`}
                        alt={`${book.title} cover`}
                        className="w-full h-64 object-contain transform group-hover:scale-105 transition-transform"
                        priority={index === 0}
                        width={320}
                        height={460}
                      />
                    </AmazonLink>
                    <h3 className="text-2xl text-center font-bold text-gray-900 mb-3">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-center mb-6">
                      {book.description.short}
                    </p>
                    <AmazonLink
                      href={book.amazonUrl}
                      className="mt-6 inline-flex items-center justify-center w-full py-3 px-6 text-lg font-semibold text-black bg-[#DAA520] rounded-lg hover:bg-[#B8860B] transition-all"
                    >
                      View on Amazon
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </AmazonLink>
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
                  <div className="absolute inset-0 opacity-10" />
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
        <section
          id="faq"
          className="py-20 bg-gradient-to-b from-white to-[#FAF8F5]"
        >
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

        {/* Reviews Section */}
        <section id="reviews" className="py-20 bg-[#FAF8F5] text-gray-900">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Amazon Reviews</h2>
              <p className="text-xl text-gray-600">
                Browse snapshots of what readers are sharing on Amazon!
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5].map((reviewNumber) => (
                <div
                  key={reviewNumber}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col"
                >
                  <OptimizedImage
                    src={`/images/reviews/${reviewNumber}.png`}
                    alt={`Amazon review screenshot ${reviewNumber}`}
                    className="w-full h-auto rounded-lg object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Blog Posts Section */}
        <section className="py-20 bg-white">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Related Blog Posts
              </h2>
              <p className="text-xl text-gray-600">
                Discover our latest insights on language learning and cultural
                diversity
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-[#8B4513] bg-[#DAA520]/20 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#DAA520] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow">
                        {post.description.length > 120
                          ? `${post.description.substring(0, 120)}...`
                          : post.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm text-gray-500">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="text-sm text-gray-500">
                          {post.readingTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-center text-black bg-[#F5A524] rounded-lg hover:bg-[#F5A524]/90 transition-colors"
              >
                View All Blog Posts
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-black text-white py-20">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Get Your Free Coloring Book
              </h2>
              <p className="text-xl text-gray-300">
                Subscribe to our newsletter and receive a free bilingual
                coloring book, available in an African language of your choice.
              </p>
            </div>
            <div className="mx-auto max-w-4xl">
              <NewsletterForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
