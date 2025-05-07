import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGUAGES } from "@/lib/constants";
import { SITE_URL } from "@/lib/constants";
import LanguageClient from "./LanguageClient";

export async function generateStaticParams() {
  const kirundi = LANGUAGES.find((l) => l.slug === "kirundi");
  if (kirundi) {
    return [
      {
        language: kirundi.slug,
      },
    ];
  }
  return [];
}

type Props = {
  params: Promise<{
    language: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language } = await params;
  const languageObj = LANGUAGES.find((l) => l.slug === language);

  if (!languageObj) {
    return {
      title: "Language Not Found",
    };
  }

  const languageName = languageObj.name;
  const pageTitle = `Learn ${languageName} | Lingu.Africa`;
  const description = `Learn ${languageName} vocabulary with interactive flashcards and audio. Build your vocabulary step by step, from basic words to everyday phrases.`;
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
          alt: `Learn ${languageName}`,
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

  return <LanguageClient language={languageObj} />;
}
