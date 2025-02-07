import { Crown, Medal, Trophy } from "lucide-react";
import leaderboardData from "../data/leaderboard.json";
import BottomNavbar from "../components/BottomNavbar";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const Leaderboard = () => {
  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return (
          <div className="p-2 bg-yellow-100 rounded-full">
            <Crown className="w-6 h-6 text-yellow-500" />
          </div>
        );
      case 2:
        return (
          <div className="p-2 bg-gray-100 rounded-full">
            <Medal className="w-6 h-6 text-gray-400" />
          </div>
        );
      case 3:
        return (
          <div className="p-2 bg-amber-100 rounded-full">
            <Trophy className="w-6 h-6 text-amber-600" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-semibold">{position}</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-gray-300">
            Top learners this week. Keep learning to climb the ranks!
          </p>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-b from-gray-50 to-white">
            {/* Second Place */}
            <div className="flex flex-col items-center justify-end order-1">
              <div className="w-16 h-16 rounded-full mb-3 flex items-center justify-center bg-gray-100 border-2 border-gray-200">
                <span className="text-xl font-semibold text-gray-600">
                  {getInitials(leaderboardData.users[1].name)}
                </span>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900 mb-1">
                  {leaderboardData.users[1].name}
                </p>
                <p className="text-gray-500 text-sm">
                  {leaderboardData.users[1].points} pts
                </p>
              </div>
              <div className="h-20 bg-gray-200 mt-3 w-full rounded-t-lg" />
            </div>

            {/* First Place */}
            <div className="flex flex-col items-center justify-end order-0">
              <div className="w-20 h-20 rounded-full mb-3 flex items-center justify-center bg-yellow-50 border-4 border-yellow-400">
                <span className="text-2xl font-bold text-yellow-600">
                  {getInitials(leaderboardData.users[0].name)}
                </span>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 mb-1">
                  {leaderboardData.users[0].name}
                </p>
                <p className="text-gray-500 text-sm">
                  {leaderboardData.users[0].points} pts
                </p>
              </div>
              <div className="h-28 bg-yellow-400 mt-3 w-full rounded-t-lg" />
            </div>

            {/* Third Place */}
            <div className="flex flex-col items-center justify-end order-2">
              <div className="w-16 h-16 rounded-full mb-3 flex items-center justify-center bg-amber-50 border-2 border-amber-200">
                <span className="text-xl font-semibold text-amber-600">
                  {getInitials(leaderboardData.users[2].name)}
                </span>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900 mb-1">
                  {leaderboardData.users[2].name}
                </p>
                <p className="text-gray-500 text-sm">
                  {leaderboardData.users[2].points} pts
                </p>
              </div>
              <div className="h-16 bg-amber-200 mt-3 w-full rounded-t-lg" />
            </div>
          </div>

          {/* Rest of Leaderboard */}
          <div className="divide-y divide-gray-100">
            {leaderboardData.users.slice(3).map((user, index) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                {getRankIcon(index + 4)}
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                  <span className="text-sm font-semibold text-gray-600">
                    {getInitials(user.name)}
                  </span>
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">
                    {user.streak} day streak
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{user.points}</p>
                  <p className="text-sm text-gray-500">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Leaderboard;
