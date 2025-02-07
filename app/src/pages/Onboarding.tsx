import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  GraduationCap,
  Clock,
  BookOpen,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

interface OnboardingData {
  language: string;
  practiceTime: string;
  level: string;
  name: string;
  email: string;
  password: string;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    language: "kirundi",
    practiceTime: "15",
    level: "novice",
    name: "",
    email: "",
    password: "",
  });

  const handleNext = () => {
    if (step === 4) {
      // Handle registration and automatic login
      login(); // Log the user in
      navigate("/lessons"); // Redirect to lessons page
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/");
      return;
    }
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Choose Your Language
            </h2>
            <p className="text-gray-600">
              Select the language you want to learn
            </p>
            <div className="grid gap-4">
              <button
                className="p-4 border-2 border-[#DAA520] bg-[#DAA520]/10 rounded-lg flex items-center justify-between"
                disabled
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-[#DAA520]" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Kirundi</p>
                    <p className="text-sm text-gray-500">Available now</p>
                  </div>
                </div>
                <span className="text-[#DAA520]">Selected</span>
              </button>
              {["Swahili", "Kinyarwanda", "Lingala"].map((lang) => (
                <button
                  key={lang}
                  className="p-4 border-2 border-gray-200 rounded-lg flex items-center justify-between opacity-50 cursor-not-allowed"
                  disabled
                >
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-gray-400" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{lang}</p>
                      <p className="text-sm text-gray-500">Coming soon</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Daily Practice Goal
            </h2>
            <p className="text-gray-600">
              How much time can you dedicate to learning each day?
            </p>
            <div className="grid gap-4">
              {[
                { time: "5", label: "5 minutes" },
                { time: "15", label: "15 minutes" },
                { time: "30", label: "30 minutes" },
                { time: "60", label: "1 hour" },
              ].map((option) => (
                <button
                  key={option.time}
                  onClick={() =>
                    setData({ ...data, practiceTime: option.time })
                  }
                  className={`p-4 border-2 rounded-lg flex items-center justify-between ${
                    data.practiceTime === option.time
                      ? "border-[#DAA520] bg-[#DAA520]/10"
                      : "border-gray-200 hover:border-[#DAA520]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Clock
                      className={`w-6 h-6 ${
                        data.practiceTime === option.time
                          ? "text-[#DAA520]"
                          : "text-gray-400"
                      }`}
                    />
                    <p className="font-medium text-gray-900">{option.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Your Kirundi Level
            </h2>
            <p className="text-gray-600">
              What's your current level in Kirundi?
            </p>
            <div className="grid gap-4">
              {[
                {
                  level: "novice",
                  label: "Novice",
                  desc: "I'm just starting out",
                },
                {
                  level: "beginner",
                  label: "Beginner",
                  desc: "I know a few basic phrases",
                },
                {
                  level: "intermediate",
                  label: "Intermediate",
                  desc: "I can have simple conversations",
                },
                {
                  level: "advanced",
                  label: "Advanced",
                  desc: "I'm fluent but want to improve",
                },
              ].map((option) => (
                <button
                  key={option.level}
                  onClick={() => setData({ ...data, level: option.level })}
                  className={`p-4 border-2 rounded-lg flex items-center justify-between ${
                    data.level === option.level
                      ? "border-[#DAA520] bg-[#DAA520]/10"
                      : "border-gray-200 hover:border-[#DAA520]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen
                      className={`w-6 h-6 ${
                        data.level === option.level
                          ? "text-[#DAA520]"
                          : "text-gray-400"
                      }`}
                    />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">
                        {option.label}
                      </p>
                      <p className="text-sm text-gray-500">{option.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Create Your Account
            </h2>
            <p className="text-gray-600">
              Set up your profile to start learning
            </p>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] outline-none"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] outline-none"
                  placeholder="Create a password"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-full bg-[#DAA520] transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="max-w-xl mx-auto px-4 py-12">
        {renderStep()}

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-[#DAA520] text-white rounded-lg hover:bg-[#B8860B] transition-colors flex items-center"
          >
            {step === 4 ? "Create Account" : "Continue"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
