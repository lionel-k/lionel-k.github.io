import Link from "next/link";

export default function Terms() {
  return (
    <div className="flex flex-col">
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] py-28 text-white overflow-hidden">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
              Terms and Conditions
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-300 max-w-2xl mx-auto">
              Please read these terms and conditions carefully before using our
              website.
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
            <h2 className="text-3xl font-bold mb-4">Introduction</h2>
            <p>
              Welcome to Lingu.Africa. These terms and conditions outline the
              rules and regulations for the use of our website.
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Intellectual Property Rights
            </h2>
            <p>
              Other than the content you own, under these Terms, Lingu.Africa
              and/or its licensors own all the intellectual property rights and
              materials contained in this Website.
            </p>
            <h2 className="text-3xl font-bold mb-4">Restrictions</h2>
            <p>
              You are specifically restricted from all of the following:
              publishing any Website material in any other media; selling,
              sublicensing and/or otherwise commercializing any Website
              material; publicly performing and/or showing any Website material;
              using this Website in any way that is or may be damaging to this
              Website; using this Website in any way that impacts user access to
              this Website; using this Website contrary to applicable laws and
              regulations, or in any way may cause harm to the Website, or to
              any person or business entity; engaging in any data mining, data
              harvesting, data extracting or any other similar activity in
              relation to this Website; using this Website to engage in any
              advertising or marketing.
            </p>
            <h2 className="text-3xl font-bold mb-4">Your Privacy</h2>
            <p>Please read our Privacy Policy.</p>
            <h2 className="text-3xl font-bold mb-4">Limitation of liability</h2>
            <p>
              In no event shall Lingu.Africa, nor any of its officers, directors
              and employees, be held liable for anything arising out of or in
              any way connected with your use of this Website whether such
              liability is under contract. Lingu.Africa, including its officers,
              directors and employees shall not be held liable for any indirect,
              consequential or special liability arising out of or in any way
              related to your use of this Website.
            </p>
            <h2 className="text-3xl font-bold mb-4">Indemnification</h2>
            <p>
              You hereby indemnify to the fullest extent Lingu.Africa from and
              against any and/or all liabilities, costs, demands, causes of
              action, damages and expenses arising in any way related to your
              breach of any of the provisions of these Terms.
            </p>
            <h2 className="text-3xl font-bold mb-4">Variation of Terms</h2>
            <p>
              Lingu.Africa is permitted to revise these Terms at any time as it
              sees fit, and by using this Website you are expected to review
              these Terms on a regular basis.
            </p>
            <h2 className="text-3xl font-bold mb-4">Assignment</h2>
            <p>
              The Lingu.Africa is allowed to assign, transfer, and subcontract
              its rights and/or obligations under these Terms without any
              notification. However, you are not allowed to assign, transfer, or
              subcontract any of your rights and/or obligations under these
              Terms.
            </p>
            <h2 className="text-3xl font-bold mb-4">Entire Agreement</h2>
            <p>
              These Terms constitute the entire agreement between Lingu.Africa
              and you in relation to your use of this Website, and supersede all
              prior agreements and understandings.
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms will be governed by and interpreted in accordance with
              the laws of the State of [Your State], and you submit to the
              non-exclusive jurisdiction of the state and federal courts located
              in [Your State] for the resolution of any disputes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
