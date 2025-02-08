import { useState, useEffect } from "react";
import { BaseExerciseProps } from "./types";
import { EXERCISE_TITLES } from "../../config/exercises";
import { SourceText } from "./SourceText";

interface FillBlankProps extends BaseExerciseProps {
  sentence?: string;
  sourceText?: string;
  type: "fill-blank-audio" | "fill-blank-text";
}

export const FillBlank = ({
  audioUrl,
  isCompleted,
  onAnswer,
  sentence = "",
  sourceText,
  type,
}: FillBlankProps) => {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setAnswer("");
  }, [sentence, type]);

  const handleChange = (value: string) => {
    if (isCompleted) return;
    setAnswer(value);
    onAnswer(value);
  };

  const [before, after] = sentence.split("_____");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">
          {EXERCISE_TITLES[type]}
        </h3>
      </div>

      <SourceText
        text={type === "fill-blank-text" ? sourceText : undefined}
        audioUrl={type === "fill-blank-audio" ? audioUrl : undefined}
        showAudio={type === "fill-blank-audio"}
      />

      <div className="flex items-center justify-center gap-2 text-lg">
        <span>{before}</span>
        <input
          type="text"
          value={answer}
          onChange={(e) => handleChange(e.target.value)}
          disabled={isCompleted}
          className={`w-32 px-3 py-1 text-center border-b-2 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            isCompleted
              ? "border-green-500"
              : "border-gray-300 focus:border-[#DAA520]"
          }`}
          placeholder="Type here..."
        />
        <span>{after}</span>
      </div>
    </div>
  );
};
