const cacheName = 'Temporas';

// Cache all the files to make a PWA
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      // Our application only has two files here index.html and manifest.json
      // but you can add more such as style.css as your app grows
      return cache.addAll([
        '/',
        '/search',
        '/img/apple-touch.png',
        '/img/splash-screen.png',
        '/manifest.json',
        '/top-1k-ingredients.csv'
      ]);
    })
  );
});

// Our service worker will intercept all fetch requests
// and check if we have cached the file
// if so it will serve the cached file
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});