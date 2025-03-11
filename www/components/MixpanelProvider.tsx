"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MixpanelTracker, initMixpanel } from "../lib/mixpanel";

export function MixpanelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Mixpanel
    initMixpanel();
  }, []);

  useEffect(() => {
    // Track page view whenever the pathname changes
    const language = pathname.split("/")[1] || "en"; // Extract language from URL if present
    MixpanelTracker.trackPageView(pathname, language);
  }, [pathname]);

  return <>{children}</>;
}
