"use client";

import { useAuth } from "@/hooks/learn/useAuth";
import { FlashcardWord } from "@/lib/learn/types";
import { sections } from "@/lib/learn/sections";
import { useRouter } from "next/navigation";
import PaywallModal from "@/components/learn/PaywallModal";
import SignInModal from "@/components/learn/SignInModal";
import { useState, useEffect } from "react";
import FlashcardGame from "@/components/learn/FlashcardGame/index";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import Loader from "@/components/learn/Loader";
import { Lock } from "lucide-react";
import PageHeader from "@/components/learn/PageHeader";

type Props = {
  words: FlashcardWord[];
  section: string;
};

export default function SectionClient({ words, section }: Props) {
  const { email, isPaidUser, isLoading } = useAuth();
  const router = useRouter();
  const currentSection = sections.find((s) => s.id === section);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    if (currentSection?.isLocked && !isPaidUser) {
      setShowPaywall(true);
    } else {
      setShowPaywall(false);
    }
  }, [currentSection?.isLocked, isPaidUser]);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentSection) {
    router.push("/learn");
    return null;
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
    {
      name: currentSection.title,
      href: `/learn/${language.toLowerCase()}/${section}`,
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
        title={currentSection.title}
        description={currentSection.description}
        email={email}
        isPaidUser={isPaidUser}
      />
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
            <FlashcardGame words={words} />
          )}
        </div>
      </section>
    </div>
  );
}
