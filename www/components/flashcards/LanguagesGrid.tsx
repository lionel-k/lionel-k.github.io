"use client";

import Link from "next/link";
import { LANGUAGES } from "@/lib/constants";
import { OptimizedImage } from "@/components/OptimizedImage";
import { ArrowRight } from "lucide-react";

export default function LanguagesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {LANGUAGES.map((language) => (
        <Link
          key={language.slug}
          href={`/flashcards/${language.slug}`}
          className="group relative bg-white rounded-2xl p-6 border border-[#DAA520]/20 hover:border-[#DAA520]/40 transition-all shadow-sm hover:shadow-md text-center"
        >
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-[#F8F3E9] flex items-center justify-center p-8 border border-[#DAA520]/20">
            <OptimizedImage
              src={`/images/${language.slug}/${language.slug}.webp`}
              alt={`${language.name} flag`}
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#DAA520] transition-colors">
            {language.name}
          </h2>
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="h-4 w-4 text-[#DAA520]" />
          </div>
        </Link>
      ))}
    </div>
  );
}
