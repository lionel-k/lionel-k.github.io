import { ArrowRight, Sparkles, RotateCcw } from "lucide-react";

interface FeedbackSectionProps {
  selectedAnswer: string;
  currentWordId: string;
  isLastWord: boolean;
  nextSection?: { id: string; title: string };
  onNext: () => void;
  onRestart: () => void;
  onNextSection: () => void;
}

export default function FeedbackSection({
  selectedAnswer,
  currentWordId,
  isLastWord,
  nextSection,
  onNext,
  onRestart,
  onNextSection,
}: FeedbackSectionProps) {
  const isCorrect = selectedAnswer === currentWordId;
  const feedback = isCorrect
    ? "Correct!"
    : "The correct image is highlighted in gold!";

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div
        className={`py-4 px-6 rounded-xl text-center ${
          isCorrect
            ? "bg-[#DAA520]/10 text-[#DAA520] border border-[#DAA520]/20"
            : "bg-red-500/10 text-red-500 border border-red-500/20"
        }`}
      >
        {isCorrect ? (
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5" />
            <p className="text-lg font-medium">Excellent! Keep going! 🎉</p>
          </div>
        ) : (
          <p className="text-lg font-medium">❌ {feedback}</p>
        )}
      </div>
      {!isLastWord ? (
        <button
          onClick={onNext}
          className="w-full py-4 px-6 bg-[#DAA520] text-black font-semibold rounded-xl hover:bg-[#B8860B] hover:shadow-[0_0_30px_rgba(218,165,32,0.3)] transition-all duration-300 flex items-center justify-center gap-3 text-lg"
        >
          Next Word
          <ArrowRight className="h-5 w-5" />
        </button>
      ) : (
        <div className="space-y-4">
          <button
            onClick={onRestart}
            className="w-full py-4 px-6 bg-[#0A0A0A] text-[#DAA520] font-semibold rounded-xl hover:bg-[#1A1A1A] border border-[#DAA520] transition-all duration-300 flex items-center justify-center gap-3 text-lg group"
          >
            <RotateCcw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
            Practice Again
          </button>
          {nextSection && (
            <button
              onClick={onNextSection}
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
  );
}
