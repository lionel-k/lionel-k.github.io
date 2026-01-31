import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FLASHCARD_LANGUAGES, SITE_URL } from "@/lib/constants";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import {
  WifiOff,
  Shield,
  Heart,
  Shuffle,
  BarChart3,
  Moon,
  BookOpen,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export async function generateStaticParams() {
  return FLASHCARD_LANGUAGES.map((lang) => ({
    language: lang.slug,
  }));
}

type Props = {
  params: Promise<{
    language: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language } = await params;
  const lang = FLASHCARD_LANGUAGES.find((l) => l.slug === language);

  if (!lang) {
    return { title: "Not Found" };
  }

  const title = `${lang.appName} - Learn ${lang.name} Vocabulary | Lingu.Africa`;
  const description = `Master essential ${lang.name} vocabulary with ${lang.appName}. 100+ flashcards with real-world examples. 100% offline, zero tracking. Free download on Google Play.`;
  const pageUrl = `${SITE_URL}/flashcards/${lang.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Lingu.Africa",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@lionel.kubwimana",
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function FlashcardsLanguagePage({ params }: Props) {
  const { language } = await params;
  const lang = FLASHCARD_LANGUAGES.find((l) => l.slug === language);

  if (!lang) {
    notFound();
  }

  const categories = [
    "Greetings & Phrases",
    "Family & People",
    "Numbers & Time",
    "Verbs & Actions",
    "Food & Places",
    "Animals & Body Parts",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] text-white">
      {/* Breadcrumb */}
      <BreadcrumbNav
        items={[
          { name: "Home", href: "/" },
          { name: "Flashcards", href: "/flashcards" },
          { name: lang.name, href: `/flashcards/${lang.slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="py-16 sm:py-20">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              <span className="text-[#DAA520]">{lang.appName}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Master the heart of Burundi. Learn 100+ essential {lang.name}{" "}
              words with real-world examples. 100% offline. 0% tracking.
            </p>

            {/* CTA Button */}
            <a
              href={lang.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-all duration-200 hover:opacity-80 hover:scale-105"
              data-umami-event={`${lang.slug}-flashcards-download-btn`}
            >
              <Image
                src="/images/google-play-badge.svg"
                alt="Get it on Google Play"
                width={200}
                height={60}
                className="h-[60px] w-auto"
              />
            </a>

            <p className="mt-4 text-sm text-gray-400">
              Free starter pack • Premium unlock available
            </p>
          </div>
        </div>
      </section>

      {/* App Screenshots */}
      <section className="py-16 bg-black/20">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-10">
            See the App in Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {Array.from({ length: lang.screenshots }, (_, i) => i + 1).map(
              (num) => (
                <div
                  key={num}
                  className="group relative overflow-hidden rounded-xl bg-gray-800/30 border border-gray-700 hover:border-[#DAA520] transition-all duration-300"
                >
                  <Image
                    src={`/images/${lang.slug}/flashcards/${num}.webp`}
                    alt={`${lang.appName} screenshot ${num}`}
                    width={300}
                    height={650}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-12 bg-black/30">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-8">
            100+ Curated Flashcards
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {categories.map((category) => (
              <div
                key={category}
                className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700"
              >
                <p className="text-sm text-gray-300">{category}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-6 text-sm">
            Start free with Greetings & Family packs
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-10">
            Why This App?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Feature Cards */}
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6" />}
              title="Real Examples"
              description="Every word comes with a Kirundi sentence and English translation. Learn how to actually use words."
            />
            <FeatureCard
              icon={<WifiOff className="h-6 w-6" />}
              title="100% Offline"
              description="All cards stored locally. Perfect for travelers or areas with limited connectivity."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Privacy First"
              description="No analytics, no ads, no tracking. Your progress stays on your device."
            />
            <FeatureCard
              icon={<Heart className="h-6 w-6" />}
              title="Favorites"
              description="Save difficult words to a personalized study list for focused practice."
            />
            <FeatureCard
              icon={<Shuffle className="h-6 w-6" />}
              title="Shuffle Mode"
              description="Randomize cards to prevent rote memorization and test real recall."
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Progress Tracking"
              description="Visual progress bar shows exactly how much you've mastered."
            />
            <FeatureCard
              icon={<Moon className="h-6 w-6" />}
              title="Dark & Light Mode"
              description="Modern UI built with Material 3. Easy on your eyes, day or night."
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6" />}
              title="Lightweight"
              description="Tiny app size. Installs in seconds, runs smoothly on any Android device."
            />
            <FeatureCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Freemium"
              description="Try free with 2 categories. One purchase unlocks everything forever."
            />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-b from-transparent to-black/50">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Learn {lang.name}?
          </h2>
          <p className="text-gray-400 mb-8">
            Download now and start with our free Greetings & Family packs.
          </p>
          <a
            href={lang.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-all duration-200 hover:opacity-80 hover:scale-105"
            data-umami-event={`${lang.slug}-flashcards-download-btn-bottom`}
          >
            <Image
              src="/images/google-play-badge.svg"
              alt="Get it on Google Play"
              width={200}
              height={60}
              className="h-[60px] w-auto"
            />
          </a>
          <p className="mt-8 text-sm text-gray-500">
            <Link
              href={`/flashcards/${lang.slug}/privacy`}
              className="hover:text-gray-300 underline"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-5">
      <div className="text-[#DAA520] mb-3">{icon}</div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
