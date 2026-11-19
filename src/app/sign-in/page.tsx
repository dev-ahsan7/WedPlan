import { Suspense } from 'react';
import type { Metadata } from 'next';
import { AuthShell } from '@/components/auth/auth-shell';
import { SignInForm } from '@/components/auth/sign-in-form';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function SignInPage() {
  return (
    <AuthShell
      image="/images/category-fashion.jpg"
      quote="Welcome back. Your big day is waiting."
    >
      {/* The form reads ?redirect= from the URL */}
      <Suspense>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}
