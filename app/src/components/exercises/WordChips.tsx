import { useState, useEffect } from "react";
import { Volume2, X } from "lucide-react";
import { BaseExerciseProps } from "./types";
import { EXERCISE_TITLES } from "../../config/exercises";

interface ExtendedWordChipsProps extends BaseExerciseProps {
  wordChips: string[];
  type: "word-chips-transcribe" | "word-chips-translate";
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

  // Initialize and play audio when component mounts
  useEffect(() => {
    if (audioUrl) {
      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);
      newAudio.play();
    }
  }, [audioUrl]);

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

      {/* Audio Controls with Text for Translation */}
      <div className="flex flex-col items-center gap-4">
        {type === "word-chips-translate" && textToTranslate && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-xl text-center text-gray-700">
              {textToTranslate}
            </p>
          </div>
        )}
        {audioUrl && (
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
