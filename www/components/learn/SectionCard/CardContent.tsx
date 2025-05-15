import { Lock, ArrowRight } from "lucide-react";
import { Section } from "@/lib/learn/sections";
import { getAvailableWords } from "@/lib/learn/utils";

type CardContentProps = {
  section: Section;
  isAccessible: boolean;
  language: string;
};

export function CardContent({
  section,
  isAccessible,
  language,
}: CardContentProps) {
  const wordsCount = getAvailableWords(section.id, language).length;

  return (
    <div className="relative z-10 h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-2xl font-bold text-white group-hover:text-[#DAA520] transition-colors">
            {section.title}
          </h3>
          {section.isReview && (
            <span className="px-3 py-1 rounded-full bg-[#DAA520]/20 text-[#DAA520] text-xs font-semibold border border-[#DAA520]/40">
              Review
            </span>
          )}
        </div>
        <p className="text-base text-gray-200">{section.description}</p>
        <p className="text-sm text-gray-400 mt-2">
          {wordsCount} {wordsCount === 1 ? "flashcard" : "flashcards"}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        {!isAccessible ? (
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#DAA520]" />
            <span className="text-sm font-semibold text-[#DAA520]">
              Premium Feature
            </span>
          </div>
        ) : (
          <div className="text-sm font-semibold text-[#DAA520]">
            Click to start
          </div>
        )}
        <ArrowRight className="h-5 w-5 text-[#DAA520] group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
