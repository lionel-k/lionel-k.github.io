import Link from "next/link";
import { ArrowRight, Book } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { LANGUAGES } from "@/lib/constants";
import { FAQ } from "@/components/FAQ";
import { languagesConfig } from "@/lib/languagesConfig";

const FAQ_ITEMS = [
  {
    question: "What languages are available?",
    answer:
      "We offer books in Kirundi, Kinyarwanda, and Lingala, paired with either English or French translations.",
  },
  {
    question: "Are the books suitable for children?",
    answer:
      "Yes! Our books are designed for readers of all ages, with a focus on family-friendly content that helps preserve African heritage.",
  },
  {
    question: "How do bilingual books work?",
    answer:
      "Each book features text in both an African language and either English or French, allowing readers to learn and compare both languages side by side.",
  },
];

const LANGUAGE_IMAGES = {
  kirundi: "/images/kirundi.png",
  kinyarwanda: "/images/kinyarwanda.png",
  lingala: "/images/lingala.png",
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-black py-20 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-3xl text-left">
            <h1 className="text-4xl font-bold tracking-tight text-[#DAA520] sm:text-6xl">
              The Guide to Sharing African Languages
            </h1>
            <h2 className="mt-6 text-lg leading-8 text-gray-300">
              Bilingual Books in Kirundi, Kinyarwanda, and Lingala — Connecting
              Families to African Heritage
            </h2>
            <div className="mt-10 flex items-center justify-start gap-x-6">
              <Link
                href="#languages"
                className="rounded-md bg-[#DAA520] px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#B8860B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DAA520]"
              >
                Browse Languages
              </Link>
              <Link
                href="/blog"
                className="flex items-center text-sm font-semibold leading-6 text-[#DAA520]"
              >
                Read our Blog <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section for Kirundi */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            Best Sellers in Kirundi
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {languagesConfig.kirundi.books
              .filter((book) => book.bestSeller)
              .map((book) => (
                <div
                  key={book.slug}
                  className="rounded-lg border p-4 text-center flex flex-col items-center"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="mb-4 w-48 h-48 object-cover rounded-md"
                  />
                  <h3 className="text-xl font-semibold mb-4">{book.title}</h3>
                  <p className="text-gray-600 mb-4">{book.description}</p>
                  <a
                    href={`https://www.amazon.com/dp/${book.slug}`}
                    className="mt-4 inline-block rounded-md bg-[#DAA520] px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#B8860B]"
                  >
                    Purchase on Amazon
                  </a>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section id="languages" className="py-16 bg-white">
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

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl">
            <FAQ items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

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
