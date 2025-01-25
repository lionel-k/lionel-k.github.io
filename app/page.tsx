import Link from "next/link";
import { ArrowRight, Book } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { LANGUAGES } from "@/lib/constants";
import { FAQ } from "@/components/FAQ";
import { languagesConfig } from "@/lib/languagesConfig";

const FAQ_ITEMS = [
  {
    question: "What languages do your books include?",
    answer:
      "We have books in Kirundi, Kinyarwanda, Lingala, and more. Each book is paired with English or French translations. We are adding more African languages all the time!",
  },
  {
    question: "Are your books good for children?",
    answer:
      "Yes! Our books are made for kids aged 2-10. They are also great for parents or caregivers who want to learn together with their kids.",
  },
  {
    question: "How do bilingual books work?",
    answer:
      "Each page has the same text in an African language and either English or French. This way, kids and parents can read and learn both languages side by side.",
  },
  {
    question: "Do I need to know the African language to use the books?",
    answer:
      "No! You don’t have to know the language. The books are made for parents and kids to learn together, even if you are not fluent.",
  },
  {
    question: "What types of books do you sell?",
    answer:
      "We have books like ‘First 100 Words,’ books on action verbs, animals, fruits and vegetables, and even coloring books. They help kids learn new words in a fun way.",
  },
  {
    question: "Can these books help my child connect with their heritage?",
    answer:
      "Yes! These books are all about celebrating African languages and cultures. They help kids learn about their roots and feel proud of their heritage.",
  },
  {
    question: "Can I buy your books anywhere in the world?",
    answer:
      "Yes, our books are sold on Amazon, so you can buy them worldwide. Amazon will handle delivery based on your location.",
  },
  {
    question: "Are these books only for African diaspora families?",
    answer:
      "No! These books are for anyone who wants to learn an African language or teach it to their family. If you love African culture, these books are for you.",
  },
  {
    question: "Are the translations correct?",
    answer:
      "Yes, all translations are carefully checked by native speakers to make sure they are accurate and reflect the language properly.",
  },
  {
    question: "What’s next for Lingu.africa?",
    answer:
      "We are working on adding more African languages and creating new books on different topics. Follow us for updates on what’s coming next!",
  },
  {
    question: "How can I share ideas or suggest a language to add?",
    answer:
      "We would love to hear from you! You can reach us through our website or social media to share your ideas or feedback.",
  },
  {
    question: "Can I see what the books look like before buying?",
    answer:
      "Yes! Many of our books on Amazon have a ‘Look Inside’ option, so you can preview a few pages before you buy.",
  },
  {
    question: "Do you have books for older kids or advanced learners?",
    answer:
      "Not yet. Right now, our books are for beginners and younger kids, but we plan to create more advanced books in the future.",
  },
  {
    question: "Can teachers use these books in classrooms?",
    answer:
      "Yes, many teachers use our books to teach African languages in schools, after-school programs, and community learning spaces.",
  },
  {
    question: "Are the pictures in the books relatable for diaspora kids?",
    answer:
      "Yes! Our pictures show children who look like kids in the African diaspora. The faces, hair, and skin tones help children feel seen and proud of their identity.",
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
