import { useNavigate, useParams } from "react-router-dom";
import { Trophy, ChevronRight, RotateCcw } from "lucide-react";

const LessonComplete = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 bg-[#DAA520]/10">
            <Trophy className="w-10 h-10 text-[#DAA520]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Congratulations!
          </h1>
          <p className="text-gray-600 text-lg">
            You've completed Lesson {lessonId}
          </p>
          <p className="text-gray-500">Keep learning to master Kirundi</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/lessons")}
            className="w-full py-3 px-6 bg-[#DAA520] text-white rounded-lg font-semibold hover:bg-[#B8860B] transition-colors flex items-center justify-center"
          >
            Continue Learning <ChevronRight className="ml-2 w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(`/lesson/${lessonId}`)}
            className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            Practice Again <RotateCcw className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonComplete;
