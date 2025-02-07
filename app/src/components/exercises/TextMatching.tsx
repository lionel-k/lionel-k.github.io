import { useState } from "react";
import { TextMatchingProps } from "./types";
import { EXERCISE_TITLES } from "../../config/exercises";

export const TextMatching = ({
  pairs,
  isCompleted,
  onAnswer,
}: TextMatchingProps) => {
  const [selectedPairs, setSelectedPairs] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());

  const handlePairClick = (value: string) => {
    if (isCompleted || matchedPairs.has(value)) return;

    setSelectedPairs((prev) => {
      const newSelected = [...prev, value];

      if (newSelected.length === 2) {
        const [first, second] = newSelected;
        const isMatch = pairs.some(
          (pair) =>
            (pair.text1 === first && pair.text2 === second) ||
            (pair.text1 === second && pair.text2 === first)
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
      <h3 className="text-xl font-semibold text-gray-900">
        {EXERCISE_TITLES["text-matching"]}
      </h3>

      <div
        className={`grid grid-cols-2 gap-4 ${
          isCompleted ? "pointer-events-none opacity-75" : ""
        }`}
      >
        <div className="space-y-3">
          {pairs.map((pair, index) => (
            <button
              key={`text1-${index}`}
              onClick={() => handlePairClick(pair.text1)}
              className={`w-full p-4 rounded-lg border-2 transition-colors ${
                matchedPairs.has(pair.text1)
                  ? "bg-green-50 border-green-500"
                  : selectedPairs.includes(pair.text1)
                  ? "border-[#DAA520] bg-[#DAA520]/10"
                  : "border-gray-200 hover:border-[#DAA520]"
              }`}
            >
              {pair.text1}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {pairs.map((pair, index) => (
            <button
              key={`text2-${index}`}
              onClick={() => handlePairClick(pair.text2)}
              className={`w-full p-4 rounded-lg border-2 transition-colors ${
                matchedPairs.has(pair.text2)
                  ? "bg-green-50 border-green-500"
                  : selectedPairs.includes(pair.text2)
                  ? "border-[#DAA520] bg-[#DAA520]/10"
                  : "border-gray-200 hover:border-[#DAA520]"
              }`}
            >
              {pair.text2}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
