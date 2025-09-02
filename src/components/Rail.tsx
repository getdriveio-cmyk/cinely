import { useNavigate } from 'react-router-dom';
import TitleCard from './TitleCard';
import { ProgressBar } from './ProgressBar';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface Title {
  id: string;
  title: string;
  slug: string;
  description?: string;
  posterUrl?: string;
  backdropUrl?: string;
  releaseDate?: string;
  durationSec?: number;
  genres: string[];
  rating?: string;
  muxPlaybackId?: string;
  isFree: boolean;
  isOriginal: boolean;
}

interface ContinueWatchingItem {
  title: Title;
  progressPct: number;
  lastPosSec: number;
  muxPlaybackId: string;
}

interface WatchlistItem {
  title: Title;
  posterUrl: string;
  slug: string;
  durationSec: number;
}

interface RecommendationItem {
  title: Title;
  reason: 'because_you_watched' | 'popular_in_genre';
}

type RailItem = ContinueWatchingItem | WatchlistItem | RecommendationItem | Title;

interface RailProps {
  title: string;
  items: RailItem[];
  type: 'continue' | 'watchlist' | 'recommendations' | 'trending' | 'newlyAdded';
}

const Rail: React.FC<RailProps> = ({ title, items, type }) => {
  const navigate = useNavigate();

  if (items.length === 0) {
    return null;
  }

  const handleItemClick = (item: RailItem) => {
    let slug: string;
    
    if ('title' in item) {
      slug = item.title.slug;
    } else {
      slug = (item as Title).slug;
    }
    
    navigate(`/watch/${slug}`);
  };

  const handleResumeClick = (item: ContinueWatchingItem) => {
    navigate(`/watch/${item.title.slug}?at=${item.lastPosSec}`);
  };

  const getReasonText = (reason: string) => {
    switch (reason) {
      case 'because_you_watched':
        return 'Because you watched';
      case 'popular_in_genre':
        return 'Popular in genre';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          See all
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((item, index) => {
          if (type === 'continue' && 'progressPct' in item) {
            const continueItem = item as ContinueWatchingItem;
            return (
              <div key={index} className="flex-shrink-0 w-48 space-y-2">
                <div className="relative group cursor-pointer" onClick={() => handleItemClick(item)}>
                  <TitleCard
                    title={continueItem.title}
                    posterUrl={continueItem.title.posterUrl}
                    className="w-48 h-32"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <ProgressBar 
                      progress={continueItem.progressPct} 
                      className="h-1"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-sm truncate">
                    {continueItem.title.title}
                  </h3>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleResumeClick(continueItem);
                    }}
                  >
                    Resume
                  </Button>
                </div>
              </div>
            );
          }

          if (type === 'watchlist' && 'durationSec' in item) {
            const watchlistItem = item as WatchlistItem;
            return (
              <div key={index} className="flex-shrink-0 w-32">
                <div className="cursor-pointer" onClick={() => handleItemClick(item)}>
                  <TitleCard
                    title={watchlistItem.title}
                    posterUrl={watchlistItem.posterUrl}
                    className="w-32 h-48"
                  />
                </div>
              </div>
            );
          }

          if (type === 'recommendations' && 'reason' in item) {
            const recItem = item as RecommendationItem;
            return (
              <div key={index} className="flex-shrink-0 w-32 space-y-2">
                <div className="cursor-pointer" onClick={() => handleItemClick(item)}>
                  <TitleCard
                    title={recItem.title}
                    posterUrl={recItem.title.posterUrl}
                    className="w-32 h-48"
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  {getReasonText(recItem.reason)}
                </div>
              </div>
            );
          }

          // Default title display
          const titleItem = item as Title;
          return (
            <div key={index} className="flex-shrink-0 w-32">
              <div className="cursor-pointer" onClick={() => handleItemClick(item)}>
                <TitleCard
                  title={titleItem}
                  posterUrl={titleItem.posterUrl}
                  className="w-32 h-48"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rail;
