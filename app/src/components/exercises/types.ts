export interface BaseExerciseProps {
  question: string;
  correctAnswer: string;
  audioUrl?: string;
  isCompleted: boolean;
  onAnswer: (answer: string) => void;
}

export interface MultipleChoiceProps extends BaseExerciseProps {
  options: string[];
}

export interface WordChipsProps extends BaseExerciseProps {
  wordChips: string[];
}

export interface MatchingPairsProps extends BaseExerciseProps {
  pairs: Array<{
    audio: string;
    text: string;
  }>;
}

export interface ImageChoiceProps extends BaseExerciseProps {
  imageOptions: Array<{
    url: string;
    label: string;
  }>;
}
