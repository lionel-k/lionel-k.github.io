export type Word = {
  id: string;
  english: string;
  image: string;
};

export type LanguageTranslations = {
  language: string;
  translations: Record<string, string>; // key is the word.id, value is the translation
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
