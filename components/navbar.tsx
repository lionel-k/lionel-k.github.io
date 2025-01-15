"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black text-white">
      <div className="container max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left-aligned logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-[#DAA520]" />
            <span className="text-xl font-bold text-[#DAA520]">
              Lingu.Africa
            </span>
          </Link>
        </div>

        {/* Right-aligned navigation */}
        <div className="flex-1 flex justify-end">
          <nav className="flex space-x-4">
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
      </div>
    </header>
  );
}
