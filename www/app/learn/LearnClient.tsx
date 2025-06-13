"use client";

import LanguagesGrid from "@/components/learn/LanguagesGrid";
import { useAuth } from "@/hooks/learn/useAuth";
import Loader from "@/components/learn/Loader";
import NavigationControl from "@/components/learn/NavigationControl";
import CTAButton from "@/components/learn/CTAButton";

export default function LearnClient() {
  const { email, isPaidUser, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-16 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display">
              Keep Your Family's Language Alive
            </h1>
            <p className="mt-4 text-xl leading-8 text-gray-300">
              Your kids will thank you later. Just 10 minutes a day.
            </p>
            <CTAButton href="/learn/kirundi/basics" />
            <NavigationControl email={email} />
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

      <section className="relative py-16 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A]">
        <div className="absolute inset-0 opacity-5 bg-repeat" />
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display mb-4">
              See How It Works
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Watch this quick demo to see how our lessons work.
            </p>
            <div className="mx-auto max-w-3xl">
              <div className="relative mx-auto max-w-md sm:max-w-lg">
                <div className="aspect-[9/16] w-full max-h-[60vh]">
                  <iframe
                    className="w-full h-full rounded-lg shadow-2xl border border-gray-700"
                    src="https://www.youtube.com/embed/jOZg7nc6nZ8"
                    title="How LinguAfrica Works - Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
