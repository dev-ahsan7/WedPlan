import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { PageHeader } from '@/components/dashboard/page-header';
import { ProfileForm } from '@/components/dashboard/profile-form';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Profile Settings',
};

export default async function ProfileSettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect('/sign-in?redirect=/dashboard/profile');
  }

  return (
    <>
      <PageHeader
        title="Profile settings"
        text="Update your name and photo. Vendors can also change their business name."
      />
      <ProfileForm user={session.user} />
    </>
  );
}
