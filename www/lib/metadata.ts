import { LANGUAGES, SITE_NAME, SITE_DESCRIPTION } from "./constants";

// Get all available language names for keywords
const getAvailableLanguageNames = () => {
  return LANGUAGES.filter((lang) => !lang.comingSoon).map((lang) => lang.name);
};

export type MetadataConfig = {
  title: string;
  description: string;
  keywords: string[];
};

export const sharedMetadata = {
  metadataBase: new URL("https://lingu.africa"),
  applicationName: SITE_NAME,
  authors: [{ name: "Lionel Kubwimana" }],
  creator: "Lionel Kubwimana",
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// Base keywords that are common across pages
const baseKeywords = [
  "African languages",
  "bilingual books",
  "Lingu.Africa",
  "children's books",
  "cultural heritage",
];

export const pagesMetadata: Record<string, MetadataConfig> = {
  terms: {
    title: "Terms and Conditions | Lingu.Africa",
    description:
      "Read our terms and conditions to understand the rules and regulations for using Lingu.Africa's website and services.",
    keywords: [
      "terms",
      "conditions",
      "legal",
      "rules",
      "regulations",
      ...baseKeywords,
    ],
  },
  privacy: {
    title: "Privacy Policy | Lingu.Africa",
    description:
      "Learn how Lingu.Africa protects and handles your personal information in accordance with our privacy policy.",
    keywords: [
      "privacy",
      "policy",
      "data protection",
      "personal information",
      "security",
      ...baseKeywords,
    ],
  },
  about: {
    title: "About Us | Lingu.Africa",
    description:
      "Learn about Lingu.Africa's mission to preserve African languages and culture through bilingual children's books.",
    keywords: ["about", "mission", "Lionel Kubwimana", ...baseKeywords],
  },
  books: {
    title: "Our Books | Lingu.Africa",
    description:
      "Explore our collection of bilingual African language books. Find stories in " +
      getAvailableLanguageNames().join(" and ") +
      ".",
    keywords: [
      "books",
      "stories",
      ...baseKeywords,
      ...getAvailableLanguageNames(),
    ],
  },
};
