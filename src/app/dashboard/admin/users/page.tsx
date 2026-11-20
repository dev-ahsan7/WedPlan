import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Users } from 'lucide-react';
import { AdminFilters } from '@/components/dashboard/admin-filters';
import { AdminUserRow } from '@/components/dashboard/admin-user-row';
import { PageHeader } from '@/components/dashboard/page-header';
import { getAdminUsers } from '@/lib/dashboard';

export const metadata: Metadata = {
  title: 'Manage Users',
};

export default async function ManageUsersPage({
  searchParams,
}: PageProps<'/dashboard/admin/users'>) {
  const { search, role } = await searchParams;

  const query = new URLSearchParams();
  if (typeof search === 'string' && search) query.set('search', search);
  if (typeof role === 'string' && role) query.set('role', role);
  const users = await getAdminUsers(query.toString() ? `?${query.toString()}` : '');

  return (
    <>
      <PageHeader
        title="Manage users"
        text="Search people, check their details, and block accounts that break the rules."
      />

      <Suspense>
        <AdminFilters
          placeholder="Search by name or email"
          filterName="role"
          filterLabel="Filter by role"
          options={[
            { value: '', label: 'All roles' },
            { value: 'customer', label: 'Customers' },
            { value: 'vendor', label: 'Vendors' },
            { value: 'admin', label: 'Admins' },
          ]}
        />
      </Suspense>

      <p className="mt-6 text-sm text-muted-foreground">
        {users.length} {users.length === 1 ? 'user' : 'users'}
      </p>

      {users.length === 0 ? (
        <div className="mt-3 flex flex-col items-center rounded-3xl border border-dashed px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-accent text-primary">
            <Users className="size-6" aria-hidden />
          </span>
          <h2 className="mt-5 text-3xl">No users found</h2>
          <p className="mt-2 text-sm text-muted-foreground">Try another name, email or role.</p>
        </div>
      ) : (
        <ul className="mt-3 divide-y rounded-3xl border bg-card">
          {users.map((user) => (
            <AdminUserRow key={user._id} user={user} />
          ))}
        </ul>
      )}
    </>
  );
}
