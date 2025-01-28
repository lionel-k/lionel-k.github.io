import Link from "next/link";

export function BreadcrumbNav({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <nav className="bg-black text-sm text-[#DAA520] p-4 flex items-center space-x-2 overflow-x-auto">
      {items.map((item, index) => (
        <span key={index} className="whitespace-nowrap">
          <Link href={item.href} className="hover:underline">
            {item.name}
          </Link>
          {index < items.length - 1 && " > "}
        </span>
      ))}
    </nav>
  );
}
