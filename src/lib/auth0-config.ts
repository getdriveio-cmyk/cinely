export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || 'dev-ifn3ugjt57otm5sy.us.auth0.com',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || '2pqWILG5wJcfqJVIB20YHmRItjuDBPxt',
  authorizationParams: {
    redirect_uri: window.location.origin,
    scope: 'openid profile email'
  },
  useRefreshTokens: true,
  cacheLocation: 'localstorage' as const,
};

// Helper function to get the current environment
export const getCurrentEnvironment = () => {
  const origin = window.location.origin;
  
  if (origin.includes('localhost')) {
    return 'development';
  } else if (origin.includes('vercel.app')) {
    return 'production';
  } else {
    return 'unknown';
  }
};

// Helper function to get the appropriate API base URL
// Note: This is for future API integration - not needed for basic OAuth
export const getApiBaseUrl = () => {
  const env = getCurrentEnvironment();
  
  switch (env) {
    case 'development':
      return 'http://localhost:8080/api';
    case 'production':
      return 'https://cinely.vercel.app/api';
    default:
      return window.location.origin + '/api';
  }
};
