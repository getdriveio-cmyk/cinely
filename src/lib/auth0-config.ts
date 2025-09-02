export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || 'dev-ifn3ugjt57otm5sy.us.auth0.com',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || '2pqWILG5wJcfqJVIB20YHmRItjuDBPxt',
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: 'https://cinely.vercel.app/api', // Optional: your API audience
    scope: 'openid profile email'
  },
  useRefreshTokens: true,
  cacheLocation: 'localstorage' as const,
};
