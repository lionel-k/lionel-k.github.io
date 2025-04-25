"use client";

import { sections } from "@/lib/learn/sections";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";

type SectionCardProps = {
  section: (typeof sections)[number];
  language: string;
  isPaidUser: boolean;
  onPremiumClick: () => void;
};

export default function SectionCard({
  section,
  language,
  isPaidUser,
  onPremiumClick,
}: SectionCardProps) {
  const router = useRouter();
  const isAccessible = !section.isLocked || isPaidUser;

  const handleClick = () => {
    if (!isAccessible) {
      onPremiumClick();
      return;
    }
    router.push(`/learn/${language.toLowerCase()}/${section.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`group relative aspect-video rounded-xl ${
        section.isReview
          ? "bg-gradient-to-br from-[#2A1A1A] to-[#3A2A1A]"
          : "bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A]"
      } p-8 text-left transition-all duration-300 hover:scale-[1.02] border ${
        section.isReview ? "border-[#DAA520]/20" : "border-[#DAA520]/10"
      } overflow-hidden`}
    >
      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-2xl font-semibold text-white group-hover:text-[#DAA520] transition-colors">
              {section.title}
            </h3>
            {section.isReview && (
              <span className="px-2 py-1 rounded-full bg-[#DAA520]/10 text-[#DAA520] text-xs font-medium">
                Review
              </span>
            )}
          </div>
          <p className="text-base text-gray-400">{section.description}</p>
        </div>

        {/* Bottom section with icon */}
        <div className="flex items-center justify-between mt-4">
          {section.isLocked && !isPaidUser ? (
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#DAA520]" />
              <span className="text-sm font-medium text-[#DAA520]">
                Premium Feature
              </span>
            </div>
          ) : (
            <div className="text-sm text-gray-400">
              {section.isReview ? "Test your knowledge" : "Click to start"}
            </div>
          )}
          <ArrowRight className="h-5 w-5 text-[#DAA520] transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
        </div>
      </div>

      {/* Decorative elements - different pattern for review sections */}
      {section.isReview ? (
        <>
          <div className="absolute right-0 top-0 h-32 w-32 bg-[#DAA520]/10 rounded-bl-[120px] transform translate-x-10 -translate-y-10 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-300" />
          <div className="absolute left-0 bottom-0 h-24 w-24 bg-[#DAA520]/10 rounded-tr-[100px] transform -translate-x-6 translate-y-6 group-hover:-translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />
        </>
      ) : (
        <>
          <div className="absolute right-0 top-0 h-24 w-24 bg-[#DAA520]/5 rounded-bl-[100px] transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300" />
          <div className="absolute right-0 bottom-0 h-16 w-16 bg-[#DAA520]/5 rounded-tl-[100px] transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
          <div className="absolute left-0 top-0 h-16 w-16 bg-[#DAA520]/5 rounded-br-[100px] transform -translate-x-4 -translate-y-4 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
        </>
      )}
    </button>
  );
}
