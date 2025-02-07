import { useState } from "react";
import { Volume2 } from "lucide-react";
import { AudioTextMatchingProps } from "./types";

export const AudioTextMatching = ({
  question,
  pairs,
  isCompleted,
  onAnswer,
}: AudioTextMatchingProps) => {
  const [selectedPairs, setSelectedPairs] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);

  const playAudio = (audioUrl: string) => {
    if (isCompleted) return;
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    }
    const newAudio = new Audio(audioUrl);
    newAudio.play();
    setActiveAudio(newAudio);
  };

  const handlePairClick = (value: string) => {
    if (isCompleted || matchedPairs.has(value)) return;

    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      setActiveAudio(null);
    }

    const audioPair = pairs.find((pair) => pair.audio === value);
    if (audioPair) {
      playAudio(audioPair.audio);
    }

    setSelectedPairs((prev) => {
      const newSelected = [...prev, value];

      if (newSelected.length === 2) {
        const [first, second] = newSelected;
        const isMatch = pairs.some(
          (pair) =>
            (pair.audio === first && pair.text === second) ||
            (pair.audio === second && pair.text === first)
        );

        if (isMatch) {
          setMatchedPairs((prevMatched) => {
            const newMatched = new Set([...prevMatched, first, second]);
            if (newMatched.size === pairs.length * 2) {
              setTimeout(() => onAnswer("all-matched"), 0);
            }
            return newMatched;
          });
          return [];
        }

        setTimeout(() => setSelectedPairs([]), 1000);
        return newSelected;
      }

      return newSelected;
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">{question}</h3>

      <div
        className={`grid grid-cols-2 gap-4 ${
          isCompleted ? "pointer-events-none opacity-75" : ""
        }`}
      >
        <div className="space-y-3">
          {pairs.map((pair, index) => (
            <button
              key={`audio-${index}`}
              onClick={() => {
                playAudio(pair.audio);
                handlePairClick(pair.audio);
              }}
              className={`w-full p-4 rounded-lg border-2 transition-colors flex items-center justify-center gap-2 ${
                matchedPairs.has(pair.audio)
                  ? "bg-green-50 border-green-500"
                  : selectedPairs.includes(pair.audio)
                  ? "border-[#DAA520] bg-[#DAA520]/10"
                  : "border-gray-200 hover:border-[#DAA520]"
              }`}
            >
              <Volume2 className="w-6 h-6" />
              <div className="h-1 bg-[#DAA520] w-20 rounded-full" />
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {pairs.map((pair, index) => (
            <button
              key={`text-${index}`}
              onClick={() => handlePairClick(pair.text)}
              className={`w-full p-4 rounded-lg border-2 transition-colors ${
                matchedPairs.has(pair.text)
                  ? "bg-green-50 border-green-500"
                  : selectedPairs.includes(pair.text)
                  ? "border-[#DAA520] bg-[#DAA520]/10"
                  : "border-gray-200 hover:border-[#DAA520]"
              }`}
            >
              {pair.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
