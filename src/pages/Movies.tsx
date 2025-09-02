import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Star, Clock, Play, Plus } from "lucide-react";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import SEO from "@/components/SEO";
import { mockMovies } from "@/data/mockMovies";
import { getCollectionPageStructuredData, getBreadcrumbStructuredData } from "@/utils/structuredData";
import { trackSearch, trackUserInteraction } from "@/utils/tracking";

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Get all unique genres from movies
  const allGenres = Array.from(new Set(mockMovies.flatMap(movie => movie.genre)));
  
  // Get all unique years from movies
  const allYears = Array.from(new Set(mockMovies.map(movie => movie.year))).sort((a, b) => b - a);

  // Filter and sort movies
  const filteredMovies = mockMovies
    .filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === "all" || movie.genre.includes(selectedGenre);
      const matchesYear = selectedYear === "all" || movie.year.toString() === selectedYear;
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

  // SEO structured data
  const collectionStructuredData = getCollectionPageStructuredData({
    name: "Movies",
    description: "Discover thousands of movies across all genres. From blockbusters to indie films, find your next favorite movie.",
    url: "/movies",
    numberOfItems: filteredMovies.length,
    items: filteredMovies.slice(0, 20).map(movie => ({
      name: movie.title,
      url: `/movies/${movie.id}`
    }))
  });

  const breadcrumbStructuredData = getBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Movies", url: "/movies" }
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Movies - Stream Thousands of Films Online"
        description="Discover thousands of movies across all genres. From blockbusters to indie films, find your next favorite movie. Stream free with ads or upgrade to premium."
        keywords={[
          "movies",
          "streaming movies",
          "watch movies online",
          "free movies",
          "movie streaming",
          "online cinema",
          "film streaming",
          "movie catalog",
          "new movies",
          "classic movies"
        ]}
        canonical="/movies"
        structuredData={[collectionStructuredData, breadcrumbStructuredData]}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              Movies
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover thousands of movies across all genres. From blockbusters to indie films, 
              find your next favorite movie.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (e.target.value.length > 2) {
                      trackSearch(e.target.value, filteredMovies.length);
                    }
                  }}
                  className="pl-12 h-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-border">
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
              {filteredMovies.length} Movies Found
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

          {filteredMovies.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-semibold mb-2">No movies found</h3>
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
              {filteredMovies.map((movie) => (
                <div key={movie.id} className="flex justify-center">
                  <MovieCard movie={movie} size="md" />
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
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Movies Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Genres</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Streaming</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Movies;
