import Link from "next/link";

export default function Privacy() {
  return (
    <div className="flex flex-col">
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-28 text-white overflow-hidden">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-300 max-w-2xl mx-auto">
              Your privacy is important to us. Please read our policy carefully.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Last Updated: October 5, 2023
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#FAF8F5] to-[#F5F2EC] text-gray-900">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto space-y-6 leading-relaxed text-gray-700">
            <h2 className="text-3xl font-bold mb-4">Information We Collect</h2>
            <p>
              We collect information from you when you visit our site, register,
              place an order, subscribe to our newsletter, or fill out a form.
            </p>
            <h2 className="text-3xl font-bold mb-4">
              How We Use Your Information
            </h2>
            <p>
              Any of the information we collect from you may be used in one of
              the following ways: to personalize your experience, to improve our
              website, to improve customer service, to process transactions, to
              administer a contest, promotion, survey or other site feature, to
              send periodic emails.
            </p>
            <h2 className="text-3xl font-bold mb-4">
              How We Protect Your Information
            </h2>
            <p>
              We implement a variety of security measures to maintain the safety
              of your personal information when you place an order or enter,
              submit, or access your personal information.
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Sharing Your Information
            </h2>
            <p>
              We do not sell, trade, or otherwise transfer to outside parties
              your personally identifiable information. This does not include
              trusted third parties who assist us in operating our website,
              conducting our business, or servicing you, so long as those
              parties agree to keep this information confidential.
            </p>
            <h2 className="text-3xl font-bold mb-4">Your Consent</h2>
            <p>By using our site, you consent to our privacy policy.</p>
            <h2 className="text-3xl font-bold mb-4">
              Changes to Our Privacy Policy
            </h2>
            <p>
              If we decide to change our privacy policy, we will post those
              changes on this page.
            </p>
            <h2 className="text-3xl font-bold mb-4">Contacting Us</h2>
            <p>
              If there are any questions regarding this privacy policy you may
              contact us using the information below: hello@lingu.africa
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
