import Link from 'next/link';
import { SearchX } from 'lucide-react';
import { ServiceCard } from '@/components/services/service-card';
import { FadeIn } from '@/components/shared/fade-in';
import { Button } from '@/components/ui/button';
import { getServices } from '@/lib/services';
import type { Service } from '@/lib/types';

export async function ServiceResults({ query }: { query: string }) {
  let services: Service[] = [];
  try {
    services = await getServices(query);
  } catch {
    return (
      <p className="mt-10 rounded-3xl border border-dashed p-12 text-center text-muted-foreground">
        We could not load the services right now. Please refresh the page.
      </p>
    );
  }

  if (services.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed px-6 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-accent text-primary">
          <SearchX className="size-6" aria-hidden />
        </span>
        <h2 className="mt-5 text-3xl">No services found</h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Try a different word, another location or a wider category.
        </p>
        <Button
          render={<Link href="/services" />}
          nativeButton={false}
          variant="outline"
          className="mt-6 rounded-full px-5"
        >
          Show all services
        </Button>
      </div>
    );
  }

  return (
    <>
      <p className="mt-8 text-sm text-muted-foreground">
        {services.length} {services.length === 1 ? 'service' : 'services'} found
      </p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <FadeIn key={service._id} delay={(index % 3) * 0.08}>
            <ServiceCard service={service} />
          </FadeIn>
        ))}
      </div>
    </>
  );
}
