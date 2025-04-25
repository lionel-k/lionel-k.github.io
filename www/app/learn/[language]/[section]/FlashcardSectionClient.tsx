"use client";

import { useAuth } from "@/hooks/learn/useAuth";
import { FlashcardSet } from "@/lib/learn/types";
import { sections } from "@/lib/learn/sections";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import FlashcardGame from "@/components/learn/FlashcardGame";
import PaywallModal from "@/components/learn/PaywallModal";
import SignInModal from "@/components/learn/SignInModal";
import Loader from "@/components/learn/Loader";
import { useState } from "react";

type Props = {
  flashcardSet: FlashcardSet;
  section: string;
};

export default function FlashcardSectionClient({
  flashcardSet,
  section,
}: Props) {
  const { email, isPaidUser, isLoading } = useAuth();
  const currentSection = sections.find((s) => s.id === section);
  const [showPaywall, setShowPaywall] = useState(
    currentSection?.isLocked && !isPaidUser
  );
  const [showSignIn, setShowSignIn] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentSection) {
    return null;
  }

  const handleSignInClick = () => {
    setShowPaywall(false);
    setShowSignIn(true);
  };

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

  console.log("flashcardSet", flashcardSet);
  console.log("section", section);

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
      <FlashcardGame words={flashcardSet.words} />
    </div>
  );
}
