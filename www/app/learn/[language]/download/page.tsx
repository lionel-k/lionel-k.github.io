"use client";

import { notFound } from "next/navigation";
import { usePathname } from "next/navigation";
import { LANGUAGES } from "@/lib/constants";
import DownloadClient from "@/app/learn/[language]/download/DownloadClient";

export default function DownloadPage() {
  const pathname = usePathname();
  const language = pathname.split("/")[2];
  const languageObj = LANGUAGES.find((l) => l.slug === language);

  if (!languageObj) {
    notFound();
  }

  return <DownloadClient language={languageObj} />;
}
