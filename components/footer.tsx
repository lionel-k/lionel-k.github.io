import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-black text-white">
      <div className="container max-w-screen-xl mx-auto py-8 md:py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
          <div>
            <Link
              href="/"
              className="flex items-center justify-center space-x-2"
            >
              <BookOpen className="h-6 w-6 text-[#DAA520]" />
              <span className="text-xl font-bold text-[#DAA520]">
                Lingu.Africa
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Discover the beauty of African languages through bilingual books.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#DAA520]">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/books/kirundi"
                  className="text-sm hover:text-[#DAA520]"
                >
                  Kirundi Books
                </Link>
              </li>
              {false && (
                <li>
                  <Link href="/blog" className="text-sm hover:text-[#DAA520]">
                    Blog
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#DAA520]">Contact</h3>
            <p className="mt-4 text-sm text-gray-400">
              Email: hello@lingu.africa
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Lingu.Africa. Proudly supporting
            families worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
