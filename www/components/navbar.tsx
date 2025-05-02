"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";
import UserMenu from "@/components/learn/UserMenu";
import { useAuth } from "@/hooks/learn/useAuth";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { email, isPaidUser, isLoading } = useAuth();

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
            src="/logo.webp"
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
            isOpen ? "fixed inset-0 bg-black bg-opacity-90" : "hidden"
          } md:relative md:bg-transparent md:flex md:items-center md:justify-end md:space-x-4`}
        >
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-4 text-white md:hidden"
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6" />
            </button>
          )}
          <nav className="flex flex-col h-full items-center justify-center space-y-6 md:flex-row md:space-y-0 md:space-x-4 text-lg md:text-sm">
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
            {/* User Menu */}
            {!isLoading && email && (
              <UserMenu email={email} isPaidUser={isPaidUser} />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
