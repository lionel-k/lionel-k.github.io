import { sections } from "./sections";

export type Word = {
  id: string;
  section_id: string;
  translation: string;
};

export type LanguageTranslations = {
  language: string;
  translations: Record<string, string>; // key is the word.id, value is the translation
  // Optional audio overrides for specific words if they don't follow the standard pattern
  audioOverrides?: Record<string, string>;
};

export interface FlashcardWord {
  id: string;
  translation: string;
}

export interface PresentableWord {
  id: string;
  translation: string;
  english: string;
}

export type FlashcardSet = {
  language: string;
  words: FlashcardWord[];
};

export type Section = (typeof sections)[number];

export interface FlashcardGameProps {
  words: FlashcardWord[];
  isPaidUser: boolean;
}

export type ImageOptionProps = {
  id: string;
  image: string;
  isSelected: boolean;
  isCorrect: boolean;
  onClick: () => void;
  disabled: boolean;
};

export type UserProgress = {
  id: number;
  user_email: string;
  language: string;
  section_id: string;
  best_score: number;
  total_attempts: number;
  last_attempt_date: string;
  completion_date?: string;
  created_at: string;
  updated_at: string;
};

export type SectionProgress = {
  section: Section;
  progress: UserProgress | null;
  percentage: number;
  isCompleted: boolean;
};
