"use client";

import { useState, useEffect } from "react";
import { FlashcardWord } from "@/lib/learn/types";
import {
  generateOptions,
  playFeedbackSound,
  shuffleArray,
} from "@/lib/learn/utils";
import { FlashcardGameProps } from "@/lib/learn/types";
import Loader from "../Loader";
import { sections } from "@/lib/learn/sections";
import { useRouter, useParams } from "next/navigation";
import ProgressBar from "./ProgressBar";
import WordCard from "./WordCard";
import ImageGrid from "./ImageGrid";
import RecapModal from "./RecapModal";
import FullscreenToggle from "./FullscreenToggle";
import { RotateCcw } from "lucide-react";

const TOTAL_FREE_SECTIONS = sections.filter(
  (section) => section.isLocked === false
).length;

export default function FlashcardGame({
  words: initialWords,
  isPaidUser,
}: FlashcardGameProps) {
  const [words, setWords] = useState(initialWords);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [options, setOptions] = useState(() =>
    generateOptions(words[0], words)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showRecap, setShowRecap] = useState(false);
  const [showViewResults, setShowViewResults] = useState(false);
  const router = useRouter();
  const params = useParams();
  const currentSectionId = params.section as string;
  const currentLanguage = params.language as string;

  const currentSectionIndex = sections.findIndex(
    (s) => s.id === currentSectionId
  );
  const nextSection = sections[currentSectionIndex + 1];
  const remainingFreeSections = Math.max(
    0,
    TOTAL_FREE_SECTIONS - (currentSectionIndex + 1)
  );
  const progress = ((currentIndex + 1) / words.length) * 100;
  const currentWord = words[currentIndex];

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setOptions(generateOptions(words[currentIndex], words));
  }, [currentIndex, words]);

  if (isLoading) {
    return <Loader />;
  }

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    const isCorrect = answer === currentWord.id;
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }
    playFeedbackSound(isCorrect);
    if (currentIndex === words.length - 1) {
      setShowViewResults(true);
    }
  };

  const handleViewResults = () => {
    setShowRecap(true);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setShowRecap(false);
    setShowViewResults(false);
    const shuffledWords = shuffleArray([...words]);
    setWords(shuffledWords);
    setOptions(generateOptions(shuffledWords[0], shuffledWords));
  };

  const handleNextSection = () => {
    if (nextSection) {
      router.push(`/learn/${currentLanguage}/${nextSection.id}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col">
      {/* Progress Bar and Fullscreen Toggle */}
      <div className="px-4 py-4 flex items-center gap-4">
        <div className="flex-1">
          <ProgressBar progress={progress} language={currentLanguage} />
        </div>
        <button
          onClick={handleRestart}
          className="p-2 text-[#DAA520] bg-transparent border border-[#DAA520] hover:bg-[#DAA520]/10 rounded-lg transition-colors flex items-center justify-center"
          title="Restart Game"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <FullscreenToggle />
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col px-4 pb-8">
        {/* Word */}
        <div className="pb-1">
          <WordCard word={currentWord} language={currentLanguage} />
        </div>

        <div className="flex-1 flex flex-col">
          {/* Images */}
          <div className="w-full max-w-3xl mx-auto mb-6">
            <ImageGrid
              options={options}
              selectedAnswer={selectedAnswer}
              currentWordId={currentWord.id}
              onAnswer={handleAnswer}
            />
          </div>

          {/* Next Word Button (only show if not last word) */}
          {selectedAnswer && !showRecap && (
            <div className="w-full max-w-3xl mx-auto">
              {showViewResults ? (
                <button
                  onClick={handleViewResults}
                  className="w-full py-3 mt-4 text-center font-semibold text-black bg-[#DAA520] hover:bg-[#B8860B] rounded-lg transition-colors"
                >
                  View Results
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full py-3 mt-4 text-center font-semibold text-black bg-[#DAA520] hover:bg-[#B8860B] rounded-lg transition-colors"
                >
                  Next Word
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Recap Modal */}
      {showRecap && (
        <RecapModal
          correctAnswers={correctAnswers}
          totalQuestions={words.length}
          nextSection={nextSection}
          onRestart={handleRestart}
          onNextSection={handleNextSection}
          remainingFreeSections={remainingFreeSections}
          isPaidUser={isPaidUser}
          language={currentLanguage}
        />
      )}
    </div>
  );
}
