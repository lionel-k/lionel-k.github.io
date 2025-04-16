"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Mail } from "lucide-react";
import MagicLinkMessage from "./MagicLinkMessage";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/learn/`,
        },
      });
      if (error) {
        setIsError(true);
        setShowMessage(true);
        return;
      }
      setIsError(false);
      setShowMessage(true);
    } catch (error) {
      setIsError(true);
      setShowMessage(true);
    }
  };

  if (showMessage) {
    return <MagicLinkMessage email={email} isError={isError} />;
  }

  return (
    <div className="w-full max-w-sm mx-auto mt-8">
      <form
        onSubmit={handleSignIn}
        className="flex flex-col sm:flex-row items-center gap-3"
      >
        <div className="relative w-full sm:w-auto sm:flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full bg-[#1A1A1A] text-sm text-white placeholder:text-gray-500 rounded-lg py-2.5 pl-9 pr-4 border border-gray-800 focus:border-[#DAA520] focus:ring-1 focus:ring-[#DAA520] transition-all outline-none"
          />
          <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto bg-[#DAA520] text-sm text-black font-medium rounded-lg px-6 py-2.5 hover:bg-[#B8860B] transition-colors whitespace-nowrap"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
