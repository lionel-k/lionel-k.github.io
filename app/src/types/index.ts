export interface Lesson {
  id: number;
  word: string;
  translation: string;
  example: string;
  exampleTranslation: string;
  audioUrl?: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: number;
  type:
    | "multiple-choice"
    | "fill-blank"
    | "audio-choice"
    | "word-chips"
    | "image-choice"
    | "matching-pairs";
  question: string;
  correctAnswer: string;
  options?: string[];
  audioUrl?: string;
  wordChips?: string[];
  imageOptions?: { url: string; label: string }[];
  pairs?: Array<{
    audio: string;
    text: string;
  }>;
}

export interface UserProgress {
  completedLessons: number[];
  currentLesson: number;
  exercises: {
    [key: string]: boolean;
  };
}
