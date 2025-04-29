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
      router.push(`/learn/${language.toLowerCase()}/pricing`);
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
      <CardContent section={section} isAccessible={isAccessible} />
      <CardDecoration isReview={!!section.isReview} />
    </button>
  );
}
