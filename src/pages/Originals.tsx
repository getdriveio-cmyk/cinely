import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Plus, Star, Award, Crown, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import SEO from "@/components/SEO";
import { mockMovies } from "@/data/mockMovies";
import { getCollectionPageStructuredData, getBreadcrumbStructuredData } from "@/utils/structuredData";

const Originals = () => {
  // Filter for original content (using a simple filter for demo)
  const originalContent = mockMovies.filter(movie => 
    movie.genre.includes("Action") || 
    movie.genre.includes("Sci-Fi") ||
    movie.title.toLowerCase().includes("original")
  );

  const featuredOriginals = originalContent.slice(0, 3);
  const upcomingOriginals = originalContent.slice(3, 6);

  const collectionStructuredData = getCollectionPageStructuredData({
    name: "Originals",
    description: "Exclusive Cinely original content you can't find anywhere else. Award-winning series and movies created just for you.",
    url: "/originals",
    numberOfItems: originalContent.length,
    items: originalContent.slice(0, 20).map(movie => ({
      name: movie.title,
      url: `/movies/${movie.id}`
    }))
  });

  const breadcrumbStructuredData = getBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Originals", url: "/originals" }
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Originals - Exclusive Cinely Content"
        description="Exclusive Cinely original content you can't find anywhere else. Award-winning series and movies created just for you. Stream original shows and films."
        keywords={[
          "original content",
          "exclusive shows",
          "original movies",
          "Cinely originals",
          "exclusive series",
          "original programming",
          "award-winning content",
          "exclusive films",
          "original entertainment",
          "streaming originals"
        ]}
        canonical="/originals"
        structuredData={[collectionStructuredData, breadcrumbStructuredData]}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-6">
              <Crown className="w-5 h-5 text-white mr-2" />
              <span className="text-sm font-medium text-white">Cinely Originals</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              Original Content
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Exclusive movies and series you can't find anywhere else. 
              Discover our award-winning original productions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Play className="w-5 h-5 mr-2" />
                Start Watching
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Sparkles className="w-5 h-5 mr-2" />
                Coming Soon
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Originals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Featured Originals</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredOriginals.map((original, index) => (
              <Card key={original.id} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/40">
                <div className="relative">
                  <img 
                    src={original.poster} 
                    alt={original.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Original Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      <Crown className="w-3 h-3 mr-1" />
                      Original
                    </Badge>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-2">{original.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-white/80 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{original.rating}</span>
                      <span>•</span>
                      <span>{original.year}</span>
                      <span>•</span>
                      <span>{Math.floor(original.duration / 60)}h {original.duration % 60}m</span>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {original.genre.slice(0, 2).map((genre) => (
                        <Badge key={genre} variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                        <Play className="w-4 h-4 mr-1" />
                        Watch Now
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-6 h-6 text-accent" />
            <h2 className="text-3xl font-bold">Coming Soon</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingOriginals.map((original) => (
              <Card key={original.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img 
                    src={original.poster} 
                    alt={original.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                      Coming Soon
                    </Badge>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold mb-2">{original.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{original.rating}</span>
                      <span>•</span>
                      <span>{original.year}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex gap-2 mb-3">
                    {original.genre.slice(0, 2).map((genre) => (
                      <Badge key={genre} variant="secondary" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-1" />
                    Add to Watchlist
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Originals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">All Originals</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {originalContent.map((original) => (
              <div key={original.id} className="flex justify-center">
                <MovieCard movie={original} size="md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Award className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Award-Winning Originals
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Our original content has been recognized by critics and audiences worldwide. 
              From Emmy nominations to Golden Globe wins, Cinely Originals are setting new standards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">15+</div>
                <div className="text-white/80">Award Nominations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">8</div>
                <div className="text-white/80">Awards Won</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">95%</div>
                <div className="text-white/80">Critic Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Originals;
