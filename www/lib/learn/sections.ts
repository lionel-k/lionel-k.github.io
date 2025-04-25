export type Section = {
  id: string;
  title: string;
  description: string;
  isLocked: boolean;
  order: number;
  isReview?: boolean;
};

export const sections: readonly Section[] = [
  {
    id: "basics",
    title: "Essential First Words",
    description:
      "Master the most important words used in daily family conversations.",
    isLocked: false,
    order: 1,
  },
  {
    id: "objects",
    title: "Everyday Objects",
    description: "Learn to recognize and name common items at home and school.",
    isLocked: false,
    order: 2,
  },
  {
    id: "animals",
    title: "Animal Words",
    description: "Know the names of pets and local wildlife.",
    isLocked: true,
    order: 3,
  },
  {
    id: "fruits",
    title: "Fruit Names",
    description: "Recognize and name fruits at markets and stores.",
    isLocked: true,
    order: 4,
  },
  {
    id: "vegetables",
    title: "Vegetable Vocabulary",
    description: "Learn to identify vegetables in any market.",
    isLocked: true,
    order: 5,
  },
  {
    id: "review-1",
    title: "First Vocabulary Check",
    description: "Test your memory of the first set of words.",
    isLocked: true,
    order: 6,
    isReview: true,
  },
  {
    id: "numbers",
    title: "Numbers & Counting",
    description: "Learn to count and understand basic quantities.",
    isLocked: true,
    order: 7,
  },
  {
    id: "actions",
    title: "Action Words",
    description: "Learn common verbs for everyday activities.",
    isLocked: true,
    order: 7,
  },
  {
    id: "phrases",
    title: "Simple Phrases",
    description: "Learn useful phrases for daily conversations.",
    isLocked: true,
    order: 8,
  },
  {
    id: "feelings",
    title: "Emotion Words",
    description: "Build vocabulary for different feelings and emotions.",
    isLocked: true,
    order: 9,
  },
  {
    id: "colors",
    title: "Colors & Description",
    description: "Add color words to your vocabulary.",
    isLocked: true,
    order: 10,
  },
  {
    id: "review-2",
    title: "Progress Check",
    description: "Review your growing vocabulary.",
    isLocked: true,
    order: 11,
    isReview: true,
  },
  {
    id: "food",
    title: "Food Words",
    description: "Build your food and meal vocabulary.",
    isLocked: true,
    order: 12,
  },
  {
    id: "review-3",
    title: "Vocabulary Review",
    description: "Test your knowledge of all learned words & phrases.",
    isLocked: true,
    order: 13,
    isReview: true,
  },
] as const;
