import { supabase } from "./supabase";

export interface SignInWithOtpResponse {
  error: Error | null;
  success: boolean;
}

export async function signInWithOtp(
  email: string
): Promise<SignInWithOtpResponse> {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/flashcards`,
      },
    });

    return {
      error,
      success: !error,
    };
  } catch (error) {
    return {
      error: error as Error,
      success: false,
    };
  }
}
