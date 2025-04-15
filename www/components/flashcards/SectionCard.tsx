"use client";

import { Lock } from "lucide-react";
import { Section } from "@/app/flashcards/[language]/sections";

type SectionCardProps = {
  section: Section;
  isAccessible: boolean;
  onClick: (section: Section) => void;
};

export default function SectionCard({
  section,
  isAccessible,
  onClick,
}: SectionCardProps) {
  return (
    <button
      key={section.id}
      onClick={() => onClick(section)}
      className={`w-full text-left transition-all ${
        isAccessible
          ? "group p-8 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#252525] text-white border border-[#333333] hover:border-[#DAA520] hover:from-[#1A1A1A] hover:to-[#252525] hover:shadow-lg hover:shadow-[#DAA520]/10"
          : "relative p-8 rounded-2xl bg-gradient-to-br from-[#1A1A1A]/40 to-[#252525]/40 border border-[#333333]/30 backdrop-blur hover:border-[#DAA520]/20"
      }`}
    >
      {!isAccessible && (
        <>
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[#333333]/30 via-[#DAA520]/5 to-[#333333]/30 rounded-2xl" />
          <div className="absolute inset-0 bg-black/40 rounded-2xl" />
        </>
      )}
      <div className={`relative flex flex-col items-start`}>
        <div className="flex items-center gap-2 mb-3">
          {!isAccessible && <Lock className="h-6 w-6 text-[#DAA520]" />}
          <h3
            className={`text-2xl font-bold ${
              isAccessible
                ? "text-white group-hover:text-[#DAA520] transition-colors"
                : "text-gray-500"
            }`}
          >
            {section.title}
          </h3>
        </div>
        <p
          className={`${
            isAccessible
              ? "text-gray-400 group-hover:text-gray-300 transition-colors"
              : "text-gray-600"
          } ${!isAccessible ? "mb-4" : ""}`}
        >
          {section.description}
        </p>
        {!isAccessible && (
          <div className="inline-flex items-center gap-2 text-sm text-[#DAA520] bg-[#DAA520]/5 px-3 py-1.5 rounded-full border border-[#DAA520]/10">
            <Lock className="h-3.5 w-3.5" />
            <span>Premium Feature</span>
          </div>
        )}
      </div>
    </button>
  );
}
