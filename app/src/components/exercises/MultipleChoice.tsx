import { useState } from "react";
import { MultipleChoiceProps } from "./types";
import { EXERCISE_TITLES } from "../../config/exercises";
import { SourceText } from "./SourceText";

export const MultipleChoice = ({
  options,
  sourceText,
  isCompleted,
  onAnswer,
}: MultipleChoiceProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSelect = (option: string) => {
    if (isCompleted) return;
    setSelectedAnswer(option);
    onAnswer(option);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">
          {EXERCISE_TITLES["multiple-choice"]}
        </h3>
      </div>

      <SourceText text={sourceText} />

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
                ? "border-[#DAA520] bg-[#DAA520]/5"
                : "border-gray-200 hover:border-gray-300"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
