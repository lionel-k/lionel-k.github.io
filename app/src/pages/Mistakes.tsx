import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Clock,
  AlertTriangle,
  ChevronRight,
  CheckCircle,
  Play,
} from "lucide-react";
import mistakesData from "../data/mistakes.json";
import BottomNavbar from "../components/BottomNavbar";

const Mistakes = () => {
  const navigate = useNavigate();
  const [mistakes] = useState(mistakesData.exercises);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const handleStartPractice = () => {
    // Navigate to a new practice session with all mistakes
    navigate("/practice/mistakes");
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
            <h1 className="text-3xl font-bold mb-2">Your Mistakes</h1>
            <p className="text-gray-300 text-center max-w-lg">
              Practice all your mistakes to improve your learning
            </p>
          </div>
        </div>
      </div>

      {/* Practice Button */}
      {mistakes.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 -mt-6 mb-6">
          <button
            onClick={handleStartPractice}
            className="w-full bg-white rounded-xl shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#DAA520] bg-opacity-10 rounded-lg group-hover:bg-opacity-20 transition-all">
                <Play className="w-6 h-6 text-[#DAA520]" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">
                  Practice All Mistakes
                </h3>
                <p className="text-sm text-gray-500">
                  {mistakes.length} exercises to review
                </p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-[#DAA520] transition-colors" />
          </button>
        </div>
      )}

      {/* Mistakes List */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-4">
          {mistakes.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Mistakes to Practice
              </h3>
              <p className="text-gray-600">
                Great job! You've mastered all your exercises.
              </p>
            </div>
          ) : (
            mistakes.map((mistake) => (
              <div
                key={mistake.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{mistake.context.lesson}</span>
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(mistake.date)}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {mistake.question}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Your answer: {mistake.context.originalAnswer}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-[#DAA520] to-[#B8860B]" />
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
