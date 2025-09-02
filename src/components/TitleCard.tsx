import { Badge } from '@/components/ui/badge';
import LazyImage from './LazyImage';
import { cn } from '@/lib/utils';

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

interface TitleCardProps {
  title: Title;
  posterUrl?: string;
  className?: string;
}

const TitleCard: React.FC<TitleCardProps> = ({ title, posterUrl, className }) => {
  const imageUrl = posterUrl || title.posterUrl;
  const year = title.releaseDate ? new Date(title.releaseDate).getFullYear() : null;

  return (
    <div className={cn("relative group cursor-pointer transition-all duration-300 hover:scale-105", className)}>
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-card">
        <LazyImage 
          src={imageUrl || '/placeholder.svg'} 
          alt={title.title}
          className="w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-2 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="text-white">
            <h3 className="text-sm font-bold mb-1 line-clamp-2">{title.title}</h3>
            
            {/* Metadata */}
            <div className="flex items-center gap-1 mb-2 text-xs text-white/80">
              {title.rating && (
                <>
                  <span>{title.rating}</span>
                  <span>•</span>
                </>
              )}
              {year && (
                <>
                  <span>{year}</span>
                  {title.durationSec && <span>•</span>}
                </>
              )}
              {title.durationSec && (
                <span>{Math.floor(title.durationSec / 60)}h {title.durationSec % 60}m</span>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1 mb-2">
              {title.genres.slice(0, 2).map((genre) => (
                <span 
                  key={genre}
                  className="px-1 py-0.5 bg-white/20 rounded text-xs"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {title.isOriginal && (
            <Badge variant="default" className="text-xs">
              Original
            </Badge>
          )}
          {title.isFree && (
            <Badge variant="secondary" className="text-xs">
              Free
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
