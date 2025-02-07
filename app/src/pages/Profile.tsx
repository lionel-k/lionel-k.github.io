import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Calendar,
  Trophy,
  Flame,
  LogOut,
  ChevronRight,
  Camera,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";

// Mock user data - replace with actual user data from your backend
const userData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  joinedDate: "2024-01-15",
  streak: 15,
  points: 2500,
  level: 5,
};

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSave = () => {
    // Implement save functionality
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center">
            {/* Profile Picture */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#DAA520] to-[#B8860B] flex items-center justify-center text-white text-3xl font-bold">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg text-gray-700 hover:text-[#DAA520] transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h1 className="text-2xl font-bold mb-1">{userData.name}</h1>
            <p className="text-gray-300 text-sm">Level {userData.level}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-5 h-5 text-[#DAA520]" />
              <span className="text-xs text-gray-500">Points</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {userData.points}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-xs text-gray-500">Streak</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {userData.streak}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="text-xs text-gray-500">Joined</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {new Date(userData.joinedDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Profile Settings
            </h2>
          </div>

          {isEditing ? (
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-white bg-[#DAA520] rounded-lg hover:bg-[#B8860B] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Name</p>
                    <p className="text-sm text-gray-500">{userData.name}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-t border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-t border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      Password
                    </p>
                    <p className="text-sm text-gray-500">
                      Change your password
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full p-4 flex items-center justify-center space-x-2 text-red-600 bg-white rounded-xl shadow-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Profile;
