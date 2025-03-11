"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";
import { MixpanelTracker } from "@/lib/mixpanel";

interface AmazonLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
  bookTitle?: string;
  bookLanguage?: string;
  bookPrice?: string;
  location?: string;
}

export function AmazonLink({
  href,
  className,
  children,
  bookTitle,
  bookLanguage,
  bookPrice,
  location = "unknown",
}: AmazonLinkProps) {
  const [isInstagram, setIsInstagram] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    setIsInstagram(ua.includes("instagram"));
  }, []);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track the click in Mixpanel
    if (bookTitle && bookLanguage) {
      MixpanelTracker.trackBookClick({
        title: bookTitle,
        language: bookLanguage,
        price: bookPrice,
        location,
      });
    }

    if (isInstagram) {
      // Prevent the normal link from opening inside IG's WebView
      e.preventDefault();

      try {
        await navigator.clipboard.writeText(href);
        setBannerMessage(
          "Link copied! Please open your normal browser (Chrome, Safari, etc.) and paste the link to continue."
        );
      } catch {
        setBannerMessage(
          `We couldn't automatically copy the link. Please copy it manually: ${href}`
        );
      }

      setShowBanner(true);
    }
    // If not Instagram, normal behavior (target="_blank") will work
  };

  return (
    <>
      {/* Notification Banner */}
      {showBanner && (
        <div className="fixed inset-x-0 top-0 z-[100] animate-fade-in">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
            <div className="bg-[#DAA520] text-black rounded-b-lg shadow-xl">
              <div className="max-w-3xl mx-auto py-4 px-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
                        <ArrowRight className="h-5 w-5 text-[#DAA520]" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-black">
                        Opening Amazon Link
                      </p>
                      <p className="mt-1 text-sm text-gray-800">
                        {bannerMessage}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBanner(false)}
                    className="ml-4 flex-shrink-0 rounded-full p-1 hover:bg-black/10 transition-colors"
                  >
                    <X className="h-5 w-5 text-black" />
                  </button>
                </div>
              </div>
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
