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
    description: "Learn the most common words and phrases",
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
    order: 3,
  },
  {
    id: "fruits",
    title: "Fruits",
    description: "Learn words for different fruits",
    order: 4,
  },
  {
    id: "vegetables",
    title: "Vegetables",
    description: "Learn words for different vegetables",
    order: 5,
  },
  {
    id: "numbers",
    title: "Numbers",
    description: "Learn basic numbers",
    order: 6,
  },
  {
    id: "counting",
    title: "Counting",
    description: "Practice counting different objects",
    order: 7,
    isLocked: true,
  },
  {
    id: "actions",
    title: "Actions",
    description: "Learn common action words",
    order: 8,
    isLocked: true,
  },
  {
    id: "sentences-1",
    title: "Basic Sentences",
    description: "Practice basic sentence structures",
    order: 9,
    isLocked: true,
  },
  {
    id: "sentences-2",
    title: "More Sentences",
    description: "Practice more complex sentences",
    order: 10,
    isLocked: true,
  },
  {
    id: "feelings",
    title: "Feelings",
    description: "Learn words for emotions and feelings",
    order: 11,
    isLocked: true,
  },
  {
    id: "food",
    title: "Food",
    description: "Learn words for different foods",
    order: 12,
    isLocked: true,
  },
  {
    id: "household",
    title: "Household",
    description: "Learn words for household items",
    order: 13,
    isLocked: true,
  },
];
