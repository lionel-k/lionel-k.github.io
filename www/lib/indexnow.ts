import { CANONICAL_URL } from "./metadata";

const INDEXNOW_KEY = "qpk5z8xwjkfzteupur93gf912pdwejjz";
const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
];

type IndexNowPayload = {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
};

export async function notifyIndexNow(urls: string[]) {
  // Ensure all URLs are absolute
  const absoluteUrls = urls.map((url) => {
    if (url.startsWith("http")) return url;
    return `${CANONICAL_URL}${url.startsWith("/") ? url : `/${url}`}`;
  });

  const payload: IndexNowPayload = {
    host: new URL(CANONICAL_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: `${CANONICAL_URL}/${INDEXNOW_KEY}.txt`,
    urlList: absoluteUrls,
  };

  // Submit to all IndexNow endpoints
  const submissions = INDEXNOW_ENDPOINTS.map(async (endpoint) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(
          `IndexNow submission failed for ${endpoint}:`,
          await response.text()
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error(`IndexNow submission error for ${endpoint}:`, error);
      return false;
    }
  });

  // Wait for all submissions to complete
  const results = await Promise.all(submissions);
  return results.some(Boolean); // Return true if at least one submission succeeded
}
