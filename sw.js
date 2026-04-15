// VANVEK Service Worker — PWA offline support & caching
const CACHE_NAME = 'vanvek-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/services.html',
  '/prices.html',
  '/cart.html',
  '/contacts.html',
  '/faq.html',
  '/about.html',
  '/corporate.html',
  '/css/tokens.css',
  '/css/base.css',
  '/css/header.css',
  '/css/components.css',
  '/css/homepage.css',
  '/css/mobile.css',
  '/js/store.js',
  '/js/header.html.js',
  '/js/categories-data.js',
  '/js/services-data.js',
  '/js/prices.js',
  '/js/ai-assistant.js',
  '/js/mobile-menu.js',
  '/hero-bg.jpg',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json'
];

// Install — cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch — network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip external requests (fonts, analytics, etc.)
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone and cache the fresh response
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => {
        // Network failed — serve from cache
        return caches.match(event.request).then((cached) => {
          return cached || new Response('Нет подключения к интернету', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        });
      })
  );
});
