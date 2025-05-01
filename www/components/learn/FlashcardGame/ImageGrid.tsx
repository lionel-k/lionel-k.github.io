import Image from "next/image";
import { FlashcardWord } from "@/lib/learn/types";
import { getImagePath } from "@/lib/learn/utils";

type ImageGridProps = {
  options: FlashcardWord[];
  selectedAnswer: string | null;
  currentWordId: string;
  onAnswer: (answer: string) => void;
};

export default function ImageGrid({
  options,
  selectedAnswer,
  currentWordId,
  onAnswer,
}: ImageGridProps) {
  const getButtonStyle = (wordId: string) => {
    if (!selectedAnswer) return "";
    if (wordId === currentWordId) return "ring-4 ring-[#DAA520]";
    if (wordId === selectedAnswer && wordId !== currentWordId)
      return "ring-4 ring-red-500 opacity-50";
    return "opacity-50";
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onAnswer(option.id)}
          disabled={!!selectedAnswer}
          className={`relative aspect-square w-full overflow-hidden rounded-xl border-2 border-[#DAA520]/20 bg-[#1A1A1A] transition-all hover:border-[#DAA520]/40 ${getButtonStyle(
            option.id
          )}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={getImagePath(option.id)}
              alt={option.id}
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </button>
      ))}
    </div>
  );
}
