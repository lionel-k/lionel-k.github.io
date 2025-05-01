"use client";

import { useAuth } from "@/hooks/learn/useAuth";
import { sections } from "@/lib/learn/sections";
import SectionCard from "@/components/learn/SectionCard/index";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import Loader from "@/components/learn/Loader";
import PageHeader from "@/components/learn/PageHeader";

type Props = {
  language: {
    name: string;
    slug: string;
  };
};

export default function LanguageClient({ language }: Props) {
  const { email, isPaidUser, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Learn", href: "/learn" },
    {
      name: language.name,
      href: `/learn/${language.slug}`,
    },
  ];

  return (
    <div className="min-h-screen">
      <BreadcrumbNav items={breadcrumbItems} />
      <PageHeader
        title={`${language.name} Vocabulary`}
        description="Build your vocabulary step by step, from basic words to everyday phrases."
        email={email}
        isPaidUser={isPaidUser}
      />

      <section className="relative py-16 bg-[#0A0A0A]">
        <div className="absolute inset-0 opacity-5 bg-repeat" />
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                language={language.slug}
                isPaidUser={isPaidUser}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
