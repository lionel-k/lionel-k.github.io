import { useState } from "react";
import { Volume2 } from "lucide-react";
import { BaseExerciseProps } from "./types";
import { EXERCISE_TITLES } from "../../config/exercises";

interface FillBlankProps extends BaseExerciseProps {
  sentence?: string;
}

export const FillBlank = ({
  audioUrl,
  isCompleted,
  onAnswer,
  sentence = "A _____ sajtot eszik.",
}: FillBlankProps) => {
  const [answer, setAnswer] = useState("");

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
          {EXERCISE_TITLES["fill-blank"]}
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

      <div className="flex items-center gap-2">
        <span className="text-lg">{before}</span>
        <input
          type="text"
          value={answer}
          onChange={(e) => handleChange(e.target.value)}
          disabled={isCompleted}
          className="w-40 p-3 border-2 border-gray-200 rounded-lg focus:border-[#DAA520] focus:ring-2 focus:ring-[#DAA520]/20 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Type the missing word..."
        />
        <span className="text-lg">{after}</span>
      </div>
    </div>
  );
};
