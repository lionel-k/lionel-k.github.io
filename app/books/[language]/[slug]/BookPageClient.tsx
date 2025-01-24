"use client";

import { useParams } from "next/navigation";
import { languagesConfig } from "@/lib/languagesConfig";
import { FAQ } from "@/components/FAQ";
import { NewsletterForm } from "@/components/newsletter-form";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";

type Book = {
  title: string;
  slug: string;
  description: string;
  cover: string;
  challenges: string[];
  whyChoose: string[];
  testimonials: string[];
  faq: { question: string; answer: string }[];
};

// Define a reusable CTA component
function PurchaseCTA({ slug }: { slug: string }) {
  return (
    <section className="bg-black text-white py-4">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
        <a
          href={`https://www.amazon.com/dp/${slug}`}
          className="inline-block rounded-md bg-[#DAA520] px-5 py-3 text-lg font-semibold text-black shadow-sm hover:bg-[#B8860B]"
        >
          Purchase on Amazon
        </a>
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
      <section className="relative bg-black py-20 text-white">
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

      {/* CTA Section after Hero */}
      <PurchaseCTA slug={book.slug} />

      {/* Challenges Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            Challenges this Book Solves
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {book.challenges.map((challenge, index) => (
              <div key={index} className="rounded-lg border p-4 text-center">
                {challenge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section after Challenges */}
      <PurchaseCTA slug={book.slug} />

      {/* Why Choose Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            Why Choose this Book?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {book.whyChoose.map((reason, index) => (
              <div key={index} className="rounded-lg border p-4 text-center">
                {reason}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            What Parents Are Saying
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {book.testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-lg border p-4 text-center">
                {testimonial}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section after Testimonials */}
      <PurchaseCTA slug={book.slug} />

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

      <PurchaseCTA slug={book.slug} />

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
