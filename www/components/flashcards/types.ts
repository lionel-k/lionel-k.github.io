import { FlashcardWord } from "@/lib/flashcards/types";

export type FlashcardGameProps = {
  words: FlashcardWord[];
};

export type ImageOptionProps = {
  id: string;
  image: string;
  isSelected: boolean;
  isCorrect: boolean;
  onClick: () => void;
  disabled: boolean;
};
