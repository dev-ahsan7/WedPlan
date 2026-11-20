'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CircleAlert, CircleCheck, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/lib/formatDate';
import { getPaymentStatus, type PaymentStatus as Status } from '@/lib/subscription';

const MAX_CHECKS = 15;

// Premium is turned on by Stripe's webhook, not by landing on this page.
// So this page asks the server until the webhook has confirmed the payment.
export function PaymentStatus() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [payment, setPayment] = useState<Status | null>(null);
  const [checks, setChecks] = useState(0);
  const [error, setError] = useState(sessionId ? '' : 'This payment link is missing its details.');

  useEffect(() => {
    if (!sessionId || error || payment?.status === 'paid' || checks >= MAX_CHECKS) return;

    const timer = setTimeout(async () => {
      try {
        setPayment(await getPaymentStatus(sessionId));
      } catch (err) {
        setError((err as Error).message);
      }
      setChecks(checks + 1);
    }, checks === 0 ? 0 : 2000);

    return () => clearTimeout(timer);
  }, [sessionId, error, payment, checks]);

  if (error) {
    return (
      <StatusLayout icon={<CircleAlert className="size-7" aria-hidden />} tone="error" title="We couldn't find this payment">
        <p>{error}</p>
      </StatusLayout>
    );
  }

  if (payment?.status === 'paid') {
    return (
      <StatusLayout icon={<CircleCheck className="size-7" aria-hidden />} tone="success" title="You're Premium now!">
        <p>
          Your payment of ${payment.amount.toFixed(2)} was confirmed by Stripe. You can now add as many
          services as you like.
        </p>
        {payment.subscriptionExpiresAt && (
          <p className="mt-2 text-sm">Renews on {formatDate(payment.subscriptionExpiresAt)}.</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            render={<Link href="/dashboard/vendor/add-service" />}
            nativeButton={false}
            className="h-11 rounded-full px-6"
          >
            Add a service
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
      </StatusLayout>
    );
  }

  if (checks >= MAX_CHECKS) {
    return (
      <StatusLayout icon={<Crown className="size-7" aria-hidden />} tone="waiting" title="Almost there">
        <p>
          Stripe is still confirming your payment. This usually takes a few seconds. Refresh this
          page in a moment, or check your Subscription page.
        </p>
        <Button
          render={<Link href="/dashboard/vendor/subscription" />}
          nativeButton={false}
          variant="outline"
          className="mt-8 h-11 rounded-full px-6"
        >
          Open Subscription
        </Button>
      </StatusLayout>
    );
  }

  return (
    <StatusLayout icon={<Spinner className="size-7" />} tone="waiting" title="Confirming your payment">
      <p>Please keep this page open while Stripe confirms your payment.</p>
    </StatusLayout>
  );
}

type StatusLayoutProps = {
  icon: React.ReactNode;
  tone: 'success' | 'waiting' | 'error';
  title: string;
  children: React.ReactNode;
};

const toneStyles = {
  success: 'bg-emerald-100 text-emerald-700',
  waiting: 'bg-accent text-primary',
  error: 'bg-destructive/10 text-destructive',
};

function StatusLayout({ icon, tone, title, children }: StatusLayoutProps) {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <span className={`grid size-16 place-items-center rounded-full ${toneStyles[tone]}`}>{icon}</span>
      <h1 className="mt-6 text-4xl sm:text-5xl">{title}</h1>
      <div className="mt-3 text-muted-foreground">{children}</div>
    </section>
  );
}
