export interface BaseExerciseProps {
  correctAnswer: string;
  audioUrl?: string;
  isCompleted: boolean;
  onAnswer: (answer: string) => void;
}

export interface MultipleChoiceProps extends BaseExerciseProps {
  options: string[];
  sourceText: string;
}

export interface WordChipsProps extends BaseExerciseProps {
  wordChips: string[];
}

export interface AudioTextMatchingProps extends BaseExerciseProps {
  pairs: Array<{
    audio: string;
    text: string;
  }>;
}

export interface TextMatchingProps extends BaseExerciseProps {
  pairs: Array<{
    text1: string;
    text2: string;
  }>;
}

export interface ImageChoiceProps extends BaseExerciseProps {
  imageOptions: Array<{
    url: string;
    label: string;
  }>;
}
