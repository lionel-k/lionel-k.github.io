"use client";

import { useAuth } from "@/hooks/learn/useAuth";
import { sections } from "@/lib/learn/sections";
import SectionCard from "@/components/learn/SectionCard/index";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import Loader from "@/components/learn/Loader";
import PageHeader from "@/components/learn/PageHeader";
import CTAButton from "@/components/learn/CTAButton";
import Link from "next/link";
import { BarChart3 } from "lucide-react";

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
        ctaHref={`/learn/${language.slug}/basics`}
      />
      <section className="relative py-16 bg-[#111111]">
        <div className="absolute inset-0 opacity-5 bg-repeat" />
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Progress Button */}
          {email && (
            <div className="mb-8 flex justify-center">
              <Link
                href={`/learn/${language.slug}/progress`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#DAA520] hover:bg-[#B8860B] text-black font-semibold rounded-lg transition-colors"
              >
                <BarChart3 className="h-5 w-5" />
                View Your Progress
              </Link>
            </div>
          )}

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
