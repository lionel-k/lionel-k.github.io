import { Exercise } from "../types";

type ExerciseType = Exercise["type"];

export const EXERCISE_TITLES: Record<ExerciseType, string> = {
  "audio-text-matching": "Match the audio with the correct meaning",
  "multiple-choice": "Select the correct translation",
  "word-chips": "Construct the sentence using the word chips",
  "text-matching": "Match the phrases with their English translations",
  "image-choice": "Listen and select the correct image",
  "text-input": "Complete the sentence",
  "fill-blank": "Complete the sentence",
  "audio-choice": "Listen and select the correct meaning",
};
