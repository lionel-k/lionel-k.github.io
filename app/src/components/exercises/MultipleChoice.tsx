import { useState } from "react";
import { Volume2 } from "lucide-react";
import { MultipleChoiceProps } from "./types";
import { EXERCISE_TITLES } from "../../config/exercises";

export const MultipleChoice = ({
  options,
  sourceText,
  audioUrl,
  isCompleted,
  onAnswer,
}: MultipleChoiceProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSelect = (option: string) => {
    if (isCompleted) return;
    setSelectedAnswer(option);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">
          {EXERCISE_TITLES["multiple-choice"]}
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

      <div className="flex flex-col items-center justify-center mb-8">
        <div className="inline-block px-8 py-4 bg-white rounded-xl shadow-sm border-2 border-gray-100">
          <span className="text-2xl font-medium text-gray-900">
            {sourceText}
          </span>
        </div>
      </div>

      <div
        className={`space-y-3 ${
          isCompleted ? "pointer-events-none opacity-75" : ""
        }`}
      >
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              handleSelect(option);
              onAnswer(option);
            }}
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
