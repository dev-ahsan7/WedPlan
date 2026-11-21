import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';

// Shown for any address that doesn't exist
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
      <Logo />
      <p className="mt-12 font-heading text-8xl font-semibold text-primary italic sm:text-9xl">
        404
      </p>
      <h1 className="mt-2 text-4xl sm:text-5xl">This page isn&apos;t on the guest list</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you are looking for was moved, removed or never existed. Let&apos;s get you back
        to planning.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button render={<Link href="/" />} nativeButton={false} className="h-11 rounded-full px-6">
          Back to home
        </Button>
        <Button
          render={<Link href="/services" />}
          nativeButton={false}
          variant="outline"
          className="h-11 rounded-full px-6"
        >
          Browse services
        </Button>
      </div>
    </main>
  );
}
