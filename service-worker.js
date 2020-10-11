//menyimpan asset ke cache
const CACHE_NAME = "firstpwa-v5";
var urlsToCache = [
  "/",
  "/manifest.json",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "/index.html",
  "/detail.html",
  "/pages/contact.html",
  "/pages/home.html",
  "/pages/saved.html",
  "/pages/info.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/api.js",
  "/js/app.js",
  "/js/db.js",
  "/js/idb.js",
  "/js/nav.js",
  "/images/mu.jpg",
  "/mu192x192.png",
  "/mu512x512.png",
];

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
      caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, {
        ignoreSearch: true
      }).then(function (response) {
        return response || fetch(event.request);
      })
    )
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

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    'body': "Ini adalah Notifikasi",
    'requireInteraction': true,
    'icon': '/images/mu.jpg',
    'badge': '/images/mu.jpg',

  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});