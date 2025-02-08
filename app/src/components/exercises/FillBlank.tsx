import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { BaseExerciseProps } from "./types";
import { EXERCISE_TITLES } from "../../config/exercises";

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

  useEffect(() => {
    if (type === "fill-blank-audio" && audioUrl) {
      new Audio(audioUrl).play();
    }
  }, [audioUrl, type]);

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

      {type === "fill-blank-text" && sourceText && (
        <div className="flex items-center justify-center mb-8">
          <div className="px-8 py-4 bg-white rounded-xl shadow-md border-2 border-gray-100 hover:shadow-lg transition-shadow">
            <span className="text-3xl font-semibold text-gray-900">
              {sourceText}
            </span>
          </div>
        </div>
      )}

      {type === "fill-blank-audio" && (
        <div className="flex items-center justify-center gap-3 mb-8">
          <div
            className="flex items-center gap-4 px-8 py-4 bg-white rounded-xl shadow-md border-2 border-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => audioUrl && new Audio(audioUrl).play()}
          >
            <div className="p-2 rounded-lg bg-blue-500">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      )}

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
