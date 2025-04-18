export const sections = [
  // Level 1 - First Steps (Free)
  {
    id: "basics",
    title: "First Words",
    description:
      "Start here! Learn words you'll use every day with your family.",
    isLocked: false,
    order: 1,
  },

  // Level 2 - Essential Building Blocks
  {
    id: "objects",
    title: "Common Objects",
    description:
      "Learn the names of things you see and use at home and school.",
    isLocked: false,
    order: 2,
  },
  {
    id: "animals",
    title: "Animals",
    description: "Learn the names of pets and other cool animals.",
    isLocked: true,
    order: 3,
  },
  {
    id: "fruits",
    title: "Fruits",
    description: "Learn the names of yummy fruits you can find at the store.",
    isLocked: true,
    order: 4,
  },
  {
    id: "vegetables",
    title: "Vegetables",
    description: "Learn what to call the veggies on your plate.",
    isLocked: true,
    order: 5,
  },
  {
    id: "numbers",
    title: "Numbers",
    description: "Learn to count and talk about how many things you have.",
    isLocked: true,
    order: 6,
  },
  {
    id: "colors",
    title: "Colors",
    description: "Learn the colors of your favorite things.",
    isLocked: true,
    order: 7,
  },

  // Level 3 - Daily Words
  {
    id: "family",
    title: "Family",
    description: "Learn what to call everyone in your family.",
    isLocked: true,
    order: 8,
  },
  {
    id: "home",
    title: "At Home",
    description: "Learn the names of rooms and things in your house.",
    isLocked: true,
    order: 9,
  },
  {
    id: "food",
    title: "Food",
    description: "Learn how to talk about your favorite foods.",
    isLocked: true,
    order: 10,
  },
  {
    id: "drinks",
    title: "Drinks",
    description: "Learn what to call your favorite drinks.",
    isLocked: true,
    order: 11,
  },

  // Level 4 - Simple Actions
  {
    id: "actions",
    title: "Basic Actions",
    description: "Learn words for things you do, like play, run, and jump.",
    isLocked: true,
    order: 12,
  },
  {
    id: "feelings",
    title: "Feelings",
    description: "Learn how to say when you're happy, sad, or excited.",
    isLocked: true,
    order: 13,
  },

  // Level 5 - First Sentences
  {
    id: "greetings",
    title: "Greetings",
    description: "Learn how to say hi and be nice to people.",
    isLocked: true,
    order: 14,
  },
  {
    id: "phrases",
    title: "Simple Phrases",
    description:
      "Learn how to put words together to tell people what you want.",
    isLocked: true,
    order: 15,
  },

  // Level 6 - Real Life
  {
    id: "shopping",
    title: "Shopping",
    description: "Learn how to talk about things you want to buy.",
    isLocked: true,
    order: 16,
  },
  {
    id: "directions",
    title: "Directions",
    description: "Learn how to find your way around and ask for help.",
    isLocked: true,
    order: 17,
  },
] as const;

export type Section = (typeof sections)[number];
