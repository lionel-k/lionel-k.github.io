import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Exercise, LearningLesson } from "../types";
import {
  MultipleChoice,
  WordChips,
  AudioTextMatching,
  TextMatching,
  ImageChoice,
  TextInput,
  AudioChoice,
  FillBlank,
} from "../components/exercises";
import {
  LearningHeader,
  LearningExitDialog,
  LearningFeedback,
} from "../components/learning";

interface LearningProps {
  lesson: LearningLesson;
  onExit?: () => void;
  backPath?: string;
}

interface CurrentProgress {
  lessonId: string | number;
  exerciseIndex: number;
}

const Learning = ({ lesson, onExit, backPath = "/lessons" }: LearningProps) => {
  const navigate = useNavigate();

  if (!lesson) {
    return null;
  }

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(() => {
    try {
      const saved = localStorage.getItem(`progress_${lesson.id}`);
      if (saved) {
        const progress: CurrentProgress = JSON.parse(saved);
        if (progress.lessonId === lesson.id) {
          return progress.exerciseIndex;
        }
      }
    } catch (error) {
      console.error("Error reading progress from localStorage:", error);
    }
    return 0;
  });

  useEffect(() => {
    const progress: CurrentProgress = {
      lessonId: lesson.id,
      exerciseIndex: currentExerciseIndex,
    };
    localStorage.setItem(`progress_${lesson.id}`, JSON.stringify(progress));
  }, [currentExerciseIndex, lesson.id]);

  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);

  const currentExercise: Exercise | undefined =
    lesson.exercises[currentExerciseIndex];

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const checkAnswer = () => {
    const correct =
      userAnswer.toLowerCase() === currentExercise?.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct && currentExercise && lesson.onExerciseComplete) {
      setExerciseCompleted(true);
      lesson.onExerciseComplete(currentExercise.id.toString());
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setUserAnswer("");
    setExerciseCompleted(false);

    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
    } else {
      localStorage.removeItem(`progress_${lesson.id}`);
      lesson.onComplete?.();
    }
  };

  const handleBack = () => {
    setIsExitDialogOpen(true);
  };

  const handleExitConfirm = () => {
    localStorage.removeItem(`progress_${lesson.id}`);
    if (onExit) {
      onExit();
    } else {
      navigate(backPath);
    }
  };

  const progressPercentage =
    ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;

  const renderExercise = () => {
    if (!currentExercise) return null;

    const commonProps = {
      correctAnswer: currentExercise.correctAnswer,
      audioUrl: currentExercise.audioUrl,
      isCompleted: exerciseCompleted,
      onAnswer: handleAnswer,
    };

    switch (currentExercise.type) {
      case "multiple-choice":
        return (
          <MultipleChoice
            {...commonProps}
            options={currentExercise.options!}
            sourceText={currentExercise.sourceText!}
          />
        );
      case "audio-choice":
        return (
          <AudioChoice
            {...commonProps}
            options={currentExercise.options!}
            sourceText={currentExercise.sourceText!}
          />
        );
      case "word-chips-transcribe":
      case "word-chips-translate":
      case "word-chips-construct":
        return (
          <WordChips
            {...commonProps}
            type={currentExercise.type}
            wordChips={currentExercise.wordChips!}
            textToTranslate={currentExercise.textToTranslate}
          />
        );
      case "audio-text-matching":
        const audioPairs = currentExercise.pairs?.filter(
          (p): p is { audio: string; text: string } => "audio" in p
        );
        return <AudioTextMatching {...commonProps} pairs={audioPairs!} />;
      case "text-matching":
        const textPairs = currentExercise.pairs?.filter(
          (p): p is { text1: string; text2: string } => "text1" in p
        );
        return <TextMatching {...commonProps} pairs={textPairs!} />;
      case "image-choice":
        return (
          <ImageChoice
            {...commonProps}
            imageOptions={currentExercise.imageOptions!}
          />
        );
      case "fill-blank-audio":
        return (
          <FillBlank
            {...commonProps}
            sentence={currentExercise.sentence}
            type="fill-blank-audio"
          />
        );
      case "fill-blank-text":
        return (
          <FillBlank
            {...commonProps}
            sentence={currentExercise.sentence}
            sourceText={currentExercise.sourceText}
            type="fill-blank-text"
          />
        );
      case "text-input":
        return <TextInput {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <LearningExitDialog
        isOpen={isExitDialogOpen}
        onOpenChange={setIsExitDialogOpen}
        onConfirm={handleExitConfirm}
      />

      <LearningHeader
        name={lesson.name}
        currentExercise={currentExerciseIndex + 1}
        totalExercises={lesson.exercises.length}
        progress={progressPercentage}
        onBack={handleBack}
      />

      {/* Main Content */}
      <div className="flex-1 py-6">
        <div className="max-w-4xl mx-auto px-4">
          {/* Exercise Section */}
          {currentExercise && (
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              {renderExercise()}

              {!showFeedback ? (
                <button
                  onClick={checkAnswer}
                  disabled={!userAnswer || exerciseCompleted}
                  className="w-full py-3 px-6 bg-[#DAA520] text-white rounded-lg font-semibold hover:bg-[#B8860B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check Answer
                </button>
              ) : (
                <LearningFeedback isCorrect={isCorrect} onNext={handleNext} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Learning;
