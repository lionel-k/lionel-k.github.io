"use client";

import { useAuth } from "@/hooks/flashcards/useAuth";
import { FlashcardSet } from "@/lib/flashcards/types";
import AuthStatus from "@/components/flashcards/AuthStatus";
import Loader from "@/components/flashcards/Loader";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { sections } from "@/lib/flashcards/sections";
import PaywallModal from "@/components/flashcards/PaywallModal";
import SignInModal from "@/components/flashcards/SignInModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SectionCard from "@/components/flashcards/SectionCard";

type Props = {
  flashcardSet: FlashcardSet;
};

export default function FlashcardLanguageClient({ flashcardSet }: Props) {
  const { email, isPaidUser, isLoading } = useAuth();
  const [showPaywall, setShowPaywall] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const router = useRouter();

  const handleSignInClick = () => {
    setShowPaywall(false);
    setShowSignIn(true);
  };

  const handleSectionClick = (section: (typeof sections)[number]) => {
    if (section.isLocked && !isPaidUser) {
      setShowPaywall(true);
    } else {
      router.push(
        `/flashcards/${flashcardSet.language.toLowerCase()}/${section.id}`
      );
    }
  };

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

              return (
                <SectionCard
                  key={section.id}
                  section={section}
                  isAccessible={isAccessible}
                  onClick={handleSectionClick}
                />
              );
            })}
          </div>
        </div>
      </section>

      {showPaywall && (
        <PaywallModal
          onClose={() => setShowPaywall(false)}
          email={email}
          onSignInClick={handleSignInClick}
        />
      )}

      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </div>
  );
}
