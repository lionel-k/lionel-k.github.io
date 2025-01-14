// Book types
export interface Review {
  reviewer: string;
  stars: number;
  quote: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Book {
  slug: string;
  title: string;
  language: 'kirundi' | 'kinyarwanda' | 'lingala';
  market: 'en' | 'fr';
  coverImage: string;
  synopsis: string;
  reviews: Review[];
  faq: FAQ[];
  benefits: string[];
  painPoints: string[];
  purchaseLink: string;
}

// Navigation types
export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}