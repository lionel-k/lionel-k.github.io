"use client";

import { useAuth } from "@/hooks/flashcards/useAuth";
import { FlashcardSet } from "@/lib/flashcards/types";
import AuthStatus from "@/components/flashcards/AuthStatus";
import Loader from "@/components/flashcards/Loader";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { Lock } from "lucide-react";
import Link from "next/link";
import { sections } from "./sections";

type Props = {
  flashcardSet: FlashcardSet;
};

export default function FlashcardLanguageClient({ flashcardSet }: Props) {
  const { email, isPaidUser, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Flashcards", href: "/flashcards" },
    {
      name: flashcardSet.language,
      href: `/flashcards/${flashcardSet.language.toLowerCase()}`,
    },
  ];

  return (
    <div className="min-h-screen">
      <BreadcrumbNav items={breadcrumbItems} />
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-16 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display">
              Learn {flashcardSet.language}
            </h1>
            <p className="mt-4 text-xl leading-8 text-gray-300">
              From basic words to daily conversations
            </p>
            <AuthStatus
              email={email}
              isPaidUser={isPaidUser}
              variant="practice"
            />
          </div>
        </div>
        <div className="absolute inset-0 opacity-20 bg-repeat" />
      </section>

      <section className="relative py-16 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
        <div className="absolute inset-0 opacity-5 bg-repeat" />
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section) => {
              const isAccessible = !section.isLocked || isPaidUser;
              const href = `/flashcards/${flashcardSet.language.toLowerCase()}/${
                section.id
              }`;

              return isAccessible ? (
                <Link
                  key={section.id}
                  href={href}
                  className="group p-8 rounded-2xl text-left transition-all bg-gradient-to-br from-[#1A1A1A] to-[#252525] text-white border border-[#333333] hover:border-[#DAA520] hover:from-[#1A1A1A] hover:to-[#252525] hover:shadow-lg hover:shadow-[#DAA520]/10"
                >
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#DAA520] transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {section.description}
                  </p>
                </Link>
              ) : (
                <div
                  key={section.id}
                  className="relative p-8 rounded-2xl text-left bg-gradient-to-br from-[#1A1A1A]/40 to-[#252525]/40 border border-[#333333]/30 backdrop-blur"
                >
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-[#333333]/30 via-[#DAA520]/5 to-[#333333]/30 rounded-2xl" />
                  <div className="absolute inset-0 bg-black/40 rounded-2xl" />
                  <div className="relative flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-3">
                      <Lock className="h-6 w-6 text-[#DAA520]" />
                      <h3 className="text-2xl font-bold text-gray-500">
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">{section.description}</p>
                    <div className="inline-flex items-center gap-2 text-sm text-[#DAA520] bg-[#DAA520]/5 px-3 py-1.5 rounded-full border border-[#DAA520]/10">
                      <Lock className="h-3.5 w-3.5" />
                      <span>Premium Feature</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
