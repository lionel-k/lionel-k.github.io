import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import { ChevronRight, Volume2, X, CheckCircle, XCircle } from "lucide-react";
import lessons from "../data/lessons.json";
import { Lesson, Exercise } from "../types";
import {
  MultipleChoice,
  WordChips,
  MatchingPairs,
  ImageChoice,
  TextInput,
} from "../components/exercises";

interface CurrentProgress {
  lessonId: string;
  exerciseIndex: number;
}

const Learning = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { completeExercise, completeLesson } = useProgress();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(() => {
    const saved = localStorage.getItem("currentProgress");
    if (saved) {
      const progress: CurrentProgress = JSON.parse(saved);
      if (progress.lessonId === lessonId) {
        return progress.exerciseIndex;
      }
    }
    return 0;
  });

  useEffect(() => {
    const progress: CurrentProgress = {
      lessonId: lessonId!,
      exerciseIndex: currentExerciseIndex,
    };
    localStorage.setItem("currentProgress", JSON.stringify(progress));
  }, [currentExerciseIndex, lessonId]);

  useEffect(() => {
    const saved = localStorage.getItem("currentProgress");
    if (saved) {
      const progress: CurrentProgress = JSON.parse(saved);
      if (progress.lessonId !== lessonId && progress.exerciseIndex > 0) {
        const confirmed = window.confirm(
          "You have progress in another lesson. Are you sure you want to switch? Your progress will be lost."
        );
        if (!confirmed) {
          navigate(`/lesson/${progress.lessonId}`);
          return;
        }
        setCurrentExerciseIndex(0);
      }
    }
  }, [lessonId, navigate]);

  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  const currentLesson = (lessons as Lesson[])[Number(lessonId) - 1];
  const currentExercise: Exercise | undefined =
    currentLesson?.exercises[currentExerciseIndex];

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

    if (correct) {
      setExerciseCompleted(true);
      completeExercise(currentExercise.id.toString());
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setUserAnswer("");
    setExerciseCompleted(false);

    if (currentExerciseIndex < currentLesson.exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
    } else {
      completeLesson(Number(lessonId));
      localStorage.removeItem("currentProgress");
      navigate(`/lesson/${lessonId}/complete`);
    }
  };

  const handleBackToLessons = () => {
    const confirmed = window.confirm(
      "Are you sure you want to leave? Your progress in this lesson will be lost."
    );
    if (confirmed) {
      localStorage.removeItem("currentProgress");
      navigate("/lessons");
    }
  };

  const progressPercentage =
    ((currentExerciseIndex + 1) / currentLesson.exercises.length) * 100;

  if (!currentLesson) {
    return <div>Level not found</div>;
  }

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
      case "audio-choice":
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
      default:
        return <TextInput {...commonProps} />;
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
                onClick={handleBackToLessons}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <span className="text-sm font-medium">
                Exercise {currentExerciseIndex + 1} of{" "}
                {currentLesson.exercises.length}
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
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h2 className="text-4xl font-bold text-gray-900">
                {currentLesson.word}
              </h2>
              {currentLesson.audioUrl && (
                <button
                  onClick={() => new Audio(currentLesson.audioUrl).play()}
                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                >
                  <Volume2 className="w-6 h-6 text-blue-600" />
                </button>
              )}
            </div>
            <p className="text-xl text-gray-600 text-center mb-6">
              {currentLesson.translation}
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-lg text-blue-900 mb-2">
                {currentLesson.example}
              </p>
              <p className="text-gray-600">
                {currentLesson.exampleTranslation}
              </p>
            </div>
          </div>

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
