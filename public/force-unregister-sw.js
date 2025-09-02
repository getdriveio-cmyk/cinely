// Force unregister all service workers and clear caches
(function() {
  'use strict';
  
  console.log('Force removing all service workers...');
  
  if ('serviceWorker' in navigator) {
    // Unregister all service workers
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      console.log('Found', registrations.length, 'service worker registrations');
      
      for(let registration of registrations) {
        console.log('Unregistering service worker:', registration.scope);
        registration.unregister().then(function(boolean) {
          console.log('Service worker unregistered:', boolean);
        });
      }
    });
    
    // Clear all caches
    if ('caches' in window) {
      caches.keys().then(function(cacheNames) {
        console.log('Found', cacheNames.length, 'caches to clear');
        
        return Promise.all(
          cacheNames.map(function(cacheName) {
            console.log('Deleting cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }).then(function() {
        console.log('All caches cleared');
        // Force reload after clearing
        setTimeout(function() {
          console.log('Reloading page to ensure clean state...');
          window.location.reload(true);
        }, 1000);
      });
    }
  } else {
    console.log('Service workers not supported');
  }
})();
