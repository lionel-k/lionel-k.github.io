"use client";

import SignInForm from "@/components/flashcards/SignInForm";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type UserAuthStatusProps = {
  email: string | null;
  isPaidUser: boolean;
};

export default function UserAuthStatus({
  email,
  isPaidUser,
}: UserAuthStatusProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/flashcards");
  };

  return email ? (
    <div className="mb-4 flex items-center justify-end gap-2 bg-blue-50/50 backdrop-blur-sm rounded-lg py-2 px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
        <p className="text-sm text-gray-700">
          {email}
          {isPaidUser && (
            <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">
              Premium
            </span>
          )}
        </p>
      </div>
      <button
        onClick={handleSignOut}
        className="text-sm text-blue-600 hover:text-blue-700 transition-colors ml-3"
      >
        Sign out
      </button>
    </div>
  ) : (
    <SignInForm />
  );
}
