import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendarHeart } from 'lucide-react';
import { CustomerBookingCard } from '@/components/dashboard/customer-booking-card';
import { PageHeader } from '@/components/dashboard/page-header';
import { StatusTabs } from '@/components/dashboard/status-tabs';
import { Button } from '@/components/ui/button';
import { getMyBookings } from '@/lib/dashboard';

export const metadata: Metadata = {
  title: 'My Bookings',
};

export default async function MyBookingsPage({
  searchParams,
}: PageProps<'/dashboard/customer/bookings'>) {
  const { status } = await searchParams;
  const bookings = await getMyBookings();

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
        title="My bookings"
        text="Every booking request you have sent, and what the vendor said."
      />

      <Suspense>
        <StatusTabs counts={counts} />
      </Suspense>

      {shown.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-3xl border border-dashed px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-accent text-primary">
            <CalendarHeart className="size-6" aria-hidden />
          </span>
          <h2 className="mt-5 text-3xl">No bookings here</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Find a photographer, venue or florist you love and send your first request.
          </p>
          <Button
            render={<Link href="/services" />}
            nativeButton={false}
            className="mt-6 rounded-full px-5"
          >
            Browse services
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {shown.map((booking) => (
            <CustomerBookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </>
  );
}
