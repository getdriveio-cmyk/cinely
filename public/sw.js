// No-op service worker to replace existing one and clear caches
console.log('No-op service worker loading...');

self.addEventListener('install', (event) => {
  console.log('No-op service worker installing...');
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('No-op service worker activating...');
  
  // Clear all caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      console.log('Clearing all caches:', cacheNames);
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('All caches cleared');
      // Claim control of all clients
      return self.clients.claim();
    }).then(() => {
      console.log('No-op service worker activated - unregistering...');
      // Unregister this service worker
      return self.registration.unregister();
    })
  );
});

// Don't handle any fetch events - let everything go to network
self.addEventListener('fetch', (event) => {
  // Do nothing - let requests go to network
  return;
});
