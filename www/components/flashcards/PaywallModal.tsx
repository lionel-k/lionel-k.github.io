"use client";

import { Dialog } from "@headlessui/react";
import { Crown, LogIn, XCircle } from "lucide-react";

type PaywallModalProps = {
  onClose: () => void;
  email: string | null;
  onSignInClick: () => void;
};

const stripeLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK!;

export default function PaywallModal({
  onClose,
  email,
  onSignInClick,
}: PaywallModalProps) {
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
      <div className="fixed inset-0 flex items-center justify-center p-4 text-center">
        <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] p-8 shadow-xl border border-[#DAA520]/20">
          <Dialog.Title className="text-2xl font-bold text-white mb-4">
            Upgrade to Premium
          </Dialog.Title>
          <Dialog.Description className="text-gray-300 mb-8">
            Get unlimited access to all flashcards and languages to accelerate
            your learning journey.
          </Dialog.Description>

          <div className="space-y-4">
            <a
              href={stripeLinkWithEmail}
              className="block w-full py-3 px-4 text-center font-semibold text-black bg-[#DAA520] hover:bg-[#B8860B] rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Crown className="h-5 w-5" />
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
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
