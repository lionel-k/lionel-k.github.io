import { RotateCcw, ArrowRight } from "lucide-react";
import GameRecap from "./GameRecap";
import { Section } from "@/lib/learn/sections";

type RecapModalProps = {
  correctAnswers: number;
  totalQuestions: number;
  nextSection: Section | undefined;
  onRestart: () => void;
  onNextSection: () => void;
};

export default function RecapModal({
  correctAnswers,
  totalQuestions,
  nextSection,
  onRestart,
  onNextSection,
}: RecapModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-lg bg-[#1A1A1A] rounded-xl p-6 space-y-6">
        <GameRecap
          correctAnswers={correctAnswers}
          totalQuestions={totalQuestions}
        />
        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full py-3 text-center font-semibold text-[#DAA520] bg-transparent border border-[#DAA520] hover:bg-[#DAA520]/10 rounded-lg transition-colors flex items-center justify-center"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            <span>Practice Again</span>
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
      </div>
    </div>
  );
}
