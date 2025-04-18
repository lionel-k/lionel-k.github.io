import { FlashcardWord, Word } from "@/lib/learn/types";
import { sections, Section } from "./sections";
import { wordsBySection } from "./words";

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

const createDistractor = (word: Word, language: string): FlashcardWord => {
  return {
    id: word.id,
    image: word.image,
    word: "",
    translation: "",
    language,
  };
};

const getAvailableWords = (
  currentSection: Section,
  sectionId: string
): Word[] => {
  return currentSection.isReview
    ? getWordsForReviewSection(currentSection)
    : getWordsForRegularSection(sectionId);
};

export const generateOptions = (
  currentWord: FlashcardWord,
  currentSectionId: string
): FlashcardWord[] => {
  const currentSection = sections.find((s) => s.id === currentSectionId) as
    | Section
    | undefined;
  if (!currentSection) return [currentWord];

  const availableWords = getAvailableWords(currentSection, currentSectionId);

  const distractors = shuffleArray(
    availableWords
      .filter((w) => w.id !== currentWord.id)
      .map((word) => createDistractor(word, currentWord.language))
  ).slice(0, 3);

  return shuffleArray([currentWord, ...distractors]);
};

export const getAudioPath = (language: string, wordId: string): string => {
  return `/audios/${language.toLowerCase()}/${wordId}.mp3`;
};
