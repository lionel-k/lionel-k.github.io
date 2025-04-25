import Image from "next/image";
import { FlashcardWord } from "@/lib/learn/types";

interface ImageGridProps {
  options: FlashcardWord[];
  selectedAnswer: string | null;
  currentWordId: string;
  onAnswer: (answer: string) => void;
}

export default function ImageGrid({
  options,
  selectedAnswer,
  currentWordId,
  onAnswer,
}: ImageGridProps) {
  const getImageStyle = (imageId: string) => {
    if (!selectedAnswer)
      return "border-2 border-[#DAA520]/20 hover:border-[#DAA520] hover:shadow-[0_0_20px_rgba(218,165,32,0.2)] transition-all duration-300";
    if (imageId === currentWordId)
      return "border-4 border-[#DAA520] ring-2 ring-[#DAA520] shadow-[0_0_30px_rgba(218,165,32,0.3)] scale-[1.02]";
    if (imageId === selectedAnswer)
      return "border-4 border-red-500 ring-2 ring-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)] scale-[1.02]";
    return "border-2 border-[#DAA520]/20 opacity-40 grayscale";
  };

  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => !selectedAnswer && onAnswer(option.id)}
          disabled={selectedAnswer !== null}
          className="group relative aspect-square rounded-xl overflow-hidden focus:outline-none"
        >
          <Image
            src={option.image}
            alt={`image for ${option.id}`}
            fill
            className={`object-cover rounded-xl ${getImageStyle(option.id)}`}
          />
          {!selectedAnswer && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          )}
        </button>
      ))}
    </div>
  );
}
