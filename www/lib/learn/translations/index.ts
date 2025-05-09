import kirundi from "./kirundi.csv";

export type WordEntry = {
  section_id: string;
  word_id: string;
  translation: string;
  english: string;
};

const translations: Record<string, WordEntry[]> = {
  kirundi: kirundi
    .split("\n")
    .slice(1) // Skip header row
    .filter((line: string) => line.trim())
    .map((line: string) => {
      const [section_id, word_id, translation, english] = line
        .split(",")
        .map((s: string) => s.trim());
      return { section_id, word_id, translation, english };
    }),
};

export const getTranslations = (language: string): WordEntry[] => {
  return translations[language];
};

export const getWordsBySection = (
  language: string
): Record<string, string[]> => {
  const words = translations[language];
  const sections: Record<string, string[]> = {};

  words.forEach(({ section_id, word_id }) => {
    if (!sections[section_id]) {
      sections[section_id] = [];
    }
    sections[section_id].push(word_id);
  });

  return sections;
};

export const getTranslation = (
  language: string,
  word_id: string
): string | undefined => {
  const words = translations[language];
  return words.find((t) => t.word_id === word_id)?.translation;
};

export const getSectionWords = (
  language: string,
  section_id: string
): WordEntry[] => {
  const words = translations[language];
  return words.filter((t) => t.section_id === section_id);
};
