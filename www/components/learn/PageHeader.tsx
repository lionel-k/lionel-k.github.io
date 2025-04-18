type PageHeaderProps = {
  title: string;
  description: string;
  email?: string | null;
  isPaidUser?: boolean;
};

import NavigationControl from "./NavigationControl";

export default function PageHeader({
  title,
  description,
  email,
  isPaidUser,
}: PageHeaderProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-8 text-white border-b border-[#DAA520]/10">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90 font-display">
                {title}
              </h1>
              <p className="mt-1 text-base text-gray-400">{description}</p>
            </div>
            {email !== undefined && isPaidUser !== undefined && (
              <div className="shrink-0">
                <NavigationControl
                  email={email}
                  isPaidUser={isPaidUser}
                  variant="practice"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 opacity-10 bg-repeat" />
    </section>
  );
}
