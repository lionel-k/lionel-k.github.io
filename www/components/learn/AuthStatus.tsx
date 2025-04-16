"use client";

import { LogOut, ArrowLeft, ChevronLeft, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import SignInForm from "./SignInForm";

function BackLink() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);
  const isSection = paths.length === 3; // /learn/[language]/[section]
  const isLearnPage = paths.length === 1 && paths[0] === "learn"; // /learn

  // Don't show back button on /learn page
  if (isLearnPage) {
    return null;
  }

  const href = isSection
    ? `/learn/${paths[1]}` // Back to language
    : "/learn"; // Back to languages

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
    >
      <ChevronLeft className="h-4 w-4" />
      Back
    </Link>
  );
}

type Props = {
  email: string | null;
  isPaidUser: boolean;
  variant: "default" | "practice";
};

export default function AuthStatus({ email, isPaidUser, variant }: Props) {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    if (window.location.pathname === "/learn/") {
      window.location.reload();
    } else {
      router.push("/learn");
    }
  };

  const UserInfo = () => (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-[#DAA520]" />
        <p className="text-sm text-gray-300">{email}</p>
      </div>
      {isPaidUser && (
        <span className="inline-flex items-center rounded-full bg-[#DAA520]/10 px-2 py-0.5 text-xs font-medium text-[#DAA520]">
          Premium
        </span>
      )}
      <button
        onClick={handleSignOut}
        className="inline-flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors ml-2"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </div>
  );

  if (!email && variant === "practice") {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/learn"
          className="text-sm text-[#DAA520] hover:text-[#B8860B] transition-colors"
        >
          Sign in to continue
        </Link>
        <div className="h-4 w-px bg-gray-800" />
        <BackLink />
      </div>
    );
  }

  if (!email && variant === "default") {
    return <SignInForm />;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <UserInfo />
      </div>
      <div className="h-4 w-px bg-gray-800" />
      <BackLink />
    </div>
  );
}
