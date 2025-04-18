"use client";

import AuthStatus from "@/components/learn/AuthStatus";
import LanguagesGrid from "@/components/learn/LanguagesGrid";
import { useAuth } from "@/hooks/learn/useAuth";
import Loader from "@/components/learn/Loader";
import PaymentSuccessMessage from "@/components/learn/PaymentSuccessMessage";
import { Suspense } from "react";

export default function LearnPage() {
  const { email, isPaidUser, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <Suspense>
        <PaymentSuccessMessage />
      </Suspense>
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-16 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display">
              Learn African Languages
            </h1>
            <p className="mt-4 text-xl leading-8 text-gray-300">
              Choose a language to start learning with interactive lessons.
            </p>
            <AuthStatus
              email={email}
              isPaidUser={isPaidUser}
              variant="default"
            />
          </div>
        </div>
        <div className="absolute inset-0 opacity-20 bg-repeat" />
      </section>

      <section className="relative py-16 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
        <div className="absolute inset-0 opacity-5 bg-repeat" />
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <LanguagesGrid />
        </div>
      </section>
    </div>
  );
}
