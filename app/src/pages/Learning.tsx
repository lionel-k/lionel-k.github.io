import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import { ChevronRight, Volume2, X } from "lucide-react";
import lessons from "../data/lessons.json";
import { Lesson, Exercise } from "../types";

interface CurrentProgress {
  lessonId: string;
  exerciseIndex: number;
}

const Learning = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { completeExercise, completeLesson } = useProgress();
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(() => {
    const saved = localStorage.getItem("currentProgress");
    if (saved) {
      const progress: CurrentProgress = JSON.parse(saved);
      // Only use saved progress if we're on the same lesson
      if (progress.lessonId === lessonId) {
        return progress.exerciseIndex;
      }
    }
    return 0;
  });

  // Save current progress whenever it changes
  useEffect(() => {
    const progress: CurrentProgress = {
      lessonId: lessonId!,
      exerciseIndex: currentExerciseIndex,
    };
    localStorage.setItem("currentProgress", JSON.stringify(progress));
  }, [currentExerciseIndex, lessonId]);

  // Handle lesson switching
  useEffect(() => {
    const saved = localStorage.getItem("currentProgress");
    if (saved) {
      const progress: CurrentProgress = JSON.parse(saved);
      if (progress.lessonId !== lessonId && progress.exerciseIndex > 0) {
        const confirmed = window.confirm(
          "You have progress in another lesson. Are you sure you want to switch? Your progress will be lost."
        );
        if (!confirmed) {
          // Go back to the previous lesson/exercise
          navigate(`/lesson/${progress.lessonId}`);
          return;
        }
        // If confirmed, reset progress for new lesson
        setCurrentExerciseIndex(0);
      }
    }
  }, [lessonId, navigate]);

  const [userAnswer, setUserAnswer] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [selectedPairs, setSelectedPairs] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  const currentLesson = (lessons as Lesson[])[Number(lessonId) - 1];
  const currentExercise: Exercise | undefined =
    currentLesson?.exercises[currentExerciseIndex];

  useEffect(() => {
    if (
      (currentExercise?.type === "audio-choice" ||
        currentExercise?.type === "word-chips" ||
        currentExercise?.type === "image-choice") &&
      currentExercise.audioUrl
    ) {
      setAudio(new Audio(currentExercise.audioUrl));
    } else {
      setAudio(null);
    }

    // Reset states when exercise changes
    setSelectedPairs([]);
    setMatchedPairs(new Set());
    setExerciseCompleted(false);
    setShowFeedback(false);
    setUserAnswer("");
    setSelectedChips([]);
    setIsCorrect(false);

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [currentExercise]);

  const playAudio = (audioUrl: string) => {
    if (!exerciseCompleted) {
      // If there's currently an active audio, stop and reset it first
      if (activeAudio) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
      }

      // Create and play a new audio
      const newAudio = new Audio(audioUrl);
      newAudio.play();

      // Remember this as the active audio, so we can stop it next time
      setActiveAudio(newAudio);
    }
  };

  const handleChipClick = (chip: string) => {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      setActiveAudio(null);
    }

    if (exerciseCompleted) return;
    // Reset feedback states so the Check Answer button is visible again.
    setShowFeedback(false);
    setIsCorrect(false);

    if (!selectedChips.includes(chip)) {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const handleRemoveChip = (index: number) => {
    if (exerciseCompleted) return;
    // Same reset of feedback states
    setShowFeedback(false);
    setIsCorrect(false);

    setSelectedChips(selectedChips.filter((_, i) => i !== index));
  };

  const handlePairClick = (value: string) => {
    if (exerciseCompleted || matchedPairs.has(value)) return;

    // 1. Stop any currently playing audio
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      setActiveAudio(null);
    }

    // 2. If this click corresponds to an audio pair, play that audio
    const audioPair = currentExercise?.pairs?.find(
      (pair) => pair.audio === value
    );
    if (audioPair) {
      playAudio(audioPair.audio);
    }

    // 3. Proceed with matching logic
    setSelectedPairs((prev) => {
      const newSelected = [...prev, value];

      if (newSelected.length === 2) {
        const [first, second] = newSelected;
        const pairs = currentExercise?.pairs || [];

        // Check if selected pair matches
        const isMatch = pairs.some(
          (pair) =>
            (pair.audio === first && pair.text === second) ||
            (pair.audio === second && pair.text === first)
        );

        if (isMatch) {
          setMatchedPairs(
            (oldMatched) => new Set([...oldMatched, first, second])
          );
          return [];
        }

        // If no match, clear selection after a short delay
        setTimeout(() => setSelectedPairs([]), 1000);
        return newSelected;
      }

      return newSelected;
    });
  };

  const handleAnswer = () => {
    let correct = false;
    if (currentExercise?.type === "matching-pairs") {
      correct = matchedPairs.size === (currentExercise.pairs?.length || 0) * 2;
    } else if (currentExercise?.type === "word-chips") {
      correct =
        selectedChips.join(" ").toLowerCase() ===
        currentExercise.correctAnswer.toLowerCase();
    } else {
      correct =
        userAnswer.toLowerCase() ===
        currentExercise.correctAnswer.toLowerCase();
    }
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
    setSelectedChips([]);
    setSelectedPairs([]);
    setMatchedPairs(new Set());
    setExerciseCompleted(false);

    if (currentExerciseIndex < currentLesson.exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
    } else {
      completeLesson(Number(lessonId));
      // Clear progress when lesson is completed
      localStorage.removeItem("currentProgress");
      navigate(`/lesson/${lessonId}/complete`);
    }
  };

  const handleImageSelect = (label: string) => {
    if (exerciseCompleted) return;
    setUserAnswer(label);
    setShowFeedback(false); // Reset feedback when selecting a new answer
    setIsCorrect(false);
  };

  if (!currentLesson) {
    return <div>Level not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Word Section */}
          <div className="mb-12 text-center">
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
            <p className="text-xl text-gray-600 mb-6">
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
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  {currentExercise.question}
                </h3>
                {(currentExercise.type === "audio-choice" ||
                  currentExercise.type === "word-chips" ||
                  currentExercise.type === "image-choice") &&
                  currentExercise.audioUrl && (
                    <button
                      onClick={() => playAudio(currentExercise.audioUrl!)}
                      disabled={exerciseCompleted}
                      className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Volume2 className="w-6 h-6 text-blue-600" />
                    </button>
                  )}
              </div>

              {currentExercise.type === "matching-pairs" ? (
                <div
                  className={`grid grid-cols-2 gap-4 ${
                    exerciseCompleted ? "pointer-events-none opacity-75" : ""
                  }`}
                >
                  <div className="space-y-3">
                    {currentExercise.pairs?.map((pair, index) => (
                      <button
                        key={`audio-${index}`}
                        onClick={() => {
                          playAudio(pair.audio);
                          handlePairClick(pair.audio);
                        }}
                        disabled={exerciseCompleted}
                        className={`w-full p-4 rounded-lg border-2 transition-colors flex items-center justify-center gap-2 ${
                          matchedPairs.has(pair.audio)
                            ? "bg-green-50 border-green-500"
                            : selectedPairs.includes(pair.audio)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-200"
                        }`}
                      >
                        <Volume2 className="w-6 h-6" />
                        <div className="h-1 bg-blue-400 w-20 rounded-full" />
                      </button>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {currentExercise.pairs?.map((pair, index) => (
                      <button
                        key={`text-${index}`}
                        onClick={() => handlePairClick(pair.text)}
                        disabled={exerciseCompleted}
                        className={`w-full p-4 rounded-lg border-2 transition-colors ${
                          matchedPairs.has(pair.text)
                            ? "bg-green-50 border-green-500"
                            : selectedPairs.includes(pair.text)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-200"
                        }`}
                      >
                        {pair.text}
                      </button>
                    ))}
                  </div>
                </div>
              ) : currentExercise.type === "image-choice" ? (
                <div
                  className={`grid grid-cols-2 gap-4 ${
                    exerciseCompleted ? "pointer-events-none opacity-75" : ""
                  }`}
                >
                  {currentExercise.imageOptions?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageSelect(option.label)}
                      disabled={exerciseCompleted}
                      className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                        userAnswer === option.label
                          ? "ring-4 ring-blue-500 scale-95"
                          : "hover:scale-95"
                      }`}
                    >
                      <img
                        src={option.url}
                        alt={option.label}
                        className="w-full h-full object-cover"
                      />
                      {userAnswer === option.label && (
                        <div className="absolute inset-0 bg-blue-500 bg-opacity-20" />
                      )}
                    </button>
                  ))}
                </div>
              ) : currentExercise.type === "word-chips" ? (
                <div
                  className={`space-y-4 ${
                    exerciseCompleted ? "pointer-events-none opacity-75" : ""
                  }`}
                >
                  {/* Selected chips */}
                  <div className="min-h-[60px] p-4 border-2 border-dashed border-gray-300 rounded-lg flex flex-wrap gap-2">
                    {selectedChips.map((chip, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2"
                      >
                        {chip}
                        <button
                          onClick={() => handleRemoveChip(index)}
                          disabled={exerciseCompleted}
                          className="p-1 hover:bg-blue-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  {/* Available chips */}
                  <div className="flex flex-wrap gap-2">
                    {currentExercise.wordChips
                      ?.filter((chip) => !selectedChips.includes(chip))
                      .map((chip, index) => (
                        <button
                          key={index}
                          onClick={() => handleChipClick(chip)}
                          disabled={exerciseCompleted}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {chip}
                        </button>
                      ))}
                  </div>
                </div>
              ) : currentExercise.type === "multiple-choice" ||
                currentExercise.type === "audio-choice" ? (
                <div
                  className={`space-y-3 ${
                    exerciseCompleted ? "pointer-events-none opacity-75" : ""
                  }`}
                >
                  {currentExercise.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setUserAnswer(option);
                        setShowFeedback(false);
                        setIsCorrect(false);
                      }}
                      disabled={exerciseCompleted}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                        userAnswer === option
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-200"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => {
                    setUserAnswer(e.target.value);
                    setShowFeedback(false);
                    setIsCorrect(false);
                  }}
                  disabled={exerciseCompleted}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Type your answer..."
                />
              )}

              {!showFeedback ? (
                <button
                  onClick={handleAnswer}
                  disabled={
                    exerciseCompleted ||
                    // For "word-chips," must have chosen at least one chip:
                    (currentExercise.type === "word-chips" &&
                      selectedChips.length === 0) ||
                    // For "matching-pairs," must have matched all pairs:
                    (currentExercise.type === "matching-pairs" &&
                      matchedPairs.size !==
                        (currentExercise.pairs?.length || 0) * 2) ||
                    // For MC or text-type, need a non-empty userAnswer:
                    ((currentExercise.type === "multiple-choice" ||
                      currentExercise.type === "audio-choice" ||
                      currentExercise.type === "fill-blank") &&
                      !userAnswer)
                  }
                  className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold ..."
                >
                  Check Answer
                </button>
              ) : (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg ${
                      isCorrect
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {isCorrect
                      ? "Correct! Well done!"
                      : "Incorrect. Try again!"}
                  </div>
                  {isCorrect && (
                    <button
                      onClick={handleNext}
                      className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
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
