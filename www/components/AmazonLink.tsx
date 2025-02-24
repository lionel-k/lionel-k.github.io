"use client";

import { ArrowRight } from "lucide-react";

interface AmazonLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export function AmazonLink({ href, className, children }: AmazonLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent default behavior for Instagram browser
    if (window.navigator.userAgent.includes("Instagram")) {
      e.preventDefault();
      // Try opening in system browser
      window.open(href, "_system");
      // Fallback to regular redirect
      setTimeout(() => {
        window.location.href = href;
      }, 100);
    }
  };

  return (
    <a
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
    </a>
  );
}
