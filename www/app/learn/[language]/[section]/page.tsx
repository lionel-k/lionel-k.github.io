import { Metadata } from "next";
import { LANGUAGES } from "@/lib/constants";
import { sections } from "@/lib/learn/sections";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import SectionClient from "./SectionClient";
import { getSectionFlashcards } from "@/lib/learn/utils";

export async function generateStaticParams() {
  const params = [];
  // Only generate for Kirundi since it's the only available language
  const kirundi = LANGUAGES.find((l) => l.slug === "kirundi");
  if (kirundi) {
    for (const section of sections) {
      params.push({
        language: kirundi.slug,
        section: section.id,
      });
    }
  }
  return params;
}

type Props = {
  params: Promise<{
    language: string;
    section: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language: langSlug, section: sectionId } = await params;
  const language = LANGUAGES.find((l) => l.slug === langSlug);
  const section = sections.find((s) => s.id === sectionId);

  if (!language || !section) {
    return {
      title: "Section Not Found",
    };
  }

  const pageTitle = `${section.title} in ${language.name} | Lingu.Africa`;
  const description = `${section.description} Learn ${language.name} vocabulary with interactive flashcards and audio.`;
  const languageImageUrl = `${SITE_URL}/images/${langSlug}/${langSlug}.png`;

  return {
    title: pageTitle,
    description: description,
    openGraph: {
      title: pageTitle,
      description: description,
      url: `${SITE_URL}/learn/${langSlug}/${sectionId}`,
      siteName: "Lingu.Africa",
      images: [
        {
          url: languageImageUrl,
          width: 1200,
          height: 630,
          alt: `${section.title} in ${language.name}`,
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

export default async function SectionPage({ params }: Props) {
  const { language: langSlug, section: sectionId } = await params;
  const language = LANGUAGES.find((l) => l.slug === langSlug);
  const section = sections.find((s) => s.id === sectionId);

  if (!language || !section) {
    notFound();
  }

  const words = getSectionFlashcards(langSlug, sectionId);

  if (!words) {
    notFound();
  }

  return (
    <SectionClient words={words} section={sectionId} language={language} />
  );
}
