import { Metadata } from "next";
import { notFound } from "next/navigation";
import { flashcardSets } from "@/lib/flashcards";
import FlashcardGame from "@/components/FlashcardGame";
import { LANGUAGES } from "@/lib/constants";
import { SITE_URL } from "@/lib/constants";

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
  const flashcardSet = flashcardSets[language];

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
  const flashcardSet = flashcardSets[language];

  if (!flashcardSet) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Learn {flashcardSet.language}
      </h1>
      <FlashcardGame words={flashcardSet.words} />
    </div>
  );
}
