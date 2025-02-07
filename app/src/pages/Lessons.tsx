import { useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import { Lock, CheckCircle, BookOpen } from "lucide-react";
import lessons from "../data/lessons.json";

const Lessons = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  // Get unique lessons from lessons
  const lessons = Array.from(
    new Set(lessons.lessons.map((lesson) => lesson.level))
  ).sort((a, b) => a - b);

  const isLevelCompleted = (level: number) =>
    progress.completedLevels.includes(level);
  const isLessonLocked = (level: number) => level > progress.currentLevel;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Leçons
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`relative rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 ${
                isLessonLocked(lesson.level)
                  ? "bg-gray-100"
                  : "bg-white cursor-pointer"
              }`}
              onClick={() =>
                !isLessonLocked(lesson.level) &&
                navigate(`/lesson/${lesson.id}`)
              }
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {lesson.word}
                  </h2>
                  {isLessonLocked(lesson.level) ? (
                    <Lock className="w-6 h-6 text-gray-400" />
                  ) : isLevelCompleted(lesson.level) ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <BookOpen className="w-6 h-6 text-blue-500" />
                  )}
                </div>

                <div className="space-y-2">
                  {lessons.lessons
                    .filter((lesson) => lesson.level === lesson.level)
                    .map((lesson) => (
                      <p key={lesson.id} className="text-gray-600">
                        • {lesson.word}
                      </p>
                    ))}
                </div>

                {isLessonLocked(lesson.level) && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
                      <p className="text-sm font-medium text-gray-900">
                        Complete previous level to unlock
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;
