"use client";

import { useAuth } from "@/hooks/learn/useAuth";
import { FlashcardWord } from "@/lib/learn/types";
import { sections } from "@/lib/learn/sections";
import SectionCard from "@/components/learn/SectionCard/index";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import Loader from "@/components/learn/Loader";
import PaywallModal from "@/components/learn/PaywallModal";
import SignInModal from "@/components/learn/SignInModal";
import { useState } from "react";
import PageHeader from "@/components/learn/PageHeader";

type Props = {
  words: FlashcardWord[];
};

export default function LanguageClient({ words }: Props) {
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

  const language = words[0].language;

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Learn", href: "/learn" },
    {
      name: language,
      href: `/learn/${language.toLowerCase()}`,
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
      <PageHeader
        title={`${language} Vocabulary`}
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
                language={language}
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
