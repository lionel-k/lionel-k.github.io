import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGUAGES } from "@/lib/constants";
import { SITE_URL } from "@/lib/constants";
import LanguageClient from "./LanguageClient";
import { getLanguageFlashcards } from "@/lib/learn/utils";

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
  const words = getLanguageFlashcards(language);

  if (!words) {
    return {
      title: "Language Not Found",
    };
  }

  const pageTitle = `${words[0].language} Vocabulary Flashcards | Lingu.Africa`;
  const description = `Learn ${words[0].language} effectively with interactive flashcards featuring audio and images. Perfect for beginners and intermediate learners.`;
  const languageImageUrl = `${SITE_URL}/images/${language}/${language}.png`;

  return {
    title: pageTitle,
    description: description,
    openGraph: {
      title: pageTitle,
      description: description,
      url: `${SITE_URL}/learn/${language}`,
      siteName: "Lingu.Africa",
      images: [
        {
          url: languageImageUrl,
          width: 1200,
          height: 630,
          alt: `${words[0].language} Language Flashcards`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description,
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

  const words = getLanguageFlashcards(language);

  if (!words) {
    notFound();
  }

  return <LanguageClient words={words} />;
}
