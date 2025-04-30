import { ArrowRight, Sparkles, RotateCcw } from "lucide-react";
import { Section } from "@/lib/learn/sections";

type FeedbackSectionProps = {
  selectedAnswer: string;
  currentWordId: string;
  isLastWord: boolean;
  nextSection: Section | undefined;
  onNext: () => void;
  onRestart: () => void;
  onNextSection: () => void;
};

export default function FeedbackSection({
  selectedAnswer,
  currentWordId,
  isLastWord,
  nextSection,
  onNext,
  onRestart,
  onNextSection,
}: FeedbackSectionProps) {
  return (
    <div className="space-y-1">
      {isLastWord ? (
        <div className="space-y-2 mt-4">
          <button
            onClick={onRestart}
            className="w-full py-3 text-center font-semibold text-[#DAA520] bg-transparent border border-[#DAA520] hover:bg-[#DAA520]/10 rounded-lg transition-colors flex items-center justify-center"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Practice Again
          </button>
          {nextSection && (
            <button
              onClick={onNextSection}
              className="w-full py-3 text-center font-semibold text-black bg-[#DAA520] hover:bg-[#B8860B] rounded-lg transition-colors flex items-center justify-center"
            >
              <span>Next Section: {nextSection.title}</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={onNext}
          className="w-full py-3 mt-4 text-center font-semibold text-black bg-[#DAA520] hover:bg-[#B8860B] rounded-lg transition-colors"
        >
          Next Word
        </button>
      )}
    </div>
  );
}
