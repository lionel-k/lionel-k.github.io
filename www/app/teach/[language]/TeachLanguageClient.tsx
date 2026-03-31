"use client";

import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import SectionCard from "@/components/learn/SectionCard";
import { contentSections } from "@/lib/learn/sections";

type Props = {
  language: { name: string; slug: string };
};

export default function TeachLanguageClient({ language }: Props) {
  const breadcrumbItems = [
    { name: "Teach", href: "/teach" },
    { name: language.name, href: `/teach/${language.slug}` },
  ];

  return (
    <div className="min-h-screen">
      <BreadcrumbNav items={breadcrumbItems} />
      <section className="py-12 bg-[#0A0A0A]">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Teach {language.name}
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Pick a section to open the presenter. Share your screen on Google
              Meet and step through each word with your class.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {contentSections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                language={language.slug}
                variant="teach"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
