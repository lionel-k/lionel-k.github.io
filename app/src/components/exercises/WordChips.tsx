import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { WordChipsProps } from "./types";
import { EXERCISE_TITLES } from "../../config/exercises";
import { SourceText } from "./SourceText";

export const WordChips = ({
  wordChips,
  audioUrl,
  isCompleted,
  onAnswer,
  type = "word-chips-transcribe",
  sourceText,
}: WordChipsProps) => {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  useEffect(() => {
    setSelectedChips([]);
  }, [wordChips, type]);

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

  const showAudio =
    type === "word-chips-transcribe" || type === "word-chips-translate";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">
          {EXERCISE_TITLES[type]}
        </h3>
      </div>

      <SourceText text={sourceText} audioUrl={audioUrl} showAudio={showAudio} />

      {/* Selected chips */}
      <div className="min-h-[60px] p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <div className="flex flex-wrap gap-2">
          {selectedChips.map((chip, index) => (
            <div
              key={`selected-${index}`}
              className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200 shadow-sm"
            >
              <span>{chip}</span>
              {!isCompleted && (
                <button
                  onClick={() => handleRemoveChip(index)}
                  className="p-0.5 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available chips */}
      <div
        className={`flex flex-wrap gap-2 ${
          isCompleted ? "pointer-events-none opacity-75" : ""
        }`}
      >
        {wordChips.map((chip, index) => (
          <button
            key={`available-${index}`}
            onClick={() => handleChipClick(chip)}
            disabled={isCompleted || selectedChips.includes(chip)}
            className={`px-4 py-2 rounded-lg border-2 transition-colors ${
              selectedChips.includes(chip)
                ? "opacity-50 cursor-not-allowed border-gray-200 bg-gray-50"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
};
