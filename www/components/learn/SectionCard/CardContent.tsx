import { Lock, ArrowRight, Crown } from "lucide-react";
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
    <div className="relative z-20 h-full flex flex-col">
      {/* Premium badge for locked cards */}
      {!isAccessible && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-[#DAA520] to-[#B8860B] rounded-full p-2 shadow-lg z-30">
          <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
        </div>
      )}

      <div className="flex-1 pr-10">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <h3
            className={`text-xl sm:text-2xl font-bold transition-colors break-words ${
              isAccessible
                ? "text-white group-hover:text-[#DAA520]"
                : "text-gray-300"
            }`}
          >
            {section.title}
          </h3>
          {section.isReview && (
            <span className="px-2 sm:px-3 py-1 rounded-full bg-[#DAA520]/20 text-[#DAA520] text-xs font-semibold border border-[#DAA520]/40 shrink-0">
              Review
            </span>
          )}
        </div>
        <p
          className={`text-sm sm:text-base break-words ${
            isAccessible ? "text-gray-200" : "text-gray-400"
          }`}
        >
          {section.description}
        </p>
        <p
          className={`text-xs sm:text-sm mt-2 ${
            isAccessible ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {wordsCount} {wordsCount === 1 ? "flashcard" : "flashcards"}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4 gap-2">
        {!isAccessible ? (
          <div className="flex items-center gap-2 bg-[#DAA520]/10 px-2 sm:px-3 py-2 rounded-full border border-[#DAA520]/30 min-w-0 flex-shrink">
            <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-[#DAA520] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-[#DAA520] truncate">
              Premium Feature
            </span>
          </div>
        ) : (
          <div className="text-xs sm:text-sm font-semibold text-[#DAA520] truncate">
            Click to start
          </div>
        )}
        <ArrowRight
          className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform shrink-0 ${
            isAccessible
              ? "text-[#DAA520] group-hover:translate-x-1"
              : "text-gray-500"
          }`}
        />
      </div>
    </div>
  );
}
