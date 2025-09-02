import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Play, Plus, Share2, ThumbsUp } from 'lucide-react';
import { getPlaybackToken, updateContinueWatching, toggleWatchlist } from '@/lib/api';
import { mockTitles } from '@/lib/api';

// Lazy load Mux Player to reduce initial bundle size
const MuxPlayer = lazy(() => import('@/components/MuxPlayer'));

const Watch = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackToken, setPlaybackToken] = useState<string | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerError, setPlayerError] = useState<string | null>(null);

  const resumePosition = searchParams.get('at');
  const resumeTime = resumePosition ? parseInt(resumePosition) : 0;

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    loadTitle();
  }, [slug, user, navigate]);

  const loadTitle = async () => {
    try {
      setIsLoading(true);
      
      // Find title by slug - in real app, this would be an API call
      const foundTitle = mockTitles.find(t => t.slug === slug);
      if (!foundTitle) {
        navigate('/404');
        return;
      }

      setTitle(foundTitle);
      
      // Get playback token
      const token = await getPlaybackToken(foundTitle.id, 'web');
      setPlaybackToken(token);
      
      // Check if in watchlist
      const inWatchlist = await toggleWatchlist(foundTitle.id);
      setIsInWatchlist(inWatchlist);
      
    } catch (error) {
      console.error('Error loading title:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayerError = (error: any) => {
    console.error('Player error:', error);
    setPlayerError('Failed to load video. Please try again.');
  };

  const handleTimeUpdate = (currentTime: number, duration: number) => {
    setCurrentTime(currentTime);
    setDuration(duration);
    
    // Update continue watching every 30 seconds
    if (currentTime > 0 && currentTime % 30 === 0 && title) {
      updateContinueWatching({
        titleId: title.id,
        lastPosSec: currentTime,
        durationSec: duration
      });
    }
  };

  const handleVideoEnd = () => {
    if (title) {
      updateContinueWatching({
        titleId: title.id,
        lastPosSec: duration,
        durationSec: duration,
        completed: true
      });
    }
  };

  const handleWatchlistToggle = async () => {
    if (!title) return;
    
    try {
      const newState = await toggleWatchlist(title.id);
      setIsInWatchlist(newState);
    } catch (error) {
      console.error('Error toggling watchlist:', error);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
              <Skeleton className="h-8 w-64" />
              <div className="aspect-video bg-muted rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!title) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${title.title} - Cinely`}
        description={title.description}
        ogImage={title.posterUrl}
      />
      <Header />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              <div className="aspect-video">
                {title?.muxPlaybackId ? (
                  <Suspense fallback={
                    <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <p>Loading video player...</p>
                      </div>
                    </div>
                  }>
                    <MuxPlayer
                      playbackId={title.muxPlaybackId}
                      playbackToken={playbackToken || undefined}
                      autoplay={true}
                      startTime={resumeTime}
                      onTimeUpdate={handleTimeUpdate}
                      onEnded={handleVideoEnd}
                      onError={handlePlayerError}
                      className="w-full h-full"
                      title={title.title}
                      viewerUserId={user?.id}
                    />
                  </Suspense>
                ) : (
                  <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-2xl font-bold mb-2">🎬</div>
                      <p className="text-muted-foreground">
                        No video available for this content
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Title Info */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">{title.title}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      {title.rating && (
                        <Badge variant="outline">{title.rating}</Badge>
                      )}
                      {title.durationSec && (
                        <span className="text-muted-foreground">
                          {formatDuration(title.durationSec)}
                        </span>
                      )}
                      {title.isOriginal && (
                        <Badge variant="default">Cinely Original</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleWatchlistToggle}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {isInWatchlist ? 'Remove from List' : 'Add to List'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {title.genres.map((genre: string) => (
                    <span key={genre}>{genre}</span>
                  ))}
                  {title.releaseDate && (
                    <span>{new Date(title.releaseDate).getFullYear()}</span>
                  )}
                </div>

                <p className="text-lg leading-relaxed">{title.description}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Related Content */}
              <div>
                <h3 className="text-lg font-semibold mb-4">More Like This</h3>
                <div className="space-y-3">
                  {mockTitles
                    .filter(t => t.id !== title.id && t.genres.some(g => title.genres.includes(g)))
                    .slice(0, 3)
                    .map((relatedTitle) => (
                      <div
                        key={relatedTitle.id}
                        className="flex gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                        onClick={() => navigate(`/watch/${relatedTitle.slug}`)}
                      >
                        <img
                          src={relatedTitle.posterUrl}
                          alt={relatedTitle.title}
                          className="w-16 h-24 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {relatedTitle.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {relatedTitle.genres.slice(0, 2).join(', ')}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
