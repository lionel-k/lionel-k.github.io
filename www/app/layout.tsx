import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Use 'swap' to ensure text remains visible during font loading
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        {/* Preload critical fonts for LCP improvement */}
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.axeptioSettings = {
                clientId: "6766f45a3c202b4ab475401f",
                cookiesVersion: "lingu-en-EU",
                googleConsentMode: {
                  default: {
                    analytics_storage: "denied",
                    ad_storage: "denied",
                    ad_user_data: "denied",
                    ad_personalization: "denied",
                    wait_for_update: 500
                  }
                }
              };

              (function(d, s) {
                var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
                e.async = true; e.src = "//static.axept.io/sdk.js";
                t.parentNode.insertBefore(e, t);
              })(document, "script");
            `,
          }}
        />
        <script
          defer
          src="https://analytics.lingu.africa/script.js"
          data-website-id="36dfd617-5a98-443b-90d0-9438ca6c5be0"
          data-host-url="https://analytics.lingu.africa"
        ></script>
      </head>
      <body
        className={`${inter.className} flex min-h-full flex-col`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
