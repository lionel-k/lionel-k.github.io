"use client";

import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
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

export default function NavigationControl({
  email,
  isPaidUser,
  variant,
}: Props) {
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

  return <BackLink />;
}
