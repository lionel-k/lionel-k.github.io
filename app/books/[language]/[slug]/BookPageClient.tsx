"use client";

import { useParams } from "next/navigation";
import { languagesConfig } from "@/lib/languagesConfig";
import { FAQ } from "@/components/FAQ";
import { NewsletterForm } from "@/components/newsletter-form";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { ArrowRight } from "lucide-react";

type Book = {
  title: string;
  slug: string;
  amazonUrl: string;
  description: string;
  cover: string;
  challenges: string[];
  whyChoose: string[];
  testimonials: string[];
  faq: { question: string; answer: string }[];
};

function PurchaseCTA({ amazonUrl }: { amazonUrl: string }) {
  return (
    <section className="relative py-8 bg-gradient-to-r from-[#DAA520] to-[#B8860B]">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
        <h3 className="text-2xl font-bold text-white mb-6">
          Start Your Child's Bilingual Journey Today!
        </h3>
        <a
          href={amazonUrl}
          className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105"
        >
          Get Your Paperback Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
        <p className="mt-4 text-sm text-white opacity-90">
          Amazon's 30-Day Return Policy • Premium Quality Paperback
        </p>
      </div>
    </section>
  );
}
export default function BookPageClient() {
  const { language, slug } = useParams();

  if (
    !language ||
    !slug ||
    typeof language !== "string" ||
    typeof slug !== "string"
  ) {
    return <div>Loading...</div>;
  }

  const languageData =
    languagesConfig[language.toLowerCase() as keyof typeof languagesConfig];
  const book = languageData?.books.find((b) => b.slug === slug) as Book;

  if (!book) {
    return <div>Book not found</div>;
  }

  // Initialize arrays if they don't exist
  book.challenges = book.challenges || [];
  book.whyChoose = book.whyChoose || [];
  book.testimonials = book.testimonials || [];
  book.faq = book.faq || [];

  return (
    <div className="flex flex-col">
      <BreadcrumbNav
        items={[
          { name: "Home", href: "/" },
          { name: "Books", href: "/books" },
          { name: languageData.name, href: `/books/${language}` },
          { name: book.title, href: `/books/${language}/${slug}` },
        ]}
      />
      {/* Hero Section */}
      <section className="relative bg-black py-8 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-3xl text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-bold tracking-tight text-[#DAA520] sm:text-6xl">
              {book.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {book.description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <img
              src={book.cover}
              alt={`${book.title} cover`}
              className="w-full max-w-xs rounded-lg"
            />
          </div>
        </div>
      </section>

      <PurchaseCTA amazonUrl={book.amazonUrl} />

      {/* Challenges Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-4xl font-bold text-gray-900 mb-16">
            Challenges This Book Solves
          </h2>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {book.challenges.map((challenge, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#DAA520]/10 to-transparent rounded-2xl" />
                <div className="relative">
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {challenge.split(":")[0]}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {challenge.split(":")[1] || challenge}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section after Challenges */}
      <PurchaseCTA amazonUrl={book.amazonUrl} />

      {/* Why Choose Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Why Parents Love Our Book
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {book.whyChoose.map((reason, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 mb-4 bg-[#DAA520] rounded-lg mx-auto flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {reason.split(":")[0]}
                </h3>
                <p className="text-gray-600 text-sm">
                  {reason.split(":")[1] || reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-4xl font-bold mb-16">
            Hear From Happy Parents
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {book.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-xl p-8 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.split("-")[0]}</p>
                    <p className="text-sm text-gray-300">
                      {testimonial.split("-")[1]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section after Testimonials */}
      <PurchaseCTA amazonUrl={book.amazonUrl} />

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl">
            <FAQ items={book.faq} />
          </div>
        </div>
      </section>

      <PurchaseCTA amazonUrl={book.amazonUrl} />

      {/* Newsletter Section */}
      <section className="bg-black text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
