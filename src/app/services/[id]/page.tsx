import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Crown, MapPin, Tag } from 'lucide-react';
import { BookingCard } from '@/components/services/booking-card';
import { ServiceGallery } from '@/components/services/service-gallery';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { auth } from '@/lib/auth';
import { formatPrice, getService } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Service Details',
};

export default async function ServiceDetailsPage({
  params,
}: PageProps<'/services/[id]'>) {
  const { id } = await params;
  const service = await getService(id);
  if (!service) {
    notFound();
  }

  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  const isOwner = user?.id === service.vendorId;
  const isPublic = service.status === 'approved' && service.isActive;
  const vendorName = service.vendor.businessName || service.vendor.name;

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 pb-16 sm:px-6">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to all services
      </Link>

      {/* Only the owner or an admin can see a service that isn't live */}
      {!isPublic && (
        <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {service.status !== 'approved'
            ? `This service is ${service.status}, so customers can't see it yet.`
            : 'This service is hidden, so customers can\'t see it right now.'}
        </p>
      )}

      <div className="mt-6">
        <p className="text-xs tracking-[0.2em] text-primary uppercase">
          {service.category}
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-tight sm:text-6xl">
          {service.serviceName}
        </h1>
        <p className="mt-3 flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="size-4" aria-hidden />
          {service.location}
        </p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <ServiceGallery images={service.images} name={service.serviceName} />

          <h2 className="mt-10 text-3xl">About this service</h2>
          <p className="mt-3 leading-7 whitespace-pre-line text-muted-foreground">
            {service.description}
          </p>

          <dl className="mt-8 grid gap-4 rounded-3xl border bg-card p-5 sm:grid-cols-3">
            <div>
              <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Tag className="size-3.5" aria-hidden />
                Category
              </dt>
              <dd className="mt-1 text-sm">{service.category}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5" aria-hidden />
                Location
              </dt>
              <dd className="mt-1 text-sm">{service.location}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="size-3.5" aria-hidden />
                Listed on
              </dt>
              <dd className="mt-1 text-sm">
                {new Date(service.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </dd>
            </div>
          </dl>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="mt-1 font-heading text-5xl font-semibold text-primary">
              {formatPrice(service.price)}
            </p>
            <BookingCard
              role={user?.role}
              isOwner={isOwner}
              isPublic={isPublic}
              serviceId={service._id}
            />
          </div>

          <div className="rounded-3xl border bg-card p-6">
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Offered by
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar size="lg">
                <AvatarImage src={service.vendor.image ?? undefined} alt="" />
                <AvatarFallback>{vendorName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate font-medium">{vendorName}</p>
                {service.vendor.businessName && (
                  <p className="truncate text-sm text-muted-foreground">
                    {service.vendor.name}
                  </p>
                )}
              </div>
            </div>
            {service.vendor.subscriptionPlan === 'premium' && (
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">
                <Crown className="size-3.5" aria-hidden />
                Premium vendor
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
