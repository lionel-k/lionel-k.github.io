"use client";

import { useState } from "react";
import { signInWithOtp } from "@/lib/auth";
import { Mail } from "lucide-react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      // const { error } = await signInWithOtp(email);
      const { error } = { error: null };
      if (error) {
        setMessage("Error sending magic link");
      } else {
        setMessage(`
          <div class="space-y-4">
            <h3 class="text-xl font-semibold">Magic Link Sent ✨</h3>
            <p class="text-gray-300">Check your inbox for</p>
            <p class="font-medium">${email}</p>
            <p class="text-gray-300">and click the link to sign in!</p>
            <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer"
               class="mt-4 inline-flex items-center justify-center w-full gap-2 py-3 px-4 bg-[#DAA520] text-black font-semibold rounded-lg hover:bg-[#B8860B] transition-colors">
              Open Email Inbox
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <p class="text-sm text-gray-400 mt-4">Check spam, just in case. Need help? <a href="mailto:hello@lingu.africa" class="text-[#DAA520] hover:text-[#B8860B]">Email me</a></p>
          </div>
        `);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Sign In to Track Progress
        </h2>
        <p className="text-gray-400">
          Enter your email to receive a magic link
        </p>
      </div>

      <div className="relative">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#0A0A0A]/40 border border-[#DAA520]/20 text-white p-3 pl-10 rounded-lg focus:outline-none focus:border-[#DAA520] focus:ring-1 focus:ring-[#DAA520] placeholder-gray-500"
          required
        />
        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-[#DAA520]" />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-4 bg-[#DAA520] text-black font-semibold py-3 px-4 rounded-lg hover:bg-[#B8860B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Sending..." : "Send Magic Link"}
      </button>

      {message && (
        <div
          className={`mt-4 p-6 rounded-lg text-center ${
            message.includes("Error")
              ? "bg-red-500/10 text-red-500"
              : "bg-[#0A0A0A]/40 border border-[#DAA520]/20"
          }`}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </form>
  );
}
