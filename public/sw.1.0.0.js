const CACHE_NAME = "web-cache-v1.0.0";
const OFFLINE_URL = "/static/html/offline.html";

const URLS_TO_CACHE = [OFFLINE_URL];
const WHITELIST_HOST_CACHE = [
  "res.cloudinary.com",
  "localhost:20211",
  "kompetisi.id",
];

// installation step
self.addEventListener("install", (event) => {
  // event.waitUntil takes a promise to know how
  // long the installation takes, and whether it
  // succeeded or not.
  event.waitUntil(async () => {
    const cache = caches.open(CACHE_NAME);
    await cache.addAll(URLS_TO_CACHE);
  });
});

// activate step
self.addEventListener("activate", async (event) => {
  // -- push notif simulation --
  // This will be called only once when the service worker is activated.
  // try {
  //   const options = {};
  //   const subscription = await self.registration.pushManager.subscribe(options);
  //   console.log(JSON.stringify(subscription));
  // } catch (err) {
  //   console.log("Error", err);
  // }
});

// activate step
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Enable navigation preload if it's supported.
      // See https://developers.google.com/web/updates/2017/02/navigation-preload
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

// caching request during runtime
self.addEventListener("fetch", async (event) => {
  //about request.destination: https://developer.mozilla.org/en-US/docs/Web/API/Request/destination
  //-- Simulate cache page --
  // if (event.request.destination === "document") {
  //   cacheChecker(event);
  // }
  //Is this a request for an image?, only cache if fetch on localhost / maugowes.com

  const RequestHost = event.request.url.split("/")[2];
  if (
    event.request.method === "GET" &&
    event.request.destination === "image" &&
    WHITELIST_HOST_CACHE.includes(RequestHost)
  ) {
    cacheChecker(event);
  }
  // -- Simulate offline first --
  // We only want to call event.respondWith() if this is a navigation request
  // for an HTML page.
  // ref: request.mode https://developer.mozilla.org/en-US/docs/Web/API/Request/mode
  // ref: https://googlechrome.github.io/samples/service-worker/custom-offline-page/
  if (
    event.request.mode === "navigate" ||
    (event.request.method === "GET" &&
      event.request.headers.get("accept").includes("text/html"))
  ) {
    event.respondWith(
      fetch(event.request.url).catch((error) => {
        console.log(error);
        // Return the offline page
        return caches.match(OFFLINE_URL);
      })
    );
  }
  return;
});

// -- simulation push notif --
self.addEventListener("push", function (event) {
  if (event.data) {
    self.registration.showNotification(event.data.text());
    console.log("This push event has data: ", event.data.text());
  } else {
    console.log("This push event has no data.");
  }
});

//mama

const cacheChecker = (event) => {
  // Open the cache
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      // Respond with the image from the cache or from the network
      return cache.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request.url).then((fetchedResponse) => {
            // Add the network response to the cache for future visits.
            // Note: we need to make a copy of the response to save it in
            // the cache and use the original as the request response.
            cache.put(event.request, fetchedResponse.clone());

            // Return the network response
            return fetchedResponse;
          })
        );
      });
    })
  );
};

// --- simulate push notif ---
