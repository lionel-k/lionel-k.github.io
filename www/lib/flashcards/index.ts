import { FlashcardSet, FlashcardWord } from "./types";
import { commonWords } from "./words";
import { languageTranslations } from "./translations";

export * from "./types";

// Helper function to get flashcard words for a specific language
export function getFlashcardSet(languageCode: string): FlashcardSet {
  const languageData = languageTranslations[languageCode];
  if (!languageData) throw new Error(`Language ${languageCode} not found`);

  const words: FlashcardWord[] = Object.entries(languageData.translations).map(
    ([wordId, translation]) => ({
      id: wordId,
      image: commonWords[wordId].image,
      english: commonWords[wordId].english,
      translation,
    })
  );

  return {
    language: languageData.language,
    words,
  };
}

// For backward compatibility
export const flashcardSets: Record<string, FlashcardSet> = Object.keys(
  languageTranslations
).reduce((acc, languageCode) => {
  acc[languageCode] = getFlashcardSet(languageCode);
  return acc;
}, {} as Record<string, FlashcardSet>);
