"use client";

import { LogOut, ArrowLeft } from "lucide-react";
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
      className="inline-flex items-center gap-2 text-sm text-[#DAA520] hover:text-[#B8860B] transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
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
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-3 bg-[#0A0A0A]/40 backdrop-blur-sm rounded-lg py-3 px-4 border border-[#DAA520]/20">
          <Link
            href="/learn"
            className="text-sm text-[#DAA520] hover:text-[#B8860B] transition-colors"
          >
            Sign in to continue
          </Link>
        </div>
        <BackLink />
      </div>
    );
  }

  if (!email && variant === "default") {
    return <SignInForm />;
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <div className="inline-block bg-[#0A0A0A]/40 backdrop-blur-sm rounded-lg py-3 px-4 border border-[#DAA520]/20">
        <UserInfo />
      </div>
      <BackLink />
    </div>
  );
}
