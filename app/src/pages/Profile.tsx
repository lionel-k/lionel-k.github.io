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
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import userData from "../data/user.json";

type EditingField = "name" | "email" | "password" | null;

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [editingField, setEditingField] = useState<EditingField>(null);
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
    setEditingField(null);
    // Reset password fields after saving
    if (editingField === "password") {
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    }
  };

  const renderEditForm = () => {
    switch (editingField) {
      case "name":
        return (
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
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setEditingField(null)}
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
        );

      case "email":
        return (
          <div className="p-4 space-y-4">
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
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setEditingField(null)}
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
        );

      case "password":
        return (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
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
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setEditingField(null)}
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
        );

      default:
        return null;
    }
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

          <div>
            <button
              onClick={() => setEditingField("name")}
              className={`w-full p-4 flex items-center justify-between transition-colors ${
                editingField === "name" ? "bg-gray-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Name</p>
                  <p className="text-sm text-gray-500">{formData.name}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            {editingField === "name" && renderEditForm()}

            <button
              onClick={() => setEditingField("email")}
              className={`w-full p-4 flex items-center justify-between border-t border-gray-100 transition-colors ${
                editingField === "email" ? "bg-gray-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-500">{formData.email}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            {editingField === "email" && renderEditForm()}

            <button
              onClick={() => setEditingField("password")}
              className={`w-full p-4 flex items-center justify-between border-t border-gray-100 transition-colors ${
                editingField === "password" ? "bg-gray-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Password</p>
                  <p className="text-sm text-gray-500">Change your password</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            {editingField === "password" && renderEditForm()}
          </div>
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
