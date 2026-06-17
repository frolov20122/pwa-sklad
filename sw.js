const CACHE = 'sklad-cache-v3';
const urlsToCache = [
  '/pwa-sklad/',
  '/pwa-sklad/index.html',
  '/pwa-sklad/manifest.json',
  '/pwa-sklad/icon-192.png',
  '/pwa-sklad/icon-512.png'
];

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Для index.html и корня сайта — всегда идём в сеть
  if (url.pathname === '/pwa-sklad/' || url.pathname === '/pwa-sklad/index.html') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Обновляем кэш свежей версией
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request)) // если сеть недоступна — отдаём кэш
    );
    return;
  }

  // Для всех остальных ресурсов — cache-first
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
