"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [currentMarket, setCurrentMarket] = useState<"en" | "fr">("en");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black text-white">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-[#DAA520]" />
          <span className="text-xl font-bold text-[#DAA520]">African Stories</span>
        </Link>

        <nav className="ml-8 hidden space-x-8 md:flex">
          <Link href="/" className="text-sm font-medium text-white hover:text-[#DAA520]">
            Home
          </Link>
          <Link href={`/${currentMarket}/books`} className="text-sm font-medium text-white hover:text-[#DAA520]">
            Books
          </Link>
          <Link href="/blog" className="text-sm font-medium text-white hover:text-[#DAA520]">
            Blog
          </Link>
        </nav>

        <button
          onClick={() => setCurrentMarket(currentMarket === "en" ? "fr" : "en")}
          className="ml-auto rounded-md border border-[#DAA520] px-3 py-1 text-sm text-[#DAA520] hover:bg-[#DAA520] hover:text-black"
        >
          {currentMarket === "en" ? "FR" : "EN"}
        </button>
      </div>
    </header>
  );
}