import type { Metadata } from 'next';
import Link from 'next/link';
import { CircleX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Payment Cancelled',
};

export default function PaymentCancelPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-muted text-muted-foreground">
        <CircleX className="size-7" aria-hidden />
      </span>
      <h1 className="mt-6 text-4xl sm:text-5xl">Payment cancelled</h1>
      <p className="mt-3 text-muted-foreground">
        No money was taken and you are still on the Free plan. You can upgrade whenever you are
        ready.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          render={<Link href="/dashboard/vendor/subscription" />}
          nativeButton={false}
          className="h-11 rounded-full px-6"
        >
          Back to plans
        </Button>
        <Button
          render={<Link href="/dashboard/vendor" />}
          nativeButton={false}
          variant="outline"
          className="h-11 rounded-full px-6"
        >
          Go to dashboard
        </Button>
      </div>
    </section>
  );
}
