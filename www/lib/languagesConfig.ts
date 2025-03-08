import { kirundiConfigs } from "./languageConfigs/kirundiConfigs";
import { kinyarwandaConfigs } from "./languageConfigs/kinyarwandaConfigs";
import { amharicConfigs } from "./languageConfigs/amharicConfigs";
import { bambaraConfigs } from "./languageConfigs/bambaraConfigs";
import { capeVerdeanKrioluConfigs } from "./languageConfigs/capeVerdeanKrioluConfigs";
import { eweConfigs } from "./languageConfigs/eweConfigs";
import { haitianCreoleConfigs } from "./languageConfigs/haitianCreoleConfigs";
import { hausaConfigs } from "./languageConfigs/hausaConfigs";
import { igboConfigs } from "./languageConfigs/igboConfigs";
import { kikuyuConfigs } from "./languageConfigs/kikuyuConfigs";

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
  amharic: {
    ...amharicConfigs,
    description: `Learn Amharic with bilingual picture books. Experience Ethiopian culture through stories in Amharic and English. Made for families.`,
  },
  bambara: {
    ...bambaraConfigs,
    description: `Learn Bambara with bilingual picture books. Experience Malian culture through stories in Bambara and English. Made for families.`,
  },
  "cape-verdean-kriolu": {
    ...capeVerdeanKrioluConfigs,
    description: `Learn Cape Verdean Kriolu with bilingual picture books. Experience Cape Verdean culture through stories in Cape Verdean Kriolu and English. Made for families.`,
  },
  ewe: {
    ...eweConfigs,
    description: `Learn Ewe with bilingual picture books. Experience Ghanaian culture through stories in Ewe and English. Made for families.`,
  },
  "haitian-creole": {
    ...haitianCreoleConfigs,
    description: `Learn Haitian Creole with bilingual picture books. Experience Haitian culture through stories in Haitian Creole and English. Made for families.`,
  },
  hausa: {
    ...hausaConfigs,
    description: `Learn Hausa with bilingual picture books. Experience Nigerian culture through stories in Hausa and English. Made for families.`,
  },
  igbo: {
    ...igboConfigs,
    description: `Learn Igbo with bilingual picture books. Experience Nigerian culture through stories in Igbo and English. Made for families.`,
  },
  kikuyu: {
    ...kikuyuConfigs,
    description: `Learn Kikuyu with bilingual picture books. Experience Kenyan culture through stories in Kikuyu and English. Made for families.`,
  },
};
