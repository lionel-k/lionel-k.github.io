import { Volume2 } from "lucide-react";
import { useEffect } from "react";

interface SourceTextProps {
  text?: string;
  audioUrl?: string;
  showAudio?: boolean;
}

export const SourceText = ({
  text,
  audioUrl,
  showAudio = false,
}: SourceTextProps) => {
  if (!text && !showAudio) return null;

  useEffect(() => {
    if (audioUrl && showAudio) {
      new Audio(audioUrl).play();
    }
  }, [audioUrl, showAudio]);

  const handleAudioClick = () => {
    if (audioUrl) {
      new Audio(audioUrl).play();
    }
  };

  return (
    <div className="flex items-center justify-center mb-8">
      <div
        className={`flex items-center gap-4 px-8 py-4 bg-white rounded-xl shadow-md border-2 border-gray-100 hover:shadow-lg transition-shadow ${
          showAudio && audioUrl ? "cursor-pointer" : ""
        }`}
        onClick={showAudio && audioUrl ? handleAudioClick : undefined}
      >
        {showAudio && (
          <div className="p-2 rounded-lg bg-blue-500">
            <Volume2 className="w-6 h-6 text-white" />
          </div>
        )}
        {text && (
          <span className="text-3xl font-semibold text-gray-900">{text}</span>
        )}
      </div>
    </div>
  );
};
