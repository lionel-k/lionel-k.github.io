"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FlashcardWord } from "@/lib/learn/types";
import { generateOptions, getAudioPath } from "@/lib/learn/utils";
import { FlashcardGameProps } from "@/lib/learn/types";
import Loader from "./Loader";
import { ArrowRight, Volume2, Sparkles, RotateCcw } from "lucide-react";
import { sections } from "@/lib/learn/sections";
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
  const progress = ((currentIndex + 1) / words.length) * 100;

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
    if (selectedAnswer) return; // Prevent state changes if an answer is already selected
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
      router.push(`/learn/${currentLanguage}/${nextSection.id}`);
    }
  };

  const getImageStyle = (imageId: string) => {
    if (!selectedAnswer)
      return "border-2 border-[#DAA520]/20 hover:border-[#DAA520] hover:shadow-[0_0_20px_rgba(218,165,32,0.2)] transition-all duration-300";
    if (imageId === currentWord.id)
      return "border-4 border-[#DAA520] ring-2 ring-[#DAA520] shadow-[0_0_30px_rgba(218,165,32,0.3)] scale-[1.02]";
    if (imageId === selectedAnswer)
      return "border-4 border-red-500 ring-2 ring-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)] scale-[1.02]";
    return "border-2 border-[#DAA520]/20 opacity-40 grayscale";
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col max-w-lg mx-auto px-4 py-2">
      {/* Progress bar */}
      <div className="w-full h-1 bg-[#1A1A1A] rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-[#DAA520] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Word card with audio */}
      <button
        onClick={playAudio}
        disabled={!!audioError}
        className="group w-full bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] backdrop-blur-sm rounded-xl py-6 px-6 mb-6 text-center border border-[#DAA520]/20 hover:border-[#DAA520]/40 hover:shadow-[0_0_30px_rgba(218,165,32,0.1)] transition-all duration-300 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="inline-flex items-center gap-4 mb-2">
            <Volume2 className="h-7 w-7 text-[#DAA520] group-hover:scale-110 transition-transform" />
            <p className="text-4xl font-bold text-white tracking-wide">
              {currentWord.translation}
            </p>
          </div>
          {audioError && (
            <p className="text-red-500 text-sm mt-2">{audioError}</p>
          )}
        </div>
        <div className="absolute inset-0 bg-[#DAA520]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Image grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => !selectedAnswer && handleAnswer(option.id)}
            disabled={selectedAnswer !== null}
            className="group relative aspect-square rounded-xl overflow-hidden focus:outline-none"
          >
            <Image
              src={option.image}
              alt="Option"
              fill
              className={`object-cover rounded-xl ${getImageStyle(option.id)}`}
            />
            {!selectedAnswer && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* Feedback and next button */}
      {selectedAnswer && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div
            className={`py-4 px-6 rounded-xl text-center ${
              selectedAnswer === currentWord.id
                ? "bg-[#DAA520]/10 text-[#DAA520] border border-[#DAA520]/20"
                : "bg-red-500/10 text-red-500 border border-red-500/20"
            }`}
          >
            {selectedAnswer === currentWord.id ? (
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5" />
                <p className="text-lg font-medium">Excellent! Keep going! 🎉</p>
              </div>
            ) : (
              <p className="text-lg font-medium">❌ {feedback}</p>
            )}
          </div>
          {currentIndex < words.length - 1 ? (
            <button
              onClick={handleNext}
              className="w-full py-4 px-6 bg-[#DAA520] text-black font-semibold rounded-xl hover:bg-[#B8860B] hover:shadow-[0_0_30px_rgba(218,165,32,0.3)] transition-all duration-300 flex items-center justify-center gap-3 text-lg"
            >
              Next Word
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setSelectedAnswer(null);
                }}
                className="w-full py-4 px-6 bg-[#0A0A0A] text-[#DAA520] font-semibold rounded-xl hover:bg-[#1A1A1A] border border-[#DAA520] transition-all duration-300 flex items-center justify-center gap-3 text-lg group"
              >
                <RotateCcw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                Practice Again
              </button>
              {nextSection && (
                <button
                  onClick={handleNextSection}
                  className="w-full py-4 px-6 bg-[#DAA520] text-black font-semibold rounded-xl hover:bg-[#B8860B] hover:shadow-[0_0_30px_rgba(218,165,32,0.3)] transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                >
                  <span className="flex items-center gap-3">
                    Next Section: {nextSection.title}
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
