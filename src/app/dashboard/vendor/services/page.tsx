import type { Metadata } from 'next';
import Link from 'next/link';
import { Store } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { VendorServiceRow } from '@/components/dashboard/vendor-service-row';
import { Button } from '@/components/ui/button';
import { getVendorServices } from '@/lib/dashboard';

export const metadata: Metadata = {
  title: 'My Services',
};

export default async function MyServicesPage() {
  const services = await getVendorServices();

  return (
    <>
      <PageHeader
        title="My services"
        text="See the approval status of each service and choose which ones customers can find."
      >
        <Button
          render={<Link href="/dashboard/vendor/add-service" />}
          nativeButton={false}
          className="h-10 rounded-full px-5"
        >
          Add a service
        </Button>
      </PageHeader>

      {services.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-accent text-primary">
            <Store className="size-6" aria-hidden />
          </span>
          <h2 className="mt-5 text-3xl">No services yet</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Add your first service and it will go live once an admin approves it.
          </p>
        </div>
      ) : (
        <ul className="mt-8 divide-y rounded-3xl border bg-card">
          {services.map((service) => (
            <VendorServiceRow key={service._id} service={service} />
          ))}
        </ul>
      )}
    </>
  );
}
