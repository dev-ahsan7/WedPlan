import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { formatDate } from '@/lib/formatDate';
import type { Booking } from '@/lib/types';

type RecentBookingsProps = {
  bookings: Booking[];
  show: 'vendor' | 'customer';
  viewAllHref: string;
};

// The 5 newest booking requests, used on the vendor and customer overviews
export function RecentBookings({ bookings, show, viewAllHref }: RecentBookingsProps) {
  return (
    <div className="mt-8 rounded-3xl border bg-card">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h2 className="text-2xl">Recent booking requests</h2>
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          View all
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      {bookings.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-muted-foreground">
          No booking requests yet.
        </p>
      ) : (
        <ul className="divide-y">
          {bookings.slice(0, 5).map((booking) => {
            const person = show === 'vendor' ? booking.vendor : booking.customer;
            return (
              <li key={booking._id} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {booking.service?.serviceName ?? 'Removed service'}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {person?.businessName || person?.name} · {formatDate(booking.eventDate)} ·{' '}
                    {booking.eventLocation}
                  </p>
                </div>
                <StatusBadge status={booking.status} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
