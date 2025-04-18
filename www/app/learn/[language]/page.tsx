import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFlashcardSet } from "@/lib/learn";
import { LANGUAGES } from "@/lib/constants";
import { SITE_URL } from "@/lib/constants";
import LanguageClient from "./LanguageClient";

type Props = {
  params: Promise<{
    language: string;
  }>;
};

export async function generateStaticParams() {
  return LANGUAGES.map((language) => ({
    language: language.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language } = await params;
  const flashcardSet = await getFlashcardSet(language);

  if (!flashcardSet) {
    return {
      title: "Language Not Found",
    };
  }

  const pageTitle = `Learn ${flashcardSet.language} with Flashcards - Lingu.Africa`;
  const languageImageUrl = `${SITE_URL}/images/${language}/${language}.png`;

  return {
    title: pageTitle,
    description: `Learn ${flashcardSet.language} vocabulary with interactive flashcards`,
    openGraph: {
      title: pageTitle,
      description: `Learn ${flashcardSet.language} vocabulary with interactive flashcards`,
      url: `${SITE_URL}/learn/${language}`,
      siteName: "Lingu.Africa",
      images: [
        {
          url: languageImageUrl,
          width: 1200,
          height: 630,
          alt: `${flashcardSet.language} Language Flashcards`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: `Learn ${flashcardSet.language} vocabulary with interactive flashcards`,
      images: [languageImageUrl],

      creator: "@lionel.kubwimana",
    },
  };
}

export default async function LanguagePage({ params }: Props) {
  const { language } = await params;
  const languageObj = LANGUAGES.find((l) => l.slug === language);

  if (!languageObj) {
    notFound();
  }

  const flashcardSet = await getFlashcardSet(language);

  if (!flashcardSet) {
    notFound();
  }

  return <LanguageClient flashcardSet={flashcardSet} />;
}
