import { supabase } from "./supabase";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

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
        emailRedirectTo: `${SITE_URL}/flashcards`,
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
