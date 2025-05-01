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
          <h3 className="text-2xl font-semibold text-white group-hover:text-[#DAA520] transition-colors">
            {section.title}
          </h3>
          {section.isReview && (
            <span className="px-2 py-1 rounded-full bg-[#DAA520]/20 text-[#DAA520] text-xs font-medium border border-[#DAA520]/30">
              Review
            </span>
          )}
        </div>
        <p className="text-base text-gray-300 group-hover:text-gray-200 transition-colors">
          {section.description}
        </p>
        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors mt-2">
          {wordsCount} {wordsCount === 1 ? "flashcard" : "flashcards"}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        {!isAccessible ? (
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#DAA520]" />
            <span className="text-sm font-medium text-[#DAA520]">
              Premium Feature
            </span>
          </div>
        ) : (
          <div className="text-sm font-medium text-gray-300 group-hover:text-[#DAA520] transition-colors">
            {section.isReview ? "Test your knowledge" : "Click to start"}
          </div>
        )}
        <ArrowRight className="h-5 w-5 text-[#DAA520] transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
      </div>
    </div>
  );
}
