export function TVShowSkeleton() {
  return (
    <div className="border border-border rounded-lg overflow-hidden shadow-md bg-card animate-pulse">
      <div className="w-full h-80 bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-muted rounded-md w-3/4" />
        <div className="h-4 bg-muted rounded-md w-1/2" />
      </div>
    </div>
  );
}

export function TVShowGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <TVShowSkeleton key={i} />
        ))}
    </div>
  );
}
