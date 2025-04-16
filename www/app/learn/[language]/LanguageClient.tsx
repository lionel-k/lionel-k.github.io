"use client";

import { useAuth } from "@/hooks/learn/useAuth";
import { FlashcardSet } from "@/lib/learn/types";
import { sections } from "@/lib/learn/sections";
import AuthStatus from "@/components/learn/AuthStatus";
import SectionCard from "@/components/learn/SectionCard";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import Loader from "@/components/learn/Loader";
import PaywallModal from "@/components/learn/PaywallModal";
import SignInModal from "@/components/learn/SignInModal";
import { useState } from "react";

type Props = {
  flashcardSet: FlashcardSet;
};

export default function LanguageClient({ flashcardSet }: Props) {
  const { email, isPaidUser, isLoading } = useAuth();
  const [showPaywall, setShowPaywall] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  const handleSignInClick = () => {
    setShowPaywall(false);
    setShowSignIn(true);
  };

  const handleShowPaywall = () => {
    setShowPaywall(true);
  };

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Learn", href: "/learn" },
    {
      name: flashcardSet.language,
      href: `/learn/${flashcardSet.language.toLowerCase()}`,
    },
  ];

  return (
    <div className="min-h-screen animate-in fade-in duration-300">
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
              {flashcardSet.language}
            </h1>
            <p className="mt-4 text-xl leading-8 text-gray-300">
              Choose a section to start learning.
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

      <section className="relative py-16 bg-[#0A0A0A]">
        <div className="absolute inset-0 opacity-5 bg-repeat" />
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                language={flashcardSet.language}
                isPaidUser={isPaidUser}
                onPremiumClick={handleShowPaywall}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
