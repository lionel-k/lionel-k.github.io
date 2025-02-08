import { Exercise } from "../types";

type ExerciseType = Exercise["type"];

export const EXERCISE_TITLES: Record<ExerciseType, string> = {
  "audio-text-matching": "Tap to match the pairs",
  "fill-blank-audio": "Type the missing word",
  "fill-blank-text": "Complete the translation",
  "word-chips-transcribe": "Construct what you hear",
  "word-chips-translate": "Translate what you hear",
  "multiple-choice": "Select the correct translation",
  "text-matching": "Match the phrases with their English translations",
  "image-choice": "Listen and select the correct image",
  "text-input": "Type what you hear",
  "audio-choice": "Listen and select the correct meaning",
};
