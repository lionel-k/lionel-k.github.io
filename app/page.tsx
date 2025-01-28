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
      "No! You don't have to know the language. The books are made for parents and kids to learn together, even if you are not fluent.",
  },
  {
    question: "What types of books do you sell?",
    answer:
      "We have books like 'First 100 Words,' books on action verbs, animals, fruits and vegetables, and even coloring books. They help kids learn new words in a fun way.",
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
    question: "What's next for Lingu.africa?",
    answer:
      "We are working on adding more African languages and creating new books on different topics. Follow us for updates on what's coming next!",
  },
  {
    question: "How can I share ideas or suggest a language to add?",
    answer:
      "We would love to hear from you! You can reach us through our website or social media to share your ideas or feedback.",
  },
  {
    question: "Can I see what the books look like before buying?",
    answer:
      "Yes! Many of our books on Amazon have a 'Look Inside' option, so you can preview a few pages before you buy.",
  },
  {
    question: "Do you have books for older kids or advanced learners?",
    answer:
      "Yes, for Kirundi we offer advanced books like 'The Kirundi Proverb Treasury,' 'The Kirundi Joke Treasury,' and more, which are perfect for teens, adults, and anyone wanting a deeper connection to the language. For other African languages, we're focusing on beginner-friendly books right now, but we're adding more advanced titles over time. Stay tuned for updates!",
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
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-28 text-white overflow-hidden">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-block bg-[#DAA520]/20 px-6 py-2 rounded-full text-[#DAA520] text-sm font-semibold">
              Preserving African Heritage Through Language
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl bg-gradient-to-r from-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
              African Language Books That Connect Generations
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-300 max-w-2xl mx-auto">
              Beautiful bilingual books helping diaspora families teach Kirundi,
              Kinyarwanda, and Lingala to children - no language experience
              needed!
            </p>
            <div className="mt-12 flex items-center justify-center gap-x-6">
              <Link
                href="#languages"
                className="flex items-center gap-2 rounded-full bg-[#DAA520] px-8 py-4 text-lg font-semibold text-black shadow-lg hover:bg-[#B8860B] transition-all transform hover:scale-105"
              >
                <Book className="h-6 w-6" />
                Explore Our Books
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 pattern-cross pattern-[#DAA520] pattern-size-6" />
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Kirundi's Favorite Language Books
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by 5,000+ families worldwide
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {languagesConfig.kirundi.books
              .filter((book) => book.bestSeller)
              .map((book) => (
                <div
                  key={book.slug}
                  className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#DAA520]/10 to-transparent rounded-2xl pointer-events-none" />
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="mb-6 w-full h-64 object-contain transform group-hover:scale-105 transition-transform"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{book.description}</p>
                  <Link
                    href={book.amazonUrl}
                    className="mt-6 inline-flex items-center justify-center w-full py-3 px-6 text-lg font-semibold text-black bg-[#DAA520] rounded-lg hover:bg-[#B8860B] transition-all cursor-pointer"
                  >
                    View on Amazon
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section id="languages" className="py-20 bg-[#0A0A0A] text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Explore Our African Languages
            </h2>
            <p className="text-xl text-gray-300">
              Celebrating linguistic diversity across the continent
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {LANGUAGES.map((language) => (
              <div
                key={language.slug}
                className="relative bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] rounded-2xl p-8 border border-[#DAA520]/20 hover:border-[#DAA520]/40 transition-all"
              >
                <div className="absolute inset-0 bg-[url('/african-pattern.svg')] opacity-10" />
                <div className="relative">
                  <img
                    src={language.coverImage}
                    alt={language.name}
                    className="mb-6 w-full h-48 object-cover rounded-xl"
                  />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {language.name}
                  </h3>
                  {language.comingSoon ? (
                    <div className="mt-6">
                      <span className="inline-block mt-8 px-4 py-2 bg-[#DAA520]/20 text-[#DAA520] rounded-full text-sm font-medium">
                        Coming Soon
                      </span>
                    </div>
                  ) : (
                    <Link
                      href={`/books/${language.slug}`}
                      className="mt-6 inline-flex items-center justify-center w-full py-3 px-6 text-lg font-semibold text-black bg-[#DAA520] rounded-lg hover:bg-[#B8860B] transition-all"
                    >
                      Explore {language.name}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAF8F5]">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Questions Answered
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our bilingual books
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <FAQ items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-black text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center bg-[url('/newsletter-pattern.svg')] bg-contain bg-no-repeat bg-center py-8">
            <div className="bg-black backdrop-blur-sm rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Join Our Cultural Community
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Get updates on new languages, exclusive discounts, and free
                learning resources for African diaspora families
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
