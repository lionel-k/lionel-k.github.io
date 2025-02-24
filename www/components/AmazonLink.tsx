"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface AmazonLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export function AmazonLink({ href, className, children }: AmazonLinkProps) {
  const [isInstagram, setIsInstagram] = useState(false);

  useEffect(() => {
    // Detect Instagram webview: userAgent often contains "Instagram"
    const ua = window.navigator.userAgent.toLowerCase();
    setIsInstagram(ua.includes("instagram"));
  }, []);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isInstagram) {
      // Stop the normal link from opening in the IG in-app browser
      e.preventDefault();

      // Copy link to clipboard (optional)
      try {
        await navigator.clipboard.writeText(href);
        alert(
          "Instagram's in-app browser often blocks this link.\n\n" +
            "The link has been copied to your clipboard. Please open your regular browser (Chrome, Safari, etc.) and paste the link there."
        );
      } catch {
        // If clipboard copy fails for any reason
        alert(
          "Instagram's in-app browser often blocks this link.\n\n" +
            "Please copy the URL manually:\n" +
            href
        );
      }
    }
    // If not Instagram, normal behavior (target="_blank") will work
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
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
