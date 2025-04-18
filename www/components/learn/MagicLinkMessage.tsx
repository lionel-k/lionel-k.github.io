import { ExternalLink } from "lucide-react";

interface MagicLinkMessageProps {
  email: string;
  isError?: boolean;
  errorMessage?: string;
}

const getEmailProvider = (email: string): string => {
  const domain = email.split("@")[1]?.toLowerCase();

  const providers: Record<string, string> = {
    "gmail.com": "https://mail.google.com",
    "yahoo.com": "https://mail.yahoo.com",
    "outlook.com": "https://outlook.live.com",
    "hotmail.com": "https://outlook.live.com",
    "live.com": "https://outlook.live.com",
    "msn.com": "https://outlook.live.com",
  };

  return providers[domain] || "https://mail.google.com";
};

export default function MagicLinkMessage({
  email,
  isError = false,
  errorMessage = "Error sending magic link",
}: MagicLinkMessageProps) {
  if (isError) {
    return (
      <div className="w-full max-w-sm mx-auto mt-8">
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg text-center">
          {errorMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto mt-8">
      <div className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#DAA520]/10 text-[#DAA520] mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">Magic Link Sent ✨</h3>
          <div className="space-y-2">
            <p className="text-gray-400">Check your inbox for</p>
            <p className="text-white font-medium bg-white/5 py-2 px-4 rounded-lg inline-block break-all max-w-full">
              {email}
            </p>
            <p className="text-gray-400">and click the link to sign in!</p>
          </div>
          <a
            href={getEmailProvider(email)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center w-full gap-2 py-3 px-4 bg-[#DAA520] text-black font-semibold rounded-lg hover:bg-[#B8860B] transition-colors"
          >
            Open Email Inbox
            <ExternalLink className="h-4 w-4" />
          </a>
          <p className="text-sm text-gray-400">
            Check spam, just in case. Need help?{" "}
            <a
              href="mailto:hello@lingu.africa"
              className="text-[#DAA520] hover:text-[#B8860B] font-medium"
            >
              Email me
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
