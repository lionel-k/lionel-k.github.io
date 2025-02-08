import { useState, useEffect } from "react";
import { Volume2, X } from "lucide-react";
import { BaseExerciseProps } from "./types";
import { EXERCISE_TITLES } from "../../config/exercises";

interface ExtendedWordChipsProps extends BaseExerciseProps {
  wordChips: string[];
  type:
    | "word-chips-transcribe"
    | "word-chips-translate"
    | "word-chips-construct";
  textToTranslate?: string;
}

export const WordChips = ({
  wordChips,
  audioUrl,
  isCompleted,
  onAnswer,
  type = "word-chips-transcribe",
  textToTranslate,
}: ExtendedWordChipsProps) => {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Reset selected chips when exercise changes
  useEffect(() => {
    setSelectedChips([]);
  }, [wordChips, type]);

  // Initialize and play audio when component mounts
  useEffect(() => {
    if (
      audioUrl &&
      (type === "word-chips-transcribe" || type === "word-chips-translate")
    ) {
      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);
      newAudio.play();
    }
  }, [audioUrl, type]);

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

  const playAudio = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold text-gray-900">
        {EXERCISE_TITLES[type]}
      </h3>

      {/* Audio Controls or Text for Translation */}
      <div className="flex flex-col items-center gap-4">
        {(type === "word-chips-translate" || type === "word-chips-construct") &&
          textToTranslate && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-xl text-center text-gray-700">
                {textToTranslate}
              </p>
            </div>
          )}
        {audioUrl &&
          (type === "word-chips-transcribe" ||
            type === "word-chips-translate") && (
            <button
              onClick={playAudio}
              disabled={isCompleted || !audioUrl}
              className="p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Volume2 className="w-8 h-8 text-blue-500" />
            </button>
          )}
      </div>

      <div
        className={`space-y-4 ${
          isCompleted ? "pointer-events-none opacity-75" : ""
        }`}
      >
        {/* Selected chips area with lines */}
        <div className="space-y-3">
          {[0, 1, 2, 3].map((lineIndex) => (
            <div
              key={lineIndex}
              className="min-h-[48px] border-b border-gray-200 flex flex-wrap items-center gap-2"
            >
              {selectedChips
                .slice(lineIndex * 3, lineIndex * 3 + 3)
                .map((chip, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-[#DAA520]/10 text-[#DAA520] rounded-full flex items-center gap-2 shrink-0"
                  >
                    {chip}
                    <button
                      onClick={() => handleRemoveChip(lineIndex * 3 + index)}
                      disabled={isCompleted}
                      className="p-1 hover:bg-[#DAA520]/20 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* Available chips */}
        <div className="flex flex-wrap gap-2 pt-4">
          {wordChips.map((chip, index) => (
            <button
              key={index}
              onClick={() => handleChipClick(chip)}
              disabled={isCompleted || selectedChips.includes(chip)}
              className={`px-4 py-2 rounded-full transition-all shrink-0 ${
                selectedChips.includes(chip)
                  ? "opacity-0 cursor-default pointer-events-none"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
