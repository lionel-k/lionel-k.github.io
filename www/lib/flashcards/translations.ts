import { LanguageTranslations } from "./types";

export const languageTranslations: Record<string, LanguageTranslations> = {
  kirundi: {
    language: "Kirundi",
    translations: {
      cat: "akayabu",
      dog: "imbwa",
      tree: "igiti",
      house: "inzu",
      car: "imodoka",
      book: "igitabo",
      ball: "umupira",
    },
  },
  // Example of how to add more languages
  // french: {
  //   language: "French",
  //   translations: {
  //     cat: "chat",
  //     dog: "chien",
  //     tree: "arbre",
  //     house: "maison",
  //     car: "voiture",
  //     book: "livre",
  //     ball: "ballon",
  //   },
  // },
};
