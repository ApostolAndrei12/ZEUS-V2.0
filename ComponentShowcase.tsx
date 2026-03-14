import { Skeleton } from './ui/skeleton';

export function DashboardLayoutSkeleton() {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top navbar skeleton */}
      <div className="h-12 bg-[#005C4B] flex items-center px-4 gap-4 shrink-0">
        <Skeleton className="h-4 w-20 bg-white/20 rounded" />
        <Skeleton className="h-7 w-20 bg-white/20 rounded-md" />
        <Skeleton className="h-7 w-20 bg-white/20 rounded-md" />
        <Skeleton className="h-7 w-20 bg-white/20 rounded-md" />
        <Skeleton className="h-7 w-20 bg-white/20 rounded-md" />
        <div className="flex-1" />
        <Skeleton className="h-7 w-7 rounded-full bg-white/20" />
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 p-4 space-y-4">
        <Skeleton className="h-10 w-48 rounded-lg" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </div>
  );
}
