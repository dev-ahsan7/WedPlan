import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

// /dashboard sends each user to their own dashboard
export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user.role;

  if (role === 'admin') redirect('/dashboard/admin');
  if (role === 'vendor') redirect('/dashboard/vendor');
  redirect('/dashboard/customer');
}
