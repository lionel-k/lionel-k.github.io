import { X } from "lucide-react";

interface LearningHeaderProps {
  name: string;
  currentExercise: number;
  totalExercises: number;
  progress: number;
  onBack: () => void;
}

export const LearningHeader = ({
  name,
  currentExercise,
  totalExercises,
  progress,
  onBack,
}: LearningHeaderProps) => {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-white">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-semibold">{name}</h1>
              <p className="text-sm text-gray-400">
                Exercise {currentExercise} of {totalExercises}
              </p>
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#DAA520] to-[#B8860B] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
