import { sections } from "@/lib/learn/sections";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentSectionId: string;
  language: string;
  isPaidUser: boolean;
};

export default function SectionNavigation({
  currentSectionId,
  language,
  isPaidUser,
}: Props) {
  const currentSection = sections.find((s) => s.id === currentSectionId);
  if (!currentSection) return null;

  const currentOrder = currentSection.order;
  const prevSection = sections.find((s) => s.order === currentOrder - 1);
  const nextSection = sections.find((s) => s.order === currentOrder + 1);

  return (
    <nav
      aria-label="Section navigation"
      className="border-t border-[#DAA520]/5 bg-[#0A0A0A]/80 backdrop-blur-sm"
    >
      <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto px-4 py-2">
        {prevSection && (
          <Link
            href={`/learn/${language}/${prevSection.id}`}
            className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#DAA520]/70 transition-colors"
            aria-label={`Previous section: ${prevSection.title}`}
          >
            <ChevronLeft className="h-3 w-3" />
            <span className="truncate max-w-[80px]">{prevSection.title}</span>
          </Link>
        )}
        {!prevSection && <span className="invisible text-xs">Spacer</span>}

        <Link
          href={`/learn/${language}`}
          className="text-xs text-gray-600 hover:text-[#DAA520]/70 transition-colors"
          aria-label="View all sections"
        >
          All Sections
        </Link>

        {nextSection && (isPaidUser || !nextSection.isLocked) && (
          <Link
            href={`/learn/${language}/${nextSection.id}`}
            className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#DAA520]/70 transition-colors"
            aria-label={`Next section: ${nextSection.title}`}
          >
            <span className="truncate max-w-[80px]">{nextSection.title}</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        )}
        {nextSection && !isPaidUser && nextSection.isLocked && (
          <Link
            href={`/learn/${language}/pricing`}
            className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#DAA520]/70 transition-colors"
            aria-label="Unlock premium content"
          >
            <span>Unlock Next Section</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        )}
        {!nextSection && <span className="invisible text-xs">Spacer</span>}
      </div>
    </nav>
  );
}
