"use client";

import { Dialog } from "@headlessui/react";

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
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-white p-8 shadow-xl">
          <Dialog.Title className="text-2xl font-bold text-gray-900 mb-4">
            Upgrade to Premium
          </Dialog.Title>
          <Dialog.Description className="text-gray-600 mb-6">
            Get unlimited access to all flashcards and languages to accelerate
            your learning journey.
          </Dialog.Description>

          <div className="space-y-4">
            <a
              href={stripeLinkWithEmail}
              className="block w-full py-3 px-4 text-center font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Upgrade Now
            </a>
            <button
              onClick={onSignInClick}
              className="block w-full py-3 px-4 text-center font-semibold text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Already a Premium User? Sign In
            </button>
            <button
              onClick={onClose}
              className="block w-full py-3 px-4 text-center font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
