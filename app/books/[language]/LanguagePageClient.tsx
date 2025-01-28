"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { languagesConfig } from "@/lib/languagesConfig";
import { NewsletterForm } from "@/components/newsletter-form";
import { FAQ } from "@/components/FAQ";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { ArrowRight } from "lucide-react";

export default function LanguagePageClient() {
  const { language } = useParams();

  if (!language || typeof language !== "string") {
    return <div>Loading...</div>;
  }

  const languageData =
    languagesConfig[language.toLowerCase() as keyof typeof languagesConfig];

  if (!languageData) {
    return <div>Language not found</div>;
  }

  const faqItems = languageData.faq;

  return (
    <div className="flex flex-col">
      {/* Breadcrumbs at the top */}
      <BreadcrumbNav
        items={[
          { name: "Home", href: "/" },
          { name: "Books", href: "/books" },
          { name: languageData.name, href: `/books/${language}` },
        ]}
      />

      {/* Hero Section - mirrored from Home Page */}
      <section className="relative bg-black py-28 text-white">
        <div className="absolute inset-0 opacity-10 pattern-cross pattern-[#DAA520] pattern-size-6 pointer-events-none" />
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-block bg-[#DAA520]/20 px-6 py-2 rounded-full text-[#DAA520] text-sm font-semibold">
              Learn & Celebrate {languageData.name}
            </div>
            <h1 className="text-5xl font-bold sm:text-7xl bg-gradient-to-r from-[#DAA520] to-[#B8860B] bg-clip-text text-transparent leading-[1.3]">
              {languageData.name} Bilingual Books
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-300 max-w-2xl mx-auto">
              Discover our collection of {languageData.name} books paired with
              English or French translations—perfect for families worldwide!
            </p>
          </div>
        </div>
      </section>

      {/* Featured Books Section - with light gradient background */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured {languageData.name} Books
            </h2>
            <p className="text-xl text-gray-600">
              Bilingual {languageData.name} &amp; English or French
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {languageData.books.map((book) => (
              <div
                key={book.title}
                className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Subtle gold overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#DAA520]/10 to-transparent rounded-2xl pointer-events-none" />
                <img
                  src={book.cover}
                  alt={`${book.title} cover`}
                  className="mb-6 w-full h-64 object-contain transform group-hover:scale-105 transition-transform"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {book.title}
                </h3>
                <p className="text-gray-600 mb-6">{book.description}</p>
                <Link
                  href={`/books/${language}/${book.slug}`}
                  className="mt-6 inline-flex items-center justify-center w-full py-3 px-6 text-lg font-semibold text-black bg-[#DAA520] rounded-lg hover:bg-[#B8860B] transition-all cursor-pointer"
                >
                  Read More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - also mirrors Home Page style */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAF8F5]">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {languageData.name} FAQ
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about our {languageData.name} books
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>

      {/* Newsletter Section - dark gradient, consistent with Home Page */}
      <section className="bg-black text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center bg-[url('/newsletter-pattern.svg')] bg-contain bg-no-repeat bg-center py-16">
            <div className="bg-black backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Stay Connected
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Sign up for updates on new {languageData.name} books, language
                tips, and more
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
