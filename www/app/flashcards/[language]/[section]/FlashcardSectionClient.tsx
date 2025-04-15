"use client";

import { useAuth } from "@/hooks/flashcards/useAuth";
import FlashcardGame from "@/components/flashcards/FlashcardGame";
import { FlashcardSet } from "@/lib/flashcards/types";
import AuthStatus from "@/components/flashcards/AuthStatus";
import Loader from "@/components/flashcards/Loader";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { sections } from "../sections";

type Props = {
  flashcardSet: FlashcardSet;
  section: string;
};

export default function FlashcardSectionClient({
  flashcardSet,
  section,
}: Props) {
  const { email, isPaidUser, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  const currentSection = sections.find((s) => s.id === section);

  if (!currentSection) {
    return <div>Section not found</div>;
  }

  // Redirect to paywall if trying to access locked section
  if (currentSection.isLocked && !isPaidUser) {
    return <div>This section requires a premium account</div>;
  }

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Flashcards", href: "/flashcards" },
    {
      name: flashcardSet.language,
      href: `/flashcards/${flashcardSet.language.toLowerCase()}`,
    },
    {
      name: currentSection.title,
      href: `/flashcards/${flashcardSet.language.toLowerCase()}/${section}`,
    },
  ];

  return (
    <div className="min-h-screen">
      <BreadcrumbNav items={breadcrumbItems} />
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-16 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display">
              {currentSection.title}
            </h1>
            <p className="mt-4 text-xl leading-8 text-gray-300">
              {currentSection.description}
            </p>
            <AuthStatus
              email={email}
              isPaidUser={isPaidUser}
              variant="practice"
            />
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 pattern-cross pattern-[#DAA520] pattern-size-6" />
      </section>

      <section className="py-16 bg-[#FAF8F5]">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <FlashcardGame
            words={flashcardSet.words}
            isPaidUser={isPaidUser}
            email={email}
          />
        </div>
      </section>
    </div>
  );
}
