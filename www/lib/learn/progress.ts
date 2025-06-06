import { supabase } from "@/lib/supabase";
import { UserProgress, SectionProgress } from "./types";
import { sections } from "./sections";

export async function saveProgress(
  userEmail: string,
  language: string,
  sectionId: string,
  score: number,
  totalQuestions: number
): Promise<void> {
  const percentage = Math.round((score / totalQuestions) * 100);

  // Check if progress already exists
  const { data: existing } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_email", userEmail)
    .eq("language", language)
    .eq("section_id", sectionId)
    .single();

  if (existing) {
    // Update existing record
    const isNewBestScore = percentage > existing.best_score;
    const { error } = await supabase
      .from("user_progress")
      .update({
        best_score: isNewBestScore ? percentage : existing.best_score,
        total_attempts: existing.total_attempts + 1,
        completion_date:
          percentage >= 80
            ? new Date().toISOString()
            : existing.completion_date,
        last_attempt_date: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (error) throw error;
  } else {
    // Insert new record
    const { error } = await supabase.from("user_progress").insert({
      user_email: userEmail,
      language,
      section_id: sectionId,
      best_score: percentage,
      total_attempts: 1,
      completion_date: percentage >= 80 ? new Date().toISOString() : null,
      last_attempt_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;
  }
}

export async function getUserProgress(
  userEmail: string,
  language: string
): Promise<UserProgress[]> {
  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_email", userEmail)
    .eq("language", language)
    .order("created_at");

  if (error) throw error;
  return data || [];
}

export function getSectionProgress(
  userProgress: UserProgress[]
): SectionProgress[] {
  return sections.map((section) => {
    const progress =
      userProgress.find((p) => p.section_id === section.id) || null;
    return {
      section,
      progress,
      percentage: progress?.best_score || 0,
      isCompleted: (progress?.best_score || 0) >= 80,
    };
  });
}
