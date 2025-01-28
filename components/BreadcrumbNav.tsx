import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav className="bg-black px-4 py-3 text-sm text-white">
      <div className="max-w-screen-xl mx-auto flex items-center space-x-2 overflow-x-auto">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <Link
              href={item.href}
              className="hover:underline text-[#DAA520] font-medium"
            >
              {item.name}
            </Link>
            {/* Show chevron if it's not the last item */}
            {index < items.length - 1 && (
              <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
