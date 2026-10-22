// The registration scope is the GitHub Pages repository path, not the site root.
const CACHE_PREFIX = 'citizencard-verify-demo-';
const CACHE_NAME = `${CACHE_PREFIX}v3`;
const APP_ROOT = self.registration.scope;
const APP_SHELL = [
  APP_ROOT,
  new URL('manifest.webmanifest', APP_ROOT).href,
  new URL('favicon.svg', APP_ROOT).href,
  new URL('icons/verifycard-icon.svg', APP_ROOT).href,
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  // Do not interfere with other repositories on the same github.io host.
  if (url.origin !== self.location.origin || !url.href.startsWith(APP_ROOT)) return;

  if (event.request.mode === 'navigate') {
    // Network-first keeps new GitHub Pages deployments from serving old HTML.
    event.respondWith(
      fetch(event.request).catch(async () => {
        return (await caches.match(APP_ROOT)) || Response.error();
      }),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request)),
  );
});
