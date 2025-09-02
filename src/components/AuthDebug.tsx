import { useAuth0 } from '@auth0/auth0-react';
import { auth0Config } from '@/lib/auth0-config';

const AuthDebug = () => {
  const { 
    isAuthenticated, 
    isLoading, 
    error, 
    user,
    loginWithRedirect,
    logout 
  } = useAuth0();

  const handleTestLogin = () => {
    console.log('Auth0 Config:', auth0Config);
    console.log('Environment:', import.meta.env.MODE);
    console.log('Auth0 Domain:', import.meta.env.VITE_AUTH0_DOMAIN);
    console.log('Auth0 Client ID:', import.meta.env.VITE_AUTH0_CLIENT_ID);
    
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin,
        appState: {
          returnTo: '/dashboard'
        }
      },
    }).catch(console.error);
  };

  if (import.meta.env.MODE === 'production') {
    return (
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm">
        <h3 className="font-bold mb-2">Auth Debug (Production)</h3>
        <div className="space-y-1">
          <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
          <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
          <div>Error: {error ? error.message : 'None'}</div>
          <div>User: {user ? user.name : 'None'}</div>
          <div>Domain: {auth0Config.domain}</div>
          <div>Client ID: {auth0Config.clientId}</div>
          <div>Redirect URI: {auth0Config.authorizationParams.redirect_uri}</div>
        </div>
        <button 
          onClick={handleTestLogin}
          className="mt-2 bg-blue-600 px-2 py-1 rounded text-xs"
        >
          Test Login
        </button>
      </div>
    );
  }

  return null;
};

export default AuthDebug;
