"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, LayoutList } from "lucide-react";
import { PresentableWord } from "@/lib/learn/types";
import { getImagePath } from "@/lib/learn/utils";
import FullscreenToggle from "@/components/learn/FlashcardGame/FullscreenToggle";

interface Props {
  words: PresentableWord[];
}

export default function TeachSectionPresenter({ words }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [jumpListOpen, setJumpListOpen] = useState(false);

  const currentWord = words[currentIndex];
  const total = words.length;

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < total) {
        setCurrentIndex(index);
        setJumpListOpen(false);
      }
    },
    [total]
  );

  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Escape") {
        setJumpListOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  return (
    <div className="flex-1 flex flex-col bg-[#0A0A0A] min-h-0">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <span className="text-sm text-gray-400 tabular-nums">
          {currentIndex + 1} / {total}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setJumpListOpen((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1A1A1A] hover:bg-[#222] text-gray-300 hover:text-white transition-colors text-sm"
            aria-label="Toggle word list"
          >
            <LayoutList className="h-4 w-4" />
            <span className="hidden sm:inline">Words</span>
          </button>
          <FullscreenToggle />
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Jump list */}
        {jumpListOpen && (
          <aside className="w-48 sm:w-56 shrink-0 overflow-y-auto border-r border-white/5 bg-[#111]">
            <ul>
              {words.map((word, i) => (
                <li key={word.id}>
                  <button
                    onClick={() => goTo(i)}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      i === currentIndex
                        ? "bg-[#DAA520]/20 text-[#DAA520] font-semibold"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-xs text-gray-600 mr-2 tabular-nums">{i + 1}.</span>
                    {word.translation}
                    <span className="block text-xs text-gray-600">{word.english}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Main slide */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 py-6 sm:py-10">
          {/* Image */}
          <div className="relative w-full max-w-xs sm:max-w-sm aspect-square rounded-2xl overflow-hidden bg-[#1A1A1A] border border-white/5 shadow-2xl">
            <Image
              key={currentWord.id}
              src={getImagePath(currentWord.id)}
              alt={currentWord.english}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Translation (Kirundi) */}
          <div className="text-center space-y-2">
            <p className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
              {currentWord.translation}
            </p>
            <p className="text-lg sm:text-xl text-gray-400">
              {currentWord.english}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 px-5 py-3 rounded-xl bg-[#1A1A1A] hover:bg-[#222] disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
              aria-label="Previous word"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">Prev</span>
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex === total - 1}
              className="flex items-center gap-1 px-5 py-3 rounded-xl bg-[#DAA520] hover:bg-[#B8860B] disabled:opacity-30 disabled:cursor-not-allowed text-black font-semibold transition-colors"
              aria-label="Next word"
            >
              <span className="hidden sm:inline text-sm">Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <p className="text-xs text-gray-600">
            Use ← → arrow keys or Space to navigate
          </p>
        </div>
      </div>
    </div>
  );
}
