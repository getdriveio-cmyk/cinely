import { useEffect, useRef } from 'react';

const SkipNavigation = () => {
  const skipRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Focus the skip link when it becomes visible
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        // First tab press - focus skip link
        if (skipRef.current && document.activeElement === document.body) {
          skipRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sr-only focus-within:not-sr-only">
      <nav aria-label="Skip navigation">
        <ul className="flex flex-col gap-2 p-4 bg-background border-b border-border">
          <li>
            <a
              ref={skipRef}
              href="#main-content"
              onClick={(e) => handleSkipClick(e, 'main-content')}
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Skip to main content
            </a>
          </li>
          <li>
            <a
              href="#navigation"
              onClick={(e) => handleSkipClick(e, 'navigation')}
              className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Skip to navigation
            </a>
          </li>
          <li>
            <a
              href="#footer"
              onClick={(e) => handleSkipClick(e, 'footer')}
              className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Skip to footer
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SkipNavigation;
