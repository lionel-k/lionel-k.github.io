import { useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import {
  Lock,
  CheckCircle,
  BookOpen,
  Flame,
  GraduationCap,
} from "lucide-react";
import lessons from "../data/lessons.json";
import BottomNavbar from "../components/BottomNavbar";

const Lessons = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  const isLessonCompleted = (level: number) =>
    progress.completedLessons.includes(level);
  const isLessonLocked = (level: number) => level > progress.currentLesson;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#DAA520] to-[#B8860B] flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Learn Kirundi</h1>
            <p className="text-gray-300 text-center max-w-lg">
              Master the language through interactive lessons and exercises
            </p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Level</p>
                <p className="text-xl font-bold text-gray-900">
                  {progress.currentLesson}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-xl font-bold text-gray-900">
                  {progress.completedLessons.length} Lessons
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() =>
                !isLessonLocked(lesson.id) && navigate(`/lesson/${lesson.id}`)
              }
              className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                isLessonLocked(lesson.id)
                  ? "bg-gray-50"
                  : "bg-white hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Lesson {lesson.id}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">
                      {lesson.word}
                    </h3>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      isLessonLocked(lesson.id)
                        ? "bg-gray-100"
                        : isLessonCompleted(lesson.id)
                        ? "bg-green-50"
                        : "bg-blue-50"
                    }`}
                  >
                    {isLessonLocked(lesson.id) ? (
                      <Lock
                        className="w-6 h-6 text-gray-400"
                        aria-label="Locked"
                      />
                    ) : isLessonCompleted(lesson.id) ? (
                      <CheckCircle
                        className="w-6 h-6 text-green-500"
                        aria-label="Completed"
                      />
                    ) : (
                      <BookOpen
                        className="w-6 h-6 text-blue-500"
                        aria-label="Available"
                      />
                    )}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{lesson.translation}</p>

                <div className="flex items-center text-sm text-gray-500">
                  <span>{lesson.exercises.length} exercises</span>
                  <span className="mx-2">•</span>
                  <span>~{lesson.exercises.length * 2} min</span>
                </div>

                {isLessonLocked(lesson.id) && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center px-4">
                      <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">
                        Complete previous lessons to unlock
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div
                className={`h-1 w-full absolute bottom-0 ${
                  isLessonLocked(lesson.id)
                    ? "bg-gray-200"
                    : isLessonCompleted(lesson.id)
                    ? "bg-green-500"
                    : "bg-[#DAA520]"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Lessons;
