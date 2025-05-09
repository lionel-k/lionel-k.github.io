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

const getWordsForReviewSection = (
  sectionId: string,
  language: string
): string[] => {
  const currentSection = sections.find((s) => s.id === sectionId);
  if (!currentSection) return [];

  const sectionWords = getWordsBySection(language);
  return sections
    .filter((s) => s.order <= currentSection.order && !s.isReview)
    .flatMap((section) => sectionWords[section.id] || []);
};

export const getAvailableWords = (
  sectionId: string,
  language: string
): string[] => {
  const currentSection = sections.find((s) => s.id === sectionId);
  if (!currentSection) return [];

  const sectionWords = getWordsBySection(language);

  return currentSection.isReview
    ? getWordsForReviewSection(sectionId, language)
    : sectionWords[sectionId] || [];
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

  const availableWordIds = getAvailableWords(sectionId, language);

  const sectionWords = translations.filter((entry: WordEntry) =>
    availableWordIds.includes(entry.word_id)
  );

  const flashcards = sectionWords.map((entry) => ({
    id: entry.word_id,
    translation: entry.translation,
    english: entry.english,
  }));

  return shuffleArray(flashcards);
};

export const generateOptions = (
  currentWord: FlashcardWord,
  words: FlashcardWord[]
): FlashcardWord[] => {
  if (!words?.length) return [currentWord];

  const otherWords = words.filter((w) => w.id !== currentWord.id);

  const shuffledWords = shuffleArray([...otherWords]);
  const distractors = shuffledWords.slice(0, 3);

  return shuffleArray([currentWord, ...distractors]);
};

export const getAudioPath = (language: string, wordId: string): string => {
  return `/audios/${language.toLowerCase()}/${wordId}.mp3`;
};

export const getImagePath = (wordId: string): string => {
  return `/images/learn/${wordId}.webp`;
};

export const playFeedbackSound = (isCorrect: boolean) => {
  let soundPath: string;

  if (isCorrect) {
    soundPath = "/sounds/correct.mp3";
  } else {
    soundPath = "/sounds/wrong.mp3";
  }

  const audio = new Audio(soundPath);
  audio.volume = 0.5;
  audio.play().catch((error) => {
    console.error("Error playing feedback sound:", error);
  });
};
