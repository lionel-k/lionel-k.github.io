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
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Reset input when exercise changes (either sentence or type changes)
  useEffect(() => {
    setAnswer("");
  }, [sentence, type]);

  useEffect(() => {
    if (type === "fill-blank-audio" && audioUrl) {
      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);
      newAudio.play();
    }
  }, [audioUrl, type]);

  const handleChange = (value: string) => {
    if (isCompleted) return;
    setAnswer(value);
    onAnswer(value);
  };

  const playAudio = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  const [before, after] = sentence.split("_____");

  return (
    <div className="space-y-8">
      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-900">
        {EXERCISE_TITLES[type]}
      </h3>

      {/* Source Text or Audio Controls */}
      {type === "fill-blank-text" ? (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-xl text-center text-gray-700">{sourceText}</p>
        </div>
      ) : (
        <div className="flex justify-center gap-4">
          <button
            onClick={playAudio}
            disabled={isCompleted || !audioUrl}
            className="p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Volume2 className="w-8 h-8 text-blue-500" />
          </button>
        </div>
      )}

      {/* Input Field */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 text-xl">
          <span>{before}</span>
          <div className="relative">
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-300" />
            <input
              key={`${type}-${sentence}`}
              type="text"
              value={answer}
              onChange={(e) => handleChange(e.target.value)}
              disabled={isCompleted}
              className="w-32 p-1 text-center bg-transparent border-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder=""
            />
          </div>
          <span>{after}</span>
        </div>
      </div>
    </div>
  );
};
