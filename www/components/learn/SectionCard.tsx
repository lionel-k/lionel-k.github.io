"use client";

import { sections } from "@/lib/learn/sections";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

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
      className={`group relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-8 text-left transition-all duration-300 hover:shadow-[0_0_25px_rgba(218,165,32,0.15)] hover:translate-y-[-2px] border border-[#DAA520]/10`}
    >
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-white mb-3">
            {section.title}
          </h3>
          <p className="text-base text-gray-400">{section.description}</p>
        </div>
        {section.isLocked && (
          <div className="flex items-center gap-2 mt-4">
            <Lock className="h-4 w-4 text-[#DAA520]" />
            <span className="text-sm font-medium text-[#DAA520]">
              Premium Feature
            </span>
          </div>
        )}
      </div>
      <div
        className={`absolute inset-0 bg-[#DAA520] opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
      />
    </button>
  );
}
