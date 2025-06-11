const CACHE_NAME = "notelink-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/styles.css", // if you split styles
  "/sw.js",
  "/chainsawmanimage.JPEG",
  "/windbreakerimage.jpg",
  // Add all required image and page paths here
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      );
    })
  );
});
