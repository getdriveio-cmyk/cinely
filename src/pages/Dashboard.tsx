import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import DashboardHeader from '@/components/DashboardHeader';
import Rail from '@/components/Rail';
import NotificationBell from '@/components/NotificationBell';
import AccountCard from '@/components/AccountCard';
import { fetchDashboardData, DashboardData } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const { user, profile, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
      return;
    }

    if (!authLoading && user && !profile?.onboardingAt) {
      navigate('/onboarding');
      return;
    }

    if (user) {
      loadDashboardData();
    }
  }, [user, profile, authLoading, navigate]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-32" />
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-6 w-48" />
                  <div className="flex space-x-4">
                    {[...Array(6)].map((_, j) => (
                      <Skeleton key={j} className="h-48 w-32" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !dashboardData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Dashboard - Cinely"
        description="Your personalized streaming dashboard"
        noindex={true}
      />
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1 space-y-8">
              <DashboardHeader user={user} profile={profile} />
              
              {/* Continue Watching */}
              {dashboardData.continueWatching.length > 0 ? (
                <Rail
                  title="Continue Watching"
                  items={dashboardData.continueWatching}
                  type="continue"
                />
              ) : (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Continue Watching</h2>
                  <div className="bg-muted/50 rounded-lg p-8 text-center">
                    <h3 className="text-lg font-semibold mb-2">Start Your Journey</h3>
                    <p className="text-muted-foreground mb-4">
                      Discover amazing movies and shows to watch
                    </p>
                    <button
                      onClick={() => navigate('/movies')}
                      className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Browse Movies
                    </button>
                  </div>
                </div>
              )}

              {/* My List */}
              <Rail
                title="My List"
                items={dashboardData.watchlist}
                type="watchlist"
              />

              {/* Recommended For You */}
              <Rail
                title="Recommended For You"
                items={dashboardData.recommendations}
                type="recommendations"
              />

              {/* Trending Now */}
              <Rail
                title="Trending Now"
                items={dashboardData.trending7d}
                type="trending"
              />

              {/* Newly Added */}
              <Rail
                title="Newly Added"
                items={dashboardData.newlyAdded}
                type="newlyAdded"
              />
            </div>

            {/* Right sidebar */}
            <div className="lg:w-80 space-y-6">
              <NotificationBell notifications={dashboardData.notifications} />
              <AccountCard user={user} profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
