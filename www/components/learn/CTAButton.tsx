interface CTAButtonProps {
  href: string;
  className?: string;
}

export default function CTAButton({ href, className = "" }: CTAButtonProps) {
  return (
    <a
      href={href}
      className={`inline-block mt-8 mb-6 px-8 py-4 text-xl font-bold text-black bg-[#DAA520] hover:bg-[#B8860B] rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${className}`}
    >
      Start Learning Now
    </a>
  );
}
