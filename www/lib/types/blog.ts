export type BlogCategory =
  | "Language Learning"
  | "Culture"
  | "Education"
  | "Technology"
  | "Tips & Tricks";

export interface TableOfContents {
  id: string;
  text: string;
  level: number;
}

export interface BlogAuthor {
  name: string;
  avatar: string;
  bio: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  coverImage: string;
  author: BlogAuthor;
  date: string;
  tableOfContents: TableOfContents[];
  highlights: string[];
  content: string;
  cta: {
    text: string;
    link: string;
  };
  images?: {
    url: string;
    alt: string;
    caption?: string;
  }[];
  conclusion: string;
  tags: string[];
  readingTime: string;
}

export type BlogPostMetadata = Omit<
  BlogPost,
  "content" | "tableOfContents" | "conclusion"
>;
