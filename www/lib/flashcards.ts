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

export const flashcardSets: Record<string, FlashcardSet> = {
  kirundi: {
    language: "Kirundi",
    words: [
      {
        id: "1",
        image: "/images/flashcards/cat.webp",
        english: "cat",
        translation: "akayabu",
      },
      {
        id: "2",
        image: "/images/flashcards/dog.webp",
        english: "dog",
        translation: "imbwa",
      },
      {
        id: "3",
        image: "/images/flashcards/tree.webp",
        english: "tree",
        translation: "igiti",
      },
      {
        id: "4",
        image: "/images/flashcards/house.webp",
        english: "house",
        translation: "inzu",
      },
      {
        id: "5",
        image: "/images/flashcards/car.webp",
        english: "car",
        translation: "imodoka",
      },
      {
        id: "6",
        image: "/images/flashcards/book.webp",
        english: "book",
        translation: "igitabo",
      },
      {
        id: "7",
        image: "/images/flashcards/ball.webp",
        english: "ball",
        translation: "umupira",
      },
    ],
  },
};
