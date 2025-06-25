"use client";

import { Crown, Gift } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { faqItems } from "@/lib/learn/faq";
import { usePathname } from "next/navigation";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { useState } from "react";

const features = [
  "Pay once, own forever.",
  "Unlock all premium lessons.",
  "Future {{language}} lessons included.",
  "Works in just 10 minutes a day.",
] as const;

export default function PricingPage() {
  const pathname = usePathname();
  const language = pathname.split("/")[2] || "Kirundi";
  const capitalizedLanguage =
    language.charAt(0).toUpperCase() + language.slice(1);
  const [loading, setLoading] = useState(false);

  const breadcrumbItems = [
    { name: "Learn", href: "/learn" },
    { name: capitalizedLanguage, href: `/learn/${language}` },
    { name: "Pricing", href: `/learn/${language}/pricing` },
  ];

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: language,
          origin: window.location.origin,
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        console.error("Error creating checkout session:", error);
        alert("There was an error processing your request. Please try again.");
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BreadcrumbNav items={breadcrumbItems} />
      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Don't let your kids lose {capitalizedLanguage}
            </h1>
            <p className="text-gray-400 text-lg">
              Give them their heritage in 10 minutes a day.
            </p>
            <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300 font-medium">
                Don't let your child be the first generation to lose their
                mother tongue
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-12">
            <div className="bg-[#1A1A1A] rounded-lg p-8 border border-[#DAA520]/20">
              <div className="flex flex-wrap items-baseline gap-2 mb-4">
                <span className="text-2xl text-gray-500 line-through">
                  €119
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">€49</span>
                  <span className="text-[#4CAF50] font-semibold">
                    one-time payment
                  </span>
                </div>
              </div>

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
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="block w-full py-4 px-6 text-center font-semibold text-black bg-[#DAA520] hover:bg-[#B8860B] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                  data-umami-event={`${language}-buy-now-btn`}
                >
                  {loading ? "Processing..." : "Buy Now"}
                </button>
                <div className="text-center">
                  <p className="text-[#4CAF50] text-sm font-medium">
                    ✓ 14-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
                  <Gift className="h-5 w-5 text-[#4CAF50] flex-shrink-0" />
                  <span className="text-[#4CAF50] whitespace-nowrap">
                    Save €70 - Only 23 spots left of 50
                  </span>
                </div>
                <div className="text-gray-300 text-sm">
                  Before it's too late for your kids.
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
