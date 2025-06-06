import { Metadata } from "next";
import { LANGUAGES } from "@/lib/constants";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import ProgressClient from "@/app/learn/[language]/progress/ProgressClient";

export async function generateStaticParams() {
  const params = [];
  // Only generate for Kirundi since it's the only available language
  const kirundi = LANGUAGES.find((l) => l.slug === "kirundi");
  if (kirundi) {
    params.push({
      language: kirundi.slug,
    });
  }
  return params;
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
      title: "Progress Not Found",
    };
  }

  const pageTitle = `Your Progress - ${languageObj.name} | Lingu.Africa`;
  const description = `Track your learning progress in ${languageObj.name}. See your scores, completed sections, and areas that need more practice.`;
  const pageUrl = `${SITE_URL}/learn/${languageObj.slug}/progress`;

  return {
    title: pageTitle,
    description: description,
    openGraph: {
      title: pageTitle,
      description: description,
      url: pageUrl,
      siteName: "Lingu.Africa",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: pageTitle,
      description: description,
      creator: "@lionel.kubwimana",
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function ProgressPage({ params }: Props) {
  const { language } = await params;
  const languageObj = LANGUAGES.find((l) => l.slug === language);

  if (!languageObj) {
    notFound();
  }

  return <ProgressClient language={languageObj} />;
}
