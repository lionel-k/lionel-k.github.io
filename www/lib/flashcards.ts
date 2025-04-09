export type FlashcardWord = {
  id: string;
  image: string;
  english: string;
  translation: string;
};

export type FlashcardSet = {
  language: string;
  words: FlashcardWord[];
};

// Initial dataset for French
export const flashcardSets: Record<string, FlashcardSet> = {
  kirundi: {
    language: "Kirundi",
    words: [
      {
        id: "1",
        image: "/images/flashcards/cat.png",
        english: "cat",
        translation: "akayabu",
      },
      {
        id: "2",
        image: "/images/flashcards/dog.png",
        english: "dog",
        translation: "imbwa",
      },
      {
        id: "3",
        image: "/images/flashcards/tree.png",
        english: "tree",
        translation: "igiti",
      },
      {
        id: "4",
        image: "/images/flashcards/house.png",
        english: "house",
        translation: "inzu",
      },
      {
        id: "5",
        image: "/images/flashcards/car.png",
        english: "car",
        translation: "imodoka",
      },
      {
        id: "6",
        image: "/images/flashcards/book.png",
        english: "book",
        translation: "igitabo",
      },
      {
        id: "7",
        image: "/images/flashcards/ball.png",
        english: "ball",
        translation: "umupira",
      },
    ],
  },
  // Add more languages here following the same structure
};
