import { NewsletterForm } from "@/components/newsletter-form";
import { FAQ } from "@/components/FAQ";
import { Metadata } from "next";
import { pagesMetadata, sharedMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  ...pagesMetadata.about,
};

const FAQ_ITEMS = [
  {
    question: "What is the purpose of Lingu.Africa?",
    answer:
      "Our mission is to preserve African languages and culture by creating bilingual and trilingual books that help families connect to their roots while making learning fun and accessible for all ages.",
  },
  {
    question: "Who is Lionel Kubwimana?",
    answer:
      "Lionel Kubwimana, the founder of Lingu.Africa, is a Burundian author dedicated to preserving African heritage. As a father and member of the African diaspora, he creates books to help families reconnect with their cultural roots.",
  },
  {
    question: "Who are these books for?",
    answer:
      "Our books are perfect for families in the African diaspora, language learners, and anyone curious about African culture. They are ideal for kids aged 2-10 but also include advanced titles for teens and adults.",
  },
  {
    question: "How are the books created, and are the translations accurate?",
    answer:
      "Each book is created in collaboration with native language experts to ensure translations are accurate and culturally authentic. The books are carefully designed with bright illustrations and easy-to-follow layouts for a fun learning experience.",
  },
  {
    question: "Can I return a book if I don't like it?",
    answer:
      "Yes! All purchases are managed through Amazon, which has a simple return policy. If you're not satisfied, you can return your book and receive a refund by following Amazon's steps.",
  },
  {
    question: "How do these books help with learning and cultural connection?",
    answer:
      "Our books use bilingual or trilingual text alongside colorful illustrations to make learning easy and fun. They help families build language skills together while fostering pride in their heritage and cultural roots.",
  },
  {
    question: "Can I see what the books look like before buying?",
    answer:
      "Yes! Many of our books have a 'Look Inside' feature on Amazon, where you can preview a few pages. Our website also includes sample images for you to explore before purchasing.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery times depend on your location. Amazon provides an estimated delivery date during checkout, and you can track your package to know when it will arrive.",
  },
  {
    question: "Do you offer books for advanced learners?",
    answer:
      "Yes, we offer advanced titles like 'The Kirundi Joke Treasury' and 'The Kirundi Proverb Treasury,' perfect for teens, adults, and anyone wanting to deepen their understanding of Kirundi. More advanced books for other languages are coming soon!",
  },
  {
    question: "Can teachers use these books in classrooms?",
    answer:
      "Absolutely! Our books are great for teaching African languages and culture in schools, community programs, and after-school activities. They are easy to use and engaging for students of all ages.",
  },
];

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero Section (Dark Gradient) */}
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-28 text-white overflow-hidden">
        {/* Optional pattern overlay with low opacity */}
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
              Discover Lingu.Africa, where we create bilingual children's books
              to celebrate African languages and culture, helping kids worldwide
              connect with their heritage.
            </p>
          </div>
        </div>
      </section>

      {/* My Story Section (Light Gradient) */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-[#F5F2EC] text-gray-900">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-4xl font-bold mb-4">My Story</h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            A personal journey that started it all
          </p>
          <div className="max-w-3xl mx-auto space-y-6 leading-relaxed text-gray-700">
            <p>
              Hello! My name is Lionel, and I'm from Burundi in East Africa.
              When I was little, everyone around me spoke Kirundi, our local
              African language. I didn't think much about it back then. But when
              I moved to France for school, I realized how special my culture
              and mother tongue really were. They reminded me of my African
              roots and my family traditions.
            </p>
            <p>
              One day, I met a girl who was also from Burundi, but she grew up
              in another country. She felt shy because she didn't speak Kirundi
              very well. It made me sad because I knew lots of children from the
              African diaspora felt the same way. I wanted to help them feel
              proud of their heritage.
            </p>
            <p>
              Later on, when I became a dad, I really wanted my daughter to grow
              up celebrating our African culture and language. But it was hard
              to find bilingual children's books in Kirundi or other African
              languages like Kinyarwanda, Lingala, Swahili, or Yoruba. That's
              when I started making books myself, so kids everywhere can learn
              their mother tongue and connect to their African heritage, no
              matter where they live.
            </p>
            <p>
              Now, I create African children's books for families all over the
              world. I hope these bilingual stories bring smiles, new words, and
              a stronger bond to everyone's cultural identity!
            </p>
          </div>
        </div>
      </section>

      {/* About Lingu.Africa (Light Gradient) */}
      <section className="py-20 bg-gradient-to-b from-[#F5F2EC] to-[#FAF8F5] text-gray-900">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-4xl font-bold mb-4">
            About Lingu.Africa
          </h2>
          <p className="text-center text-xl text-gray-600 mb-12">
            Keeping African languages alive for the next generation
          </p>
          <div className="max-w-3xl mx-auto space-y-6 leading-relaxed text-gray-700">
            <p>
              Lingu.Africa is a special place where we make bilingual books in
              African languages like Kirundi, Kinyarwanda, Lingala, Swahili,
              Yoruba, and more. We believe language is more than words—it's
              about stories, songs, and heritage. Our mission is to help kids,
              especially those in the African diaspora, learn their mother
              tongue in a fun way and feel proud of their roots.
            </p>
            <p>
              By reading our books, families can share African culture together
              and make new memories. We want every child to feel connected to
              their history and traditions. Whether you live in Africa or on the
              other side of the world, our bilingual children's books will spark
              curiosity and build a strong bridge to your cultural identity.
            </p>
            <p className="text-lg font-medium text-[#DAA520]">
              Join us as we celebrate African heritage, empower kids to speak
              their mother tongue, and keep our rich traditions alive for
              generations to come.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section (Light Gradient) */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-[#F5F2EC] text-gray-900">
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

      {/* Newsletter Section (Dark Gradient) */}
      <section className="bg-black text-white py-20">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-xl text-gray-300">
              Get the latest updates and promotions straight to your inbox!
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
