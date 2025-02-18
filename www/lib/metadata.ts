import { LANGUAGES, SITE_NAME, SITE_DESCRIPTION } from "./constants";

// Get all available language names for keywords
const getAvailableLanguageNames = () => {
  return LANGUAGES.filter((lang) => !lang.comingSoon).map((lang) => lang.name);
};

export type MetadataConfig = {
  title: string;
  description: string;
  keywords: string[];
  openGraph?: {
    title?: string;
    description?: string;
    images?: string;
    url?: string;
  };
  twitter?: {
    title?: string;
    description?: string;
    images?: string;
    card?: "summary" | "summary_large_image";
  };
};

// Shared social media image
const defaultOgImage = "/logo.png";

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
  // Default Open Graph metadata
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    images: defaultOgImage,
  },
  // Default Twitter metadata
  twitter: {
    card: "summary_large_image",
    site: "@LinguAfrica",
    creator: "@LionelKubwimana",
    images: defaultOgImage,
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
    openGraph: {
      title: "Terms and Conditions | Lingu.Africa",
      description:
        "Read our terms and conditions to understand the rules and regulations for using Lingu.Africa's website and services.",
      url: "/terms",
    },
    twitter: {
      card: "summary",
      title: "Terms and Conditions | Lingu.Africa",
      description:
        "Read our terms and conditions to understand the rules and regulations for using Lingu.Africa's website and services.",
    },
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
    openGraph: {
      title: "Privacy Policy | Lingu.Africa",
      description:
        "Learn how Lingu.Africa protects and handles your personal information in accordance with our privacy policy.",
      url: "/privacy",
    },
    twitter: {
      card: "summary",
      title: "Privacy Policy | Lingu.Africa",
      description:
        "Learn how Lingu.Africa protects and handles your personal information in accordance with our privacy policy.",
    },
  },
  about: {
    title: "About Us | Lingu.Africa",
    description:
      "Learn about Lingu.Africa's mission to preserve African languages and culture through bilingual children's books.",
    keywords: ["about", "mission", "Lionel Kubwimana", ...baseKeywords],
    openGraph: {
      title: "About Us | Lingu.Africa",
      description:
        "Learn about Lingu.Africa's mission to preserve African languages and culture through bilingual children's books.",
      url: "/about",
      images: "/images/about-og.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title: "About Us | Lingu.Africa",
      description:
        "Learn about Lingu.Africa's mission to preserve African languages and culture through bilingual children's books.",
      images: "/images/about-og.jpg",
    },
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
    openGraph: {
      title: "African Language Books | Lingu.Africa",
      description:
        "Explore our collection of bilingual African language books. Find stories in " +
        getAvailableLanguageNames().join(" and ") +
        ".",
      url: "/books",
      images: "/images/books-og.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title: "African Language Books | Lingu.Africa",
      description:
        "Explore our collection of bilingual African language books. Find stories in " +
        getAvailableLanguageNames().join(" and ") +
        ".",
      images: "/images/books-og.jpg",
    },
  },
};
