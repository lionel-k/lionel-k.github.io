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
              Discover how our bilingual African children's books bring families
              closer to their culture and heritage.
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
              Hello! My name is Lionel, and I’m from Burundi in East Africa.
              When I was little, everyone around me spoke Kirundi, our local
              African language. I didn’t think much about it back then. But when
              I moved to France for school, I realized how special my culture
              and mother tongue really were. They reminded me of my African
              roots and my family traditions.
            </p>
            <p>
              One day, I met a girl who was also from Burundi, but she grew up
              in another country. She felt shy because she didn’t speak Kirundi
              very well. It made me sad because I knew lots of children from the
              African diaspora felt the same way. I wanted to help them feel
              proud of their heritage.
            </p>
            <p>
              Later on, when I became a dad, I really wanted my daughter to grow
              up celebrating our African culture and language. But it was hard
              to find bilingual children’s books in Kirundi or other African
              languages like Kinyarwanda, Lingala, Swahili, or Yoruba. That’s
              when I started making books myself, so kids everywhere can learn
              their mother tongue and connect to their African heritage, no
              matter where they live.
            </p>
            <p>
              Now, I create African children’s books for families all over the
              world. I hope these bilingual stories bring smiles, new words, and
              a stronger bond to everyone’s cultural identity!
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
              Yoruba, and more. We believe language is more than words—it’s
              about stories, songs, and heritage. Our mission is to help kids,
              especially those in the African diaspora, learn their mother
              tongue in a fun way and feel proud of their roots.
            </p>
            <p>
              By reading our books, families can share African culture together
              and make new memories. We want every child to feel connected to
              their history and traditions. Whether you live in Africa or on the
              other side of the world, our bilingual children’s books will spark
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
      <section className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] py-20 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center bg-[url('/newsletter-pattern.svg')] bg-contain bg-no-repeat bg-center py-16">
            <div className="bg-[#DAA520]/10 backdrop-blur-sm rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Get our latest news on bilingual African children’s books,
                language tips, and special offers.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
