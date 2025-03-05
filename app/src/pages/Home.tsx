import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Users,
  CheckCircle,
  ArrowRight,
  Mail,
  Clock,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const totalSpots = 50;
  const [email, setEmail] = useState("");
  const [spotsLeft, setSpotsLeft] = useState(12);
  const [showCountdown, setShowCountdown] = useState(true);

  const benefits = [
    "Young adults in the diaspora who want to reconnect",
    "Parents who want their kids to learn Kirundi",
    "Anyone who wants to learn Kirundi from scratch",
  ];

  const faqs = [
    {
      question: "How is this different from other language apps?",
      answer:
        "Lingu Africa is specifically tailored for Kirundi learners with step-by-step lessons designed by native speakers. Unlike generic language apps, we focus on cultural context and practical everyday phrases that connect you to your heritage.",
    },
    {
      question: "Is this free?",
      answer:
        "We offer a free lesson to get you started. Early users get an exclusive discount on our premium plans, which unlock the full learning experience.",
    },
    {
      question: "I don't have time to learn a language!",
      answer:
        "Lingu Africa is designed for busy people. With just 10 minutes a day, you can make meaningful progress in learning Kirundi. Our bite-sized lessons fit into any schedule.",
    },
    {
      question: "When will other African languages be available?",
      answer:
        "We're starting with Kirundi and plan to add more African languages based on user demand. Join our waitlist to vote for the next language you'd like to see!",
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    alert(
      `Thank you for requesting early access! We'll be in touch at ${email}`
    );
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="bg-black border-b border-[#DAA520]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-[#DAA520]" />
              <span className="ml-2 text-xl font-bold text-white">
                Lingu Africa
              </span>
            </div>
            {false && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="px-3 py-2 text-white hover:text-[#DAA520] transition-colors font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/onboarding")}
                  className="px-3 sm:px-5 py-2 bg-[#DAA520] text-black rounded-lg hover:bg-[#B8860B] transition-colors font-medium whitespace-nowrap"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="mb-4">
                <span className="inline-flex items-center rounded-full bg-[#DAA520]/10 px-4 py-1 text-sm font-medium text-[#DAA520]">
                  Now Available: Learn Kirundi
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-white">
                Reconnect with Your Roots—
                <span className="text-[#DAA520]">
                  Learn Kirundi in 10 Minutes a Day!
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                A fun and easy way to speak Kirundi, even if you've never
                learned before. Currently in development - request early access
                now!
              </p>

              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <div className="text-[#DAA520] mr-2 font-bold">🛑</div>
                  <p className="text-gray-300">
                    Struggling to speak Kirundi? Feeling disconnected from your
                    heritage?
                  </p>
                </div>
                <div className="flex items-center mb-6">
                  <div className="text-[#DAA520] mr-2 font-bold">✅</div>
                  <p className="text-gray-300">
                    With just{" "}
                    <span className="font-bold">10 minutes a day</span>, our app
                    helps you learn Kirundi step by step—just like Duolingo!
                  </p>
                </div>

                <h3 className="text-white font-semibold mb-3">Perfect for:</h3>
                <ul className="space-y-2 mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#DAA520] mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 mb-4"
              >
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-[#DAA520]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DAA520]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#DAA520] text-black rounded-lg hover:bg-[#B8860B] transition-colors font-medium whitespace-nowrap flex items-center justify-center"
                >
                  Request Early Access <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </form>
              <p className="text-gray-400 text-sm">
                🚀{" "}
                <span className="font-medium">
                  Be among the first to try it when we launch!
                </span>
              </p>
            </div>

            <div className="flex-1 bg-gradient-to-br from-black to-[#111] p-6 rounded-xl border border-[#DAA520]/20">
              <div className="bg-black rounded-lg overflow-hidden border border-[#DAA520]/30">
                <div className="bg-[#111] px-4 py-3 flex items-center border-b border-[#DAA520]/20">
                  <div className="w-3 h-3 rounded-full bg-[#DAA520] mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-[#DAA520]/60 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-[#DAA520]/30 mr-2"></div>
                  <span className="text-sm text-gray-400">
                    Lingu Africa App
                  </span>
                </div>
                <div className="p-4">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2 text-white">
                      Daily Lesson: Greetings
                    </h3>
                    <div className="bg-[#0A0A0A] p-3 rounded-lg mb-3 border border-[#DAA520]/10">
                      <p className="text-[#DAA520] font-medium">Amahoro</p>
                      <p className="text-gray-400 text-sm">Peace / Hello</p>
                    </div>
                    <div className="bg-[#0A0A0A] p-3 rounded-lg mb-3 border border-[#DAA520]/10">
                      <p className="text-[#DAA520] font-medium">Amakuru?</p>
                      <p className="text-gray-400 text-sm">How are you?</p>
                    </div>
                    <div className="bg-[#0A0A0A] p-3 rounded-lg border border-[#DAA520]/10">
                      <p className="text-[#DAA520] font-medium">Ni meza</p>
                      <p className="text-gray-400 text-sm">I'm fine</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#DAA520]/20 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-[#DAA520]" />
                      </div>
                      <span className="ml-2 text-sm text-gray-400">
                        10 min/day
                      </span>
                    </div>
                    <button className="px-3 py-1 bg-[#DAA520] text-black rounded-md text-sm font-medium">
                      Practice Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Join the Community
            </h2>
            <p className="text-gray-600">
              Be part of a growing movement to preserve and celebrate African
              languages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-700 mb-4">
                "I've always wanted to learn Kirundi, but never found an easy
                way—this app is perfect for reconnecting with my roots!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#B8860B]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#B8860B]" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-900 font-medium">Sarah K.</p>
                  <p className="text-gray-500 text-sm">Burundian in Canada</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-700 mb-4">
                "The 10-minute lessons fit perfectly into my busy schedule. I'm
                learning phrases I can actually use when visiting family."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#B8860B]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#B8860B]" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-900 font-medium">Jean P.</p>
                  <p className="text-gray-500 text-sm">Student in Belgium</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-700 mb-4">
                "As a parent, I'm grateful for this tool to help my children
                connect with their heritage and communicate with grandparents."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#B8860B]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#B8860B]" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-900 font-medium">Marie N.</p>
                  <p className="text-gray-500 text-sm">Parent in France</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-[#B8860B] font-medium text-lg">
              Join 100+ Burundians learning Kirundi today!
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Test Section */}
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Want Priority Early Access?
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Secure your spot as a founding member and get access before
              everyone else
            </p>
            {showCountdown && (
              <div className="mb-6">
                <div className="inline-flex items-center bg-[#B8860B]/10 px-4 py-2 rounded-lg">
                  <span className="text-[#B8860B] font-bold mr-2">⏰</span>
                  <span className="text-gray-900 font-medium">
                    Only {spotsLeft} spots left out of {totalSpots}!
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden border border-[#B8860B] shadow-lg">
            <div className="bg-[#B8860B] text-white text-center py-2 font-bold">
              EARLY ACCESS - ONLY {totalSpots} SPOTS AVAILABLE!
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Founding Member Early Access
              </h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-[#B8860B]">€10</span>
                <span className="text-gray-600 ml-1">one-time payment</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#B8860B] mr-2" />
                  <span className="text-gray-700">
                    Full access to all Kirundi lessons
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#B8860B] mr-2" />
                  <span className="text-gray-700">
                    Audio pronunciation guides
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#B8860B] mr-2" />
                  <span className="text-gray-700">
                    Cultural context for each lesson
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#B8860B] mr-2" />
                  <span className="text-gray-700">
                    Progress tracking and achievements
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#B8860B] mr-2" />
                  <span className="text-gray-700">
                    Lifetime founding member badge
                  </span>
                </li>
              </ul>
              <button
                onClick={() => navigate("/payment")}
                className="w-full py-3 bg-[#B8860B] text-white rounded-lg hover:bg-[#8B6914] transition-colors font-semibold flex items-center justify-center"
              >
                Secure Early Access Now <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <p className="text-center text-gray-500 text-sm mt-4">
                100% satisfaction guarantee
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[#B8860B] font-medium">
              ⚡ People are requesting early access fast! Don't miss your chance
              to be a founding member.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Everything you need to know about learning Kirundi with Lingu
              Africa
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              >
                <h3 className="text-xl font-medium text-gray-900 mb-3 flex items-center">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 text-[#B8860B] ml-auto" />
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Still have questions? We're here to help!
            </p>
            <a
              href="mailto:hello@lingu.africa"
              className="px-6 py-3 bg-transparent border border-[#B8860B] text-[#B8860B] rounded-lg hover:bg-[#B8860B]/10 transition-colors font-medium inline-flex items-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              hello@lingu.africa
            </a>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to reconnect with your
            <span className="text-[#DAA520]"> Burundian heritage?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Request early access to Lingu Africa today and be the first to start
            speaking Kirundi.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-6"
          >
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-[#DAA520]/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DAA520]"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#DAA520] text-black rounded-lg hover:bg-[#B8860B] transition-colors font-medium whitespace-nowrap flex items-center justify-center"
            >
              Request Early Access <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>
          <p className="text-gray-400">
            Limited spots available for founding members with priority access!
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-md">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-8 h-8 text-[#B8860B]" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Lingu Africa
                </span>
              </div>
              <p className="text-gray-600">
                Your journey into African languages starts here. Currently
                featuring Kirundi, with more languages on the way.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-center md:text-right text-gray-900">
                Follow Us
              </h4>
              <div className="flex items-center gap-4">
                <a
                  href="https://x.com/lionelkubwimana"
                  className="text-gray-600 hover:text-[#B8860B] transition-colors flex items-center"
                >
                  <ExternalLink className="w-5 h-5 mr-2 text-[#B8860B]" />
                  Twitter
                </a>
                <a
                  href="https://www.instagram.com/lingu.africa"
                  className="text-gray-600 hover:text-[#B8860B] transition-colors flex items-center"
                >
                  <ExternalLink className="w-5 h-5 mr-2 text-[#B8860B]" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
            <p>&copy; 2025 Lingu Africa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
