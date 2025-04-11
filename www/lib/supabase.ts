import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function checkPaidUser(email: string) {
  const { data } = await supabase
    .from("paid_users")
    .select()
    .eq("email", email)
    .single();
  return !!data;
}
