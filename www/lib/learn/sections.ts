export type Section = {
  id: string;
  title: string;
  description: string;
  order: number;
  isLocked?: boolean;
  isReview?: boolean;
};

export const sections: Section[] = [
  {
    id: "basics",
    title: "Basics",
    description: "Learn the most common words",
    order: 1,
  },
  {
    id: "objects",
    title: "Objects",
    description: "Learn words for everyday objects",
    order: 2,
  },
  {
    id: "animals",
    title: "Animals",
    description: "Learn words for different animals",
    isLocked: true,
    order: 3,
  },
  {
    id: "fruits",
    title: "Fruits",
    description: "Learn words for different fruits",
    isLocked: true,
    order: 4,
  },
  {
    id: "vegetables",
    title: "Vegetables",
    description: "Learn words for different vegetables",
    isLocked: true,
    order: 5,
  },
  {
    id: "review-1",
    title: "Progress Check",
    description: "Review the first set of words",
    isLocked: true,
    order: 6,
    isReview: true,
  },
  {
    id: "numbers",
    title: "Numbers",
    description: "Learn basic numbers",
    order: 7,
    isLocked: true,
  },
  {
    id: "counting",
    title: "Counting",
    description: "Practice counting different objects",
    order: 8,
    isLocked: true,
  },
  {
    id: "actions",
    title: "Actions",
    description: "Learn common action words",
    order: 9,
    isLocked: true,
  },
  {
    id: "sentences-1",
    title: "Basic Sentences",
    description: "Practice basic sentence structures",
    order: 10,
    isLocked: true,
  },
  {
    id: "sentences-2",
    title: "More Sentences",
    description: "Practice more complex sentences",
    order: 11,
    isLocked: true,
  },
  {
    id: "review-2",
    title: "Progress Check",
    description: "Review your growing vocabulary.",
    isLocked: true,
    order: 12,
    isReview: true,
  },
  {
    id: "feelings",
    title: "Feelings",
    description: "Learn words for emotions and feelings",
    order: 13,
    isLocked: true,
  },
  {
    id: "food",
    title: "Food",
    description: "Learn words for different foods",
    order: 14,
    isLocked: true,
  },
  {
    id: "household",
    title: "Household",
    description: "Learn words for household items",
    order: 15,
    isLocked: true,
  },
  {
    id: "review-3",
    title: "Progress Check",
    description: "Review the final word set.",
    isLocked: true,
    order: 16,
    isReview: true,
  },
];
