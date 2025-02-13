import { Metadata } from "next";
import { languagesConfig } from "@/lib/languagesConfig";
import BookPageClient from "./BookPageClient";

type Props = {
  params: Promise<{
    language: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const params: { language: string; slug: string }[] = [];

  // Generate params for all books in all languages
  for (const languageKey of Object.keys(languagesConfig)) {
    const language =
      languagesConfig[languageKey as keyof typeof languagesConfig];
    language.books.forEach((book) => {
      params.push({ language: languageKey, slug: book.slug });
    });
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language, slug } = await params;
  const languageData =
    languagesConfig[language.toLowerCase() as keyof typeof languagesConfig];
  const book = languageData?.books.find((b) => b.slug === slug);

  if (!book) {
    return {
      title: "Book Not Found",
    };
  }

  const bookTitle = `${book.title} - ${languageData.name} Book`;
  const bookUrl = `https://www.lingu.africa/books/${language}/${slug}`;
  const coverImageUrl = `https://www.lingu.africa/images/${language}/${slug}/cover.png`;

  return {
    title: bookTitle,
    description: book.description.long,
    openGraph: {
      title: bookTitle,
      description: book.description.long,
      url: bookUrl,
      siteName: "Lingu.Africa",
      images: [
        {
          url: coverImageUrl,
          width: 1200,
          height: 630,
          alt: `Cover of ${book.title}`,
        },
      ],
      locale: "en_US",
      type: "book",
    },
    twitter: {
      card: "summary_large_image",
      title: bookTitle,
      description: book.description.long,
      images: [coverImageUrl],
      creator: "@lionel.kubwimana",
    },
  };
}

export default async function BookPage({ params }: Props) {
  const { language, slug } = await params;
  return <BookPageClient language={language} slug={slug} />;
}
