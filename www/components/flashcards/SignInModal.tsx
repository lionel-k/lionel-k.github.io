"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { signInWithOtp } from "@/lib/auth";

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
      const { error } = await signInWithOtp(email);

      if (error) {
        setMessage("Error sending magic link. Please try again.");
      } else {
        setMessage("Check your email for the magic link!");
        onSignInComplete(email);
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-white p-8 shadow-xl w-full">
          <Dialog.Title className="text-2xl font-bold text-gray-900 mb-4">
            Sign In to Continue
          </Dialog.Title>
          <Dialog.Description className="text-gray-600 mb-6">
            Enter your email to receive a magic link for instant access.
          </Dialog.Description>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Magic Link"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 px-4 text-center font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>

            {message && (
              <p
                className={`text-center font-medium ${
                  message.includes("Error")
                    ? "text-red-600 bg-red-50 p-3 rounded-lg"
                    : "text-green-600 bg-green-50 p-3 rounded-lg"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
