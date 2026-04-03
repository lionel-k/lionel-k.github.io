import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGUAGES, SITE_URL } from "@/lib/constants";
import { VOCAB_LANGUAGE_SLUGS } from "@/lib/learn/translations";
import TeachLanguageClient from "./TeachLanguageClient";

export async function generateStaticParams() {
  return VOCAB_LANGUAGE_SLUGS.map((slug) => ({ language: slug }));
}

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language } = await params;
  const languageObj = LANGUAGES.find((l) => l.slug === language);

  if (!languageObj || !VOCAB_LANGUAGE_SLUGS.includes(language))
    return { title: "Language Not Found" };

  const pageTitle = `Teach ${languageObj.name} | Lingu.Africa`;
  const description = `A classroom-ready presenter for teaching ${languageObj.name} vocabulary to young learners. Section-by-section slides with images and translations.`;
  const languageImageUrl = `${SITE_URL}/images/${languageObj.slug}/${languageObj.slug}.png`;
  const pageUrl = `${SITE_URL}/teach/${languageObj.slug}`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      url: pageUrl,
      siteName: "Lingu.Africa",
      images: [
        { url: languageImageUrl, width: 1200, height: 630, alt: pageTitle },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [languageImageUrl],
      creator: "@lionel.kubwimana",
    },
    alternates: { canonical: pageUrl },
  };
}

export default async function TeachLanguagePage({ params }: Props) {
  const { language } = await params;
  const languageObj = LANGUAGES.find((l) => l.slug === language);

  if (!languageObj || !VOCAB_LANGUAGE_SLUGS.includes(language)) notFound();

  return <TeachLanguageClient language={languageObj} />;
}
