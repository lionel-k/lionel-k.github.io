import LanguagesGrid from "@/components/learn/LanguagesGrid";
import CTAButton from "@/components/learn/CTAButton";

export default function TeachClient() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-16 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display">
              Teach vocabulary live, slide by slide
            </h1>
            <p className="mt-4 text-xl leading-8 text-gray-300">
              Open the presenter, share your screen on Meet or Zoom, and guide
              your class through each section with pictures and translations.
            </p>
            <CTAButton
              href="/teach/kirundi/basics"
              label="Open classroom presenter"
              showScreenTimeNote={false}
            />
          </div>
        </div>
        <div className="absolute inset-0 opacity-20 bg-repeat" />
      </section>

      <section className="relative py-16 bg-gradient-to-b from-[#0A0A0A] to-[#0A0A0A]">
        <div className="absolute inset-0 opacity-5 bg-repeat" />
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <LanguagesGrid variant="teach" />
        </div>
      </section>
    </div>
  );
}
