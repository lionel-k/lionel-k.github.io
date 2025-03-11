"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MixpanelTracker, initMixpanel } from "../lib/mixpanel";

export function MixpanelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      console.log("MixpanelProvider: Component mounted");
      console.log("MixpanelProvider: Current pathname:", pathname);
      console.log("MixpanelProvider: Initializing Mixpanel");
      initMixpanel();
    } catch (error) {
      console.error("MixpanelProvider: Error in initialization:", error);
    }
  }, []);

  useEffect(() => {
    try {
      const language = pathname.split("/")[1] || "en";
      console.log("MixpanelProvider: Tracking page view", {
        pathname,
        language,
      });

      MixpanelTracker.trackPageView(pathname, language);
    } catch (error) {
      console.error("MixpanelProvider: Error tracking page view:", error);
    }
  }, [pathname]);

  return <>{children}</>;
}
