import type { Metadata } from 'next';
import { AuthShell } from '@/components/auth/auth-shell';
import { SignUpForm } from '@/components/auth/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return (
    <AuthShell
      image="/images/category-decoration.jpg"
      quote="Every love story deserves a beautiful plan."
    >
      <SignUpForm />
    </AuthShell>
  );
}
