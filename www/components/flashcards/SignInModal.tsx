"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { signInWithOtp } from "@/lib/auth";
import { Mail, XCircle } from "lucide-react";

interface SignInModalProps {
  onClose: () => void;
  onSignInComplete: (email: string) => void;
}

export default function SignInModal({
  onClose,
  onSignInComplete,
}: SignInModalProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // const { error } = await signInWithOtp(email);
      const { error } = { error: null };

      if (error) {
        setMessage("Error sending magic link. Please try again.");
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
        // onSignInComplete(email);
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4 text-center">
        <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] p-8 shadow-xl border border-[#DAA520]/20 w-full">
          <Dialog.Title className="text-2xl font-bold text-white mb-4">
            Sign In to Track Progress
          </Dialog.Title>
          <Dialog.Description className="text-gray-300 mb-6">
            Enter your email to receive a magic link for instant access.
          </Dialog.Description>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#DAA520]/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#DAA520] text-black font-semibold rounded-lg hover:bg-[#B8860B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Mail className="h-5 w-5" />
                {isLoading ? "Sending..." : "Send Magic Link"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 px-4 text-center font-semibold text-gray-400 hover:text-gray-300 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="h-5 w-5" />
                Cancel
              </button>
            </div>

            {message && (
              <div
                className={`text-center ${
                  message.includes("Error")
                    ? "text-red-400 bg-red-950/50 p-3 rounded-lg border border-red-800"
                    : "bg-[#0A0A0A]/40 border border-[#DAA520]/20 p-6 rounded-lg"
                }`}
                dangerouslySetInnerHTML={{ __html: message }}
              />
            )}
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
