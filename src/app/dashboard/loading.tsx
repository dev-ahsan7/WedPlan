import { Spinner } from '@/components/ui/spinner';

// Shown inside the dashboard while a page loads its data
export default function DashboardLoading() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
        <Spinner className="size-6 text-primary" />
        Loading your dashboard...
      </div>
    </div>
  );
}
