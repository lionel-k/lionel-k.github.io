import { CheckCircle, ChevronRight, XCircle } from "lucide-react";

interface LearningFeedbackProps {
  isCorrect: boolean;
  onNext: () => void;
}

export const LearningFeedback = ({
  isCorrect,
  onNext,
}: LearningFeedbackProps) => {
  return (
    <div className="space-y-4">
      <div
        className={`p-4 rounded-lg flex items-center gap-3 ${
          isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {isCorrect ? (
          <>
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
            <p className="font-medium">Correct! Well done!</p>
          </>
        ) : (
          <>
            <XCircle className="w-6 h-6 flex-shrink-0" />
            <p className="font-medium">Incorrect. Try again!</p>
          </>
        )}
      </div>
      {isCorrect && (
        <button
          onClick={onNext}
          className="w-full py-3 px-6 bg-[#DAA520] text-white rounded-lg font-semibold hover:bg-[#B8860B] transition-colors flex items-center justify-center"
        >
          Continue <ChevronRight className="ml-2 w-5 h-5" />
        </button>
      )}
    </div>
  );
};
