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
  const { language, section } = await params;
  const languageObj = LANGUAGES.find((l) => l.slug === language);
  const sectionObj = sections.find((s) => s.id === section);

  if (!languageObj || !sectionObj) {
    return {
      title: "Section Not Found",
    };
  }

  const pageTitle = `${sectionObj.title} in ${languageObj.name} | Lingu.Africa`;
  const description = `Learn ${sectionObj.title} in ${languageObj.name} with interactive flashcards and native audio. Practice essential vocabulary and improve pronunciation.`;
  const languageImageUrl = `${SITE_URL}/images/${languageObj.slug}/${languageObj.slug}.png`;
  const pageUrl = `${SITE_URL}/learn/${languageObj.slug}/${sectionObj.id}`;

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
          alt: `${sectionObj.title} in ${languageObj.name}`,
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

export default async function SectionPage({ params }: Props) {
  const { language, section } = await params;
  const languageObj = LANGUAGES.find((l) => l.slug === language);
  const sectionObj = sections.find((s) => s.id === section);

  if (!languageObj || !sectionObj) {
    notFound();
  }

  const words = getSectionFlashcards(language, section);

  if (!words) {
    notFound();
  }

  return (
    <SectionClient words={words} section={section} language={languageObj} />
  );
}
