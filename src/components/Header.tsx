import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Bell, User, Menu, LogOut, Settings, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut, signIn } = useAuth();
  const navigate = useNavigate();

  // Simulate scroll effect for demo
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const handleSignIn = async () => {
    // Mock sign in - in real app, this would open a sign in modal
    const email = prompt('Enter your email for demo login:');
    if (email) {
      try {
        await signIn(email);
        navigate('/dashboard');
      } catch (error) {
        console.error('Sign in error:', error);
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md border-b border-border' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <h1 
            className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate('/')}
          >
            Cinely
          </h1>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="/movies" className="text-muted-foreground hover:text-foreground transition-colors">Movies</a>
            <a href="/tv-shows" className="text-muted-foreground hover:text-foreground transition-colors">TV Shows</a>
            <a href="/watch-free" className="text-muted-foreground hover:text-foreground transition-colors">Watch Free</a>
            {user && (
              <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</a>
            )}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Bell className="h-4 w-4" />
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>
                      {user.name?.charAt(0) || <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <Play className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/account')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleSignIn}>
              <User className="h-4 w-4" />
            </Button>
          )}
          
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;