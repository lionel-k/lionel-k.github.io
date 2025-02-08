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
    <div className="h-full flex flex-col">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {EXERCISE_TITLES[type]}
      </h3>

      {/* Audio Controls or Text for Translation */}
      <div className="flex flex-col items-center mb-4">
        {(type === "word-chips-translate" || type === "word-chips-construct") &&
          textToTranslate && (
            <div className="bg-white rounded-xl shadow-sm p-4 w-full">
              <p className="text-lg text-center text-gray-700">
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
              className="p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Volume2 className="w-6 h-6 text-blue-500" />
            </button>
          )}
      </div>

      <div
        className={`flex-1 flex flex-col ${
          isCompleted ? "pointer-events-none opacity-75" : ""
        }`}
      >
        {/* Selected chips area with lines */}
        <div className="flex-1 space-y-2 min-h-[160px]">
          {[0, 1, 2, 3].map((lineIndex) => (
            <div
              key={lineIndex}
              className="h-10 border-b border-gray-200 flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {selectedChips
                .slice(lineIndex * 3, (lineIndex + 1) * 3)
                .map((chip, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-900 flex items-center gap-2 shadow-sm flex-shrink-0"
                  >
                    {chip}
                    <button
                      onClick={() => handleRemoveChip(lineIndex * 3 + index)}
                      disabled={isCompleted}
                      className="p-0.5 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* Available chips */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 mt-4">
          {wordChips.map((chip, index) => (
            <button
              key={index}
              onClick={() => handleChipClick(chip)}
              disabled={isCompleted || selectedChips.includes(chip)}
              className={`px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-900 shadow-sm transition-all w-full sm:w-auto ${
                selectedChips.includes(chip)
                  ? "opacity-0 cursor-default pointer-events-none"
                  : "hover:bg-gray-50 active:bg-gray-100"
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
