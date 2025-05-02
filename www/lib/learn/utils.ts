import { FlashcardWord } from "@/lib/learn/types";
import { sections } from "./sections";
import { getTranslations, getWordsBySection, WordEntry } from "./translations";

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getAvailableWords = (
  sectionId: string,
  language: string
): string[] => {
  const sectionWords = getWordsBySection(language);
  return sectionWords[sectionId] || [];
};

export const getSectionFlashcards = (
  language: string,
  sectionId: string
): FlashcardWord[] | null => {
  const translations = getTranslations(language);
  const currentSection = sections.find((s) => s.id === sectionId);

  if (!translations || !currentSection) {
    return null;
  }

  const sectionWords = translations.filter(
    (entry: WordEntry) => entry.section_id === sectionId
  );

  const flashcards = sectionWords.map((entry) => ({
    id: entry.word_id,
    translation: entry.translation,
  }));

  return shuffleArray(flashcards);
};

export const generateOptions = (
  currentWord: FlashcardWord,
  words: FlashcardWord[]
): FlashcardWord[] => {
  if (!words || !Array.isArray(words)) return [currentWord];

  const distractors = shuffleArray(
    words.filter((w) => w.id !== currentWord.id)
  ).slice(0, 3);

  return shuffleArray([currentWord, ...distractors]);
};

export const getAudioPath = (language: string, wordId: string): string => {
  return `/audios/${language.toLowerCase()}/${wordId}.mp3`;
};

export const getImagePath = (wordId: string): string => {
  return `/images/learn/${wordId}.webp`;
};
