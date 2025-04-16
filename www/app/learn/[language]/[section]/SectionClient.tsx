"use client";

import { useAuth } from "@/hooks/learn/useAuth";
import { FlashcardSet } from "@/lib/learn/types";
import { sections } from "@/lib/learn/sections";
import { useRouter } from "next/navigation";
import PaywallModal from "@/components/learn/PaywallModal";
import SignInModal from "@/components/learn/SignInModal";
import { useState } from "react";
import FlashcardGame from "@/components/learn/FlashcardGame";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import AuthStatus from "@/components/learn/AuthStatus";
import Loader from "@/components/learn/Loader";
import { shuffleArray } from "@/lib/learn/utils";
import { Lock } from "lucide-react";

type Props = {
  flashcardSet: FlashcardSet;
  section: string;
};

export default function SectionClient({ flashcardSet, section }: Props) {
  const { email, isPaidUser, isLoading } = useAuth();
  const router = useRouter();
  const currentSection = sections.find((s) => s.id === section);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentSection) {
    router.push(`/learn/${flashcardSet.language.toLowerCase()}`);
    return null;
  }

  const handleSignInClick = () => {
    setShowPaywall(false);
    setShowSignIn(true);
  };

  const handleShowPaywall = () => {
    setShowPaywall(true);
  };

  const sectionWords = shuffleArray(flashcardSet.words);

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Learn", href: "/learn" },
    {
      name: flashcardSet.language,
      href: `/learn/${flashcardSet.language.toLowerCase()}`,
    },
    {
      name: currentSection.title,
      href: `/learn/${flashcardSet.language.toLowerCase()}/${section}`,
    },
  ];

  return (
    <div className="min-h-screen">
      {showPaywall && (
        <PaywallModal
          onClose={() => setShowPaywall(false)}
          email={email}
          onSignInClick={handleSignInClick}
        />
      )}
      {showSignIn && (
        <SignInModal
          onClose={() => {
            setShowSignIn(false);
          }}
        />
      )}
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
          {currentSection.isLocked && !isPaidUser ? (
            <div className="flex justify-center">
              <button
                onClick={handleShowPaywall}
                className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-black bg-[#DAA520] hover:bg-[#B8860B] rounded-lg transition-colors"
              >
                <Lock className="h-5 w-5" />
                Unlock Premium Content
              </button>
            </div>
          ) : (
            <FlashcardGame words={sectionWords} />
          )}
        </div>
      </section>
    </div>
  );
}
