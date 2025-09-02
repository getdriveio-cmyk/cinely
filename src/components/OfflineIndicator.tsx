import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wifi, WifiOff } from "lucide-react";
import { setupOfflineListener } from "@/utils/serviceWorker";

const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const cleanup = setupOfflineListener(setIsOffline);
    return cleanup;
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
