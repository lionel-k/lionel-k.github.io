import { Lock, ArrowRight } from "lucide-react";
import { Section } from "@/lib/learn/sections";
import { getAvailableWords } from "@/lib/learn/utils";

type CardContentProps = {
  section: Section;
  isAccessible: boolean;
};

export function CardContent({ section, isAccessible }: CardContentProps) {
  const wordsCount = getAvailableWords(section, section.id).length;

  return (
    <div className="relative z-10 h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-2xl font-bold text-white group-hover:text-[#DAA520] transition-all duration-500 group-hover:scale-[1.02] text-shadow">
            {section.title}
          </h3>
          {section.isReview && (
            <span className="px-3 py-1 rounded-full bg-[#DAA520]/20 text-[#DAA520] text-xs font-semibold border border-[#DAA520]/40 group-hover:bg-[#DAA520]/30 group-hover:border-[#DAA520]/60 transition-all duration-500 group-hover:scale-105">
              Review
            </span>
          )}
        </div>
        <p className="text-base text-gray-200 group-hover:text-white transition-all duration-500 text-shadow-sm">
          {section.description}
        </p>
        <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-all duration-500 mt-2">
          {wordsCount} {wordsCount === 1 ? "flashcard" : "flashcards"}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        {!isAccessible ? (
          <div className="flex items-center gap-2 group-hover:scale-[1.02] transition-transform duration-500">
            <Lock className="h-4 w-4 text-[#DAA520] animate-pulse" />
            <span className="text-sm font-semibold text-[#DAA520] group-hover:text-[#FFD700] transition-colors duration-500">
              Premium Feature
            </span>
          </div>
        ) : (
          <div className="text-sm font-semibold text-gray-200 group-hover:text-[#DAA520] transition-all duration-500 group-hover:translate-x-1">
            {section.isReview ? "Test your knowledge" : "Click to start"}
            <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 inline-block animate-bounce-x">
              →
            </span>
          </div>
        )}
        <ArrowRight className="h-5 w-5 text-[#DAA520] transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 animate-pulse-subtle" />
      </div>
    </div>
  );
}
