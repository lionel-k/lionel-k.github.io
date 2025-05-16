import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyToClipboardProps {
  text: string;
  className?: string;
}

export function CopyToClipboard({
  text,
  className = "",
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`inline-flex items-center gap-1 rounded-md p-1 text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors ${className}`}
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}
