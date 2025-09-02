import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import PageLoader from "@/components/PageLoader";
import OfflineIndicator from "@/components/OfflineIndicator";
import CookieBanner from "@/components/CookieBanner";
import { initializeTracking } from "@/utils/tracking";
import { AuthProvider } from "@/contexts/AuthContext";
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Config } from "@/lib/auth0-config";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthRedirectHandler from "@/components/AuthRedirectHandler";

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const WatchFree = lazy(() => import("./pages/WatchFree"));
const Movies = lazy(() => import("./pages/Movies"));
const TVShows = lazy(() => import("./pages/TVShows"));
const Originals = lazy(() => import("./pages/Originals"));
const Trending = lazy(() => import("./pages/Trending"));
const Help = lazy(() => import("./pages/Help"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

// New authenticated pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Watch = lazy(() => import("./pages/Watch"));
const Account = lazy(() => import("./pages/Account"));

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize tracking when app loads
    initializeTracking();
  }, []);

  return (
  <HelmetProvider>
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={auth0Config.authorizationParams}
      useRefreshTokens={auth0Config.useRefreshTokens}
      cacheLocation={auth0Config.cacheLocation}
    >
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <OfflineIndicator />
            <CookieBanner />
            <BrowserRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
              <AuthRedirectHandler />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/watch-free" element={<WatchFree />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/tv-shows" element={<TVShows />} />
                  <Route path="/originals" element={<Originals />} />
                  <Route path="/trending" element={<Trending />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  
                  {/* Authenticated routes */}
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
                  <Route path="/watch/:slug" element={<ProtectedRoute><Watch /></ProtectedRoute>} />
                  <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Auth0Provider>
  </HelmetProvider>
  );
};

export default App;
