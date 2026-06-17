const CACHE = 'sklad-cache-v3';
const urlsToCache = [
  '/pwa-sklad/',
  '/pwa-sklad/index.html',
  '/pwa-sklad/manifest.json',
  '/pwa-sklad/icon-192.png',
  '/pwa-sklad/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
