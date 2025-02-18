export const SITE_NAME = "Lingu.Africa";
export const SITE_DESCRIPTION =
  "Discover bilingual African children's books that celebrate culture and heritage. Learn African languages through engaging stories.";

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
      "Lingu.Africa",
      "African books",
      "bilingual books",
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
      "Lingu.Africa",
      "security",
    ],
  },
  about: {
    title: "About Us | Lingu.Africa",
    description:
      "Learn about Lingu.Africa's mission to preserve African languages and culture through bilingual children's books.",
    keywords: [
      "about",
      "mission",
      "African languages",
      "bilingual books",
      "cultural heritage",
      "Lingu.Africa",
      "Lionel Kubwimana",
    ],
  },
  books: {
    title: "Our Books | Lingu.Africa",
    description:
      "Explore our collection of bilingual African language books. Find stories in Kirundi, Kinyarwanda, and more.",
    keywords: [
      "books",
      "bilingual",
      "African languages",
      "children's books",
      "Kirundi",
      "Kinyarwanda",
      "stories",
    ],
  },
};
