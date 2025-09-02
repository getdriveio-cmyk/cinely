import { Skeleton } from "@/components/ui/skeleton";

const PageLoader = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section Skeleton */}
          <div className="text-center mb-12">
            <Skeleton className="h-16 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-80 mx-auto mb-8" />
            <div className="flex justify-center gap-4">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>

          {/* Content Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
