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
    description: `Explore beautiful bilingual Kirundi books that connect children with Burundian culture. Each book features side-by-side Kirundi and English or French text, making language learning natural and fun.`,
  },
  kinyarwanda: {
    ...kinyarwandaConfigs,
    description: `Immerse your children in Rwandan culture with our bilingual Kinyarwanda books. Perfect for families wanting to teach Kinyarwanda alongside English or French in an engaging way.`,
  },
};
