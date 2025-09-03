import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const { user } = useAuth();

  return (
    <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
      <a href="/" className="text-foreground hover:text-primary transition-colors">Home</a>
      <a href="/movies" className="text-muted-foreground hover:text-foreground transition-colors">Movies</a>
      <a href="/tv-shows" className="text-muted-foreground hover:text-foreground transition-colors">TV Shows</a>
      <a href="/watch-free" className="text-muted-foreground hover:text-foreground transition-colors">Watch Free</a>
      {user && (
        <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</a>
      )}
    </nav>
  );
};

export default Navigation;
