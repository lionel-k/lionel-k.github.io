"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GoogleAnalyticsWrapper({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== "undefined" && pathname) {
      window.gtag("config", "G-ZPGXJS23ZM", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return <>{children}</>;
}
