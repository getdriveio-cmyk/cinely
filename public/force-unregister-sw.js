// Aggressive service worker unregistration script
// This will run on every page load to ensure no service worker is active

(function() {
  'use strict';
  
  console.log('🔧 Force unregistering service workers...');
  
  // Force reload the page after cleanup to ensure fresh content
  let hasReloaded = false;
  
  if ('serviceWorker' in navigator) {
    // Unregister all service workers
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      console.log('Found', registrations.length, 'service worker registrations');
      
      for (let registration of registrations) {
        console.log('Unregistering service worker:', registration.scope);
        registration.unregister().then(function(boolean) {
          console.log('Service worker unregistered:', boolean);
        });
      }
      
      // Clear all caches
      if ('caches' in window) {
        caches.keys().then(function(cacheNames) {
          console.log('Found', cacheNames.length, 'caches to delete');
          return Promise.all(
            cacheNames.map(function(cacheName) {
              console.log('Deleting cache:', cacheName);
              return caches.delete(cacheName);
            })
          );
        }).then(function() {
          console.log('✅ All caches cleared');
          
          // Force reload the page to ensure fresh content
          if (!hasReloaded && registrations.length > 0) {
            hasReloaded = true;
            console.log('🔄 Reloading page to ensure fresh content...');
            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          }
        });
      }
    });
    
    // Also try to unregister the main service worker
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('Found main service worker, unregistering...');
      return registration.unregister();
    }).catch(function(error) {
      console.log('No main service worker found or error:', error);
    });
  }
  
  // Clear localStorage and sessionStorage of any service worker related data
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('sw') || key.includes('service') || key.includes('cache'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => {
      console.log('Removing localStorage key:', key);
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.log('Error clearing localStorage:', error);
  }
  
  console.log('✅ Service worker cleanup complete');
})();
