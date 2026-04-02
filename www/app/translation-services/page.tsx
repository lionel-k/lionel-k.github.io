import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Metadata } from "next";
import { pagesMetadata, sharedMetadata } from "@/lib/metadata";
import { translationLanguages } from "@/lib/translationServices";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";

export const metadata: Metadata = {
  ...sharedMetadata,
  ...pagesMetadata.translationServices,
};

export default function TranslationServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <BreadcrumbNav
        items={[
          { name: "Home", href: "/" },
          { name: "Translation Services", href: "/translation-services" },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-28 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5 pattern-cross pattern-[#DAA520] pattern-size-6 pointer-events-none" />
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-block bg-[#DAA520]/20 px-6 py-2 rounded-full text-[#DAA520] text-sm font-semibold">
              African Language Translation
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl bg-gradient-to-r from-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
              Translation Services for African Languages
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-300 max-w-2xl mx-auto">
              Lingu.Africa offers translation services in selected African
              languages through freelance language partners. We can help with
              documents, audio recordings, video files, subtitles, and
              transcripts.
            </p>
            <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
              Availability depends on the language and the project.
            </p>
            <div className="mt-10">
              <a
                href="mailto:hello@lingu.africa"
                className="inline-flex items-center justify-center rounded-lg bg-[#DAA520] px-8 py-4 text-lg font-semibold text-black shadow-md hover:bg-[#B8860B] transition-all duration-300"
              >
                <Mail className="mr-2 h-5 w-5" />
                Email us to get a quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Available Services */}
      <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-white text-gray-900">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Available Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Below are the languages we can pair with English for translation
              projects. Each page covers documents, audio, video, subtitles,
              and transcripts. Open a language for details, or email{" "}
              <a
                href="mailto:hello@lingu.africa"
                className="text-[#DAA520] font-medium hover:underline"
              >
                hello@lingu.africa
              </a>{" "}
              with your project to get a quote.
            </p>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Choose a language below.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {translationLanguages.map((lang) => (
              <div
                key={lang.slug}
                className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="absolute inset-0 pointer-events-none opacity-5" />

                <div className="relative">
                  <h3 className="text-2xl font-bold mb-4">{lang.name}</h3>

                  <Link
                    href={`/translation-services/${lang.slug}-to-english`}
                    className="mt-6 inline-flex items-center justify-center w-full py-3 px-6 text-lg font-semibold text-black bg-[#DAA520] rounded-lg hover:bg-[#B8860B] transition-all"
                    title={`${lang.name} translation services — to English`}
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAF8F5]">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Simple steps to get started</p>
          </div>
          <div className="grid gap-8 md:grid-cols-4 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Email your file",
                desc: "Send your file and project details to hello@lingu.africa.",
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

      {/* CTA Band */}
      <section className="relative py-16 bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-black">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to get a quote?
          </h2>
          <p className="text-lg mb-8 opacity-80 max-w-xl mx-auto">
            Send your project details to{" "}
            <strong>hello@lingu.africa</strong>. Include the language, file
            type, duration or page count, and your deadline.
          </p>
          <a
            href="mailto:hello@lingu.africa"
            className="inline-flex items-center justify-center rounded-lg bg-black px-8 py-4 text-lg font-semibold text-white hover:bg-black/80 transition-all duration-300"
          >
            <Mail className="mr-2 h-5 w-5" />
            hello@lingu.africa
          </a>
        </div>
      </section>
    </div>
  );
}
