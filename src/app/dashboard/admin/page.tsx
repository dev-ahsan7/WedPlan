import type { Metadata } from 'next';
import Link from 'next/link';
import { ClipboardList, Hourglass, Receipt, Store, UserRound, Users } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { getAdminOverview } from '@/lib/dashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

export default async function AdminOverviewPage() {
  const overview = await getAdminOverview();

  return (
    <>
      <PageHeader title="Admin overview" text="A quick look at the whole platform.">
        {overview.pendingServices > 0 && (
          <Button
            render={<Link href="/dashboard/admin/services?status=pending" />}
            nativeButton={false}
            className="h-10 rounded-full px-5"
          >
            Review {overview.pendingServices} pending{' '}
            {overview.pendingServices === 1 ? 'service' : 'services'}
          </Button>
        )}
      </PageHeader>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
        <StatCard label="Registered users" value={overview.totalUsers} icon={Users} />
        <StatCard label="Vendors" value={overview.totalVendors} icon={Store} />
        <StatCard label="Customers" value={overview.totalCustomers} icon={UserRound} />
        <StatCard label="Total services" value={overview.totalServices} icon={ClipboardList} />
        <StatCard label="Pending services" value={overview.pendingServices} icon={Hourglass} />
        <StatCard label="Transactions" value={overview.totalTransactions} icon={Receipt} />
      </div>
    </>
  );
}
