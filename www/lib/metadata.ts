import { SITE_NAME, SITE_URL } from "./constants";

const truncateText = (
  text: string,
  maxLength: number,
  suffixLength: number = 0
): string => {
  const availableLength = maxLength - suffixLength;
  return text.length > availableLength
    ? text.slice(0, availableLength - 3) + "..."
    : text;
};

export const getTruncatedTitle = (title: string): string => {
  const SITE_SUFFIX_LENGTH = 14; // " | Lingu.Africa"
  return truncateText(title, 60, SITE_SUFFIX_LENGTH);
};

export const getTruncatedDescription = (description: string): string => {
  return truncateText(description, 160);
};

export type MetadataConfig = {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  alternates?: {
    canonical?: string;
  };
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: string;
    siteName: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
      type: string;
    }>;
    locale?: string;
    countryName?: string;
  };
  twitter?: {
    title?: string;
    description?: string;
    images?: any;
    card?: "summary" | "summary_large_image";
  };
  other?: {
    "geo.region"?: string;
    "geo.placename"?: string;
    "geo.position"?: string;
    ICBM?: string;
  };
};

// Shared social media image configuration
const defaultOgImage = {
  url: `${SITE_URL}/logo.webp`,
  width: 1200,
  height: 1200,
  alt: "Lingu.Africa - Bilingual African Language Books",
  type: "image/png",
};

// Helper function to ensure canonical URLs are properly formatted
const getCanonicalUrl = (path: string) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
};

export const sharedMetadata = {
  metadataBase: new URL(SITE_URL),
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
  blog: {
    title: "Blog | Lingu.Africa",
    description:
      "Discover expert insights and practical tips on language learning and cultural diversity. Learn strategies to master new languages and embrace cultures.",
    keywords: [
      "blog",
      "language learning",
      "cultural diversity",
      "education",
      "African languages",
      "bilingual learning",
      ...baseKeywords,
    ],
    canonical: getCanonicalUrl("/blog"),
    alternates: {
      canonical: getCanonicalUrl("/blog"),
    },
    openGraph: {
      title: "Blog | Lingu.Africa",
      description:
        "Discover expert insights and practical tips on language learning and cultural diversity. Learn strategies to master new languages and embrace cultures.",
      url: getCanonicalUrl("/blog"),
      type: "website",
      siteName: SITE_NAME,
      images: [defaultOgImage],
      locale: "en_US",
      countryName: "United States",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | Lingu.Africa",
      description:
        "Discover expert insights and practical tips on language learning and cultural diversity. Learn strategies to master new languages and embrace cultures.",
      images: [defaultOgImage],
    },
    other: {
      "geo.region": "US",
      "geo.placename": "United States",
      "geo.position": "37.09024;-95.712891",
      ICBM: "37.09024, -95.712891",
    },
  },
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
      type: "website",
      siteName: SITE_NAME,
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
      type: "website",
      siteName: SITE_NAME,
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
      type: "website",
      siteName: SITE_NAME,
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
  translationServices: {
    title: "Translation Services for African Languages | Lingu.Africa",
    description:
      "Need document, audio, or video translation for African languages? Lingu.Africa works with freelance language partners. Contact us to get a quote.",
    keywords: [
      "African language translation",
      "translation services",
      "document translation",
      "audio translation",
      "video translation",
      "Krio translation",
      "Pidgin translation",
      ...baseKeywords,
    ],
    canonical: getCanonicalUrl("/translation-services"),
    alternates: {
      canonical: getCanonicalUrl("/translation-services"),
    },
    openGraph: {
      title: "Translation Services for African Languages | Lingu.Africa",
      description:
        "Need document, audio, or video translation for African languages? Lingu.Africa works with freelance language partners. Contact us to get a quote.",
      url: getCanonicalUrl("/translation-services"),
      type: "website",
      siteName: SITE_NAME,
      images: [defaultOgImage],
      locale: "en_US",
      countryName: "United States",
    },
    twitter: {
      card: "summary_large_image",
      title: "Translation Services for African Languages | Lingu.Africa",
      description:
        "Need document, audio, or video translation for African languages? Lingu.Africa works with freelance language partners. Contact us to get a quote.",
      images: [defaultOgImage],
    },
    other: {
      "geo.region": "US",
      "geo.placename": "United States",
      "geo.position": "37.09024;-95.712891",
      ICBM: "37.09024, -95.712891",
    },
  },
  books: {
    title: "African Language Books | Lingu.Africa",
    description:
      "Explore our collection of bilingual African language books. Perfect for children and adults learning African languages.",
    keywords: [
      "African books",
      "bilingual books",
      "language learning",
      "children's books",
      ...baseKeywords,
    ],
    canonical: getCanonicalUrl("/books"),
    alternates: {
      canonical: getCanonicalUrl("/books"),
    },
    openGraph: {
      title: "African Language Books | Lingu.Africa",
      description:
        "Explore our collection of bilingual African language books. Perfect for children and adults learning African languages.",
      url: getCanonicalUrl("/books"),
      type: "website",
      siteName: SITE_NAME,
      images: [defaultOgImage],
      locale: "en_US",
      countryName: "United States",
    },
    twitter: {
      card: "summary_large_image",
      title: "African Language Books | Lingu.Africa",
      description:
        "Explore our collection of bilingual African language books. Perfect for children and adults learning African languages.",
      images: [defaultOgImage],
    },
    other: {
      "geo.region": "US",
      "geo.placename": "United States",
      "geo.position": "37.09024;-95.712891",
      ICBM: "37.09024, -95.712891",
    },
  },
};
