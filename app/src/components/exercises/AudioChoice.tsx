import { useState } from "react";
import { Volume2 } from "lucide-react";
import { MultipleChoiceProps } from "./types";
import { EXERCISE_TITLES } from "../../config/exercises";

export const AudioChoice = ({
  options,
  audioUrl,
  isCompleted,
  onAnswer,
}: MultipleChoiceProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSelect = (option: string) => {
    if (isCompleted) return;
    setSelectedAnswer(option);
    onAnswer(option);
  };

  const playAudio = () => {
    if (audioUrl) {
      new Audio(audioUrl).play();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">
          {EXERCISE_TITLES["audio-choice"]}
        </h3>
        <button
          onClick={playAudio}
          disabled={isCompleted}
          className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Volume2 className="w-6 h-6 text-blue-600" />
        </button>
      </div>

      <div
        className={`space-y-3 ${
          isCompleted ? "pointer-events-none opacity-75" : ""
        }`}
      >
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={isCompleted}
            className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
              selectedAnswer === option
                ? "border-[#DAA520] bg-[#DAA520]/10"
                : "border-gray-200 hover:border-[#DAA520]"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
