import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Page Not Found - 404 Error"
        description="The page you're looking for doesn't exist. Return to Cinely's homepage to continue streaming your favorite movies and TV shows."
        noindex={true}
        nofollow={true}
      />
      
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Oops! Page not found</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
