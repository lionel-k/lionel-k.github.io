import { useNavigate, useLocation } from "react-router-dom";
import { Home, Trophy, User, AlertCircle } from "lucide-react";

const menuItems = [
  { icon: Home, label: "Home", path: "/lessons" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
  { icon: AlertCircle, label: "Mistakes", path: "/mistakes" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
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
  );
};

export default BottomNavbar;
