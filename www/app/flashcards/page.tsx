import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, FLASHCARD_LANGUAGES } from "@/lib/constants";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Smartphone, Zap, WifiOff, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "African Language Flashcard Apps | Lingu.Africa",
  description:
    "Master African languages with our mobile flashcard apps. 100+ essential words, real-world examples, 100% offline, zero tracking. Download free on Google Play.",
  openGraph: {
    title: "African Language Flashcard Apps | Lingu.Africa",
    description:
      "Master African languages with our mobile flashcard apps. 100+ essential words, real-world examples, 100% offline, zero tracking.",
    url: `${SITE_URL}/flashcards`,
    siteName: "Lingu.Africa",
    images: [
      {
        url: `${SITE_URL}/logo.webp`,
        width: 1200,
        height: 1200,
        alt: "Lingu.Africa Flashcard Apps",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "African Language Flashcard Apps | Lingu.Africa",
    description:
      "Master African languages with our mobile flashcard apps. 100+ essential words, 100% offline.",
    images: [`${SITE_URL}/logo.webp`],
    creator: "@lionel.kubwimana",
  },
  alternates: {
    canonical: `${SITE_URL}/flashcards`,
  },
};

export default function FlashcardsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-16 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display">
              Learn African Languages on the Go
            </h1>
            <p className="mt-4 text-xl leading-8 text-gray-300">
              100+ essential words. Real-world examples. 100% offline. 0%
              tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-12 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A]">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="text-center p-4">
              <Smartphone className="h-8 w-8 text-[#DAA520] mx-auto mb-2" />
              <p className="text-sm text-gray-300">Mobile First</p>
            </div>
            <div className="text-center p-4">
              <Zap className="h-8 w-8 text-[#DAA520] mx-auto mb-2" />
              <p className="text-sm text-gray-300">Fast & Light</p>
            </div>
            <div className="text-center p-4">
              <WifiOff className="h-8 w-8 text-[#DAA520] mx-auto mb-2" />
              <p className="text-sm text-gray-300">Works Offline</p>
            </div>
            <div className="text-center p-4">
              <Shield className="h-8 w-8 text-[#DAA520] mx-auto mb-2" />
              <p className="text-sm text-gray-300">Privacy First</p>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Grid */}
      <section className="relative py-16 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Choose Your Language
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {FLASHCARD_LANGUAGES.map((language) => (
              <Link
                key={language.slug}
                href={`/flashcards/${language.slug}`}
                className="group block overflow-hidden rounded-xl bg-white hover:shadow-lg transition duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#F8F3E9] flex items-center justify-center p-8">
                  <OptimizedImage
                    src={`/images/${language.slug}/${language.slug}.webp`}
                    alt={`${language.name} flag`}
                    className="w-full h-auto max-h-full object-contain"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {language.name}
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm">
                    {language.appName} for Android
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
