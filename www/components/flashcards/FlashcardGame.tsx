"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FlashcardWord } from "@/lib/flashcards/types";
import {
  generateOptions,
  getPlaysCount,
  incrementPlaysCount,
  MAX_PLAYS,
} from "./utils";
import PaywallModal from "./PaywallModal";
import SignInModal from "./SignInModal";
import { FlashcardGameProps } from "./types";
import Loader from "./Loader";
import { ArrowRight } from "lucide-react";

export default function FlashcardGame({
  words,
  isPaidUser,
  email,
}: FlashcardGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [options, setOptions] = useState<FlashcardWord[]>([]);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [playsCount, setPlaysCount] = useState(0);
  const [feedback, setFeedback] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPlaysCount(getPlaysCount());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const currentWord = words[currentIndex];
    setOptions(generateOptions(words, currentWord));
  }, [currentIndex, words]);

  if (isLoading) {
    return <Loader />;
  }

  const currentWord = words[currentIndex];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);

    // Handle correct/incorrect feedback
    const isCorrect = answer === words[currentIndex].translation;
    if (isCorrect) {
      setFeedback("Correct!");
    } else {
      setFeedback("The correct image is highlighted in gold!");
    }
    setShowFeedback(true);

    // Check plays count first for any attempt
    const plays = getPlaysCount();
    if (plays >= MAX_PLAYS && !isPaidUser) {
      setShowPaywall(true);
      return;
    }
    incrementPlaysCount();
    setPlaysCount(plays + 1);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      if (!isPaidUser) {
        const newPlaysCount = playsCount + 1;
        incrementPlaysCount();
        setPlaysCount(newPlaysCount);
      }

      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const handleSignInClick = () => {
    setShowPaywall(false);
    setShowSignIn(true);
  };

  const handleSignInComplete = () => {
    setShowSignIn(false);
  };

  const getImageStyle = (imageId: string) => {
    if (!selectedAnswer)
      return "border-2 border-[#DAA520]/20 hover:border-[#DAA520] transition-all duration-200";
    if (imageId === currentWord.id)
      return "border-4 border-[#DAA520] ring-2 ring-[#DAA520] shadow-[0_0_15px_rgba(218,165,32,0.5)]";
    if (imageId === selectedAnswer)
      return "border-4 border-red-500 ring-2 ring-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]";
    return "border-2 border-[#DAA520]/20 opacity-50";
  };

  return (
    <>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col max-w-lg mx-auto px-4 py-2">
        {/* Word to learn */}
        <div className="bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] backdrop-blur-sm rounded-lg py-6 px-6 mb-4 text-center border border-[#DAA520]/20">
          <p className="text-3xl font-bold text-white">
            {currentWord.translation}
          </p>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => !selectedAnswer && handleAnswer(option.id)}
              disabled={selectedAnswer !== null}
              className="relative aspect-square rounded-lg overflow-hidden transition-all duration-200 hover:scale-[1.02] focus:outline-none group"
            >
              <Image
                src={option.image}
                alt="Option"
                fill
                className={`object-cover rounded-lg ${getImageStyle(
                  option.id
                )}`}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        {/* Feedback and next button */}
        {selectedAnswer && (
          <div className="space-y-3">
            <div
              className={`py-3 px-4 rounded-lg text-center ${
                selectedAnswer === currentWord.id
                  ? "bg-[#DAA520]/10 text-[#DAA520]"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {selectedAnswer === currentWord.id ? (
                <p>Correct! 🎉</p>
              ) : (
                <p>❌ {feedback}</p>
              )}
            </div>
            {currentIndex < words.length - 1 ? (
              <button
                onClick={handleNext}
                className="w-full py-3 px-4 bg-[#DAA520] text-black font-semibold rounded-lg hover:bg-[#B8860B] transition-colors flex items-center justify-center gap-2"
              >
                Next Word
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <div className="text-center">
                <button
                  onClick={() => {
                    setCurrentIndex(0);
                    setSelectedAnswer(null);
                  }}
                  className="w-full py-3 px-4 bg-[#0A0A0A] text-[#DAA520] font-semibold rounded-lg hover:bg-[#1A1A1A] border border-[#DAA520] transition-colors flex items-center justify-center gap-2"
                >
                  Start Over
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showPaywall && (
        <PaywallModal
          email={email}
          onClose={() => setShowPaywall(false)}
          onSignInClick={handleSignInClick}
        />
      )}

      {showSignIn && (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          onSignInComplete={handleSignInComplete}
        />
      )}
    </>
  );
}
