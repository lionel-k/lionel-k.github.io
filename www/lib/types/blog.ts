export type BlogCategory =
  | "Language Learning"
  | "Culture"
  | "Education"
  | "Technology"
  | "Science & Research"
  | "Tips & Tricks";

export interface TableOfContents {
  id: string;
  text: string;
  level: number;
}

export interface Author {
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
  author: string | Author;
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
  adjacentPosts?: {
    previous?: {
      slug: string;
      title: string;
    };
    next?: {
      slug: string;
      title: string;
    };
  };
}

export type BlogPostMetadata = Omit<
  BlogPost,
  "content" | "tableOfContents" | "conclusion"
>;
