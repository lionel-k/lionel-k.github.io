"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const language = pathname.split("/")[2] || "Kirundi";
  const capitalizedLanguage =
    language.charAt(0).toUpperCase() + language.slice(1);

  const breadcrumbItems = [
    { name: "Learn", href: "/learn" },
    { name: capitalizedLanguage, href: `/learn/${language}` },
    { name: "Success", href: `/learn/${language}/success` },
  ];

  return (
    <>
      <BreadcrumbNav items={breadcrumbItems} />
      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-[#4CAF50] mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">
              Welcome to the {capitalizedLanguage} Family!
            </h1>
            <p className="text-gray-400 text-lg mb-6">
              Your payment was successful. Your kids can now start learning{" "}
              {capitalizedLanguage}!
            </p>
          </div>

          <div className="bg-[#1A1A1A] rounded-lg p-8 border border-[#DAA520]/20 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              What happens next?
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#DAA520] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">
                  Check your email for a welcome message with getting started
                  instructions
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#DAA520] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">
                  Access to all {capitalizedLanguage} lessons is now unlocked
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#DAA520] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">
                  Start with just 10 minutes a day for the best results
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <a
              href={`/learn/${language}`}
              className="inline-block py-3 px-6 text-center font-semibold text-black bg-[#DAA520] hover:bg-[#B8860B] rounded-lg transition-colors"
            >
              Start Learning {capitalizedLanguage}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
