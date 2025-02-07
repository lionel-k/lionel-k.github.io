import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Volume2, X, CheckCircle, XCircle } from "lucide-react";
import { Exercise, LearningSession } from "../types";
import {
  MultipleChoice,
  WordChips,
  MatchingPairs,
  ImageChoice,
  TextInput,
} from "../components/exercises";

interface LearningProps {
  session: LearningSession;
  onExit?: () => void;
  backPath?: string;
}

interface CurrentProgress {
  sessionId: string | number;
  exerciseIndex: number;
}

const Learning = ({
  session,
  onExit,
  backPath = "/lessons",
}: LearningProps) => {
  const navigate = useNavigate();

  if (!session) {
    return null;
  }

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(() => {
    try {
      const saved = localStorage.getItem(`progress_${session.id}`);
      if (saved) {
        const progress: CurrentProgress = JSON.parse(saved);
        if (progress.sessionId === session.id) {
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
      sessionId: session.id,
      exerciseIndex: currentExerciseIndex,
    };
    localStorage.setItem(`progress_${session.id}`, JSON.stringify(progress));
  }, [currentExerciseIndex, session.id]);

  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  const currentExercise: Exercise | undefined =
    session.exercises[currentExerciseIndex];

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

    if (correct && currentExercise && session.onExerciseComplete) {
      setExerciseCompleted(true);
      session.onExerciseComplete(currentExercise.id.toString());
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setUserAnswer("");
    setExerciseCompleted(false);

    if (currentExerciseIndex < session.exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
    } else {
      localStorage.removeItem(`progress_${session.id}`);
      session.onComplete?.();
    }
  };

  const handleBack = () => {
    const confirmed = window.confirm(
      "Are you sure you want to leave? Your progress will be lost."
    );
    if (confirmed) {
      localStorage.removeItem(`progress_${session.id}`);
      if (onExit) {
        onExit();
      } else {
        navigate(backPath);
      }
    }
  };

  const progressPercentage =
    ((currentExerciseIndex + 1) / session.exercises.length) * 100;

  const renderExercise = () => {
    if (!currentExercise) return null;

    const commonProps = {
      question: currentExercise.question,
      correctAnswer: currentExercise.correctAnswer,
      audioUrl: currentExercise.audioUrl,
      isCompleted: exerciseCompleted,
      onAnswer: handleAnswer,
    };

    switch (currentExercise.type) {
      case "multiple-choice":
        return (
          <MultipleChoice {...commonProps} options={currentExercise.options!} />
        );
      case "word-chips":
        return (
          <WordChips {...commonProps} wordChips={currentExercise.wordChips!} />
        );
      case "matching-pairs":
        return (
          <MatchingPairs {...commonProps} pairs={currentExercise.pairs!} />
        );
      case "image-choice":
        return (
          <ImageChoice
            {...commonProps}
            imageOptions={currentExercise.imageOptions!}
          />
        );
      case "fill-blank":
      case "text-input":
        return <TextInput {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation and Progress Bar */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-white shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <span className="text-sm font-medium">
                Exercise {currentExerciseIndex + 1} of{" "}
                {session.exercises.length}
              </span>
            </div>
            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#DAA520] to-[#B8860B] transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-3xl mx-auto px-4">
          {/* Word Section */}
          {(session.word || session.translation || session.example) && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                {session.word && (
                  <h2 className="text-4xl font-bold text-gray-900">
                    {session.word}
                  </h2>
                )}
                {session.audioUrl && (
                  <button
                    onClick={() => new Audio(session.audioUrl!).play()}
                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                  >
                    <Volume2 className="w-6 h-6 text-blue-600" />
                  </button>
                )}
              </div>
              {session.translation && (
                <p className="text-xl text-gray-600 text-center mb-6">
                  {session.translation}
                </p>
              )}
              {session.example && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-lg text-blue-900 mb-2">
                    {session.example}
                  </p>
                  {session.exampleTranslation && (
                    <p className="text-gray-600">
                      {session.exampleTranslation}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

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
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg flex items-center gap-3 ${
                      isCorrect
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle className="w-6 h-6 flex-shrink-0" />
                        <p className="font-medium">Correct! Well done!</p>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-6 h-6 flex-shrink-0" />
                        <p className="font-medium">Incorrect. Try again!</p>
                      </>
                    )}
                  </div>
                  {isCorrect && (
                    <button
                      onClick={handleNext}
                      className="w-full py-3 px-6 bg-[#DAA520] text-white rounded-lg font-semibold hover:bg-[#B8860B] transition-colors flex items-center justify-center"
                    >
                      Continue <ChevronRight className="ml-2 w-5 h-5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Learning;
