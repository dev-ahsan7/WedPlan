'use client';
import Link from 'next/link';
import { TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Shown when a page fails to load, for example when the server is down
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-[70vh] flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlert className="size-7" aria-hidden />
      </span>
      <h1 className="mt-6 text-4xl sm:text-5xl">Something went wrong</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        We couldn&apos;t load this page. Please check your connection and try again.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset} className="h-11 rounded-full px-6">
          Try again
        </Button>
        <Button
          render={<Link href="/" />}
          nativeButton={false}
          variant="outline"
          className="h-11 rounded-full px-6"
        >
          Back to home
        </Button>
      </div>
    </main>
  );
}
