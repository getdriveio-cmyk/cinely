import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Star, Clock, Play, Plus, Tv } from "lucide-react";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import { mockMovies } from "@/data/mockMovies";

const TVShows = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Filter movies to show only TV shows (using a simple filter for demo)
  const tvShows = mockMovies.filter(movie => 
    movie.genre.includes("Drama") || 
    movie.genre.includes("Comedy") || 
    movie.genre.includes("Thriller") ||
    movie.title.toLowerCase().includes("series")
  );

  // Get all unique genres from TV shows
  const allGenres = Array.from(new Set(tvShows.flatMap(show => show.genre)));
  
  // Get all unique years from TV shows
  const allYears = Array.from(new Set(tvShows.map(show => show.year))).sort((a, b) => b - a);

  // Filter and sort TV shows
  const filteredShows = tvShows
    .filter(show => {
      const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === "all" || show.genre.includes(selectedGenre);
      const matchesYear = selectedYear === "all" || show.year.toString() === selectedYear;
      return matchesSearch && matchesGenre && matchesYear;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "year":
          return b.year - a.year;
        case "rating":
          return parseFloat(b.rating) - parseFloat(a.rating);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0; // Keep original order for "popular"
      }
    });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-6">
              <Tv className="w-5 h-5 text-white mr-2" />
              <span className="text-sm font-medium text-white">TV Shows</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              TV Shows
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Binge-watch your favorite series and discover new shows. From gripping dramas 
              to hilarious comedies, find your next obsession.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search TV shows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Shows */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Series</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {tvShows.slice(0, 3).map((show) => (
              <Card key={show.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img 
                    src={show.poster} 
                    alt={show.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold mb-2">{show.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{show.rating}</span>
                      <span>•</span>
                      <span>{show.year}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex gap-2 mb-3">
                    {show.genre.slice(0, 2).map((genre) => (
                      <Badge key={genre} variant="secondary" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Play className="w-4 h-4 mr-1" />
                      Watch Now
                    </Button>
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Filters:</span>
              </div>
              
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {allGenres.map(genre => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {allYears.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="year">Newest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="title">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {filteredShows.length} TV Shows Found
            </h2>
            <div className="flex gap-2">
              <Badge variant="secondary" className="px-3 py-1">
                {selectedGenre === "all" ? "All Genres" : selectedGenre}
              </Badge>
              {selectedYear !== "all" && (
                <Badge variant="secondary" className="px-3 py-1">
                  {selectedYear}
                </Badge>
              )}
            </div>
          </div>

          {filteredShows.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📺</div>
              <h3 className="text-2xl font-semibold mb-2">No TV shows found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedGenre("all");
                  setSelectedYear("all");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredShows.map((show) => (
                <div key={show.id} className="flex justify-center">
                  <MovieCard movie={show} size="md" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-muted-foreground">TV Shows Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">30+</div>
              <div className="text-muted-foreground">Genres</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">New</div>
              <div className="text-muted-foreground">Episodes Weekly</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TVShows;
