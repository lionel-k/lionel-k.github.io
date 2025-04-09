"use client";

import Image from "next/image";
import { ImageOptionProps } from "./types";

export default function ImageOption({
  id,
  image,
  isSelected,
  isCorrect,
  onClick,
  disabled,
}: ImageOptionProps) {
  const getImageStyle = () => {
    if (!isSelected) return "border-2 border-gray-200 hover:border-blue-500";
    if (isCorrect) return "border-2 border-green-500";
    return "border-2 border-red-500";
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative aspect-square rounded-lg overflow-hidden transition-transform hover:scale-102 focus:outline-none"
    >
      <Image
        src={image}
        alt="Option"
        fill
        className={`object-cover rounded-lg ${getImageStyle()}`}
      />
    </button>
  );
}
