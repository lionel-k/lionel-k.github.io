import { NavSection } from "./types";

export const SITE_NAME = "Lingu.Africa";
export const SITE_DESCRIPTION =
  "Discover bilingual African books in English and French";

export const LANGUAGES = ["kirundi", "kinyarwanda", "lingala"] as const;
export const MARKETS = ["en", "fr"] as const;

export const NAV_SECTIONS: { [key: string]: NavSection[] } = {
  en: [
    {
      title: "Books",
      items: [
        {
          title: "Kirundi Books",
          href: "/books/kirundi",
          description: "Books featuring Kirundi language",
        },
        {
          title: "Kinyarwanda Books",
          href: "/books/kinyarwanda",
          description: "Books featuring Kinyarwanda language",
        },
        {
          title: "Lingala Books",
          href: "/books/lingala",
          description: "Books featuring Lingala language",
        },
      ],
    },
    {
      title: "Resources",
      items: [
        {
          title: "Blog",
          href: "/blog",
          description: "Articles about African literature and culture",
        },
        {
          title: "FAQ",
          href: "/en/faq",
          description: "Frequently asked questions",
        },
      ],
    },
  ],
  fr: [
    {
      title: "Livres",
      items: [
        {
          title: "Tous les Livres",
          href: "/fr/books",
          description:
            "Parcourez notre collection de livres africains bilingues",
        },
        {
          title: "Livres en Kirundi",
          href: "/fr/books/kirundi",
          description: "Livres en langue kirundi",
        },
        {
          title: "Livres en Lingala",
          href: "/fr/books/lingala",
          description: "Livres en langue lingala",
        },
      ],
    },
    {
      title: "Ressources",
      items: [
        {
          title: "Blog",
          href: "/blog",
          description: "Articles sur la littérature et la culture africaines",
        },
        {
          title: "FAQ",
          href: "/fr/faq",
          description: "Questions fréquemment posées",
        },
      ],
    },
  ],
};
