"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex gap-x-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="min-w-0 flex-auto rounded-md border border-gray-700 bg-black px-3.5 py-2 text-white shadow-sm placeholder:text-gray-400 focus:border-[#DAA520] focus:outline-none sm:text-sm sm:leading-6"
      />
      <button
        type="submit"
        className="flex-none rounded-md bg-[#DAA520] px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-[#B8860B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DAA520]"
      >
        Subscribe
      </button>
    </form>
  );
}