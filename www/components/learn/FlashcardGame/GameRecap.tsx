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

  // Create array of 3 rows with 5 stars each
  const starRows = Array.from({ length: 3 }, (_, rowIndex) => {
    return Array.from({ length: 5 }, (_, colIndex) => {
      const starIndex = rowIndex * 5 + colIndex;
      return starIndex < totalQuestions ? starIndex < correctAnswers : false;
    });
  });

  return (
    <div className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] p-4 sm:p-6 rounded-xl border border-[#DAA520]/20 shadow-lg">
      {/* Progress Stars */}
      <div className="flex flex-col items-center gap-1 mb-3 sm:mb-4">
        {starRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 sm:gap-2">
            {row.map((isActive, colIndex) => (
              <div
                key={colIndex}
                className={`transform transition-all duration-500 ${
                  isActive
                    ? "text-[#DAA520] animate-[bounce_1s_ease-in-out_infinite]"
                    : "text-gray-600"
                }`}
                style={{
                  animationDelay: `${(rowIndex * 5 + colIndex) * 0.1}s`,
                  fontSize: "clamp(1.25rem, 4vw, 2rem)",
                }}
              >
                ★
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Message */}
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
          {text} {emoji}
        </h3>
        <p className="text-sm sm:text-base text-gray-400">
          You got {correctAnswers} out of {totalQuestions} correct!
        </p>
      </div>
    </div>
  );
}
