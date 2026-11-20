import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ClipboardList } from 'lucide-react';
import { AdminFilters } from '@/components/dashboard/admin-filters';
import { AdminServiceRow } from '@/components/dashboard/admin-service-row';
import { PageHeader } from '@/components/dashboard/page-header';
import { getAdminServices } from '@/lib/dashboard';

export const metadata: Metadata = {
  title: 'Manage Services',
};

export default async function ManageServicesPage({
  searchParams,
}: PageProps<'/dashboard/admin/services'>) {
  const { search, status } = await searchParams;

  const query = new URLSearchParams();
  if (typeof search === 'string' && search) query.set('search', search);
  if (typeof status === 'string' && status) query.set('status', status);
  const services = await getAdminServices(query.toString() ? `?${query.toString()}` : '');

  return (
    <>
      <PageHeader
        title="Manage services"
        text="Approve new services, change the status of live ones, and remove anything inappropriate."
      />

      <Suspense>
        <AdminFilters
          placeholder="Search by name, category or location"
          filterName="status"
          filterLabel="Filter by status"
          options={[
            { value: '', label: 'All statuses' },
            { value: 'pending', label: 'Pending' },
            { value: 'approved', label: 'Approved' },
            { value: 'rejected', label: 'Rejected' },
          ]}
        />
      </Suspense>

      <p className="mt-6 text-sm text-muted-foreground">
        {services.length} {services.length === 1 ? 'service' : 'services'}
      </p>

      {services.length === 0 ? (
        <div className="mt-3 flex flex-col items-center rounded-3xl border border-dashed px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-accent text-primary">
            <ClipboardList className="size-6" aria-hidden />
          </span>
          <h2 className="mt-5 text-3xl">No services found</h2>
          <p className="mt-2 text-sm text-muted-foreground">Try another search or status.</p>
        </div>
      ) : (
        <ul className="mt-3 divide-y rounded-3xl border bg-card">
          {services.map((service) => (
            <AdminServiceRow key={service._id} service={service} />
          ))}
        </ul>
      )}
    </>
  );
}
