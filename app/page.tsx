import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { LANGUAGES } from "@/lib/constants";
import { FAQ } from "@/components/FAQ";

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
              Discover Lingu.Africa in Multiple Languages
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Explore our collection of bilingual books featuring Kirundi,
              Kinyarwanda, and Lingala. Perfect for families wanting to connect
              with African heritage and language.
            </p>
            <div className="mt-10 flex items-center justify-start gap-x-6">
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
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            Available African Languages
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {LANGUAGES.map((language) => {
              const languageKey =
                language.toLowerCase() as keyof typeof LANGUAGE_IMAGES;

              return (
                <div
                  key={language}
                  className="rounded-lg border border-gray-200 p-8 text-center"
                >
                  <img
                    src={LANGUAGE_IMAGES[languageKey]}
                    alt={`${language} book`}
                    className="mb-4 w-32 h-32 object-cover rounded-md mx-auto"
                  />
                  <h3 className="text-xl font-semibold mb-4 capitalize">
                    {language}
                  </h3>
                  <p className="text-gray-600">
                    Discover our collection of {language} books, available with
                    English and French translations.
                  </p>
                  <Link
                    href={`/books/${languageKey}`}
                    className="mt-4 inline-block rounded-md bg-[#DAA520] px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#B8860B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DAA520]"
                  >
                    View Books Collection
                  </Link>
                </div>
              );
            })}
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
