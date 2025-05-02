import { Metadata } from "next";
import { languagesConfig } from "@/lib/languagesConfig";
import BookPageClient from "./BookPageClient";
import { SITE_URL } from "@/lib/constants";
import { getTruncatedTitle } from "@/lib/metadata";

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
  const metaTitle = getTruncatedTitle(bookTitle);
  const bookUrl = `${SITE_URL}/books/${language}/${slug}`;
  const coverImageUrl = `${SITE_URL}/images/${language}/${slug}/cover.png`;
  const metaDescription =
    book.description.short.length <= 160
      ? book.description.short
      : `${book.description.short.slice(0, 157)}...`;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: bookUrl,
      languages: {
        "en-US": bookUrl,
        "x-default": bookUrl,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
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
      description: metaDescription,
      images: [coverImageUrl],
      creator: "@lionel.kubwimana",
    },
  };
}

export default async function BookPage({ params }: Props) {
  const { language, slug } = await params;
  return <BookPageClient language={language} slug={slug} />;
}
