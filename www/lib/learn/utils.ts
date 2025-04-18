import { FlashcardWord, Word } from "@/lib/learn/types";
import { sections } from "./sections";
import { wordsBySection } from "./words";

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateOptions = (
  currentWord: FlashcardWord,
  currentSectionId: string
): FlashcardWord[] => {
  const currentSection = sections.find((s) => s.id === currentSectionId);
  if (!currentSection) return [currentWord];

  const previousAndCurrentWords: Word[] = sections
    .filter((s) => s.order <= currentSection.order)
    .flatMap((section) => Object.values(wordsBySection[section.id]));

  const distractors = shuffleArray(
    previousAndCurrentWords
      .filter((w) => w.id !== currentWord.id)
      .map((word) => ({
        id: word.id,
        image: word.image,
        word: "",
        translation: "",
        language: currentWord.language,
      }))
  ).slice(0, 3);

  return shuffleArray([currentWord, ...distractors]);
};

export const getAudioPath = (language: string, wordId: string): string => {
  return `/audios/${language.toLowerCase()}/${wordId}.mp3`;
};
