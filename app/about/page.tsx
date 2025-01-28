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
];

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-black py-20 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#DAA520] sm:text-6xl">
              About Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Learn more about our mission to connect people with African
              heritage through bilingual books.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-100">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            My Story
          </h2>
          <p className="text-center text-lg text-gray-600">
            Hi, I'm Lionel, and I'm from Burundi. When I was a kid, I didn't
            think much about my language or culture. Everyone around me spoke
            Kirundi, and it was just a normal part of life. But when I moved to
            France for school, I realized how much my language and roots meant
            to me. One day, I met a Burundian girl who had grown up abroad. She
            told me she didn't speak Kirundi very well and felt out of place
            when she was with other Burundians. She was kind, but you could see
            it hurt her. That stayed with me. Years later, I became a dad. I
            wanted my daughter to grow up proud of her roots and her language.
            But when I looked for books in Kirundi to teach her, I couldn't find
            any. That's when I decided to write my own. This journey started
            with a simple goal: to help kids like my daughter connect to their
            heritage. But now, it's grown into something bigger. I want to help
            families across the African diaspora pass on their languages and
            keep their culture alive.
          </p>
        </div>
      </section>

      {/* About the Brand Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            About Lingu.Africa
          </h2>
          <p className="text-center text-lg text-gray-600">
            Lingu.africa is a place for families who want to keep their African
            languages alive. We create bilingual picture books that celebrate
            African languages and culture. These books help kids learn their
            mother tongue while growing up in a new world. Our mission is
            simple: keep their African languages alive. We create bilingual
            picture books that celebrate African languages and culture. These
            books help kids learn their mother tongue while growing up in a new
            world. Our mission is simple: to make sure African kids, no matter
            where they live, grow up proud of their roots. Language is more than
            just words. It's stories, songs, and traditions. It's a connection
            to home. Whether you speak Kirundi, Swahili, Yoruba, or any other
            African language, our books are here to help. They're for parents,
            grandparents, and families who want to give their kids the gift of
            language and identity. Let's make sure the next generation never
            loses their roots. One word, one story, one book at a time.
          </p>
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
