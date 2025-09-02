import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Settings, Clock } from 'lucide-react';

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

interface AccountCardProps {
  user: User;
  profile: UserProfile | null;
}

const AccountCard: React.FC<AccountCardProps> = ({ user, profile }) => {
  const navigate = useNavigate();
  const displayName = profile?.displayName || user.name || 'User';

  // Mock stats - in real app, these would come from API
  const weeklyMinutes = 420; // 7 hours
  const planTier = 'AVOD'; // Free with ads

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Plan */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Plan</span>
            <Badge variant="secondary">
              {planTier}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {planTier === 'AVOD' ? 'Free with ads' : 'Ad-free experience'}
          </p>
        </div>

        {/* Upgrade CTA */}
        {planTier === 'AVOD' && (
          <Button 
            className="w-full" 
            onClick={() => navigate('/account')}
          >
            <Crown className="h-4 w-4 mr-2" />
            Go Ad-Free
          </Button>
        )}

        {/* Quick Stats */}
        <div className="space-y-3 pt-2 border-t">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">This week:</span>
            <span className="font-medium">{weeklyMinutes} min watched</span>
          </div>
        </div>

        {/* Settings Link */}
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => navigate('/account')}
        >
          <Settings className="h-4 w-4 mr-2" />
          Account Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
