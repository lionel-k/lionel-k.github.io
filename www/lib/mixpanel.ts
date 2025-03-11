import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

export const initMixpanel = () => {
  console.log("Mixpanel initialization started");
  console.log("Token available:", !!MIXPANEL_TOKEN);

  if (!MIXPANEL_TOKEN) {
    console.warn("Mixpanel token is missing! Check your .env file.");
    return;
  }

  try {
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: true, // Enable debug mode to see what's happening
      track_pageview: true,
      persistence: "localStorage",
    });
    console.log("Mixpanel initialized successfully");

    // Test track an event
    mixpanel.track("Test Event", {
      test: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error initializing Mixpanel:", error);
  }
};

// Utility wrapper for all Mixpanel functions
export const MixpanelTracker = {
  identify: (id: string) => {
    try {
      console.log("Attempting to identify user:", id);
      mixpanel.identify(id);
      console.log("Successfully identified user");
    } catch (error) {
      console.error("Error in Mixpanel identify:", error);
    }
  },

  track: (eventName: string, properties?: Record<string, any>) => {
    try {
      const eventData = {
        ...properties,
        timestamp: new Date().toISOString(),
      };
      console.log(`Attempting to track event "${eventName}"`, eventData);
      mixpanel.track(eventName, eventData);
      console.log("Successfully tracked event");
    } catch (error) {
      console.error(`Error tracking event "${eventName}":`, error);
    }
  },

  trackPageView: (pageName: string, language?: string) => {
    try {
      const pageViewData = {
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
      };
      console.log("Attempting to track page view:", pageViewData);
      mixpanel.track("Page View", pageViewData);
      console.log("Successfully tracked page view");
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
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
