import { useRouter } from "next/router";
import { languagesConfig } from "@/lib/languagesConfig";
import { NewsletterForm } from "@/components/newsletter-form";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

type Book = {
  title: string;
  description: string;
  link: string;
};

type LanguageData = {
  name: string;
  image: string;
  books: Book[];
};

export default function LanguagePage() {
  const router = useRouter();
  const { language } = router.query;

  if (!language || typeof language !== "string") {
    return <div>Loading...</div>;
  }

  const languageData = languagesConfig[
    language.toLowerCase() as keyof typeof languagesConfig
  ] as LanguageData;

  if (!languageData) {
    return <div>Language not found</div>;
  }

  return (
    <>
      <Navbar />{" "}
      {/* Component usage is correct, import correction would be needed in import section */}
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative bg-black py-20 text-white">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="mx-auto max-w-3xl text-left">
              <h1 className="text-4xl font-bold tracking-tight text-[#DAA520] sm:text-6xl">
                {languageData.name} Books
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Discover our collection of {languageData.name} books, available
                with English and French translations.
              </p>
            </div>
          </div>
        </section>

        {/* Books Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
            <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
              Featured Books
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {languageData.books.slice(0, 2).map((book: Book) => (
                <div
                  key={book.title}
                  className="rounded-lg border border-gray-200 p-8 text-center"
                >
                  <h3 className="text-xl font-semibold mb-4">{book.title}</h3>
                  <p className="text-gray-600 mb-4">{book.description}</p>
                  <a
                    href={book.link}
                    className="mt-4 inline-block rounded-md bg-[#DAA520] px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#B8860B]"
                  >
                    Read more
                  </a>
                </div>
              ))}
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
      <Footer />
    </>
  );
}
