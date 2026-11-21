'use client';
import { TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Keeps the sidebar visible when one dashboard page fails to load
export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="grid size-14 place-items-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlert className="size-6" aria-hidden />
      </span>
      <h1 className="mt-5 text-3xl sm:text-4xl">We couldn&apos;t load this page</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The server didn&apos;t answer. Please try again in a moment.
      </p>
      <Button onClick={reset} className="mt-6 h-11 rounded-full px-6">
        Try again
      </Button>
    </div>
  );
}
