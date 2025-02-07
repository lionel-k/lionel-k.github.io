import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Clock,
  XCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import mistakesData from "../data/mistakes.json";
import BottomNavbar from "../components/BottomNavbar";

const Mistakes = () => {
  const navigate = useNavigate();
  const [mistakes, setMistakes] = useState(mistakesData.mistakes);

  const handleMistakeClick = (lessonId: number, exerciseId: number) => {
    navigate(`/lesson/${lessonId}/exercise/${exerciseId}`);
  };

  const handleRemoveMistake = (mistakeId: number) => {
    setMistakes(mistakes.filter((mistake) => mistake.id !== mistakeId));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#DAA520] to-[#B8860B] flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Practice Mistakes</h1>
            <p className="text-gray-300 text-center max-w-lg">
              Review and correct your previous mistakes to improve your learning
            </p>
          </div>
        </div>
      </div>

      {/* Mistakes List */}
      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="space-y-4">
          {mistakes.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Mistakes to Practice
              </h3>
              <p className="text-gray-600">
                Great job! You've corrected all your mistakes.
              </p>
            </div>
          ) : (
            mistakes.map((mistake) => (
              <div
                key={mistake.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Lesson {mistake.lessonId}</span>
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(mistake.date)}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {mistake.question}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <p className="text-red-600">{mistake.userAnswer}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <p className="text-green-600">
                            {mistake.correctAnswer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleRemoveMistake(mistake.id)}
                      className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() =>
                        handleMistakeClick(mistake.lessonId, mistake.exerciseId)
                      }
                      className="px-4 py-2 text-sm font-medium text-white bg-[#DAA520] hover:bg-[#B8860B] rounded-lg transition-colors"
                    >
                      Practice Again
                    </button>
                  </div>
                </div>

                <div
                  className={`h-1 w-full bg-gradient-to-r from-[#DAA520] to-[#B8860B]`}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Mistakes;
