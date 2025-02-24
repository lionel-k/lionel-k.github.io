"use client";

import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface AmazonLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export function AmazonLink({ href, className, children }: AmazonLinkProps) {
  const [isInstagram, setIsInstagram] = useState(false);

  useEffect(() => {
    setIsInstagram(
      window?.navigator?.userAgent?.includes("Instagram") || false
    );
  }, []);

  return (
    <a
      href={href}
      {...(!isInstagram && {
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
