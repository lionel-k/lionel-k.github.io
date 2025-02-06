import { languagesConfig } from "@/lib/languagesConfig";
import LanguagePageClient from "@/app/books/[language]/LanguagePageClient";

export async function generateStaticParams() {
  return Object.keys(languagesConfig).map((language) => ({
    language,
  }));
}

export default function LanguagePage() {
  return <LanguagePageClient />;
}
