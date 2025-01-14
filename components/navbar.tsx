"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [currentMarket, setCurrentMarket] = useState<"en" | "fr">("en");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black text-white">
      <div className="container max-w-screen-xl mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-[#DAA520]" />
          <span className="text-xl font-bold text-[#DAA520]">
            African Stories
          </span>
        </Link>

        <nav className="space-x-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-white hover:text-[#DAA520]"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-white hover:text-[#DAA520]"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-white hover:text-[#DAA520]"
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
