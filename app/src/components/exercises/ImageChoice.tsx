import { useState } from "react";
import { Volume2 } from "lucide-react";
import { ImageChoiceProps } from "./types";
import { EXERCISE_TITLES } from "../../config/exercises";

export const ImageChoice = ({
  imageOptions,
  audioUrl,
  isCompleted,
  onAnswer,
}: ImageChoiceProps) => {
  const [selectedImage, setSelectedImage] = useState("");

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
            className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
              selectedImage === option.label
                ? "ring-4 ring-[#DAA520] scale-95"
                : "hover:scale-95"
            }`}
          >
            <img
              src={option.url}
              alt={option.label}
              className="w-full h-full object-cover"
            />
            {selectedImage === option.label && (
              <div className="absolute inset-0 bg-[#DAA520] bg-opacity-20" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
