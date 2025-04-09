interface PaywallModalProps {
  stripeLink: string;
  onClose: () => void;
}

export default function PaywallModal({
  stripeLink,
  onClose,
}: PaywallModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Upgrade to Continue Playing</h2>
        <p className="mb-4">
          You've reached the limit of free plays. Upgrade now to continue
          learning!
        </p>
        <div className="flex space-x-4">
          <a
            href={stripeLink}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-600 transition-colors"
          >
            Upgrade Now
          </a>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
