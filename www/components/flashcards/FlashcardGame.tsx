"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FlashcardWord } from "@/lib/flashcards/types";
import { generateOptions, getAudioPath } from "@/lib/flashcards/utils";
import { FlashcardGameProps } from "@/lib/flashcards/types";
import Loader from "./Loader";
import { ArrowRight, Volume2 } from "lucide-react";
import { sections } from "@/lib/flashcards/sections";
import { useRouter, useParams } from "next/navigation";

export default function FlashcardGame({ words }: FlashcardGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [options, setOptions] = useState<FlashcardWord[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [audioError, setAudioError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const currentSectionId = params.section as string;
  const currentLanguage = params.language as string;

  const currentSectionIndex = sections.findIndex(
    (s) => s.id === currentSectionId
  );
  const nextSection = sections[currentSectionIndex + 1];

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const currentWord = words[currentIndex];
    setOptions(generateOptions(words, currentWord));
    setAudioError(null);
  }, [currentIndex, words]);

  if (isLoading) {
    return <Loader />;
  }

  const currentWord = words[currentIndex];

  const playAudio = async () => {
    try {
      setAudioError(null);
      const audioPath = getAudioPath(currentWord.language, currentWord.id);
      const audio = new Audio(audioPath);
      await audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
      setAudioError("Could not play audio");
    }
  };

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
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleNextSection = () => {
    if (nextSection) {
      router.push(`/flashcards/${currentLanguage}/${nextSection.id}`);
    }
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
    <div className="min-h-[calc(100vh-4rem)] flex flex-col max-w-lg mx-auto px-4 py-2">
      <div className="bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] backdrop-blur-sm rounded-lg py-6 px-6 mb-4 text-center border border-[#DAA520]/20">
        <div className="inline-flex items-center gap-4">
          <button
            className={`p-3 rounded-xl hover:bg-[#DAA520]/10 transition-colors ${
              audioError ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            onClick={playAudio}
            title={audioError || "Play pronunciation"}
            disabled={!!audioError}
          >
            <Volume2 className="h-7 w-7 text-[#DAA520]" />
          </button>
          <p className="text-3xl font-bold text-white">
            {currentWord.translation}
          </p>
        </div>
        {audioError && (
          <p className="text-red-500 text-sm mt-2">{audioError}</p>
        )}
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
              className={`object-cover rounded-lg ${getImageStyle(option.id)}`}
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
            <div className="space-y-3">
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
              {nextSection && (
                <button
                  onClick={handleNextSection}
                  className="w-full py-3 px-4 bg-[#DAA520] text-black font-semibold rounded-lg hover:bg-[#B8860B] transition-colors flex items-center justify-center gap-2"
                >
                  Next Section: {nextSection.title}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
