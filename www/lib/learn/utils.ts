import { FlashcardWord, Word } from "@/lib/learn/types";
import { sections, Section } from "./sections";
import { wordsBySection } from "./words";
import { languageTranslations } from "./translations";

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getWordsForReviewSection = (currentSection: Section): string[] => {
  return sections
    .filter((s) => s.order <= currentSection.order && !s.isReview)
    .flatMap((section) => wordsBySection[section.id]);
};

const getWordsForRegularSection = (sectionId: string): string[] => {
  return wordsBySection[sectionId];
};

export const getAvailableWords = (
  currentSection: Section,
  sectionId: string
): string[] => {
  return currentSection.isReview
    ? getWordsForReviewSection(currentSection)
    : getWordsForRegularSection(sectionId);
};

export const getSectionFlashcards = (
  language: string,
  sectionId: string
): FlashcardWord[] | null => {
  const normalizedLanguage = language.toLowerCase();
  const translations = languageTranslations[normalizedLanguage];
  const currentSection = sections.find((s) => s.id === sectionId);

  if (!translations || !currentSection) {
    return null;
  }

  const availableWords = getAvailableWords(currentSection, sectionId);

  const flashcards = availableWords
    .map((wordId) => {
      const translation = translations.translations[wordId];
      if (!translation) {
        console.warn(`No translation found for word: ${wordId}`);
        return null;
      }

      return {
        id: wordId,
        translation,
      };
    })
    .filter((word): word is FlashcardWord => word !== null);

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
