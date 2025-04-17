import { FlashcardSet, FlashcardWord } from "./types";
import { languageTranslations } from "./translations";
import { wordsBySection, getAllWords } from "./words";

export async function getFlashcardSet(
  language: string,
  sectionId?: string
): Promise<FlashcardSet | null> {
  const normalizedLanguage = language.toLowerCase();
  const translations = languageTranslations[normalizedLanguage];

  if (!translations) {
    return null;
  }

  const wordsToUse = sectionId ? wordsBySection[sectionId] : getAllWords();

  if (!wordsToUse) {
    return null;
  }

  const words: FlashcardWord[] = Object.entries(wordsToUse)
    .map(([wordId, word]) => {
      const translation = translations.translations[wordId];
      if (!translation) {
        console.warn(`No translation found for word: ${wordId}`);
        return null;
      }

      return {
        id: wordId,
        word: word.english,
        translation,
        language: translations.language,
        image: word.image,
      };
    })
    .filter((word): word is FlashcardWord => word !== null);

  return {
    language: translations.language,
    words,
  };
}
