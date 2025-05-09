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

  const pageTitle = `Learn ${languageObj.name} Vocabulary | Lingu.Africa`;
  const description = `Build your ${languageObj.name} vocabulary step by step with interactive flashcards and audio. Learn essential words and phrases.`;
  const languageImageUrl = `${SITE_URL}/images/${languageObj.slug}/${languageObj.slug}.png`;
  const pageUrl = `${SITE_URL}/learn/${languageObj.slug}`;

  return {
    title: pageTitle,
    description: description,
    openGraph: {
      title: pageTitle,
      description: description,
      url: pageUrl,
      siteName: "Lingu.Africa",
      images: [
        {
          url: languageImageUrl,
          width: 1200,
          height: 630,
          alt: `Learn ${languageObj.name} Vocabulary`,
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
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-US": pageUrl,
        "x-default": pageUrl,
      },
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
