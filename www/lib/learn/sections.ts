export type Section = {
  id: string;
  title: string;
  description: string;
  isLocked: boolean;
  order: number;
  isReview?: boolean;
  words?: string;
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
    title: "Numbers",
    description: "Master the basic numbers from zero to ten.",
    isLocked: true,
    order: 7,
  },
  {
    id: "counting",
    title: "Counting",
    description: "Learn to count objects.",
    isLocked: true,
    order: 8,
  },
  {
    id: "actions",
    title: "Action Words",
    description: "Learn common verbs for everyday activities.",
    isLocked: true,
    order: 9,
  },
  {
    id: "sentences-1",
    title: "Simple Descriptions",
    description: "Learn to describe objects and scenes in simple sentences.",
    isLocked: true,
    order: 10,
    words: "phrases",
  },
  {
    id: "sentences-2",
    title: "More Descriptions",
    description: "Practice describing more complex scenes and situations.",
    isLocked: true,
    order: 11,
    words: "phrases_2",
  },
  {
    id: "feelings",
    title: "Emotions & Feelings",
    description: "Build vocabulary for different emotions and feelings.",
    isLocked: true,
    order: 12,
  },
  {
    id: "review-2",
    title: "Progress Check",
    description: "Review your growing vocabulary.",
    isLocked: true,
    order: 13,
    isReview: true,
  },
  {
    id: "food",
    title: "Food",
    description: "Build your food and meal vocabulary.",
    isLocked: true,
    order: 14,
  },
  {
    id: "household",
    title: "Household Items",
    description: "Learn the names of household items.",
    isLocked: true,
    order: 15,
  },
  {
    id: "review-3",
    title: "Vocabulary Review",
    description: "Test your knowledge of all learned words & phrases.",
    isLocked: true,
    order: 16,
    isReview: true,
  },
] as const;
