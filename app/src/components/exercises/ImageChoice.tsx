import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { ImageChoiceProps } from "./types";
import { EXERCISE_TITLES } from "../../config/exercises";

export const ImageChoice = ({
  imageOptions,
  sourceText,
  audioUrl,
  isCompleted,
  onAnswer,
}: ImageChoiceProps) => {
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (audioUrl) {
      new Audio(audioUrl).play();
    }
  }, [audioUrl]);

  const handleImageSelect = (label: string) => {
    if (isCompleted) return;
    setSelectedImage(label);
    onAnswer(label);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">
          {EXERCISE_TITLES["image-choice"]}
        </h3>
      </div>

      <div className="flex items-center justify-center gap-3 mb-8">
        <div
          className="flex items-center gap-4 px-8 py-4 bg-white rounded-xl shadow-md border-2 border-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => audioUrl && new Audio(audioUrl).play()}
        >
          <div className="p-2 rounded-lg bg-blue-500">
            <Volume2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl font-semibold text-gray-900">
            {sourceText}
          </span>
        </div>
      </div>

      <div
        className={`grid grid-cols-2 gap-4 ${
          isCompleted ? "pointer-events-none opacity-75" : ""
        }`}
      >
        {imageOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleImageSelect(option.label)}
            disabled={isCompleted}
            className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
              selectedImage === option.label
                ? "border-[#DAA520] bg-[#DAA520]/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="relative w-full aspect-square mb-2">
              <img
                src={option.url}
                alt={option.label}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg text-gray-700">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
