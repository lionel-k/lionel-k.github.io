import { Metadata } from "next";
import { languagesConfig } from "@/lib/languagesConfig";
import LanguagePageClient from "./LanguagePageClient";

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
  const pageDescription = `Discover our collection of bilingual ${languageData.name} books paired with English or French translations—perfect for families worldwide!`;
  const languageImageUrl = `https://www.lingu.africa/images/${language}/${language}.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://www.lingu.africa/books/${language}`,
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
      description: pageDescription,
      images: [languageImageUrl],
      creator: "@lionel.kubwimana",
    },
  };
}

export default async function LanguagePage({ params }: Props) {
  const { language } = await params;
  return <LanguagePageClient language={language} />;
}
