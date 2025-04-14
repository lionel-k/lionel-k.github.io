"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { signInWithOtp } from "@/lib/auth";
import { Mail, XCircle } from "lucide-react";
import MagicLinkMessage from "./MagicLinkMessage";

interface SignInModalProps {
  onClose: () => void;
  onSignInComplete: (email: string) => void;
}

export default function SignInModal({
  onClose,
  onSignInComplete,
}: SignInModalProps) {
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowMessage(false);
    setIsError(false);

    try {
      const { error } = await signInWithOtp(email);

      if (error) {
        setIsError(true);
      }
      setShowMessage(true);
      // onSignInComplete(email);
    } catch (error) {
      setIsError(true);
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

            {showMessage && (
              <div className="p-6 rounded-lg bg-[#0A0A0A]/40 border border-[#DAA520]/20">
                <MagicLinkMessage
                  email={email}
                  isError={isError}
                  errorMessage="Error sending magic link. Please try again."
                />
              </div>
            )}
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
