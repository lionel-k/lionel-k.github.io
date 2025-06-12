import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import LearnClient from "./LearnClient";

export const metadata: Metadata = {
  title:
    "Teach Your Kids African Languages in Just 10 Minutes a Day | Lingu.Africa",
  description:
    "Help your children connect with their heritage through African languages. Perfect for busy parents - just 10 minutes a day with interactive flashcards and native audio.",
  openGraph: {
    title:
      "Teach Your Kids African Languages in Just 10 Minutes a Day | Lingu.Africa",
    description:
      "Help your children connect with their heritage through African languages. Perfect for busy parents - just 10 minutes a day with interactive flashcards and native audio.",
    url: `${SITE_URL}/learn`,
    siteName: "Lingu.Africa",
    images: [
      {
        url: `${SITE_URL}/logo.webp`,
        width: 1200,
        height: 1200,
        alt: "Lingu.Africa - Teach Your Kids African Languages",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teach Your Kids African Languages in Just 10 Minutes a Day",
    description:
      "Help your children connect with their heritage through African languages. Perfect for busy parents - just 10 minutes a day with interactive flashcards and native audio.",
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
