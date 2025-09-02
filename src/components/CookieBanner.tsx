import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Cookie, Settings, Shield, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cinely-cookie-consent');
    if (!cookieConsent) {
      setIsVisible(true);
    } else {
      const savedPreferences = JSON.parse(cookieConsent);
      setPreferences(savedPreferences);
      // Initialize tracking pixels based on saved preferences
      initializeTrackingPixels(savedPreferences);
    }
  }, []);

  const initializeTrackingPixels = (prefs: CookiePreferences) => {
    if (prefs.analytics) {
      // Google Analytics
      loadGoogleAnalytics();
    }
    
    if (prefs.marketing) {
      // Facebook Pixel
      loadFacebookPixel();
      // Google Ads
      loadGoogleAds();
    }
  };

  const loadGoogleAnalytics = () => {
    // Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: document.title,
      page_location: window.location.href
    });
  };

  const loadFacebookPixel = () => {
    // Facebook Pixel
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'FACEBOOK_PIXEL_ID');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
  };

  const loadGoogleAds = () => {
    // Google Ads Conversion Tracking
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-CONVERSION_ID';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'AW-CONVERSION_ID');
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    
    setPreferences(allAccepted);
    localStorage.setItem('cinely-cookie-consent', JSON.stringify(allAccepted));
    setIsVisible(false);
    initializeTrackingPixels(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    
    setPreferences(onlyNecessary);
    localStorage.setItem('cinely-cookie-consent', JSON.stringify(onlyNecessary));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cinely-cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
    setShowSettings(false);
    initializeTrackingPixels(preferences);
  };

  const handlePreferenceChange = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto shadow-2xl border-2">
        {!showSettings ? (
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Cookie className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">We use cookies to enhance your experience</h3>
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar technologies to provide, protect, and improve our services. 
                  Some cookies are necessary for our site to function, while others help us understand 
                  how you use our site so we can improve it.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Necessary
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Analytics
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Marketing
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Settings className="w-3 h-3 mr-1" />
                    Preferences
                  </Badge>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleAcceptAll} className="flex-1">
                    Accept All Cookies
                  </Button>
                  <Button onClick={handleRejectAll} variant="outline" className="flex-1">
                    Reject All
                  </Button>
                  <Button 
                    onClick={() => setShowSettings(true)} 
                    variant="ghost" 
                    className="flex-1"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Customize
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Cookie Preferences</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    Necessary Cookies
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Essential for the website to function properly
                  </p>
                </div>
                <Badge variant="secondary">Always Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    Analytics Cookies
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors interact with our website
                  </p>
                </div>
                <Button
                  variant={preferences.analytics ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePreferenceChange('analytics', !preferences.analytics)}
                >
                  {preferences.analytics ? 'Enabled' : 'Disabled'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-purple-600" />
                    Marketing Cookies
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Used to track visitors across websites for advertising
                  </p>
                </div>
                <Button
                  variant={preferences.marketing ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePreferenceChange('marketing', !preferences.marketing)}
                >
                  {preferences.marketing ? 'Enabled' : 'Disabled'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    <Settings className="w-4 h-4 text-orange-600" />
                    Preference Cookies
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Remember your choices and preferences
                  </p>
                </div>
                <Button
                  variant={preferences.preferences ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePreferenceChange('preferences', !preferences.preferences)}
                >
                  {preferences.preferences ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSavePreferences} className="flex-1">
                Save Preferences
              </Button>
              <Button onClick={handleAcceptAll} variant="outline" className="flex-1">
                Accept All
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CookieBanner;
