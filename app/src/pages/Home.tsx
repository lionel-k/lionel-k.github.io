import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Globe,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: GraduationCap,
      title: "Interactive Lessons",
      description:
        "Learn through engaging exercises with audio, text, and visual content",
    },
    {
      icon: Globe,
      title: "Cultural Context",
      description: "Understand Burundian culture while learning the language",
    },
    {
      icon: Users,
      title: "Community Learning",
      description:
        "Practice with other learners and track your progress on the leaderboard",
    },
    {
      icon: Star,
      title: "Expert Content",
      description:
        "Lessons created by native Burundian speakers and language experts",
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "0",
      period: "",
      features: [
        "Access to first lesson",
        "Basic progress tracking",
        "Community support",
      ],
      cta: "Start Learning",
      highlighted: false,
    },
    {
      name: "Monthly",
      price: "9.99",
      period: "/month",
      features: [
        "All lessons unlocked",
        "Advanced progress tracking",
        "Audio exercises",
        "Cultural insights",
        "Priority support",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Annually",
      price: "89.99",
      period: "/year",
      features: [
        "Everything in Monthly",
        "2 months free",
        "Exclusive content",
        "Early access to new features",
        "1-on-1 tutoring session",
      ],
      cta: "Best Value",
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-[#DAA520]" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Lingu Africa
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-gray-700 hover:text-[#DAA520] transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 bg-[#DAA520] text-white rounded-lg hover:bg-[#B8860B] transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Learn Kirundi with{" "}
              <span className="text-[#DAA520]">Confidence</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              The first Kirundi learning app made by Burundians for Burundians.
              Master your language and culture through interactive lessons.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-4 bg-[#DAA520] text-white rounded-lg hover:bg-[#B8860B] transition-colors flex items-center"
              >
                Start Learning <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => navigate("/lessons")}
                className="px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Try Free Lesson
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Lingu Africa?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers a unique approach to learning Kirundi,
              combining modern technology with authentic cultural experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#DAA520]/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#DAA520]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start with our free lesson or unlock the full potential with our
              premium plans.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                  plan.highlighted
                    ? "ring-2 ring-[#DAA520] transform scale-105"
                    : ""
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-[#DAA520] text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-[#DAA520] mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate("/register")}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      plan.highlighted
                        ? "bg-[#DAA520] text-white hover:bg-[#B8860B]"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <GraduationCap className="w-8 h-8 text-[#DAA520]" />
                <span className="ml-2 text-xl font-bold">Lingu Africa</span>
              </div>
              <p className="text-gray-400">
                Learn Kirundi the modern way. Made with ❤️ in Burundi.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Free Lesson</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Twitter</li>
                <li>Facebook</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Lingu Africa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
