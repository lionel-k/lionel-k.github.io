"use client";

import { Crown, Gift } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { faqItems } from "@/lib/learn/faq";
import { usePathname } from "next/navigation";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";

const stripeLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK!;

const features = [
  "Lifetime access to ALL premium sections",
  "Unlimited practice on every lesson",
  "Access to ALL future {{language}} content",
  "No recurring fees - pay once, own forever",
] as const;

export default function PricingPage() {
  const pathname = usePathname();
  const language = pathname.split("/")[2] || "Kinyarwanda"; // Get language from URL or default
  const capitalizedLanguage =
    language.charAt(0).toUpperCase() + language.slice(1);

  const breadcrumbItems = [
    { name: "Learn", href: "/learn" },
    { name: capitalizedLanguage, href: `/learn/${language}` },
    { name: "Pricing", href: `/learn/${language}/pricing` },
  ];

  const stripeLinkWithEmail = (() => {
    const params = new URLSearchParams({
      prefilled_promo_code: "LAUNCH",
    });

    return `${stripeLink}?${params.toString()}`;
  })();

  return (
    <>
      <BreadcrumbNav items={breadcrumbItems} />
      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Unlock Everything
            </h1>
            <p className="text-gray-400 text-center mt-2 max-w-xl mx-auto">
              One payment unlocks all {capitalizedLanguage} content forever -
              including future lessons
            </p>
          </div>

          {/* Pricing */}
          <div className="mb-12">
            <div className="bg-[#1A1A1A] rounded-lg p-8 border border-[#DAA520]/20">
              <div className="flex flex-wrap items-baseline gap-2 mb-4">
                <span className="text-2xl text-gray-500 line-through">
                  €34.99
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">€24.99</span>
                  <span className="text-[#4CAF50] font-semibold">
                    one-time payment
                  </span>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Single payment - no subscriptions, no hidden fees
              </p>
              <ul className="space-y-4 mb-8">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <Crown className="h-5 w-5 text-[#DAA520] flex-shrink-0" />
                    {feature.replace("{{language}}", capitalizedLanguage)}
                  </li>
                ))}
              </ul>
              <div className="space-y-4">
                <a
                  href={stripeLinkWithEmail}
                  className="block w-full py-4 px-6 text-center font-semibold text-black bg-[#DAA520] hover:bg-[#B8860B] rounded-lg transition-colors"
                >
                  Get Lifetime Access
                </a>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-[#4CAF50]" />
                  <span className="text-[#4CAF50]">€10 off</span>
                  <span className="text-gray-300">
                    for the first 500 customers
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">
                    (10 spots left at this price)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <FAQ items={faqItems} />
          </div>
        </div>
      </div>
    </>
  );
}
