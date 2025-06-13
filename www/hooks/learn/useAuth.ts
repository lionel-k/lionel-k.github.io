import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface UseAuthReturn {
  email: string | null;
  isPaidUser: boolean;
  isLoading: boolean;
}

export function useAuth(): UseAuthReturn {
  const [email, setEmail] = useState<string | null>(null);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const userEmail = session?.user?.email;

        if (userEmail) {
          setEmail(userEmail);
          // Check if user is paid
          const { data } = await supabase
            .from("paid_users")
            .select()
            .eq("email", userEmail)
            .single();

          setIsPaidUser(!!data);
        } else {
          setEmail(null);
          setIsPaidUser(false);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setEmail(null);
        setIsPaidUser(false);
      } finally {
        setIsLoading(false);
        if (process.env.NODE_ENV === "development") {
          // setEmail("test@gmail.com");
          // setIsPaidUser(true);
        }
      }
    };

    checkAuth();
  }, []);

  return { email, isPaidUser, isLoading };
}
