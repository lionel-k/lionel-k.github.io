"use server";

import { notifyIndexNow } from "@/lib/indexnow";

export async function notifyContentUpdate(urls: string[]) {
  try {
    const success = await notifyIndexNow(urls);
    return { success };
  } catch (error) {
    console.error("Failed to notify search engines:", error);
    return { success: false, error: "Failed to notify search engines" };
  }
}
