import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { auth } from '@/lib/auth';

export default async function DashboardLayout({ children }: LayoutProps<'/dashboard'>) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect('/sign-in?redirect=/dashboard');
  }

  const { user } = session;
  const role = user.role === 'admin' || user.role === 'vendor' ? user.role : 'customer';

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <DashboardNav role={role} user={user} />
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}
