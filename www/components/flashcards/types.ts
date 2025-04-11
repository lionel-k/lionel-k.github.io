import { FlashcardWord } from "@/lib/flashcards/types";

export interface FlashcardGameProps {
  words: FlashcardWord[];
  isPaidUser: boolean;
  email: string | null;
}

export type ImageOptionProps = {
  id: string;
  image: string;
  isSelected: boolean;
  isCorrect: boolean;
  onClick: () => void;
  disabled: boolean;
};
