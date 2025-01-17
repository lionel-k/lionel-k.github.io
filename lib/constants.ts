import { NavSection } from "./types";

export const SITE_NAME = "Lingu.Africa";
export const SITE_DESCRIPTION =
  "Discover bilingual African books in English and French";

export const LANGUAGES = [
  {
    name: "Kirundi",
    slug: "kirundi",
    coverImage: "/bgs/kirundi-bg.png",
    amazonUrl: "#",
    discoverBooks:
      "Discover our collection of Kirundi books, available with English and French translations.",
    comingSoon: false,
  },
  {
    name: "Kinyarwanda",
    slug: "kinyarwanda",
    coverImage: "/bgs/kinyarwanda-bg.png",
    amazonUrl: "#",
    discoverBooks:
      "Discover our collection of Kinyarwanda books, available with English and French translations.",
    comingSoon: false,
  },
  // Other languages with 'coming soon'
  {
    name: "Amharic",
    slug: "amharic",
    coverImage: "/bgs/amharic-bg.png",
    amazonUrl: "#",
    discoverBooks:
      "Discover our collection of Amharic books, available with English or French translations.",
    comingSoon: true,
  },
  // Add more languages as needed
];
