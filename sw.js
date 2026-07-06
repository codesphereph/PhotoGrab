// PhotoGrab - Service Worker
const CACHE_NAME = 'photograb-v1';
const ASSETS = [
  './', 'index.html', 'manifest.json', 'icon.png',
  'icons/apple-touch-icon.png',
  'icons/apple-touch-icon-57x57.png',
  'icons/apple-touch-icon-60x60.png',
  'icons/apple-touch-icon-72x72.png',
  'icons/apple-touch-icon-76x76.png',
  'icons/apple-touch-icon-114x114.png',
  'icons/apple-touch-icon-120x120.png',
  'icons/apple-touch-icon-144x144.png',
  'icons/apple-touch-icon-152x152.png',
  'icons/apple-touch-icon-167x167.png',
  'icons/apple-touch-icon-180x180.png',
  'icons/icon-16x16.png',
  'icons/icon-32x32.png',
  'icons/icon-48x48.png',
  'icons/icon-96x96.png',
  'icons/icon-192x192.png',
  'icons/icon-256x256.png',
  'icons/icon-384x384.png',
  'icons/icon-512x512.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys
          .filter(function(key) { return key !== CACHE_NAME; })
          .map(function(key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
