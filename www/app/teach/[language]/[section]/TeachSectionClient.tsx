"use client";

import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import TeachSectionPresenter from "@/components/teach/TeachSectionPresenter";
import SectionNavigation from "@/components/learn/SectionNavigation";
import { PresentableWord } from "@/lib/learn/types";
import { Section } from "@/lib/learn/sections";

interface Props {
  words: PresentableWord[];
  section: Section;
  language: { name: string; slug: string };
}

export default function TeachSectionClient({
  words,
  section,
  language,
}: Props) {
  const breadcrumbItems = [
    { name: "Teach", href: "/teach" },
    { name: language.name, href: `/teach/${language.slug}` },
    { name: section.title, href: `/teach/${language.slug}/${section.id}` },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbNav items={breadcrumbItems} />
      <TeachSectionPresenter words={words} />
      <SectionNavigation
        currentSectionId={section.id}
        language={language.slug}
        basePath="teach"
      />
    </div>
  );
}
