import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
  routeName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class RouteErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`RouteErrorBoundary caught an error on ${this.props.routeName || 'unknown route'}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <RouteErrorFallback routeName={this.props.routeName} error={this.state.error} />;
    }

    return this.props.children;
  }
}

const RouteErrorFallback = ({ routeName, error }: { routeName?: string; error?: Error }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">
            {routeName ? `Error in ${routeName}` : 'Page Error'}
          </CardTitle>
          <CardDescription>
            This page encountered an error and couldn't load properly. You can try going back or return to the homepage.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {import.meta.env.DEV && error && (
            <div className="rounded-md bg-muted p-3">
              <p className="text-sm font-mono text-muted-foreground">
                {error.message}
              </p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-xs text-muted-foreground cursor-pointer">
                    Stack trace
                  </summary>
                  <pre className="text-xs text-muted-foreground mt-2 whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Button onClick={handleGoBack} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button variant="outline" onClick={handleGoHome} className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Wrapper component to use hooks
const RouteErrorBoundary = ({ children, routeName }: Props) => {
  return <RouteErrorBoundaryClass routeName={routeName}>{children}</RouteErrorBoundaryClass>;
};

export default RouteErrorBoundary;
