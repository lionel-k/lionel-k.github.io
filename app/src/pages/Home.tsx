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
    alert(`Thank you for joining! We'll be in touch at ${email}`);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-black text-white">
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
              <h1 className="text-4xl sm:text-6xl font-bold mb-6">
                Reconnect with Your Roots—
                <span className="text-[#DAA520]">
                  Learn Kirundi in 10 Minutes a Day!
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                A fun and easy way to speak Kirundi, even if you've never
                learned before.
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
                  Join Now <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </form>
              <p className="text-gray-400 text-sm">
                🚀{" "}
                <span className="font-medium">
                  Be the first to try it! Sign up for early access.
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
                    <h3 className="text-lg font-medium mb-2">
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
      <div className="bg-[#0A0A0A] border-y border-[#DAA520]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">
              Join the Community
            </h2>
            <p className="text-gray-400">
              Be part of a growing movement to preserve and celebrate African
              languages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black p-6 rounded-lg border border-[#DAA520]/20">
              <p className="text-gray-300 mb-4">
                "I've always wanted to learn Kirundi, but never found an easy
                way—this app is perfect for reconnecting with my roots!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#DAA520]/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#DAA520]" />
                </div>
                <div className="ml-3">
                  <p className="text-white font-medium">Sarah K.</p>
                  <p className="text-gray-400 text-sm">Burundian in Canada</p>
                </div>
              </div>
            </div>

            <div className="bg-black p-6 rounded-lg border border-[#DAA520]/20">
              <p className="text-gray-300 mb-4">
                "The 10-minute lessons fit perfectly into my busy schedule. I'm
                learning phrases I can actually use when visiting family."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#DAA520]/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#DAA520]" />
                </div>
                <div className="ml-3">
                  <p className="text-white font-medium">Jean P.</p>
                  <p className="text-gray-400 text-sm">Student in Belgium</p>
                </div>
              </div>
            </div>

            <div className="bg-black p-6 rounded-lg border border-[#DAA520]/20">
              <p className="text-gray-300 mb-4">
                "As a parent, I'm grateful for this tool to help my children
                connect with their heritage and communicate with grandparents."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#DAA520]/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#DAA520]" />
                </div>
                <div className="ml-3">
                  <p className="text-white font-medium">Marie N.</p>
                  <p className="text-gray-400 text-sm">Parent in France</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-[#DAA520] font-medium text-lg">
              Join 100+ Burundians learning Kirundi today!
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Test Section */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Want to be in the first group?
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Secure your spot as a founding member with exclusive benefits
            </p>
            {showCountdown && (
              <div className="mb-6">
                <div className="inline-flex items-center bg-[#DAA520]/10 px-4 py-2 rounded-lg">
                  <span className="text-[#DAA520] font-bold mr-2">⏰</span>
                  <span className="text-white font-medium">
                    Only {spotsLeft} spots left out of 50!
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="max-w-md mx-auto bg-gradient-to-br from-[#0A0A0A] to-black rounded-xl overflow-hidden border border-[#DAA520]">
            <div className="bg-[#DAA520] text-black text-center py-2 font-bold">
              EXCLUSIVE OFFER - ONLY 20 SPOTS AVAILABLE!
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Founding Member Access
              </h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-[#DAA520]">€10</span>
                <span className="text-gray-400 ml-1">one-time payment</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#DAA520] mr-2" />
                  <span className="text-gray-300">
                    Full access to all Kirundi lessons
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#DAA520] mr-2" />
                  <span className="text-gray-300">
                    Audio pronunciation guides
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#DAA520] mr-2" />
                  <span className="text-gray-300">
                    Cultural context for each lesson
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#DAA520] mr-2" />
                  <span className="text-gray-300">
                    Progress tracking and achievements
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#DAA520] mr-2" />
                  <span className="text-gray-300">
                    Lifetime founding member badge
                  </span>
                </li>
              </ul>
              <button
                onClick={() => navigate("/payment")}
                className="w-full py-3 bg-[#DAA520] text-black rounded-lg hover:bg-[#B8860B] transition-colors font-semibold flex items-center justify-center"
              >
                Reserve Your Spot Now <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <p className="text-center text-gray-400 text-sm mt-4">
                100% satisfaction guarantee
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[#DAA520] font-medium">
              ⚡ People are joining fast! Don't miss your chance to be a
              founding member.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#0A0A0A] border-t border-[#DAA520]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">
              Everything you need to know about learning Kirundi with Lingu
              Africa
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-black rounded-lg p-6 border border-[#DAA520]/20"
              >
                <h3 className="text-xl font-medium text-white mb-3 flex items-center">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 text-[#DAA520] ml-auto" />
                </h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              Still have questions? We're here to help!
            </p>
            <a
              href="mailto:hello@lingu.africa"
              className="px-6 py-3 bg-transparent border border-[#DAA520] text-[#DAA520] rounded-lg hover:bg-[#DAA520]/10 transition-colors font-medium inline-flex items-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              hello@lingu.africa
            </a>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-[#0A0A0A] to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to reconnect with your
            <span className="text-[#DAA520]"> Burundian heritage?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join Lingu Africa today and start speaking Kirundi in just 10
            minutes a day.
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
              Get Early Access <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>
          <p className="text-gray-400">
            Limited spots available for founding members!
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-[#DAA520]/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <GraduationCap className="w-8 h-8 text-[#DAA520]" />
                <span className="ml-2 text-xl font-bold">Lingu Africa</span>
              </div>
              <p className="text-gray-400">
                Your journey into African languages starts here. Currently
                featuring Kirundi, with more languages on the way.
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
                <li className="flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2 text-[#DAA520]" />
                  Twitter
                </li>
                <li className="flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2 text-[#DAA520]" />
                  Facebook
                </li>
                <li className="flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2 text-[#DAA520]" />
                  Instagram
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#DAA520]/20 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Lingu Africa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
