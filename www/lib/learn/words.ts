import { Word } from "./types";

export const wordsBySection: Record<string, Record<string, Word>> = {
  basics: {
    house: {
      id: "house",
      english: "house",
      image: "/images/learn/house.webp",
    },
    tree: {
      id: "tree",
      english: "tree",
      image: "/images/learn/tree.webp",
    },
    book: {
      id: "book",
      english: "book",
      image: "/images/learn/book.webp",
    },
    ball: {
      id: "ball",
      english: "ball",
      image: "/images/learn/ball.webp",
    },
    water: {
      id: "water",
      english: "water",
      image: "/images/learn/water.webp",
    },
    food: {
      id: "food",
      english: "food",
      image: "/images/learn/food.webp",
    },
    mama: {
      id: "mama",
      english: "mama",
      image: "/images/learn/mama.webp",
    },
    papa: {
      id: "papa",
      english: "papa",
      image: "/images/learn/papa.webp",
    },
    hello: {
      id: "hello",
      english: "hello",
      image: "/images/learn/hello.webp",
    },
    sun: {
      id: "sun",
      english: "sun",
      image: "/images/learn/sun.webp",
    },
  },

  objects: {
    car: {
      id: "car",
      english: "car",
      image: "/images/learn/car.webp",
    },
    chair: {
      id: "chair",
      english: "chair",
      image: "/images/learn/chair.webp",
    },
    table: {
      id: "table",
      english: "table",
      image: "/images/learn/table.webp",
    },
    phone: {
      id: "phone",
      english: "phone",
      image: "/images/learn/phone.webp",
    },
    pencil: {
      id: "pencil",
      english: "pencil",
      image: "/images/learn/pencil.webp",
    },
    bed: {
      id: "bed",
      english: "bed",
      image: "/images/learn/bed.webp",
    },
    door: {
      id: "door",
      english: "door",
      image: "/images/learn/door.webp",
    },
    window: {
      id: "window",
      english: "window",
      image: "/images/learn/window.webp",
    },
    toy: {
      id: "toy",
      english: "toy",
      image: "/images/learn/toy.webp",
    },
    shoe: {
      id: "shoe",
      english: "shoe",
      image: "/images/learn/shoe.webp",
    },
  },

  animals: {
    cat: {
      id: "cat",
      english: "cat",
      image: "/images/learn/cat.webp",
    },
    dog: {
      id: "dog",
      english: "dog",
      image: "/images/learn/dog.webp",
    },
    bird: {
      id: "bird",
      english: "bird",
      image: "/images/learn/bird.webp",
    },
    fish: {
      id: "fish",
      english: "fish",
      image: "/images/learn/fish.webp",
    },
    lion: {
      id: "lion",
      english: "lion",
      image: "/images/learn/lion.webp",
    },
    elephant: {
      id: "elephant",
      english: "elephant",
      image: "/images/learn/elephant.webp",
    },
    monkey: {
      id: "monkey",
      english: "monkey",
      image: "/images/learn/monkey.webp",
    },
    rabbit: {
      id: "rabbit",
      english: "rabbit",
      image: "/images/learn/rabbit.webp",
    },
    cow: {
      id: "cow",
      english: "cow",
      image: "/images/learn/cow.webp",
    },
    chicken: {
      id: "chicken",
      english: "chicken",
      image: "/images/learn/chicken.webp",
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
