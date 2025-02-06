"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

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

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Right-aligned navigation */}
        <div
          className={`${
            isOpen
              ? "fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center space-y-4"
              : "hidden"
          } md:flex md:space-x-4 md:relative md:bg-transparent md:flex-row md:items-center md:justify-end`}
        >
          <nav className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4 text-lg md:text-sm">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`font-medium hover:text-[#DAA520] transition-colors
                ${isActive("/") ? "text-[#DAA520] font-bold" : "text-white"}`}
            >
              Home
            </Link>
            <Link
              href="/books"
              onClick={() => setIsOpen(false)}
              className={`font-medium hover:text-[#DAA520] transition-colors
                ${
                  isActive("/books") ? "text-[#DAA520] font-bold" : "text-white"
                }`}
            >
              Books
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={`font-medium hover:text-[#DAA520] transition-colors
                ${
                  isActive("/about") ? "text-[#DAA520] font-bold" : "text-white"
                }`}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
