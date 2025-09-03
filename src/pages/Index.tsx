import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import MovieRail from "@/components/MovieRail";
import SEO from "@/components/SEO";

import { movieRails } from "@/data/mockMovies";
import { getWebsiteStructuredData, getOrganizationStructuredData } from "@/utils/structuredData";

const Index = () => {
  const websiteStructuredData = getWebsiteStructuredData();
  const organizationStructuredData = getOrganizationStructuredData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Cinely - Your Premium Streaming Destination"
        description="Stream thousands of movies and shows with Cinely. Watch free with ads or upgrade to our premium ad-free experience. Your cinematic journey starts here."
        keywords={[
          "streaming",
          "movies",
          "TV shows",
          "free streaming",
          "premium streaming",
          "online movies",
          "watch movies online",
          "streaming platform",
          "cinema",
          "entertainment"
        ]}
        canonical="/"
        structuredData={[websiteStructuredData, organizationStructuredData]}
        googleAdSense="ca-pub-8689420229072543"
      />
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main id="main-content" role="main" aria-label="Main content">
        {/* Hero Section */}
        <section aria-label="Featured content">
          <HeroBanner />
        </section>

        {/* Movie Rails */}
        <section className="relative z-10 -mt-32" aria-label="Movie collections">
          {movieRails.map((rail, index) => (
            <MovieRail 
              key={index}
              title={rail.title}
              movies={rail.movies}
              size={index === 0 ? "lg" : "md"}
            />
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-card/50 border-t border-border mt-16" role="contentinfo" aria-label="Site footer">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
                Cinely
              </h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Your premium streaming destination. Watch thousands of movies and shows with ads, 
                or upgrade to our ad-free experience.
              </p>
              <div className="flex gap-4">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                  Free with Ads
                </span>
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                  Premium Ad-Free
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="font-semibold mb-4">Browse</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/movies" className="hover:text-foreground transition-colors">Movies</a></li>
                <li><a href="/tv-shows" className="hover:text-foreground transition-colors">TV Shows</a></li>
                <li><a href="/originals" className="hover:text-foreground transition-colors">Originals</a></li>
                <li><a href="/trending" className="hover:text-foreground transition-colors">Trending</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/help" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="/contact" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-muted-foreground text-sm">
            <p>&copy; 2024 Cinely. All rights reserved.</p>
            <p>Built with ❤️ for movie lovers everywhere</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;