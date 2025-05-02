import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { getAudioPath } from "@/lib/learn/utils";

interface WordCardProps {
  word: {
    translation: string;
    id: string;
  };
  language: string;
}

export default function WordCard({ word, language }: WordCardProps) {
  const [audioError, setAudioError] = useState<string | null>(null);

  useEffect(() => {
    setAudioError(null);
    playAudio();
  }, [word.id]);

  const playAudio = async () => {
    try {
      setAudioError(null);
      const audioPath = getAudioPath(language, word.id);
      const audio = new Audio(audioPath);
      await audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
      setAudioError("Could not play audio");
    }
  };

  return (
    <button
      onClick={playAudio}
      disabled={!!audioError}
      className="group w-full bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] backdrop-blur-sm rounded-xl py-4 px-6 mb-4 text-center border border-[#DAA520]/20 hover:border-[#DAA520]/40 hover:shadow-[0_0_30px_rgba(218,165,32,0.1)] transition-all duration-300 relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 justify-center">
          <Volume2 className="h-6 w-6 shrink-0 text-[#DAA520] group-hover:scale-110 transition-transform" />
          <p className="text-3xl font-bold text-white tracking-wide inline-flex">
            {word.translation}
          </p>
        </div>
        {audioError && (
          <p className="text-red-500 text-sm mt-2">{audioError}</p>
        )}
      </div>
      <div className="absolute inset-0 bg-[#DAA520]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
