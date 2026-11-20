'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { GoogleButton } from '@/components/auth/google-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Only allow redirects inside the site
  const redirect = searchParams.get('redirect');
  const redirectTo =
    redirect?.startsWith('/') && !redirect.startsWith('//') ? redirect : '/dashboard';

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setIsSubmitting(true);

    const result = await authClient.signIn.email({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    if (result.error) {
      toast.error(result.error.message || 'Wrong email or password.');
      setIsSubmitting(false);
      return;
    }

    toast.success(`Welcome back, ${result.data.user.name.split(' ')[0]}!`);
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div>
      <p className="text-xs tracking-[0.2em] text-primary uppercase">
        Welcome back
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Sign in to WedPlan</h1>
      <p className="mt-2 text-muted-foreground">
        Pick up your wedding plans right where you left them.
      </p>

      <form onSubmit={handleSignIn} className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required className="h-11" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="h-11"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-11 w-full rounded-full"
          disabled={isSubmitting}
        >
          {isSubmitting && <Spinner />}
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton redirectTo={redirectTo} />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        New to WedPlan?{' '}
        <Link href="/sign-up" className="text-foreground underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </div>
  );
}
