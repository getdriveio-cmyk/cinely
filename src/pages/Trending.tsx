import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Flame, Star, Clock, Play, Plus, Eye } from "lucide-react";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import SEO from "@/components/SEO";
import { mockMovies } from "@/data/mockMovies";
import { getCollectionPageStructuredData, getBreadcrumbStructuredData } from "@/utils/structuredData";

const Trending = () => {
  const [activeTab, setActiveTab] = useState("today");

  // Simulate trending data by sorting and filtering movies
  const trendingMovies = mockMovies
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 8);

  const trendingTVShows = mockMovies
    .filter(movie => movie.genre.includes("Drama") || movie.genre.includes("Comedy"))
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 6);

  const topRated = mockMovies
    .filter(movie => parseFloat(movie.rating) >= 8.0)
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 6);

  const mostWatched = mockMovies
    .sort((a, b) => b.year - a.year)
    .slice(0, 6);

  const collectionStructuredData = getCollectionPageStructuredData({
    name: "Trending",
    description: "Discover what's trending now in movies and TV shows. See the most popular content everyone is watching.",
    url: "/trending",
    numberOfItems: trendingMovies.length,
    items: trendingMovies.slice(0, 20).map(movie => ({
      name: movie.title,
      url: `/movies/${movie.id}`
    }))
  });

  const breadcrumbStructuredData = getBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Trending", url: "/trending" }
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Trending - What's Popular Now on Cinely"
        description="Discover what's trending now in movies and TV shows. See the most popular content everyone is watching. Updated daily with the hottest releases."
        keywords={[
          "trending movies",
          "trending TV shows",
          "popular content",
          "what's trending",
          "hot movies",
          "popular shows",
          "trending now",
          "most watched",
          "viral content",
          "trending entertainment"
        ]}
        canonical="/trending"
        structuredData={[collectionStructuredData, breadcrumbStructuredData]}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-6">
              <TrendingUp className="w-5 h-5 text-white mr-2" />
              <span className="text-sm font-medium text-white">Trending Now</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              What's Trending
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover what everyone is watching right now. From viral hits to critically acclaimed 
              masterpieces, stay up to date with the latest trends.
            </p>
          </div>
        </div>
      </section>

      {/* Trending Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="today" className="flex items-center gap-2">
                <Flame className="w-4 h-4" />
                Today
              </TabsTrigger>
              <TabsTrigger value="movies" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Movies
              </TabsTrigger>
              <TabsTrigger value="tv" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                TV Shows
              </TabsTrigger>
              <TabsTrigger value="rated" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Top Rated
              </TabsTrigger>
            </TabsList>

            {/* Today's Trending */}
            <TabsContent value="today" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                  Trending Today
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {trendingMovies.map((movie, index) => (
                    <div key={movie.id} className="relative">
                      <div className="flex justify-center">
                        <MovieCard movie={movie} size="md" />
                      </div>
                      {index < 3 && (
                        <div className="absolute -top-2 -right-2">
                          <Badge className="bg-orange-500 text-white">
                            #{index + 1}
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Trending Movies */}
            <TabsContent value="movies" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Play className="w-6 h-6 text-primary" />
                  Trending Movies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {trendingMovies.map((movie) => (
                    <div key={movie.id} className="flex justify-center">
                      <MovieCard movie={movie} size="md" />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Trending TV Shows */}
            <TabsContent value="tv" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-accent" />
                  Trending TV Shows
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {trendingTVShows.map((show) => (
                    <div key={show.id} className="flex justify-center">
                      <MovieCard movie={show} size="md" />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Top Rated */}
            <TabsContent value="rated" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500" />
                  Top Rated
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {topRated.map((movie) => (
                    <div key={movie.id} className="flex justify-center">
                      <MovieCard movie={movie} size="md" />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Trending */}
      <section className="py-16 bg-card/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">This Week's Highlights</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Most Watched */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Most Watched</h3>
                  <p className="text-muted-foreground">This week's most popular content</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {mostWatched.slice(0, 3).map((movie, index) => (
                  <div key={movie.id} className="flex items-center gap-4 p-3 rounded-lg bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{movie.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{movie.rating}</span>
                        <span>•</span>
                        <span>{movie.year}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Rated */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Highest Rated</h3>
                  <p className="text-muted-foreground">Critically acclaimed masterpieces</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {topRated.slice(0, 3).map((movie, index) => (
                  <div key={movie.id} className="flex items-center gap-4 p-3 rounded-lg bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-sm font-bold text-yellow-500">
                      {index + 1}
                    </div>
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{movie.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{movie.rating}</span>
                        <span>•</span>
                        <span>{movie.year}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground">Daily Views</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Trending Updates</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trending;
