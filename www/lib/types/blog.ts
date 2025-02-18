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

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  coverImage: string;
  author: string;
  date: string;
  tableOfContents: TableOfContents[];
  highlights: string[];
  content: string;
  cta: {
    text: string;
    link: string;
  };
  conclusion: string;
  tags: string[];
  readingTime: string;
}

export type BlogPostMetadata = Omit<
  BlogPost,
  "content" | "tableOfContents" | "conclusion"
>;
