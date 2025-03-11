import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn("Mixpanel token is missing! Check your .env file.");
    return;
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV !== "production",
    track_pageview: true,
    persistence: "localStorage",
    api_host: "/mp", // Use proxy to avoid ad blockers
  });
};

// Utility wrapper for all Mixpanel functions
export const MixpanelTracker = {
  identify: (id: string) => {
    mixpanel.identify(id);
  },

  track: (eventName: string, properties?: Record<string, any>) => {
    mixpanel.track(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
    });
  },

  trackPageView: (pageName: string, language?: string) => {
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
  },

  trackBookClick: (bookData: {
    title: string;
    language: string;
    price?: string;
    location: string;
  }) => {
    mixpanel.track("Book Link Click", {
      book_title: bookData.title,
      book_language: bookData.language,
      book_price: bookData.price,
      button_location: bookData.location,
      platform: "Amazon",
    });
  },

  trackBlogView: (postData: {
    title: string;
    slug: string;
    language: string;
    category?: string;
    readTime?: string;
  }) => {
    mixpanel.track("Blog Post View", {
      post_title: postData.title,
      post_slug: postData.slug,
      language: postData.language,
      category: postData.category,
      read_time: postData.readTime,
    });
  },
};
