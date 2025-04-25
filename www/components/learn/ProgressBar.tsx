interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-1 bg-[#1A1A1A] rounded-full mb-6 overflow-hidden">
      <div
        className="h-full bg-[#DAA520] transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
