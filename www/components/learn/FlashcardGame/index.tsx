"use client";

import { useState, useEffect } from "react";
import { FlashcardWord } from "@/lib/learn/types";
import { generateOptions } from "@/lib/learn/utils";
import { FlashcardGameProps } from "@/lib/learn/types";
import Loader from "../Loader";
import { sections } from "@/lib/learn/sections";
import { useRouter, useParams } from "next/navigation";
import ProgressBar from "./ProgressBar";
import WordCard from "./WordCard";
import ImageGrid from "./ImageGrid";
import FeedbackSection from "./FeedbackSection";
import GameRecap from "./GameRecap";

export default function FlashcardGame({ words }: FlashcardGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [options, setOptions] = useState<FlashcardWord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const router = useRouter();
  const params = useParams();
  const currentSectionId = params.section as string;
  const currentLanguage = params.language as string;

  const currentSectionIndex = sections.findIndex(
    (s) => s.id === currentSectionId
  );
  const nextSection = sections[currentSectionIndex + 1];
  const progress = ((currentIndex + 1) / words.length) * 100;
  const currentWord = words[currentIndex];

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setOptions(generateOptions(currentWord, words));
  }, [currentIndex, words, currentWord]);

  if (isLoading) {
    return <Loader />;
  }

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (answer === currentWord.id) {
      setCorrectAnswers((prev) => prev + 1);
    }
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
  };

  const handleNextSection = () => {
    if (nextSection) {
      router.push(`/learn/${currentLanguage}/${nextSection.id}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col">
      {/* Progress Bar */}
      <div className="px-4 py-4">
        <ProgressBar progress={progress} language={currentLanguage} />
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

          {/* Feedback */}
          {selectedAnswer && (
            <div className="w-full max-w-3xl mx-auto">
              {currentIndex === words.length - 1 && (
                <GameRecap
                  correctAnswers={correctAnswers}
                  totalQuestions={words.length}
                />
              )}
              <FeedbackSection
                isLastWord={currentIndex === words.length - 1}
                nextSection={nextSection}
                onNext={handleNext}
                onRestart={handleRestart}
                onNextSection={handleNextSection}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
