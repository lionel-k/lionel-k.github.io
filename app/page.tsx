import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { LANGUAGES } from "@/lib/constants";

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
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#DAA520] sm:text-6xl">
              Discover African Stories in Multiple Languages
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Explore our collection of bilingual books featuring Kirundi,
              Kinyarwanda, and Lingala. Perfect for families wanting to connect
              with African heritage and language.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/en/books"
                className="rounded-md bg-[#DAA520] px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#B8860B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DAA520]"
              >
                Browse Books
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

      {/* Languages Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            Available African Languages
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {LANGUAGES.map((language) => (
              <div
                key={language}
                className="rounded-lg border border-gray-200 p-8 text-center"
              >
                <img
                  src={LANGUAGE_IMAGES[language.toLowerCase()]}
                  alt={`${language} book`}
                  className="mb-4 w-full h-32 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mb-4 capitalize">
                  {language}
                </h3>
                <p className="text-gray-600">
                  Discover our collection of {language} books, available with
                  English and French translations.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl">
            <div className="divide-y divide-gray-200">
              {FAQ_ITEMS.map((item, index) => (
                <div key={index} className="py-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-black py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#DAA520]">
              Get Your Free Coloring Book
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Subscribe to our newsletter and receive a free printable coloring
              book featuring African art and culture.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
