import { useState, useEffect, useRef } from "react";
import { Volume2, Languages } from "lucide-react";
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
    setShowEnglish(false);
  }, [word.id]);

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
    <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-4">
      {/* Main Word Card */}
      <div className="flex-1">
        <button
          onClick={playAudio}
          className="w-full bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] backdrop-blur-sm rounded-xl py-3 px-4 sm:py-4 sm:px-6 text-center border border-[#DAA520]/20 hover:border-[#DAA520]/40 hover:shadow-[0_0_30px_rgba(218,165,32,0.1)] transition-all duration-300 relative overflow-hidden group"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 sm:gap-3 justify-center">
              <Volume2 className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-[#DAA520] group-hover:scale-110 transition-transform" />
              <p
                className="text-2xl sm:text-3xl font-bold text-white tracking-wide"
                translate="no"
              >
                {word.translation}
              </p>
            </div>
            {showEnglish && word.english && (
              <p className="text-[#DAA520]/80 text-sm sm:text-base mt-2 sm:mt-3 italic break-words">
                {word.english}
              </p>
            )}
            {audioError && (
              <p className="text-red-500 text-sm mt-2">{audioError}</p>
            )}
          </div>
          <div className="absolute inset-0 bg-[#DAA520]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Info Card */}
      {word.english && (
        <div className="flex items-center">
          <button
            onClick={toggleEnglish}
            className="group bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-[#DAA520]/20 hover:border-[#DAA520]/40 hover:shadow-[0_0_30px_rgba(218,165,32,0.1)] transition-all duration-300 relative overflow-hidden"
          >
            <Languages className="h-4 w-4 sm:h-5 sm:w-5 text-[#DAA520]/60 group-hover:text-[#DAA520] transition-colors" />
            <div className="absolute inset-0 bg-[#DAA520]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      )}
    </div>
  );
}
