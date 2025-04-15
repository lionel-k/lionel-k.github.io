export const sections = [
  {
    id: "basics",
    title: "Basic Words",
    description:
      "Start with everyday words: food, animals, family, numbers. Build your foundation with essential vocabulary.",
    isLocked: false,
  },
  {
    id: "actions",
    title: "Simple Actions",
    description:
      "Learn common verbs like 'eat', 'walk', 'sleep'. Start understanding how things happen.",
    isLocked: true,
  },
  {
    id: "sentences",
    title: "Basic Sentences",
    description:
      "Combine words and actions to make simple sentences like 'I eat bread' or 'The cat sleeps'.",
    isLocked: true,
  },
  {
    id: "daily-life",
    title: "Daily Life",
    description:
      "Master practical situations: shopping, travel, work. Have basic conversations about everyday activities.",
    isLocked: true,
  },
] as const;
