import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGUAGES } from "@/lib/constants";
import { SITE_URL } from "@/lib/constants";
import DownloadClient from "@/app/learn/[language]/download/DownloadClient";

export async function generateStaticParams() {
  return LANGUAGES.map((language) => ({
    language: language.slug,
  }));
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

  const pageTitle = `Download ${languageObj.name} Learning App | Lingu.Africa`;
  const description = `Install the ${languageObj.name} learning app and learn offline. Progressive Web App with native app experience.`;
  const languageImageUrl = `${SITE_URL}/images/${languageObj.slug}/${languageObj.slug}.png`;
  const pageUrl = `${SITE_URL}/learn/${languageObj.slug}/download`;

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
          alt: `Download ${languageObj.name} Learning App`,
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

export default async function DownloadPage({ params }: Props) {
  const { language } = await params;
  const languageObj = LANGUAGES.find((l) => l.slug === language);

  if (!languageObj) {
    notFound();
  }

  return <DownloadClient language={languageObj} />;
}
