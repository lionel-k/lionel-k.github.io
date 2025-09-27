import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST() {
  try {
    // Delete page views older than 90 days to keep database size manageable
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const { error } = await supabase
      .from("page_views")
      .delete()
      .lt("timestamp", ninetyDaysAgo.toISOString());

    if (error) {
      console.error("Error cleaning up old page views:", error);
      return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Cleanup completed successfully" });
  } catch (error) {
    console.error("Unexpected error during cleanup:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
