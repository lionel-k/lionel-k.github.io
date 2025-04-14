interface MagicLinkMessageProps {
  email: string;
  isError?: boolean;
  errorMessage?: string;
}

export default function MagicLinkMessage({
  email,
  isError = false,
  errorMessage = "Error sending magic link",
}: MagicLinkMessageProps) {
  if (isError) {
    return (
      <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-center">
        {errorMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Magic Link Sent ✨</h3>
      <p className="text-gray-300">Check your inbox for</p>
      <p className="font-medium">{email}</p>
      <p className="text-gray-300">and click the link to sign in!</p>
      <a
        href="https://mail.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center w-full gap-2 py-3 px-4 bg-[#DAA520] text-black font-semibold rounded-lg hover:bg-[#B8860B] transition-colors"
      >
        Open Email Inbox
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </a>
      <p className="text-sm text-gray-400 mt-4">
        Check spam, just in case. Need help?{" "}
        <a
          href="mailto:hello@lingu.africa"
          className="text-[#DAA520] hover:text-[#B8860B]"
        >
          Email me
        </a>
      </p>
    </div>
  );
}
