import { Crown, Medal, Trophy } from "lucide-react";

// Mock data for the leaderboard
const leaderboardData = [
  { id: 1, name: "Sarah Johnson", points: 2500, streak: 15 },
  { id: 2, name: "Michael Chen", points: 2350, streak: 12 },
  { id: 3, name: "Emma Davis", points: 2200, streak: 10 },
  { id: 4, name: "Alex Thompson", points: 2100, streak: 8 },
  { id: 5, name: "Maria Garcia", points: 2000, streak: 7 },
  { id: 6, name: "James Wilson", points: 1950, streak: 6 },
  { id: 7, name: "Lisa Anderson", points: 1900, streak: 5 },
  { id: 8, name: "David Kim", points: 1850, streak: 4 },
  { id: 9, name: "Sophie Martin", points: 1800, streak: 3 },
  { id: 10, name: "John Smith", points: 1750, streak: 2 },
];

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
              <div className="w-16 h-16 rounded-full mb-3 overflow-hidden border-2 border-gray-200">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leaderboardData[1].name}`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900 mb-1">
                  {leaderboardData[1].name}
                </p>
                <p className="text-gray-500 text-sm">
                  {leaderboardData[1].points} pts
                </p>
              </div>
              <div className="h-20 bg-gray-200 mt-3 w-full rounded-t-lg" />
            </div>

            {/* First Place */}
            <div className="flex flex-col items-center justify-end order-0">
              <div className="w-20 h-20 rounded-full mb-3 overflow-hidden border-4 border-yellow-400">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leaderboardData[0].name}`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 mb-1">
                  {leaderboardData[0].name}
                </p>
                <p className="text-gray-500 text-sm">
                  {leaderboardData[0].points} pts
                </p>
              </div>
              <div className="h-28 bg-yellow-400 mt-3 w-full rounded-t-lg" />
            </div>

            {/* Third Place */}
            <div className="flex flex-col items-center justify-end order-2">
              <div className="w-16 h-16 rounded-full mb-3 overflow-hidden border-2 border-amber-200">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leaderboardData[2].name}`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900 mb-1">
                  {leaderboardData[2].name}
                </p>
                <p className="text-gray-500 text-sm">
                  {leaderboardData[2].points} pts
                </p>
              </div>
              <div className="h-16 bg-amber-200 mt-3 w-full rounded-t-lg" />
            </div>
          </div>

          {/* Rest of Leaderboard */}
          <div className="divide-y divide-gray-100">
            {leaderboardData.slice(3).map((user, index) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                {getRankIcon(index + 4)}
                <div className="flex-shrink-0">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
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
    </div>
  );
};

export default Leaderboard;
