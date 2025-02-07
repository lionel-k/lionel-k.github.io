import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const LevelComplete = () => {
  const navigate = useNavigate();
  const { levelId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="bg-yellow-100 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4">
            <Trophy className="w-10 h-10 text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Congratulations!
          </h1>
          <p className="text-gray-600">
            You've completed Level {levelId}! Keep up the great work!
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue to Next Level
          </button>
          <button
            onClick={() => navigate(`/level/${levelId}`)}
            className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Practice This Level Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelComplete;