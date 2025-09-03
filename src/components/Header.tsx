import { useState, useEffect } from "react";
import Logo from "./header/Logo";
import Navigation from "./header/Navigation";
import UserMenu from "./header/UserMenu";
import ActionButtons from "./header/ActionButtons";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Simulate scroll effect for demo
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Logo />
          <Navigation />
        </div>

        {/* Action Buttons and User Menu */}
        <div className="flex items-center space-x-4">
          <ActionButtons />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;