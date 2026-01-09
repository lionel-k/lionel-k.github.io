const CACHE_NAME = "lingu-africa-v5";
const urlsToCache = ["/manifest.json", "/logo.png", "/favicon.png"];

// Force update on install
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Clean up old caches on activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  // Don't cache Next.js internal requests
  if (event.request.url.includes("/_next/") ||
      event.request.url.includes("/api/") ||
      event.request.url.includes("webpack")) {
    return;
  }

  // Don't cache HTML pages - always fetch fresh to see navbar updates
  if (event.request.method === "GET" &&
      event.request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(event.request).then((response) => {
        // Return fresh response without caching
        return response;
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});
