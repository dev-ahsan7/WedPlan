import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { CalendarCheck, CalendarX, Hourglass, ListChecks } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { RecentBookings } from '@/components/dashboard/recent-bookings';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { getMyBookings } from '@/lib/dashboard';

export const metadata: Metadata = {
  title: 'My Dashboard',
};

export default async function CustomerOverviewPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const bookings = await getMyBookings();

  const countBy = (status: string) =>
    bookings.filter((booking) => booking.status === status).length;

  return (
    <>
      <PageHeader
        title={`Welcome, ${session?.user.name.split(' ')[0]}`}
        text="Keep track of every booking request in one place."
      >
        <Button
          render={<Link href="/services" />}
          nativeButton={false}
          className="h-10 rounded-full px-5"
        >
          Find services
        </Button>
      </PageHeader>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard label="Total requests" value={bookings.length} icon={ListChecks} />
        <StatCard label="Pending" value={countBy('pending')} icon={Hourglass} />
        <StatCard label="Accepted" value={countBy('accepted')} icon={CalendarCheck} />
        <StatCard label="Rejected" value={countBy('rejected')} icon={CalendarX} />
      </div>

      <RecentBookings
        bookings={bookings}
        show="vendor"
        viewAllHref="/dashboard/customer/bookings"
      />
    </>
  );
}
