"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AmazonLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export function AmazonLink({ href, className, children }: AmazonLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.navigator.userAgent.includes("Instagram")) {
      e.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children || (
        <>
          View on Amazon
          <ArrowRight className="ml-2 h-5 w-5" />
        </>
      )}
    </Link>
  );
}
