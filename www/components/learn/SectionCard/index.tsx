"use client";

import { sections } from "@/lib/learn/sections";
import { useRouter } from "next/navigation";
import { CardContent } from "./CardContent";
import { CardDecoration } from "./CardDecoration";

type SectionCardProps = {
  section: (typeof sections)[number];
  language: string;
  isPaidUser: boolean;
};

export default function SectionCard({
  section,
  language,
  isPaidUser,
}: SectionCardProps) {
  const router = useRouter();
  const isAccessible = !section.isLocked || isPaidUser;

  const handleClick = () => {
    if (!isAccessible) {
      router.push(`/learn/${language}/pricing`);
      return;
    }
    router.push(`/learn/${language}/${section.id}`);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`${section.title} - ${section.description}`}
      role="button"
      className={`group relative aspect-video rounded-xl ${
        section.isReview
          ? "bg-gradient-to-br from-[#2A2010] to-[#3A3020]"
          : "bg-gradient-to-br from-[#222222] to-[#2A2A2A]"
      } p-8 text-left hover:scale-105 transition-transform border-2 ${
        section.isReview ? "border-[#DAA520]/40" : "border-[#DAA520]/30"
      } overflow-hidden cursor-pointer hover:border-[#DAA520] active:scale-100 focus:outline-none focus:ring-2 focus:ring-[#DAA520]`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent
        section={section}
        isAccessible={isAccessible}
        language={language}
      />
      <CardDecoration isReview={!!section.isReview} />
    </button>
  );
}
