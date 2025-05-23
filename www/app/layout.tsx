import "./globals.css";
import { Providers } from "./providers";
import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";

// Define the local font class name
const interClassName = "font-inter";

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
  alternates: {
    languages: {
      "en-US": "https://www.lingu.africa/",
      "x-default": "https://www.lingu.africa/",
    },
  },
  other: {
    "geo.region": "US",
    "geo.placename": "United States",
    "geo.position": "37.09024;-95.712891",
  },
  openGraph: {
    locale: "en_US",
    countryName: "United States",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className="h-full" suppressHydrationWarning>
      <head>
        {/* Preload critical fonts for LCP improvement */}
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Add font-display: swap in style to ensure text is visible during font loading */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/fonts/inter.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url('/fonts/inter-bold.woff2') format('woff2');
          }
          .font-display {
            font-display: swap;
          }
          #hero-heading {
            content-visibility: auto;
          }
        `,
          }}
        />
        {/* Preconnect to domains we need to access */}
        <link rel="preconnect" href="https://analytics.lingu.africa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Geo-targeting meta tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="geo.position" content="37.09024;-95.712891" />
        <meta name="ICBM" content="37.09024, -95.712891" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:country-name" content="United States" />
        <Script id="hotjar" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:6376512,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      </head>
      <body
        className={`${interClassName} flex min-h-full flex-col`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </div>
        </Providers>

        {/* Analytics */}
        <Script
          defer
          id="analytics"
          src="https://analytics.lingu.africa/script.js"
          data-website-id="36dfd617-5a98-443b-90d0-9438ca6c5be0"
          data-host-url="https://analytics.lingu.africa"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
