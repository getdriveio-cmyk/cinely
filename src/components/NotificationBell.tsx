import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, X } from 'lucide-react';
import { markNotificationRead } from '@/lib/api';

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  href?: string;
  read: boolean;
}

interface NotificationBellProps {
  notifications: NotificationItem[];
}

const NotificationBell: React.FC<NotificationBellProps> = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = async (notification: NotificationItem) => {
    if (!notification.read) {
      await markNotificationRead(notification.id);
    }
    
    if (notification.href) {
      window.location.href = notification.href;
    }
    
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-10 w-80 bg-background border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <ScrollArea className="h-64">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No notifications
              </div>
            ) : (
              <div className="p-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      notification.read 
                        ? 'hover:bg-muted/50' 
                        : 'bg-primary/5 hover:bg-primary/10'
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-2">
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notification.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
