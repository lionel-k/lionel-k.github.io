"use client";

import { useAuth } from "@/hooks/flashcards/useAuth";
import { FlashcardSet } from "@/lib/flashcards/types";
import { sections } from "@/lib/flashcards/sections";
import { useRouter } from "next/navigation";
import PaywallModal from "@/components/flashcards/PaywallModal";
import SignInModal from "@/components/flashcards/SignInModal";
import { useState } from "react";
import FlashcardGame from "@/components/flashcards/FlashcardGame";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import AuthStatus from "@/components/flashcards/AuthStatus";
import Loader from "@/components/flashcards/Loader";

type Props = {
  flashcardSet: FlashcardSet;
  section: string;
};

export default function FlashcardSectionClient({
  flashcardSet,
  section,
}: Props) {
  const { email, isPaidUser, isLoading } = useAuth();
  const router = useRouter();
  const currentSection = sections.find((s) => s.id === section);
  // Initialize modal states first, before any conditional returns
  const [showPaywall, setShowPaywall] = useState(
    currentSection?.isLocked && !isPaidUser
  );
  const [showSignIn, setShowSignIn] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentSection) {
    router.push(`/flashcards/${flashcardSet.language.toLowerCase()}`);
    return null;
  }

  const handleSignInClick = () => {
    setShowPaywall(false);
    setShowSignIn(true);
  };

  const sectionWords = flashcardSet.words;

  // If section is locked and user is not paid, only render the modals and background
  if (currentSection.isLocked && !isPaidUser) {
    return (
      <>
        {showPaywall && (
          <PaywallModal
            onClose={() =>
              router.push(`/flashcards/${flashcardSet.language.toLowerCase()}`)
            }
            email={email}
            onSignInClick={handleSignInClick}
          />
        )}
        {showSignIn && (
          <SignInModal
            onClose={() => {
              setShowSignIn(false);
              router.push(`/flashcards/${flashcardSet.language.toLowerCase()}`);
            }}
          />
        )}
        <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]" />
      </>
    );
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
        <div className="absolute inset-0 opacity-20 bg-repeat" />
      </section>

      <section className="relative py-16 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
        <div className="absolute inset-0 opacity-5 bg-repeat" />
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <FlashcardGame
            words={sectionWords}
            isPaidUser={isPaidUser}
            email={email}
          />
        </div>
      </section>
    </div>
  );
}
