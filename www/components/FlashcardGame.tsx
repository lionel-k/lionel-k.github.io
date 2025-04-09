"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { FlashcardWord } from "@/lib/flashcards";

type Props = {
  words: FlashcardWord[];
};

export default function FlashcardGame({ words }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const currentWord = words[currentIndex];

  const options = useMemo(() => {
    const allOptions = words
      .filter((w) => w.id !== currentWord.id)
      .map((w) => w.translation);
    const shuffled = [...allOptions].sort(() => Math.random() - 0.5);
    const distractors = shuffled.slice(0, 3);
    return [...distractors, currentWord.translation].sort(
      () => Math.random() - 0.5
    );
  }, [currentWord, words]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentWord.translation) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const getButtonStyle = (option: string) => {
    if (!selectedAnswer) return "border-gray-200 hover:border-blue-500";
    if (option === currentWord.translation)
      return "border-green-500 bg-green-50";
    if (option === selectedAnswer) return "border-red-500 bg-red-50";
    return "border-gray-200";
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="text-right mb-4">
        <span className="text-lg font-semibold">Score: {score}</span>
      </div>

      <div className="relative aspect-square mb-6 rounded-lg overflow-hidden">
        <Image
          src={currentWord.image}
          alt={currentWord.english}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50">
          <p className="text-white text-xl font-bold">{currentWord.english}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !selectedAnswer && handleAnswer(option)}
            disabled={selectedAnswer !== null}
            className={`p-4 text-center rounded-lg border transition-colors ${getButtonStyle(
              option
            )}`}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <div className="mt-6 text-center">
          <div
            className={`mb-4 p-3 rounded-lg ${
              selectedAnswer === currentWord.translation
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {selectedAnswer === currentWord.translation ? (
              <p>Correct! 🎉</p>
            ) : (
              <p>Incorrect. The correct answer is: {currentWord.translation}</p>
            )}
          </div>
          {currentIndex < words.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Next Word
            </button>
          ) : (
            <div className="mt-8 text-center">
              <p className="text-xl font-bold mb-4">
                Game Over! Final Score: {score}/{words.length}
              </p>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setScore(0);
                  setSelectedAnswer(null);
                }}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
