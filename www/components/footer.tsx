import Link from "next/link";
import { BookOpen } from "lucide-react";
import { FaInstagram, FaTwitter } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* Top Section: Four columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand + About */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-[#DAA520]" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
                Lingu.Africa
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Discover the beauty of African languages through bilingual books.
            </p>
          </div>

          {/* Books by Language */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-[#DAA520]">Our Books</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/books/kirundi"
                  className="text-sm text-gray-300 hover:text-[#DAA520]"
                >
                  Kirundi Books
                </Link>
              </li>
              <li>
                <Link
                  href="/books/kinyarwanda"
                  className="text-sm text-gray-300 hover:text-[#DAA520]"
                >
                  Kinyarwanda Books
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="text-sm text-gray-300 hover:text-[#DAA520]"
                >
                  View All Books
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-[#DAA520]">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-300 hover:text-[#DAA520]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#languages"
                  className="text-sm text-gray-300 hover:text-[#DAA520]"
                >
                  Languages
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-sm text-gray-300 hover:text-[#DAA520]"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-[#DAA520]">Contact</h3>
            <p className="mt-4 text-sm text-gray-300">
              Email: <a href="mailto:hello@lingu.africa">hello@lingu.africa</a>
            </p>
            {/* Social Icons */}
            <div className="flex justify-center md:justify-start space-x-6 mt-4">
              <Link
                href="https://www.instagram.com/lingu.africa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-transform hover:scale-110"
              >
                <FaInstagram className="h-5 w-5 text-[#DAA520] hover:text-[#B8860B]" />
              </Link>
              <Link
                href="https://x.com/lionelkubwimana"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="transition-transform hover:scale-110"
              >
                <FaTwitter className="h-5 w-5 text-[#DAA520] hover:text-[#B8860B]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-[#DAA520]/20 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Lingu.Africa
            <span className="mx-2">•</span>
            <Link href="/terms" className="hover:text-[#DAA520]">
              Terms
            </Link>
            <span className="mx-2">•</span>
            <Link href="/privacy" className="hover:text-[#DAA520]">
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
