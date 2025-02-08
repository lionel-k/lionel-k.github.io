import { useState } from "react";
import { Volume2 } from "lucide-react";
import { AudioTextMatchingProps } from "./types";
import { EXERCISE_TITLES } from "../../config/exercises";

export const AudioTextMatching = ({
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
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">
          {EXERCISE_TITLES["audio-text-matching"]}
        </h3>
      </div>

      <div
        className={`grid grid-cols-2 gap-4 ${
          isCompleted ? "pointer-events-none opacity-75" : ""
        }`}
      >
        <div className="space-y-3">
          {pairs.map((pair, index) => (
            <button
              key={`audio-${index}`}
              onClick={() => handlePairClick(pair.audio)}
              className={`w-full p-4 rounded-lg border-2 transition-colors flex items-center justify-center ${
                matchedPairs.has(pair.audio)
                  ? "border-green-500 bg-green-50"
                  : selectedPairs.includes(pair.audio)
                  ? "border-[#DAA520] bg-[#DAA520]/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="p-2 rounded-lg bg-blue-500">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
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
                  ? "border-green-500 bg-green-50"
                  : selectedPairs.includes(pair.text)
                  ? "border-[#DAA520] bg-[#DAA520]/5"
                  : "border-gray-200 hover:border-gray-300"
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
