import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { CalendarCheck, Crown, Hourglass, Store, Zap } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { RecentBookings } from '@/components/dashboard/recent-bookings';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { getVendorBookings, getVendorServices } from '@/lib/dashboard';

export const metadata: Metadata = {
  title: 'Vendor Dashboard',
};

export default async function VendorOverviewPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const [services, bookings] = await Promise.all([
    getVendorServices(),
    getVendorBookings(),
  ]);

  const isPremium = session?.user.subscriptionPlan === 'premium';
  // Active means turned on and not rejected, the same rule the free plan limit uses
  const activeServices = services.filter(
    (service) => service.isActive && service.status !== 'rejected',
  ).length;
  const pendingRequests = bookings.filter((booking) => booking.status === 'pending').length;
  const acceptedBookings = bookings.filter((booking) => booking.status === 'accepted').length;

  return (
    <>
      <PageHeader
        title={`Welcome, ${session?.user.name.split(' ')[0]}`}
        text={
          session?.user.businessName
            ? `Here is how ${session.user.businessName} is doing.`
            : 'Here is how your business is doing.'
        }
      >
        <Button
          render={<Link href="/dashboard/vendor/add-service" />}
          nativeButton={false}
          className="h-10 rounded-full px-5"
        >
          Add a service
        </Button>
      </PageHeader>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3 2xl:grid-cols-5">
        <StatCard label="Total services" value={services.length} icon={Store} />
        <StatCard
          label="Active services"
          value={activeServices}
          icon={Zap}
          hint={isPremium ? 'Unlimited on Premium' : `${activeServices} of 3 on the Free plan`}
        />
        <StatCard label="Pending requests" value={pendingRequests} icon={Hourglass} />
        <StatCard label="Accepted bookings" value={acceptedBookings} icon={CalendarCheck} />
        <StatCard
          label="Current plan"
          value={isPremium ? 'Premium' : 'Free'}
          icon={Crown}
          hint={isPremium ? 'Thanks for upgrading' : 'Upgrade for unlimited services'}
        />
      </div>

      <RecentBookings
        bookings={bookings}
        show="customer"
        viewAllHref="/dashboard/vendor/bookings"
      />
    </>
  );
}
