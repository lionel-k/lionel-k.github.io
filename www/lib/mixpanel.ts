import mixpanel from "mixpanel-browser";

// Initialize mixpanel
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || "";

// Only initialize if we have a token
if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV !== "production",
    track_pageview: false, // We'll handle this manually
    persistence: "localStorage",
    api_host: "/mp", // Use proxy to avoid ad blockers
  });
}

// Utility wrapper for all Mixpanel functions
export const MixpanelTracker = {
  identify: (id: string) => {
    if (MIXPANEL_TOKEN) mixpanel.identify(id);
  },

  track: (eventName: string, properties?: Record<string, any>) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track(eventName, {
        ...properties,
        timestamp: new Date().toISOString(),
      });
    }
  },

  trackPageView: (pageName: string, language?: string) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track("Page View", {
        page_name: pageName,
        url_path: window.location.pathname,
        referrer: document.referrer,
        language,
        device_info: {
          screen_width: window.screen.width,
          screen_height: window.screen.height,
          user_agent: navigator.userAgent,
          platform: navigator.platform,
        },
        user_language: navigator.language,
      });
    }
  },

  trackBookClick: (bookData: {
    title: string;
    language: string;
    price?: string;
    location: string;
  }) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track("Book Link Click", {
        book_title: bookData.title,
        book_language: bookData.language,
        book_price: bookData.price,
        button_location: bookData.location,
        platform: "Amazon",
      });
    }
  },

  trackBlogView: (postData: {
    title: string;
    slug: string;
    language: string;
    category?: string;
    readTime?: string;
  }) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track("Blog Post View", {
        post_title: postData.title,
        post_slug: postData.slug,
        language: postData.language,
        category: postData.category,
        read_time: postData.readTime,
      });
    }
  },
};
