"use client";

import { LogOut, User, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

type UserMenuProps = {
  email: string;
  isPaidUser: boolean;
};

export default function UserMenu({ email, isPaidUser }: UserMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    if (window.location.pathname === "/learn/") {
      window.location.reload();
    } else {
      router.push("/learn");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mobile menu
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return (
      <div className="flex flex-col items-center gap-4 border-t pt-6">
        <div className="flex items-center gap-2 min-w-0">
          <User className="h-4 w-4 text-[#DAA520] flex-shrink-0" />
          <span className="text-sm text-gray-300 truncate">{email}</span>
        </div>
        {isPaidUser && (
          <span className="inline-flex items-center rounded-full bg-[#DAA520]/10 px-2 py-0.5 text-xs font-medium text-[#DAA520] flex-shrink-0">
            Premium
          </span>
        )}
        <button
          onClick={handleSignOut}
          className="inline-flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors flex-shrink-0"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </button>
      </div>
    );
  }

  // Desktop dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:inline-flex items-center gap-1.5 p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
      >
        <User className="h-5 w-5" />
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-[#1A1A1A] rounded-lg shadow-lg border border-[#DAA520]/20 py-2">
          <div className="px-4 py-2 border-b border-[#DAA520]/10">
            <div className="flex items-center gap-2 min-w-0">
              <User className="h-4 w-4 text-[#DAA520] flex-shrink-0" />
              <span className="text-sm text-gray-300 truncate">{email}</span>
            </div>
            {isPaidUser && (
              <span className="mt-2 inline-flex items-center rounded-full bg-[#DAA520]/10 px-2 py-0.5 text-xs font-medium text-[#DAA520]">
                Premium
              </span>
            )}
          </div>
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-left text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors inline-flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
