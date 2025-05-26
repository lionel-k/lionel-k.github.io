import NavigationControl from "./NavigationControl";
import CTAButton from "./CTAButton";

interface PageHeaderProps {
  title: string;
  description: string;
  email: string | null;
  isPaidUser: boolean;
  ctaHref?: string;
}

export default function PageHeader({
  title,
  description,
  email,
  isPaidUser,
  ctaHref,
}: PageHeaderProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-16 text-white">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display">
            {title}
          </h1>
          <p className="mt-4 text-xl leading-8 text-gray-300">{description}</p>
          {email ? (
            <div className="mt-8 mb-6 flex items-center justify-center gap-4">
              {ctaHref && <CTAButton href={ctaHref} className="mt-0 mb-0" />}
              <NavigationControl email={email} />
            </div>
          ) : (
            <div className="mt-8 mb-6 flex flex-col items-center gap-6">
              {ctaHref && <CTAButton href={ctaHref} className="mt-0 mb-0" />}
              <NavigationControl email={email} />
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-0 opacity-20 bg-repeat" />
    </section>
  );
}
