export interface Lesson {
  id: number;
  name: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: number;
  lessonId: number;
  lessonName: string;
  date?: string;
  type:
    | "multiple-choice"
    | "word-chips-transcribe"
    | "word-chips-translate"
    | "word-chips-construct"
    | "audio-text-matching"
    | "text-matching"
    | "image-choice"
    | "text-input"
    | "fill-blank-audio"
    | "fill-blank-text"
    | "audio-choice";
  correctAnswer: string;
  options?: string[];
  wordChips?: string[];
  audioUrl?: string;
  imageUrl?: string;
  sentence?: string;
  sourceText?: string;
  textToTranslate?: string;
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
  name: string;
  exercises: Exercise[];
  onComplete?: () => void;
  onExerciseComplete?: (exerciseId: string) => void;
}
