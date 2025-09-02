import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wifi, WifiOff } from "lucide-react";

const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-16 left-4 right-4 z-50">
      <Alert className="bg-yellow-500/10 border-yellow-500/20 text-yellow-600">
        <WifiOff className="h-4 w-4" />
        <AlertDescription>
          You're currently offline. Some features may be limited.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default OfflineIndicator;
