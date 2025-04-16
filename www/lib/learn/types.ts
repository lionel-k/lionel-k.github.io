import { sections } from "./sections";

export type Word = {
  id: string;
  english: string;
  image: string;
};

export type LanguageTranslations = {
  language: string;
  translations: Record<string, string>; // key is the word.id, value is the translation
  // Optional audio overrides for specific words if they don't follow the standard pattern
  audioOverrides?: Record<string, string>;
};

export interface FlashcardWord {
  id: string;
  word: string;
  translation: string;
  language: string;
  image: string;
}

export type FlashcardSet = {
  language: string;
  words: FlashcardWord[];
};

export type Section = (typeof sections)[number];

export interface FlashcardGameProps {
  words: FlashcardWord[];
}

export type ImageOptionProps = {
  id: string;
  image: string;
  isSelected: boolean;
  isCorrect: boolean;
  onClick: () => void;
  disabled: boolean;
};
