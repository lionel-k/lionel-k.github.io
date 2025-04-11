"use client";

import AuthStatus from "@/components/flashcards/AuthStatus";
import LanguagesGrid from "@/components/flashcards/LanguagesGrid";
import { useAuth } from "@/hooks/flashcards/useAuth";
import Loader from "@/components/flashcards/Loader";

export default function FlashcardsPage() {
  const { email, isPaidUser, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-16 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display mt-8">
              Practice African Languages
            </h1>
            <p className="mt-4 text-xl leading-8 text-gray-300">
              Choose a language below to start learning with interactive
              flashcards
            </p>
            <AuthStatus email={email} isPaidUser={isPaidUser} variant="full" />
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 pattern-cross pattern-[#DAA520] pattern-size-6" />
      </section>

      <section className="py-16 bg-[#FAF8F5]">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <LanguagesGrid />
        </div>
      </section>
    </div>
  );
}
