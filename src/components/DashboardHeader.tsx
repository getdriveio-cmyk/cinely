import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Bell } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface UserProfile {
  userId: string;
  displayName?: string;
  avatarUrl?: string;
  country?: string;
  onboardingAt?: Date;
}

interface DashboardHeaderProps {
  user: User;
  profile: UserProfile | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, profile }) => {
  const displayName = profile?.displayName || user.name || 'User';
  const avatarUrl = profile?.avatarUrl || user.image;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} alt={displayName} />
          <AvatarFallback className="text-lg">
            {displayName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">
            Hi, {displayName.split(' ')[0]}!
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs">
              AVOD
            </Badge>
            <span className="text-sm text-muted-foreground">
              Free with ads
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
