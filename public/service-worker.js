importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);
//menyimpan asset ke cache
workbox.precaching.precacheAndRoute([
  { url: '/', revision: '2' },
  { url: '/manifest.json', revision: '2' },
  { url: '/index.html', revision: '2' },
  { url: '/detail.html', revision: '2' },
  { url: '/nav.html', revision: '2' },
  { url: '/pages/klasemen.html', revision: '2' },
  { url: '/pages/home.html', revision: '2' },
  { url: '/pages/saved.html', revision: '2' },
  { url: '/pages/info.html', revision: '2' },
  { url: '/css/materialize.min.css', revision: '2' },
  { url: '/js/materialize.min.js', revision: '2' },
  { url: '/js/api.js', revision: '2' },
  { url: '/js/app.js', revision: '2' },
  { url: '/js/db.js', revision: '2' },
  { url: '/js/idb.js', revision: '2' },
  { url: '/js/nav.js', revision: '2' },
  { url: '/js/idb.js', revision: '2' },
]);
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  }),
);
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);
workbox.routing.registerRoute(
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);
workbox.routing.registerRoute(
  new RegExp('/detail/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'detail'
    })
);
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
// Menggunakan Aset dari Cache
self.addEventListener("fetch", function (event) {
  let BASE_URL = "https://api.football-data.org/";
  if (event.request.url.indexOf(BASE_URL) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches
        .match(event.request, {
          ignoreSearch: true,
        })
        .then(function (response) {
          return response || fetch(event.request);
        })
    );
  }
});

//penghapusan cache
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: "Ini adalah Notifikasi",
    requireInteraction: true,
    icon: "/images/mu.jpg",
    badge: "/images/mu.jpg",
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
