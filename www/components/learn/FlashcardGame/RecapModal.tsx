import { RotateCcw, ArrowRight } from "lucide-react";
import GameRecap from "./GameRecap";
import { Section } from "@/lib/learn/sections";

type RecapModalProps = {
  correctAnswers: number;
  totalQuestions: number;
  nextSection: Section | undefined;
  onRestart: () => void;
  onNextSection: () => void;
  remainingFreeSections: number;
  isPaidUser: boolean;
  language: string;
};

function PremiumFeatureText({
  language,
  remainingFreeSections,
}: {
  language: string;
  remainingFreeSections: number;
}) {
  return (
    <div className="flex flex-col items-center space-y-1 text-[13px] text-gray-400/60">
      <p>
        You have {remainingFreeSections} free section
        {remainingFreeSections !== 1 ? "s" : ""} left to practice.
      </p>
      {remainingFreeSections > 0 && (
        <a
          href={`/learn/${language}/pricing`}
          className="text-[#DAA520]/80 hover:text-[#DAA520] hover:underline transition-colors"
        >
          Click here to unlock more premium features
        </a>
      )}
    </div>
  );
}

function NextSectionButton({
  nextSection,
  onNextSection,
}: {
  nextSection: Section;
  onNextSection: () => void;
}) {
  return (
    <button
      onClick={onNextSection}
      className="w-full py-3 text-center font-semibold text-black bg-[#DAA520] hover:bg-[#B8860B] rounded-lg transition-colors flex items-center justify-center"
    >
      <span>Next Section: {nextSection.title}</span>
      <ArrowRight className="w-5 h-5 ml-2" />
    </button>
  );
}

function UnlockPremiumButton({ language }: { language: string }) {
  return (
    <a
      href={`/learn/${language}/pricing`}
      className="block w-full py-3 text-center font-semibold text-black bg-[#DAA520] hover:bg-[#B8860B] rounded-lg transition-colors"
    >
      Unlock Premium Features
    </a>
  );
}

function RestartButton({ onRestart }: { onRestart: () => void }) {
  return (
    <button
      onClick={onRestart}
      className="w-full py-3 text-center font-semibold text-[#DAA520] bg-transparent border border-[#DAA520] hover:bg-[#DAA520]/10 rounded-lg transition-colors flex items-center justify-center"
    >
      <RotateCcw className="w-5 h-5 mr-2" />
      <span>Practice Again</span>
    </button>
  );
}

export default function RecapModal({
  correctAnswers,
  totalQuestions,
  nextSection,
  onRestart,
  onNextSection,
  remainingFreeSections,
  isPaidUser,
  language,
}: RecapModalProps) {
  const showNextSection = isPaidUser || remainingFreeSections > 0;
  const showPremiumText = !isPaidUser;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-[min(95vw,800px)] bg-[#1A1A1A] rounded-xl p-6 sm:p-8 space-y-6">
        <GameRecap
          correctAnswers={correctAnswers}
          totalQuestions={totalQuestions}
        />
        <div className="space-y-3 max-w-md mx-auto">
          <RestartButton onRestart={onRestart} />
          {nextSection && (
            <div className="space-y-2">
              {showNextSection ? (
                <NextSectionButton
                  nextSection={nextSection}
                  onNextSection={onNextSection}
                />
              ) : (
                <UnlockPremiumButton language={language} />
              )}
              {showPremiumText && (
                <PremiumFeatureText
                  language={language}
                  remainingFreeSections={remainingFreeSections}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
