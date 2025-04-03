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
import { krioConfigs } from "./languageConfigs/krioConfigs";
import { lingalaConfigs } from "./languageConfigs/lingalaConfigs";
import { lugandaConfigs } from "./languageConfigs/lugandaConfigs";
import { malagasyConfigs } from "./languageConfigs/malagasyConfigs";
import { oromoConfigs } from "./languageConfigs/oromoConfigs";
import { pidginConfigs } from "./languageConfigs/pidginConfigs";
import { shonaConfigs } from "./languageConfigs/shonaConfigs";
import { somaliConfigs } from "./languageConfigs/somaliConfigs";
import { swahiliConfigs } from "./languageConfigs/swahiliConfigs";
import { tigrinyaConfigs } from "./languageConfigs/tigrinyaConfigs";
import { twiConfigs } from "./languageConfigs/twiConfigs";
import { wolofConfigs } from "./languageConfigs/wolofConfigs";
import { xhosaConfigs } from "./languageConfigs/xhosaConfigs";
import { yembaConfigs } from "./languageConfigs/yembaConfigs";
import { yorubaConfigs } from "./languageConfigs/yorubaConfigs";
import { zuluConfigs } from "./languageConfigs/zuluConfigs";

export type LanguageConfig = {
  name: string;
  description: string;
  books: any[];
  faq: { question: string; answer: string }[];
};

export const languagesConfig: Record<string, LanguageConfig> = {
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
  kinyarwanda: {
    ...kinyarwandaConfigs,
    description: `Learn Kinyarwanda with bilingual picture books. Experience Rwandan culture through stories in Kinyarwanda and English/French. Made for families.`,
  },
  kirundi: {
    ...kirundiConfigs,
    description: `Discover Burundian culture through bilingual Kirundi books. Read side-by-side in Kirundi and English/French. Perfect for kids learning their heritage.`,
  },
  krio: {
    ...krioConfigs,
    description: `Learn Krio with bilingual picture books. Experience Sierra Leonean culture through stories in Krio and English. Made for families.`,
  },
  lingala: {
    ...lingalaConfigs,
    description: `Learn Lingala with bilingual picture books. Experience Congolese culture through stories in Lingala and English. Made for families.`,
  },
  luganda: {
    ...lugandaConfigs,
    description: `Learn Luganda with bilingual picture books. Experience Ugandan culture through stories in Luganda and English. Made for families.`,
  },
  malagasy: {
    ...malagasyConfigs,
    description: `Learn Malagasy with bilingual picture books. Experience Malagasy culture through stories in Malagasy and English. Made for families.`,
  },
  oromo: {
    ...oromoConfigs,
    description: `Learn Oromo with bilingual picture books. Experience Ethiopian culture through stories in Oromo and English. Made for families.`,
  },
  pidgin: {
    ...pidginConfigs,
    description: `Learn Pidgin with bilingual picture books. Experience Nigerian culture through stories in Pidgin and English. Made for families.`,
  },
  shona: {
    ...shonaConfigs,
    description: `Learn Shona with bilingual picture books. Experience Zimbabwean culture through stories in Shona and English. Made for families.`,
  },
  somali: {
    ...somaliConfigs,
    description: `Learn Somali with bilingual picture books. Experience Somali culture through stories in Somali and English. Made for families.`,
  },
  swahili: {
    ...swahiliConfigs,
    description: `Learn Swahili with bilingual picture books. Experience Kenyan culture through stories in Swahili and English. Made for families.`,
  },
  tigrinya: {
    ...tigrinyaConfigs,
    description: `Learn Tigrinya with bilingual picture books. Experience Eritrean culture through stories in Tigrinya and English. Made for families.`,
  },
  twi: {
    ...twiConfigs,
    description: `Learn Twi with bilingual picture books. Experience Ghanaian culture through stories in Twi and English. Made for families.`,
  },
  wolof: {
    ...wolofConfigs,
    description: `Learn Wolof with bilingual picture books. Experience Senegalese culture through stories in Wolof and English. Made for families.`,
  },
  xhosa: {
    ...xhosaConfigs,
    description: `Learn Xhosa with bilingual picture books. Experience South African culture through stories in Xhosa and English. Made for families.`,
  },
  yemba: {
    ...yembaConfigs,
    description: `Learn Yemba with bilingual picture books. Experience Cameroonian culture through stories in Yemba and English. Made for families.`,
  },
  yoruba: {
    ...yorubaConfigs,
    description: `Learn Yoruba with bilingual picture books. Experience Nigerian culture through stories in Yoruba and English. Made for families.`,
  },
  zulu: {
    ...zuluConfigs,
    description: `Learn Zulu with bilingual picture books. Experience South African culture through stories in Zulu and English. Made for families.`,
  },
};
