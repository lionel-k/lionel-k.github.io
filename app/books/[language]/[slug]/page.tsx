import { languagesConfig } from "@/lib/languagesConfig";
import BookPageClient from "@/app/books/[language]/[slug]/BookPageClient";

export async function generateStaticParams() {
  const params: { language: string; slug: string }[] = [];

  for (const languageKey of Object.keys(languagesConfig)) {
    const language =
      languagesConfig[languageKey as keyof typeof languagesConfig];
    language.books.forEach((book) => {
      params.push({ language: languageKey, slug: book.slug });
    });
  }

  return params;
}

export default function BookPage() {
  return <BookPageClient />;
}
