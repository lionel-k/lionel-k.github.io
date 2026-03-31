"use client";

import { sections } from "@/lib/learn/sections";
import { useRouter } from "next/navigation";
import { CardContent } from "./CardContent";
import { CardDecoration } from "./CardDecoration";

type SectionCardProps = {
  section: (typeof sections)[number];
  language: string;
  isPaidUser?: boolean;
  variant?: "learn" | "teach";
};

export default function SectionCard({
  section,
  language,
  isPaidUser = false,
  variant = "learn",
}: SectionCardProps) {
  const router = useRouter();
  const isTeach = variant === "teach";
  const isAccessible = isTeach || !section.isLocked || isPaidUser;

  const handleClick = () => {
    if (!isAccessible) {
      router.push(`/learn/${language}/pricing`);
      return;
    }
    router.push(`/${variant}/${language}/${section.id}`);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`${section.title} - ${section.description}`}
      role="button"
      className={`group relative aspect-video rounded-xl ${
        !isAccessible
          ? "opacity-60 grayscale hover:opacity-80 hover:grayscale-[0.7]"
          : ""
      } ${
        section.isReview
          ? "bg-gradient-to-br from-[#2A2010] to-[#3A3020]"
          : "bg-gradient-to-br from-[#222222] to-[#2A2A2A]"
      } p-4 sm:p-6 lg:p-8 text-left hover:scale-105 transition-all duration-300 border-2 ${
        !isAccessible
          ? "border-gray-600/50 hover:border-gray-500/70"
          : section.isReview
            ? "border-[#DAA520]/40 hover:border-[#DAA520]"
            : "border-[#DAA520]/30 hover:border-[#DAA520]"
      } overflow-hidden cursor-pointer active:scale-100 focus:outline-none focus:ring-2 focus:ring-[#DAA520] ${
        !isAccessible
          ? "shadow-lg shadow-gray-900/30"
          : "shadow-lg shadow-black/20"
      } min-h-0`}
    >
      {/* Locked card overlay */}
      {!isAccessible && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 rounded-xl backdrop-blur-[0.5px] z-5" />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Locked card pattern */}
      {!isAccessible && (
        <div className="absolute inset-0 opacity-20 z-5">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-600/10 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(156,163,175,0.05)_10px,rgba(156,163,175,0.05)_20px)]"></div>
        </div>
      )}

      <CardContent
        section={section}
        isAccessible={isAccessible}
        language={language}
        footerLabel={isTeach ? "Open presenter" : undefined}
      />
      <CardDecoration isReview={!!section.isReview} />
    </button>
  );
}
