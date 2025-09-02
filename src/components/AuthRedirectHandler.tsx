import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const AuthRedirectHandler = () => {
  const { isAuthenticated, appState } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Only redirect if we're authenticated, haven't redirected yet, and we're on the home page
    if (isAuthenticated && !hasRedirected.current && location.pathname === '/') {
      hasRedirected.current = true;
      
      // Handle redirect after successful authentication
      if (appState?.returnTo) {
        navigate(appState.returnTo);
      } else {
        // Default redirect to dashboard
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, appState, navigate, location.pathname]);

  return null; // This component doesn't render anything
};

export default AuthRedirectHandler;
