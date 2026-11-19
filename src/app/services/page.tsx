import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ServiceFilters } from '@/components/services/service-filters';
import { ServiceResults } from '@/components/services/service-results';
import { ServicesSkeleton } from '@/components/services/services-skeleton';
import { getLocations } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Browse Services',
};

export default async function BrowseServicesPage({
  searchParams,
}: PageProps<'/services'>) {
  const params = await searchParams;

  // Only pass the filters the server knows about
  const query = new URLSearchParams();
  for (const key of ['search', 'category', 'location', 'sort']) {
    const value = params[key];
    if (typeof value === 'string' && value) {
      query.set(key, value);
    }
  }
  const queryString = query.toString() ? `?${query.toString()}` : '';

  const locations = await getLocations();

  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-primary uppercase">
        Browse services
      </p>
      <h1 className="mt-3 text-5xl sm:text-6xl">
        Find your <span className="text-primary italic">perfect</span> team
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Every service here has been checked by our team. Search, filter by
        category or city, and sort by price.
      </p>

      <div className="mt-8">
        <Suspense>
          <ServiceFilters locations={locations} />
        </Suspense>
      </div>

      {/* A new key shows the loading cards again every time a filter changes */}
      <Suspense key={queryString} fallback={<ServicesSkeleton />}>
        <ServiceResults query={queryString} />
      </Suspense>
    </section>
  );
}
