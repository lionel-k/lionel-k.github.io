"use client";

import { Dialog } from "@headlessui/react";
import { Crown, Gift, LogIn, X } from "lucide-react";
import { FAQ } from "../FAQ";
import { faqItems } from "@/lib/learn/faq";
import { usePathname } from "next/navigation";

type PaywallModalProps = {
  onClose: () => void;
  email: string | null;
  onSignInClick: () => void;
};

const stripeLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK!;

const features = [
  "Pay once, learn forever.",
  "Practice without limits.",
  "Access to current & future {{language}} lessons.",
] as const;

export default function PaywallModal({
  onClose,
  email,
  onSignInClick,
}: PaywallModalProps) {
  const pathname = usePathname();
  const language = pathname.split("/")[2] || "Kinyarwanda"; // Get language from URL or default
  const capitalizedLanguage =
    language.charAt(0).toUpperCase() + language.slice(1);

  const stripeLinkWithEmail = (() => {
    const params = new URLSearchParams({
      prefilled_promo_code: "LAUNCH",
    });

    if (email) {
      params.append("prefilled_email", email);
    }

    return `${stripeLink}?${params.toString()}`;
  })();

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] p-8 shadow-xl border border-[#DAA520]/20">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Billing</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Pricing */}
          <div className="mb-8">
            <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#DAA520]/20">
              <div className="flex flex-wrap items-baseline gap-2 mb-4">
                <span className="text-2xl text-gray-500 line-through">
                  €34.99
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">€24.99</span>
                  <span className="text-gray-400 text-lg">one-time</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <Crown className="h-5 w-5 text-[#DAA520] flex-shrink-0" />
                    {feature.replace("{{language}}", capitalizedLanguage)}
                  </li>
                ))}
              </ul>
              <div className="space-y-4">
                <a
                  href={stripeLinkWithEmail}
                  className="block w-full py-3 px-4 text-center font-semibold text-black bg-[#DAA520] hover:bg-[#B8860B] rounded-lg transition-colors"
                >
                  Upgrade Now
                </a>
                <button
                  onClick={onSignInClick}
                  className="block w-full py-3 px-4 text-center font-semibold text-[#DAA520] border border-[#DAA520] hover:bg-[#DAA520]/10 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  Sign In
                </button>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-col items-center text-center space-y-1">
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-[#4CAF50]" />
                  <span className="text-[#4CAF50]">€10 off</span>
                  <span className="text-gray-300">for the first 500</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">customers</span>
                  <span className="text-gray-400">(10 left)</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-4">FAQ</h3>
            <FAQ items={faqItems} />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
