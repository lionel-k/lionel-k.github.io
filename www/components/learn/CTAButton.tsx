interface CTAButtonProps {
  href: string;
  className?: string;
}

export default function CTAButton({ href, className = "" }: CTAButtonProps) {
  return (
    <div className="flex flex-col items-center">
      <a
        href={href}
        className={`inline-block mt-8 mb-4 px-8 py-4 text-xl font-bold text-black bg-[#DAA520] hover:bg-[#B8860B] rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${className}`}
      >
        Start Learning Now
      </a>
      <p className="text-xs text-gray-400 max-w-lg text-center">
        <span className="font-semibold text-[#DAA520]">Note:</span> Following{" "}
        <a
          href="https://publications.aap.org/pediatrics/article/138/5/e20162591/60503/Media-and-Young-Minds"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#DAA520] hover:text-[#B8860B] underline"
        >
          AAP guidelines
        </a>
        , avoid screens for children under 18-24 months (except video chat). For
        ages 2-5, limit to 1 hour per day.
      </p>
    </div>
  );
}
