"use client";

import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SignInForm from "./SignInForm";

type AuthStatusProps = {
  email: string | null;
  isPaidUser: boolean;
  variant?: "practice" | "full";
};

export default function AuthStatus({
  email,
  isPaidUser,
  variant = "full",
}: AuthStatusProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    if (window.location.pathname === "/flashcards/") {
      window.location.reload();
    } else {
      router.push("/flashcards");
    }
  };

  const UserInfo = () => (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#DAA520]"></div>
          <p className="text-sm text-gray-200">{email}</p>
          {isPaidUser && (
            <span className="inline-flex items-center rounded-full bg-[#DAA520]/20 px-2 py-0.5 text-xs font-medium text-[#DAA520]">
              Premium
            </span>
          )}
        </div>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center justify-center gap-1 text-sm text-[#DAA520] hover:text-[#B8860B] transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </>
  );

  if (!email && variant === "practice") {
    return (
      <div className="mt-8 inline-flex items-center gap-3 bg-[#0A0A0A]/40 backdrop-blur-sm rounded-lg py-3 px-4 border border-[#DAA520]/20">
        <Link
          href="/flashcards"
          className="text-sm text-[#DAA520] hover:text-[#B8860B] transition-colors"
        >
          Sign in to track progress
        </Link>
      </div>
    );
  }

  if (!email && variant === "full") {
    return <SignInForm />;
  }

  return (
    <div className="mt-8 inline-block bg-[#0A0A0A]/40 backdrop-blur-sm rounded-lg py-3 px-4 border border-[#DAA520]/20">
      <UserInfo />
    </div>
  );
}
