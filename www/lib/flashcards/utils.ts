import { FlashcardWord } from "@/lib/flashcards/types";

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateOptions = (
  words: FlashcardWord[],
  currentWord: FlashcardWord
): FlashcardWord[] => {
  const otherWords = words.filter((word) => word.id !== currentWord.id);
  const shuffledOtherWords = shuffleArray(otherWords);
  const options = [currentWord, ...shuffledOtherWords.slice(0, 3)];
  return shuffleArray(options);
};

export const getAudioPath = (language: string, wordId: string): string => {
  return `/audios/${language.toLowerCase()}/${wordId}.mp3`;
};
