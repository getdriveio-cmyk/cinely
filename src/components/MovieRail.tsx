import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieCard from "./MovieCard";
import { useRef, useState } from "react";

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

interface MovieRailProps {
  title: string;
  movies: Movie[];
  size?: "sm" | "md" | "lg";
}

const MovieRail = ({ title, movies, size = "md" }: MovieRailProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 320; // Approximate card width + gap
    const newScrollLeft = scrollContainerRef.current.scrollLeft + 
      (direction === "right" ? scrollAmount : -scrollAmount);
    
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth"
    });
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Rail Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          
          {/* Navigation Controls */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-2 h-8 w-8 rounded-full border-border/50 hover:border-primary/50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-2 h-8 w-8 rounded-full border-border/50 hover:border-primary/50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Movies Scroll Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {movies.map((movie) => (
              <div key={movie.id} className="flex-none">
                <MovieCard movie={movie} size={size} />
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default MovieRail;