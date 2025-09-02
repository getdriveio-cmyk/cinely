import { Button } from "@/components/ui/button";
import { Play, Plus, Star } from "lucide-react";
import { useState } from "react";
import LazyImage from "./LazyImage";
import { trackUserInteraction } from "@/utils/tracking";

interface Movie {
  id: string;
  title: string;
  rating: string;
  year: number;
  duration: number;
  genre: string[];
  poster: string;
  isAdFree?: boolean;
}

interface MovieCardProps {
  movie: Movie;
  size?: "sm" | "md" | "lg";
}

const MovieCard = ({ movie, size = "md" }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    sm: "w-48 h-72",
    md: "w-64 h-96", 
    lg: "w-80 h-[480px]"
  };

  return (
    <div 
      className={`relative ${sizeClasses[size]} group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster Image */}
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-card">
        <LazyImage 
          src={movie.poster} 
          alt={movie.title}
          className="w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-overlay transition-opacity duration-300 ${
          isHovered ? 'opacity-90' : 'opacity-0'
        }`} />

        {/* Content Overlay */}
        <div className={`absolute inset-0 p-4 flex flex-col justify-end transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="text-white">
            <h3 className="text-lg font-bold mb-2 line-clamp-2">{movie.title}</h3>
            
            {/* Metadata */}
            <div className="flex items-center gap-2 mb-3 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {movie.rating}
              </span>
              <span>•</span>
              <span>{movie.year}</span>
              <span>•</span>
              <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1 mb-4">
              {movie.genre.slice(0, 2).map((genre) => (
                <span 
                  key={genre}
                  className="px-2 py-1 bg-white/20 rounded-full text-xs"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90"
                onClick={(e) => {
                  e.stopPropagation();
                  trackUserInteraction('play_movie', movie.title, movie.id);
                }}
              >
                <Play className="w-3 h-3 mr-1" />
                Play
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-white/30 hover:border-white text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  trackUserInteraction('add_to_list', movie.title, movie.id);
                }}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Ad-Free Badge */}
        {movie.isAdFree && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-accent rounded-full">
            <span className="text-xs font-medium text-white">AD-FREE</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;