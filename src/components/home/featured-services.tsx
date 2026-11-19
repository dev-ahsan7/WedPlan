import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ServiceCard } from '@/components/services/service-card';
import { FadeIn } from '@/components/shared/fade-in';
import { getServices } from '@/lib/services';
import type { Service } from '@/lib/types';

export async function FeaturedServices() {
  // The home page should still load if the server is down
  let services: Service[] = [];
  let failed = false;
  try {
    services = await getServices('?limit=6');
  } catch {
    failed = true;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <FadeIn className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs tracking-[0.2em] text-primary uppercase">
            Featured wedding services
          </p>
          <h2 className="mt-3 max-w-xl text-4xl leading-tight sm:text-5xl">
            Loved by couples, approved by our team
          </h2>
        </div>
        <Link
          href="/services"
          className="group inline-flex items-center gap-2 text-sm transition-colors hover:text-primary"
        >
          Browse all services
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </FadeIn>

      {failed ? (
        <p className="mt-12 rounded-3xl border border-dashed p-10 text-center text-muted-foreground">
          We could not load the services right now. Please try again in a moment.
        </p>
      ) : services.length === 0 ? (
        <p className="mt-12 rounded-3xl border border-dashed p-10 text-center text-muted-foreground">
          No services yet. Check back soon.
        </p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <FadeIn key={service._id} delay={(index % 3) * 0.1}>
              <ServiceCard service={service} />
            </FadeIn>
          ))}
        </div>
      )}
    </section>
  );
}
