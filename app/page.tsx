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
      "We offer books in Kirundi, Kinyarwanda, Lingala, and more, paired with either English or French translations. We're continuously working to expand our collection to include more African languages.",
  },
  {
    question: "Are the books suitable for children?",
    answer:
      "Yes! Our books are designed for children aged 2-10, but they are also perfect for parents and caregivers who want to teach or learn alongside their kids.",
  },
  {
    question: "How do bilingual books work?",
    answer:
      "Each book features text in both an African language and either English or French, side by side. This makes it easy for children and adults to learn and compare both languages while enjoying fun illustrations.",
  },
  {
    question: "Do I need to know the African language to use these books?",
    answer:
      "No, you don’t! The bilingual format is designed to help both parents and children learn together, even if you're not fluent in the language.",
  },
  {
    question: "What kinds of books do you offer?",
    answer:
      "Our collection includes 'First 100 Words,' action verbs, animals, fruits and vegetables, and coloring books. They are perfect for building vocabulary and making learning fun.",
  },
  {
    question: "Can these books help my child connect with their heritage?",
    answer:
      "Absolutely. Our books are designed to celebrate African cultures and languages, helping children understand and connect with their roots through language and storytelling.",
  },
  {
    question: "Do you ship worldwide?",
    answer:
      "Since our books are sold through Amazon, they are available for purchase worldwide. Delivery options depend on Amazon’s shipping services in your region.",
  },
  {
    question: "Are these books only for African diaspora families?",
    answer:
      "No, they are for anyone who wants to learn an African language or introduce it to their family. Whether you're part of the diaspora or simply passionate about African cultures, our books are for you.",
  },
  {
    question: "How are the translations verified for accuracy?",
    answer:
      "All translations are carefully proofread and verified by native speakers to ensure accuracy and cultural authenticity in every book.",
  },
  {
    question: "What’s next for Lingu.africa?",
    answer:
      "We’re working to add more languages and expand our collection of books to include even more topics. Follow us for updates on new releases and projects!",
  },
  {
    question: "How can I give feedback or suggest a language to add?",
    answer:
      "We’d love to hear from you! You can contact us through our website or social media channels to share your suggestions or feedback.",
  },
  {
    question: "Can I see a preview before buying?",
    answer:
      "Yes! On Amazon, most of our books have a 'Look Inside' feature where you can preview a few pages to see how the bilingual format works.",
  },
  {
    question: "Do you have books for advanced learners or older children?",
    answer:
      "Right now, our focus is on beginner-friendly materials for younger children, but we’re planning to expand into more advanced books in the future.",
  },
  {
    question: "Can these books be used in schools or educational programs?",
    answer:
      "Yes, many teachers and educators use our books in classrooms to introduce African languages. They’re also great for after-school programs and community learning initiatives.",
  },
  {
    question: "Are the illustrations culturally relevant?",
    answer:
      "Our illustrations focus on children who resemble kids in the African diaspora, with skin tones, hair types, and facial features that reflect their identity. This helps children see themselves in the books and feel connected to their heritage. While the focus is on representation, the cultural setting and context remain inclusive and relatable for all families.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-black py-20 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-3xl text-left">
            <h1 className="text-4xl font-bold tracking-tight text-[#DAA520] sm:text-6xl">
              Bilingual African Language Books for Diaspora Families
            </h1>
            <h2 className="mt-6 text-lg leading-8 text-gray-300">
              Teach Your Kids Kirundi, Kinyarwanda, Lingala, and More — Connect
              to African Heritage
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
