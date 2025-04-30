import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProgressBarProps {
  progress: number;
  language: string;
}

export default function ProgressBar({ progress, language }: ProgressBarProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => router.push(`/learn/${language.toLowerCase()}`)}
        className="text-gray-400 hover:text-white"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="w-full h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#DAA520] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
