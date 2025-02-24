"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";

interface AmazonLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export function AmazonLink({ href, className, children }: AmazonLinkProps) {
  const [isInstagram, setIsInstagram] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    setIsInstagram(ua.includes("instagram"));
  }, []);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isInstagram) {
      // Prevent the normal link from opening inside IG’s WebView
      e.preventDefault();

      try {
        await navigator.clipboard.writeText(href);
        setBannerMessage(
          "Link copied! Please open your normal browser (Chrome, Safari, etc.) and paste the link to continue."
        );
      } catch {
        setBannerMessage(
          `We couldn’t automatically copy the link. Please copy it manually: ${href}`
        );
      }

      setShowBanner(true);
    }
    // If not Instagram, normal behavior (target="_blank") will work
  };

  return (
    <>
      {/* Friendly Banner */}
      {showBanner && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 shadow-md">
            <div className="flex items-start justify-between">
              <p className="pr-2">{bannerMessage}</p>
              <button
                onClick={() => setShowBanner(false)}
                className="ml-4 text-yellow-700 hover:text-yellow-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* The Amazon Link */}
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
    </>
  );
}
