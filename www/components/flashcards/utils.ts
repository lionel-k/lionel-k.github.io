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

const STORAGE_KEY = "ft_plays";
const VERIFY_KEY = "ft_verify";
export const MAX_PLAYS = 5;

const encode = (plays: number) => btoa(`${plays}`);

export const getPlaysCount = (): number => {
  if (typeof window === "undefined") return 0;

  // bypass environment variable
  if (process.env.NEXT_PUBLIC_BYPASS_PLAYS === "true") return 0;

  const playsStr = localStorage.getItem(STORAGE_KEY);
  const verifyStr = localStorage.getItem(VERIFY_KEY);

  // First time player (no stored values)
  if (!playsStr && !verifyStr) {
    return 0;
  }

  // If values exist but don't match, assume tampering
  if (!playsStr || !verifyStr || playsStr !== verifyStr) {
    // Reset both to max plays (forcing paywall)
    const encoded = encode(MAX_PLAYS);
    localStorage.setItem(STORAGE_KEY, encoded);
    localStorage.setItem(VERIFY_KEY, encoded);
    return MAX_PLAYS;
  }

  // Decode and return plays count
  const plays = parseInt(atob(playsStr), 10);
  return Math.min(plays, MAX_PLAYS);
};

export const incrementPlaysCount = (): void => {
  if (typeof window === "undefined") return;
  if (process.env.NEXT_PUBLIC_BYPASS_PLAYS === "true") return;

  const currentPlays = getPlaysCount();
  const newPlays = Math.min(currentPlays + 1, MAX_PLAYS);
  const encoded = encode(newPlays);

  // Store same encoded value in both places
  localStorage.setItem(STORAGE_KEY, encoded);
  localStorage.setItem(VERIFY_KEY, encoded);
};
