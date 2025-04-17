"use client";

import Link from "next/link";
import { LANGUAGES } from "@/lib/constants";
import { OptimizedImage } from "@/components/OptimizedImage";

const languages = LANGUAGES.filter((language) => language.slug === "kirundi");

export default function LanguagesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {languages.map((language) => (
        <Link
          key={language.slug}
          href={`/learn/${language.slug}`}
          className="group block overflow-hidden rounded-xl bg-white hover:shadow-lg transition duration-300"
        >
          <div className="aspect-[4/3] overflow-hidden bg-[#F8F3E9] flex items-center justify-center p-8">
            <OptimizedImage
              src={`/images/${language.slug}/${language.slug}.webp`}
              alt={`${language.name} flag`}
              className="w-full h-auto max-h-full object-contain"
            />
          </div>
          <div className="p-4 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {language.name}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
