import { useState, useEffect, useRef } from "react";
import { Volume2, Info } from "lucide-react";
import { getAudioPath } from "@/lib/learn/utils";

interface WordCardProps {
  word: {
    translation: string;
    id: string;
    english?: string;
  };
  language: string;
}

export default function WordCard({ word, language }: WordCardProps) {
  const [audioError, setAudioError] = useState<string | null>(null);
  const [showEnglish, setShowEnglish] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [word.id]);

  useEffect(() => {
    setAudioError(null);
    const audio = new Audio(getAudioPath(language, word.id));
    audioRef.current = audio;

    // Preload the audio
    audio.load();

    // Try to play after a short delay to ensure audio is loaded
    const playTimeout = setTimeout(() => {
      playAudio();
    }, 100);

    return () => {
      clearTimeout(playTimeout);
    };
  }, [word.id, language]);

  const playAudio = async () => {
    try {
      setAudioError(null);

      const audio =
        audioRef.current || new Audio(getAudioPath(language, word.id));

      audio.currentTime = 0;

      if (audioRef.current) {
        audioRef.current.pause();
      }

      audioRef.current = audio;

      await audio.play().catch((error) => {
        if (error.name === "NotAllowedError") {
          return;
        }
        console.error("Error playing audio:", error);
        setAudioError("Could not play audio");
      });
    } catch (error) {
      console.error("Error playing audio:", error);
      setAudioError("Could not play audio");
    }
  };

  const toggleEnglish = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEnglish(!showEnglish);
  };

  return (
    <div className="relative w-full mb-4">
      {/* Main Card with Audio */}
      <button
        onClick={playAudio}
        className="group w-full bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] backdrop-blur-sm rounded-xl py-4 px-6 text-center border border-[#DAA520]/20 hover:border-[#DAA520]/40 hover:shadow-[0_0_30px_rgba(218,165,32,0.1)] transition-all duration-300 relative overflow-hidden"
      >
        <div className="relative z-10 pr-10">
          <div className="flex items-center gap-3 justify-center">
            <Volume2 className="h-6 w-6 shrink-0 text-[#DAA520] group-hover:scale-110 transition-transform" />
            <p className="text-3xl font-bold text-white tracking-wide inline-flex">
              {word.translation}
            </p>
          </div>
          {showEnglish && word.english && (
            <p className="text-[#DAA520]/80 text-lg mt-2 italic break-words">
              {word.english}
            </p>
          )}
          {audioError && (
            <p className="text-red-500 text-sm mt-2">{audioError}</p>
          )}
        </div>
        <div className="absolute inset-0 bg-[#DAA520]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      {word.english && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2">
          <button
            onClick={toggleEnglish}
            className="group relative bg-[#1A1A1A]/80 hover:bg-[#1A1A1A] p-2 rounded-full border border-[#DAA520]/20 hover:border-[#DAA520]/40 transition-all"
          >
            <Info className="h-4 w-4 text-[#DAA520]/60 group-hover:text-[#DAA520]" />
          </button>
        </div>
      )}
    </div>
  );
}
