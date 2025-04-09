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
      .map((w) => ({ id: w.id, image: w.image }));
    const shuffled = [...allOptions].sort(() => Math.random() - 0.5);
    const distractors = shuffled.slice(0, 3);
    return [
      ...distractors,
      { id: currentWord.id, image: currentWord.image },
    ].sort(() => Math.random() - 0.5);
  }, [currentWord, words]);

  const handleAnswer = (answerId: string) => {
    setSelectedAnswer(answerId);
    if (answerId === currentWord.id) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const getImageStyle = (imageId: string) => {
    if (!selectedAnswer)
      return "border-4 border-gray-200 hover:border-blue-500";
    if (imageId === currentWord.id) return "border-4 border-green-500";
    if (imageId === selectedAnswer) return "border-4 border-red-500";
    return "border-4 border-gray-200";
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="text-right mb-4">
        <span className="text-lg font-semibold">Score: {score}</span>
      </div>

      <div className="mb-8 p-6 rounded-lg bg-blue-50 text-center">
        <p className="text-3xl font-bold text-blue-900">
          {currentWord.translation}
        </p>
        <p className="text-sm text-blue-600 mt-2">Choose the matching image</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => !selectedAnswer && handleAnswer(option.id)}
            disabled={selectedAnswer !== null}
            className="relative aspect-square rounded-lg overflow-hidden transition-transform hover:scale-105 focus:outline-none"
          >
            <Image
              src={option.image}
              alt="Option"
              fill
              className={`object-cover rounded-lg ${getImageStyle(option.id)}`}
            />
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <div className="mt-6 text-center">
          <div
            className={`mb-4 p-3 rounded-lg ${
              selectedAnswer === currentWord.id
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {selectedAnswer === currentWord.id ? (
              <p>Correct! 🎉</p>
            ) : (
              <p>Incorrect. Try to remember this image for next time!</p>
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
