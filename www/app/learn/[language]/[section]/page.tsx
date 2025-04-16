import { getFlashcardSet } from "@/lib/learn";
import { LANGUAGES } from "@/lib/constants";
import { sections } from "@/lib/learn/sections";
import { notFound } from "next/navigation";
import SectionClient from "./SectionClient";

type Props = {
  params: Promise<{
    language: string;
    section: string;
  }>;
};

export default async function SectionPage({ params }: Props) {
  const { language: langSlug, section: sectionId } = await params;
  const language = LANGUAGES.find((l) => l.slug === langSlug);
  const section = sections.find((s) => s.id === sectionId);

  if (!language || !section) {
    notFound();
  }

  const flashcardSet = await getFlashcardSet(langSlug);

  if (!flashcardSet) {
    notFound();
  }

  return <SectionClient flashcardSet={flashcardSet} section={sectionId} />;
}
