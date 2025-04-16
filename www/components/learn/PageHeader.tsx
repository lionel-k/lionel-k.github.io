type PageHeaderProps = {
  title: string;
  description: string;
  email?: string | null;
  isPaidUser?: boolean;
};

import AuthStatus from "./AuthStatus";

export default function PageHeader({
  title,
  description,
  email,
  isPaidUser,
}: PageHeaderProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-16 text-white">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display">
            {title}
          </h1>
          <p className="mt-4 text-xl leading-8 text-gray-300">{description}</p>
          {email !== undefined && isPaidUser !== undefined && (
            <AuthStatus
              email={email}
              isPaidUser={isPaidUser}
              variant="practice"
            />
          )}
        </div>
      </div>
      <div className="absolute inset-0 opacity-20 bg-repeat" />
    </section>
  );
}
