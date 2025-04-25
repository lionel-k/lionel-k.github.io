import { FlashcardWord, Word } from "@/lib/learn/types";
import { sections, Section } from "./sections";
import { wordsBySection, getAllWords } from "./words";
import { languageTranslations } from "./translations";

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getWordsForReviewSection = (currentSection: Section): Word[] => {
  return sections
    .filter((s) => s.order <= currentSection.order && !s.isReview)
    .flatMap((section) => Object.values(wordsBySection[section.id]));
};

const getWordsForRegularSection = (sectionId: string): Word[] => {
  return Object.values(wordsBySection[sectionId]);
};

export const getAvailableWords = (
  currentSection: Section,
  sectionId: string
): Word[] => {
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
    .map((word) => {
      const translation = translations.translations[word.id];
      if (!translation) {
        console.warn(`No translation found for word: ${word.id}`);
        return null;
      }

      return {
        id: word.id,
        word: word.english,
        translation,
        language: translations.language,
        image: word.image,
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

export const getLanguageFlashcards = (
  language: string
): FlashcardWord[] | null => {
  const normalizedLanguage = language.toLowerCase();
  const translations = languageTranslations[normalizedLanguage];

  if (!translations) {
    return null;
  }

  const words = getAllWords();
  return Object.entries(words)
    .map(([wordId, word]) => {
      const translation = translations.translations[wordId];
      if (!translation) return null;

      return {
        id: wordId,
        word: word.english,
        translation,
        language: translations.language,
        image: word.image,
      };
    })
    .filter((word): word is FlashcardWord => word !== null);
};
