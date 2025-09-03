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
import ProtectedRoute from "@/components/ProtectedRoute";
import MockLogin from "@/components/MockLogin";
import ErrorBoundary from "@/components/ErrorBoundary";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";
import SkipNavigation from "@/components/SkipNavigation";


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
    <ErrorBoundary>
      <HelmetProvider>
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
                <SkipNavigation />
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<RouteErrorBoundary routeName="Home"><Index /></RouteErrorBoundary>} />
                    <Route path="/watch-free" element={<RouteErrorBoundary routeName="Watch Free"><WatchFree /></RouteErrorBoundary>} />
                    <Route path="/movies" element={<RouteErrorBoundary routeName="Movies"><Movies /></RouteErrorBoundary>} />
                    <Route path="/tv-shows" element={<RouteErrorBoundary routeName="TV Shows"><TVShows /></RouteErrorBoundary>} />
                    <Route path="/originals" element={<RouteErrorBoundary routeName="Originals"><Originals /></RouteErrorBoundary>} />
                    <Route path="/trending" element={<RouteErrorBoundary routeName="Trending"><Trending /></RouteErrorBoundary>} />
                    <Route path="/help" element={<RouteErrorBoundary routeName="Help"><Help /></RouteErrorBoundary>} />
                    <Route path="/contact" element={<RouteErrorBoundary routeName="Contact"><Contact /></RouteErrorBoundary>} />
                    <Route path="/privacy" element={<RouteErrorBoundary routeName="Privacy"><Privacy /></RouteErrorBoundary>} />
                    <Route path="/terms" element={<RouteErrorBoundary routeName="Terms"><Terms /></RouteErrorBoundary>} />
                    
                    {/* Mock login route */}
                    <Route path="/login" element={<RouteErrorBoundary routeName="Login"><MockLogin /></RouteErrorBoundary>} />
                    
                    {/* Authenticated routes */}
                    <Route path="/dashboard" element={<RouteErrorBoundary routeName="Dashboard"><ProtectedRoute><Dashboard /></ProtectedRoute></RouteErrorBoundary>} />
                    <Route path="/onboarding" element={<RouteErrorBoundary routeName="Onboarding"><ProtectedRoute><Onboarding /></ProtectedRoute></RouteErrorBoundary>} />
                    <Route path="/watch/:slug" element={<RouteErrorBoundary routeName="Watch"><ProtectedRoute><Watch /></ProtectedRoute></RouteErrorBoundary>} />
                    <Route path="/account" element={<RouteErrorBoundary routeName="Account"><ProtectedRoute><Account /></ProtectedRoute></RouteErrorBoundary>} />
                    
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<RouteErrorBoundary routeName="Not Found"><NotFound /></RouteErrorBoundary>} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
