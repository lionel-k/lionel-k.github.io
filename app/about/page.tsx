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
      "We are a team of passionate individuals dedicated to sharing African stories with the world.",
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
        <div className="container max-w-screen-xl mx-auto relative z-10">
          <div className="mx-auto max-w-3xl text-left">
            <h1 className="text-4xl font-bold tracking-tight text-[#DAA520] sm:text-6xl">
              About Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Learn more about our mission to connect people with African
              heritage through bilingual books.
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

      {/* About the Brand Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-screen-xl mx-auto">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            About the Brand
          </h2>
          <p className="text-center text-lg text-gray-600">
            Our brand is dedicated to preserving and promoting African heritage
            through bilingual books. We believe in the power of stories to
            connect people across cultures and generations.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-100">
        <div className="container max-w-screen-xl mx-auto">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            Our Story
          </h2>
          <p className="text-center text-lg text-gray-600">
            Founded by a passionate storyteller, our project began as a way to
            share the rich tapestry of African narratives with the world. Our
            founder's journey is one of discovery, connection, and a deep love
            for the diverse cultures of Africa.
          </p>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl">
            <FAQ items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-black py-16 text-white">
        <div className="container max-w-screen-xl mx-auto">
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
