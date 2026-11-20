import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inbox } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { StatusTabs } from '@/components/dashboard/status-tabs';
import { VendorBookingCard } from '@/components/dashboard/vendor-booking-card';
import { getVendorBookings } from '@/lib/dashboard';

export const metadata: Metadata = {
  title: 'Booking Requests',
};

export default async function VendorBookingsPage({
  searchParams,
}: PageProps<'/dashboard/vendor/bookings'>) {
  const { status } = await searchParams;
  const bookings = await getVendorBookings();

  const counts: Record<string, number> = { all: bookings.length };
  for (const booking of bookings) {
    counts[booking.status] = (counts[booking.status] ?? 0) + 1;
  }

  const shown =
    typeof status === 'string' && status !== 'all'
      ? bookings.filter((booking) => booking.status === status)
      : bookings;

  return (
    <>
      <PageHeader
        title="Booking requests"
        text="Accept or reject requests from couples. Each request can be answered once."
      />

      <Suspense>
        <StatusTabs counts={counts} />
      </Suspense>

      {shown.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-3xl border border-dashed px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-accent text-primary">
            <Inbox className="size-6" aria-hidden />
          </span>
          <h2 className="mt-5 text-3xl">Nothing here yet</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            When couples send booking requests for your services, they show up here.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {shown.map((booking) => (
            <VendorBookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </>
  );
}
