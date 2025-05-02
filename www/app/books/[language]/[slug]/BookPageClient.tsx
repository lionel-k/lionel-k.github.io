"use client";

import Link from "next/link";
import { languagesConfig } from "@/lib/languagesConfig";
import { FAQ } from "@/components/FAQ";
import { NewsletterForm } from "@/components/newsletter-form";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { ArrowRight, Check, CircleDot } from "lucide-react";
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
  const trustIndicators = [
    "Amazon's 30-Day Return Policy",
    "Premium Quality Paperback",
    "Prime Shipping",
  ];

  return (
    <section className="relative py-12 bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Get Your Copy on Amazon Today!
          </h3>
          <p className="text-lg sm:text-xl mb-8 opacity-90">
            Inspire your child's bilingual journey with this beautifully
            illustrated paperback book.
          </p>
          <div className="flex flex-col items-center">
            <AmazonLink
              href={book.amazonUrl}
              className="w-full sm:w-auto bg-black hover:bg-black/90 text-white rounded-xl px-8 py-4 mb-8 inline-flex items-center justify-center text-lg font-semibold transition-all duration-300"
              bookSlug={book.slug}
            >
              Purchase on Amazon - {book.price}
              <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
            </AmazonLink>
            <div className="w-full flex flex-col sm:flex-row sm:justify-center items-start sm:items-center gap-3 sm:gap-6">
              {trustIndicators.map((text, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-4 h-4 mr-3 opacity-90" strokeWidth={2} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-3xl w-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#DAA520] to-[#B8860B] bg-clip-text text-transparent leading-tight mb-6">
                {book.title}
              </h1>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-start gap-2 sm:gap-3 mb-6">
                <span className="inline-flex items-center justify-center whitespace-nowrap bg-white/20 text-white text-sm font-medium px-3 md:px-4 py-2 rounded-lg">
                  Perfect for {book.age} years
                </span>
                <span className="inline-flex items-center justify-center whitespace-nowrap bg-white/20 text-white text-sm font-medium px-3 md:px-4 py-2 rounded-lg">
                  {book.pages} colorful pages
                </span>
                <span className="inline-flex items-center justify-center whitespace-nowrap bg-white/25 text-white text-sm font-medium px-3 md:px-4 py-2 rounded-lg">
                  <Check className="w-4 h-4 mr-1.5" />
                  In Stock
                </span>
                <span className="inline-flex items-center justify-center whitespace-nowrap bg-[#DAA520] text-black text-sm font-semibold px-4 md:px-5 py-2 rounded-lg">
                  {book.price} on Amazon
                </span>
              </div>
              <p className="text-lg md:text-xl leading-relaxed text-gray-300 mb-8">
                {book.description.long}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <AmazonLink
                  href={book.amazonUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-[#DAA520] px-6 md:px-8 py-4 text-base md:text-lg font-semibold text-black shadow-md hover:bg-[#B8860B] transition-all duration-300"
                  bookSlug={book.slug}
                >
                  View on Amazon
                  <ArrowRight className="ml-2 h-5 w-5" />
                </AmazonLink>
                <a
                  href="#preview"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-white/20 px-6 md:px-8 py-4 text-base md:text-lg font-semibold text-white hover:bg-white/10 transition-all duration-300"
                >
                  Preview Pages
                </a>
              </div>
            </div>
            <div className="flex-shrink-0 relative group w-full md:w-auto">
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <AmazonLink
                href={book.amazonUrl}
                bookSlug={book.slug}
                className="relative block"
              >
                <OptimizedImage
                  src={`/images/${language}/${slug}/cover.png`}
                  alt={`${book.title} cover - Click to view on Amazon`}
                  className="w-full max-w-[280px] mx-auto md:max-w-sm rounded-lg shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:translate-y-[-4px] group-hover:scale-105"
                />
              </AmazonLink>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section - Gold Gradient */}
      <PurchaseCTA book={book} language={language} />
      {/* Look Inside the Book Section */}
      <section
        id="preview"
        className="py-12 sm:py-20 bg-gradient-to-b from-[#F5F2EC] to-[#FAF8F5]"
      >
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Look Inside the Book
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Preview some of our beautifully illustrated pages that will
              captivate your child's imagination
            </p>
          </div>
          <div className="grid gap-4 sm:gap-8 md:grid-cols-3 mb-8 sm:mb-12">
            {[1, 2, 3].map((page) => (
              <div
                key={page}
                className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <AmazonLink
                    href={book.amazonUrl}
                    className="inline-flex items-center justify-center rounded-lg bg-white/95 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-black hover:bg-white transition-all duration-300"
                    bookSlug={book.slug}
                  >
                    View on Amazon
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AmazonLink>
                </div>
                <OptimizedImage
                  src={`/images/${language}/${slug}/${page}.png`}
                  alt={`Interior page ${page} of ${book.title} - Click to view on Amazon`}
                  className="w-full h-auto transition-all duration-500 group-hover:translate-y-[-4px] group-hover:scale-105"
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <AmazonLink
              href={book.amazonUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-[#DAA520] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-black shadow-md hover:bg-[#B8860B] transition-all duration-300"
              bookSlug={book.slug}
            >
              See More on Amazon
              <ArrowRight className="ml-2 h-5 w-5" />
            </AmazonLink>
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
