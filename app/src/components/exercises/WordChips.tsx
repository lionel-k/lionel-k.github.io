import { useState } from "react";
import { Volume2, X } from "lucide-react";
import { WordChipsProps } from "./types";
import { EXERCISE_TITLES } from "../../config/exercises";

export const WordChips = ({
  wordChips,
  audioUrl,
  isCompleted,
  onAnswer,
}: WordChipsProps) => {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleChipClick = (chip: string) => {
    if (isCompleted) return;
    if (!selectedChips.includes(chip)) {
      const newChips = [...selectedChips, chip];
      setSelectedChips(newChips);
      onAnswer(newChips.join(" "));
    }
  };

  const handleRemoveChip = (index: number) => {
    if (isCompleted) return;
    const newChips = selectedChips.filter((_, i) => i !== index);
    setSelectedChips(newChips);
    onAnswer(newChips.join(" "));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">
          {EXERCISE_TITLES["word-chips"]}
        </h3>
        {audioUrl && (
          <button
            onClick={() => new Audio(audioUrl).play()}
            disabled={isCompleted}
            className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Volume2 className="w-6 h-6 text-blue-600" />
          </button>
        )}
      </div>

      <div
        className={`space-y-4 ${
          isCompleted ? "pointer-events-none opacity-75" : ""
        }`}
      >
        {/* Selected chips */}
        <div className="min-h-[60px] p-4 border-2 border-dashed border-gray-300 rounded-lg flex flex-wrap gap-2">
          {selectedChips.map((chip, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-[#DAA520]/10 text-[#DAA520] rounded-full flex items-center gap-2"
            >
              {chip}
              <button
                onClick={() => handleRemoveChip(index)}
                disabled={isCompleted}
                className="p-1 hover:bg-[#DAA520]/20 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        {/* Available chips */}
        <div className="flex flex-wrap gap-2">
          {wordChips
            .filter((chip) => !selectedChips.includes(chip))
            .map((chip, index) => (
              <button
                key={index}
                onClick={() => handleChipClick(chip)}
                disabled={isCompleted}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {chip}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
