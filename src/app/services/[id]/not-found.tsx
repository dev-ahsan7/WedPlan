import Link from 'next/link';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ServiceNotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-accent text-primary">
        <SearchX className="size-6" aria-hidden />
      </span>
      <h1 className="mt-6 text-4xl sm:text-5xl">Service not found</h1>
      <p className="mt-3 text-muted-foreground">
        This service doesn&apos;t exist, was removed, or isn&apos;t available
        right now.
      </p>
      <Button
        render={<Link href="/services" />}
        nativeButton={false}
        size="lg"
        className="mt-8 h-11 rounded-full px-6"
      >
        Browse other services
      </Button>
    </section>
  );
}
