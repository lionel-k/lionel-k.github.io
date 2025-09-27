import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

export function usePageView() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view after a small delay to ensure the page has loaded
    const timer = setTimeout(() => {
      trackPageView(pathname);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);
}
