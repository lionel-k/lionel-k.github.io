import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFlashcardSet } from "@/lib/flashcards";
import { LANGUAGES } from "@/lib/constants";
import { SITE_URL } from "@/lib/constants";
import FlashcardLanguageClient from "./FlashcardLanguageClient";

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

  return {
    title: pageTitle,
    description: `Practice ${flashcardSet.language} vocabulary with interactive flashcards`,
    openGraph: {
      title: pageTitle,
      description: `Practice ${flashcardSet.language} vocabulary with interactive flashcards`,
      url: `${SITE_URL}/flashcards/${language}`,
      siteName: "Lingu.Africa",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: `Practice ${flashcardSet.language} vocabulary with interactive flashcards`,
      creator: "@lionel.kubwimana",
    },
  };
}

export default async function FlashcardLanguagePage({ params }: Props) {
  const { language } = await params;
  const flashcardSet = await getFlashcardSet(language);

  if (!flashcardSet) {
    notFound();
  }

  return <FlashcardLanguageClient flashcardSet={flashcardSet} />;
}
