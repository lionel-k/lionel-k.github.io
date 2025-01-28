import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { FAQ } from "@/components/FAQ";

const FAQ_ITEMS = [
  {
    question: "What is the purpose of this site?",
    answer:
      "Our mission is to preserve and promote African heritage through bilingual books.",
  },
  {
    question: "Who are we?",
    answer:
      "We are a team of passionate individuals dedicated to sharing Lingu.Africa with the world.",
  },
  {
    question: "How can you support us?",
    answer:
      "You can support us by purchasing our books, sharing our content, and subscribing to our newsletter.",
  },
  {
    question: "What inspired the creation of Lingu.Africa?",
    answer:
      "Lingu.Africa was inspired by a desire to help children connect with their African heritage through language and culture.",
  },
  {
    question: "Who is behind Lingu.Africa?",
    answer:
      "Lingu.Africa was founded by Lionel, who is passionate about preserving African languages and culture.",
  },
  {
    question: "How can I support Lingu.Africa's mission?",
    answer:
      "You can support us by purchasing our books, sharing our content, and subscribing to our newsletter.",
  },
  {
    question: "What makes Lingu.Africa's books unique?",
    answer:
      "Our books are bilingual, celebrating African languages and culture, and are designed to help children learn their mother tongue.",
  },
  {
    question: "Can I contribute to Lingu.Africa's mission?",
    answer:
      "Yes, we welcome contributions and ideas. Please reach out to us through our website or social media.",
  },
];

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-28 text-white overflow-hidden">
        {/* Pattern Overlay (optional) */}
        <div className="absolute inset-0 opacity-10 pattern-cross pattern-[#DAA520] pattern-size-6 pointer-events-none" />

        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-block bg-[#DAA520]/20 px-6 py-2 rounded-full text-[#DAA520] text-sm font-semibold">
              Connecting Generations Through Language
            </div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-300 max-w-2xl mx-auto">
              Learn more about our mission to connect people with African
              heritage through bilingual books.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-white text-gray-900">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-4xl font-bold mb-4">My Story</h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            A personal journey that sparked a bigger mission
          </p>
          <div className="max-w-3xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <p>
              Hi, I'm Lionel, and I'm from Burundi. When I was a kid, I didn't
              think much about my language or culture. Everyone around me spoke
              Kirundi, and it was just a normal part of life. But when I moved
              to France for school, I realized how much my language and roots
              meant to me.
            </p>
            <p>
              One day, I met a Burundian girl who had grown up abroad. She told
              me she didn't speak Kirundi very well and felt out of place when
              she was with other Burundians. She was kind, but you could see it
              hurt her. That stayed with me.
            </p>
            <p>
              Years later, I became a dad. I wanted my daughter to grow up proud
              of her roots and her language. But when I looked for books in
              Kirundi to teach her, I couldn't find any. That's when I decided
              to write my own.
            </p>
            <p>
              This journey started with a simple goal: to help kids like my
              daughter connect to their heritage. But now, it's grown into
              something bigger. I want to help families across the African
              diaspora pass on their languages and keep their culture alive.
            </p>
          </div>
        </div>
      </section>

      {/* About the Brand Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAF8F5] text-gray-900">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-4xl font-bold mb-4">
            About Lingu.Africa
          </h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            Where language and culture intertwine
          </p>
          <div className="max-w-3xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <p>
              Lingu.africa is a place for families who want to keep their
              African languages alive. We create bilingual picture books that
              celebrate African languages and culture. These books help kids
              learn their mother tongue while growing up in a new world.
            </p>
            <p>
              Our mission is simple: to make sure African kids, no matter where
              they live, grow up proud of their roots. Language is more than
              just words. It's stories, songs, and traditions. It's a connection
              to home.
            </p>
            <p>
              Whether you speak Kirundi, Swahili, Yoruba, or any other African
              language, our books are here to help. They're for parents,
              grandparents, and families who want to give their kids the gift of
              language and identity.
            </p>
            <p className="text-lg leading-relaxed font-medium text-[#DAA520]">
              Let's make sure the next generation never loses their roots. One
              word, one story, one book at a time.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-white text-gray-900">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            Everything you need to know
          </p>
          <div className="mx-auto max-w-3xl">
            <FAQ items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] py-20 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center bg-[url('/newsletter-pattern.svg')] bg-contain bg-no-repeat bg-center py-16">
            <div className="bg-[#DAA520]/10 backdrop-blur-sm rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Stay Connected
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Get the latest updates on new book releases and exclusive
                resources
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
