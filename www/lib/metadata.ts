import { LANGUAGES, SITE_NAME, SITE_DESCRIPTION } from "./constants";

// Define canonical URL
export const CANONICAL_URL = "https://lingu.africa";

// Get all available language names for keywords
const getAvailableLanguageNames = () => {
  return LANGUAGES.filter((lang) => !lang.comingSoon).map((lang) => lang.name);
};

export type MetadataConfig = {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  alternates?: {
    canonical?: string;
  };
  openGraph?: {
    title?: string;
    description?: string;
    images?: any;
    url?: string;
  };
  twitter?: {
    title?: string;
    description?: string;
    images?: any;
    card?: "summary" | "summary_large_image";
  };
};

// Shared social media image configuration
const defaultOgImage = {
  url: `${CANONICAL_URL}/logo.png`,
  width: 1200,
  height: 1200,
  alt: "Lingu.Africa - Bilingual African Language Books",
  type: "image/png",
};

// Helper function to ensure canonical URLs are properly formatted
const getCanonicalUrl = (path: string) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${CANONICAL_URL}${cleanPath}`;
};

export const sharedMetadata = {
  metadataBase: new URL(CANONICAL_URL),
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
    images: [defaultOgImage],
  },
  // Default Twitter metadata
  twitter: {
    card: "summary_large_image",
    site: "@LinguAfrica",
    creator: "@LionelKubwimana",
    images: [defaultOgImage],
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
    canonical: getCanonicalUrl("/terms"),
    alternates: {
      canonical: getCanonicalUrl("/terms"),
    },
    openGraph: {
      title: "Terms and Conditions | Lingu.Africa",
      description:
        "Read our terms and conditions to understand the rules and regulations for using Lingu.Africa's website and services.",
      url: getCanonicalUrl("/terms"),
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary",
      title: "Terms and Conditions | Lingu.Africa",
      description:
        "Read our terms and conditions to understand the rules and regulations for using Lingu.Africa's website and services.",
      images: [defaultOgImage],
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
    canonical: getCanonicalUrl("/privacy"),
    alternates: {
      canonical: getCanonicalUrl("/privacy"),
    },
    openGraph: {
      title: "Privacy Policy | Lingu.Africa",
      description:
        "Learn how Lingu.Africa protects and handles your personal information in accordance with our privacy policy.",
      url: getCanonicalUrl("/privacy"),
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary",
      title: "Privacy Policy | Lingu.Africa",
      description:
        "Learn how Lingu.Africa protects and handles your personal information in accordance with our privacy policy.",
      images: [defaultOgImage],
    },
  },
  about: {
    title: "About Us | Lingu.Africa",
    description:
      "Learn about Lingu.Africa's mission to preserve African languages and culture through bilingual children's books.",
    keywords: ["about", "mission", "Lionel Kubwimana", ...baseKeywords],
    canonical: getCanonicalUrl("/about"),
    alternates: {
      canonical: getCanonicalUrl("/about"),
    },
    openGraph: {
      title: "About Us | Lingu.Africa",
      description:
        "Learn about Lingu.Africa's mission to preserve African languages and culture through bilingual children's books.",
      url: getCanonicalUrl("/about"),
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: "About Us | Lingu.Africa",
      description:
        "Learn about Lingu.Africa's mission to preserve African languages and culture through bilingual children's books.",
      images: [defaultOgImage],
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
    canonical: getCanonicalUrl("/books"),
    alternates: {
      canonical: getCanonicalUrl("/books"),
    },
    openGraph: {
      title: "African Language Books | Lingu.Africa",
      description:
        "Explore our collection of bilingual African language books. Find stories in " +
        getAvailableLanguageNames().join(" and ") +
        ".",
      url: getCanonicalUrl("/books"),
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: "African Language Books | Lingu.Africa",
      description:
        "Explore our collection of bilingual African language books. Find stories in " +
        getAvailableLanguageNames().join(" and ") +
        ".",
      images: [defaultOgImage],
    },
  },
};
