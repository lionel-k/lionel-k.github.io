import "./globals.css";
import GoogleAnalyticsWrapper from "./GoogleAnalyticsWrapper";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { MixpanelProvider } from "@/components/MixpanelProvider";

import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        {/* Insert GA script tags directly in <head> here */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZPGXJS23ZM"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZPGXJS23ZM', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.axeptioSettings = {
                clientId: "6766f45a3c202b4ab475401f",
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
          src="https://cloud.umami.is/script.js"
          data-website-id="1fe4bb5a-e199-4101-a2cd-f643d7c4130b"
        />
      </head>
      <body
        className={`${inter.className} flex min-h-full flex-col`}
        suppressHydrationWarning
      >
        <GoogleAnalyticsWrapper>
          <Providers>
            <MixpanelProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Analytics />
            </MixpanelProvider>
          </Providers>
        </GoogleAnalyticsWrapper>
      </body>
    </html>
  );
}
