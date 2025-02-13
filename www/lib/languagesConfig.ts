import { kirundiConfigs } from "./languageConfigs/kirundiConfigs";
import { kinyarwandaConfigs } from "./languageConfigs/kinyarwandaConfigs";

export type LanguageConfig = {
  name: string;
  description: string;
  books: any[];
  faq: { question: string; answer: string }[];
};

export const languagesConfig: Record<string, LanguageConfig> = {
  kirundi: {
    ...kirundiConfigs,
    description: `Discover our collection of bilingual ${kirundiConfigs.name} books paired with English or French translations—perfect for families worldwide!`,
  },
  kinyarwanda: {
    ...kinyarwandaConfigs,
    description: `Discover our collection of bilingual ${kinyarwandaConfigs.name} books paired with English or French translations—perfect for families worldwide!`,
  },
};
