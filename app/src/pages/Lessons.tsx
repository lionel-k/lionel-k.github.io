import { useNavigate, useLocation } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import {
  Lock,
  CheckCircle,
  BookOpen,
  Home,
  Trophy,
  User,
  AlertCircle,
} from "lucide-react";
import lessons from "../data/lessons.json";

const Lessons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { progress } = useProgress();

  const isLessonCompleted = (level: number) =>
    progress.completedLessons.includes(level);
  const isLessonLocked = (level: number) => level > progress.currentLesson;

  const menuItems = [
    { icon: Home, label: "Home", path: "/lessons" },
    { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: AlertCircle, label: "Mistakes", path: "/mistakes" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Leçons
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`relative rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 ${
                isLessonLocked(lesson.id)
                  ? "bg-gray-100"
                  : "bg-white cursor-pointer"
              }`}
              onClick={() =>
                !isLessonLocked(lesson.id) && navigate(`/lesson/${lesson.id}`)
              }
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {lesson.word}
                  </h2>
                  {isLessonLocked(lesson.id) ? (
                    <Lock className="w-6 h-6 text-gray-400" />
                  ) : isLessonCompleted(lesson.id) ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <BookOpen className="w-6 h-6 text-blue-500" />
                  )}
                </div>

                <div className="space-y-2">
                  {lessons.map((lesson) => (
                    <p key={lesson.id} className="text-gray-600">
                      • {lesson.word}
                    </p>
                  ))}
                </div>

                {isLessonLocked(lesson.id) && (
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center justify-center space-y-1 w-16 ${
                    isActive
                      ? "text-[#DAA520]"
                      : "text-gray-500 hover:text-[#DAA520]"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
