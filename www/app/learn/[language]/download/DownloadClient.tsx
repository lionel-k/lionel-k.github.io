"use client";

import { useState, useEffect } from "react";
import { Download, Smartphone, Globe, Zap } from "lucide-react";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type Language = {
  name: string;
  slug: string;
  comingSoon: boolean;
};

type Props = {
  language: Language;
};

export default function DownloadClient({ language }: Props) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback for browsers that don't support install prompt
      alert(
        'To get this app, look for "Add to Home Screen" in your browser menu.'
      );
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const features = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Easy to Use",
      description: `Simple and fun way to learn ${language.name}`,
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Super Fast",
      description: "Open lessons and games in seconds",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Like a Real App",
      description: "Works just like an app on your phone",
    },
  ];

  const breadcrumbItems = [
    { name: "Learn", href: "/learn" },
    { name: language.name, href: `/learn/${language.slug}` },
    { name: "Download", href: `/learn/${language.slug}/download` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <BreadcrumbNav items={breadcrumbItems} />
      <div className="container max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#DAA520] rounded-full mb-6">
            <Download className="h-10 w-10 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Download{" "}
            <span className="text-[#DAA520]">Learn {language.name}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get our app for the best way to learn {language.name}. Study
            anytime, anywhere on your phone!
          </p>
        </div>

        {/* Main CTA */}
        <div className="text-center mb-16">
          {isInstalled ? (
            <div className="bg-green-900/50 border border-green-500 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                App Ready to Use!
              </h2>
              <p className="text-green-300">
                You can now open Learn {language.name} from your home screen.
              </p>
            </div>
          ) : (
            <button
              onClick={handleInstallClick}
              className="bg-[#DAA520] hover:bg-[#B8941F] text-black font-bold text-lg px-8 py-4 rounded-lg transition-colors duration-200 inline-flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
              data-umami-event={`${language.slug}-download-btn`}
            >
              <Download className="h-6 w-6" />
              Install
            </button>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#DAA520]/20 rounded-full mb-4">
                <div className="text-[#DAA520]">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Installation Instructions */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            How to Get the App
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* iPhone Instructions */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#DAA520]">
                On iPhone
              </h3>

              {/* Safari Instructions */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-2 text-gray-200">
                  Using Safari:
                </h4>
                <ol className="space-y-2 text-gray-300 text-sm">
                  <li>1. Tap the Share button at the bottom</li>
                  <li>2. Scroll down and tap "Add to Home Screen"</li>
                  <li>3. Tap "Add" in the top right corner</li>
                </ol>
                {/* Safari installation image */}
                <div className="mt-3">
                  <img
                    src="/images/install/iphone-safari-install.jpeg"
                    alt="How to install app on iPhone using Safari"
                    className="w-full rounded-lg border border-gray-600"
                  />
                </div>
              </div>

              {/* Chrome Instructions */}
              <div>
                <h4 className="text-md font-medium mb-2 text-gray-200">
                  Using Chrome:
                </h4>
                <ol className="space-y-2 text-gray-300 text-sm">
                  <li>1. Tap the share icon in the top-right corner.</li>
                  <li>2. Tap "Add to Home Screen".</li>
                  <li>3. Tap "Add" to confirm.</li>
                </ol>
                {/* Chrome installation image */}
                <div className="mt-3">
                  <img
                    src="/images/install/iphone-chrome-install.jpeg"
                    alt="How to install app on iPhone using Chrome"
                    className="w-full rounded-lg border border-gray-600"
                  />
                </div>
              </div>
            </div>
            {/* Android Instructions */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#DAA520]">
                On Android Phone
              </h3>
              <ol className="space-y-2 text-gray-300">
                <li>1. Tap the "Install {language.name} App" button above</li>
                <li>2. Or tap your browser menu (the three dots)</li>
                <li>3. Choose "Add to Home Screen"</li>
                <li>4. Tap "Install" to finish</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
