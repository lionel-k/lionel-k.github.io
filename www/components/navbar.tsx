"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Books" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black text-white">
      <div className="container max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left-aligned logo */}
        <Link href="/" className="flex items-center space-x-2">
          <OptimizedImage
            src="/logo.png"
            alt="Lingu.Africa Logo"
            className="h-6 w-6"
          />
          <span className="text-xl font-bold text-[#DAA520]">Lingu.Africa</span>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Right-aligned navigation */}
        <div
          className={`${
            isOpen
              ? "fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center space-y-4"
              : "hidden"
          } md:relative md:bg-transparent md:flex md:items-center md:justify-end md:space-x-4`}
        >
          <nav className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-4 text-lg md:text-sm">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`font-medium hover:text-[#DAA520] transition-colors
                  ${
                    isActive(href) ? "text-[#DAA520] font-bold" : "text-white"
                  }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
