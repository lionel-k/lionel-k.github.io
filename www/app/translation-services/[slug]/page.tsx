import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  FileText,
  Mic,
  Video,
  Subtitles,
  FileAudio,
  Globe,
} from "lucide-react";
import { Metadata } from "next";
import { sharedMetadata } from "@/lib/metadata";
import {
  translationLanguages,
  getTranslationFaqs,
  CTA_EMAIL,
  buildTranslationQuoteMailto,
} from "@/lib/translationServices";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { FAQ } from "@/components/FAQ";
import { SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return translationLanguages.map((l) => ({ slug: `${l.slug}-to-english` }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const langSlug = slug.replace(/-to-english$/, "");
  const language = translationLanguages.find((l) => l.slug === langSlug);
  if (!language) return {};

  const title = `${language.name} to English Translation Services | Lingu.Africa`;
  const description = `Need ${language.name} to English translation for documents, audio, or video? Contact Lingu.Africa to get a quote for your project.`;

  return {
    ...sharedMetadata,
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/translation-services/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/translation-services/${slug}`,
      type: "website",
      siteName: "Lingu.Africa",
      images: [
        {
          url: `${SITE_URL}/logo.webp`,
          width: 1200,
          height: 1200,
          alt: "Lingu.Africa",
          type: "image/png",
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const contentTypes = [
  {
    key: "documents",
    icon: <FileText className="w-6 h-6 text-[#DAA520]" />,
    title: "Documents",
    examples: "Personal documents, administrative documents, legal documents, medical documents",
  },
  {
    key: "audio",
    icon: <Mic className="w-6 h-6 text-[#DAA520]" />,
    title: "Audio Recordings",
    examples: "Interview recordings, voice messages, audio files",
  },
  {
    key: "video",
    icon: <Video className="w-6 h-6 text-[#DAA520]" />,
    title: "Video Files",
    examples: "Video interviews, recorded sessions, short films",
  },
  {
    key: "subtitles",
    icon: <Subtitles className="w-6 h-6 text-[#DAA520]" />,
    title: "Subtitles",
    examples: "Subtitle files for video content (SRT and similar formats)",
  },
  {
    key: "transcripts",
    icon: <FileAudio className="w-6 h-6 text-[#DAA520]" />,
    title: "Transcripts",
    examples: "Written transcripts from audio or video recordings",
  },
  {
    key: "webDigital",
    icon: <Globe className="w-6 h-6 text-[#DAA520]" />,
    title: "Website and digital content",
    examples:
      "Website copy, app or product strings, marketing emails, social posts, blog articles",
  },
];

export default async function TranslationServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const langSlug = slug.replace(/-to-english$/, "");
  const language = translationLanguages.find((l) => l.slug === langSlug);

  if (!language) notFound();

  const pageTitle = `${language.name} to English Translation Services`;
  const quoteMailto = buildTranslationQuoteMailto(language.name);

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <BreadcrumbNav
        items={[
          { name: "Home", href: "/" },
          { name: "Translation Services", href: "/translation-services" },
          { name: pageTitle, href: `/translation-services/${slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-black py-24 text-white overflow-hidden">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="mb-6 inline-block bg-[#DAA520]/20 px-5 py-2 rounded-full text-[#DAA520] text-sm font-semibold">
              {language.name} → English
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#DAA520] to-[#B8860B] bg-clip-text text-transparent leading-tight mb-6">
              {pageTitle}
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-gray-300 mb-8 max-w-2xl">
              Need help translating a document, audio file, or video from{" "}
              {language.name} to English? Lingu.Africa works with freelance
              language partners to help with translation projects. Availability
              depends on the language and the project.
            </p>
            <a
              href={quoteMailto}
              className="inline-flex items-center justify-center rounded-lg bg-[#DAA520] px-8 py-4 text-lg font-semibold text-black shadow-md hover:bg-[#B8860B] transition-all duration-300"
            >
              <Mail className="mr-2 h-5 w-5" />
              Reach out to get a quote
            </a>
          </div>
        </div>
      </section>

      {/* What We Translate */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Can Help Translate
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We can help with projects such as the following. Contact us with
              your file and project details to confirm availability.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {contentTypes.map(({ key, icon, title, examples }) => (
              <div
                key={key}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-[#DAA520]/10 flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {examples}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAF8F5]">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Languages
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-semibold text-[#DAA520] uppercase tracking-wide mb-1">
                    Source Language
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {language.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#DAA520] uppercase tracking-wide mb-1">
                    Target Language
                  </p>
                  <p className="text-2xl font-bold text-gray-900">English</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Email your file",
                desc: `Send your file and project details to ${CTA_EMAIL}.`,
              },
              {
                step: "2",
                title: "We review",
                desc: "We review the language, format, and deadline.",
              },
              {
                step: "3",
                title: "We send a quote",
                desc: "You receive a quote with pricing and timeline.",
              },
              {
                step: "4",
                title: "We deliver",
                desc: "We deliver the translated file by your deadline.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="bg-white rounded-2xl p-6 shadow-xl text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#DAA520] flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">{step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Include — gold CTA band */}
      <section className="relative py-16 bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-black">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
              What to Include in Your Email
            </h2>
            <p className="text-center mb-8 opacity-80">
              Include the following details when you reach out. This helps us
              review your project quickly.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                `The language pair (${language.name} to English)`,
                "The type of file (document, audio, video, etc.)",
                "The number of pages, or the duration of the audio/video",
                "Your deadline",
                "Whether you need subtitles or a transcript",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  <span className="text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <a
                href={quoteMailto}
                className="inline-flex items-center justify-center rounded-lg bg-black px-8 py-4 text-lg font-semibold text-white hover:bg-black/80 transition-all duration-300"
              >
                <Mail className="mr-2 h-5 w-5" />
                Send your project details to {CTA_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAF8F5]">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about {language.name} translation services
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <FAQ items={getTranslationFaqs(language.name)} />
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Have another question?</p>
            <a
              href={quoteMailto}
              className="inline-flex items-center justify-center rounded-lg bg-[#DAA520] px-6 py-3 text-base font-semibold text-black hover:bg-[#B8860B] transition-all duration-300"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email us at {CTA_EMAIL}
            </a>
          </div>
        </div>
      </section>

      {/* Back to hub */}
      <section className="py-10 bg-black text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
          <Link
            href="/translation-services"
            className="inline-flex items-center text-[#DAA520] hover:text-[#B8860B] font-medium transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            View all translation services
          </Link>
        </div>
      </section>
    </div>
  );
}
