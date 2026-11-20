import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { Crown } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { ServiceForm } from '@/components/dashboard/service-form';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { getVendorServices } from '@/lib/dashboard';

export const metadata: Metadata = {
  title: 'Add Service',
};

export default async function AddServicePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const services = await getVendorServices();

  const isPremium = session?.user.subscriptionPlan === 'premium';
  const activeCount = services.filter(
    (service) => service.isActive && service.status !== 'rejected',
  ).length;
  const isAtLimit = !isPremium && activeCount >= 3;

  return (
    <>
      <PageHeader
        title="Add a service"
        text="Tell couples what you offer. Clear photos and a good description get more requests."
      />

      {/* Free vendors can have 3 active services. The server checks this too. */}
      {isAtLimit ? (
        <div className="mt-8 flex flex-col items-start gap-4 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:flex-row sm:items-center">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-800">
            <Crown className="size-5" aria-hidden />
          </span>
          <div className="flex-1">
            <p className="font-medium text-amber-900">You have used all 3 free service slots</p>
            <p className="mt-1 text-sm text-amber-900/80">
              Hide one of your services, or upgrade to Premium to add as many as you like.
            </p>
          </div>
          <Button
            render={<Link href="/dashboard/vendor/subscription" />}
            nativeButton={false}
            className="h-10 rounded-full px-5"
          >
            Upgrade to Premium
          </Button>
        </div>
      ) : (
        <ServiceForm />
      )}
    </>
  );
}
