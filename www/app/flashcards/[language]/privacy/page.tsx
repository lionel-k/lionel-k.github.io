import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FLASHCARD_LANGUAGES, SITE_URL } from "@/lib/constants";

export async function generateStaticParams() {
  return FLASHCARD_LANGUAGES.map((lang) => ({
    language: lang.slug,
  }));
}

type Props = {
  params: Promise<{
    language: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { language } = await params;
  const lang = FLASHCARD_LANGUAGES.find((l) => l.slug === language);

  if (!lang) {
    return { title: "Not Found" };
  }

  const title = `Privacy Policy - ${lang.appName} | Lingu.Africa`;
  const description = `Privacy policy for ${lang.appName} mobile application. Learn how we handle your data.`;
  const pageUrl = `${SITE_URL}/flashcards/${lang.slug}/privacy`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function FlashcardsPrivacyPage({ params }: Props) {
  const { language } = await params;
  const lang = FLASHCARD_LANGUAGES.find((l) => l.slug === language);

  if (!lang) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-20 text-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-gray-300">{lang.appName}</p>
            <p className="mt-2 text-sm text-gray-400">
              Effective Date: January 30, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gradient-to-b from-[#FAF8F5] to-[#F5F2EC] text-gray-900">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="lead">
              Lionel Kubwimana ("we," "us," or "our") operates the {lang.appName}{" "}
              mobile application (the "Application"). This Privacy Policy
              explains how we handle your information when you use our
              Application.
            </p>

            <h2>1. Information Collection and Use</h2>
            <p>
              The Application is designed to be a minimal and privacy-focused
              tool for learning {lang.name}.
            </p>

            <h3>Information You Provide</h3>
            <ul>
              <li>
                <strong>Favorites and Progress:</strong> The Application allows
                you to save "favorite" cards and tracks your progress (the last
                card you viewed). This data is stored{" "}
                <strong>locally on your device</strong> using shared_preferences.
                We do not upload this data to our servers.
              </li>
              <li>
                <strong>In-App Purchases:</strong> If you choose to purchase the
                "Premium Unlock" to access more categories, the transaction is
                processed by the Google Play Store. We do not collect or store
                your credit card details or personal billing information. We only
                receive a confirmation from Google that the purchase was
                successful to unlock the content.
              </li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <ul>
              <li>
                <strong>Device Information:</strong> We do not explicitly collect
                device identifiers, IP addresses, or hardware information.
                However, the Google Play Store may collect standard telemetry and
                crash reports as part of its platform services.
              </li>
              <li>
                <strong>Location Data:</strong> The Application{" "}
                <strong>does not</strong> collect, use, or share your precise or
                approximate location data.
              </li>
            </ul>

            <h2>2. Third-Party Services</h2>
            <p>
              We use the following third-party services to provide the
              Application's functionality:
            </p>
            <ul>
              <li>
                <strong>Google Play In-App Payments:</strong> To process premium
                upgrades.{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#DAA520] hover:underline"
                >
                  Google Play Services Privacy Policy
                </a>
              </li>
            </ul>
            <p>
              We do not use any third-party analytics (like Firebase Analytics)
              or advertising SDKs.
            </p>

            <h2>3. Data Retention</h2>
            <p>
              Since your favorites and progress are stored locally on your
              device, we do not retain any of your personal data on our servers.
              If you uninstall the Application, the locally stored data will be
              deleted by your operating system.
            </p>

            <h2>4. Children's Privacy</h2>
            <p>
              The Application is intended for users of all ages interested in
              learning {lang.name}. We do not knowingly collect any personally
              identifiable information from children under 13. If you are a
              parent or guardian and believe your child has provided us with
              personal information, please contact us.
            </p>

            <h2>5. Security</h2>
            <p>
              We value your trust. Since we do not collect personal data on our
              servers, the primary security of your data (favorites/progress)
              depends on the security of your mobile device.
            </p>

            <h2>6. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Effective Date."
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy,
              do not hesitate to contact us at:
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:hello@lingu.africa"
                className="text-[#DAA520] hover:underline"
              >
                hello@lingu.africa
              </a>
            </p>

            <div className="mt-12 pt-8 border-t border-gray-300">
              <Link
                href={`/flashcards/${lang.slug}`}
                className="text-[#DAA520] hover:underline font-medium"
              >
                ← Back to {lang.appName}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
