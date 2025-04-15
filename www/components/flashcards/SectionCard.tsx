"use client";

import { Lock } from "lucide-react";
import { Section } from "@/app/flashcards/[language]/sections";

type SectionCardProps = {
  section: Section;
  isAccessible: boolean;
  onClick: (section: Section) => void;
};

const styles = {
  button: {
    accessible:
      "w-full text-left transition-all p-8 rounded-2xl group bg-gradient-to-br from-[#1A1A1A] to-[#252525] text-white border border-[#333333] hover:border-[#DAA520] hover:from-[#1A1A1A] hover:to-[#252525] hover:shadow-lg hover:shadow-[#DAA520]/10",
    locked:
      "w-full text-left transition-all p-8 rounded-2xl relative bg-gradient-to-br from-[#1A1A1A]/40 to-[#252525]/40 border border-[#333333]/30 backdrop-blur hover:border-[#DAA520]/20",
  },
  text: {
    title: {
      accessible:
        "text-2xl font-bold text-white group-hover:text-[#DAA520] transition-colors",
      locked: "text-2xl font-bold text-gray-500",
    },
    description: {
      accessible: "text-gray-400 group-hover:text-gray-300 transition-colors",
      locked: "text-gray-600 mb-4",
    },
  },
};

const PremiumBadge = () => (
  <div className="inline-flex items-center gap-2 text-sm text-[#DAA520] bg-[#DAA520]/5 px-3 py-1.5 rounded-full border border-[#DAA520]/10">
    <Lock className="h-3.5 w-3.5" />
    <span>Premium Feature</span>
  </div>
);

const LockedOverlay = () => (
  <>
    <div className="absolute -inset-[1px] bg-gradient-to-r from-[#333333]/30 via-[#DAA520]/5 to-[#333333]/30 rounded-2xl" />
    <div className="absolute inset-0 bg-black/40 rounded-2xl" />
  </>
);

export default function SectionCard({
  section,
  isAccessible,
  onClick,
}: SectionCardProps) {
  return (
    <button
      onClick={() => onClick(section)}
      className={isAccessible ? styles.button.accessible : styles.button.locked}
    >
      {!isAccessible && <LockedOverlay />}
      <div className="relative flex flex-col items-start">
        <div className="flex items-center gap-2 mb-3">
          <h3
            className={
              isAccessible
                ? styles.text.title.accessible
                : styles.text.title.locked
            }
          >
            {section.title}
          </h3>
        </div>
        <p
          className={
            isAccessible
              ? styles.text.description.accessible
              : styles.text.description.locked
          }
        >
          {section.description}
        </p>
        {!isAccessible && <PremiumBadge />}
      </div>
    </button>
  );
}
