import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { ServiceForm } from '@/components/dashboard/service-form';
import { auth } from '@/lib/auth';
import { getService } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Edit Service',
};

export default async function EditServicePage({
  params,
}: PageProps<'/dashboard/vendor/services/[id]/edit'>) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  const service = await getService(id);

  // Vendors can only edit their own services
  if (!service || service.vendorId !== session?.user.id) {
    notFound();
  }

  return (
    <>
      <Link
        href="/dashboard/vendor/services"
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to my services
      </Link>
      <PageHeader title="Edit service" text={service.serviceName} />
      <ServiceForm service={service} />
    </>
  );
}
