"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { useAuth } from "@/hooks/learn/useAuth";
import { sections } from "@/lib/learn/sections";
import { FlashcardWord } from "@/lib/learn/types";
import { shuffleArray } from "@/lib/learn/utils";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import Loader from "@/components/learn/Loader";
import FlashcardGame from "@/components/learn/FlashcardGame";
import SectionNavigation from "@/components/learn/SectionNavigation";

interface Props {
  words: FlashcardWord[];
  section: string;
  language: {
    name: string;
    slug: string;
  };
}

export default function SectionClient({
  words: initialWords,
  section,
  language,
}: Props) {
  const { email, isPaidUser, isLoading } = useAuth();
  const router = useRouter();
  const [words, setWords] = useState<FlashcardWord[]>(initialWords);
  const currentSection = sections.find((s) => s.id === section);

  useEffect(() => {
    setWords(shuffleArray(initialWords));
  }, [initialWords]);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentSection) {
    router.push("/learn");
    return null;
  }

  const breadcrumbItems = [
    { name: "Learn", href: "/learn" },
    { name: language.name, href: `/learn/${language.slug}` },
    {
      name: currentSection.title,
      href: `/learn/${language.slug}/${section}`,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbNav items={breadcrumbItems} />

      <div className="flex-1 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative">
        <div className="h-full flex flex-col">
          <h1 className="sr-only">
            {currentSection.title} - Learn {language.name} Vocabulary with
            Flashcards
          </h1>
          <div className="flex-1 flex items-center justify-center pb-12">
            {currentSection.isLocked && !isPaidUser ? (
              <div className="max-w-md mx-auto p-8 text-center">
                <div className="mb-6">
                  <Lock className="h-12 w-12 text-[#DAA520] mx-auto" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Premium Content Awaits!
                </h2>
                <p className="text-gray-400 mb-6">
                  Unlock this section and many more to continue your language
                  learning journey. Get access to all premium features and
                  content.
                </p>
                <button
                  onClick={() => router.push(`/learn/${language.slug}/pricing`)}
                  className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-black bg-[#DAA520] hover:bg-[#B8860B] rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Lock className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  Unlock Premium Content
                </button>
                <p className="mt-4 text-sm text-gray-500">
                  Join thousands of learners who have already unlocked their
                  full potential
                </p>
              </div>
            ) : (
              <FlashcardGame words={words} isPaidUser={isPaidUser} />
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <SectionNavigation
              currentSectionId={section}
              language={language.slug}
              isPaidUser={isPaidUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
