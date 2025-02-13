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
    description: `Discover Burundian culture through bilingual Kirundi books. Read side-by-side in Kirundi and English/French. Perfect for kids learning their heritage.`,
  },
  kinyarwanda: {
    ...kinyarwandaConfigs,
    description: `Learn Kinyarwanda with bilingual picture books. Experience Rwandan culture through stories in Kinyarwanda and English/French. Made for families.`,
  },
};
