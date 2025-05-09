import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import LearnClient from "./LearnClient";

export const metadata: Metadata = {
  title:
    "Learn African Languages Online | Interactive Vocabulary Flashcards | Lingu.Africa",
  description:
    "Master essential African language vocabulary with interactive flashcards and native audio. Choose from multiple languages and start learning today.",
  openGraph: {
    title:
      "Learn African Languages Online | Interactive Vocabulary Flashcards | Lingu.Africa",
    description:
      "Master essential African language vocabulary with interactive flashcards and native audio. Choose from multiple languages and start learning today.",
    url: `${SITE_URL}/learn`,
    siteName: "Lingu.Africa",
    images: [
      {
        url: `${SITE_URL}/logo.webp`,
        width: 1200,
        height: 1200,
        alt: "Lingu.Africa - Learn African Languages Online",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn African Languages Online | Interactive Vocabulary Flashcards",
    description:
      "Master essential African language vocabulary with interactive flashcards and native audio. Choose from multiple languages and start learning today.",
    images: [`${SITE_URL}/logo.webp`],
    creator: "@lionel.kubwimana",
  },
  alternates: {
    canonical: `${SITE_URL}/learn`,
    languages: {
      "en-US": `${SITE_URL}/learn`,
      "x-default": `${SITE_URL}/learn`,
    },
  },
};

export default function LearnPage() {
  return <LearnClient />;
}
