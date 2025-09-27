import { supabase } from "./supabase";

export interface PageView {
  id?: number;
  path: string;
  timestamp: string;
  referrer?: string;
  user_agent?: string;
}

export async function trackPageView(path: string): Promise<void> {
  console.log("Tracking page view:", path);
  try {
    const { error } = await supabase.from("page_views").insert({
      path,
      timestamp: new Date().toISOString(),
      referrer: typeof window !== "undefined" ? document.referrer : null,
      user_agent: typeof window !== "undefined" ? navigator.userAgent : null,
    });

    if (error) {
      console.error("Error tracking page view:", error);
    }
  } catch (error) {
    // Fail silently to not affect user experience
    console.error("Failed to track page view:", error);
  }
}

export async function getPageViewStats(days: number = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabase
    .from("page_views")
    .select("path, timestamp")
    .gte("timestamp", since.toISOString())
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Error fetching page view stats:", error);
    return [];
  }

  return data || [];
}
