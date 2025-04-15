import { getFlashcardSet } from "@/lib/flashcards";
import { notFound } from "next/navigation";
import FlashcardSectionClient from "./FlashcardSectionClient";

type Props = {
  params: Promise<{
    language: string;
    section: string;
  }>;
};

export default async function FlashcardSectionPage({ params }: Props) {
  const { language, section } = await params;
  const flashcardSet = await getFlashcardSet(language);

  if (!flashcardSet) {
    notFound();
  }

  return (
    <FlashcardSectionClient flashcardSet={flashcardSet} section={section} />
  );
}
