import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Account Blocked',
};

export default function BlockedPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-destructive/10 text-destructive">
        <ShieldAlert className="size-6" aria-hidden />
      </span>
      <h1 className="mt-6 text-4xl sm:text-5xl">Your account is blocked</h1>
      <p className="mt-3 text-muted-foreground">
        An admin has blocked this account, so the dashboard and booking features
        are turned off. If you think this is a mistake, write to us at{' '}
        <a href="mailto:hello@wedplan.com" className="text-foreground underline underline-offset-4">
          hello@wedplan.com
        </a>
        .
      </p>
      <Button
        render={<Link href="/" />}
        nativeButton={false}
        size="lg"
        className="mt-8 h-11 rounded-full px-6"
      >
        Back to home
      </Button>
    </section>
  );
}
