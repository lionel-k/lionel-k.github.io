import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGUAGES, SITE_URL } from "@/lib/constants";
import { contentSections } from "@/lib/learn/sections";
import { VOCAB_LANGUAGE_SLUGS } from "@/lib/learn/translations";
import { getOrderedSectionWords } from "@/lib/learn/utils";
import TeachSectionClient from "./TeachSectionClient";

export async function generateStaticParams() {
  return VOCAB_LANGUAGE_SLUGS.flatMap((slug) =>
    contentSections.map((section) => ({ language: slug, section: section.id }))
  );
}

type Props = {
  params: Promise<{ language: string; section: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language, section } = await params;
  const languageObj = LANGUAGES.find((l) => l.slug === language);
  const sectionObj = contentSections.find((s) => s.id === section);

  if (!languageObj || !sectionObj) return { title: "Section Not Found" };

  const pageTitle = `Teach ${sectionObj.title} in ${languageObj.name} | Lingu.Africa`;
  const description = `Presenter slides for teaching ${sectionObj.title} vocabulary in ${languageObj.name}. Designed for online classroom use.`;
  const languageImageUrl = `${SITE_URL}/images/${languageObj.slug}/${languageObj.slug}.png`;
  const pageUrl = `${SITE_URL}/teach/${languageObj.slug}/${sectionObj.id}`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      url: pageUrl,
      siteName: "Lingu.Africa",
      images: [{ url: languageImageUrl, width: 1200, height: 630, alt: pageTitle }],
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

export default async function TeachSectionPage({ params }: Props) {
  const { language, section } = await params;
  const languageObj = LANGUAGES.find((l) => l.slug === language);
  const sectionObj = contentSections.find((s) => s.id === section);

  if (!languageObj || !sectionObj) notFound();

  const words = getOrderedSectionWords(language, section);

  if (!words || words.length === 0) notFound();

  return (
    <TeachSectionClient
      words={words}
      section={sectionObj}
      language={languageObj}
    />
  );
}
