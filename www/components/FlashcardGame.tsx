"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FlashcardWord } from "@/lib/flashcards/types";

type Props = {
  words: FlashcardWord[];
};

export default function FlashcardGame({ words }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [options, setOptions] = useState<Array<{ id: string; image: string }>>(
    []
  );

  useEffect(() => {
    const currentWord = words[currentIndex];
    const allOptions = words
      .filter((w) => w.id !== currentWord.id)
      .map((w) => ({ id: w.id, image: w.image }));

    const shuffled = [...allOptions].sort(() => Math.random() - 0.5);
    const distractors = shuffled.slice(0, 3);
    const newOptions = [
      ...distractors,
      { id: currentWord.id, image: currentWord.image },
    ].sort(() => Math.random() - 0.5);

    setOptions(newOptions);
  }, [currentIndex, words]);

  const currentWord = words[currentIndex];

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
      return "border-2 border-gray-200 hover:border-blue-500";
    if (imageId === currentWord.id) return "border-2 border-green-500";
    if (imageId === selectedAnswer) return "border-2 border-red-500";
    return "border-2 border-gray-200";
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col max-w-lg mx-auto px-4 py-2">
      {/* Compact header */}
      <div className="flex justify-end mb-1">
        <span className="text-sm font-medium">Score: {score}</span>
      </div>

      {/* Word to learn */}
      <div className="bg-blue-50 rounded-lg py-3 px-4 mb-3 text-center">
        <p className="text-2xl font-bold text-blue-900">
          {currentWord.translation}
        </p>
      </div>

      {/* Image grid with reduced gap */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => !selectedAnswer && handleAnswer(option.id)}
            disabled={selectedAnswer !== null}
            className="relative aspect-square rounded-lg overflow-hidden transition-transform hover:scale-102 focus:outline-none"
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

      {/* Feedback and next button */}
      {selectedAnswer && (
        <div className="space-y-1.5">
          <div
            className={`py-1.5 px-2 rounded-lg text-center text-sm ${
              selectedAnswer === currentWord.id
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {selectedAnswer === currentWord.id ? (
              <p>Correct! 🎉</p>
            ) : (
              <p>Incorrect. The correct image is highlighted in green.</p>
            )}
          </div>
          {currentIndex < words.length - 1 ? (
            <button
              onClick={handleNext}
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Next Word
            </button>
          ) : (
            <div className="text-center space-y-1.5">
              <p className="font-bold text-sm">
                Game Over! Score: {score}/{words.length}
              </p>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setScore(0);
                  setSelectedAnswer(null);
                }}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
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
