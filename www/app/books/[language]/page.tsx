import { Metadata } from "next";
import { languagesConfig } from "@/lib/languagesConfig";
import LanguagePageClient from "./LanguagePageClient";
import { SITE_URL } from "@/lib/constants";
import { getTruncatedDescription } from "@/lib/metadata";

type Props = {
  params: Promise<{
    language: string;
  }>;
};

export async function generateStaticParams() {
  return Object.keys(languagesConfig).map((language) => ({
    language,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language } = await params;
  const languageData =
    languagesConfig[language.toLowerCase() as keyof typeof languagesConfig];

  if (!languageData) {
    return {
      title: "Language Not Found",
    };
  }

  const pageTitle = `${languageData.name} Books - Bilingual African Language Books`;
  const languageImageUrl = `${SITE_URL}/images/${language}/${language}.png`;
  const pageUrl = `${SITE_URL}/books/${language}`;
  const metaDescription = getTruncatedDescription(languageData.description);

  return {
    title: pageTitle,
    description: metaDescription,
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-US": pageUrl,
        "x-default": pageUrl,
      },
    },
    openGraph: {
      title: pageTitle,
      description: languageData.description,
      url: pageUrl,
      siteName: "Lingu.Africa",
      images: [
        {
          url: languageImageUrl,
          width: 1200,
          height: 630,
          alt: `${languageData.name} Language Books`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: languageData.description,
      images: [languageImageUrl],
      creator: "@lionel.kubwimana",
    },
  };
}

export default async function LanguagePage({ params }: Props) {
  const { language } = await params;
  return <LanguagePageClient language={language} />;
}
