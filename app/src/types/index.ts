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
  lessonId: number;
  lessonName: string;
  date?: string;
  type:
    | "multiple-choice"
    | "word-chips"
    | "audio-text-matching"
    | "text-matching"
    | "image-choice"
    | "text-input"
    | "fill-blank"
    | "audio-choice";
  question: string;
  correctAnswer: string;
  options?: string[];
  wordChips?: string[];
  audioUrl?: string;
  imageUrl?: string;
  imageOptions?: Array<{ url: string; label: string }>;
  pairs?: Array<
    | {
        audio: string;
        text: string;
      }
    | {
        text1: string;
        text2: string;
      }
  >;
}

export interface UserProgress {
  completedLessons: number[];
  currentLesson: number;
  exercises: {
    [key: string]: boolean;
  };
}

export interface LearningLesson {
  id: string | number;
  title: string;
  subtitle?: string;
  word?: string;
  translation?: string;
  example?: string;
  exampleTranslation?: string;
  audioUrl?: string;
  exercises: Exercise[];
  onComplete?: () => void;
  onExerciseComplete?: (exerciseId: string) => void;
}
