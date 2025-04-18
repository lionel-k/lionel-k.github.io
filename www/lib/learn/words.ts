import { Word } from "./types";

export const wordsBySection: Record<string, Record<string, Word>> = {
  basics: {
    mum: { id: "mum", english: "mum", image: "/images/learn/mum.webp" },
    house: { id: "house", english: "house", image: "/images/learn/house.webp" },
    tree: { id: "tree", english: "tree", image: "/images/learn/tree.webp" },
    ball: { id: "ball", english: "ball", image: "/images/learn/ball.webp" },
    book: { id: "book", english: "book", image: "/images/learn/book.webp" },
    sun: { id: "sun", english: "sun", image: "/images/learn/sun.webp" },
    shoe: { id: "shoe", english: "shoe", image: "/images/learn/shoe.webp" },
    lamp: { id: "lamp", english: "lamp", image: "/images/learn/lamp.webp" },
    car: { id: "car", english: "car", image: "/images/learn/car.webp" },
    plate: { id: "plate", english: "plate", image: "/images/learn/plate.webp" },
  },

  objects: {
    bike: { id: "bike", english: "bike", image: "/images/learn/bike.webp" },
    table: { id: "table", english: "table", image: "/images/learn/table.webp" },
    bed: { id: "bed", english: "bed", image: "/images/learn/bed.webp" },
    pen: { id: "pen", english: "pen", image: "/images/learn/pen.webp" },
    clock: { id: "clock", english: "clock", image: "/images/learn/clock.webp" },
    bottle: {
      id: "bottle",
      english: "bottle",
      image: "/images/learn/bottle.webp",
    },
    glass: { id: "glass", english: "glass", image: "/images/learn/glass.webp" },
    spoon: { id: "spoon", english: "spoon", image: "/images/learn/spoon.webp" },
    mirror: {
      id: "mirror",
      english: "mirror",
      image: "/images/learn/mirror.webp",
    },
    umbrella: {
      id: "umbrella",
      english: "umbrella",
      image: "/images/learn/umbrella.webp",
    },
  },

  animals: {
    cow: { id: "cow", english: "cow", image: "/images/learn/cow.webp" },
    cat: { id: "cat", english: "cat", image: "/images/learn/cat.webp" },
    dog: { id: "dog", english: "dog", image: "/images/learn/dog.webp" },
    fish: { id: "fish", english: "fish", image: "/images/learn/fish.webp" },
    horse: { id: "horse", english: "horse", image: "/images/learn/horse.webp" },
    frog: { id: "frog", english: "frog", image: "/images/learn/frog.webp" },
    rabbit: {
      id: "rabbit",
      english: "rabbit",
      image: "/images/learn/rabbit.webp",
    },
    duck: { id: "duck", english: "duck", image: "/images/learn/duck.webp" },
    lion: { id: "lion", english: "lion", image: "/images/learn/lion.webp" },
    elephant: {
      id: "elephant",
      english: "elephant",
      image: "/images/learn/elephant.webp",
    },
  },
};

export const getAllWords = () => {
  const allWords: Record<string, Word> = {};
  Object.values(wordsBySection).forEach((sectionWords) => {
    Object.entries(sectionWords).forEach(([wordId, word]) => {
      allWords[wordId] = word;
    });
  });
  return allWords;
};
