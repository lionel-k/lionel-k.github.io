import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import TeachClient from "./TeachClient";

export const metadata: Metadata = {
  title: "Classroom vocabulary presenter for African languages | Lingu.Africa",
  description:
    "Free section-by-section slides for teaching African language vocabulary online. Share your screen, walk through words with images and translations—built for Google Meet and the classroom.",
  openGraph: {
    title: "Classroom vocabulary presenter for African languages | Lingu.Africa",
    description:
      "Free section-by-section slides for teaching African language vocabulary online. Share your screen, walk through words with images and translations—built for Google Meet and the classroom.",
    url: `${SITE_URL}/teach`,
    siteName: "Lingu.Africa",
    images: [
      {
        url: `${SITE_URL}/logo.webp`,
        width: 1200,
        height: 1200,
        alt: "Lingu.Africa - Teach African languages in the classroom",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Classroom vocabulary presenter for African languages",
    description:
      "Section-by-section presenter slides with images and translations. Built for screen sharing and live classes.",
    images: [`${SITE_URL}/logo.webp`],
    creator: "@lionel.kubwimana",
  },
  alternates: {
    canonical: `${SITE_URL}/teach`,
    languages: {
      "en-US": `${SITE_URL}/teach`,
      "x-default": `${SITE_URL}/teach`,
    },
  },
};

export default function TeachPage() {
  return <TeachClient />;
}
