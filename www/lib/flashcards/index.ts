import { FlashcardSet, FlashcardWord } from "./types";
import { languageTranslations } from "./translations";
import { commonWords } from "./words";

export async function getFlashcardSet(
  language: string
): Promise<FlashcardSet | null> {
  // Convert to lowercase to match our keys
  const normalizedLanguage = language.toLowerCase();
  const translations = languageTranslations[normalizedLanguage];

  if (!translations) {
    return null;
  }

  // Create FlashcardWords by combining common words with translations
  const words: FlashcardWord[] = Object.entries(translations.translations).map(
    ([wordId, translation]) => {
      const word = commonWords[wordId];
      if (!word) {
        throw new Error(`Translation exists for unknown word: ${wordId}`);
      }

      return {
        id: wordId,
        word: word.english,
        translation,
        language: translations.language,
        image: word.image,
      };
    }
  );

  return {
    language: translations.language,
    words,
  };
}
