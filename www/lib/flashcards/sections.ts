export const sections = [
  // Level 1 - First Steps (Free)
  {
    id: "basics",
    title: "First Words",
    description:
      "Start here! Learn the most common words you'll see and use every day.",
    isLocked: false,
  },

  // Level 2 - Essential Building Blocks
  {
    id: "numbers",
    title: "Numbers",
    description: "Learn to count and understand prices in your new language.",
    isLocked: true,
  },
  {
    id: "colors",
    title: "Colors",
    description: "Learn basic colors to describe things around you.",
    isLocked: true,
  },
  {
    id: "objects",
    title: "Common Objects",
    description: "Learn words for everyday objects you see and use.",
    isLocked: true,
  },
  {
    id: "food",
    title: "Food & Drinks",
    description: "Learn words for ordering food and understanding menus.",
    isLocked: true,
  },
  {
    id: "fruits-vegetables",
    title: "Fruits & Vegetables",
    description: "Learn names of common fruits and vegetables at the market.",
    isLocked: true,
  },

  // Level 3 - Daily Words
  {
    id: "family",
    title: "Family",
    description: "Learn words for family members and relationships.",
    isLocked: true,
  },
  {
    id: "home",
    title: "At Home",
    description: "Learn words for rooms, furniture, and everyday items.",
    isLocked: true,
  },
  {
    id: "animals",
    title: "Animals",
    description: "Learn names of common pets and animals.",
    isLocked: true,
  },

  // Level 4 - Simple Actions
  {
    id: "actions",
    title: "Basic Actions",
    description:
      "Learn words for common activities like eat, drink, walk, sleep.",
    isLocked: true,
  },
  {
    id: "feelings",
    title: "Feelings",
    description: "Express how you feel - happy, sad, tired, hungry.",
    isLocked: true,
  },

  // Level 5 - First Sentences
  {
    id: "greetings",
    title: "Greetings",
    description: "Learn to say hello, thank you, and other polite phrases.",
    isLocked: true,
  },
  {
    id: "simple-phrases",
    title: "Simple Phrases",
    description: "Put words together to make your first simple sentences.",
    isLocked: true,
  },

  // Level 6 - Real Life
  {
    id: "shopping",
    title: "Shopping",
    description: "Learn words for shopping at markets and stores.",
    isLocked: true,
  },
  {
    id: "directions",
    title: "Directions",
    description: "Learn to ask for and understand basic directions.",
    isLocked: true,
  },
] as const;

export type Section = (typeof sections)[number];
