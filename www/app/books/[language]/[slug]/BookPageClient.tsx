"use client";

import Link from "next/link";
import { languagesConfig } from "@/lib/languagesConfig";
import { FAQ } from "@/components/FAQ";
import { NewsletterForm } from "@/components/newsletter-form";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { AmazonLink } from "@/components/AmazonLink";

type Book = {
  title: string;
  slug: string;
  amazonUrl: string;
  description: {
    short: string;
    long: string;
  };
  challenges: string[];
  whyChoose: string[];
  testimonials: string[];
  faq: { question: string; answer: string }[];
  age: string;
  pages: string;
  price: string;
};

function PurchaseCTA({ book, language }: { book: Book; language: string }) {
  return (
    <section className="relative py-8 bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
        <h3 className="text-2xl font-bold mb-6">
          Start Your Child's Bilingual Journey Today!
        </h3>
        <AmazonLink
          href={book.amazonUrl}
          className="inline-flex items-center justify-center rounded-full bg-gray-800 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105"
          bookSlug={book.slug}
        >
          Get Your Paperback Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </AmazonLink>
        <p className="mt-4 text-sm opacity-90">
          Amazon's 30-Day Return Policy • Premium Quality Paperback
        </p>
      </div>
    </section>
  );
}

type Props = {
  language: string;
  slug: string;
};

export default function BookPageClient({ language, slug }: Props) {
  if (!language || !slug) {
    return <div>Loading...</div>;
  }

  const languageData =
    languagesConfig[language.toLowerCase() as keyof typeof languagesConfig];
  const book = languageData?.books.find((b) => b.slug === slug) as Book;

  if (!book) {
    return <div>Book not found</div>;
  }

  book.challenges = book.challenges || [];
  book.whyChoose = book.whyChoose || [];
  book.testimonials = book.testimonials || [];
  book.faq = book.faq || [];

  return (
    <div className="flex flex-col">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav
        items={[
          { name: "Home", href: "/" },
          { name: "Books", href: "/books" },
          { name: languageData.name, href: `/books/${language}` },
          { name: book.title, href: `/books/${language}/${slug}` },
        ]}
      />
      {/* Hero Section - Dark Gradient from Home Page */}
      <section className="relative bg-black py-16 text-white overflow-hidden">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold sm:text-6xl bg-gradient-to-r from-[#DAA520] to-[#B8860B] bg-clip-text text-transparent leading-tight">
                {book.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                {book.description.long}
              </p>
              {/* Chips for Age, Pages, Price, and Availability */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center justify-center whitespace-nowrap bg-[#DAA520] text-black text-sm font-semibold px-3 py-1.5 rounded-full">
                  {book.age} years
                </span>
                <span className="inline-flex items-center justify-center whitespace-nowrap bg-[#DAA520] text-black text-sm font-semibold px-3 py-1.5 rounded-full">
                  {book.pages} pages
                </span>
                <span className="inline-flex items-center justify-center whitespace-nowrap bg-[#DAA520] text-black text-sm font-semibold px-3 py-1.5 rounded-full">
                  {book.price}
                </span>
                <span className="inline-flex items-center justify-center whitespace-nowrap bg-[#DAA520] text-black text-sm font-semibold px-3 py-1.5 rounded-full">
                  In Stock
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <AmazonLink href={book.amazonUrl} bookSlug={book.slug}>
                <OptimizedImage
                  src={`/images/${language}/${slug}/cover.png`}
                  alt={`${book.title} cover`}
                  className="w-full max-w-xs rounded-xl shadow-md"
                />
              </AmazonLink>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section - Gold Gradient */}
      <PurchaseCTA book={book} language={language} />
      {/* Look Inside the Book Section */}
      <section className="py-20 bg-gradient-to-b from-[#F5F2EC] to-[#FAF8F5]">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-4xl font-bold text-gray-900 mb-16">
            Look Inside the Book
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((page) => (
              <div
                key={page}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <OptimizedImage
                  src={`/images/${language}/${slug}/${page}.png`}
                  alt={`Interior page ${page} of ${book.title}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <PurchaseCTA book={book} language={language} />
      {/* Challenges Section - Light Gradient */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-4xl font-bold text-gray-900 mb-16">
            Challenges This Book Solves
          </h2>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {book.challenges.map((challenge, index) => {
              const [title, desc] = challenge.split(":");
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#DAA520]/10 to-transparent rounded-2xl pointer-events-none" />
                  <div className="relative flex flex-col items-center">
                    <div className="w-16 h-16 mb-6 rounded-xl bg-[#DAA520] flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                      {title || challenge}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-center">
                      {desc || ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* CTA Section - Gold Gradient */}
      <PurchaseCTA book={book} language={language} />
      {/* Why Choose Section - White to Light Gradient */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAF8F5]">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Why Readers Love Our Book
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {book.whyChoose.map((reason, index) => {
              const [title, desc] = reason.split(":");
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center"
                >
                  <div className="w-12 h-12 mb-4 bg-[#DAA520] rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                    {title || reason}
                  </h3>
                  <p className="text-gray-600 text-sm text-center">
                    {desc || ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Testimonials Section - Dark Gradient */}
      {false && (
        <section className="py-20 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] text-white">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
            <h2 className="text-center text-4xl font-bold mb-16">
              Hear From Happy Readers
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {book.testimonials.map((testimonial, index) => {
                const [name, detail] = testimonial.split("-");
                return (
                  <div
                    key={index}
                    className="bg-white/10 rounded-xl p-8 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="ml-4">
                        <p className="font-semibold">{name}</p>
                        <p className="text-sm text-gray-300">{detail || ""}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Gold Gradient */}
      <PurchaseCTA book={book} language={language} />
      {/* FAQ Section - Light Gradient */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAF8F5]">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl">
            <FAQ items={book.faq} />
          </div>
        </div>
      </section>
      {/* Final CTA Section */}
      <PurchaseCTA book={book} language={language} />
      {/* More Books Section */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              More {languageData.name} Books
            </h2>
            <p className="text-xl text-gray-600">
              Explore our other {languageData.name} books
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {languageData.books
              .filter((b) => b.slug !== slug)
              .slice(0, 3)
              .map((relatedBook) => (
                <div
                  key={relatedBook.slug}
                  className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Link
                    href={`/books/${language}/${relatedBook.slug}`}
                    rel="follow"
                    title={`View ${relatedBook.title} details`}
                  >
                    <OptimizedImage
                      src={`/images/${language}/${relatedBook.slug}/cover.png`}
                      alt={`${relatedBook.title} cover`}
                      className="mb-6 w-full h-48 object-contain transform group-hover:scale-105 transition-transform"
                    />
                  </Link>
                  <h3 className="text-xl text-center font-bold text-gray-900 mb-3">
                    {relatedBook.title}
                  </h3>
                  <Link
                    href={`/books/${language}/${relatedBook.slug}`}
                    rel="follow"
                    className="mt-4 inline-flex items-center justify-center w-full py-3 px-6 text-lg font-semibold text-black bg-[#DAA520] rounded-lg hover:bg-[#B8860B] transition-all"
                    title={`Read more about ${relatedBook.title}`}
                  >
                    Read More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* Newsletter Section - Dark (Black) */}
      <section className="bg-black text-white py-20">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Love {book.title}?
            </h2>
            <p className="text-xl text-gray-300">
              Subscribe to our newsletter for more {languageData.name} books
              like this one, exclusive reading guides, and a free bilingual
              coloring book!
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
