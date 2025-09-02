import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Settings, Monitor, Smartphone, Tablet } from 'lucide-react';

const Account = () => {
  const { user, profile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.displayName || user?.name || '');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real app, this would come from API
  const planTier = 'AVOD';
  const devices = [
    { name: 'Chrome on MacBook Pro', type: 'desktop', lastUsed: '2 hours ago' },
    { name: 'Safari on iPhone', type: 'mobile', lastUsed: '1 day ago' },
    { name: 'Chrome on iPad', type: 'tablet', lastUsed: '3 days ago' }
  ];

  const handleSaveProfile = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      await updateProfile({
        displayName: displayName.trim() || undefined
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'desktop':
        return <Monitor className="h-4 w-4" />;
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Account Settings - Cinely"
        description="Manage your account settings and preferences"
        noindex={true}
      />
      <Header />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
            
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="plan">Plan</TabsTrigger>
                <TabsTrigger value="devices">Devices</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback className="text-2xl">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p className="text-muted-foreground">{user.email}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="displayName">Display Name</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            disabled={!isEditing}
                            placeholder="Enter your display name"
                          />
                          {isEditing ? (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={handleSaveProfile}
                                disabled={isLoading}
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setIsEditing(false);
                                  setDisplayName(profile?.displayName || user?.name || '');
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setIsEditing(true)}
                            >
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label>Email</Label>
                        <Input
                          value={user.email}
                          disabled
                          className="mt-1"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Email cannot be changed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Plan Tab */}
              <TabsContent value="plan">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Plan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">Current Plan</h3>
                          <Badge variant="secondary">{planTier}</Badge>
                        </div>
                        <p className="text-muted-foreground mt-1">
                          {planTier === 'AVOD' 
                            ? 'Free streaming with ads' 
                            : 'Ad-free premium experience'
                          }
                        </p>
                      </div>
                      {planTier === 'AVOD' && (
                        <Button>
                          <Crown className="h-4 w-4 mr-2" />
                          Upgrade to Ad-Free
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Free (AVOD)</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• 10,000+ movies and shows</li>
                          <li>• Short ad breaks</li>
                          <li>• 1080p streaming</li>
                          <li>• Unlimited devices</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg border-primary">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">Ad-Free Premium</h4>
                          <Badge>Recommended</Badge>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Everything in Free</li>
                          <li>• No ads</li>
                          <li>• 4K/HDR support</li>
                          <li>• Dolby Atmos audio</li>
                          <li>• Offline downloads</li>
                          <li>• Early access to new releases</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Devices Tab */}
              <TabsContent value="devices">
                <Card>
                  <CardHeader>
                    <CardTitle>Connected Devices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {devices.map((device, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {getDeviceIcon(device.type)}
                            <div>
                              <h4 className="font-medium">{device.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Last used {device.lastUsed}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
