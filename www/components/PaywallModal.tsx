"use client";

type Props = {
  onClose: () => void;
  stripeLink: string;
};

export default function PaywallModal({ onClose, stripeLink }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Unlock All Languages</h2>
        <p className="mb-4">
          Get unlimited access to flashcards in all African languages with a
          one-time payment.
        </p>
        <div className="space-y-3">
          <a
            href={stripeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2 px-4 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 transition-colors"
          >
            Unlock Now
          </a>
          <button
            onClick={onClose}
            className="block w-full py-2 px-4 border border-gray-300 text-center rounded-lg hover:bg-gray-50 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
