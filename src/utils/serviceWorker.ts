// Service Worker registration and management
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker registered successfully:', registration);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show update notification
              showUpdateNotification();
            }
          });
        }
      });

      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  } else {
    console.log('Service Worker not supported');
  }
};

// Show update notification
const showUpdateNotification = () => {
  if (confirm('New version available! Click OK to update.')) {
    window.location.reload();
  }
};

// Unregister service worker (for development)
export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(registration => registration.unregister()));
      console.log('Service Workers unregistered');
    } catch (error) {
      console.error('Error unregistering service workers:', error);
    }
  }
};

// Check if app is running offline
export const isOffline = () => {
  return !navigator.onLine;
};

// Listen for online/offline events
export const setupOfflineListener = (callback: (isOffline: boolean) => void) => {
  const handleOnline = () => callback(false);
  const handleOffline = () => callback(true);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// Cache management utilities
export const clearCache = async () => {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('All caches cleared');
    } catch (error) {
      console.error('Error clearing caches:', error);
    }
  }
};

// Get cache storage info
export const getCacheInfo = async () => {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      const cacheInfo = await Promise.all(
        cacheNames.map(async (cacheName) => {
          const cache = await caches.open(cacheName);
          const keys = await cache.keys();
          return {
            name: cacheName,
            size: keys.length
          };
        })
      );
      return cacheInfo;
    } catch (error) {
      console.error('Error getting cache info:', error);
      return [];
    }
  }
  return [];
};
