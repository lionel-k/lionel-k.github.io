"use client";

import { ArrowRight } from "lucide-react";

interface AmazonLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export function AmazonLink({ href, className, children }: AmazonLinkProps) {
  return (
    <a
      href={href}
      {...(!window?.navigator?.userAgent?.includes("Instagram") && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      className={className}
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
