export type Word = {
  id: string;
  english: string;
  image: string;
};

export type LanguageTranslations = {
  language: string;
  translations: Record<string, string>; // key is the word.id, value is the translation
};

// Keep the original types for backward compatibility
export type FlashcardWord = {
  id: string;
  image: string;
  english: string;
  translation: string;
};

export type FlashcardSet = {
  language: string;
  words: FlashcardWord[];
};
