type GameRecapProps = {
  correctAnswers: number;
  totalQuestions: number;
};

export default function GameRecap({
  correctAnswers,
  totalQuestions,
}: GameRecapProps) {
  // Calculate percentage for dynamic messaging
  const percentage = (correctAnswers / totalQuestions) * 100;

  // Get appropriate message and emoji based on performance
  const getMessage = () => {
    if (percentage === 100) return { text: "Perfect Score!", emoji: "👑" }; // Crown representing excellence and African royalty
    if (percentage >= 80) return { text: "Amazing Job!", emoji: "✨" }; // Sparkles for brilliance
    if (percentage >= 60) return { text: "Well Done!", emoji: "🙌🏾" }; // Celebrating hands with dark skin tone
    if (percentage >= 40) return { text: "Good Effort!", emoji: "💪🏾" }; // Strong arm with dark skin tone
    return { text: "Keep Practicing!", emoji: "✊🏾" }; // Raised fist with dark skin tone for perseverance
  };

  const { text, emoji } = getMessage();

  // Calculate optimal grid layout
  const calculateGrid = () => {
    // For very small numbers (1-8), use single row
    if (totalQuestions <= 8) {
      return { rows: 1, starsPerRow: totalQuestions };
    }

    // For medium numbers (9-16), use two rows
    if (totalQuestions <= 16) {
      const starsPerRow = Math.ceil(totalQuestions / 2);
      return { rows: 2, starsPerRow };
    }

    // For larger numbers, use more rows with balanced distribution
    const starsPerRow = Math.min(
      16,
      Math.max(12, Math.ceil(Math.sqrt(totalQuestions * 2)))
    );
    const rows = Math.ceil(totalQuestions / starsPerRow);
    return { rows, starsPerRow };
  };

  const { rows, starsPerRow } = calculateGrid();

  // Calculate star size based on number of stars per row and screen size
  const getStarSize = () => {
    if (starsPerRow <= 8) return "clamp(1.25rem, 3vw, 2rem)";
    if (starsPerRow <= 12) return "clamp(1rem, 2.5vw, 1.75rem)";
    if (starsPerRow <= 16) return "clamp(0.875rem, 2vw, 1.5rem)";
    return "clamp(0.75rem, 1.75vw, 1.25rem)";
  };

  // Create array of rows with appropriate number of stars
  const starRows = Array.from({ length: rows }, (_, rowIndex) => {
    return Array.from({ length: starsPerRow }, (_, colIndex) => {
      const starIndex = rowIndex * starsPerRow + colIndex;
      return starIndex < totalQuestions ? starIndex < correctAnswers : false;
    });
  });

  return (
    <div className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] p-3 sm:p-6 rounded-xl border border-[#DAA520]/20 shadow-lg">
      {/* Progress Stars */}
      <div className="flex flex-col items-center gap-1 sm:gap-2 mb-4 sm:mb-6">
        {starRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex gap-1 sm:gap-2 justify-center w-full"
          >
            {row.map((isActive, colIndex) => {
              const starIndex = rowIndex * starsPerRow + colIndex;
              // Only render star if it's within total questions count
              if (starIndex >= totalQuestions) return null;

              return (
                <div
                  key={colIndex}
                  className={`transform transition-all duration-500 ${
                    isActive
                      ? "text-[#DAA520] animate-[bounce_1s_ease-in-out_infinite]"
                      : "text-gray-600"
                  }`}
                  style={{
                    animationDelay: `${starIndex * 0.1}s`,
                    fontSize: getStarSize(),
                  }}
                >
                  ★
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Message */}
      <div className="text-center">
        <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
          {text} {emoji}
        </h3>
        <p className="text-sm sm:text-base text-gray-400">
          You got {correctAnswers} out of {totalQuestions} correct!
        </p>
      </div>
    </div>
  );
}
