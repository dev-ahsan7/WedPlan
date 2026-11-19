// Grey placeholder cards while services are loading
export function ServicesSkeleton() {
  return (
    <div
      className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="Loading services"
    >
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="overflow-hidden rounded-3xl border bg-card">
          <div className="aspect-[4/3] animate-pulse bg-muted" />
          <div className="space-y-3 p-5">
            <div className="h-6 w-3/4 animate-pulse rounded-full bg-muted" />
            <div className="h-4 w-1/3 animate-pulse rounded-full bg-muted" />
            <div className="h-10 animate-pulse rounded-full bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
