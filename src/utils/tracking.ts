// Tracking pixel utilities for analytics and marketing

interface TrackingEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

// Google Analytics 4 tracking
export const trackGAEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: window.location.pathname,
      ...parameters
    });
  }
};

// Facebook Pixel tracking
export const trackFacebookEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq && window.fbq !== null) {
    try {
      window.fbq('track', eventName, parameters);
    } catch (error) {
      console.warn('Facebook Pixel tracking failed:', error);
    }
  }
};

// Generic tracking function
export const trackEvent = (event: TrackingEvent) => {
  const { event: eventName, properties = {}, timestamp = Date.now() } = event;
  
  // Track in Google Analytics
  trackGAEvent(eventName, properties);
  
  // Track in Facebook Pixel
  trackFacebookEvent(eventName, properties);
  
  // Track in custom analytics
  trackCustomEvent(eventName, properties, timestamp);
};

// Custom analytics tracking
export const trackCustomEvent = (eventName: string, properties: Record<string, any>, timestamp: number) => {
  // Send to your custom analytics endpoint
  if (typeof window !== 'undefined') {
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: eventName,
        properties,
        timestamp,
        url: window.location.href,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      })
    }).catch(error => {
      console.warn('Analytics tracking failed:', error);
    });
  }
};

// Page view tracking
export const trackPageView = (pageName?: string) => {
  const page = pageName || document.title;
  
  trackEvent({
    event: 'page_view',
    properties: {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_name: page
    }
  });
};

// User interaction tracking
export const trackUserInteraction = (action: string, element: string, value?: any) => {
  trackEvent({
    event: 'user_interaction',
    properties: {
      action,
      element,
      value,
      page: window.location.pathname
    }
  });
};

// Video tracking
export const trackVideoEvent = (action: string, videoId: string, currentTime?: number, duration?: number) => {
  trackEvent({
    event: 'video_interaction',
    properties: {
      action,
      video_id: videoId,
      current_time: currentTime,
      duration,
      page: window.location.pathname
    }
  });
};

// Search tracking
export const trackSearch = (query: string, results?: number) => {
  trackEvent({
    event: 'search',
    properties: {
      search_term: query,
      results_count: results,
      page: window.location.pathname
    }
  });
};

// Conversion tracking
export const trackConversion = (conversionType: string, value?: number, currency?: string) => {
  trackEvent({
    event: 'conversion',
    properties: {
      conversion_type: conversionType,
      value,
      currency: currency || 'USD',
      page: window.location.pathname
    }
  });
};

// Error tracking
export const trackError = (error: string, errorType: string, stack?: string) => {
  trackEvent({
    event: 'error',
    properties: {
      error_message: error,
      error_type: errorType,
      stack_trace: stack,
      page: window.location.pathname,
      user_agent: navigator.userAgent
    }
  });
};

// Performance tracking
export const trackPerformance = (metric: string, value: number, unit: string = 'ms') => {
  trackEvent({
    event: 'performance',
    properties: {
      metric,
      value,
      unit,
      page: window.location.pathname
    }
  });
};

// Initialize tracking on page load
export const initializeTracking = () => {
  if (typeof window !== 'undefined') {
    // Track page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        trackPerformance('page_load_time', navigation.loadEventEnd - navigation.fetchStart);
        trackPerformance('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.fetchStart);
      }
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      trackEvent({
        event: 'page_visibility_change',
        properties: {
          visibility_state: document.visibilityState,
          page: window.location.pathname
        }
      });
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
      const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        if (maxScrollDepth % 25 === 0) { // Track at 25%, 50%, 75%, 100%
          trackEvent({
            event: 'scroll_depth',
            properties: {
              scroll_depth: maxScrollDepth,
              page: window.location.pathname
            }
          });
        }
      }
    });
  }
};

// Declare global types for tracking libraries
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    dataLayer: any[];
  }
}
