"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import FlashcardGame from "@/components/flashcards/FlashcardGame";
import { FlashcardSet } from "@/lib/flashcards/types";
import UserAuthStatus from "@/components/flashcards/UserAuthStatus";

type Props = {
  flashcardSet: FlashcardSet;
};

export default function FlashcardLanguageClient({ flashcardSet }: Props) {
  const [email, setEmail] = useState<string | null>(null);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
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
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <UserAuthStatus email={email} isPaidUser={isPaidUser} />

      <h1 className="text-3xl font-bold mb-8 text-center">
        Learn {flashcardSet.language}
      </h1>
      <FlashcardGame
        words={flashcardSet.words}
        isPaidUser={isPaidUser}
        email={email}
      />
    </div>
  );
}
